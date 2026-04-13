"use client";

import * as React from "react";

type Variant =
  | "primary"
  | "secondary"
  | "outline"
  | "primaryRound"
  | "secondaryRound"
  | "heroOutline";
type Size = "sm" | "md" | "lg";

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
  size?: Size;
}

const baseClasses =
  "inline-flex items-center justify-center rounded-full font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-transparent focus-visible:ring-white/70 disabled:opacity-60 disabled:cursor-not-allowed";

const variantClasses: Record<Variant, string> = {
  primary:
    "bg-[var(--primary-color)] text-white hover:bg-[var(--primary-hover)] shadow-[0_8px_24px_rgba(0,0,0,0.25)] cursor-pointer",
  secondary:
    "bg-white text-[var(--primary-color)] border border-white/40 hover:bg-gray-100 shadow-[0_4px_16px_rgba(0,0,0,0.2)] cursor-pointer",
  outline:
    "bg-transparent text-black border border-[#767E92]/[0.21] hover:bg-black/10 cursor-pointer",
  primaryRound:
    "bg-[var(--primary-color)] text-white hover:bg-[var(--primary-hover)] shadow-[0_6px_18px_rgba(0,0,0,0.25)] cursor-pointer",
  secondaryRound:
    "bg-white text-[var(--primary-color)] border border-white/40 hover:bg-gray-100 shadow-[0_6px_18px_rgba(0,0,0,0.25)] cursor-pointer",
  heroOutline:
    "bg-transparent text-white border border-white/80 hover:bg-white/10 shadow-[0_10px_30px_rgba(0,0,0,0.3)] cursor-pointer",
};

const sizeClasses: Record<Size, string> = {
  sm: "px-3 py-1.5 text-xs",
  md: "px-4 py-2 text-sm",
  lg: "px-6 py-3 text-base",
};

function cn(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(" ");
}

export function Button({
  variant = "primary",
  size = "md",
  className,
  children,
  ...props
}: ButtonProps) {
  return (
    <button
      className={cn(
        baseClasses,
        variantClasses[variant],
        sizeClasses[size],
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
}
