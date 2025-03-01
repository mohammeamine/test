import React from 'react';
import { View, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { Stack } from 'expo-router';
import { Text } from '../../../components/ui/Text';
import { Ionicons } from '@expo/vector-icons';

const PLACEHOLDER_DOCUMENTS = [
  {
    id: '1',
    title: 'School Calendar',
    type: 'PDF',
    date: '2024-03-15',
  },
  {
    id: '2',
    title: 'Course Materials',
    type: 'DOC',
    date: '2024-03-14',
  },
  {
    id: '3',
    title: 'Assignment Guidelines',
    type: 'PDF',
    date: '2024-03-13',
  },
  {
    id: '4',
    title: 'Student Handbook',
    type: 'PDF',
    date: '2024-03-12',
  },
];

export default function DocumentsScreen() {
  return (
    <View style={styles.container}>
      <Stack.Screen options={{ title: 'Documents' }} />
      
      <View style={styles.header}>
        <Text style={styles.headerText}>My Documents</Text>
        <TouchableOpacity style={styles.uploadButton}>
          <Ionicons name="cloud-upload-outline" size={24} color="white" />
          <Text style={styles.uploadButtonText}>Upload</Text>
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.content}>
        {PLACEHOLDER_DOCUMENTS.map((doc) => (
          <TouchableOpacity key={doc.id} style={styles.documentCard}>
            <View style={styles.documentIcon}>
              <Ionicons 
                name={doc.type === 'PDF' ? 'document-text' : 'document'} 
                size={24} 
                color="#666"
              />
            </View>
            <View style={styles.documentInfo}>
              <Text style={styles.documentTitle}>{doc.title}</Text>
              <Text style={styles.documentMeta}>
                {doc.type} • {doc.date}
              </Text>
            </View>
            <TouchableOpacity style={styles.downloadButton}>
              <Ionicons name="download-outline" size={24} color="#0066cc" />
            </TouchableOpacity>
          </TouchableOpacity>
        ))}
      </ScrollView>

      <View style={styles.footer}>
        <Text style={styles.footerText}>
          Backend integration coming soon...
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    backgroundColor: 'white',
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  headerText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
  },
  uploadButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#0066cc',
    padding: 8,
    paddingHorizontal: 16,
    borderRadius: 8,
  },
  uploadButtonText: {
    color: 'white',
    marginLeft: 8,
    fontWeight: '600',
  },
  content: {
    flex: 1,
    padding: 16,
  },
  documentCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    padding: 16,
    borderRadius: 8,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
  },
  documentIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#f0f0f0',
    justifyContent: 'center',
    alignItems: 'center',
  },
  documentInfo: {
    flex: 1,
    marginLeft: 12,
  },
  documentTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 4,
  },
  documentMeta: {
    fontSize: 14,
    color: '#666',
  },
  downloadButton: {
    padding: 8,
  },
  footer: {
    padding: 16,
    alignItems: 'center',
    backgroundColor: '#fff3cd',
  },
  footerText: {
    color: '#856404',
    fontSize: 14,
  },
}); 