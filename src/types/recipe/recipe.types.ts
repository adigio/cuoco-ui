import { Ingredient } from '../ingredient/ingredient.types';

export interface Filters {
  time: string;
  difficulty: string;
  types: string[];
  diet: string;
  people: number;
  useProfilePreferences: boolean;
}

export interface Recipe {
  id: number;
  name: string;
  description?: string;
  subtitle?: string;
  ingredients: Ingredient[];
  instructions: string[];
  preparationTime: number;
  cookingTime?: string;
  servings?: number;
  difficulty: string;
  diet?: string;
  people?: number;
  profilePreferences?: boolean;
  types?: string[];
  imageUrl?: string;
  image?: string;
  missingIngredients?: string[];
  tags?: string[];
  createdAt?: Date;
  updatedAt?: Date;
}

export interface RecipeFormData {
  name: string;
  description: string;
  ingredients: Ingredient[];
  instructions: string[];
  preparationTime: number;
  servings: number;
  difficulty: string;
  images?: File[];
  tags?: string[];
}

export interface RecipeGenerationRequest {
  ingredients: string[];
  filters: {
    time: string;
    difficulty: string;
    diet: string;
    people: number;
    useProfilePreferences: boolean;
    types: string[];
  }
}

export interface RecipeResponse {
  recipes: Recipe[];
} 

export interface PageProps {
  params: Promise<{ id: string }>;
}