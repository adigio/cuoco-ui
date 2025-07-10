import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { FavoritesState } from '@/types';

export const useFavoritesStore = create<FavoritesState>()(
  persist(
    (set, get) => ({
      favoriteRecipeIds: [],
      favoriteMealPrepIds: [],
      
      addFavoriteRecipe: (recipeId: number) => {
        set((state) => ({
          favoriteRecipeIds: [...new Set([...state.favoriteRecipeIds, recipeId])]
        }));
      },
      
      removeFavoriteRecipe: (recipeId: number) => {
        set((state) => ({
          favoriteRecipeIds: state.favoriteRecipeIds.filter(id => id !== recipeId)
        }));
      },
      
      addFavoriteMealPrep: (mealPrepId: number) => {
        set((state) => ({
          favoriteMealPrepIds: [...new Set([...state.favoriteMealPrepIds, mealPrepId])]
        }));
      },
      
      removeFavoriteMealPrep: (mealPrepId: number) => {
        set((state) => ({
          favoriteMealPrepIds: state.favoriteMealPrepIds.filter(id => id !== mealPrepId)
        }));
      },
      
      isFavoriteRecipe: (recipeId: number) => {
        return get().favoriteRecipeIds.includes(recipeId);
      },
      
      isFavoriteMealPrep: (mealPrepId: number) => {
        return get().favoriteMealPrepIds.includes(mealPrepId);
      },
      
      clearFavorites: () => {
        set({ favoriteRecipeIds: [], favoriteMealPrepIds: [] });
      },
      
      addFavorite: (recipeId: number) => {
        get().addFavoriteRecipe(recipeId);
      },
      
      removeFavorite: (recipeId: number) => {
        get().removeFavoriteRecipe(recipeId);
      },
      
      isFavorite: (recipeId: number) => {
        return get().isFavoriteRecipe(recipeId);
      }
    }),
    {
      name: 'favoriteRecipes',
    }
  )
); 