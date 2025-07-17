"use client";

import { generateRecipes } from "@/services/recipe.service";
import { useRouter } from "next/navigation";
import { useEffect, useState, useMemo } from "react";

import { useRecipeGeneratorSession } from "@/hooks/useRecipeGeneratorSession";
import { useFilterOptionsCache } from "@/hooks/useFilterOptionsCache";
import { useIngredientsStore } from "@/store/useIngredientsStore";
import { useRecipesStore } from "@/store/useRecipesStore";
import { useAuthStore } from "@/store/useAuthStore";
import { useRegisterStore } from "@/store/useRegisterStore";
import { useRecipeFiltersStore } from "@/store/useRecipeFiltersStore";

import CheckboxGroup from "@/components/shared/form/CheckboxGroup";
import ChefLoader from "@/components/shared/loaders/ChefLoader";
import RecipeIngredientList from "@/components/recipe-generator/IngredientList";
import Select from "@/components/shared/form/Select";
import Input from "@/components/shared/form/Input";

import { RecipeGenerationRequest } from "@/types";

export default function RecipeFilters() {
  useRecipeGeneratorSession();
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

  const finalAllergies = useMemo(() =>
    userPreferences?.allergies?.length ? userPreferences.allergies : storedAllergies,
    [userPreferences?.allergies, storedAllergies]
  );

  const finalNeeds = useMemo(() =>
    userPreferences?.dietaryRestrictions?.length ? userPreferences.dietaryRestrictions : storedNeeds,
    [userPreferences?.dietaryRestrictions, storedNeeds]
  );

  const finalDiet = useMemo(() =>
    userPreferences?.diet || storeDiet,
    [userPreferences?.diet, storeDiet]
  );

  const finalCookingLevel = useMemo(() =>
    userPreferences?.cook_level || storeDifficult,
    [userPreferences?.cook_level, storeDifficult]
  );

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [selectedAllergies, setSelectedAllergies] = useState<string[]>([]);
  const [selectedNeeds, setSelectedNeeds] = useState<string[]>([]);

  const { filters, setFilters } = useRecipeFiltersStore();

  const {
    isLoaded: optionsLoaded,
    difficultyOptions,
    allergyOptions,
    dietOptions,
    needOptions,
    timeOptions,
    mealOptions
  } = useFilterOptionsCache();

 useEffect(() => {
  if (!optionsLoaded) return;

  if (allergyOptions.length && finalAllergies.length) {
    const matched = allergyOptions.filter((opt) => finalAllergies.includes(opt.key)).map((opt) => opt.value.toString());
    setSelectedAllergies(matched);
    setFilters(prev => ({ ...prev, allergies_ids: finalAllergies }));
  }

  if (needOptions.length && finalNeeds.length) {
    const matched = needOptions.filter((opt) => finalNeeds.includes(opt.key)).map((opt) => opt.value.toString());
    setSelectedNeeds(matched);
    setFilters(prev => ({ ...prev, dietary_needs_ids: finalNeeds }));
  }

  if (dietOptions.length && finalDiet) {
    const matched = dietOptions.find((opt) => opt.key === finalDiet);
    if (matched) setFilters(prev => ({ ...prev, diet: matched.value.toString() }));
  }

  if (difficultyOptions.length && finalCookingLevel) {
    const matched = difficultyOptions.find((opt) => opt.key === finalCookingLevel);
    if (matched) setFilters(prev => ({ ...prev, difficulty: matched.value.toString() }));
  }

  setFilters(prev => ({ ...prev, types: [] }));
}, [
  optionsLoaded,
  allergyOptions,
  finalAllergies,
  needOptions,
  finalNeeds,
  dietOptions,
  finalDiet,
  difficultyOptions,
  finalCookingLevel,
  setFilters,
]);


  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFilters({ ...filters, [e.target.name]: e.target.value });
  };

  const handleTiposChange = (newValues: string[]) => {
    setFilters({ ...filters, types: newValues });
  };

  const handleAllergiesChange = (newValues: string[]) => {
    setSelectedAllergies(newValues);
    const allergyIds = allergyOptions.filter((opt) => newValues.includes(opt.value)).map((opt) => opt.key);
    setFilters({ ...filters, allergies_ids: allergyIds });
  };

  const handleNeedsChange = (newValues: string[]) => {
    setSelectedNeeds(newValues);
    const needIds = needOptions.filter((opt) => newValues.includes(opt.value)).map((opt) => opt.key);
    setFilters({ ...filters, dietary_needs_ids: needIds });
  };

  const handleFinish = async () => {
    const ingredientList = ingredients.map((ingredient) => ({
      name: ingredient.name,
      quantity: ingredient.quantity,
      unit_id: Number(ingredient.unit.id),
    }));

    const informationRecipe: RecipeGenerationRequest = {
      ingredients: ingredientList,
      filters: {
        preparation_time_id: Number(filters.time) || null,
        servings: filters.people,
        cook_level_id: Number(filters.difficulty),
        type_ids: filters.types.map(Number),
        diet_id: Number(filters.diet) || null,
        allergies_ids: filters.allergies_ids,
        dietary_needs_ids: filters.dietary_needs_ids,
      },
      configuration: {
        size: 3,
        not_include: [],
      },
    };

    try {
      setLoading(true);
      setError(null);
      const generatedRecipes = await generateRecipes(informationRecipe);
      if (generatedRecipes.length) {
        setFilteredRecipes(generatedRecipes);
        router.push("/results");
      } else {
        setError("No se pudieron generar recetas. Intenta con otros filtros.");
      }
    } catch (error) {
      setError("Ocurrió un error al generar las recetas.");
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <ChefLoader text="Generando recetas deliciosas..." />;
  if (!optionsLoaded) return <ChefLoader text="Cargando filtros..." />;

  return (
    <div className="flex flex-col bg-[#fefefe] p-6">
      <h2 className="text-xl font-semibold text-gray-800 mb-4">Ingredientes seleccionados</h2>
      <RecipeIngredientList ingredients={ingredients} enabledDelete={false} />
      <hr className="my-6" />

      <h2 className="text-3xl font-semibold mb-6 text-center">🧪 Filtros</h2>

      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-6">
          {error}
        </div>
      )}

      {/* Filtros agrupados horizontalmente */}
      <div className="bg-white shadow-md rounded-xl p-4 space-y-4 mb-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Select name="time" value={filters.time} onChange={handleChange} options={timeOptions} label="⏱️ Tiempo" />
          <Select name="diet" value={filters.diet} onChange={handleChange} options={dietOptions} label="🥦 Dieta" />
          <Select name="difficulty" value={filters.difficulty} onChange={handleChange} options={difficultyOptions} label="💪 Dificultad" />
          <Input type="number" name="people" value={filters.people} onChange={handleChange} label="👥 Cantidad de personas" min="1" />
        </div>
      </div>

      {/* Tipo de comida */}
      <div className="bg-white shadow-md rounded-xl p-4 mb-6">
        <h3 className="text-lg font-semibold mb-2">🍽️ Tipo de comida</h3>
        <CheckboxGroup title="" options={mealOptions} selectedValues={filters.types} onChange={handleTiposChange} />
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
          {loading ? "Generando..." : " Generar Recetas"}
        </button>
      </div>
    </div>
  );
}
