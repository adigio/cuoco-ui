import { ReactNode } from 'react';
import { MealPrepStep, MealPrepRecipe, MealPrep } from '../recipe/recipe.types';

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



export interface MealPrepIngredientsListProps {
  ingredients: any[];
  portionsSelected: number;
}

export interface MealPrepPDFDownloadProps {
  mealPrepId: number;
  mealPrepName: string;
  className?: string;
}

export interface IngredientsListProps {
  ingredients: {
    name: string;
    quantity: number;
    unit: {
      symbol: string;
    };
  }[];
}

export interface ObservationInfoProps {
  observation: string;
}

export interface MealPrepRecipeInfo {
  id: string;
  name: string;
}

export interface MealPrepRecipeTagsProps {
  recipes: MealPrepRecipeInfo[];
}

export interface MealPrepPortionSummaryProps {
  recipes: MealPrepRecipe[];
}

export interface MealPrepCardProps {
  mealPrep: MealPrep;
  onClick?: () => void;
  children?: ReactNode;
} 