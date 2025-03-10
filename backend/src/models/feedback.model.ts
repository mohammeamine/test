import { RowDataPacket, OkPacket } from 'mysql2';
import { v4 as uuidv4 } from 'uuid';
import { pool } from '../config/db';

export type FeedbackStatus = 'pending' | 'reviewed';

export interface Feedback {
  id: string;
  studentId: string;
  courseId: string;
  rating: number;
  comment: string;
  submittedAt: Date;
  status: FeedbackStatus;
  teacherResponse?: string;
  teacherResponseDate?: Date;
  createdAt: Date;
  updatedAt: Date;
}

export interface CreateFeedbackDTO {
  studentId: string;
  courseId: string;
  rating: number;
  comment: string;
}

export interface UpdateFeedbackDTO {
  rating?: number;
  comment?: string;
}

export interface TeacherResponseDTO {
  response: string;
}

interface FeedbackRow extends Feedback, RowDataPacket {}

export class FeedbackModel {
  /**
   * Create the feedback table if it doesn't exist
   */
  async createTable(): Promise<void> {
    const query = `
      CREATE TABLE IF NOT EXISTS feedback (
        id VARCHAR(36) PRIMARY KEY,
        studentId VARCHAR(36) NOT NULL,
        courseId VARCHAR(36) NOT NULL,
        rating INT NOT NULL,
        comment TEXT NOT NULL,
        submittedAt DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
        status ENUM('pending', 'reviewed') NOT NULL DEFAULT 'pending',
        teacherResponse TEXT,
        teacherResponseDate DATETIME,
        createdAt DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
        updatedAt DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
        FOREIGN KEY (studentId) REFERENCES users(id) ON DELETE CASCADE,
        FOREIGN KEY (courseId) REFERENCES courses(id) ON DELETE CASCADE
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
    `;
    
    await pool.query(query);
  }

  /**
   * Find a feedback by ID
   */
  async findById(id: string): Promise<Feedback | null> {
    const [rows] = await pool.query<FeedbackRow[]>(
      'SELECT * FROM feedback WHERE id = ?',
      [id]
    );
    
    return rows.length ? rows[0] : null;
  }

  /**
   * Create a new feedback
   */
  async create(feedbackData: CreateFeedbackDTO): Promise<string> {
    const id = uuidv4();
    
    const query = `
      INSERT INTO feedback (
        id, studentId, courseId, rating, comment, submittedAt
      ) VALUES (?, ?, ?, ?, ?, NOW())
    `;
    
    await pool.query<OkPacket>(query, [
      id,
      feedbackData.studentId,
      feedbackData.courseId,
      feedbackData.rating,
      feedbackData.comment
    ]);
    
    return id;
  }

  /**
   * Update a feedback
   */
  async update(id: string, feedbackData: UpdateFeedbackDTO): Promise<boolean> {
    // Build query dynamically based on provided fields
    const fields: string[] = [];
    const values: any[] = [];
    
    Object.entries(feedbackData).forEach(([key, value]) => {
      if (value !== undefined) {
        fields.push(`${key} = ?`);
        values.push(value);
      }
    });
    
    if (fields.length === 0) {
      return false;
    }
    
    const query = `
      UPDATE feedback
      SET ${fields.join(', ')}
      WHERE id = ?
    `;
    
    values.push(id);
    
    const [result] = await pool.query<OkPacket>(query, values);
    
    return result.affectedRows > 0;
  }

  /**
   * Add teacher response to feedback
   */
  async addTeacherResponse(id: string, response: string): Promise<boolean> {
    const query = `
      UPDATE feedback
      SET teacherResponse = ?, teacherResponseDate = NOW(), status = 'reviewed'
      WHERE id = ?
    `;
    
    const [result] = await pool.query<OkPacket>(query, [response, id]);
    
    return result.affectedRows > 0;
  }

  /**
   * Delete a feedback
   */
  async delete(id: string): Promise<boolean> {
    const [result] = await pool.query<OkPacket>(
      'DELETE FROM feedback WHERE id = ?',
      [id]
    );
    
    return result.affectedRows > 0;
  }

  /**
   * Get feedback for a student
   */
  async getByStudentId(studentId: string): Promise<any[]> {
    const query = `
      SELECT f.*, c.name as courseName, u.firstName as teacherFirstName, u.lastName as teacherLastName, 
             u.avatar as teacherAvatar
      FROM feedback f
      JOIN courses c ON f.courseId = c.id
      JOIN users u ON c.teacherId = u.id
      WHERE f.studentId = ?
      ORDER BY f.submittedAt DESC
    `;
    
    const [rows] = await pool.query<RowDataPacket[]>(query, [studentId]);
    
    return rows;
  }

  /**
   * Get feedback for a course
   */
  async getByCourseId(courseId: string): Promise<any[]> {
    const query = `
      SELECT f.*, u.firstName as studentFirstName, u.lastName as studentLastName, 
             u.avatar as studentAvatar
      FROM feedback f
      JOIN users u ON f.studentId = u.id
      WHERE f.courseId = ?
      ORDER BY f.submittedAt DESC
    `;
    
    const [rows] = await pool.query<RowDataPacket[]>(query, [courseId]);
    
    return rows;
  }

  /**
   * Get feedback for a teacher
   */
  async getByTeacherId(teacherId: string): Promise<any[]> {
    const query = `
      SELECT f.*, c.name as courseName, u.firstName as studentFirstName, 
             u.lastName as studentLastName, u.avatar as studentAvatar
      FROM feedback f
      JOIN courses c ON f.courseId = c.id
      JOIN users u ON f.studentId = u.id
      WHERE c.teacherId = ?
      ORDER BY f.submittedAt DESC
    `;
    
    const [rows] = await pool.query<RowDataPacket[]>(query, [teacherId]);
    
    return rows;
  }

  /**
   * Get feedback statistics for a course
   */
  async getCourseStats(courseId: string): Promise<{
    averageRating: number;
    totalFeedback: number;
    ratingDistribution: Record<number, number>;
  }> {
    // Get average rating
    const [avgRows] = await pool.query<RowDataPacket[]>(
      'SELECT AVG(rating) as averageRating FROM feedback WHERE courseId = ?',
      [courseId]
    );
    const averageRating = avgRows[0]?.averageRating || 0;
    
    // Get total feedback count
    const [countRows] = await pool.query<RowDataPacket[]>(
      'SELECT COUNT(*) as count FROM feedback WHERE courseId = ?',
      [courseId]
    );
    const totalFeedback = countRows[0]?.count || 0;
    
    // Get rating distribution
    const [distRows] = await pool.query<RowDataPacket[]>(
      'SELECT rating, COUNT(*) as count FROM feedback WHERE courseId = ? GROUP BY rating',
      [courseId]
    );
    
    const ratingDistribution: Record<number, number> = {
      1: 0, 2: 0, 3: 0, 4: 0, 5: 0
    };
    
    distRows.forEach((row: any) => {
      ratingDistribution[row.rating] = row.count;
    });
    
    return {
      averageRating,
      totalFeedback,
      ratingDistribution
    };
  }

  /**
   * Check if a student has already submitted feedback for a course
   */
  async hasSubmittedFeedback(studentId: string, courseId: string): Promise<boolean> {
    const [rows] = await pool.query<RowDataPacket[]>(
      'SELECT COUNT(*) as count FROM feedback WHERE studentId = ? AND courseId = ?',
      [studentId, courseId]
    );
    
    return rows[0]?.count > 0;
  }
}

export const feedbackModel = new FeedbackModel(); 