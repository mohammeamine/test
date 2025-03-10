import { promisify } from 'util';
import { pool } from '../config/db';
import { OkPacket, RowDataPacket } from 'mysql2';

export interface Student {
  id: string;
  userId: string;
  firstName: string;
  lastName: string;
  email: string;
  enrollmentDate: Date;
  graduationDate?: Date;
  status: 'active' | 'graduated' | 'on_leave' | 'suspended';
}

export class StudentModel {
  // Find student by ID
  static async findById(id: string): Promise<Student | null> {
    try {
      const query = `
        SELECT s.id, s.userId, u.firstName, u.lastName, u.email, s.enrollmentDate, s.graduationDate, s.status
        FROM students s
        JOIN users u ON s.userId = u.id
        WHERE s.id = ?
      `;

      const queryAsync = promisify<string, any[], RowDataPacket[]>(pool.query);
      const [rows] = await queryAsync(query, [id]);

      if (rows.length === 0) {
        return null;
      }

      const student = rows[0];
      return {
        id: student.id.toString(),
        userId: student.userId.toString(),
        firstName: student.firstName,
        lastName: student.lastName,
        email: student.email,
        enrollmentDate: new Date(student.enrollmentDate),
        graduationDate: student.graduationDate ? new Date(student.graduationDate) : undefined,
        status: student.status as 'active' | 'graduated' | 'on_leave' | 'suspended'
      };
    } catch (error) {
      console.error('Error finding student by id:', error);
      throw error;
    }
  }

  // Check if student is enrolled in a course
  static async isEnrolledInCourse(studentId: string, courseId: string): Promise<boolean> {
    try {
      const query = `
        SELECT 1
        FROM course_enrollments
        WHERE studentId = ? AND courseId = ? AND status = 'active'
      `;

      const queryAsync = promisify<string, any[], RowDataPacket[]>(pool.query);
      const [rows] = await queryAsync(query, [studentId, courseId]);

      return rows.length > 0;
    } catch (error) {
      console.error('Error checking if student is enrolled in course:', error);
      throw error;
    }
  }

  // Check if user is a teacher for a course
  static async isTeacherForCourse(userId: string, courseId: string): Promise<boolean> {
    try {
      const query = `
        SELECT 1
        FROM course_teachers
        JOIN users ON users.id = course_teachers.teacherId
        WHERE users.id = ? AND course_teachers.courseId = ?
      `;

      const queryAsync = promisify<string, any[], RowDataPacket[]>(pool.query);
      const [rows] = await queryAsync(query, [userId, courseId]);

      return rows.length > 0;
    } catch (error) {
      console.error('Error checking if user is teacher for course:', error);
      throw error;
    }
  }

  // Get student courses
  static async getStudentCourses(studentId: string, filters?: { status?: string; search?: string }): Promise<any[]> {
    try {
      let query = `
        SELECT c.id, c.name, c.code, c.description, c.credits, c.startDate, c.endDate, c.status,
               ce.status as enrollmentStatus, ce.enrolledAt
        FROM courses c
        JOIN course_enrollments ce ON c.id = ce.courseId
        WHERE ce.studentId = ?
      `;

      const params: any[] = [studentId];

      if (filters) {
        if (filters.status && filters.status !== 'all') {
          query += ` AND c.status = ?`;
          params.push(filters.status);
        }

        if (filters.search) {
          query += ` AND (c.name LIKE ? OR c.code LIKE ? OR c.description LIKE ?)`;
          const searchTerm = `%${filters.search}%`;
          params.push(searchTerm, searchTerm, searchTerm);
        }
      }

      query += ` ORDER BY c.startDate DESC`;

      const queryAsync = promisify<string, any[], RowDataPacket[]>(pool.query);
      const [rows] = await queryAsync(query, params);

      return rows.map((row: RowDataPacket) => ({
        id: row.id.toString(),
        name: row.name,
        code: row.code,
        description: row.description,
        credits: row.credits,
        startDate: new Date(row.startDate),
        endDate: new Date(row.endDate),
        status: row.status,
        enrollmentStatus: row.enrollmentStatus,
        enrolledAt: new Date(row.enrolledAt)
      }));
    } catch (error) {
      console.error('Error getting student courses:', error);
      throw error;
    }
  }

