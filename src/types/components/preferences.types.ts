import { UserPreferences } from '@/types/auth/auth.types';

export interface PreferenceItem {
  id: number;
  description: string;
}

export interface PreferencesContainerProps {
  initialPreferences?: UserPreferences;
  onComplete: (preferences: UserPreferences) => void;
  showBackButton?: boolean;
  title?: string;
  submitButtonText?: string;
  isEditMode?: boolean;
}
export interface PreferencesStepsProps {
  cookingLevelOptions: PreferenceItem[]
  allergyOptions: PreferenceItem[]
  dietOptions: PreferenceItem[]
  dietaryNeedOptions: PreferenceItem[]
  currentStep: number;
  setCurrentStep: (step: number) => void;
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