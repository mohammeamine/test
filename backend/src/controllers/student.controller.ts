import { Request, Response } from 'express';
import { studentService, StudentCourseFilters } from '../services/student.service';

class StudentController {
  /**
   * Get dashboard data for a student
   */
  async getDashboardData(req: Request, res: Response) {
    try {
      const studentId = req.params.studentId || (req.user?.id as string);
      
      if (!studentId) {
        return res.status(400).json({
          error: true,
          message: 'Student ID is required',
        });
      }
      
      const dashboardData = await studentService.getDashboardData(studentId);
      
      res.status(200).json({
        error: false,
        data: dashboardData,
        message: 'Dashboard data retrieved successfully',
      });
    } catch (error: any) {
      res.status(500).json({
        error: true,
        message: error.message || 'Failed to retrieve dashboard data',
      });
    }
  }

  /**
   * Get courses for a student
   */
  async getStudentCourses(req: Request, res: Response) {
    try {
      const studentId = req.params.studentId || (req.user?.id as string);
      
      if (!studentId) {
        return res.status(400).json({
          error: true,
          message: 'Student ID is required',
        });
      }
      
      const filters: StudentCourseFilters = {
        status: req.query.status as any,
        search: req.query.search as string,
      };
      
      const courses = await studentService.getStudentCourses(studentId, filters);
      
      res.status(200).json({
        error: false,
        data: { courses },
        message: 'Student courses retrieved successfully',
      });
    } catch (error: any) {
      res.status(500).json({
        error: true,
        message: error.message || 'Failed to retrieve student courses',
      });
    }
  }

  /**
   * Get upcoming assignments for a student
   */
  async getUpcomingAssignments(req: Request, res: Response) {
    try {
      const studentId = req.params.studentId || (req.user?.id as string);
      const limit = req.query.limit ? parseInt(req.query.limit as string) : undefined;
      
      if (!studentId) {
        return res.status(400).json({
          error: true,
          message: 'Student ID is required',
        });
      }
      
      const assignments = await studentService.getUpcomingAssignments(studentId, limit);
      
      res.status(200).json({
        error: false,
        data: { assignments },
        message: 'Upcoming assignments retrieved successfully',
      });
    } catch (error: any) {
      res.status(500).json({
        error: true,
        message: error.message || 'Failed to retrieve upcoming assignments',
      });
    }
  }

  /**
   * Get recent grades for a student
   */
  async getRecentGrades(req: Request, res: Response) {
    try {
      const studentId = req.params.studentId || (req.user?.id as string);
      const limit = req.query.limit ? parseInt(req.query.limit as string) : undefined;
      
      if (!studentId) {
        return res.status(400).json({
          error: true,
          message: 'Student ID is required',
        });
      }
      
      const grades = await studentService.getRecentGrades(studentId, limit);
      
      res.status(200).json({
        error: false,
        data: { grades },
        message: 'Recent grades retrieved successfully',
      });
    } catch (error: any) {
      res.status(500).json({
        error: true,
        message: error.message || 'Failed to retrieve recent grades',
      });
    }
  }

  /**
   * Get attendance statistics for a student
   */
  async getAttendanceStats(req: Request, res: Response) {
    try {
      const studentId = req.params.studentId || (req.user?.id as string);
      
      if (!studentId) {
        return res.status(400).json({
          error: true,
          message: 'Student ID is required',
        });
      }
      
      const stats = await studentService.getAttendanceStats(studentId);
      
      res.status(200).json({
        error: false,
        data: { stats },
        message: 'Attendance statistics retrieved successfully',
      });
    } catch (error: any) {
      res.status(500).json({
        error: true,
        message: error.message || 'Failed to retrieve attendance statistics',
      });
    }
  }

  /**
   * Get schedule for a student
   */
  async getStudentSchedule(req: Request, res: Response) {
    try {
      const studentId = req.params.studentId || (req.user?.id as string);
      
      if (!studentId) {
        return res.status(400).json({
          error: true,
          message: 'Student ID is required',
        });
      }
      
      const schedule = await studentService.getStudentSchedule(studentId);
      
      res.status(200).json({
        error: false,
        data: { schedule },
        message: 'Student schedule retrieved successfully',
      });
    } catch (error: any) {
      res.status(500).json({
        error: true,
        message: error.message || 'Failed to retrieve student schedule',
      });
    }
  }

  /**
   * Get course materials for a student
   */
  async getCourseMaterials(req: Request, res: Response) {
    try {
      const studentId = req.params.studentId || (req.user?.id as string);
      const courseId = req.params.courseId;
      
      if (!studentId) {
        return res.status(400).json({
          error: true,
          message: 'Student ID is required',
        });
      }
      
      if (!courseId) {
        return res.status(400).json({
          error: true,
          message: 'Course ID is required',
        });
      }
      
      const materials = await studentService.getCourseMaterials(studentId, courseId);
      
      res.status(200).json({
        error: false,
        data: { materials },
        message: 'Course materials retrieved successfully',
      });
    } catch (error: any) {
      res.status(500).json({
        error: true,
        message: error.message || 'Failed to retrieve course materials',
      });
    }
  }

  /**
   * Get assignment submissions for a student
   */
  async getStudentSubmissions(req: Request, res: Response) {
    try {
      const studentId = req.params.studentId || (req.user?.id as string);
      const courseId = req.query.courseId as string;
      
      if (!studentId) {
        return res.status(400).json({
          error: true,
          message: 'Student ID is required',
        });
      }
      
      const submissions = await studentService.getStudentSubmissions(studentId, courseId);
      
      res.status(200).json({
        error: false,
        data: { submissions },
        message: 'Student submissions retrieved successfully',
      });
    } catch (error: any) {
      res.status(500).json({
        error: true,
        message: error.message || 'Failed to retrieve student submissions',
      });
    }
  }

  /**
   * Submit an assignment
   */
  async submitAssignment(req: Request, res: Response) {
    try {
      const studentId = req.params.studentId || (req.user?.id as string);
      const assignmentId = req.params.assignmentId;
      const submissionData = req.body;
      
      if (!studentId) {
        return res.status(400).json({
          error: true,
          message: 'Student ID is required',
        });
      }
      
      if (!assignmentId) {
        return res.status(400).json({
          error: true,
          message: 'Assignment ID is required',
        });
      }
      
      if (!submissionData.content) {
        return res.status(400).json({
          error: true,
          message: 'Submission content is required',
        });
      }
      
      const submission = await studentService.submitAssignment(studentId, assignmentId, submissionData);
      
      res.status(200).json({
        error: false,
        data: { submission },
        message: 'Assignment submitted successfully',
      });
    } catch (error: any) {
      res.status(400).json({
        error: true,
        message: error.message || 'Failed to submit assignment',
      });
    }
  }
}

export const studentController = new StudentController();
export default studentController; 