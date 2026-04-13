"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { X, GitCompareArrows, Filter, ChevronDown, Check } from "lucide-react";
import CollegeCard from "@/components/common/Cards/collageCard";
import EmptyState from "@/components/common/EmptyState";
import SectionDescription from "@/components/common/Section/SectionDescription";
import SectionHeading from "@/components/common/Section/SectionHeading";
import ContentWrapper from "@/components/Ui/ContentWrapper";
import GridWrapper from "@/components/Ui/GridWrapper";
import Pagination from "@/components/Ui/Pagination";
import FAQ from "@/app/components/common/FAQ";
import { useSearchParams } from "next/navigation";
import { useColleges } from "@/hooks/college/useColleges";
import { useCmsCollegesPage } from "@/hooks/cms/useCmsCollegesPage";
import { useCmsHomepage } from "@/hooks/cms/useCmsHomepage";
import { useStreams } from "@/hooks/stream/useStreams";
import { useSavedItems } from "@/hooks/useSavedItems";
import Loader from "@/components/common/Loader";

export default function CollegesPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const stream = searchParams.get("stream") || undefined;
  const city = searchParams.get("city") || undefined;

  const { colleges, pagination, isLoading, error } = useColleges({
    page: currentPage,
    limit: itemsPerPage,
    stream: stream,
    location: city,
  });

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
    params.set("page", "1");
    router.push(`/colleges?${params.toString()}`);
  };

  const handleClearFilters = () => {
    const params = new URLSearchParams(searchParams.toString());
    params.delete("city");
    params.delete("stream");
    params.set("page", "1");
    router.push(`/colleges?${params.toString()}`);
  };

  const totalPages = pagination?.totalPages || 1;

  const [selectedColleges, setSelectedColleges] = useState<any[]>([]);

  const handleToggleCompare = (college: any) => {
    setSelectedColleges((prev) => {
      const exists = prev.find((item) => item._id === college._id);

      // Remove if already selected
      if (exists) {
        return prev.filter((item) => item._id !== college._id);
      }

      // Limit to max 4 colleges
      if (prev.length >= 4) {
        return prev;
      }

      return [...prev, college];
    });
  };

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

  const currentItems = colleges?.map((college) => (
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
  ));

  const { heroSection } = useCmsCollegesPage();

  return (
    <ContentWrapper>
      {heroSection?.enabled && (
        <section className="space-y-3 max-w-[38rem]  md:px-0">
          <SectionHeading title={heroSection?.primaryHeadline || ""} />
          <SectionDescription className="max-w-[35rem]">
            {heroSection?.subHeadline || ""}
          </SectionDescription>
        </section>
      )}

      {/* Filter Section */}
      <div className="mt-8 flex flex-col gap-4">
        <div className="flex flex-wrap items-center gap-4">
          <div className="flex items-center gap-2 text-[#162447] font-helvetica font-medium">
            <Filter className="w-5 h-5" />
            <span>Filters</span>
          </div>

          {/* City Dropdown */}
          <div className="relative" ref={dropdownRef}>
            <button
              type="button"
              onClick={() => setIsCityDropdownOpen(!isCityDropdownOpen)}
              className="flex items-center gap-2 px-5 py-2.5 rounded-full border border-[#e0e4f0] bg-white text-[#162447] text-sm font-helvetica hover:border-[#513392] transition-colors shadow-sm"
            >
              <span>{city ? `City: ${city}` : "City"}</span>
              <ChevronDown className={`w-4 h-4 transition-transform ${isCityDropdownOpen ? "rotate-180" : ""}`} />
            </button>

            {isCityDropdownOpen && (
              <div className="absolute top-full left-0 mt-2 w-64 max-h-[300px] overflow-y-auto bg-white border border-[#e0e4f0] rounded-2xl shadow-[0_12px_40px_rgba(0,0,0,0.12)] z-20 py-2 custom-scrollbar">
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
                      className="w-full text-left px-4 py-2.5 text-sm font-helvetica flex items-center justify-between hover:bg-[#f7f8ff] transition-colors"
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
              className="flex items-center gap-2 px-5 py-2.5 rounded-full border border-[#e0e4f0] bg-white text-[#162447] text-sm font-helvetica hover:border-[#513392] transition-colors shadow-sm"
            >
              <span>{stream ? `Stream: ${cmsStreams.find((s) => s._id === stream)?.name || stream}` : "Stream"}</span>
              <ChevronDown className={`w-4 h-4 transition-transform ${isStreamDropdownOpen ? "rotate-180" : ""}`} />
            </button>

            {isStreamDropdownOpen && (
              <div className="absolute top-full left-0 mt-2 w-64 max-h-[300px] overflow-y-auto bg-white border border-[#e0e4f0] rounded-2xl shadow-[0_12px_40px_rgba(0,0,0,0.12)] z-20 py-2 custom-scrollbar">
                <div className="px-4 py-2 text-xs font-semibold text-[#767e92] uppercase tracking-wider">
                  Select a Stream
                </div>
                {isStreamsLoading ? (
                  <div className="px-4 py-3 text-sm text-[#767e92]">Loading streams...</div>
                ) : cmsStreams.length === 0 ? (
                  <div className="px-4 py-3 text-sm text-[#767e92]">No streams found</div>
                ) : (
                  cmsStreams.map((s) => (
                    <button
                      key={s._id}
                      onClick={() => {
                        handleFilterUpdate("stream", s._id);
                        setIsStreamDropdownOpen(false);
                      }}
                      className="w-full text-left px-4 py-2.5 text-sm font-helvetica flex items-center justify-between hover:bg-[#f7f8ff] transition-colors"
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
        {(city || stream) && (
          <div className="flex flex-wrap items-center gap-2 mt-2">
            <span className="text-sm font-helvetica text-[#767e92] mr-2">Active:</span>

            {city && (
              <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#f5eefe] text-[#513392] text-sm font-helvetica font-medium border border-[#e5d5ff] transition-all">
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
              <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#f5eefe] text-[#513392] text-sm font-helvetica font-medium border border-[#e5d5ff] transition-all">
                Stream: {cmsStreams.find((s) => s._id === stream)?.name || stream}
                <button
                  onClick={() => handleFilterUpdate("stream", stream)}
                  className="hover:bg-[#d9c4fb] rounded-full p-0.5 transition-colors flex items-center justify-center"
                  aria-label="Remove stream filter"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              </span>
            )}

            <button
              onClick={handleClearFilters}
              className="text-sm font-helvetica text-[#ff4b4b] hover:text-[#e73b3b] hover:underline ml-2 transition-colors"
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
          <p className="text-[#ff4b4b] font-helvetica font-medium">Failed to load colleges. Please try again later.</p>
        </div>
      ) : colleges?.length === 0 ? (
        <EmptyState onClearFilters={handleClearFilters} />
      ) : (
        <>
          <GridWrapper colsDesktop={4} className="mt-8">
            {currentItems}
          </GridWrapper>

          <div className="w-full flex justify-center mt-12 mb-8">
            <Pagination
              totalPages={totalPages}
              currentPage={currentPage}
              onPageChange={(page) => { setCurrentPage(page); window.scrollTo({ top: 0, behavior: "smooth" }); }}
            />
          </div>
        </>
      )}
      {/* <FAQ /> */}

      {/* Bottom compare bar */}
      {selectedColleges.length > 0 && (
        <div className="fixed inset-x-0 bottom-0 z-30 px-0 pb-0">
          <div className="w-full rounded-t-[24px] bg-white shadow-[0_-18px_40px_rgba(0,0,0,0.12)] border-t border-[#f0f2ff] px-4 py-3 md:px-8 md:py-4">
            <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between md:gap-6 max-w-[1750px] mx-auto">
              <div className="flex-1 min-w-0">
                <p className="font-helvetica text-xs md:text-sm text-[#767e92] mb-2">
                  Your Compared Colleges ({selectedColleges.length}/4)
                </p>
                <div className="flex flex-wrap gap-3">
                  {selectedColleges.map((college) => (
                    <div
                      key={college._id}
                      className="flex items-center justify-between gap-4 rounded-2xl bg-[#f7f8ff] px-4 py-3 shadow-sm min-w-[260px]"
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-[40px] h-[40px] rounded-xl overflow-hidden bg-white shadow-[0_4px_10px_rgba(0,0,0,0.06)] flex items-center justify-center">
                          {/* eslint-disable-next-line @next/next/no-img-element */}
                          <img
                            src={college?.logo}
                            alt={college?.name}
                            className="w-full h-full object-contain"
                          />
                        </div>
                        <div className="flex flex-col">
                          <span className="font-helvetica text-sm md:text-base font-semibold text-[#162447] max-w-[180px] truncate">
                            {college?.name}
                          </span>
                          <span className="mt-0.5 inline-flex items-center gap-1 font-helvetica text-xs md:text-sm text-[#767e92] max-w-[190px] truncate">
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

              <div className="flex items-center justify-between gap-6">
                <button
                  type="button"
                  onClick={handleClearAll}
                  className="font-helvetica text-sm md:text-base text-[#ff4b4b] hover:text-[#e73b3b]"
                >
                  Clear all ✕
                </button>
                <button
                  type="button"
                  onClick={handleCompareNow}
                  disabled={selectedColleges.length < 2}
                  className={`inline-flex items-center justify-center gap-3 rounded-full px-10 py-3 text-base font-helvetica font-medium transition-colors shadow-sm ${selectedColleges.length >= 2
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
      <FAQ />
    </ContentWrapper>
  );
}
