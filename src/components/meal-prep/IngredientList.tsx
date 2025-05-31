// components/IngredientsList.tsx
import React from "react";

interface IngredientsListProps {
  ingredients: string[];
}

const IngredientsList: React.FC<IngredientsListProps> = ({ ingredients }) => (
  <div className="bg-white shadow rounded-lg p-4">
    <h3 className="text-md font-bold mb-2">Ingredientes necesarios</h3>
    <hr className="border-gray-200 mb-4" />
    <ul className="list-disc list-inside text-sm text-gray-700">
      {ingredients.map((ingredient, i) => (
        <li key={i}>{ingredient}</li>
      ))}
    </ul>
  </div>
);

export default IngredientsList;
