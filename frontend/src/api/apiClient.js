import axios from 'axios';

const BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000';
export const DEMO_MODE = import.meta.env.VITE_DEMO_MODE === 'true';

const apiClient = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 30000,
});

// Attach auth token to every request
apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('athena_token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Handle auth errors globally
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('athena_token');
      localStorage.removeItem('athena_user');
      window.dispatchEvent(new Event('athena:logout'));
    }
    return Promise.reject(error);
  }
);

export default apiClient;
