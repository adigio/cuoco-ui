import React from "react";
import { RecipeDetailIngredientGroup } from "@/types/recipe/recipe.types";
import ContainerCardDetail from "@/components/shared/containers/ContainerCardDetail";

interface Props {
  ingredients: RecipeDetailIngredientGroup[];
}

export default function RecipeIngredients({ ingredients }: Props) {
  return (
    <ContainerCardDetail title="Ingredientes">
      {ingredients.map((group, idx) => (
        <div key={idx} className="my-4"> 
          {group.section && group.section.trim() && (
            <div className="font-semibold text-md mb-2 border-b border-gray-200 text-center">
              <h3>{group.section}</h3>
            </div>
          )}
          <div className="flex flex-col items-center space-y-3">
 
            {group.items.map((item, i) => (
              <div key={i} className="flex items-center justify-center min-w-[200px]">
                {item.quantity && (
                  <span className="font-semibold min-w-[80px] text-right mr-4">
                    {item.quantity}
                  </span>
                )}
                <span className="text-gray-700 text-left flex-1">{item.description}</span>
              </div>
            ))}
          </div>
        </div>
      ))}
    </ContainerCardDetail>
  );
} 