import '@testing-library/jest-dom';

// Configurar el ambiente de test
process.env.NODE_ENV = 'test';

// Desactivar los delays simulados durante los tests
jest.mock('@/services/recipeService', () => {
  const originalModule = jest.requireActual('@/services/recipeService');
  return {
    ...originalModule,
    generateRecipes: async (...args: any[]) => {
      // Omitir el delay en tests
      const response = await originalModule.generateRecipes(...args);
      return response;
    },
    getRecipeById: async (...args: any[]) => {
      // Omitir el delay en tests
      const response = await originalModule.getRecipeById(...args);
      return response;
    }
  };
});

// Limpiar todos los mocks después de cada test
afterEach(() => {
  jest.clearAllMocks();
}); 