import React from 'react';
import {
  TouchableOpacity,
  Text,
  StyleSheet,
  ViewStyle,
  TextStyle,
  ActivityIndicator,
  StyleProp,
  Platform,
} from 'react-native';
import { COLORS, TYPOGRAPHY, SPACING, BORDER_RADIUS } from '../../theme';
import { Ionicons } from '@expo/vector-icons';

type ButtonVariant = 'contained' | 'outlined' | 'text';
type ButtonSize = 'small' | 'medium' | 'large';
type ButtonColor = 'primary' | 'secondary' | 'error' | 'success' | 'warning';

interface ButtonProps {
  onPress: () => void;
  children: string;
  variant?: ButtonVariant;
  size?: ButtonSize;
  color?: ButtonColor;
  disabled?: boolean;
  loading?: boolean;
  fullWidth?: boolean;
  startIcon?: keyof typeof Ionicons.glyphMap;
  endIcon?: keyof typeof Ionicons.glyphMap;
  style?: StyleProp<ViewStyle>;
  textStyle?: StyleProp<TextStyle>;
}

export const Button: React.FC<ButtonProps> = ({
  onPress,
  children,
  variant = 'contained',
  size = 'medium',
  color = 'primary',
  disabled = false,
  loading = false,
  fullWidth = false,
  startIcon,
  endIcon,
  style,
  textStyle,
}) => {
  const getBackgroundColor = () => {
    if (disabled) return COLORS.grey[300];
    if (variant !== 'contained') return 'transparent';

    switch (color) {
      case 'primary':
        return COLORS.primary.main;
      case 'secondary':
        return COLORS.secondary.main;
      case 'error':
        return COLORS.error.main;
      case 'success':
        return COLORS.success.main;
      case 'warning':
        return COLORS.warning.main;
      default:
        return COLORS.primary.main;
    }
  };

  const getTextColor = () => {
    if (disabled) return COLORS.grey[500];
    if (variant === 'contained') return COLORS.background.light;

    switch (color) {
      case 'primary':
        return COLORS.primary.main;
      case 'secondary':
        return COLORS.secondary.main;
      case 'error':
        return COLORS.error.main;
      case 'success':
        return COLORS.success.main;
      case 'warning':
        return COLORS.warning.main;
      default:
        return COLORS.primary.main;
    }
  };

  const getBorderColor = () => {
    if (disabled) return COLORS.grey[300];
    if (variant !== 'outlined') return 'transparent';

    switch (color) {
      case 'primary':
        return COLORS.primary.main;
      case 'secondary':
        return COLORS.secondary.main;
      case 'error':
        return COLORS.error.main;
      case 'success':
        return COLORS.success.main;
      case 'warning':
        return COLORS.warning.main;
      default:
        return COLORS.primary.main;
    }
  };

  const getIconColor = () => {
    return getTextColor();
  };

  const getIconSize = () => {
    switch (size) {
      case 'small':
        return 16;
      case 'large':
        return 24;
      default:
        return 20;
    }
  };

  const getPadding = () => {
    switch (size) {
      case 'small':
        return {
          paddingVertical: SPACING.xs,
          paddingHorizontal: SPACING.sm,
        };
      case 'large':
        return {
          paddingVertical: SPACING.md,
          paddingHorizontal: SPACING.lg,
        };
      default:
        return {
          paddingVertical: SPACING.sm,
          paddingHorizontal: SPACING.md,
        };
    }
  };

  const buttonStyle: StyleProp<ViewStyle> = [
    styles.button,
    {
      backgroundColor: getBackgroundColor(),
      borderColor: getBorderColor(),
      ...getPadding(),
    },
    fullWidth && styles.fullWidth,
    style,
  ];

  const textColorStyle: StyleProp<TextStyle> = {
    color: getTextColor(),
    fontSize: size === 'small' ? 14 : size === 'large' ? 18 : 16,
  };

  return (
    <TouchableOpacity
      style={buttonStyle}
      onPress={onPress}
      disabled={disabled || loading}
      activeOpacity={0.7}
    >
      {loading ? (
        <ActivityIndicator
          color={variant === 'contained' ? COLORS.background.light : getTextColor()}
          size={size === 'small' ? 'small' : 'small'}
        />
      ) : (
        <>
          {startIcon && (
            <Ionicons
              name={startIcon}
              size={getIconSize()}
              color={getIconColor()}
              style={styles.startIcon}
            />
          )}
          <Text style={[styles.text, textColorStyle, textStyle]}>
            {children}
          </Text>
          {endIcon && (
            <Ionicons
              name={endIcon}
              size={getIconSize()}
              color={getIconColor()}
              style={styles.endIcon}
            />
          )}
        </>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: BORDER_RADIUS.md,
    borderWidth: 1,
    borderColor: 'transparent',
    ...Platform.select({
      ios: {
        shadowColor: COLORS.grey[900],
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
      },
      android: {
        elevation: 4,
      },
    }),
  },
  fullWidth: {
    width: '100%',
  },
  text: {
    fontWeight: '600',
    textAlign: 'center',
  },
  startIcon: {
    marginRight: SPACING.xs,
  },
  endIcon: {
    marginLeft: SPACING.xs,
  },
}); 