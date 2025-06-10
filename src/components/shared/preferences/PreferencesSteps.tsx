import React from "react";
import { useState, useEffect } from "react";
import {
  PreferencesStepsProps, 
} from "@/types/components/preferences.types";
import CustomCheckbox from "../form/CustomCheckbox";
import { BRAND_COLORS } from "@/constants/colors";
import { PreferenceItem } from "@/types/auth/auth.types";
import { getCookingLevels,getAllergy,getDiet,getDietaryNeed} from "@/services/getter.service";


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
  title = "¿Cómo es tu alimentación?",
}: PreferencesStepsProps) {

  const [cookingLevelOptions, setCookingLevelOptions] = useState<PreferenceItem[]>([]);
  const [allergyOptions, setAllergyOptions] = useState<PreferenceItem[]>([]);
  const [dietOptions, setDietOptions] = useState<PreferenceItem[]>([]);
  const [dietaryNeedOptions, setDietaryNeedOptions] = useState<PreferenceItem[]>([]);
   useEffect(() => {
    async function fetchLevels() {
      const levels = await getCookingLevels();
      setCookingLevelOptions(levels);
    }
    async function fetchtAllergy() {
      const levels = await getAllergy();
      setAllergyOptions(levels);
    } 
    async function fetchDiet() {
      const levels = await getDiet();
      setDietOptions(levels);
    }
    async function fetchDietaryNeed() {
      const levels = await getDietaryNeed();
      setDietaryNeedOptions(levels);
    }
    console.log(cookingLevelOptions,allergyOptions,dietOptions,dietaryNeedOptions);
    fetchLevels();
    fetchDiet();
    fetchDietaryNeed();
    fetchtAllergy(); 
  }, []);

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
                  ${
                    level.id === level.id
                      ? `bg-[${BRAND_COLORS.primary}] text-white border-[${BRAND_COLORS.primary}]`
                      : "bg-white text-gray-700 border-gray-300"
                  }
                  hover:opacity-90
                `}
                onClick={() => setLevel(level.id)}
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