  // Get upcoming assignments for a student
  static async getUpcomingAssignments(studentId: string, limit: number = 5): Promise<any[]> {
    try {
      const query = `
        SELECT a.id, a.title, a.description, a.dueDate, a.totalPoints,
               c.id as courseId, c.name as courseName, c.code as courseCode
        FROM assignments a
        JOIN courses c ON a.courseId = c.id
        JOIN course_enrollments ce ON c.id = ce.courseId AND ce.studentId = ?
        WHERE a.dueDate > NOW() AND ce.status = 'active'
        ORDER BY a.dueDate ASC
        LIMIT ?
      `;

      const queryAsync = promisify<string, any[], RowDataPacket[]>(pool.query);
      const [rows] = await queryAsync(query, [studentId, limit]);

      return rows.map((row: RowDataPacket) => ({
        id: row.id.toString(),
        title: row.title,
        description: row.description,
        dueDate: new Date(row.dueDate),
        totalPoints: row.totalPoints,
        courseId: row.courseId.toString(),
        courseName: row.courseName,
        courseCode: row.courseCode
      }));
    } catch (error) {
      console.error('Error getting upcoming assignments:', error);
      throw error;
    }
  }

  // Get recent grades for a student
  static async getRecentGrades(studentId: string, limit: number = 5): Promise<any[]> {
    try {
      const query = `
        SELECT g.id, g.assignmentId, g.score, g.comments, g.gradedAt,
               a.title as assignmentTitle, a.totalPoints,
               c.id as courseId, c.name as courseName, c.code as courseCode
        FROM grades g
        JOIN assignments a ON g.assignmentId = a.id
        JOIN courses c ON a.courseId = c.id
        WHERE g.studentId = ?
        ORDER BY g.gradedAt DESC
        LIMIT ?
      `;

      const queryAsync = promisify<string, any[], RowDataPacket[]>(pool.query);
      const [rows] = await queryAsync(query, [studentId, limit]);

      return rows.map((row: RowDataPacket) => ({
        id: row.id.toString(),
        assignmentId: row.assignmentId.toString(),
        score: row.score,
        comments: row.comments,
        gradedAt: new Date(row.gradedAt),
        assignmentTitle: row.assignmentTitle,
        totalPoints: row.totalPoints,
        courseId: row.courseId.toString(),
        courseName: row.courseName,
        courseCode: row.courseCode
      }));
    } catch (error) {
      console.error('Error getting recent grades:', error);
      throw error;
    }
  }

  // Get attendance statistics for a student
  static async getAttendanceStats(studentId: string): Promise<any> {
    try {
      const query = `
        SELECT 
          COUNT(CASE WHEN status = 'present' THEN 1 END) as present,
          COUNT(CASE WHEN status = 'absent' THEN 1 END) as absent,
          COUNT(CASE WHEN status = 'late' THEN 1 END) as late,
          COUNT(*) as total
        FROM attendance
        WHERE studentId = ?
      `;

      const queryAsync = promisify<string, any[], RowDataPacket[]>(pool.query);
      const [rows] = await queryAsync(query, [studentId]);

      if (rows.length === 0) {
        return {
          present: 0,
          absent: 0,
          late: 0,
          total: 0,
          percentage: 0
        };
      }

      const stats = rows[0];
      const percentage = stats.total > 0 ? (stats.present / stats.total) * 100 : 0;

      return {
        present: stats.present,
        absent: stats.absent,
        late: stats.late,
        total: stats.total,
        percentage: Math.round(percentage * 100) / 100 // Round to 2 decimal places
      };
    } catch (error) {
      console.error('Error getting attendance statistics:', error);
      throw error;
    }
  }
}

// SQL to create the students table
export const createStudentsTableSQL = `
  CREATE TABLE IF NOT EXISTS students (
    id INT AUTO_INCREMENT PRIMARY KEY,
    userId INT NOT NULL,
    enrollmentDate DATE NOT NULL,
    graduationDate DATE,
    status ENUM('active', 'graduated', 'on_leave', 'suspended') DEFAULT 'active',
    FOREIGN KEY (userId) REFERENCES users(id) ON DELETE CASCADE
  ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
`; 