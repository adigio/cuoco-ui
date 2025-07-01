import { Ingredient } from "@/types";
import { apiClient } from "@/lib/axios.config";
import { useAuthStore } from "@/store/useAuthStore";
/**
 * Analizador principal que se puede cambiar a real cuando esté la API.
 */
export const analyzeImagesWithAPI = async (
  images: File[] | string[]
): Promise<Ingredient[]> => {
  try {
    const token = useAuthStore.getState().token;
    const formData = new FormData();

    images.forEach((image, index) => {
      if (image instanceof File) {
        formData.append('image', image); // 'image' en singular
      }
    });
  
    // Configurar headers para FormData como solicita el backend
    const response = await apiClient.post("/ingredients/image", formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });

    // Validar que la respuesta tenga la estructura esperada
    if (!response.data || !Array.isArray(response.data)) {
      console.error("La respuesta de la API no tiene el formato esperado");
      return [];
    }

    // La API devuelve: [{ filename: "...", ingredients: [...] }]
    // Extraer ingredientes de cada imagen
    const allIngredients: Ingredient[] = [];
    
    response.data.forEach((imageResult: any) => {
      if (imageResult.ingredients && Array.isArray(imageResult.ingredients)) {
        imageResult.ingredients.forEach((ingredient: any) => { 
          allIngredients.push({
            name: String(ingredient.name || "").trim(),
            quantity: Number(ingredient.quantity) || 0,
            unit: String(ingredient.unit?.id || "").trim(),
            symbol: String(ingredient.unit?.description || "").trim(),
            optional: false,
            source: "imagen",
            confirmed: Boolean(ingredient.confirmed),
          });
        });
      }
    });
    return allIngredients.filter(item => item.name !== "");
  } catch (error) {
    return [];
  }
};
