export interface Ingredient {
    name: string;
    origin: string;
    confirm: boolean;
}

export interface IngredientFormData {
    name: string;
    origin: string;
}

type Mode = 'meal-prep' | 'cook-now' | null;
export type IngredientsStore = {
    ingredients: Ingredient[];
     mode: Mode;
    setMode: (mode: Mode) => void;
    addIngredient: (name: string, origin?: string, confirm?: boolean) => boolean;
    removeIngredient: (idx: number) => void;
    updateIngredient: (idx: number, updated: Partial<Ingredient>) => void;
    confirmIngredient: (idx: number) => void;
    addMultipleIngredients: (newIngredients: Ingredient[]) => number;
    clearIngredients: () => void;
};