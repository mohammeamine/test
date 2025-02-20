import { View, Text } from 'react-native';
import { Stack } from 'expo-router';

export default function AdminDashboard() {
  return (
    <View className="flex-1 p-4">
      <Stack.Screen options={{ title: 'Admin Dashboard' }} />
      <Text className="text-xl font-bold">Admin Dashboard</Text>
    </View>
  );
}
