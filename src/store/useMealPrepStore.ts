'use client';
 
import { MealPrep } from '@/types';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

type MealPrepState = {
  filteredMealPrep: MealPrep[];
  setMealPreps: (mealPreps: MealPrep[]) => void;
  getMealPrepById: (id: number) => MealPrep | undefined;
  clearMealPreps: () => void;
  replaceMealPrep: (oldMealPrepId: number, newMealPrep : MealPrep) =>void;
  setFilteredRecipes: (mealPrep :MealPrep[])=>void;
};

export const useMealPrepStore = create<MealPrepState>()(
  persist(
    (set, get) => ({
      filteredMealPrep: [],
      setMealPreps: (mealPreps) => set({ filteredMealPrep: mealPreps }),
      getMealPrepById: (id) => get().filteredMealPrep.find((m) => m.id === id),
      clearMealPreps: () => set({ filteredMealPrep: [] }),
      replaceMealPrep: (oldMealPrepId, newMealPrep) =>
        set((state) => ({
          filteredMealPrep: state.filteredMealPrep.map((mealPrep) =>
            mealPrep.id === oldMealPrepId ? newMealPrep : mealPrep
          )
        })),
      setFilteredRecipes: (mealPrep) => set({ filteredMealPrep: mealPrep }),
    }),
    {
      name: 'meal-preps', // clave en localStorage
    }
  )
);
