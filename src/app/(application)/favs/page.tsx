"use client";

import { useEffect, useState } from "react";
import ChefLoader from "@/components/shared/loaders/ChefLoader";
import RecipeCard from "@/components/shared/cards/RecipeCard";
import MealPrepCard from "@/components/meal-prep/MealPrepCard";
import Pagination from "@/components/shared/Pagination";
import { getFavRecipes, getFavMealPreps } from "@/services/favsService";
import { MealPrep, Recipe } from "@/types";

export default function Favs() {
  const [loading, setLoading] = useState(true);

  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [recipesPage, setRecipesPage] = useState(1);
  const [recipesTotalPages, setRecipesTotalPages] = useState(1);

  const [mealPreps, setMealPreps] = useState([]);
  const [mealPrepsPage, setMealPrepsPage] = useState(1);
  const [mealPrepsTotalPages, setMealPrepsTotalPages] = useState(1);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const [recipesRes, mealPrepsRes] = await Promise.all([
          getFavRecipes(recipesPage),
          getFavMealPreps(mealPrepsPage),
        ]);

        setRecipes(recipesRes.data);
        setRecipesTotalPages(recipesRes.totalPages);

        setMealPreps(mealPrepsRes.data);
        setMealPrepsTotalPages(mealPrepsRes.totalPages);
      } catch (err) {
        console.error("Error al traer favoritos", err);
      } finally {
        setLoading(false);
      }
    };
    
    fetchData();
  }, [recipesPage, mealPrepsPage]);

  if (loading) return <ChefLoader text="Cargando tus favoritos..." />;

  return (
    <main className="pt-16 md:pt-8 px-4 max-w-5xl mx-auto flex flex-col gap-12">
      {/* Recetas favoritas */}
      <section>
        <h2 className="text-2xl font-semibold mb-4">Recetas Favoritas</h2>
        {recipes.length === 0 ? (
          <p className="text-gray-500">No tenés recetas favoritas todavía.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {recipes.map((recipe) => (
              <RecipeCard key={recipe.id} recipe={recipe} />
            ))}
          </div>
        )}
        {recipesTotalPages > 1 && (
          <Pagination
            currentPage={recipesPage}
            totalPages={recipesTotalPages}
            onPageChange={setRecipesPage}
          />
        )}
      </section>

      {/* MealPrep favoritos */}
      <section>
        <h2 className="text-2xl font-semibold mb-4">Meal Preps Favoritos</h2>
        {mealPreps.length === 0 ? (
          <p className="text-gray-500">
            No tenés meal preps guardados todavía.
          </p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {mealPreps.map((mp: MealPrep) => (
              <MealPrepCard key={mp.id} mealPrep={mp} onClick={() => {}} />
            ))}
          </div>
        )}
        {mealPrepsTotalPages > 1 && (
          <Pagination
            currentPage={mealPrepsPage}
            totalPages={mealPrepsTotalPages}
            onPageChange={setMealPrepsPage}
          />
        )}
      </section>
    </main>
  );
}
