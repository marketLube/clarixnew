import React from "react";

type InputProps = {
  type?: "text" | "email" | "password" | "number" | "tel" | "search";
  placeholder?: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onFocus?: (e: React.FocusEvent<HTMLInputElement>) => void;
  onBlur?: (e: React.FocusEvent<HTMLInputElement>) => void;
  disabled?: boolean;
  error?: boolean;
  errorMessage?: string;
  label?: string;
  required?: boolean;
  className?: string;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  name?: string;
  id?: string;
};

export default function Input({
  type = "text",
  placeholder,
  value,
  onChange,
  onFocus,
  onBlur,
  disabled = false,
  error = false,
  errorMessage,
  label,
  required = false,
  className = "",
  leftIcon,
  rightIcon,
  name,
  id,
}: InputProps) {
  const baseInputClasses = `
    w-full
    bg-[var(--background)]
    border
    ${error ? "border-[var(--error)]" : "border-[var(--input-border)]"}
    rounded-[12px]
    px-4
    py-3
    font-poppins
    text-[14px]
    leading-[20px]
    text-[var(--text-headline)]
    placeholder:text-[var(--text-sub)]
    focus:outline-none
    focus:border-[var(--color-primary)]
    focus:ring-2
    focus:ring-[var(--primary-light)]
    transition-all
    disabled:opacity-50
    disabled:cursor-not-allowed
    ${leftIcon ? "pl-10" : ""}
    ${rightIcon ? "pr-10" : ""}
    ${className}
  `.trim().replace(/\s+/g, " ");

  return (
    <div className="w-full">
      {label && (
        <label
          htmlFor={id || name}
          className="block mb-2 font-poppins text-[14px] leading-[20px] text-[var(--text-headline)]"
        >
          {label}
          {required && <span className="text-[var(--error)] ml-1">*</span>}
        </label>
      )}
      <div className="relative">
        {leftIcon && (
          <div className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--text-sub)]">
            {leftIcon}
          </div>
        )}
        <input
          type={type}
          id={id || name}
          name={name}
          value={value}
          onChange={onChange}
          onFocus={onFocus}
          onBlur={onBlur}
          placeholder={placeholder}
          disabled={disabled}
          required={required}
          className={baseInputClasses}
        />
        {rightIcon && (
          <div className="absolute right-3 top-1/2 -translate-y-1/2 text-[var(--text-sub)]">
            {rightIcon}
          </div>
        )}
      </div>
      {error && errorMessage && (
        <p className="mt-1 text-[12px] leading-[16px] text-[var(--error)] font-poppins">
          {errorMessage}
        </p>
      )}
    </div>
  );
}
