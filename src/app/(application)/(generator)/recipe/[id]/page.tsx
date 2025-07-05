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
import jsPDF from "jspdf";

export default function RecipeDetailPage({ params }: PageProps) {
  useRecipeGeneratorSession();

  const router = useRouter();
  const { id: recipeId } = React.use(params); // ✅ correcto en Next.js 14+
  const { recipe, loading } = useRecipeDetail(recipeId);
  const { message, additionalMessage, type, show, clearNotification } =
    useNotification();

  const handleDownloadPDF = () => {
    if (!recipe) return;

    const doc = new jsPDF();
    let y = 20;
    doc.setFillColor(250, 128, 114);
    doc.rect(0, 0, 210, 297, "F"); // A4 completo
    // Título principal
    doc.setFontSize(18);
    doc.setTextColor(83, 37, 219);
    doc.text(recipe.name, 10, y);
    y += 10;

    // Ingredientes
    doc.setFontSize(14);
    doc.setTextColor(0, 0, 0);
    doc.text("Ingredientes", 10, y);
    y += 8;

    recipe.ingredients.forEach((group) => {
      // Sección (si tiene)
      if (group.section && group.section.trim()) {
        doc.setFontSize(12);
        doc.setTextColor(100);
        doc.text(group.section, 105, y, { align: "center" });
        doc.setDrawColor(200);
        doc.line(10, y + 2, 200, y + 2);
        y += 8;
      }

      group.items.forEach((item) => {
        doc.setFontSize(11);
        doc.setTextColor(0, 0, 0);

        const quantity = item.quantity || "";
        const description = item.description || "";

        // Cantidad alineada a la derecha
        doc.text(quantity, 40, y, { align: "right" });

        // Descripción alineada a la izquierda
        doc.text(description, 45, y);

        y += 7;

        if (y > 280) {
          doc.addPage();
          y = 20;
        }
      });

      y += 5; // espacio entre grupos
    });

    doc.save(`ingredientes_${recipe.name}.pdf`);
  };

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

          <div className="flex justify-end mb-4">
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
