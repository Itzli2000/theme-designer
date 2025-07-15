import type { AxiosResponse, InternalAxiosRequestConfig } from 'axios';
import type { RequestInterceptor, ResponseInterceptor } from './types';

// Request interceptor for adding auth token and common headers
export const requestInterceptor: RequestInterceptor = {
  onFulfilled: (config: InternalAxiosRequestConfig): InternalAxiosRequestConfig => {
    // Add common headers
    config.headers.set('Content-Type', 'application/json');

    // Add auth token if available
    const token = localStorage.getItem('auth_token');
    if (token) {
      config.headers.set('Authorization', `Bearer ${token}`);
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
  onFulfilled: (response: AxiosResponse): AxiosResponse => {
    // Transform response to our standard format if needed
    if (response.data && typeof response.data === 'object') {
      response.data = {
        data: response.data,
        status: response.status,
        success: response.status >= 200 && response.status < 300,
        message: response.statusText,
        ...response.data,
      };
    }

    return response;
  },
};