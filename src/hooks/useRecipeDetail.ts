import { useState, useEffect, useRef } from 'react';
import { getRecipeById } from '@/services/recipe.service';
import { RecipeDetail } from '@/types/recipe/recipe.types';

export const useRecipeDetail = (recipeId: string) => {
  const [recipe, setRecipe] = useState<RecipeDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const abortControllerRef = useRef<AbortController | null>(null);

  useEffect(() => {
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
    }
    
    const abortController = new AbortController();
    abortControllerRef.current = abortController;
    
    const fetchRecipe = async () => {
      try {
        const res = await getRecipeById(recipeId, abortController.signal);
        
        if (abortController.signal.aborted) return;
        
        if (res) {
          setRecipe(res);
        }
      } catch (error: any) {
        if (!abortController.signal.aborted) {
          if (error.name !== 'CanceledError' && error.name !== 'AbortError') {
            console.error("Error al obtener la receta:", error);
            setRecipe(null);
          }
        }
      } finally {
        if (!abortController.signal.aborted) {
          setLoading(false);
        }
      }
    };
    
    fetchRecipe();
    
    return () => {
      abortController.abort();
    };
  }, [recipeId]);

  return { recipe, loading };
}; 