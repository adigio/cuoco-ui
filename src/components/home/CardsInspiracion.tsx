'use client'

import RecipeCard from "@/components/shared/cards/RecipeCard";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClock } from '@fortawesome/free-regular-svg-icons';
import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';
import { RecipeDetail } from '@/types';
import { getRandomRecipes } from "@/services/recipe.service"; // Ajustá el path según donde lo pongas

export default function CardsInspiracion() {
  const router = useRouter();
  const [inspirationalRecipes, setInspirationalRecipes] = useState<RecipeDetail[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        setIsLoading(true);
        const recipes = await getRandomRecipes(3); // Por ejemplo, traer 4 recetas
        console.log(recipes)
        setInspirationalRecipes(recipes);
      } catch (error) {
        console.error("Error al obtener recetas inspiracionales:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchRecipes();
  }, []);

  const handleViewRecipe = (recipeId: number) => { 
    router.push(`/recipe/${recipeId}`);
  };

  if (isLoading) {
    return (
      <div className="text-center py-10 w-full">
        <p className="text-xl text-gray-600">Cargando recetas inspiracionales...</p>
      </div>
    );
  }

  if (!inspirationalRecipes || inspirationalRecipes.length === 0) {
    return (
      <div className="text-center py-10 w-full">
        <div className="max-w-md mx-auto">
          <p className="text-xl text-gray-600 mb-4">
            🍽️ Próximamente: Recetas inspiracionales
          </p>
          <p className="text-gray-500 text-sm">
            Estamos preparando deliciosas recetas para inspirarte. 
            Mientras tanto, ¡prueba nuestro generador de recetas!
          </p>
          <button
            onClick={() => router.push('/recipe-generator')}
            className="mt-4 bg-[#f37b6a] text-white px-6 py-2 rounded hover:bg-[#e36455] transition"
          >
            Crear receta personalizada
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex gap-4 justify-center px-4 pb-12 flex-wrap">
      {inspirationalRecipes.map((recipe) => (
        <RecipeCard customClass={"mx-auto"} key={recipe.id} recipe={recipe}>
          <div className='flex justify-between items-center px-2 text-red-400'>
            <div className='flex items-center gap-2.5 w-15'>
              <FontAwesomeIcon className='w-4 h-4' icon={faClock} />
              <p>{recipe.time}</p>  
            </div>
          </div>
        </RecipeCard>
      ))}
    </div>
  );
}
