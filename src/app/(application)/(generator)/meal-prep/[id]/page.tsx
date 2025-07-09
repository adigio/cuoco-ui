"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import apiClient from "@/lib/axios.config";
import ChefLoader from "@/components/shared/loaders/ChefLoader";
import BackgroundLayers from "@/components/shared/BackgroundLayers";
import ContainerShadow from "@/components/shared/containers/ContainerShadow";
import RecipeTags from "@/components/meal-prep/RecipeTags";
import MealPrepSteps from "@/components/meal-prep/MealPrepSteps";
import ObservationInfo from "@/components/meal-prep/ObservationInfo";
import IngredientsList from "@/components/meal-prep/IngredientList";
import PortionSummary from "@/components/meal-prep/PortionSummary";
import TimeAndFavorite from "@/components/shared/TimeAndFavorite";
import { FavoriteModal } from "@/components/shared/modal/FavoriteModal"; 
import { UnfavoriteModal } from "@/components/shared/modal/UnfavoriteModal";
import SubscriptionModal from "@/components/shared/modal/SubscriptionModal";
import NotificationModal from "@/components/shared/modal/NotificationModal";
import { useFavoritesStore } from "@/store/useFavoritesStore";
import { useNotification } from "@/hooks/useNotification";
import { Step } from "@/types";
import jsPDF from "jspdf";
import { Ingredient, Recipe } from "@/types";
import PDFDownloadButtons from "@/components/recipe-generator/MealPrepPDFDownload";
 

export default function MealPrepPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const router = useRouter();

  // Desempaquetar params con React.use()
  const { id: mealPrepId } = React.use(params);

  const { isFavoriteMealPrep, addFavoriteMealPrep, removeFavoriteMealPrep } =
    useFavoritesStore();
  const {
    show,
    message,
    additionalMessage,
    type,
    showSuccess,
    showError,
    clearNotification,
  } = useNotification();

  const [mealPrep, setMealPrep] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [showFavoriteModal, setShowFavoriteModal] = useState(false);
  const [showUnfavoriteModal, setShowUnfavoriteModal] = useState(false);
  const [showSubscriptionModal, setShowSubscriptionModal] = useState(false);

  useEffect(() => {
    const fetchMealPrep = async () => {
      try {
        setLoading(true);
        const { data } = await apiClient.get(`/meal-preps/${mealPrepId}`);

        // Mapeo para camelCase
        const mapped = {
          id: data.id,
          title: data.title,
          estimatedCookingTime: data.estimated_cooking_time,
          servings: data.servings,
          freeze: data.freeze,
          steps: data.steps,
          recipes: data.recipes,
          ingredients: data.ingredients,
          observation: data.observation || undefined,
        };

        setMealPrep(mapped);
      } catch (err) {
        console.error("Error al traer el meal prep", err);
        setMealPrep(null);
      } finally {
        setLoading(false);
      }
    };

    fetchMealPrep();
  }, [mealPrepId]);
   
 

  const handleFavMealPrep = () => {
    if (!mealPrep) return;
    const isCurrentlyFavorite = isFavoriteMealPrep(mealPrep.id);
    if (isCurrentlyFavorite) {
      setShowUnfavoriteModal(true);
    } else {
      setShowFavoriteModal(true);
    }
  };

  const handleFavoriteSuccess = () => {
    if (mealPrep) {
      addFavoriteMealPrep(mealPrep.id);
    }
  };

  const handleUnfavoriteSuccess = () => {
    if (mealPrep) {
      removeFavoriteMealPrep(mealPrep.id);
    }
  };

  const handleBack = () => {
    router.push("/results-meal");
  };

  if (loading) {
    return <ChefLoader text="Cargando meal prep..." />;
  }
  if (!mealPrep) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-red-600 text-lg">Meal prep no encontrado</p>
      </div>
    );
  }
  const isCurrentlyFavorite = isFavoriteMealPrep(mealPrep.id);

  return (
    <>
      <BackgroundLayers />
      <div className="w-full border-b-4 border-purple-400 mb-6"></div>

      <main className="flex-1 relative">
        <ContainerShadow customClass="container  shadow-xl">
          <RecipeTags recipes={mealPrep.recipes} />

          <div className="flex flex-col lg:flex-row gap-8">
            <section className="w-full lg:w-3/4">
              <div className="flex justify-between items-center mb-6"> 
                <h2 className="text-2xl font-bold text-[#333]">{mealPrep.title}</h2>
 

                <TimeAndFavorite
                  minutes={mealPrep.estimatedCookingTime}
                  onToggleFavorite={handleFavMealPrep}
                  isFavorite={isCurrentlyFavorite}
                />
              </div>
                <div className="border-t-2 text-color-primary mb-10"></div>
              <h3 className="mx-4 mb-2 text-xl font-bold text-[#333]">Paso a paso</h3>

              <MealPrepSteps steps={mealPrep.steps} />
            </section>

            <aside className="w-full lg:w-1/4 flex flex-col gap-6"> 
              <PDFDownloadButtons mealPrep={mealPrep} />

              {/* <PortionSummary recipes={mealPrep.recipes} /> */}

              <IngredientsList ingredients={mealPrep.ingredients} />
 
              {mealPrep.observation && (
                <ObservationInfo observation={mealPrep.observation} />
              )}
            </aside>
          </div>

          <div className="flex justify-center mt-8">
            <button
              onClick={handleBack}
              className="bg-gray-200 text-gray-800 px-6 py-2 rounded hover:bg-gray-300 transition mr-4"
            >
              Atrás
            </button>
          </div> 
        </ContainerShadow>
      </main>

      <FavoriteModal
        type="meal-prep"
        recipeId={mealPrep.id}
        recipeText={mealPrep.title}
        isOpen={showFavoriteModal}
        onClose={() => setShowFavoriteModal(false)}
 
        onUpgrade={() => {
          setShowFavoriteModal(false);
          setShowSubscriptionModal(true);
        }}
        onFavoriteSuccess={handleFavoriteSuccess}
        showSuccess={showSuccess}
        showError={showError}
      />

      <UnfavoriteModal
        type="meal-prep"
        recipeId={mealPrep.id}
        recipeText={mealPrep.title}
        isOpen={showUnfavoriteModal}
        onClose={() => setShowUnfavoriteModal(false)}
        onUnfavoriteSuccess={handleUnfavoriteSuccess}
        showSuccess={showSuccess}
        showError={showError}
      />

      <SubscriptionModal
        isOpen={showSubscriptionModal}
        onClose={() => setShowSubscriptionModal(false)}
        title=""
      />

      <NotificationModal
        show={show}
        onClose={clearNotification}
        message={message}
        additionalMessage={additionalMessage}
        type={type} 
      />
    </>
  );
}
