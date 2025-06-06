// components/MealPrepSteps.tsx
import React from "react";

interface Step {
  title: string;
  estimatedTime: number;
  instructions: string[];
}

interface MealPrepStepsProps {
  steps: Step[];
}

const MealPrepSteps: React.FC<MealPrepStepsProps> = ({ steps }) => {
  return (
    <ol className="relative border-l border-[#f27f6c] ml-6 space-y-8">
      {steps.map((step, index) => (
        <li key={index} className="ml-4">
          <div className="absolute w-4 h-4 bg-[#f27f6c] rounded-full -left-2.5 border-2 border-white"></div>
          <h3 className="text-lg font-semibold text-[#f27f6c] mb-1">
            ⏱ {step.estimatedTime}&apos; – {step.title}
          </h3>
          <ul className="list-disc list-inside text-sm text-gray-700 space-y-1">
            {step.instructions.map((inst, idx) => (
              <li key={idx}>{inst}</li>
            ))}
          </ul>
        </li>
      ))}
    </ol>
  );
};

export default MealPrepSteps;
