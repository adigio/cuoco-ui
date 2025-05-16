'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useIngredients } from '@/context/IngredientContext';
import { mockAnalyzeImages } from '@/services/visionService';
import NavbarLanding from '@/components/navbars/NavbarLanding';
import Footer from '@/components/landing/Footer';
import RecipeImageUploader from '@/components/recipe-generator/ImageUploader';
import RecipeIngredientInput from '@/components/recipe-generator/IngredientInput';
import RecipeIngredientList from '@/components/recipe-generator/IngredientList';

export default function RecipeGeneratorPage() {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(false);

  const { ingredients, setIngredients, addMultipleIngredients } = useIngredients();
  const router = useRouter();

  const handleContinue = async () => { 
    // Validar si hay al menos una imagen o un ingrediente
    if (images.length === 0 && ingredients.length === 0) {
      alert('Debes agregar al menos una imagen o un ingrediente para continuar.');
      return;
    }

    setLoading(true);
    try {
      // Solo procesar imágenes si hay alguna
      if (images.length > 0) {
        const detectados = await mockAnalyzeImages(images);
        
        // Usar el método mejorado para agregar múltiples ingredientes
        const cantidadAgregada = addMultipleIngredients(detectados);
        
        if (cantidadAgregada > 0) {
          console.log(`Se agregaron ${cantidadAgregada} nuevos ingredientes.`);
        }
      }
      
      // Redirigir a la página de revisión
      router.push('/review');
    } catch (error) {
      console.error('Error al procesar imágenes:', error);
      alert('Hubo un problema al procesar las imágenes. Por favor, intenta de nuevo.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#fefefe]">
      <NavbarLanding />
      
      <div className="container mx-auto px-4 py-10">
        <h1 className="text-3xl font-semibold mb-6">Subí una foto de tu heladera o alacena</h1>
        
        {/* Componente para subir imágenes */}
        <RecipeImageUploader 
          images={images} 
          setImages={setImages} 
        />

        <div className="mt-8">
          {/* Componente para ingresar ingredientes manualmente */}
          <RecipeIngredientInput 
            setIngredients={setIngredients} 
          />

          {/* Componente para mostrar lista de ingredientes */}
          <RecipeIngredientList 
            ingredients={ingredients} 
            setIngredients={setIngredients} 
          />
        </div>

        <div className="flex justify-end mt-10">
          <button
            onClick={handleContinue}
            disabled={loading}
            className={`
              ${loading ? 'bg-gray-400' : 'bg-[#f37b6a] hover:bg-[#e36455]'} 
              text-white px-6 py-2 rounded transition
            `}
          >
            {loading ? 'Analizando...' : 'Continuar'}
          </button>
        </div>
      </div>
      
      <Footer />
    </div>
  );
}
