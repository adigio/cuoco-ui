import { MealPrepStep } from '../recipe/recipe.types';

export interface MealPrepStepsProps {
  steps: MealPrepStep[];
}

export interface MealPrepRecipeTag {
  name: string;
  difficulty: string;
  people: number;
  time: number;
}

export interface RecipeTagsProps {
  recipe: MealPrepRecipeTag;
}

export interface StorageInfoProps {
  title: string;
  content: string;
  className?: string;
}

export interface PortionSummaryProps {
  portions: number;
  totalIngredients: number;
  totalTime: number;
}

export interface MealPrepCardProps {
  id: number;
  title: string;
  description: string;
  image: string;
  difficulty: string;
  time: number;
  people: number;
  className?: string;
}

export interface MealPrepIngredientsListProps {
  ingredients: any[];
  portionsSelected: number;
}

export interface MealPrepPDFDownloadProps {
  mealPrepId: number;
  mealPrepName: string;
  className?: string;
} 