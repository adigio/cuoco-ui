import React from "react";
import { RecipeDetail } from "@/types/recipe/recipe.types";
import TimeAndFavorite from "@/components/shared/TimeAndFavorite";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";

type Props = RecipeDetail;

export default function RecipeHeader({ 
  id, 
  name, 
  time, 
  servings, 
  isFavorite,
  subtitle,
  difficulty 
}: Props) {
  const handleFavRecipe = (recipeId: number) => {
    console.log("GUARDAR A FAVS:", recipeId);
  };

  return (
    <div className="mb-6 border-b border-color-primary-medium"> 
      <div className="flex items-center justify-between mb-4 flex-wrap gap-2">
        <h1 className="text-3xl font-bold w-1/2 text-center">{name}</h1>

        <div className="flex items-center gap-2">
          <span className="flex items-center gap-1 text-color-primary-medium">
            <FontAwesomeIcon icon={faUser} className="text-color-primary-medium" />
            {servings}
          </span>
          <TimeAndFavorite
            minutes={time}
            onToggleFavorite={() => handleFavRecipe(id)}
            isFavorite={isFavorite}
          />
        </div>
      </div>
    </div>
  );
} 