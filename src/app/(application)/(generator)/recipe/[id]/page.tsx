"use client";

import React, { useEffect, useState, use } from 'react';
import { useRouter } from 'next/navigation';
import { getRecipeById } from '@/services/recipeService';
import BackgroundLayers from '@/components/shared/BackgroundLayers';
import ContainerShadow from '@/components/shared/containers/ContainerShadow';
import { PageProps, Recipe } from '@/types';
import { RecipeDetailSkeleton } from '@/components/shared/skeleton/RecipeDetailSkeleton';
import TimeAndFavorite from '@/components/meal-prep/TimeAndFavorite';

export default function RecipePage({ params }: PageProps) {
  const router = useRouter();
  const { id: recipeId } = use(params);
  const [recipe, setRecipe] = useState<Recipe | null>(null);
  const [loading, setLoading] = useState(true);


  useEffect(() => {
    const fetchRecipe = async () => {
      try {
        const res = await getRecipeById(recipeId);

        if (res) {
          setRecipe(res);
        }
      } catch (error) {
        console.error("Error al obtener la receta:", error);
        setRecipe(null);
      } finally {
        setLoading(false);
      }
    };

    fetchRecipe();
  }, [recipeId]);

  if (loading) {
    return <RecipeDetailSkeleton  />;
  }


  if (!recipe) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-red-600 text-lg">Receta no encontrada</p>
      </div>
    );
  }
   const handleFavRecipe = (recipeId: number) => {
    console.log("GUARDAR A FAVS:", recipeId);
    // router.push(`/recipe/${recipeId}`);
  };

  // Función auxiliar para obtener el nombre del ingrediente
  const getIngredientName = (ingredient: any): string => {
    if (typeof ingredient === "string") return ingredient;
    return ingredient?.name || "Ingrediente desconocido";
  };

  const handleBack = () => {
    router.push('/results');
  };

  return (
    <>
      <BackgroundLayers />

      <div className="w-full border-b-4 border-purple-400 mb-6"></div>

      <main className="flex-1 relative">
        <ContainerShadow customClass="container">
          <div className="flex items-center justify-between mb-4 flex-wrap gap-2">
            <h1 className="text-3xl font-bold">{recipe.name}</h1>
            <TimeAndFavorite
              minutes={recipe.preparationTime}
              onToggleFavorite={() => handleFavRecipe(recipe.id)}
            />
          </div>

          <p className="text-gray-600 mb-4">{recipe.subtitle}</p>

          <div className="flex items-center gap-4 text-sm text-red-500 mb-6">
            <span>💪 {recipe.difficulty}</span>
          </div>

          <div className="grid md:grid-cols-2 gap-6 mb-8">
            <div>
              <h2 className="text-xl font-semibold mb-2">🧾 Ingredientes</h2>
              <div className="bg-white p-4 rounded shadow">
                <ul className="list-disc list-inside">
                  {recipe.ingredients.map((item, i) => (
                    <li key={i}>{getIngredientName(item)}</li>
                  ))}
                </ul>
              </div>
            </div>

            <div>
              <h2 className="text-xl font-semibold mb-2">
                🛒 Necesitás comprar
              </h2>
              <div className="bg-white p-4 rounded shadow">
                {!recipe.missingIngredients?.length ? (
                  <p className="text-green-600">¡Tenés todo para cocinar! 👏</p>
                ) : (
                  <ul className="list-disc list-inside text-red-500 font-semibold">
                    {recipe.missingIngredients.map((item, i) => (
                      <li key={i}>{item}</li>
                    ))}
                  </ul>
                )}
              </div>
            </div>
          </div>

          <div>
            <h2 className="text-xl font-semibold mb-2">👨‍🍳 Paso a paso</h2>
            <div className="bg-white p-4 rounded shadow space-y-2">
              {recipe.instructions.map((step, index) => (
                <div key={index} className="flex gap-2 items-start">
                  <div className="text-red-600 font-bold">{index + 1}.</div>
                  <p>{step}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="flex justify-center mt-8">
            <button
              onClick={handleBack}
              className="bg-gray-200 text-gray-800 px-6 py-2 rounded hover:bg-gray-300 transition mr-4"
            >
              Atrás
            </button>
          </div>
        </ContainerShadow>
      </main>
    </>
  );
}