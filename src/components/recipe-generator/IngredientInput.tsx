"use client";

import { useEffect, useState } from "react";
import { useIngredientsStore } from "@/store/useIngredientsStore";
import { useFilterOptionsCache } from "@/hooks/useFilterOptionsCache";

export default function RecipeIngredientInput() {
  const [name, setName] = useState<string>("");
  const [quantity, setQuantity] = useState<string>("");
  const [unit, setUnit] = useState<string>("");
  const [isInitialized, setIsInitialized] = useState<boolean>(false);

  const { unitOptions, isLoaded } = useFilterOptionsCache();

  useEffect(() => {
    if (isLoaded && unitOptions.length > 0 && !isInitialized) {
      setUnit(String(unitOptions[0].key));
      setIsInitialized(true);
    }
  }, [isLoaded, unitOptions.length, isInitialized, unitOptions]);

  const addIngredient = useIngredientsStore((state) => state.addIngredient);

  const addIngrdient = (name: string, origin = "manual", confirm = true) => {
    // Validar que los tres campos estén completos
    if (!name.trim() || !quantity.trim() || !unit.trim()) {
      return;
    }

    const selectedUnit = unitOptions.find((u) => String(u.key) === String(unit));
    if (!selectedUnit) {
      return;
    }

    const newUnit = {
      id: selectedUnit.value,
      description: selectedUnit.label,
      symbol: selectedUnit.symbol,
    };

    const agregado = addIngredient(
      name,
      Number(quantity) || 0,
      newUnit,
      false,
      origin,
      confirm
    );

    if (agregado) {
      setName("");
      setQuantity("");
      if (unitOptions.length > 0) {
        setUnit(String(unitOptions[0].key));
      }
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
        También podés escribir lo que tenés
      </h2>

      <div className="flex gap-2 mt-2 items-center flex-wrap">
        {/* Ingrediente */}
        <input
          type="text"
          placeholder="Ej: Leche, Huevos..."
          value={name}
          onChange={(e) => setName(e.target.value)}
          onKeyDown={handleKeyPress}
          className="border border-gray-300 rounded px-4 py-2 w-60 focus:outline-none focus:ring-2 focus:ring-purple-100 focus:border-purple-100"
        />

        {/* Cantidad */}
        <input
          type="text"
          placeholder="Cantidad"
          value={quantity}
          onChange={(e) => setQuantity(e.target.value)}
          className="border border-gray-300 rounded px-4 py-2 w-24 focus:outline-none focus:ring-2 focus:ring-purple-100 focus:border-purple-100"
        />

        {/* Unidad */}
        <select
          value={unit}
          onChange={(e) => {
            setUnit(e.target.value);
          }}
          className="border border-gray-300 rounded px-2 py-2 focus:outline-none focus:ring-2 focus:ring-purple-100 focus:border-purple-100"
          disabled={!isLoaded || unitOptions.length === 0}
        >
          {!isLoaded ? (
            <option value="">Cargando...</option>
          ) : unitOptions.length === 0 ? (
            <option value="">Sin opciones</option>
          ) : (
            unitOptions.map((u) => (
              <option key={u.key} value={u.key}>
                {u.label}
              </option>
            ))
          )}
        </select>

        {/* Botón Agregar */}
        <button
          onClick={() => addIngrdient(name)}
          className="bg-purple-500 text-white px-4 py-2 rounded-full text-xl"
          title="Agregar ingrediente"
        >
          +
        </button>
      </div>
    </div>
  );
}
