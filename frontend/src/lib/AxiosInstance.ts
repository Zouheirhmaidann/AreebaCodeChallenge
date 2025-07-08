import axios from "axios";
import Cookies from "js-cookie";

// Set the base URL
const AxiosInstance = axios.create({
  baseURL: "http://localhost:3001",
  withCredentials: true,
});

AxiosInstance.interceptors.request.use((config) => {
  // Add the token to the request headers from the cookie
  const token = Cookies.get("auth-token");
  // Check if the token exists
  if (token && config.headers) {
    config.headers["authorization"] = token;
  }
  return config;
});
// Add a response interceptor
AxiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if(error.response.status === 401) {
      Cookies.remove("auth-token");
      window.location.href = "/login";
    }
    return Promise.reject(error);
  }
);

export default AxiosInstance;
