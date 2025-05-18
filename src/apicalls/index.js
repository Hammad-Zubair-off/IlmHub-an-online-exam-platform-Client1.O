import axios from 'axios';
import { API_URL } from '../config';

const axiosInstance = axios.create({
    baseURL: API_URL,
    headers: {
         Authorization : `Bearer ${localStorage.getItem('token')}`
    }
});

export default axiosInstance;