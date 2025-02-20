import React, { useState } from 'react';
import { View, StyleSheet, KeyboardAvoidingView, Platform } from 'react-native';
import { useRouter, Link } from 'expo-router';
import { Text } from '../../components/ui/Text';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { TextInput } from '../../components/forms/TextInput';
import { scale, verticalScale } from '../../utils/responsive';
import { colors } from '../../theme/colors';

export default function LoginScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const router = useRouter();

  const handleLogin = async () => {
    try {
      setError('');
      setLoading(true);
      
      // Basic validation
      if (!email.trim()) {
        throw new Error('Please enter your email');
      }
      if (!password.trim()) {
        throw new Error('Please enter your password');
      }
      
      // TODO: Implement actual login logic here
      await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate API call
      
      router.replace('/admin/dashboard');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  const handleForgotPassword = () => {
    router.push('/forgot-password');
  };

  const handleSignup = () => {
    router.push('/signup');
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}
    >
      <View style={styles.content}>
        <Text style={styles.title}>Welcome Back</Text>
        <Text style={styles.subtitle}>Sign in to continue</Text>

        <Card style={styles.formCard}>
          <TextInput
            label="Email"
            defaultValue={email}
            onChangeText={text => {
              setEmail(text);
              setError('');
            }}
            placeholder="Enter your email"
            keyboardType="email-address"
            autoCapitalize="none"
            leftIcon="mail-outline"
            error={error}
            accessibilityLabel="Email input"
          />

          <TextInput
            label="Password"
            defaultValue={password}
            onChangeText={text => {
              setPassword(text);
              setError('');
            }}
            placeholder="Enter your password"
            secureTextEntry
            leftIcon="lock-closed-outline"
            containerStyle={{ marginBottom: 24 }}
            error={error}
            accessibilityLabel="Password input"
          />

          <Button
            title="Forgot Password?"
            variant="secondary"
            style={styles.forgotButton}
            onPress={handleForgotPassword}
          />

          <Button
            title="Sign In"
            onPress={handleLogin}
            loading={loading}
            style={styles.loginButton}
          />

          <Button
            title="Create New Account"
            variant="outline"
            style={styles.signupButton}
            onPress={handleSignup}
          />
        </Card>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background.default,
  },
  content: {
    flex: 1,
    padding: 24,
    justifyContent: 'center',
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: colors.text.primary,
    textAlign: 'center',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: colors.text.secondary,
    textAlign: 'center',
    marginBottom: 32,
  },
  formCard: {
    padding: 24,
    borderRadius: 16,
  },
  loginButton: {
    marginTop: 8,
  },
  forgotButton: {
    marginBottom: 16,
  },
  signupButton: {
    marginTop: 16,
  },
});