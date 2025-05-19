"use client";

import RecipeFilters from "@/components/recipe-generator/RecipeFilters";

export default function FiltrosPage() {

  const handleFiltrar = (filtros) => {
    console.log("Filtros aplicados:", filtros);
    // Acá podés aplicar los filtros a una búsqueda o API
  };

  return (
    <main className="flex-1 px-6 py-10">
      <div className="container mx-auto bg-white p-6 rounded-2xl shadow-md">
        <RecipeFilters />
      </div>
    </main>
  );
}
