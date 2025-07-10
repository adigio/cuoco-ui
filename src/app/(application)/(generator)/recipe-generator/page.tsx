"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { analyzeImagesWithAPI } from "@/services/vision.service";
// Contexto
import { useIngredientsStore } from "@/store/useIngredientsStore";
import { useRecipeGeneratorSession } from "@/hooks/useRecipeGeneratorSession";
// Componentes
import RecipeImageUploader from "@/components/recipe-generator/ImageUploader";
import AlertModal from "@/components/shared/modal/AlertModal";
import SubscriptionModal from "@/components/shared/modal/SubscriptionModal";
import BackgroundLayers from "@/components/shared/BackgroundLayers";
import ContainerShadow from "@/components/shared/containers/ContainerShadow";
import { useAuthStore } from "@/store/useAuthStore";

export default function RecipeGeneratorPage() {
  const [images, setImages] = useState<File[]>([]);
  const [loading, setLoading] = useState(false);
  const [showAlertModal, setShowAlertModal] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isSubModalOpen, setIsSubModalOpen] = useState(false);

  //sesion del generador de recetas
  useRecipeGeneratorSession();

  // Tomamos del store si el usuario es premium
  const { ingredients, addMultipleIngredients } = useIngredientsStore();
  const isPremium = useAuthStore((state) => state.user?.premium);
  const router = useRouter();

  const handleContinue = async () => {
    // Si un user no premium intenta con más de 2 imágenes:
    if (!isPremium && images.length > 2) {
      setIsSubModalOpen(true);
      return;
    }

    // Validar si hay al menos una imagen o un ingrediente
    if (images.length === 0 && ingredients.length === 0) {
      setShowAlertModal(true);
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
        const cantidadAgregada = addMultipleIngredients(detectados);
        if (cantidadAgregada === 0) {
          setError("No se pudieron agregar nuevos ingredientes");
          return;
        }
      }

      // Redirigir a la página de revisión
      router.push("/review");
    } catch (err) {
      setError(
        "Hubo un problema al procesar las imágenes. Por favor, intentá de nuevo."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <BackgroundLayers />

      <div className="w-full border-b-4 border-purple-400   mb-6"></div>

      <main className="flex-1 relative">
        <ContainerShadow customClass="container">
          <h1 className="text-3xl font-semibold mb-6">
            Subí una foto de tu heladera o alacena
          </h1>

          <RecipeImageUploader
            images={images}
            setImages={setImages}
            ingredients={ingredients}
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

      {/* Modal de alerta cuando faltan datos */}
      <AlertModal
        show={showAlertModal}
        onClose={() => setShowAlertModal(false)}
        title="¡Faltan datos!"
      >
        Debes agregar al menos una imagen o un ingrediente para continuar.
      </AlertModal>

      {/* Modal de suscripción si intentan >2 imágenes sin ser premium */}
      <SubscriptionModal
        isOpen={isSubModalOpen}
        onClose={() => setIsSubModalOpen(false)}
        title=""
      />
    </>
  );
}
