'use client';

import RecipeIngredientInput from '@/components/recipe-generator/IngredientInput';
import RecipeIngredientList from '@/components/recipe-generator/IngredientList';
import ContainerShadow from '@/components/shared/containers/ContainerShadow';
import React from 'react';

export default function RecipeImageUploader({ images, setImages, ingredients, addIngredient }) {
  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);
    setImages((prev) => [...prev, ...files]);
  };

  return (
    <>
      {/* mobile */}
      <div className="flex flex-col gap-6 md:hidden">
        {/* 1. Área de Upload */}
        <div className="border-2 border-dashed border-red-300 p-6 rounded text-center h-[100px] flex flex-col justify-center">
          <input
            type="file"
            multiple
            accept="image/*"
            className="hidden"
            id="upload-mobile"
            onChange={handleImageUpload}
          />
          <label htmlFor="upload-mobile" className="cursor-pointer text-purple-400">
            Arrastrá o <span className="underline">haz clic</span>
          </label>
          <p className="text-sm mt-2 text-gray-500">JPG, PNG o GIF (máx. 800x400px)</p>
        </div>

        {/* 2. Tus imágenes */}
        <ContainerShadow>
          <h2 className="font-semibold mb-2">Tus imágenes</h2>
          {images.length === 0 ? (
            <div className='flex items-center justify-center h-4/5'>
              <p className='text-center text-gray-400'>No hay imágenes cargadas.</p>
            </div>
          ) : (
            <div className='h-[300px] overflow-y-auto'>
              {images.map((img, idx) => (
                <img
                  key={`mobile-${idx}`}
                  src={URL.createObjectURL(img)}
                  alt={`img ${idx}`}
                  className="w-full h-[180px] object-cover rounded mb-2"
                />
              ))}
            </div>
          )}
        </ContainerShadow>

        {/* 3. Área de Ingredientes */}
        <div>
          <RecipeIngredientInput addIngredient={addIngredient} />
          <RecipeIngredientList
            ingredients={ingredients}
            addIngredient={addIngredient}
          />
        </div>
      </div>

      {/* Desktop */}
      <div className="hidden md:grid md:grid-cols-2 gap-6">
        {/* col izquierda: Upload e Ingredientes */}
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
            <RecipeIngredientInput addIngredient={addIngredient} />
            <RecipeIngredientList
              ingredients={ingredients}
              addIngredient={addIngredient}
            />
          </div>
        </div>

        {/* col derecha: Tus imágenes */}
        <ContainerShadow>
          <h2 className="font-semibold mb-2">Tus imágenes</h2>
          {images.length === 0 ? (
            <div className='flex items-center justify-center h-4/5'>
              <p className='text-center text-gray-400'>No hay imágenes cargadas.</p>
            </div>
          ) : (
            <div className='h-[300px] overflow-y-auto'>
              {images.map((img, idx) => (
                <img
                  key={`desktop-${idx}`}
                  src={URL.createObjectURL(img)}
                  alt={`img ${idx}`}
                  className="w-full h-[180px] object-cover rounded mb-2"
                />
              ))}
            </div>
          )}
        </ContainerShadow>
      </div>
    </>
  );
} 