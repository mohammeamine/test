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
  }

  private async request<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<ApiResponse<T>> {
    const url = `${this.baseURL}${endpoint}`
    const headers = {
      ...this.headers,
      ...options.headers,
    }

    try {
      const response = await fetch(url, {
        ...options,
        headers,
      })

      if (!response.ok) {
        const error = await response.json()
        throw new Error(error.message || "An error occurred")
      }

      const data = await response.json()
      return data
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message)
      }
      throw new Error("An unknown error occurred")
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
  const token = localStorage.getItem('authToken');
  if (token) {
    apiClient.setAuthToken(token);
  }
};

// Save token to localStorage
export const saveAuthToken = (token: string) => {
  localStorage.setItem('authToken', token);
  apiClient.setAuthToken(token);
};

// Remove token from localStorage
export const removeAuthToken = () => {
  localStorage.removeItem('authToken');
  apiClient.removeAuthToken();
};