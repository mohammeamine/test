import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { Stack } from 'expo-router';
import { TouchableOpacity } from 'react-native';
import { Plus, X } from 'lucide-react-native';
import { DocumentList } from '../../../components/documents/DocumentList';
import { DocumentUpload } from '../../../components/documents/DocumentUpload';
import { DocumentViewer } from '../../../components/documents/DocumentViewer';
import { Document } from '../../../services/document';

export default function DocumentsScreen() {
  const [showUpload, setShowUpload] = useState(false);
  const [selectedDocument, setSelectedDocument] = useState<Document | null>(null);

  const handleDocumentSelect = (document: Document) => {
    setSelectedDocument(document);
  };

  const handleUploadComplete = () => {
    setShowUpload(false);
  };

  return (
    <View style={styles.container}>
      <Stack.Screen
        options={{
          title: 'Documents',
          headerRight: () => (
            <TouchableOpacity
              onPress={() => setShowUpload(!showUpload)}
              style={styles.headerButton}
            >
              {showUpload ? (
                <X size={24} color="#666" />
              ) : (
                <Plus size={24} color="#666" />
              )}
            </TouchableOpacity>
          ),
        }}
      />

      {showUpload ? (
        <DocumentUpload onUploadComplete={handleUploadComplete} />
      ) : selectedDocument ? (
        <DocumentViewer
          document={selectedDocument}
          onClose={() => setSelectedDocument(null)}
        />
      ) : (
        <DocumentList
          onDocumentSelect={handleDocumentSelect}
          showActions={true}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  headerButton: {
    padding: 8,
  },
}); 