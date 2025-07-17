import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { RegisterStore } from '@/types';

export const useRegisterStore = create<RegisterStore>()(
  persist(
    (set) => ({
      name: '',
      email: '',
      password: '',
      confirmPass: '',
      cookingLevel: 2, // Radio button: primer nivel por defecto
      diet: 1, // Radio button: primera dieta por defecto  
      foodNeeds: [], // Checkboxes: empezar vacíos
      allergies: [], // Checkboxes: empezar vacíos
      termsAccepted: false,
      favouriteCuisines: [],

      setName: (name) => set({ name }),
      setEmail: (email) => set({ email }),
      setPassword: (password) => set({ password }),
      setConfirmPass: (confirmPass) => set({ confirmPass }),
      setCookingLevel: (cookingLevel) => set({ cookingLevel }),
      setDiet: (diet) => set({ diet }),
      setFoodNeeds: (foodNeeds) => set({ foodNeeds }),
      setAllergies: (allergies) => set({ allergies }),
      setTermsAccepted: (termsAccepted) => set({ termsAccepted }),
      setfavouriteCuisines: (favouriteCuisines) => set({ favouriteCuisines }),

      reset: () =>
        set({
          name: '',
          email: '',
          password: '',
          confirmPass: '',
          cookingLevel: 2,
          diet: 1,
          foodNeeds: [],
          allergies: [],
          termsAccepted: false,
          favouriteCuisines: [],
        }),

      resetPreferences: () =>
        set({
          cookingLevel: 1,
          diet: 1,
          foodNeeds: [],
          allergies: [],
          favouriteCuisines: [],
        }),
    }),
    {
      name: 'register-store',
    }
  )
)
