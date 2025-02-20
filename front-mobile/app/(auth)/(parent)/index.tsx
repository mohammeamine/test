import { View, Text } from 'react-native';
import { Stack } from 'expo-router';

export default function ParentDashboard() {
  return (
    <View className="flex-1 p-4">
      <Stack.Screen options={{ title: 'Parent Dashboard' }} />
      <Text className="text-xl font-bold">Parent Dashboard</Text>
    </View>
  );
}
