import React, { useState, useEffect } from "react";
import { RecipeDetail } from "@/types/recipe/recipe.types";
import TimeAndFavorite from "@/components/shared/TimeAndFavorite";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import { FavoriteModal } from "@/components/shared/modal/FavoriteModal";
import { UnfavoriteModal } from "@/components/shared/modal/UnfavoriteModal";
import SubscriptionModal from "@/components/shared/modal/SubscriptionModal";
import { useFavoritesStore } from "@/store/useFavoritesStore";
import { useNotification } from "@/hooks/useNotification";

type Props = RecipeDetail;

export default function RecipeHeader({
  id,
  name,
  time,
  servings,
  isFavorite: initialIsFavorite,
  subtitle,
  difficulty,
}: Props) {
  const [showFavoriteModal, setShowFavoriteModal] = useState(false);
  const [showUnfavoriteModal, setShowUnfavoriteModal] = useState(false);
  const [showSubscriptionModal, setShowSubscriptionModal] = useState(false);

  const {
    isFavorite: isFavoriteFromStore,
    addFavorite,
    removeFavorite,
  } = useFavoritesStore();
  const { showSuccess, showError } = useNotification();

  const [currentIsFavorite, setCurrentIsFavorite] = useState(initialIsFavorite);

  useEffect(() => {
    const storeStatus = isFavoriteFromStore(id);
    setCurrentIsFavorite(storeStatus);
  }, [id, isFavoriteFromStore]);

  const handleFavRecipe = (recipeId: number) => {
    if (!currentIsFavorite) {
      setShowFavoriteModal(true);
    } else {
      setShowUnfavoriteModal(true);
    }
  };

  const handleFavoriteSuccess = () => {
    addFavorite(id);
    setCurrentIsFavorite(true);
  };

  const handleUnfavoriteSuccess = () => {
    removeFavorite(id);
    setCurrentIsFavorite(false);
  };

  return (
    <>
      <div className="mb-6 border-b border-color-primary-medium">
        <div className="flex items-center justify-between mb-4 flex-wrap gap-2">
          <h1 className="text-3xl font-bold w-1/2 text-center">{name}</h1>

          <div className="flex items-center gap-2">
            <span className="flex items-center gap-1 text-color-primary-medium">
              <FontAwesomeIcon
                icon={faUser}
                className="text-color-primary-medium"
              />
              {servings}
            </span>
            <TimeAndFavorite
              time={time}
              onToggleFavorite={() => handleFavRecipe(id)}
              isFavorite={currentIsFavorite}
            />
          </div>
        </div>
      </div>

      <FavoriteModal
        recipeId={id}
        recipeText={name}
        isOpen={showFavoriteModal}
        onClose={() => setShowFavoriteModal(false)}
        onUpgrade={() => {
          setShowFavoriteModal(false);
          setShowSubscriptionModal(true);
        }}
        onFavoriteSuccess={handleFavoriteSuccess}
        showSuccess={showSuccess}
        showError={showError}
      />

      <UnfavoriteModal
        recipeId={id}
        recipeText={name}
        isOpen={showUnfavoriteModal}
        onClose={() => setShowUnfavoriteModal(false)}
        onUnfavoriteSuccess={handleUnfavoriteSuccess}
        showSuccess={showSuccess}
        showError={showError}
      />

      <SubscriptionModal
        isOpen={showSubscriptionModal}
        onClose={() => setShowSubscriptionModal(false)}
        title="Actualiza tu plan para guardar recetas favoritas"
      />
    </>
  );
}
