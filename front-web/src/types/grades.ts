// types/grades.ts
export interface Grade {
    id: string;
    studentId: string;
    studentName: string;
    courseId: string;
    courseName: string;
    grade: number;
    date: string;
    teacher: string;
    category: string;
    feedback?: string;
  }
  
  export type TrendDirection = "up" | "down" | "stable";
  
  export interface ChildGradeStats {
    studentId: string;
    studentName: string;
    averageGrade: number;
    totalAssessments: number;
    highestGrade: number;
    lowestGrade: number;
    trendDirection: TrendDirection;
    trendValue: number;
    courseAverages: CourseAverage[];
  }
  
  export interface CourseAverage {
    courseName: string;
    average: number;
  }
  
  // Optional: If you need to type grade thresholds
  export type GradeThreshold = "all" | "above90" | "below60";
  
  // Optional: If you want to type grade colors
  export type GradeColorClass = 
    | "bg-green-100 text-green-800"
    | "bg-blue-100 text-blue-800"
    | "bg-red-100 text-red-800";