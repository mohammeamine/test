import { pool } from '../config/db';
import { RowDataPacket, ResultSetHeader } from 'mysql2/promise';

// Define types for models
interface Course extends RowDataPacket {
  id: string;
  name: string;
  code: string;
  description: string;
  teacherId: string;
  status: string;
  startDate: Date;
  endDate: Date;
  credits: number;
  maxStudents: number;
  teacherFirstName?: string;
  teacherLastName?: string;
  enrolledCount?: number;
}

interface Assignment extends RowDataPacket {
  id: string;
  courseId: string;
  title: string;
  description: string;
  dueDate: Date;
  points: number;
  status: string;
  courseName?: string;
  courseCode?: string;
}

interface Grade extends RowDataPacket {
  id: string;
  studentId: string;
  assignmentId: string;
  score: number;
  feedback: string;
  createdAt: Date;
  updatedAt: Date;
  assignmentTitle?: string;
  courseName?: string;
  courseCode?: string;
}

interface Attendance extends RowDataPacket {
  id: string;
  studentId: string;
  classId: string;
  date: Date;
  status: 'present' | 'absent' | 'late';
}

interface Material extends RowDataPacket {
  id: string;
  courseId: string;
  title: string;
  description: string;
  type: string;
  url: string;
  createdAt: Date;
}

interface Submission extends RowDataPacket {
  id: string;
  studentId: string;
  assignmentId: string;
  content: string;
  attachmentUrl: string | null;
  submittedAt: Date;
  status: string;
  assignmentTitle?: string;
  dueDate?: Date;
  courseName?: string;
  courseCode?: string;
}

export interface StudentDashboardData {
  courses: Course[];
  upcomingAssignments: Assignment[];
  recentGrades: Grade[];
  attendanceStats: {
    present: number;
    absent: number;
    late: number;
    total: number;
    percentage: number;
  };
  schedule: any[]; // Will be populated with class schedule
}

export interface StudentCourseFilters {
  status?: 'active' | 'completed' | 'all';
  search?: string;
}

class StudentService {
  /**
   * Get dashboard data for a student
   */
  async getDashboardData(studentId: string): Promise<StudentDashboardData> {
    try {
      // Get student's courses
      const courses = await this.getStudentCourses(studentId);
      
      // Get upcoming assignments
      const upcomingAssignments = await this.getUpcomingAssignments(studentId);
      
      // Get recent grades
      const recentGrades = await this.getRecentGrades(studentId);
      
      // Get attendance stats
      const attendanceStats = await this.getAttendanceStats(studentId);
      
      // Get schedule
      const schedule = await this.getStudentSchedule(studentId);
      
      return {
        courses,
        upcomingAssignments,
        recentGrades,
        attendanceStats,
        schedule
      };
    } catch (error: any) {
      throw new Error(`Failed to get student dashboard data: ${error.message}`);
    }
  }

  /**
   * Get all courses for a student
   */
  async getStudentCourses(studentId: string, filters?: StudentCourseFilters): Promise<Course[]> {
    try {
      let query = `
        SELECT c.*, 
               u.firstName AS teacherFirstName, 
               u.lastName AS teacherLastName,
               (SELECT COUNT(*) FROM course_enrollments WHERE courseId = c.id) AS enrolledCount
        FROM courses c
        JOIN course_enrollments ce ON c.id = ce.courseId
        JOIN users u ON c.teacherId = u.id
        WHERE ce.studentId = ?
      `;
      
      const queryParams: any[] = [studentId];
      
      // Apply filters
      if (filters) {
        if (filters.status && filters.status !== 'all') {
          query += ` AND c.status = ?`;
          queryParams.push(filters.status);
        }
        
        if (filters.search) {
          query += ` AND (c.name LIKE ? OR c.code LIKE ?)`;
          queryParams.push(`%${filters.search}%`, `%${filters.search}%`);
        }
      }
      
      query += ` ORDER BY c.startDate DESC`;
      
      const [courses] = await pool.query<Course[]>(query, queryParams);
      return courses;
    } catch (error: any) {
      throw new Error(`Failed to get student courses: ${error.message}`);
    }
  }

