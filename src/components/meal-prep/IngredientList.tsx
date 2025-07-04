// components/IngredientsList.tsx
import ContainerCardDetail from "@/components/shared/containers/ContainerCardDetail";
import React from "react";

interface IngredientsListProps {
  ingredients: {
    name: string;
    quantity: number;
    unit: {
      symbol: string;
    };
  }[];
}

const IngredientsList: React.FC<IngredientsListProps> = ({ ingredients }) => (
  <ContainerCardDetail title="Ingredientes necesarios">
    <ul className="list-disc list-inside text-sm text-gray-700">
      {ingredients.map((ingredient, i) => (
        <li key={i}>
          {ingredient.name}: {ingredient.quantity} {ingredient.unit.symbol}
        </li>
      ))}
    </ul>
  </ContainerCardDetail>
);

export default IngredientsList;
