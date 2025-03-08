import { courseModel, Course } from '../models/course.model';
import { courseEnrollmentModel } from '../models/course-enrollment.model';
import { userModel } from '../models/user.model';

export interface CourseFilters {
  teacherId?: string;
  status?: 'active' | 'upcoming' | 'completed';
  search?: string;
}

// Interface for creating a course
export interface CreateCourseData {
  name: string;
  code: string;
  description: string;
  teacherId: string;
  startDate: string;
  endDate: string;
  credits: number;
  maxStudents: number;
  status: 'active' | 'upcoming' | 'completed';
}

// Interface for updating a course
export interface UpdateCourseData extends Partial<Omit<CreateCourseData, 'code'>> {}

// Extended course with teacher details and enrollment count
export interface CourseWithDetails extends Course {
  teacher?: {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
  };
  enrolledStudents?: number;
}

class CourseService {
  /**
   * Get all courses with optional filters
   */
  async getCourses(filters?: CourseFilters): Promise<CourseWithDetails[]> {
    // Get courses with filters
    const courses = await courseModel.findAll(filters);
    
    // Enhance courses with teacher details and enrollment count
    const enhancedCourses = await Promise.all(
      courses.map(async (course) => {
        const teacher = await userModel.findById(course.teacherId);
        const enrolledStudents = await courseModel.countEnrolledStudents(course.id);
        
        return {
          ...course,
          teacher: teacher ? {
            id: teacher.id,
            firstName: teacher.firstName,
            lastName: teacher.lastName,
            email: teacher.email
          } : undefined,
          enrolledStudents
        };
      })
    );
    
    return enhancedCourses;
  }

  /**
   * Get a single course by ID with details
   */
  async getCourse(id: string): Promise<CourseWithDetails | null> {
    const course = await courseModel.findById(id);
    
    if (!course) return null;
    
    // Get teacher details
    const teacher = await userModel.findById(course.teacherId);
    
    // Get enrollment count
    const enrolledStudents = await courseModel.countEnrolledStudents(course.id);
    
    return {
      ...course,
      teacher: teacher ? {
        id: teacher.id,
        firstName: teacher.firstName,
        lastName: teacher.lastName,
        email: teacher.email
      } : undefined,
      enrolledStudents
    };
  }

  /**
   * Create a new course
   */
  async createCourse(courseData: CreateCourseData): Promise<Course> {
    // Check if course code already exists
    const existingCourse = await courseModel.findByCode(courseData.code);
    if (existingCourse) {
      throw new Error('Course code already exists');
    }
    
    // Check if teacher exists
    const teacher = await userModel.findById(courseData.teacherId);
    if (!teacher) {
      throw new Error('Teacher not found');
    }
    
    // Validate teacher role
    if (teacher.role !== 'teacher' && teacher.role !== 'administrator') {
      throw new Error('Teacher ID must belong to a teacher or administrator');
    }
    
    // Create course
    const courseId = await courseModel.create(courseData);
    
    // Get created course
    const course = await courseModel.findById(courseId);
    
    if (!course) {
      throw new Error('Failed to create course');
    }
    
    return course;
  }

  /**
   * Update a course
   */
  async updateCourse(id: string, courseData: UpdateCourseData): Promise<Course | null> {
    // Check if course exists
    const course = await courseModel.findById(id);
    if (!course) {
      throw new Error('Course not found');
    }
    
    // If teacher ID is updated, check if teacher exists and has correct role
    if (courseData.teacherId && courseData.teacherId !== course.teacherId) {
      const teacher = await userModel.findById(courseData.teacherId);
      
      if (!teacher) {
        throw new Error('Teacher not found');
      }
      
      if (teacher.role !== 'teacher' && teacher.role !== 'administrator') {
        throw new Error('Teacher ID must belong to a teacher or administrator');
      }
    }
    
    // Update course
    const updated = await courseModel.update(id, courseData);
    
    if (!updated) {
      return null;
    }
    
    // Get updated course
    return courseModel.findById(id);
  }

  /**
   * Delete a course
   */
  async deleteCourse(id: string): Promise<boolean> {
    // Check if course exists
    const course = await courseModel.findById(id);
    if (!course) {
      throw new Error('Course not found');
    }
    
    // Delete course
    return courseModel.delete(id);
  }

  /**
   * Get courses for a teacher
   */
  async getTeacherCourses(teacherId: string): Promise<Course[]> {
    // Check if teacher exists
    const teacher = await userModel.findById(teacherId);
    if (!teacher) {
      throw new Error('Teacher not found');
    }
    
    // Get courses
    return courseModel.getByTeacher(teacherId);
  }

  /**
   * Get courses for a student
   */
  async getStudentCourses(studentId: string): Promise<CourseWithDetails[]> {
    // Check if student exists
    const student = await userModel.findById(studentId);
    if (!student) {
      throw new Error('Student not found');
    }
    
    // Get student's course IDs
    const courseIds = await courseEnrollmentModel.getStudentCourses(studentId);
    
    // Get course details for each course
    const courses = await Promise.all(
      courseIds.map(async (id) => this.getCourse(id))
    );
    
    // Filter out any null values
    return courses.filter((course): course is CourseWithDetails => course !== null);
  }

  /**
   * Enroll a student in a course
   */
  async enrollStudent(courseId: string, studentId: string): Promise<boolean> {
    // Check if course exists
    const course = await courseModel.findById(courseId);
    if (!course) {
      throw new Error('Course not found');
    }
    
    // Check if student exists
    const student = await userModel.findById(studentId);
    if (!student) {
      throw new Error('Student not found');
    }
    
    // Check if student role is correct
    if (student.role !== 'student') {
      throw new Error('User must be a student to enroll in courses');
    }
    
    // Check if course is full
    const enrolledCount = await courseModel.countEnrolledStudents(courseId);
    if (enrolledCount >= course.maxStudents) {
      throw new Error('Course is full');
    }
    
    // Enroll student
    const enrollmentId = await courseEnrollmentModel.enroll(courseId, studentId);
    
    return !!enrollmentId;
  }

  /**
   * Unenroll a student from a course
   */
  async unenrollStudent(courseId: string, studentId: string): Promise<boolean> {
    // Find enrollment
    const enrollment = await courseEnrollmentModel.findByCourseAndStudent(courseId, studentId);
    if (!enrollment) {
      throw new Error('Student is not enrolled in this course');
    }
    
    // Update enrollment status to dropped
    return courseEnrollmentModel.updateStatus(enrollment.id, 'dropped');
  }

  /**
   * Get students enrolled in a course
   */
  async getCourseStudents(courseId: string): Promise<any[]> {
    // Check if course exists
    const course = await courseModel.findById(courseId);
    if (!course) {
      throw new Error('Course not found');
    }
    
    // Get enrollments with student details
    return courseEnrollmentModel.getCourseEnrollmentsWithStudents(courseId);
  }
}

export const courseService = new CourseService(); 