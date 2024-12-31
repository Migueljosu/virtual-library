// utils/axiosInstance.js
import axios from 'axios';
import { useHistory } from 'react-router-dom'; // Se estiver usando React Router para navegação

const apiBaseUrl =  'http://localhost:5000';

const axiosInstance = axios.create({
  baseURL: apiBaseUrl,
  withCredentials: true, // Inclui cookies/sessão, se necessário
});

axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token'); // Obtém o token do localStorage ou de onde for armazenado

    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`; // Adiciona o token no cabeçalho Authorization
    }

    return config;
  },
  (error) => Promise.reject(error)
);

axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      console.error('Não autorizado - Token expirado ou inválido');
      // Redirecionar para a tela de login ou fazer logout
      localStorage.removeItem('token'); // Limpar o token
      window.location.href = '/login'; // Redirecionar para a página de login
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
