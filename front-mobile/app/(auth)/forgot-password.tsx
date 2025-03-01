import React, { useState } from 'react';
import {
  View,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  Pressable,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import { Text } from '../../components/ui/Text';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Input } from '../../components/ui/Input';
import { scale, verticalScale } from '../../utils/responsive';
import { NAVIGATION_THEME } from '../../navigation/constants';
import { Ionicons } from '@expo/vector-icons';

export default function ForgotPasswordScreen() {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const router = useRouter();

  const handleResetPassword = async () => {
    try {
      if (!email.trim()) {
        throw new Error('Please enter your email');
      }
      if (!/\S+@\S+\.\S+/.test(email)) {
        throw new Error('Please enter a valid email');
      }

      setError('');
      setLoading(true);
      
      // TODO: Implement actual password reset logic here
      await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate API call
      
      setSuccess(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to send reset link');
    } finally {
      setLoading(false);
    }
  };

  return (
    <LinearGradient
      colors={[NAVIGATION_THEME.colors.surface, NAVIGATION_THEME.colors.surfaceVariant]}
      style={styles.background}
    >
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.container}
      >
        <View style={styles.content}>
          <Pressable
            style={styles.backButton}
            onPress={() => router.back()}
          >
            <Ionicons
              name="arrow-back"
              size={24}
              color={NAVIGATION_THEME.colors.onSurface}
            />
          </Pressable>

          <View style={styles.header}>
            <View style={styles.iconContainer}>
              <Ionicons name="key-outline" size={48} color={NAVIGATION_THEME.colors.onSurface} />
            </View>
            <Text variant="h1" style={styles.title}>Reset Password</Text>
            <Text variant="body" style={styles.subtitle}>
              Enter your email address and we'll send you instructions to reset your password
            </Text>
          </View>

          <Card variant="elevated" style={styles.formCard}>
            {success ? (
              <View style={styles.successContainer}>
                <View style={styles.successIcon}>
                  <Ionicons
                    name="checkmark-circle-outline"
                    size={64}
                    color={NAVIGATION_THEME.colors.onSurface}
                  />
                </View>
                <Text variant="h3" style={styles.successTitle}>
                  Check Your Email
                </Text>
                <Text variant="body" style={styles.successText}>
                  We've sent password reset instructions to your email address
                </Text>
                <Button
                  title="Back to Login"
                  onPress={() => router.push('/login')}
                  style={styles.backToLoginButton}
                  size="large"
                />
              </View>
            ) : (
              <>
                <Input
                  label="Email Address"
                  value={email}
                  onChangeText={text => {
                    setEmail(text);
                    setError('');
                  }}
                  placeholder="Enter your email"
                  keyboardType="email-address"
                  autoCapitalize="none"
                  startIcon={<Ionicons name="mail-outline" size={20} color={NAVIGATION_THEME.colors.onSurfaceVariant} />}
                  error={error}
                />

                <Button
                  title="Send Reset Link"
                  onPress={handleResetPassword}
                  loading={loading}
                  style={styles.resetButton}
                  size="large"
                />

                <View style={styles.footer}>
                  <Text variant="body2" style={styles.footerText}>
                    Remember your password?
                  </Text>
                  <Pressable onPress={() => router.push('/login')}>
                    <Text variant="body2" style={styles.loginLink}>
                      Sign In
                    </Text>
                  </Pressable>
                </View>
              </>
            )}
          </Card>
        </View>
      </KeyboardAvoidingView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
  },
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
    padding: scale(24),
    justifyContent: 'center',
  },
  backButton: {
    position: 'absolute',
    top: scale(48),
    left: scale(24),
    zIndex: 1,
  },
  header: {
    alignItems: 'center',
    marginBottom: verticalScale(32),
  },
  iconContainer: {
    width: scale(80),
    height: scale(80),
    borderRadius: scale(40),
    backgroundColor: NAVIGATION_THEME.colors.surfaceVariant,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: verticalScale(16),
  },
  title: {
    color: NAVIGATION_THEME.colors.onSurface,
    marginBottom: verticalScale(8),
    textAlign: 'center',
  },
  subtitle: {
    color: NAVIGATION_THEME.colors.onSurfaceVariant,
    textAlign: 'center',
  },
  formCard: {
    padding: scale(24),
    borderRadius: scale(16),
  },
  resetButton: {
    marginTop: verticalScale(24),
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: verticalScale(16),
  },
  footerText: {
    color: NAVIGATION_THEME.colors.onSurfaceVariant,
  },
  loginLink: {
    color: NAVIGATION_THEME.colors.onSurface,
    fontWeight: '600',
    marginLeft: scale(4),
  },
  successContainer: {
    alignItems: 'center',
    padding: scale(16),
  },
  successIcon: {
    marginBottom: verticalScale(16),
  },
  successTitle: {
    color: NAVIGATION_THEME.colors.onSurface,
    marginBottom: verticalScale(8),
    textAlign: 'center',
  },
  successText: {
    color: NAVIGATION_THEME.colors.onSurfaceVariant,
    textAlign: 'center',
    marginBottom: verticalScale(24),
  },
  backToLoginButton: {
    minWidth: '100%',
  },
});
