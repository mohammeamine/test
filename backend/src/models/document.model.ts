import { promisify } from 'util';
import { pool } from '../config/db';
import { OkPacket, RowDataPacket, QueryOptions } from 'mysql2';

export interface Document {
  id: string;
  userId: string;
  title: string;
  description: string;
  type: string;
  path: string;
  url: string;
  size: number;
  uploadedAt: Date;
  status: 'pending' | 'approved' | 'rejected';
  rejectionReason?: string;
  tags?: string[];
  sharedWith?: string[];
}

export interface CreateDocumentDTO {
  userId: string;
  title: string;
  description: string;
  type: string;
  path: string;
  url: string;
  size: number;
  status?: 'pending' | 'approved' | 'rejected';
  tags?: string[];
  sharedWith?: string[];
}

export interface UpdateDocumentDTO {
  title?: string;
  description?: string;
  status?: 'pending' | 'approved' | 'rejected';
  rejectionReason?: string;
  tags?: string[];
  sharedWith?: string[];
}

export class DocumentModel {
  // Create a new document
  static async create(doc: CreateDocumentDTO): Promise<Document> {
    try {
      const query = `
        INSERT INTO documents
        (userId, title, description, type, path, url, size, status, tags, sharedWith)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
      `;

      const tagsJSON = doc.tags ? JSON.stringify(doc.tags) : null;
      const sharedWithJSON = doc.sharedWith ? JSON.stringify(doc.sharedWith) : null;
      
      const queryAsync = promisify<string, any[], OkPacket>(pool.query);
      const result = await queryAsync(query, [
        doc.userId,
        doc.title,
        doc.description,
        doc.type,
        doc.path,
        doc.url,
        doc.size,
        doc.status || 'pending',
        tagsJSON,
        sharedWithJSON
      ]);

      return {
        id: result.insertId.toString(),
        ...doc,
        status: doc.status || 'pending',
        uploadedAt: new Date()
      };
    } catch (error) {
      console.error('Error creating document:', error);
      throw error;
    }
  }

  // Get document by id
  static async findById(id: string): Promise<Document | null> {
    try {
      const query = `
        SELECT id, userId, title, description, type, path, url, size, status, 
               rejectionReason, tags, sharedWith, uploadedAt
        FROM documents
        WHERE id = ?
      `;

      const queryAsync = promisify<string, any[], RowDataPacket[]>(pool.query);
      const [rows] = await queryAsync(query, [id]);

      if (rows.length === 0) {
        return null;
      }

      const doc = rows[0] as RowDataPacket;
      return {
        id: doc.id.toString(),
        userId: doc.userId.toString(),
        title: doc.title,
        description: doc.description,
        type: doc.type,
        path: doc.path,
        url: doc.url,
        size: doc.size,
        status: doc.status,
        rejectionReason: doc.rejectionReason,
        tags: doc.tags ? JSON.parse(doc.tags) : [],
        sharedWith: doc.sharedWith ? JSON.parse(doc.sharedWith) : [],
        uploadedAt: new Date(doc.uploadedAt)
      };
    } catch (error) {
      console.error('Error finding document by id:', error);
      throw error;
    }
  }

  // Find documents by user id (created by the user)
  static async findByUserId(userId: string): Promise<Document[]> {
    try {
      const query = `
        SELECT id, userId, title, description, type, path, url, size, status, 
               rejectionReason, tags, sharedWith, uploadedAt
        FROM documents
        WHERE userId = ?
        ORDER BY uploadedAt DESC
      `;

      const queryAsync = promisify<string, any[], RowDataPacket[]>(pool.query);
      const [rows] = await queryAsync(query, [userId]);

      return rows.map((row: RowDataPacket) => ({
        id: row.id.toString(),
        userId: row.userId.toString(),
        title: row.title,
        description: row.description,
        type: row.type,
        path: row.path,
        url: row.url,
        size: row.size,
        status: row.status,
        rejectionReason: row.rejectionReason,
        tags: row.tags ? JSON.parse(row.tags) : [],
        sharedWith: row.sharedWith ? JSON.parse(row.sharedWith) : [],
        uploadedAt: new Date(row.uploadedAt)
      }));
    } catch (error) {
      console.error('Error finding documents by user id:', error);
      throw error;
    }
  }

