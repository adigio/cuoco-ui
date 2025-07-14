// components/PortionSummary.tsx
import React from "react";
import ContainerCardDetail from "@/components/shared/containers/ContainerCardDetail";
import { MealPrepPortionSummaryProps } from "@/types";

const PortionSummary: React.FC<MealPrepPortionSummaryProps> = ({ recipes }) => (
  <ContainerCardDetail title="Recetas incluidas" >
    <h3 className="text-md font-bold mb-2"></h3>
    <ul className="list-disc list-inside text-sm text-gray-700">
      {recipes.map((r, i) => (
        <li key={i}>
          {r.name}{r.portions ? `: ${r.portions} porciones` : ''}
        </li>
      ))}
    </ul>
  </ContainerCardDetail>
);

export default PortionSummary;
