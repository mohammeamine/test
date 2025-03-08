import { Router } from 'express';
import { courseController } from '../controllers/course.controller';
import { authenticate, authorize } from '../middlewares/auth.middleware';

const router = Router();

// Apply authentication middleware to all course routes
router.use(authenticate);

// Course CRUD operations
router.get('/', (req, res, next) => {
  courseController.getCourses(req, res).catch(next);
});

router.get('/:id', (req, res, next) => {
  courseController.getCourse(req, res).catch(next);
});

router.post('/', authorize(['administrator', 'teacher']), (req, res, next) => {
  courseController.createCourse(req, res).catch(next);
});

router.put('/:id', authorize(['administrator', 'teacher']), (req, res, next) => {
  courseController.updateCourse(req, res).catch(next);
});

router.delete('/:id', authorize(['administrator']), (req, res, next) => {
  courseController.deleteCourse(req, res).catch(next);
});

// Course enrollment routes
router.post('/enroll', (req, res, next) => {
  courseController.enrollStudent(req, res).catch(next);
});

router.post('/unenroll', (req, res, next) => {
  courseController.unenrollStudent(req, res).catch(next);
});

// Course student routes
router.get('/:courseId/students', (req, res, next) => {
  courseController.getCourseStudents(req, res).catch(next);
});

// Teacher/Student specific routes
router.get('/teacher/:teacherId', (req, res, next) => {
  courseController.getTeacherCourses(req, res).catch(next);
});

router.get('/student/:studentId', (req, res, next) => {
  courseController.getStudentCourses(req, res).catch(next);
});

export default router; 