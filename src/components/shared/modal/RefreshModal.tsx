import { UpgradePlan } from "@/components/shared/cards/UpgradePlan";
import Button from "@/components/shared/form/Button";
import Modal from "@/components/shared/modal/Modal";
import { useState } from "react";
import { useRecipesStore } from "@/store/useRecipesStore";
import { useRecipeFiltersStore } from "@/store/useRecipeFiltersStore";
import { useIngredientsStore } from "@/store/useIngredientsStore";
import { refreshRecipe } from "@/services/recipe.service";
import { refreshMealPrep } from "@/services/generateMealPrepRecipes.service";
import { RecipeGenerationRequest } from "@/types";
import { useAuthStore } from "@/store/useAuthStore";
import { useMealPrepStore } from "@/store/useMealPrepStore";
import { useMealPrepFiltersStore } from "@/store/useMealPrepFiltersStore";

export const RefreshModal = ({
  type = "recipe",
  recipeText,
  isOpen,
  onClose,
  onUpgrade,
  recipeId,
  showSuccess,
  showError,
}: {
  type?: "recipe" | "meal-prep";
  recipeText: string;
  isOpen: boolean;
  onClose: () => void;
  onUpgrade: () => void;
  recipeId: number;
  onRefreshSuccess?: () => void;
  showSuccess: (message: string, additionalMessage?: string) => void;
  showError: (message: string, additionalMessage?: string) => void;
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const { filters } = useRecipeFiltersStore();
 const { filters: mealPrepFilters } = useMealPrepFiltersStore();

  const { ingredients } = useIngredientsStore();
  const { filteredRecipes, replaceRecipe: replaceRecipeInStore } =
    useRecipesStore();
  const { filteredMealPrep, replaceMealPrep: replaceMealPrepInStore } =
    useMealPrepStore();
  const isPremium = useAuthStore((state) => state.user?.premium);

  const handleRefresh = async (type: "recipe" | "meal-prep") => {
    try {
      setIsLoading(true);

      const currentIds = filteredRecipes.map((r) => r.id);

      const ingredientList = ingredients
        .filter((ing) => ing.confirmed)
        .map((ingredient) => ({
          name: ingredient.name,
          quantity: ingredient.quantity,
          unit_id: Number(ingredient.unit),
        }));

      let refreshRequest: any;

      if (type === "recipe") {
        refreshRequest = {
          ingredients: ingredientList,
          filters: {
            preparation_time_id:
              !filters.time || filters.time === ""
                ? null
                : Number(filters.time),
            servings: filters.people,
            cook_level_id: Number(filters.difficulty),
            type_ids: filters.types.map((t) => Number(t)),
            diet_id:
              !filters.diet || filters.diet === ""
                ? null
                : Number(filters.diet),
            allergies_ids: filters.allergies_ids,
            dietary_needs_ids: filters.dietary_needs_ids,
          },
          configuration: {
            size: 1,
            not_include: currentIds,
          },
        };
      } else if (type === "meal-prep") {
        refreshRequest = {
          ingredients: ingredientList,
          filters: {
            preparation_time_id:
              !mealPrepFilters.time || mealPrepFilters.time === ""
                ? null
                : Number(mealPrepFilters.time),
            servings: mealPrepFilters.people,
            cook_level_id: Number(mealPrepFilters.difficulty),
            type_ids: mealPrepFilters.types.map((t) => Number(t)),
            diet_id:
              !mealPrepFilters.diet || mealPrepFilters.diet === ""
                ? null
                : Number(mealPrepFilters.diet),
            allergies_ids: mealPrepFilters.allergies_ids,
            dietary_needs_ids: mealPrepFilters.dietary_needs_ids,
            freeze: mealPrepFilters.freeze, // solo si lo tenés en tu filtro, opcional
          },
        };
      }

      let newItem;
      if (type === "recipe") {
        newItem = await refreshRecipe(refreshRequest);
      } else if (type === "meal-prep") {

        newItem = await refreshMealPrep(refreshRequest);
      }

      if (newItem) {
        if (type === "recipe") {
          replaceRecipeInStore(recipeId, newItem);
          showSuccess(
            "Receta refrescada exitosamente",
            `Se generó una nueva receta: "${newItem.name}"`
          );
        } else if (type === "meal-prep") {
          replaceMealPrepInStore(recipeId, newItem);
          showSuccess(
            "Meal prep refrescado exitosamente",
            `Se generó un nuevo meal prep: "${newItem.name}"`
          );
        }
        onClose();
      } else {
        showError(
          `No se pudo obtener un nuevo ${
            type === "recipe" ? "receta" : "meal prep"
          }`,
          "Intenta nuevamente en unos momentos"
        );
      }
    } catch (error) {
      showError(
        `Error al refrescar ${
          type === "recipe" ? "la receta" : "el meal prep"
        }`,
        "Ocurrió un problema al generar un nuevo ítem. Intenta nuevamente."
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} showCloseButton>
      {!isPremium ? (
        <UpgradePlan
          title="Para desbloquear esta funcionalidad, actualiza tu plan"
          onUpgradeClick={onUpgrade}
        />
      ) : (
        <div className="p-6">
          <h2 className="text-xl font-bold mb-4">
            Refrescar Receta <span className="block">{recipeText}</span>
          </h2>
          <p className="mb-6">
            ¿Quieres refrescar{" "}
            {type === "recipe" ? "esta receta" : "este Meal Prep"} para obtener
            otra mejor opción?
          </p>
          <div className="flex justify-end gap-4">
            <Button
              variant="primary"
              onClick={() => handleRefresh(type)}
              disabled={isLoading}
            >
              {isLoading ? "Refrescando..." : "Refrescar"}
            </Button>
          </div>
        </div>
      )}
    </Modal>
  );
};
