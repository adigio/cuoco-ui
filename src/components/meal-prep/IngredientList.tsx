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
    <div className="flex flex-col items-center space-y-3 mt-4">
      {ingredients.map((ingredient, i) => (
        <div key={i} className="flex items-center justify-center min-w-[200px]">
          <span className="font-semibold min-w-[80px] text-right mr-4">
            {ingredient.quantity} {ingredient.unit.symbol}
          </span>
          <span className="text-gray-700 text-left flex-1">{ingredient.name}</span>
        </div>
      ))}
    </div>
  </ContainerCardDetail>
);

export default IngredientsList;
