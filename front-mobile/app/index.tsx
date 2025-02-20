import { useEffect } from 'react';
import { Redirect } from 'expo-router';

// Keep the splash screen visible while we check authentication
// SplashScreen.preventAutoHideAsync();

export default function Index() {
  return <Redirect href="/login" />;
}
