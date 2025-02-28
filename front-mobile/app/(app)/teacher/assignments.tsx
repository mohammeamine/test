import React from 'react';
import { ScrollView, View, StyleSheet } from 'react-native';
import { Text } from '../../../components/ui/Text';
import { scale, verticalScale } from '../../../utils/responsive';

export default function TeacherAssignments() {
  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text variant="h1" style={styles.title}>Assignments</Text>
        <Text variant="body" style={styles.subtitle}>
          Manage student assignments
        </Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    padding: scale(16),
    backgroundColor: 'white',
    borderBottomWidth: 1,
    borderBottomColor: '#e5e7eb',
  },
  title: {
    fontSize: scale(24),
    fontWeight: 'bold',
    color: '#1f2937',
  },
  subtitle: {
    fontSize: scale(14),
    color: '#6b7280',
    marginTop: verticalScale(4),
  },
}); 