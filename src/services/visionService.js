
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
 * en cuanto esté el endpoint sacamos esta parte
 * 
 */
export const mockAnalyzeImages = async (images) => {
  return new Promise((resolve, reject) => {
    // Simulate processing time proportional to the number of images
    const processingTime = 800 + (images.length * 200);
    
    setTimeout(() => {
      try {
        // If no images, return empty list
        if (!images || images.length === 0) {
          resolve([]);
          return;
        }
        // For each image, generate between 1 and 3 "detected" ingredients
        
        let allIngredients = [];
        
        images.forEach((image) => {
          // Random number of ingredients per image (1-3)
          const ingredientCount = Math.floor(Math.random() * 3) + 1;
          
          // seleccionar ingrdientes randoms evitando duplicados
          const selectedIngredients = [];
          
          while (selectedIngredients.length < ingredientCount) {
            const index = Math.floor(Math.random() * AVAILABLE_INGREDIENTS.length);
            const ingredient = AVAILABLE_INGREDIENTS[index];
            
            if (!selectedIngredients.includes(ingredient)) {
              selectedIngredients.push(ingredient);
            }
          }
          
          // se suma al total de ingredientes
          allIngredients = [...allIngredients, ...selectedIngredients];
        });
        
        const uniqueIngredients = [...new Set(allIngredients)];
        
        // ver estructura de la api
        const detectedIngredients = uniqueIngredients.map(ingredient => ({
          nombre: ingredient,
          fuente: 'imagen',
          confirmado: false
        }));
        
        // Simulate 10% chance of error
        if (Math.random() < 0.1) {
          reject(new Error('Error processing images'));
        } else {
          resolve(detectedIngredients);
        }
      } catch (error) {
        reject(error);
      }
    }, processingTime);
  });
};

// TODO: modificar integracion con la api
export const analyzeImagesWithAPI = async (images) => {
  return await mockAnalyzeImages(images);
};
