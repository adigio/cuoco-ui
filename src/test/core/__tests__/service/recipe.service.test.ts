import { generateRecipes, getRecipeById } from "@/services/recipe.service";
import { mockRecipes } from "@/mocks/recipes";

// Mocks de apiClient
jest.mock("@/lib/axios.config", () => ({
  __esModule: true,
  default: {
    post: jest.fn(),
    get: jest.fn(),
    interceptors: {
      request: { use: jest.fn() },
      response: { use: jest.fn() },
    },
  },
}));

import apiClient from "@/lib/axios.config";
const mockedApiClient = apiClient as jest.Mocked<typeof apiClient>;

describe("Recipe Service", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe("generateRecipes", () => {
    const validRequest = {
      ingredients: [
        { name: "tomate", quantity: 1, unit_id: 1 },
        { name: "cebolla", quantity: 2, unit_id: 1 },
      ],
      filters: {
        servings: 2,
        cook_level_id: 1,
        type_ids: [1],
        diet_id: 2,
        allergies_ids: [],
        dietary_needs_ids: [],
        preparation_time_id: 3,
      },
    };

    it("debería llamar a la API con los parámetros correctos", async () => {
      mockedApiClient.post.mockResolvedValueOnce({ data: mockRecipes });

      await generateRecipes(validRequest);

      expect(mockedApiClient.post).toHaveBeenCalledWith(
        "/recipes",
        validRequest
      );
    });

    it("debería retornar las recetas cuando la API responde exitosamente", async () => {
      mockedApiClient.post.mockResolvedValueOnce({ data: mockRecipes });

      const result = await generateRecipes(validRequest);

      const mappedData = mockRecipes.map((recipe) => ({
        ...recipe,
        preparationTime:
          (recipe as any).preparation_time?.description ||
          recipe.preparationTime,
      }));

      expect(result).toEqual(mappedData);
    });

    it("debería propagar el error cuando la API falla", async () => {
      const error = new Error("Error en la generación de recetas");
      mockedApiClient.post.mockRejectedValueOnce(error);

      await expect(generateRecipes(validRequest)).rejects.toThrow(
        "Error en la generación de recetas"
      );
    });
  });

  describe("getRecipeById", () => {
    const recipeId = "1";
    const mockRecipe = mockRecipes[0];

    it("debería llamar a la API con el ID correcto", async () => {
      mockedApiClient.get.mockResolvedValueOnce({ data: mockRecipe });

      await getRecipeById(recipeId);

      expect(mockedApiClient.get).toHaveBeenCalledWith(`/recipes/${recipeId}`, {
        signal: undefined,
      });
    });

    it("debería retornar la receta cuando la API responde exitosamente", async () => {
      mockedApiClient.get.mockResolvedValueOnce({ data: mockRecipe });

      const result = await getRecipeById(recipeId);

      expect(result.id).toBe(mockRecipe.id);
    });

    it("debería propagar el error cuando la receta no existe", async () => {
      const error = new Error("Receta no encontrada");
      mockedApiClient.get.mockRejectedValueOnce(error);

      await expect(getRecipeById(recipeId)).rejects.toThrow(
        "Receta no encontrada"
      );
    });
  });
});
