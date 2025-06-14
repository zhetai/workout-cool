import React from "react";
import Link from "next/link";

import { cn } from "@/shared/lib/utils";
import { paths } from "@/shared/constants/paths";
import { Alert, AlertDescription } from "@/components/ui/alert";

interface LocalAlertProps {
  className?: string;
}

export const LocalAlert = ({ className }: LocalAlertProps) => {
  return (
    <Alert className={cn("bg-blue-100 border-0 text-black", className)} variant="info">
      <AlertDescription className="flex flex-wrap items-center gap-1 italic text-base">
        Your progress is stored in your browser.
        <br className="sm:hidden" />
        <Link className="ml-1 mr-1 font-medium text-blue-700 underline" href={paths.signUp}>
          Create an account
        </Link>
        or
        <Link className="ml-1 font-medium text-purple-700 underline" href={paths.signIn}>
          Log-in
        </Link>
        to ensure it is not getting lost
      </AlertDescription>
    </Alert>
  );
};
