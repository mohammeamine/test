import React from 'react';
import {
  TextInput as RNTextInput,
  TextInputProps as RNTextInputProps,
  StyleSheet,
  View,
  Pressable,
} from 'react-native';
import { Text } from '../common/Text';
import { useColors, useBorderRadius, useSpacing, useTypography } from '../../hooks/useTheme';

export interface TextInputProps extends RNTextInputProps {
  label?: string;
  error?: string;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  onRightIconPress?: () => void;
}

export function TextInput({
  label,
  error,
  leftIcon,
  rightIcon,
  onRightIconPress,
  style,
  ...props
}: TextInputProps) {
  const colors = useColors();
  const borderRadius = useBorderRadius();
  const spacing = useSpacing();
  const { fonts, sizes } = useTypography();

  return (
    <View style={styles.container}>
      {label && (
        <Text variant="label" color="textSecondary" style={styles.label}>
          {label}
        </Text>
      )}
      <View
        style={[
          styles.inputContainer,
          {
            borderRadius: borderRadius.md,
            borderColor: error ? colors.error : colors.border,
            backgroundColor: colors.surface,
          },
        ]}
      >
        {leftIcon && <View style={styles.leftIcon}>{leftIcon}</View>}
        <RNTextInput
          style={[
            styles.input,
            {
              color: colors.text,
              fontFamily: fonts.sans,
              fontSize: sizes.base,
              paddingHorizontal: spacing[3],
              paddingVertical: spacing[3],
            },
            style,
          ]}
          placeholderTextColor={colors.textTertiary}
          {...props}
        />
        {rightIcon && (
          <Pressable onPress={onRightIconPress} style={styles.rightIcon}>
            {rightIcon}
          </Pressable>
        )}
      </View>
      {error && (
        <Text variant="caption" color="error" style={styles.error}>
          {error}
        </Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
  },
  label: {
    marginBottom: 4,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    overflow: 'hidden',
  },
  input: {
    flex: 1,
  },
  leftIcon: {
    paddingLeft: 12,
  },
  rightIcon: {
    paddingRight: 12,
  },
  error: {
    marginTop: 4,
  },
}); 