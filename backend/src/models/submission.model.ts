import { pool } from '../config/db';
import { ResultSetHeader, RowDataPacket } from 'mysql2';
import { v4 as uuidv4 } from 'uuid';

// Submission types
export interface Submission {
  id: string;
  assignmentId: string;
  studentId: string;
  submittedAt: string;
  grade?: number;
  feedback?: string;
  status: 'submitted' | 'graded' | 'late';
  submissionUrl?: string;
  createdAt: string;
  updatedAt: string;
}

// Define the RowDataPacket extension for type safety
interface SubmissionRow extends Submission, RowDataPacket {}

class SubmissionModel {
  /**
   * Create submission table if it doesn't exist
   */
  async createTable(): Promise<void> {
    const query = `
      CREATE TABLE IF NOT EXISTS assignment_submissions (
        id VARCHAR(36) PRIMARY KEY,
        assignmentId VARCHAR(36) NOT NULL,
        studentId VARCHAR(36) NOT NULL,
        submittedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        grade INT,
        feedback TEXT,
        status ENUM('submitted', 'graded', 'late') NOT NULL DEFAULT 'submitted',
        submissionUrl VARCHAR(255),
        createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
        UNIQUE KEY (assignmentId, studentId),
        FOREIGN KEY (assignmentId) REFERENCES assignments(id) ON DELETE CASCADE,
        FOREIGN KEY (studentId) REFERENCES users(id) ON DELETE CASCADE
      );
    `;
    await pool.query(query);
  }

  /**
   * Get all submissions with optional filters
   */
  async findAll(filters?: {
    assignmentId?: string;
    studentId?: string;
    status?: 'submitted' | 'graded' | 'late';
  }): Promise<Submission[]> {
    let query = 'SELECT * FROM assignment_submissions';
    const params: any[] = [];
    
    // Build WHERE clause if filters are provided
    if (filters) {
      const conditions: string[] = [];
      
      if (filters.assignmentId) {
        conditions.push('assignmentId = ?');
        params.push(filters.assignmentId);
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
    
    query += ' ORDER BY submittedAt DESC';
    
    const [rows] = await pool.query<SubmissionRow[]>(query, params);
    return rows;
  }

  /**
   * Get submission by ID
   */
  async findById(id: string): Promise<Submission | null> {
    const [rows] = await pool.query<SubmissionRow[]>(
      'SELECT * FROM assignment_submissions WHERE id = ?',
      [id]
    );
    return rows.length ? rows[0] : null;
  }

  /**
   * Get submission by assignment and student
   */
  async findByAssignmentAndStudent(assignmentId: string, studentId: string): Promise<Submission | null> {
    const [rows] = await pool.query<SubmissionRow[]>(
      'SELECT * FROM assignment_submissions WHERE assignmentId = ? AND studentId = ?',
      [assignmentId, studentId]
    );
    return rows.length ? rows[0] : null;
  }

  /**
   * Create a new submission
   */
  async create(submissionData: Omit<Submission, 'id' | 'createdAt' | 'updatedAt'>): Promise<string> {
    const id = uuidv4();
    
    // First check if submission already exists
    const existingSubmission = await this.findByAssignmentAndStudent(
      submissionData.assignmentId,
      submissionData.studentId
    );
    
    if (existingSubmission) {
      // Update existing submission
      const fields = ['submittedAt = ?', 'status = ?'];
      const values = [new Date(), submissionData.status];
      
      if (submissionData.submissionUrl) {
        fields.push('submissionUrl = ?');
        values.push(submissionData.submissionUrl);
      }
      
      const query = `
        UPDATE assignment_submissions 
        SET ${fields.join(', ')} 
        WHERE id = ?
      `;
      
      const queryValues = [...values, existingSubmission.id];
      await pool.query<ResultSetHeader>(query, queryValues);
      
      return existingSubmission.id;
    }
    
    // Create new submission
    const query = `
      INSERT INTO assignment_submissions (
        id, assignmentId, studentId, status, submissionUrl
      ) VALUES (?, ?, ?, ?, ?)
    `;
    
    await pool.query<ResultSetHeader>(query, [
      id,
      submissionData.assignmentId,
      submissionData.studentId,
      submissionData.status,
      submissionData.submissionUrl || null
    ]);
    
    return id;
  }

  /**
   * Grade a submission
   */
  async grade(id: string, grade: number, feedback?: string): Promise<boolean> {
    const query = `
      UPDATE assignment_submissions 
      SET grade = ?, feedback = ?, status = 'graded'
      WHERE id = ?
    `;
    
    const [result] = await pool.query<ResultSetHeader>(query, [grade, feedback || null, id]);
    return result.affectedRows > 0;
  }

  /**
   * Get submissions by assignment
   */
  async getByAssignment(assignmentId: string): Promise<Submission[]> {
    const [rows] = await pool.query<SubmissionRow[]>(
      'SELECT * FROM assignment_submissions WHERE assignmentId = ? ORDER BY submittedAt DESC',
      [assignmentId]
    );
    return rows;
  }

  /**
   * Get submissions by student
   */
  async getByStudent(studentId: string): Promise<Submission[]> {
    const [rows] = await pool.query<SubmissionRow[]>(
      'SELECT * FROM assignment_submissions WHERE studentId = ? ORDER BY submittedAt DESC',
      [studentId]
    );
    return rows;
  }

  /**
   * Get submissions with assignment details for a student
   */
  async getSubmissionsWithAssignmentDetails(studentId: string): Promise<any[]> {
    const query = `
      SELECT s.*, a.title as assignmentTitle, a.dueDate, a.points, 
             c.id as courseId, c.name as courseName, c.code as courseCode
      FROM assignment_submissions s
      JOIN assignments a ON s.assignmentId = a.id
      JOIN courses c ON a.courseId = c.id
      WHERE s.studentId = ?
      ORDER BY s.submittedAt DESC
    `;
    
    const [rows] = await pool.query<RowDataPacket[]>(query, [studentId]);
    return rows;
  }

  /**
   * Get submissions with student details for an assignment
   */
  async getSubmissionsWithStudentDetails(assignmentId: string): Promise<any[]> {
    const query = `
      SELECT s.*, u.firstName, u.lastName, u.email
      FROM assignment_submissions s
      JOIN users u ON s.studentId = u.id
      WHERE s.assignmentId = ?
      ORDER BY u.lastName, u.firstName
    `;
    
    const [rows] = await pool.query<RowDataPacket[]>(query, [assignmentId]);
    return rows;
  }

  /**
   * Count submissions for an assignment
   */
  async countByAssignment(assignmentId: string, status?: 'submitted' | 'graded' | 'late'): Promise<number> {
    let query = 'SELECT COUNT(*) as count FROM assignment_submissions WHERE assignmentId = ?';
    const params = [assignmentId];
    
    if (status) {
      query += ' AND status = ?';
      params.push(status);
    }
    
    const [rows] = await pool.query<RowDataPacket[]>(query, params);
    return rows[0].count;
  }
  
  /**
   * Get average grade for an assignment
   */
  async getAverageGradeForAssignment(assignmentId: string): Promise<number | null> {
    const [rows] = await pool.query<RowDataPacket[]>(
      'SELECT AVG(grade) as average FROM assignment_submissions WHERE assignmentId = ? AND grade IS NOT NULL',
      [assignmentId]
    );
    
    // If no grades yet, return null
    if (rows[0].average === null) {
      return null;
    }
    
    return parseFloat(rows[0].average);
  }
}

export const submissionModel = new SubmissionModel(); 