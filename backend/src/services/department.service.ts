import { v4 as uuidv4 } from 'uuid';
import { Department, CreateDepartmentData, UpdateDepartmentData, DepartmentFilters } from '../types/department';
import { query, transaction } from '../config/db';
import { userService } from './user.service';

class DepartmentService {
  /**
   * Get all departments with optional filtering
   */
  async getDepartments(filters: DepartmentFilters = {}): Promise<Department[]> {
    try {
      let sql = `
        SELECT d.*, u.firstName, u.lastName,
        (SELECT COUNT(*) FROM users WHERE departmentId = d.id AND role = 'teacher') as facultyCount,
        (SELECT COUNT(*) FROM users WHERE departmentId = d.id AND role = 'student') as studentCount,
        (SELECT COUNT(*) FROM courses WHERE departmentId = d.id) as courses
        FROM departments d
        LEFT JOIN users u ON d.headId = u.id
        WHERE 1=1
      `;
      const params: any[] = [];

      if (filters.status) {
        sql += ` AND d.status = ?`;
        params.push(filters.status);
      }

      if (filters.search) {
        sql += ` AND (d.name LIKE ? OR d.code LIKE ?)`;
        params.push(`%${filters.search}%`, `%${filters.search}%`);
      }

      sql += ` ORDER BY d.name ASC`;

      const departments = await query(sql, params);

      return departments.map((dept: any) => ({
        ...dept,
        head: dept.firstName && dept.lastName ? `${dept.firstName} ${dept.lastName}` : 'Not Assigned',
      }));
    } catch (error) {
      console.error('Error getting departments:', error);
      throw new Error('Failed to retrieve departments');
    }
  }

  /**
   * Get a single department by ID
   */
  async getDepartment(id: string): Promise<Department | null> {
    try {
      const sql = `
        SELECT d.*, u.firstName, u.lastName,
        (SELECT COUNT(*) FROM users WHERE departmentId = d.id AND role = 'teacher') as facultyCount,
        (SELECT COUNT(*) FROM users WHERE departmentId = d.id AND role = 'student') as studentCount,
        (SELECT COUNT(*) FROM courses WHERE departmentId = d.id) as courses
        FROM departments d
        LEFT JOIN users u ON d.headId = u.id
        WHERE d.id = ?
      `;
      
      const departments = await query(sql, [id]);
      
      if (departments.length === 0) {
        return null;
      }
      
      const dept = departments[0];
      return {
        ...dept,
        head: dept.firstName && dept.lastName ? `${dept.firstName} ${dept.lastName}` : 'Not Assigned',
      };
    } catch (error) {
      console.error('Error getting department:', error);
      throw new Error('Failed to retrieve department');
    }
  }

  /**
   * Create a new department
   */
  async createDepartment(data: CreateDepartmentData): Promise<Department> {
    try {
      // Validate if head exists
      if (data.headId) {
        const head = await userService.getUser(data.headId);
        if (!head) {
          throw new Error('Department head not found');
        }
        if (head.role !== 'teacher') {
          throw new Error('Department head must be a teacher');
        }
      }

      // Check if department code is unique
      const existingDept = await query(
        'SELECT * FROM departments WHERE code = ?',
        [data.code]
      );
      
      if (existingDept.length > 0) {
        throw new Error('Department code already exists');
      }

      const departmentId = uuidv4();
      const now = new Date().toISOString();

      await query(
        `INSERT INTO departments (
          id, name, code, headId, description, established, status, createdAt, updatedAt
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
        [
          departmentId,
          data.name,
          data.code,
          data.headId || null,
          data.description,
          data.established,
          data.status || 'active',
          now,
          now
        ]
      );

      return await this.getDepartment(departmentId) as Department;
    } catch (error) {
      console.error('Error creating department:', error);
      throw new Error(error instanceof Error ? error.message : 'Failed to create department');
    }
  }

  /**
   * Update an existing department
   */
  async updateDepartment(id: string, data: UpdateDepartmentData): Promise<Department> {
    try {
      // Check if department exists
      const department = await this.getDepartment(id);
      if (!department) {
        throw new Error('Department not found');
      }

      // Validate if head exists
      if (data.headId) {
        const head = await userService.getUser(data.headId);
        if (!head) {
          throw new Error('Department head not found');
        }
        if (head.role !== 'teacher') {
          throw new Error('Department head must be a teacher');
        }
      }

      // Check if department code is unique (if being updated)
      if (data.code && data.code !== department.code) {
        const existingDept = await query(
          'SELECT * FROM departments WHERE code = ? AND id != ?',
          [data.code, id]
        );
        
        if (existingDept.length > 0) {
          throw new Error('Department code already exists');
        }
      }

      // Build update query
      const updates: string[] = [];
      const params: any[] = [];

      if (data.name !== undefined) {
        updates.push('name = ?');
        params.push(data.name);
      }

      if (data.code !== undefined) {
        updates.push('code = ?');
        params.push(data.code);
      }

      if (data.headId !== undefined) {
        updates.push('headId = ?');
        params.push(data.headId || null);
      }

      if (data.description !== undefined) {
        updates.push('description = ?');
        params.push(data.description);
      }

      if (data.established !== undefined) {
        updates.push('established = ?');
        params.push(data.established);
      }

      if (data.status !== undefined) {
        updates.push('status = ?');
        params.push(data.status);
      }

      updates.push('updatedAt = ?');
      params.push(new Date().toISOString());

      // Add department ID to params
      params.push(id);

      if (updates.length > 0) {
        await query(
          `UPDATE departments SET ${updates.join(', ')} WHERE id = ?`,
          params
        );
      }

      return await this.getDepartment(id) as Department;
    } catch (error) {
      console.error('Error updating department:', error);
      throw new Error(error instanceof Error ? error.message : 'Failed to update department');
    }
  }

  /**
   * Delete a department
   */
  async deleteDepartment(id: string): Promise<boolean> {
    try {
      // Check if department exists
      const department = await this.getDepartment(id);
      if (!department) {
        throw new Error('Department not found');
      }

      // Check if department has associated faculty or students
      if (department.facultyCount > 0 || department.studentCount > 0) {
        throw new Error('Cannot delete department with associated faculty or students');
      }

      // Begin transaction to handle dependent records
      await transaction(async (connection) => {
        // Delete associated courses
        await connection.query('DELETE FROM courses WHERE departmentId = ?', [id]);
        
        // Delete the department
        await connection.query('DELETE FROM departments WHERE id = ?', [id]);
      });

      return true;
    } catch (error) {
      console.error('Error deleting department:', error);
      throw new Error(error instanceof Error ? error.message : 'Failed to delete department');
    }
  }
}

export const departmentService = new DepartmentService(); 