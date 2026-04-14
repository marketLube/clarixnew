"use client";

import { Suspense, useState, useEffect, useRef, useCallback, useMemo } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { X, GitCompareArrows, Filter, ChevronDown, Check } from "lucide-react";
import CollegeCard from "@/components/common/Cards/collageCard";
import EmptyState from "@/components/common/EmptyState";
import SectionDescription from "@/components/common/Section/SectionDescription";
import SectionHeading from "@/components/common/Section/SectionHeading";
import ContentWrapper from "@/components/Ui/ContentWrapper";
import GridWrapper from "@/components/Ui/GridWrapper";
import { useSearchParams } from "next/navigation";
import { useInfiniteColleges } from "@/hooks/college/useInfiniteColleges";
import { useCmsCollegesPage } from "@/hooks/cms/useCmsCollegesPage";
import { useCmsHomepage } from "@/hooks/cms/useCmsHomepage";
import { useStreams } from "@/hooks/stream/useStreams";
import { useSavedItems } from "@/hooks/useSavedItems";
import Loader from "@/components/common/Loader";
import Breadcrumb from "@/components/common/Breadcrumb";

/** Number of columns at each breakpoint — must match GridWrapper defaults. */
const COLS_DESKTOP = 4;
const COLS_TABLET = 2;
const COLS_MOBILE = 1;

/**
 * Returns the number of grid columns currently visible, so we can trim
 * the list to show only complete rows while more data is available.
 */
