import type { AxiosRequestConfig, AxiosResponse, InternalAxiosRequestConfig } from 'axios';

export interface ApiResponse<T = unknown> {
  data: T;
  message?: string;
  status: number;
  success: boolean;
}

export interface ApiError {
  message: string;
  status: number;
  code?: string;
  details?: unknown;
}

export interface HttpClientConfig extends AxiosRequestConfig {
  useAuth?: boolean;
  retries?: number;
  timeout?: number;
}

export interface RequestInterceptor {
  onFulfilled?: (config: InternalAxiosRequestConfig) => InternalAxiosRequestConfig | Promise<InternalAxiosRequestConfig>;
  onRejected?: (error: unknown) => unknown;
}

export interface ResponseInterceptor {
  onFulfilled?: (response: AxiosResponse) => AxiosResponse | Promise<AxiosResponse>;
  onRejected?: (error: unknown) => unknown;
}

export interface HttpClient {
  get<T = unknown>(url: string, config?: HttpClientConfig): Promise<ApiResponse<T>>;
  post<T = unknown>(url: string, data?: unknown, config?: HttpClientConfig): Promise<ApiResponse<T>>;
  put<T = unknown>(url: string, data?: unknown, config?: HttpClientConfig): Promise<ApiResponse<T>>;
  patch<T = unknown>(url: string, data?: unknown, config?: HttpClientConfig): Promise<ApiResponse<T>>;
  delete<T = unknown>(url: string, config?: HttpClientConfig): Promise<ApiResponse<T>>;
}