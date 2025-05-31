"use client";

import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClock, faHeart } from "@fortawesome/free-regular-svg-icons";
import { faRotate } from "@fortawesome/free-solid-svg-icons";
import { useRouter } from "next/navigation";
//Contexto
import { useMealPrepStore } from "@/store/useMealPrepStore";
//Componentes
import MealPrepCard from "@/components/meal-prep/MealPrepCard"; 
export default function RecipeResultsPage() {
  const mealPreps = useMealPrepStore((state) => state.mealPreps);
  const router = useRouter();
  const handleFavMealPrep = (mealPrepId: number) => { 
    // router.push(`/recipe/${recipeId}`);
  };

  const handleRefreshRecipe = (mealPrepId: number) => {
    alert("Mostrar el alert modal. Si era user no premiun no.");
  };

  const handleBack = () => {
    router.push("/filters");
  };
  return (
    <div className="max-w-5xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-6">Resultados del Meal Prep</h2>

      {mealPreps.length === 0 && (
        <p className="text-gray-500">No hay planes generados.</p>
      )}

      {mealPreps.map((prep) => (
        <MealPrepCard key={prep.id} mealPrep={prep}>
          <div className="flex justify-between items-center px-2 text-red-400">
            <div className="flex items-center gap-2.5 w-15">
              <FontAwesomeIcon className="w-4 h-4" icon={faClock} />
              <p>{prep.estimatedCookingTime} </p>
            </div>
            <div className="flex items-center gap-3">
              <button
                className="cursor-pointer w-5 px-2"
                onClick={() => handleRefreshRecipe(prep.id)}
              >
                <FontAwesomeIcon className="w-4 h-4" icon={faRotate} />
              </button>
              <button
                className="cursor-pointer w-4 px-2"
                onClick={() => handleFavMealPrep(prep.id)}
              >
                <FontAwesomeIcon className="w-4 h-4" icon={faHeart} />
              </button>
            </div>
          </div>
        </MealPrepCard>
      ))}
    </div>
  );
}
