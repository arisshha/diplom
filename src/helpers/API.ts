import axios from 'axios';
import { authHelper } from './auth';

export const PREFIX = import.meta.env.VITE_API_PREFIX || 'https://shfe-diplom.neto-server.ru';

// Настройка axios для автоматической отправки токена
axios.interceptors.request.use((config) => {
    const token = authHelper.getToken();
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

// Обработка ошибок авторизации
axios.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response?.status === 401) {
            authHelper.removeToken();
            if (window.location.pathname !== '/admin/login') {
                window.location.href = '/admin/login';
            }
        }
        return Promise.reject(error);
    }
);