import { Message, MessageStats, Chat } from '../types/message';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000/api';

async function fetchWithAuth(endpoint: string, options: RequestInit = {}) {
  const token = localStorage.getItem('token');
  const defaultHeaders = {
    'Content-Type': 'application/json',
    ...(token && { Authorization: `Bearer ${token}` })
  };

  const response = await fetch(`${API_URL}${endpoint}`, {
    ...options,
    headers: {
      ...defaultHeaders,
      ...options.headers
    }
  });

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  return response.json();
}

export const messageService = {
  getMessages: async (search?: string): Promise<Message[]> => {
    const endpoint = search ? `/messages?search=${encodeURIComponent(search)}` : '/messages';
    return fetchWithAuth(endpoint);
  },

  getMessageStats: async (): Promise<MessageStats> => {
    return fetchWithAuth('/messages/stats');
  },

  getChats: async (): Promise<Chat[]> => {
    return fetchWithAuth('/messages/chats');
  },

  sendMessage: async (data: { receiverId: string; subject: string; content: string }): Promise<Message> => {
    return fetchWithAuth('/messages', {
      method: 'POST',
      body: JSON.stringify(data)
    });
  },

  markAsRead: async (messageId: string): Promise<void> => {
    await fetchWithAuth(`/messages/${messageId}/read`, {
      method: 'PUT'
    });
  }
}; 