import { useCallback } from 'react';
import { GestureResponderEvent, PanResponder, PanResponderGestureState } from 'react-native';
import { useResponsiveLayout } from './useResponsiveLayout';

interface SwipeConfig {
  onSwipeLeft?: () => void;
  onSwipeRight?: () => void;
  onSwipeUp?: () => void;
  onSwipeDown?: () => void;
  swipeThreshold?: number;
}

interface TapConfig {
  onSingleTap?: () => void;
  onDoubleTap?: () => void;
  onLongPress?: () => void;
  doubleTapDelay?: number;
  longPressDelay?: number;
}

interface PinchConfig {
  onPinchIn?: (scale: number) => void;
  onPinchOut?: (scale: number) => void;
  minScale?: number;
  maxScale?: number;
}

export const useGestureHandling = (
  swipeConfig?: SwipeConfig,
  tapConfig?: TapConfig,
  pinchConfig?: PinchConfig
) => {
  const { getTouchableSize } = useResponsiveLayout();
  const touchableSize = getTouchableSize();

  // Default configuration
  const {
    swipeThreshold = 50,
    doubleTapDelay = 300,
    longPressDelay = 500,
    minScale = 0.5,
    maxScale = 2,
  } = {
    ...swipeConfig,
    ...tapConfig,
    ...pinchConfig,
  };

  let lastTapTimestamp = 0;
  let initialTouchDistance = 0;

  // Handle swipe gestures
  const handleSwipe = useCallback(
    (gestureState: PanResponderGestureState) => {
      const { dx, dy } = gestureState;

      if (Math.abs(dx) > Math.abs(dy)) {
        if (Math.abs(dx) > swipeThreshold) {
          if (dx > 0 && swipeConfig?.onSwipeRight) {
            swipeConfig.onSwipeRight();
          } else if (dx < 0 && swipeConfig?.onSwipeLeft) {
            swipeConfig.onSwipeLeft();
          }
        }
      } else {
        if (Math.abs(dy) > swipeThreshold) {
          if (dy > 0 && swipeConfig?.onSwipeDown) {
            swipeConfig.onSwipeDown();
          } else if (dy < 0 && swipeConfig?.onSwipeUp) {
            swipeConfig.onSwipeUp();
          }
        }
      }
    },
    [swipeConfig, swipeThreshold]
  );

  // Handle tap gestures
  const handleTap = useCallback(
    (event: GestureResponderEvent) => {
      const currentTimestamp = event.nativeEvent.timestamp;

      if (tapConfig?.onDoubleTap && currentTimestamp - lastTapTimestamp < doubleTapDelay) {
        tapConfig.onDoubleTap();
        lastTapTimestamp = 0;
      } else {
        if (tapConfig?.onSingleTap) {
          tapConfig.onSingleTap();
        }
        lastTapTimestamp = currentTimestamp;
      }
    },
    [tapConfig, doubleTapDelay]
  );

  // Handle pinch gestures
  const handlePinch = useCallback(
    (event: GestureResponderEvent) => {
      if (!pinchConfig) return;

      const touches = event.nativeEvent.touches;
      if (touches.length !== 2) return;

      const touch1 = touches[0];
      const touch2 = touches[1];

      const distance = Math.sqrt(
        Math.pow(touch2.pageX - touch1.pageX, 2) + Math.pow(touch2.pageY - touch1.pageY, 2)
      );

      if (initialTouchDistance === 0) {
        initialTouchDistance = distance;
        return;
      }

      const scale = distance / initialTouchDistance;

      if (scale < 1 && scale >= minScale && pinchConfig.onPinchIn) {
        pinchConfig.onPinchIn(scale);
      } else if (scale > 1 && scale <= maxScale && pinchConfig.onPinchOut) {
        pinchConfig.onPinchOut(scale);
      }
    },
    [pinchConfig, minScale, maxScale]
  );

  // Create pan responder
  const panResponder = PanResponder.create({
    onStartShouldSetPanResponder: () => true,
    onMoveShouldSetPanResponder: () => true,
    onPanResponderGrant: (event) => {
      if (tapConfig?.onLongPress) {
        setTimeout(() => {
          if (event.nativeEvent.touches.length === 1) {
            tapConfig.onLongPress?.();
          }
        }, longPressDelay);
      }
    },
    onPanResponderMove: (event) => {
      handlePinch(event);
    },
    onPanResponderRelease: (event, gestureState) => {
      if (Math.abs(gestureState.dx) < 5 && Math.abs(gestureState.dy) < 5) {
        handleTap(event);
      } else {
        handleSwipe(gestureState);
      }
      initialTouchDistance = 0;
    },
  });

  return {
    panHandlers: panResponder.panHandlers,
    touchableSize,
  };
}; 