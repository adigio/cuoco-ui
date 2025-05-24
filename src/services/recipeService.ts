import { ApiResponse, Recipe, RecipeGenerationRequest } from "@/types";
import axios from "axios";

export const generateRecipes = async (informationRecipe: RecipeGenerationRequest) => {
  try {    
    // Simulación de delay para mostrar el loader (solo para desarrollo)
    await new Promise(resolve => setTimeout(resolve, 2000));
    
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
    // Simulación de delay para mostrar el loader (solo para desarrollo)
    await new Promise(resolve => setTimeout(resolve, 1500));
        
    const response: ApiResponse<Recipe>  = await axios.get(`/api/recipe/${id}`,  
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


