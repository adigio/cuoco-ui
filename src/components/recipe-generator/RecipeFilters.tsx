"use client";

import { generateRecipes } from "@/services/recipe.service";
import { useRouter } from "next/navigation";
import { useEffect, useState, useMemo } from "react";

import { useRecipeGeneratorSession } from "@/hooks/useRecipeGeneratorSession";
import { useFilterOptionsCache } from "@/hooks/useFilterOptionsCache";
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
    userPreferences?.cook_level || storeDifficult,
    [userPreferences?.cook_level, storeDifficult]
  );

  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  
  // Flags de inicialización para evitar bucles infinitos
  const [allergiesInitialized, setAllergiesInitialized] = useState<boolean>(false);
  const [needsInitialized, setNeedsInitialized] = useState<boolean>(false);
  const [dietInitialized, setDietInitialized] = useState<boolean>(false);
  const [difficultyInitialized, setDifficultyInitialized] = useState<boolean>(false);

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

  const [selectedAllergies, setSelectedAllergies] = useState<string[]>([]);
  const [selectedNeeds, setSelectedNeeds] = useState<string[]>([]);


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
  }, [optionsLoaded, allergyOptions, finalAllergies, allergiesInitialized]);

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
  }, [optionsLoaded, needOptions, finalNeeds, needsInitialized]);

  useEffect(() => {
    if (!optionsLoaded || dietInitialized) return;
    
    if (dietOptions.length > 0 && finalDiet) {
      const matched = dietOptions.find((opt) => opt.key === finalDiet);
      if (matched) {
        setFilters(prev => ({ ...prev, diet: matched.value.toString() }));
        setDietInitialized(true);
      }
    }
  }, [optionsLoaded, dietOptions, finalDiet, dietInitialized]);

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
  }, [optionsLoaded, difficultyOptions, finalCookingLevel, difficultyInitialized]);

  useEffect(() => {
    setFilters(prev => ({ ...prev, types: [] }));
  }, []);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setFilters({ ...filters, [e.target.name]: e.target.value });
  };

  const handleTiposChange = (newValues: string[]) => {
    setFilters({ ...filters, types: newValues });
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
      unit_id: Number(ingredient.unit),
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
        size: 4,
        not_include: [],
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

  if (!optionsLoaded) {
    return <ChefLoader text="Cargando filtros..." />;
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
