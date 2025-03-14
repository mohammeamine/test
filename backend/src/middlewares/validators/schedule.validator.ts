import { Request, Response, NextFunction } from 'express';
import { check, validationResult } from 'express-validator';

export const scheduleValidationRules = [
  check('studentId')
    .notEmpty()
    .withMessage('Student ID is required')
    .isUUID()
    .withMessage('Invalid student ID format'),

  check('courseId')
    .notEmpty()
    .withMessage('Course ID is required')
    .isUUID()
    .withMessage('Invalid course ID format'),

  check('dayOfWeek')
    .notEmpty()
    .withMessage('Day of week is required')
    .isInt({ min: 1, max: 5 })
    .withMessage('Day of week must be between 1 and 5'),

  check('startTime')
    .notEmpty()
    .withMessage('Start time is required')
    .matches(/^([01]?[0-9]|2[0-3]):[0-5][0-9]$/)
    .withMessage('Invalid start time format (HH:mm)'),

  check('endTime')
    .notEmpty()
    .withMessage('End time is required')
    .matches(/^([01]?[0-9]|2[0-3]):[0-5][0-9]$/)
    .withMessage('Invalid end time format (HH:mm)'),

  check('room')
    .notEmpty()
    .withMessage('Room is required')
    .isString()
    .withMessage('Room must be a string')
    .isLength({ min: 1, max: 50 })
    .withMessage('Room must be between 1 and 50 characters'),
];

export const validateSchedule = (req: Request, res: Response, next: NextFunction): void => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    res.status(400).json({
      error: true,
      errors: errors.array(),
      message: 'Validation error'
    });
    return;
  }
  next();
}; 