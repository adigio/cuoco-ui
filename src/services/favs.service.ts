import apiClient from "@/lib/axios.config";
import axios from "axios";

export const getFavRecipes = async (page = 1) => {
  const res = await apiClient.get(`/users/recipes`);
  const mappedRecipes = res?.data.map((recipe: any) => {  
    return {
      id: recipe.id,
    name: recipe.name,
    subtitle: recipe.subtitle,
    description: recipe.description,
    image: recipe.image,
    };
  });

  return {
    data: mappedRecipes,
    currentPage: 1,
    totalPages: 1
  };
};

export const getFavMealPreps = async (page = 1) => {
  const res = await axios.get(`/api/fav/mealpreps?page=${page}`);
  return {
    data: res.data.data,
    currentPage: res.data.currentPage,
    totalPages: res.data.totalPages
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
        console.error("Error al agregar receta a favoritos:", error);
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
        console.error("Error al eliminar receta de favoritos:", error);
        throw new Error("Error al eliminar la receta de favoritos");
    }
  }
};
