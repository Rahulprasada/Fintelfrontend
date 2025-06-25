import axios, { AxiosInstance, AxiosResponse } from "axios";

// Define types (Keeping these as they are good)
interface Index {
  symbols: string[];
  exchange_suffix: string;
}

interface ValidationResult {
  valid_symbols: string[];
  invalid_symbols: Record<string, string>;
}

interface ScreeningResult {
  Converged: boolean;
  [key: string]: any; // Allow additional result properties
}

interface Config {
  period: string;
  interval: string;
  features: string[];
  available_features: string[];
  window: number;
  max_states: number;
  train_window: number;
  use_rolling_window: boolean;
  sma_period?: number;
}

interface ApiResponse<T> {
  success: boolean;
  message?: string;
  data?: T;
}

export interface ScreenerApiParams {
  symbols: string[];
  period?: string;
  interval?: string;
  feature_sets?: string[][];
  window?: number;
  max_states?: number;
  train_window?: number;
  exchange_suffix?: string;
  max_workers?: number;
  use_rolling_window?: boolean;
  slippage?: number;
}

export interface ScreenerResult {
  Stock: string;
  Recommendation?: 'BUY' | 'SELL' | 'HOLD' | 'STRONG BUY' | 'INCONCLUSIVE' | 'ERROR' | 'ERROR_UNEXPECTED';
  'Calmar Ratio'?: number;
  'Max Drawdown (%)'?: number;
  'Latest Regime'?: string;
  Converged?: boolean;
  Error?: string | null;
  [key: string]: any;
}

const API_BASE_URL = import.meta.env.VITE_API_URL || "https://web-production-5afd2.up.railway.app";

const api: AxiosInstance = axios.create({
  baseURL: `${API_BASE_URL}/api/`, // All requests will be prefixed with this
  timeout: 300000, // 5 minutes for long tasks
});

// --- Axios Interceptors ---

// Request interceptor: Attach Authorization header if a token exists
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("access_token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
      console.log("Request Interceptor: Token attached.");
    } else {
      console.log("Request Interceptor: No token found.");
    }
    console.log("Starting Request:", config.url, config.method, config.data);
    return config;
  },
  (error) => {
    console.error("Request Error:", error.message, error.config);
    return Promise.reject(error);
  }
);

// Response interceptor: Log responses and handle 401 for token expiry
api.interceptors.response.use(
  (response) => {
    console.log("Response (Success):", response.status, response.config.url, response.data);
    return response;
  },
  async (error) => {
    console.error("Response Error:", error.response?.status, error.config?.url, error.response?.data || error.message);

    const originalRequest = error.config;

    // Handle 401 Unauthorized errors for expired access tokens
    // We only want to retry if it's a 401 and it hasn't been retried already
    // And it's not the refresh token endpoint itself (to avoid infinite loops)
    if (error.response?.status === 401 && !originalRequest._retry && originalRequest.url !== 'token/refresh/') {
      originalRequest._retry = true; // Mark this request as retried
      const refreshToken = localStorage.getItem("refresh_token");

      if (refreshToken) {
        try {
          console.log("Attempting to refresh token...");
          const refreshResponse = await axios.post(`${API_BASE_URL}/api/token/refresh/`, {
            refresh: refreshToken,
          });
          const newAccessToken = refreshResponse.data.access;
          localStorage.setItem("access_token", newAccessToken);
          console.log("Token refreshed successfully. Retrying original request.");

          // Update the Authorization header for the original request and retry
          originalRequest.headers['Authorization'] = `Bearer ${newAccessToken}`;
          return api(originalRequest); // Use the `api` instance to retry
        } catch (refreshError: any) {
          console.error("Token refresh failed:", refreshError.response?.data || refreshError.message);
          // If refresh fails, clear all tokens and force logout
          localStorage.removeItem("access_token");
          localStorage.removeItem("refresh_token");
          // Consider using a more robust global state management for logout/redirect
          window.location.href = '/login'; // Fallback: Force redirect to login
          return Promise.reject(refreshError);
        }
      } else {
        console.warn("No refresh token available. Cannot refresh. Redirecting to login.");
        localStorage.removeItem("access_token");
        localStorage.removeItem("refresh_token");
        window.location.href = '/login'; // Force redirect to login
      }
    }
    return Promise.reject(error);
  }
);

// --- API Endpoints ---

// Using the `api` instance for all requests ensures interceptors are applied.

export const runScreenerAPI = async (params: ScreenerApiParams): Promise<ScreenerResult[]> => {
  try {
    const response: AxiosResponse<ScreenerResult[]> = await api.post("screen_stocks/", params);
    return response.data;
  } catch (error: any) {
    console.error("Error fetching screener results:", error);
    throw error;
  }
};

export const getIndices = async (): Promise<Record<string, Index>> => {
  try {
    const response: AxiosResponse<Record<string, Index>> = await api.get("indices/");
    return response.data;
  } catch (error: any) {
    console.error("Error fetching indices:", error);
    throw error;
  }
};

export const validateSymbols = async (
  symbols: string[],
  suffix: string
): Promise<ValidationResult> => {
  try {
    const response: AxiosResponse<ValidationResult> = await api.post("validate_symbols/", {
      symbols,
      exchange_suffix: suffix,
    });
    return response.data;
  } catch (error: any) {
    console.error("Error validating symbols:", error);
    throw error;
  }
};

export const screenStocks = async (params: ScreenerApiParams): Promise<ScreeningResult[]> => {
  try {
    const response: AxiosResponse<ScreeningResult[]> = await api.post("screen_stocks/", params);
    return response.data;
  } catch (error: any) {
    console.error("Error screening stocks:", error);
    throw error;
  }
};

export const getLogs = async (): Promise<string> => {
  try {
    const response: AxiosResponse<string> = await api.get("logs/");
    return response.data;
  } catch (error: any) {
    console.error("Error fetching logs:", error);
    throw error;
  }
};

export const getConfig = async (): Promise<Config> => {
  try {
    const response: AxiosResponse<Config> = await api.get("config/");
    return response.data;
  } catch (error: any) {
    console.error("Error fetching config:", error);
    throw error;
  }
};

export const saveConfig = async (config: Config): Promise<ApiResponse<Config>> => {
  try {
    const response: AxiosResponse<ApiResponse<Config>> = await api.post("config/", config);
    return response.data;
  } catch (error: any) {
    console.error("Error saving config:", error);
    throw error;
  }
};

export const clearCache = async (): Promise<ApiResponse<void>> => {
  try {
    const response: AxiosResponse<ApiResponse<void>> = await api.post("clear_cache/");
    return response.data;
  } catch (error: any) {
    console.error("Error clearing cache:", error);
    throw error;
  }
};

export const registerUser = async (data: {
  username: string;
  email: string;
  password: string;
}): Promise<ApiResponse<any>> => {
  try {
    // This uses the 'api' instance, but for registration, no token is expected or needed.
    const response: AxiosResponse<ApiResponse<any>> = await api.post("register/", data);
    return response.data;
  } catch (error: any) {
    console.error("Error registering user:", error);
    throw error;
  }
};

export const confirmEmail = async (token: string): Promise<ApiResponse<any>> => {
  try {
    // Corrected: The backend ConfirmEmailView is a GET request with token in query params.
    const response: AxiosResponse<ApiResponse<any>> = await api.get(`confirm-email/?token=${token}`);
    return response.data;
  } catch (error: any) {
    console.error("Error confirming email:", error);
    throw error;
  }
};

export default api;