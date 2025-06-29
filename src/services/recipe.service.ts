import {
  ApiResponse,
  Recipe,
  RecipeDetail,
  RecipeGenerationRequest,
  RecipeResponse,
} from "@/types";
import apiClient from "@/lib/axios.config";
import { useRecipesStore } from '@/store/useRecipesStore';

const DEVELOPMENT_DELAY = process.env.NODE_ENV === "test" ? 0 : 2000;


const mapApiToRecipeDetail = (apiRecipe: any): RecipeDetail => {
  const getFavoriteStatus = () => {
    if (typeof window !== 'undefined') {
      try {
        const stored = localStorage.getItem('favoriteRecipes');
        if (stored) {
          const data = JSON.parse(stored);
          const favoriteIds = Array.isArray(data.state?.favoriteRecipeIds) 
            ? data.state.favoriteRecipeIds 
            : [];
          return favoriteIds.includes(apiRecipe.id);
        }
      } catch (error) {
        console.error('Error reading favorites:', error);
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
    isFavorite: getFavoriteStatus(), 
    stepBlocks: [
      {
        section: "Paso a paso",
        steps: (apiRecipe.steps || []).map((step: any) => ({
          number: step.step_number,
          title: step.title || "",
          description: step.description || "",
          image: step.image_name ? `/images/${step.image_name}` : undefined
        }))
      }
    ],
    ingredients: [
      {
        section: "",
        items: (apiRecipe.ingredients || []).map((ing: any) => {
          const quantity = ing.quantity || '';
          const symbol = ing.unit?.symbol || '';
          return {
            quantity: quantity && symbol ? `${quantity} ${symbol}` : quantity ? `${quantity}` : '',
            description: ing.name || "",
            have: false
          };
        })
      }
    ],
    missingIngredients: [],
    observation: apiRecipe.description || undefined
  };
};

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
      preparationTime: recipe.preparation_time?.description || recipe.preparationTime
    }));
    
    return mappedData[0];
  } catch (error) {
    throw error;
  }
};

export const getRecipeById = async (id: string, signal?: AbortSignal): Promise<RecipeDetail> => {
  try {
    const response = await apiClient.get(`/recipes/${id}`, {
      signal: signal
    });
    return mapApiToRecipeDetail(response.data);
  } catch (error) {
    throw error;
  }
};

