import { ApiResponse, Recipe, RecipeDetail, RecipeGenerationRequest, RecipeResponse } from "@/types";
import axios from "axios";

const DEVELOPMENT_DELAY = process.env.NODE_ENV === 'test' ? 0 : 2000;

export const generateRecipes = async (informationRecipe: RecipeGenerationRequest) => {
  try {    
    // Simulación de delay solo en desarrollo
    if (DEVELOPMENT_DELAY > 0) {
      await new Promise(resolve => setTimeout(resolve, DEVELOPMENT_DELAY));
    }
    
    const response = await axios.post('/api/generate-recipes', 
      { informationRecipe },
      {
        headers: {
          'Content-Type': 'application/json'
        }
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error al generar recetas:", error);
    // Propagamos el error para que pueda ser manejado por el componente
    throw error;
  }
};

export const getRecipeById = async (id: string) => { 
  try {
    // Simulación de delay solo en desarrollo
    if (DEVELOPMENT_DELAY > 0) {
      await new Promise(resolve => setTimeout(resolve, DEVELOPMENT_DELAY));
    }
        
    const response: ApiResponse<RecipeDetail>  = await axios.get(`/api/recipe/${id}`,  
      {
        headers: {
          'Content-Type': 'application/json'
        }
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error al obtener receta:", error);
    // Propagamos el error para que pueda ser manejado por el componente
    throw error;
  }
};


