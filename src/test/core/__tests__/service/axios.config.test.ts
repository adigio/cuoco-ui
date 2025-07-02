import axios from 'axios';
import { apiClient } from '@/lib/axios.config';
import { tokenService } from '@/lib/cookies';
import { jwtService } from '@/lib/jwt';

jest.mock('@/lib/cookies');
jest.mock('@/lib/jwt');

const setErrorMock = jest.fn();

jest.mock('@/store/useErrorStore', () => ({
  useErrorStore: {
    getState: () => ({
      setError: setErrorMock,
    }),
  },
}));

describe('apiClient interceptors', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('setea mensaje de error en 4xx (excepto 401) fuera de rutas locales', async () => {
    const error = {
      response: { status: 404, data: { message: 'No encontrado' } },
      config: { url: '/otro-endpoint' },
    };

    const promise = (apiClient.interceptors.response as any).handlers[0].rejected(error);
    
    await expect(promise).rejects.toBe(error);

    await new Promise(r => setTimeout(r, 0));  // Espera microtasks

    expect(setErrorMock).toHaveBeenCalledWith('No encontrado');
  });

  it('setea mensaje genérico en 5xx', async () => {
    const error = {
      response: { status: 500 },
      config: { url: '/test' },
    };

    const promise = (apiClient.interceptors.response as any).handlers[0].rejected(error);

    await expect(promise).rejects.toBe(error);

    await new Promise(r => setTimeout(r, 0));  // Espera microtasks

    expect(setErrorMock).toHaveBeenCalledWith('Error del servidor. Intenta nuevamente en unos momentos.');
  });
});
