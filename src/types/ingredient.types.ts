
export type Ingredient = {
    name: string;
    origin: string;
    confirm: boolean;
};

export type IngredientsStore = {
    ingredients: Ingredient[];
    addIngredient: (name: string, origin?: string, confirm?: boolean) => boolean;
    removeIngredient: (idx: number) => void;
    updateIngredient: (idx: number, updated: Partial<Ingredient>) => void;
    confirmIngredient: (idx: number) => void;
    addMultipleIngredients: (newIngredients: Ingredient[]) => number;
    clearIngredients: () => void;
};