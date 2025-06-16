"use client";

import React, { useState } from "react";
import { useIngredientsStore } from "@/store/useIngredientsStore";

export default function RecipeIngredientInput() {
  const [name, setName] = useState<string>("");
  const [quantity, setQuantity] = useState<string>("");
  const [unit, setUnit] = useState<string>("g");

  const addIngredient = useIngredientsStore((state) => state.addIngredient);

  const addIngrdient = (
    name: string,
    origin = "manual",
    confirm = true
  ) => {
    const displayName = quantity && unit ? `${quantity} ${unit} ${name}` : name;
    const agregado = addIngredient(name, Number(quantity), unit, false, 'manual', true);
    if (agregado) {
      setName("");
      setQuantity("");
      setUnit("g");
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      addIngrdient(name);
    }
  };

  return (
    <div>
      <h2 className="text-lg font-medium">
        También podés escribir o decir qué tenés
      </h2>

      <div className="flex gap-2 mt-2 items-center flex-wrap">
        {/* Ingrediente */}
        <input
          type="text"
          placeholder="Ej: Leche, Huevos..."
          value={name}
          onChange={(e) => setName(e.target.value)}
          onKeyDown={handleKeyPress}
          className="border rounded px-4 py-2 w-60"
        />

        {/* Cantidad */}
        <input
          type="input"
          placeholder="Cantidad"
          value={quantity}
          onChange={(e) => setQuantity(e.target.value)}
          className="border rounded px-4 py-2 w-24"
        />

        {/* Unidad */}
        <select
          value={unit}
          onChange={(e) => setUnit(e.target.value)}
          className="border rounded px-2 py-2"
        >
          <option value="g">gr</option>
          <option value="kg">ml</option>  
          <option value="unidad">unidad</option>
        </select>

        {/* Botón Agregar */}
        <button
          onClick={() => addIngrdient(name)}
          className="bg-purple-300 text-white px-4 py-2 rounded-full text-xl"
          title="Agregar ingrediente"
        >
          +
        </button>
      </div>
    </div>
  );
}
