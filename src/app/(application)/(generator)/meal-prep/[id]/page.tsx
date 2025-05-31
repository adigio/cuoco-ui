"use client";

import React, { useEffect, useState, use } from "react";
import { useRouter } from "next/navigation";
import { getMealPrepById } from "@/services/generateMealPrepRecipesService";
import ChefLoader from "@/components/shared/ChefLoader";
import BackgroundLayers from "@/components/shared/BackgroundLayers";
import ContainerShadow from "@/components/shared/containers/ContainerShadow";
import { MealPrep, PageProps } from "@/types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClock, faHeart } from "@fortawesome/free-regular-svg-icons";
import RecipeTags from "@/components/meal-prep/RecipeTags";
import MealPrepSteps from "@/components/meal-prep/MealPrepSteps";
import ObservationInfo from "@/components/meal-prep/ObservationInfo";
import IngredientsList from "@/components/meal-prep/IngredientList";
import PortionSummary from "@/components/meal-prep/PortionSummary";
import TimeAndFavorite from "@/components/meal-prep/TimeAndFavorite";
export default function MealPrepPage({ params }: PageProps) {
  const router = useRouter();
  const { id: mealPrepId } = use(params);
  const [mealPrep, setmealPrep] = useState<MealPrep | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMeal = async () => {
      try {
        const res = await getMealPrepById(mealPrepId);

        if (res) {
          setmealPrep(res); // <--- esto está bien
        }
      } catch (error) {
        console.error("Error al obtener la receta:", error);
        setmealPrep(null);
      } finally {
        setLoading(false);
      }
    };

    fetchMeal();
  }, [mealPrepId]);
  const handleFavMealPrep = (recipeId: number) => {
    console.log("GUARDAR A FAVS:", recipeId);
    // router.push(`/recipe/${recipeId}`);
  };
  const handleBack = () => {
    router.push("/results-meal");
  };

  if (loading) {
    return <ChefLoader text="...Receta..." />;
  }

  if (!mealPrep) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-red-600 text-lg">Receta no encontrada</p>
      </div>
    );
  }

  return (
    <>
      <BackgroundLayers />

      <div className="w-full border-b-4 border-purple-400 mb-6"></div>

      <main className="flex-1 relative">
        <ContainerShadow customClass="container">
          <RecipeTags recipes={mealPrep.recipes} />

          {/* Layout principal dividido 75% - 25% */}
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Columna principal - Timeline (75%) */}
            <section className="w-full lg:w-3/4">
              <div className="flex justify-between items-center mb-6">
                {/* Título */}
                <h2 className="text-2xl font-bold text-[#333]">Paso a paso</h2>

                {/* Tiempo + favorito */}
                <TimeAndFavorite
                  minutes={mealPrep.estimatedCookingTime}
                  onToggleFavorite={() => handleFavMealPrep(mealPrep.id)}
                />
              </div>

              <MealPrepSteps steps={mealPrep.steps} />
            </section>

            {/* Sidebar derecha (25%) */}
            <aside className="w-full lg:w-1/4 flex flex-col gap-6">
              <PortionSummary recipes={mealPrep.recipes} />
              <IngredientsList ingredients={mealPrep.ingredients} />
              <ObservationInfo observation={mealPrep.observation} />
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
    </>
  );
}
