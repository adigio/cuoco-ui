'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
//Contexto
import { useIngredientsStore } from '@/store/useIngredientsStore';
import { useRecipesStore } from '@/store/useRecipesStore';
//Componentes
import RecipeCard from '@/components/shared/cards/RecipeCard';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClock, faHeart } from '@fortawesome/free-regular-svg-icons';
import { faRotate } from '@fortawesome/free-solid-svg-icons';
import Container from '@/components/shared/containers/Container';
import BackgroundLayers from '@/components/shared/BackgroundLayers';
import { RecipeCardSkeleton } from '@/components/shared/skeleton/RecipeCardSkeleton';
import { FavoriteModal } from '@/components/shared/modal/FavoriteModal';
import { RefreshModal } from '@/components/shared/modal/RefreshModal';
import SubscriptionModal from '@/components/shared/modal/SubscriptionModal';


export default function RecipeResultsPage() {
  const recipes = useRecipesStore(state => state.filteredRecipes); 
  const { ingredients } = useIngredientsStore();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  const [showFavoriteModal, setShowFavoriteModal] = useState(false);
  const [showRefreshModal, setShowRefreshModal] = useState(false);
  const [showSubscriptionModal, setShowSubscriptionModal] = useState(false);	
  const [selectedRecipe, setSelectedRecipe] = useState<null | { id: number, name: string }>(null);

  
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 3000);
    
    return () => clearTimeout(timer);
  }, []); //de momento hasta que esté la integracion con el back

  
  const handleFavoriteClick = (recipe: { id: number, name: string }) => {
    setSelectedRecipe(recipe);
    setShowFavoriteModal(true);
  };

  const handleRefreshRecipe = (recipe: { id: number, name: string }) => {
    setSelectedRecipe(recipe);
    setShowRefreshModal(true);
  };


  // Función para mostrar detalle de receta
  const handleViewRecipe = (recipeId: number) => {
    console.log('Ver detalle de receta:', recipeId);
    router.push(`/recipe/${recipeId}`);
  };

  const handleBack = () => {
    router.push('/filters');
  };

  return (
    <>
    <BackgroundLayers />
    <main className="flex-1">
      <div className="container mx-auto px-4  mt-20  py-12">
        <h1 className="text-3xl font-bold text-center mb-2">Recetas sugeridas</h1>
        <p className="text-gray-600 text-center mb-8">
          Basadas en {ingredients.filter(ing => ing.confirm).length} ingredientes que tienes disponibles
        </p>
        <Container>
          {isLoading ? (
            <div className="flex gap-4 justify-center px-4 pb-12 flex-wrap">
              {[1, 2, 3, 4].map((index) => (
                <RecipeCardSkeleton key={index} />
              ))}
            </div>
          ) : recipes.length === 0 ? (
            <div className="text-center py-10">
              <p className="text-xl text-gray-600">
                No se encontraron recetas con tus ingredientes.
              </p>
              <button
                onClick={handleBack}
                className="mt-4 bg-[#f37b6a] text-white px-6 py-2 rounded hover:bg-[#e36455] transition"
              >
                Volver a seleccionar ingredientes
              </button>
            </div>
          ) : (
            <div className="flex gap-4 justify-center px-4 pb-12 flex-wrap">
              {recipes.map((recipe) => (
                <RecipeCard customClass={"mx-auto"} key={recipe.id} recipe={recipe}>
                  <div className='flex justify-between items-center px-2 text-red-400'>
                    <div className='flex items-center gap-2.5 w-15'>
                      <FontAwesomeIcon className='w-4 h-4' icon={faClock} />
                      <p>{recipe.preparationTime} ´</p>
                    </div>
                    <div className='flex items-center gap-3'>
                      <button 
                        className='cursor-pointer w-5 px-2' 
                        onClick={() => handleRefreshRecipe({ id: recipe.id, name: recipe.name })}
                      >
                        <FontAwesomeIcon className='w-4 h-4' icon={faRotate} />
                      </button>
                      <button 
                        className='cursor-pointer w-4 px-2' 
                        onClick={() => handleFavoriteClick({ id: recipe.id, name: recipe.name })}
                      >
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


      {selectedRecipe && (
        <>
          <FavoriteModal
            recipeText={selectedRecipe.name}
            isOpen={showFavoriteModal}
            onClose={() => {
              setShowFavoriteModal(false);
              setSelectedRecipe(null);
            }}
            recipeId={selectedRecipe.id}
          />
          <RefreshModal
            recipeText={selectedRecipe.name}
            isPremium={false}
            isOpen={showRefreshModal}
            onClose={() => {
              setShowRefreshModal(false);
              setSelectedRecipe(null);
            }}
            onUpgrade={() => {
              setShowRefreshModal(false);
              setShowSubscriptionModal(true);
            }}
            recipeId={selectedRecipe.id}
          />
          <SubscriptionModal
            isOpen={showSubscriptionModal}
            onClose={() => setShowSubscriptionModal(false)}
            title=''
          />
        </>
      )}
    </main>
    </>
  );
} 