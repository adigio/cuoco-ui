import { create } from 'zustand';

interface ErrorState {
  error: string | null;
  showError: boolean;
  setError: (error: string) => void;
  clearError: () => void;
}

export const useErrorStore = create<ErrorState>((set) => ({
  error: null,
  showError: false,
  setError: (error: string) => set({ error, showError: true }),
  clearError: () => set({ error: null, showError: false }),
})); 