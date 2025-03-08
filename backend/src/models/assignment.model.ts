import { pool } from '../config/db';
import { ResultSetHeader, RowDataPacket } from 'mysql2';
import { v4 as uuidv4 } from 'uuid';

// Assignment types
export interface Assignment {
  id: string;
  courseId: string;
  title: string;
  description: string;
  dueDate: string;
  points: number;
  status: 'draft' | 'published' | 'closed';
  createdAt: string;
  updatedAt: string;
}

// Define the RowDataPacket extension for type safety
interface AssignmentRow extends Assignment, RowDataPacket {}

class AssignmentModel {
  /**
   * Create assignment table if it doesn't exist
   */
  async createTable(): Promise<void> {
    const query = `
      CREATE TABLE IF NOT EXISTS assignments (
        id VARCHAR(36) PRIMARY KEY,
        courseId VARCHAR(36) NOT NULL,
        title VARCHAR(255) NOT NULL,
        description TEXT,
        dueDate DATETIME NOT NULL,
        points INT NOT NULL DEFAULT 100,
        status ENUM('draft', 'published', 'closed') NOT NULL DEFAULT 'draft',
        createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
        FOREIGN KEY (courseId) REFERENCES courses(id) ON DELETE CASCADE
      );
    `;
    await pool.query(query);
  }

  /**
   * Get all assignments with optional filters
   */
  async findAll(filters?: {
    courseId?: string;
    status?: 'draft' | 'published' | 'closed';
    title?: string;
    dueDate?: string;
    dueBefore?: string;
    dueAfter?: string;
  }): Promise<Assignment[]> {
    let query = 'SELECT * FROM assignments';
    const params: any[] = [];
    
    // Build WHERE clause if filters are provided
    if (filters) {
      const conditions: string[] = [];
      
      if (filters.courseId) {
        conditions.push('courseId = ?');
        params.push(filters.courseId);
      }
      
      if (filters.status) {
        conditions.push('status = ?');
        params.push(filters.status);
      }
      
      if (filters.title) {
        conditions.push('title LIKE ?');
        params.push(`%${filters.title}%`);
      }
      
      if (filters.dueDate) {
        conditions.push('DATE(dueDate) = ?');
        params.push(filters.dueDate);
      }
      
      if (filters.dueBefore) {
        conditions.push('dueDate <= ?');
        params.push(filters.dueBefore);
      }
      
      if (filters.dueAfter) {
        conditions.push('dueDate >= ?');
        params.push(filters.dueAfter);
      }
      
      if (conditions.length > 0) {
        query += ' WHERE ' + conditions.join(' AND ');
      }
    }
    
    query += ' ORDER BY dueDate ASC';
    
    const [rows] = await pool.query<AssignmentRow[]>(query, params);
    return rows;
  }

  /**
   * Get assignment by ID
   */
  async findById(id: string): Promise<Assignment | null> {
    const [rows] = await pool.query<AssignmentRow[]>(
      'SELECT * FROM assignments WHERE id = ?',
      [id]
    );
    return rows.length ? rows[0] : null;
  }

  /**
   * Create a new assignment
   */
  async create(assignmentData: Omit<Assignment, 'id' | 'createdAt' | 'updatedAt'>): Promise<string> {
    const id = uuidv4();
    
    const query = `
      INSERT INTO assignments (
        id, courseId, title, description, dueDate, points, status
      ) VALUES (?, ?, ?, ?, ?, ?, ?)
    `;
    
    await pool.query<ResultSetHeader>(query, [
      id,
      assignmentData.courseId,
      assignmentData.title,
      assignmentData.description,
      assignmentData.dueDate,
      assignmentData.points,
      assignmentData.status
    ]);
    
    return id;
  }

  /**
   * Update an assignment
   */
  async update(id: string, assignmentData: Partial<Omit<Assignment, 'id' | 'createdAt' | 'updatedAt'>>): Promise<boolean> {
    // Build query dynamically based on provided fields
    const fields: string[] = [];
    const values: any[] = [];
    
    Object.entries(assignmentData).forEach(([key, value]) => {
      if (value !== undefined) {
        fields.push(`${key} = ?`);
        values.push(value);
      }
    });
    
    if (fields.length === 0) return false;
    
    const query = `UPDATE assignments SET ${fields.join(', ')} WHERE id = ?`;
    values.push(id);
    
    const [result] = await pool.query<ResultSetHeader>(query, values);
    return result.affectedRows > 0;
  }

  /**
   * Delete an assignment
   */
  async delete(id: string): Promise<boolean> {
    const query = 'DELETE FROM assignments WHERE id = ?';
    const [result] = await pool.query<ResultSetHeader>(query, [id]);
    
    return result.affectedRows > 0;
  }

  /**
   * Get assignments by course ID
   */
  async getByCourse(courseId: string): Promise<Assignment[]> {
    const [rows] = await pool.query<AssignmentRow[]>(
      'SELECT * FROM assignments WHERE courseId = ? ORDER BY dueDate ASC',
      [courseId]
    );
    return rows;
  }

  /**
   * Get upcoming assignments for a student based on their enrolled courses
   */
  async getUpcomingForStudent(studentId: string, limit: number = 5): Promise<Assignment[]> {
    const query = `
      SELECT a.* FROM assignments a
      JOIN course_enrollments ce ON a.courseId = ce.courseId
      WHERE ce.studentId = ? 
      AND ce.status = 'active'
      AND a.status = 'published'
      AND a.dueDate > NOW()
      ORDER BY a.dueDate ASC
      LIMIT ?
    `;
    
    const [rows] = await pool.query<AssignmentRow[]>(query, [studentId, limit]);
    return rows;
  }

  /**
   * Get recent assignments for a teacher based on courses they teach
   */
  async getRecentForTeacher(teacherId: string, limit: number = 10): Promise<Assignment[]> {
    const query = `
      SELECT a.* FROM assignments a
      JOIN courses c ON a.courseId = c.id
      WHERE c.teacherId = ?
      ORDER BY a.createdAt DESC
      LIMIT ?
    `;
    
    const [rows] = await pool.query<AssignmentRow[]>(query, [teacherId, limit]);
    return rows;
  }

  /**
   * Count assignments for a course
   */
  async countByCourse(courseId: string): Promise<number> {
    const [rows] = await pool.query<RowDataPacket[]>(
      'SELECT COUNT(*) as count FROM assignments WHERE courseId = ?',
      [courseId]
    );
    
    return rows[0].count;
  }
}

export const assignmentModel = new AssignmentModel(); 