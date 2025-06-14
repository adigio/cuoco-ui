"use client";

import React, { useEffect, useState, use } from "react";
import { useRouter } from "next/navigation";
import { getMealPrepById } from "@/services/generateMealPrepRecipes.service";
import ChefLoader from "@/components/shared/loaders/ChefLoader";
import BackgroundLayers from "@/components/shared/BackgroundLayers";
import ContainerShadow from "@/components/shared/containers/ContainerShadow";
import { MealPrep, PageProps } from "@/types";
import RecipeTags from "@/components/meal-prep/RecipeTags";
import MealPrepSteps from "@/components/meal-prep/MealPrepSteps";
import ObservationInfo from "@/components/meal-prep/ObservationInfo";
import IngredientsList from "@/components/meal-prep/IngredientList";
import PortionSummary from "@/components/meal-prep/PortionSummary";
import TimeAndFavorite from "@/components/shared/TimeAndFavorite";
import { FavoriteModal } from "@/components/shared/modal/FavoriteModal";
import Button from "@/components/shared/form/Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft, faPlus } from "@fortawesome/free-solid-svg-icons";

export default function MealPrepPage({ params }: PageProps) {
  const router = useRouter();
  const { id: mealPrepId } = use(params);
  const [mealPrep, setmealPrep] = useState<MealPrep | null>(null);
  const [loading, setLoading] = useState(true);
  const [showFavoriteModal, setShowFavoriteModal] = useState(false);

  useEffect(() => {
    const fetchMeal = async () => {
      try {
        const idMealPrep = Number(mealPrepId);
        const res = await getMealPrepById(idMealPrep);

        if (res) {
          setmealPrep(res);
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
    setShowFavoriteModal(true);
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
                <h2 className="text-2xl font-bold text-[#333]">{mealPrep.title}</h2>

                {/* Tiempo + favorito */}
                <TimeAndFavorite
                  minutes={mealPrep.estimatedCookingTime}
                  onToggleFavorite={() => handleFavMealPrep(mealPrep.id)}
                />
              </div>
              <h3 className="mx-4 mb-2 text-xl font-bold text-[#333]">Paso a paso</h3>

              <MealPrepSteps steps={mealPrep.steps} />
            </section>

            {/* Sidebar derecha (25%) */}
            <aside className="w-full lg:w-1/4 flex flex-col gap-6">
              <PortionSummary recipes={mealPrep.recipes} />
              <IngredientsList ingredients={mealPrep.ingredients} />
              {mealPrep.observation && <ObservationInfo observation={mealPrep.observation} />}

              <div className="">
                <Button>
                  <FontAwesomeIcon className="w-4 h-4 mr-2" icon={faPlus} />
                  Agregar a Planificación semanal
                </Button>
              </div>

            </aside>
          </div>
        </ContainerShadow>
      </main>

      <FavoriteModal
        type="meal-prep"
        recipeId={mealPrep.id}
        recipeText={mealPrep.title}
        isOpen={showFavoriteModal}
        onClose={() => setShowFavoriteModal(false)}
        onUpgrade={() => { }} // No hace falta porque al ser premium no se mostrará nunca el modal
      />
    </>
  );
}
