import React from 'react';
import { Text as RNText, TextProps as RNTextProps, StyleSheet } from 'react-native';

interface TextProps extends RNTextProps {
  variant?: 'h1' | 'h2' | 'h3' | 'body' | 'caption';
}

export const Text: React.FC<TextProps> = ({ variant = 'body', style, ...props }) => {
  return (
    <RNText
      style={[
        styles.base,
        variant === 'h1' && styles.h1,
        variant === 'h2' && styles.h2,
        variant === 'h3' && styles.h3,
        variant === 'caption' && styles.caption,
        style,
      ]}
      {...props}
    />
  );
};

const styles = StyleSheet.create({
  base: {
    color: '#000000',
    fontSize: 16,
  },
  h1: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  h2: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 6,
  },
  h3: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 4,
  },
  caption: {
    fontSize: 14,
    color: '#666666',
  },
});
