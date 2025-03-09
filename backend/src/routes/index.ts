import { Router } from 'express';
import authRoutes from './auth.routes';
import userRoutes from './user.routes';
import courseRoutes from './course.routes';
import classRoutes from './class.routes';
import assignmentRoutes from './assignment.routes';
import departmentRoutes from './department.routes';

const router = Router();

// Authentication routes
router.use('/auth', authRoutes);

// User routes
router.use('/users', userRoutes);

// Course routes
router.use('/courses', courseRoutes);

// Class routes
router.use('/classes', classRoutes);

// Assignment routes
router.use('/assignments', assignmentRoutes);

// Department routes
router.use('/departments', departmentRoutes);

export default router; 