  // Find documents shared with a user
  static async findSharedWithUser(userId: string): Promise<Document[]> {
    try {
      const query = `
        SELECT id, userId, title, description, type, path, url, size, status, 
               rejectionReason, tags, sharedWith, uploadedAt
        FROM documents
        WHERE JSON_CONTAINS(sharedWith, ?) AND status = 'approved'
        ORDER BY uploadedAt DESC
      `;

      const queryAsync = promisify<string, any[], RowDataPacket[]>(pool.query);
      const [rows] = await queryAsync(query, [JSON.stringify(userId)]);

      return rows.map((row: RowDataPacket) => ({
        id: row.id.toString(),
        userId: row.userId.toString(),
        title: row.title,
        description: row.description,
        type: row.type,
        path: row.path,
        url: row.url,
        size: row.size,
        status: row.status,
        rejectionReason: row.rejectionReason,
        tags: row.tags ? JSON.parse(row.tags) : [],
        sharedWith: row.sharedWith ? JSON.parse(row.sharedWith) : [],
        uploadedAt: new Date(row.uploadedAt)
      }));
    } catch (error) {
      console.error('Error finding documents shared with user:', error);
      throw error;
    }
  }

  // Find all pending documents (for administrators)
  static async findPendingDocuments(): Promise<Document[]> {
    try {
      const query = `
        SELECT id, userId, title, description, type, path, url, size, status, 
               rejectionReason, tags, sharedWith, uploadedAt
        FROM documents
        WHERE status = 'pending'
        ORDER BY uploadedAt DESC
      `;

      const queryAsync = promisify<string, RowDataPacket[]>(pool.query);
      const [rows] = await queryAsync(query);

      return rows.map((row: RowDataPacket) => ({
        id: row.id.toString(),
        userId: row.userId.toString(),
        title: row.title,
        description: row.description,
        type: row.type,
        path: row.path,
        url: row.url,
        size: row.size,
        status: row.status,
        rejectionReason: row.rejectionReason,
        tags: row.tags ? JSON.parse(row.tags) : [],
        sharedWith: row.sharedWith ? JSON.parse(row.sharedWith) : [],
        uploadedAt: new Date(row.uploadedAt)
      }));
    } catch (error) {
      console.error('Error finding pending documents:', error);
      throw error;
    }
  }

  // Find all documents with filtering
  static async findAll(
    limit: number = 100, 
    offset: number = 0, 
    filters?: { status?: string; type?: string; search?: string; startDate?: string; endDate?: string }
  ): Promise<Document[]> {
    try {
      let query = `
        SELECT id, userId, title, description, type, path, url, size, status, 
               rejectionReason, tags, sharedWith, uploadedAt
        FROM documents
        WHERE 1=1
      `;
      
      const params: any[] = [];
      
      // Apply filters
      if (filters) {
        if (filters.status) {
          query += ` AND status = ?`;
          params.push(filters.status);
        }
        
        if (filters.type) {
          query += ` AND type = ?`;
          params.push(filters.type);
        }
        
        if (filters.search) {
          query += ` AND (title LIKE ? OR description LIKE ?)`;
          const searchTerm = `%${filters.search}%`;
          params.push(searchTerm, searchTerm);
        }
        
        if (filters.startDate) {
          query += ` AND uploadedAt >= ?`;
          params.push(filters.startDate);
        }
        
        if (filters.endDate) {
          query += ` AND uploadedAt <= ?`;
          params.push(filters.endDate);
        }
      }
      
      query += ` ORDER BY uploadedAt DESC LIMIT ? OFFSET ?`;
      params.push(limit, offset);

      const queryAsync = promisify<string, any[], RowDataPacket[]>(pool.query);
      const [rows] = await queryAsync(query, params);

      return rows.map((row: RowDataPacket) => ({
        id: row.id.toString(),
        userId: row.userId.toString(),
        title: row.title,
        description: row.description,
        type: row.type,
        path: row.path,
        url: row.url,
        size: row.size,
        status: row.status,
        rejectionReason: row.rejectionReason,
        tags: row.tags ? JSON.parse(row.tags) : [],
        sharedWith: row.sharedWith ? JSON.parse(row.sharedWith) : [],
        uploadedAt: new Date(row.uploadedAt)
      }));
    } catch (error) {
      console.error('Error finding all documents:', error);
      throw error;
    }
  }

