import { apiClient } from '@/lib/axios.config';

export const paymentService = {

    async create(): Promise<any> {
        try {
            const response = await apiClient.post('/payments');
            return response.data;
        } catch (error: any) {
            const message = error.response?.data?.message || 'Error al crear el pago';
            throw new Error(message);
        }
    }
}