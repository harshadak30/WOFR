import React from "react";
import { Check } from "lucide-react";

interface Step {
  id: number;
  name: string;
  status: "current" | "upcoming" | "complete";
}

interface MultiStepIndicatorProps {
  steps: Step[];
  currentStep: number;
}

const MultiStepIndicator: React.FC<MultiStepIndicatorProps> = ({
  steps,
  currentStep,
}) => {
  return (
    <nav aria-label="Progress" className="mb-8">
      <ol className="flex overflow-x-auto hide-scrollbar pb-2">
        {steps.map((step, stepIdx) => (
          <li
            key={step.name}
            className={`relative flex-shrink-0 ${
              stepIdx !== steps.length - 1 ? "pr-8 sm:pr-10" : ""
            }`}
          >
            {step.status === "complete" ? (
              <>
                <div className="group">
                  <span className="flex items-center">
                    <span className="relative flex h-8 w-8 items-center justify-center rounded-full bg-blue-600 group-hover:bg-blue-700">
                      <Check
                        className="h-5 w-5 text-white"
                        aria-hidden="true"
                      />
                      <span className="sr-only">{step.name}</span>
                    </span>
                    <span className="ml-5  block text-sm font-medium text-blue-600">
                      {step.name} {">"}
                    </span>
                  </span>
                </div>
              </>
            ) : step.status === "current" ? (
              <div>
                <span className="flex items-center">
                  <span className="relative flex h-8 w-8 items-center justify-center rounded-full   bg-[#008F98]">
                    <span className="text-white">{step.id}</span>
                  </span>
                  <span className="ml-5  block text-sm font-medium text-[#008F98]">
                    {step.name} {">"}
                  </span>
                </span>
              </div>
            ) : (
              <>
                <div>
                  <span className="flex items-center">
                    <span className="relative flex h-8 w-8 items-center justify-center rounded-full   bg-gray-300">
                      <span className="text-black">{step.id}</span>
                    </span>
                    <span className="ml-5  block text-sm font-medium text-black">
                      {step.name} {">"}
                    </span>
                  </span>
                </div>
              </>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
};

export default MultiStepIndicator;
