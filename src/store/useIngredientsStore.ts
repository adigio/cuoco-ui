'use client';

import { Ingredient, IngredientsStore } from '@/types';
import { create } from 'zustand';


export const useIngredientsStore = create<IngredientsStore>((set, get) => ({
  ingredients: [],
   mode: null,
  setMode: (mode) => set({ mode }),
  addIngredient: (name, origin = 'manual', confirm = true) => {
    if (!name || name.trim() === '') {
      console.error('El nombre del ingrediente no puede estar vacío');
      return false;
    }

    const exists = get().ingredients.some(
      (ing) => ing.name.toLowerCase() === name.toLowerCase()
    );

    if (exists) {
      console.warn(`El ingrediente "${name}" ya existe en la lista`);
      return false;
    }

    set((state) => ({
      ingredients: [
        ...state.ingredients,
        { name: name.trim(), origin, confirm },
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
    updateIngredient(idx, { confirm: true });
  },

  addMultipleIngredients: (newIngredients) => {
    const lowerNames = get().ingredients.map((ing) =>
      ing.name.toLowerCase()
    );

    const filtered = newIngredients.filter(
      (ing) => !lowerNames.includes(ing.name.toLowerCase())
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
