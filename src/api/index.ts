import axios from "axios";
import { refreshToken } from "./auth";

export * from "./auth";

export const apiURL = import.meta.env.VITE_API_URL;

const axiosInstance = axios.create({
  baseURL: apiURL,
});

axiosInstance.interceptors.request.use((req) => {
  const token = localStorage.getItem("access_token");
  req.headers.Authorization = token ? `Bearer ${token}` : "";
  return req;
});

axiosInstance.interceptors.response.use(
  (response) => response,
  async (res) => {
    const originalRequest = res.config;
    const responseStatus = res.response.status;

    originalRequest._retry = true;

    if (responseStatus === 401) {
      const newAccessToken = await refreshToken();
      localStorage.setItem("access_token", newAccessToken);
      originalRequest.headers["Authorization"] = `Bearer ${newAccessToken}`;
      return axiosInstance(originalRequest);
    }
    return res;
  }
);

export { axiosInstance as fetcher };
