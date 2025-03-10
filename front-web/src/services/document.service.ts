import { apiClient } from '../lib/api-client';

export interface Document {
  id: string;
  userId: string;
  title: string;
  description: string;
  type: string;
  path: string;
  url: string;
  size: number;
  status: 'pending' | 'approved' | 'rejected';
  tags?: string[];
  createdAt: string;
  updatedAt: string;
}

export interface DocumentFilter {
  status?: string;
  type?: string;
  search?: string;
  startDate?: string;
  endDate?: string;
  limit?: number;
  offset?: number;
}

class DocumentService {
  /**
   * Get all documents with optional filtering
   */
  async getDocuments(filters?: DocumentFilter): Promise<Document[]> {
    const { data } = await apiClient.get<{
      error: boolean;
      data: { documents: Document[] };
      message: string;
    }>(`/documents`, filters);
    return data.data.documents;
  }

  /**
   * Get a specific document by ID
   */
  async getDocument(id: string): Promise<Document> {
    const { data } = await apiClient.get<{
      error: boolean;
      data: { document: Document };
      message: string;
    }>(`/documents/${id}`);
    return data.data.document;
  }

  /**
   * Get all shared documents
   */
  async getSharedDocuments(): Promise<Document[]> {
    const { data } = await apiClient.get<{
      error: boolean;
      data: { documents: Document[] };
      message: string;
    }>(`/documents/shared`);
    return data.data.documents;
  }

  /**
   * Get all pending documents (admin only)
   */
  async getPendingDocuments(): Promise<Document[]> {
    const { data } = await apiClient.get<{
      error: boolean;
      data: { documents: Document[] };
      message: string;
    }>(`/documents/pending`);
    return data.data.documents;
  }

  /**
   * Search for documents
   */
  async searchDocuments(query: string): Promise<Document[]> {
    const { data } = await apiClient.get<{
      error: boolean;
      data: { documents: Document[] };
      message: string;
    }>(`/documents/search`, { query });
    return data.data.documents;
  }

  /**
   * Upload a new document
   */
  async uploadDocument(
    file: File,
    documentData: {
      title: string;
      description?: string;
      type: string;
      tags?: string[];
    }
  ): Promise<Document> {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('title', documentData.title);
    
    if (documentData.description) {
      formData.append('description', documentData.description);
    }
    
    formData.append('type', documentData.type);
    
    if (documentData.tags) {
      formData.append('tags', JSON.stringify(documentData.tags));
    }

    const { data } = await apiClient.post<{
      error: boolean;
      data: { document: Document };
      message: string;
    }>(`/documents`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    
    return data.data.document;
  }

  /**
   * Update a document
   */
  async updateDocument(
    id: string,
    updateData: {
      title?: string;
      description?: string;
      tags?: string[];
    }
  ): Promise<Document> {
    const { data } = await apiClient.put<{
      error: boolean;
      data: { document: Document };
      message: string;
    }>(`/documents/${id}`, updateData);
    
    return data.data.document;
  }

  /**
   * Delete a document
   */
  async deleteDocument(id: string): Promise<void> {
    await apiClient.delete(`/documents/${id}`);
  }

  /**
   * Approve a document (admin only)
   */
  async approveDocument(id: string): Promise<Document> {
    const { data } = await apiClient.post<{
      error: boolean;
      data: { document: Document };
      message: string;
    }>(`/documents/${id}/approve`);
    
    return data.data.document;
  }

  /**
   * Reject a document (admin only)
   */
  async rejectDocument(id: string, reason: string): Promise<Document> {
    const { data } = await apiClient.post<{
      error: boolean;
      data: { document: Document };
      message: string;
    }>(`/documents/${id}/reject`, { reason });
    
    return data.data.document;
  }

  /**
   * Share a document with other users
   */
  async shareDocument(id: string, userIds: string[]): Promise<void> {
    await apiClient.post(`/documents/${id}/share`, { userIds });
  }

  /**
   * Get the download URL for a document
   */
  getDownloadUrl(id: string): string {
    return `${window.location.origin}/api/documents/${id}/download`;
  }
}

export const documentService = new DocumentService();
export default documentService; 