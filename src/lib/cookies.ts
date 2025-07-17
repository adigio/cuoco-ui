import Cookies from 'js-cookie';

export const AUTH_TOKEN_KEY = 'auth_token';

export const cookieConfig = {
    expires: 7, // 7 días
    secure: process.env.NODE_ENV === 'production', // HTTPS en producción
    sameSite: 'strict' as const,
    // NO httpOnly porque lo manejamos desde frontend
};

export const tokenService = {
    setToken: (token: string) => {
        Cookies.set(AUTH_TOKEN_KEY, token, cookieConfig); 
    },

    getToken: (): string | undefined => {
        const token = Cookies.get(AUTH_TOKEN_KEY); 
        return token;
    },

    removeToken: () => {
        Cookies.remove(AUTH_TOKEN_KEY);
    },

    hasToken: (): boolean => {
        return !!Cookies.get(AUTH_TOKEN_KEY);
    }
};