'use client';

import React from 'react';

export default function RecipeIngredientList({ ingredients, setIngredients, enabledDelete = true }) {
  const handleRemoveIngredient = (idx) => {
    setIngredients((prev) => prev.filter((_, i) => i !== idx));
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
            {item.nombre}

            {enabledDelete && (
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