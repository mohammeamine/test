import { Request, Response, NextFunction } from 'express';
import { check, validationResult } from 'express-validator';

/**
 * Validate department creation request
 */
export const validateDepartmentCreate = [
  check('name')
    .notEmpty().withMessage('Name is required')
    .isString().withMessage('Name must be a string')
    .isLength({ min: 3, max: 100 }).withMessage('Name must be between 3 and 100 characters'),
  
  check('code')
    .notEmpty().withMessage('Code is required')
    .isString().withMessage('Code must be a string')
    .isLength({ min: 2, max: 10 }).withMessage('Code must be between 2 and 10 characters')
    .matches(/^[A-Za-z0-9]+$/).withMessage('Code must contain only alphanumeric characters'),
  
  check('headId')
    .optional()
    .isString().withMessage('Head ID must be a string')
    .isUUID().withMessage('Head ID must be a valid UUID'),
  
  check('description')
    .notEmpty().withMessage('Description is required')
    .isString().withMessage('Description must be a string'),
  
  check('established')
    .notEmpty().withMessage('Established date is required')
    .isString().withMessage('Established date must be a string')
    .matches(/^\d{4}-\d{2}-\d{2}$/).withMessage('Established date must be in YYYY-MM-DD format'),
  
  check('status')
    .optional()
    .isIn(['active', 'inactive']).withMessage('Status must be either active or inactive'),
  
  // Handle validation errors
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

/**
 * Validate department update request
 */
export const validateDepartmentUpdate = [
  check('name')
    .optional()
    .isString().withMessage('Name must be a string')
    .isLength({ min: 3, max: 100 }).withMessage('Name must be between 3 and 100 characters'),
  
  check('code')
    .optional()
    .isString().withMessage('Code must be a string')
    .isLength({ min: 2, max: 10 }).withMessage('Code must be between 2 and 10 characters')
    .matches(/^[A-Za-z0-9]+$/).withMessage('Code must contain only alphanumeric characters'),
  
  check('headId')
    .optional()
    .isString().withMessage('Head ID must be a string')
    .isUUID().withMessage('Head ID must be a valid UUID'),
  
  check('description')
    .optional()
    .isString().withMessage('Description must be a string'),
  
  check('established')
    .optional()
    .isString().withMessage('Established date must be a string')
    .matches(/^\d{4}-\d{2}-\d{2}$/).withMessage('Established date must be in YYYY-MM-DD format'),
  
  check('status')
    .optional()
    .isIn(['active', 'inactive']).withMessage('Status must be either active or inactive'),
  
  // Handle validation errors
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