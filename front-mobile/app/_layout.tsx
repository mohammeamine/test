import '../global.css';
import React from 'react';
import { Stack } from 'expo-router';
import { Platform } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { NavigationProvider } from '../components/navigation/NavigationProvider';
import { DevNavigation } from '../components/DevNavigation';

export default function RootLayout() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <NavigationProvider>
        <Stack screenOptions={{ headerShown: false }}>
          <Stack.Screen name="(app)" />
          <Stack.Screen name="login" />
        </Stack>
        {__DEV__ && <DevNavigation />}
      </NavigationProvider>
    </GestureHandlerRootView>
  );
}
