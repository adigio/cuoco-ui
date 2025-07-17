export const config = {

};

// Configuración híbrida: Proxy en desarrollo, URL directa en producción
const isDevelopment = process.env.NODE_ENV === 'development';

export const apiUrl = isDevelopment 
  ? '/api'
  : (process.env.NEXT_PUBLIC_API_URL || 'https://dev.cuoco.com.ar/api'); 

// URL base del servidor (sin /api para assets como imágenes)
export const serverBaseUrl = isDevelopment
  ? 'https://dev.cuoco.com.ar'
  : (process.env.NEXT_PUBLIC_SERVER_URL || 'https://dev.cuoco.com.ar');