  // Update document
  static async update(id: string, updates: UpdateDocumentDTO): Promise<boolean> {
    try {
      let query = 'UPDATE documents SET ';
      const queryParams: any[] = [];
      const updateFields: string[] = [];

      if (updates.title !== undefined) {
        updateFields.push('title = ?');
        queryParams.push(updates.title);
      }

      if (updates.description !== undefined) {
        updateFields.push('description = ?');
        queryParams.push(updates.description);
      }

      if (updates.status !== undefined) {
        updateFields.push('status = ?');
        queryParams.push(updates.status);
      }
      
      if (updates.rejectionReason !== undefined) {
        updateFields.push('rejectionReason = ?');
        queryParams.push(updates.rejectionReason);
      }

      if (updates.tags !== undefined) {
        updateFields.push('tags = ?');
        queryParams.push(JSON.stringify(updates.tags));
      }

      if (updates.sharedWith !== undefined) {
        updateFields.push('sharedWith = ?');
        queryParams.push(JSON.stringify(updates.sharedWith));
      }

      if (updateFields.length === 0) {
        return true; // Nothing to update
      }

      query += updateFields.join(', ');
      query += ' WHERE id = ?';
      queryParams.push(id);

      const queryAsync = promisify<string, any[], OkPacket>(pool.query);
      const result = await queryAsync(query, queryParams);

      return result.affectedRows > 0;
    } catch (error) {
      console.error('Error updating document:', error);
      throw error;
    }
  }

  // Approve document
  static async approveDocument(id: string): Promise<boolean> {
    try {
      return this.update(id, { status: 'approved' });
    } catch (error) {
      console.error('Error approving document:', error);
      throw error;
    }
  }

  // Reject document
  static async rejectDocument(id: string, reason: string): Promise<boolean> {
    try {
      return this.update(id, { 
        status: 'rejected',
        rejectionReason: reason
      });
    } catch (error) {
      console.error('Error rejecting document:', error);
      throw error;
    }
  }

  // Share document with users
  static async shareDocument(id: string, userIds: string[]): Promise<boolean> {
    try {
      // First get the current document
      const document = await this.findById(id);
      if (!document) {
        throw new Error('Document not found');
      }

      // Add new users to the shared list (avoid duplicates)
      const currentShared = document.sharedWith || [];
      const newShared = [...new Set([...currentShared, ...userIds])];

      // Update the document
      return this.update(id, { sharedWith: newShared });
    } catch (error) {
      console.error('Error sharing document:', error);
      throw error;
    }
  }

  // Delete document
  static async delete(id: string): Promise<boolean> {
    try {
      const query = 'DELETE FROM documents WHERE id = ?';
      
      const queryAsync = promisify<string, any[], OkPacket>(pool.query);
      const result = await queryAsync(query, [id]);

      return result.affectedRows > 0;
    } catch (error) {
      console.error('Error deleting document:', error);
      throw error;
    }
  }

  // Search documents
  static async search(searchTerm: string, limit: number = 100, offset: number = 0): Promise<Document[]> {
    try {
      const query = `
        SELECT 
          id, userId, title, description, type, path, url, size, status, 
          rejectionReason, tags, sharedWith, uploadedAt
        FROM documents
        WHERE 
          title LIKE ? OR 
          description LIKE ? OR
          JSON_SEARCH(tags, 'one', ?) IS NOT NULL
        ORDER BY uploadedAt DESC
        LIMIT ? OFFSET ?
      `;

      const searchPattern = `%${searchTerm}%`;
      
      const queryAsync = promisify<string, any[], RowDataPacket[]>(pool.query);
      const [rows] = await queryAsync(query, [
        searchPattern, 
        searchPattern,
        searchPattern,
        limit, 
        offset
      ]);

      return rows.map((row: RowDataPacket) => ({
        id: row.id.toString(),
        userId: row.userId.toString(),
        title: row.title,
        description: row.description,
        type: row.type,
        path: row.path,
        url: row.url,
        size: row.size,
        status: row.status,
        rejectionReason: row.rejectionReason,
        tags: row.tags ? JSON.parse(row.tags) : [],
        sharedWith: row.sharedWith ? JSON.parse(row.sharedWith) : [],
        uploadedAt: new Date(row.uploadedAt)
      }));
    } catch (error) {
      console.error('Error searching documents:', error);
      throw error;
    }
  }
}

// SQL to create the documents table
export const createDocumentsTableSQL = `
  CREATE TABLE IF NOT EXISTS documents (
    id INT AUTO_INCREMENT PRIMARY KEY,
    userId INT NOT NULL,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    type VARCHAR(100) NOT NULL,
    path VARCHAR(255) NOT NULL,
    url VARCHAR(255) NOT NULL,
    size INT NOT NULL,
    status ENUM('pending', 'approved', 'rejected') DEFAULT 'pending',
    rejectionReason TEXT,
    tags JSON,
    sharedWith JSON,
    uploadedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (userId) REFERENCES users(id) ON DELETE CASCADE
  ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
`; 