import { PreferenceItem } from '@/types'
import { create } from 'zustand'
import { persist } from 'zustand/middleware'

interface PreferencesStore {
    cookingLevelOptions: PreferenceItem[]
    allergyOptions: PreferenceItem[]
    dietOptions: PreferenceItem[]
    dietaryNeedOptions: PreferenceItem[]
    isLoaded: boolean

    setCookingLevelOptions: (options: PreferenceItem[]) => void
    setAllergyOptions: (options: PreferenceItem[]) => void
    setDietOptions: (options: PreferenceItem[]) => void
    setDietaryNeedOptions: (options: PreferenceItem[]) => void
    setIsLoaded: (loaded: boolean) => void

    resetPreferences: () => void
}

export const usePreferencesStore = create<PreferencesStore>()(
    persist(
        (set) => ({
            cookingLevelOptions: [],
            allergyOptions: [],
            dietOptions: [],
            dietaryNeedOptions: [],
            isLoaded: false,

            setCookingLevelOptions: (options) => set({ cookingLevelOptions: options }),
            setAllergyOptions: (options) => set({ allergyOptions: options }),
            setDietOptions: (options) => set({ dietOptions: options }),
            setDietaryNeedOptions: (options) => set({ dietaryNeedOptions: options }),
            setIsLoaded: (loaded) => set({ isLoaded: loaded }),

            resetPreferences: () =>
                set({
                    cookingLevelOptions: [],
                    allergyOptions: [],
                    dietOptions: [],
                    dietaryNeedOptions: [],
                    isLoaded: false
                }),
        }),
        {
            name: 'preferences-storage', // clave en localStorage
        }
    )
)
