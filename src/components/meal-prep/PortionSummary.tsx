// components/PortionSummary.tsx
import React from "react";
import { MealPrepRecipe } from "@/types";

interface PortionSummaryProps {
  recipes: MealPrepRecipe[];
}

const PortionSummary: React.FC<PortionSummaryProps> = ({ recipes }) => (
  <div className="bg-white shadow rounded-lg p-4">
    <h3 className="text-md font-bold mb-2">Recetas incluidas</h3>
    <hr className="border-gray-200 mb-4" />
    <ul className="list-disc list-inside text-sm text-gray-700">
      {recipes.map((r, i) => (
        <li key={i}>
          {r.title}{r.portions ? `: ${r.portions} porciones` : ''}
        </li>
      ))}
    </ul>
  </div>
);

export default PortionSummary;
