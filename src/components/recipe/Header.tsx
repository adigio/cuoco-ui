import React, { useState } from "react";
import { RecipeDetail } from "@/types/recipe/recipe.types";
import TimeAndFavorite from "@/components/shared/TimeAndFavorite";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import { FavoriteModal } from "@/components/shared/modal/FavoriteModal";
import { UnfavoriteModal } from "@/components/shared/modal/UnfavoriteModal";
import SubscriptionModal from "@/components/shared/modal/SubscriptionModal";
import { useFavoritesStore } from "@/store/useFavoritesStore";
import { useNotification } from "@/hooks/useNotification";
import { useAuthStore } from "@/store/useAuthStore";

type Props = RecipeDetail;

export default function RecipeHeader({
  id,
  name,
  time,
  servings,
  isFavorite,
  subtitle,
  difficulty,
}: Props) {
  const [showFavoriteModal, setShowFavoriteModal] = useState(false);
  const [showUnfavoriteModal, setShowUnfavoriteModal] = useState(false);
  const [showSubscriptionModal, setShowSubscriptionModal] = useState(false);

  const {
    addFavorite,
    removeFavorite,
    isFavorite: isLocalFavorite,
  } = useFavoritesStore();
  const { showSuccess, showError } = useNotification();

  // Mix estado del servidor con estado local
  const currentIsFavorite = isLocalFavorite(id, isFavorite);

  const handleFavRecipe = (recipeId: number) => {
    if (!currentIsFavorite) {
      setShowFavoriteModal(true);
    } else {
      setShowUnfavoriteModal(true);
    }
  };

  const handleFavoriteSuccess = () => {
    addFavorite(id);
  };

  const handleUnfavoriteSuccess = () => {
    removeFavorite(id);
  };

  return (
    <>
      <div className="mb-6 border-b border-color-primary-medium">
        <div className="flex items-center justify-between mb-4 flex-wrap gap-2"> 
          <h1 className="text-3xl font-bold w-1/2 text-center flex items-center gap-2 text-gray-700">
            {name}
          </h1>


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
