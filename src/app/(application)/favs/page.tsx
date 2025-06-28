"use client";

import { useEffect, useState } from "react";
import ChefLoader from "@/components/shared/loaders/ChefLoader";
import RecipeCard from "@/components/shared/cards/RecipeCard";
import MealPrepCard from "@/components/meal-prep/MealPrepCard";
import Pagination from "@/components/shared/Pagination";
import UnfavoriteModal from "@/components/shared/modal/UnfavoriteModal";
import NotificationModal from "@/components/shared/modal/NotificationModal";
import { getFavRecipes, getFavMealPreps } from "@/services/favs.service";
import { Ingredient, MealPrep, Recipe } from "@/types";
import BackgroundLayers from "@/components/shared/BackgroundLayers";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeartCircleXmark } from "@fortawesome/free-solid-svg-icons";
import { useNotification } from "@/hooks/useNotification";

export default function Favs() {
  const [loading, setLoading] = useState(true);

  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [recipesPage, setRecipesPage] = useState(1);
  const [recipesTotalPages, setRecipesTotalPages] = useState(1);
  const [mealPreps, setMealPreps] = useState<MealPrep[]>([]);
  const [mealPrepsPage, setMealPrepsPage] = useState(1);
  const [mealPrepsTotalPages, setMealPrepsTotalPages] = useState(1);

  const [searchTerm, setSearchTerm] = useState("");
  const [searchTermMealPrep, setSearchTermMealPrep] = useState("");

  const [showRecipes, setShowRecipes] = useState(false);
  const [showMealPreps, setShowMealPreps] = useState(false);

  // Estados para el modal de eliminar
  const [showUnfavoriteModal, setShowUnfavoriteModal] = useState(false);
  const [selectedRecipeToRemove, setSelectedRecipeToRemove] = useState<{
    id: number;
    name: string;
  } | null>(null);

  // Hook de notificaciones
  const {
    message,
    additionalMessage,
    type,
    show,
    clearNotification
  } = useNotification();

  const fetchRecipes = async () => {
    setLoading(true);
    try {
      const [recipesRes, mealPrepsRes = [{ data: [] }]] = await Promise.all([
        getFavRecipes(recipesPage),
        //getFavMealPreps(mealPrepsPage),
      ]);
      console.log("recipe res", recipesRes)
      const recipesList = Array.isArray(recipesRes)
        ? recipesRes.data.flat()
        : recipesRes.data;

      // const mealPrepsList = Array.isArray(mealPrepsRes.data[0])
      //   ? mealPrepsRes.data.flat()
      //   : mealPrepsRes.data;

      setRecipes(recipesList);
      //setMealPreps(mealPrepsList);
      // setRecipesTotalPages(recipesRes.totalPages);
      // setMealPrepsTotalPages(mealPrepsRes.totalPages);
    } catch (err) {
      console.error("Error al traer favoritos", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRecipes();
  }, [recipesPage]);

  const handleRemoveFromFavorites = (recipeId: number, recipeName: string) => {
    setSelectedRecipeToRemove({ id: recipeId, name: recipeName });
    setShowUnfavoriteModal(true);
  };

  const handleUnfavoriteSuccess = () => {
    fetchRecipes();
    setSelectedRecipeToRemove(null);
  };

  if (loading) return <ChefLoader text="Cargando tus favoritos..." />;

  const filteredRecipes = recipes.filter((recipe: Recipe) => {
    if (!searchTerm.trim()) return true;

    const term = searchTerm.toLowerCase();

    return (
      recipe?.name?.toLowerCase().includes(term) ||
      recipe?.subtitle?.toLowerCase().includes(term)
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
                onChange={(e) => setSearchTerm(e.target.value)}
                className="mb-4 px-4 py-2 border rounded w-full"
              />
              {filteredRecipes.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {filteredRecipes.map((recipe) => (
                    <div key={recipe.id} className="relative">
                      <RecipeCard key={recipe.id} recipe={recipe}>
                        <div className="w-full flex justify-end items-end">
                          <button
                            onClick={() => handleRemoveFromFavorites(recipe.id, recipe.name)}
                            className="w-10 text-3xl bg-red-900 hover:bg-red-900 text-white p-1 px-3 rounded-full shadow-md transition-colors"
                            title="Eliminar de favoritos"
                          >
                            <FontAwesomeIcon icon={faHeartCircleXmark} className="w-5 h-5" />
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

        {/* Meal Prep favoritos */}
        <section>
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
            </>
          )}
        </section>
      </main>



      {/* Modal para desfavorear */}
      {selectedRecipeToRemove && (
        <UnfavoriteModal
          isOpen={showUnfavoriteModal}
          onClose={() => {
            setShowUnfavoriteModal(false);
            setSelectedRecipeToRemove(null);
          }}
          onUnfavoriteSuccess={handleUnfavoriteSuccess}
          recipeId={selectedRecipeToRemove.id}
          recipeName={selectedRecipeToRemove.name}
        />
      )}

      {/* Modal de notificaciones */}
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
