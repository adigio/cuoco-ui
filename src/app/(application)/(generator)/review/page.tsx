"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
// contexto
import { useIngredientsStore } from "@/store/useIngredientsStore";
import { useRecipeGeneratorSession } from "@/hooks/useRecipeGeneratorSession";
// components
import AlertModal from "@/components/shared/modal/AlertModal";
import ConfirmationModal from "@/components/shared/modal/ConfirmationModal";
import RecipeIngredientInput from "@/components/recipe-generator/IngredientInput";
import BackgroundLayers from "@/components/shared/BackgroundLayers";
import ContainerShadow from "@/components/shared/containers/ContainerShadow";
import ChefLoader from "@/components/shared/loaders/ChefLoader";

export default function ReviewPage() {
  useRecipeGeneratorSession();

  const {
    ingredients,
    removeIngredient,
    updateIngredient,
    confirmIngredient,
    mode,
  } = useIngredientsStore();

  const router = useRouter();

  useEffect(() => {
    if (ingredients.length === 0) {
      router.push("/recipe-generator");
    }
  }, [ingredients, router]);

  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editIndex, setEditIndex] = useState(0);
  const [newName, setNewName] = useState("");
  const [newQuantity, setNewQuantity] = useState("");
  const [newUnit, setNewUnit] = useState<{
    id: number;
    description: string;
    symbol?: string;
  }>();
  const [loading, setLoading] = useState(false);
  const openEditModal = (idx: number) => {
    const ing = ingredients[idx];
    setEditIndex(idx);
    setNewName(ing.name);
    setNewQuantity(ing.quantity?.toString() || "");
    setNewUnit(ing.unit || "");
    setIsEditModalOpen(true);
  };

  const handleConfirmEdit = () => {
    if (newName.trim()) {
      updateIngredient(editIndex, {
        name: newName.trim(),
        quantity: Number(newQuantity),
        unit: newUnit || { id: 0, description: "", symbol: "" },
      });
      setIsEditModalOpen(false);
    }
  };

  const handleConfirm = (idx: number) => {
    confirmIngredient(idx);
  };

  const confirmAllIngredients = () => {
    ingredients.forEach((ing, idx) => {
      if (!ing.confirmed) {
        confirmIngredient(idx);
      }
    });
  };

  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [deleteTarget, setDeleteTarget] = useState<{
    idx: number;
    name: string;
  } | null>(null);

  const handleRequestDelete = (idx: number, name: string) => {
    setDeleteTarget({ idx, name });
    setIsDeleteModalOpen(true);
  };

  const handleConfirmDelete = () => {
    if (deleteTarget) {
      removeIngredient(deleteTarget.idx);
    }
    setIsDeleteModalOpen(false);
    setDeleteTarget(null);
  }; 
  const [showAlertModal, setShowAlertModal] = useState(false);

  const handleFinish = () => {
    const hasConfirmed = ingredients.some((ing) => ing.confirmed);
    if (!hasConfirmed) {
      setShowAlertModal(true);
      return;
    }
    setLoading(true);
    router.push(mode === "meal-prep" ? "/meal-prep-filters" : "/filters");
  };

    if (loading) return <ChefLoader text="Preparando Filtros..." />;

  return (
    <>
      <BackgroundLayers />
      <div className="w-full border-b-4 border-purple-400 mb-6" />

      <main className="flex-1 relative">
        <ContainerShadow customClass="container">
          <h1 className="text-2xl font-bold text-gray-800 mb-6">
            Revisión de Ingredientes
          </h1>

          <RecipeIngredientInput />

          {ingredients.length === 0 ? (
            <p className="text-gray-500 text-center">No hay ingredientes.</p>
          ) : (
            <>
              {/* Fila fija arriba del scroll */}
              <div className="flex justify-between items-center mb-2">
                <h2 className="text-lg font-semibold text-gray-700">
                  Lista de ingredientes
                </h2>
                <button
                  onClick={confirmAllIngredients}
                  className="px-4 py-2 bg-green-100 text-green-800 rounded hover:bg-green-200 transition text-sm"
                >
                  Confirmar todos
                </button>
              </div>

              {/* Scroll solo en tabla */}
              <div className="overflow-x-auto max-h-[450px] overflow-y-auto">
                <table className="min-w-full text-sm text-left border-separate border-spacing-y-2">
                  <thead className="sticky top-0 bg-white z-10 text-gray-600 font-semibold text-base border-b border-[#f37b6a]">
                    <tr>
                      <th className="px-4 pb-2">Ingrediente</th>
                      <th className="px-4 pb-2">Cantidad</th>
                      <th className="px-4 pb-2">Unidad</th>
                      <th className="px-4 pb-2">Origen</th>
                      <th className="px-4 pb-2">Acciones</th>
                      <th className="px-4 pb-2">Confirmado</th>
                    </tr>
                  </thead>
                  <tbody>
                    {ingredients.map((item, idx) => (
                      <tr key={idx} className="bg-white">
                        <td className="px-4 py-2 text-[#f37b6a] font-medium">
                          {item.name}
                        </td>
                        <td className="px-4 py-2">{item.quantity || "-"}</td>
                        <td className="px-4 py-2">
                          {item.unit?.description || "-"}
                        </td>
                        <td className="px-4 py-2 text-gray-600 capitalize">
                          {item.source === "manual" && "Manual (texto)"}
                          {item.source === "voz" && "Por voz"}
                          {item.source === "imagen" && "Por imagen"}
                        </td>
                        <td className="px-4 py-2 flex gap-2 flex-wrap">
                          <button
                            onClick={() => handleConfirm(idx)}
                            disabled={item.confirmed}
                            className={`px-3 py-1 rounded-full text-xs transition ${
                              item.confirmed
                                ? "bg-gray-100 text-gray-400 cursor-default"
                                : "bg-green-100 text-green-800 hover:bg-green-200"
                            }`}
                          >
                            {item.confirmed ? "Confirmado" : "Confirmar"}
                          </button>

                          <button
                            onClick={() => openEditModal(idx)}
                            className="px-3 py-1 rounded-full text-xs bg-yellow-100 text-yellow-800 hover:bg-yellow-200 transition"
                          >
                            Editar
                          </button>

                          <button
                            onClick={() => handleRequestDelete(idx, item.name)}
                            className="px-3 py-1 rounded-full text-xs bg-red-200 text-red-800 hover:bg-red-300 transition"
                          >
                            Eliminar
                          </button>
                        </td>
                        <td className="px-4 py-2 text-xl text-center">
                          {item.confirmed ? (
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
            </>
          )}

          <div className="flex justify-between mt-6">
            <button
              onClick={() => router.push("/recipe-generator")}
              className="px-6 py-2 bg-gray-200 text-gray-800 rounded hover:bg-gray-300 transition"
            >
              Volver
            </button>
            <button
              onClick={handleFinish}
              className="px-6 py-2 bg-[#f37b6a] text-white rounded hover:bg-[#e36455] transition"
            >
              Ir a filtros
            </button>
          </div>
        </ContainerShadow>
      </main>

      {isEditModalOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-md">
            <h2 className="text-lg font-bold mb-4">Editar ingrediente</h2>
            <input
              type="text"
              value={newName}
              onChange={(e) => setNewName(e.target.value)}
              className="w-full px-4 py-2 border text-color-primary rounded mb-4"
              placeholder="Nombre"
              autoFocus
            />
            <input
              type="text"
              value={newQuantity}
              onChange={(e) => setNewQuantity(e.target.value)}
              className="w-full px-4 py-2 border text-color-primary rounded mb-4"
              placeholder="Cantidad"
            />
            <input
              type="text"
              value={newUnit?.description || ""}
              onChange={(e) =>
                setNewUnit((prev) => ({
                  id: prev?.id ?? 0,
                  symbol: prev?.symbol,
                  description: e.target.value,
                }))
              }
              placeholder="Unidad"
            />

            <div className="flex justify-end gap-3">
              <button
                onClick={() => setIsEditModalOpen(false)}
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
        show={showAlertModal}
        onClose={() => setShowAlertModal(false)}
        title="¡Revisa la lista!"
      >
        Debes confirmar al menos un ingrediente para continuar.
      </AlertModal>

      <ConfirmationModal
        isOpen={isDeleteModalOpen}
        title="¿Eliminar ingrediente?"
        confirmText="Eliminar"
        cancelText="Cancelar"
        onConfirm={handleConfirmDelete}
        onCancel={() => {
          setIsDeleteModalOpen(false);
          setDeleteTarget(null);
        }}
      >
        <p>
          ¿Querés eliminar <strong>{deleteTarget?.name}</strong> de la lista?
        </p>
      </ConfirmationModal>
    </>
  );
}
