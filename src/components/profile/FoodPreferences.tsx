'use client';

import Checkbox from "@/components/shared/form/Checkbox";

interface FoodPreferencesProps {
  level: string;
  setLevel: (val: string) => void;
  diet: string;
  setDiet: (val: string) => void;
  foodNeeds: string[];
  setFoodNeeds: (val: string[]) => void;
  allergies: string[];
  setAllergies: (val: string[]) => void;
  subStep: number;
}

export default function FoodPreferences({
  level,
  setLevel,
  diet,
  setDiet,
  foodNeeds,
  setFoodNeeds,
  allergies,
  setAllergies,
  subStep,
}: FoodPreferencesProps) {
  const toggleItem = (
    list: string[],
    setList: (val: string[]) => void,
    item: string
  ) => {
    setList(list.includes(item) ? list.filter((i) => i !== item) : [...list, item]);
  };

  return (
    <>
      {subStep === 1 && (
        <>
          <h3 className="text-xl font-semibold text-gray-800">¿Cómo es tu alimentación?</h3>
          <label className="block font-medium mt-2">Nivel de cocina:</label>
          <div className="flex gap-2">
            {["Bajo", "Medio", "Alto"].map((nivel) => (
              <button
                key={nivel}
                className={`px-4 py-2 rounded-full border ${
                  level === nivel ? "bg-[#75C24B] text-white" : "bg-white text-gray-700"
                }`}
                onClick={() => setLevel(nivel)}
              >
                {nivel}
              </button>
            ))}
          </div>

          <label className="block font-medium mt-4">Dieta según estilo alimentario:</label>
          <div className="space-y-2">
            {["Omnívoro", "Vegetariano", "Vegano", "Otro"].map((d) => (
              <label key={d} className="flex items-center gap-2">
                <input
                  type="radio"
                  name="diet"
                  value={d}
                  checked={diet === d}
                  onChange={() => setDiet(d)}
                />
                <span>{d}</span>
              </label>
            ))}
          </div>
        </>
      )}

      {subStep === 2 && (
        <>
          <h3 className="text-xl font-semibold text-gray-800">
            ¿Tenés alguna necesidad alimentaria especial?
          </h3>
          <div className="space-y-2">
            {["Sin gluten", "Sin lactosa", "Alta en proteínas", "Keto", "Ninguna en particular"].map((item) => (
              <Checkbox
                key={item}
                id={`food-need-${item}`}
                name={`food-need-${item}`}
                checked={foodNeeds.includes(item)}
                onChange={() => toggleItem(foodNeeds, setFoodNeeds, item)}
                label={item}
              />
            ))}
          </div>
        </>
      )}

      {subStep === 3 && (
        <>
          <h3 className="text-xl font-semibold text-gray-800">¿Qué ingredientes evitás o te generan alergia?</h3>
          <div className="space-y-2">
            {["Leche", "Frutos secos", "Soja", "Crustáceos", "Huevo", "Pescados", "Cereales", "Maní", "Otro", "Ninguna en particular"].map(
              (item) => (
                <Checkbox
                  key={item}
                  id={`allergy-${item}`}
                  name={`allergy-${item}`}
                  checked={allergies.includes(item)}
                  onChange={() => toggleItem(allergies, setAllergies, item)}
                  label={item}
                />
              )
            )}
          </div>
        </>
      )}
    </>
  );
}
