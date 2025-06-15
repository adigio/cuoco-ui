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
          <ul className="list-none  list-inside">
            {group.items.map((item, i) => (
              <li key={i} className="text-sm my-1">
                {item.quantity && (
                  <span className="font-semibold">{item.quantity} </span>
                )}
                {item.description}
              </li>
            ))}
          </ul>
        </div>
      ))}
    </ContainerCardDetail>
  );
} 