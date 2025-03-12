import { RowDataPacket, OkPacket } from 'mysql2';
import { v4 as uuidv4 } from 'uuid';
import { pool } from '../config/db';

// Flag to track if database is available
let isDatabaseAvailable = true;

// Check if the database pool is properly initialized
const checkDbAvailability = () => {
  if (!pool || !pool.query) {
    if (isDatabaseAvailable) {
      console.error('Database is not available, using mock data for materials');
      isDatabaseAvailable = false;
    }
    return false;
  }
  return true;
};

// Mock data for when database is unavailable
const mockMaterials = [
  {
    id: 'mock-material-1',
    courseId: 'mock-course-1',
    courseName: 'Introduction to Computer Science',
    courseCode: 'CS101',
    title: 'Introduction to Programming',
    type: 'document',
    format: 'pdf',
    description: 'Learn the basics of programming',
    uploadedBy: 'mock-teacher-1',
    uploadDate: new Date(),
    fileUrl: '/mock/materials/intro.pdf',
    fileSize: 1024,
    status: 'not_started',
    progress: 0,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    id: 'mock-material-2',
    courseId: 'mock-course-1',
    courseName: 'Introduction to Computer Science',
    courseCode: 'CS101',
    title: 'Variables and Data Types',
    type: 'video',
    format: 'mp4',
    description: 'Learn about variables and data types in programming',
    uploadedBy: 'mock-teacher-1',
    uploadDate: new Date(),
    fileUrl: '/mock/materials/variables.mp4',
    fileSize: 10240,
    duration: 30,
    status: 'in_progress',
    progress: 50,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    id: 'mock-material-3',
    courseId: 'mock-course-2',
    courseName: 'Web Development',
    courseCode: 'WEB101',
    title: 'HTML Basics',
    type: 'document',
    format: 'pdf',
    description: 'Introduction to HTML',
    uploadedBy: 'mock-teacher-2',
    uploadDate: new Date(),
    fileUrl: '/mock/materials/html.pdf',
    fileSize: 2048,
    status: 'completed',
    progress: 100,
    createdAt: new Date(),
    updatedAt: new Date()
  }
];

const mockProgressSummary = {
  totalMaterials: 3,
  completed: 1,
  inProgress: 1,
  notStarted: 1,
  overallProgress: 50
};

export type MaterialType = 'document' | 'video' | 'quiz' | 'assignment';
export type MaterialStatus = 'not_started' | 'in_progress' | 'completed';

export interface Material {
  id: string;
  courseId: string;
  title: string;
  type: MaterialType;
  format: string;
  description: string;
  uploadedBy: string;
  uploadDate: Date;
  dueDate?: Date;
  fileUrl?: string;
  fileSize?: number;
  duration?: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface MaterialProgress {
  id: string;
  materialId: string;
  studentId: string;
  status: MaterialStatus;
  progress?: number;
  lastAccessed: Date;
  createdAt: Date;
  updatedAt: Date;
}

export interface CreateMaterialDTO {
  courseId: string;
  title: string;
  type: MaterialType;
  format: string;
  description: string;
  uploadedBy: string;
  dueDate?: Date;
  fileUrl?: string;
  fileSize?: number;
  duration?: number;
}

export interface UpdateMaterialDTO {
  title?: string;
  type?: MaterialType;
  format?: string;
  description?: string;
  dueDate?: Date;
  fileUrl?: string;
  fileSize?: number;
  duration?: number;
}

export interface UpdateMaterialProgressDTO {
  status?: MaterialStatus;
  progress?: number;
}

interface MaterialRow extends Material, RowDataPacket {}
interface MaterialProgressRow extends MaterialProgress, RowDataPacket {}

export class MaterialModel {
  /**
   * Create the materials table if it doesn't exist
   */
  async createTable(): Promise<void> {
    const query = `
      CREATE TABLE IF NOT EXISTS materials (
        id VARCHAR(36) PRIMARY KEY,
        courseId VARCHAR(36) NOT NULL,
        title VARCHAR(255) NOT NULL,
        type ENUM('document', 'video', 'quiz', 'assignment') NOT NULL,
        format VARCHAR(50) NOT NULL,
        description TEXT,
        uploadedBy VARCHAR(36) NOT NULL,
        uploadDate DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
        dueDate DATETIME,
        fileUrl VARCHAR(255),
        fileSize INT,
        duration INT,
        createdAt DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
        updatedAt DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
        FOREIGN KEY (courseId) REFERENCES courses(id) ON DELETE CASCADE
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
    `;
    
    await pool.query(query);
  }

