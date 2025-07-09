// Mock de servicios externos para preferencias, antes de importar el store
jest.mock('@/services/getter.service', () => ({
  getCookingLevels: jest.fn().mockResolvedValue([]),
  getDiet: jest.fn().mockResolvedValue([]),
  getAllergy: jest.fn().mockResolvedValue([]),
  getDietaryNeed: jest.fn().mockResolvedValue([]),
}));

import { act } from 'react';
import { useAuthStore } from '@/store/useAuthStore';
import { tokenService } from '@/lib/cookies';
import { jwtService } from '@/lib/jwt';

// Mock de tokenService
jest.mock('@/lib/cookies', () => ({
  tokenService: {
    setToken: jest.fn(),
    getToken: jest.fn(),
    removeToken: jest.fn(),
  }
}));

// Mock de jwtService
jest.mock('@/lib/jwt', () => ({
  jwtService: {
    isExpired: jest.fn(),
    decode: jest.fn(),
  }
}));

describe('useAuthStore', () => {
  const exampleUser = {
    email: 'test@test.com',
    name: 'Tester',
    token: 'token123',
    plan: {
      id: 1,
      description: 'Pro',
    },
    preferences: {
      cook_level: 1,
      diet: 2,
      dietaryRestrictions: [],
      allergies: [],
      favourite_cuisines: [],
    },
  };

  beforeEach(() => {
    jest.clearAllMocks();
    useAuthStore.setState({
      user: null,
      isAuthenticated: false,
      token: null,
    });
  });

  it('login: debe setear user, token e isAuthenticated y guardar token en cookies', async () => {
    (jwtService.isExpired as jest.Mock).mockReturnValue(false);
    (jwtService.decode as jest.Mock).mockReturnValue({ sub: 'userId' });

    await act(async () => {
      await useAuthStore.getState().login(exampleUser);
    });

    const state = useAuthStore.getState();
    expect(state.user?.email).toBe('test@test.com');
    expect(state.isAuthenticated).toBe(true);
    expect(state.token).toBe('token123');
    expect(tokenService.setToken).toHaveBeenCalledWith('token123');
  });

  it('login: debe lanzar error si token es inválido o expirado', () => {
    (jwtService.isExpired as jest.Mock).mockReturnValue(true);
    expect(() => {
      useAuthStore.getState().login(exampleUser);
    }).toThrow('Token inválido o expirado');
  });

  it('logout: debe limpiar user, token e isAuthenticated y remover token de cookies', () => {
    act(() => {
      useAuthStore.getState().logout();
    });
    const state = useAuthStore.getState();
    expect(state.user).toBeNull();
    expect(state.token).toBeNull();
    expect(state.isAuthenticated).toBe(false);
    expect(tokenService.removeToken).toHaveBeenCalled();
  });

  it('initializeAuth: restaura sesión si token válido y usuario existe', () => {
    (tokenService.getToken as jest.Mock).mockReturnValue('validToken');
    (jwtService.isExpired as jest.Mock).mockReturnValue(false);
    (jwtService.decode as jest.Mock).mockReturnValue({ sub: 'userId' });

    useAuthStore.setState({ user: exampleUser, token: null, isAuthenticated: false });

    act(() => {
      useAuthStore.getState().initializeAuth();
    });

    const state = useAuthStore.getState();
    expect(state.token).toBe('validToken');
    expect(state.isAuthenticated).toBe(true);
  });

  it('initializeAuth: limpia estado si token expirado', () => {
    (tokenService.getToken as jest.Mock).mockReturnValue('expiredToken');
    (jwtService.isExpired as jest.Mock).mockReturnValue(true);

    useAuthStore.setState({ user: exampleUser, token: null, isAuthenticated: false });

    act(() => {
      useAuthStore.getState().initializeAuth();
    });

    const state = useAuthStore.getState();
    expect(state.user).toBeNull();
    expect(state.token).toBeNull();
    expect(state.isAuthenticated).toBe(false);
    expect(tokenService.removeToken).toHaveBeenCalled();
  });

  it('checkTokenExpiration: retorna false y hace logout si token expirado', () => {
    (jwtService.isExpired as jest.Mock).mockReturnValue(true);
    (tokenService.getToken as jest.Mock).mockReturnValue('someToken');

    act(() => {
      const result = useAuthStore.getState().checkTokenExpiration();
      expect(result).toBe(false);
    });

    const state = useAuthStore.getState();
    expect(state.user).toBeNull();
    expect(state.token).toBeNull();
    expect(state.isAuthenticated).toBe(false);
  });

  it('checkTokenExpiration: retorna true si token válido', () => {
    (jwtService.isExpired as jest.Mock).mockReturnValue(false);
    (tokenService.getToken as jest.Mock).mockReturnValue('someToken');

    act(() => {
      const result = useAuthStore.getState().checkTokenExpiration();
      expect(result).toBe(true);
    });
  });
});
