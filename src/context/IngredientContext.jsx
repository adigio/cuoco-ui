'use client';

import { createContext, useContext, useState } from 'react';

const IngredientContext = createContext();

export const useIngredients = () => useContext(IngredientContext);

export function IngredientProvider({ children }) {
  const [ingredients, setIngredients] = useState([]);

  return (
    <IngredientContext.Provider value={{ ingredients, setIngredients }}>
      {children}
    </IngredientContext.Provider>
  );
}
