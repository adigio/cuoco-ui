import apiClient from "@/lib/axios.config";
import { 
  MEAL_TYPES,
  MealType
} from '@/types';


const getRandomMealType = (): MealType => MEAL_TYPES[Math.floor(Math.random() * MEAL_TYPES.length)];

export const getFavRecipes = async (page = 1) => {
  const res = await apiClient.get(`/users/recipes`);
  const mappedRecipes = res?.data.map((recipe: any) => {  
    return {
      id: recipe.id,
      name: recipe.name,
      subtitle: recipe.subtitle,
      description: recipe.description,
      image: recipe.image,
      mealType: recipe.meal_types?.map((mealType: any) => mealType.description),
    };
  });

  return {
    data: mappedRecipes 
  };
};

export const getFavMealPreps = async (page = 1) => {
  const res = await apiClient.get(`/users/meal-preps`); 
  return {
    data: res.data 
  };
};

export const addRecipeToFavorites = async (recipeId: number) => {
  try {
    const response = await apiClient.post(`/users/recipes/${recipeId}`);
    return { success: true, data: response.data };
  } catch (error: any) {
    const status = error?.response?.status;
    const message = error?.response?.data?.message || "Error desconocido";
    
    switch (status) {
      case 404:
        throw new Error("La receta no fue encontrada");
      case 409:
        throw new Error("Esta receta ya está en tus favoritos");
      case 503:
        throw new Error("Servicio no disponible temporalmente");
      default:
        throw new Error("Error al agregar la receta a favoritos");
    }
  }
};

export const removeRecipeFromFavorites = async (recipeId: number) => {
  try {
    const response = await apiClient.delete(`/users/recipes/${recipeId}`);
    return { success: true, data: response.data };
  } catch (error: any) {
    const status = error?.response?.status;
    const message = error?.response?.data?.message || "Error desconocido";
    
    switch (status) {
      case 404:
        throw new Error("La receta no fue encontrada en tus favoritos");
      case 503:
        throw new Error("Servicio no disponible temporalmente");
      default:
        throw new Error("Error al eliminar la receta de favoritos");
    }
  }
};
export const addMealPrepToFavorites = async (mealPrepId: number) => {
  try {
    const response = await apiClient.post(`/users/meal-preps/${mealPrepId}`);
    return { success: true, data: response.data };
  } catch (error: any) {
    const status = error?.response?.status;
    const message = error?.response?.data?.message || "Error desconocido";

    switch (status) {
      case 404:
        throw new Error("El meal prep no fue encontrado");
      case 409:
        throw new Error("Este meal prep ya está en tus favoritos");
      case 503:
        throw new Error("Servicio no disponible temporalmente");
      default:
        throw new Error("Error al agregar el meal prep a favoritos");
    }
  }
};
export const removeMealPrepFromFavorites = async (mealPrepId: number) => {
  try {
    const response = await apiClient.delete(`/users/meal-preps/${mealPrepId}`);
    return { success: true, data: response.data };
  } catch (error: any) {
    const status = error?.response?.status;
    const message = error?.response?.data?.message || "Error desconocido";

    switch (status) {
      case 404:
        throw new Error("El meal prep no fue encontrado en tus favoritos");
      case 503:
        throw new Error("Servicio no disponible temporalmente");
      default:
        throw new Error("Error al eliminar el meal prep de favoritos");
    }
  }
};
