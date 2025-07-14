import { PreferenceItem } from '@/types/auth/auth.types';
import { Filters } from '@/types';

// ================================
// ERROR STORE TYPES
// ================================
export interface ErrorState {
  error: string | null;
  showError: boolean;
  setError: (error: string) => void;
  clearError: () => void;
}

// ================================
// CALENDAR STORE TYPES
// ================================
export interface PendingRecipe {
  id: number;
  title: string;
  image: string;
  mealTypes: number[];
}

export interface CalendarStore {
  pendingRecipe: PendingRecipe | null;
  setPendingRecipe: (recipe: PendingRecipe) => void;
  clearPendingRecipe: () => void;
}

// ================================
// REGISTRATION STORE TYPES
// ================================
export interface RegisterStore {
  name: string;
  email: string;
  password: string;
  confirmPass: string;
  cookingLevel: number;
  diet: number;
  foodNeeds: number[];
  allergies: number[];
  favouriteCuisines: number[];
  termsAccepted: boolean;

  // Setters
  setName: (name: string) => void;
  setEmail: (email: string) => void;
  setPassword: (password: string) => void;
  setConfirmPass: (pass: string) => void;
  setCookingLevel: (level: number) => void;
  setDiet: (diet: number) => void;
  setFoodNeeds: (needs: number[]) => void;
  setAllergies: (all: number[]) => void;
  setTermsAccepted: (terms: boolean) => void;
  setfavouriteCuisines: (favouriteCuisines: number[]) => void;

  reset: () => void;
  resetPreferences: () => void;
}

// ================================
// FAVORITES STORE TYPES
// ================================
export interface FavoritesState {
  favoriteRecipeIds: number[];
  favoriteMealPrepIds: number[];
  addFavoriteRecipe: (recipeId: number) => void;
  removeFavoriteRecipe: (recipeId: number) => void;
  addFavoriteMealPrep: (mealPrepId: number) => void;
  removeFavoriteMealPrep: (mealPrepId: number) => void;
  isFavoriteRecipe: (recipeId: number) => boolean;
  isFavoriteMealPrep: (mealPrepId: number) => boolean;
  clearFavorites: () => void;
  addFavorite: (recipeId: number) => void;
  removeFavorite: (recipeId: number) => void;
  isFavorite: (recipeId: number) => boolean;
}

// ================================
// MEAL PREP FILTERS STORE TYPES
// ================================
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

export interface MealPrepFiltersState {
  filters: MealPrepFilters;
  setFilters: (filters: MealPrepFilters | ((prev: MealPrepFilters) => MealPrepFilters)) => void;
  clearFilters: () => void;
}

// ================================
// RECIPE FILTERS STORE TYPES
// ================================

export interface RecipeFiltersState {
  filters: Filters;
  setFilters: (filters: Filters | ((prev: Filters) => Filters)) => void;
  clearFilters: () => void;
}

// ================================
// PREFERENCES STORE TYPES
// ================================
export interface PreferencesStore {
  cookingLevelOptions: PreferenceItem[];
  allergyOptions: PreferenceItem[];
  dietOptions: PreferenceItem[];
  dietaryNeedOptions: PreferenceItem[];
  unitOptions: PreferenceItem[];
  preparationTimeOptions: PreferenceItem[];
  mealTypeOptions: PreferenceItem[];
  isLoaded: boolean;
  lastFetchTimestamp: number | null;
  loadedWithAuth: boolean;
  isFetching: boolean;

  setCookingLevelOptions: (options: PreferenceItem[]) => void;
  setAllergyOptions: (options: PreferenceItem[]) => void;
  setDietOptions: (options: PreferenceItem[]) => void;
  setDietaryNeedOptions: (options: PreferenceItem[]) => void;
  setUnitOptions: (options: PreferenceItem[]) => void;
  setPreparationTimeOptions: (options: PreferenceItem[]) => void;
  setMealTypeOptions: (options: PreferenceItem[]) => void;
  setIsLoaded: (loaded: boolean) => void;
  setLastFetchTimestamp: (timestamp: number | null) => void;
  setLoadedWithAuth: (withAuth: boolean) => void;
  setIsFetching: (fetching: boolean) => void;

  resetPreferences: () => void;
} 