export type Recipe = {
    id: number;
    name: string;
    subtitle: string;
    image: string;
    missingIngredients: string[]; // cambiar a object porque vamos a recibir objectos con la cantidad faltante..
    instructions: string[]; // cambiar a obbject cuando definamos bien la estructura 
    ingredients: string[];
    preparationTime: string;
    cookingTime: string;
    difficulty: string;
    diet: string;
    people: number;
    profilePreferences: boolean;
    types: string[];
}


export type RecipeGenerationRequest = {
    ingredients: string[];
    filters: {
        time: string;
        difficulty: string;
        diet: string;
        people: number;
        useProfilePreferences: boolean;
        types: string[];
    }
}

export type RecipeResponse = {
    recipes: Recipe[];
}


