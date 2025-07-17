import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { PreferencesStore } from '@/types';

export const usePreferencesStore = create<PreferencesStore>()(
    persist(
        (set) => ({
            cookingLevelOptions: [],
            allergyOptions: [],
            dietOptions: [],
            dietaryNeedOptions: [],
            unitOptions: [],
            preparationTimeOptions: [],
            mealTypeOptions: [],
            isLoaded: false,
            lastFetchTimestamp: null,
            loadedWithAuth: false,
            isFetching: false,

            setCookingLevelOptions: (options) => set({ cookingLevelOptions: options }),
            setAllergyOptions: (options) => set({ allergyOptions: options }),
            setDietOptions: (options) => set({ dietOptions: options }),
            setDietaryNeedOptions: (options) => set({ dietaryNeedOptions: options }),
            setUnitOptions: (options) => set({ unitOptions: options }),
            setPreparationTimeOptions: (options) => set({ preparationTimeOptions: options }),
            setMealTypeOptions: (options) => set({ mealTypeOptions: options }),
            setIsLoaded: (loaded) => set({ isLoaded: loaded }),
            setLastFetchTimestamp: (timestamp) => set({ lastFetchTimestamp: timestamp }),
            setLoadedWithAuth: (withAuth) => set({ loadedWithAuth: withAuth }),
            setIsFetching: (fetching) => set({ isFetching: fetching }),

            resetPreferences: () =>
                set({
                    cookingLevelOptions: [],
                    allergyOptions: [],
                    dietOptions: [],
                    dietaryNeedOptions: [],
                    unitOptions: [],
                    preparationTimeOptions: [],
                    mealTypeOptions: [],
                    isLoaded: false,
                    lastFetchTimestamp: null,
                    loadedWithAuth: false,
                    isFetching: false,
                }),
        }),
        {
            name: 'preferences-storage',
        }
    )
)
