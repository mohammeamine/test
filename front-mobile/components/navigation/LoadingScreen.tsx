import React from 'react';
import { View, ActivityIndicator, StyleSheet } from 'react-native';
import { Text } from '../ui/Text';
import { NAVIGATION_THEME } from '../../navigation/constants';
import { scale } from '../../utils/responsive';

interface LoadingScreenProps {
  message?: string;
}

export const LoadingScreen: React.FC<LoadingScreenProps> = ({ 
  message = 'Loading...'
}) => {
  return (
    <View style={styles.container}>
      <ActivityIndicator size="large" color={NAVIGATION_THEME.colors.text} />
      <Text style={styles.message}>{message}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: NAVIGATION_THEME.colors.background,
  },
  message: {
    marginTop: NAVIGATION_THEME.spacing.md,
    fontSize: scale(16),
    color: NAVIGATION_THEME.colors.text,
  },
}); 