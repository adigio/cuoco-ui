'use client';

import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Filters, RecipeFiltersState } from '@/types';

const initialFilters: Filters = {
    time: "",
    difficulty: "",
    types: [],
    diet: "",
    people: 1,
    allergies_ids: [],
    dietary_needs_ids: [],
    useProfilePreferences: false,
};

export const useRecipeFiltersStore = create<RecipeFiltersState>()(
    persist(
        (set) => ({
            filters: initialFilters,
            setFilters: (filters) => set(state => ({ 
                filters: typeof filters === 'function' ? filters(state.filters) : filters 
            })),
            clearFilters: () => set({ filters: initialFilters }),
        }),
        {
            name: 'recipeFilters', // clave localStorage
        }
    )
);
