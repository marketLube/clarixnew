"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";

export default function CourseNotFound() {
  const router = useRouter();

  return (
    <div className="flex flex-col items-center justify-center min-h-[70vh] px-6 py-16 text-center font-poppins">
      <h1 className="text-7xl font-bold text-primary font-poppins">404</h1>
      <h2 className="mt-4 text-2xl font-semibold text-text-headline font-poppins">
        Course Not Found
      </h2>
      <p className="mt-3 max-w-md text-text-sub leading-relaxed">
        The course you are looking for does not exist or may have been removed.
      </p>
      <div className="mt-8 flex items-center gap-4">
        <Link
          href="/courses"
          className="inline-flex items-center justify-center rounded-xl bg-primary px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-primary-hover"
        >
          Browse Courses
        </Link>
        <button
          onClick={() => router.back()}
          className="inline-flex items-center justify-center rounded-xl border border-border px-6 py-3 text-sm font-medium text-text-headline transition-colors hover:bg-secondary-light cursor-pointer"
        >
          Go Back
        </button>
      </div>
    </div>
  );
}
