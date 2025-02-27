import React from 'react';
import { View, StyleSheet, Platform } from 'react-native';
import { NAVIGATION_THEME } from '../../navigation/constants';
import { scale } from '../../utils/responsive';

interface CardProps {
  children: React.ReactNode;
  style?: any;
  variant?: 'elevated' | 'outlined' | 'filled';
}

export const Card: React.FC<CardProps> = ({ 
  children, 
  style,
  variant = 'elevated' 
}) => {
  return (
    <View style={[
      styles.card,
      variant === 'elevated' && styles.elevatedCard,
      variant === 'outlined' && styles.outlinedCard,
      variant === 'filled' && styles.filledCard,
      style
    ]}>
      {children}
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    borderRadius: scale(16),
    backgroundColor: NAVIGATION_THEME.colors.surface,
    overflow: 'hidden',
  },
  elevatedCard: {
    ...Platform.select({
      ios: {
        shadowColor: NAVIGATION_THEME.colors.shadow,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 8,
      },
      android: {
        elevation: 3,
      },
    }),
  },
  outlinedCard: {
    borderWidth: 1,
    borderColor: NAVIGATION_THEME.colors.outline,
  },
  filledCard: {
    backgroundColor: NAVIGATION_THEME.colors.surfaceVariant,
  },
});
