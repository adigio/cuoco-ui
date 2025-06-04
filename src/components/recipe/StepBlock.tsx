import React from "react";
import { RecipeDetailSection } from "@/types/recipe/recipe.types";
import ContainerCardDetail from "@/components/shared/containers/ContainerCardDetail";

export default function RecipeStepBlock({ section, steps }: RecipeDetailSection) {
  return (
    <ContainerCardDetail title={section}>
      {steps.map((step, idx) => (
        <div key={idx} className="flex gap-4 mb-4">
          {step.image && (
            <img src={step.image} alt="" className="w-24 h-24 object-cover rounded" />
          )}
          <div className="flex flex-wrap gap-1">
            <div className="text-color-primary-medium font-bold text-lg">{step.number}</div>
            <div className="w-[90%]">
              {step.title && <span className="font-semibold">{step.title}: </span>}
              {step.description}
            </div>
          </div>
        </div>
      ))}
    </ContainerCardDetail>
  );
} 