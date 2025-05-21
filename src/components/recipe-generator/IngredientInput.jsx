"use client";

import React, { useState } from "react";

export default function RecipeIngredientInput({ setIngredients }) {
  const [inputValue, setInputValue] = useState("");

  const normalizar = (texto) => texto.trim().toLowerCase();
  
  const agregarIngrediente = (nombre, fuente = "manual", confirmado = true) => {
    const nuevoNombre = normalizar(nombre);
    if (!nuevoNombre) return;

    setIngredients((prev) => {
      const yaExiste = prev.some(
        (ing) => normalizar(ing.nombre) === nuevoNombre
      );
      if (yaExiste) return prev;

      const nuevo = { nombre: nombre.trim(), fuente, confirmado };
      return [...prev, nuevo];
    });
    setInputValue("");
  };

  const handleInputChange = (e) => setInputValue(e.target.value);

  const handleIngredientKeyPress = (e) => {
    if (e.key === "Enter") {
      e.preventDefault(); // evita submit en formularios
      agregarIngrediente(inputValue);
    }
  };

  const handleAddClick = () => {
    agregarIngrediente(inputValue);
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
