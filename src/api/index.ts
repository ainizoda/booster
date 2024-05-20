import axios from "axios";

export * from "./register";

export const apiURL = import.meta.env.VITE_API_URL;

const axiosInstance = axios.create({
  baseURL: apiURL,
});

export { axiosInstance as fetcher };
