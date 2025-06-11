import type { ComponentPropsWithoutRef } from "react";

export type LogoSvgProps = ComponentPropsWithoutRef<"svg"> & { size?: number };

export const LogoSvg = ({ size = 32, ...props }: LogoSvgProps) => {
  return (
    <svg height={size} width={size} viewBox="0 0 100 40" xmlns="http://www.w3.org/2000/svg" {...props}>
      {/* Disque gauche */}
      <circle cx="15" cy="20" r="12" fill="currentColor" className="opacity-90" />

      {/* Barre centrale */}
      <rect x="12" y="18" width="76" height="4" fill="currentColor" rx="2" />

      {/* Disque droit */}
      <circle cx="85" cy="20" r="12" fill="currentColor" className="opacity-90" />

      {/* Poignée centrale (optionnel pour plus de détail) */}
      <rect x="40" y="16" width="20" height="8" fill="none" stroke="currentColor" strokeWidth="1" rx="4" className="opacity-50" />
    </svg>
  );
};
