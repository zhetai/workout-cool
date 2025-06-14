"use client";

import { useEffect } from "react";
import { useTheme } from "next-themes";
import { MoonIcon, SunIcon } from "lucide-react";

import { Button } from "@/components/ui/button";

export function ThemeToggle() {
  const { setTheme, resolvedTheme } = useTheme();

  useEffect(() => {
    console.log("resolvedTheme:", resolvedTheme);
  }, [resolvedTheme]);

  return (
    <Button className="rounded-full p-2 pr-2" onClick={() => setTheme(resolvedTheme === "light" ? "dark" : "light")} variant="ghost">
      <div className="tooltip" data-tip={resolvedTheme === "light" ? "Dark mode" : "Light mode"}>
        {resolvedTheme === "light" ? <MoonIcon /> : <SunIcon />}
      </div>
    </Button>
  );
}
