import { forwardRef } from "react";
import NextLink from "next/link";

import { cn } from "@/shared/lib/utils";

import type { ComponentProps } from "react";

interface LinkProps extends ComponentProps<typeof NextLink> {
  variant?: "default" | "nav" | "footer" | "button";
  size?: "sm" | "base" | "lg";
}

export const Link = forwardRef<HTMLAnchorElement, LinkProps>(
  ({ className, variant = "default", size = "base", children, ...props }, ref) => {
    const variants = {
      default: "link link-hover text-base-content hover:text-primary transition-colors",
      nav: "link link-hover text-base-content/80 hover:text-base-content transition-colors",
      footer: "link link-hover text-base-content/70 hover:text-base-content transition-colors",
      button: "btn btn-link no-underline hover:underline",
    };

    const sizes = {
      sm: "text-sm",
      base: "text-base",
      lg: "text-lg",
    };

    return (
      <NextLink className={cn(variants[variant], sizes[size], className)} ref={ref} {...props}>
        {children}
      </NextLink>
    );
  },
);

Link.displayName = "Link";
