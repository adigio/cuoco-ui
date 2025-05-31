import { UserPreferences } from '@/types/auth/auth.types';

export type CookingLevel = 'Bajo' | 'Medio' | 'Alto' | '';
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
  level: CookingLevel;
  setLevel: (level: CookingLevel) => void;
  diet: DietType;
  setDiet: (diet: DietType) => void;
  foodNeeds: string[];
  setFoodNeeds: (needs: string[]) => void;
  allergies: string[];
  setAllergies: (allergies: string[]) => void;
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