import React from 'react';
import { Text as RNText, TextProps as RNTextProps, StyleSheet, TextStyle } from 'react-native';
import { NAVIGATION_THEME } from '../../navigation/constants';
import { scale } from '../../utils/responsive';

interface TextProps extends RNTextProps {
  variant?: 'h1' | 'h2' | 'h3' | 'h4' | 'body' | 'body2' | 'caption' | 'button';
  weight?: 'regular' | 'medium' | 'semibold' | 'bold';
  color?: string;
}

export const Text: React.FC<TextProps> = ({ 
  variant = 'body',
  weight = 'regular',
  color,
  style,
  ...props 
}) => {
  return (
    <RNText
      style={[
        styles.base,
        styles[variant],
        styles[weight],
        color ? { color } as TextStyle : undefined,
        style,
      ]}
      {...props}
    />
  );
};

const styles = StyleSheet.create({
  base: {
    color: NAVIGATION_THEME.colors.onSurface,
    fontSize: scale(16),
  },
  h1: {
    fontSize: scale(32),
    lineHeight: scale(40),
    letterSpacing: -0.5,
  },
  h2: {
    fontSize: scale(24),
    lineHeight: scale(32),
    letterSpacing: -0.25,
  },
  h3: {
    fontSize: scale(20),
    lineHeight: scale(28),
  },
  h4: {
    fontSize: scale(18),
    lineHeight: scale(26),
  },
  body: {
    fontSize: scale(16),
    lineHeight: scale(24),
  },
  body2: {
    fontSize: scale(14),
    lineHeight: scale(22),
  },
  caption: {
    fontSize: scale(12),
    lineHeight: scale(16),
    letterSpacing: 0.5,
  },
  button: {
    fontSize: scale(14),
    lineHeight: scale(20),
    letterSpacing: 0.25,
    textTransform: 'uppercase',
  },
  regular: {
    fontWeight: '400',
  },
  medium: {
    fontWeight: '500',
  },
  semibold: {
    fontWeight: '600',
  },
  bold: {
    fontWeight: '700',
  },
});
