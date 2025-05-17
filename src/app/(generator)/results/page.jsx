'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useIngredients } from '@/context/IngredientContext';
import { generateRecipes } from '@/services/recipeService';
import NavbarHome from '@/components/navbars/NavbarHome';
import Footer from '@/components/landing/Footer';
import RecipeCard from '@/components/shared/cards/RecipeCard';
import ChefLoader from '@/components/shared/ChefLoader';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClock, faHeart } from '@fortawesome/free-regular-svg-icons';
import { faRotate } from '@fortawesome/free-solid-svg-icons';
import AlertModal from '@/components/shared/modal/AlertModal';
export default function RecipeResultsPage() {
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const { ingredients } = useIngredients();
  const router = useRouter();

  useEffect(() => {
    // Si no hay ingredientes, redirigir a la página de generador
    if (ingredients.length === 0) {
      router.push('/recipe-generator');
      return;
    }

    // Obtener solo los ingredientes confirmados
    const confirmedIngredients = ingredients.filter(ing => ing.confirmado);
    
    // Generar recetas basadas en ingredientes confirmados
    async function fetchRecipes() {
      try {
        setLoading(true);
        const generatedRecipes = await generateRecipes(confirmedIngredients);
        setRecipes(generatedRecipes);
      } catch (err) {
        console.error('Error al generar recetas:', err);
        setError('Hubo un problema al generar las recetas. Por favor, inténtalo de nuevo.');
      } finally {
        setLoading(false);
      }
    }

    fetchRecipes();
  }, [ingredients, router]);

    // Función para mostrar detalle de receta
    const handleViewRecipe = (recipeId) => {
      console.log('Ver detalle de receta:', recipeId);
      // router.push(`/recipe/${recipeId}`);
    };

    const handleRefreshRecipe = (recipeId) => {
      console.log('refresh detalle de receta:', recipeId);
      // router.push(`/recipe/${recipeId}`);
    };

    const handleBack = () => {
      router.push('/filters');
    };

  if (loading) {
    return <ChefLoader />;
  }

  return (
  <div className="flex flex-col min-h-screen bg-[#fefefe]">
    <NavbarHome />

    <main className="flex-1">
      <div className="container mx-auto px-4 py-12">
        <h1 className="text-3xl font-bold text-center mb-2">Recetas sugeridas</h1>
        <p className="text-gray-600 text-center mb-8">
          Basadas en {ingredients.filter(ing => ing.confirmado).length} ingredientes que tienes disponibles
        </p>

        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-6">
            {error}
          </div>
        )}

        {recipes.length === 0 && !loading && !error ? (
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
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {recipes.map((recipe) => (
              <RecipeCard key={recipe.id} recipe={recipe}>
              <div className='flex justify-between items-center px-2 text-red-400'>
                <div className='flex items-center gap-2.5 w-15'>
                  <FontAwesomeIcon className='w-4 h-4' icon={faClock} />  
                  <p>{recipe.preparationTime} '</p>
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

    <Footer />
  </div>
);

} 