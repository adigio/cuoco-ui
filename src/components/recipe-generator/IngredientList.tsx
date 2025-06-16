"use client";

import React, { useState } from "react";
import { Ingredient } from "@/types/ingredient/ingredient.types";
import ConfirmationModal from "../shared/modal/ConfirmationModal";

interface RecipeIngredientListProps {
  ingredients: Ingredient[];
  onRemove?: (idx: number) => void;
  enabledDelete?: boolean;
}

export default function RecipeIngredientList({
  ingredients,
  onRemove,
  enabledDelete = true,
}: RecipeIngredientListProps) {
  // Estado para el modal de confirmación
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [deleteTarget, setDeleteTarget] = useState<{
    idx: number;
    name: string;
  } | null>(null);

  // Abre el modal y guarda qué ingrediente se quiere borrar
  const handleRequestDelete = (idx: number, name: string) => {
    setDeleteTarget({ idx, name });
    setIsDeleteModalOpen(true);
  };

  // Confirma el borrado y llama al callback
  const handleConfirmDelete = () => {
    if (deleteTarget && onRemove) {
      onRemove(deleteTarget.idx);
    }
    setIsDeleteModalOpen(false);
    setDeleteTarget(null);
  };

  return (
    <>
      <div className="flex flex-wrap gap-2 mt-4">
        {ingredients.length === 0 ? (
          <p className="text-gray-500">No hay ingredientes añadidos todavía.</p>
        ) : (
          ingredients.map((item, idx) => (
            <span
              key={idx}
              className="bg-gray-200 text-sm px-3 py-1 rounded-full flex items-center gap-2"
            >
              {`${item.name} ${item.quantity ?? ""} ${item.unit ?? ""}`.trim()}
              {enabledDelete && onRemove && (
                <button
                  onClick={() => handleRequestDelete(idx, item.name)}
                  className="bg-gray-200 text-gray-500 h-4 w-4 flex items-center justify-center text-xs rounded-full transition-colors"
                  title="Eliminar"
                >
                  ×
                </button>
              )}
            </span>
          ))
        )}
      </div>

      {/* Modal de confirmación de eliminación */}
      <ConfirmationModal
        isOpen={isDeleteModalOpen}
        title="¿Eliminar ingrediente?"
        confirmText="Eliminar"
        cancelText="Cancelar"
        onConfirm={handleConfirmDelete}
        onCancel={() => setIsDeleteModalOpen(false)}
      >
        <p>
          ¿Querés eliminar <strong>{deleteTarget?.name}</strong> de la lista?
        </p>
      </ConfirmationModal>
    </>
  );
}
