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
  const handleDownloadPDF = () => {
    if (!mealPrep) return;

    const doc = new jsPDF();

    // Fondo salmón
    doc.setFillColor(250, 128, 114); // RGB salmón
    doc.rect(0, 0, 210, 297, "F"); // A4 completo

    let y = 20;
    doc.setFontSize(18);
    doc.setTextColor(83, 37, 219);
    doc.text(mealPrep.title, 10, y);
    y += 10;

    doc.setFontSize(14);
    doc.setTextColor(0, 0, 0);
    doc.text("Ingredientes", 10, y);
    y += 8;

    mealPrep.ingredients.forEach((group) => {
      if (group.section && group.section.trim()) {
        doc.setFontSize(12);
        doc.setTextColor(100);
        doc.text(group.section.toString(), 105, y, { align: "center" });
        doc.setDrawColor(200);
        doc.line(10, y + 2, 200, y + 2);
        y += 8;
      }

      group.items.forEach((item) => {
        const qText = (item.quantity || "").toString();
        const dText = (item.description || "").toString();

        doc.setFontSize(11);
        doc.setTextColor(0, 0, 0);
        doc.text(qText, 40, y, { align: "right" });
        doc.text(dText, 45, y);
        y += 7;

        if (y > 280) {
          doc.addPage();
          doc.setFillColor(250, 128, 114);
          doc.rect(0, 0, 210, 297, "F");
          y = 20;
        }
      });

      y += 5;
    });

    doc.save(`ingredientes_${mealPrep.title}.pdf`);
  };

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
  console.log(mealPrep);
  const isCurrentlyFavorite = isFavoriteMealPrep(mealPrep.id);

  return (
    <>
      <BackgroundLayers />
      <div className="w-full border-b-4 border-purple-400 mb-6"></div>

      <main className="flex-1 relative">
        <ContainerShadow customClass="container">
          <RecipeTags recipes={mealPrep.recipes} />

          <div className="flex flex-col lg:flex-row gap-8">
            <section className="w-full lg:w-3/4">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-[#333]">Paso a paso</h2>

                <TimeAndFavorite
                  minutes={mealPrep.estimatedCookingTime}
                  onToggleFavorite={handleFavMealPrep}
                  isFavorite={isCurrentlyFavorite}
                />
              </div>

              <MealPrepSteps steps={mealPrep.steps} />
            </section>

            <aside className="w-full lg:w-1/4 flex flex-col gap-6">
              <div className="flex justify-center mt-4">
                <button
                  onClick={handleDownloadPDF}
                  className="bg-purple-500 hover:bg-purple-600 text-white font-semibold py-2 px-4 rounded inline-flex items-center gap-2"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M4 16v2a2 2 0 002 2h12a2 2 0 002-2v-2M7 10l5 5m0 0l5-5m-5 5V4"
                    />
                  </svg>
                  Ingredientes
                </button>
              </div>

              <PortionSummary recipes={mealPrep.recipes} />

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
