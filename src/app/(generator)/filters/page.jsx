// pages/filtros.js
"use client";
import RecipeFilters from "@/components/recipe-generator/RecipeFilters";
import Footer from "@/components/landing/Footer";
import NavbarHome from "@/components/navbars/NavbarHome";

export default function FiltrosPage() {

  const handleFiltrar = (filtros) => {
    console.log("Filtros aplicados:", filtros);
    // Acá podés aplicar los filtros a una búsqueda o API
  };
  return (
    <div className="flex flex-col min-h-screen bg-[#fefefe]">
      <NavbarHome />
      <main className="flex-1 px-6 py-10">
        <div className="container mx-auto bg-white p-6 rounded-2xl shadow-md">
         
          <RecipeFilters />
        </div>
      </main>
      <Footer />
    </div>
  );
}
