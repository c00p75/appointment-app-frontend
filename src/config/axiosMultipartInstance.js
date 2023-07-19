import axios from 'axios';
import Cookies from 'js-cookie';
import { BASE_URL } from '../constants';

const axiosMultipartInstance = axios.create({
  baseURL: BASE_URL,
});

// Add an interceptor to set the Authorization header
axiosMultipartInstance.interceptors.request.use((config) => {
  const modifiedConfig = { ...config };
  const token = Cookies.get('accessToken');

  if (token) {
    modifiedConfig.headers.Authorization = `Bearer ${token}`;
    modifiedConfig.headers['Content-Type'] = 'multipart/form-data';
  }

  return modifiedConfig;
});

export default axiosMultipartInstance;
