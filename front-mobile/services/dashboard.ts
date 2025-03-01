import { RoleType } from '../navigation/types';

// Dashboard Data Types
export interface QuickStat {
  id: string;
  title: string;
  value: string;
  change?: {
    value: number;
    trend: 'up' | 'down';
  };
  icon: string;
}

export interface EnrollmentData {
  labels: string[];
  data: number[];
}

export interface TeacherStudentRatioData {
  teachers: number;
  students: number;
}

export interface AttendanceData {
  labels: string[];
  data: number[];
}

export interface DashboardData {
  quickStats: QuickStat[];
  enrollmentTrend: EnrollmentData;
  teacherStudentRatio: TeacherStudentRatioData;
  attendanceSummary: AttendanceData;
}

// Mock API functions - Replace with actual API calls
const MOCK_DELAY = 1000; // Simulate network delay

export const fetchDashboardData = async (role: RoleType): Promise<DashboardData> => {
  // Simulate API call
  await new Promise(resolve => setTimeout(resolve, MOCK_DELAY));

  // Mock data based on role
  const mockData: DashboardData = {
    quickStats: [
      {
        id: 'students',
        title: 'Total Students',
        value: '2,550',
        change: { value: 12, trend: 'up' },
        icon: 'people',
      },
      {
        id: 'teachers',
        title: 'Total Teachers',
        value: '128',
        change: { value: 5, trend: 'up' },
        icon: 'school',
      },
      {
        id: 'classes',
        title: 'Total Classes',
        value: '64',
        icon: 'book',
      },
      {
        id: 'parents',
        title: 'Total Parents',
        value: '3,842',
        change: { value: 8, trend: 'up' },
        icon: 'people',
      },
    ],
    enrollmentTrend: {
      labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
      data: [2350, 2400, 2450, 2480, 2500, 2550],
    },
    teacherStudentRatio: {
      teachers: 128,
      students: 2550,
    },
    attendanceSummary: {
      labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'],
      data: [95, 92, 88, 94, 90],
    },
  };

  return mockData;
}; 