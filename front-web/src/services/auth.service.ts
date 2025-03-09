import axios from 'axios';
import { SignInData, SignUpData, UserResponse } from '@/types/auth';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001/api';

class AuthService {
  private readonly basePath = '/auth';

  // Initialize auth headers for axios
  constructor() {
    // Set up interceptor to add auth token to all requests
    axios.interceptors.request.use(
      (config) => {
        const token = this.getToken();
        if (token && config.headers) {
          config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
      },
      (error) => Promise.reject(error)
    );

    // Add response interceptor to handle auth errors
    axios.interceptors.response.use(
      (response) => response,
      (error) => {
        // Handle 401 Unauthorized errors
        if (error.response && error.response.status === 401) {
          this.logout();
          // Redirect to login
          window.location.href = '/auth/sign-in';
        }
        return Promise.reject(error);
      }
    );
  }

  async register(userData: SignUpData): Promise<{ user: UserResponse; token: string }> {
    try {
      const { data } = await axios.post(`${API_BASE_URL}${this.basePath}/register`, userData);
      if (data.error) {
        throw new Error(data.message || 'Registration failed');
      }
      return data.data;
    } catch (error: any) {
      console.error('Registration error:', error);
      if (error.response) {
        throw new Error(error.response.data.message || 'Registration failed');
      }
      throw error;
    }
  }

  async login(credentials: SignInData): Promise<{ user: UserResponse; token: string }> {
    try {
      console.log('Making login request to:', `${API_BASE_URL}${this.basePath}/login`);
      const { data } = await axios.post(`${API_BASE_URL}${this.basePath}/login`, credentials);
      console.log('Server response:', data);

      if (data.error) {
        throw new Error(data.message || 'Login failed');
      }
      
      if (!data.data || !data.data.token || !data.data.user) {
        throw new Error('Invalid response format from server');
      }
      
      // Store token and user data
      if (data.data.token) {
        localStorage.setItem('auth_token', data.data.token);
        localStorage.setItem('user', JSON.stringify(data.data.user));
      }
      
      return data.data;
    } catch (error: any) {
      console.error('Login error in service:', error);
      if (error.response) {
        throw new Error(error.response.data.message || 'Login failed');
      }
      throw error;
    }
  }

  async forgotPassword(email: string): Promise<void> {
    try {
      const { data } = await axios.post(`${API_BASE_URL}${this.basePath}/forgot-password`, { email });
      if (data.error) {
        throw new Error(data.message || 'Failed to send password reset email');
      }
    } catch (error: any) {
      console.error('Forgot password error:', error);
      if (error.response) {
        throw new Error(error.response.data.message || 'Failed to send password reset email');
      }
      throw error;
    }
  }

  async resetPassword(token: string, newPassword: string): Promise<void> {
    try {
      const { data } = await axios.post(`${API_BASE_URL}${this.basePath}/reset-password`, {
        token,
        newPassword,
      });
      if (data.error) {
        throw new Error(data.message || 'Failed to reset password');
      }
    } catch (error: any) {
      console.error('Reset password error:', error);
      if (error.response) {
        throw new Error(error.response.data.message || 'Failed to reset password');
      }
      throw error;
    }
  }

  logout(): void {
    // Clear all auth data
    localStorage.removeItem('auth_token');
    localStorage.removeItem('user');
    sessionStorage.removeItem('auth_token');
    sessionStorage.removeItem('user');
    
    // Clear auth headers
    delete axios.defaults.headers.common['Authorization'];
  }

  getCurrentUser(): UserResponse | null {
    try {
      const userStr = localStorage.getItem('user');
      if (!userStr) return null;
      const user = JSON.parse(userStr);
      
      // Basic validation
      if (!user || !user.id || !user.email || !user.role) {
        console.warn('Invalid user data found in localStorage');
        this.logout(); // Clear invalid data
        return null;
      }
      
      return user;
    } catch (error) {
      console.error('Error parsing user data', error);
      this.logout(); // Clear corrupt data
      return null;
    }
  }

  getToken(): string | null {
    return localStorage.getItem('auth_token');
  }

  isAuthenticated(): boolean {
    // Check if user and token exist
    const token = this.getToken();
    const user = this.getCurrentUser();
    
    return !!token && !!user;
  }
}

export const authService = new AuthService();
export default authService;
