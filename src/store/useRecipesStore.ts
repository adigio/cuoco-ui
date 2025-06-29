'use client';

import { Recipe } from '@/types';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';



type RecipesState = {
  filteredRecipes: Recipe[];
  setFilteredRecipes: (recipes: Recipe[]) => void;
  clearRecipes: () => void;
  replaceRecipe: (oldRecipeId: number, newRecipe: Recipe) => void;
};

export const useRecipesStore = create<RecipesState>()(
  persist(
    (set) => ({
      filteredRecipes: [],
      setFilteredRecipes: (recipes) => set({ filteredRecipes: recipes }),
      clearRecipes: () => set({ filteredRecipes: [] }),
      replaceRecipe: (oldRecipeId, newRecipe) => set((state) => ({
        filteredRecipes: state.filteredRecipes.map(recipe => 
          recipe.id === oldRecipeId ? newRecipe : recipe
        )
      })),
    }),
    {
      name: 'filteredRecipes', // nombre de la clave en localStorage
    }
  )
);
