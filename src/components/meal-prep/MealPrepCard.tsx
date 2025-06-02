'use client';

import { MealPrep } from "@/types";
import React, { ReactNode } from 'react';
interface Props {
  mealPrep: MealPrep;
  onClick: () => void;
   children?: ReactNode; 
}
export default function MealPrepCard({ mealPrep, children }: Props) {

    const handleRefreshRecipe = (id: number) => {
    // Guardás el ID seleccionado o redirigís (ver más adelante)
     console.log(`MealPrep seleccionado: ${id}`);
    // router.push(`/meal-prep/${id}`);
  };

  return (
    <div 
      className="cursor-pointer w-full bg-white shadow-md rounded-lg p-4 mb-6 hover:shadow-lg transition"
    >
      <h3 className="text-xl font-bold mb-2">{mealPrep.title}</h3>

      <div className="flex flex-col sm:flex-row gap-4">
       {Array.isArray(mealPrep.recipes) && mealPrep.recipes.slice(0, 3).map((recipe) => (
  <div
    key={recipe.id}
    className="flex-1 bg-gray-100 rounded p-3 flex flex-col items-start"
  >
    {recipe.image && (
      <a className="w-full" href={`/meal-prep/${mealPrep.id}`}>
        <img
          src={recipe.image}
          alt={recipe.title}
          onClick={(e) => handleRefreshRecipe(mealPrep.id)}
          className="w-full h-32 object-cover rounded mb-2"
        />
      </a>
    )}
    <h4 className="font-semibold text-md">{recipe.title}</h4>
  </div>
))}

      </div>

          {children &&
                <div className="p-4">{children}</div>} 
   
    </div>
  );
}
