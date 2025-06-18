'use client';

import React from 'react';
import Modal from './Modal';
import { NotificationType } from '@/hooks/useNotification';

interface NotificationModalProps {
  show: boolean;
  onClose: () => void;
  title?: string;
  message: string | null;
  additionalMessage?: string | null; // Mensaje adicional del backend
  type: NotificationType;
  autoCloseTime?: number;
}

const getNotificationConfig = (type: NotificationType) => {
  const configs = {
    success: {
      icon: (
        <svg className="h-6 w-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
        </svg>
      ),
      bgColor: 'bg-green-100',
      title: 'Éxito',
      textColor: 'text-green-800',
      buttonColor: 'bg-green-600 hover:bg-green-700'
    },
    error: {
      icon: (
        <svg className="h-6 w-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
        </svg>
      ),
      bgColor: 'bg-red-100',
      title: 'Error',
      textColor: 'text-red-800',
      buttonColor: 'bg-red-600 hover:bg-red-700'
    },
    warning: {
      icon: (
        <svg className="h-6 w-6 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.732-.833-2.5 0L4.268 16.5c-.77.833.192 2.5 1.732 2.5z" />
        </svg>
      ),
      bgColor: 'bg-yellow-100',
      title: 'Advertencia',
      textColor: 'text-yellow-800',
      buttonColor: 'bg-yellow-600 hover:bg-yellow-700'
    },
    info: {
      icon: (
        <svg className="h-6 w-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
      bgColor: 'bg-blue-100',
      title: 'Información',
      textColor: 'text-blue-800',
      buttonColor: 'bg-blue-600 hover:bg-blue-700'
    }
  };

  return configs[type];
};

export default function NotificationModal({
  show,
  onClose,
  title,
  message,
  additionalMessage,
  type,
  autoCloseTime
}: NotificationModalProps) {
  const config = getNotificationConfig(type);
  const modalTitle = title || config.title;

  return (
    <Modal
      isOpen={show}
      onClose={onClose}
      maxWidth="max-w-md"
      showCloseButton={false} 
    >
      {/* Título del modal */}
      <h2 className="text-xl font-semibold mb-4 text-gray-800">{modalTitle}</h2>
      
      <div className="text-center mb-6">
        {/* Icono según el tipo */}
        <div className={`mx-auto flex items-center justify-center h-12 w-12 rounded-full ${config.bgColor} mb-4`}>
          {config.icon}
        </div>
        
        <p className={`mb-2 ${config.textColor} font-medium`}>{message}</p>
        
        {additionalMessage && (
          <p className="text-sm text-gray-600 mt-2 bg-gray-50 p-2 rounded">
            {additionalMessage}
          </p>
        )}
      </div>

      {/* Botón de cerrar */}
      <div className="flex justify-end">
        <button
          onClick={onClose}
          className={`px-6 py-2 text-white rounded-lg transition-colors ${config.buttonColor}`}
        >
          Cerrar
        </button>
      </div>
    </Modal>
  );
} 