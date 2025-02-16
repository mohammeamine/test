import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Button } from '../components/common/Button';
import { Text } from '../components/common/Text';
import { useSpacing, useColors } from '../hooks/useTheme';

export function LandingScreen({ navigation }: { navigation: any }) {
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
        <Button
          variant="primary"
          onPress={() => navigation.navigate('SignUp')}
          style={{ alignSelf: 'stretch' }}
        >
          Create Account
        </Button>
        <Button
          variant="secondary"
          onPress={() => navigation.navigate('SignIn')}
          style={{ alignSelf: 'stretch' }}
        >
          Sign In
        </Button>
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