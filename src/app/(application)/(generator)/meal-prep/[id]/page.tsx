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
  const logoBase64 =
    "data:image/png;base64,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";

  const handleDownloadPDF = () => {
    if (!mealPrep) return;

    const doc = new jsPDF();

    // Fondo blanco
    doc.setFillColor(255, 255, 255);
    doc.rect(0, 0, 210, 297, "F");

    let y = 25;

    // Título
    doc.setFontSize(18);
    doc.setTextColor(83, 37, 219);
    doc.text(mealPrep.title, 105, y, { align: "center" });
    y += 10;

    // Línea debajo del título
    doc.setDrawColor(250, 128, 114); // Línea salmón
    doc.setLineWidth(0.8);
    doc.line(10, y, 200, y);
    y += 6;

    // Ingredientes título
    doc.setFontSize(14);
    doc.setTextColor(0, 0, 0);
    doc.text("Ingredientes", 105, y, { align: "center" });
    y += 8;

    // Lista de ingredientes
    doc.setFontSize(11);
    doc.setTextColor(0, 0, 0);

    mealPrep.ingredients.forEach((ingredient: Ingredient) => {
      const quantity = (ingredient.quantity || "").toString();
      const unit = (ingredient.symbol || "").toString();
      const description = (ingredient.name || "").toString();

      doc.text(description, 15, y);

      const qtyUnit = `${quantity} ${unit}`.trim();
      doc.text(qtyUnit, 195, y, { align: "right" });

      y += 6;

      if (y > 280) {
        doc.addPage();
        doc.setFillColor(255, 255, 255);
        doc.rect(0, 0, 210, 297, "F");
        y = 25;
      }
    });

    // Footer logo opcional
    if (typeof logoBase64 !== "undefined") {
      doc.addImage(logoBase64, "PNG", 90, y + 10, 30, 15);
    }

    doc.save(`ingredientes_${mealPrep.title}.pdf`);
  };

  const handleDownloadFullPDF = () => {
    if (!mealPrep) return;

    const doc = new jsPDF();
    let y = 25;

    // Fondo blanco
    doc.setFillColor(255, 255, 255);
    doc.rect(0, 0, 210, 297, "F");

    // Título principal
    doc.setFontSize(18);
    doc.setTextColor(0, 0, 0);
    doc.text(mealPrep.title, 105, y, { align: "center" });
    y += 8;

    // Subtítulo con recipes
    const recipes = mealPrep.recipes
      .map((recipe: Recipe) => recipe.name)
      .join(" | ");
    const recipeLines = doc.splitTextToSize(recipes, 180);
    doc.setFontSize(9);
    recipeLines.forEach((line: string) => {
      doc.text(line, 105, y, { align: "center" });
      y += 4;
    });
    y += 2;

    // Línea decorativa
    doc.setDrawColor(250, 128, 114);
    doc.setLineWidth(1);
    doc.line(10, y, 200, y);
    y += 5;

    // Encabezados de columnas
    doc.setFontSize(13);
    doc.setTextColor(0, 0, 0);
    doc.text("Paso a paso", 15, y);
    doc.text("Ingredientes", 135, y);
    y += 6;

    let yLeft = y;
    let yRight = y;

    // Paso a paso (lado izquierdo)
    doc.setFontSize(10);
mealPrep.steps.forEach((step: Step, index: number) => {
  const text = `${index + 1}. ${step.title}: ${step.description}`;
  const lines: string[] = doc.splitTextToSize(text, 115); // 60% ancho

  lines.forEach((line: string) => {
    doc.text(line, 15, yLeft);
    yLeft += 5;
    if (yLeft > 280) {
      doc.addPage();
      doc.rect(0, 0, 210, 297, "F");
      yLeft = 20;
      yRight = 20;
    }
  });

  yLeft += 2; // Espacio entre pasos
});


    // Ingredientes (lado derecho)
    mealPrep.ingredients.forEach((ingredient : Ingredient) => {
      const quantity = ingredient.quantity || "";
      const unit = ingredient.symbol || "";
      const description = ingredient.name || "";

      const qtyText = `${quantity} ${unit}`.trim();
      const descText = `${description}`;

      // Alineamos cantidad a la derecha y nombre a la izquierda
      doc.text(qtyText, 190, yRight, { align: "right" });
      doc.text(descText, 135, yRight);
      yRight += 5;

      if (yRight > 280) {
        doc.addPage();
        doc.rect(0, 0, 210, 297, "F");
        yLeft = 20;
        yRight = 20;
      }
    });

    // Footer logo
    if (typeof logoBase64 !== "undefined") {
      const finalY = Math.max(yLeft, yRight) + 10;
      doc.addImage(logoBase64, "PNG", 90, finalY, 30, 15);
    }

    // Guardar
    doc.save(`receta_${mealPrep.title}.pdf`);
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
              <h3 className="mx-4 mb-2 text-xl font-bold text-[#333]">Paso a paso</h3>

              <MealPrepSteps steps={mealPrep.steps} />
            </section>

            <aside className="w-full lg:w-1/4 flex flex-col gap-6">
              <div className="flex justify-center items-center mt-4 gap-2">
                <span className="text-gray-700 font-semibold">Descargar:</span>

                <button
                  onClick={handleDownloadPDF}
                  className="bg-purple-500 hover:bg-purple-600 text-white font-semibold p-2 rounded inline-flex items-center"
                  title="Descargar ingredientes"
                >
                  {/* Icono lista (ingredientes) */}
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
                      d="M4 6h16M4 10h16M4 14h16M4 18h16"
                    />
                  </svg>
                </button>

                <button
                  onClick={handleDownloadFullPDF}
                  className="bg-purple-500 hover:bg-purple-600 text-white font-semibold p-2 rounded inline-flex items-center"
                  title="Descargar receta completa"
                >
                  {/* Icono documento (receta completa) */}
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
                      d="M9 12h6m2 0a2 2 0 002-2V6a2 2 0 00-2-2H7a2 2 0 00-2 2v4a2 2 0 002 2zm0 0v6a2 2 0 01-2 2H7a2 2 0 01-2-2v-6"
                    />
                  </svg>
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
