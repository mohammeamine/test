export interface ScheduleEvent {
    id: string;
    title: string;
    teacher: string;
    startTime: string;
    endTime: string;
    location: string;
    dayOfWeek: number;
    courseId?: string;
    description?: string;
    color?: string;
  }

export interface ClassSchedule {
  id: string;
  studentId: string;
  studentName: string;
  courseId: string;
  courseName: string;
  teacher: string;
  dayOfWeek: number;
  startTime: string;
  endTime: string;
  room: string;
}