import axios from 'axios';
import { API_URL } from '../config';

console.log('API Base URL:', API_URL);

const axiosInstance = axios.create({
    baseURL: API_URL,
    withCredentials: true,
    headers: {
         Authorization : `Bearer ${localStorage.getItem('token')}`
    }
});

// Add request interceptor to log all requests
axiosInstance.interceptors.request.use(request => {
    console.log('Starting Request:', request.url);
    return request;
});

export default axiosInstance;