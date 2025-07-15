// Export the main client
export { default as httpClient, AxiosHttpClient } from './client';

// Export types
export type {
  ApiResponse,
  ApiError,
  HttpClient,
  HttpClientConfig,
  RequestInterceptor,
  ResponseInterceptor,
} from './types';

// Export interceptors for customization
export { requestInterceptor, responseInterceptor } from './interceptors';

// Default export
export { default } from './client';