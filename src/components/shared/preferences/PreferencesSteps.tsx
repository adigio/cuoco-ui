import React from 'react';
import { PreferencesStepsProps, CookingLevel, DietType } from '@/types/components/preferences.types';
import CustomCheckbox from '../form/CustomCheckbox';
import { BRAND_COLORS } from '@/constants/colors';

export default function PreferencesSteps({
  currentStep,
  level,
  setLevel,
  diet,
  setDiet,
  foodNeeds,
  setFoodNeeds,
  allergies,
  setAllergies,
  title = "¿Cómo es tu alimentación?"
}: PreferencesStepsProps) {
  const toggleItem = (list: string[], item: string) => {
    return list.includes(item) ? list.filter(i => i !== item) : [...list, item];
  };

  if (currentStep === 1) {
    return (
      <div className="space-y-4">
        <h3 className="text-xl font-semibold text-gray-800">{title}</h3>
        <div>
          <label className="block font-medium">Nivel de cocina:</label>
          <div className="flex gap-2 mt-2">
            {['Bajo', 'Medio', 'Alto'].map((nivel) => (
              <button
                key={nivel}
                type="button"
                className={`
                  px-4 py-2 rounded-full border transition-colors
                  ${level === nivel 
                    ? `bg-[${BRAND_COLORS.primary}] text-white border-[${BRAND_COLORS.primary}]` 
                    : 'bg-white text-gray-700 border-gray-300'
                  }
                  hover:opacity-90
                `}
                onClick={() => setLevel(nivel as CookingLevel)}
              >
                {nivel}
              </button>
            ))}
          </div>
        </div>

        <div>
          <label className="block font-medium">Dieta según estilo alimentario:</label>
          <div className="space-y-2 mt-2">
            {['Omnívoro', 'Vegetariano', 'Vegano', 'Otro'].map((d) => (
              <label key={d} className="flex items-center gap-2 cursor-pointer">
                <input
                  type="radio"
                  name="diet"
                  value={d}
                  checked={diet === d}
                  onChange={() => setDiet(d as DietType)}
                  className={`
                    w-4 h-4 
                    accent-[${BRAND_COLORS.primary}]
                    cursor-pointer
                  `}
                />
                <span className="text-gray-700">{d}</span>
              </label>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (currentStep === 2) {
    return (
      <div className="space-y-4">
        <h3 className="text-xl font-semibold text-gray-800">¿Tenés alguna necesidad alimentaria especial?</h3>
        <div className="space-y-2">
          {['Sin gluten', 'Sin lactosa', 'Alta en proteínas', 'Keto', 'Ninguna en particular'].map((item) => (
            <label key={item} className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                name={`food-need-${item}`}
                checked={foodNeeds.includes(item)}
                onChange={() => setFoodNeeds(toggleItem(foodNeeds, item))}
                className={`
                  w-4 h-4 
                  accent-[${BRAND_COLORS.primary}]
                  cursor-pointer
                `}
              />
              <span className="text-gray-700">{item}</span>
            </label>
          ))}
        </div>
      </div>
    );
  }

  if (currentStep === 3) {
    return (
      <div className="space-y-4">
        <h3 className="text-xl font-semibold text-gray-800">¿Qué ingredientes evitás o te generan alergia?</h3>
        <div className="space-y-2">
          {['Leche', 'Frutos secos', 'Soja', 'Crustáceos', 'Huevo', 'Pescados', 'Cereales', 'Maní', 'Otro', 'Ninguna en particular'].map(
            (item) => (
              <label key={item} className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  name={`allergy-${item}`}
                  checked={allergies.includes(item)}
                  onChange={() => setAllergies(toggleItem(allergies, item))}
                  className={`
                    w-4 h-4 
                    accent-[${BRAND_COLORS.primary}]
                    cursor-pointer
                  `}
                />
                <span className="text-gray-700">{item}</span>
              </label>
            )
          )}
        </div>
      </div>
    );
  }

  return null;
} 