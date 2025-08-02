import axios from 'axios';

const API_BASE = process.env.REACT_APP_API_URL || 'http://localhost:3001'; // Backend server port

const api = axios.create({
  baseURL: API_BASE,
});

// Add JWT token to headers if present
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers['Authorization'] = `Bearer ${token}`;
  }
  return config;
});

export default api; 