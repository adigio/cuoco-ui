export interface Ingredient {
  name: string;
  origin: string;
  confirm: boolean;
}

export interface IngredientReviewTableProps {
  ingrdients: Ingredient[];
  onConfirm: (index: number) => void;
  onEdit: (index: number) => void;
  onDelete: (index: number) => void;
} 