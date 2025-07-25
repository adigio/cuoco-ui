// components/shared/TimeAndFavorite.tsx
import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClock } from "@fortawesome/free-solid-svg-icons";
import { faHeart as faHeartSolid } from "@fortawesome/free-solid-svg-icons";
import { faHeart as faHeartRegular } from "@fortawesome/free-regular-svg-icons";
import { TimeAndFavoriteProps } from "@/types";
import { useAuthStore } from "@/store/useAuthStore";

const TimeAndFavorite: React.FC<TimeAndFavoriteProps> = ({
  time,
  minutes,
  onToggleFavorite,
  isFavorite = false,
}) => {
  // Usar time si está disponible, sino construir desde minutes
  const displayTime = time || (minutes ? `${minutes} ` : "");
  const isPremium = useAuthStore((state) => state.user?.premium);


  return (
    <div className="flex items-center gap-6 text-[#f27f6c] font-semibold text-xl">
      {/* Tiempo */}
      <div className="flex items-center gap-2">
        <FontAwesomeIcon icon={faClock} className="w-7 h-7" />
        <span>{displayTime}</span>
      </div>

      {/* Botón favorito */}
      {isPremium && (
        <button
          className={`w-10 h-10 flex items-center justify-center border-2 rounded-full transition ${isFavorite
            ? 'border-red-600 text-red-600'
            : 'border-[#f27f6c] hover:text-red-600 hover:border-red-600'
            }`}
          onClick={onToggleFavorite}
          aria-label={isFavorite ? "Quitar de favoritos" : "Agregar a favoritos"}
        >
          <FontAwesomeIcon
            icon={isFavorite ? faHeartSolid : faHeartRegular}
            className="w-5 h-5"
          />
        </button>
      )}


    </div>
  );
};

export default TimeAndFavorite; 