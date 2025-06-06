import React from "react";
import { RecipeDetailIngredientGroup, RecipeDetailMissingIngredient } from "@/types/recipe/recipe.types";
import RecipeIngredients from "./Ingredients";
import RecipeMissingIngredients from "./MissingIngredients";

interface Props {
  ingredients: RecipeDetailIngredientGroup[];
  missingIngredients: RecipeDetailMissingIngredient[];
}

export default function RecipeSidebar({ ingredients, missingIngredients }: Props) {
  return (
    <aside className="w-full lg:w-1/4 flex flex-col gap-6">
      <RecipeIngredients ingredients={ingredients} />
      <RecipeMissingIngredients missing={missingIngredients} />
    </aside>
  );
} 