"use client";

import { FC } from "react";
import Link from "next/link";
import { ExternalLink } from "lucide-react";

import { cn } from "@/shared/lib/utils";
import { getServerUrl } from "@/shared/lib/server-url";

interface PageLinkProps {
  slug: string;
  className?: string;
  showExternalIcon?: boolean;
}

export const PageLink: FC<PageLinkProps> = ({ slug, className, showExternalIcon = true }) => {
  const fullUrl = `${getServerUrl()}/${slug}`;

  return (
    <Link
      className={cn("group inline-flex items-center gap-1 text-blue-600 transition-colors hover:text-blue-800", className)}
      href={fullUrl}
      rel="noopener noreferrer"
      target="_blank"
    >
      <span className="underline-offset-2 group-hover:underline">{slug}</span>
      {showExternalIcon && <ExternalLink className="h-3 w-3" />}
    </Link>
  );
};
