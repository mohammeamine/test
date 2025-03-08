import { Request, Response } from 'express';
import { courseService, CourseFilters, CreateCourseData, UpdateCourseData } from '../services/course.service';

class CourseController {
  /**
   * Get all courses
   */
  async getCourses(req: Request, res: Response) {
    try {
      const filters: CourseFilters = {
        teacherId: req.query.teacherId as string,
        status: req.query.status as any,
        search: req.query.search as string,
      };
      
      const courses = await courseService.getCourses(filters);
      
      res.status(200).json({
        error: false,
        data: { courses },
        message: 'Courses retrieved successfully',
      });
    } catch (error: any) {
      res.status(500).json({
        error: true,
        message: error.message || 'Failed to retrieve courses',
      });
    }
  }

  /**
   * Get a single course
   */
  async getCourse(req: Request, res: Response) {
    try {
      const courseId = req.params.id;
      
      const course = await courseService.getCourse(courseId);
      
      if (!course) {
        return res.status(404).json({
          error: true,
          message: 'Course not found',
        });
      }
      
      res.status(200).json({
        error: false,
        data: { course },
        message: 'Course retrieved successfully',
      });
    } catch (error: any) {
      res.status(500).json({
        error: true,
        message: error.message || 'Failed to retrieve course',
      });
    }
  }

  /**
   * Create a new course
   */
  async createCourse(req: Request, res: Response) {
    try {
      const courseData: CreateCourseData = req.body;
      
      const course = await courseService.createCourse(courseData);
      
      res.status(201).json({
        error: false,
        data: { course },
        message: 'Course created successfully',
      });
    } catch (error: any) {
      res.status(400).json({
        error: true,
        message: error.message || 'Failed to create course',
      });
    }
  }

  /**
   * Update a course
   */
  async updateCourse(req: Request, res: Response) {
    try {
      const courseId = req.params.id;
      const courseData: UpdateCourseData = req.body;
      
      const course = await courseService.updateCourse(courseId, courseData);
      
      if (!course) {
        return res.status(404).json({
          error: true,
          message: 'Course not found or could not be updated',
        });
      }
      
      res.status(200).json({
        error: false,
        data: { course },
        message: 'Course updated successfully',
      });
    } catch (error: any) {
      res.status(400).json({
        error: true,
        message: error.message || 'Failed to update course',
      });
    }
  }

  /**
   * Delete a course
   */
  async deleteCourse(req: Request, res: Response) {
    try {
      const courseId = req.params.id;
      
      const deleted = await courseService.deleteCourse(courseId);
      
      if (!deleted) {
        return res.status(404).json({
          error: true,
          message: 'Course not found or could not be deleted',
        });
      }
      
      res.status(200).json({
        error: false,
        message: 'Course deleted successfully',
      });
    } catch (error: any) {
      res.status(400).json({
        error: true,
        message: error.message || 'Failed to delete course',
      });
    }
  }

  /**
   * Get teacher's courses
   */
  async getTeacherCourses(req: Request, res: Response) {
    try {
      const teacherId = req.params.teacherId;
      
      const courses = await courseService.getTeacherCourses(teacherId);
      
      res.status(200).json({
        error: false,
        data: { courses },
        message: 'Teacher courses retrieved successfully',
      });
    } catch (error: any) {
      res.status(400).json({
        error: true,
        message: error.message || 'Failed to retrieve teacher courses',
      });
    }
  }

  /**
   * Get student's courses
   */
  async getStudentCourses(req: Request, res: Response) {
    try {
      const studentId = req.params.studentId;
      
      const courses = await courseService.getStudentCourses(studentId);
      
      res.status(200).json({
        error: false,
        data: { courses },
        message: 'Student courses retrieved successfully',
      });
    } catch (error: any) {
      res.status(400).json({
        error: true,
        message: error.message || 'Failed to retrieve student courses',
      });
    }
  }

  /**
   * Enroll student in course
   */
  async enrollStudent(req: Request, res: Response) {
    try {
      const { courseId, studentId } = req.body;
      
      const enrolled = await courseService.enrollStudent(courseId, studentId);
      
      res.status(200).json({
        error: false,
        data: { enrolled },
        message: 'Student enrolled successfully',
      });
    } catch (error: any) {
      res.status(400).json({
        error: true,
        message: error.message || 'Failed to enroll student',
      });
    }
  }

  /**
   * Unenroll student from course
   */
  async unenrollStudent(req: Request, res: Response) {
    try {
      const { courseId, studentId } = req.body;
      
      const unenrolled = await courseService.unenrollStudent(courseId, studentId);
      
      res.status(200).json({
        error: false,
        data: { unenrolled },
        message: 'Student unenrolled successfully',
      });
    } catch (error: any) {
      res.status(400).json({
        error: true,
        message: error.message || 'Failed to unenroll student',
      });
    }
  }

  /**
   * Get course students
   */
  async getCourseStudents(req: Request, res: Response) {
    try {
      const courseId = req.params.courseId;
      
      const students = await courseService.getCourseStudents(courseId);
      
      res.status(200).json({
        error: false,
        data: { students },
        message: 'Course students retrieved successfully',
      });
    } catch (error: any) {
      res.status(400).json({
        error: true,
        message: error.message || 'Failed to retrieve course students',
      });
    }
  }
}

export const courseController = new CourseController(); 