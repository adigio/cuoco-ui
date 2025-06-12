"use client";

import RecipeFilters from "@/components/recipe-generator/RecipeFilters";
import ContainerShadow from "@/components/shared/containers/ContainerShadow";
import BackgroundLayers from "@/components/shared/BackgroundLayers";

export default function FiltrosPage() {

  return (
    <>
      <BackgroundLayers />
      
      <div className="w-full border-b-4 border-purple-400 mb-6"></div>
      
      <main className="flex-1 relative">
        <ContainerShadow customClass={"container"}>
          <RecipeFilters />
        </ContainerShadow>
      </main>
    </>
  );
}
