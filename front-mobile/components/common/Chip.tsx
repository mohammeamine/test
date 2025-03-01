import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ViewStyle,
  TextStyle,
  StyleProp,
} from 'react-native';
import { COLORS, TYPOGRAPHY, SPACING, BORDER_RADIUS } from '../../theme';
import { Ionicons } from '@expo/vector-icons';

type ChipVariant = 'filled' | 'outlined';
type ChipColor = 'primary' | 'secondary' | 'error' | 'success' | 'warning' | 'default';
type ChipSize = 'small' | 'medium' | 'large';

interface ChipProps {
  label: string;
  variant?: ChipVariant;
  color?: ChipColor;
  size?: ChipSize;
  selected?: boolean;
  disabled?: boolean;
  onPress?: () => void;
  onDelete?: () => void;
  icon?: keyof typeof Ionicons.glyphMap;
  style?: StyleProp<ViewStyle>;
  labelStyle?: StyleProp<TextStyle>;
}

export const Chip: React.FC<ChipProps> = ({
  label,
  variant = 'filled',
  color = 'default',
  size = 'medium',
  selected = false,
  disabled = false,
  onPress,
  onDelete,
  icon,
  style,
  labelStyle,
}) => {
  const getBackgroundColor = (): string => {
    if (disabled) return COLORS.grey[200];
    if (variant === 'outlined') return 'transparent';
    if (selected) {
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
          return COLORS.grey[300];
      }
    }
    switch (color) {
      case 'primary':
        return COLORS.primary.light;
      case 'secondary':
        return COLORS.secondary.light;
      case 'error':
        return COLORS.error.light;
      case 'success':
        return COLORS.success.light;
      case 'warning':
        return COLORS.warning.light;
      default:
        return COLORS.grey[100];
    }
  };

  const getBorderColor = (): string => {
    if (disabled) return COLORS.grey[300];
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
        return COLORS.grey[400];
    }
  };

  const getTextColor = (): string => {
    if (disabled) return COLORS.grey[500];
    if (variant === 'outlined' || !selected) {
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
          return COLORS.grey[700];
      }
    }
    return COLORS.background.light;
  };

  const getIconSize = (): number => {
    switch (size) {
      case 'small':
        return 16;
      case 'large':
        return 24;
      default:
        return 20;
    }
  };

  const getPadding = (): ViewStyle => {
    switch (size) {
      case 'small':
        return {
          paddingVertical: SPACING.xs,
          paddingHorizontal: SPACING.sm,
        };
      case 'large':
        return {
          paddingVertical: SPACING.sm,
          paddingHorizontal: SPACING.md,
        };
      default:
        return {
          paddingVertical: SPACING.xs,
          paddingHorizontal: SPACING.md,
        };
    }
  };

  const getFontSize = (): number => {
    switch (size) {
      case 'small':
        return 12;
      case 'large':
        return 16;
      default:
        return 14;
    }
  };

  const containerStyle: StyleProp<ViewStyle> = [
    styles.container,
    {
      ...getPadding(),
      backgroundColor: getBackgroundColor(),
      borderColor: variant === 'outlined' ? getBorderColor() : 'transparent',
    },
    style,
  ];

  const textStyle: StyleProp<TextStyle> = [
    styles.label,
    {
      fontSize: getFontSize(),
      color: getTextColor(),
    },
    labelStyle,
  ];

  const iconColor = getTextColor();
  const iconSize = getIconSize();

  const renderContent = () => (
    <>
      {icon && (
        <Ionicons
          name={icon}
          size={iconSize}
          color={iconColor}
          style={styles.icon}
        />
      )}
      <Text style={textStyle} numberOfLines={1}>
        {label}
      </Text>
      {onDelete && (
        <TouchableOpacity
          onPress={disabled ? undefined : onDelete}
          style={styles.deleteButton}
          disabled={disabled}
        >
          <Ionicons
            name="close-circle"
            size={iconSize}
            color={iconColor}
          />
        </TouchableOpacity>
      )}
    </>
  );

  if (onPress) {
    return (
      <TouchableOpacity
        style={containerStyle}
        onPress={disabled ? undefined : onPress}
        disabled={disabled}
        activeOpacity={0.7}
      >
        {renderContent()}
      </TouchableOpacity>
    );
  }

  return (
    <View style={containerStyle}>
      {renderContent()}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: BORDER_RADIUS.round,
    borderWidth: 1,
    alignSelf: 'flex-start',
  },
  label: {
    fontWeight: '500',
    textAlign: 'center',
  },
  icon: {
    marginRight: SPACING.xs,
  },
  deleteButton: {
    marginLeft: SPACING.xs,
  },
}); 