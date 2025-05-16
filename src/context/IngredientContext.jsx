'use client';

import { createContext, useContext, useState, useCallback } from 'react';

const IngredientContext = createContext();

export const useIngredients = () => useContext(IngredientContext);

export function IngredientProvider({ children }) {
  const [ingredients, setIngredients] = useState([]);

  // Método para agregar un ingrediente
  const addIngredient = useCallback((nombre, fuente = 'manual', confirmado = true) => {
    if (!nombre || nombre.trim() === '') {
      console.error('El nombre del ingrediente no puede estar vacío');
      return false;
    }

    // Verificar si ya existe un ingrediente con el mismo nombre (case insensitive)
    const exists = ingredients.some(
      (ing) => ing.nombre.toLowerCase() === nombre.toLowerCase()
    );
    
    if (exists) {
      console.warn(`El ingrediente "${nombre}" ya existe en la lista`);
      return false;
    }

    // Agregar el ingrediente
    setIngredients((prev) => [
      ...prev,
      { nombre: nombre.trim(), fuente, confirmado }
    ]);
    
    return true;
  }, [ingredients]);

  const removeIngredient = useCallback((idx) => {
    setIngredients((prev) => prev.filter((_, i) => i !== idx));
  }, []);

  const updateIngredient = useCallback((idx, updatedIngredient) => {
    setIngredients((prev) =>
      prev.map((item, i) => (i === idx ? { ...item, ...updatedIngredient } : item))
    );
  }, []);

  const confirmIngredient = useCallback((idx) => {
    updateIngredient(idx, { confirmado: true });
  }, [updateIngredient]);

  const addMultipleIngredients = useCallback((newIngredients) => {
    // Filtrar duplicados
    const lowerCaseNames = ingredients.map(ing => ing.nombre.toLowerCase());
    const filteredNew = newIngredients.filter(
      ing => !lowerCaseNames.includes(ing.nombre.toLowerCase())
    );
    
    if (filteredNew.length > 0) {
      setIngredients(prev => [...prev, ...filteredNew]);
      return filteredNew.length;
    }
    
    return 0;
  }, [ingredients]);

  const clearIngredients = useCallback(() => {
    setIngredients([]);
  }, []);

  return (
    <IngredientContext.Provider 
      value={{ 
        ingredients, 
        setIngredients,
        addIngredient,
        removeIngredient,
        updateIngredient,
        confirmIngredient,
        addMultipleIngredients,
        clearIngredients
      }}
    >
      {children}
    </IngredientContext.Provider>
  );
}
