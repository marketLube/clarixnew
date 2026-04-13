import * as React from "react";

type BadgeVariant = "primary" | "secondary" | "danger" | "subtle" | "success" | "accent";

export interface BadgeProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: BadgeVariant;
  pill?: boolean;
}

const baseClasses =
  "inline-flex items-center justify-center text-[11px] leading-[14px] font-medium px-2.5 py-1 select-none whitespace-nowrap";

const variantClasses: Record<BadgeVariant, string> = {
  primary:
    "bg-[var(--primary-color)] text-white border border-[#e1d3ff] shadow-[0_1px_3px_rgba(0,0,0,0.04)]",
  secondary:
    "bg-white text-[var(--secondary-color)] border border-[#e2e4e8] shadow-[0_1px_3px_rgba(0,0,0,0.04)]",
  danger:
    "bg-[var(--error-light)] text-[var(--error)] border border-[#ffcec4] shadow-[0_1px_3px_rgba(0,0,0,0.04)]",
  subtle:
    "bg-[var(--muted)] text-[var(--muted-foreground)] border border-[#e2e4e8] shadow-[0_1px_3px_rgba(0,0,0,0.04)]",
  success:
    "bg-[var(--success)] text-white border border-[var(--success)] shadow-[0_1px_3px_rgba(0,0,0,0.04)]",
  accent:
    "bg-[#F6F7FF] text-[#513392] border border-[#DAC9FF] shadow-[0_1px_3px_rgba(0,0,0,0.04)]",
};

export function Badge({
  variant = "primary",
  pill = true,
  className,
  children,
  ...rest
}: BadgeProps) {
  return (
    <div
      className={[
        baseClasses,
        variantClasses[variant],
        pill ? "rounded-full" : "rounded-[6px]",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
      {...rest}
    >
      {children}
    </div>
  );
}
