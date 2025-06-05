"use client";

import { useEffect, useState } from "react";
import ChefLoader from "@/components/shared/loaders/ChefLoader";
import RecipeCard from "@/components/shared/cards/RecipeCard";
import MealPrepCard from "@/components/meal-prep/MealPrepCard";
import Pagination from "@/components/shared/Pagination";
import { getFavRecipes, getFavMealPreps } from "@/services/favsService";
import { Ingredient, MealPrep, Recipe } from "@/types";

export default function Favs() {
  const [loading, setLoading] = useState(true);

  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [recipesPage, setRecipesPage] = useState(1);
  const [recipesTotalPages, setRecipesTotalPages] = useState(1);
  const [mealPreps, setMealPreps] = useState([]);
  const [mealPrepsPage, setMealPrepsPage] = useState(1);
  const [mealPrepsTotalPages, setMealPrepsTotalPages] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchTermMealPrep, setSearchTermMealPrep] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const [recipesRes, mealPrepsRes] = await Promise.all([
          getFavRecipes(recipesPage),
          getFavMealPreps(mealPrepsPage),
        ]);

        // Asegurarse de que sea plano si viene anidado
        const recipesList = Array.isArray(recipesRes.data[0])
          ? recipesRes.data.flat()
          : recipesRes.data;

        const mealPrepsList = Array.isArray(mealPrepsRes.data[0])
          ? mealPrepsRes.data.flat()
          : mealPrepsRes.data;

        // Setear estados para mapear
        setRecipes(recipesList);
        setMealPreps(mealPrepsList);

        setRecipesTotalPages(recipesRes.totalPages);
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
  const filteredRecipes = recipes.filter((recipe: Recipe) => {
    const term = searchTerm.toLowerCase();
    return (
      recipe.name.toLowerCase().includes(term) ||
      recipe.instructions.some(instruction =>
        instruction.toLowerCase().includes(term)
      ) ||
      recipe.ingredients.some((ing: Ingredient) =>
        ing.name?.toLowerCase().includes(term)
      )
    );
  });
  const filteredMealPreps = mealPreps.filter((mp: MealPrep) => {
    const term = searchTermMealPrep.toLowerCase();
    return (
      mp.title?.toLowerCase().includes(term) ||
      mp.description?.toLowerCase().includes(term)
    );
  });

  return (
    <main className="pt-16 md:pt-8 px-4 max-w-5xl mx-auto flex flex-col gap-12">
      {/* Recetas favoritas */}
      <section>
        <h2 className="text-2xl font-semibold mb-4">Recetas Favoritas</h2>
        <input
          type="text"
          placeholder="Buscar por nombre, ingrediente o instrucción..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="mb-4 px-4 py-2 border rounded w-full"
        />
        {recipes.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredRecipes.map((recipe) => (
              <RecipeCard key={recipe.id} recipe={recipe} />
            ))}
          </div>
        ) : (
          <p className="text-gray-500">No tenés recetas favoritas aún.</p>
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
        <input
          type="text"
          placeholder="Buscar meal prep..."
          value={searchTermMealPrep}
          onChange={(e) => setSearchTermMealPrep(e.target.value)}
          className="mb-4 px-4 py-2 border rounded w-full"
        />
        {filteredMealPreps.length === 0 ? (
          <p className="text-gray-500">
            No se encontraron meal preps que coincidan.
          </p>
        ) : (
          <div className="grid grid-cols-1 gap-4">
            {filteredMealPreps.map((mp: MealPrep) => (
              <MealPrepCard key={mp.id} mealPrep={mp} onClick={() => { }} />
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
