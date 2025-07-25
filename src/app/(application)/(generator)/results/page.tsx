'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
//Contexto
import { useIngredientsStore } from '@/store/useIngredientsStore';
import { useRecipesStore } from '@/store/useRecipesStore';
import { useRecipeGeneratorSession } from '@/hooks/useRecipeGeneratorSession';
//Componentes
import RecipeCard from '@/components/shared/cards/RecipeCard';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClock, faHeart } from '@fortawesome/free-regular-svg-icons';
import { faHeart as faHeartSolid } from '@fortawesome/free-solid-svg-icons';
import { faRotate } from '@fortawesome/free-solid-svg-icons';
import Container from '@/components/shared/containers/Container';
import BackgroundLayers from '@/components/shared/BackgroundLayers';
import { RecipeCardSkeleton } from '@/components/shared/skeleton/RecipeCardSkeleton';
import { FavoriteModal } from '@/components/shared/modal/FavoriteModal';
import { RefreshModal } from '@/components/shared/modal/RefreshModal';
import SubscriptionModal from '@/components/shared/modal/SubscriptionModal';
import NotificationModal from '@/components/shared/modal/NotificationModal';
import { useNotification } from '@/hooks/useNotification';


export default function RecipeResultsPage() {
  useRecipeGeneratorSession();
  
  const recipes = useRecipesStore(state => state.filteredRecipes); 
  const { ingredients } = useIngredientsStore();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  const [showFavoriteModal, setShowFavoriteModal] = useState(false);
  const [showRefreshModal, setShowRefreshModal] = useState(false);
  const [showSubscriptionModal, setShowSubscriptionModal] = useState(false);	
  const [selectedRecipe, setSelectedRecipe] = useState<null | { id: number, name: string }>(null);
  const [favoriteRecipes, setFavoriteRecipes] = useState<Set<number>>(new Set());

  const { 
    message, 
    additionalMessage, 
    type, 
    show, 
    showSuccess, 
    showError, 
    clearNotification 
  } = useNotification();

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 3000);
    
    return () => clearTimeout(timer);
  }, []);

  
  const handleFavoriteClick = (recipe: { id: number, name: string }) => {
    if (favoriteRecipes.has(recipe.id)) {
      return;
    }
    
    setSelectedRecipe(recipe);
    setShowFavoriteModal(true);
  };

  const handleFavoriteSuccess = (recipeId: number) => {
    setFavoriteRecipes(prev => new Set(prev).add(recipeId));
  };

  const handleRefreshRecipe = (recipe: { id: number, name: string }) => {
    setSelectedRecipe(recipe);
    setShowRefreshModal(true);
  };

  const handleBack = () => {
    router.push('/filters');
  };

  return (
    <>
    <BackgroundLayers />
    <main className="flex-1">
      <div className="container mx-auto px-4 py-12">
        <h1 className="text-3xl font-bold text-center mb-2">Recetas sugeridas</h1>
        <p className="text-gray-600 text-center mb-8">
          Basadas en {ingredients.filter(ing => ing.confirmed).length} ingredientes que tienes disponibles
        </p>
        <Container>
          {isLoading ? (
            <div className="flex gap-4 justify-center px-4 pb-12 flex-wrap">
              {[1, 2, 3].map((index) => (
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
              {recipes.map((recipe) => {
                const isFavorite = favoriteRecipes.has(recipe.id);
                return (
                  <RecipeCard customClass={"mx-auto"} key={recipe.id} recipe={recipe}>
                    <div className='flex justify-between items-center px-2 text-red-400'>
                      <div className='flex items-center gap-2.5 w-20'>
                        <FontAwesomeIcon className='w-4 h-4' icon={faClock} />
                        <p className='text-xs'>{recipe.preparationTime}</p>
                      </div>
                      <div className='flex items-center gap-3'>
                        <button 
                          className='cursor-pointer w-5 px-2' 
                          onClick={() => handleRefreshRecipe({ id: recipe.id, name: recipe.name })}
                        >
                          <FontAwesomeIcon className='w-4 h-4' icon={faRotate} />
                        </button>
                        <button 
                          className={`w-4 px-2 ${
                            isFavorite 
                              ? 'cursor-not-allowed text-red-400' 
                              : 'cursor-pointer text-red-400 hover:text-red-400'
                          }`}
                          onClick={() => handleFavoriteClick({ id: recipe.id, name: recipe.name })}
                          disabled={isFavorite}
                        >
                          <FontAwesomeIcon 
                            className='w-4 h-4' 
                            icon={isFavorite ? faHeartSolid : faHeart} 
                          />
                        </button>
                      </div>
                    </div>
                  </RecipeCard>
                );
              })}
            </div>
          )}
        <div className="flex justify-center mt-8">
          <button
            onClick={handleBack}
            className="bg-gray-200 text-gray-800 px-6 py-2 rounded hover:bg-gray-300 transition mr-4"
          >
            Volver a ingredientes
          </button>

          <button
            onClick={() => {
              useIngredientsStore.getState().endGeneratorSession();
              router.push('/recipe-generator');
            }}
            className="bg-[#f37b6a] text-white px-6 py-2 rounded hover:bg-[#e36455] transition"
          >
            Nuevo generador
          </button>
        </div>
        </Container>

      </div>


      {selectedRecipe && (
        <>
          <FavoriteModal
            onUpgrade={() => {
              setShowFavoriteModal(false);
              setShowSubscriptionModal(true);
            }}
            recipeText={selectedRecipe.name}
            isOpen={showFavoriteModal}
            onClose={() => {
              setShowFavoriteModal(false);
              setSelectedRecipe(null);
            }}
            onFavoriteSuccess={() => selectedRecipe && handleFavoriteSuccess(selectedRecipe.id)}
            recipeId={selectedRecipe.id}
            showSuccess={showSuccess}
            showError={showError}
          />
          <RefreshModal
            recipeText={selectedRecipe.name}
            isOpen={showRefreshModal}
            onClose={() => {
              setShowRefreshModal(false);
              setSelectedRecipe(null);
            }}
            onUpgrade={() => {
              setShowRefreshModal(false);
              setShowSubscriptionModal(true);
            }}
            recipeId={selectedRecipe?.id}
            showSuccess={showSuccess}
            showError={showError}
          />
          <SubscriptionModal
            isOpen={showSubscriptionModal}
            onClose={() => setShowSubscriptionModal(false)}
            title=''
          />
        </>
      )}


        <NotificationModal
          show={show}
          onClose={clearNotification}
          message={message}
          additionalMessage={additionalMessage}
          type={type}
        />
    </main>
    </>
  );
} 