import { apiClient } from '../lib/api-client';

export interface TeacherClass {
  id: string;
  name: string;
  courseId: string;
  courseName: string;
  schedule: {
    day: string;
    startTime: string;
    endTime: string;
  }[];
  studentCount: number;
  room: string;
  status: 'active' | 'completed' | 'upcoming';
}

export interface TeacherStats {
  totalClasses: number;
  totalStudents: number;
  upcomingAssignments: number;
  pendingGrades: number;
  averageAttendance: number;
  recentSubmissions: number;
}

class TeacherService {
  /**
   * Get all classes for the teacher
   */
  async getClasses(): Promise<TeacherClass[]> {
    const { data } = await apiClient.get<{
      error: boolean;
      data: { classes: TeacherClass[] };
      message: string;
    }>('/teacher/classes');
    return data.data.classes;
  }

  /**
   * Get teacher dashboard statistics
   */
  async getStats(): Promise<TeacherStats> {
    const { data } = await apiClient.get<{
      error: boolean;
      data: { stats: TeacherStats };
      message: string;
    }>('/teacher/stats');
    return data.data.stats;
  }

  /**
   * Get students in a specific class
   */
  async getClassStudents(classId: string): Promise<any[]> {
    const { data } = await apiClient.get<{
      error: boolean;
      data: { students: any[] };
      message: string;
    }>(`/teacher/classes/${classId}/students`);
    return data.data.students;
  }

  /**
   * Get teacher's schedule for a specific day
   */
  async getScheduleByDay(day: string): Promise<any[]> {
    const { data } = await apiClient.get<{
      error: boolean;
      data: { schedule: any[] };
      message: string;
    }>(`/teacher/schedule/${day}`);
    return data.data.schedule;
  }

  /**
   * Update class details
   */
  async updateClass(classId: string, updates: Partial<TeacherClass>): Promise<TeacherClass> {
    const { data } = await apiClient.put<{
      error: boolean;
      data: { class: TeacherClass };
      message: string;
    }>(`/teacher/classes/${classId}`, updates);
    return data.data.class;
  }

  /**
   * Get assignments for a specific class
   */
  async getClassAssignments(classId: string): Promise<any[]> {
    const { data } = await apiClient.get<{
      error: boolean;
      data: { assignments: any[] };
      message: string;
    }>(`/teacher/classes/${classId}/assignments`);
    return data.data.assignments;
  }

  /**
   * Submit attendance for a class
   */
  async submitAttendance(classId: string, date: string, attendance: Record<string, 'present' | 'absent' | 'late'>): Promise<void> {
    await apiClient.post(`/teacher/classes/${classId}/attendance`, {
      date,
      attendance
    });
  }

  /**
   * Get attendance records for a class
   */
  async getClassAttendance(classId: string, startDate?: string, endDate?: string): Promise<any[]> {
    const { data } = await apiClient.get<{
      error: boolean;
      data: { attendance: any[] };
      message: string;
    }>(`/teacher/classes/${classId}/attendance`, {
      params: { startDate, endDate }
    });
    return data.data.attendance;
  }
}

export const teacherService = new TeacherService();
export default teacherService; 