  /**
   * Get upcoming assignments for a student
   */
  async getUpcomingAssignments(studentId: string, limit: number = 5): Promise<Assignment[]> {
    try {
      const query = `
        SELECT a.*, c.name AS courseName, c.code AS courseCode
        FROM assignments a
        JOIN courses c ON a.courseId = c.id
        JOIN course_enrollments ce ON c.id = ce.courseId
        WHERE ce.studentId = ?
          AND a.dueDate >= CURDATE()
          AND a.status = 'published'
        ORDER BY a.dueDate ASC
        LIMIT ?
      `;
      
      const [assignments] = await pool.query<Assignment[]>(query, [studentId, limit]);
      return assignments;
    } catch (error: any) {
      throw new Error(`Failed to get upcoming assignments: ${error.message}`);
    }
  }

  /**
   * Get recent grades for a student
   */
  async getRecentGrades(studentId: string, limit: number = 5): Promise<Grade[]> {
    try {
      const query = `
        SELECT g.*, a.title AS assignmentTitle, c.name AS courseName, c.code AS courseCode
        FROM grades g
        JOIN assignments a ON g.assignmentId = a.id
        JOIN courses c ON a.courseId = c.id
        WHERE g.studentId = ?
        ORDER BY g.createdAt DESC
        LIMIT ?
      `;
      
      const [grades] = await pool.query<Grade[]>(query, [studentId, limit]);
      return grades;
    } catch (error: any) {
      throw new Error(`Failed to get recent grades: ${error.message}`);
    }
  }

  /**
   * Get attendance statistics for a student
   */
  async getAttendanceStats(studentId: string): Promise<StudentDashboardData['attendanceStats']> {
    try {
      const query = `
        SELECT 
          SUM(CASE WHEN status = 'present' THEN 1 ELSE 0 END) AS present,
          SUM(CASE WHEN status = 'absent' THEN 1 ELSE 0 END) AS absent,
          SUM(CASE WHEN status = 'late' THEN 1 ELSE 0 END) AS late,
          COUNT(*) AS total
        FROM attendance
        WHERE studentId = ?
      `;
      
      const [results] = await pool.query(query, [studentId]);
      const stats = (results as any[])[0];
      
      return {
        present: stats.present || 0,
        absent: stats.absent || 0,
        late: stats.late || 0,
        total: stats.total || 0,
        percentage: stats.total ? Math.round((stats.present / stats.total) * 100) : 0
      };
    } catch (error: any) {
      throw new Error(`Failed to get attendance stats: ${error.message}`);
    }
  }

  /**
   * Get schedule for a student
   */
  async getStudentSchedule(studentId: string): Promise<any[]> {
    try {
      const query = `
        SELECT cs.*, c.name AS courseName, c.code AS courseCode
        FROM class_schedules cs
        JOIN classes cl ON cs.classId = cl.id
        JOIN courses c ON cl.courseId = c.id
        JOIN course_enrollments ce ON c.id = ce.courseId
        WHERE ce.studentId = ?
        ORDER BY cs.dayOfWeek, cs.startTime
      `;
      
      const [schedules] = await pool.query(query, [studentId]);
      
      // Group by day of week
      const groupedSchedule = [];
      const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
      
      for (const day of days) {
        const daySchedules = (schedules as any[]).filter(s => s.dayOfWeek === day);
        if (daySchedules.length > 0) {
          groupedSchedule.push({
            day,
            periods: daySchedules.map(s => ({
              time: `${s.startTime} - ${s.endTime}`,
              subject: s.courseName,
              code: s.courseCode,
              room: s.room
            }))
          });
        }
      }
      
      return groupedSchedule;
    } catch (error: any) {
      throw new Error(`Failed to get student schedule: ${error.message}`);
    }
  }

  /**
   * Get course materials for a student
   */
  async getCourseMaterials(studentId: string, courseId: string): Promise<Material[]> {
    try {
      const query = `
        SELECT m.*
        FROM materials m
        JOIN courses c ON m.courseId = c.id
        JOIN course_enrollments ce ON c.id = ce.courseId
        WHERE ce.studentId = ? AND c.id = ?
        ORDER BY m.createdAt DESC
      `;
      
      const [materials] = await pool.query<Material[]>(query, [studentId, courseId]);
      return materials;
    } catch (error: any) {
      throw new Error(`Failed to get course materials: ${error.message}`);
    }
  }

