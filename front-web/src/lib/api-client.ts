const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:3001/api"

interface ApiClientConfig {
  baseURL: string
  headers?: Record<string, string>
}

interface ApiResponse<T> {
  data: T
  message?: string
  error?: string
}

export class ApiClient {
  private baseURL: string
  private headers: Record<string, string>

  constructor(config: ApiClientConfig) {
    this.baseURL = config.baseURL
    this.headers = {
      "Content-Type": "application/json",
      ...config.headers,
    }
    
    // Initialize auth token from localStorage on startup
    const token = localStorage.getItem('auth_token');
    if (token) {
      this.setAuthToken(token);
    }
  }

  private async request<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<ApiResponse<T>> {
    const url = `${this.baseURL}${endpoint}`
    
    // Get the latest token before each request
    const token = localStorage.getItem('auth_token');
    if (token) {
      this.headers.Authorization = `Bearer ${token}`;
    }
    
    const headers = {
      ...this.headers,
      ...options.headers,
    }

    try {
      console.log(`Making ${options.method || 'GET'} request to: ${url}`);
      console.log('Headers:', headers);
      
      const response = await fetch(url, {
        ...options,
        headers,
      })

      if (!response.ok) {
        if (response.status === 401) {
          // Handle unauthorized - clear token and redirect to login
          localStorage.removeItem('auth_token');
          localStorage.removeItem('user');
          window.location.href = '/auth/sign-in';
          throw new Error('Authentication required');
        }
        
        const error = await response.json();
        throw new Error(error.message || "An error occurred");
      }

      const data = await response.json();
      return data;
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message);
      }
      throw new Error("An unknown error occurred");
    }
  }

  async get<T>(endpoint: string, params?: Record<string, string>) {
    const queryString = params
      ? `?${new URLSearchParams(params).toString()}`
      : ""
    return this.request<T>(`${endpoint}${queryString}`, {
      method: "GET",
    })
  }

  async post<T>(endpoint: string, data: unknown) {
    return this.request<T>(endpoint, {
      method: "POST",
      body: JSON.stringify(data),
    })
  }

  async put<T>(endpoint: string, data: unknown) {
    return this.request<T>(endpoint, {
      method: "PUT",
      body: JSON.stringify(data),
    })
  }

  async patch<T>(endpoint: string, data: unknown) {
    return this.request<T>(endpoint, {
      method: "PATCH",
      body: JSON.stringify(data),
    })
  }

  async delete<T>(endpoint: string) {
    return this.request<T>(endpoint, {
      method: "DELETE",
    })
  }

  setAuthToken(token: string) {
    this.headers.Authorization = `Bearer ${token}`
  }

  removeAuthToken() {
    delete this.headers.Authorization
  }
}

export const apiClient = new ApiClient({
  baseURL: API_BASE_URL,
})

export default apiClient;

// Add token management from localStorage
export const initializeAuth = () => {
  const token = localStorage.getItem('auth_token');
  if (token) {
    apiClient.setAuthToken(token);
  }
};

// Save token to localStorage
export const saveAuthToken = (token: string) => {
  localStorage.setItem('auth_token', token);
  apiClient.setAuthToken(token);
};

// Remove token from localStorage
export const removeAuthToken = () => {
  localStorage.removeItem('auth_token');
  apiClient.removeAuthToken();
};