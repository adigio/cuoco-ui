import React from "react";
import {
  PreferencesStepsProps,
} from "@/types/components/preferences.types";
import { BRAND_COLORS } from "@/constants/colors";
import { useRegisterStore } from "@/store/useRegisterStore";


export default function PreferencesSteps({
  currentStep,
  cookingLevelOptions,
  allergyOptions,
  dietOptions,
  dietaryNeedOptions,
  title = "¿Cómo es tu alimentación?",
}: PreferencesStepsProps) {
  const {
    cookingLevel,
    setCookingLevel,
    diet,
    setDiet,
    foodNeeds,
    setFoodNeeds,
    allergies,
    setAllergies,
    reset,
  } = useRegisterStore();


  const toggleItem = (list: number[], item: number) => {
    return list.includes(item)
      ? list.filter((i) => i !== item)
      : [...list, item];
  };

  if (currentStep === 1) {
    return (
      <div className="space-y-4">
        <h3 className="text-xl font-semibold text-gray-800">{title}</h3>
        <div>
          <label className="block font-medium">Nivel de cocina:</label>
          <div className="flex gap-2 mt-2">
            {cookingLevelOptions.map((level) => (
              <button
                key={level.id}
                type="button"
                className={`
                  px-4 py-2 rounded-full border transition-colors
                  ${level.id === cookingLevel
                    ? `bg-[${BRAND_COLORS.primary}] text-white border-[${BRAND_COLORS.primary}]`
                    : "bg-white text-gray-700 border-gray-300"
                  }
                  hover:opacity-90
                `}
                onClick={() => setCookingLevel(level.id)}
              >
                {level.description}
              </button>
            ))}
          </div>
        </div>

        <div>
          <label className="block font-medium">
            Dieta según estilo alimentario:
          </label>
          <div className="space-y-2 mt-2">
            {dietOptions.map((d) => (
              <label key={d.id} className="flex items-center gap-2 cursor-pointer">
                <input
                  type="radio"
                  name="diet"
                  value={d.id}
                  checked={diet === d.id}
                  onChange={() => setDiet(d.id)}
                  className={`
                    w-4 h-4 
                    accent-[${BRAND_COLORS.primary}]
                    cursor-pointer
                  `}
                />
                <span className="text-gray-700">{d.description}</span>
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
        <h3 className="text-xl font-semibold text-gray-800">
          ¿Tenés alguna necesidad alimentaria especial?
        </h3>
        <div className="space-y-2">
          {dietaryNeedOptions.map((item) => (
            <label
              key={item.id}
              className="flex items-center gap-2 cursor-pointer"
            >
              <input
                type="checkbox"
                name={`food-need-${item.id}`}
                checked={foodNeeds.includes(item.id)}
                onChange={() => setFoodNeeds(toggleItem(foodNeeds, item.id))}
                className={`
                  w-4 h-4 
                  accent-[${BRAND_COLORS.primary}]
                  cursor-pointer
                `}
              />
              <span className="text-gray-700">{item.description}</span>
            </label>
          ))}
        </div>
      </div>
    );
  }

  if (currentStep === 3) {
    return (
      <div className="space-y-4">
        <h3 className="text-xl font-semibold text-gray-800">
          ¿Qué ingredientes evitás o te generan alergia?
        </h3>
        <div className="space-y-2">
          {allergyOptions.map((item) => (
            <label
              key={item.id}
              className="flex items-center gap-2 cursor-pointer"
            >
              <input
                type="checkbox"
                name={`allergy-${item.id}`}
                checked={allergies.includes(item.id)}
                onChange={() => setAllergies(toggleItem(allergies, item.id))}
                className={`
                    w-4 h-4  
                    accent-[${BRAND_COLORS.primary}]
                    cursor-pointer
                  `}
              />
              <span className="text-gray-700">{item.description}</span>
            </label>
          ))}
        </div>
      </div>
    );
  }

  return null;
}
