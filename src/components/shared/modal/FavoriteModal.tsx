import { UpgradePlan } from "@/components/shared/cards/UpgradePlan";
import Button from "@/components/shared/form/Button";
import Modal from "@/components/shared/modal/Modal";
import { useAuthStore } from "@/store/useAuthStore";
import { addRecipeToFavorites, addMealPrepToFavorites } from "@/services/favs.service";
import { useState } from "react";

export const FavoriteModal = ({
    type = 'recipe',
    recipeText,
    isOpen,
    onClose,
    onUpgrade,
    onFavoriteSuccess,
    recipeId,
    showSuccess,
    showError
}: {
    type?: 'recipe' | 'meal-prep';
    recipeText: string;
    isOpen: boolean;
    onClose: () => void;
    onUpgrade: () => void;
    onFavoriteSuccess?: () => void;
    recipeId: number;
    showSuccess: (message: string, additionalMessage?: string) => void;
    showError: (message: string, additionalMessage?: string) => void;
}) => {

    const { user, updateUser } = useAuthStore();
    const isPremium = user?.premium ?? false;
    const [isLoading, setIsLoading] = useState(false);

   const handleAddToFavorites = async (type: 'recipe' | 'meal-prep', id: number, recipeText: string) => {
  setIsLoading(true);
  try {
    let result;

    if (type === 'recipe') {
      result = await addRecipeToFavorites(id);
    } else if (type === 'meal-prep') {
      result = await addMealPrepToFavorites(id);
    } else {
      throw new Error("Tipo no soportado");
    }

    if (result.success) {
      showSuccess(
        `${type === 'recipe' ? 'Receta' : 'Meal prep'} agregado a favoritos exitosamente`,
        `"${recipeText}" ahora está en tus favoritos`
      );
      onFavoriteSuccess?.();
      onClose();
    }
  } catch (error: any) {
    const errorMessage = error.message || 'Error al agregar a favoritos';
    showError(errorMessage, 'Intenta nuevamente en unos momentos');

    if (error.message?.includes('ya está en tus favoritos')) {
      onClose();
    }
  } finally {
    setIsLoading(false);
  }
};


    return (
        <Modal isOpen={isOpen} onClose={onClose} showCloseButton>
            {!isPremium ? (
                <UpgradePlan
                    title="Para desbloquear esta funcionalidad, actualiza tu plan"
                    onUpgradeClick={onUpgrade}
                />
            ) : (
                <div className="p-6">
                    <h2 className="text-xl font-bold mb-4">Agregar a Favoritos <span className="block">{recipeText}</span></h2>
                    <p className="mb-6">¿Deseas agregar {type === 'recipe' ? 'esta receta' : 'este Meal Prep'} a tus favoritos?</p>
                    <div className="flex justify-end gap-4">
                        <Button
                            variant="primary"
                             onClick={() => handleAddToFavorites(type, recipeId, recipeText)}
                            disabled={isLoading}
                        >
                            {isLoading ? 'Agregando...' : 'Agregar'}
                        </Button>
                    </div>
                </div>
            )}
        </Modal>
    );
};