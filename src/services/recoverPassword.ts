import axios from 'axios';

export async function recoverPassword(email: string) {
  try {
    const response = await axios.post('/api/reset-password', { email });
    return response.data;
  } catch (error: any) {
    const message =
      error.response?.data?.message || 'Error al enviar el correo de recuperación';
    throw new Error(message);
  }
}