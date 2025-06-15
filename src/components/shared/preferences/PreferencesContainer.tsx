import React, { useState } from 'react';
import { UserPreferences } from '@/types/auth/auth.types';
import PreferencesSteps from './PreferencesSteps';
import { PreferencesContainerProps, CookingLevel, DietType } from '@/types/components/preferences.types';
import { BRAND_COLORS } from '@/constants/colors';

export default function PreferencesContainer({
  initialPreferences,
  onComplete,
  showBackButton = true,
  title = "¿Cómo es tu alimentación?",
  submitButtonText = "Guardar preferencias"
}: PreferencesContainerProps) {
  const [currentStep, setCurrentStep] = useState(1);
  const [level, setLevel] = useState<CookingLevel>(initialPreferences?.cookingLevel || '');
  const [diet, setDiet] = useState<DietType>(initialPreferences?.diet || '');
  const [foodNeeds, setFoodNeeds] = useState<string[]>(initialPreferences?.dietaryRestrictions || []);
  const [allergies, setAllergies] = useState<string[]>(initialPreferences?.allergies || []);

  const handleComplete = () => {
    const preferences: UserPreferences = {
      cookingLevel: level || 'Medio',
      diet: diet || 'Omnívoro',
      dietaryRestrictions: foodNeeds,
      allergies: allergies,
      favoriteCuisines: []
    };
    onComplete(preferences);
  };

  return (
    <div className="w-full max-w-md">
      <PreferencesSteps
        currentStep={currentStep}
        setCurrentStep={setCurrentStep}
        level={level}
        setLevel={setLevel}
        diet={diet}
        setDiet={setDiet}
        foodNeeds={foodNeeds}
        setFoodNeeds={setFoodNeeds}
        allergies={allergies}
        setAllergies={setAllergies}
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