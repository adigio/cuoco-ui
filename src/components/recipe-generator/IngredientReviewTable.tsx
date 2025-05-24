'use client';

import React from 'react';

interface Ingredient {
  nombre: string;
  fuente: string;
  confirmado: boolean;
}

interface IngredientReviewTableProps {
  ingredientes: Ingredient[];
  onConfirm: (index: number) => void;
  onEdit: (index: number) => void;
  onDelete: (index: number) => void;
}

export default function IngredientReviewTable({ ingredientes, onConfirm, onEdit, onDelete }: IngredientReviewTableProps) {
  if (!ingredientes || ingredientes.length === 0) {
    return (
      <p className="text-center text-gray-500 mt-6">
        No se detectaron ingredientes. Intenta subir otra imagen o dictar con voz.
      </p>
    );
  }

  return (
    <div className="overflow-x-auto mt-6 rounded-lg shadow bg-white">
      <table className="min-w-full text-sm text-left">
        <thead className="border-b-2 border-[#f37b6a] text-gray-700">
          <tr>
            <th className="px-4 py-3">Ingrediente</th>
            <th className="px-4 py-3">Fuente</th>
            <th className="px-4 py-3">Acciones</th>
            <th className="px-4 py-3">Confirmado</th>
          </tr>
        </thead>
        <tbody>
          {ingredientes.map((item, idx) => (
            <tr key={idx} className="border-t">
              <td className="px-4 py-2 text-red-500">{item.nombre}</td>
              <td className="px-4 py-2">
                {item.fuente === 'manual' ? 'Manual (texto)' : item.fuente === 'voz' ? 'Por voz' : 'Por imagen'}
              </td>
              <td className="px-4 py-2 flex gap-2 flex-wrap">
                <button onClick={() => onConfirm(idx)} className="bg-green-200 text-green-800 px-3 py-1 rounded text-xs">Confirmar</button>
                <button onClick={() => onEdit(idx)} className="bg-yellow-100 text-yellow-800 px-3 py-1 rounded text-xs">Editar</button>
                <button onClick={() => onDelete(idx)} className="bg-red-200 text-red-800 px-3 py-1 rounded text-xs">Eliminar</button>
              </td>
              <td className="px-4 py-2 text-center">
                {item.confirmado ? '✔️' : '⚠️'}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
