import React, { useState } from 'react';
import ConfirmationModal from '@/components/shared/modal/ConfirmationModal';
import { removeRecipeFromFavorites,removeMealPrepFromFavorites } from '@/services/favs.service';
import { UnfavoriteModalProps } from '@/types';

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
    if (type === 'recipe') {
      await removeRecipeFromFavorites(recipeId);
    } else if (type === 'meal-prep') {
      await removeMealPrepFromFavorites(recipeId); // o mealPrepId si tenés otro ID
    }

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