import React from 'react';
import { PreferencesDisplayProps } from '@/types/components/preferences.types';
import { usePreferencesStore } from '@/store/usePreferencesStore';

export default function PreferencesDisplay({
  preferences,
  onEdit,
  showEditButton = true
}: PreferencesDisplayProps) {
  const { cookingLevelOptions, dietOptions } = usePreferencesStore();
  
  if (!preferences) return null;

  // Helper functions para obtener descripciones
  const getCookingLevelLabel = (id?: number): string => {
    if (!id) return 'No especificado';
    const option = cookingLevelOptions.find(opt => opt.id === id);
    return option?.description || 'No especificado';
  };

  const getDietLabel = (id?: number): string => {
    if (!id) return 'No especificada';
    const option = dietOptions.find(opt => opt.id === id);
    return option?.description || 'No especificada';
  };

  return (
    <div className="space-y-2 text-base flex gap-4 justify-between items-start">

      <div>
        <p>
          <span className="font-bold text-gray-700">Dieta:</span>{" "}
          <span className="text-[#F37B6A]">{getDietLabel(preferences.diet)}</span>
        </p>
        <p>
          <span className="font-bold text-gray-700">Nivel de cocina:</span>{" "}
          <span className="text-[#F37B6A]">{getCookingLevelLabel(preferences.cook_level)}</span>
        </p>
        {preferences.dietaryRestrictions && preferences.dietaryRestrictions.length > 0 && (
          <p>
            <span className="font-bold text-gray-700">Restricciones:</span>{" "}
            <span className="text-[#F37B6A]">{preferences.dietaryRestrictions.join(', ')}</span>
          </p>
        )}
        {preferences.allergies && preferences.allergies.length > 0 && (
          <p>
            <span className="font-bold text-gray-700">Alergias:</span>{" "}
            <span className="text-[#F37B6A]">{preferences.allergies.join(', ')}</span>
          </p>
        )}
      </div>


      {showEditButton && onEdit && (
        <div>
          <button
            className="px-4 py-2 bg-gray-300 rounded shadow-sm text-sm font-semibold"
            onClick={onEdit}
          >
            Editar
          </button>
        </div>
      )}


    </div>
  );
} 