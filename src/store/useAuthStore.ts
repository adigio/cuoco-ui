import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { User as AuthUser } from '@/types/auth/auth.types';

export type User = AuthUser;

export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  login: (user: User) => void;
  logout: () => void;
  updateUser: (user: User) => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      isAuthenticated: false,
      login: (user) => set({ user, isAuthenticated: true }),
      logout: () => set({ user: null, isAuthenticated: false }),
      updateUser: (user) => set({ user }),
    }),
    {
      name: 'auth-storage', //  guarda en localStorage con esta clave
    }
  )
);
