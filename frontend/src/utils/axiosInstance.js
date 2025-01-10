import axios from "axios";

const getBaseUrl = () => {
  const { hostname } = window.location;
  const port = 5000;
  if (hostname === "localhost") {
    return `http://localhost:${port}`; // Para ambiente local
  }
  return `http://${hostname}:${port}`; // Para rede local
};

const apiBaseUrl = getBaseUrl();

const axiosInstance = axios.create({
  baseURL: apiBaseUrl,
  withCredentials: true, // Inclui cookies/sessão
});

axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      console.error("Não autorizado - Token expirado ou inválido");
      localStorage.removeItem("token");
      window.location.href = "/login";
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
