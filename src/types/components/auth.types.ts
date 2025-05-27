import { StepKey } from '../auth/auth.types';
import { ComponentType } from 'react';

export interface RegisterStepBoxProps {
  icon: ComponentType<any>;
  title: string;
  description: string;
  buttonText: string;
  onClick: () => void;
  completed?: boolean;
  disabled?: boolean;
  color?: string;
}

export interface RegisterModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

export interface RegisterStepperProps {
  step: number;
  onComplete: (step: StepKey) => void;
} 