// components/TimeAndFavorite.tsx
import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClock, faHeart } from "@fortawesome/free-solid-svg-icons";

interface TimeAndFavoriteProps {
  minutes: number;
  onToggleFavorite: () => void;
}

const TimeAndFavorite: React.FC<TimeAndFavoriteProps> = ({
  minutes,
  onToggleFavorite,
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
        className="border-2 border-[#f27f6c] rounded-full p-2 hover:text-red-600 hover:border-red-600 transition"
        onClick={onToggleFavorite}
        aria-label="Agregar a favoritos"
      >
        <FontAwesomeIcon icon={faHeart} className="w-6 h-6" />
      </button>
    </div>
  );
};

export default TimeAndFavorite;
