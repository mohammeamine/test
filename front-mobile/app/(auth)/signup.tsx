import React, { useState } from 'react';
import {
  View,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
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

export default function SignupScreen() {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const router = useRouter();

  const validateForm = () => {
    if (!formData.fullName.trim()) {
      throw new Error('Please enter your full name');
    }
    if (!formData.email.trim()) {
      throw new Error('Please enter your email');
    }
    if (!/\S+@\S+\.\S+/.test(formData.email)) {
      throw new Error('Please enter a valid email');
    }
    if (!formData.password.trim()) {
      throw new Error('Please enter a password');
    }
    if (formData.password.length < 8) {
      throw new Error('Password must be at least 8 characters long');
    }
    if (formData.password !== formData.confirmPassword) {
      throw new Error('Passwords do not match');
    }
  };

  const handleSignup = async () => {
    try {
      validateForm();
      setError('');
      setLoading(true);
      
      // TODO: Implement actual signup logic here
      await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate API call
      
      router.push('/login');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to sign up');
    } finally {
      setLoading(false);
    }
  };

  const updateFormData = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value,
    }));
    setError('');
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
        <ScrollView 
          style={styles.scrollView}
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
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
                <Ionicons name="person-add-outline" size={48} color={NAVIGATION_THEME.colors.onSurface} />
              </View>
              <Text variant="h1" style={styles.title}>Create Account</Text>
              <Text variant="body" style={styles.subtitle}>
                Sign up to get started with School Management
              </Text>
            </View>

            <Card variant="elevated" style={styles.formCard}>
              <Input
                label="Full Name"
                value={formData.fullName}
                onChangeText={(text) => updateFormData('fullName', text)}
                placeholder="Enter your full name"
                startIcon={<Ionicons name="person-outline" size={20} color={NAVIGATION_THEME.colors.onSurfaceVariant} />}
                error={error}
              />

              <Input
                label="Email Address"
                value={formData.email}
                onChangeText={(text) => updateFormData('email', text)}
                placeholder="Enter your email"
                keyboardType="email-address"
                autoCapitalize="none"
                startIcon={<Ionicons name="mail-outline" size={20} color={NAVIGATION_THEME.colors.onSurfaceVariant} />}
                style={styles.input}
                error={error}
              />

              <Input
                label="Password"
                value={formData.password}
                onChangeText={(text) => updateFormData('password', text)}
                placeholder="Create a password"
                secureTextEntry={!showPassword}
                autoCapitalize="none"
                startIcon={<Ionicons name="lock-closed-outline" size={20} color={NAVIGATION_THEME.colors.onSurfaceVariant} />}
                endIcon={
                  <Pressable onPress={() => setShowPassword(!showPassword)}>
                    <Ionicons
                      name={showPassword ? 'eye-off-outline' : 'eye-outline'}
                      size={20}
                      color={NAVIGATION_THEME.colors.onSurfaceVariant}
                    />
                  </Pressable>
                }
                style={styles.input}
                error={error}
              />

              <Input
                label="Confirm Password"
                value={formData.confirmPassword}
                onChangeText={(text) => updateFormData('confirmPassword', text)}
                placeholder="Confirm your password"
                secureTextEntry={!showConfirmPassword}
                autoCapitalize="none"
                startIcon={<Ionicons name="lock-closed-outline" size={20} color={NAVIGATION_THEME.colors.onSurfaceVariant} />}
                endIcon={
                  <Pressable onPress={() => setShowConfirmPassword(!showConfirmPassword)}>
                    <Ionicons
                      name={showConfirmPassword ? 'eye-off-outline' : 'eye-outline'}
                      size={20}
                      color={NAVIGATION_THEME.colors.onSurfaceVariant}
                    />
                  </Pressable>
                }
                style={styles.input}
                error={error}
              />

              <Button
                title="Sign Up"
                onPress={handleSignup}
                loading={loading}
                style={styles.signupButton}
                size="large"
              />

              <Pressable 
                style={styles.loginLink}
                onPress={() => router.push('/login')}
              >
                <Text variant="body2" style={styles.loginText}>
                  Already have an account? <Text style={styles.loginTextHighlight}>Sign In</Text>
                </Text>
              </Pressable>
            </Card>
          </View>
        </ScrollView>
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
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
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
    marginTop: verticalScale(80),
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
  input: {
    marginTop: verticalScale(16),
  },
  signupButton: {
    marginTop: verticalScale(24),
  },
  loginLink: {
    alignItems: 'center',
    marginTop: verticalScale(16),
  },
  loginText: {
    color: NAVIGATION_THEME.colors.onSurfaceVariant,
  },
  loginTextHighlight: {
    color: NAVIGATION_THEME.colors.onSurface,
    fontWeight: '600',
  },
}); 