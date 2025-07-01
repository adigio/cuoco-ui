import { jwtService, JWTPayload } from '@/lib/jwt';
import { jwtDecode } from 'jwt-decode';

jest.mock('jwt-decode');

describe('jwtService', () => {
  const mockPayload: JWTPayload = {
    sub: 'test@example.com',
    iat: 1700000000,
    exp: 1800000000
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('decode debe retornar el payload decodificado', () => {
    (jwtDecode as jest.Mock).mockReturnValue(mockPayload);
    const result = jwtService.decode('token');
    expect(result).toEqual(mockPayload);
  });

  it('decode debe retornar null si falla', () => {
    (jwtDecode as jest.Mock).mockImplementation(() => {
      throw new Error('invalid');
    });
    const result = jwtService.decode('bad-token');
    expect(result).toBeNull();
  });

  it('isExpired debe retornar false si el token no expiró', () => {
    (jwtDecode as jest.Mock).mockReturnValue({
      ...mockPayload,
      exp: Date.now() / 1000 + 1000
    });
    expect(jwtService.isExpired('token')).toBe(false);
  });

  it('isExpired debe retornar true si el token expiró', () => {
    (jwtDecode as jest.Mock).mockReturnValue({
      ...mockPayload,
      exp: Date.now() / 1000 - 1000
    });
    expect(jwtService.isExpired('token')).toBe(true);
  });

  it('isExpired debe retornar true si falla el decode', () => {
    (jwtDecode as jest.Mock).mockImplementation(() => {
      throw new Error('fail');
    });
    expect(jwtService.isExpired('token')).toBe(true);
  });

  it('getEmail debe devolver el sub del token', () => {
    (jwtDecode as jest.Mock).mockReturnValue(mockPayload);
    expect(jwtService.getEmail('token')).toBe('test@example.com');
  });

  it('getEmail debe devolver null si falla', () => {
    (jwtDecode as jest.Mock).mockImplementation(() => {
      throw new Error('fail');
    });
    expect(jwtService.getEmail('token')).toBeNull();
  });

  it('getExpirationDate debe devolver la fecha de expiración', () => {
    (jwtDecode as jest.Mock).mockReturnValue(mockPayload);
    const date = jwtService.getExpirationDate('token');
    expect(date).toEqual(new Date(mockPayload.exp * 1000));
  });

  it('getExpirationDate debe devolver null si falla', () => {
    (jwtDecode as jest.Mock).mockImplementation(() => {
      throw new Error('fail');
    });
    expect(jwtService.getExpirationDate('token')).toBeNull();
  });
});
