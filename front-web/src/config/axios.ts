import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:3001/api";

// Create axios instance with default config
const instance = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add request interceptor for auth token
instance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('auth_token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Add response interceptor for error handling
instance.interceptors.response.use(
  (response) => response,
  (error) => {
    // Handle unauthorized errors (401)
    if (error.response && error.response.status === 401) {
      localStorage.removeItem('auth_token');
      // Optional: Redirect to login page
      // window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export default instance; 