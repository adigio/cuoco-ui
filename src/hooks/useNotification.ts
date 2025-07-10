import { useState, useEffect } from 'react';
import { NotificationType, UseNotificationProps, NotificationState } from '@/types';

export const useNotification = ({ 
  autoCloseDelay,
  defaultAutoClose = {
    success: 6000,
    error: 8000,
    warning: 7000,
    info: 6000
  }
}: UseNotificationProps = {}) => {
  const [notification, setNotification] = useState<NotificationState>({
    message: null,
    additionalMessage: null,
    type: 'info',
    show: false
  });

  // Auto-cerrar según el tipo o delay custom
  useEffect(() => {
    if (notification.show) {
      const delay = autoCloseDelay || defaultAutoClose[notification.type] || 3000;
      
      if (delay > 0) {
        const timer = setTimeout(() => {
          clearNotification();
        }, delay);

        return () => clearTimeout(timer);
      }
    }
  }, [notification.show, notification.type, autoCloseDelay, defaultAutoClose]);

  const showNotification = (
    message: string, 
    type: NotificationType = 'info', 
    additionalMessage?: string
  ) => {
    setNotification({
      message,
      additionalMessage,
      type,
      show: true
    });
  };

  const showSuccess = (message: string, additionalMessage?: string) => 
    showNotification(message, 'success', additionalMessage);
  const showError = (message: string, additionalMessage?: string) => 
    showNotification(message, 'error', additionalMessage);
  const showWarning = (message: string, additionalMessage?: string) => 
    showNotification(message, 'warning', additionalMessage);
  const showInfo = (message: string, additionalMessage?: string) => 
    showNotification(message, 'info', additionalMessage);

  const clearNotification = () => {
    setNotification({
      message: null,
      additionalMessage: null,
      type: 'info',
      show: false
    });
  };

  return {
    message: notification.message,
    additionalMessage: notification.additionalMessage,
    type: notification.type,
    show: notification.show,
    showNotification,
    showSuccess,
    showError,
    showWarning,
    showInfo,
    clearNotification,
  };
}; 