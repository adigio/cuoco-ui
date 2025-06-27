import {
  ApiResponse,
  Recipe,
  RecipeDetail,
  RecipeGenerationRequest,
  RecipeResponse,
} from "@/types";
import apiClient from "@/lib/axios.config";

const DEVELOPMENT_DELAY = process.env.NODE_ENV === "test" ? 0 : 2000;

export const generateRecipes = async (
  informationRecipe: RecipeGenerationRequest
) => {
  try {
    const response = await apiClient.post("/recipes", informationRecipe);
    return response.data;
  } catch (error) {
    console.error("Error al generar recetas:", error);
    throw error;
  }
};

export const getRecipeById = async (id: string) => {
  try {
    if (DEVELOPMENT_DELAY > 0) {
      await new Promise((resolve) => setTimeout(resolve, DEVELOPMENT_DELAY));
    }

    const response = await apiClient.get(`/recipes/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error al obtener receta:", error);
    throw error;
  }
};

export const addRecipeToFavorites = async (recipeId: number) => {
  try {
    const response = await apiClient.post(`/users/recipes/${recipeId}`);
    return response.data; // Debería retornar true si es exitoso
  } catch (error) {
    console.error("Error al agregar receta a favoritos:", error);
    throw error;
  }
};
