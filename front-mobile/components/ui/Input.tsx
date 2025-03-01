import React, { useState } from 'react';
import {
  View,
  TextInput,
  TextInputProps,
  StyleSheet,
  Platform,
  Pressable,
  ViewStyle,
  TextStyle,
} from 'react-native';
import { NAVIGATION_THEME } from '../../navigation/constants';
import { Text } from './Text';
import { scale } from '../../utils/responsive';

interface InputProps extends TextInputProps {
  label?: string;
  error?: string;
  helperText?: string;
  startIcon?: React.ReactNode;
  endIcon?: React.ReactNode;
  onEndIconPress?: () => void;
}

export const Input: React.FC<InputProps> = ({
  label,
  error,
  helperText,
  startIcon,
  endIcon,
  onEndIconPress,
  style,
  ...props
}) => {
  const [isFocused, setIsFocused] = useState(false);

  const getContainerStyle = () => {
    const styles: ViewStyle[] = [
      baseStyles.container,
    ];

    if (isFocused) {
      styles.push(baseStyles.containerFocused);
    }

    if (error) {
      styles.push(baseStyles.containerError);
    }

    if (props.editable === false) {
      styles.push(baseStyles.containerDisabled);
    }

    return StyleSheet.flatten(styles);
  };

  const getHelperTextColor = () => {
    if (error) return NAVIGATION_THEME.colors.onSurfaceVariant;
    return NAVIGATION_THEME.colors.onSurfaceVariant;
  };

  const getLabelStyle = (): TextStyle => {
    const styles: TextStyle[] = [
      baseStyles.label,
    ];

    if (error) {
      styles.push({ color: NAVIGATION_THEME.colors.onSurfaceVariant });
    }

    return StyleSheet.flatten(styles);
  };

  return (
    <View style={baseStyles.wrapper}>
      {label && (
        <Text
          variant="body2"
          style={getLabelStyle()}
        >
          {label}
        </Text>
      )}
      <View style={getContainerStyle()}>
        {startIcon && <View style={baseStyles.iconContainer}>{startIcon}</View>}
        <TextInput
          style={[baseStyles.input, style]}
          placeholderTextColor={NAVIGATION_THEME.colors.onSurfaceVariant}
          onFocus={(e) => {
            setIsFocused(true);
            props.onFocus?.(e);
          }}
          onBlur={(e) => {
            setIsFocused(false);
            props.onBlur?.(e);
          }}
          {...props}
        />
        {endIcon && (
          <Pressable
            style={baseStyles.iconContainer}
            onPress={onEndIconPress}
            disabled={!onEndIconPress}
          >
            {endIcon}
          </Pressable>
        )}
      </View>
      {(error || helperText) && (
        <Text
          variant="caption"
          style={[baseStyles.helperText, { color: getHelperTextColor() }]}
        >
          {error || helperText}
        </Text>
      )}
    </View>
  );
};

const baseStyles = StyleSheet.create({
  wrapper: {
    width: '100%',
  },
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: NAVIGATION_THEME.colors.outline,
    borderRadius: scale(8),
    backgroundColor: NAVIGATION_THEME.colors.surface,
    minHeight: scale(48),
    ...Platform.select({
      ios: {
        shadowColor: NAVIGATION_THEME.colors.shadow,
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.15,
        shadowRadius: 2,
      },
      android: {
        elevation: 2,
      },
    }),
  },
  containerFocused: {
    borderColor: NAVIGATION_THEME.colors.onSurface,
    borderWidth: 2,
  },
  containerError: {
    borderColor: NAVIGATION_THEME.colors.onSurfaceVariant,
  },
  containerDisabled: {
    backgroundColor: NAVIGATION_THEME.colors.surfaceVariant,
    borderColor: NAVIGATION_THEME.colors.outlineVariant,
  },
  input: {
    flex: 1,
    color: NAVIGATION_THEME.colors.onSurface,
    paddingHorizontal: scale(12),
    paddingVertical: Platform.OS === 'ios' ? scale(12) : scale(8),
    fontSize: scale(16),
  },
  label: {
    marginBottom: scale(4),
    color: NAVIGATION_THEME.colors.onSurfaceVariant,
  },
  helperText: {
    marginTop: scale(4),
  },
  iconContainer: {
    paddingHorizontal: scale(12),
    justifyContent: 'center',
    alignItems: 'center',
  },
}); 