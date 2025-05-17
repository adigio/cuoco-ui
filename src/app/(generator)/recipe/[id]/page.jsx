import NavbarHome from '@/components/navbars/NavbarHome';
import { getRecipeById } from '@/services/recipeService';
import Footer from '@/components/landing/Footer';
import React from 'react';

export default async function RecipePage({ params }) {
  const recipe = await getRecipeById(params.id);
  if (!recipe) return <p>Receta no encontrada</p>;

  return (
    <div className="flex flex-col min-h-screen bg-[#fefefe]">
          <NavbarHome />
    <div className="max-w-4xl mx-auto px-4 py-8 text-gray-800">
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
    </div>
      <Footer />
    </div>
  );
}
