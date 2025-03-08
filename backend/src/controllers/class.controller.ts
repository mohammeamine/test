import { Request, Response } from 'express';
import { classService, ClassFilters, CreateClassData, UpdateClassData } from '../services/class.service';
import { WeekDay } from '../models/class-schedule.model';

class ClassController {
  /**
   * Get all classes
   */
  async getClasses(req: Request, res: Response) {
    try {
      const filters: ClassFilters = {
        courseId: req.query.courseId as string,
        teacherId: req.query.teacherId as string,
        status: req.query.status as any,
        room: req.query.room as string,
      };
      
      const classes = await classService.getClasses(filters);
      
      res.status(200).json({
        error: false,
        data: { classes },
        message: 'Classes retrieved successfully',
      });
    } catch (error: any) {
      res.status(500).json({
        error: true,
        message: error.message || 'Failed to retrieve classes',
      });
    }
  }

  /**
   * Get a single class
   */
  async getClass(req: Request, res: Response) {
    try {
      const classId = req.params.id;
      
      const classItem = await classService.getClass(classId);
      
      if (!classItem) {
        return res.status(404).json({
          error: true,
          message: 'Class not found',
        });
      }
      
      res.status(200).json({
        error: false,
        data: { class: classItem },
        message: 'Class retrieved successfully',
      });
    } catch (error: any) {
      res.status(500).json({
        error: true,
        message: error.message || 'Failed to retrieve class',
      });
    }
  }

  /**
   * Create a new class
   */
  async createClass(req: Request, res: Response) {
    try {
      const classData: CreateClassData = req.body;
      
      const classItem = await classService.createClass(classData);
      
      res.status(201).json({
        error: false,
        data: { class: classItem },
        message: 'Class created successfully',
      });
    } catch (error: any) {
      res.status(400).json({
        error: true,
        message: error.message || 'Failed to create class',
      });
    }
  }

  /**
   * Update a class
   */
  async updateClass(req: Request, res: Response) {
    try {
      const classId = req.params.id;
      const classData: UpdateClassData = req.body;
      
      const classItem = await classService.updateClass(classId, classData);
      
      if (!classItem) {
        return res.status(404).json({
          error: true,
          message: 'Class not found or could not be updated',
        });
      }
      
      res.status(200).json({
        error: false,
        data: { class: classItem },
        message: 'Class updated successfully',
      });
    } catch (error: any) {
      res.status(400).json({
        error: true,
        message: error.message || 'Failed to update class',
      });
    }
  }

  /**
   * Delete a class
   */
  async deleteClass(req: Request, res: Response) {
    try {
      const classId = req.params.id;
      
      const deleted = await classService.deleteClass(classId);
      
      if (!deleted) {
        return res.status(404).json({
          error: true,
          message: 'Class not found or could not be deleted',
        });
      }
      
      res.status(200).json({
        error: false,
        message: 'Class deleted successfully',
      });
    } catch (error: any) {
      res.status(400).json({
        error: true,
        message: error.message || 'Failed to delete class',
      });
    }
  }

  /**
   * Get classes for a course
   */
  async getClassesByCourse(req: Request, res: Response) {
    try {
      const courseId = req.params.courseId;
      
      const classes = await classService.getClassesByCourse(courseId);
      
      res.status(200).json({
        error: false,
        data: { classes },
        message: 'Course classes retrieved successfully',
      });
    } catch (error: any) {
      res.status(400).json({
        error: true,
        message: error.message || 'Failed to retrieve course classes',
      });
    }
  }

  /**
   * Get classes for a teacher
   */
  async getClassesByTeacher(req: Request, res: Response) {
    try {
      const teacherId = req.params.teacherId;
      
      const classes = await classService.getClassesByTeacher(teacherId);
      
      res.status(200).json({
        error: false,
        data: { classes },
        message: 'Teacher classes retrieved successfully',
      });
    } catch (error: any) {
      res.status(400).json({
        error: true,
        message: error.message || 'Failed to retrieve teacher classes',
      });
    }
  }

  /**
   * Get teacher's schedule by day
   */
  async getTeacherScheduleByDay(req: Request, res: Response) {
    try {
      const teacherId = req.params.teacherId;
      const day = req.params.day as WeekDay;
      
      // Validate day parameter
      const validDays: WeekDay[] = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'];
      if (!validDays.includes(day)) {
        return res.status(400).json({
          error: true,
          message: 'Invalid day parameter. Must be one of: ' + validDays.join(', '),
        });
      }
      
      const schedule = await classService.getTeacherScheduleByDay(teacherId, day);
      
      res.status(200).json({
        error: false,
        data: { schedule },
        message: 'Teacher schedule retrieved successfully',
      });
    } catch (error: any) {
      res.status(400).json({
        error: true,
        message: error.message || 'Failed to retrieve teacher schedule',
      });
    }
  }

  /**
   * Get student's schedule by day
   */
  async getStudentScheduleByDay(req: Request, res: Response) {
    try {
      const studentId = req.params.studentId;
      const day = req.params.day as WeekDay;
      
      // Validate day parameter
      const validDays: WeekDay[] = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'];
      if (!validDays.includes(day)) {
        return res.status(400).json({
          error: true,
          message: 'Invalid day parameter. Must be one of: ' + validDays.join(', '),
        });
      }
      
      const schedule = await classService.getStudentScheduleByDay(studentId, day);
      
      res.status(200).json({
        error: false,
        data: { schedule },
        message: 'Student schedule retrieved successfully',
      });
    } catch (error: any) {
      res.status(400).json({
        error: true,
        message: error.message || 'Failed to retrieve student schedule',
      });
    }
  }
}

export const classController = new ClassController(); 