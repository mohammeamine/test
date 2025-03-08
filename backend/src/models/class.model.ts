import { pool } from '../config/db';
import { ResultSetHeader, RowDataPacket } from 'mysql2';
import { v4 as uuidv4 } from 'uuid';

// Class types
export interface Class {
  id: string;
  courseId: string;
  teacherId: string;
  room: string;
  capacity: number;
  status: 'active' | 'cancelled' | 'completed';
  createdAt: string;
  updatedAt: string;
}

// Define the RowDataPacket extension for type safety
interface ClassRow extends Class, RowDataPacket {}

class ClassModel {
  /**
   * Create class table if it doesn't exist
   */
  async createTable(): Promise<void> {
    const query = `
      CREATE TABLE IF NOT EXISTS classes (
        id VARCHAR(36) PRIMARY KEY,
        courseId VARCHAR(36) NOT NULL,
        teacherId VARCHAR(36) NOT NULL,
        room VARCHAR(50) NOT NULL,
        capacity INT NOT NULL DEFAULT 30,
        status ENUM('active', 'cancelled', 'completed') NOT NULL DEFAULT 'active',
        createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
        FOREIGN KEY (courseId) REFERENCES courses(id) ON DELETE CASCADE,
        FOREIGN KEY (teacherId) REFERENCES users(id) ON DELETE CASCADE
      );
    `;
    await pool.query(query);
  }

  /**
   * Get all classes with optional filters
   */
  async findAll(filters?: {
    courseId?: string;
    teacherId?: string;
    status?: 'active' | 'cancelled' | 'completed';
    room?: string;
  }): Promise<Class[]> {
    let query = 'SELECT * FROM classes';
    const params: any[] = [];
    
    // Build WHERE clause if filters are provided
    if (filters) {
      const conditions: string[] = [];
      
      if (filters.courseId) {
        conditions.push('courseId = ?');
        params.push(filters.courseId);
      }
      
      if (filters.teacherId) {
        conditions.push('teacherId = ?');
        params.push(filters.teacherId);
      }
      
      if (filters.status) {
        conditions.push('status = ?');
        params.push(filters.status);
      }
      
      if (filters.room) {
        conditions.push('room = ?');
        params.push(filters.room);
      }
      
      if (conditions.length > 0) {
        query += ' WHERE ' + conditions.join(' AND ');
      }
    }
    
    query += ' ORDER BY createdAt DESC';
    
    const [rows] = await pool.query<ClassRow[]>(query, params);
    return rows;
  }

  /**
   * Get class by ID
   */
  async findById(id: string): Promise<Class | null> {
    const [rows] = await pool.query<ClassRow[]>(
      'SELECT * FROM classes WHERE id = ?',
      [id]
    );
    return rows.length ? rows[0] : null;
  }

  /**
   * Create a new class
   */
  async create(classData: Omit<Class, 'id' | 'createdAt' | 'updatedAt'>): Promise<string> {
    const id = uuidv4();
    
    const query = `
      INSERT INTO classes (
        id, courseId, teacherId, room, capacity, status
      ) VALUES (?, ?, ?, ?, ?, ?)
    `;
    
    await pool.query<ResultSetHeader>(query, [
      id,
      classData.courseId,
      classData.teacherId,
      classData.room,
      classData.capacity,
      classData.status
    ]);
    
    return id;
  }

  /**
   * Update a class
   */
  async update(id: string, classData: Partial<Omit<Class, 'id' | 'createdAt' | 'updatedAt'>>): Promise<boolean> {
    // Build query dynamically based on provided fields
    const fields: string[] = [];
    const values: any[] = [];
    
    Object.entries(classData).forEach(([key, value]) => {
      if (value !== undefined) {
        fields.push(`${key} = ?`);
        values.push(value);
      }
    });
    
    if (fields.length === 0) return false;
    
    const query = `UPDATE classes SET ${fields.join(', ')} WHERE id = ?`;
    values.push(id);
    
    const [result] = await pool.query<ResultSetHeader>(query, values);
    return result.affectedRows > 0;
  }

  /**
   * Delete a class
   */
  async delete(id: string): Promise<boolean> {
    const query = 'DELETE FROM classes WHERE id = ?';
    const [result] = await pool.query<ResultSetHeader>(query, [id]);
    
    return result.affectedRows > 0;
  }

  /**
   * Get classes by course ID
   */
  async getByCourse(courseId: string): Promise<Class[]> {
    const [rows] = await pool.query<ClassRow[]>(
      'SELECT * FROM classes WHERE courseId = ?',
      [courseId]
    );
    return rows;
  }

  /**
   * Get classes by teacher ID
   */
  async getByTeacher(teacherId: string): Promise<Class[]> {
    const [rows] = await pool.query<ClassRow[]>(
      'SELECT * FROM classes WHERE teacherId = ?',
      [teacherId]
    );
    return rows;
  }

  /**
   * Check for room availability (no overlapping schedules)
   */
  async isRoomAvailable(
    room: string, 
    day: string, 
    startTime: string, 
    endTime: string, 
    excludeClassId?: string
  ): Promise<boolean> {
    let query = `
      SELECT c.id FROM classes c
      JOIN class_schedules cs ON c.id = cs.classId
      WHERE c.room = ? 
      AND cs.day = ?
      AND ((cs.startTime <= ? AND cs.endTime > ?) 
        OR (cs.startTime < ? AND cs.endTime >= ?) 
        OR (cs.startTime >= ? AND cs.endTime <= ?))
    `;
    
    const params = [
      room, 
      day, 
      endTime, startTime, 
      endTime, startTime, 
      startTime, endTime
    ];
    
    if (excludeClassId) {
      query += ' AND c.id != ?';
      params.push(excludeClassId);
    }
    
    const [rows] = await pool.query<RowDataPacket[]>(query, params);
    
    // If no rows returned, the room is available
    return rows.length === 0;
  }
}

export const classModel = new ClassModel(); 