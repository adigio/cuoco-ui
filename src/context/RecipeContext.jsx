'use client';

import { createContext, useContext, useState, useEffect } from 'react';

const RecipeContext = createContext();

export const useRecipes = () => useContext(RecipeContext);

// se guarda en localStorage para poder volver atras y tener las recetas
export function RecipeProvider({ children }) {
  // Inicializar con un array vacío para evitar problemas de hidratación
  const [filteredRecipes, setFilteredRecipes] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);

  // Cargar datos del localStorage después de que el componente se monte en el cliente
  useEffect(() => {
    const saved = localStorage.getItem('filteredRecipes');
    if (saved) {
      setFilteredRecipes(JSON.parse(saved));
    }
    setIsLoaded(true);
  }, []);

  // Guardar automáticamente en localStorage cada vez que cambian
  useEffect(() => {
    if (isLoaded && filteredRecipes.length > 0) {
      localStorage.setItem('filteredRecipes', JSON.stringify(filteredRecipes));
    }
  }, [filteredRecipes, isLoaded]);

  return (
    <RecipeContext.Provider value={{ filteredRecipes, setFilteredRecipes }}>
      {children}
    </RecipeContext.Provider>
  );
}
