export interface Ingredient {
    name: string;
    origin: string;
    confirm: boolean;
}

export interface IngredientFormData {
    name: string;
    origin: string;
}

export type IngredientsStore = {
    ingredients: Ingredient[];
    addIngredient: (name: string, origin?: string, confirm?: boolean) => boolean;
    removeIngredient: (idx: number) => void;
    updateIngredient: (idx: number, updated: Partial<Ingredient>) => void;
    confirmIngredient: (idx: number) => void;
    addMultipleIngredients: (newIngredients: Ingredient[]) => number;
    clearIngredients: () => void;
};