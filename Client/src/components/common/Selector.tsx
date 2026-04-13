"use client";

type SelectorOption = {
  label: string;
  value: string;
};

type SelectorProps = {
  placeholder?: string;
  options?: SelectorOption[];
  value?: string;
  onChange?: (value: string) => void;
  className?: string;
};

const DEFAULT_OPTIONS: SelectorOption[] = [
  { label: "1 year", value: "1-year" },
  { label: "2 years", value: "2-years" },
  { label: "3 years", value: "3-years" },
];

export default function Selector({
  placeholder = "Select Duration",
  options = DEFAULT_OPTIONS,
  value,
  onChange,
  className = "",
}: SelectorProps) {
  return (
    <div
      className={`relative inline-flex w-full items-center rounded-[10px] border border-[#767e92]/50 bg-white px-5 py-3 shadow-[1px_6px_21.3px_0px_rgba(0,0,0,0.01)] ${className}`}
    >
      <select
        className="w-full appearance-none bg-transparent pr-6 text-[16px] leading-[20px] text-[#767e92] font-['Poppins',sans-serif] outline-none"
        value={value ?? ""}
        onChange={(e) => onChange?.(e.target.value)}
      >
        <option value="" disabled>
          {placeholder}
        </option>
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
      <span
        aria-hidden="true"
        className="pointer-events-none absolute right-5 inline-block h-0 w-0 border-l-[6px] border-r-[6px] border-t-[6px] border-l-transparent border-r-transparent border-t-[#162447]"
      />
    </div>
  );
}
