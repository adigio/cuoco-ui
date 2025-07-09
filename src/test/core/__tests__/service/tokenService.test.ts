import Cookies from 'js-cookie';
import { tokenService, AUTH_TOKEN_KEY } from '@/lib/cookies';

jest.mock('js-cookie');

describe('tokenService', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('setToken debe guardar el token en las cookies', () => {
    tokenService.setToken('abc123');
    expect(Cookies.set).toHaveBeenCalledWith(
      AUTH_TOKEN_KEY,
      'abc123',
      expect.objectContaining({
        expires: 7,
        secure: expect.any(Boolean),
        sameSite: 'strict'
      })
    );
  });

  it('getToken debe retornar el token de las cookies', () => {
    (Cookies.get as jest.Mock).mockReturnValue('abc123');
    const token = tokenService.getToken();
    expect(token).toBe('abc123');
  });

  it('removeToken debe eliminar el token', () => {
    tokenService.removeToken();
    expect(Cookies.remove).toHaveBeenCalledWith(AUTH_TOKEN_KEY);
  });

  it('hasToken debe retornar true si hay token', () => {
    (Cookies.get as jest.Mock).mockReturnValue('abc123');
    expect(tokenService.hasToken()).toBe(true);
  });

  it('hasToken debe retornar false si no hay token', () => {
    (Cookies.get as jest.Mock).mockReturnValue(undefined);
    expect(tokenService.hasToken()).toBe(false);
  });
});
