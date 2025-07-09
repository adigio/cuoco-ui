import {
  ApiResponse,
  Recipe,
  RecipeDetail,
  RecipeGenerationRequest,
  RecipeResponse,
} from "@/types";
import apiClient from "@/lib/axios.config";
import { useRecipesStore } from "@/store/useRecipesStore";

const DEVELOPMENT_DELAY = process.env.NODE_ENV === "test" ? 0 : 2000;

const mapApiToRecipeDetail = (apiRecipe: any): RecipeDetail => {
  const getFavoriteStatus = () => {
    if (typeof window !== "undefined") {
      try {
        const stored = localStorage.getItem("favoriteRecipes");
        if (stored) {
          const data = JSON.parse(stored);
          const favoriteIds = Array.isArray(data.state?.favoriteRecipeIds)
            ? data.state.favoriteRecipeIds
            : [];
          return favoriteIds.includes(apiRecipe.id);
        }
      } catch (error) {
        console.error("Error reading favorites:", error);
      }
    }
    return false;
  };

  return {
    id: apiRecipe.id,
    name: apiRecipe.name || "Receta sin nombre",
    subtitle: apiRecipe.subtitle || "",
    time: apiRecipe.preparation_time?.description || "",
    servings: 1,
    difficulty: apiRecipe.cook_level?.description || "Media",
    isFavorite: apiRecipe.favorite,
    // Mapear mealTypes desde la respuesta del API, con fallback a todos los tipos
    mealTypes: apiRecipe.meal_types 
      ? apiRecipe.meal_types.map((mt: any) => {
          if (mt.id) return mt.id;
          if (mt.meal_type_id) return mt.meal_type_id;
          
          if (mt.description) {
            const descriptionToId: Record<string, number> = {
              'Desayuno': 1,
              'Almuerzo': 2,
              'Merienda': 3,
              'Cena': 4
            };
            return descriptionToId[mt.description] || 1;
          }
          
          return 1;
        })
      : [1, 2, 3, 4], // Fallback: permitir en todos los slots (Desayuno, Almuerzo, Merienda, Cena)
    stepBlocks: [
      {
        section: "Paso a paso",
        steps: (apiRecipe.steps || []).map((step: any) => ({
          number: step.step_number,
          title: step.title || "",
          description: step.description || "",
          image: step.image_name ? `/images/${step.image_name}` : undefined,
        })),
      },
    ],
    ingredients: [
      {
        section: "",
        items: (apiRecipe.ingredients || []).map((ing: any) => {
          const quantity = ing.quantity || "";
          const symbol = ing.unit?.symbol || "";
          return {
            quantity:
              quantity && symbol
                ? `${quantity} ${symbol}`
                : quantity
                ? `${quantity}`
                : "",
            description: ing.name || "",
            have: false,
          };
        }),
      },
    ],
    missingIngredients: [],
    observation: apiRecipe.description || undefined,
  };
};

export const generateRecipes = async (
  informationRecipe: RecipeGenerationRequest
) => {
  try {
    const response = await apiClient.post("/recipes", informationRecipe);

    const mappedData = response.data.map((recipe: any) => ({
      ...recipe,
      preparationTime:
        recipe.preparation_time?.description || recipe.preparationTime,
    }));

    return mappedData;
  } catch (error) {
    throw error;
  }
};

export const refreshRecipe = async (
  informationRecipe: RecipeGenerationRequest
) => {
  try {
    const response = await apiClient.post("/recipes", informationRecipe);

    const mappedData = response.data.map((recipe: any) => ({
      ...recipe,
      preparationTime:
        recipe.preparation_time?.description || recipe.preparationTime,
    }));

    return mappedData[0];
  } catch (error) {
    throw error;
  }
};


export const getRecipeById = async (
  id: string,
  signal?: AbortSignal
): Promise<RecipeDetail> => {
  try {
    const response = await apiClient.get(`/recipes/${id}`, {
      signal: signal,
    });
    return mapApiToRecipeDetail(response.data);
  } catch (error) {
    throw error;
  }
};
export const getRandomRecipes = async (size: number) => {
  try {
    const response = await apiClient.get("/recipes/random", {
      params: { size }
    }); 
    const mappedData = (response.data || []).map((recipe: any) => ({
      ...recipe,
      time: recipe.preparation_time?.description || recipe.preparationTime
      
    }));

    return mappedData;
  } catch (error) {
    throw error;
  }
};

export const getFastRecipe = async (recipeName: string): Promise<RecipeDetail> => {
  try {
    const response = await apiClient.get("/recipes", {
      params: {
        name: recipeName.trim()
      }
    });
    
    return mapApiToRecipeDetail(response.data);
  } catch (error) {
    throw error;
  }
};

