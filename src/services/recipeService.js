import axios from "axios";

export const generateRecipes = async (informationRecipe) => {
  try {    
    const response = await axios.post('/api/generate-recipes', 
      { informationRecipe },
      {
        headers: {
          'Content-Type': 'application/json'
        }
      }
    );
    return response.data;
  } catch (error) {
    //TODO: mostrar alert? 
  }
};



export const getRecipeById = async (id) => { 
  try {    
    const response = await axios.get(`/api/recipe/${id}`,  
      {
        headers: {
          'Content-Type': 'application/json'
        }
      }
    );
    return response.data;
  } catch (error) {
    //TODO: mostrar alert? 
  }
};


