"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import dynamic from "next/dynamic";
import {
  ChevronDownIcon,
  SearchIcon,
  BellIcon,
  ChevronRightIcon,
  UserIcon,
  GraduationCapIcon,
  OpenBookIcon,
  DocIcon,
  TrophyIcon,
  BranchIcon,
  ReviewsIcon,
} from "@/components/common/Icons";
import ContentWrapper from "@/components/Ui/ContentWrapper";
import ExplorePopover from "@/components/common/ExplorePopover";
import AboutPopover from "@/components/common/AboutPopover";
import ScholarshipsPopover from "@/components/common/ScholarshipsPopover";
import NotificationsDrawer from "@/components/common/NotificationsDrawer";
import { useAppSelector } from "@/global/redux/hooks";
import { Edit, Edit2, Flame, X } from "lucide-react";
import { useCmsHomepage } from "@/hooks/cms/useCmsHomepage";
import { Drawer } from "antd";
import { useDebounce } from "@/hooks/useDebounce";
import { useGlobalSearch } from "@/hooks/search/useGlobalSearch";
import Loader from "@/components/common/Loader";

const ProfilePopover = dynamic(
  () => import("@/components/common/ProfilePopover"),
  { ssr: false }
);



export default function Hero() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");
  const debouncedSearchQuery = useDebounce(searchQuery, 300);
  const { results: searchResults, isLoading } = useGlobalSearch(debouncedSearchQuery);
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
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
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const isLoggedIn = useAppSelector((state: any) => state.auth.isLoggedIn);
  const { hero, heroImages, isLoading: isCmsLoading } = useCmsHomepage();
  const backgroundImages = heroImages || [];

  const popularSearches = hero?.popularSearches || [];

  const isHeroEnabled = hero?.enabled ?? true;
  const badgeText = hero?.subHeadline?.trim() || "";
  const heroHeading = hero?.headline?.trim() || "";
  const primaryCtaText = hero?.PrimaryCtaText?.trim() || "";
  const primaryCtaLink = hero?.PrimaryCtaLink?.trim() || "";

  const [currentBg, setCurrentBg] = useState(0);

  useEffect(() => {
    if (currentBg >= backgroundImages.length) {
      setCurrentBg(0);
    }
  }, [backgroundImages.length, currentBg]);

  useEffect(() => {
    if (backgroundImages.length <= 1) return;
    const timer = setInterval(() => {
      setCurrentBg((prev) => (prev + 1) % backgroundImages.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [backgroundImages.length]);

  const handleSearch = (e?: React.FormEvent) => {
    e?.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/colleges?search=${encodeURIComponent(searchQuery)}`);
    }
  };

  const tabs = [
    { name: "Colleges", icon: GraduationCapIcon, href: "/colleges" },
    { name: "Courses", icon: OpenBookIcon, href: "/courses" },
    { name: "Exams", icon: DocIcon, href: "/exams" },
    { name: "Scholarships", icon: TrophyIcon, href: "/scholarships" },
    { name: "Compare", icon: BranchIcon, href: "/colleges/compare" },
    { name: "Reviews", icon: Edit2, href: "/review" },
  ];

  return (
    <section className="hero-compact-landscape relative w-full min-h-[480px] sm:min-h-[560px] md:min-h-[600px] lg:h-[640px] overflow-hidden flex flex-col">
      {/* Background Carousel with Overlay */}
      <div className="absolute inset-0 z-0">
        {backgroundImages.map((src, idx) => (
          <div
            key={`${src}-${idx}`}
            className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${idx === currentBg ? "opacity-100" : "opacity-0"
              }`}
          >
            <Image
              src={src}
              alt={`University Campus ${idx + 1}`}
              fill
              priority={idx === 0}
              className="object-cover transition-transform duration-[10000ms] ease-linear scale-110"
              style={{
                transform: idx === currentBg ? "scale(1)" : "scale(1.1)",
              }}
            />
          </div>
        ))}
        <div
          className="absolute inset-0 z-10"
          style={{
            background: "linear-gradient(180deg, rgba(16, 12, 42, 0.40) 0%, rgba(16, 12, 42, 0.20) 100%)"
          }}
        />
      </div>

      <div className="relative z-20 w-full h-full flex flex-col px-4 sm:px-6 md:px-0 !mt-0 max-w-[1550px] mx-auto">
        {/* Mobile Header */}
        <div className={`flex w-full items-center justify-between py-5 xl:hidden transition-opacity duration-300 ${isSearchOpen ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}>
          {/* Hamburger Menu (Left) */}
          <button
            type="button"
            className="flex flex-col justify-center gap-[5px] w-10 h-10 items-start p-1"
            onClick={() => setIsMobileMenuOpen(true)}
          >
            <span className="block h-[2px] w-6 rounded-full bg-white" />
            <span className="block h-[2px] w-6 rounded-full bg-white" />
            <span className="block h-[2px] w-6 rounded-full bg-white" />
          </button>

          {/* Logo (Center) */}
          <Link href="/" className="absolute left-1/2 -translate-x-1/2 flex items-center">
            <Image
              src="/clarixlogo.svg"
              alt="Clarix Education"
              width={110}
              height={42}
              className="h-auto"
            />
          </Link>

          {/* Right Icons (Search & notification) */}
          <div className="flex items-center gap-4">
            <button
              type="button"
              className="p-1 cursor-pointer relative z-30"
              aria-label="Search"
              onMouseDown={(e) => e.stopPropagation()}
              onClick={(e) => {
                e.preventDefault();
                setIsSearchOpen(true);
                setTimeout(() => searchInputRef.current?.focus(), 100);
              }}
            >
              <SearchIcon
                width={20}
                height={20}
                fill="white"
                aria-hidden="true"
              />
            </button>
            <button
              type="button"
              onClick={() => setIsNotificationsOpen(true)}
              className="relative p-1"
              aria-label="Notifications"
            >
              <BellIcon width={22} height={22} fill="white" />
              <span className="absolute top-1 right-1 w-2 h-2 bg-[#E11D48] rounded-full border border-white/20" />
            </button>
          </div>
        </div>

        {/* Global Search Bar - Responsive */}
        <motion.form
          ref={searchRef}
          onSubmit={handleSearch}
          layout
          initial={false}
          animate={isSearchOpen ? "open" : "closed"}
          className={`${isSearchOpen ? "flex px-4 box-border" : "hidden xl:flex"} flex-col absolute top-3 xl:top-6 left-1/2 -translate-x-1/2 w-[calc(100%-24px)] xl:w-[45%] max-w-[650px] z-50 overflow-hidden`}
          variants={{
            open: {
              backgroundColor: "#ffffff",
              borderRadius: "24px",
              borderColor: "rgba(255, 255, 255, 0)",
              boxShadow: "0px 8px 32px rgba(0,0,0,0.12)",
              borderWidth: "1px",
              borderStyle: "solid",
            },
            closed: {
              backgroundColor: "rgba(255, 255, 255, 0.12)",
              borderRadius: "100px",
              borderColor: "rgba(255, 255, 255, 0.2)",
              boxShadow: "0px 4px 24px rgba(0,0,0,0.15)",
              borderWidth: "1px",
              borderStyle: "solid",
            }
          }}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
          style={{ backdropFilter: "blur(5px)" }}
        >
          <motion.div layout="position" className={`flex items-center gap-3 px-5 h-11 w-full ${isSearchOpen ? 'border-b border-gray-100' : ''}`}>
            <SearchIcon
              width={18}
              height={18}
              fill={isSearchOpen ? "#6B7280" : "white"}
              aria-hidden="true"
            />
            <input
              type="text"
              ref={searchInputRef}
              value={searchQuery}
              onFocus={() => setIsSearchOpen(true)}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search colleges, courses, exams, or scholarships.."
              className={`flex-1 bg-transparent text-[14px] font-poppins focus:outline-none ${isSearchOpen ? 'text-gray-900 placeholder:text-gray-400' : 'text-white placeholder:text-white/80'}`}
            />
            {isSearchOpen && (
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  setIsSearchOpen(false);
                  setSearchQuery("");
                }}
                className="p-1 text-gray-400 hover:text-gray-600 xl:hidden"
              >
                <X size={18} />
              </button>
            )}
          </motion.div>

          <AnimatePresence>
            {isSearchOpen && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.2 }}
                className="px-5 md:px-10 overflow-hidden max-h-[60vh] max-h-[60dvh] overflow-y-auto"
              >
                <div className="pt-8 pb-10 flex flex-col gap-5">
                  {debouncedSearchQuery ? (
                    isLoading ? (
                      <Loader containerClassName="py-8" size={32} />
                    ) : (
                      <div className="flex flex-col gap-6">
                        {searchResults.colleges?.length > 0 && (
                          <div>
                            <h3 className="text-[#737C91] text-[14px] font-medium font-poppins mb-3 uppercase tracking-wider">
                              Colleges
                            </h3>
                            <div className="flex flex-col gap-3">
                              {searchResults.colleges.map((college: any) => (
                                <Link
                                  key={college._id}
                                  href={`/colleges/${college._id}`}
                                  className="flex items-center gap-3 group hover:bg-gray-50 p-2 rounded-lg transition-colors"
                                >
                                  <div className="w-8 h-8 relative rounded-full overflow-hidden bg-gray-100 flex-shrink-0">
                                    {college.logo ? (
                                      <Image
                                        src={college.logo}
                                        alt={college.name}
                                        fill
                                        className="object-cover"
                                      />
                                    ) : (
                                      <GraduationCapIcon width={16} height={16} className="text-gray-400 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
                                    )}
                                  </div>
                                  <div>
                                    <p className="text-[#162447] text-[14px] font-medium group-hover:text-[#513392] transition-colors line-clamp-1">
                                      {college.name}
                                    </p>
                                    <p className="text-gray-500 text-[12px] line-clamp-1">
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
                            <h3 className="text-[#737C91] text-[14px] font-medium font-poppins mb-3 uppercase tracking-wider">
                              Courses
                            </h3>
                            <div className="flex flex-col gap-3">
                              {searchResults.courses.map((course: any) => (
                                <Link
                                  key={course._id}
                                  href={`/courses/${course._id}`}
                                  className="flex items-center gap-3 group hover:bg-gray-50 p-2 rounded-lg transition-colors"
                                >
                                  <div className="w-8 h-8 rounded-full bg-blue-50 flex items-center justify-center flex-shrink-0">
                                    <OpenBookIcon width={16} height={16} className="text-blue-600" />
                                  </div>
                                  <div>
                                    <p className="text-[#162447] text-[14px] font-medium group-hover:text-[#513392] transition-colors line-clamp-1">
                                      {course.name}
                                    </p>
                                    <p className="text-gray-500 text-[12px] line-clamp-1">
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
                            <h3 className="text-[#737C91] text-[14px] font-medium font-poppins mb-3 uppercase tracking-wider">
                              Exams
                            </h3>
                            <div className="flex flex-col gap-3">
                              {searchResults.exams.map((exam: any) => (
                                <Link
                                  key={exam._id}
                                  href={`/exams/${exam._id}`}
                                  className="flex items-center gap-3 group hover:bg-gray-50 p-2 rounded-lg transition-colors"
                                >
                                  <div className="w-8 h-8 relative rounded-full overflow-hidden bg-gray-100 flex-shrink-0">
                                    {exam.logo ? (
                                      <Image
                                        src={exam.logo}
                                        alt={exam.shortName}
                                        fill
                                        className="object-cover"
                                      />
                                    ) : (
                                      <DocIcon width={16} height={16} className="text-gray-400 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
                                    )}
                                  </div>
                                  <div>
                                    <p className="text-[#162447] text-[14px] font-medium group-hover:text-[#513392] transition-colors line-clamp-1">
                                      {exam.fullName} ({exam.shortName})
                                    </p>
                                    <p className="text-gray-500 text-[12px] line-clamp-1">
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
                            <h3 className="text-[#737C91] text-[14px] font-medium font-poppins mb-3 uppercase tracking-wider">
                              Jobs
                            </h3>
                            <div className="flex flex-col gap-3">
                              {searchResults.jobs.map((job: any) => (
                                <Link
                                  key={job._id}
                                  href={`/jobs-internships/${job._id}`}
                                  className="flex items-center gap-3 group hover:bg-gray-50 p-2 rounded-lg transition-colors"
                                >
                                  <div className="w-8 h-8 rounded-full bg-purple-50 flex items-center justify-center flex-shrink-0">
                                    <TrophyIcon width={16} height={16} className="text-purple-600" />
                                  </div>
                                  <div>
                                    <p className="text-[#162447] text-[14px] font-medium group-hover:text-[#513392] transition-colors line-clamp-1">
                                      {job.jobTitle}
                                    </p>
                                    <p className="text-gray-500 text-[12px] line-clamp-1">
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
                            <div className="text-center py-8 text-gray-500 text-sm">
                              No results found for "{searchQuery}"
                            </div>
                          )}
                      </div>
                    )
                  ) : (
                    <div>
                      <h3 className="text-[#737C91] text-[16px] font-normal font-poppins mb-5">
                        Popular Searches
                      </h3>
                      <div className="flex flex-col gap-5">
                        {popularSearches.map((term, index) => (
                          <button
                            key={index}
                            type="button"
                            onClick={() => setSearchQuery(term)}
                            className="flex items-center gap-3 text-left group transition-colors"
                          >
                            <Flame className="w-4 h-4 text-[#162447]" strokeWidth={1.5} />
                            <span className="text-[#162447] text-[14px] font-poppins font-normal group-hover:text-[#513392] transition-colors">
                              {term}
                            </span>
                          </button>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.form>

        {/* Desktop Header */}
        <header className="hidden xl:flex w-full items-center justify-between py-6 gap-4">
          {/* Logo & Explore */}
          <div className="flex items-center gap-8 xl:gap-12 shrink-0">
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
              <button className="hidden sm:flex items-center gap-2 px-3 py-2 text-white/90 hover:text-white transition-colors cursor-pointer group/explore">
                <span className="font-poppins text-[16px] font-medium tracking-[-0.32px]">Explore</span>
                <ChevronDownIcon
                  width={18}
                  height={18}
                  fill="white"
                  className="transition-transform group-data-[state=open]:rotate-180"
                />
              </button>
            </ExplorePopover>
          </div>



          {/* Right Action Items */}
          <div className="flex items-center gap-3 sm:gap-6 shrink-0">
            <nav className="hidden xl:flex items-center gap-6">
              <Link
                href="/blog"
                className="text-white/90 hover:text-white text-[16px] font-medium font-poppins tracking-[-0.02em] transition-colors"
              >
                Blog
              </Link>



              <AboutPopover>
                <button className="flex items-center gap-2 text-white/90 hover:text-white text-[16px] font-medium font-poppins tracking-[-0.02em] transition-colors cursor-pointer group/about">
                  <span>About</span>
                  <ChevronDownIcon
                    width={18}
                    height={18}
                    fill="white"
                    className="transition-transform group-data-[state=open]:rotate-180"
                  />
                </button>
              </AboutPopover>
            </nav>

            <div className="flex items-center gap-2 sm:gap-4">
              {/* Notifications */}
              <button
                type="button"
                onClick={() => setIsNotificationsOpen(true)}
                className="relative p-2 text-white/90 hover:text-white transition-colors cursor-pointer"
                aria-label="Notifications"
              >
                <BellIcon width={24} height={24} fill="white" />
                <span className="absolute top-2 right-2 w-2 h-2 bg-[#E11D48] rounded-full border border-white/20" />
              </button>

              {/* Profile (login button hidden globally for now) */}
              {isLoggedIn && (
                <ProfilePopover>
                  <button className="flex items-center gap-2 bg-white/20 hover:bg-white/30 border border-white/50 rounded-full px-4 py-2 transition-colors cursor-pointer">
                    <UserIcon width={20} height={20} fill="white" />
                    <ChevronDownIcon width={16} height={16} fill="white" />
                  </button>
                </ProfilePopover>
              )}

              {/* CTA Button — WhatsApp */}
              <a
                href="https://wa.me/919072730020"
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center gap-3 bg-white hover:bg-gray-50 text-[#513392] rounded-[40px] px-1 py-1 pl-6 transition-all shadow-[0_4px_12px_rgba(0,0,0,0.1)]"
              >
                <span className="text-[14px] sm:text-[16px] font-bold font-poppins leading-none">Start Free</span>
                <div className="bg-[#513392] p-1.5 rounded-full text-white transition-transform group-hover:translate-x-0.5">
                  <ChevronRightIcon width={20} height={20} fill="white" />
                </div>
              </a>

            </div>
          </div>
        </header>

        {/* Hero Main Content */}
        <div className="flex-1 flex flex-col items-center justify-end pb-16 animate-in fade-in slide-in-from-bottom-4 duration-700 ease-out fill-mode-forwards">
          {isCmsLoading ? (
            <Loader color="white" label="Loading content..." labelClassName="text-white/80" />
          ) : (
            <>
              {isHeroEnabled && (
                <>
                  {/* Verified Badge */}
                  <div className="mb-6 rounded-[30px] border border-white/50 bg-white/20 backdrop-blur-[42px] px-3 sm:px-5 py-1.5 shadow-[0_4px_4px_rgba(0,0,0,0.05)] hover:bg-white/30 transition-colors cursor-default max-w-[90vw] sm:max-w-none overflow-hidden">
                    <p className="font-poppins text-[11px] sm:text-[12px] leading-[18px] sm:leading-[20px] text-white font-medium text-center">
                      {badgeText}
                    </p>
                  </div>

                  {/* Headline */}
                  <h1 className="text-white font-poppins text-[24px] sm:text-[28px] md:text-[32px] lg:text-[40px] xl:text-[44px] font-medium leading-tight tracking-[-0.4px] sm:tracking-[-0.6px] md:tracking-[-0.8px] text-center mb-6 sm:mb-8 md:mb-10 transition-all max-w-[92vw] sm:max-w-[560px] mx-auto">
                    {heroHeading}
                  </h1>
                </>
              )}

              {/* Floating Tabs Bar */}
              <div className="bg-white border-[6px] border-white/24 rounded-[16px] mb-6 flex items-center justify-center w-full max-w-[800px] shadow-[0_4px_12px_rgba(0,0,0,0.05)] py-1 px-1">
                <div className="bg-[#F6F7FF] rounded-[16px] md:rounded-[30px] p-1 md:p-2 grid grid-cols-3 md:flex items-center gap-1.5 md:gap-1 w-full md:w-auto md:overflow-x-auto md:no-scrollbar md:max-w-full">
                  {tabs.map((tab) => (
                    <Link
                      key={tab.name}
                      href={tab.href}
                      prefetch={true}
                      className="flex items-center justify-center md:justify-start w-full md:w-auto gap-1 md:gap-1.5 px-1 py-1.5 md:px-4 md:py-2 rounded-[40px] transition-all whitespace-nowrap cursor-pointer text-[#162447] hover:bg-[#513392] hover:text-white hover:shadow-[0px_1px_4px_rgba(0,0,0,0.05)]"
                    >
                      <tab.icon
                        width={16}
                        height={16}
                        fill="currentColor"
                        className="shrink-0"
                      />
                      <span className="font-poppins text-[11px] md:text-[14px] font-regular">{tab.name}</span>
                    </Link>
                  ))}
                </div>
              </div>

              {/* Primary CTA Button */}
              <Link
                href={primaryCtaLink || "/colleges"}
                prefetch={true}
                className="group flex items-center gap-2 md:gap-4 bg-[#513392] hover:bg-[#412876] text-white rounded-[40px] px-4 py-2.5 md:px-6 md:py-3 transition-all shadow-[0_8px_24px_rgba(81,51,146,0.3)] hover:shadow-[0_12px_32px_rgba(81,51,146,0.4)] hover:-translate-y-0.5 active:translate-y-0 cursor-pointer"
              >
                <span className="text-[14px] md:text-[16px] font-normal font-poppins">{primaryCtaText || "Explore Colleges"}</span>
                <div className="bg-white p-1 rounded-full flex items-center justify-center transition-transform group-hover:translate-x-1">
                  <ChevronRightIcon width={16} height={16} className="md:w-[20px] md:h-[20px]" fill="#513392" />
                </div>
              </Link>
            </>
          )}
        </div>

        {/* Carousel Indicators (Dots/Dashes) */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-3 z-30">
          {backgroundImages.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentBg(idx)}
              className={`h-1 transition-all duration-300 rounded-full cursor-pointer ${idx === currentBg
                ? "w-10 bg-white shadow-[0_0_10px_rgba(255,255,255,0.5)]"
                : "w-6 bg-white/40 hover:bg-white/60"
                }`}
              aria-label={`Go to slide ${idx + 1}`}
            />
          ))}
        </div>
      </div>

      {/* Mobile Menu Drawer */}
      <Drawer
        open={isMobileMenuOpen}
        onClose={() => setIsMobileMenuOpen(false)}
        placement="left"
        closeIcon={null}
        styles={{ body: { padding: 0 }, wrapper: { width: 320 } }}
      >
        <div className="flex flex-col h-full bg-white font-poppins">
          {/* Header */}
          <div className="flex items-center justify-between p-5 pb-2">
            <Link href="/" onClick={() => setIsMobileMenuOpen(false)}>
              <Image
                src="/logo-footer.svg"
                alt="Clarix Education"
                width={100}
                height={32}
                className="h-8 w-auto"
              />
            </Link>
            <button
              onClick={() => setIsMobileMenuOpen(false)}
              className="p-2 -mr-2 text-gray-400 hover:text-gray-900"
            >
              <X size={24} />
            </button>
          </div>

          <div className="flex flex-col px-6 py-6 overflow-y-auto flex-1 no-scrollbar">
            <div className="text-[#9CA3AF] text-sm font-medium mb-4 pl-1">Explore</div>

            <nav className="flex flex-col gap-1">
              {[
                { name: "Colleges", href: "/colleges" },
                { name: "Courses", href: "/courses" },
                { name: "Exams", href: "/exams" },
                { name: "Scholarships", href: "/scholarships" },
                { name: "Jobs & Internships", href: "/jobs-internships" },
              ].map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="flex items-center justify-between py-3 px-1 text-[#162447] font-medium text-[16px] border-b border-gray-50 hover:bg-gray-50 transition-colors"
                >
                  <span>{item.name}</span>
                  <ChevronRightIcon width={16} height={16} fill="#9CA3AF" />
                </Link>
              ))}

              <Link
                href="/blog"
                onClick={() => setIsMobileMenuOpen(false)}
                className="flex items-center justify-between py-3 px-1 text-[#162447] font-medium text-[16px] border-b border-gray-50 hover:bg-gray-50 transition-colors"
              >
                <span>Blog</span>
              </Link>

              <Link
                href="/about"
                onClick={() => setIsMobileMenuOpen(false)}
                className="flex items-center justify-between py-3 px-1 text-[#162447] font-medium text-[16px] border-b border-gray-50 hover:bg-gray-50 transition-colors"
              >
                <span>About</span>
                <ChevronRightIcon width={16} height={16} fill="#9CA3AF" />
              </Link>
            </nav>
          </div>

          {/* Footer Buttons */}
          <div className="p-5 border-t border-gray-100 mt-auto">
            {!isLoggedIn ? (
              <a
                href="https://wa.me/919072730020"
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setIsMobileMenuOpen(false)}
                className="w-full flex items-center justify-between px-4 py-3 text-white font-semibold bg-[#513392] rounded-full hover:bg-[#412876] transition-colors shadow-lg shadow-[#513392]/20 group"
              >
                <span>Start Free</span>
                <div className="bg-white rounded-full p-1 transition-transform group-hover:translate-x-1">
                  <ChevronRightIcon width={10} height={10} fill="#513392" />
                </div>
              </a>
            ) : (
              <Link
                href="/profile"
                onClick={() => setIsMobileMenuOpen(false)}
                className="w-full py-3 px-4 flex items-center justify-between text-[#162447] font-medium border border-gray-200 rounded-xl hover:bg-gray-50 transition-colors"
              >
                <span>My Profile</span>
                <UserIcon width={20} height={20} fill="#162447" />
              </Link>
            )}
          </div>
        </div>
      </Drawer>

      <NotificationsDrawer
        open={isNotificationsOpen}
        onClose={() => setIsNotificationsOpen(false)}
      />
    </section >
  );
}
