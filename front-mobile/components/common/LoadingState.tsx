import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ViewStyle,
  TextStyle,
  StyleProp,
  ActivityIndicator,
  Animated,
  Easing,
} from 'react-native';
import { COLORS, TYPOGRAPHY, SPACING } from '../../theme';
import { Ionicons } from '@expo/vector-icons';

type LoadingVariant = 'spinner' | 'dots' | 'pulse';
type LoadingSize = 'small' | 'medium' | 'large';
type FontWeight = '400' | '500' | '600' | '700' | 'normal' | 'bold';

interface LoadingStateProps {
  variant?: LoadingVariant;
  size?: LoadingSize;
  color?: string;
  message?: string;
  overlay?: boolean;
  style?: StyleProp<ViewStyle>;
  messageStyle?: StyleProp<TextStyle>;
}

export const LoadingState: React.FC<LoadingStateProps> = ({
  variant = 'spinner',
  size = 'medium',
  color = COLORS.primary.main,
  message,
  overlay = false,
  style,
  messageStyle,
}) => {
  const [pulseAnim] = React.useState(new Animated.Value(1));
  const [dotsAnim] = React.useState(new Animated.Value(0));

  React.useEffect(() => {
    if (variant === 'pulse') {
      Animated.loop(
        Animated.sequence([
          Animated.timing(pulseAnim, {
            toValue: 0.7,
            duration: 800,
            easing: Easing.inOut(Easing.ease),
            useNativeDriver: true,
          }),
          Animated.timing(pulseAnim, {
            toValue: 1,
            duration: 800,
            easing: Easing.inOut(Easing.ease),
            useNativeDriver: true,
          }),
        ])
      ).start();
    }

    if (variant === 'dots') {
      Animated.loop(
        Animated.sequence([
          Animated.timing(dotsAnim, {
            toValue: 1,
            duration: 1000,
            easing: Easing.linear,
            useNativeDriver: true,
          }),
          Animated.timing(dotsAnim, {
            toValue: 0,
            duration: 0,
            useNativeDriver: true,
          }),
        ])
      ).start();
    }
  }, [variant, pulseAnim, dotsAnim]);

  const getSize = (): number => {
    switch (size) {
      case 'small':
        return 24;
      case 'large':
        return 48;
      default:
        return 32;
    }
  };

  const renderSpinner = () => (
    <ActivityIndicator
      size={size === 'small' ? 'small' : 'large'}
      color={color}
    />
  );

  const renderDots = () => {
    const dotSize = getSize() / 4;
    const translateX = dotsAnim.interpolate({
      inputRange: [0, 0.33, 0.66, 1],
      outputRange: [0, dotSize * 1.5, dotSize * 3, 0],
    });

    return (
      <View style={styles.dotsContainer}>
        <Animated.View
          style={[
            styles.dot,
            {
              width: dotSize,
              height: dotSize,
              borderRadius: dotSize / 2,
              backgroundColor: color,
              transform: [{ translateX }],
            },
          ]}
        />
        <View
          style={[
            styles.dot,
            {
              width: dotSize,
              height: dotSize,
              borderRadius: dotSize / 2,
              backgroundColor: color,
              opacity: 0.5,
            },
          ]}
        />
        <View
          style={[
            styles.dot,
            {
              width: dotSize,
              height: dotSize,
              borderRadius: dotSize / 2,
              backgroundColor: color,
              opacity: 0.2,
            },
          ]}
        />
      </View>
    );
  };

  const renderPulse = () => {
    const iconSize = getSize();
    return (
      <Animated.View style={{ transform: [{ scale: pulseAnim }] }}>
        <Ionicons
          name="sync"
          size={iconSize}
          color={color}
        />
      </Animated.View>
    );
  };

  const renderLoader = () => {
    switch (variant) {
      case 'dots':
        return renderDots();
      case 'pulse':
        return renderPulse();
      default:
        return renderSpinner();
    }
  };

  const containerStyles = [
    styles.container,
    overlay && styles.overlay,
    style,
  ];

  const messageStyles = [
    {
      fontSize: TYPOGRAPHY.body2.fontSize,
      fontWeight: TYPOGRAPHY.body2.fontWeight as FontWeight,
      lineHeight: TYPOGRAPHY.body2.lineHeight,
      letterSpacing: TYPOGRAPHY.body2.letterSpacing,
      marginTop: SPACING.md,
      textAlign: 'center' as const,
      color,
    },
    messageStyle,
  ];

  return (
    <View style={containerStyles}>
      {renderLoader()}
      {message && (
        <Text style={messageStyles}>
          {message}
        </Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: SPACING.lg,
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    zIndex: 999,
  },
  dotsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    height: 48,
  },
  dot: {
    marginHorizontal: SPACING.xs,
  },
}); 