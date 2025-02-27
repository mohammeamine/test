import { useEffect, useState } from 'react';
import {
  Keyboard,
  KeyboardEvent,
  LayoutAnimation,
  Platform,
  useWindowDimensions,
  KeyboardEventName,
} from 'react-native';
import { useResponsiveLayout } from './useResponsiveLayout';

interface KeyboardConfig {
  enableAnimation?: boolean;
  adjustScrollView?: boolean;
  onKeyboardShow?: (keyboardHeight: number) => void;
  onKeyboardHide?: () => void;
}

export const useKeyboardAware = (config: KeyboardConfig = {}) => {
  const [keyboardHeight, setKeyboardHeight] = useState(0);
  const [keyboardVisible, setKeyboardVisible] = useState(false);
  const { height: screenHeight } = useWindowDimensions();
  const { getSpacing } = useResponsiveLayout();

  const {
    enableAnimation = true,
    adjustScrollView = true,
    onKeyboardShow,
    onKeyboardHide,
  } = config;

  useEffect(() => {
    const handleKeyboardShow = (event: KeyboardEvent) => {
      const keyboardHeight = event.endCoordinates.height;
      
      if (enableAnimation) {
        LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
      }

      setKeyboardHeight(keyboardHeight);
      setKeyboardVisible(true);
      onKeyboardShow?.(keyboardHeight);
    };

    const handleKeyboardHide = () => {
      if (enableAnimation) {
        LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
      }

      setKeyboardHeight(0);
      setKeyboardVisible(false);
      onKeyboardHide?.();
    };

    // Platform-specific keyboard events
    const showEvent: KeyboardEventName = Platform.select({
      ios: 'keyboardWillShow',
      android: 'keyboardDidShow',
      default: 'keyboardDidShow',
    });

    const hideEvent: KeyboardEventName = Platform.select({
      ios: 'keyboardWillHide',
      android: 'keyboardDidHide',
      default: 'keyboardDidHide',
    });

    const keyboardShowListener = Keyboard.addListener(
      showEvent,
      handleKeyboardShow
    );
    const keyboardHideListener = Keyboard.addListener(
      hideEvent,
      handleKeyboardHide
    );

    return () => {
      keyboardShowListener.remove();
      keyboardHideListener.remove();
    };
  }, [enableAnimation, onKeyboardShow, onKeyboardHide]);

  const getContentContainerStyle = () => {
    if (!adjustScrollView) return {};

    return {
      minHeight: screenHeight,
      paddingBottom: keyboardVisible
        ? keyboardHeight + getSpacing(20)
        : getSpacing(20),
    };
  };

  const dismissKeyboard = () => {
    Keyboard.dismiss();
  };

  return {
    keyboardHeight,
    keyboardVisible,
    dismissKeyboard,
    getContentContainerStyle,
  };
}; 