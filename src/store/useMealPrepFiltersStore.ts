'use client';

import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface MealPrepFilters {
    time: string;
    difficulty: string;
    types: string[];
    diet: string;
    people: number;
    allergies_ids: number[];
    dietary_needs_ids: number[];
    freeze: boolean;
}

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

type MealPrepFiltersState = {
    filters: MealPrepFilters;
    setFilters: (filters: MealPrepFilters | ((prev: MealPrepFilters) => MealPrepFilters)) => void;
    clearFilters: () => void;
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