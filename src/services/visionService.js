import axios from "axios";

const AVAILABLE_INGREDIENTS = [
  'Arroz', 'Fideos', 'Avena', 'Quinoa', 'Lentejas', 'Garbanzos', 'Frijoles', 
  'Tomate', 'Cebolla', 'Ajo', 'Zanahoria', 'Pimiento', 'Espinaca', 'Lechuga',
  'Papa', 'Batata', 'Calabaza', 'Berenjena', 'Zapallo', 'Brócoli', 'Coliflor',
  'Manzana', 'Naranja', 'Banana', 'Limón', 'Frutilla', 'Kiwi', 'Durazno',
  'Leche', 'Yogur', 'Queso', 'Crema', 'Huevos', 'Manteca', 'Aceite',
  'Harina', 'Azúcar', 'Sal', 'Pimienta', 'Orégano', 'Albahaca', 'Canela',
  'Pollo', 'Carne', 'Pescado', 'Cerdo', 'Jamón', 'Salchicha', 'Tocino'
];

/**
 * Mock local para simular el análisis de imágenes
 */
/*
export const mockAnalyzeImages = async (images) => {
  return new Promise((resolve, reject) => {
    const processingTime = 800 + (images.length * 200);

    setTimeout(() => {
      try {
        if (!images || images.length === 0) {
          resolve([]);
          return;
        }

        let allIngredients = [];

        images.forEach((image) => {
          const ingredientCount = Math.floor(Math.random() * 3) + 1;
          const selectedIngredients = [];

          while (selectedIngredients.length < ingredientCount) {
            const index = Math.floor(Math.random() * AVAILABLE_INGREDIENTS.length);
            const ingredient = AVAILABLE_INGREDIENTS[index];

            if (!selectedIngredients.includes(ingredient)) {
              selectedIngredients.push(ingredient);
            }
          }

          allIngredients = [...allIngredients, ...selectedIngredients];
        });

        const uniqueIngredients = [...new Set(allIngredients)];

        const detectedIngredients = uniqueIngredients.map(ingredient => ({
          nombre: ingredient,
          fuente: 'imagen',
          confirmado: false
        }));

        10% de chance de error
        if (Math.random() < 0.1) {
          reject(new Error('Error procesando las imágenes'));
        } else {
          resolve(detectedIngredients);
        }
      } catch (error) {
        reject(error);
      }
    }, processingTime);
  });
};
*/
/**
 * Analizador principal que se puede cambiar a real cuando esté la API.
 */

export const analyzeImagesWithAPI = async (images) => {
  try {    
    const response = await axios.post('/api/analyze-images', 
      { images },
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

