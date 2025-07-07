import React from "react";
import { RecipeDetailIngredientGroup, RecipeDetailMissingIngredient } from "@/types/recipe/recipe.types";
import RecipeIngredients from "./Ingredients";
import RecipeMissingIngredients from "./MissingIngredients";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendarPlus } from '@fortawesome/free-solid-svg-icons';
import { useRouter } from 'next/navigation';
import { useCalendarStore } from "@/store/useCalendarStore";
import { getRecipeImageUrl } from "@/utils/imageUtils";

interface Props {
  ingredients: RecipeDetailIngredientGroup[];
  missingIngredients: RecipeDetailMissingIngredient[];
  recipeId?: number;
  recipeTitle?: string;
  isFavorite?: boolean;
  mealType?: number;
  mealTypes?: number[];
}

export default function RecipeSidebar({ 
  ingredients, 
  missingIngredients,
  recipeId,
  recipeTitle,
  isFavorite,
  mealType = 1,
  mealTypes
}: Props) {
  const router = useRouter();
  const setPendingRecipe = useCalendarStore(state => state.setPendingRecipe);

  const handleAddToCalendar = () => {
    if (!recipeId || !recipeTitle) return;
    
    const imageUrl = getRecipeImageUrl({ id: recipeId, image: 'main' });
    
    setPendingRecipe({
      id: recipeId,
      title: recipeTitle,
      image: imageUrl,
      mealTypes: mealTypes && mealTypes.length > 0 ? mealTypes : [mealType]
    });
    
    router.push('/calendar');
  };

  return (
    <aside className="w-full lg:w-1/4 flex flex-col gap-6">
      <RecipeIngredients ingredients={ingredients} />
      <RecipeMissingIngredients missing={missingIngredients} />
      
      {isFavorite ? (
        <button
          onClick={handleAddToCalendar}
          className="w-full flex items-center justify-center gap-2 bg-purple-500 hover:bg-purple-600 text-white font-semibold py-3 px-4 rounded-lg transition-colors"
        >
          <FontAwesomeIcon icon={faCalendarPlus} />
          Agregar a planificación semanal
        </button>
      ) : (
        <div className="w-full text-center text-gray-400 text-sm py-3">
          Solo puedes planificar recetas favoritas
        </div>
      )}
    </aside>
  );
} 