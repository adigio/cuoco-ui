import { mealPreps } from "@/mocks/mealprep";
import { MealPrep, MealPrepGenerationRequest, MealPrepRequest, MealPrepResponse } from "@/types";
import { ApiResponse, Recipe } from "@/types";
import axios from "axios";
import apiClient from "@/lib/axios.config";

export const generateMealPrepRecipes = async (requestData: MealPrepRequest): Promise<MealPrepResponse> => {

  try {
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
    throw error;
  }
  
};
export const refreshMealPrep = async (
  informationRecipe: MealPrepRequest
): Promise<MealPrep> => {
  try {
    const response = await apiClient.post("/meal-preps", informationRecipe);
    

    const mappedData = response.data.map((mealPrep: any) => {
      
      const mapped = {
        id: mealPrep.id,
        title: mealPrep.title,
        estimated_cooking_time: mealPrep.estimated_cooking_time,
        totalPortions: mealPrep.servings || 4,
        ingredients: mealPrep.ingredients || [],
        observation: mealPrep.observation,
        description: mealPrep.description,
        recipes: mealPrep.recipes || [],
        steps: mealPrep.steps || [],
        isFavorite: mealPrep.favorite || false,
        preparationTime:
          mealPrep.preparation_time?.description || mealPrep.preparationTime,
      };
      
      return mapped;
    });

    return mappedData[0];
  } catch (error) {
    throw error;
  }
};
export const getMealPrepById = async (id: number) => { 
  try {
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
    throw error;
  }
};