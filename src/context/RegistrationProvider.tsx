'use client';

import React, { createContext, useContext } from 'react';
import { RegistrationContextType, RegistrationProviderProps } from '@/types';

const RegistrationContext = createContext<RegistrationContextType | undefined>(undefined);

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