import { Router } from 'express';
import { classController } from '../controllers/class.controller';
import { authenticate, authorize } from '../middlewares/auth.middleware';

const router = Router();

// Apply authentication middleware to all class routes
router.use(authenticate);

// Class CRUD operations
router.get('/', (req, res, next) => {
  classController.getClasses(req, res).catch(next);
});

router.get('/:id', (req, res, next) => {
  classController.getClass(req, res).catch(next);
});

router.post('/', authorize(['administrator', 'teacher']), (req, res, next) => {
  classController.createClass(req, res).catch(next);
});

router.put('/:id', authorize(['administrator', 'teacher']), (req, res, next) => {
  classController.updateClass(req, res).catch(next);
});

router.delete('/:id', authorize(['administrator']), (req, res, next) => {
  classController.deleteClass(req, res).catch(next);
});

// Course-specific class routes
router.get('/course/:courseId', (req, res, next) => {
  classController.getClassesByCourse(req, res).catch(next);
});

// Teacher-specific class routes
router.get('/teacher/:teacherId', (req, res, next) => {
  classController.getClassesByTeacher(req, res).catch(next);
});

// Schedule routes
router.get('/teacher/:teacherId/schedule/:day', (req, res, next) => {
  classController.getTeacherScheduleByDay(req, res).catch(next);
});

router.get('/student/:studentId/schedule/:day', (req, res, next) => {
  classController.getStudentScheduleByDay(req, res).catch(next);
});

export default router; 