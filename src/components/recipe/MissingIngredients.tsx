import React, { useState } from "react";
import { RecipeDetailMissingIngredient } from "@/types/recipe/recipe.types";
import ContainerCardDetail from "@/components/shared/containers/ContainerCardDetail";

interface Props {
  missing: RecipeDetailMissingIngredient[];
}

export default function RecipeMissingIngredients({ missing }: Props) {
  const [checkedItems, setCheckedItems] = useState<{ [key: string]: boolean }>({});

  if (!missing?.length) return null;

  const handleCheck = (index: number) => {
    setCheckedItems(prev => ({
      ...prev,
      [index]: !prev[index]
    }));
  };

  return (
    <ContainerCardDetail title="Necesitás comprar">
      <ul className="space-y-2">
        {missing.map((item, i) => (
          <li key={i} className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={checkedItems[i] || false}
              onChange={() => handleCheck(i)}
              className="w-4 h-4 text-color-primary-medium border-gray-300 rounded focus:ring-color-primary-medium"
            />
            <span className={`${checkedItems[i] ? 'line-through text-gray-400' : 'text-color-primary-medium'} font-semibold`}>
              {item.quantity && <span className="font-semibold">{item.quantity} </span>}
              {item.description}
            </span>
          </li>
        ))}
      </ul>
    </ContainerCardDetail>
  );
} 