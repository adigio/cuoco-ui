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
    
    const mappedData = response.data.map((recipe: any) => ({
      ...recipe,
      preparationTime: recipe.preparation_time?.description || recipe.preparationTime
    }));
    
    return mappedData;
  } catch (error) {
    console.error("Error al generar recetas:", error);
    throw error;
  }
};

export const getRecipeById = async (id: string) => {
  try {
    const response = await apiClient.get(`/recipes/${id}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};
