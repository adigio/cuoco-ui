"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState, useMemo } from "react";
import React from "react";

import { useIngredientsStore } from "@/store/useIngredientsStore";
import { useRegisterStore } from "@/store/useRegisterStore";
import { useAuthStore } from "@/store/useAuthStore";
import { useMealPrepFiltersStore } from "@/store/useMealPrepFiltersStore";
import { useMealPrepStore } from "@/store/useMealPrepStore";
import { useFilterOptionsCache } from "@/hooks/useFilterOptionsCache";

import CheckboxGroup from "@/components/shared/form/CheckboxGroup";
import ChefLoader from "@/components/shared/loaders/ChefLoader";
import RecipeIngredientList from "@/components/recipe-generator/IngredientList";
import Select from "@/components/shared/form/Select";
import Input from "@/components/shared/form/Input";
import Checkbox from "@/components/shared/form/Checkbox";

import { MealPrepRequest } from "@/types";
import { generateMealPrepRecipes } from "@/services/generateMealPrepRecipes.service";
import BackgroundLayers from "@/components/shared/BackgroundLayers";

export default function MealPrepFilters() {
  const { ingredients } = useIngredientsStore();
  const router = useRouter();
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const { setMealPreps } = useMealPrepStore();
  const { filters, setFilters } = useMealPrepFiltersStore();

  const {
    allergies: storedAllergies,
    foodNeeds: storedNeeds,
    diet: storeDiet,
    cookingLevel: storeCookingLevel,
  } = useRegisterStore();

  const user = useAuthStore((state) => state.user);
  const userPreferences = user?.preferences;

  // Usar useMemo para estabilizar las preferencias finales
  const finalAllergies = useMemo(() => 
    (userPreferences?.allergies && userPreferences.allergies.length > 0) ? userPreferences.allergies : storedAllergies,
    [userPreferences?.allergies, storedAllergies]
  );
  
  const finalNeeds = useMemo(() => 
    (userPreferences?.dietaryRestrictions && userPreferences.dietaryRestrictions.length > 0) ? userPreferences.dietaryRestrictions : storedNeeds,
    [userPreferences?.dietaryRestrictions, storedNeeds]
  );
  
  const finalDiet = useMemo(() => 
    userPreferences?.diet || storeDiet,
    [userPreferences?.diet, storeDiet]
  );
  
  const finalCookingLevel = useMemo(() => 
    userPreferences?.cook_level || storeCookingLevel,
    [userPreferences?.cook_level, storeCookingLevel]
  );

  // Flags de inicialización para evitar bucles
  const [allergiesInitialized, setAllergiesInitialized] = useState<boolean>(false);
  const [needsInitialized, setNeedsInitialized] = useState<boolean>(false);
  const [dietInitialized, setDietInitialized] = useState<boolean>(false);
  const [difficultyInitialized, setDifficultyInitialized] = useState<boolean>(false);

  // Estados para las selecciones locales
  const [selectedAllergies, setSelectedAllergies] = useState<string[]>([]);
  const [selectedNeeds, setSelectedNeeds] = useState<string[]>([]);

  // Usar el hook de cache en lugar de llamadas directas
  const {
    isLoaded: optionsLoaded,
    difficultyOptions,
    allergyOptions,
    dietOptions,
    needOptions,
    timeOptions,
    mealOptions
  } = useFilterOptionsCache();

  // useEffect para inicializar alergias
  useEffect(() => {
    if (!optionsLoaded || allergiesInitialized) return;
    
    if (allergyOptions.length > 0 && finalAllergies.length > 0) {
      const matched = allergyOptions
        .filter((opt) => finalAllergies.includes(opt.key))
        .map((opt) => opt.value.toString());
      
      setSelectedAllergies(matched);
      
      setFilters(prev => ({
        ...prev,
        allergies_ids: finalAllergies
      }));
      
      setAllergiesInitialized(true);
    }
  }, [optionsLoaded, allergyOptions, finalAllergies, allergiesInitialized,setFilters]);

  // useEffect para inicializar necesidades dieteticas
  useEffect(() => {
    if (!optionsLoaded || needsInitialized) return;
    
    if (needOptions.length > 0 && finalNeeds.length > 0) {
      const matched = needOptions
        .filter((opt) => finalNeeds.includes(opt.key))
        .map((opt) => opt.value.toString());
      
      setSelectedNeeds(matched);
      
      setFilters(prev => ({
        ...prev,
        dietary_needs_ids: finalNeeds
      }));
      
      setNeedsInitialized(true);
    }
  }, [optionsLoaded, needOptions, finalNeeds, needsInitialized,setFilters]);

  // useEffect para inicializar dieta
  useEffect(() => {
    if (!optionsLoaded || dietInitialized) return;
    
    if (dietOptions.length > 0 && finalDiet) {
      const matched = dietOptions.find((opt) => opt.key === finalDiet);
      if (matched) {
        setFilters(prev => ({ ...prev, diet: matched.value.toString() }));
        setDietInitialized(true);
      }
    }
  }, [optionsLoaded, dietOptions, finalDiet, dietInitialized,setFilters]);

  // useEffect para inicializar dificultad
  useEffect(() => {
    if (!optionsLoaded || difficultyInitialized) return;
    
    if (difficultyOptions.length > 0 && finalCookingLevel) {
      const matched = difficultyOptions.find(
        (opt) => opt.key === finalCookingLevel
      );
      if (matched) {
        setFilters(prev => ({ ...prev, difficulty: matched.value.toString() }));
        setDifficultyInitialized(true);
      }
    }
  }, [optionsLoaded, difficultyOptions, finalCookingLevel, difficultyInitialized,setFilters]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFilters(prev => ({ ...prev, [name]: value }));
  };

  const handleTiposChange = (newValues: string[]) => {
    setFilters(prev => ({ ...prev, types: newValues }));
  };

  const handleFreezeChange = () => {
    setFilters(prev => ({ ...prev, freeze: !prev.freeze }));
  };

  const handleAllergiesChange = (newValues: string[]) => {
    setSelectedAllergies(newValues);
    const allergyIds = allergyOptions
      .filter((opt) => newValues.includes(opt.value))
      .map((opt) => opt.key);
    setFilters(prev => ({ ...prev, allergies_ids: allergyIds }));
  };

  const handleNeedsChange = (newValues: string[]) => {
    setSelectedNeeds(newValues);
    const needIds = needOptions
      .filter((opt) => newValues.includes(opt.value))
      .map((opt) => opt.key);
    setFilters(prev => ({ ...prev, dietary_needs_ids: needIds }));
  };

  const handleFinish = async () => {
    const preparationTimeId = timeOptions.find((opt) => opt.value === filters.time)?.key;
    const cookLevelId = difficultyOptions.find((opt) => opt.value === filters.difficulty)?.key;
    const dietId = dietOptions.find((opt) => opt.value === filters.diet)?.key;
    const typeIds = filters.types
      .map((typeValue) => mealOptions.find((opt) => opt.value === typeValue)?.key)
      .filter((key): key is number => key !== undefined);

    const filtersToSend: Record<string, any> = {
      freeze: filters.freeze,
    };

    if (preparationTimeId !== undefined) filtersToSend.preparation_time_id = preparationTimeId;
    if (cookLevelId !== undefined) filtersToSend.cook_level_id = cookLevelId;
    if (dietId !== undefined) filtersToSend.diet_id = dietId;
    if (typeIds.length > 0) filtersToSend.type_ids = typeIds;
    if (filters.people !== null) filtersToSend.servings = filters.people;
    if (filters.allergies_ids.length > 0) filtersToSend.allergies_ids = filters.allergies_ids;
    if (filters.dietary_needs_ids.length > 0) filtersToSend.dietary_needs_ids = filters.dietary_needs_ids;

    const informationMealPrep: MealPrepRequest = {
      ingredients: ingredients.map((ingredient) => ({
        name: ingredient.name,
        quantity: ingredient.quantity,
        unit_id: Number(ingredient.unit.id),
      })),
      filters: filtersToSend,
      configuration: {
        size: 1,
        not_include: []
      },
    };

    try {
      setLoading(true);
      setError(null);
      const generatedMealPreps = await generateMealPrepRecipes(informationMealPrep);
      if (generatedMealPreps && generatedMealPreps.length > 0) {
        setMealPreps(generatedMealPreps);
        router.push("/results-meal");
      } else {
        setError("No se pudieron generar meal preps. Intenta con otros filtros.");
        setLoading(false);
      }
    } catch (error) {
      setError("Ocurrió un error al generar los meal preps. Por favor, intenta de nuevo.");
      setLoading(false);
    }
  };

  if (loading) {
    return <ChefLoader text="Generando meal preps deliciosos..." />;
  }

  if (!optionsLoaded) {
    return <ChefLoader text="Cargando filtros..." />;
  }

return (
  <div className="flex flex-col bg-[#fefefe] p-6">
    <BackgroundLayers />
    <h2 className="text-xl font-semibold text-gray-800 mb-4">Ingredientes seleccionados</h2>
    <RecipeIngredientList ingredients={ingredients} enabledDelete={false} />
    <hr className="my-6" />

    <h2 className="text-3xl font-semibold mb-6 text-center">🧪 Filtros Meal Prep</h2>

    {error && (
      <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-6">
        {error}
      </div>
    )}

    {/* Filtros principales agrupados horizontalmente */}
    <div className="bg-white shadow-md rounded-xl p-4 space-y-4 mb-6">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Select name="time" value={filters.time} onChange={handleChange} options={timeOptions} label="⏱️ Tiempo" />
        <Select name="diet" value={filters.diet} onChange={handleChange} options={dietOptions} label="🥦 Dieta" />
        <Select name="difficulty" value={filters.difficulty} onChange={handleChange} options={difficultyOptions} label="💪 Dificultad" />
        <Input type="number" name="people" value={filters.people} onChange={handleChange} label="👥 Cantidad de personas" min="1" />
      </div>
    </div>

    {/* Checkbox freezer */}
    <div className="bg-white shadow-md rounded-xl p-4 mb-6">
      <Checkbox
        id="freeze"
        name="freeze"
        checked={filters.freeze}
        onChange={handleFreezeChange}
        label="🧊 Tengo freezer disponible"
      />
    </div>

    {/* Tipo de comida */}
    <div className="bg-white shadow-md rounded-xl p-4 mb-6">
      <h3 className="text-lg font-semibold mb-2">🍽️ Tipo de comida</h3>
      <CheckboxGroup
        title=""
        options={mealOptions}
        selectedValues={filters.types}
        onChange={handleTiposChange}
      />
    </div>

    {/* Alergias */}
    <div className="bg-white shadow-md rounded-xl p-4 mb-6">
      <h3 className="text-lg font-semibold mb-2">🚫 Alergias</h3>
      <div className="flex flex-wrap gap-4 text-base">
        {allergyOptions.map((option) => (
          <label key={option.key} className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={selectedAllergies.includes(option.value)}
              onChange={() => {
                const newValues = selectedAllergies.includes(option.value)
                  ? selectedAllergies.filter(v => v !== option.value)
                  : [...selectedAllergies, option.value];
                handleAllergiesChange(newValues);
              }}
            />
            {option.label}
          </label>
        ))}
      </div>
    </div>

    {/* Necesidades alimenticias */}
    <div className="bg-white shadow-md rounded-xl p-4">
      <h3 className="text-lg font-semibold mb-2">🧬 Necesidades Alimenticias</h3>
      <div className="flex flex-wrap gap-4 text-base">
        {needOptions.map((option) => (
          <label key={option.key} className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={selectedNeeds.includes(option.value)}
              onChange={() => {
                const newValues = selectedNeeds.includes(option.value)
                  ? selectedNeeds.filter(v => v !== option.value)
                  : [...selectedNeeds, option.value];
                handleNeedsChange(newValues);
              }}
            />
            {option.label}
          </label>
        ))}
      </div>
    </div>

    {/* Botones */}
    <div className="flex flex-col md:flex-row justify-between items-center gap-4 mt-8">
      <button
        onClick={() => router.push("/review")}
        className="bg-gray-200 text-gray-800 px-6 py-2 rounded hover:bg-gray-300 transition w-full md:w-auto"
        disabled={loading}
      >
        Volver
      </button>

      <button
        onClick={handleFinish}
        disabled={loading}
        className={`
          w-full md:w-auto text-white px-6 py-2 rounded transition
          ${loading
            ? "bg-gray-400 cursor-not-allowed"
            : "bg-[#f37b6a] hover:bg-[#e36455] cursor-pointer"}
        `}
      >
        {loading ? "Generando..." : "  Generar Meal Preps"}
      </button>
    </div>
  </div>
);
}
