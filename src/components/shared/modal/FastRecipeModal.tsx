"use client";

import React, { useState } from 'react';
import Modal from './Modal';
import Input from '../form/Input';
import ChefLoader from '../loaders/ChefLoader';
import { useFastRecipeSearch } from '@/hooks/useFastRecipeSearch';
import { FastRecipeModalProps } from '@/types';

export default function FastRecipeModal({
  isOpen,
  onClose
}: FastRecipeModalProps) {
  const [recipeName, setRecipeName] = useState("");
  const { searchRecipe, loading, error } = useFastRecipeSearch();

  const handleSubmit = async () => {
    if (!recipeName.trim()) {
      return;
    }

    await searchRecipe(recipeName);
    setRecipeName("");
    onClose();
  };

  const handleClose = () => {
    setRecipeName("");
    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={handleClose}
      maxWidth="max-w-md"
      showCloseButton={true}
    >
      {loading ? (
        <div className="h-60 rounded-3xl flex flex-col items-center justify-center py-10">
          <ChefLoader />
          <p className="mt-4 text-gray-700">Buscando receta...</p>
        </div>
      ) : (
        <>
          <h2 className="text-xl font-bold mb-4">
            Búsqueda rápida de recetas
          </h2>

          <Input
            type="text"
            name="fastRecipe"
            label="Nombre de la receta"
            placeholder="Ej. Ensalada exprés, Pasta carbonara..."
            value={recipeName}
            onChange={(e) => setRecipeName(e.target.value)}
            required
          />

          {error && (
            <p className="text-red-500 text-sm mt-2">{error}</p>
          )}

          <button
            onClick={handleSubmit}
            disabled={loading || !recipeName.trim()}
            className="mt-4 w-full px-6 py-2 background-color-primary text-white rounded hover:brightness-90 transition disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? "Buscando..." : "Buscar Receta"}
          </button>
        </>
      )}
    </Modal>
  );
} 