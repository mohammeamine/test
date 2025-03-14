import { RowDataPacket } from 'mysql2';
import { query } from '../config/db';

export type MessageStatus = 'sent' | 'delivered' | 'read';

export interface Message {
  id: string;
  senderId: string;
  receiverId: string;
  subject: string;
  content: string;
  sentAt: Date;
  readAt?: Date;
  status: MessageStatus;
  createdAt: Date;
  updatedAt: Date;
}

export interface CreateMessageDTO {
  senderId: string;
  receiverId: string;
  subject: string;
  content: string;
}

interface MessageRow extends Message, RowDataPacket {}

export class MessageModel {
  async createTable(): Promise<void> {
    const sql = `
      CREATE TABLE IF NOT EXISTS messages (
        id VARCHAR(36) PRIMARY KEY,
        senderId VARCHAR(36) NOT NULL,
        receiverId VARCHAR(36) NOT NULL,
        subject VARCHAR(255) NOT NULL,
        content TEXT NOT NULL,
        sentAt DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
        readAt DATETIME,
        status ENUM('sent', 'delivered', 'read') NOT NULL DEFAULT 'sent',
        createdAt DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
        updatedAt DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
        FOREIGN KEY (senderId) REFERENCES users(id) ON DELETE CASCADE,
        FOREIGN KEY (receiverId) REFERENCES users(id) ON DELETE CASCADE
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
    `;
    await query(sql);
  }

  async create(messageData: CreateMessageDTO): Promise<string> {
    const id = crypto.randomUUID();
    const sql = `
      INSERT INTO messages (id, senderId, receiverId, subject, content)
      VALUES (?, ?, ?, ?, ?);
    `;
    await query(sql, [id, messageData.senderId, messageData.receiverId, messageData.subject, messageData.content]);
    return id;
  }

  async findById(id: string): Promise<Message | null> {
    const sql = `SELECT * FROM messages WHERE id = ?`;
    const [rows] = await query<MessageRow[]>(sql, [id]);
    return rows[0] || null;
  }

  async findByUser(userId: string, filters: {
    type?: 'sent' | 'received',
    status?: MessageStatus,
    search?: string,
    limit?: number,
    offset?: number
  } = {}): Promise<Message[]> {
    let sql = `SELECT * FROM messages WHERE `;
    const params: any[] = [];

    if (filters.type === 'sent') {
      sql += `senderId = ?`;
      params.push(userId);
    } else if (filters.type === 'received') {
      sql += `receiverId = ?`;
      params.push(userId);
    } else {
      sql += `(senderId = ? OR receiverId = ?)`;
      params.push(userId, userId);
    }

    if (filters.status) {
      sql += ` AND status = ?`;
      params.push(filters.status);
    }

    if (filters.search) {
      sql += ` AND (subject LIKE ? OR content LIKE ?)`;
      const searchTerm = `%${filters.search}%`;
      params.push(searchTerm, searchTerm);
    }

    sql += ` ORDER BY sentAt DESC`;

    if (filters.limit) {
      sql += ` LIMIT ?`;
      params.push(filters.limit);

      if (filters.offset) {
        sql += ` OFFSET ?`;
        params.push(filters.offset);
      }
    }

    const [rows] = await query<MessageRow[]>(sql, params);
    return rows;
  }

  async markAsRead(id: string, userId: string): Promise<boolean> {
    const sql = `
      UPDATE messages 
      SET status = 'read', readAt = CURRENT_TIMESTAMP 
      WHERE id = ? AND receiverId = ? AND status != 'read'
    `;
    const [result] = await query(sql, [id, userId]);
    return result.affectedRows > 0;
  }

  async getMessageStats(userId: string): Promise<{
    total: number;
    unread: number;
    sent: number;
    received: number;
  }> {
    const sql = `
      SELECT
        COUNT(*) as total,
        SUM(CASE WHEN receiverId = ? AND status != 'read' THEN 1 ELSE 0 END) as unread,
        SUM(CASE WHEN senderId = ? THEN 1 ELSE 0 END) as sent,
        SUM(CASE WHEN receiverId = ? THEN 1 ELSE 0 END) as received
      FROM messages
      WHERE senderId = ? OR receiverId = ?
    `;
    const [rows] = await query(sql, [userId, userId, userId, userId, userId]);
    return rows[0];
  }

  async delete(id: string, userId: string): Promise<boolean> {
    const sql = `
      DELETE FROM messages 
      WHERE id = ? AND (senderId = ? OR receiverId = ?)
    `;
    const [result] = await query(sql, [id, userId, userId]);
    return result.affectedRows > 0;
  }
}

export const messageModel = new MessageModel(); 