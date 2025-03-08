import { apiClient } from '../lib/api-client';

export interface Notification {
  id: string;
  recipientId: string;
  recipientType: 'parent' | 'teacher' | 'student' | 'admin';
  type: 'attendance' | 'grade' | 'behavior' | 'announcement' | 'general';
  title: string;
  message: string;
  relatedId?: string;
  read: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface NotificationFilters {
  recipientId?: string;
  recipientType?: 'parent' | 'teacher' | 'student' | 'admin';
  type?: string;
  read?: boolean;
  startDate?: string;
  endDate?: string;
  page?: number;
  limit?: number;
}

export interface BulkNotificationData {
  recipientIds: string[];
  recipientType: 'parent' | 'teacher' | 'student' | 'admin';
  type: string;
  title: string;
  message: string;
  relatedId?: string;
}

export class NotificationService {
  private basePath = '/notifications';

  /**
   * Get notifications with optional filtering
   */
  async getNotifications(filters?: NotificationFilters): Promise<Notification[]> {
    const { data } = await apiClient.get<{ data: Notification[] }>(this.basePath, { params: filters });
    return data.data;
  }

  /**
   * Get a specific notification by ID
   */
  async getNotification(id: string): Promise<Notification> {
    const { data } = await apiClient.get<{ data: Notification }>(`${this.basePath}/${id}`);
    return data.data;
  }

  /**
   * Create a new notification
   */
  async createNotification(data: Omit<Notification, 'id' | 'read' | 'createdAt' | 'updatedAt'>): Promise<Notification> {
    const response = await apiClient.post<{ data: Notification }>(this.basePath, data);
    return response.data.data;
  }

  /**
   * Send bulk notifications
   */
  async sendBulkNotifications(data: BulkNotificationData): Promise<{ sent: number }> {
    const response = await apiClient.post<{ data: { sent: number } }>(`${this.basePath}/bulk`, data);
    return response.data.data;
  }

  /**
   * Mark notification as read
   */
  async markAsRead(id: string): Promise<Notification> {
    const response = await apiClient.put<{ data: Notification }>(`${this.basePath}/${id}/read`, {});
    return response.data.data;
  }

  /**
   * Mark all notifications as read for a recipient
   */
  async markAllAsRead(recipientId: string): Promise<{ updated: number }> {
    const response = await apiClient.put<{ data: { updated: number } }>(`${this.basePath}/read-all`, { recipientId });
    return response.data.data;
  }

  /**
   * Delete a notification
   */
  async deleteNotification(id: string): Promise<void> {
    await apiClient.delete(`${this.basePath}/${id}`);
  }

  /**
   * Get unread notification count
   */
  async getUnreadCount(recipientId: string): Promise<number> {
    const { data } = await apiClient.get<{ data: { count: number } }>(`${this.basePath}/unread-count`, {
      params: { recipientId }
    });
    return data.data.count;
  }

  /**
   * Send attendance notifications to parents
   */
  async sendAttendanceNotifications(
    classId: string,
    date: string,
    studentIds: string[],
    message?: string
  ): Promise<{ sent: number }> {
    const response = await apiClient.post<{ data: { sent: number } }>(`${this.basePath}/attendance`, {
      classId,
      date,
      studentIds,
      message: message || 'Your child was marked absent today.'
    });
    return response.data.data;
  }

  // Mock methods for development
  async mockSendNotification(recipientId: string, message: string): Promise<boolean> {
    console.log('Sending notification to', recipientId, ':', message);
    await new Promise(resolve => setTimeout(resolve, 500));
    return true;
  }

  async mockGetUnreadCount(recipientId: string): Promise<number> {
    console.log('Getting unread count for', recipientId);
    return Math.floor(Math.random() * 10);
  }
}