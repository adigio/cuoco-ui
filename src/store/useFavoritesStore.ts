import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { FavoritesState } from '@/types';

export const useFavoritesStore = create<FavoritesState>()(
  persist(
    (set, get) => ({
      favoriteRecipeIds: [],
      favoriteMealPrepIds: [],
      // Nuevos arrays para rastrear cambios locales
      addedLocallyRecipeIds: [],
      removedLocallyRecipeIds: [],
      addedLocallyMealPrepIds: [],
      removedLocallyMealPrepIds: [],
      
      addFavoriteRecipe: (recipeId: number) => {
        set((state) => ({
          favoriteRecipeIds: [...new Set([...state.favoriteRecipeIds, recipeId])],
          addedLocallyRecipeIds: [...new Set([...state.addedLocallyRecipeIds, recipeId])],
          // Remover de eliminados si estaba ahí
          removedLocallyRecipeIds: state.removedLocallyRecipeIds.filter(id => id !== recipeId)
        }));
      },
      
      removeFavoriteRecipe: (recipeId: number) => {
        set((state) => ({
          favoriteRecipeIds: state.favoriteRecipeIds.filter(id => id !== recipeId),
          removedLocallyRecipeIds: [...new Set([...state.removedLocallyRecipeIds, recipeId])],
          // Remover de agregados si estaba ahí
          addedLocallyRecipeIds: state.addedLocallyRecipeIds.filter(id => id !== recipeId)
        }));
      },
      
      addFavoriteMealPrep: (mealPrepId: number) => {
        set((state) => ({
          favoriteMealPrepIds: [...new Set([...state.favoriteMealPrepIds, mealPrepId])],
          addedLocallyMealPrepIds: [...new Set([...state.addedLocallyMealPrepIds, mealPrepId])],
          removedLocallyMealPrepIds: state.removedLocallyMealPrepIds.filter(id => id !== mealPrepId)
        }));
      },
      
      removeFavoriteMealPrep: (mealPrepId: number) => {
        set((state) => ({
          favoriteMealPrepIds: state.favoriteMealPrepIds.filter(id => id !== mealPrepId),
          removedLocallyMealPrepIds: [...new Set([...state.removedLocallyMealPrepIds, mealPrepId])],
          addedLocallyMealPrepIds: state.addedLocallyMealPrepIds.filter(id => id !== mealPrepId)
        }));
      },
      
      // Nueva función que combina estado del servidor con cambios locales
      isFavoriteRecipe: (recipeId: number, serverState?: boolean) => {
        const state = get();
        // Si fue eliminado localmente, NO es favorito
        if (state.removedLocallyRecipeIds.includes(recipeId)) {
          return false;
        }
        // Si fue agregado localmente, SÍ es favorito
        if (state.addedLocallyRecipeIds.includes(recipeId)) {
          return true;
        }
        // Si no hay cambios locales, usar estado del servidor o el favoriteRecipeIds
        return serverState ?? state.favoriteRecipeIds.includes(recipeId);
      },
      
      isFavoriteMealPrep: (mealPrepId: number, serverState?: boolean) => {
        const state = get();
        if (state.removedLocallyMealPrepIds.includes(mealPrepId)) {
          return false;
        }
        if (state.addedLocallyMealPrepIds.includes(mealPrepId)) {
          return true;
        }
        return serverState ?? state.favoriteMealPrepIds.includes(mealPrepId);
      },
      
      clearFavorites: () => {
        set({ 
          favoriteRecipeIds: [], 
          favoriteMealPrepIds: [],
          addedLocallyRecipeIds: [],
          removedLocallyRecipeIds: [],
          addedLocallyMealPrepIds: [],
          removedLocallyMealPrepIds: []
        });
      },
      
      addFavorite: (recipeId: number) => {
        get().addFavoriteRecipe(recipeId);
      },
      
      removeFavorite: (recipeId: number) => {
        get().removeFavoriteRecipe(recipeId);
      },
      
      isFavorite: (recipeId: number, serverState?: boolean) => {
        return get().isFavoriteRecipe(recipeId, serverState);
      },

      // limpieza de cambios locales después de sincronización con servidor
      syncWithServer: (favoriteRecipeIds: number[], favoriteMealPrepIds: number[]) => {
        set({
          favoriteRecipeIds,
          favoriteMealPrepIds,
          addedLocallyRecipeIds: [],
          removedLocallyRecipeIds: [],
          addedLocallyMealPrepIds: [],
          removedLocallyMealPrepIds: []
        });
      }
    }),
    {
      name: 'favoriteRecipes',
    }
  )
); 