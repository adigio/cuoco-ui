import { useEffect } from 'react';
import { useAuthStore } from '@/store/useAuthStore';

export const useAuthInitialization = () => {
    const { initializeAuth, checkTokenExpiration } = useAuthStore();

    useEffect(() => {
        initializeAuth();

        // check expiración cada 5 minutos
        const interval = setInterval(() => {
            checkTokenExpiration();
        }, 5 * 60 * 1000);

        return () => clearInterval(interval);
    }, [initializeAuth, checkTokenExpiration]);
};