'use client';

import ChefLoader from '@/components/shared/ChefLoader';
import CheckboxGroup from '@/components/shared/form/CheckboxGroup';
import { useIngredients } from '@/context/IngredientContext';
import { useRecipes } from '@/context/RecipeContext';
import { generateRecipes } from '@/services/recipeService';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import RecipeIngredientList from "@/components/recipe-generator/IngredientList";
import Select from '@/components/shared/form/Select';
import Input from '@/components/shared/form/Input';
import Checkbox from '@/components/shared/form/Checkbox';

const tiposDeComida = ['Desayuno', 'Almuerzo', 'Cena', 'Postre', 'Snack'];

// Opciones para los selectores
const tiempoOptions = [
  { value: 'menos de 15 minutos', label: '-15 min' },
  { value: '15 a 30 minutos', label: '15-30 min' },
  { value: 'más de 30 minutos', label: '+30 min' }
];

const dificultadOptions = [
  { value: 'fácil', label: 'Fácil' },
  { value: 'media', label: 'Media' },
  { value: 'difícil', label: 'Difícil' }
];

const dietaOptions = [
  { value: 'vegetariana', label: 'Vegetariana' },
  { value: 'vegana', label: 'Vegana' },
  { value: 'sin gluten', label: 'Sin gluten' },
  { value: 'keto', label: 'Keto' }
];

export default function RecipeFilters({ onSubmit }) {
  const { ingredients, setIngredients } = useIngredients();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const { filteredRecipes, setFilteredRecipes } = useRecipes();


  const [filters, setFilters] = useState({
    tiempo: '',
    dificultad: '',
    tipos: [],
    dieta: '',
    personas: 1,
    useProfilePreferences: false
  });

  const toggleIngredient = (ing) => {
    setSelectedIngredients((prev) =>
      prev.includes(ing) ? prev.filter((i) => i !== ing) : [...prev, ing]
    );
  };

  const handleChange = (e) => {
    setFilters({ ...filters, [e.target.name]: e.target.value });
  };

  const handleTiposChange = (newValues) => {
    setFilters({ ...filters, tipos: newValues });
  };

  const handleProfilePreferencesChange = () => {
    setFilters(prev => ({ ...prev, useProfilePreferences: !prev.useProfilePreferences }));
  };

  const handleFinish = async () => {
    const informationRecipe = {
      ingredients: ingredients,
      filters: filters
    }

    try {
      setLoading(true);
      setError(null);
      console.log("Generando recetas con la información:", informationRecipe);

      const generatedRecipes = await generateRecipes(informationRecipe);

      if (generatedRecipes && generatedRecipes.length > 0) {
        setFilteredRecipes(generatedRecipes);
        console.log("Recetas generadas correctamente:", generatedRecipes);
        router.push('/results');
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

  // Si está cargando, mostramos el ChefLoader
  if (loading) {
    return <ChefLoader text="Generando recetas deliciosas..." />;
  }


  return (
    <div className="flex flex-col  bg-[#fefefe] p-6">
      <h2 className="text-xl font-semibold text-gray-800 mb-4">
        Ingredientes seleccionados
      </h2>
      <RecipeIngredientList
        ingredients={ingredients}
        setIngredients={setIngredients}
        enabledDelete={false}
      />
      <hr className="my-6" />
      <h2 className="text-3xl font-semibold mb-4 text-center">Filtros</h2>

      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          {error}
        </div>
      )}

      <div className="grid grid-cols-2 gap-4">
        <Select
          name="tiempo"
          value={filters.tiempo}
          onChange={handleChange}
          options={tiempoOptions}
          label="Tiempo de preparación"
        />

        <Select
          name="dificultad"
          value={filters.dificultad}
          onChange={handleChange}
          options={dificultadOptions}
          label="Dificultad"
        />

        <Select
          name="dieta"
          value={filters.dieta}
          onChange={handleChange}
          options={dietaOptions}
          label="Dieta"
        />

        <Input
          type="number"
          name="personas"
          value={filters.personas}
          onChange={handleChange}
          label="Cantidad de personas"
          min="1"
        />
      </div>

      <div className="grid grid-cols-2 gap-4 mt-6">
        <CheckboxGroup
          title="Tipo de comida"
          options={tiposDeComida}
          selectedValues={filters.tipos}
          onChange={handleTiposChange}
        />

        <div>
          <h3 className={`text-lg font-medium mb-2 text-gray-800`}>Preferencias de perfil</h3>
          <Checkbox
            name="profile-preferences"
            checked={filters.useProfilePreferences}
            onChange={handleProfilePreferencesChange}
            label="Tener en cuenta las preferencias del perfil configurado"
          />
        </div>
      </div>

      <div className="flex justify-between mt-8">
        <button
          onClick={() => router.push('/review')}
          className="bg-gray-200 text-gray-800 px-6 py-2 rounded hover:bg-gray-300 transition"
          disabled={loading}
        >
          Volver
        </button>

        <button
          onClick={handleFinish}
          disabled={loading}
          className={`
            ${loading ? "bg-gray-400 cursor-not-allowed" : "bg-[#f37b6a] hover:bg-[#e36455] cursor-pointer"} 
            text-white px-6 py-2 rounded transition
          `}
        >
          {loading ? "Generando..." : "Generar Recetas"}
        </button>
      </div>
    </div>
  );
}
