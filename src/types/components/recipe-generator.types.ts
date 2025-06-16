import { ReactNode } from 'react';
import { Ingredient } from '../ingredient/ingredient.types';

export interface RecipeImageUploaderProps {
  images: File[];
  setImages: React.Dispatch<React.SetStateAction<File[]>>;
  ingredients: Ingredient[];
  addIngredient: (
  name: string,
  quantity: number,
  unit: string,
  optional?: boolean,
  source?: string,
  confirmed?: boolean
) => boolean;
}

export interface RecipeIngredientListProps {
  ingredients: Ingredient[];
  setIngredients?: React.Dispatch<React.SetStateAction<Ingredient[]>>;
  enabledDelete?: boolean;
}

export interface IngredientReviewTableProps {
  ingredients: Ingredient[];
  onConfirm: (index: number) => void;
  onEdit: (index: number) => void;
  onDelete: (index: number) => void;
}
export interface RecipeCardProps {
  recipe: {
    id: number;
    name: string;
    image?: string;
    subtitle?: string;
  };
  customClass?: string;
  children?: ReactNode;
  colorFont?: string;
}