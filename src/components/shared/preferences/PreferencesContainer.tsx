import React, { useEffect, useState } from 'react';
import PreferencesSteps from './PreferencesSteps';
import { PreferencesContainerProps } from '@/types/components/preferences.types';
import { BRAND_COLORS } from '@/constants/colors';
import { useRegisterStore } from '@/store/useRegisterStore';
import { useFilterOptionsCache } from '@/hooks/useFilterOptionsCache';
import ChefLoader from '@/components/shared/loaders/ChefLoader';

export default function PreferencesContainer({
  initialPreferences,
  onComplete,
  showBackButton = true,
  title = "¿Cómo es tu alimentación?",
  submitButtonText = "Guardar preferencias",
  isEditMode = false
}: PreferencesContainerProps) {
  const [currentStep, setCurrentStep] = useState(1);
  
  const { 
    cookingLevel,
    diet,
    foodNeeds,
    allergies,
    setCookingLevel, 
    setDiet, 
    setFoodNeeds, 
    setAllergies 
  } = useRegisterStore();

  // Usar el hook de cache en lugar de hacer llamadas directas
  const {
    isLoaded,
    cookingLevelOptions,
    originalAllergyOptions: allergyOptions,
    originalDietOptions: dietOptions,
    originalDietaryNeedOptions: dietaryNeedOptions,
  } = useFilterOptionsCache();

  useEffect(() => {
    if (isEditMode && initialPreferences) {
      // Solo en modo edición inicializamos con los valores del usuario
      setCookingLevel(initialPreferences.cook_level || 0);
      setDiet(initialPreferences.diet || 0);
      setFoodNeeds(initialPreferences.dietaryRestrictions || []);
      setAllergies(initialPreferences.allergies || []);
    }
    // En modo registro, useRegisterStore mantiene sus valores por defecto
  }, [isEditMode, initialPreferences, setCookingLevel, setDiet, setFoodNeeds, setAllergies]);

  const handleComplete = () => {
    // Crear objeto de preferencias con los valores actuales del registerStore
    const preferences = {
      cook_level: cookingLevel,
      diet: diet,
      dietaryRestrictions: foodNeeds,
      allergies: allergies,
    };
    onComplete(preferences);
  };

  if (!isLoaded) {
    return (
      <div className="w-full max-w-md">
        <ChefLoader text="Cargando preferencias..." />
      </div>
    );
  }

  return (
    <div className="w-full max-w-md">
      <PreferencesSteps
        cookingLevelOptions={cookingLevelOptions}
        allergyOptions={allergyOptions}
        dietOptions={dietOptions}
        dietaryNeedOptions={dietaryNeedOptions}
        currentStep={currentStep}
        setCurrentStep={setCurrentStep}
        onComplete={handleComplete}
        showBackButton={showBackButton}
        title={title}
        submitButtonText={submitButtonText}
      />

      <div className="flex items-center mt-6 gap-4">
        {showBackButton && currentStep > 1 && (
          <button
            className="bg-gray-200 text-gray-800 px-6 py-2 rounded hover:bg-gray-300 transition"
            onClick={() => setCurrentStep(currentStep - 1)}
          >
            Atrás
          </button>
        )}
        {currentStep < 3 ? (
          <button
            className="bg-[#f37b6a] text-white px-6 py-2 rounded hover:bg-[#e36455] transition ml-auto"
            onClick={() => setCurrentStep(currentStep + 1)}
          >
            Siguiente
          </button>
        ) : (
          <button
            className="bg-[#f37b6a] text-white px-6 py-2 rounded hover:bg-[#e36455] transition ml-auto"
            onClick={handleComplete}
          >
            {submitButtonText}
          </button>
        )}
      </div>

      <div className="flex justify-center mt-4 gap-2">
        {[1, 2, 3].map((n) => (
          <span
            key={n}
            className="w-2 h-2 rounded-full"
            style={{
              backgroundColor: n === currentStep ? BRAND_COLORS.primary : '#D1D5DB'
            }}
          />
        ))}
      </div>
    </div>
  );
} 