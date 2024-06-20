import axios, { InternalAxiosRequestConfig } from "axios";
import { auth } from "./auth";
import { toast } from "../lib";
import { storage } from "../utils";

export * from "./auth";
export * from "./farming";
export * from "./settings";
export * from "./tasks";
export * from "./crash";

export const apiURL: string = import.meta.env.VITE_API_URL;

const axiosInstance = axios.create({
  baseURL: apiURL,
});

axiosInstance.interceptors.request.use((req) => {
  if (
    !(req as InternalAxiosRequestConfig & { ignoreToken: boolean }).ignoreToken
  ) {
    const token = storage.get("access_token");
    req.headers.Authorization = token ? `Bearer ${token}` : "";
  }
  return req;
});

axiosInstance.interceptors.response.use(
  (response) => {
    if (response.data?.detail) {
      toast(response.data?.detail);
    }
    return response;
  },
  async (error) => {
    const originalRequest = error.config;
    const responseStatus = error.response?.status;

    if (responseStatus === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      const oldToken = storage.get("refresh_token");
      const newAccessToken = await auth.refreshToken(oldToken);
      storage.set("access_token", newAccessToken);
      originalRequest.headers["Authorization"] = `Bearer ${newAccessToken}`;

      return axiosInstance(originalRequest);
    }

    if (originalRequest?.ignoreMessage) {
      return;
    }
    // const errCode = error?.code?.toLowerCase() || "server error";
    const errDetail = error?.response?.data?.detail;

    if (typeof errDetail === "string") {
      toast(errDetail, { error: true });
    }

    return error;
  }
);

export { axiosInstance as fetcher };
