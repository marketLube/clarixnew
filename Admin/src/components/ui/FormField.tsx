"use client";

import { Label } from "@/src/components/ui/label";

type FormFieldProps = {
  label: string | React.ReactNode;
  name: string;
  children: React.ReactNode;
  className?: string;
};

export function FormField({
  label,
  name,
  children,
  className,
}: FormFieldProps) {
  return (
    <div className={className}>
      <Label
        htmlFor={name}
        className="text-sm font-medium text-gray-700 mb-1 block"
      >
        {label}
      </Label>

      {children}
    </div>
  );
}
