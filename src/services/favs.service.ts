import apiClient from "@/lib/axios.config";
import axios from "axios";

export const getFavRecipes = async (page = 1) => {
  console.log("apiClient",apiClient)
  const res = await apiClient.get(`/users/recipes`);
  console.log("RES res",res?.data)
  const mappedRecipes = res?.data.map((recipe: any) => {  
    return {
      id: recipe.id,
      ...recipe?.recipe,
      image: 'https://dev.cuoco.com/api/' + recipe?.recipe?.image,
    }
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
