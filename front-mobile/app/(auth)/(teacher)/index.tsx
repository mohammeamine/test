import { View, Text } from 'react-native';
import { Stack } from 'expo-router';

export default function TeacherDashboard() {
  return (
    <View className="flex-1 p-4">
      <Stack.Screen options={{ title: 'Teacher Dashboard' }} />
      <Text className="text-xl font-bold">Teacher Dashboard</Text>
    </View>
  );
}
