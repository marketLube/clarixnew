"use client";

import Link from "next/link";

interface ErrorPageProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function ErrorPage({ error, reset }: ErrorPageProps) {
  return (
    <div className="flex items-center justify-center min-h-[60vh] sm:min-h-[65vh] md:min-h-[70vh] px-4 py-10 sm:py-12 md:py-14 lg:py-16 font-poppins">
      <div className="w-full max-w-lg text-center">
        {/* Icon */}
        <div className="mx-auto flex items-center justify-center w-14 h-14 md:w-16 md:h-16 rounded-full bg-red-50 mb-4 md:mb-5">
          <svg
            className="w-8 h-8 text-red-500"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126ZM12 15.75h.007v.008H12v-.008Z"
            />
          </svg>
        </div>

        {/* Heading */}
        <h2 className="text-2xl font-semibold text-[#162447] mb-3">
          Something went wrong
        </h2>

        {/* Description */}
        <p className="text-[#767e92] text-base leading-relaxed mb-6">
          An unexpected error occurred. Please try again or return to the home page.
        </p>

        {/* Dev error details */}
        {process.env.NODE_ENV === "development" && error.message && (
          <div className="mb-6 mx-auto max-w-md rounded-xl bg-red-50 border border-red-100 p-4 text-left">
            <p className="text-xs font-medium text-red-700 mb-1">Error details</p>
            <p className="text-xs text-red-600 break-words whitespace-pre-wrap">
              {error.message}
            </p>
          </div>
        )}

        {/* Actions */}
        <div className="flex items-center justify-center gap-3">
          <button
            onClick={reset}
            className="inline-flex items-center justify-center rounded-full bg-[#513392] px-6 py-2.5 text-sm font-medium text-white transition-colors hover:bg-[#412876] cursor-pointer"
          >
            Try Again
          </button>
          <Link
            href="/"
            className="inline-flex items-center justify-center rounded-full border border-[#e0e4f0] px-6 py-2.5 text-sm font-medium text-[#162447] transition-colors hover:bg-[#f6f7ff]"
          >
            Go Home
          </Link>
        </div>
      </div>
    </div>
  );
}
