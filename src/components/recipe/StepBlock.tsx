import React from "react";
import Image from "next/image";
import { RecipeDetailSection } from "@/types/recipe/recipe.types";
import ContainerCardDetail from "@/components/shared/containers/ContainerCardDetail";

export default function RecipeStepBlock({ section, steps }: RecipeDetailSection) {
  return (
    <ContainerCardDetail title={section}>
      {steps.map((step, idx) => (
        <div key={idx} className="flex gap-4 mb-4">
          {/*step.image && (
            <div className="relative w-24 h-24">
              <Image 
                src={step.image} 
                alt={`Paso ${step.number}`} 
                fill
                className="object-cover rounded" 
              />
            </div>
          )*/}
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