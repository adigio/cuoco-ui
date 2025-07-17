'use client';

import { Ingredient, IngredientsStore } from '@/types';
import { create } from 'zustand';

export const useIngredientsStore = create<IngredientsStore>((set, get) => ({
  ingredients: [],
  mode: null,
  generatorSessionActive: false,

  setMode: (mode) => set({ mode }),

  startGeneratorSession: () => {
    set({ generatorSessionActive: true });
  },

  endGeneratorSession: () => {
    set({ 
      generatorSessionActive: false,
      ingredients: [],
      mode: null 
    });
  },

  clearIngredientsIfNeeded: (currentPath: string) => {
    const generatorPaths = [
      '/recipe-generator',
      '/review', 
      '/filters',
      '/results',
      '/recipe/',
      '/meal-prep/',
      '/results-meal'
    ];
    
    const isInGeneratorFlow = generatorPaths.some(path => currentPath.includes(path));
    const { generatorSessionActive } = get();

    if (!isInGeneratorFlow && generatorSessionActive) {
      set({ 
        ingredients: [],
        generatorSessionActive: false,
        mode: null 
      });
    }
    else if (isInGeneratorFlow && !generatorSessionActive) {
      set({ generatorSessionActive: true });
    }
  },

  addIngredient: (
    name,
    quantity,
    unit: { id: number; description: string; symbol?: string }, 
    optional = false,
    source = 'manual',
    confirmed = true
  ) => {
    if (!name || name.trim() === '') {
      return false;
    }

    const exists = get().ingredients.some(
      (ing) => ing.name.toLowerCase() === name.toLowerCase()
    );

    if (exists) {
      return false;
    }

   const newIngredient: Ingredient = {
  name,
  quantity,
  unit, 
  optional,
  source,
  confirmed,
};

    set((state) => ({
      ingredients: [...state.ingredients, newIngredient],
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
    updateIngredient(idx, { confirmed: true });
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
