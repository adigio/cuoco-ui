'use client';

import React, { ReactNode } from 'react';
import Modal from '@/components/shared/modal/Modal';

interface ConfirmationModalProps {
  isOpen: boolean;
  title?: string;
  children: ReactNode;              // aquí va el texto o JSX del cuerpo
  confirmText?: string;            // por defecto “Confirmar”
  cancelText?: string;             // por defecto “Cancelar”
  onConfirm: () => void;
  onCancel: () => void;
}

export default function ConfirmationModal({
  isOpen,
  title = '¿Estás seguro?',
  children,
  confirmText = 'Confirmar',
  cancelText = 'Cancelar',
  onConfirm,
  onCancel,
}: ConfirmationModalProps) {
  return (
    <Modal isOpen={isOpen} onClose={onCancel}>
      <div className="p-4">
        {title && <h2 className="text-lg font-semibold mb-2">{title}</h2>}
        <div className="mb-4 text-gray-700">{children}</div>
        <div className="flex justify-end gap-2">
          <button
            onClick={onCancel}
            className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
          >
            {cancelText}
          </button>
          <button
            onClick={onConfirm}
            className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
          >
            {confirmText}
          </button>
        </div>
      </div>
    </Modal>
  );
}
