import { Ingredient } from '../ingredient/ingredient.types';

export interface RecipeImageUploaderProps {
  images: File[];
  setImages: React.Dispatch<React.SetStateAction<File[]>>;
  ingredients: Ingredient[];
  addIngredient: (name: string, origin?: string, confirm?: boolean) => boolean;
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