function useGridColumns() {
  const [cols, setCols] = useState(COLS_DESKTOP);

  useEffect(() => {
    function update() {
      const w = window.innerWidth;
      if (w >= 1024) setCols(COLS_DESKTOP);
      else if (w >= 768) setCols(COLS_TABLET);
      else setCols(COLS_MOBILE);
    }
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  return cols;
}

export default function CollegesPage() {
  return (
    <Suspense fallback={<Loader fullPage label="Loading colleges..." />}>
      <CollegesPageContent />
    </Suspense>
  );
}

function CollegesPageContent() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const stream = searchParams.get("stream") || undefined;
  const city = searchParams.get("city") || undefined;
  const ownership = searchParams.get("ownership") || undefined;
  const ranking = searchParams.get("ranking") || undefined;
  const country = searchParams.get("country") || undefined;
  const searchQuery = searchParams.get("search") || undefined;

  // When filters are active, add noindex to avoid duplicate content indexing
  const hasActiveFilters = Boolean(searchQuery || stream || city || ownership || ranking || country);

  const {
    colleges,
    isLoading,
    isFetchingNextPage,
    hasNextPage,
    fetchNextPage,
    error,
  } = useInfiniteColleges({
    limit: 12,
    search: searchQuery,
    stream,
    location: city,
    country,
    type: ownership,
    ranking,
  });

  const cols = useGridColumns();

  // --- Intersection Observer for infinite scroll ---
  const sentinelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const sentinel = sentinelRef.current;
    if (!sentinel) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasNextPage && !isFetchingNextPage) {
          fetchNextPage();
        }
      },
      { rootMargin: "200px" }
    );

    observer.observe(sentinel);
    return () => observer.disconnect();
  }, [hasNextPage, isFetchingNextPage, fetchNextPage]);

  // --- Trim to complete rows while more pages remain ---
  const visibleColleges = useMemo(() => {
    if (!hasNextPage) return colleges;
    const completeRowCount = Math.floor(colleges.length / cols) * cols;
    return completeRowCount > 0 ? colleges.slice(0, completeRowCount) : colleges;
  }, [colleges, cols, hasNextPage]);

  // --- CMS & filter data ---
  const { location, isLoading: isLocationLoading } = useCmsHomepage();
  const cmsCities = (location?.items ?? [])
    .filter((item) => (item?.isActive ?? true) && item?.name)
    .map((item) => item!.name as string);

  const { data: streamsData, isLoading: isStreamsLoading } = useStreams();
  const cmsStreams = streamsData?.data?.streams || [];

  const [isCityDropdownOpen, setIsCityDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const [isStreamDropdownOpen, setIsStreamDropdownOpen] = useState(false);
  const streamDropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsCityDropdownOpen(false);
      }
      if (streamDropdownRef.current && !streamDropdownRef.current.contains(event.target as Node)) {
        setIsStreamDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleFilterUpdate = (key: string, value: string | null) => {
    const params = new URLSearchParams(searchParams.toString());
    if (value) {
      if (params.get(key) === value) {
        params.delete(key);
      } else {
        params.set(key, value);
      }
    } else {
      params.delete(key);
    }
    router.push(`/colleges?${params.toString()}`);
  };

  const handleClearFilters = () => {
    const params = new URLSearchParams(searchParams.toString());
    params.delete("search");
    params.delete("city");
    params.delete("stream");
    params.delete("ownership");
    params.delete("ranking");
    router.push(`/colleges?${params.toString()}`);
  };

  // --- Compare logic ---
  const [selectedColleges, setSelectedColleges] = useState<any[]>([]);

  const handleToggleCompare = useCallback((college: any) => {
    setSelectedColleges((prev) => {
      const exists = prev.find((item) => item._id === college._id);
      if (exists) return prev.filter((item) => item._id !== college._id);
      if (prev.length >= 4) return prev;
      return [...prev, college];
    });
  }, []);

  const handleRemoveFromBar = (id: string) => {
    setSelectedColleges((prev) => prev.filter((item) => item._id !== id));
  };

  const handleClearAll = () => {
    setSelectedColleges([]);
  };

  const handleCompareNow = () => {
    router.push("/colleges/compare");
  };

  const { savedItems, toggleSavedItem } = useSavedItems();

  const { heroSection } = useCmsCollegesPage();

  return (
    <>
      {/* SEO noindex handled via layout metadata */}
    <ContentWrapper>
      <Breadcrumb items={[{ label: "Colleges" }]} />

      {heroSection?.enabled && (
        <section className="space-y-3 max-w-[38rem]  md:px-0">
          <SectionHeading title={heroSection?.primaryHeadline || ""} as="h1" />
          <SectionDescription className="max-w-[35rem]">
            {heroSection?.subHeadline || ""}
          </SectionDescription>
        </section>
      )}

      {/* Filter Section */}
      <div className="relative z-10 mt-8 flex flex-col gap-4">
        <div className="flex flex-wrap items-center gap-4">
          <div className="flex items-center gap-2 text-[#162447] font-poppins font-medium">
            <Filter className="w-5 h-5" />
            <span>Filters</span>
          </div>

          {/* City Dropdown */}
          <div className="relative" ref={dropdownRef}>
            <button
              type="button"
              onClick={() => setIsCityDropdownOpen(!isCityDropdownOpen)}
              aria-expanded={isCityDropdownOpen}
              className="flex items-center gap-2 px-5 py-2.5 rounded-full border border-[#e0e4f0] bg-white text-[#162447] text-sm font-poppins hover:border-[#513392] transition-colors shadow-sm"
            >
              <span>{city ? `City: ${city}` : "City"}</span>
              <ChevronDown className={`w-4 h-4 transition-transform ${isCityDropdownOpen ? "rotate-180" : ""}`} />
            </button>

            {isCityDropdownOpen && (
              <div className="absolute top-full left-0 mt-2 w-[calc(100vw-32px)] sm:w-64 max-h-[300px] overflow-y-auto bg-white border border-[#e0e4f0] rounded-2xl shadow-[0_12px_40px_rgba(0,0,0,0.12)] z-50 py-2 custom-scrollbar">
                <div className="px-4 py-2 text-xs font-semibold text-[#767e92] uppercase tracking-wider">
                  Select a City
                </div>
                {isLocationLoading ? (
                  <div className="px-4 py-3 text-sm text-[#767e92]">Loading cities...</div>
                ) : cmsCities.length === 0 ? (
                  <div className="px-4 py-3 text-sm text-[#767e92]">No cities found</div>
                ) : (
                  cmsCities.map((c) => (
                    <button
                      key={c}
                      onClick={() => {
                        handleFilterUpdate("city", c);
                        setIsCityDropdownOpen(false);
                      }}
                      className="w-full text-left px-4 py-2.5 text-sm font-poppins flex items-center justify-between hover:bg-[#f7f8ff] transition-colors"
                    >
                      <span className={city === c ? "text-[#513392] font-medium" : "text-[#162447]"}>
                        {c}
                      </span>
                      {city === c && <Check className="w-4 h-4 text-[#513392]" />}
                    </button>
                  ))
                )}
              </div>
            )}
          </div>

          {/* Stream Dropdown */}
          <div className="relative" ref={streamDropdownRef}>
            <button
              type="button"
              onClick={() => setIsStreamDropdownOpen(!isStreamDropdownOpen)}
              aria-expanded={isStreamDropdownOpen}
              className="flex items-center gap-2 px-5 py-2.5 rounded-full border border-[#e0e4f0] bg-white text-[#162447] text-sm font-poppins hover:border-[#513392] transition-colors shadow-sm"
            >
              <span>{stream ? `Stream: ${cmsStreams.find((s: any) => s._id === stream)?.name || stream}` : "Stream"}</span>
              <ChevronDown className={`w-4 h-4 transition-transform ${isStreamDropdownOpen ? "rotate-180" : ""}`} />
            </button>

            {isStreamDropdownOpen && (
              <div className="absolute top-full left-0 mt-2 w-[calc(100vw-32px)] sm:w-64 max-h-[300px] overflow-y-auto bg-white border border-[#e0e4f0] rounded-2xl shadow-[0_12px_40px_rgba(0,0,0,0.12)] z-50 py-2 custom-scrollbar">
                <div className="px-4 py-2 text-xs font-semibold text-[#767e92] uppercase tracking-wider">
                  Select a Stream
                </div>
                {isStreamsLoading ? (
                  <div className="px-4 py-3 text-sm text-[#767e92]">Loading streams...</div>
                ) : cmsStreams.length === 0 ? (
                  <div className="px-4 py-3 text-sm text-[#767e92]">No streams found</div>
                ) : (
                  cmsStreams.map((s: any) => (
                    <button
                      key={s._id}
                      onClick={() => {
                        handleFilterUpdate("stream", s._id);
                        setIsStreamDropdownOpen(false);
                      }}
                      className="w-full text-left px-4 py-2.5 text-sm font-poppins flex items-center justify-between hover:bg-[#f7f8ff] transition-colors"
                    >
                      <span className={stream === s._id ? "text-[#513392] font-medium" : "text-[#162447]"}>
                        {s.name}
                      </span>
                      {stream === s._id && <Check className="w-4 h-4 text-[#513392]" />}
                    </button>
                  ))
                )}
              </div>
            )}
          </div>
        </div>

        {/* Active Filters */}
        {(searchQuery || city || stream || ownership || ranking) && (
          <div className="flex flex-wrap items-center gap-2 mt-2">
            <span className="text-sm font-poppins text-[#767e92] mr-2">Active:</span>

            {searchQuery && (
              <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#f5eefe] text-[#513392] text-sm font-poppins font-medium border border-[#e5d5ff] transition-all">
                Search: {searchQuery}
                <button
                  onClick={() => handleFilterUpdate("search", searchQuery)}
                  className="hover:bg-[#d9c4fb] rounded-full p-0.5 transition-colors flex items-center justify-center"
                  aria-label="Remove search filter"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              </span>
            )}

            {city && (
              <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#f5eefe] text-[#513392] text-sm font-poppins font-medium border border-[#e5d5ff] transition-all">
                City: {city}
                <button
                  onClick={() => handleFilterUpdate("city", city)}
                  className="hover:bg-[#d9c4fb] rounded-full p-0.5 transition-colors flex items-center justify-center"
                  aria-label="Remove city filter"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              </span>
            )}

            {stream && (
              <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#f5eefe] text-[#513392] text-sm font-poppins font-medium border border-[#e5d5ff] transition-all">
                Stream: {cmsStreams.find((s: any) => s._id === stream)?.name || stream}
                <button
                  onClick={() => handleFilterUpdate("stream", stream)}
                  className="hover:bg-[#d9c4fb] rounded-full p-0.5 transition-colors flex items-center justify-center"
                  aria-label="Remove stream filter"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              </span>
            )}

            {ownership && (
              <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#f5eefe] text-[#513392] text-sm font-poppins font-medium border border-[#e5d5ff] transition-all">
                Type: {ownership}
                <button
                  onClick={() => handleFilterUpdate("ownership", ownership)}
                  className="hover:bg-[#d9c4fb] rounded-full p-0.5 transition-colors flex items-center justify-center"
                  aria-label="Remove ownership filter"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              </span>
            )}

            {ranking && (
              <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#f5eefe] text-[#513392] text-sm font-poppins font-medium border border-[#e5d5ff] transition-all">
                Ranking: {ranking}
                <button
                  onClick={() => handleFilterUpdate("ranking", ranking)}
                  className="hover:bg-[#d9c4fb] rounded-full p-0.5 transition-colors flex items-center justify-center"
                  aria-label="Remove ranking filter"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              </span>
            )}

            <button
              onClick={handleClearFilters}
              className="text-sm font-poppins text-[#ff4b4b] hover:text-[#e73b3b] hover:underline ml-2 transition-colors"
            >
              Clear All
            </button>
          </div>
        )}
      </div>

      {isLoading ? (
        <Loader fullPage label="Loading colleges..." />
      ) : error ? (
        <div className="flex justify-center items-center h-64">
          <p className="text-[#ff4b4b] font-poppins font-medium">Failed to load colleges. Please try again later.</p>
        </div>
      ) : colleges?.length === 0 ? (
        <EmptyState onClearFilters={handleClearFilters} />
      ) : (
        <>
          <GridWrapper colsDesktop={COLS_DESKTOP} className="mt-8">
            {visibleColleges.map((college) => (
              <CollegeCard
                key={college._id}
                college={college}
                onToggleCompare={handleToggleCompare}
                isSelectedForCompare={selectedColleges.some(
                  (item) => item._id === college._id
                )}
                isFavorite={savedItems.colleges?.some((c: any) => c._id === college._id)}
                onToggleFavorite={() => toggleSavedItem({ itemId: college._id, itemType: 'colleges' })}
              />
            ))}
          </GridWrapper>

          {/* Sentinel element — triggers next page fetch when scrolled into view */}
          <div ref={sentinelRef} className="w-full h-1" />

          {isFetchingNextPage && (
            <Loader label="Loading more colleges..." />
          )}

          {!hasNextPage && colleges.length > 0 && (
            <p className="text-center text-sm text-[#767e92] font-poppins py-8">
              You have seen all {colleges.length} colleges.
            </p>
          )}
        </>
      )}

      {/* Bottom compare bar */}
      {selectedColleges.length > 0 && (
        <div className="fixed inset-x-0 bottom-0 z-30 px-0 pb-0">
          <div className="w-full rounded-t-[24px] bg-white shadow-[0_-18px_40px_rgba(0,0,0,0.12)] border-t border-[#f0f2ff] px-4 py-3 md:px-8 md:py-4">
            <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between md:gap-6 max-w-[1750px] mx-auto">
              <div className="flex-1 min-w-0">
                <p className="font-poppins text-xs md:text-sm text-[#767e92] mb-2">
                  Your Compared Colleges ({selectedColleges.length}/4)
                </p>
                <div className="flex flex-wrap gap-3">
                  {selectedColleges.map((college) => (
                    <div
                      key={college._id}
                      className="flex items-center justify-between gap-3 rounded-2xl bg-[#f7f8ff] px-3 py-2 md:px-4 md:py-3 shadow-sm min-w-[180px] sm:min-w-[260px]"
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-[40px] h-[40px] rounded-xl overflow-hidden bg-white shadow-[0_4px_10px_rgba(0,0,0,0.06)] flex items-center justify-center">
                          <Image
                            src={college?.logo || "/minority.png"}
                            alt={college?.name || "College logo"}
                            width={40}
                            height={40}
                            className="object-contain"
                          />
                        </div>
                        <div className="flex flex-col">
                          <span className="font-poppins text-sm md:text-base font-semibold text-[#162447] max-w-[180px] truncate">
                            {college?.name}
                          </span>
                          <span className="mt-0.5 inline-flex items-center gap-1 font-poppins text-xs md:text-sm text-[#767e92] max-w-[190px] truncate">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              viewBox="0 0 24 24"
                              className="h-3.5 w-3.5 text-[#a4acc4]"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="1.8"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            >
                              <path d="M12 21s-6-4.35-6-10a6 6 0 1 1 12 0c0 5.65-6 10-6 10z" />
                              <circle cx="12" cy="11" r="2.4" />
                            </svg>
                            {college?.city}, {college?.state}
                          </span>
                        </div>
                      </div>
                      <button
                        type="button"
                        onClick={() => handleRemoveFromBar(college._id)}
                        className="ml-1 text-[#162447] hover:text-[#0e1630] transition-colors"
                      >
                        <X className="" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex items-center justify-between gap-3 sm:gap-6">
                <button
                  type="button"
                  onClick={handleClearAll}
                  className="font-poppins text-sm md:text-base text-[#ff4b4b] hover:text-[#e73b3b]"
                >
                  Clear all ✕
                </button>
                <button
                  type="button"
                  onClick={handleCompareNow}
                  disabled={selectedColleges.length < 2}
                  className={`inline-flex items-center justify-center gap-3 rounded-full px-10 py-3 text-base font-poppins font-medium transition-colors shadow-sm ${selectedColleges.length >= 2
                    ? "bg-[#513392] text-white hover:bg-[#3d2770]"
                    : "bg-[#f5eefe] text-[#b9a5f0] cursor-not-allowed"
                    }`}
                >
                  <span className="inline-flex h-6 w-6 items-center justify-center rounded-full border border-white/40">
                    <GitCompareArrows className="h-4 w-4" />
                  </span>
                  Compare Now
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </ContentWrapper>
    </>
  );
}
