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
  }, [isLoaded, unitOptions.length, isInitialized]); // Usamos length en lugar del array completo


  const addIngredient = useIngredientsStore((state) => state.addIngredient);

  const addIngrdient = (name: string, origin = "manual", confirm = true) => {
    if (!name.trim()) {
      return;
    }
    
    const selectedUnit = unitOptions.find((u) => u.key === Number(unit)); 
    if (!selectedUnit) {
      return;
    }
    
    const agregado = addIngredient(
      name,
      Number(quantity) || 0,
      String(selectedUnit.key),
      selectedUnit.symbol || selectedUnit.label,
      false,
      origin,
      confirm
    );
    
    if (agregado) {
      setName("");
      setQuantity("");
      // Resetear a la primera unidad disponible
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
          type="text"
          placeholder="Cantidad"
          value={quantity}
          onChange={(e) => setQuantity(e.target.value)}
          className="border rounded px-4 py-2 w-24"
        />

        {/* Unidad */}
        <select
          value={unit}
          onChange={(e) => {
            setUnit(e.target.value);
          }}
          className="border rounded px-2 py-2"
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
          className="bg-purple-300 text-white px-4 py-2 rounded-full text-xl"
          title="Agregar ingrediente"
        >
          +
        </button>
      </div>
    </div>
  );
}
