import React from 'react';
import {
  View,
  TouchableOpacity,
  StyleSheet,
  Platform,
  ViewStyle,
  StyleProp,
} from 'react-native';
import { NAVIGATION_THEME } from '../../navigation/constants';
import { Text } from './Text';
import { scale } from '../../utils/responsive';

interface ListItemProps {
  title: string;
  subtitle?: string;
  startIcon?: React.ReactNode;
  endIcon?: React.ReactNode;
  onPress?: () => void;
  disabled?: boolean;
  style?: StyleProp<ViewStyle>;
  variant?: 'default' | 'elevated' | 'outlined';
}

export const ListItem: React.FC<ListItemProps> = ({
  title,
  subtitle,
  startIcon,
  endIcon,
  onPress,
  disabled = false,
  style,
  variant = 'default',
}) => {
  const getContainerStyle = (): ViewStyle[] => {
    const styles: ViewStyle[] = [
      baseStyles.container,
    ];

    switch (variant) {
      case 'elevated':
        styles.push(baseStyles.elevated);
        break;
      case 'outlined':
        styles.push(baseStyles.outlined);
        break;
      default:
        styles.push(baseStyles.default);
        break;
    }

    if (disabled) {
      styles.push(baseStyles.disabled);
    }

    return styles;
  };

  const content = (
    <>
      {startIcon && <View style={baseStyles.startIcon}>{startIcon}</View>}
      <View style={baseStyles.textContainer}>
        <Text
          variant="body"
          style={[
            baseStyles.title,
            disabled && { color: NAVIGATION_THEME.colors.onSurfaceVariant },
          ]}
        >
          {title}
        </Text>
        {subtitle && (
          <Text
            variant="body2"
            style={[
              baseStyles.subtitle,
              disabled && { color: NAVIGATION_THEME.colors.onSurfaceVariant },
            ]}
          >
            {subtitle}
          </Text>
        )}
      </View>
      {endIcon && <View style={baseStyles.endIcon}>{endIcon}</View>}
    </>
  );

  if (onPress) {
    return (
      <TouchableOpacity
        style={[getContainerStyle(), style]}
        onPress={onPress}
        disabled={disabled}
        activeOpacity={0.7}
      >
        {content}
      </TouchableOpacity>
    );
  }

  return <View style={[getContainerStyle(), style]}>{content}</View>;
};

interface ListProps {
  children: React.ReactNode;
  style?: StyleProp<ViewStyle>;
}

export const List: React.FC<ListProps> = ({ children, style }) => {
  return <View style={[baseStyles.list, style]}>{children}</View>;
};

const baseStyles = StyleSheet.create({
  list: {
    width: '100%',
  },
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: scale(16),
    minHeight: scale(64),
    backgroundColor: NAVIGATION_THEME.colors.surface,
  },
  default: {
    borderRadius: 0,
  },
  elevated: {
    borderRadius: scale(8),
    marginVertical: scale(4),
    marginHorizontal: scale(8),
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
  outlined: {
    borderRadius: scale(8),
    borderWidth: 1,
    borderColor: NAVIGATION_THEME.colors.outline,
    marginVertical: scale(4),
    marginHorizontal: scale(8),
  },
  disabled: {
    opacity: 0.5,
  },
  textContainer: {
    flex: 1,
    marginHorizontal: scale(16),
  },
  title: {
    color: NAVIGATION_THEME.colors.onSurface,
  },
  subtitle: {
    color: NAVIGATION_THEME.colors.onSurfaceVariant,
    marginTop: scale(2),
  },
  startIcon: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  endIcon: {
    justifyContent: 'center',
    alignItems: 'center',
  },
}); 