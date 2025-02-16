import React, { useState } from 'react';
import { View, StyleSheet, KeyboardAvoidingView, Platform } from 'react-native';
import { Link } from 'expo-router';
import { Text } from '../../src/components/common/Text';
import { Button } from '../../src/components/common/Button';
import { TextInput } from '../../src/components/forms/TextInput';
import { useColors, useSpacing } from '../../src/hooks/useTheme';

export default function SignInScreen() {
  const colors = useColors();
  const spacing = useSpacing();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSignIn = async () => {
    if (!email || !password) {
      setError('Please fill in all fields');
      return;
    }

    setError('');
    setLoading(true);

    try {
      // TODO: Implement sign in logic
      await new Promise(resolve => setTimeout(resolve, 1000));
    } catch (err) {
      setError('Invalid email or password');
    } finally {
      setLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}
    >
      <View
        style={[
          styles.content,
          {
            padding: spacing[6],
            backgroundColor: colors.background,
          },
        ]}
      >
        <View style={styles.header}>
          <Text variant="h1" style={styles.title}>
            Welcome Back
          </Text>
          <Text variant="body" color="textSecondary" style={styles.subtitle}>
            Sign in to your account to continue
          </Text>
        </View>

        <View style={styles.form}>
          <TextInput
            label="Email"
            placeholder="Enter your email"
            value={email}
            onChangeText={setEmail}
            autoCapitalize="none"
            keyboardType="email-address"
            error={error}
          />

          <View style={styles.spacing} />

          <TextInput
            label="Password"
            placeholder="Enter your password"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
            error={error}
          />

          <Link href="./forgot-password" asChild>
            <Button
              variant="ghost"
              style={styles.forgotPassword}
            >
              Forgot Password?
            </Button>
          </Link>

          <Button
            onPress={handleSignIn}
            loading={loading}
            disabled={loading}
            style={styles.signInButton}
          >
            Sign In
          </Button>
        </View>

        <View style={styles.footer}>
          <Text variant="body" color="textSecondary">
            Don't have an account?{' '}
          </Text>
          <Link href="./sign-up" asChild>
            <Button variant="ghost">Sign Up</Button>
          </Link>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
  },
  header: {
    alignItems: 'center',
    marginBottom: 32,
  },
  title: {
    marginBottom: 8,
  },
  subtitle: {
    textAlign: 'center',
  },
  form: {
    width: '100%',
  },
  spacing: {
    height: 16,
  },
  forgotPassword: {
    alignSelf: 'flex-end',
    marginTop: 8,
    marginBottom: 24,
  },
  signInButton: {
    width: '100%',
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 32,
  },
}); 