import React from 'react';
import { Stack } from 'expo-router';

export default function DebugLayout() {
  return (
    <Stack
      screenOptions={{
        headerShown: true,
        headerBackTitle: 'Back',
      }}
    >
      <Stack.Screen
        name="index"
        options={{
          title: 'Debug Menu',
        }}
      />
    </Stack>
  );
} 