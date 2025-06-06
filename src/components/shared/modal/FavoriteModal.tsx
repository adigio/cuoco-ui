import Button from "@/components/shared/form/Button";
import Modal from "@/components/shared/modal/Modal";
import { useAuthStore } from "@/store/useAuthStore";

export const FavoriteModal = ({
    recipeText,
    isOpen,
    onClose,
    recipeId
}: {
    recipeText: string;
    isOpen: boolean;
    onClose: () => void;
    recipeId: number;
}) => {

    const { user, updateUser } = useAuthStore();
    const isPremium = user?.premium ?? false;

    console.log('isPremium:', isPremium);
    const handleAddToFavorites = async () => {
        try {
            // TODO: --- service para agregar a favoritos. 
            console.log('Agregando a favoritos:', recipeId);
            onClose();
        } catch (error) {
            console.error('Error al agregar a favoritos:', error);
        }
    };

    return (
        <Modal isOpen={isOpen} onClose={onClose} showCloseButton>
            <div className="p-6">
                <h2 className="text-xl font-bold mb-4">Agregar a Favoritos <span className="block">{recipeText}</span></h2>
                <p className="mb-6">¿Deseas agregar esta receta a tus favoritos?</p>
                <div className="flex justify-end gap-4">
                    <Button
                        variant="primary"
                        onClick={handleAddToFavorites}
                    >
                        Agregar
                    </Button>
                </div>
            </div>
        </Modal>
    );
};