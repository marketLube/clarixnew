"use client";

import React, { useState } from "react";

const WHATSAPP_NUMBER = "917306897989";

type FormState = {
  name: string;
  phone: string;
  marks: string;
  passoutYear: string;
};

type FormErrors = Partial<Record<keyof FormState, string>>;

const initialState: FormState = {
  name: "",
  phone: "",
  marks: "",
  passoutYear: "",
};

function validate(values: FormState): FormErrors {
  const errors: FormErrors = {};

  if (!values.name.trim()) {
    errors.name = "Please enter your name";
  } else if (values.name.trim().length < 2) {
    errors.name = "Name looks too short";
  }

  const digits = values.phone.replace(/\D/g, "");
  if (!values.phone.trim()) {
    errors.phone = "Phone number is required";
  } else if (digits.length < 10 || digits.length > 13) {
    errors.phone = "Enter a valid phone number";
  }

  const marksNum = Number(values.marks);
  if (!values.marks.trim()) {
    errors.marks = "+2 marks is required";
  } else if (Number.isNaN(marksNum) || marksNum < 0 || marksNum > 100) {
    errors.marks = "Enter a value between 0 and 100";
  }

  const yearNum = Number(values.passoutYear);
  const currentYear = new Date().getFullYear();
  if (!values.passoutYear.trim()) {
    errors.passoutYear = "Passout year is required";
  } else if (
    Number.isNaN(yearNum) ||
    yearNum < 2000 ||
    yearNum > currentYear + 2
  ) {
    errors.passoutYear = `Enter a year between 2000 and ${currentYear + 2}`;
  }

  return errors;
}

function buildWhatsAppUrl(values: FormState) {
  const message =
    `Hi! I'm interested in the Work-Integrated BCA Program.\n\n` +
    `Name: ${values.name.trim()}\n` +
    `Phone: ${values.phone.trim()}\n` +
    `+2 Marks: ${values.marks.trim()}%\n` +
    `+2 Passout Year: ${values.passoutYear.trim()}`;

  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}

