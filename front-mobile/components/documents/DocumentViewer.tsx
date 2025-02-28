import React, { useCallback, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
  ScrollView,
  TouchableOpacity,
  Share,
} from 'react-native';
import { Document } from '../../services/document';
import { FileText, Download, Share2, Clock, Tag } from 'lucide-react-native';
import { format } from 'date-fns';
import * as FileSystem from 'expo-file-system';
import * as WebBrowser from 'expo-web-browser';
import { useToast } from '../../hooks/useToast';

interface DocumentViewerProps {
  document: Document;
  onClose?: () => void;
}

export const DocumentViewer: React.FC<DocumentViewerProps> = ({
  document,
  onClose,
}) => {
  const [loading, setLoading] = useState(false);
  const toast = useToast();

  const handleDownload = useCallback(async () => {
    try {
      setLoading(true);
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
    } finally {
      setLoading(false);
    }
  }, [document]);

  const handleShare = useCallback(async () => {
    try {
      await Share.share({
        title: document.title,
        url: document.fileUrl,
      });
    } catch (error) {
      console.error('Error sharing document:', error);
      toast.show({
        title: 'Error',
        message: 'Failed to share document',
        type: 'error',
      });
    }
  }, [document]);

  const handlePreview = useCallback(async () => {
    try {
      await WebBrowser.openBrowserAsync(document.fileUrl);
    } catch (error) {
      console.error('Error previewing document:', error);
      toast.show({
        title: 'Error',
        message: 'Failed to preview document',
        type: 'error',
      });
    }
  }, [document]);

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <FileText size={32} color="#666" />
        <Text style={styles.title}>{document.title}</Text>
      </View>

      <View style={styles.metadata}>
        <View style={styles.metadataItem}>
          <Clock size={16} color="#666" />
          <Text style={styles.metadataText}>
            Uploaded {format(new Date(document.uploadedAt), 'PPP')}
          </Text>
        </View>

        <View style={styles.metadataItem}>
          <Tag size={16} color="#666" />
          <Text style={styles.metadataText}>
            {(document.size / 1024 / 1024).toFixed(2)} MB
          </Text>
        </View>
      </View>

      {document.description && (
        <Text style={styles.description}>{document.description}</Text>
      )}

      {document.tags.length > 0 && (
        <View style={styles.tags}>
          {document.tags.map((tag, index) => (
            <View key={index} style={styles.tag}>
              <Text style={styles.tagText}>{tag}</Text>
            </View>
          ))}
        </View>
      )}

      <View style={styles.actions}>
        <TouchableOpacity
          style={styles.actionButton}
          onPress={handlePreview}
          disabled={loading}
        >
          <Text style={styles.actionButtonText}>Preview</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.actionButton}
          onPress={handleDownload}
          disabled={loading}
        >
          {loading ? (
            <ActivityIndicator color="white" size="small" />
          ) : (
            <>
              <Download size={20} color="white" />
              <Text style={styles.actionButtonText}>Download</Text>
            </>
          )}
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.actionButton}
          onPress={handleShare}
          disabled={loading}
        >
          <Share2 size={20} color="white" />
          <Text style={styles.actionButtonText}>Share</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  header: {
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  title: {
    fontSize: 24,
    fontWeight: '600',
    marginLeft: 12,
    flex: 1,
  },
  metadata: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  metadataItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  metadataText: {
    marginLeft: 8,
    color: '#666',
  },
  description: {
    padding: 16,
    fontSize: 16,
    lineHeight: 24,
    color: '#444',
  },
  tags: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    padding: 16,
    borderTopWidth: 1,
    borderTopColor: '#eee',
  },
  tag: {
    backgroundColor: '#f0f0f0',
    borderRadius: 16,
    paddingVertical: 4,
    paddingHorizontal: 12,
    marginRight: 8,
    marginBottom: 8,
  },
  tagText: {
    color: '#666',
    fontSize: 14,
  },
  actions: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 16,
    borderTopWidth: 1,
    borderTopColor: '#eee',
  },
  actionButton: {
    backgroundColor: '#0066cc',
    borderRadius: 8,
    padding: 12,
    flexDirection: 'row',
    alignItems: 'center',
    minWidth: 100,
    justifyContent: 'center',
  },
  actionButtonText: {
    color: 'white',
    fontWeight: '600',
    marginLeft: 8,
  },
}); 