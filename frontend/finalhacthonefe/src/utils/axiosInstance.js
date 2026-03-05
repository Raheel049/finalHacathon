import axios from 'axios';

const axiosInstance = axios.create({
    baseURL: 'http://localhost:5000/api', // Apne backend ka URL yahan rakhen
    headers: {
        'Content-Type': 'application/json'
    }
});

// Agar JWT token use kar rahe hain toh ye interceptor kaam ayega
axiosInstance.interceptors.request.use((config) => {
    const token = localStorage.getItem('token');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

export default axiosInstance;