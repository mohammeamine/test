import React, { useCallback, useEffect, useState } from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  RefreshControl,
  StyleSheet,
  ActivityIndicator,
} from 'react-native';
import { Document, documentService } from '../../services/document';
import { FileText, Download, Share2, Trash2 } from 'lucide-react-native';
import { formatDistanceToNow } from 'date-fns';
import * as FileSystem from 'expo-file-system';
import { useToast } from '../../hooks/useToast';

interface DocumentListProps {
  onDocumentSelect?: (document: Document) => void;
  onShareDocument?: (document: Document) => void;
  onDeleteDocument?: (document: Document) => void;
  showActions?: boolean;
}

export const DocumentList: React.FC<DocumentListProps> = ({
  onDocumentSelect,
  onShareDocument,
  onDeleteDocument,
  showActions = true,
}) => {
  const [documents, setDocuments] = useState<Document[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const toast = useToast();

  const fetchDocuments = useCallback(async () => {
    try {
      const docs = await documentService.getAllDocuments();
      setDocuments(docs);
    } catch (error) {
      console.error('Error fetching documents:', error);
      toast.show({
        title: 'Error',
        message: 'Failed to fetch documents',
        type: 'error',
      });
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, []);

  useEffect(() => {
    fetchDocuments();
  }, [fetchDocuments]);

  const handleRefresh = useCallback(() => {
    setRefreshing(true);
    fetchDocuments();
  }, [fetchDocuments]);

  const handleDownload = useCallback(async (document: Document) => {
    try {
      const callback = (downloadProgress: { totalBytesWritten: number; totalBytesExpectedToWrite: number }) => {
        const progress = downloadProgress.totalBytesWritten / downloadProgress.totalBytesExpectedToWrite;
        // You can use this progress value to show a progress bar
      };

      const downloadResumable = FileSystem.createDownloadResumable(
        document.fileUrl,
        FileSystem.documentDirectory + document.title,
        {},
        callback
      );

      const { uri } = await downloadResumable.downloadAsync();
      
      if (uri) {
        toast.show({
          title: 'Success',
          message: 'Document downloaded successfully',
          type: 'success',
        });
      }
    } catch (error) {
      console.error('Error downloading document:', error);
      toast.show({
        title: 'Error',
        message: 'Failed to download document',
        type: 'error',
      });
    }
  }, []);

  const renderItem = ({ item: document }: { item: Document }) => (
    <View style={styles.documentItem}>
      <TouchableOpacity
        style={styles.documentInfo}
        onPress={() => onDocumentSelect?.(document)}
      >
        <FileText size={24} color="#666" />
        <View style={styles.documentDetails}>
          <Text style={styles.documentTitle}>{document.title}</Text>
          <Text style={styles.documentMeta}>
            {formatDistanceToNow(new Date(document.uploadedAt), { addSuffix: true })}
            {' · '}
            {(document.size / 1024 / 1024).toFixed(2)} MB
          </Text>
        </View>
      </TouchableOpacity>

      {showActions && (
        <View style={styles.actions}>
          <TouchableOpacity
            style={styles.actionButton}
            onPress={() => handleDownload(document)}
          >
            <Download size={20} color="#666" />
          </TouchableOpacity>
          
          <TouchableOpacity
            style={styles.actionButton}
            onPress={() => onShareDocument?.(document)}
          >
            <Share2 size={20} color="#666" />
          </TouchableOpacity>
          
          <TouchableOpacity
            style={styles.actionButton}
            onPress={() => onDeleteDocument?.(document)}
          >
            <Trash2 size={20} color="#666" />
          </TouchableOpacity>
        </View>
      )}
    </View>
  );

  if (loading) {
    return (
      <View style={styles.centerContainer}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  return (
    <FlatList
      data={documents}
      renderItem={renderItem}
      keyExtractor={(item) => item.id}
      contentContainerStyle={styles.container}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={handleRefresh} />
      }
      ListEmptyComponent={
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyText}>No documents found</Text>
        </View>
      }
    />
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 16,
  },
  centerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  documentItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    backgroundColor: 'white',
    borderRadius: 8,
    marginBottom: 8,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
  },
  documentInfo: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  documentDetails: {
    marginLeft: 12,
    flex: 1,
  },
  documentTitle: {
    fontSize: 16,
    fontWeight: '500',
    color: '#333',
  },
  documentMeta: {
    fontSize: 12,
    color: '#666',
    marginTop: 2,
  },
  actions: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  actionButton: {
    padding: 8,
    marginLeft: 8,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 32,
  },
  emptyText: {
    fontSize: 16,
    color: '#666',
  },
}); 