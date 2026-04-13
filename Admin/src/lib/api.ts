import axios, { AxiosError } from 'axios';
import { toast } from 'sonner';
import { handleError } from './errorHandler';

// Extend AxiosRequestConfig to include our custom flags
declare module 'axios' {
    export interface AxiosRequestConfig {
        silent?: boolean;
    }
}

const api = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api/v1',
    headers: {
        'Content-Type': 'application/json',
    },
    timeout: 30000,
});

// Request Interceptor
api.interceptors.request.use(
    (config) => {
        const token = typeof window !== 'undefined' ? localStorage.getItem('AdminToken') : null;
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        
        if (config.data instanceof FormData) {
            delete config.headers['Content-Type'];
        }
        
        return config;
    },
    (error) => Promise.reject(error)
);

// Response Interceptor
api.interceptors.response.use(
    (response) => {
        const method = response.config.method?.toUpperCase();
        
        // Show success toast for mutations (POST, PUT, DELETE, PATCH)
        // unless silent flag is explicitly set to true
        if (method && ['POST', 'PUT', 'DELETE', 'PATCH'].includes(method) && !response.config.silent) {
            const message = response.data?.message || 'Operation successful';
            toast.success(message);
        }
        
        return response;
    },
    (error: AxiosError) => {
        const status = error.response?.status;
        
        // Handle unauthorized globally
        if (status === 401) {
            if (typeof window !== 'undefined') {
                localStorage.removeItem('AdminToken');
                if (!window.location.pathname.includes('/login')) {
                    window.location.href = '/login';
                    toast.error('Session expired. Please login again.');
                }
            }
            return Promise.reject(error);
        }

        // Use unified handler for other errors unless silent flag is set
        if (!error.config?.silent) {
            handleError(error);
        }

        return Promise.reject(error);
    }
);

export default api;


