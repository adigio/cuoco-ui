"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { useIngredients } from "@/context/IngredientContext";
import RecipeImageUploader from "@/components/recipe-generator/ImageUploader";
import AlertModal from "@/components/shared/modal/AlertModal";
//mockeo img analisis
import { analyzeImagesWithAPI } from '@/services/visionService';
import BackgroundLayers from "@/components/shared/BackgroundLayers";
import ContainerShadow from "@/components/shared/containers/ContainerShadow";

export default function RecipeGeneratorPage() {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const { ingredients, setIngredients, addMultipleIngredients } =
    useIngredients();
  const router = useRouter();

  const handleContinue = async () => {
    // Validar si hay al menos una imagen o un ingrediente
    if (images.length === 0 && ingredients.length === 0) {
      setShowModal(true);
      return;
    }

    setLoading(true);
    try {
      // Solo procesar imágenes si hay alguna
      if (images.length > 0) {
        const detectados = await analyzeImagesWithAPI(images);
        // Usar el método mejorado para agregar múltiples ingredientes
        const cantidadAgregada = addMultipleIngredients(detectados);

        if (cantidadAgregada > 0) {
          console.log(`Se agregaron ${cantidadAgregada} nuevos ingredientes.`);
        }
      }

      // Redirigir a la página de revisión
      router.push("/review");
    } catch (error) {
      console.error("Error al procesar imágenes:", error);
      alert(
        "Hubo un problema al procesar las imágenes. Por favor, intenta de nuevo."
      );
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
            setIngredients={setIngredients}
          />

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
