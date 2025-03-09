import { Router } from 'express';
import { studentController } from '../controllers/student.controller';
import { authMiddleware } from '../middleware/auth.middleware';
import { roleMiddleware } from '../middleware/role.middleware';

const router = Router();

// Apply authentication middleware to all routes
router.use(authMiddleware);

// Dashboard data
router.get('/dashboard', roleMiddleware(['student']), studentController.getDashboardData);
router.get('/dashboard/:studentId', roleMiddleware(['admin', 'teacher']), studentController.getDashboardData);

// Courses
router.get('/courses', roleMiddleware(['student']), studentController.getStudentCourses);
router.get('/:studentId/courses', roleMiddleware(['admin', 'teacher']), studentController.getStudentCourses);

// Assignments
router.get('/assignments/upcoming', roleMiddleware(['student']), studentController.getUpcomingAssignments);
router.get('/:studentId/assignments/upcoming', roleMiddleware(['admin', 'teacher']), studentController.getUpcomingAssignments);

// Submissions
router.get('/submissions', roleMiddleware(['student']), studentController.getStudentSubmissions);
router.get('/:studentId/submissions', roleMiddleware(['admin', 'teacher']), studentController.getStudentSubmissions);
router.post('/assignments/:assignmentId/submit', roleMiddleware(['student']), studentController.submitAssignment);

// Grades
router.get('/grades/recent', roleMiddleware(['student']), studentController.getRecentGrades);
router.get('/:studentId/grades/recent', roleMiddleware(['admin', 'teacher', 'parent']), studentController.getRecentGrades);

// Attendance
router.get('/attendance/stats', roleMiddleware(['student']), studentController.getAttendanceStats);
router.get('/:studentId/attendance/stats', roleMiddleware(['admin', 'teacher', 'parent']), studentController.getAttendanceStats);

// Schedule
router.get('/schedule', roleMiddleware(['student']), studentController.getStudentSchedule);
router.get('/:studentId/schedule', roleMiddleware(['admin', 'teacher', 'parent']), studentController.getStudentSchedule);

// Materials
router.get('/courses/:courseId/materials', roleMiddleware(['student']), studentController.getCourseMaterials);

export default router; 