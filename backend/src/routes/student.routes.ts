import express, { RequestHandler } from 'express';
import { studentController } from '../controllers/student.controller';
import { authenticate, authorize } from '../middlewares/auth.middleware';
import { upload } from '../controllers/document.controller';

const router = express.Router();

// Apply authentication middleware to all routes
router.use(authenticate);

// Student role required for these routes
router.use(authorize(['student', 'admin']));

// Student dashboard
router.get('/dashboard', studentController.getDashboardData as RequestHandler);

// Get upcoming assignments
router.get('/assignments/upcoming', studentController.getUpcomingAssignments as RequestHandler);

// Get student submissions
router.get('/submissions', studentController.getStudentSubmissions as RequestHandler);

// Submit an assignment
router.post('/assignments/:assignmentId/submit', upload.single('file'), studentController.submitAssignment as RequestHandler);

// Download a submission
router.get('/submissions/:submissionId/download', studentController.downloadSubmission as RequestHandler);

// Get recent grades
router.get('/grades/recent', studentController.getRecentGrades as RequestHandler);

// Get attendance statistics
router.get('/attendance', studentController.getAttendanceStats as RequestHandler);

// Get detailed attendance records
router.get('/attendance/records', studentController.getDetailedAttendance as RequestHandler);

// Get monthly attendance summary
router.get('/attendance/monthly-summary', studentController.getMonthlyAttendanceSummary as RequestHandler);

// Download attendance report
router.get('/attendance/report', studentController.downloadAttendanceReport as RequestHandler);

// Get student schedule
router.get('/schedule', studentController.getStudentSchedule as RequestHandler);

// Get courses
router.get('/courses', studentController.getStudentCourses as RequestHandler);

export default router; 