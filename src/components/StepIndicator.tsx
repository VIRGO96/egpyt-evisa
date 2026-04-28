import { Check } from "lucide-react";
import { cn } from "@/lib/utils";

interface StepIndicatorProps {
  currentStep: number;
  totalSteps: number;
  stepLabels: string[];
}

export const StepIndicator = ({
  currentStep,
  totalSteps,
  stepLabels,
}: StepIndicatorProps) => {
  return (
    <div className="bg-white rounded-lg border border-gray-100 p-3 sm:p-4 mb-4 shadow-sm">
      {/* Header */}
      <div className="text-center mb-3">
        <h2 className="text-xl font-bold my-3 sm:text-2xl">
          Apply for United Kingdom ETA
        </h2>
        <h2 className="text-base font-semibold text-gray-800">
          Application Progress
        </h2>
      </div>
      {/* Step Tracker */}
      <div className="flex items-center justify-between max-w-lg mx-auto">
        {Array.from({ length: totalSteps }, (_, i) => i + 1).map(
          (step, index) => {
            const isCompleted = step < currentStep;
            const isActive = step === currentStep;
            return (
              <div
                key={step}
                className="flex items-center flex-1 last:flex-none"
              >
                {/* Step Circle */}
                <div className="flex flex-col items-center text-center">
                  <div
                    className={cn(
                      "relative w-6 h-6 rounded-full flex items-center justify-center font-semibold text-[10px] transition-all duration-300",
                      isCompleted
                        ? "bg-primary/80 text-white"
                        : isActive
                        ? "bg-primary/80 text-white ring-2 ring-primary90"
                        : "bg-gray-200 text-gray-500"
                    )}
                  >
                    {isCompleted ? (
                      <Check className="w-3.5 h-3.5" />
                    ) : (
                      <span>{step}</span>
                    )}
                  </div>
                  {/* Label */}
                  <p
                    className={cn(
                      "mt-1 text-[11px] font-medium",
                      isCompleted || isActive
                        ? "text-gray-800"
                        : "text-gray-400"
                    )}
                  >
                    {stepLabels[step - 1]}
                  </p>
                </div>
                {/* Connector Line */}
                {index < totalSteps - 1 && (
                  <div className="relative flex-1 h-0.5 mx-2">
                    <div className="absolute inset-0 bg-gray-200 rounded-full"></div>
                    <div
                      className={cn(
                        "absolute inset-0 rounded-full transition-all duration-500 ease-out",
                        isCompleted
                          ? "bg-gradient-to-r from-primary/80 to-primary/90"
                          : "w-0"
                      )}
                    ></div>
                  </div>
                )}
              </div>
            );
          }
        )}
      </div>
    </div>
  );
};
