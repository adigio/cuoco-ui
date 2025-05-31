import { Ingredient } from "../ingredient/ingredient.types";

export interface Filters {
  time: string;
  difficulty: string;
  types: string[];
  diet: string;
  people: number;
  useProfilePreferences: boolean;
}
export interface FiltersMealprep {
  difficulty: string; // Ej: "fácil", "media", "difícil"
  types: string[]; // Ej: ["Desayuno", "Almuerzo"]
  diet: string; // Ej: "sin gluten", "vegana"
  useProfilePreferences: boolean; // Si se deben tener en cuenta preferencias
  days: number; // Cantidad de días del meal prep
  freezerAvailable: boolean; // Si hay freezer para conservar comida
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
  };
}
export interface MealPrepGenerationRequest {
  ingredients: string[];
  filters: {
    difficulty: string; // Ej: "fácil", "media", "difícil"
    types: string[]; // Ej: ["Desayuno", "Almuerzo"]
    diet: string; // Ej: "sin gluten", "vegana"
    useProfilePreferences: boolean; // Si se deben tener en cuenta preferencias
    days: number; // Cantidad de días del meal prep
    freezerAvailable: boolean; // Si hay freezer para conservar comida
  };
} 

export interface MealPrep {
  id: string;
  title: string;
  estimatedCookingTime: number;
  totalPortions: number;

  recipes: {
    id: string;
    title: string;
    image: string;
  }[];

  steps: {
    title: string;
    instructions: string[];
    estimatedTime: number;
  }[];
}


export type MealPrepResponse = MealPrep[];

export interface RecipeResponse {
  recipes: Recipe[];
}

export interface PageProps {
  params: Promise<{ id: string }>;
}
