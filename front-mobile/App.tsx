import { Stack } from 'expo-router';
import { useEffect } from 'react';
import { LogBox } from 'react-native';

// Ignore specific LogBox warnings
LogBox.ignoreLogs([
  'Warning: Failed prop type',
  'Non-serializable values were found in the navigation state',
]);

export default function App() {
  useEffect(() => {
    // Add any app initialization logic here
  }, []);

  return (
    <Stack
      screenOptions={{
        headerStyle: {
          backgroundColor: '#f4511e',
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
          fontWeight: 'bold',
        },
      }}
    />
  );
}
