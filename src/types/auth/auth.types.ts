// Tipos para el proceso de registro
export type StepKey = "email" | "prefs" | "password";

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
  plan?: {
    id: number;
    description: string;
  };
}

export interface PreferenceItem {
  id: number;
  description: string;
  symbol?:string;
}

export interface UserPreferences {
  cook_level?: number;
  diet?: number;
  cookingLevel?: string;
  dietaryRestrictions?: number[];
  allergies?: number[];
  favourite_cuisines?: number[];
}
