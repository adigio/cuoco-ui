"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useIngredientsStore } from "@/store/useIngredientsStore";
import { useMealPrepStore } from "@/store/useMealPrepStore";
import { useFavoritesStore } from "@/store/useFavoritesStore";
import { useNotification } from "@/hooks/useNotification";

import MealPrepCard from "@/components/meal-prep/MealPrepCard";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClock, faHeart } from "@fortawesome/free-regular-svg-icons";
import { faHeart as faHeartSolid } from "@fortawesome/free-solid-svg-icons";
import Container from "@/components/shared/containers/Container";
import BackgroundLayers from "@/components/shared/BackgroundLayers";
import { RecipeCardSkeleton } from "@/components/shared/skeleton/RecipeCardSkeleton";
import { FavoriteModal } from "@/components/shared/modal/FavoriteModal";
import SubscriptionModal from "@/components/shared/modal/SubscriptionModal";
import NotificationModal from "@/components/shared/modal/NotificationModal";
import { faRotate } from "@fortawesome/free-solid-svg-icons";
import { RefreshModal } from "@/components/shared/modal/RefreshModal";


export default function MealPrepResultsPage() {
  const mealPreps = useMealPrepStore((state) => state.filteredMealPrep);
  const { ingredients } = useIngredientsStore();
  const { isFavoriteMealPrep, addFavoriteMealPrep } = useFavoritesStore();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  const [showRefreshModal, setShowRefreshModal] = useState(false);
  const [showFavoriteModal, setShowFavoriteModal] = useState(false);
  const [showSubscriptionModal, setShowSubscriptionModal] = useState(false);
  const [selectedMealPrep, setSelectedMealPrep] = useState<null | {
    id: number;
    name: string;
  }>(null);

  const {
    message,
    additionalMessage,
    type,
    show,
    showSuccess,
    showError,
    clearNotification,
  } = useNotification();

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  const handleFavoriteClick = (mealPrep: { id: number; name: string }) => {
    if (isFavoriteMealPrep(mealPrep.id)) {
      return;
    }

    setSelectedMealPrep(mealPrep);
    setShowFavoriteModal(true);
  };
  const handleRefreshRecipe = (MealPrep: { id: number; name: string }) => {
    setSelectedMealPrep(MealPrep);
    setShowRefreshModal(true);
  };
  const handleFavoriteSuccess = () => {
    if (selectedMealPrep) {
      addFavoriteMealPrep(selectedMealPrep.id);
    }
  };

  const handleBack = () => {
    router.push("/meal-prep-filters");
  };

  return (
    <>
      <BackgroundLayers />
      <main className="flex-1">
        <div className="container mx-auto px-4 py-12">
          <h1 className="text-3xl font-bold text-center mb-2">
            Meal Preps sugeridos
          </h1>
          <p className="text-gray-600 text-center mb-8">
            Basados en {ingredients.filter((ing) => ing.confirmed).length}{" "}
            ingredientes que tienes disponibles
          </p>
          <Container>
            {isLoading ? (
              <div className="flex gap-4 justify-center px-4 pb-12 flex-wrap">
                {[1, 2, 3, 4].map((index) => (
                  <RecipeCardSkeleton key={index} />
                ))}
              </div>
            ) : mealPreps.length === 0 ? (
              <div className="text-center py-10">
                <p className="text-xl text-gray-600">
                  No se encontraron meal preps con tus ingredientes.
                </p>
                <button
                  onClick={handleBack}
                  className="mt-4 bg-[#f37b6a] text-white px-6 py-2 rounded hover:bg-[#e36455] transition"
                >
                  Volver a filtros
                </button>
              </div>
            ) : (
              <div className="flex gap-4 justify-center px-4 pb-12 flex-wrap">
                {mealPreps.map((mealPrep) => {
                  const isFavorite = isFavoriteMealPrep(mealPrep.id);
                  return (
                    <MealPrepCard key={mealPrep.id} mealPrep={mealPrep}>
                      <div className="flex justify-between items-center px-2 text-red-400">
                        <div className="flex items-center gap-2.5 w-20">
                          <FontAwesomeIcon className="w-4 h-4" icon={faClock} />
                          <p className="text-xs">
                            {mealPrep.estimated_cooking_time}
                          </p>
                        </div>
                        <div className="flex items-center gap-3">
                          <button
                            className="cursor-pointer w-5 px-2"
                            onClick={() =>
                              handleRefreshRecipe({
                                id: mealPrep.id,
                                name: mealPrep.title,
                              })
                            }
                          >
                            <FontAwesomeIcon
                              className="w-4 h-4"
                              icon={faRotate}
                            />
                          </button>
                          <button
                            className={`w-4 px-2 ${
                              isFavorite
                                ? "cursor-not-allowed text-red-400"
                                : "cursor-pointer text-red-400 hover:text-red-400"
                            }`}
                            onClick={() =>
                              handleFavoriteClick({
                                id: mealPrep.id,
                                name: mealPrep.title,
                              })
                            }
                            disabled={isFavorite}
                          >
                            <FontAwesomeIcon
                              className="w-4 h-4"
                              icon={isFavorite ? faHeartSolid : faHeart}
                            />
                          </button>
                        </div>
                      </div>
                    </MealPrepCard>
                  );
                })}
              </div>
            )}
          </Container>

          <div className="flex justify-center mt-8">
            <button
              onClick={handleBack}
              className="bg-gray-200 text-gray-800 px-6 py-2 rounded hover:bg-gray-300 transition mr-4"
            >
              Volver a filtros
            </button>

            <button
              onClick={() => {
                useIngredientsStore.getState().endGeneratorSession();
                router.push("/recipe-generator");
              }}
              className="bg-[#f37b6a] text-white px-6 py-2 rounded hover:bg-[#e36455] transition"
            >
              Nuevo generador
            </button>
          </div>
        </div>

        {selectedMealPrep && (
          <>
            <FavoriteModal
              type="meal-prep"
              onUpgrade={() => {
                setShowFavoriteModal(false);
                setShowSubscriptionModal(true);
              }}
              recipeText={selectedMealPrep.name}
              isOpen={showFavoriteModal}
              onClose={() => {
                setShowFavoriteModal(false);
                setSelectedMealPrep(null);
              }}
              onFavoriteSuccess={handleFavoriteSuccess}
              recipeId={selectedMealPrep.id}
              showSuccess={showSuccess}
              showError={showError}
            />
            <SubscriptionModal
              isOpen={showSubscriptionModal}
              onClose={() => setShowSubscriptionModal(false)}
              title=""
            />
        <RefreshModal
          recipeText={selectedMealPrep.name}
          isOpen={showRefreshModal}
           type="meal-prep"
          onClose={() => {
            setShowRefreshModal(false);
            setSelectedMealPrep(null);
          }}
          onUpgrade={() => {
            setShowRefreshModal(false);
            setShowSubscriptionModal(true);
          }}
          recipeId={selectedMealPrep?.id}
          showSuccess={showSuccess}
          showError={showError}
        />
          </>
        )}
        <NotificationModal
          show={show}
          onClose={clearNotification}
          message={message}
          additionalMessage={additionalMessage}
          type={type}
        />
      </main>
    </>
  );
}
