import React, { useState } from 'react';
import ConfirmationModal from '@/components/shared/modal/ConfirmationModal';
import { removeRecipeFromFavorites } from '@/services/favs.service';
import { useNotification } from '@/hooks/useNotification';

interface UnfavoriteModalProps {
  isOpen: boolean;
  onClose: () => void;
  onUnfavoriteSuccess?: () => void;
  recipeId: number;
  recipeName: string;
}

export const UnfavoriteModal = ({
  isOpen,
  onClose,
  onUnfavoriteSuccess,
  recipeId,
  recipeName
}: UnfavoriteModalProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const { showNotification } = useNotification();

  const handleConfirmUnfavorite = async () => {
    setIsLoading(true);
    try {
      await removeRecipeFromFavorites(recipeId);
      showNotification('Receta eliminada de favoritos exitosamente', 'success');
      onUnfavoriteSuccess?.();
      onClose();
    } catch (error: any) {
      const errorMessage = error.message || 'Error al eliminar la receta de favoritos';
      showNotification(errorMessage, 'error');
    } finally {
      setIsLoading(false);
    }
  };

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
        ¿Estás seguro de que querés eliminar <strong>{recipeName}</strong> de tus recetas favoritas?
      </p>
      <p className="text-gray-500 text-sm mt-2">
        Esta acción no se puede deshacer.
      </p>
    </ConfirmationModal>
  );
};

export default UnfavoriteModal; 