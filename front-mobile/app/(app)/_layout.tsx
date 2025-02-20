import { Stack } from 'expo-router';

export default function AppLayout() {
  return (
    <Stack
      screenOptions={{
        headerStyle: {
          backgroundColor: '#f5f5f5',
        },
        headerTintColor: '#000',
        headerTitleStyle: {
          fontWeight: 'bold',
        },
      }}
    >
      <Stack.Screen
        name="admin/dashboard"
        options={{
          title: 'Admin Dashboard',
        }}
      />
      <Stack.Screen
        name="teacher/dashboard"
        options={{
          title: 'Teacher Dashboard',
        }}
      />
      <Stack.Screen
        name="student/dashboard"
        options={{
          title: 'Student Dashboard',
        }}
      />
      <Stack.Screen
        name="parent/dashboard"
        options={{
          title: 'Parent Dashboard',
        }}
      />
    </Stack>
  );
} 