import axios from 'axios';

const API_BASE_URL = 'http://localhost:3001';

export const apiClient = axios.create({
  baseURL: API_BASE_URL,
  timeout: 1000,
  headers: {
    'Content-Type': 'application/json',
  },
});


apiClient.interceptors.response.use(
  (response) => response.data,
  (error) => {
    const message = error.response?.data?.message || error.message || 'Error de conexión';
    return Promise.reject(message);
  }
);

export default apiClient;
