import { ReactNode } from 'react';

export interface TimeAndFavoriteProps {
  time?: string;
  minutes?: number;
  onToggleFavorite: () => void;
  isFavorite?: boolean;
}

export interface BaseSkeletonProps {
  className?: string;
  width?: string | number;
  height?: string | number;
}

export interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export interface CustomCheckboxProps {
  id: string;
  name: string;
  checked: boolean;
  onChange: () => void;
  label: string;
  className?: string;
  checkboxClassName?: string;
  labelClassName?: string;
  disabled?: boolean;
}

export interface UnfavoriteModalProps {
  type?: 'recipe' | 'meal-prep';
  isOpen: boolean;
  onClose: () => void;
  onUnfavoriteSuccess?: () => void;
  recipeId: number;
  recipeText: string;
  showSuccess: (message: string, additionalMessage?: string) => void;
  showError: (message: string, additionalMessage?: string) => void;
}

export interface SubscriptionModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: ReactNode;
}

export interface NotificationModalProps {
  show: boolean;
  onClose: () => void;
  title?: string;
  message: string | null;
  additionalMessage?: string | null;
  type: 'success' | 'error' | 'warning' | 'info';
  autoCloseTime?: number;
}

export interface FastRecipeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export interface ConfirmationModalProps {
  isOpen: boolean;
  title?: string;
  children: ReactNode;
  confirmText?: string;
  cancelText?: string;
  onConfirm: () => void;
  onCancel: () => void;
} 