import axios from "axios";
import { auth } from "./auth";
import { toast } from "../lib";

export * from "./auth";
export * from "./farming";
export * from "./settings";
export * from "./tasks";

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
    const responseStatus = res.response?.status;

    originalRequest._retry = true;

    if (responseStatus === 401) {
      const oldToken = localStorage.getItem("refresh_token") || "";
      const newAccessToken = await auth.refreshToken(oldToken);
      localStorage.setItem("access_token", newAccessToken);
      originalRequest.headers["Authorization"] = `Bearer ${newAccessToken}`;
      return axiosInstance(originalRequest);
    }

    toast("server error", { error: true });
    return res;
  }
);

export { axiosInstance as fetcher };
