import { apiClient } from "../lib/api-client";

export interface StudentDashboardData {
  courses: any[];
  upcomingAssignments: any[];
  recentGrades: any[];
  attendanceStats: {
    present: number;
    absent: number;
    late: number;
    total: number;
    percentage: number;
  };
  schedule: any[];
}

export interface StudentCourseFilters {
  status?: 'active' | 'completed' | 'not_started' | 'all';
  search?: string;
}

class StudentService {
  private readonly basePath = "/students";

  /**
   * Get dashboard data for the current student
   */
  async getDashboardData(): Promise<StudentDashboardData> {
    const { data } = await apiClient.get<StudentDashboardData>(`${this.basePath}/dashboard`);
    return data;
  }

  /**
   * Get dashboard data for a specific student (admin/teacher only)
   */
  async getStudentDashboardData(studentId: string): Promise<StudentDashboardData> {
    const { data } = await apiClient.get<StudentDashboardData>(`${this.basePath}/dashboard/${studentId}`);
    return data;
  }

  /**
   * Get courses for the current student
   */
  async getStudentCourses(filters?: StudentCourseFilters): Promise<any[]> {
    const { data } = await apiClient.get<any[]>(`${this.basePath}/courses`, filters as Record<string, string>);
    return data;
  }

  /**
   * Get courses for a specific student (admin/teacher only)
   */
  async getCoursesForStudent(studentId: string, filters?: StudentCourseFilters): Promise<any[]> {
    const { data } = await apiClient.get<any[]>(
      `${this.basePath}/${studentId}/courses`, 
      filters as Record<string, string>
    );
    return data;
  }

  /**
   * Get upcoming assignments for the current student
   */
  async getUpcomingAssignments(limit?: number): Promise<any[]> {
    const params = limit ? { limit: limit.toString() } : undefined;
    const { data } = await apiClient.get<any[]>(`${this.basePath}/assignments/upcoming`, params);
    return data;
  }

  /**
   * Get upcoming assignments for a specific student (admin/teacher only)
   */
  async getUpcomingAssignmentsForStudent(studentId: string, limit?: number): Promise<any[]> {
    const params = limit ? { limit: limit.toString() } : undefined;
    const { data } = await apiClient.get<any[]>(`${this.basePath}/${studentId}/assignments/upcoming`, params);
    return data;
  }

  /**
   * Get recent grades for the current student
   */
  async getRecentGrades(limit?: number): Promise<any[]> {
    const params = limit ? { limit: limit.toString() } : undefined;
    const { data } = await apiClient.get<any[]>(`${this.basePath}/grades/recent`, params);
    return data;
  }

  /**
   * Get recent grades for a specific student (admin/teacher/parent only)
   */
  async getRecentGradesForStudent(studentId: string, limit?: number): Promise<any[]> {
    const params = limit ? { limit: limit.toString() } : undefined;
    const { data } = await apiClient.get<any[]>(`${this.basePath}/${studentId}/grades/recent`, params);
    return data;
  }

  /**
   * Get attendance statistics for the current student
   */
  async getAttendanceStats(): Promise<StudentDashboardData['attendanceStats']> {
    const { data } = await apiClient.get<StudentDashboardData['attendanceStats']>(`${this.basePath}/attendance/stats`);
    return data;
  }

  /**
   * Get attendance statistics for a specific student (admin/teacher/parent only)
   */
  async getAttendanceStatsForStudent(studentId: string): Promise<StudentDashboardData['attendanceStats']> {
    const { data } = await apiClient.get<StudentDashboardData['attendanceStats']>(
      `${this.basePath}/${studentId}/attendance/stats`
    );
    return data;
  }

  /**
   * Get schedule for the current student
   */
  async getSchedule(): Promise<any[]> {
    const { data } = await apiClient.get<any[]>(`${this.basePath}/schedule`);
    return data;
  }

  /**
   * Get schedule for a specific student (admin/teacher/parent only)
   */
  async getScheduleForStudent(studentId: string): Promise<any[]> {
    const { data } = await apiClient.get<any[]>(`${this.basePath}/${studentId}/schedule`);
    return data;
  }

  /**
   * Get course materials for the current student
   */
  async getCourseMaterials(courseId: string): Promise<any[]> {
    const { data } = await apiClient.get<any[]>(`${this.basePath}/courses/${courseId}/materials`);
    return data;
  }

  /**
   * Get submissions for the current student
   */
  async getSubmissions(courseId?: string): Promise<any[]> {
    const params = courseId ? { courseId } : undefined;
    const { data } = await apiClient.get<any[]>(`${this.basePath}/submissions`, params);
    return data;
  }

  /**
   * Get submissions for a specific student (admin/teacher only)
   */
  async getSubmissionsForStudent(studentId: string, courseId?: string): Promise<any[]> {
    const params = courseId ? { courseId } : undefined;
    const { data } = await apiClient.get<any[]>(`${this.basePath}/${studentId}/submissions`, params);
    return data;
  }

  /**
   * Submit an assignment
   */
  async submitAssignment(assignmentId: string, submissionData: {
    content: string;
    attachmentUrl?: string;
  }): Promise<any> {
    const { data } = await apiClient.post<any>(
      `${this.basePath}/assignments/${assignmentId}/submit`,
      submissionData
    );
    return data;
  }
}

export const studentService = new StudentService();
export default studentService; 