import React from 'react';
import { Stack } from 'expo-router';
import { useColors } from '../../src/hooks/useTheme';

export default function AdminLayout() {
  const colors = useColors();

  return (
    <Stack
      screenOptions={{
        headerStyle: {
          backgroundColor: colors.background,
        },
        headerTintColor: colors.text,
      }}
    >
      <Stack.Screen
        name="index"
        options={{
          title: 'Admin Dashboard',
        }}
      />
      <Stack.Screen
        name="academic"
        options={{
          title: 'Academic',
        }}
      />
      <Stack.Screen
        name="monitoring"
        options={{
          title: 'Monitoring',
        }}
      />
      <Stack.Screen
        name="users"
        options={{
          title: 'Users',
        }}
      />
      <Stack.Screen
        name="settings"
        options={{
          title: 'Settings',
        }}
      />
    </Stack>
  );
} 