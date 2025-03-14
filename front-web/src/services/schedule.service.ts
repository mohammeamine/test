import { ClassSchedule } from '../types/schedule';

// Mock data service
export const scheduleService = {
  getChildrenSchedules: async (): Promise<ClassSchedule[]> => {
    // Mock data
    return [
      {
        id: "s1",
        studentId: "st1",
        studentName: "John Smith",
        courseId: "c1",
        courseName: "Mathematics 101",
        teacher: "Mr. Anderson",
        dayOfWeek: 1,
        startTime: "09:00",
        endTime: "10:30",
        room: "Room 101"
      },
      {
        id: "s2",
        studentId: "st1",
        studentName: "John Smith",
        courseId: "c2",
        courseName: "Physics 201",
        teacher: "Dr. Wilson",
        dayOfWeek: 1,
        startTime: "11:00",
        endTime: "12:30",
        room: "Lab 3"
      }
    ];
  },

  getStudentSchedule: async (studentId: string): Promise<ClassSchedule[]> => {
    // Mock data filtered by student
    return scheduleService.getChildrenSchedules().then(schedules => 
      schedules.filter(schedule => schedule.studentId === studentId)
    );
  }
}; 