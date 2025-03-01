import React, { useCallback, useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  StyleSheet,
  ActivityIndicator,
} from 'react-native';
import * as DocumentPicker from 'expo-document-picker';
import { documentService, DocumentUploadParams } from '../../services/document';
import { useToast } from '../../hooks/useToast';
import { Upload } from 'lucide-react-native';

interface DocumentUploadProps {
  onUploadComplete?: () => void;
}

export const DocumentUpload: React.FC<DocumentUploadProps> = ({
  onUploadComplete,
}) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [selectedFile, setSelectedFile] = useState<DocumentPicker.DocumentPickerResult | null>(null);
  const [uploading, setUploading] = useState(false);
  const toast = useToast();

  const handleFilePick = useCallback(async () => {
    try {
      const result = await DocumentPicker.getDocumentAsync({
        type: '*/*', // Allow all file types
        copyToCacheDirectory: true,
      });

      if (!result.canceled) {
        setSelectedFile(result);
      }
    } catch (error) {
      console.error('Error picking document:', error);
      toast.show({
        title: 'Error',
        message: 'Failed to pick document',
        type: 'error',
      });
    }
  }, []);

  const handleUpload = useCallback(async () => {
    if (!selectedFile || selectedFile.canceled) {
      toast.show({
        title: 'Error',
        message: 'Please select a file first',
        type: 'error',
      });
      return;
    }

    if (!title.trim()) {
      toast.show({
        title: 'Error',
        message: 'Please enter a title',
        type: 'error',
      });
      return;
    }

    try {
      setUploading(true);

      const uploadParams: DocumentUploadParams = {
        title: title.trim(),
        description: description.trim(),
        file: {
          uri: selectedFile.assets[0].uri,
          name: selectedFile.assets[0].name,
          type: selectedFile.assets[0].mimeType,
        },
      };

      await documentService.uploadDocument(uploadParams);

      toast.show({
        title: 'Success',
        message: 'Document uploaded successfully',
        type: 'success',
      });

      // Reset form
      setTitle('');
      setDescription('');
      setSelectedFile(null);

      onUploadComplete?.();
    } catch (error) {
      console.error('Error uploading document:', error);
      toast.show({
        title: 'Error',
        message: 'Failed to upload document',
        type: 'error',
      });
    } finally {
      setUploading(false);
    }
  }, [title, description, selectedFile, onUploadComplete]);

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Document Title"
        value={title}
        onChangeText={setTitle}
        editable={!uploading}
      />

      <TextInput
        style={[styles.input, styles.textArea]}
        placeholder="Document Description (optional)"
        value={description}
        onChangeText={setDescription}
        multiline
        numberOfLines={4}
        editable={!uploading}
      />

      <TouchableOpacity
        style={styles.filePicker}
        onPress={handleFilePick}
        disabled={uploading}
      >
        <Upload size={24} color="#666" />
        <Text style={styles.filePickerText}>
          {selectedFile && !selectedFile.canceled
            ? selectedFile.assets[0].name
            : 'Select a file'}
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[
          styles.uploadButton,
          (uploading || !selectedFile) && styles.uploadButtonDisabled,
        ]}
        onPress={handleUpload}
        disabled={uploading || !selectedFile}
      >
        {uploading ? (
          <ActivityIndicator color="white" />
        ) : (
          <Text style={styles.uploadButtonText}>Upload Document</Text>
        )}
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  input: {
    backgroundColor: 'white',
    borderRadius: 8,
    padding: 12,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  textArea: {
    height: 100,
    textAlignVertical: 'top',
  },
  filePicker: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
    borderRadius: 8,
    padding: 12,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#ddd',
    borderStyle: 'dashed',
  },
  filePickerText: {
    marginLeft: 12,
    color: '#666',
    flex: 1,
  },
  uploadButton: {
    backgroundColor: '#0066cc',
    borderRadius: 8,
    padding: 16,
    alignItems: 'center',
  },
  uploadButtonDisabled: {
    backgroundColor: '#ccc',
  },
  uploadButtonText: {
    color: 'white',
    fontWeight: '600',
    fontSize: 16,
  },
}); 