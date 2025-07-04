import { mealPreps } from "@/mocks/mealprep";
import { MealPrep, MealPrepGenerationRequest, MealPrepRequest, MealPrepResponse } from "@/types";
import { ApiResponse, Recipe } from "@/types";
import axios from "axios";
import apiClient from "@/lib/axios.config";

export const generateMealPrepRecipes = async (requestData: MealPrepRequest): Promise<MealPrepResponse> => {

  try {
    // Simulación de delay para desarrollo
    await new Promise(resolve => setTimeout(resolve, 2000));

    const response = await apiClient.post('/meal-preps', 
      requestData,
      {
        headers: {
          'Content-Type': 'application/json'
        }
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error al generar Meal Prep:", error);
    throw error;
  }
  
};
export const getMealPrepById = async (id: number) => { 
  try {
    // Simulación de delay para mostrar el loader (solo para desarrollo)
    await new Promise(resolve => setTimeout(resolve, 1500));
        
    const response: ApiResponse<MealPrep>  = await apiClient.get(`/meal-preps/${id}`,  
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