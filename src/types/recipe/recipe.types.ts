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

// Tipos de la API
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

export interface RecipeResponse {
  recipes: Recipe[];
}

export interface RecipeDetailStep {
  number: number;
  title?: string;
  description: string;
  image?: string;
}

export interface RecipeDetailSection {
  section: string;
  steps: RecipeDetailStep[];
}

export interface RecipeDetailIngredient {
  quantity: string;
  description: string;
  have: boolean;
}

export interface RecipeDetailIngredientGroup {
  section: string;
  items: RecipeDetailIngredient[];
}

export interface RecipeDetailMissingIngredient {
  quantity: string;
  description: string;
}

export interface RecipeDetail {
  id: number;
  name: string;
  subtitle: string;
  time: number;
  servings: number;
  difficulty: string;
  isFavorite: boolean;
  stepBlocks: RecipeDetailSection[];
  ingredients: RecipeDetailIngredientGroup[];
  missingIngredients: RecipeDetailMissingIngredient[];
  observation?: string;
}

// Tipos para formularios y requests
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
  ingredients: {
    name: string;
    quantity: number;
    unit_id: number;
  }[];
  filters: {
    preparation_time_id: number;
    servings: number;
    cook_level_id: number;
    type_ids: number[];
    diet_id: number;
    allergies_ids: number[];
    dietary_needs_ids: number[];
  };
  configuration?: {
    size?: number;
    not_include?: number[];
  };
}


export interface PageProps {
  params: Promise<{ id: string }>;
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

export interface MealPrepRecipe {
  id: string;
  title: string;
  image: string;
  portions?: number;
}

export interface MealPrep {
  id: number;
  title: string;
  estimatedCookingTime: number;
  totalPortions: number;
  ingredients: string[];
  observation?: string;
  description?: string;
  recipes: MealPrepRecipe[];
  steps: {
    title: string;
    instructions: string[];
    estimatedTime: number;
  }[];
}

export type MealPrepResponse = MealPrep[];
