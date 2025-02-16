import { apiClient } from "../lib/api-client"
import { Document } from "../types/models"

export interface CreateDocumentData {
  title: string
  description: string
  type: string
  file: File
}

export interface DocumentFilters {
  status?: Document["status"]
  type?: string
  search?: string
  startDate?: string
  endDate?: string
}

class DocumentService {
  private readonly basePath = "/documents"

  async getDocuments(filters?: DocumentFilters) {
    const { data } = await apiClient.get<Document[]>(
      this.basePath,
      filters as Record<string, string>
    )
    return data
  }

  async getDocument(id: string) {
    const { data } = await apiClient.get<Document>(`${this.basePath}/${id}`)
    return data
  }

  async uploadDocument(documentData: CreateDocumentData) {
    const formData = new FormData()
    formData.append("title", documentData.title)
    formData.append("description", documentData.description)
    formData.append("type", documentData.type)
    formData.append("file", documentData.file)

    const { data } = await apiClient.post<Document>(this.basePath, formData)
    return data
  }

  async updateDocument(
    id: string,
    documentData: Partial<Omit<CreateDocumentData, "file">>
  ) {
    const { data } = await apiClient.put<Document>(
      `${this.basePath}/${id}`,
      documentData
    )
    return data
  }

  async deleteDocument(id: string) {
    await apiClient.delete(`${this.basePath}/${id}`)
  }

  async downloadDocument(id: string) {
    const { data } = await apiClient.get<Blob>(
      `${this.basePath}/${id}/download`,
      { "Content-Type": "application/octet-stream" } as any
    )
    return data
  }

  async approveDocument(id: string) {
    const { data } = await apiClient.post<Document>(
      `${this.basePath}/${id}/approve`,
      {}
    )
    return data
  }

  async rejectDocument(id: string, reason: string) {
    const { data } = await apiClient.post<Document>(
      `${this.basePath}/${id}/reject`,
      { reason }
    )
    return data
  }

  async shareDocument(id: string, userIds: string[]) {
    const { data } = await apiClient.post<Document>(
      `${this.basePath}/${id}/share`,
      { userIds }
    )
    return data
  }

  async getSharedDocuments() {
    const { data } = await apiClient.get<Document[]>(`${this.basePath}/shared`)
    return data
  }

  async getPendingDocuments() {
    const { data } = await apiClient.get<Document[]>(`${this.basePath}/pending`)
    return data
  }
}

export const documentService = new DocumentService() 