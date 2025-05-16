'use client';

import React from 'react';

export default function RecipeImageUploader({ images, setImages }) {
  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);
    setImages((prev) => [...prev, ...files]);
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div className="border-2 border-dashed border-red-300 p-6 rounded text-center">
        <input 
          type="file" 
          multiple 
          accept="image/*" 
          className="hidden" 
          id="upload" 
          onChange={handleImageUpload} 
        />
        <label htmlFor="upload" className="cursor-pointer text-blue-600">
          Arrastrá o <span className="underline">haz clic</span>
        </label>
        <p className="text-sm mt-2 text-gray-500">JPG, PNG o GIF (máx. 800x400px)</p>
      </div>

      <div className="bg-white rounded shadow p-4 max-h-[300px] overflow-y-auto">
        <h2 className="font-semibold mb-2">Tus imágenes</h2>
        {images.length === 0 ? (
          <p className="text-gray-400">No hay imágenes cargadas.</p>
        ) : (
          images.map((img, idx) => (
            <img 
              key={idx} 
              src={URL.createObjectURL(img)} 
              alt="" 
              className="w-full h-[180px] object-cover rounded mb-2" 
            />
          ))
        )}
      </div>
    </div>
  );
} 