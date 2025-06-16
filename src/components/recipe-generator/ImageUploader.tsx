'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import RecipeIngredientInput from '@/components/recipe-generator/IngredientInput';
import RecipeIngredientList from '@/components/recipe-generator/IngredientList';
import ContainerShadow from '@/components/shared/containers/ContainerShadow';
import { RecipeImageUploaderProps } from '@/types/components/recipe-generator.types';
import { useAuthStore } from '@/store/useAuthStore';
import { useIngredientsStore } from '@/store/useIngredientsStore'; 
import SubscriptionModal from '../shared/modal/SubscriptionModal';

// Componente para manejar imágenes locales
function LocalImage({ file, alt, className }: { file: File; alt: string; className?: string }) {
  const [objectUrl, setObjectUrl] = useState<string>('');

  useEffect(() => {
    const url = URL.createObjectURL(file);
    setObjectUrl(url);
    return () => URL.revokeObjectURL(url);
  }, [file]);

  if (!objectUrl) return null;

  return (
    <div className={className || ''} style={{ position: 'relative', width: '100%', height: '180px' }}>
      <Image
        src={objectUrl}
        alt={alt}
        fill
        style={{ objectFit: 'cover' }}
        className="rounded"
      />
    </div>
  );
}

export default function RecipeImageUploader({ images, setImages, ingredients, addIngredient }: RecipeImageUploaderProps) {
  const removeIngredient = useIngredientsStore((state) => state.removeIngredient);
  const isPremium = useAuthStore((state) => state.user?.premium);

  const [isSubModalOpen, setIsSubModalOpen] = useState(false);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);

    // No premium: sólo 1 imagen
    if (!isPremium && images.length + files.length > 1) {
      setIsSubModalOpen(true);
      return;
    }

    // Premium: hasta 5 imágenes
    const maxImages = isPremium ? 5 : 1;
    if (images.length + files.length > maxImages) {
      // Opcional: mensaje u otro comportamiento
      return;
    }

    setImages((prev) => [...prev, ...files]);
  };

  const handleDeleteImage = (index: number) => {
    setImages((prev) => prev.filter((_, idx) => idx !== index));
  };

  return (
    <>
      {/* Mobile */}
      <div className="flex flex-col gap-6 md:hidden">
        {/* Upload */}
        <div className="border-2 border-dashed border-red-300 p-6 rounded text-center h-[100px] flex flex-col justify-center">
          <input
            type="file"
            multiple
            accept="image/*"
            className="hidden"
            capture="environment"
            id="upload-mobile"
            onChange={handleImageUpload}
          />
          <label htmlFor="upload-mobile" className="cursor-pointer text-purple-400">
            Arrastrá o <span className="underline">haz clic</span>
          </label>
          <p className="text-sm mt-2 text-gray-500">JPG, PNG o GIF (máx. 800x400px)</p>
        </div>

        {/* Tus imágenes */}
        <ContainerShadow>
          <h2 className="font-semibold mb-2">Tus imágenes</h2>
          {images.length === 0 ? (
            <div className="flex items-center justify-center h-4/5">
              <p className="text-center text-gray-400">No hay imágenes cargadas.</p>
            </div>
          ) : (
            <div className="h-[300px] overflow-y-auto">
              {images.map((img, idx) => (
                <div key={`mobile-${idx}`} className="relative mb-2">
                  <LocalImage file={img} alt={`img ${idx}`} className="w-full" />
                  <button
                    onClick={() => handleDeleteImage(idx)}
                    className="absolute top-2 right-2 bg-gray-200 text-gray-500 h-4 w-4 flex items-center justify-center text-xs rounded-full transition-colors"
                  >
                    x
                  </button>
                </div>
              ))}
            </div>
          )}
        </ContainerShadow>

        {/* Ingredientes */}
        <div>
          <RecipeIngredientInput />
          <RecipeIngredientList ingredients={ingredients} onRemove={removeIngredient} />
        </div>
      </div>

      {/* Desktop */}
      <div className="hidden md:grid md:grid-cols-2 gap-6">
        {/* Upload e Ingredientes */}
        <div className="flex flex-col">
          <div className="border-2 border-dashed border-red-300 p-6 rounded text-center h-[100px] flex flex-col justify-center">
            <input
              type="file"
              multiple
              accept="image/*"
              className="hidden"
              id="upload-desktop"
              onChange={handleImageUpload}
            />
            <label htmlFor="upload-desktop" className="cursor-pointer text-purple-400">
              Arrastrá o <span className="underline">haz clic</span>
            </label>
            <p className="text-sm mt-2 text-gray-500">JPG, PNG o GIF (máx. 800x400px)</p>
          </div>
          <div className="mt-8">
            <RecipeIngredientInput />
            <RecipeIngredientList ingredients={ingredients} onRemove={removeIngredient} />
          </div>
        </div>

        {/* Tus imágenes */}
        <ContainerShadow>
          <h2 className="font-semibold mb-2">Tus imágenes</h2>
          {images.length === 0 ? (
            <div className="flex items-center justify-center h-4/5">
              <p className="text-center text-gray-400">No hay imágenes cargadas.</p>
            </div>
          ) : (
            <div className="h-[300px] overflow-y-auto">
              {images.map((img, idx) => (
                <div key={`desktop-${idx}`} className="relative mb-2">
                  <LocalImage file={img} alt={`img ${idx}`} className="w-full" />
                  <button
                    onClick={() => handleDeleteImage(idx)}
                    className="absolute top-2 right-2 bg-gray-200 text-gray-500 h-4 w-4 flex items-center justify-center text-xs rounded-full transition-colors"
                  >
                    x
                  </button>
                </div>
              ))}
            </div>
          )}
        </ContainerShadow>
      </div>

      {/* Modal de suscripción */}
      <SubscriptionModal isOpen={isSubModalOpen} onClose={() => setIsSubModalOpen(false)} title="Siendo free puede subir solo 1 imagen" />
    </>
  );
}
