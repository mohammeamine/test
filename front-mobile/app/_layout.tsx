import '../global.css';
import React from 'react';
import { Stack } from 'expo-router';
import { Platform } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { NavigationProvider } from '../components/navigation/NavigationProvider';
import { DevNavigation } from '../components/DevNavigation';
import { NAVIGATION_THEME } from '../navigation/constants';

export default function RootLayout() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <NavigationProvider>
        <Stack
          screenOptions={{
            headerShown: false,
            contentStyle: {
              backgroundColor: NAVIGATION_THEME.colors.background,
            },
          }}
        >
          <Stack.Screen name="index" />
          <Stack.Screen name="(auth)" />
          <Stack.Screen name="(app)" />
        </Stack>
        {__DEV__ && <DevNavigation />}
      </NavigationProvider>
    </GestureHandlerRootView>
  );
}
