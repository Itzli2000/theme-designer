import type { AxiosRequestConfig, AxiosResponse, InternalAxiosRequestConfig } from 'axios';

/**
 * ApiError is a generic interface that represents the error from the API.
 * It contains the message, status, code, and details properties.
 */
export interface ApiError {
  /**
   * The message returned from the API.
   */
  message: string;
  /**
   * The status code returned from the API.
   */
  status: number;
  /**
   * The code returned from the API.
   */
  code?: string;
  /**
   * The details returned from the API.
   */
  details?: unknown;
}

/**
 * HttpClientConfig is a generic interface that represents the configuration for the HTTP client.
 * It extends the AxiosRequestConfig interface and adds the useAuth, retries, and timeout properties.
 */
export interface HttpClientConfig extends AxiosRequestConfig {
  /**
   * Whether to use authentication.
   */
  useAuth?: boolean;
  /**
   * The timeout for the request.
   */
  timeout?: number;
}

/**
 * RequestInterceptor is a generic interface that represents the request interceptor for the HTTP client.
 * It extends the AxiosRequestConfig interface and adds the onFulfilled and onRejected properties.
 */
export interface RequestInterceptor {
  /**
   * The function to be called when the request is fulfilled.
   */
  onFulfilled?: (config: InternalAxiosRequestConfig) => InternalAxiosRequestConfig | Promise<InternalAxiosRequestConfig>;
  /**
   * The function to be called when the request is rejected.
   */
  onRejected?: (error: unknown) => unknown;
}

/**
 * ResponseInterceptor is a generic interface that represents the response interceptor for the HTTP client.
 * It extends the AxiosResponse interface and adds the onFulfilled and onRejected properties.
 */
export interface ResponseInterceptor {
  /**
   * The function to be called when the response is fulfilled.
   */
  onFulfilled?: (response: AxiosResponse) => AxiosResponse | Promise<AxiosResponse>;
  /**
   * The function to be called when the response is rejected.
   */
  onRejected?: (error: unknown) => unknown;
}

/**
 * HttpClient is a generic interface that represents the HTTP client.
 * It contains the get, post, put, patch, and delete methods.
 */
export interface HttpClient {
  get<T = unknown>(url: string, config?: HttpClientConfig): Promise<T>;
  post<T = unknown>(url: string, data?: unknown, config?: HttpClientConfig): Promise<T>;
  put<T = unknown>(url: string, data?: unknown, config?: HttpClientConfig): Promise<T>;
  patch<T = unknown>(url: string, data?: unknown, config?: HttpClientConfig): Promise<T>;
  delete<T = unknown>(url: string, config?: HttpClientConfig): Promise<T>;
}