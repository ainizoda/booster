import axios from "axios";

export * from "./register";

export const apiURL = import.meta.env.VITE_API_URL;

const axiosInstance = axios.create({
  baseURL: apiURL,
});

axios.interceptors.request.use((req) => {
  req.headers.Authorization = localStorage.getItem("access_token") || "";
  return req;
});

export { axiosInstance as fetcher };
