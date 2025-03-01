import AsyncStorage from '@react-native-async-storage/async-storage';
import { API_URL, FEATURES } from '../utils/config';

export interface Document {
  id: string;
  title: string;
  description?: string;
  fileUrl?: string;
  fileType: string;
  size?: number;
  uploadedBy?: string;
  uploadedAt: Date;
  sharedWith?: string[];
  tags?: string[];
}

export interface DocumentUploadParams {
  title: string;
  description: string;
  file: any; // Will be handled by react-native-document-picker
  tags?: string[];
  sharedWith?: string[];
}

export interface DocumentUpdateParams {
  id: string;
  title?: string;
  description?: string;
  tags?: string[];
  sharedWith?: string[];
}

class DocumentService {
  private PLACEHOLDER_DOCUMENTS: Document[] = [
    {
      id: '1',
      title: 'School Calendar',
      fileType: 'PDF',
      uploadedAt: new Date('2024-03-15'),
    },
    {
      id: '2',
      title: 'Course Materials',
      fileType: 'DOC',
      uploadedAt: new Date('2024-03-14'),
    },
    {
      id: '3',
      title: 'Assignment Guidelines',
      fileType: 'PDF',
      uploadedAt: new Date('2024-03-13'),
    },
    {
      id: '4',
      title: 'Student Handbook',
      fileType: 'PDF',
      uploadedAt: new Date('2024-03-12'),
    },
  ];

  private async getAuthToken(): Promise<string | null> {
    return await AsyncStorage.getItem('authToken');
  }

  private async getHeaders(): Promise<Headers> {
    const token = await this.getAuthToken();
    return new Headers({
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json',
    });
  }

  async getAllDocuments(): Promise<Document[]> {
    try {
      // Check if we're in offline mode
      if (!FEATURES.OFFLINE_MODE) {
        const headers = await this.getHeaders();
        const response = await fetch(`${API_URL}/documents`, {
          method: 'GET',
          headers,
        });

        if (!response.ok) {
          throw new Error('Failed to fetch documents');
        }

        return await response.json();
      }

      // Return placeholder data in offline mode
      return this.PLACEHOLDER_DOCUMENTS;
    } catch (error) {
      console.error('Error fetching documents:', error);
      // Return placeholder data on error
      return this.PLACEHOLDER_DOCUMENTS;
    }
  }

  async getDocumentById(id: string): Promise<Document> {
    try {
      const headers = await this.getHeaders();
      const response = await fetch(`${API_URL}/documents/${id}`, {
        method: 'GET',
        headers,
      });

      if (!response.ok) {
        throw new Error('Failed to fetch document');
      }

      return await response.json();
    } catch (error) {
      console.error('Error fetching document:', error);
      throw error;
    }
  }

  async uploadDocument(params: DocumentUploadParams): Promise<Document> {
    try {
      const token = await this.getAuthToken();
      const formData = new FormData();
      
      formData.append('title', params.title);
      formData.append('description', params.description);
      formData.append('file', params.file);
      
      if (params.tags) {
        formData.append('tags', JSON.stringify(params.tags));
      }
      
      if (params.sharedWith) {
        formData.append('sharedWith', JSON.stringify(params.sharedWith));
      }

      const response = await fetch(`${API_URL}/documents`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
        body: formData,
      });

      if (!response.ok) {
        throw new Error('Failed to upload document');
      }

      return await response.json();
    } catch (error) {
      console.error('Error uploading document:', error);
      throw error;
    }
  }

  async updateDocument(params: DocumentUpdateParams): Promise<Document> {
    try {
      const headers = await this.getHeaders();
      const response = await fetch(`${API_URL}/documents/${params.id}`, {
        method: 'PATCH',
        headers,
        body: JSON.stringify(params),
      });

      if (!response.ok) {
        throw new Error('Failed to update document');
      }

      return await response.json();
    } catch (error) {
      console.error('Error updating document:', error);
      throw error;
    }
  }

  async deleteDocument(id: string): Promise<void> {
    try {
      const headers = await this.getHeaders();
      const response = await fetch(`${API_URL}/documents/${id}`, {
        method: 'DELETE',
        headers,
      });

      if (!response.ok) {
        throw new Error('Failed to delete document');
      }
    } catch (error) {
      console.error('Error deleting document:', error);
      throw error;
    }
  }

  async shareDocument(documentId: string, userIds: string[]): Promise<Document> {
    try {
      const headers = await this.getHeaders();
      const response = await fetch(`${API_URL}/documents/${documentId}/share`, {
        method: 'POST',
        headers,
        body: JSON.stringify({ userIds }),
      });

      if (!response.ok) {
        throw new Error('Failed to share document');
      }

      return await response.json();
    } catch (error) {
      console.error('Error sharing document:', error);
      throw error;
    }
  }
}

export const documentService = new DocumentService(); 