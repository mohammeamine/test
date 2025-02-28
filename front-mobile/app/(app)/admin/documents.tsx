import React, { useState } from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { DocumentList } from '../../../components/documents/DocumentList';
import { DocumentUpload } from '../../../components/documents/DocumentUpload';
import { DocumentViewer } from '../../../components/documents/DocumentViewer';
import { Document, documentService } from '../../../services/document';
import { useToast } from '../../../hooks/useToast';
import { Stack } from 'expo-router';
import { Plus, X } from 'lucide-react-native';

export default function DocumentsScreen() {
  const [selectedDocument, setSelectedDocument] = useState<Document | null>(null);
  const [showUpload, setShowUpload] = useState(false);
  const toast = useToast();

  const handleDocumentSelect = (document: Document) => {
    setSelectedDocument(document);
  };

  const handleShareDocument = async (document: Document) => {
    try {
      // Implement share functionality
      await documentService.shareDocument(document.id, []);
      toast.show({
        title: 'Success',
        message: 'Document shared successfully',
        type: 'success',
      });
    } catch (error) {
      console.error('Error sharing document:', error);
      toast.show({
        title: 'Error',
        message: 'Failed to share document',
        type: 'error',
      });
    }
  };

  const handleDeleteDocument = async (document: Document) => {
    try {
      await documentService.deleteDocument(document.id);
      toast.show({
        title: 'Success',
        message: 'Document deleted successfully',
        type: 'success',
      });
    } catch (error) {
      console.error('Error deleting document:', error);
      toast.show({
        title: 'Error',
        message: 'Failed to delete document',
        type: 'error',
      });
    }
  };

  const handleUploadComplete = () => {
    setShowUpload(false);
    // Refresh document list
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
          onShareDocument={handleShareDocument}
          onDeleteDocument={handleDeleteDocument}
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