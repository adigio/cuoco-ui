import { UpgradePlan } from "@/components/shared/cards/UpgradePlan";
import Button from "@/components/shared/form/Button";
import Modal from "@/components/shared/modal/Modal";
import { useAuthStore } from "@/store/useAuthStore";
import { addRecipeToFavorites } from "@/services/recipe.service";

export const FavoriteModal = ({
    type = 'recipe',
    recipeText,
    isOpen,
    onClose,
    onUpgrade,
    onFavoriteSuccess,
    recipeId
}: {
    type?: 'recipe' | 'meal-prep';
    recipeText: string;
    isOpen: boolean;
    onClose: () => void;
    onUpgrade: () => void;
    onFavoriteSuccess?: () => void;
    recipeId: number;
}) => {

    const { user, updateUser } = useAuthStore();
    const isPremium = user?.premium ?? false;

    const handleAddToFavorites = async () => {
        try {
            const result = await addRecipeToFavorites(recipeId);
            if (result) {

                onFavoriteSuccess?.();
                onClose();
            }
        } catch (error) {
            console.error('Error al agregar a favoritos:', error);
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
                            onClick={handleAddToFavorites}
                        >
                            Agregar
                        </Button>
                    </div>
                </div>
            )}
        </Modal>
    );
};