  /**
   * Create the material progress table if it doesn't exist
   */
  async createProgressTable(): Promise<void> {
    const query = `
      CREATE TABLE IF NOT EXISTS material_progress (
        id VARCHAR(36) PRIMARY KEY,
        materialId VARCHAR(36) NOT NULL,
        studentId VARCHAR(36) NOT NULL,
        status ENUM('not_started', 'in_progress', 'completed') NOT NULL DEFAULT 'not_started',
        progress INT,
        lastAccessed DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
        createdAt DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
        updatedAt DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
        FOREIGN KEY (materialId) REFERENCES materials(id) ON DELETE CASCADE,
        FOREIGN KEY (studentId) REFERENCES users(id) ON DELETE CASCADE,
        UNIQUE KEY unique_material_student (materialId, studentId)
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
    `;
    
    await pool.query(query);
  }

  /**
   * Find a material by ID
   */
  async findById(id: string): Promise<Material | null> {
    const [rows] = await pool.query<MaterialRow[]>(
      'SELECT * FROM materials WHERE id = ?',
      [id]
    );
    
    return rows.length ? rows[0] : null;
  }

  /**
   * Create a new material
   */
  async create(materialData: CreateMaterialDTO): Promise<string> {
    const id = uuidv4();
    
    const query = `
      INSERT INTO materials (
        id, courseId, title, type, format, description, uploadedBy, 
        uploadDate, dueDate, fileUrl, fileSize, duration
      ) VALUES (?, ?, ?, ?, ?, ?, ?, NOW(), ?, ?, ?, ?)
    `;
    
    await pool.query<OkPacket>(query, [
      id,
      materialData.courseId,
      materialData.title,
      materialData.type,
      materialData.format,
      materialData.description,
      materialData.uploadedBy,
      materialData.dueDate,
      materialData.fileUrl,
      materialData.fileSize,
      materialData.duration
    ]);
    
    return id;
  }

  /**
   * Update a material
   */
  async update(id: string, materialData: UpdateMaterialDTO): Promise<boolean> {
    // Build query dynamically based on provided fields
    const fields: string[] = [];
    const values: any[] = [];
    
    Object.entries(materialData).forEach(([key, value]) => {
      if (value !== undefined) {
        fields.push(`${key} = ?`);
        values.push(value);
      }
    });
    
    if (fields.length === 0) {
      return false;
    }
    
    const query = `
      UPDATE materials
      SET ${fields.join(', ')}
      WHERE id = ?
    `;
    
    values.push(id);
    
    const [result] = await pool.query<OkPacket>(query, values);
    
    return result.affectedRows > 0;
  }

  /**
   * Delete a material
   */
  async delete(id: string): Promise<boolean> {
    const [result] = await pool.query<OkPacket>(
      'DELETE FROM materials WHERE id = ?',
      [id]
    );
    
    return result.affectedRows > 0;
  }

  /**
   * Get materials for a course
   */
  async getByCourse(courseId: string): Promise<Material[]> {
    const [rows] = await pool.query<MaterialRow[]>(
      'SELECT * FROM materials WHERE courseId = ? ORDER BY uploadDate DESC',
      [courseId]
    );
    
    return rows;
  }

  /**
   * Get materials for a student (across all courses)
   */
  async getForStudent(studentId: string, filters?: {
    courseId?: string;
    type?: MaterialType;
    status?: MaterialStatus;
    search?: string;
  }): Promise<any[]> {
    try {
      if (!checkDbAvailability()) {
        console.log('Using mock materials data');
        // Filter mock data based on filters
        let filteredMaterials = [...mockMaterials];
        
        if (filters?.courseId) {
          filteredMaterials = filteredMaterials.filter(m => m.courseId === filters.courseId);
        }
        
        if (filters?.type) {
          filteredMaterials = filteredMaterials.filter(m => m.type === filters.type);
        }
        
        if (filters?.status) {
          filteredMaterials = filteredMaterials.filter(m => m.status === filters.status);
        }
        
        if (filters?.search) {
          const searchTerm = filters.search.toLowerCase();
          filteredMaterials = filteredMaterials.filter(
            m => m.title.toLowerCase().includes(searchTerm) || 
                 m.description.toLowerCase().includes(searchTerm)
          );
        }
        
        return filteredMaterials;
      }
      
      let query = `
        SELECT m.*, mp.status, mp.progress, mp.lastAccessed, c.name as courseName, c.code as courseCode
        FROM materials m
        JOIN courses c ON m.courseId = c.id
        JOIN course_enrollments ce ON c.id = ce.courseId
        LEFT JOIN material_progress mp ON m.id = mp.materialId AND mp.studentId = ?
        WHERE ce.studentId = ?
      `;
      
      const queryParams: any[] = [studentId, studentId];
      
      if (filters?.courseId) {
        query += ' AND m.courseId = ?';
        queryParams.push(filters.courseId);
      }
      
      if (filters?.type) {
        query += ' AND m.type = ?';
        queryParams.push(filters.type);
      }
      
      if (filters?.status) {
        query += ' AND (mp.status = ? OR (mp.status IS NULL AND ? = "not_started"))';
        queryParams.push(filters.status, filters.status);
      }
      
      if (filters?.search) {
        query += ' AND (m.title LIKE ? OR m.description LIKE ?)';
        const searchTerm = `%${filters.search}%`;
        queryParams.push(searchTerm, searchTerm);
      }
      
      query += ' ORDER BY m.uploadDate DESC';
      
      const [rows] = await pool.query<RowDataPacket[]>(query, queryParams);
      
      return rows.map(row => ({
        ...row,
        status: row.status || 'not_started',
        progress: row.progress || 0
      }));
    } catch (error) {
      console.error('Error getting materials for student:', error);
      return mockMaterials;
    }
  }

