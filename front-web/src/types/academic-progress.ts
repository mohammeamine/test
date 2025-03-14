export interface AcademicProgress {
  id: string;
  studentId: string;
  courseId: string;
  courseName: string;
  semester: string;
  academicYear: string;
  gpa: number;
  attendance: number;
  skills: {
    communication: number;
    problemSolving: number;
    teamwork: number;
    creativity: number;
    leadership: number;
    technicalSkills: number;
  };
  performanceData: {
    subject: string;
    scores: number[];
    months: string[];
  }[];
  achievements: {
    id: string;
    title: string;
    description: string;
    date: Date;
    type: 'academic' | 'attendance' | 'skill';
  }[];
}

export interface UpdateProgressDTO {
  gpa?: number;
  attendance?: number;
  skills?: {
    communication?: number;
    problemSolving?: number;
    teamwork?: number;
    creativity?: number;
    leadership?: number;
    technicalSkills?: number;
  };
} 