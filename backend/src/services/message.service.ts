import { messageModel, CreateMessageDTO, Message, MessageStatus } from '../models/message.model';
import { ApiError } from '../middlewares/error.middleware';
import { userService } from './user.service';

export interface MessageFilters {
  type?: 'sent' | 'received';
  status?: MessageStatus;
  search?: string;
  limit?: number;
  offset?: number;
}

class MessageService {
  async sendMessage(messageData: CreateMessageDTO): Promise<Message> {
    // Vérifier si le destinataire existe
    const receiver = await userService.getUser(messageData.receiverId);
    if (!receiver) {
      throw new ApiError('Recipient not found', 404);
    }

    // Créer le message
    const messageId = await messageModel.create(messageData);
    const message = await messageModel.findById(messageId);

    if (!message) {
      throw new ApiError('Failed to create message', 500);
    }

    return message;
  }

  async getMessages(userId: string, filters: MessageFilters = {}): Promise<Message[]> {
    return messageModel.findByUser(userId, filters);
  }

  async getMessage(id: string, userId: string): Promise<Message> {
    const message = await messageModel.findById(id);

    if (!message) {
      throw new ApiError('Message not found', 404);
    }

    if (message.senderId !== userId && message.receiverId !== userId) {
      throw new ApiError('Access denied', 403);
    }

    // Marquer automatiquement comme lu si c'est le destinataire qui lit le message
    if (message.receiverId === userId && message.status !== 'read') {
      await messageModel.markAsRead(id, userId);
    }

    return message;
  }

  async markAsRead(id: string, userId: string): Promise<boolean> {
    const message = await messageModel.findById(id);

    if (!message) {
      throw new ApiError('Message not found', 404);
    }

    if (message.receiverId !== userId) {
      throw new ApiError('Access denied', 403);
    }

    return messageModel.markAsRead(id, userId);
  }

  async getMessageStats(userId: string): Promise<{
    total: number;
    unread: number;
    sent: number;
    received: number;
  }> {
    return messageModel.getMessageStats(userId);
  }

  async deleteMessage(id: string, userId: string): Promise<boolean> {
    const message = await messageModel.findById(id);

    if (!message) {
      throw new ApiError('Message not found', 404);
    }

    if (message.senderId !== userId && message.receiverId !== userId) {
      throw new ApiError('Access denied', 403);
    }

    return messageModel.delete(id, userId);
  }
}

export const messageService = new MessageService(); 