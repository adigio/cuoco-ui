// src/test/core/__tests__/service/recipeService.test.ts

import { generateRecipes, getRecipeById } from '@/services/recipe.service';
import { mockRecipes } from '@/mocks/recipes';
import axios from 'axios';

// Mock de axios
jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe('Recipe Service', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    // Silenciamos los console.error en los tests
    jest.spyOn(console, 'error').mockImplementation(() => {});
  });

  describe('generateRecipes', () => {
    const validRequest = {
      ingredients: ['tomate', 'cebolla'],
      filters: {
        time: 'menos de 15 minutos',
        difficulty: 'fácil',
        diet: 'vegetariana',
        people: 2,
        useProfilePreferences: false,
        types: ['Almuerzo']
      }
    };

    it('debería llamar a la API con los parámetros correctos', async () => {
      mockedAxios.post.mockResolvedValueOnce({
        data: { recipes: mockRecipes }
      });

      await generateRecipes(validRequest);

      expect(mockedAxios.post).toHaveBeenCalledWith(
        '/api/generate-recipes',
        { informationRecipe: validRequest },
        {
          headers: {
            'Content-Type': 'application/json'
          }
        }
      );
    });

    it('debería retornar las recetas cuando la API responde exitosamente', async () => {
      const expectedRecipes = mockRecipes.slice(0, 2);
      mockedAxios.post.mockResolvedValueOnce({
        data: expectedRecipes
      });

      const result = await generateRecipes(validRequest);

      expect(result).toEqual(expectedRecipes);
    });

    it('debería propagar el error cuando la API falla', async () => {
      const errorMessage = 'Error en la generación de recetas';
      mockedAxios.post.mockRejectedValueOnce(new Error(errorMessage));

      await expect(generateRecipes(validRequest))
        .rejects
        .toThrow(errorMessage);
    });
  });

  describe('getRecipeById', () => {
    const recipeId = '1';
    const mockRecipe = mockRecipes[0];

    it('debería llamar a la API con el ID correcto', async () => {
      mockedAxios.get.mockResolvedValueOnce({
        data: mockRecipe
      });

      await getRecipeById(recipeId);

      expect(mockedAxios.get).toHaveBeenCalledWith(
        `/api/recipe/${recipeId}`,
        {
          headers: {
            'Content-Type': 'application/json'
          }
        }
      );
    });

    it('debería retornar la receta cuando la API responde exitosamente', async () => {
      mockedAxios.get.mockResolvedValueOnce({
        data: mockRecipe
      });

      const result = await getRecipeById(recipeId);

      expect(result).toEqual(mockRecipe);
    });

    it('debería propagar el error cuando la receta no existe y llamar a console.error', async () => {
      const error = new Error('Receta no encontrada');
      mockedAxios.get.mockRejectedValueOnce(error);

      await expect(getRecipeById(recipeId))
        .rejects
        .toThrow('Receta no encontrada');

      expect(console.error).toHaveBeenCalledWith(
        'Error al obtener receta:',
        error
      );
    });
  });
});