  /**
   * Get material progress for a student
   */
  async getProgress(materialId: string, studentId: string): Promise<MaterialProgress | null> {
    const [rows] = await pool.query<MaterialProgressRow[]>(
      'SELECT * FROM material_progress WHERE materialId = ? AND studentId = ?',
      [materialId, studentId]
    );
    
    return rows.length ? rows[0] : null;
  }

  /**
   * Create or update material progress
   */
  async updateProgress(materialId: string, studentId: string, progressData: UpdateMaterialProgressDTO): Promise<boolean> {
    // Check if progress record exists
    const progress = await this.getProgress(materialId, studentId);
    
    if (progress) {
      // Update existing progress
      const fields: string[] = [];
      const values: any[] = [];
      
      Object.entries(progressData).forEach(([key, value]) => {
        if (value !== undefined) {
          fields.push(`${key} = ?`);
          values.push(value);
        }
      });
      
      fields.push('lastAccessed = NOW()');
      
      const query = `
        UPDATE material_progress
        SET ${fields.join(', ')}
        WHERE materialId = ? AND studentId = ?
      `;
      
      values.push(materialId, studentId);
      
      const [result] = await pool.query<OkPacket>(query, values);
      
      return result.affectedRows > 0;
    } else {
      // Create new progress record
      const id = uuidv4();
      
      const query = `
        INSERT INTO material_progress (
          id, materialId, studentId, status, progress, lastAccessed
        ) VALUES (?, ?, ?, ?, ?, NOW())
      `;
      
      await pool.query<OkPacket>(query, [
        id,
        materialId,
        studentId,
        progressData.status || 'not_started',
        progressData.progress || 0
      ]);
      
      return true;
    }
  }

  /**
   * Get course progress summary for a student
   */
  async getCourseProgressSummary(courseId: string, studentId: string): Promise<{
    totalMaterials: number;
    completed: number;
    inProgress: number;
    notStarted: number;
    overallProgress: number;
  }> {
    try {
      if (!checkDbAvailability()) {
        console.log('Using mock progress summary data');
        return mockProgressSummary;
      }
      
      // Get total materials count
      const [totalRows] = await pool.query<RowDataPacket[]>(
        'SELECT COUNT(*) as count FROM materials WHERE courseId = ?',
        [courseId]
      );
      const totalMaterials = totalRows[0]?.count || 0;
      
      if (totalMaterials === 0) {
        return {
          totalMaterials: 0,
          completed: 0,
          inProgress: 0,
          notStarted: 0,
          overallProgress: 0
        };
      }
      
      // Get progress counts
      const [progressRows] = await pool.query<RowDataPacket[]>(
        `SELECT 
          SUM(CASE WHEN mp.status = 'completed' THEN 1 ELSE 0 END) as completed,
          SUM(CASE WHEN mp.status = 'in_progress' THEN 1 ELSE 0 END) as inProgress,
          SUM(CASE WHEN mp.status = 'not_started' OR mp.status IS NULL THEN 1 ELSE 0 END) as notStarted
        FROM materials m
        LEFT JOIN material_progress mp ON m.id = mp.materialId AND mp.studentId = ?
        WHERE m.courseId = ?`,
        [studentId, courseId]
      );
      
      const completed = progressRows[0]?.completed || 0;
      const inProgress = progressRows[0]?.inProgress || 0;
      const notStarted = progressRows[0]?.notStarted || 0;
      
      // Calculate overall progress
      const overallProgress = Math.round((completed / totalMaterials) * 100);
      
      return {
        totalMaterials,
        completed,
        inProgress,
        notStarted,
        overallProgress
      };
    } catch (error) {
      console.error('Error getting course progress summary:', error);
      return mockProgressSummary;
    }
  }
}

export const materialModel = new MaterialModel(); 