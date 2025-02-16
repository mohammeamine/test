import React, { useState } from 'react';
import { View, StyleSheet, KeyboardAvoidingView, Platform } from 'react-native';
import { Link, router } from 'expo-router';
import { Text } from '../../src/components/common/Text';
import { Button } from '../../src/components/common/Button';
import { TextInput } from '../../src/components/forms/TextInput';
import { useColors, useSpacing } from '../../src/hooks/useTheme';

export default function ForgotPasswordScreen() {
  const colors = useColors();
  const spacing = useSpacing();
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const handleResetPassword = async () => {
    if (!email) {
      setError('Please enter your email');
      return;
    }

    setError('');
    setLoading(true);

    try {
      // TODO: Implement password reset logic
      await new Promise(resolve => setTimeout(resolve, 1000));
      setSuccess(true);
    } catch (err) {
      setError('Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <View
        style={[
          styles.container,
          {
            padding: spacing[6],
            backgroundColor: colors.background,
          },
        ]}
      >
        <View style={styles.successContent}>
          <Text variant="h2" style={styles.title}>
            Check Your Email
          </Text>
          <Text variant="body" color="textSecondary" style={styles.subtitle}>
            We've sent password reset instructions to your email address.
          </Text>
          <Button
            onPress={() => router.back()}
            style={styles.backButton}
          >
            Back to Sign In
          </Button>
        </View>
      </View>
    );
  }

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
            Forgot Password?
          </Text>
          <Text variant="body" color="textSecondary" style={styles.subtitle}>
            Enter your email to reset your password
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

          <Button
            onPress={handleResetPassword}
            loading={loading}
            disabled={loading}
            style={styles.resetButton}
          >
            Reset Password
          </Button>
        </View>

        <View style={styles.footer}>
          <Text variant="body" color="textSecondary">
            Remember your password?{' '}
          </Text>
          <Link href="./sign-in" asChild>
            <Button variant="ghost">Sign In</Button>
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
  successContent: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
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
  resetButton: {
    width: '100%',
    marginTop: 24,
  },
  backButton: {
    marginTop: 24,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 32,
  },
}); 