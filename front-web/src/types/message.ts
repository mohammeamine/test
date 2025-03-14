export interface Message {
  id: string;
  senderId: string;
  senderName: string;
  receiverId: string;
  receiverName: string;
  subject: string;
  content: string;
  sentAt: string;
  readAt: string | null;
  status: 'unread' | 'read';
}

export interface MessageStats {
  total: number;
  unread: number;
  teachers: number;
  averageResponseTime: string;
}

export interface Chat {
  id: string;
  name: string;
  role: string;
  subject: string;
  child: string;
  lastMessage: string;
  timestamp: string;
  unread: number;
} 