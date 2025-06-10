import axios from 'axios';
import { LoginResponse, LoginRequest, ApiError } from '@/types/api/auth.types';

export async function login(email: string, password: string): Promise<LoginResponse> {
  try {
    const response = await axios.post<LoginResponse>('https://dev.cuoco.com.ar/api/auth/login', { email, password });  
    return response.data;
  } catch (error: any) {
    // Axios envuelve el error, hay que acceder al response
    const message = error.response?.data?.message || 'Error desconocido';
    throw new Error(message);
  }
}
