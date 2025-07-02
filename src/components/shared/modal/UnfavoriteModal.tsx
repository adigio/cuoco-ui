import React, { useState } from 'react';
import ConfirmationModal from '@/components/shared/modal/ConfirmationModal';
import { removeRecipeFromFavorites } from '@/services/favs.service';

interface UnfavoriteModalProps {
  type?: 'recipe' | 'meal-prep';
  isOpen: boolean;
  onClose: () => void;
  onUnfavoriteSuccess?: () => void;
  recipeId: number;
  recipeText: string;
  showSuccess: (message: string, additionalMessage?: string) => void;
  showError: (message: string, additionalMessage?: string) => void;
}

export const UnfavoriteModal = ({
  type = 'recipe',
  isOpen,
  onClose,
  onUnfavoriteSuccess,
  recipeId,
  recipeText,
  showSuccess,
  showError
}: UnfavoriteModalProps) => {
  const [isLoading, setIsLoading] = useState(false);

  const handleConfirmUnfavorite = async () => {
    setIsLoading(true);
    try {
      await removeRecipeFromFavorites(recipeId);
      const itemType = type === 'recipe' ? 'receta' : 'Meal Prep';
      showSuccess(
        `${itemType} eliminado de favoritos exitosamente`, 
        `"${recipeText}" ya no está en tus favoritos`
      );
      onUnfavoriteSuccess?.();
      onClose();
    } catch (error: any) {
      const errorMessage = error.message || `Error al eliminar ${type === 'recipe' ? 'la receta' : 'el Meal Prep'} de favoritos`;
      showError(errorMessage, 'Intenta nuevamente en unos momentos');
    } finally {
      setIsLoading(false);
    }
  };

  const itemType = type === 'recipe' ? 'recetas' : 'Meal Preps';

  return (
    <ConfirmationModal
      isOpen={isOpen}
      title="Eliminar de Favoritos"
      confirmText={isLoading ? "Eliminando..." : "Eliminar"}
      cancelText="Cancelar"
      onConfirm={handleConfirmUnfavorite}
      onCancel={onClose}
    >
      <p>
        ¿Estás seguro de que querés eliminar <strong>{recipeText}</strong> de tus {itemType} favoritos?
      </p>
      <p className="text-gray-500 text-sm mt-2">
        Esta acción no se puede deshacer.
      </p>
    </ConfirmationModal>
  );
};

export default UnfavoriteModal; 