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

type FontWeight = '400' | '500' | '600' | '700' | 'normal' | 'bold';

interface EmptyStateProps {
  title: string;
  description?: string;
  icon?: keyof typeof Ionicons.glyphMap;
  illustration?: ImageSourcePropType;
  illustrationStyle?: StyleProp<ImageStyle>;
  primaryAction?: {
    label: string;
    onPress: () => void;
  };
  secondaryAction?: {
    label: string;
    onPress: () => void;
  };
  style?: StyleProp<ViewStyle>;
  titleStyle?: StyleProp<TextStyle>;
  descriptionStyle?: StyleProp<TextStyle>;
}

export const EmptyState: React.FC<EmptyStateProps> = ({
  title,
  description,
  icon,
  illustration,
  illustrationStyle,
  primaryAction,
  secondaryAction,
  style,
  titleStyle,
  descriptionStyle,
}) => {
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

    if (icon) {
      return (
        <View style={styles.iconContainer}>
          <Ionicons
            name={icon}
            size={48}
            color={COLORS.grey[400]}
          />
        </View>
      );
    }

    return null;
  };

  const renderActions = () => {
    if (!primaryAction && !secondaryAction) return null;

    return (
      <View style={styles.actions}>
        {secondaryAction && (
          <Button
            onPress={secondaryAction.onPress}
            variant="outlined"
            color="primary"
            style={styles.secondaryAction}
          >
            {secondaryAction.label}
          </Button>
        )}
        {primaryAction && (
          <Button
            onPress={primaryAction.onPress}
            variant="contained"
            color="primary"
          >
            {primaryAction.label}
          </Button>
        )}
      </View>
    );
  };

  return (
    <View style={[styles.container, style]}>
      {renderIllustration()}
      <Text style={[styles.title, titleStyle]} numberOfLines={2}>
        {title}
      </Text>
      {description && (
        <Text style={[styles.description, descriptionStyle]} numberOfLines={4}>
          {description}
        </Text>
      )}
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
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: COLORS.grey[100],
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
  description: {
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
  secondaryAction: {
    marginRight: SPACING.md,
  },
}); 