  /**
   * Get assignment submissions for a student
   */
  async getStudentSubmissions(studentId: string, courseId?: string): Promise<Submission[]> {
    try {
      let query = `
        SELECT s.*, a.title AS assignmentTitle, a.dueDate, c.name AS courseName, c.code AS courseCode
        FROM assignment_submissions s
        JOIN assignments a ON s.assignmentId = a.id
        JOIN courses c ON a.courseId = c.id
        WHERE s.studentId = ?
      `;
      
      const queryParams: any[] = [studentId];
      
      if (courseId) {
        query += ` AND c.id = ?`;
        queryParams.push(courseId);
      }
      
      query += ` ORDER BY s.submittedAt DESC`;
      
      const [submissions] = await pool.query<Submission[]>(query, queryParams);
      return submissions;
    } catch (error: any) {
      throw new Error(`Failed to get student submissions: ${error.message}`);
    }
  }

  /**
   * Submit an assignment
   */
  async submitAssignment(studentId: string, assignmentId: string, submissionData: {
    content: string;
    attachmentUrl?: string;
  }): Promise<Submission> {
    try {
      // Check if student is enrolled in the course
      const enrollmentCheck = `
        SELECT ce.id
        FROM course_enrollments ce
        JOIN assignments a ON ce.courseId = a.courseId
        WHERE ce.studentId = ? AND a.id = ?
      `;
      
      const [enrollmentResult] = await pool.query(enrollmentCheck, [studentId, assignmentId]);
      
      if (!(enrollmentResult as any[]).length) {
        throw new Error('Student is not enrolled in this course');
      }
      
      // Check if assignment exists and is open
      const assignmentCheck = `
        SELECT * FROM assignments
        WHERE id = ? AND status = 'published' AND dueDate >= NOW()
      `;
      
      const [assignmentResult] = await pool.query(assignmentCheck, [assignmentId]);
      
      if (!(assignmentResult as any[]).length) {
        throw new Error('Assignment not found or closed for submission');
      }
      
      // Check if student already submitted
      const submissionCheck = `
        SELECT * FROM assignment_submissions
        WHERE studentId = ? AND assignmentId = ?
      `;
      
      const [submissionResult] = await pool.query(submissionCheck, [studentId, assignmentId]);
      
      if ((submissionResult as any[]).length) {
        // Update existing submission
        const updateQuery = `
          UPDATE assignment_submissions
          SET content = ?, attachmentUrl = ?, submittedAt = NOW(), status = 'submitted'
          WHERE studentId = ? AND assignmentId = ?
        `;
        
        await pool.query(updateQuery, [
          submissionData.content,
          submissionData.attachmentUrl || null,
          studentId,
          assignmentId
        ]);
        
        // Get updated submission
        const [updatedSubmission] = await pool.query(
          'SELECT * FROM assignment_submissions WHERE studentId = ? AND assignmentId = ?',
          [studentId, assignmentId]
        );
        
        return (updatedSubmission as any[])[0];
      } else {
        // Create new submission
        const insertQuery = `
          INSERT INTO assignment_submissions (studentId, assignmentId, content, attachmentUrl, submittedAt, status)
          VALUES (?, ?, ?, ?, NOW(), 'submitted')
        `;
        
        const [result] = await pool.query<ResultSetHeader>(insertQuery, [
          studentId,
          assignmentId,
          submissionData.content,
          submissionData.attachmentUrl || null
        ]);
        
        // Get created submission
        const [newSubmission] = await pool.query(
          'SELECT * FROM assignment_submissions WHERE id = ?',
          [result.insertId]
        );
        
        return (newSubmission as any[])[0];
      }
    } catch (error: any) {
      throw new Error(`Failed to submit assignment: ${error.message}`);
    }
  }
}

export const studentService = new StudentService();
export default studentService; 