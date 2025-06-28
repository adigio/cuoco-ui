"use client";

import { useEffect, useState } from "react";
import { useIngredientsStore } from "@/store/useIngredientsStore";

// Servicios
import { getUnitTypes } from "@/services/getter.service";

export default function RecipeIngredientInput() {
  const [name, setName] = useState<string>("");
  const [quantity, setQuantity] = useState<string>("");
  const [unit, setUnit] = useState<string>(""); // el value va a ser el id
  const [unitTypes, setUnitTypes] = useState<any[]>([]); // podés tiparlo mejor si tenés la interfaz

  useEffect(() => {
    const fetchData = async () => {
      const [unitTypesData] = await Promise.all([getUnitTypes()]);
      setUnitTypes(unitTypesData);
      if (unitTypesData.length > 0) setUnit(String(unitTypesData[0].id));
    };
    fetchData();
  }, []);

  const addIngredient = useIngredientsStore((state) => state.addIngredient);

  const addIngrdient = (name: string, origin = "manual", confirm = true) => {
    const selectedUnit = unitTypes.find((u) => u.id === Number(unit)); 
    if (!selectedUnit) {
      return;
    }
    const displayName =
      quantity && selectedUnit
        ? `${quantity} ${selectedUnit.symbol} ${name}`
        : name;  
    const agregado = addIngredient(
      name,
      Number(quantity) || 0,
      String(selectedUnit.id),
      selectedUnit.symbol,
      false,
      origin,
      confirm
    );
    if (agregado) {
      setName("");
      setQuantity("");
      setUnit(unitTypes.length > 0 ? String(unitTypes[0].id) : "");
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
          onChange={(e) => setUnit(e.target.value)}
          className="border rounded px-2 py-2"
        >
          {unitTypes.map((u) => (
            <option key={u.id} value={u.id}>
              {u.symbol}
            </option>
          ))}
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
