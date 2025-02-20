import { View, Text } from 'react-native';
import { Stack } from 'expo-router';

export default function StudentDashboard() {
  return (
    <View className="flex-1 p-4">
      <Stack.Screen options={{ title: 'Student Dashboard' }} />
      <Text className="text-xl font-bold">Student Dashboard</Text>
    </View>
  );
}
