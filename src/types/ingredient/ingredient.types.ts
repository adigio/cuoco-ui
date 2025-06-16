export interface Ingredient {
  name: string;
  quantity: number;
  unit: string;
  optional: boolean;
  source: string;
  confirmed: boolean;
}

export interface IngredientFormData {
    name: string;
    origin: string;
}

type Mode = 'meal-prep' | 'cook-now' | null;
export interface IngredientsStore {
  ingredients: Ingredient[];
  mode: string | null;
  setMode: (mode: string | null) => void;
  addIngredient: (
    name: string,
    quantity: number,
    unit: string,
    optional?: boolean,
    source?: string,
    confirmed?: boolean
  ) => boolean;
  removeIngredient: (idx: number) => void;
  updateIngredient: (idx: number, updated: Partial<Ingredient>) => void;
  confirmIngredient: (idx: number) => void;
  addMultipleIngredients: (ingredients: Ingredient[]) => number;
  clearIngredients: () => void;
}