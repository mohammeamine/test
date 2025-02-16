import React from 'react';
import {
  Pressable,
  PressableProps,
  StyleSheet,
  ActivityIndicator,
  View,
  ViewStyle,
  StyleProp,
} from 'react-native';
import { Text } from './Text';
import { useColors, useBorderRadius, useSpacing } from '../../hooks/useTheme';

type VariantStyle = {
  backgroundColor: string;
  pressedBackgroundColor: string;
  textColor: string;
  borderColor?: string;
  borderWidth?: number;
};

type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'ghost';

export interface ButtonProps extends Omit<PressableProps, 'style'> {
  variant?: ButtonVariant;
  size?: 'sm' | 'md' | 'lg';
  loading?: boolean;
  disabled?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  children: string;
  style?: StyleProp<ViewStyle>;
}

export function Button({
  variant = 'primary',
  size = 'md',
  loading = false,
  disabled = false,
  leftIcon,
  rightIcon,
  children,
  style,
  ...props
}: ButtonProps) {
  const colors = useColors();
  const borderRadius = useBorderRadius();
  const spacing = useSpacing();

  const variants: Record<ButtonVariant, VariantStyle> = {
    primary: {
      backgroundColor: colors.primary,
      pressedBackgroundColor: colors.primaryHover,
      textColor: colors.background,
    },
    secondary: {
      backgroundColor: colors.secondary,
      pressedBackgroundColor: colors.secondaryHover,
      textColor: colors.background,
    },
    outline: {
      backgroundColor: 'transparent',
      pressedBackgroundColor: colors.surfaceHover,
      textColor: colors.primary,
      borderColor: colors.primary,
      borderWidth: 1,
    },
    ghost: {
      backgroundColor: 'transparent',
      pressedBackgroundColor: colors.surfaceHover,
      textColor: colors.primary,
    },
  };

  const sizes = {
    sm: {
      paddingVertical: spacing[2],
      paddingHorizontal: spacing[3],
      fontSize: 'caption' as const,
      iconSize: spacing[4],
    },
    md: {
      paddingVertical: spacing[3],
      paddingHorizontal: spacing[4],
      fontSize: 'body' as const,
      iconSize: spacing[5],
    },
    lg: {
      paddingVertical: spacing[4],
      paddingHorizontal: spacing[5],
      fontSize: 'h4' as const,
      iconSize: spacing[6],
    },
  };

  const currentVariant = variants[variant];
  const currentSize = sizes[size];

  const getButtonStyle = ({ pressed }: { pressed: boolean }): ViewStyle[] => [
    styles.button,
    {
      backgroundColor: currentVariant.backgroundColor,
      borderRadius: borderRadius.md,
      paddingVertical: currentSize.paddingVertical,
      paddingHorizontal: currentSize.paddingHorizontal,
      ...(currentVariant.borderColor && { borderColor: currentVariant.borderColor }),
      ...(currentVariant.borderWidth && { borderWidth: currentVariant.borderWidth }),
      opacity: disabled ? 0.5 : 1,
    },
    pressed && {
      backgroundColor: currentVariant.pressedBackgroundColor,
    },
    style as ViewStyle,
  ].filter(Boolean) as ViewStyle[];

  return (
    <Pressable
      disabled={disabled || loading}
      style={getButtonStyle}
      {...props}
    >
      <View style={styles.content}>
        {loading ? (
          <ActivityIndicator color={currentVariant.textColor} />
        ) : (
          <>
            {leftIcon && <View style={styles.leftIcon}>{leftIcon}</View>}
            <Text
              variant={currentSize.fontSize}
              color="primary"
              style={[styles.text, { color: currentVariant.textColor }]}
            >
              {children}
            </Text>
            {rightIcon && <View style={styles.rightIcon}>{rightIcon}</View>}
          </>
        )}
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    textAlign: 'center',
  },
  leftIcon: {
    marginRight: 8,
  },
  rightIcon: {
    marginLeft: 8,
  },
}); 