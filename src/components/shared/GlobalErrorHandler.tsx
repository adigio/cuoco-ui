'use client';

import { useErrorStore } from '@/store/useErrorStore';
import NotificationModal from '@/components/shared/modal/NotificationModal';

export default function GlobalErrorHandler() {
  const { error, showError, clearError } = useErrorStore();

  return (
    <NotificationModal
      show={showError}
      onClose={clearError}
      message="Error de servidor"
      additionalMessage={error}
      type="error"
    />
  );
} 