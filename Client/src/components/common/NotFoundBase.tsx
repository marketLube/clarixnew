"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import type { ReactNode } from "react";

interface NotFoundBaseProps {
  /** Big number shown at the top. Defaults to "404". */
  code?: string;
  /** Secondary heading, e.g. "Page Not Found", "College Not Found". */
  heading: string;
  /** Body copy explaining what's missing. */
  description: ReactNode;
  /** Primary CTA label. */
  primaryLabel: string;
  /** Primary CTA href. */
  primaryHref: string;
  /** Secondary CTA label. Defaults to "Go Back". */
  secondaryLabel?: string;
}

/**
 * Standardised 404 / not-found layout used by every `/[x]/not-found.tsx`
 * and the root `app/not-found.tsx`. Uses a centered wrapper pattern
 * (outer flex centers the inner block; inner block is a plain block
 * with max-width) so long text always wraps as natural paragraphs
 * instead of collapsing to min-content width under flex items-center.
 */
export default function NotFoundBase({
  code = "404",
  heading,
  description,
  primaryLabel,
  primaryHref,
  secondaryLabel = "Go Back",
}: NotFoundBaseProps) {
  const router = useRouter();

  return (
    <div className="min-h-[60vh] sm:min-h-[65vh] md:min-h-[70vh] w-full flex items-center justify-center px-4 py-10 sm:py-14 md:py-16 font-poppins">
      <div className="w-full max-w-[480px] mx-auto text-center">
        <h1 className="text-[56px] sm:text-[72px] md:text-[88px] leading-none font-bold text-primary">
          {code}
        </h1>

        <h2 className="mt-3 sm:mt-4 text-[18px] sm:text-[20px] md:text-[24px] font-semibold text-text-headline">
          {heading}
        </h2>

        <p className="mt-2 sm:mt-3 text-[13px] md:text-[14px] text-text-sub leading-relaxed">
          {description}
        </p>

        <div className="mt-6 sm:mt-8 flex flex-wrap items-center justify-center gap-3 sm:gap-4">
          <Link
            href={primaryHref}
            className="inline-flex items-center justify-center rounded-xl bg-primary px-5 sm:px-6 py-2.5 sm:py-3 text-[13px] sm:text-sm font-medium text-white transition-colors hover:bg-primary-hover"
          >
            {primaryLabel}
          </Link>
          <button
            type="button"
            onClick={() => router.back()}
            className="inline-flex items-center justify-center rounded-xl border border-border px-5 sm:px-6 py-2.5 sm:py-3 text-[13px] sm:text-sm font-medium text-text-headline transition-colors hover:bg-secondary-light cursor-pointer"
          >
            {secondaryLabel}
          </button>
        </div>
      </div>
    </div>
  );
}
