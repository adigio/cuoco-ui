'use client';

import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export type Recipe = {
  id: string;
  title: string;
  // podés extender con más campos
};

type RecipesState = {
  filteredRecipes: Recipe[];
  setFilteredRecipes: (recipes: Recipe[]) => void;
  clearRecipes: () => void;
};

export const useRecipesStore = create<RecipesState>()(
  persist(
    (set) => ({
      filteredRecipes: [],
      setFilteredRecipes: (recipes) => set({ filteredRecipes: recipes }),
      clearRecipes: () => set({ filteredRecipes: [] }),
    }),
    {
      name: 'filteredRecipes', // nombre de la clave en localStorage
    }
  )
);
