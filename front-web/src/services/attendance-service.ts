import { apiClient } from '../lib/api-client';

export interface AttendanceRecord {
  id: string;
  studentId: string;
  classId: string;
  date: string;
  status: 'present' | 'absent' | 'late' | 'excused';
  notes?: string;
  createdAt: string;
  updatedAt: string;
}

export interface AttendanceFilters {
  classId?: string;
  studentId?: string;
  startDate?: string;
  endDate?: string;
  status?: 'present' | 'absent' | 'late' | 'excused';
  page?: number;
  limit?: number;
  sortBy?: string;
  sortDirection?: 'asc' | 'desc';
}

interface BulkAttendanceRecord {
  studentId: string;
  status: 'present' | 'absent' | 'late' | 'excused';
  note?: string;
  timeIn?: string;
  timeOut?: string;
}

export interface BulkAttendanceData {
  classId: string;
  date: string;
  records: BulkAttendanceRecord[];
}

export interface AttendanceStats {
  totalStudents: number;
  presentCount: number;
  absentCount: number;
  lateCount: number;
  excusedCount: number;
  attendanceRate: number;
}

interface ReportOptions {
  classId: string;
  startDate: string;
  endDate: string;
  format: 'pdf' | 'csv';
}

export class AttendanceService {
  private basePath = '/attendance';
  private baseUrl = '/api/attendance';

  /**
   * Get attendance records with optional filtering
   */
  async getAttendanceRecords(filters?: AttendanceFilters): Promise<AttendanceRecord[]> {
    const { data } = await apiClient.get<{ data: AttendanceRecord[] }>(this.basePath, { 
      params: filters 
    });
    return data.data;
  }

  /**
   * Get a specific attendance record by ID
   */
  async getAttendanceRecord(id: string): Promise<AttendanceRecord> {
    const { data } = await apiClient.get<{ data: AttendanceRecord }>(`${this.basePath}/${id}`);
    return data.data;
  }

  /**
   * Create a new attendance record
   */
  async createAttendanceRecord(data: Omit<AttendanceRecord, 'id' | 'createdAt' | 'updatedAt'>): Promise<AttendanceRecord> {
    const response = await apiClient.post<{ data: AttendanceRecord }>(this.basePath, data);
    return response.data.data;
  }

  /**
   * Update an existing attendance record
   */
  async updateAttendanceRecord(id: string, data: Partial<Omit<AttendanceRecord, 'id' | 'createdAt' | 'updatedAt'>>): Promise<AttendanceRecord> {
    const response = await apiClient.put<{ data: AttendanceRecord }>(`${this.basePath}/${id}`, data);
    return response.data.data;
  }

  /**
   * Delete an attendance record
   */
  async deleteAttendanceRecord(id: string): Promise<void> {
    await apiClient.delete(`${this.basePath}/${id}`);
  }

  /**
   * Submit bulk attendance for a class
   */
  async submitBulkAttendance(data: BulkAttendanceData): Promise<AttendanceRecord[]> {
    const response = await apiClient.post<{ data: AttendanceRecord[] }>(`${this.basePath}/bulk`, data);
    return response.data.data;
  }

  /**
   * Get attendance statistics
   */
  async getAttendanceStats(filters?: {
    classId?: string;
    studentId?: string;
    startDate?: string;
    endDate?: string;
  }): Promise<AttendanceStats> {
    const { data } = await apiClient.get<{ data: AttendanceStats }>(`${this.basePath}/stats`, { 
      params: filters 
    });
    return data.data;
  }

  /**
   * Get attendance for a specific class on a specific date
   */
  async getClassAttendance(classId: string, date: string): Promise<AttendanceRecord[]> {
    const { data } = await apiClient.get<{ data: AttendanceRecord[] }>(`${this.basePath}/class/${classId}/date/${date}`);
    return data.data;
  }

