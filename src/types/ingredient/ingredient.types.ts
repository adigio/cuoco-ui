export interface Ingredient {
  name: string;
  quantity: number;
  unit: string;
  symbol?: string;
  optional: boolean;
  source: string;
  confirmed: boolean;
}
export interface IngredientRequest {
  name :string;
  quantity:number;
  unit_id:number;
}

export interface IngredientFormData {
    name: string;
    origin: string;
}

type Mode = 'meal-prep' | 'cook-now' | null;
export interface IngredientsStore {
  ingredients: Ingredient[];
  mode: string | null;
  generatorSessionActive: boolean;
  setMode: (mode: string | null) => void;
  startGeneratorSession: () => void;
  endGeneratorSession: () => void;
  clearIngredientsIfNeeded: (currentPath: string) => void;
  addIngredient: (
    name: string,
    quantity: number,
    unit: string,
    symbol?:string,
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