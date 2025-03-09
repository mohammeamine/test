import { Request, Response } from 'express';
import { departmentService } from '../services/department.service';
import { DepartmentFilters } from '../types/department';

class DepartmentController {
  /**
   * Get all departments
   */
  async getDepartments(req: Request, res: Response) {
    try {
      const filters: DepartmentFilters = {
        status: req.query.status as 'active' | 'inactive',
        search: req.query.search as string,
      };
      
      const departments = await departmentService.getDepartments(filters);
      
      res.status(200).json({
        error: false,
        data: { departments },
        message: 'Departments retrieved successfully',
      });
    } catch (error: any) {
      res.status(500).json({
        error: true,
        message: error.message || 'Failed to retrieve departments',
      });
    }
  }

  /**
   * Get a single department
   */
  async getDepartment(req: Request, res: Response) {
    try {
      const departmentId = req.params.id;
      
      const department = await departmentService.getDepartment(departmentId);
      
      if (!department) {
        return res.status(404).json({
          error: true,
          message: 'Department not found',
        });
      }
      
      res.status(200).json({
        error: false,
        data: { department },
        message: 'Department retrieved successfully',
      });
    } catch (error: any) {
      res.status(500).json({
        error: true,
        message: error.message || 'Failed to retrieve department',
      });
    }
  }

  /**
   * Create a new department
   */
  async createDepartment(req: Request, res: Response) {
    try {
      const department = await departmentService.createDepartment(req.body);
      
      res.status(201).json({
        error: false,
        data: { department },
        message: 'Department created successfully',
      });
    } catch (error: any) {
      res.status(400).json({
        error: true,
        message: error.message || 'Failed to create department',
      });
    }
  }

  /**
   * Update an existing department
   */
  async updateDepartment(req: Request, res: Response) {
    try {
      const departmentId = req.params.id;
      const department = await departmentService.updateDepartment(departmentId, req.body);
      
      res.status(200).json({
        error: false,
        data: { department },
        message: 'Department updated successfully',
      });
    } catch (error: any) {
      const statusCode = error.message.includes('not found') ? 404 : 400;
      res.status(statusCode).json({
        error: true,
        message: error.message || 'Failed to update department',
      });
    }
  }

  /**
   * Delete a department
   */
  async deleteDepartment(req: Request, res: Response) {
    try {
      const departmentId = req.params.id;
      await departmentService.deleteDepartment(departmentId);
      
      res.status(200).json({
        error: false,
        message: 'Department deleted successfully',
      });
    } catch (error: any) {
      const statusCode = error.message.includes('not found') ? 404 : 400;
      res.status(statusCode).json({
        error: true,
        message: error.message || 'Failed to delete department',
      });
    }
  }
}

export const departmentController = new DepartmentController(); 