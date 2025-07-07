'use client';

import { create } from 'zustand';

interface PendingRecipe {
  id: number;
  title: string;
  image: string;
  mealTypes: number[]; 
}

interface CalendarStore {
  pendingRecipe: PendingRecipe | null;
  setPendingRecipe: (recipe: PendingRecipe) => void;
  clearPendingRecipe: () => void;
}

export const useCalendarStore = create<CalendarStore>((set) => ({
  pendingRecipe: null,
  setPendingRecipe: (recipe) => set({ pendingRecipe: recipe }),
  clearPendingRecipe: () => set({ pendingRecipe: null }),
})); 