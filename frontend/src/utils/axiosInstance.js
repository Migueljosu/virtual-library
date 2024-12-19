import axios from "axios";

const apiBaseUrl = process.env.REACT_APP_API_BASE_URL || "http://localhost:5000";
const axiosInstance = axios.create({
  baseURL: apiBaseUrl,
  withCredentials: true, // Inclui cookies/sessão, se necessário
});

export default axiosInstance;
