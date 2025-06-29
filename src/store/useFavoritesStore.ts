import { create } from 'zustand';
import { persist } from 'zustand/middleware';

type FavoritesState = {
  favoriteRecipeIds: number[];
  addFavorite: (recipeId: number) => void;
  removeFavorite: (recipeId: number) => void;
  isFavorite: (recipeId: number) => boolean;
  clearFavorites: () => void;
};

export const useFavoritesStore = create<FavoritesState>()(
  persist(
    (set, get) => ({
      favoriteRecipeIds: [],
      
      addFavorite: (recipeId: number) => {
        set((state) => ({
          favoriteRecipeIds: [...new Set([...state.favoriteRecipeIds, recipeId])]
        }));
      },
      
      removeFavorite: (recipeId: number) => {
        set((state) => ({
          favoriteRecipeIds: state.favoriteRecipeIds.filter(id => id !== recipeId)
        }));
      },
      
      isFavorite: (recipeId: number) => {
        return get().favoriteRecipeIds.includes(recipeId);
      },
      
      clearFavorites: () => {
        set({ favoriteRecipeIds: [] });
      }
    }),
    {
      name: 'favoriteRecipes',
    }
  )
); 