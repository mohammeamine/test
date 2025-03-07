import AsyncStorage from '@react-native-async-storage/async-storage';
import { API_URL, AUTH_STORAGE_KEY, FEATURES } from './config';

interface ApiClientConfig {
  baseURL: string;
  headers?: Record<string, string>;
}

interface ApiResponse<T> {
  data: T;
  message?: string;
  error?: string;
}

export class ApiClient {
  private baseURL: string;
  private headers: Record<string, string>;

  constructor(config: ApiClientConfig) {
    this.baseURL = config.baseURL;
    this.headers = {
      'Content-Type': 'application/json',
      ...config.headers,
    };
  }

  private async getAuthToken(): Promise<string | null> {
    return await AsyncStorage.getItem(AUTH_STORAGE_KEY);
  }

  private async getHeaders(): Promise<Record<string, string>> {
    const token = await this.getAuthToken();
    const headers = { ...this.headers };
    
    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    }
    
    return headers;
  }

  private async request<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<ApiResponse<T>> {
    // If backend is disabled, throw an error that will be caught by the service
    if (!FEATURES.enableBackend) {
      throw new Error('MOCK_DATA');
    }

    const url = `${this.baseURL}${endpoint}`;
    const headers = await this.getHeaders();

    try {
      const response = await fetch(url, {
        ...options,
        headers: {
          ...headers,
          ...options.headers,
        },
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || 'An error occurred');
      }

      const data = await response.json();
      return data;
    } catch (error) {
      if (error instanceof Error) {
        if (error.message === 'MOCK_DATA') {
          throw error; // Let the service handle mock data
        }
        throw new Error(error.message);
      }
      throw new Error('An unknown error occurred');
    }
  }

  async get<T>(endpoint: string, params?: Record<string, string>) {
    const queryString = params
      ? `?${new URLSearchParams(params).toString()}`
      : '';
    return this.request<T>(`${endpoint}${queryString}`, {
      method: 'GET',
    });
  }

  async post<T>(endpoint: string, data: unknown) {
    return this.request<T>(endpoint, {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  async put<T>(endpoint: string, data: unknown) {
    return this.request<T>(endpoint, {
      method: 'PUT',
      body: JSON.stringify(data),
    });
  }

  async patch<T>(endpoint: string, data: unknown) {
    return this.request<T>(endpoint, {
      method: 'PATCH',
      body: JSON.stringify(data),
    });
  }

  async delete<T>(endpoint: string) {
    return this.request<T>(endpoint, {
      method: 'DELETE',
    });
  }

  async setAuthToken(token: string) {
    await AsyncStorage.setItem(AUTH_STORAGE_KEY, token);
  }

  async removeAuthToken() {
    await AsyncStorage.removeItem(AUTH_STORAGE_KEY);
  }
}

export const apiClient = new ApiClient({
  baseURL: API_URL,
}); 