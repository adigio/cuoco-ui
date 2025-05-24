'use client';

import { Recipe } from '@/types/recipe.types';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';



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
