import axios from 'axios';

// Define the backend URL as a constant
const BACKEND_URL = 'https://ilm-hub-an-online-exam-platform-server.vercel.app';

const axiosInstance = axios.create({
    baseURL: BACKEND_URL,
    headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('token')}`
    },
    withCredentials: true
});

// Request interceptor for debugging
axiosInstance.interceptors.request.use(
    (config) => {
        // Ensure the request goes to the backend URL
        config.baseURL = BACKEND_URL;
        console.log('Request URL:', config.baseURL + config.url);
        console.log('Request Method:', config.method);
        console.log('Request Headers:', config.headers);
        return config;
    },
    (error) => {
        console.error('Request Error:', error);
        return Promise.reject(error);
    }
);

// Response interceptor for debugging
axiosInstance.interceptors.response.use(
    (response) => {
        console.log('Response Status:', response.status);
        console.log('Response Data:', response.data);
        return response;
    },
    (error) => {
        console.error('Response Error:', error.response?.status, error.response?.data);
        if (error.response?.status === 401) {
            localStorage.removeItem('token');
            window.location.href = '/login';
        }
        return Promise.reject(error);
    }
);

export default axiosInstance;