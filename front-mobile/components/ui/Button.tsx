import React from 'react';
import {
  TouchableOpacity,
  TouchableOpacityProps,
  StyleSheet,
  ActivityIndicator,
  Platform,
  ViewStyle,
} from 'react-native';
import { NAVIGATION_THEME } from '../../navigation/constants';
import { Text } from './Text';
import { scale } from '../../utils/responsive';

interface ButtonProps extends TouchableOpacityProps {
  variant?: 'filled' | 'outlined' | 'text';
  size?: 'small' | 'medium' | 'large';
  loading?: boolean;
  disabled?: boolean;
  title: string;
}

export const Button: React.FC<ButtonProps> = ({
  variant = 'filled',
  size = 'medium',
  loading = false,
  disabled = false,
  title,
  style,
  ...props
}) => {
  const getButtonStyle = () => {
    const baseStyle: ViewStyle[] = [
      styles.base,
      styles[size],
    ];

    if (disabled) {
      baseStyle.push(styles.disabled);
    }

    switch (variant) {
      case 'outlined':
        return StyleSheet.flatten([
          ...baseStyle,
          styles.outlined,
          disabled && styles.outlinedDisabled,
        ]) as ViewStyle;
      case 'text':
        return StyleSheet.flatten([
          ...baseStyle,
          styles.text,
          disabled && styles.textDisabled,
        ]) as ViewStyle;
      default:
        return StyleSheet.flatten([
          ...baseStyle,
          styles.filled,
          disabled && styles.filledDisabled,
        ]) as ViewStyle;
    }
  };

  const getTextColor = () => {
    if (disabled) {
      return NAVIGATION_THEME.colors.onSurfaceVariant;
    }
    return variant === 'filled'
      ? NAVIGATION_THEME.colors.surface
      : NAVIGATION_THEME.colors.onSurface;
  };

  return (
    <TouchableOpacity
      style={[getButtonStyle(), style]}
      disabled={disabled || loading}
      {...props}
    >
      {loading ? (
        <ActivityIndicator
          color={getTextColor()}
          size={size === 'small' ? 'small' : 'small'}
        />
      ) : (
        <Text
          variant="button"
          weight="medium"
          color={getTextColor()}
          style={styles.label}
        >
          {title}
        </Text>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  base: {
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: scale(8),
    flexDirection: 'row',
    gap: scale(8),
  },
  small: {
    paddingHorizontal: scale(12),
    paddingVertical: scale(6),
    minWidth: scale(64),
  },
  medium: {
    paddingHorizontal: scale(16),
    paddingVertical: scale(8),
    minWidth: scale(96),
  },
  large: {
    paddingHorizontal: scale(24),
    paddingVertical: scale(12),
    minWidth: scale(128),
  },
  filled: {
    backgroundColor: NAVIGATION_THEME.colors.onSurface,
    ...Platform.select({
      ios: {
        shadowColor: NAVIGATION_THEME.colors.shadow,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 3,
      },
      android: {
        elevation: 4,
      },
    }),
  },
  outlined: {
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: NAVIGATION_THEME.colors.onSurface,
  },
  text: {
    backgroundColor: 'transparent',
  },
  disabled: {
    opacity: 0.5,
  },
  filledDisabled: {
    backgroundColor: NAVIGATION_THEME.colors.surfaceVariant,
  },
  outlinedDisabled: {
    borderColor: NAVIGATION_THEME.colors.onSurfaceVariant,
  },
  textDisabled: {
    backgroundColor: 'transparent',
  },
  label: {
    textAlign: 'center',
  },
});
