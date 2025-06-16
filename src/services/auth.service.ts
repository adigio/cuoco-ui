import { apiClient } from '@/lib/axios.config';
import { LoginResponse, LoginRequest, ApiError, RegisterRequest, RegisterResponse } from '@/types/api/auth.types';


export const authService = {
  async register(user: RegisterRequest): Promise<RegisterResponse> {
    try {
      const response = await apiClient.post<RegisterResponse>('/auth/register', { user });   
      return response.data;
    } catch (error: any) {
      const message = error.response?.data?.message || 'Error desconocido';
      throw new Error(message);
    }
  },

  async login(email: string, password: string): Promise<LoginResponse> {
    try {
      const response = await apiClient.post<LoginResponse>('/auth/login', { 
        email, 
        password 
      });
      return response.data;
    } catch (error: any) {
      const message = error.response?.data?.message || 'Error desconocido';
      throw new Error(message);
    }
  }
};
export const { login, register } = authService;