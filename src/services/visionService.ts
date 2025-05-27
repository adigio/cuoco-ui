import axios from "axios";
import { Ingredient } from "@/types";

/**
 * Analizador principal que se puede cambiar a real cuando esté la API.
 */
export const analyzeImagesWithAPI = async (images: File[] | string[]): Promise<Ingredient[]> => {
  try {    
    const response = await axios.post('/api/analyze-images', 
      { images },
      {
        headers: {
          'Content-Type': 'application/json'
        }
      }
    );
    
    // Validar que la respuesta tenga la estructura esperada
    if (!response.data || !Array.isArray(response.data)) {
      console.error('La respuesta de la API no tiene el formato esperado');
      return [];
    }

    // Validar y transformar cada elemento
    return response.data.map(item => ({
      name: String(item.name || ''),
      origin: 'imagen',
      confirm: false
    })).filter(item => item.name.trim() !== '');

  } catch (error) {
    console.error('Error al analizar las imágenes:', error);
    return [];
  }
};

