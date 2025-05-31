import React from 'react';
import { UserPreferences } from '@/types/auth/auth.types';
import PreferencesContainer from '../preferences/PreferencesContainer';
import Modal from './Modal';
import { PreferencesModalProps } from '@/types/components/preferences.types';

export default function PreferencesModal({
  isOpen,
  onClose,
  onSave,
  initialPreferences
}: PreferencesModalProps) {
  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      maxWidth="max-w-md"
      showCloseButton={true}
    >
      <PreferencesContainer
        initialPreferences={initialPreferences}
        onComplete={(prefs) => {
          onSave(prefs);
          onClose();
        }}
        showBackButton={true}
        title="Editar preferencias"
        submitButtonText="Guardar cambios"
      />
    </Modal>
  );
} 