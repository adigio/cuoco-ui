'use client';

import React from 'react';
import { Ingredient } from '@/types/ingredient/ingredient.types';
import { RecipeIngredientListProps } from '@/types/components/recipe-generator.types';

export default function RecipeIngredientList({ 
  ingredients, 
  onRemove,
  enabledDelete = true 
}: {
  ingredients: Ingredient[];
  onRemove?: (idx: number) => void;
  enabledDelete?: boolean;
}) {
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
            {enabledDelete && onRemove && (
              <button
                onClick={() => onRemove(idx)}
                className="bg-gray-200 text-gray-500 h-4 w-4 flex items-center justify-center text-xs rounded-full transition-colors"
                title="Eliminar"
              >
                x
              </button>
            )}
          </span>
        ))
      )}
    </div>
  );
} 