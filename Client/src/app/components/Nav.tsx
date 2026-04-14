"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import dynamic from "next/dynamic";
import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";
import {
  ChevronDownIcon,
  ChevronRightIcon,
  SearchIcon,
  BellIcon,
  UserIcon,
  GraduationCapIcon,
  OpenBookIcon,
  DocIcon,
  TrophyIcon,
} from "../../components/common/Icons";
import ContentWrapper from "../../components/Ui/ContentWrapper";
import NotificationsDrawer from "@/components/common/NotificationsDrawer";
import AboutPopover from "@/components/common/AboutPopover";
import { useAppSelector } from "@/global/redux/hooks";
import ExplorePopover from "@/components/common/ExplorePopover";
import { useDebounce } from "@/hooks/useDebounce";
import { useGlobalSearch } from "@/hooks/search/useGlobalSearch";
import Loader from "@/components/common/Loader";

const ProfilePopover = dynamic(
  () => import("@/components/common/ProfilePopover"),
  { ssr: false }
);
const navLinks = [
  { href: "/blog", label: "Blog", hasDropdown: false },
  { href: "/about", label: "About", hasDropdown: true },
];

export default function Nav() {
  const pathname = usePathname();
  const router = useRouter();
  const isHomePage = pathname === "/";
  const [drawerOpen, setDrawerOpen] = useState(false);
  const isLoggedIn = useAppSelector((state: any) => state.auth.isLoggedIn);

  // Search state
  const [searchQuery, setSearchQuery] = useState("");
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const debouncedSearchQuery = useDebounce(searchQuery, 300);
  const { results: searchResults, isLoading: isSearchLoading } = useGlobalSearch(debouncedSearchQuery);
  const searchRef = useRef<HTMLFormElement>(null);
  const searchInputRef = useRef<HTMLInputElement>(null);

  // Close search dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setIsSearchOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSearch = (e?: React.FormEvent) => {
    e?.preventDefault();
    if (searchQuery.trim()) {
      setIsSearchOpen(false);
      router.push(`/colleges?search=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  // Prefetch key routes on mount for instant navigation
  useEffect(() => {
    ["/colleges", "/courses", "/exams", "/scholarships", "/jobs-internships", "/blog", "/about"].forEach(
      (route) => router.prefetch(route)
    );
  }, [router]);

  return (
    <header
      className={`${isHomePage
        ? "absolute top-0 left-0 right-0 z-50 bg-linear-to-b from-[#0b0f2f2d]/90 via-[#0b0f2f32]/60 to-transparent"
        : "border-b border-white/10 bg-linear-to-r from-[#0e1a55] via-[#11307c] to-[#0e1a55] backdrop-blur-xl"
        } text-white transition-all duration-300`}
    >
      <ContentWrapper className="flex items-center justify-between gap-4 px-4 sm:px-4 md:px-0 !lg:px-0 !xl:px-0 !mt-0 py-4  ">
        {/* Mobile navigation (Figma-style) */}
        <div className="flex w-full items-center justify-between xl:hidden">
          {/* Hamburger icon */}
          <button
            type="button"
            aria-label="Open navigation menu"
            className="flex flex-col justify-center gap-[4px]"
          >
            <span className="block h-[2px] w-6 rounded-full bg-white" />
            <span className="block h-[2px] w-6 rounded-full bg-white" />
            <span className="block h-[2px] w-6 rounded-full bg-white" />
          </button>

          {/* Center logo */}
          <Link href="/" className="flex items-center">
            <Image
              src="/clarixlogo.svg"
              alt="Clarix Education"
              width={120}
              height={40}
              className="h-auto"
            />
          </Link>

          {/* Right icons: search + notifications */}
          <div className="flex items-center gap-4">
            <button
              type="button"
              aria-label="Search"
              className="flex items-center justify-center"
            >
              <SearchIcon
                width={24}
                height={24}
                fill="white"
                aria-hidden="true"
              />
            </button>
            <button
              type="button"
              onClick={() => setDrawerOpen(true)}
              className="relative flex items-center justify-center"
              aria-label="Notifications"
            >
              <BellIcon
                width={22}
                height={24}
                fill="white"
                aria-hidden="true"
              />
              <span className="absolute right-0 top-0 h-2 w-2 rounded-full bg-red-500" />
            </button>
          </div>
        </div>

        {/* Desktop / tablet navigation */}
        <div className="hidden w-full items-center justify-between gap-4 xl:flex ">
          {/* Left section: logo + Explore */}
          <div className="flex items-center gap-8">
            <Link href="/" className="flex items-center">
              <Image
                src="/clarixlogo.svg"
                alt="Clarix Education"
                width={130}
                height={50}
                className="h-auto"
              />
            </Link>
            <ExplorePopover>
              <button className="hidden md:inline-flex items-center gap-1 rounded-[999px] px-4 py-2 text-sm font-medium text-white/90 hover:text-white transition-colors cursor-pointer">
                <span className="font-poppins tracking-[-0.02em]">
                  Explore
                </span>
                <ChevronDownIcon
                  width={18}
                  height={18}
                  fill="white"
                  aria-hidden="true"
                />
              </button>
            </ExplorePopover>
          </div>

          {/* Center section: search input with dropdown */}
          <form
            ref={searchRef}
            onSubmit={handleSearch}
            role="search"
            className="hidden lg:flex flex-col min-w-[420px] max-w-[650px] flex-1 relative z-50"
          >
            <div
              className={`flex items-center gap-3 px-5 py-2 w-full rounded-full border transition-colors ${
                isSearchOpen
                  ? "bg-white border-white shadow-[0px_8px_32px_rgba(0,0,0,0.12)]"
                  : "bg-white/10 border-white/60 shadow-[0px_6px_24px_rgba(0,0,0,0.25)]"
              }`}
              style={{ backdropFilter: "blur(16px)" }}
            >
              <SearchIcon
                width={24}
                height={24}
                fill={isSearchOpen ? "#6B7280" : "white"}
                aria-hidden="true"
              />
              <input
                ref={searchInputRef}
                type="text"
                name="q"
                value={searchQuery}
                onFocus={() => setIsSearchOpen(true)}
                onChange={(e) => setSearchQuery(e.target.value)}
                className={`w-full bg-transparent text-sm leading-5 focus:outline-none ${
                  isSearchOpen
                    ? "text-gray-900 placeholder:text-gray-400"
                    : "text-white placeholder:text-white/70"
                }`}
                placeholder="Search colleges, courses, exams, or scholarships…"
                aria-label="Search colleges, courses, exams, or scholarships"
              />
              {isSearchOpen && searchQuery && (
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    setSearchQuery("");
                    searchInputRef.current?.focus();
                  }}
                  className="p-1 text-gray-400 hover:text-gray-600 transition-colors"
                >
                  <X size={18} />
                </button>
              )}
            </div>

            <AnimatePresence>
              {isSearchOpen && (
                <motion.div
                  initial={{ opacity: 0, y: -8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.15 }}
                  className="absolute top-full left-0 right-0 mt-2 bg-white rounded-2xl shadow-[0px_8px_32px_rgba(0,0,0,0.12)] border border-gray-100 max-h-[60vh] overflow-y-auto z-[9999]"
                >
                  <div className="px-5 pt-4 pb-5 flex flex-col gap-4">
                    {debouncedSearchQuery ? (
                      isSearchLoading ? (
                        <Loader containerClassName="py-6" size={28} />
                      ) : (
                        <div className="flex flex-col gap-4">
                          {searchResults.colleges?.length > 0 && (
                            <div>
                              <h3 className="text-[#737C91] text-[12px] font-medium font-poppins mb-2 uppercase tracking-wider">
                                Colleges
                              </h3>
                              <div className="flex flex-col gap-1">
                                {searchResults.colleges.map((college: any) => (
                                  <Link
                                    key={college._id}
                                    href={`/colleges/${college._id}`}
                                    onClick={() => setIsSearchOpen(false)}
                                    className="flex items-center gap-3 group hover:bg-gray-50 p-2 rounded-lg transition-colors"
                                  >
                                    <div className="w-7 h-7 relative rounded-full overflow-hidden bg-gray-100 flex-shrink-0">
                                      {college.logo ? (
                                        <Image
                                          src={college.logo}
                                          alt={college.name}
                                          fill
                                          className="object-cover"
                                        />
                                      ) : (
                                        <GraduationCapIcon
                                          width={14}
                                          height={14}
                                          className="text-gray-400 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
                                        />
                                      )}
                                    </div>
                                    <div className="min-w-0">
                                      <p className="text-[#162447] text-[13px] font-medium group-hover:text-[#513392] transition-colors line-clamp-1">
                                        {college.name}
                                      </p>
                                      <p className="text-gray-500 text-[11px] line-clamp-1">
                                        {college.city}, {college.state}
                                      </p>
                                    </div>
                                  </Link>
                                ))}
                              </div>
                            </div>
                          )}

                          {searchResults.courses?.length > 0 && (
                            <div>
                              <h3 className="text-[#737C91] text-[12px] font-medium font-poppins mb-2 uppercase tracking-wider">
                                Courses
                              </h3>
                              <div className="flex flex-col gap-1">
                                {searchResults.courses.map((course: any) => (
                                  <Link
                                    key={course._id}
                                    href={`/courses/${course._id}`}
                                    onClick={() => setIsSearchOpen(false)}
                                    className="flex items-center gap-3 group hover:bg-gray-50 p-2 rounded-lg transition-colors"
                                  >
                                    <div className="w-7 h-7 rounded-full bg-blue-50 flex items-center justify-center flex-shrink-0">
                                      <OpenBookIcon width={14} height={14} className="text-blue-600" />
                                    </div>
                                    <div className="min-w-0">
                                      <p className="text-[#162447] text-[13px] font-medium group-hover:text-[#513392] transition-colors line-clamp-1">
                                        {course.name}
                                      </p>
                                      <p className="text-gray-500 text-[11px] line-clamp-1">
                                        {course.duration} • {course.type}
                                      </p>
                                    </div>
                                  </Link>
                                ))}
                              </div>
                            </div>
                          )}

                          {searchResults.exams?.length > 0 && (
                            <div>
                              <h3 className="text-[#737C91] text-[12px] font-medium font-poppins mb-2 uppercase tracking-wider">
                                Exams
                              </h3>
                              <div className="flex flex-col gap-1">
                                {searchResults.exams.map((exam: any) => (
                                  <Link
                                    key={exam._id}
                                    href={`/exams/${exam._id}`}
                                    onClick={() => setIsSearchOpen(false)}
                                    className="flex items-center gap-3 group hover:bg-gray-50 p-2 rounded-lg transition-colors"
                                  >
                                    <div className="w-7 h-7 relative rounded-full overflow-hidden bg-gray-100 flex-shrink-0">
                                      {exam.logo ? (
                                        <Image
                                          src={exam.logo}
                                          alt={exam.shortName}
                                          fill
                                          className="object-cover"
                                        />
                                      ) : (
                                        <DocIcon
                                          width={14}
                                          height={14}
                                          className="text-gray-400 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
                                        />
                                      )}
                                    </div>
                                    <div className="min-w-0">
                                      <p className="text-[#162447] text-[13px] font-medium group-hover:text-[#513392] transition-colors line-clamp-1">
                                        {exam.fullName} ({exam.shortName})
                                      </p>
                                      <p className="text-gray-500 text-[11px] line-clamp-1">
                                        {new Date(exam.examDate).toLocaleDateString()}
                                      </p>
                                    </div>
                                  </Link>
                                ))}
                              </div>
                            </div>
                          )}

                          {searchResults.jobs?.length > 0 && (
                            <div>
                              <h3 className="text-[#737C91] text-[12px] font-medium font-poppins mb-2 uppercase tracking-wider">
                                Jobs
                              </h3>
                              <div className="flex flex-col gap-1">
                                {searchResults.jobs.map((job: any) => (
                                  <Link
                                    key={job._id}
                                    href={`/jobs-internships/${job._id}`}
                                    onClick={() => setIsSearchOpen(false)}
                                    className="flex items-center gap-3 group hover:bg-gray-50 p-2 rounded-lg transition-colors"
                                  >
                                    <div className="w-7 h-7 rounded-full bg-purple-50 flex items-center justify-center flex-shrink-0">
                                      <TrophyIcon width={14} height={14} className="text-purple-600" />
                                    </div>
                                    <div className="min-w-0">
                                      <p className="text-[#162447] text-[13px] font-medium group-hover:text-[#513392] transition-colors line-clamp-1">
                                        {job.jobTitle}
                                      </p>
                                      <p className="text-gray-500 text-[11px] line-clamp-1">
                                        {job.companyName} • {job.location}
                                      </p>
                                    </div>
                                  </Link>
                                ))}
                              </div>
                            </div>
                          )}

                          {!searchResults.colleges?.length &&
                            !searchResults.courses?.length &&
                            !searchResults.exams?.length &&
                            !searchResults.jobs?.length && (
                              <div className="text-center py-6 text-gray-500 text-sm">
                                No results found for &ldquo;{searchQuery}&rdquo;
                              </div>
                            )}

                          {/* View all results link */}
                          <button
                            type="submit"
                            className="text-center text-[#513392] text-[13px] font-medium font-poppins py-2 hover:underline cursor-pointer"
                          >
                            View all results for &ldquo;{searchQuery}&rdquo;
                          </button>
                        </div>
                      )
                    ) : (
                      <p className="text-gray-400 text-[13px] font-poppins py-4 text-center">
                        Start typing to search colleges, courses, exams, or scholarships…
                      </p>
                    )}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </form>

          {/* Right section: links + profile + cta */}
          <div className="flex items-center gap-4">
            <nav className="hidden lg:flex items-center gap-4 font-poppins">
              {navLinks.map((link) => {
                const isActive =
                  pathname === link.href ||
                  pathname?.startsWith(link.href + "/");

                const linkContent = (
                  <span
                    className={`relative inline-flex items-center gap-1 px-2 py-1 text-sm font-medium tracking-[-0.02em] transition-colors ${isActive ? "text-white" : "text-white/80 hover:text-white"
                      }`}
                  >
                    {link.label}
                    {link.hasDropdown && (
                      <ChevronDownIcon
                        width={18}
                        height={18}
                        fill="white"
                        aria-hidden="true"
                      />
                    )}
                  </span>
                );

                if (link.hasDropdown) {
                  return (
                    <AboutPopover key={link.href}>
                      <Link href={link.href} className="cursor-pointer" aria-current={isActive ? "page" : undefined}>
                        {linkContent}
                      </Link>
                    </AboutPopover>
                  );
                }

                return (
                  <Link key={link.href} href={link.href} aria-current={isActive ? "page" : undefined}>
                    {linkContent}
                  </Link>
                );
              })}
            </nav>

            {/* profile / notification icon */}
            <button
              type="button"
              onClick={() => setDrawerOpen(true)}
              className="hidden sm:flex relative items-center justify-center p-[8px] cursor-pointer"
              aria-label="Notifications"
            >
              <BellIcon
                width={20}
                height={22}
                fill="white"
                aria-hidden="true"
              />
              <span className="absolute right-1 top-1 h-2 w-2 rounded-full bg-red-500" />
            </button>

            {!isLoggedIn ? (
              <Link
                href="/login"
                className="hidden text-sm font-medium text-white/90 transition-colors hover:text-white sm:inline"
              >
                Login
              </Link>
            ) : (
              <ProfilePopover>
                <button
                  type="button"
                  className="backdrop-blur-[8.75px] backdrop-filter bg-[rgba(255,255,255,0.2)] border border-[rgba(255,255,255,0.5)] border-solid flex items-center gap-1 px-[1rem] py-[6px] rounded-[50px] cursor-pointer transition-colors hover:bg-[rgba(255,255,255,0.25)]"
                  aria-label="Profile menu"
                >
                  <UserIcon
                    width={20}
                    height={20}
                    fill="white"
                    className="shrink-0"
                    aria-hidden="true"
                  />
                  <ChevronDownIcon
                    width={18}
                    height={18}
                    fill="white"
                    className="shrink-0"
                    aria-hidden="true"
                  />
                </button>
              </ProfilePopover>
            )}

            <Link
              href="/signup"
              className="inline-flex items-center gap-3 rounded-[40px] border-2 border-[rgba(255,255,255,0.23)] bg-white px-[2px] py-[2px] pl-[10px] text-sm font-medium text-[#513392] shadow-[0_2px_1px_rgba(255,255,255,0.2)] transition hover:bg-gray-100"
            >
              <span className="font-['Poppins',system-ui,sans-serif] leading-5">
                Start Free
              </span>
              <span className="inline-flex items-center justify-center rounded-full bg-[#513392] p-1.5 border border-white">
                <ChevronRightIcon width={18} height={18} fill="#ffffff" />
              </span>
            </Link>
          </div>
        </div>
      </ContentWrapper>

      {/* Notifications Drawer */}
      <NotificationsDrawer
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
      />
    </header>
  );
}
