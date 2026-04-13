import React from "react";

type TextAreaProps = {
  placeholder?: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  onFocus?: (e: React.FocusEvent<HTMLTextAreaElement>) => void;
  onBlur?: (e: React.FocusEvent<HTMLTextAreaElement>) => void;
  disabled?: boolean;
  error?: boolean;
  errorMessage?: string;
  label?: string;
  required?: boolean;
  className?: string;
  leftIcon?: React.ReactNode;
  name?: string;
  id?: string;
  rows?: number;
  maxLength?: number;
  resize?: "none" | "both" | "horizontal" | "vertical";
};

export default function TextArea({
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
  name,
  id,
  rows = 4,
  maxLength,
  resize = "none",

}: TextAreaProps) {
  const resizeClass =
    resize === "none"
      ? "resize-none"
      : resize === "both"
      ? "resize"
      : resize === "horizontal"
      ? "resize-x"
      : "resize-y";

  const baseTextAreaClasses = `
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
    ${resizeClass}
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
          <div className="absolute left-3 top-3 text-[var(--text-sub)]">
            {leftIcon}
          </div>
        )}
        <textarea
          id={id || name}
          name={name}
          value={value}
          onChange={onChange}
          onFocus={onFocus}
          onBlur={onBlur}
          placeholder={placeholder}
          disabled={disabled}
          required={required}
          className={baseTextAreaClasses}
          rows={rows}
          maxLength={maxLength}
        />
      </div>
      {error && errorMessage && (
        <p className="mt-1 text-[12px] leading-[16px] text-[var(--error)] font-poppins">
          {errorMessage}
        </p>
      )}
      {maxLength && (
        <p className="mt-1 text-[12px] leading-[16px] text-[var(--text-sub)] font-poppins text-right">
          {value?.length || 0} / {maxLength}
        </p>
      )}
    </div>
  );
}
