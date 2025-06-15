"use client";

import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClock, faHeart } from "@fortawesome/free-regular-svg-icons";
import { faRotate } from "@fortawesome/free-solid-svg-icons";
import { useRouter } from "next/navigation";
//Contexto
import { useMealPrepStore } from "@/store/useMealPrepStore";
//Componentes
import MealPrepCard from "@/components/meal-prep/MealPrepCard";
import { FavoriteModal } from "@/components/shared/modal/FavoriteModal";
import { RefreshModal } from "@/components/shared/modal/RefreshModal";

export default function RecipeResultsPage() {
  const mealPreps = useMealPrepStore((state) => state.mealPreps);
  const router = useRouter();

  const [showFavoriteModal, setShowFavoriteModal] = useState(false);
  const [showRefreshModal, setShowRefreshModal] = useState(false);
  const [selectedMealPrep, setSelectedMealPrep] = useState<{ id: number; name: string } | null>(null);

  const handleFavMealPrep = (e: React.MouseEvent, mealPrepId: number, name: string) => {
    e.stopPropagation();
    setSelectedMealPrep({ id: mealPrepId, name });
    setShowFavoriteModal(true);
  };

  const handleRefreshRecipe = (e: React.MouseEvent, mealPrepId: number, name: string) => {
    e.stopPropagation();
    setSelectedMealPrep({ id: mealPrepId, name });
    setShowRefreshModal(true);
  };

  const handleBack = () => {
    router.push("/filters");
  };

  return (
    <>
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
                  onClick={(e) => handleRefreshRecipe(e, prep.id, prep.title)}
                >
                  <FontAwesomeIcon className="w-4 h-4" icon={faRotate} />
                </button>
                <button
                  className="cursor-pointer w-4 px-2"
                  onClick={(e) => handleFavMealPrep(e, prep.id, prep.title)}
                >
                  <FontAwesomeIcon className="w-4 h-4" icon={faHeart} />
                </button>
              </div>
            </div>
          </MealPrepCard>
        ))}
      </div>

      {selectedMealPrep && (
        <>
          <FavoriteModal
            type="meal-prep"
            recipeId={selectedMealPrep.id}
            recipeText={selectedMealPrep.name}
            isOpen={showFavoriteModal}
            onClose={() => {
              setShowFavoriteModal(false);
              setSelectedMealPrep(null);
            }}
            onUpgrade={() => {}} // No hace falta porque al ser premium no se mostrara nunca el modal
          />

          <RefreshModal
            type="meal-prep"
            recipeId={selectedMealPrep.id}
            recipeText={selectedMealPrep.name}
            isOpen={showRefreshModal}
            onClose={() => {
              setShowRefreshModal(false);
              setSelectedMealPrep(null);
            }}
            isPremium={true} 
            onUpgrade={() => {}} // No hace falta porque al ser premium no se mostrara nunca el modal
          />
        </>
      )}
    </>
  );
}
