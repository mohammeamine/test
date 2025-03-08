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
  }