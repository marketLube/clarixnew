import React from "react";

type CheckboxProps = {
  id?: string;
  name?: string;
  checked?: boolean;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  label?: React.ReactNode;
  required?: boolean;
  className?: string;
};

export default function Checkbox({
  id,
  name,
  checked,
  onChange,
  label,
  required = false,
  className = "",
}: CheckboxProps) {
  return (
    <label
      htmlFor={id || name}
      className={`flex items-center gap-2 cursor-pointer select-none font-poppins text-[14px] leading-[20px] text-[var(--text-sub)] ${className}`}
    >
      <input
        id={id || name}
        name={name}
        type="checkbox"
        checked={checked}
        onChange={onChange}
        required={required}
        className="h-4 w-4 rounded border-[var(--input-border)] text-[var(--color-primary)] focus:ring-[var(--primary-light)] focus:ring-2 cursor-pointer"
      />
      <span>
        {label}
        {required && <span className="text-[var(--error)] ml-1">*</span>}
      </span>
    </label>
  );
}
