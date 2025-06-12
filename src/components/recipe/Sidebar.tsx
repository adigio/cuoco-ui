import React from "react";
import { RecipeDetailIngredientGroup, RecipeDetailMissingIngredient } from "@/types/recipe/recipe.types";
import RecipeIngredients from "./Ingredients";
import RecipeMissingIngredients from "./MissingIngredients";
import Button from "@/components/shared/form/Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useAuthStore } from "@/store/useAuthStore";
import { faPlus } from "@fortawesome/free-solid-svg-icons";

interface Props {
  ingredients: RecipeDetailIngredientGroup[];
  missingIngredients: RecipeDetailMissingIngredient[];
}

export default function RecipeSidebar({ ingredients, missingIngredients }: Props) {
  const isPremium = useAuthStore((state) => state.user?.premium);

  return (
    <aside className="w-full lg:w-1/4 flex flex-col gap-6">
      <RecipeIngredients ingredients={ingredients} />
      <RecipeMissingIngredients missing={missingIngredients} />
      {isPremium && (
        <div className="">
          <Button>
            <FontAwesomeIcon className="w-4 h-4 mr-2" icon={faPlus} />
            Agregar a Planificación semanal
          </Button>
        </div>
      )}
    </aside>
  );
} 