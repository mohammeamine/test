export interface Department {
  id: string;
  name: string;
  code: string;
  head: string;
  headId: string;
  description: string;
  facultyCount: number;
  studentCount: number;
  courses: number;
  established: string;
  status: 'active' | 'inactive';
  createdAt: string;
  updatedAt: string;
}

export interface CreateDepartmentData {
  name: string;
  code: string;
  headId: string;
  description: string;
  established: string;
  status?: 'active' | 'inactive';
}

export interface UpdateDepartmentData {
  name?: string;
  code?: string;
  headId?: string;
  description?: string;
  established?: string;
  status?: 'active' | 'inactive';
}

export interface DepartmentFormData {
  name: string;
  code: string;
  headId: string;
  description: string;
  established: string;
  status: 'active' | 'inactive';
} 