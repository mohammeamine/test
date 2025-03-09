import axios, { AxiosError } from 'axios';
import toast from 'react-hot-toast';

type ApiErrorResponse = {
  error: boolean;
  message: string;
  errors?: Array<{ msg: string; param: string }>;
};

/**
 * Handle API errors and return a user-friendly error message
 */
export const handleApiError = (error: unknown, defaultMessage: string): Error => {
  // Check if it's an axios error
  if (axios.isAxiosError(error)) {
    const axiosError = error as AxiosError<ApiErrorResponse>;
    
    // Handle specific response error if available
    if (axiosError.response?.data) {
      const errorData = axiosError.response.data;
      
      // If there are validation errors, return the first one
      if (errorData.errors && errorData.errors.length > 0) {
        return new Error(errorData.errors[0].msg);
      }
      
      // Otherwise, return the general error message
      if (errorData.message) {
        return new Error(errorData.message);
      }
    }
    
    // Handle network errors
    if (axiosError.code === 'ECONNABORTED') {
      return new Error('Request timeout. Please try again.');
    }
    
    if (axiosError.code === 'ERR_NETWORK') {
      return new Error('Network error. Please check your connection.');
    }
    
    // Handle HTTP status code errors
    if (axiosError.response?.status) {
      const status = axiosError.response.status;
      
      if (status === 401) {
        return new Error('Authentication required. Please log in again.');
      }
      
      if (status === 403) {
        return new Error('You do not have permission to perform this action.');
      }
      
      if (status === 404) {
        return new Error('Resource not found.');
      }
      
      if (status === 500) {
        return new Error('Server error. Please try again later.');
      }
    }
  }
  
  // For non-axios errors or unhandled cases, return the default message
  return new Error(defaultMessage);
};

/**
 * Display an error toast with the error message
 */
export const displayErrorToast = (error: unknown, defaultMessage: string): void => {
  const errorMessage = error instanceof Error ? error.message : defaultMessage;
  toast.error(errorMessage);
};

/**
 * Display a success toast with the provided message
 */
export const displaySuccessToast = (message: string): void => {
  toast.success(message);
}; 