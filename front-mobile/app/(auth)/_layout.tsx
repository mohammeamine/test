import React from 'react';
import { Stack } from 'expo-router';

export default function AuthLayout() {
  return (
    <Stack
      screenOptions={{
        headerShown: false,
        animation: 'fade',
      }}
    >
      <Stack.Screen 
        name="index"
        options={{
          title: 'Login'
        }}
      />
      <Stack.Screen 
        name="signup"
        options={{
          title: 'Sign Up'
        }}
      />
      <Stack.Screen 
        name="forgot-password"
        options={{
          title: 'Forgot Password'
        }}
      />
    </Stack>
  );
}
