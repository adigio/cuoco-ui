'use client';

import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { MealPrepFilters, MealPrepFiltersState } from '@/types';

const initialMealPrepFilters: MealPrepFilters = {
    time: "",
    difficulty: "",
    types: [],
    diet: "",
    people: 1,
    allergies_ids: [],
    dietary_needs_ids: [],
    freeze: false,
};

export const useMealPrepFiltersStore = create<MealPrepFiltersState>()(
    persist(
        (set) => ({
            filters: initialMealPrepFilters,
            setFilters: (filters) => set(state => ({ 
                filters: typeof filters === 'function' ? filters(state.filters) : filters 
            })),
            clearFilters: () => set({ filters: initialMealPrepFilters }),
        }),
        {
            name: 'mealPrepFilters',
        }
    )
); 