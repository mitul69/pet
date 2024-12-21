import axios from 'axios';
import config from '../config';

const axiosInstance = axios.create({
  baseURL: config.apiUrl, 
  timeout: 10000,
});

axiosInstance.interceptors.request.use(
  (config) => {
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response) {
      if (error.response.status === 401) {
        console.error('Unauthorized - Redirecting to login...');
        window.location.href = '/login';
      }
    } else {
      console.error('Network or Server Error:', error);
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
