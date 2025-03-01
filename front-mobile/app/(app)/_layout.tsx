import React from 'react';
import { Stack } from 'expo-router';
import { NAVIGATION_GROUPS, NAVIGATION_THEME } from '../../navigation/constants';
import { NavigationErrorBoundary } from '../../components/navigation/NavigationErrorBoundary';
import { RoleType } from '../../navigation/types';

export default function AppLayout() {
  return (
    <NavigationErrorBoundary>
      <Stack
        screenOptions={{
          headerShown: false,
          contentStyle: {
            backgroundColor: NAVIGATION_THEME.colors.background,
          },
        }}
      >
        {/* Role-based routes */}
        {(Object.keys(NAVIGATION_GROUPS) as RoleType[]).map((role) => (
          <Stack.Screen
            key={role}
            name={role}
            options={{
              headerShown: false,
            }}
          />
        ))}
      </Stack>
    </NavigationErrorBoundary>
  );
} 