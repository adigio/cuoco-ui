"use client";

import { generateRecipes } from "@/services/recipe.service";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import React from "react";

// Contexto Zustand
import { useIngredientsStore } from "@/store/useIngredientsStore";
import { useRecipesStore } from "@/store/useRecipesStore";
import { useRegisterStore } from "@/store/useRegisterStore";
import { useAuthStore } from "@/store/useAuthStore";

// Componentes
import CheckboxGroup from '@/components/shared/form/CheckboxGroup';
import ChefLoader from '@/components/shared/loaders/ChefLoader';
import RecipeIngredientList from "@/components/recipe-generator/IngredientList";
import Select from "@/components/shared/form/Select";
import Input from "@/components/shared/form/Input";
import Checkbox from "@/components/shared/form/Checkbox";

// Servicios
import { getDiet, getAllergy, getDietaryNeed, getCookingLevels } from '@/services/getter.service';

// Tipos
import { RecipeGenerationRequest, Filters } from "@/types";

export default function RecipeFilters() {
  const isPremium = useAuthStore((state) => state.user?.premium);
  const { ingredients } = useIngredientsStore();
  const router = useRouter();
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const { setFilteredRecipes } = useRecipesStore();

  const {
    cookingLevel,
    diet,
    foodNeeds,
    allergies,
  } = useRegisterStore();

  const [filters, setFilters] = useState<Filters>({
    time: "",
    difficulty: "",
    types: [],
    diet: "",
    people: 1,
    useProfilePreferences: true,
  });

  const [dietOptions, setDietOptions] = useState<{ key: number; value: string; label: string }[]>([]);
  const [difficultyOptions, setDifficultyOptions] = useState<{ key: number; value: string; label: string }[]>([]);
  const [allergyOptions, setAllergyOptions] = useState<{ key: number; value: string; label: string }[]>([]);
  const [selectedAllergies, setSelectedAllergies] = useState<number[]>([]);
  const [needOptions, setNeedOptions] = useState<{ key: number; value: string; label: string }[]>([]);
  const [selectedNeeds, setSelectedNeeds] = useState<number[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const [diets, difficulties, allergiesList, needs] = await Promise.all([
        getDiet(),
        getCookingLevels(),
        getAllergy(),
        getDietaryNeed(),
      ]);

      const mapUnique = (items: any[]) =>
        Array.from(new Map(items.map((i) => [i.description, i])).values())
          .map((item) => ({ key: item.id, value: item.description, label: item.description }));

      const dietOpts = mapUnique(diets);
      const difficultyOpts = mapUnique(difficulties);
      const allergyOpts = mapUnique(allergiesList);
      const needOpts = mapUnique(needs);

      setDietOptions(dietOpts);
      setDifficultyOptions(difficultyOpts);
      setAllergyOptions(allergyOpts);
      setNeedOptions(needOpts);

      setFilters(prev => ({
        ...prev,
        difficulty: difficultyOpts.find(opt => opt.key === cookingLevel)?.value || "",
        diet: dietOpts.find(opt => opt.key === diet)?.value || "",
      }));

      setSelectedAllergies(
        allergiesList
          .filter(a => allergies.includes(a.id))
          .map(a => a.id)
      );

      setSelectedNeeds(
        needs
          .filter(n => foodNeeds.includes(n.id))
          .map(n => n.id)
      );
    };

    fetchData();
  }, [cookingLevel, diet, foodNeeds, allergies]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setFilters({ ...filters, [e.target.name]: e.target.value });
  };

  const handleTiposChange = (newValues: string[]) => {
    setFilters({ ...filters, types: newValues });
  };

  const handleProfilePreferencesChange = () => {
    setFilters((prev) => ({
      ...prev,
      useProfilePreferences: !prev.useProfilePreferences,
    }));
  };

const toggleSelection = (list: number[], setter: (val: number[]) => void, value: number) => {
  setter(list.includes(value) ? list.filter((v) => v !== value) : [...list, value]);
};

  const handleFinish = async () => {
    const ingredientNames = ingredients.map((ingredient) => ingredient.name);

    const informationRecipe: RecipeGenerationRequest = {
      ingredients: ingredientNames,
      filters: {
        ...filters,
        allergies: selectedAllergies,
        dietaryNeeds: selectedNeeds,
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
      setError("Ocurrió un error al generar las recetas. Por favor, intenta de nuevo.");
      setLoading(false);
    }
  };

  if (loading) {
    return <ChefLoader text="Generando recetas deliciosas..." />;
  }

  return (
    <div className="max-w-4xl mx-auto flex flex-col bg-white p-6 shadow rounded">
      <h2 className="text-xl font-semibold text-gray-800 mb-4">
        Ingredientes seleccionados
      </h2>
      <RecipeIngredientList ingredients={ingredients} enabledDelete={false} />
      <hr className="my-6" />

      <h2 className="text-3xl font-semibold mb-6 text-center">Filtros</h2>

      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          {error}
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <Select
          name="time"
          value={filters.time}
          onChange={handleChange}
          options={[
            { value: "5m", label: "5m" },
            { value: "15m", label: "15m" },
            { value: "30m", label: "30m" },
          ]}
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

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <h3 className="text-xl font-semibold mb-2 text-gray-800">
            🍽️ Tipo de comida
          </h3>
          <CheckboxGroup
            title=""
            options={[
              { value: "Desayuno", label: "Desayuno" },
              { value: "Almuerzo", label: "Almuerzo" },
              { value: "Cena", label: "Cena" },
              { value: "Postre", label: "Postre" },
              { value: "Snack", label: "Snack" },
            ]}
            selectedValues={filters.types}
            onChange={handleTiposChange}
          />
        </div> 

        <div className="col-span-2">
          <h3 className="text-xl font-semibold mb-2 text-gray-800">
            🚫 Alergias
          </h3>
          <div className="flex flex-wrap gap-4 text-base">
            {allergyOptions.map((option) => (
              <label key={option.key} className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={selectedAllergies?.includes(option.key)}
                  onChange={() => toggleSelection(selectedAllergies, setSelectedAllergies, option.key)}
                />
                {option.label}
              </label>
            ))}
          </div>
        </div>

        <div className="col-span-2">
          <h3 className="text-xl font-semibold mb-2 text-gray-800">
            🧬 Necesidades Alimenticias
          </h3>
          <div className="flex flex-wrap gap-4 text-base">
            {needOptions.map((option) => (
              <label key={option.key} className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={selectedNeeds?.includes(option.key)}
                  onChange={() => toggleSelection(selectedNeeds, setSelectedNeeds, option.key)}
                />
                {option.label}
              </label>
            ))}
          </div>
        </div>
      </div>

      <div className="flex justify-between mt-10">
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
          className={
            loading
              ? "bg-gray-400 cursor-not-allowed text-white px-6 py-2 rounded"
              : "bg-[#f37b6a] hover:bg-[#e36455] cursor-pointer text-white px-6 py-2 rounded"
          }
        >
          {loading ? "Generando..." : "Generar Recetas"}
        </button>
      </div>
    </div>
  );
}
