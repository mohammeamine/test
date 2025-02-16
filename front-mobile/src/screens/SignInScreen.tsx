import React, { useState } from 'react';
import { View, StyleSheet, TextInput, Pressable } from 'react-native';
import { Text } from '../components/common/Text';
import { Button } from '../components/common/Button';
import { useColors, useSpacing } from '../hooks/useTheme';
import { Link } from 'expo-router';
import { Icon } from '@roninoss/icons';

export function SignInScreen() {
  const colors = useColors();
  const spacing = useSpacing();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSignIn = async () => {
    setIsLoading(true);
    // TODO: Implement sign in logic
    setTimeout(() => setIsLoading(false), 1000);
  };

  return (
    <View style={[styles.container, { padding: spacing[4] }]}>
      <View style={styles.header}>
        <Text variant="h1" style={[styles.title, { color: colors.primary }]}>
          Welcome Back
        </Text>
        <Text variant="body" style={{ color: colors.textSecondary }}>
          Sign in to continue to your account
        </Text>
      </View>

      <View style={[styles.form, { gap: spacing[4] }]}>
        <View>
          <Text variant="caption" style={{ color: colors.textSecondary, marginBottom: spacing[1] }}>
            Email
          </Text>
          <View style={[styles.inputContainer, { backgroundColor: colors.surface, borderRadius: 8 }]}>
            <Icon name="mail" size={20} color={colors.textSecondary} />
            <TextInput
              placeholder="Enter your email"
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              autoCapitalize="none"
              style={[styles.input, { color: colors.text }]}
              placeholderTextColor={colors.textSecondary}
            />
          </View>
        </View>

        <View>
          <Text variant="caption" style={{ color: colors.textSecondary, marginBottom: spacing[1] }}>
            Password
          </Text>
          <View style={[styles.inputContainer, { backgroundColor: colors.surface, borderRadius: 8 }]}>
            <Icon name="lock" size={20} color={colors.textSecondary} />
            <TextInput
              placeholder="Enter your password"
              value={password}
              onChangeText={setPassword}
              secureTextEntry={!showPassword}
              style={[styles.input, { color: colors.text }]}
              placeholderTextColor={colors.textSecondary}
            />
            <Pressable onPress={() => setShowPassword(!showPassword)}>
              <Icon 
                name={showPassword ? "eye-off" : "eye"} 
                size={20} 
                color={colors.textSecondary} 
              />
            </Pressable>
          </View>
        </View>

        <Link href="/forgot-password" asChild>
          <Pressable>
            <Text 
              variant="caption" 
              style={[styles.forgotPassword, { color: colors.primary }]}
            >
              Forgot password?
            </Text>
          </Pressable>
        </Link>

        <Button
          variant="primary"
          onPress={handleSignIn}
          loading={isLoading}
          style={{ marginTop: spacing[2] }}
        >
          Sign In
        </Button>
      </View>

      <View style={[styles.footer, { marginTop: spacing[6] }]}>
        <Text variant="body" style={{ color: colors.textSecondary }}>
          Don't have an account?{' '}
        </Text>
        <Link href="/sign-up" asChild>
          <Pressable>
            <Text variant="body" style={{ color: colors.primary }}>
              Sign Up
            </Text>
          </Pressable>
        </Link>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    marginBottom: 32,
  },
  title: {
    marginBottom: 8,
  },
  form: {
    width: '100%',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
  input: {
    flex: 1,
    marginLeft: 8,
    fontSize: 16,
    height: 40,
  },
  forgotPassword: {
    textAlign: 'right',
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
}); 