import axios from 'axios';

export async function login(email: string, password: string) {
  try {
    const response = await axios.post('/api/login', { email, password });
    return response.data;
  } catch (error: any) {
    // Axios envuelve el error, hay que acceder al response
    const message =
      error.response?.data?.message || 'Error desconocido';
    throw new Error(message);
  }
}
