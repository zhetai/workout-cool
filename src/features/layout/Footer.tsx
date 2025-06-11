import { Github, Mail, Twitter } from "lucide-react";

import { getI18n } from "locales/server";
import { TFunction } from "locales/client";
import { Link } from "@/components/ui/link";

const SOCIAL_LINKS = [
  {
    href: "https://github.com/Vincenius/workout-lol",
    icon: Github,
    label: "GitHub",
  },
  {
    href: "https://twitter.com/wweb_dev",
    icon: Twitter,
    label: "Twitter",
  },
  {
    href: "mailto:info@workout.cool",
    icon: Mail,
    label: "Email",
  },
];

const NAVIGATION = (t: TFunction) => [
  { name: t("commons.donate"), href: "https://ko-fi.com/workout_lol" },
  { name: t("commons.about"), href: "/about" },
  { name: t("commons.privacy"), href: "/legal/privacy" },
];

export const Footer = async () => {
  const t = await getI18n();

  return (
    <footer className="border-t border-base-300 bg-base-100 px-6 py-4">
      <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
        {/* Social Icons */}
        <div className="flex gap-2">
          {SOCIAL_LINKS.map(({ href, icon: Icon, label }) => (
            <a
              aria-label={label}
              className="btn btn-ghost btn-sm btn-circle"
              href={href}
              key={label}
              rel="noopener noreferrer"
              target="_blank"
            >
              <Icon className="h-5 w-5" />
            </a>
          ))}
        </div>

        {/* Navigation Links */}
        <div className="flex flex-col sm:flex-row gap-2 sm:gap-4 text-center">
          {NAVIGATION(t).map(({ name, href }) => (
            <Link
              href={href}
              key={name}
              size="sm"
              variant="footer"
              {...(href.startsWith("http") && { target: "_blank", rel: "noopener noreferrer" })}
            >
              {name}
            </Link>
          ))}
        </div>
      </div>
    </footer>
  );
};
