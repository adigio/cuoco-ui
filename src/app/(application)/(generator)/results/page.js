'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { useIngredients } from '@/context/IngredientContext';
import RecipeCard from '@/components/shared/cards/RecipeCard';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClock, faHeart } from '@fortawesome/free-regular-svg-icons';
import { faRotate } from '@fortawesome/free-solid-svg-icons';
import { useRecipes } from '@/context/RecipeContext';
import Container from '@/components/shared/containers/Container';

export default function RecipeResultsPage() {
  const { filteredRecipes } = useRecipes();
  const { ingredients } = useIngredients();
  const router = useRouter();


  console.log("recetas del contexto", filteredRecipes);

  // Función para mostrar detalle de receta
  const handleViewRecipe = (recipeId) => {
    console.log('Ver detalle de receta:', recipeId);
    // router.push(`/recipe/${recipeId}`);
  };

  const handleRefreshRecipe = (recipeId) => {
    alert("Mostrar el alert modal. Si era user no premiun no.")
  };

  const handleBack = () => {
    router.push('/filters');
  };

  return (
    <main className="flex-1">
      <div className="container mx-auto px-4 py-12">
        <h1 className="text-3xl font-bold text-center mb-2">Recetas sugeridas</h1>
        <p className="text-gray-600 text-center mb-8">
          Basadas en {ingredients.filter(ing => ing.confirmado).length} ingredientes que tienes disponibles
        </p>
        <Container>
        {filteredRecipes.length === 0 ? (
          <div className="text-center py-10">
            <p className="text-xl text-gray-600">No se encontraron recetas con tus ingredientes.</p>
            <button
              onClick={handleBack}
              className="mt-4 bg-[#f37b6a] text-white px-6 py-2 rounded hover:bg-[#e36455] transition"
            >
              Volver a seleccionar ingredientes
            </button>
          </div>
        ) : (
          <div className="flex gap-4 justify-center px-4 pb-12 flex-wrap">
            {filteredRecipes.map((recipe) => (
              <RecipeCard customClass={"mx-auto"} key={recipe.id} recipe={recipe}>
                <div className='flex justify-between items-center px-2 text-red-400'>
                  <div className='flex items-center gap-2.5 w-15'>
                    <FontAwesomeIcon className='w-4 h-4' icon={faClock} />
                    <p>{recipe.preparationTime} ´</p>
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
        )}
        </Container>

        <div className="flex justify-center mt-8">
          <button
            onClick={handleBack}
            className="bg-gray-200 text-gray-800 px-6 py-2 rounded hover:bg-gray-300 transition mr-4"
          >
            Volver a ingredientes
          </button>

          <button
            onClick={() => router.push('/recipe-generator')}
            className="bg-[#f37b6a] text-white px-6 py-2 rounded hover:bg-[#e36455] transition"
          >
            Nuevo generador
          </button>
        </div>
      </div>
    </main>
  );
} 