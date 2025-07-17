"use client";

import React from "react";
import { useRouter } from "next/navigation";
import BackgroundLayers from "@/components/shared/BackgroundLayers";
import ContainerShadow from "@/components/shared/containers/ContainerShadow";
import { PageProps } from "@/types";
import { RecipeDetailSection } from "@/types/recipe/recipe.types";
import { RecipeDetailSkeleton } from "@/components/shared/skeleton/RecipeDetailSkeleton";
import RecipeHeader from "@/components/recipe/Header";
import RecipeStepBlock from "@/components/recipe/StepBlock";
import RecipeSidebar from "@/components/recipe/Sidebar";
import { useRecipeGeneratorSession } from "@/hooks/useRecipeGeneratorSession";
import { useNotification } from "@/hooks/useNotification";
import { useRecipeDetail } from "@/hooks/useRecipeDetail";
import NotificationModal from "@/components/shared/modal/NotificationModal";
import RecipePDFDownload from "@/components/recipe/RecipePDFDownload";
import { useAuthStore } from "@/store/useAuthStore";
//import jsPDF from "jspdf";

export default function RecipeDetailPage({ params }: PageProps) {
  useRecipeGeneratorSession();

  const router = useRouter();
  const { id: recipeId } = React.use(params);
  const { recipe, loading } = useRecipeDetail(recipeId);
  const isPremium = useAuthStore((state) => state.user?.premium);
  const { message, additionalMessage, type, show, clearNotification } =
    useNotification();

  if (loading) {
    return <RecipeDetailSkeleton />;
  }
  if (!recipe) {
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
      <ContainerShadow customClass="container">
        <main>
          <RecipeHeader {...recipe} />

          {isPremium && <RecipePDFDownload recipe={recipe} />}

          <div className="flex flex-col lg:flex-row gap-8">
            <div className="w-full lg:w-3/4 flex flex-col gap-8">
              <section>
                {(recipe.stepBlocks ?? [])
                  .filter(
                    (block: RecipeDetailSection) =>
                      block.section === "Paso a paso"
                  )
                  .map((block: RecipeDetailSection, idx: number) => (
                    <RecipeStepBlock key={idx} {...block} />
                  ))}
              </section>
              <section>
                {(recipe.stepBlocks ?? [])
                  .filter(
                    (block: RecipeDetailSection) =>
                      block.section !== "Paso a paso"
                  )
                  .map((block: RecipeDetailSection, idx: number) => (
                    <RecipeStepBlock key={idx} {...block} />
                  ))}
              </section>
            </div>
            <RecipeSidebar
              ingredients={recipe.ingredients}
              missingIngredients={recipe.missingIngredients}
              recipeId={recipe.id}
              recipeTitle={recipe.name}
              isFavorite={recipe.isFavorite}
              mealTypes={recipe.mealTypes}
            />
          </div>
        </main>
      </ContainerShadow>

      <NotificationModal
        show={show}
        message={message || ""}
        additionalMessage={additionalMessage}
        type={type}
        onClose={clearNotification}
      />
    </>
  );
}
