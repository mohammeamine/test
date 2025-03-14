import { Router } from 'express';
import { scheduleController } from '../controllers/schedule.controller';
import { authenticate, authorize } from '../middlewares/auth.middleware';
import { scheduleValidationRules, validateSchedule } from '../middlewares/validators/schedule.validator';

const router = Router();

// Appliquer l'authentification à toutes les routes
router.use(authenticate);

// Routes pour les horaires
router.get('/children', authorize(['parent']), scheduleController.getChildrenSchedules);
router.get('/student/:studentId', authorize(['parent', 'student', 'teacher']), scheduleController.getStudentSchedule);
router.post('/', authorize(['administrator']), scheduleValidationRules, validateSchedule, scheduleController.createSchedule);

export default router; 