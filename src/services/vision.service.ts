import axios from "axios";
import { Ingredient } from "@/types";
import { apiClient } from "@/lib/axios.config";
import { useAuthStore } from "@/store/useAuthStore";
/**
 * Analizador principal que se puede cambiar a real cuando esté la API.
 */
export const analyzeImagesWithAPI = async (
  images: File[] | string[]
): Promise<Ingredient[]> => {
  console.log("analizando imagenes con API", images);
  try {
    const token = useAuthStore.getState().token;
    const formData = new FormData();

    images.forEach((image, index) => {
      if (image instanceof File) {
        formData.append(`images`, image);
      }
    });
    console.log("esta aca culiau");
    const response = await apiClient.post("/ingredients/image", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${token}`,
      },
    });

    // Validar que la respuesta tenga la estructura esperada
    if (!response.data || !Array.isArray(response.data)) {
      console.error("La respuesta de la API no tiene el formato esperado");
      return [];
    }

    // Validar y transformar cada elemento
    return response.data
      .map((item) => ({
        name: String(item.name || "").trim(),
        quantity: 0, // valor por defecto
        unit: "", // valor por defecto
        optional: false, // valor por defecto
        source: "imagen",
        confirmed: false,
      }))
      .filter((item) => item.name !== "");
  } catch (error) {
    console.error("Error al analizar las imágenes:", error);
    return [];
  }
};
