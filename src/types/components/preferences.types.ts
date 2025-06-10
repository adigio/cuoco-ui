import { UserPreferences } from '@/types/auth/auth.types';

//export type CookingLevel = 'Bajo' | 'Medio' | 'Alto' | '';
export type DietType = 'Omnívoro' | 'Vegetariano' | 'Vegano' | 'Otro' | '';

export interface PreferencesContainerProps {
  initialPreferences?: UserPreferences;
  onComplete: (preferences: UserPreferences) => void;
  showBackButton?: boolean;
  title?: string;
  submitButtonText?: string;
} 
export interface PreferencesStepsProps {
  currentStep: number;
  setCurrentStep: (step: number) => void;
  level: number;
  setLevel: (level: number) => void;
  diet: number;
  setDiet: (diet: number) => void;
  foodNeeds: number[];
  setFoodNeeds: (needs: number[]) => void;
  allergies: number[];
  setAllergies: (allergies: number[]) => void;
  onComplete: () => void;
  showBackButton?: boolean;
  title?: string;
  submitButtonText?: string;
}
export interface PreferencesModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (preferences: UserPreferences) => void;
  initialPreferences?: UserPreferences;
}

export interface PreferencesDisplayProps {
  preferences?: UserPreferences;
  onEdit?: () => void;
  showEditButton?: boolean;
} 