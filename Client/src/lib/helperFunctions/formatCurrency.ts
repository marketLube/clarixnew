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
 * Converts a raw fee number into compact Indian format.
 *   1500000  => "15L"
 *   250000   => "2.5L"
 *   30000    => "30K"
 *   800      => "800"
 */
function formatFeeCompact(num: number): string {
  if (num >= 100000) {
    const lakhs = num / 100000;
    return `${lakhs % 1 === 0 ? lakhs.toString() : lakhs.toFixed(1).replace(/\.0$/, "")}L`;
  }
  if (num >= 1000) {
    const thousands = num / 1000;
    return `${thousands % 1 === 0 ? thousands.toString() : thousands.toFixed(1).replace(/\.0$/, "")}K`;
  }
  return num.toString();
}

/**
 * Parses a single fee token into a raw number.
 * Handles:
 *   "2.1L" | "2.1 Lakh" | "15L"  => 210000 | 1500000
 *   "30K"                         => 30000
 *   "1500005"                     => 1500005
 *   "₹2,10,000"                   => 210000
 */
function parseFeeToken(token: string): number {
  const cleaned = token.trim();

  // Match numbers followed by L/Lakh/Lac
  const lakhMatch = cleaned.match(/([\d,.]+)\s*(?:lakh|lac|l)\b/i);
  if (lakhMatch) {
    return parseFloat(lakhMatch[1].replace(/,/g, "")) * 100000;
  }

  // Match numbers followed by Crore/Cr
  const croreMatch = cleaned.match(/([\d,.]+)\s*(?:crore|cr)\b/i);
  if (croreMatch) {
    return parseFloat(croreMatch[1].replace(/,/g, "")) * 10000000;
  }

  // Match numbers followed by K
  const kMatch = cleaned.match(/([\d,.]+)\s*k\b/i);
  if (kMatch) {
    return parseFloat(kMatch[1].replace(/,/g, "")) * 1000;
  }

  // Plain number (possibly with ₹, commas, spaces)
  const numMatch = cleaned.match(/([\d,]+(?:\.\d+)?)/);
  if (numMatch) {
    return parseFloat(numMatch[1].replace(/,/g, ""));
  }

  return NaN;
}

/**
 * Formats a fee range for display on college cards.
 *
 * Accepts many formats from the API:
 *   - Already formatted: "₹2.1L - ₹15L" (re-validated and cleaned)
 *   - Raw range string: "210000 - 1500000"
 *   - Single value: "210000" or "2.1L"
 *   - Number type: 210000
 *   - Object: { min: 210000, max: 1500000 }
 *
 * Always outputs clean compact format like "₹2.1L - ₹15L" or "₹30K".
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function formatFeeRange(value: any, fallback = "N/A"): string {
  if (value === undefined || value === null || value === "") return fallback;

  // Handle object with min/max
  if (typeof value === "object" && value !== null) {
    const min = parseFeeToken(String(value.min ?? ""));
    const max = parseFeeToken(String(value.max ?? ""));
    if (!isNaN(min) && !isNaN(max) && min !== max) {
      return `₹${formatFeeCompact(min)} - ₹${formatFeeCompact(max)}`;
    }
    if (!isNaN(min)) return `₹${formatFeeCompact(min)}`;
    if (!isNaN(max)) return `₹${formatFeeCompact(max)}`;
    return fallback;
  }

  // Handle raw number
  if (typeof value === "number") {
    if (value <= 0 || isNaN(value)) return fallback;
    return `₹${formatFeeCompact(value)}`;
  }

  // Handle string
  if (typeof value === "string") {
    const str = value.trim();
    if (!str) return fallback;

    // Split on range separator (dash/en-dash), but not dashes inside numbers
    // Look for " - " or "–" with optional ₹ after
    const rangeParts = str.split(/\s*[-–]\s*(?=₹|Rs|INR|\d)/i);

    if (rangeParts.length >= 2) {
      const min = parseFeeToken(rangeParts[0]);
      const max = parseFeeToken(rangeParts[rangeParts.length - 1]);
      if (!isNaN(min) && !isNaN(max)) {
        return min === max
          ? `₹${formatFeeCompact(min)}`
          : `₹${formatFeeCompact(min)} - ₹${formatFeeCompact(max)}`;
      }
    }

    // Try as a single value
    const single = parseFeeToken(str);
    if (!isNaN(single) && single > 0) {
      return `₹${formatFeeCompact(single)}`;
    }

    // Return the original string if we can't parse it at all
    return str;
  }

  return fallback;
}
