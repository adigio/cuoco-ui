import '@testing-library/jest-dom';

// Mock del servicio de recetas
jest.mock('@/services/recipeService', () => {
  const originalModule = jest.requireActual('@/services/recipeService');
  return {
    ...originalModule,
    generateRecipes: jest.fn().mockImplementation(async (...args: any[]) => {
      const response = await originalModule.generateRecipes.call(null, ...args);
      return response;
    }),
    getRecipeById: jest.fn().mockImplementation(async (...args: any[]) => {
      const response = await originalModule.getRecipeById.call(null, ...args);
      return response;
    })
  };
});

// Configuración global para tests
beforeAll(() => {
  // Configurar variables de entorno para tests
  process.env.NEXT_PUBLIC_API_URL = 'http://localhost:3000';
});

// Limpiar todos los mocks después de cada test
afterEach(() => {
  jest.clearAllMocks();
}); 