'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { getRecipeById } from '@/services/recipeService';
import ChefLoader from '@/components/shared/ChefLoader';
import BackgroundLayers from '@/components/shared/BackgroundLayers';
import ContainerShadow from '@/components/shared/containers/ContainerShadow';

export default function RecipePage({ params }) {
  const router = useRouter();
  const [recipe, setRecipe] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRecipe = async () => {
      const resolvedParams = await Promise.resolve(params); // 📦 esperamos si es una promesa
      if (!resolvedParams?.id) return;

      try {
        const res = await getRecipeById(resolvedParams.id);
        setRecipe(res);
      } finally {
        setLoading(false);
      }
    };

    fetchRecipe();
  }, [params]);


  const handleBack = () => {
    router.push('/results');
  };

  if (loading) {
    return (
      <ChefLoader  text="...Receta..."/>
    );
  }

  if (!recipe) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-red-600 text-lg">Receta no encontrada</p>
      </div>
    );
  }

  return (
    <>
      <BackgroundLayers />
      
      <div className="w-full border-b-4 border-purple-400 mb-6"></div>
      
      <main className="flex-1 relative">
        <ContainerShadow customClass={"container"}>
          <h1 className="text-3xl font-bold mb-2">{recipe.name}</h1>
          <p className="text-gray-600 mb-4">{recipe.subtitle}</p>

          <div className="flex items-center gap-4 text-sm text-red-500 mb-6">
            <span>⏱️ {recipe.preparationTime} min</span>
            <span>💪 {recipe.difficulty}</span>
          </div>

          <div className="grid md:grid-cols-2 gap-6 mb-8">
            <div>
              <h2 className="text-xl font-semibold mb-2">🧾 Ingredientes</h2>
              <div className="bg-white p-4 rounded shadow">
                <ul className="list-disc list-inside">
                  {recipe.ingredients.map((item, i) => (
                    <li key={i}>{item}</li>
                  ))}
                </ul>
              </div>
            </div>

            <div>
              <h2 className="text-xl font-semibold mb-2">🛒 Necesitás comprar</h2>
              <div className="bg-white p-4 rounded shadow">
                {recipe.missingIngredients.length === 0 ? (
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
