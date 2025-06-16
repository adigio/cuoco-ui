import axios from 'axios';
import { tokenService } from './cookies';
import { jwtService } from './jwt';
import { apiUrl } from './config';

// Crear instancia custom de axios
export const apiClient = axios.create({
    baseURL: apiUrl,
    timeout: 10000,
});

// Interceptor de request - agregar token
apiClient.interceptors.request.use(
    (config) => {
        const token = tokenService.getToken();
        console.log('Interceptor - URL:', config.url, 'Token presente:', !!token);

        if (token) {
            // Verificar si el token no está expirado
            if (!jwtService.isExpired(token)) {
                config.headers.Authorization = `Bearer ${token}`;
                console.log('Token agregado al header Authorization');
            } else {
                // Token expirado, remover y no agregar header
                console.warn('Token expirado, removiendo...');
                tokenService.removeToken();
                // TODO: logout ()  ?
            }
        } else {
            console.log('No hay token, request sin Authorization header');
        }

        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// Interceptor de response 
apiClient.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response?.status === 401) {
            console.warn('Error 401: Token inválido o expirado');
            tokenService.removeToken();

            // Disparar evento personalizado para logout
            if (typeof window !== 'undefined') {
                window.dispatchEvent(new CustomEvent('auth:logout'));
            }
        }

        return Promise.reject(error);
    }
);

export default apiClient;