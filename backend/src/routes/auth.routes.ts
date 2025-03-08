import { Router } from 'express';
import { authController } from '../controllers/auth.controller';
import { authenticate } from '../middlewares/auth.middleware';

const router = Router();

// Public routes
router.post('/register', (req, res, next) => {
  authController.register(req, res)
    .catch(next);
});

router.post('/login', (req, res, next) => {
  authController.login(req, res)
    .catch(next);
});

router.post('/forgot-password', (req, res, next) => {
  authController.forgotPassword(req, res)
    .catch(next);
});

router.post('/reset-password', (req, res, next) => {
  authController.resetPassword(req, res)
    .catch(next);
});

// Protected routes
router.get('/me', authenticate, (req, res, next) => {
  authController.getCurrentUser(req, res)
    .catch(next);
});

export default router; 