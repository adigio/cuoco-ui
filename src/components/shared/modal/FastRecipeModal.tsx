import React from 'react';
import Modal from './Modal';
import { PreferencesModalProps } from '@/types/components/preferences.types';

export default function FastRecipeModal({
    isOpen,
    onClose,
    initialPreferences
}: PreferencesModalProps) {
    return (
        <Modal
            isOpen={isOpen}
            onClose={onClose}
            maxWidth="max-w-md"
            showCloseButton={true}
        >
            <p>HOLA! </p>
            {/** TODO: Crear componente para la modal de preferencias rápidas */}
        </Modal>
    );
} 