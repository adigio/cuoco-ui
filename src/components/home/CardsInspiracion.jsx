'use client'

import RecipeCard from "@/components/shared/cards/RecipeCard";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClock, faHeart } from '@fortawesome/free-regular-svg-icons';
import { faRotate } from '@fortawesome/free-solid-svg-icons';
import { useRecipes } from '@/context/RecipeContext';
import { useRouter } from 'next/navigation';

export default function CardsInspiracion() {
  const { filteredRecipes } = useRecipes();
  const router = useRouter();

  const handleViewRecipe = (recipeId) => {
    console.log('Ver detalle de receta:', recipeId);
    // Por ejemplo, navegar a la página de receta
    router.push(`/recipe/${recipeId}`);
  };

  const handleRefreshRecipe = (recipeId) => {
    alert("Mostrar el alert modal. Si era user no premium no.");
  };

  if (!filteredRecipes || filteredRecipes.length === 0) {
    return (
      <div className="text-center py-10 w-full">
        <p className="text-xl text-gray-600">No se encontraron recetas para mostrar.</p>
      </div>
    );
  }

  return (
    <div className="flex gap-4 justify-center px-4 pb-12 flex-wrap">
      {filteredRecipes.map((recipe) => (
        <RecipeCard customClass={"mx-auto"} key={recipe.id} recipe={recipe}>
          <div className='flex justify-between items-center px-2 text-red-400'>
            <div className='flex items-center gap-2.5 w-15'>
              <FontAwesomeIcon className='w-4 h-4' icon={faClock} />
              {/* Asegurate que la propiedad sea la correcta según tu data */}
              <p>{recipe.preparationTime ?? recipe.time} '</p>
            </div>
            <div className='flex items-center gap-3'>
              <button className='cursor-pointer w-5 px-2' onClick={() => handleRefreshRecipe(recipe.id)}>
                <FontAwesomeIcon className='w-4 h-4' icon={faRotate} />
              </button>
              <button className='cursor-pointer w-4 px-2' onClick={() => handleViewRecipe(recipe.id)}>
                <FontAwesomeIcon className='w-4 h-4' icon={faHeart} />
              </button>
            </div>
          </div>
        </RecipeCard>
      ))}
    </div>
  );
}
