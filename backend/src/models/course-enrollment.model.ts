import { pool } from '../config/db';
import { ResultSetHeader, RowDataPacket } from 'mysql2';
import { v4 as uuidv4 } from 'uuid';

// Course enrollment types
export interface CourseEnrollment {
  id: string;
  courseId: string;
  studentId: string;
  enrollmentDate: string;
  status: 'active' | 'dropped' | 'completed';
  createdAt: string;
  updatedAt: string;
}

// Define the RowDataPacket extension for type safety
interface CourseEnrollmentRow extends CourseEnrollment, RowDataPacket {}

class CourseEnrollmentModel {
  /**
   * Create course enrollment table if it doesn't exist
   */
  async createTable(): Promise<void> {
    const query = `
      CREATE TABLE IF NOT EXISTS course_enrollments (
        id VARCHAR(36) PRIMARY KEY,
        courseId VARCHAR(36) NOT NULL,
        studentId VARCHAR(36) NOT NULL,
        enrollmentDate TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        status ENUM('active', 'dropped', 'completed') DEFAULT 'active',
        createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
        UNIQUE KEY (courseId, studentId),
        FOREIGN KEY (courseId) REFERENCES courses(id) ON DELETE CASCADE,
        FOREIGN KEY (studentId) REFERENCES users(id) ON DELETE CASCADE
      );
    `;
    await pool.query(query);
  }

  /**
   * Get all enrollments with optional filters
   */
  async findAll(filters?: {
    courseId?: string;
    studentId?: string;
    status?: 'active' | 'dropped' | 'completed';
  }): Promise<CourseEnrollment[]> {
    let query = 'SELECT * FROM course_enrollments';
    const params: any[] = [];
    
    // Build WHERE clause if filters are provided
    if (filters) {
      const conditions: string[] = [];
      
      if (filters.courseId) {
        conditions.push('courseId = ?');
        params.push(filters.courseId);
      }
      
      if (filters.studentId) {
        conditions.push('studentId = ?');
        params.push(filters.studentId);
      }
      
      if (filters.status) {
        conditions.push('status = ?');
        params.push(filters.status);
      }
      
      if (conditions.length > 0) {
        query += ' WHERE ' + conditions.join(' AND ');
      }
    }
    
    query += ' ORDER BY enrollmentDate DESC';
    
    const [rows] = await pool.query<CourseEnrollmentRow[]>(query, params);
    return rows;
  }

  /**
   * Get enrollment by ID
   */
  async findById(id: string): Promise<CourseEnrollment | null> {
    const [rows] = await pool.query<CourseEnrollmentRow[]>(
      'SELECT * FROM course_enrollments WHERE id = ?',
      [id]
    );
    return rows.length ? rows[0] : null;
  }

  /**
   * Get enrollment by course and student
   */
  async findByCourseAndStudent(courseId: string, studentId: string): Promise<CourseEnrollment | null> {
    const [rows] = await pool.query<CourseEnrollmentRow[]>(
      'SELECT * FROM course_enrollments WHERE courseId = ? AND studentId = ?',
      [courseId, studentId]
    );
    return rows.length ? rows[0] : null;
  }

  /**
   * Create a new enrollment
   */
  async enroll(courseId: string, studentId: string): Promise<string> {
    // Check if enrollment already exists
    const existingEnrollment = await this.findByCourseAndStudent(courseId, studentId);
    if (existingEnrollment) {
      if (existingEnrollment.status === 'dropped') {
        // Reactivate dropped enrollment
        await this.updateStatus(existingEnrollment.id, 'active');
        return existingEnrollment.id;
      }
      // Already enrolled
      return existingEnrollment.id;
    }
    
    const id = uuidv4();
    
    const query = `
      INSERT INTO course_enrollments (
        id, courseId, studentId, status
      ) VALUES (?, ?, ?, ?)
    `;
    
    await pool.query<ResultSetHeader>(query, [
      id,
      courseId,
      studentId,
      'active'
    ]);
    
    return id;
  }

  /**
   * Update enrollment status
   */
  async updateStatus(id: string, status: 'active' | 'dropped' | 'completed'): Promise<boolean> {
    const query = 'UPDATE course_enrollments SET status = ? WHERE id = ?';
    
    const [result] = await pool.query<ResultSetHeader>(query, [status, id]);
    return result.affectedRows > 0;
  }

  /**
   * Delete enrollment
   */
  async delete(id: string): Promise<boolean> {
    const query = 'DELETE FROM course_enrollments WHERE id = ?';
    const [result] = await pool.query<ResultSetHeader>(query, [id]);
    
    return result.affectedRows > 0;
  }

  /**
   * Get student's courses
   */
  async getStudentCourses(studentId: string, status: 'active' | 'dropped' | 'completed' = 'active'): Promise<string[]> {
    const [rows] = await pool.query<RowDataPacket[]>(
      `SELECT courseId FROM course_enrollments 
       WHERE studentId = ? AND status = ?
       ORDER BY enrollmentDate DESC`,
      [studentId, status]
    );
    
    return rows.map(row => row.courseId);
  }

  /**
   * Get course enrollments with student details
   */
  async getCourseEnrollmentsWithStudents(courseId: string): Promise<any[]> {
    const [rows] = await pool.query<RowDataPacket[]>(
      `SELECT ce.*, u.firstName, u.lastName, u.email 
       FROM course_enrollments ce
       JOIN users u ON ce.studentId = u.id
       WHERE ce.courseId = ?
       ORDER BY u.lastName, u.firstName`,
      [courseId]
    );
    
    return rows;
  }

  /**
   * Count course enrollments
   */
  async countEnrollments(courseId: string, status: 'active' | 'dropped' | 'completed' = 'active'): Promise<number> {
    const [rows] = await pool.query<RowDataPacket[]>(
      'SELECT COUNT(*) as count FROM course_enrollments WHERE courseId = ? AND status = ?',
      [courseId, status]
    );
    
    return rows[0].count;
  }
}

export const courseEnrollmentModel = new CourseEnrollmentModel(); 