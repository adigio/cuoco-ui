// Tipos para el proceso de registro
export type StepKey = 'email' | 'prefs' | 'password';

export interface RegisterState {
  currentStep: StepKey | null;
  completedSteps: StepKey[];
  registerFinished: boolean;
}

// Tipos para el formulario de registro
export interface RegisterFormData {
  email: string;
  password: string;
  confirmPassword: string;
  preferences?: UserPreferences;
}

export interface UserPreferences {
  dietaryRestrictions?: string[];
  cookingLevel?: 'Bajo' | 'Medio' | 'Alto';
  favoriteCuisines?: string[];
  allergies?: string[];
  diet?: 'Omnívoro' | 'Vegetariano' | 'Vegano' | 'Otro';
}

// Tipos para el proceso de inicio de sesión
export interface LoginFormData {
  email: string;
  password: string;
  rememberMe?: boolean;
}

// Tipo para el usuario
export interface User {
  email: string;
  name?: string;
  premium?: boolean;
  token?: string;
  preferences?: UserPreferences;
} 