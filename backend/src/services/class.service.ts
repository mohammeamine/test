import { classModel, Class } from '../models/class.model';
import { classScheduleModel, ClassSchedule, WeekDay } from '../models/class-schedule.model';
import { courseModel } from '../models/course.model';
import { userModel } from '../models/user.model';

export interface ClassFilters {
  courseId?: string;
  teacherId?: string;
  status?: 'active' | 'cancelled' | 'completed';
  room?: string;
}

// Interface for creating a class
export interface CreateClassData {
  courseId: string;
  teacherId: string;
  room: string;
  capacity: number;
  status: 'active' | 'cancelled' | 'completed';
  schedules: {
    day: WeekDay;
    startTime: string;
    endTime: string;
  }[];
}

// Interface for updating a class
export interface UpdateClassData {
  courseId?: string;
  teacherId?: string;
  room?: string;
  capacity?: number;
  status?: 'active' | 'cancelled' | 'completed';
  schedules?: {
    id?: string; // Existing schedule ID (if updating)
    day: WeekDay;
    startTime: string;
    endTime: string;
  }[];
}

// Extended class with related details
export interface ClassWithDetails extends Class {
  course?: {
    id: string;
    name: string;
    code: string;
  };
  teacher?: {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
  };
  schedules?: ClassSchedule[];
}

class ClassService {
  /**
   * Get all classes with optional filters
   */
  async getClasses(filters?: ClassFilters): Promise<ClassWithDetails[]> {
    // Get classes with filters
    const classes = await classModel.findAll(filters);
    
    // Enhance classes with course, teacher and schedule details
    const enhancedClasses = await Promise.all(
      classes.map(async (classItem) => {
        const [course, teacher, schedules] = await Promise.all([
          courseModel.findById(classItem.courseId),
          userModel.findById(classItem.teacherId),
          classScheduleModel.getByClassId(classItem.id)
        ]);
        
        return {
          ...classItem,
          course: course ? {
            id: course.id,
            name: course.name,
            code: course.code
          } : undefined,
          teacher: teacher ? {
            id: teacher.id,
            firstName: teacher.firstName,
            lastName: teacher.lastName,
            email: teacher.email
          } : undefined,
          schedules
        };
      })
    );
    
    return enhancedClasses;
  }

  /**
   * Get a single class by ID with details
   */
  async getClass(id: string): Promise<ClassWithDetails | null> {
    const classItem = await classModel.findById(id);
    
    if (!classItem) return null;
    
    // Get related details
    const [course, teacher, schedules] = await Promise.all([
      courseModel.findById(classItem.courseId),
      userModel.findById(classItem.teacherId),
      classScheduleModel.getByClassId(classItem.id)
    ]);
    
    return {
      ...classItem,
      course: course ? {
        id: course.id,
        name: course.name,
        code: course.code
      } : undefined,
      teacher: teacher ? {
        id: teacher.id,
        firstName: teacher.firstName,
        lastName: teacher.lastName,
        email: teacher.email
      } : undefined,
      schedules
    };
  }

  /**
   * Create a new class with schedules
   */
  async createClass(classData: CreateClassData): Promise<ClassWithDetails> {
    // Check if course exists
    const course = await courseModel.findById(classData.courseId);
    if (!course) {
      throw new Error('Course not found');
    }
    
    // Check if teacher exists
    const teacher = await userModel.findById(classData.teacherId);
    if (!teacher) {
      throw new Error('Teacher not found');
    }
    
    // Validate teacher role
    if (teacher.role !== 'teacher' && teacher.role !== 'administrator') {
      throw new Error('Teacher ID must belong to a teacher or administrator');
    }
    
    // Check schedule conflicts
    await this.validateSchedules(
      classData.schedules,
      classData.room,
      classData.teacherId
    );
    
    // Create class
    const classId = await classModel.create({
      courseId: classData.courseId,
      teacherId: classData.teacherId,
      room: classData.room,
      capacity: classData.capacity,
      status: classData.status
    });
    
    // Create schedules
    for (const schedule of classData.schedules) {
      await classScheduleModel.create({
        classId,
        day: schedule.day,
        startTime: schedule.startTime,
        endTime: schedule.endTime
      });
    }
    
    // Get created class with details
    const createdClass = await this.getClass(classId);
    
    if (!createdClass) {
      throw new Error('Failed to create class');
    }
    
    return createdClass;
  }

  /**
   * Update a class and its schedules
   */
  async updateClass(id: string, classData: UpdateClassData): Promise<ClassWithDetails | null> {
    // Check if class exists
    const classItem = await classModel.findById(id);
    if (!classItem) {
      throw new Error('Class not found');
    }
    
    // If course ID is updated, check if course exists
    if (classData.courseId && classData.courseId !== classItem.courseId) {
      const course = await courseModel.findById(classData.courseId);
      if (!course) {
        throw new Error('Course not found');
      }
    }
    
    // If teacher ID is updated, check if teacher exists and has correct role
    if (classData.teacherId && classData.teacherId !== classItem.teacherId) {
      const teacher = await userModel.findById(classData.teacherId);
      
      if (!teacher) {
        throw new Error('Teacher not found');
      }
      
      if (teacher.role !== 'teacher' && teacher.role !== 'administrator') {
        throw new Error('Teacher ID must belong to a teacher or administrator');
      }
    }
    
    // Check schedule conflicts if schedules are updated
    if (classData.schedules && classData.schedules.length > 0) {
      await this.validateSchedules(
        classData.schedules,
        classData.room || classItem.room,
        classData.teacherId || classItem.teacherId,
        id
      );
      
      // Delete existing schedules
      await classScheduleModel.deleteByClassId(id);
      
      // Create new schedules
      for (const schedule of classData.schedules) {
        await classScheduleModel.create({
          classId: id,
          day: schedule.day,
          startTime: schedule.startTime,
          endTime: schedule.endTime
        });
      }
    }
    
    // Update class data (except schedules)
    const { schedules, ...classDataWithoutSchedules } = classData;
    
    if (Object.keys(classDataWithoutSchedules).length > 0) {
      const updated = await classModel.update(id, classDataWithoutSchedules);
      
      if (!updated) {
        return null;
      }
    }
    
    // Get updated class with details
    return this.getClass(id);
  }

