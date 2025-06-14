"use client";
import { ArrowLeft, ArrowRight } from "lucide-react";

import { useI18n } from "locales/client";
import { Button } from "@/components/ui/button";

export function WorkoutBuilderFooter({
  currentStep,
  totalSteps,
  canContinue,
  onPrevious,
  onNext,
  selectedEquipment,
  selectedMuscles,
}: {
  currentStep: number;
  totalSteps: number;
  canContinue: boolean;
  onPrevious: VoidFunction;
  onNext: VoidFunction;
  selectedEquipment: any[];
  selectedMuscles: any[];
}) {
  const t = useI18n();
  const isFirstStep = currentStep === 1;
  const isFinalStep = currentStep === totalSteps;

  return (
    <div className="w-full sticky bottom-0 z-10">
      {/* Mobile layout - vertical stack */}
      <div className="flex flex-col gap-4 ">
        {/* Center stats on top for mobile */}
        <div className="flex items-center justify-center"></div>

        {/* Navigation buttons */}
        <div className="flex items-center justify-between gap-3 bg-white w-full rounded-sm p-2">
          {/* Previous button */}
          <Button className="flex-1 rounded-full" disabled={isFirstStep} onClick={onPrevious} size="default" variant="ghost">
            <div className="flex items-center gap-2">
              <ArrowLeft className="h-4 w-4" />
              <span className="font-medium">{t("workout_builder.navigation.previous")}</span>
            </div>
          </Button>

          {/* Next/Complete button */}
          <Button
            className="flex-1 rounded-full"
            disabled={!canContinue}
            onClick={isFinalStep ? () => console.log("Complete workout!") : onNext}
            size="default"
            variant="default"
          >
            <div className="flex items-center justify-center gap-2">
              <span className="font-semibold">
                {isFinalStep ? t("workout_builder.navigation.complete") : t("workout_builder.navigation.continue")}
              </span>
              <ArrowRight className="h-4 w-4" />
            </div>
          </Button>
        </div>
      </div>

      {/* Desktop layout - horizontal */}
    </div>
  );
}
