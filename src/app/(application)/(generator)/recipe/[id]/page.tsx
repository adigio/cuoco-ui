"use client";

import React, { useEffect, useState, use } from 'react';
import { useRouter } from 'next/navigation';
import { getRecipeById } from '@/services/recipeService';
import BackgroundLayers from '@/components/shared/BackgroundLayers';
import ContainerShadow from '@/components/shared/containers/ContainerShadow';
import { PageProps } from '@/types';
import { RecipeDetail, RecipeDetailSection } from '@/types/recipe/recipe.types';
import { RecipeDetailSkeleton } from '@/components/shared/skeleton/RecipeDetailSkeleton';
import RecipeHeader from '@/components/recipe/Header';
import RecipeStepBlock from '@/components/recipe/StepBlock';
import RecipeSidebar from '@/components/recipe/Sidebar';

export default function RecipeDetailPage({ params }: PageProps) {
  const router = useRouter();
  const { id: recipeId } = use(params);
  const [recipe, setRecipe] = useState<RecipeDetail | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRecipe = async () => {
      try {
        const res = await getRecipeById(recipeId);
        if (res) {
          setRecipe(res);
        }
      } catch (error) {
        console.error("Error al obtener la receta:", error);
        setRecipe(null);
      } finally {
        setLoading(false);
      }
    };
    fetchRecipe();
  }, [recipeId]);

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
          <div className="flex flex-col lg:flex-row gap-8">
            <div className="w-full lg:w-3/4 flex flex-col gap-8">
              <section>
                {(recipe.stepBlocks ?? [])
                  .filter((block: RecipeDetailSection) => block.section === "Paso a paso")
                  .map((block: RecipeDetailSection, idx: number) => (
                    <RecipeStepBlock key={idx} {...block} />
                  ))}
              </section>
              <section>
                {(recipe.stepBlocks ?? [])
                  .filter((block: RecipeDetailSection) => block.section !== "Paso a paso")
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
    </>
  );
}