  /**
   * Delete a class and its schedules
   */
  async deleteClass(id: string): Promise<boolean> {
    // Check if class exists
    const classItem = await classModel.findById(id);
    if (!classItem) {
      throw new Error('Class not found');
    }
    
    // Delete class (schedules will be automatically deleted due to the foreign key constraint)
    return classModel.delete(id);
  }

  /**
   * Get classes for a course
   */
  async getClassesByCourse(courseId: string): Promise<ClassWithDetails[]> {
    // Check if course exists
    const course = await courseModel.findById(courseId);
    if (!course) {
      throw new Error('Course not found');
    }
    
    // Get classes
    const classes = await classModel.getByCourse(courseId);
    
    // Enhance with details
    const enhancedClasses = await Promise.all(
      classes.map(async (classItem) => {
        const [teacher, schedules] = await Promise.all([
          userModel.findById(classItem.teacherId),
          classScheduleModel.getByClassId(classItem.id)
        ]);
        
        return {
          ...classItem,
          course: {
            id: course.id,
            name: course.name,
            code: course.code
          },
          teacher: teacher ? {
            id: teacher.id,
            firstName: teacher.firstName,
            lastName: teacher.lastName,
            email: teacher.email
          } : undefined,
          schedules
        };
      })
    );
    
    return enhancedClasses;
  }

  /**
   * Get classes for a teacher
   */
  async getClassesByTeacher(teacherId: string): Promise<ClassWithDetails[]> {
    // Check if teacher exists
    const teacher = await userModel.findById(teacherId);
    if (!teacher) {
      throw new Error('Teacher not found');
    }
    
    // Get classes
    const classes = await classModel.getByTeacher(teacherId);
    
    // Enhance with details
    const enhancedClasses = await Promise.all(
      classes.map(async (classItem) => {
        const [course, schedules] = await Promise.all([
          courseModel.findById(classItem.courseId),
          classScheduleModel.getByClassId(classItem.id)
        ]);
        
        return {
          ...classItem,
          course: course ? {
            id: course.id,
            name: course.name,
            code: course.code
          } : undefined,
          teacher: {
            id: teacher.id,
            firstName: teacher.firstName,
            lastName: teacher.lastName,
            email: teacher.email
          },
          schedules
        };
      })
    );
    
    return enhancedClasses;
  }

  /**
   * Get teacher's schedule by day
   */
  async getTeacherScheduleByDay(teacherId: string, day: WeekDay): Promise<any[]> {
    // Check if teacher exists
    const teacher = await userModel.findById(teacherId);
    if (!teacher) {
      throw new Error('Teacher not found');
    }
    
    return classScheduleModel.getTeacherScheduleByDay(teacherId, day);
  }

  /**
   * Get student's schedule by day
   */
  async getStudentScheduleByDay(studentId: string, day: WeekDay): Promise<any[]> {
    // Check if student exists
    const student = await userModel.findById(studentId);
    if (!student) {
      throw new Error('Student not found');
    }
    
    return classScheduleModel.getStudentScheduleByDay(studentId, day);
  }

  /**
   * Validate schedules for conflicts
   */
  private async validateSchedules(
    schedules: { day: WeekDay; startTime: string; endTime: string }[],
    room: string,
    teacherId: string,
    excludeClassId?: string
  ): Promise<void> {
    // Check for time validity and room/teacher availability
    for (const schedule of schedules) {
      // Validate time format
      if (!this.isValidTimeFormat(schedule.startTime) || !this.isValidTimeFormat(schedule.endTime)) {
        throw new Error('Invalid time format. Use HH:MM:SS or HH:MM');
      }
      
      // Validate start time is before end time
      if (schedule.startTime >= schedule.endTime) {
        throw new Error('Start time must be before end time');
      }
      
      // Check room availability
      const isRoomAvailable = await classModel.isRoomAvailable(
        room,
        schedule.day,
        schedule.startTime,
        schedule.endTime,
        excludeClassId
      );
      
      if (!isRoomAvailable) {
        throw new Error(`Room ${room} is not available at the specified time on ${schedule.day}`);
      }
      
      // Check teacher availability
      const isTeacherAvailable = await classScheduleModel.isTeacherAvailable(
        teacherId,
        schedule.day,
        schedule.startTime,
        schedule.endTime,
        excludeClassId
      );
      
      if (!isTeacherAvailable) {
        throw new Error(`Teacher is not available at the specified time on ${schedule.day}`);
      }
    }
  }

  /**
   * Validate time format (HH:MM:SS or HH:MM)
   */
  private isValidTimeFormat(time: string): boolean {
    const timeRegex = /^([01]\d|2[0-3]):([0-5]\d)(:([0-5]\d))?$/;
    return timeRegex.test(time);
  }
}

export const classService = new ClassService(); 