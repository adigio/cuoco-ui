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
  cookingLevel?: 'beginner' | 'intermediate' | 'advanced';
  favoriteCuisines?: string[];
  allergies?: string[];
}

// Tipos para el proceso de inicio de sesión
export interface LoginFormData {
  email: string;
  password: string;
  rememberMe?: boolean;
} 