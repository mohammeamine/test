import express, { RequestHandler } from 'express';
import { materialController } from '../controllers/material.controller';
import { authenticate, authorize } from '../middlewares/auth.middleware';
import { upload } from '../controllers/document.controller';

const router = express.Router();

// Apply authentication middleware to all routes
router.use(authenticate);

// Routes accessible to all authenticated users
router.get('/courses/:courseId', materialController.getMaterialsByCourse as RequestHandler);
router.get('/:materialId', materialController.getMaterial as RequestHandler);
router.get('/:materialId/download', materialController.downloadMaterial as RequestHandler);

// Student-specific routes
router.get('/student/materials', authorize(['student']), materialController.getMaterialsForStudent as RequestHandler);
router.put('/:materialId/progress', authorize(['student']), materialController.updateMaterialProgress as RequestHandler);
router.get('/courses/:courseId/progress', authorize(['student', 'teacher', 'admin']), materialController.getCourseProgressSummary as RequestHandler);

// Teacher and admin routes
router.post('/', authorize(['teacher', 'admin']), upload.single('file'), materialController.createMaterial as RequestHandler);
router.put('/:materialId', authorize(['teacher', 'admin']), upload.single('file'), materialController.updateMaterial as RequestHandler);
router.delete('/:materialId', authorize(['teacher', 'admin']), materialController.deleteMaterial as RequestHandler);

export default router; 