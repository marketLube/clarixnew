"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";

export default function JobNotFound() {
  const router = useRouter();

  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] sm:min-h-[65vh] md:min-h-[70vh] px-4 sm:px-6 py-10 sm:py-14 md:py-16 text-center font-poppins">
      <h1 className="text-[56px] sm:text-[64px] md:text-[80px] leading-none font-bold text-primary font-poppins">
        404
      </h1>
      <h2 className="mt-3 sm:mt-4 text-[18px] sm:text-[20px] md:text-[24px] font-semibold text-text-headline font-poppins">
        Job Not Found
      </h2>
      <p className="mt-2 sm:mt-3 max-w-md text-[13px] md:text-[14px] text-text-sub leading-relaxed">
        The job or internship you are looking for does not exist or may have been
        removed.
      </p>
      <div className="mt-6 sm:mt-8 flex flex-wrap items-center justify-center gap-3 sm:gap-4">
        <Link
          href="/jobs-internships"
          className="inline-flex items-center justify-center rounded-xl bg-primary px-5 sm:px-6 py-2.5 sm:py-3 text-[13px] sm:text-sm font-medium text-white transition-colors hover:bg-primary-hover"
        >
          Browse Jobs
        </Link>
        <button
          onClick={() => router.back()}
          className="inline-flex items-center justify-center rounded-xl border border-border px-5 sm:px-6 py-2.5 sm:py-3 text-[13px] sm:text-sm font-medium text-text-headline transition-colors hover:bg-secondary-light cursor-pointer"
        >
          Go Back
        </button>
      </div>
    </div>
  );
}
