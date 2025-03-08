import { pool } from '../config/db';
import { ResultSetHeader, RowDataPacket } from 'mysql2';
import { v4 as uuidv4 } from 'uuid';

// Course types
export interface Course {
  id: string;
  name: string;
  code: string;
  description: string;
  teacherId: string;
  startDate: string;
  endDate: string;
  credits: number;
  maxStudents: number;
  status: 'active' | 'upcoming' | 'completed';
  createdAt: string;
  updatedAt: string;
}

// Define the RowDataPacket extension for type safety
interface CourseRow extends Course, RowDataPacket {}

class CourseModel {
  /**
   * Create course table if it doesn't exist
   */
  async createTable(): Promise<void> {
    const query = `
      CREATE TABLE IF NOT EXISTS courses (
        id VARCHAR(36) PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        code VARCHAR(50) NOT NULL UNIQUE,
        description TEXT,
        teacherId VARCHAR(36) NOT NULL,
        startDate DATE NOT NULL,
        endDate DATE NOT NULL,
        credits INT NOT NULL DEFAULT 1,
        maxStudents INT NOT NULL DEFAULT 30,
        status ENUM('active', 'upcoming', 'completed') NOT NULL DEFAULT 'upcoming',
        createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
        FOREIGN KEY (teacherId) REFERENCES users(id) ON DELETE CASCADE
      );
    `;
    await pool.query(query);
  }

  /**
   * Get all courses with optional filters
   */
  async findAll(filters?: {
    teacherId?: string;
    status?: 'active' | 'upcoming' | 'completed';
    search?: string;
  }): Promise<Course[]> {
    let query = 'SELECT * FROM courses';
    const params: any[] = [];
    
    // Build WHERE clause if filters are provided
    if (filters) {
      const conditions: string[] = [];
      
      if (filters.teacherId) {
        conditions.push('teacherId = ?');
        params.push(filters.teacherId);
      }
      
      if (filters.status) {
        conditions.push('status = ?');
        params.push(filters.status);
      }
      
      if (filters.search) {
        conditions.push('(name LIKE ? OR code LIKE ? OR description LIKE ?)');
        const searchParam = `%${filters.search}%`;
        params.push(searchParam, searchParam, searchParam);
      }
      
      if (conditions.length > 0) {
        query += ' WHERE ' + conditions.join(' AND ');
      }
    }
    
    query += ' ORDER BY startDate DESC';
    
    const [rows] = await pool.query<CourseRow[]>(query, params);
    return rows;
  }

  /**
   * Get course by ID
   */
  async findById(id: string): Promise<Course | null> {
    const [rows] = await pool.query<CourseRow[]>(
      'SELECT * FROM courses WHERE id = ?',
      [id]
    );
    return rows.length ? rows[0] : null;
  }

  /**
   * Get course by code
   */
  async findByCode(code: string): Promise<Course | null> {
    const [rows] = await pool.query<CourseRow[]>(
      'SELECT * FROM courses WHERE code = ?',
      [code]
    );
    return rows.length ? rows[0] : null;
  }

  /**
   * Create a new course
   */
  async create(courseData: Omit<Course, 'id' | 'createdAt' | 'updatedAt'>): Promise<string> {
    const id = uuidv4();
    
    const query = `
      INSERT INTO courses (
        id, name, code, description, teacherId, 
        startDate, endDate, credits, maxStudents, status
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;
    
    await pool.query<ResultSetHeader>(query, [
      id,
      courseData.name,
      courseData.code,
      courseData.description,
      courseData.teacherId,
      courseData.startDate,
      courseData.endDate,
      courseData.credits,
      courseData.maxStudents,
      courseData.status
    ]);
    
    return id;
  }

  /**
   * Update a course
   */
  async update(id: string, courseData: Partial<Omit<Course, 'id' | 'createdAt' | 'updatedAt'>>): Promise<boolean> {
    // Build query dynamically based on provided fields
    const fields: string[] = [];
    const values: any[] = [];
    
    Object.entries(courseData).forEach(([key, value]) => {
      if (value !== undefined) {
        fields.push(`${key} = ?`);
        values.push(value);
      }
    });
    
    if (fields.length === 0) return false;
    
    const query = `UPDATE courses SET ${fields.join(', ')} WHERE id = ?`;
    values.push(id);
    
    const [result] = await pool.query<ResultSetHeader>(query, values);
    return result.affectedRows > 0;
  }

  /**
   * Delete a course
   */
  async delete(id: string): Promise<boolean> {
    const query = 'DELETE FROM courses WHERE id = ?';
    const [result] = await pool.query<ResultSetHeader>(query, [id]);
    
    return result.affectedRows > 0;
  }

  /**
   * Get courses by teacher ID
   */
  async getByTeacher(teacherId: string): Promise<Course[]> {
    const [rows] = await pool.query<CourseRow[]>(
      'SELECT * FROM courses WHERE teacherId = ? ORDER BY startDate DESC',
      [teacherId]
    );
    return rows;
  }

  /**
   * Get active courses
   */
  async getActiveCourses(): Promise<Course[]> {
    const [rows] = await pool.query<CourseRow[]>(
      'SELECT * FROM courses WHERE status = ? ORDER BY startDate',
      ['active']
    );
    return rows;
  }

  /**
   * Get upcoming courses
   */
  async getUpcomingCourses(): Promise<Course[]> {
    const [rows] = await pool.query<CourseRow[]>(
      'SELECT * FROM courses WHERE status = ? ORDER BY startDate',
      ['upcoming']
    );
    return rows;
  }

  /**
   * Count enrolled students in a course
   */
  async countEnrolledStudents(courseId: string): Promise<number> {
    const [rows] = await pool.query<RowDataPacket[]>(
      'SELECT COUNT(*) as count FROM course_enrollments WHERE courseId = ? AND status = ?',
      [courseId, 'active']
    );
    return rows[0].count;
  }
}

export const courseModel = new CourseModel(); 