import { useCallback } from 'react';
import { getMealPrepById } from '@/services/generateMealPrepRecipes.service';
import { MealPrep } from '@/types';
import { useApiDetail } from './useApiDetail';

export const useMealPrepDetail = (mealPrepId: string) => {
  const fetchMealPrep = useCallback(
    async (id: string, signal?: AbortSignal) => {
      const idMealPrep = Number(id);
      return getMealPrepById(idMealPrep);
    },
    []
  );

  const { data: mealPrep, loading, error } = useApiDetail<MealPrep>(
    fetchMealPrep,
    mealPrepId
  );

  return { mealPrep, loading, error };
}; 