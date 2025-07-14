import { serverBaseUrl } from '@/lib/config';

export const buildRecipeImageUrl = (recipeId: number | string, imageName: string = 'main.png'): string => {
  return `${serverBaseUrl}/images/recipe/${recipeId}/${imageName}`;
};

export const getRecipeImageUrl = (
  recipe: { id: number | string; image?: string }, 
  fallbackImage: string = '/others/default-recipe.png'
): string => {
  if (!recipe.image) {
    return fallbackImage;
  }
  
  if (recipe.image.startsWith('http') || recipe.image.startsWith('//')) {
    return recipe.image;
  }
  
  // Si es "main", agregar ".png"
  let imageName = recipe.image;
  if (recipe.image === 'main') {
    imageName = 'main.png';
  }
  
  // Construir la URL del servidor
  return new URL(buildRecipeImageUrl(recipe.id, imageName)).toString();
}; 