import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ViewStyle,
  TextStyle,
  TouchableOpacity,
  Platform,
  StyleProp,
} from 'react-native';
import { COLORS, TYPOGRAPHY, SPACING, SHADOWS, BORDER_RADIUS } from '../../theme';

type CardContainerProps = {
  children: React.ReactNode;
  style?: StyleProp<ViewStyle>;
  onPress?: () => void;
  disabled?: boolean;
  activeOpacity?: number;
};

interface CardProps {
  title?: string;
  subtitle?: string;
  children: React.ReactNode;
  headerRight?: React.ReactNode;
  actions?: React.ReactNode;
  style?: StyleProp<ViewStyle>;
  contentStyle?: StyleProp<ViewStyle>;
  titleStyle?: StyleProp<TextStyle>;
  subtitleStyle?: StyleProp<TextStyle>;
  onPress?: () => void;
  disabled?: boolean;
  elevation?: number;
}

export const Card: React.FC<CardProps> = ({
  title,
  subtitle,
  children,
  headerRight,
  actions,
  style,
  contentStyle,
  titleStyle,
  subtitleStyle,
  onPress,
  disabled = false,
  elevation = 1,
}) => {
  const CardContainer: React.FC<CardContainerProps> = ({ children, ...props }) => {
    if (onPress) {
      return <TouchableOpacity {...props}>{children}</TouchableOpacity>;
    }
    return <View {...props}>{children}</View>;
  };

  const renderHeader = () => {
    if (!title && !subtitle && !headerRight) return null;

    return (
      <View style={styles.header}>
        <View style={styles.headerContent}>
          {title && (
            <Text
              style={[styles.title, titleStyle]}
              numberOfLines={1}
            >
              {title}
            </Text>
          )}
          {subtitle && (
            <Text
              style={[styles.subtitle, subtitleStyle]}
              numberOfLines={2}
            >
              {subtitle}
            </Text>
          )}
        </View>
        {headerRight && (
          <View style={styles.headerRight}>
            {headerRight}
          </View>
        )}
      </View>
    );
  };

  const renderActions = () => {
    if (!actions) return null;

    return (
      <View style={styles.actions}>
        {actions}
      </View>
    );
  };

  const containerStyle: StyleProp<ViewStyle> = [
    styles.container,
    Platform.select({
      ios: {
        shadowOpacity: elevation * 0.01,
        shadowRadius: elevation * 2,
        shadowOffset: {
          width: 0,
          height: elevation,
        },
      },
      android: {
        elevation,
      },
    }) as ViewStyle,
    disabled && styles.disabled,
    style,
  ];

  return (
    <CardContainer
      style={containerStyle}
      onPress={onPress}
      disabled={disabled}
      activeOpacity={0.8}
    >
      {renderHeader()}
      <View style={[styles.content, contentStyle]}>
        {children}
      </View>
      {renderActions()}
    </CardContainer>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.background.light,
    borderRadius: BORDER_RADIUS.lg,
    borderWidth: 1,
    borderColor: COLORS.grey[200],
    overflow: 'hidden',
    ...Platform.select({
      ios: {
        shadowColor: COLORS.grey[900],
      },
    }),
  },
  disabled: {
    opacity: 0.6,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: SPACING.lg,
    paddingVertical: SPACING.md,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.grey[200],
  },
  headerContent: {
    flex: 1,
    marginRight: SPACING.md,
  },
  headerRight: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: '600',
    color: COLORS.grey[900],
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 14,
    fontWeight: '400',
    color: COLORS.grey[600],
  },
  content: {
    padding: SPACING.lg,
  },
  actions: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: SPACING.md,
    borderTopWidth: 1,
    borderTopColor: COLORS.grey[200],
    backgroundColor: COLORS.grey[50],
  },
}); 