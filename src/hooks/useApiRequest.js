import axios from "axios";
import useUserAuth from "./useUserAuth";

const useApiRequest = () => {
  const { username, password } = useUserAuth();

  const axiosInstance = axios.create({
    baseURL: "http://localhost:8000/api" || "http://localhost:5000/api",
  });

  axiosInstance.interceptors.request.use(
    (config) => {
      if (username && password) {
        config.headers.Authorization = "Basic " + btoa(`${username}:${password}`);
      }
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );

  return axiosInstance;
};

export default useApiRequest;