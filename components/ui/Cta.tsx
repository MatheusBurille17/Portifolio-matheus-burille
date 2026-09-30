"use client";

import type { ReactNode } from "react";
import Magnetic from "@/components/MagneticButton";

type Variant = "solid" | "outline" | "ghost";

const base =
  "group relative inline-flex items-center justify-center overflow-hidden whitespace-nowrap rounded-full px-6 py-3.5 text-sm font-medium tracking-tight transition-colors duration-300 sm:px-7";

const variants: Record<Variant, string> = {
  solid: "bg-accent text-ink hover:bg-bone",
  outline: "border border-bone/20 text-bone hover:border-bone/45",
  ghost: "text-bone/80 hover:text-bone",
};

type CtaProps = {
  href: string;
  children: ReactNode;
  variant?: Variant;
  external?: boolean;
  className?: string;
  magnetic?: boolean;
  onClick?: () => void;
  ariaLabel?: string;
};

export function Cta({
  href,
  children,
  variant = "solid",
  external = false,
  className = "",
  magnetic = true,
  onClick,
  ariaLabel,
}: CtaProps) {
  const link = (
    <a
      href={href}
      onClick={onClick}
      aria-label={ariaLabel}
      {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      className={`${base} ${variants[variant]} ${className}`}
    >
      {variant === "outline" ? (
        <span className="absolute inset-0 -z-10 origin-bottom scale-y-0 bg-bone/[0.07] transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-y-100" />
      ) : null}
      <span className="relative inline-flex items-center gap-2.5">{children}</span>
    </a>
  );

  if (!magnetic) return link;

  return <Magnetic className="inline-block">{link}</Magnetic>;
}

/** Link de texto com sublinhado que "atravessa" no hover. */
export function UnderlineLink({
  href,
  children,
  external = false,
  className = "",
}: {
  href: string;
  children: ReactNode;
  external?: boolean;
  className?: string;
}) {
  return (
    <a
      href={href}
      {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      className={`group relative inline-flex items-center text-bone-dim transition-colors duration-300 hover:text-bone ${className}`}
    >
      <span className="relative inline-flex items-center gap-1.5 whitespace-nowrap">
        {children}
        <span className="absolute -bottom-0.5 left-0 h-px w-full origin-right scale-x-0 bg-accent transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:origin-left group-hover:scale-x-100" />
      </span>
    </a>
  );
}
