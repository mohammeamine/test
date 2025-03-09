import { Router, Request, Response, NextFunction } from 'express';
import { departmentController } from '../controllers/department.controller';
import { authenticate, authorize } from '../middlewares/auth.middleware';
import { validateDepartmentCreate, validateDepartmentUpdate } from '../middlewares/validators/department.validator';
import { RequestHandler } from 'express';

const router = Router();

// Test endpoint - no authentication required
router.get('/test', (req: Request, res: Response) => {
  res.json({ message: 'Department routes are working!' });
});

// Apply authentication middleware to all department routes
router.use(authenticate);

// Get all departments
router.get('/', (req: Request, res: Response, next: NextFunction) => {
  departmentController.getDepartments(req, res)
    .catch(next);
});

// Get a single department
router.get('/:id', (req: Request, res: Response, next: NextFunction) => {
  departmentController.getDepartment(req, res)
    .catch(next);
});

// Create a new department (admin only)
router.post('/', 
  authorize(['administrator']) as RequestHandler,
  validateDepartmentCreate as unknown as RequestHandler[],
  (req: Request, res: Response, next: NextFunction) => {
    departmentController.createDepartment(req, res)
      .catch(next);
  }
);

// Update a department (admin only)
router.put('/:id', 
  authorize(['administrator']) as RequestHandler,
  validateDepartmentUpdate as unknown as RequestHandler[],
  (req: Request, res: Response, next: NextFunction) => {
    departmentController.updateDepartment(req, res)
      .catch(next);
  }
);

// Delete a department (admin only)
router.delete('/:id', 
  authorize(['administrator']),
  (req: Request, res: Response, next: NextFunction) => {
    departmentController.deleteDepartment(req, res)
      .catch(next);
  }
);

export default router; 