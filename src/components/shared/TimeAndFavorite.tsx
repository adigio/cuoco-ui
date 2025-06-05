// components/shared/TimeAndFavorite.tsx
import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClock } from "@fortawesome/free-solid-svg-icons";
import { faHeart as faHeartSolid } from "@fortawesome/free-solid-svg-icons";
import { faHeart as faHeartRegular } from "@fortawesome/free-regular-svg-icons";

interface TimeAndFavoriteProps {
  minutes: number;
  onToggleFavorite: () => void;
  isFavorite?: boolean;
}

const TimeAndFavorite: React.FC<TimeAndFavoriteProps> = ({
  minutes,
  onToggleFavorite,
  isFavorite = false,
}) => {
  const hrs = Math.floor(minutes / 60);
  const mins = String(minutes % 60).padStart(2, "0");

  return (
    <div className="flex items-center gap-6 text-[#f27f6c] font-semibold text-xl">
      {/* Tiempo */}
      <div className="flex items-center gap-2">
        <FontAwesomeIcon icon={faClock} className="w-7 h-7" />
        <span>{hrs}:{mins} min</span>
      </div>

      {/* Botón favorito */}
      <button
        className={`border-2 rounded-full p-2 transition ${
          isFavorite 
            ? 'border-red-600 text-red-600' 
            : 'border-[#f27f6c] hover:text-red-600 hover:border-red-600'
        }`}
        onClick={onToggleFavorite}
        aria-label={isFavorite ? "Quitar de favoritos" : "Agregar a favoritos"}
      >
        <FontAwesomeIcon 
          icon={isFavorite ? faHeartSolid : faHeartRegular} 
          className="w-6 h-6" 
        />
      </button>
    </div>
  );
};

export default TimeAndFavorite; 