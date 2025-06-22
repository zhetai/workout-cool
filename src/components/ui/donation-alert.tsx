import React from "react";
import Link from "next/link";

import { cn } from "@/shared/lib/utils";
import { Alert, AlertDescription } from "@/components/ui/alert";

interface DonationAlertProps {
  className?: string;
}

export const DonationAlert = ({ className }: DonationAlertProps) => {
  return (
    <Alert
      className={cn(
        "flex items-center bg-gray-300 border-gray-400 text-gray-800 dark:bg-slate-600 dark:border-slate-500 dark:text-slate-200",
        className,
      )}
      variant="info"
    >
      <AlertDescription className="flex items-center gap-1 italic text-base">
        <span className="whitespace-pre-line">
          Keep Workout.cool free. Support us by making a{" "}
          <Link
            className="font-medium text-gray-900 underline hover:text-gray-700 dark:text-gray-200"
            href="https://ko-fi.com/workoutcool"
            target="_blank"
          >
            donation
          </Link>
          .
        </span>
      </AlertDescription>
    </Alert>
  );
};
