import { apiClient } from "../lib/api-client"
import { Message } from "../types/models"

export interface CreateMessageData {
  receiverId: string
  subject: string
  content: string
}

export interface MessageFilters {
  status?: Message["status"]
  search?: string
  startDate?: string
  endDate?: string
}

class MessageService {
  private readonly basePath = "/messages"

  async getMessages(filters?: MessageFilters) {
    const { data } = await apiClient.get<Message[]>(
      this.basePath,
      filters as Record<string, string>
    )
    return data
  }

  async getMessage(id: string) {
    const { data } = await apiClient.get<Message>(`${this.basePath}/${id}`)
    return data
  }

  async sendMessage(messageData: CreateMessageData) {
    const { data } = await apiClient.post<Message>(this.basePath, messageData)
    return data
  }

  async deleteMessage(id: string) {
    await apiClient.delete(`${this.basePath}/${id}`)
  }

  async markAsRead(id: string) {
    const { data } = await apiClient.patch<Message>(
      `${this.basePath}/${id}/read`,
      {}
    )
    return data
  }

  async getInbox() {
    const { data } = await apiClient.get<Message[]>(`${this.basePath}/inbox`)
    return data
  }

  async getSent() {
    const { data } = await apiClient.get<Message[]>(`${this.basePath}/sent`)
    return data
  }

  async getUnread() {
    const { data } = await apiClient.get<Message[]>(`${this.basePath}/unread`)
    return data
  }

  async getConversation(userId: string) {
    const { data } = await apiClient.get<Message[]>(
      `${this.basePath}/conversation/${userId}`
    )
    return data
  }
}

export const messageService = new MessageService() 