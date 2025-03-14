import { Router } from 'express';
import { AcademicProgressController } from '../controllers/academic-progress.controller';
import { authenticateToken } from '../middlewares/auth.middleware';

const router = Router();
const controller = new AcademicProgressController();

// Middleware d'authentification pour toutes les routes
router.use(authenticateToken);

// Routes pour le progrès académique
router.get('/student/:studentId?', controller.getStudentProgress);
router.put('/:progressId', controller.updateProgress);
router.post('/init', controller.initializeTables);

export default router; 