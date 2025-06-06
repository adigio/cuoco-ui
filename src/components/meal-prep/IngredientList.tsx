// components/IngredientsList.tsx
import ContainerCardDetail from "@/components/shared/containers/ContainerCardDetail";
import React from "react";

interface IngredientsListProps {
  ingredients: string[];
}

const IngredientsList: React.FC<IngredientsListProps> = ({ ingredients }) => (
  <ContainerCardDetail title="Ingredientes necesarios">
    <ul className="list-disc list-inside text-sm text-gray-700">
      {ingredients.map((ingredient, i) => (
        <li key={i}>{ingredient}</li>
      ))}
    </ul>
  </ContainerCardDetail>
);

export default IngredientsList;
