'use client'

import RecipeCard from "@/components/shared/cards/RecipeCard";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClock, faHeart } from '@fortawesome/free-regular-svg-icons';
import { faRotate } from '@fortawesome/free-solid-svg-icons'; 
import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';
import { Recipe } from '@/types';

export default function CardsInspiracion() {
  const router = useRouter();
  const [inspirationalRecipes, setInspirationalRecipes] = useState<Recipe[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // TODO; para no hacer el get del store... por una cuestion de que si hay una repetida (al probar el refresh rompe)
  useEffect(() => {
    const timer = setTimeout(() => {
      setInspirationalRecipes([]);
      setIsLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  const handleViewRecipe = (recipeId: number) => {
    console.log('Ver detalle de receta:', recipeId);
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
              <p>{recipe.preparationTime}</p>  
            </div>
          </div>
        </RecipeCard>
      ))}
    </div>
  );
}
