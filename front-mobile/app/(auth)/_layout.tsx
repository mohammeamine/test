import React from 'react';
import { Stack } from 'expo-router';
import { NAVIGATION_THEME } from '../../navigation/constants';

export default function AuthLayout() {
  return (
    <Stack
      screenOptions={{
        headerShown: false,
        contentStyle: {
          backgroundColor: NAVIGATION_THEME.colors.background,
        },
      }}
    >
      <Stack.Screen name="login" />
      <Stack.Screen name="signup" />
      <Stack.Screen name="forgot-password" />
      <Stack.Screen name="role-select" />
    </Stack>
  );
}
