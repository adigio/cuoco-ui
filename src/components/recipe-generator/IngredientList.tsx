'use client';

import React from 'react';

interface Ingredient {
  name: string;
  origin: string;
  confirm: boolean;
}

interface RecipeIngredientListProps {
  ingredients: Ingredient[];
  setIngredients?: React.Dispatch<React.SetStateAction<Ingredient[]>>;
  enabledDelete?: boolean;
}

export default function RecipeIngredientList({ ingredients, setIngredients, enabledDelete = true }: RecipeIngredientListProps) {
  const handleRemoveIngredient = (idx: number) => {
    if (setIngredients) {
      setIngredients((prev) => prev.filter((_, i) => i !== idx));
    }
  };

  return (
    <div className="flex flex-wrap gap-2 mt-4">
      {ingredients.length === 0 ? (
        <p className="text-gray-500">No hay ingredientes añadidos todavía.</p>
      ) : (
        ingredients.map((item, idx) => (
          <span
            key={idx}
            className="bg-gray-200 text-sm px-3 py-1 rounded-full flex items-center gap-2"
          >
            {item.name}

            {enabledDelete && setIngredients && (
              <button
                onClick={() => handleRemoveIngredient(idx)}
                className="text-gray-600 hover:text-red-500 font-bold"
                title="Eliminar"
              >
                ×
              </button>
            )}
          </span>
        ))
      )}
    </div>
  );
} 