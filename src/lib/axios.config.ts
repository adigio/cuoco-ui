import axios from 'axios';
import { tokenService } from './cookies';
import { jwtService } from './jwt';
import { apiUrl } from './config';

// Crear instancia custom de axios
export const apiClient = axios.create({
    baseURL: apiUrl,
    timeout: 100000,
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
            } else {
                // Token expirado, remover y no agregar header
                console.warn('Token expirado, removiendo...');
                tokenService.removeToken();
                // TODO: logout ()  ?
            }
        } else { 
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
        } else if (error.response?.status >= 400 && error.response?.status < 500) {
            // Errores 4xx (excepto 401) - Errores del cliente
            
            // Lista de rutas que deben manejar sus errores localmente (no interceptar)
            const localErrorRoutes = ['/auth/register', '/auth/login'];
            const requestUrl = error.config?.url || '';
            const shouldHandleLocally = localErrorRoutes.some(route => requestUrl.includes(route));
            
            if (!shouldHandleLocally) {
                const message = error.response?.data?.message || 'Error en la solicitud';
                
                if (typeof window !== 'undefined') {
                    // Importar para evitar problemas SSR
                    import('@/store/useErrorStore').then(({ useErrorStore }) => {
                        useErrorStore.getState().setError(message);
                    });
                }
            }
            // Si es una ruta de manejo local, simplemente pasar el error sin interceptar
        } else if (error.response?.status >= 500) {
            // Errores 5xx - Errores del servidor
            const message = 'Error del servidor. Intenta nuevamente en unos momentos.';
            
            if (typeof window !== 'undefined') {
                import('@/store/useErrorStore').then(({ useErrorStore }) => {
                    useErrorStore.getState().setError(message);
                });
            }
        }

        return Promise.reject(error);
    }
);

export default apiClient;