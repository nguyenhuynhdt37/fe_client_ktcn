import axios from "axios";
import { env } from "../config/env";

export const axiosClient = axios.create({
  baseURL: env.NEXT_PUBLIC_API_URL,
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

// Interceptor xử lý Request
axiosClient.interceptors.request.use(
  (config) => {
    if (typeof window !== "undefined") {
      const token = localStorage.getItem("token");
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Interceptor xử lý Response
axiosClient.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    // Xử lý các mã lỗi hệ thống tập trung
    if (error.response) {
      const status = error.response.status;
      if (status === 401) {
        console.warn("Unauthorized access - Redirecting or clearing session...");
        // Xử lý logout hoặc refresh token ở client-side
      } else if (status === 403) {
        console.error("Forbidden - No permission to access this resource");
      }
    }
    return Promise.reject(error);
  }
);
