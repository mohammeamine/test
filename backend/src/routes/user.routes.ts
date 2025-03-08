import { Router } from 'express';
import { userController } from '../controllers/user.controller';
import { authenticate, authorize } from '../middlewares/auth.middleware';

const router = Router();

// Apply authentication middleware to all user routes
router.use(authenticate);

// All users
router.get('/', authorize(['administrator']), (req, res, next) => {
  userController.getUsers(req, res)
    .catch(next);
});

router.get('/:id', (req, res, next) => {
  userController.getUser(req, res)
    .catch(next);
});

router.put('/:id', (req, res, next) => {
  userController.updateUser(req, res)
    .catch(next);
});

router.delete('/:id', authorize(['administrator']), (req, res, next) => {
  userController.deleteUser(req, res)
    .catch(next);
});

// Password management
router.post('/:id/password', (req, res, next) => {
  userController.updatePassword(req, res)
    .catch(next);
});

export default router; 