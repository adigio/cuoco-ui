'use client';

import { create } from 'zustand';
import { CalendarStore } from '@/types';

export const useCalendarStore = create<CalendarStore>((set) => ({
  pendingRecipe: null,
  setPendingRecipe: (recipe) => set({ pendingRecipe: recipe }),
  clearPendingRecipe: () => set({ pendingRecipe: null }),
})); 