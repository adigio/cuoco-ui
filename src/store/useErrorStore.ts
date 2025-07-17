import { create } from 'zustand';
import { ErrorState } from '@/types';

export const useErrorStore = create<ErrorState>((set) => ({
  error: null,
  showError: false,
  setError: (error: string) => set({ error, showError: true }),
  clearError: () => set({ error: null, showError: false }),
})); 