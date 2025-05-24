'use client';

import { Ingredient, IngredientsStore } from '@/types';
import { create } from 'zustand';


export const useIngredientsStore = create<IngredientsStore>((set, get) => ({
  ingredients: [],

  addIngredient: (nombre, fuente = 'manual', confirmado = true) => {
    if (!nombre || nombre.trim() === '') {
      console.error('El nombre del ingrediente no puede estar vacío');
      return false;
    }

    const exists = get().ingredients.some(
      (ing) => ing.nombre.toLowerCase() === nombre.toLowerCase()
    );

    if (exists) {
      console.warn(`El ingrediente "${nombre}" ya existe en la lista`);
      return false;
    }

    set((state) => ({
      ingredients: [
        ...state.ingredients,
        { nombre: nombre.trim(), fuente, confirmado },
      ],
    }));

    return true;
  },

  removeIngredient: (idx) => {
    set((state) => ({
      ingredients: state.ingredients.filter((_, i) => i !== idx),
    }));
  },

  updateIngredient: (idx, updated) => {
    set((state) => ({
      ingredients: state.ingredients.map((item, i) =>
        i === idx ? { ...item, ...updated } : item
      ),
    }));
  },

  confirmIngredient: (idx) => {
    const { updateIngredient } = get();
    updateIngredient(idx, { confirmado: true });
  },

  addMultipleIngredients: (newIngredients) => {
    const lowerNames = get().ingredients.map((ing) =>
      ing.nombre.toLowerCase()
    );

    const filtered = newIngredients.filter(
      (ing) => !lowerNames.includes(ing.nombre.toLowerCase())
    );

    if (filtered.length > 0) {
      set((state) => ({
        ingredients: [...state.ingredients, ...filtered],
      }));
    }

    return filtered.length;
  },

  clearIngredients: () => {
    set({ ingredients: [] });
  },
}));
