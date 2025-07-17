import { useCallback } from 'react';
import { getRecipeById } from '@/services/recipe.service';
import { RecipeDetail } from '@/types/recipe/recipe.types';
import { useApiDetail } from './useApiDetail';

export const useRecipeDetail = (recipeId: string) => {
  const fetchRecipe = useCallback(
    async (id: string, signal?: AbortSignal) => {
      return getRecipeById(id, signal);
    },
    []
  );

  const { data: recipe, loading, error } = useApiDetail<RecipeDetail>(
    fetchRecipe,
    recipeId
  );

  return { recipe, loading, error };
}; 