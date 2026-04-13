import React from "react";
import Label from "./Label";

type FormFieldProps = {
  children: React.ReactNode;
  label?: React.ReactNode;
  error?: boolean;
  errorMessage?: string;
  required?: boolean;
  className?: string;
  labelHtmlFor?: string;
};

export default function FormField({
  children,
  label,
  error = false,
  errorMessage,
  required = false,
  className = "",
  labelHtmlFor,
}: FormFieldProps) {
  return (
    <div className={`w-full ${className}`}>
      {label && (
        <div className="mb-2">
          {typeof label === "string" ? (
            <Label
              htmlFor={labelHtmlFor}
              required={required}
              className="font-semibold"
            >
              {label}
            </Label>
          ) : (
            label
          )}
        </div>
      )}
      <div className="w-full">{children}</div>
      {error && errorMessage && (
        <p className="mt-1 text-[12px] leading-[16px] text-[var(--error)] font-poppins">
          {errorMessage}
        </p>
      )}
    </div>
  );
}
