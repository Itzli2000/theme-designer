import type { InternalAxiosRequestConfig } from 'axios';
import type { RequestInterceptor, ResponseInterceptor } from './types';

// Request interceptor for adding auth token and common headers
export const requestInterceptor: RequestInterceptor = {
  onFulfilled: (config: InternalAxiosRequestConfig): InternalAxiosRequestConfig => {
    // Add common headers
    config.headers.set('Content-Type', 'application/json');

    // Add auth token if available
    const authStore = localStorage.getItem('auth-store');
    if (authStore) {
      try {
        const parsedStore = JSON.parse(authStore);
        const token = parsedStore.state?.token;
        if (token && parsedStore.state?.isAuthenticated) {
          config.headers.set('Authorization', `Bearer ${token}`);
        }
      } catch {
        console.warn('Failed to parse auth store from localStorage');
      }
    }

    // Add timestamp for cache busting if needed
    if (config.method === 'get' && config.params) {
      config.params._t = Date.now();
    }

    return config;
  },
  onRejected: (error: unknown) => {
    // Handle request error - could be logged to monitoring service
    return Promise.reject(error);
  },
};

// Response interceptor for handling common response patterns
export const responseInterceptor: ResponseInterceptor = {
  onRejected: (error: unknown) => {
    // Handle 401 unauthorized responses (expired/invalid token)
    if (error && typeof error === 'object' && 'response' in error) {
      const axiosError = error as { response: { status: number } };
      if (axiosError.response?.status === 401) {
        // Clear invalid token from auth store
        localStorage.removeItem('auth-store');
        
        // Redirect to login page
        window.location.href = '/login';
      }
    }
    
    return Promise.reject(error);
  },
};