export default function LeadForm() {
  const [values, setValues] = useState<FormState>(initialState);
  const [errors, setErrors] = useState<FormErrors>({});
  const [submitting, setSubmitting] = useState(false);

  const handleChange =
    (field: keyof FormState) => (e: React.ChangeEvent<HTMLInputElement>) => {
      setValues((prev) => ({ ...prev, [field]: e.target.value }));
      if (errors[field]) {
        setErrors((prev) => ({ ...prev, [field]: undefined }));
      }
    };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const nextErrors = validate(values);
    if (Object.keys(nextErrors).length > 0) {
      setErrors(nextErrors);
      return;
    }

    setSubmitting(true);
    const url = buildWhatsAppUrl(values);
    window.open(url, "_blank", "noopener,noreferrer");
    setTimeout(() => setSubmitting(false), 1200);
  };

  const inputBase =
    "w-full bg-white border rounded-[10px] md:rounded-[12px] px-3.5 md:px-4 py-2.5 md:py-3.5 font-poppins text-[14px] md:text-[15px] text-[#162447] placeholder:text-[#9ca3af] focus:outline-none focus:ring-2 focus:ring-[#e8e0f5] transition-all";

  const labelBase =
    "block mb-1 md:mb-1.5 font-poppins text-[12px] md:text-[14px] font-medium text-[#162447]";

  return (
    <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-3 md:gap-4">
      <div>
        <label
          htmlFor="lf-name"
          className={labelBase}
        >
          Full Name <span className="text-[#ef4444]">*</span>
        </label>
        <input
          id="lf-name"
          type="text"
          autoComplete="name"
          inputMode="text"
          placeholder="e.g. Aarav Sharma"
          value={values.name}
          onChange={handleChange("name")}
          className={`${inputBase} ${
            errors.name
              ? "border-[#ef4444] focus:border-[#ef4444]"
              : "border-[#e2e8f0] focus:border-[#513392]"
          }`}
        />
        {errors.name && (
          <p className="mt-1 text-[12px] text-[#ef4444] font-poppins">
            {errors.name}
          </p>
        )}
      </div>

      <div>
        <label
          htmlFor="lf-phone"
          className={labelBase}
        >
          Phone Number <span className="text-[#ef4444]">*</span>
        </label>
        <input
          id="lf-phone"
          type="tel"
          autoComplete="tel"
          inputMode="tel"
          placeholder="10-digit mobile number"
          value={values.phone}
          onChange={handleChange("phone")}
          className={`${inputBase} ${
            errors.phone
              ? "border-[#ef4444] focus:border-[#ef4444]"
              : "border-[#e2e8f0] focus:border-[#513392]"
          }`}
        />
        {errors.phone && (
          <p className="mt-1 text-[12px] text-[#ef4444] font-poppins">
            {errors.phone}
          </p>
        )}
      </div>

      <div className="grid grid-cols-2 gap-2.5 md:gap-4">
        <div>
          <label
            htmlFor="lf-marks"
            className={labelBase}
          >
            +2 Marks (%) <span className="text-[#ef4444]">*</span>
          </label>
          <input
            id="lf-marks"
            type="number"
            inputMode="decimal"
            min={0}
            max={100}
            step="0.01"
            placeholder="e.g. 85"
            value={values.marks}
            onChange={handleChange("marks")}
            className={`${inputBase} ${
              errors.marks
                ? "border-[#ef4444] focus:border-[#ef4444]"
                : "border-[#e2e8f0] focus:border-[#513392]"
            }`}
          />
          {errors.marks && (
            <p className="mt-1 text-[12px] text-[#ef4444] font-poppins">
              {errors.marks}
            </p>
          )}
        </div>

        <div>
          <label
            htmlFor="lf-year"
            className={labelBase}
          >
            Passout Year <span className="text-[#ef4444]">*</span>
          </label>
          <input
            id="lf-year"
            type="number"
            inputMode="numeric"
            min={2000}
            max={new Date().getFullYear() + 2}
            placeholder="e.g. 2026"
            value={values.passoutYear}
            onChange={handleChange("passoutYear")}
            className={`${inputBase} ${
              errors.passoutYear
                ? "border-[#ef4444] focus:border-[#ef4444]"
                : "border-[#e2e8f0] focus:border-[#513392]"
            }`}
          />
          {errors.passoutYear && (
            <p className="mt-1 text-[12px] text-[#ef4444] font-poppins">
              {errors.passoutYear}
            </p>
          )}
        </div>
      </div>

      <button
        type="submit"
        disabled={submitting}
        className="mt-1 md:mt-2 inline-flex items-center justify-center gap-2 rounded-full bg-[#513392] hover:bg-[#3f2672] active:bg-[#3d2569] text-white font-poppins font-medium text-[14px] md:text-[16px] px-6 py-3 md:py-4 transition-all shadow-[0_8px_24px_rgba(81,51,146,0.28)] hover:shadow-[0_12px_32px_rgba(81,51,146,0.38)] hover:-translate-y-0.5 active:translate-y-0 disabled:opacity-70 disabled:cursor-wait"
      >
        {submitting ? (
          <span>Opening WhatsApp…</span>
        ) : (
          <>
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="currentColor"
              aria-hidden="true"
            >
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.077 4.487.71.306 1.263.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.42 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.83 9.83 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.82 11.82 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.88 11.88 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.82 11.82 0 0 0-3.48-8.413" />
            </svg>
            Submit & Chat on WhatsApp
          </>
        )}
      </button>

      <p className="hidden md:block text-center text-[12px] text-[#767e92] font-poppins mt-1">
        Tap submit and continue the conversation on WhatsApp. We'll never spam
        you.
      </p>
    </form>
  );
}