  /**
   * Get attendance history for a specific student
   */
  async getStudentAttendance(studentId: string, filters?: {
    classId?: string;
    startDate?: string;
    endDate?: string;
    status?: 'present' | 'absent' | 'late' | 'excused';
  }): Promise<AttendanceRecord[]> {
    const { data } = await apiClient.get<{ data: AttendanceRecord[] }>(`${this.basePath}/student/${studentId}`, { 
      params: filters 
    });
    return data.data;
  }

  /**
   * Notify parents of absent students
   */
  async notifyAbsentStudents(classId: string, date: string, message?: string): Promise<{ notified: number }> {
    const { data } = await apiClient.post<{ data: { notified: number } }>(`${this.basePath}/notify`, { classId, date, message });
    return data.data;
  }

  /**
   * Generate attendance report
   */
  async generateAttendanceReport(filters: {
    classId?: string;
    studentId?: string;
    startDate?: string;
    endDate?: string;
    format?: 'pdf' | 'csv' | 'excel';
  }): Promise<Blob> {
    const { data } = await apiClient.get<Blob>(`${this.basePath}/report`, { 
      params: filters,
      responseType: 'blob'
    });
    return data;
  }

  // Mock implementation for development
  async mockSubmitAttendance(classId: string, date: string, records: Record<string, 'present' | 'absent' | 'late' | 'excused'>): Promise<boolean> {
    console.log('Submitting attendance for class', classId, 'on', date);
    console.log('Attendance records:', records);
    
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Return success
    return true;
  }

  async mockNotifyAbsentStudents(classId: string, date: string, studentIds: string[]): Promise<number> {
    console.log('Notifying absent students for class', classId, 'on', date);
    console.log('Student IDs:', studentIds);
    
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Return number of notifications sent
    return studentIds.length;
  }

  async mockGenerateReport(classId: string, format: string = 'pdf'): Promise<string> {
    console.log('Generating report for class', classId, 'in format', format);
    
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Return mock download URL
    return `https://example.com/reports/${classId}_${new Date().toISOString().split('T')[0]}.${format}`;
  }

  /**
   * Submit bulk attendance records for a class
   */
  async submitBulkAttendance(data: BulkAttendanceData): Promise<void> {
    const response = await fetch(`${this.baseUrl}/bulk`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      throw new Error('Failed to submit attendance');
    }
  }

  /**
   * Get attendance statistics for a class
   */
  async getAttendanceStats(filters?: {
    classId?: string;
    studentId?: string;
    startDate?: string;
    endDate?: string;
  }): Promise<AttendanceStats> {
    const queryParams = new URLSearchParams(filters as Record<string, string>);
    const response = await fetch(`${this.baseUrl}/stats?${queryParams}`);

    if (!response.ok) {
      throw new Error('Failed to fetch attendance statistics');
    }

    return response.json();
  }

  /**
   * Get attendance records for a specific class on a specific date
   */
  async getClassAttendance(classId: string, date: string): Promise<BulkAttendanceRecord[]> {
    const response = await fetch(`${this.baseUrl}/class/${classId}/date/${date}`);

    if (!response.ok) {
      throw new Error('Failed to fetch class attendance');
    }

    return response.json();
  }

  /**
   * Send notifications to parents of absent students
   */
  async notifyAbsentStudents(
    classId: string,
    date: string,
    message?: string
  ): Promise<void> {
    const response = await fetch(`${this.baseUrl}/notify`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        classId,
        date,
        message,
      }),
    });

    if (!response.ok) {
      throw new Error('Failed to send notifications');
    }
  }

  /**
   * Generate attendance report
   */
  async generateAttendanceReport(options: ReportOptions): Promise<ArrayBuffer> {
    const queryParams = new URLSearchParams({
      classId: options.classId,
      startDate: options.startDate,
      endDate: options.endDate,
      format: options.format,
    });

    const response = await fetch(`${this.baseUrl}/report?${queryParams}`);

    if (!response.ok) {
      throw new Error('Failed to generate report');
    }

    return response.arrayBuffer();
  }
}