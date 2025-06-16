import { jwtDecode } from 'jwt-decode';

export interface JWTPayload {
    sub: string; // email del usuario
    iat: number; // issued at
    exp: number; // expiration
    //TODO: ver con el back que estructura ira
}

export const jwtService = {
    decode: (token: string): JWTPayload | null => {
        try {
            return jwtDecode<JWTPayload>(token);
        } catch (error) {
            console.error('Error decodificando JWT:', error);
            return null;
        }
    },

    isExpired: (token: string): boolean => {
        try {
            const decoded = jwtDecode<JWTPayload>(token);
            const currentTime = Date.now() / 1000;
            return decoded.exp < currentTime;
        } catch {
            return true;
        }
    },

    getEmail: (token: string): string | null => {
        const decoded = jwtService.decode(token);
        return decoded?.sub || null;
    },

    getExpirationDate: (token: string): Date | null => {
        const decoded = jwtService.decode(token);
        return decoded ? new Date(decoded.exp * 1000) : null;
    }
};