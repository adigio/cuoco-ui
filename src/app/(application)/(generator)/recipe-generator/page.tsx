"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { analyzeImagesWithAPI } from '@/services/visionService';
//Contexto 
import { useIngredientsStore } from '@/store/useIngredientsStore'; 
//Componentes
import RecipeImageUploader from "@/components/recipe-generator/ImageUploader";
import AlertModal from "@/components/shared/modal/AlertModal";
import BackgroundLayers from "@/components/shared/BackgroundLayers";
import ContainerShadow from "@/components/shared/containers/ContainerShadow";

export default function RecipeGeneratorPage() {
  const [images, setImages] = useState<File[]>([]);
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const { ingredients, addIngredient, addMultipleIngredients } = useIngredientsStore();
  const router = useRouter();

  const handleContinue = async () => {
    // Validar si hay al menos una imagen o un ingrediente
    if (images.length === 0 && ingredients.length === 0) {
      setShowModal(true);
      return;
    }

    setLoading(true);
    setError(null);

    try {
      // Solo procesar imágenes si hay alguna
      if (images.length > 0) {
        const detectados = await analyzeImagesWithAPI(images);
        
        if (!detectados || detectados.length === 0) {
          setError("No se detectaron ingredientes en las imágenes");
          return;
        }

        // Usar el método mejorado para agregar múltiples ingredientes
        const cantidadAgregada = addMultipleIngredients(detectados);

        if (cantidadAgregada > 0) {
          console.log(`Se agregaron ${cantidadAgregada} nuevos ingredientes.`);
        } else {
          setError("No se pudieron agregar nuevos ingredientes");
          return;
        }
      }

      // Redirigir a la página de revisión
      router.push("/review");
    } catch (error) {
      console.error("Error al procesar imágenes:", error);
      setError("Hubo un problema al procesar las imágenes. Por favor, intenta de nuevo.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <BackgroundLayers />
      
      <div className="w-full border-b-4 border-purple-400 mb-6"></div>
      
      <main className="flex-1 relative">
        <ContainerShadow customClass={"container"}>
          <h1 className="text-3xl font-semibold mb-6">
            Subí una foto de tu heladera o alacena
          </h1>

          <RecipeImageUploader
            images={images} 
            setImages={setImages} 
            ingredients={ingredients}
            addIngredient={addIngredient}
          />

          {error && (
            <div className="mt-4 p-3 bg-red-100 text-red-700 rounded">
              {error}
            </div>
          )}

          <div className="flex justify-end mt-10">
            <button
              onClick={handleContinue}
              disabled={loading}
              className={`
              ${loading ? "bg-gray-400" : "bg-[#f37b6a] hover:bg-[#e36455]"} 
              text-white px-6 py-2 rounded transition
            `}
            >
              {loading ? "Analizando..." : "Continuar"}
            </button>
          </div>
        </ContainerShadow>
      </main>
      <AlertModal
        show={showModal}
        onClose={() => setShowModal(false)}
        title="¡Faltan datos!"
      >
        Debes agregar al menos una imagen o un ingrediente para continuar.
      </AlertModal>
    </>
  );
}
