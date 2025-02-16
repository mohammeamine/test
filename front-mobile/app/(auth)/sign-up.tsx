import React, { useState } from 'react';
import { View, StyleSheet, KeyboardAvoidingView, Platform, ScrollView } from 'react-native';
import { Link, router } from 'expo-router';
import { Text } from '../../src/components/common/Text';
import { Button } from '../../src/components/common/Button';
import { TextInput } from '../../src/components/forms/TextInput';
import { useColors, useSpacing } from '../../src/hooks/useTheme';

export default function SignUpScreen() {
  const colors = useColors();
  const spacing = useSpacing();
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSignUp = async () => {
    if (!firstName || !lastName || !email || !password || !confirmPassword) {
      setError('Please fill in all fields');
      return;
    }

    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    setError('');
    setLoading(true);

    try {
      // TODO: Implement sign up logic
      await new Promise(resolve => setTimeout(resolve, 1000));
      router.replace('./(auth)/sign-in');
    } catch (err) {
      setError('Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}
    >
      <ScrollView
        contentContainerStyle={[
          styles.content,
          {
            padding: spacing[6],
            backgroundColor: colors.background,
          },
        ]}
      >
        <View style={styles.header}>
          <Text variant="h1" style={styles.title}>
            Create Account
          </Text>
          <Text variant="body" color="textSecondary" style={styles.subtitle}>
            Sign up to get started
          </Text>
        </View>

        <View style={styles.form}>
          <View style={styles.nameContainer}>
            <View style={styles.nameInput}>
              <TextInput
                label="First Name"
                placeholder="Enter your first name"
                value={firstName}
                onChangeText={setFirstName}
                error={error}
              />
            </View>
            <View style={styles.nameSpacing} />
            <View style={styles.nameInput}>
              <TextInput
                label="Last Name"
                placeholder="Enter your last name"
                value={lastName}
                onChangeText={setLastName}
                error={error}
              />
            </View>
          </View>

          <View style={styles.spacing} />

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

          <View style={styles.spacing} />

          <TextInput
            label="Confirm Password"
            placeholder="Confirm your password"
            value={confirmPassword}
            onChangeText={setConfirmPassword}
            secureTextEntry
            error={error}
          />

          <Button
            onPress={handleSignUp}
            loading={loading}
            disabled={loading}
            style={styles.signUpButton}
          >
            Sign Up
          </Button>
        </View>

        <View style={styles.footer}>
          <Text variant="body" color="textSecondary">
            Already have an account?{' '}
          </Text>
          <Link href="./sign-in" asChild>
            <Button variant="ghost">Sign In</Button>
          </Link>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flexGrow: 1,
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
  nameContainer: {
    flexDirection: 'row',
    width: '100%',
  },
  nameInput: {
    flex: 1,
  },
  nameSpacing: {
    width: 16,
  },
  spacing: {
    height: 16,
  },
  signUpButton: {
    width: '100%',
    marginTop: 24,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 32,
  },
}); 