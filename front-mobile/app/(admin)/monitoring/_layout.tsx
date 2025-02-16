import React from 'react';
import { Stack } from 'expo-router';
import { useColors } from '../../../src/hooks/useTheme';

export default function MonitoringLayout() {
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
          title: 'Monitoring',
        }}
      />
      <Stack.Screen
        name="schedule"
        options={{
          title: 'Schedule',
        }}
      />
      <Stack.Screen
        name="attendance"
        options={{
          title: 'Attendance',
        }}
      />
    </Stack>
  );
} 