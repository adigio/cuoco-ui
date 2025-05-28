'use client';

import { ReactNode } from "react";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
}

export default function ModalPreferences({ isOpen, onClose, children }: ModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-opacity-40 flex justify-center items-center z-50">
      <div className="bg-white rounded-xl shadow-lg p-6 max-w-xl w-full relative">
        <button onClick={onClose} className="absolute top-2 right-2 text-gray-600 hover:text-black">
          ✕
        </button>
        {children}
      </div>
    </div>
  );
}
