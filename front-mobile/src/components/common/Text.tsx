import React from 'react';
import { Text as RNText, TextProps as RNTextProps } from 'react-native';
import { useColors, useTypography } from '../../hooks/useTheme';

export interface TextProps extends RNTextProps {
  variant?: 'h1' | 'h2' | 'h3' | 'h4' | 'body' | 'caption' | 'label';
  color?: 'primary' | 'secondary' | 'error' | 'success' | 'warning' | 'text' | 'textSecondary';
}

export function Text({ variant = 'body', color = 'text', style, ...props }: TextProps) {
  const colors = useColors();
  const { sizes, fonts, lineHeights } = useTypography();

  const variantStyles = {
    h1: {
      fontSize: sizes['4xl'],
      lineHeight: sizes['4xl'] * lineHeights.tight,
      fontFamily: fonts.sansBold,
    },
    h2: {
      fontSize: sizes['3xl'],
      lineHeight: sizes['3xl'] * lineHeights.tight,
      fontFamily: fonts.sansBold,
    },
    h3: {
      fontSize: sizes['2xl'],
      lineHeight: sizes['2xl'] * lineHeights.tight,
      fontFamily: fonts.sansSemiBold,
    },
    h4: {
      fontSize: sizes.xl,
      lineHeight: sizes.xl * lineHeights.tight,
      fontFamily: fonts.sansSemiBold,
    },
    body: {
      fontSize: sizes.base,
      lineHeight: sizes.base * lineHeights.normal,
      fontFamily: fonts.sans,
    },
    caption: {
      fontSize: sizes.sm,
      lineHeight: sizes.sm * lineHeights.normal,
      fontFamily: fonts.sans,
    },
    label: {
      fontSize: sizes.sm,
      lineHeight: sizes.sm * lineHeights.normal,
      fontFamily: fonts.sansMedium,
    },
  };

  return (
    <RNText
      style={[
        variantStyles[variant],
        {
          color: colors[color],
        },
        style,
      ]}
      {...props}
    />
  );
} 