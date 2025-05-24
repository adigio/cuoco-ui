"use client";

import React, { useState } from "react";
import { useIngredientsStore } from "@/store/useIngredientsStore";

export default function RecipeIngredientInput() {
  const [inputValue, setInputValue] = useState<string>("");
  const addIngredient = useIngredientsStore(state => state.addIngredient);
  
  const agregarIngrediente = (nombre: string, fuente = "manual", confirmado = true) => {
    const agregado = addIngredient(nombre, fuente, confirmado);
    if (agregado) setInputValue("");
  };

  const handleAddClick = () => {
    agregarIngrediente(inputValue);
  };
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => setInputValue(e.target.value);

  const handleIngredientKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault(); // evita submit en formularios
      agregarIngrediente(inputValue);
    }
  };

  return (
    <div>
      <h2 className="text-lg font-medium">
        También podés escribir o decir qué tenés
      </h2>
      <div className="flex gap-2 mt-2 items-center">
        <input
          type="text"
          placeholder="Ej: Leche, Huevos..."
          value={inputValue}
          onChange={handleInputChange}
          onKeyDown={handleIngredientKeyPress}
          className="border rounded px-4 py-2 w-[70%] sm:w-[85%] md:w-full md:max-w-md"
        />

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
