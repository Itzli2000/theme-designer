import type { AxiosInstance } from "axios";
import axios from "axios";
import { requestInterceptor, responseInterceptor } from "./interceptors";
import type { HttpClient, HttpClientConfig } from "./types";

class AxiosHttpClient implements HttpClient {
  private instance: AxiosInstance;

  constructor(baseURL?: string) {
    this.instance = axios.create({
      baseURL:
        baseURL ||
        import.meta.env.VITE_API_BASE_URL ||
        "http://localhost:3000/api",
      timeout: 10000,
      headers: {
        "Content-Type": "application/json",
      },
    });

    this.setupInterceptors();
  }

  private setupInterceptors(): void {
    // Request interceptor
    if (requestInterceptor.onFulfilled || requestInterceptor.onRejected) {
      this.instance.interceptors.request.use(
        requestInterceptor.onFulfilled,
        requestInterceptor.onRejected
      );
    }

    // Response interceptor
    if (responseInterceptor.onFulfilled || responseInterceptor.onRejected) {
      this.instance.interceptors.response.use(
        responseInterceptor.onFulfilled,
        responseInterceptor.onRejected
      );
    }
  }

  async get<T = unknown>(
    url: string,
    config?: HttpClientConfig
  ): Promise<T> {
    const response = await this.instance.get<T>(url, config);
    return response.data;
  }

  async post<T = unknown>(
    url: string,
    data?: unknown,
    config?: HttpClientConfig
  ): Promise<T> {
    const response = await this.instance.post<T>(
      url,
      data,
      config
    );
    return response.data;
  }

  async put<T = unknown>(
    url: string,
    data?: unknown,
    config?: HttpClientConfig
  ): Promise<T> {
    const response = await this.instance.put<T>(url, data, config);
    return response.data;
  }

  async patch<T = unknown>(
    url: string,
    data?: unknown,
    config?: HttpClientConfig
  ): Promise<T> {
    const response = await this.instance.patch<T>(
      url,
      data,
      config
    );
    return response.data;
  }

  async delete<T = unknown>(
    url: string,
    config?: HttpClientConfig
  ): Promise<T> {
    const response = await this.instance.delete<T>(url, config);
    return response.data;
  }

  // Additional utility methods
  setAuthToken(token: string): void {
    this.instance.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    localStorage.setItem("auth_token", token);
  }

  clearAuthToken(): void {
    delete this.instance.defaults.headers.common["Authorization"];
    localStorage.removeItem("auth_token");
  }

  setBaseURL(baseURL: string): void {
    this.instance.defaults.baseURL = baseURL;
  }

  getBaseURL(): string | undefined {
    return this.instance.defaults.baseURL;
  }

  // Method to get the raw Axios instance if needed
  getInstance(): AxiosInstance {
    return this.instance;
  }
}

// Create and export a default instance
export const httpClient = new AxiosHttpClient();

// Export the class for creating custom instances
export { AxiosHttpClient };

// Export default instance as default export
export default httpClient;
