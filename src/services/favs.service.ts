import axios from "axios";

export const getFavRecipes = async (page = 1) => {
  const res = await axios.get(`/api/fav/recipes?page=${page}`);
  return {
    data: res.data.data,
    currentPage: res.data.currentPage,
    totalPages: res.data.totalPages
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
