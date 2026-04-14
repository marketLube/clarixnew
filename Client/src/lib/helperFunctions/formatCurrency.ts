/**
 * Formats a numeric salary/fee value into a human-readable Indian format.
 *
 * Examples:
 *   formatSalaryLPA(700000)   => "7 LPA"
 *   formatSalaryLPA(1250000)  => "12.5 LPA"
 *   formatSalaryLPA("8.5")   => "8.5 LPA"  (already formatted)
 *   formatSalaryLPA("₹8.5 LPA") => "₹8.5 LPA" (pass-through)
 *   formatSalaryLPA(undefined) => "N/A"
 */
export function formatSalaryLPA(value: string | number | undefined | null, fallback = "N/A"): string {
  if (value === undefined || value === null || value === "") return fallback;

  // If it's already a formatted string (contains "LPA", "lpa", "Lakh", etc.), return as-is
  if (typeof value === "string") {
    const lower = value.toLowerCase();
    if (lower.includes("lpa") || lower.includes("lakh") || lower.includes("cr")) {
      return value;
    }
    // Try parsing it as a number
    const parsed = parseFloat(value.replace(/[^0-9.]/g, ""));
    if (isNaN(parsed)) return value; // Return the original string if can't parse
    value = parsed;
  }

  if (typeof value === "number") {
    if (value === 0) return fallback;
    // If the value looks like it's already in LPA (small numbers like 8.5, 12, etc.)
    if (value < 200) {
      return `${value} LPA`;
    }
    // Convert from raw amount to LPA (1 LPA = 100,000)
    const lpa = value / 100000;
    // Format cleanly: remove trailing zeros
    const formatted = lpa % 1 === 0 ? lpa.toString() : lpa.toFixed(1).replace(/\.0$/, "");
    return `${formatted} LPA`;
  }

  return fallback;
}

/**
 * Formats a fee value with Indian Rupee symbol and locale formatting.
 *
 * Examples:
 *   formatFeeINR(350000)    => "₹3,50,000"
 *   formatFeeINR("₹3,50,000") => "₹3,50,000" (pass-through)
 *   formatFeeINR(undefined) => "N/A"
 */
export function formatFeeINR(value: string | number | undefined | null, fallback = "N/A"): string {
  if (value === undefined || value === null || value === "") return fallback;

  if (typeof value === "string") {
    // If already formatted with currency symbol, return as-is
    if (value.includes("₹") || value.includes("Rs") || value.includes("INR")) {
      return value;
    }
    const parsed = parseFloat(value.replace(/[^0-9.]/g, ""));
    if (isNaN(parsed)) return value;
    value = parsed;
  }

  if (typeof value === "number") {
    if (value === 0) return fallback;
    return `₹${value.toLocaleString("en-IN")}`;
  }

  return fallback;
}

/**
 * Formats a fee range string. Handles cases like "100000-500000" or already-formatted strings.
 */
export function formatFeeRange(value: string | undefined | null, fallback = "N/A"): string {
  if (!value) return fallback;

  // If already formatted
  if (value.includes("₹") || value.includes("Lakh") || value.includes("K")) {
    return value;
  }

  // Try to parse a range like "100000 - 500000" or "100000-500000"
  const parts = value.split(/[-–]/);
  if (parts.length === 2) {
    const min = parseFloat(parts[0].trim().replace(/[^0-9.]/g, ""));
    const max = parseFloat(parts[1].trim().replace(/[^0-9.]/g, ""));
    if (!isNaN(min) && !isNaN(max)) {
      return `₹${min.toLocaleString("en-IN")} - ₹${max.toLocaleString("en-IN")}`;
    }
  }

  // Try single value
  const parsed = parseFloat(value.replace(/[^0-9.]/g, ""));
  if (!isNaN(parsed) && parsed > 0) {
    return `₹${parsed.toLocaleString("en-IN")}`;
  }

  return value;
}
