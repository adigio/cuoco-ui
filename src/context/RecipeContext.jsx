'use client';

import { createContext, useContext, useState, useEffect } from 'react';

const RecipeContext = createContext();

export const useRecipes = () => useContext(RecipeContext);

// se guarda en localStorage para poder volver atras y tener las recetas
export function RecipeProvider({ children }) {
  const [filteredRecipes, setFilteredRecipes] = useState(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('filteredRecipes');
      return saved ? JSON.parse(saved) : [];
    }
    return [];
  });

  // Guardar automáticamente en localStorage cada vez que cambian
  useEffect(() => {
    if (filteredRecipes.length > 0) {
      localStorage.setItem('filteredRecipes', JSON.stringify(filteredRecipes));
    }
  }, [filteredRecipes]);

  return (
    <RecipeContext.Provider value={{ filteredRecipes, setFilteredRecipes }}>
      {children}
    </RecipeContext.Provider>
  );
}
