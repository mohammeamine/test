import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ViewStyle,
  TextStyle,
  StyleProp,
  Image,
  ImageSourcePropType,
  ImageStyle,
} from 'react-native';
import { COLORS, TYPOGRAPHY, SPACING } from '../../theme';
import { Button } from './Button';
import { Ionicons } from '@expo/vector-icons';

type ErrorType = 'network' | 'server' | 'notFound' | 'permission' | 'generic';
type FontWeight = '400' | '500' | '600' | '700' | 'normal' | 'bold';

interface ErrorStateProps {
  type?: ErrorType;
  title?: string;
  message?: string;
  illustration?: ImageSourcePropType;
  illustrationStyle?: StyleProp<ImageStyle>;
  onRetry?: () => void;
  retryLabel?: string;
  onAction?: () => void;
  actionLabel?: string;
  style?: StyleProp<ViewStyle>;
  titleStyle?: StyleProp<TextStyle>;
  messageStyle?: StyleProp<TextStyle>;
}

export const ErrorState: React.FC<ErrorStateProps> = ({
  type = 'generic',
  title,
  message,
  illustration,
  illustrationStyle,
  onRetry,
  retryLabel = 'Try Again',
  onAction,
  actionLabel,
  style,
  titleStyle,
  messageStyle,
}) => {
  const getDefaultContent = (): { title: string; message: string; icon: keyof typeof Ionicons.glyphMap } => {
    switch (type) {
      case 'network':
        return {
          title: 'No Internet Connection',
          message: 'Please check your internet connection and try again.',
          icon: 'cloud-offline',
        };
      case 'server':
        return {
          title: 'Server Error',
          message: 'Something went wrong on our end. Please try again later.',
          icon: 'server-outline',
        };
      case 'notFound':
        return {
          title: 'Not Found',
          message: 'The requested resource could not be found.',
          icon: 'search',
        };
      case 'permission':
        return {
          title: 'Access Denied',
          message: 'You don\'t have permission to access this resource.',
          icon: 'lock-closed',
        };
      default:
        return {
          title: 'Something Went Wrong',
          message: 'An unexpected error occurred. Please try again.',
          icon: 'alert-circle',
        };
    }
  };

  const defaultContent = getDefaultContent();
  const displayTitle = title || defaultContent.title;
  const displayMessage = message || defaultContent.message;

  const renderIllustration = () => {
    if (illustration) {
      return (
        <Image
          source={illustration}
          style={[styles.illustration, illustrationStyle]}
          resizeMode="contain"
        />
      );
    }

    return (
      <View style={styles.iconContainer}>
        <Ionicons
          name={defaultContent.icon}
          size={64}
          color={COLORS.error.main}
        />
      </View>
    );
  };

  const renderActions = () => {
    if (!onRetry && !onAction) return null;

    return (
      <View style={styles.actions}>
        {onAction && actionLabel && (
          <Button
            onPress={onAction}
            variant="outlined"
            color="primary"
            style={styles.actionButton}
          >
            {actionLabel}
          </Button>
        )}
        {onRetry && (
          <Button
            onPress={onRetry}
            variant="contained"
            color="primary"
            startIcon="refresh"
          >
            {retryLabel}
          </Button>
        )}
      </View>
    );
  };

  return (
    <View style={[styles.container, style]}>
      {renderIllustration()}
      <Text
        style={[
          styles.title,
          titleStyle,
        ]}
        numberOfLines={2}
      >
        {displayTitle}
      </Text>
      <Text
        style={[
          styles.message,
          messageStyle,
        ]}
        numberOfLines={4}
      >
        {displayMessage}
      </Text>
      {renderActions()}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: SPACING.xl,
  },
  illustration: {
    width: 200,
    height: 200,
    marginBottom: SPACING.lg,
  } as ImageStyle,
  iconContainer: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: COLORS.error.light,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: SPACING.lg,
  },
  title: {
    fontSize: TYPOGRAPHY.h4.fontSize,
    fontWeight: TYPOGRAPHY.h4.fontWeight as FontWeight,
    lineHeight: TYPOGRAPHY.h4.lineHeight,
    letterSpacing: TYPOGRAPHY.h4.letterSpacing,
    color: COLORS.grey[900],
    textAlign: 'center',
    marginBottom: SPACING.sm,
  },
  message: {
    fontSize: TYPOGRAPHY.body2.fontSize,
    fontWeight: TYPOGRAPHY.body2.fontWeight as FontWeight,
    lineHeight: TYPOGRAPHY.body2.lineHeight,
    letterSpacing: TYPOGRAPHY.body2.letterSpacing,
    color: COLORS.grey[600],
    textAlign: 'center',
    marginBottom: SPACING.lg,
  },
  actions: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: SPACING.md,
  },
  actionButton: {
    marginRight: SPACING.md,
  },
}); 