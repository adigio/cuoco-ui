import axios from "axios";

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

