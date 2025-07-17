import React from "react";
import Image from "next/image";
import { RecipeDetailSection } from "@/types/recipe/recipe.types";
import ContainerCardDetail from "@/components/shared/containers/ContainerCardDetail";

export default function RecipeStepBlock({ section, steps }: RecipeDetailSection) {
  return (
    <ContainerCardDetail title={section}>
      {steps.map((step, idx) => (
        <div key={idx} className="flex gap-4 mb-6">
          <div className="flex gap-4 items-start w-full">
            <div className="flex-shrink-0 w-8 h-8 bg-gradient-to-r from-[#f37b6a] to-[#e36455] text-white rounded-full flex items-center justify-center font-bold text-sm shadow-md">
              {step.number}
            </div>
            
            {/* Contenido del paso */}
            <div className="flex-1 pt-1">
              <div className="text-gray-800 leading-relaxed">
                {step.title && <span className="font-semibold text-[#333] mr-1">{step.title}:</span>}
                <span className="text-gray-700">{step.description}</span>
              </div>
            </div>
          </div>
        </div>
      ))}
    </ContainerCardDetail>
  );
} 