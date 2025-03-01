import React from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  ViewStyle,
  TextStyle,
  TextInputProps,
  TouchableOpacity,
} from 'react-native';
import { COLORS, TYPOGRAPHY, SPACING, BORDER_RADIUS } from '../../theme';

type FontWeight = '400' | '500' | '600' | '700' | 'normal' | 'bold';

interface InputProps extends TextInputProps {
  containerStyle?: ViewStyle;
  inputStyle?: TextStyle;
  startAdornment?: React.ReactNode;
  endAdornment?: React.ReactNode;
  error?: boolean;
  helperText?: string;
  onEndAdornmentPress?: () => void;
}

export const Input: React.FC<InputProps> = ({
  containerStyle,
  inputStyle,
  startAdornment,
  endAdornment,
  error,
  helperText,
  onEndAdornmentPress,
  ...props
}) => {
  const getInputContainerStyle = (): ViewStyle[] => {
    const styles: ViewStyle[] = [baseStyles.inputContainer];
    
    if (error) {
      styles.push({ borderColor: COLORS.error.main });
    }
    if (startAdornment) {
      styles.push({ paddingLeft: 0 });
    }
    if (endAdornment) {
      styles.push({ paddingRight: 0 });
    }
    
    return styles;
  };

  return (
    <View style={[baseStyles.container, containerStyle]}>
      <View style={getInputContainerStyle()}>
        {startAdornment && (
          <View style={baseStyles.startAdornment}>
            {startAdornment}
          </View>
        )}
        <TextInput
          style={[
            baseStyles.input,
            error && baseStyles.errorInput,
            inputStyle,
          ]}
          placeholderTextColor={COLORS.grey[400]}
          {...props}
        />
        {endAdornment && (
          <TouchableOpacity
            style={baseStyles.endAdornment}
            onPress={onEndAdornmentPress}
            disabled={!onEndAdornmentPress}
          >
            {endAdornment}
          </TouchableOpacity>
        )}
      </View>
      {helperText && (
        <View style={baseStyles.helperTextContainer}>
          <Text
            style={[
              baseStyles.helperText,
              error && baseStyles.errorHelperText,
            ]}
          >
            {helperText}
          </Text>
        </View>
      )}
    </View>
  );
};

const baseStyles = StyleSheet.create({
  container: {
    width: '100%',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    minHeight: 48,
    borderWidth: 1,
    borderColor: COLORS.grey[300],
    borderRadius: BORDER_RADIUS.md,
    backgroundColor: COLORS.background.light,
    overflow: 'hidden',
  },
  input: {
    flex: 1,
    color: COLORS.grey[900],
    fontSize: TYPOGRAPHY.body1.fontSize,
    paddingHorizontal: SPACING.md,
    paddingVertical: SPACING.sm,
  },
  errorInput: {
    color: COLORS.error.main,
  },
  startAdornment: {
    paddingLeft: SPACING.md,
  },
  endAdornment: {
    paddingRight: SPACING.md,
  },
  helperTextContainer: {
    marginTop: SPACING.xs,
    paddingHorizontal: SPACING.xs,
  },
  helperText: {
    fontSize: TYPOGRAPHY.caption.fontSize,
    color: COLORS.grey[600],
  },
  errorHelperText: {
    color: COLORS.error.main,
  },
}); 