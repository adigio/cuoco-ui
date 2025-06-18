'use client';

import React, { createContext, useContext, ReactNode } from 'react';
import { useNotification } from '@/hooks/useNotification';

interface RegistrationContextType {
  showSuccess: (message: string, additionalMessage?: string) => void;
  showError: (message: string, additionalMessage?: string) => void;
  showWarning: (message: string, additionalMessage?: string) => void;
  showInfo: (message: string, additionalMessage?: string) => void;
}

const RegistrationContext = createContext<RegistrationContextType | undefined>(undefined);

interface RegistrationProviderProps {
  children: ReactNode;
  notificationHook: ReturnType<typeof useNotification>;
}

export function RegistrationProvider({ children, notificationHook }: RegistrationProviderProps) {
  const { showSuccess, showError, showWarning, showInfo } = notificationHook;

  const contextValue: RegistrationContextType = {
    showSuccess,
    showError,
    showWarning,
    showInfo,
  };

  return (
    <RegistrationContext.Provider value={contextValue}>
      {children}
    </RegistrationContext.Provider>
  );
}

export function useRegistrationNotification(): RegistrationContextType {
  const context = useContext(RegistrationContext);
  if (!context) {
    throw new Error('useRegistrationNotification must be used within a RegistrationProvider');
  }
  return context;
} 