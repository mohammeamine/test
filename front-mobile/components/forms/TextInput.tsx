import React, { useState } from 'react';
import { View, TextInput as RNTextInput, StyleSheet, TextInputProps as RNTextInputProps, ViewStyle, TextStyle } from 'react-native';
import { Text } from '../ui/Text';
import { Ionicons } from '@expo/vector-icons';

interface CustomTextInputProps extends RNTextInputProps {
  label?: string;
  error?: string;
  leftIcon?: keyof typeof Ionicons.glyphMap;
  containerStyle?: ViewStyle;
  inputStyle?: TextStyle;
}

export const TextInput: React.FC<CustomTextInputProps> = ({
  label,
  error,
  leftIcon,
  containerStyle,
  inputStyle,
  style,
  accessibilityLabel,
  ...props
}) => {
  const [isFocused, setIsFocused] = useState(false);

  return (
    <View style={[styles.container, containerStyle]}>
      {label && (
        <Text 
          style={styles.label}
          accessibilityRole="text"
        >
          {label}
        </Text>
      )}
      <View style={[
        styles.inputContainer,
        isFocused && styles.inputContainerFocused,
        error ? { borderColor: '#FF0000' } : undefined
      ]}>
        {leftIcon && (
          <Ionicons
            name={leftIcon}
            size={20}
            color={isFocused ? '#2196F3' : '#666'}
            style={styles.icon}
          />
        )}
        <RNTextInput
          style={[
            styles.input,
            leftIcon ? { paddingLeft: 35 } : undefined,
            inputStyle
          ]}
          placeholderTextColor="#999"
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          accessibilityLabel={accessibilityLabel || label}
          accessibilityRole="text"
          accessibilityState={{
            disabled: props.editable === false
          }}
          accessibilityHint={error ? `Error: ${error}` : undefined}
          {...props}
        />
      </View>
      {error && (
        <Text 
          style={styles.errorText}
          accessibilityRole="alert"
        >
          {error}
        </Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    marginBottom: 12,
  },
  label: {
    fontSize: 16,
    marginBottom: 8,
    fontWeight: '500',
    color: '#000',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#E0E0E0',
    borderRadius: 8,
    backgroundColor: '#FFFFFF',
  },
  inputContainerFocused: {
    borderColor: '#2196F3',
  },
  input: {
    flex: 1,
    height: 48,
    paddingHorizontal: 12,
    fontSize: 16,
    color: '#000000',
  },
  icon: {
    position: 'absolute',
    left: 12,
    zIndex: 1,
  },
  errorText: {
    color: '#FF0000',
    fontSize: 12,
    marginTop: 4,
    marginLeft: 4,
  },
});
