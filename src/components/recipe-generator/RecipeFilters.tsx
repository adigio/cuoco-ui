"use client";

import { generateRecipes } from "@/services/recipe.service";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import React from "react";

import { useRecipeGeneratorSession } from "@/hooks/useRecipeGeneratorSession";
// Contexto Zustand
import { useIngredientsStore } from "@/store/useIngredientsStore";
import { useRecipesStore } from "@/store/useRecipesStore";
import { useAuthStore } from "@/store/useAuthStore";
import { useRegisterStore } from "@/store/useRegisterStore";
import { useRecipeFiltersStore } from "@/store/useRecipeFiltersStore";

// Componentes
import CheckboxGroup from "@/components/shared/form/CheckboxGroup";
import ChefLoader from "@/components/shared/loaders/ChefLoader";
import RecipeIngredientList from "@/components/recipe-generator/IngredientList";
import Select from "@/components/shared/form/Select";
import Input from "@/components/shared/form/Input";

// Servicios
import {
  getDiet,
  getAllergy,
  getDietaryNeed,
  getCookingLevels,
  getPreparationTimes,
  getMealTypes,
} from "@/services/getter.service";

// Tipos
import { RecipeGenerationRequest, Filters } from "@/types";

export default function RecipeFilters() {
  useRecipeGeneratorSession();
  const isPremium = useAuthStore((state) => state.user?.premium);
  const { ingredients } = useIngredientsStore();
  const router = useRouter();
  const { setFilteredRecipes } = useRecipesStore();

  const {
    allergies: storedAllergies,
    foodNeeds: storedNeeds,
    diet: storeDiet,
    cookingLevel: storeDifficult,
  } = useRegisterStore();

  const user = useAuthStore((state) => state.user);
  const userPreferences = user?.preferences;

  const finalAllergies = (userPreferences?.allergies && userPreferences.allergies.length > 0) ? userPreferences.allergies : storedAllergies;
  const finalNeeds = (userPreferences?.dietaryRestrictions && userPreferences.dietaryRestrictions.length > 0) ? userPreferences.dietaryRestrictions : storedNeeds;
  const finalDiet = userPreferences?.diet || storeDiet;
  const finalCookingLevel = userPreferences?.cook_level || storeDifficult;

  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const { filters, setFilters } = useRecipeFiltersStore();

  const [dietOptions, setDietOptions] = useState<
    { key: number; value: string; label: string }[]
  >([]);
  const [allergyOptions, setAllergyOptions] = useState<
    { key: number; value: string; label: string }[]
  >([]);
  const [difficultyOptions, setDifficultyOptions] = useState<
    { key: number; value: string; label: string }[]
  >([]);
  const [timeOptions, setTimeOptions] = useState<
    { key: number; value: string; label: string }[]
  >([]);
  const [selectedAllergies, setSelectedAllergies] = useState<string[]>([]);
  const [needOptions, setNeedOptions] = useState<
    { key: number; value: string; label: string }[]
  >([]);
  const [mealOptions, setMealOptions] = useState<
    { key: number; value: string; label: string }[]
  >([]);
  const [selectedNeeds, setSelectedNeeds] = useState<string[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const [
        diets,
        allergies,
        needs,
        difficultyOptions,
        preparationTimes,
        mealTypes,
      ] = await Promise.all([
        getDiet(),
        getAllergy(),
        getDietaryNeed(),
        getCookingLevels(),
        getPreparationTimes(),
        getMealTypes(),
      ]);

      const mapUnique = (items: any[]) =>
        Array.from(new Map(items.map((i) => [i.description, i])).values()).map(
          (item) => ({
            key: item.id,
            value: item.id,
            label: item.description,
          })
        );

      setDietOptions(mapUnique(diets));
      setAllergyOptions(mapUnique(allergies));
      setNeedOptions(mapUnique(needs));
      setDifficultyOptions(mapUnique(difficultyOptions));
      setTimeOptions(mapUnique(preparationTimes));
      setMealOptions(mapUnique(mealTypes));
    };

    fetchData();
  }, []);

  useEffect(() => {
    if (allergyOptions.length > 0 && finalAllergies.length > 0) {
      const matched = allergyOptions
        .filter((opt) => finalAllergies.includes(opt.key))
        .map((opt) => opt.value.toString());
      
      setSelectedAllergies(matched);
      
      setFilters(prev => ({
        ...prev,
        allergies_ids: finalAllergies
      }));
    }
  }, [allergyOptions, finalAllergies]);

  // Inicializar necesidades dietarias desde las preferencias del usuario  
  useEffect(() => {
    if (needOptions.length > 0 && finalNeeds.length > 0) {
      const matched = needOptions
        .filter((opt) => finalNeeds.includes(opt.key))
        .map((opt) => opt.value.toString()); // ✅ Convertir a string para la UI
      
      setSelectedNeeds(matched);
      
      setFilters(prev => ({
        ...prev,
        dietary_needs_ids: finalNeeds
      }));
    }
  }, [needOptions, finalNeeds]);

  useEffect(() => {
    if (dietOptions.length > 0 && finalDiet) {
      const matched = dietOptions.find((opt) => opt.key === finalDiet);
      if (matched) {
        setFilters(prev => ({ ...prev, diet: matched.value.toString() })); // ✅ Convertir a string
      }
    }
  }, [dietOptions, finalDiet]);

  useEffect(() => {
    if (difficultyOptions.length > 0 && finalCookingLevel) {
      const matched = difficultyOptions.find(
        (opt) => opt.key === finalCookingLevel
      );
      if (matched) {
        setFilters(prev => ({ ...prev, difficulty: matched.value.toString() })); // ✅ Convertir a string
      }
    }
  }, [difficultyOptions, finalCookingLevel]);

  useEffect(() => {
    setFilters(prev => ({ ...prev, types: [] }));
  }, []); // Solo se ejecuta al montar el componente

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setFilters({ ...filters, [e.target.name]: e.target.value });
  };

  const handleTiposChange = (newValues: string[]) => {
    setFilters({ ...filters, types: newValues });
  };


  const toggleSelection = (
    list: string[],
    setter: (val: string[]) => void,
    value: string
  ) => {
    setter(
      list.includes(value) ? list.filter((v) => v !== value) : [...list, value]
    );
  };

  const handleAllergiesChange = (newValues: string[]) => {
    setSelectedAllergies(newValues);
    const allergyIds = allergyOptions
      .filter((opt) => newValues.includes(opt.value))
      .map((opt) => opt.key);
    setFilters({ ...filters, allergies_ids: allergyIds });
  };

  const handleNeedsChange = (newValues: string[]) => {
    setSelectedNeeds(newValues);
    const needIds = needOptions
      .filter((opt) => newValues.includes(opt.value))
      .map((opt) => opt.key);
    setFilters({ ...filters, dietary_needs_ids: needIds });
  };

  const handleFinish = async () => {
    const ingredientList = ingredients.map((ingredient) => ({
      name: ingredient.name,
      quantity: ingredient.quantity,
      unit_id: Number(ingredient.unit), // 🔁 convertimos a número
    }));

    const informationRecipe: RecipeGenerationRequest = {
      ingredients: ingredientList,
      filters: {
        preparation_time_id: Number(filters.time) === 0 ? null : Number(filters.time),
        servings: filters.people,
        cook_level_id: Number(filters.difficulty),
        type_ids: filters.types.map((t) => Number(t)),
        diet_id: Number(filters.diet) === 0 ? null : Number(filters.diet),
        allergies_ids: filters.allergies_ids,
        dietary_needs_ids: filters.dietary_needs_ids,
      },
      configuration: {
        size: 3, // o lo que quieras enviar
        not_include: [], // o valores omitidos
      },
    };

    try {
      setLoading(true);
      setError(null);
      const generatedRecipes = await generateRecipes(informationRecipe);
      if (generatedRecipes && generatedRecipes.length > 0) {
        setFilteredRecipes(generatedRecipes);
        router.push("/results");
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

  if (loading) {
    return <ChefLoader text="Generando recetas deliciosas..." />;
  }

  return (
    <div className="flex flex-col bg-[#fefefe] p-6">
      <h2 className="text-xl font-semibold text-gray-800 mb-4">
        Ingredientes seleccionados
      </h2>
      <RecipeIngredientList ingredients={ingredients} enabledDelete={false} />
      <hr className="my-6" />
      <h2 className="text-3xl font-semibold mb-4 text-center">Filtros</h2>

      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          {error}
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <Select
          name="time"
          value={filters.time}
          onChange={handleChange}
          options={timeOptions}
          label="⏱️ Tiempo"
        />

        <Select
          name="difficulty"
          value={filters.difficulty}
          onChange={handleChange}
          options={difficultyOptions}
          label="💪 Dificultad"
        />

        <Select
          name="diet"
          value={filters.diet}
          onChange={handleChange}
          options={dietOptions}
          label="🥦 Dieta"
        />

        <Input
          type="number"
          name="people"
          value={filters.people}
          onChange={handleChange}
          label="👥 Cantidad de personas"
          min="1"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <h3 className="text-lg font-medium mb-2 text-gray-800">
            🍽️ Tipo de comida
          </h3>
          <CheckboxGroup
            title=""
            options={mealOptions}
            selectedValues={filters.types}
            onChange={handleTiposChange}
          />
        </div>

        <div className="col-span-2">
          <h3 className="text-lg font-medium mb-2 text-gray-800">
            🚫 Alergias
          </h3>
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

        <div className="col-span-2">
          <h3 className="text-lg font-medium mb-2 text-gray-800">
            🧬 Necesidades Alimenticias
          </h3>
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
      </div>

      <div className="flex justify-between mt-8">
        <button
          onClick={() => router.push("/review")}
          className="bg-gray-200 text-gray-800 px-6 py-2 rounded hover:bg-gray-300 transition"
          disabled={loading}
        >
          Volver
        </button>

        <button
          onClick={handleFinish}
          disabled={loading}
          className={`
            ${
              loading
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-[#f37b6a] hover:bg-[#e36455] cursor-pointer"
            } 
            text-white px-6 py-2 rounded transition
          `}
        >
          {loading ? "Generando..." : "Generar Recetas"}
        </button>
      </div>
    </div>
  );
}
