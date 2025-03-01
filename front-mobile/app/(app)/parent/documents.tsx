import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Stack } from 'expo-router';
import { DocumentList } from '../../../components/documents/DocumentList';

export default function DocumentsScreen() {
  return (
    <View style={styles.container}>
      <Stack.Screen options={{ title: 'Documents' }} />
      <DocumentList showActions={false} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
}); 