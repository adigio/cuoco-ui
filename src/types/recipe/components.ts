import { ReactNode } from 'react';
import { Recipe, RecipeDetail, RecipeDetailIngredientGroup, RecipeDetailMissingIngredient, RecipeDetailSection } from './recipe.types';
import { Ingredient } from '../ingredient/ingredient.types';

export interface RecipeCardProps {
  recipe: Recipe | RecipeDetail;
  customClass?: string;
  children?: ReactNode;
  colorFont?: string;
}







export interface RecipeHeaderProps extends RecipeDetail {}

export interface RecipeStepBlockProps {
  section: string;
  steps: RecipeDetailSection[];
}

export interface RecipeIngredientsProps {
  ingredients: RecipeDetailIngredientGroup[];
}

export interface RecipeMissingIngredientsProps {
  missing: RecipeDetailMissingIngredient[];
}

export interface RecipeSidebarProps {
  ingredients: RecipeDetailIngredientGroup[];
  missingIngredients: RecipeDetailMissingIngredient[];
  recipeId?: number;
  recipeTitle?: string;
  isFavorite?: boolean;
  mealType?: number;
  mealTypes?: number[];
}

export interface RecipePDFDownloadProps {
  recipe: RecipeDetail;
} 