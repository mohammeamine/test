import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Button } from '../src/components/common/Button';
import { Text } from '../src/components/common/Text';
import { useSpacing, useColors } from '../src/hooks/useTheme';
import { Link } from 'expo-router';

export default function LandingScreen() {
  const colors = useColors();
  const spacing = useSpacing();

  return (
    <View style={[styles.container, { padding: spacing[4] }]}>
      <Text variant="h1" style={[styles.title, { color: colors.primary }]}>
        Welcome
      </Text>
      <Text variant="body" style={[styles.subtitle, { marginVertical: spacing[4] }]}>
        Start your journey with us
      </Text>
      
      <View style={[styles.buttonContainer, { gap: spacing[3] }]}>
        <Link href="/(auth)/sign-up" asChild>
          <Button variant="primary" style={{ alignSelf: 'stretch' }}>
            Create Account
          </Button>
        </Link>
        <Link href="/(auth)/sign-in" asChild>
          <Button variant="secondary" style={{ alignSelf: 'stretch' }}>
            Sign In
          </Button>
        </Link>
        <Link href="/(debug)" asChild>
          <Button variant="ghost" style={{ alignSelf: 'stretch' }}>
            Debug Menu
          </Button>
        </Link>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontWeight: 'bold',
  },
  subtitle: {
    textAlign: 'center',
  },
  buttonContainer: {
    width: '100%',
    marginTop: 20,
  },
});
