// components/MealPrepSteps.tsx
import React from "react";
import { MealPrepStepsProps } from "@/types";

const MealPrepSteps: React.FC<MealPrepStepsProps> = ({ steps }) => {
  return (
    <ol className="relative border-l border-[#f27f6c] ml-6 space-y-8">
      {steps.map((step, index) => (
        <li key={index} className="ml-4">
          <div className="absolute w-4 h-4 bg-[#f27f6c] rounded-full -left-2.5 border-2 border-white"></div>
          <h3 className="text-lg font-semibold text-[#f27f6c] mb-1">
            ⏱ {step.time}&apos; – {step.title}
          </h3> 
          <ul className="text-sm text-gray-700 space-y-1"> 
              <li>{step.description}</li> 
          </ul>
        </li>
      ))}
    </ol>
  );
};

export default MealPrepSteps;
