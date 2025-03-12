import { apiClient } from '../lib/api-client';

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
  uploadDate: string;
  dueDate?: string;
  fileUrl?: string;
  fileSize?: number;
  duration?: number;
  status: MaterialStatus;
  progress?: number;
  lastAccessed?: string;
  courseName?: string;
  courseCode?: string;
  createdAt: string;
  updatedAt: string;
}

export interface CourseProgressSummary {
  totalMaterials: number;
  completed: number;
  inProgress: number;
  notStarted: number;
  overallProgress: number;
}

export interface MaterialFilters {
  courseId?: string;
  type?: MaterialType;
  status?: MaterialStatus;
  search?: string;
}

export interface UpdateProgressRequest {
  status?: MaterialStatus;
  progress?: number;
}

export interface CreateMaterialRequest {
  courseId: string;
  title: string;
  type: MaterialType;
  format: string;
  description: string;
  dueDate?: string;
  duration?: number;
  file?: File;
}

export interface MaterialResponse {
  materialId: string;
  message: string;
}

class MaterialService {
  /**
   * Get materials for a course
   */
  async getMaterialsByCourse(courseId: string): Promise<Material[]> {
    const response = await fetch(`/api/materials/courses/${courseId}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('auth_token')}`
      }
    });
    
    if (!response.ok) {
      throw new Error('Failed to fetch materials');
    }
    
    const data = await response.json();
    return data.materials;
  }

  /**
   * Get materials for the current student
   */
  async getMaterialsForStudent(filters?: MaterialFilters): Promise<Material[]> {
    const response = await apiClient.get<{ materials: Material[] }>('/materials/student/materials', filters as Record<string, string>);
    return response.data.materials || [];
  }

  /**
   * Get a specific material
   */
  async getMaterial(materialId: string): Promise<Material> {
    const response = await apiClient.get<Material>(`/materials/${materialId}`);
    return response.data;
  }

  /**
   * Download a material
   */
  async downloadMaterial(materialId: string): Promise<Blob> {
    // For blob responses, we need to use fetch directly
    const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:3001/api";
    const response = await fetch(`${API_BASE_URL}/materials/${materialId}/download`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('auth_token')}`
      }
    });
    
    if (!response.ok) {
      throw new Error('Failed to download material');
    }
    
    return await response.blob();
  }

  /**
   * Update material progress
   */
  async updateProgress(materialId: string, progressData: UpdateProgressRequest): Promise<{ message: string }> {
    const response = await apiClient.put<{ message: string }>(`/materials/${materialId}/progress`, progressData);
    return response.data;
  }

  /**
   * Get course progress summary
   */
  async getCourseProgressSummary(courseId: string): Promise<CourseProgressSummary> {
    const response = await apiClient.get<CourseProgressSummary>(`/materials/courses/${courseId}/progress`);
    return response.data;
  }

  /**
   * Create a new material (teacher/admin only)
   */
  async createMaterial(materialData: CreateMaterialRequest): Promise<MaterialResponse> {
    const formData = new FormData();
    
    // Add text fields
    formData.append('courseId', materialData.courseId);
    formData.append('title', materialData.title);
    formData.append('type', materialData.type);
    formData.append('format', materialData.format);
    formData.append('description', materialData.description);
    
    if (materialData.dueDate) {
      formData.append('dueDate', materialData.dueDate);
    }
    
    if (materialData.duration) {
      formData.append('duration', materialData.duration.toString());
    }
    
    // Add file if present
    if (materialData.file) {
      formData.append('file', materialData.file);
    }
    
    // For FormData, we need to use fetch directly
    const token = localStorage.getItem('auth_token');
    const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:3001/api";
    const response = await fetch(`${API_BASE_URL}/materials`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`
      },
      body: formData
    });
    
    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || "Failed to create material");
    }
    
    return await response.json();
  }

  /**
   * Update a material (teacher/admin only)
   */
  async updateMaterial(materialId: string, materialData: Partial<CreateMaterialRequest>): Promise<{ message: string }> {
    const formData = new FormData();
    
    // Add text fields
    if (materialData.title) formData.append('title', materialData.title);
    if (materialData.type) formData.append('type', materialData.type);
    if (materialData.format) formData.append('format', materialData.format);
    if (materialData.description) formData.append('description', materialData.description);
    if (materialData.dueDate) formData.append('dueDate', materialData.dueDate);
    if (materialData.duration) formData.append('duration', materialData.duration.toString());
    
    // Add file if present
    if (materialData.file) {
      formData.append('file', materialData.file);
    }
    
    // For FormData, we need to use fetch directly
    const token = localStorage.getItem('auth_token');
    const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:3001/api";
    const response = await fetch(`${API_BASE_URL}/materials/${materialId}`, {
      method: 'PUT',
      headers: {
        Authorization: `Bearer ${token}`
      },
      body: formData
    });
    
    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || "Failed to update material");
    }
    
    return await response.json();
  }

  /**
   * Delete a material (teacher/admin only)
   */
  async deleteMaterial(materialId: string): Promise<void> {
    await apiClient.delete(`/materials/${materialId}`);
  }
}

export const materialService = new MaterialService(); 