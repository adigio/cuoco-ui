
export type Ingredient = {
    nombre: string;
    fuente: string;
    confirmado: boolean;
};

export type IngredientsStore = {
    ingredients: Ingredient[];
    addIngredient: (nombre: string, fuente?: string, confirmado?: boolean) => boolean;
    removeIngredient: (idx: number) => void;
    updateIngredient: (idx: number, updated: Partial<Ingredient>) => void;
    confirmIngredient: (idx: number) => void;
    addMultipleIngredients: (newIngredients: Ingredient[]) => number;
    clearIngredients: () => void;
};