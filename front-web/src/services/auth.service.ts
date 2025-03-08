import axios from 'axios';
import { SignInData, SignUpData, UserResponse } from '@/types/auth';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001/api';

class AuthService {
  private readonly basePath = '/auth';

  async register(userData: SignUpData): Promise<{ user: UserResponse; token: string }> {
    const { data } = await axios.post(`${API_BASE_URL}${this.basePath}/register`, userData);
    if (data.error) {
      throw new Error(data.message);
    }
    return data.data;
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
    const { data } = await axios.post(`${API_BASE_URL}${this.basePath}/forgot-password`, { email });
    if (data.error) {
      throw new Error(data.message);
    }
  }

  async resetPassword(token: string, newPassword: string): Promise<void> {
    const { data } = await axios.post(`${API_BASE_URL}${this.basePath}/reset-password`, {
      token,
      newPassword,
    });
    if (data.error) {
      throw new Error(data.message);
    }
  }

  logout(): void {
    localStorage.removeItem('auth_token');
    localStorage.removeItem('user');
  }

  getCurrentUser(): UserResponse | null {
    const userStr = localStorage.getItem('user');
    if (!userStr) return null;
    return JSON.parse(userStr);
  }

  getToken(): string | null {
    return localStorage.getItem('auth_token');
  }

  isAuthenticated(): boolean {
    return !!this.getToken();
  }
}

export const authService = new AuthService();
export default authService;
