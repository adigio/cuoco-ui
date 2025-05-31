'use client';

import { MealPrep } from '@/types';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

type MealPrepState = {
  mealPreps: MealPrep[];
  setMealPreps: (mealPreps: MealPrep[]) => void;
  getMealPrepById: (id: string) => MealPrep | undefined;
  clearMealPreps: () => void;
};

export const useMealPrepStore = create<MealPrepState>()(
  persist(
    (set, get) => ({
      mealPreps: [],
      setMealPreps: (mealPreps) => set({ mealPreps }),
      getMealPrepById: (id) => get().mealPreps.find((m) => m.id === id),
      clearMealPreps: () => set({ mealPreps: [] }),
    }),
    {
      name: 'meal-preps', // clave en localStorage
    }
  )
);
