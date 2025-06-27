import { serverBaseUrl } from '@/lib/config';

export const buildRecipeImageUrl = (recipeId: number | string, imageName: string = 'main.png'): string => {
  return `${serverBaseUrl}/images/recipe/${recipeId}/${imageName}`;
};

export const getRecipeImageUrl = (
  recipe: { id: number | string; image?: string }, 
  fallbackImage: string = '/default-recipe.png'
): string => {
  if (recipe.image && (recipe.image.startsWith('http') || recipe.image.startsWith('//'))) {
    return recipe.image;
  }
  
  if (recipe.image || recipe.id) {
    return buildRecipeImageUrl(recipe.id);
  }
  
  return fallbackImage;
}; 