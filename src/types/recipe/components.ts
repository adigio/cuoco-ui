import { ReactNode } from 'react';
import { Recipe } from './recipe.types';
import { Ingredient } from '../ingredient/ingredient.types';

export interface RecipeCardProps {
  recipe: Recipe;
  customClass?: string;
  children?: ReactNode;
  colorFont?: string;
}

export interface RecipeIngredientListProps {
  ingredients: Ingredient[];
  setIngredients?: React.Dispatch<React.SetStateAction<Ingredient[]>>;
  enabledDelete?: boolean;
}

export interface RecipeImageUploaderProps {
  images: File[];
  setImages: React.Dispatch<React.SetStateAction<File[]>>;
  ingredients: Ingredient[];
  addIngredient: (name: string, origin?: string, confirm?: boolean) => boolean;
}

export interface IngredientReviewTableProps {
  ingredientes: Ingredient[];
  onConfirm: (index: number) => void;
  onEdit: (index: number) => void;
  onDelete: (index: number) => void;
} 