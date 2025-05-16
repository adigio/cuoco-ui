'use client';

import React, { useState } from 'react';
import { useIngredients } from '@/context/IngredientContext';

export default function ReviewPage() {
  const { ingredients, setIngredients } = useIngredients();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editIndex, setEditIndex] = useState(null);
  const [newName, setNewName] = useState('');

  const openEditModal = (idx) => {
    setEditIndex(idx);
    setNewName(ingredients[idx].nombre);
    setIsModalOpen(true);
  };

  const handleConfirmEdit = () => {
    setIngredients((prev) =>
      prev.map((item, i) =>
        i === editIndex ? { ...item, nombre: newName } : item
      )
    );
    setIsModalOpen(false);
  };

  const handleConfirm = (idx) => {
    setIngredients((prev) =>
      prev.map((item, i) =>
        i === idx ? { ...item, confirmado: true } : item
      )
    );
  };

  const handleDelete = (idx) => {
    setIngredients((prev) => prev.filter((_, i) => i !== idx));
  };

  return (
    <div className="min-h-screen bg-[#fefefe] px-6 py-10">
      <div className="container mx-auto bg-white p-6 rounded-2xl shadow-md">
        <h1 className="text-2xl font-bold text-gray-800 mb-6">Revisión de Ingredientes</h1>

        {ingredients.length === 0 ? (
          <p className="text-gray-500 text-center">No hay ingredientes.</p>
        ) : (
          <div className="overflow-x-auto max-h-[450px] overflow-y-auto">
            <table className="min-w-full text-sm text-left border-separate border-spacing-y-2">
              <thead className="text-gray-600 font-semibold text-base border-b border-[#f37b6a]">
                <tr>
                  <th className="px-4 pb-2">Ingrediente</th>
                  <th className="px-4 pb-2">Fuente</th>
                  <th className="px-4 pb-2">Acciones</th>
                  <th className="px-4 pb-2">Confirmado</th>
                </tr>
              </thead>
              <tbody>
                {ingredients.map((item, idx) => (
                  <tr key={idx} className="bg-white">
                    <td className="px-4 py-2 text-[#f37b6a] font-medium">{item.nombre}</td>
                    <td className="px-4 py-2 text-gray-600 capitalize">
                      {item.fuente === 'manual' && 'Manual (texto)'}
                      {item.fuente === 'voz' && 'Por voz'}
                      {item.fuente === 'imagen' && 'Por imagen'}
                    </td>
                    <td className="px-4 py-2 flex gap-2 flex-wrap">
                      <button
                        onClick={() => handleConfirm(idx)}
                        className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-xs"
                      >
                        Confirmar
                      </button>
                      <button
                        onClick={() => openEditModal(idx)}
                        className="bg-yellow-100 text-yellow-800 px-3 py-1 rounded-full text-xs"
                      >
                        Editar
                      </button>
                      <button
                        onClick={() => handleDelete(idx)}
                        className="bg-red-200 text-red-800 px-3 py-1 rounded-full text-xs"
                      >
                        Eliminar
                      </button>
                    </td>
                    <td className="px-4 py-2 text-xl text-center">
                      {item.confirmado ? (
                        <span className="text-green-500">✔️</span>
                      ) : (
                        <span className="text-orange-400">⚠️</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        <div className="flex justify-end mt-6">
          <button className="bg-[#f37b6a] text-white px-6 py-2 rounded hover:bg-[#e36455] transition">
            Finalizar
          </button>
        </div>
      </div>

      {/* Modal de edición */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-md">
            <h2 className="text-lg font-bold mb-4">Editar ingrediente</h2>
            <input
              type="text"
              value={newName}
              onChange={(e) => setNewName(e.target.value)}
              className="border px-4 py-2 w-full rounded mb-4"
            />
            <div className="flex justify-end gap-3">
              <button
                onClick={() => setIsModalOpen(false)}
                className="px-4 py-2 bg-gray-200 rounded"
              >
                Cancelar
              </button>
              <button
                onClick={handleConfirmEdit}
                className="px-4 py-2 bg-[#f37b6a] text-white rounded"
              >
                Guardar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
