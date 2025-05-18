'use client';

import ChefLoader from '@/components/shared/ChefLoader';
import { useIngredients } from '@/context/IngredientContext';
import { useRecipes } from '@/context/RecipeContext';
import { generateRecipes } from '@/services/recipeService';
import { useRouter } from 'next/navigation';
import { useState } from 'react'; 
import RecipeIngredientList from "@/components/recipe-generator/IngredientList";

const tiposDeComida = ['Desayuno', 'Almuerzo', 'Cena', 'Postre', 'Snack'];

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
  });

  const toggleIngredient = (ing) => {
    setSelectedIngredients((prev) =>
      prev.includes(ing) ? prev.filter((i) => i !== ing) : [...prev, ing]
    );
  };

  const handleChange = (e) => {
    setFilters({ ...filters, [e.target.name]: e.target.value });
  };

  const toggleTipo = (tipo) => {
    setFilters((prev) => {
      const tipos = prev.tipos.includes(tipo)
        ? prev.tipos.filter((t) => t !== tipo)
        : [...prev.tipos, tipo];
      return { ...prev, tipos };
    });
  };

  const handleFinish = async () => {
    //const ingredientsArray = ingredients.map(ing => ing.nombre);
    
    const informationRecipe = {
      ingredients: ingredients,
      filters: filters
    }

    try{
      setLoading(true);
      console.log(informationRecipe);
      const generatedRecipes = await generateRecipes(informationRecipe);
      setFilteredRecipes(generatedRecipes);

      console.log("recetas generadas por el 'back ", generatedRecipes); 
      router.push('/results');
    }catch(error){
      setError(error);
    }finally{
      setLoading(false);
    }
  };

  if (loading) {
    return <ChefLoader />;
  }


  return (
    <div className="flex flex-col min-h-screen bg-[#fefefe] p-6"> 
     <h2 className="text-xl font-semibold text-gray-800 mb-4">
            Ingredientes seleccionados
          </h2>
          <RecipeIngredientList
            ingredients={ingredients}
            setIngredients={setIngredients}
          />
          <hr className="my-6" />
      <h2 className="text-3xl font-semibold mb-4 text-center">Filtros</h2>
      <div className="grid grid-cols-2 gap-4">
        <div className="flex flex-col">
          <label className="text-sm font-medium mb-1 text-gray-700">Tiempo de preparación</label>
          <select name="tiempo" value={filters.tiempo} onChange={handleChange} className="p-2 border rounded">
            <option value="">Seleccionar</option>
            <option value="menos de 15 minutos">-15 min</option>
            <option value="15 a 30 minutos">15-30 min</option>
            <option value="más de 30 minutos">+30 min</option>
          </select>
        </div>

        <div className="flex flex-col">
          <label className="text-sm font-medium mb-1 text-gray-700">Dificultad</label>
          <select name="dificultad" value={filters.dificultad} onChange={handleChange} className="p-2 border rounded">
            <option value="">Seleccionar</option>
            <option value="fácil">Fácil</option>
            <option value="media">Media</option>
            <option value="difícil">Difícil</option>
          </select>
        </div>

        <div className="flex flex-col">
          <label className="text-sm font-medium mb-1 text-gray-700">Dieta</label>
          <select name="dieta" value={filters.dieta} onChange={handleChange} className="p-2 border rounded">
            <option value="">Seleccionar</option>
            <option value="vegetariana">Vegetariana</option>
            <option value="vegana">Vegana</option>
            <option value="sin gluten">Sin gluten</option>
            <option value="keto">Keto</option>
          </select>
        </div>

        <div className="flex flex-col">
          <label className="text-sm font-medium mb-1 text-gray-700">Cantidad de personas</label>
          <input
            type="number"
            name="personas"
            value={filters.personas}
            onChange={handleChange}
            className="p-2 border rounded"
            min="1"
          />
        </div>
      </div>

      <div className="mt-6">
        <h3 className="text-lg font-medium mb-2">Tipo de comida</h3>
        <div className="flex flex-wrap gap-4">
          {tiposDeComida.map((tipo) => (
            <label key={tipo} className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={filters.tipos.includes(tipo)}
                onChange={() => toggleTipo(tipo)}
              />
              {tipo}
            </label>
          ))}
        </div>
      </div>
       {/* <h2 className="text-xl font-semibold mb-4">Seleccioná ingredientes</h2>
      <div className="flex flex-wrap gap-2 mb-6">
        {ingredientesEjemplo.map((ing) => (
          <button
            key={ing}
            onClick={() => toggleIngredient(ing)}
            className={`px-3 py-1 rounded border ${
              ingredients.includes(ing) ? 'bg-blue-500 text-white' : 'bg-gray-100'
            }`}
          >
            {ing}
          </button>
        ))}
      </div> */}

      <div className="flex justify-between mt-8">
        <button
          onClick={() => router.push('/review')}
          className="bg-gray-200 text-gray-800 px-6 py-2 rounded hover:bg-gray-300 transition"
        >
          Volver
        </button>

        <button
          onClick={handleFinish}
          className="bg-[#f37b6a] text-white px-6 py-2 rounded hover:bg-[#e36455] transition"
        >
          Ir a filtros
        </button>
      </div>
    </div>
  );
}
