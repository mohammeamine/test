import { Request, Response, NextFunction } from 'express';
import { check, validationResult } from 'express-validator';

export const validateMessage = [
  check('receiverId')
    .notEmpty()
    .withMessage('Receiver ID is required')
    .isUUID()
    .withMessage('Invalid receiver ID format'),

  check('subject')
    .notEmpty()
    .withMessage('Subject is required')
    .isString()
    .withMessage('Subject must be a string')
    .isLength({ min: 1, max: 255 })
    .withMessage('Subject must be between 1 and 255 characters'),

  check('content')
    .notEmpty()
    .withMessage('Content is required')
    .isString()
    .withMessage('Content must be a string')
    .isLength({ min: 1, max: 10000 })
    .withMessage('Content must be between 1 and 10000 characters'),

  (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        error: true,
        errors: errors.array(),
        message: 'Validation error'
      });
    }
    next();
  }
]; 