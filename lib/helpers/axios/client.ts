import axios from 'axios';
import Cookies from 'js-cookie';

import { trimStringValues } from '..';

const axiosClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_LAZYWEB_BACKEND_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 60000,
  withCredentials: true, // Ensure cookies are sent
});

// Request interceptor
axiosClient.interceptors.request.use(async (config) => {
  // Trim request data
  if (config.data) {
    config.data = trimStringValues(config.data);
  }
  if (config.params) {
    config.params = trimStringValues(config.params);
  }

  // Get fresh token from cookie on every request
  const token = Cookies.get('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  // Set Content-Length to null to prevent it from being sent
  config.headers['Content-Length'] = undefined;

  // This is more reliable than 'delete' for Axios headers
  // You can also try setting the 'maxContentLength' option
  config.maxContentLength = -1;

  return config;
});

// Optional: Trim response data
axiosClient.interceptors.response.use((response) => {
  if (response.data) {
    response.data = trimStringValues(response.data);
  }
  return response;
});

export default axiosClient;
