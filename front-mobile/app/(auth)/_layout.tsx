import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useColors } from '../../src/hooks/useTheme';

export default function AuthLayout() {
  const colors = useColors();

  return (
    <>
      <StatusBar style="dark" />
      <Stack
        screenOptions={{
          headerShown: false,
          contentStyle: { backgroundColor: colors.background },
          animation: 'fade',
        }}
      >
        <Stack.Screen
          name="sign-in"
          options={{
            title: 'Sign In',
          }}
        />
        <Stack.Screen
          name="sign-up"
          options={{
            title: 'Sign Up',
          }}
        />
        <Stack.Screen
          name="forgot-password"
          options={{
            title: 'Forgot Password',
          }}
        />
      </Stack>
    </>
  );
} 