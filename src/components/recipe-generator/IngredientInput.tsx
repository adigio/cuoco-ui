"use client";

import React, { useState } from "react";
import { useIngredientsStore } from "@/store/useIngredientsStore";

export default function RecipeIngredientInput() {
  const [inputValue, setInputValue] = useState<string>("");
  const addIngredient = useIngredientsStore(state => state.addIngredient);
  
  const addIngrdient = (name: string, origin = "manual", confirm = true) => {
    const agregado = addIngredient(name, origin, confirm);
    if (agregado) setInputValue("");
  };

  const handleAddClick = () => {
    addIngrdient(inputValue);
  };
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => setInputValue(e.target.value);

  const handleIngredientKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault(); // evita submit en formularios
      addIngrdient(inputValue);
    }
  };

  const handleClearInput = () => {
    setInputValue("");
  };

  return (
    <div>
      <h2 className="text-lg font-medium">
        También podés escribir o decir qué tenés
      </h2>
      <div className="flex gap-2 mt-2 items-center">
        <div className="relative flex-1">
          <input
            type="text"
            placeholder="Ej: Leche, Huevos..."
            value={inputValue}
            onChange={handleInputChange}
            onKeyDown={handleIngredientKeyPress}
            className="border rounded px-4 py-2 w-full"
          />
          {inputValue && (
            <button
              onClick={handleClearInput}
              className="absolute top-1/2 right-2 -translate-y-1/2 bg-gray-200 text-gray-500 h-4 w-4 flex items-center justify-center text-xs rounded-full transition-colors"
              title="Eliminar"
            >
              x
            </button>
          )}
        </div>

        <button
          onClick={handleAddClick}
          className="bg-purple-300 text-white px-4 py-2 rounded-full text-xl flex-shrink-0"
          title="Agregar ingrediente"
        >
          +
        </button>
      </div>
    </div>
  );
}
