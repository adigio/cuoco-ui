import { Recipe, RecipeGenerationRequest } from "@/types/recipe/recipe.types";

// Response de API generales
export type ApiResponse<T> = {
  data?: T;
  error?: boolean;
  status: number;
}

// API de recetas
export type GenerateRecipesRequestBody = {
  informationRecipe: RecipeGenerationRequest;
}

export type GenerateRecipesResponse = {
  recipes: Recipe[];
}

export type GetRecipeByIdResponse = {
  recipe: Recipe;
} 

export type GetMealPrepByIdResponse = {
  recipe: Recipe;
} 