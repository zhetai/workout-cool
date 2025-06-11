"use client";

import { useAction } from "next-safe-action/hooks";

import { useCurrentLocale, useChangeLocale, languages } from "locales/client";
import { updateUserAction } from "@/entities/user/model/update-user.action";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";

const languageFlags: Record<string, string> = {
  en: "🇬🇧",
  fr: "🇫🇷",
};

export function LanguageSelector() {
  const action = useAction(updateUserAction);
  const changeLocale = useChangeLocale();
  const locale = useCurrentLocale();

  const handleLanguageChange = async (newLocale: string) => {
    await action.execute({ locale: newLocale });
    changeLocale(newLocale as "en" | "fr");
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button className="h-8 w-8 p-0 text-xl" size="small" variant="outline">
          {languageFlags[locale] || "🌐"}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="min-w-[100px]">
        {languages.map((language) => (
          <DropdownMenuItem className="cursor-pointer" key={language} onClick={() => handleLanguageChange(language)}>
            <span className="mr-2">{languageFlags[language]}</span>
            {language === "en" ? "English" : "Français"}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
