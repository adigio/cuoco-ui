export const generateRecipes = async (informationRecipe) => {

  /*
    axios.post("http://localhost:3000/api/generate-recipes", {informationRecipe})
    .then(response => {
      console.log(response.data);
    }).catch
    (error => {
      console.log(error);
    });
  */

  const ingredients = informationRecipe.ingredients;

  return new Promise((resolve) => {
    setTimeout(() => {
      // Simular generador de recetas
      const ingredientNames = ingredients.map(ingredient => ingredient?.nombre?.toLowerCase());
      
      const possibleRecipes = [
        {
          id: 1,
          name: 'Fideos con salsa',
          ingredients: ['fideos', 'tomate', 'cebolla', 'ajo'],
          instructions: 'Hervir los fideos. Mientras, saltear cebolla y ajo. Añadir tomate y cocinar 10 minutos.',
          preparationTime: 25,
          difficulty: 'Fácil',
          image: 'https://placehold.co/600x400/orange/white?text=Fideos+con+salsa',
          subtitle: 'Una receta de cocina rápida y fácil para preparar los fideos con salsa y tomate.',
        },
        {
          id: 2,
          name: 'Ensalada de avena y yogur',
          ingredients: ['avena', 'yogur', 'miel', 'limón'],
          instructions: 'Mezclar la avena con el yogur. Añadir miel al gusto y unas gotas de limón.',
          preparationTime: 10,
          difficulty: 'Muy fácil',
          image: 'https://placehold.co/600x400/green/white?text=Ensalada+de+avena',
          subtitle: 'Una receta de cocina rápida y fácil para preparar la ensalada de avena y yogur.',
        },
        {
          id: 3,
          name: 'Queso gratinado con verduras',
          ingredients: ['queso', 'zanahoria', 'tomate', 'cebolla'],
          instructions: 'Cortar las verduras y colocar en una fuente. Cubrir con queso rallado y gratinar.',
          preparationTime: 30,
          difficulty: 'Media',
          image: 'https://placehold.co/600x400/yellow/white?text=Queso+gratinado',
          subtitle: 'Una receta de cocina rápida y fácil para preparar el queso gratinado con verduras.',
        },
        {
          id: 4,
          name: 'Batido de frutas con leche',
          ingredients: ['leche', 'banana', 'frutilla', 'miel'],
          instructions: 'Licuar todos los ingredientes hasta obtener una mezcla homogénea.',
          preparationTime: 5,
          difficulty: 'Muy fácil',
          image: 'https://placehold.co/600x400/pink/white?text=Batido+de+frutas',
          subtitle: 'Una receta de cocina rápida y fácil para preparar un batido de frutas con leche.',
        }
      ];
      
      // filtrar recetas segun los ingredientes disponibles, (si al menos 2 ingredientes esta disponibles)

      const filteredRecipes = possibleRecipes.filter(recipe => {
        const availableIngredients = recipe.ingredients.filter(
          ingredient => ingredientNames.includes(ingredient)
        );
        return availableIngredients.length >= 2;
      });
      
      if (filteredRecipes.length === 0) {
        resolve([possibleRecipes[0]]);
      } else {
        resolve(filteredRecipes);
      }
    }, 2000);
  });
};


export const getRecipeById = async (recipeId) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        id: recipeId,
        name: 'Receta #' + recipeId,
        ingredients: ['Ingrediente 1', 'Ingrediente 2', 'Ingrediente 3'],
        instructions: 'Pasos detallados para preparar la receta...',
        preparationTime: 30,
        difficulty: 'Media',
        image: `https://placehold.co/600x400/orange/white?text=Receta+${recipeId}`,
        subtitle: 'Una receta de cocina rápida y fácil para preparar el queso gratinado con verduras.',
      });
    }, 500);
  });
};
