"use client";

import { generateMealPrepRecipes } from "@/services/generateMealPrepRecipes.service";
import { useRouter } from "next/navigation";
import { useState } from "react";
import React from "react";

// Contexto Zustand
import { useIngredientsStore } from "@/store/useIngredientsStore";
import { useMealPrepStore } from "@/store/useMealPrepStore";


// Tipos
import { MealPrepGenerationRequest, FiltersMealprep } from "@/types";

export default function MealPrepFiltersPage() {
  const { ingredients } = useIngredientsStore();
  const [difficulty, setDifficulty] = useState("");
  const [diet, setDiet] = useState("");
  const [mealTypes, setMealTypes] = useState<string[]>([]);
  const [freezerAvailable, setFreezerAvailable] = useState(false);
  const [useProfilePreferences, setUseProfilePreferences] = useState(false);
  const [days, setDays] = useState(5);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();
  const { setMealPreps } = useMealPrepStore(); 

  const toggleMealType = (type: string) => {
    setMealTypes((prev) =>
      prev.includes(type) ? prev.filter((t) => t !== type) : [...prev, type]
    );
  };

  const handleFinish = async () => {
    const ingredientNames = ingredients.map((ingredient) => ingredient.name);

    const informationMealPrep: MealPrepGenerationRequest = {
      ingredients: ingredientNames,
      filters: {
        difficulty,
        diet,
        types: mealTypes,
        days,
        freezerAvailable,
        useProfilePreferences,
      },
    };

    try {
      setLoading(true);
      setError(null);
      console.log(
        "Generando mealprep con la información:",
        informationMealPrep
      );

      const mealPrepRecipes = await generateMealPrepRecipes(
        informationMealPrep
      );

      if (mealPrepRecipes && mealPrepRecipes.length > 0) {
        setMealPreps(mealPrepRecipes);
        console.log("meal preps generadas correctamente:", mealPrepRecipes);
        router.push("/results-meal");
      } else {
        setError("No se pudieron generar recetas. Intenta con otros filtros.");
        setLoading(false);
      }
    } catch (error) {
      console.error("Error al generar recetas:", error);
      setError(
        "Ocurrió un error al generar las recetas. Por favor, intenta de nuevo."
      );
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white shadow rounded">
      <h2 className="text-2xl font-bold text-center mb-6">Filtros</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        <div>
          <label className="block mb-1 font-medium">Dificultad</label>
          <select
            value={difficulty}
            onChange={(e) => setDifficulty(e.target.value)}
            className="w-full border rounded px-3 py-2"
          >
            <option value="">Seleccionar</option>
            <option value="fácil">Fácil</option>
            <option value="media">Media</option>
            <option value="difícil">Difícil</option>
          </select>
        </div>

        <div>
          <label className="block mb-1 font-medium">Dieta</label>
          <select
            value={diet}
            onChange={(e) => setDiet(e.target.value)}
            className="w-full border rounded px-3 py-2"
          >
            <option value="">Seleccionar</option>
            <option value="sin gluten">Sin gluten</option>
            <option value="vegana">Vegana</option>
            <option value="vegetariana">Vegetariana</option>
            <option value="alta proteina">Alta en proteína</option>
            <option value="ninguna">Ninguna</option>
          </select>
        </div>

        <div>
          <label className="block mb-1 font-medium">Días a preparar</label>
          <select
            value={days}
            onChange={(e) => setDays(Number(e.target.value))}
            className="w-full border rounded px-3 py-2"
          >
            {[3, 5, 7].map((d) => (
              <option key={d} value={d}>
                {d} días
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block mb-1 font-medium">Freezer disponible</label>
          <label className="flex items-center gap-2 mt-1">
            <input
              type="checkbox"
              checked={freezerAvailable}
              onChange={() => setFreezerAvailable(!freezerAvailable)}
            />
            Sí, puedo congelar comidas
          </label>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
        <div>
          <p className="font-medium mb-2">Tipo de comida</p>
          <div className="flex flex-wrap gap-4">
            {["Desayuno", "Almuerzo", "Cena", "Postre", "Snack"].map((tipo) => (
              <label key={tipo} className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={mealTypes.includes(tipo)}
                  onChange={() => toggleMealType(tipo)}
                />
                {tipo}
              </label>
            ))}
          </div>
        </div>

        <div>
          <p className="font-medium mb-2">Preferencias de perfil</p>
          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={useProfilePreferences}
              onChange={() => setUseProfilePreferences(!useProfilePreferences)}
            />
            Tener en cuenta las preferencias del perfil configurado
          </label>
        </div>
      </div>

      <div className="flex justify-between mt-6">
        <button
          onClick={() => history.back()}
          className="bg-gray-200 text-gray-700 px-4 py-2 rounded"
        >
          Volver
        </button>
        <button
          onClick={handleFinish}
          className="bg-red-400 hover:bg-red-500 text-white px-6 py-2 rounded"
        >
          Generar Meal Prep
        </button>
      </div>
    </div>
  );
}
