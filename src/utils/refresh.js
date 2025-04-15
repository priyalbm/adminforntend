// src/api/axios.js
import axios from 'axios';
import store from '../redux/store'; // adjust if your store path is different
import { refreshAuthToken, logoutUser } from '../redux/authSlice';

const api = axios.create({
  baseURL: 'http://192.168.11.237:8000',
});

// Add Authorization header to requests
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('access');
  if (token) {
    config.headers['Authorization'] = `Bearer ${token}`;
  }
  return config;
});

// Refresh token if access token expires
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (
      error.response?.status === 401 &&
      !originalRequest._retry &&
      localStorage.getItem('refresh')
    ) {
      originalRequest._retry = true;

      try {
        const res = await store.dispatch(refreshAuthToken()).unwrap();

        localStorage.setItem('access', res.access);
        api.defaults.headers.common['Authorization'] = `Bearer ${res.access}`;
        originalRequest.headers['Authorization'] = `Bearer ${res.access}`;

        return api(originalRequest); // retry
      } catch (err) {
        store.dispatch(logoutUser());
        window.location.href = '/login';
        return Promise.reject(err);
      }
    }

    return Promise.reject(error);
  }
);

export default api;
