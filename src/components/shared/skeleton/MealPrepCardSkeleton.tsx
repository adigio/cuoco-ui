import React from 'react';
import { BaseSkeleton } from './BaseSkeleton';

export function MealPrepCardSkeleton() {
  return (
    <div className="w-full bg-white shadow-md rounded-lg p-4 mb-6 animate-pulse">
      {/* Título del meal prep */}
      <div className="mb-4">
        <BaseSkeleton className="h-6 w-3/4 rounded" />
      </div>

      {/* 3 recetas en horizontal */}
      <div className="flex flex-col sm:flex-row gap-4 mb-4">
        {[1, 2, 3].map((index) => (
          <div
            key={index}
            className="flex-1 bg-gray-100 rounded p-3 flex flex-col items-start"
          >
            {/* Imagen de la receta */}
            <div className="w-full h-32 bg-gray-200 rounded mb-3"></div>
            
            {/* Título de la receta */}
            <BaseSkeleton className="h-4 w-2/3 rounded" />
          </div>
        ))}
      </div>

      {/* Área de tiempo y favoritos */}
      <div className="flex justify-between items-center px-2">
        <div className="flex items-center gap-2.5">
          <BaseSkeleton className="h-4 w-4 rounded" />
          <BaseSkeleton className="h-4 w-12 rounded" />
        </div>
        <div className="flex items-center gap-3">
          <BaseSkeleton className="h-4 w-4 rounded" />
          <BaseSkeleton className="h-4 w-4 rounded" />
        </div>
      </div>
    </div>
  );
}

export default MealPrepCardSkeleton; 