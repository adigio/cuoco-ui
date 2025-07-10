import { ReactNode } from 'react';
import { Recipe, RecipeDetail, RecipeDetailIngredientGroup, RecipeDetailMissingIngredient, RecipeDetailSection } from './recipe.types';
import { Ingredient } from '../ingredient/ingredient.types';

export interface RecipeCardProps {
  recipe: Recipe | RecipeDetail;
  customClass?: string;
  children?: ReactNode;
  colorFont?: string;
}

export interface RecipeIngredientListProps {
  ingredients: Ingredient[];
  setIngredients?: React.Dispatch<React.SetStateAction<Ingredient[]>>;
  enabledDelete?: boolean;
  onIngredientRemove?: (index: number) => void;
  className?: string;
}

export interface RecipeImageUploaderProps {
  images: File[];
  setImages: React.Dispatch<React.SetStateAction<File[]>>;
  ingredients: Ingredient[];
  addIngredient: (name: string, origin?: string, confirm?: boolean) => boolean;
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