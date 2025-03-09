import axios from 'axios';
import { API_URL } from '../config/constants';
import { handleApiError } from '../utils/error-handler';
import { Department, CreateDepartmentData, UpdateDepartmentData } from '../types/department';

const API_ENDPOINT = `${API_URL}/departments`;

/**
 * Get all departments with optional filtering
 */
export const getAllDepartments = async (
  filters: { status?: string; search?: string } = {}
): Promise<Department[]> => {
  try {
    const params = new URLSearchParams();
    
    if (filters.status) {
      params.append('status', filters.status);
    }
    
    if (filters.search) {
      params.append('search', filters.search);
    }
    
    const response = await axios.get(`${API_ENDPOINT}?${params.toString()}`);
    return response.data.data.departments;
  } catch (error) {
    throw handleApiError(error, 'Failed to fetch departments');
  }
};

/**
 * Get a department by ID
 */
export const getDepartmentById = async (id: string): Promise<Department> => {
  try {
    const response = await axios.get(`${API_ENDPOINT}/${id}`);
    return response.data.data.department;
  } catch (error) {
    throw handleApiError(error, 'Failed to fetch department');
  }
};

/**
 * Create a new department
 */
export const createDepartment = async (
  departmentData: CreateDepartmentData
): Promise<Department> => {
  try {
    const response = await axios.post(API_ENDPOINT, departmentData);
    return response.data.data.department;
  } catch (error) {
    throw handleApiError(error, 'Failed to create department');
  }
};

/**
 * Update an existing department
 */
export const updateDepartment = async (
  id: string,
  departmentData: UpdateDepartmentData
): Promise<Department> => {
  try {
    const response = await axios.put(`${API_ENDPOINT}/${id}`, departmentData);
    return response.data.data.department;
  } catch (error) {
    throw handleApiError(error, 'Failed to update department');
  }
};

/**
 * Delete a department
 */
export const deleteDepartment = async (id: string): Promise<void> => {
  try {
    await axios.delete(`${API_ENDPOINT}/${id}`);
  } catch (error) {
    throw handleApiError(error, 'Failed to delete department');
  }
}; 