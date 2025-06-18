export const config = {

};

// Configuración híbrida: Proxy en desarrollo, URL directa en producción
const isDevelopment = process.env.NODE_ENV === 'development';

export const apiUrl = isDevelopment 
  ? '/api' // En desarrollo: proxy localhost/api → dev.cuoco.com.ar/api
  : (process.env.NEXT_PUBLIC_API_URL || 'https://dev.cuoco.com.ar/api'); // En producción: URL directa

