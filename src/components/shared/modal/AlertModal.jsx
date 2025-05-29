'use client';

import React from 'react';

export default function AlertModal({ show, onClose, title = 'Atención', children }) {
  if (!show) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black-50 bg-opacity-50">
      <div className="bg-white rounded-lg shadow-lg max-w-md w-full p-6">
        <h2 className="text-xl font-semibold mb-4">{title}</h2>
        <div className="mb-4">{children}</div>
        <div className="flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-purple-300 text-white rounded bg-purple-600"
          >
            Cerrar
          </button>
        </div>
      </div>
    </div>
  );
}
