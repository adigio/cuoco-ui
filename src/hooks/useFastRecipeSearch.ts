import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { getFastRecipe } from '@/services/recipe.service';

export const useFastRecipeSearch = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const searchRecipe = async (recipeName: string) => {
    setLoading(true);
    setError(null);
    
    try {
      const recipe = await getFastRecipe(recipeName);
      router.push(`/recipe/${recipe.id}`);
    } catch (err) {
      setError('Error al buscar receta');
      setLoading(false);
    }
  };

  return {
    searchRecipe,
    loading,
    error
  };
}; 