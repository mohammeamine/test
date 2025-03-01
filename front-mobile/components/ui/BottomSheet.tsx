import React, { useCallback, useEffect, useRef } from 'react';
import {
  View,
  StyleSheet,
  Animated,
  Modal,
  TouchableWithoutFeedback,
  BackHandler,
  useWindowDimensions,
  Platform,
} from 'react-native';
import { useGestureHandling } from '../../hooks/useGestureHandling';
import { useResponsiveLayout } from '../../hooks/useResponsiveLayout';
import { NAVIGATION_THEME } from '../../navigation/constants';
import { scale, verticalScale } from '../../utils/responsive';

interface BottomSheetProps {
  isVisible: boolean;
  onClose: () => void;
  children: React.ReactNode;
  height?: number | string;
  enableDragToClose?: boolean;
  enableBackdropPress?: boolean;
  enableBackHandler?: boolean;
  animationDuration?: number;
}

export const BottomSheet: React.FC<BottomSheetProps> = ({
  isVisible,
  onClose,
  children,
  height = '50%',
  enableDragToClose = true,
  enableBackdropPress = true,
  enableBackHandler = true,
  animationDuration = 300,
}) => {
  const { height: screenHeight } = useWindowDimensions();
  const { getSpacing } = useResponsiveLayout();
  const translateY = useRef(new Animated.Value(screenHeight)).current;
  const backdropOpacity = useRef(new Animated.Value(0)).current;

  const sheetHeight = typeof height === 'string' 
    ? screenHeight * (parseInt(height) / 100)
    : height;

  const { panHandlers } = useGestureHandling(
    {
      onSwipeDown: enableDragToClose ? onClose : undefined,
      swipeThreshold: 50,
    }
  );

  const animateSheet = useCallback((show: boolean) => {
    Animated.parallel([
      Animated.timing(translateY, {
        toValue: show ? 0 : screenHeight,
        duration: animationDuration,
        useNativeDriver: true,
      }),
      Animated.timing(backdropOpacity, {
        toValue: show ? 0.5 : 0,
        duration: animationDuration,
        useNativeDriver: true,
      }),
    ]).start();
  }, [translateY, backdropOpacity, screenHeight, animationDuration]);

  useEffect(() => {
    animateSheet(isVisible);
  }, [isVisible, animateSheet]);

  useEffect(() => {
    if (enableBackHandler && Platform.OS === 'android') {
      const backHandler = BackHandler.addEventListener('hardwareBackPress', () => {
        if (isVisible) {
          onClose();
          return true;
        }
        return false;
      });

      return () => backHandler.remove();
    }
  }, [isVisible, onClose, enableBackHandler]);

  const handleBackdropPress = () => {
    if (enableBackdropPress) {
      onClose();
    }
  };

  return (
    <Modal
      visible={isVisible}
      transparent
      animationType="none"
      statusBarTranslucent
    >
      <View style={styles.container}>
        <TouchableWithoutFeedback onPress={handleBackdropPress}>
          <Animated.View
            style={[
              styles.backdrop,
              { opacity: backdropOpacity },
            ]}
          />
        </TouchableWithoutFeedback>

        <Animated.View
          style={[
            styles.sheet,
            {
              height: sheetHeight,
              transform: [{ translateY }],
            },
          ]}
          {...(enableDragToClose ? panHandlers : {})}
        >
          <View style={styles.dragIndicator} />
          <View style={[styles.content, { padding: getSpacing(16) }]}>
            {children}
          </View>
        </Animated.View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  backdrop: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: NAVIGATION_THEME.colors.shadow,
  },
  sheet: {
    backgroundColor: NAVIGATION_THEME.colors.surface,
    borderTopLeftRadius: NAVIGATION_THEME.shape.large,
    borderTopRightRadius: NAVIGATION_THEME.shape.large,
    elevation: 8,
    shadowColor: NAVIGATION_THEME.colors.shadow,
    shadowOffset: { width: 0, height: -3 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  dragIndicator: {
    alignSelf: 'center',
    width: scale(40),
    height: verticalScale(4),
    backgroundColor: NAVIGATION_THEME.colors.outline,
    borderRadius: NAVIGATION_THEME.shape.full,
    marginVertical: verticalScale(8),
  },
  content: {
    flex: 1,
  },
}); 