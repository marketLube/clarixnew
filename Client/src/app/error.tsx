"use client";

import Link from "next/link";

interface ErrorPageProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function ErrorPage({ error, reset }: ErrorPageProps) {
  return (
    <div className="flex flex-col items-center justify-center min-h-[70vh] px-6 py-16 text-center font-poppins">
      <div className="flex items-center justify-center w-16 h-16 rounded-full bg-error-light mb-6">
        <svg
          className="w-8 h-8 text-error"
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
      <h2 className="text-2xl font-semibold text-text-headline font-poppins">
        Something went wrong
      </h2>
      <p className="mt-3 max-w-md text-text-sub leading-relaxed">
        An unexpected error occurred. Please try again or return to the home
        page.
      </p>
      {process.env.NODE_ENV === "development" && error.message && (
        <pre className="mt-4 max-w-lg rounded-lg bg-secondary-light p-4 text-left text-xs text-secondary-dark overflow-auto">
          {error.message}
        </pre>
      )}
      <div className="mt-8 flex items-center gap-4">
        <button
          onClick={reset}
          className="inline-flex items-center justify-center rounded-xl bg-primary px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-primary-hover cursor-pointer"
        >
          Try Again
        </button>
        <Link
          href="/"
          className="inline-flex items-center justify-center rounded-xl border border-border px-6 py-3 text-sm font-medium text-text-headline transition-colors hover:bg-secondary-light"
        >
          Go Home
        </Link>
      </div>
    </div>
  );
}
