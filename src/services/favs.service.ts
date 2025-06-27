import apiClient from "@/lib/axios.config";
import axios from "axios";

export const getFavRecipes = async (page = 1) => {
  const res = await apiClient.get(`/users/recipes`);
  const mappedRecipes = res?.data.map((recipe: any) => {  
    return {
      id: recipe.id,
      ...recipe?.recipe,
      image: recipe?.recipe?.image,
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
