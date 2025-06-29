import { UpgradePlan } from "@/components/shared/cards/UpgradePlan";
import Button from "@/components/shared/form/Button";
import Modal from "@/components/shared/modal/Modal";
import { useState } from "react";
import { useRecipesStore } from '@/store/useRecipesStore';
import { useRecipeFiltersStore } from "@/store/useRecipeFiltersStore";
import { useIngredientsStore } from "@/store/useIngredientsStore";
import { refreshRecipe } from "@/services/recipe.service";
import { RecipeGenerationRequest } from "@/types";
import { useAuthStore } from "@/store/useAuthStore";


export const RefreshModal = ({
    type = 'recipe',
    recipeText,
    isOpen,
    onClose,
    onUpgrade,
    recipeId,
    showSuccess,
    showError
}: {
    type?: 'recipe' | 'meal-prep';
    recipeText: string;
    isOpen: boolean;
    onClose: () => void;
    onUpgrade: () => void;
    recipeId: number;
    onRefreshSuccess?: () => void;
    showSuccess: (message: string, additionalMessage?: string) => void;
    showError: (message: string, additionalMessage?: string) => void;
}) => {
    const [isLoading, setIsLoading] = useState(false);
    const { filters } = useRecipeFiltersStore();
    const { ingredients } = useIngredientsStore();
    const { filteredRecipes, replaceRecipe: replaceRecipeInStore } = useRecipesStore();
    const isPremium = useAuthStore((state) => state.user?.premium);

    const handleRefreshRecipe = async () => {
        try {
            setIsLoading(true);

            const currentRecipeIds = filteredRecipes.map(r => r.id);
            
            const ingredientList = ingredients
                .filter(ing => ing.confirmed)
                .map((ingredient) => ({
                    name: ingredient.name,
                    quantity: ingredient.quantity,
                    unit_id: Number(ingredient.unit), 
                }));
            
            const refreshRequest: RecipeGenerationRequest = {
                ingredients: ingredientList,
                filters: {
                    preparation_time_id: !filters.time || filters.time === "" ? null : Number(filters.time),
                    servings: filters.people,
                    cook_level_id: Number(filters.difficulty),
                    type_ids: filters.types.map((t) => Number(t)),
                    diet_id: !filters.diet || filters.diet === "" ? null : Number(filters.diet),
                    allergies_ids: filters.allergies_ids,
                    dietary_needs_ids: filters.dietary_needs_ids,
                },
                configuration: {
                    size: 1,
                    not_include: currentRecipeIds,
                },
            };

            const newRecipe = await refreshRecipe(refreshRequest);
            
            if (newRecipe) {
                replaceRecipeInStore(recipeId, newRecipe);
                showSuccess(
                    'Receta refrescada exitosamente',
                    `Se generó una nueva receta: "${newRecipe.name}"`
                );
                onClose();
            } else {
                showError(
                    'No se pudo obtener una nueva receta',
                    'Intenta nuevamente en unos momentos'
                );
            }
        } catch (error) {
            console.error('Error al refrescar receta:', error);
            showError(
                'Error al refrescar la receta',
                'Ocurrió un problema al generar una nueva receta. Intenta nuevamente.'
            );
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
                    <h2 className="text-xl font-bold mb-4">Refrescar Receta <span className="block">{recipeText}</span></h2>
                    <p className="mb-6">¿Quieres refrescar {type === 'recipe' ? 'esta receta' : 'este Meal Prep'} para obtener otra mejor opción?</p>
                    <div className="flex justify-end gap-4">
                        <Button
                            variant="primary"
                            onClick={handleRefreshRecipe}
                            disabled={isLoading}
                        >
                            {isLoading ? 'Refrescando...' : 'Refrescar'}
                        </Button>
                    </div>
                </div>
            )}
        </Modal>
    );
};