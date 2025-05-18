'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useIngredients } from '@/context/IngredientContext';
import NavbarHome from '@/components/navbars/NavbarHome';
import Footer from '@/components/landing/Footer';
import AlertModal from '@/components/shared/modal/AlertModal';
import RecipeIngredientInput from '@/components/recipe-generator/IngredientInput';
export default function ReviewPage() {
  const { 
    ingredients, 
    removeIngredient, 
    updateIngredient, 
      setIngredients, 
    confirmIngredient 
  } = useIngredients();
  
  const router = useRouter();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editIndex, setEditIndex] = useState(null);
  const [newName, setNewName] = useState('');
  const [showModal, setShowModal] = useState(false);
  // Verificar si hay ingredientes, si no, redirigir
  useEffect(() => {
    if (ingredients.length === 0) {
      router.push('/recipe-generator');
    }
  }, [ingredients, router]);
  const contextSetIngredients = (updater) => {
  setIngredients((prev) => typeof updater === 'function' ? updater(prev) : updater);
};
  const openEditModal = (idx) => {
    setEditIndex(idx);
    setNewName(ingredients[idx].nombre);
    setIsModalOpen(true);
  };

  const handleConfirmEdit = () => {
    if (newName.trim()) {
      updateIngredient(editIndex, { nombre: newName.trim() });
      setIsModalOpen(false);
    }
  };

  const handleConfirm = (idx) => {
    confirmIngredient(idx);
  };

  const handleDelete = (idx) => {
    removeIngredient(idx);
  };

  const handleFinish = () => {
    // Verificar si hay al menos un ingrediente confirmado
    const hasConfirmedIngredients = ingredients.some(ing => ing.confirmado);
    console.log(hasConfirmedIngredients);
    if (!hasConfirmedIngredients) {
      // Si no hay ingredientes confirmados, mostrar alerta
       setShowModal(true);
      return;
    }
    
    // Redirigir a la página de resultados
    router.push('/filters');
  };

return (
  <div className="flex flex-col min-h-screen bg-[#fefefe]">
    <NavbarHome />
    {/* Aca iría <NavbarLanding /> si lo usás */}

    <main className="flex-1 px-6 py-10">
      <div className="container mx-auto bg-white p-6 rounded-2xl shadow-md">
        <h1 className="text-2xl font-bold text-gray-800 mb-6">Revisión de Ingredientes</h1>
        <RecipeIngredientInput setIngredients={contextSetIngredients} />


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
                        disabled={item.confirmado}
                        className={`${
                          item.confirmado
                            ? 'bg-gray-100 text-gray-400 cursor-default'
                            : 'bg-green-100 text-green-800 hover:bg-green-200'
                        } px-3 py-1 rounded-full text-xs transition`}
                      >
                        {item.confirmado ? 'Confirmado' : 'Confirmar'}
                      </button>
                      <button
                        onClick={() => openEditModal(idx)}
                        className="bg-yellow-100 text-yellow-800 px-3 py-1 rounded-full text-xs hover:bg-yellow-200 transition"
                      >
                        Editar
                      </button>
                      <button
                        onClick={() => handleDelete(idx)}
                        className="bg-red-200 text-red-800 px-3 py-1 rounded-full text-xs hover:bg-red-300 transition"
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

        <div className="flex justify-between mt-6">
          <button
            onClick={() => router.push('/recipe-generator')}
            className="bg-gray-200 text-gray-800 px-6 py-2 rounded hover:bg-gray-300 transition"
          >
            Volver
          </button>

          <button
            onClick={handleFinish}
            className="bg-[#f37b6a] text-white px-6 py-2 rounded hover:bg-[#e36455] transition"
          >
           Ir a filtros
          </button>
        </div>
      </div>
    </main>

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
            autoFocus
          />
          <div className="flex justify-end gap-3">
            <button
              onClick={() => setIsModalOpen(false)}
              className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300 transition"
            >
              Cancelar
            </button>
            <button
              onClick={handleConfirmEdit}
              className="px-4 py-2 bg-[#f37b6a] text-white rounded hover:bg-[#e36455] transition"
            >
              Guardar
            </button>
          </div>
        </div>
      </div>
    )}

    <AlertModal
      show={showModal}
      onClose={() => setShowModal(false)}
      title="¡Revisa la lista!"
    >
      Debes confirmar al menos un ingrediente para continuar.
    </AlertModal>

    <Footer />
  </div>
);

}
