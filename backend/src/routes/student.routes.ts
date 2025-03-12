import { Router } from 'express';
import { studentController } from '../controllers/student.controller';
import { authenticate } from '../middlewares/auth.middleware';

const router = Router();

// Apply authentication middleware to all student routes
router.use(authenticate);

// Dashboard route
router.get('/dashboard', studentController.getDashboardData);

// Courses route
router.get('/courses', studentController.getStudentCourses);

// Upcoming assignments route
router.get('/assignments/upcoming', studentController.getUpcomingAssignments);

// Student submissions route
router.get('/submissions', studentController.getStudentSubmissions);

// Recent grades route
router.get('/grades/recent', studentController.getRecentGrades);

// Attendance statistics route
router.get('/attendance', studentController.getAttendanceStats);

// Schedule route
router.get('/schedule', studentController.getStudentSchedule);

// Add more routes as needed...

export default router; 