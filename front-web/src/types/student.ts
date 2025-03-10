export interface Course {
  id: string;
  name: string;
  code: string;
  description: string;
  teacherId: string;
  departmentId: string;
  credits: number;
  status: 'active' | 'completed' | 'not_started';
  startDate: string;
  endDate: string;
  imageUrl?: string;
  createdAt: string;
  updatedAt: string;
}

export interface Grade {
  id: string;
  studentId: string;
  courseId: string;
  assignmentId: string;
  score: number;
  totalPoints: number;
  feedback?: string;
  gradedBy: string;
  gradedAt: string;
  courseName?: string;
  assignmentTitle?: string;
  createdAt: string;
  updatedAt: string;
}

export interface ScheduleItem {
  id: string;
  title: string;
  courseId: string;
  courseName?: string;
  courseCode?: string;
  type: 'class' | 'exam' | 'assignment';
  startTime: string;
  endTime: string;
  room?: string;
  day: 'monday' | 'tuesday' | 'wednesday' | 'thursday' | 'friday' | 'saturday' | 'sunday';
  recurrence?: 'weekly' | 'biweekly' | 'once';
}

export interface CourseMaterial {
  id: string;
  courseId: string;
  title: string;
  description: string;
  type: 'document' | 'video' | 'link' | 'image';
  url: string;
  createdAt: string;
  updatedAt: string;
  size?: number;
  uploadedBy: string;
}

export interface SubmissionRequest {
  content: string;
  attachmentUrl?: string;
}

export interface SubmissionResponse {
  id: string;
  assignmentId: string;
  submittedAt: string;
  status: 'submitted' | 'graded' | 'late';
  message: string;
} 