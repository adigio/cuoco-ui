"use client";

import { useEffect, useState } from "react";
import ChefLoader from "@/components/shared/loaders/ChefLoader";
import RecipeCard from "@/components/shared/cards/RecipeCard";
import MealPrepCard from "@/components/meal-prep/MealPrepCard";
import Pagination from "@/components/shared/Pagination";
import UnfavoriteModal from "@/components/shared/modal/UnfavoriteModal";
import NotificationModal from "@/components/shared/modal/NotificationModal";
import { getFavRecipes, getFavMealPreps } from "@/services/favs.service";
import { MealPrep, Recipe } from "@/types";
import BackgroundLayers from "@/components/shared/BackgroundLayers";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeartCircleXmark } from "@fortawesome/free-solid-svg-icons";
import { useNotification } from "@/hooks/useNotification";
import { useRecipeGeneratorSession } from "@/hooks/useRecipeGeneratorSession";

export default function Favs() {
  useRecipeGeneratorSession();
  const [loading, setLoading] = useState(true);
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [mealPreps, setMealPreps] = useState<MealPrep[]>([]);

  const [recipesPage, setRecipesPage] = useState(1);
  const [mealPrepsPage, setMealPrepsPage] = useState(1);

  const [searchTerm, setSearchTerm] = useState("");
  const [searchTermMealPrep, setSearchTermMealPrep] = useState("");

  const [showRecipes, setShowRecipes] = useState(true);
  const [showMealPreps, setShowMealPreps] = useState(true);

  const [showUnfavoriteModal, setShowUnfavoriteModal] = useState(false);
  const [selectedToRemove, setSelectedToRemove] = useState<{
    id: number;
    name: string;
    type: "recipe" | "meal-prep";
  } | null>(null);

  const {
    message,
    additionalMessage,
    type,
    show,
    showSuccess,
    showError,
    clearNotification,
  } = useNotification();

  const recipesPageSize = 3;
  const mealPrepsPageSize = 1;

  const fetchFavorites = async () => {
    setLoading(true);
    try {
      const [recipesRes, mealPrepsRes] = await Promise.all([
        getFavRecipes(),
        getFavMealPreps(),
      ]);

      const recipesList = Array.isArray(recipesRes)
        ? recipesRes.flat()
        : recipesRes.data;

      setRecipes(recipesList || []);
      setMealPreps(mealPrepsRes.data || []);
    } catch (err) {
      console.error("Error al traer favoritos", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFavorites();
  }, []);

  const handleRemove = (
    id: number,
    name: string,
    type: "recipe" | "meal-prep"
  ) => {
    setSelectedToRemove({ id, name, type });
    setShowUnfavoriteModal(true);
  };

  const handleUnfavoriteSuccess = () => {
    fetchFavorites();
    setSelectedToRemove(null);
  };

  if (loading) return <ChefLoader text="Cargando tus favoritos..." />;

  // Filtrado y paginado recipes
  const filteredRecipes = recipes.filter((recipe: Recipe) => {
    if (!searchTerm.trim()) return true;
    const term = searchTerm.toLowerCase();
    return (
      recipe?.name?.toLowerCase().includes(term) ||
      recipe?.subtitle?.toLowerCase().includes(term)
    );
  });

  const recipesTotalPages = Math.ceil(filteredRecipes.length / recipesPageSize);
  const paginatedRecipes = filteredRecipes.slice(
    (recipesPage - 1) * recipesPageSize,
    recipesPage * recipesPageSize
  );

  // Filtrado y paginado meal preps
  const filteredMealPreps = mealPreps.filter((mp: MealPrep) => {
    const term = searchTermMealPrep.toLowerCase();
    return (
      mp.title?.toLowerCase().includes(term) ||
      mp.description?.toLowerCase().includes(term)
    );
  });

  const mealPrepsTotalPages = Math.ceil(
    filteredMealPreps.length / mealPrepsPageSize
  );
  const paginatedMealPreps = filteredMealPreps.slice(
    (mealPrepsPage - 1) * mealPrepsPageSize,
    mealPrepsPage * mealPrepsPageSize
  );

  return (
    <>
      <main className="pt-16 md:pt-8 px-4 max-w-5xl mx-auto flex flex-col gap-12">
        <BackgroundLayers />

        {/* Recetas favoritas */}
        <section>
          <button
            onClick={() => setShowRecipes(!showRecipes)}
            className="text-2xl font-semibold mb-2 flex justify-between w-full items-center"
          >
            Recetas Favoritas ({recipes.length})
            <span className="text-sm text-gray-600">
              {showRecipes ? "▲" : "▼"}
            </span>
          </button>

          {showRecipes && (
            <>
              <input
                type="text"
                placeholder="Buscar por nombre, ingrediente o instrucción..."
                value={searchTerm}
                onChange={(e) => {
                  setSearchTerm(e.target.value);
                  setRecipesPage(1);
                }}
                className="mb-4 px-4 py-2 border rounded w-full"
              />

              {paginatedRecipes.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {paginatedRecipes.map((recipe) => (
                    <div key={recipe.id} className="relative">
                      <RecipeCard recipe={recipe}>
                        <div className="relative w-full h-full">
                          {/* Botón de eliminar favorito, fijo en la esquina inferior derecha */}
                          <button
                            onClick={() =>
                              handleRemove(recipe.id, recipe.name, "recipe")
                            }
                            className="absolute bottom-3 right-3 w-10 h-10 flex items-center justify-center text-white background-color-primary hover:bg-red-800 rounded-full shadow-md transition"
                            title="Eliminar de favoritos"
                          >
                            <FontAwesomeIcon
                              icon={faHeartCircleXmark}
                              className="w-5 h-5"
                            />
                          </button>
                        </div>
                      </RecipeCard>
                    </div>
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
            </>
          )}
        </section>

        {/* Meal preps favoritos */}
       <section className="mb-20">
          <button
            onClick={() => setShowMealPreps(!showMealPreps)}
            className="text-2xl font-semibold mb-2 flex justify-between w-full items-center"
          >
            Meal Preps Favoritos ({mealPreps.length})
            <span className="text-sm text-gray-600">
              {showMealPreps ? "▲" : "▼"}
            </span>
          </button>

          {showMealPreps && (
            <>
              <input
                type="text"
                placeholder="Buscar meal prep..."
                value={searchTermMealPrep}
                onChange={(e) => {
                  setSearchTermMealPrep(e.target.value);
                  setMealPrepsPage(1);
                }}
                className="mb-4 px-4 py-2 border rounded w-full"
              />

              {paginatedMealPreps.length > 0 ? (
                <div className="grid grid-cols-1 gap-4">
                  {paginatedMealPreps.map((mp) => (
                    <div key={mp.id} className="relative">
                      <MealPrepCard mealPrep={mp}>
                        <div className="relative w-full h-full">
                          <button
                            onClick={() =>
                              handleRemove(mp.id, mp.title, "meal-prep")
                            }
                            className="absolute bottom-3 right-3 w-10 h-10 flex items-center justify-center text-white background-color-primary hover:bg-red-800 rounded-full shadow-md transition"
                            title="Eliminar de favoritos"
                          >
                            <FontAwesomeIcon
                              icon={faHeartCircleXmark}
                              className="w-5 h-5 transition-transform duration-200 ease-in-out hover:scale-110"
                            />
                          </button>
                        </div>
                      </MealPrepCard>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-gray-500">
                  No se encontraron meal preps que coincidan.
                </p>
              )}

              {mealPrepsTotalPages > 1 && (
                <Pagination
                  currentPage={mealPrepsPage}
                  totalPages={mealPrepsTotalPages}
                  onPageChange={setMealPrepsPage}
                />
              )}
            </>
          )}
        </section>
      </main>

      {selectedToRemove && (
        <UnfavoriteModal
          isOpen={showUnfavoriteModal}
          onClose={() => {
            setShowUnfavoriteModal(false);
            setSelectedToRemove(null);
          }}
          onUnfavoriteSuccess={handleUnfavoriteSuccess}
          recipeId={selectedToRemove.id}
          recipeText={selectedToRemove.name}
          type={selectedToRemove.type}
          showSuccess={showSuccess}
          showError={showError}
        />
      )}

      <NotificationModal
        show={show}
        onClose={clearNotification}
        message={message}
        additionalMessage={additionalMessage}
        type={type}
      />
    </>
  );
}
