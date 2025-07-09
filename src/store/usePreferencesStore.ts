import { PreferenceItem } from '@/types'
import { create } from 'zustand'
import { persist } from 'zustand/middleware'

interface PreferencesStore {
    cookingLevelOptions: PreferenceItem[]
    allergyOptions: PreferenceItem[]
    dietOptions: PreferenceItem[]
    dietaryNeedOptions: PreferenceItem[]
    unitOptions: PreferenceItem[]
    preparationTimeOptions: PreferenceItem[]
    mealTypeOptions: PreferenceItem[]
    isLoaded: boolean
    lastFetchTimestamp: number | null
    loadedWithAuth: boolean
    isFetching: boolean

    setCookingLevelOptions: (options: PreferenceItem[]) => void
    setAllergyOptions: (options: PreferenceItem[]) => void
    setDietOptions: (options: PreferenceItem[]) => void
    setDietaryNeedOptions: (options: PreferenceItem[]) => void
    setUnitOptions: (options: PreferenceItem[]) => void
    setPreparationTimeOptions: (options: PreferenceItem[]) => void
    setMealTypeOptions: (options: PreferenceItem[]) => void
    setIsLoaded: (loaded: boolean) => void
    setLastFetchTimestamp: (timestamp: number | null) => void
    setLoadedWithAuth: (withAuth: boolean) => void
    setIsFetching: (fetching: boolean) => void

    resetPreferences: () => void
}

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
