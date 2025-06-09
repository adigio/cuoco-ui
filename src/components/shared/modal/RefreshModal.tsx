import { UpgradePlan } from "@/components/shared/cards/UpgradePlan";
import Button from "@/components/shared/form/Button";
import Modal from "@/components/shared/modal/Modal";

export const RefreshModal = ({
    type = 'recipe',
    recipeText,
    isOpen,
    isPremium,
    onClose,
    onUpgrade,
    recipeId
}: {
    type?: 'recipe' | 'meal-prep';
    recipeText: string;
    isOpen: boolean;
    isPremium: boolean;
    onClose: () => void;
    onUpgrade: () => void;
    recipeId: number;
}) => {
    const handleAddToRefresh = async () => {
        try {
            // TODO: --- service para agregar a refresh. 
            console.log('Refrescando receta:', recipeId);
            onClose();
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
                    <h2 className="text-xl font-bold mb-4">Refrescar Receta <span className="block">{recipeText}</span></h2>
                    <p className="mb-6">¿Quieres refrescar {type === 'recipe' ? 'esta receta' : 'este Meal Prep'} para obtener otra mejor opción?</p>
                    <div className="flex justify-end gap-4">
                        <Button
                            variant="primary"
                            onClick={handleAddToRefresh}
                        >
                            Refrescar
                        </Button>
                    </div>
                </div>
            )}
        </Modal>
    );
};