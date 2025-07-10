import { ReactNode } from 'react';

// ================================
// CONTEXT TYPES
// ================================

// Registration Context
export interface RegistrationContextType {
  showSuccess: (message: string, additionalMessage?: string) => void;
  showError: (message: string, additionalMessage?: string) => void;
  showWarning: (message: string, additionalMessage?: string) => void;
  showInfo: (message: string, additionalMessage?: string) => void;
}

export interface UseNotificationReturn {
  message: string | null;
  additionalMessage?: string | null;
  type: NotificationType;
  show: boolean;
  showNotification: (message: string, type?: NotificationType, additionalMessage?: string) => void;
  showSuccess: (message: string, additionalMessage?: string) => void;
  showError: (message: string, additionalMessage?: string) => void;
  showWarning: (message: string, additionalMessage?: string) => void;
  showInfo: (message: string, additionalMessage?: string) => void;
  clearNotification: () => void;
}

export interface RegistrationProviderProps {
  children: ReactNode;
  notificationHook: UseNotificationReturn;
}

// ================================
// HOOK TYPES
// ================================

// Notification Hook Types
export type NotificationType = 'success' | 'error' | 'warning' | 'info';

export interface UseNotificationProps {
  autoCloseDelay?: number; // milisegundos, 0 = no auto close
  defaultAutoClose?: {
    success?: number;
    error?: number;
    warning?: number;
    info?: number;
  };
}

export interface NotificationState {
  message: string | null;
  additionalMessage?: string | null; // Mensaje adicional del backend
  type: NotificationType;
  show: boolean;
}

// API Detail Hook Types
export interface UseApiDetailOptions {
  onError?: (error: Error) => void;
} 