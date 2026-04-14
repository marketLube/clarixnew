"use client";
import { useRef, useCallback } from "react";
import { Button } from "@/components/common/Button";
import StreamCard from "@/components/common/Cards/streamCard";
import SectionHeading from "@/components/common/Section/SectionHeading";
import SectionDescription from "@/components/common/Section/SectionDescription";
import ContentWrapper from "@/components/Ui/ContentWrapper";
import { ArrowRightIcon, ChevronLeftIcon, ChevronRightIcon } from "@/components/common/Icons";
import { useRouter } from "next/navigation";
import { useCmsHomepage } from "@/hooks/cms/useCmsHomepage";
import { useStreams } from "@/hooks/stream/useStreams";
import Loader from "@/components/common/Loader";

export default function CareerStreams() {
  const router = useRouter();
  const { streams, isLoading: isCmsLoading } = useCmsHomepage();
  const { data, isLoading: isStreamsLoading } = useStreams();

  const isLoading = isCmsLoading || isStreamsLoading;

  const headingTitle =
    streams?.title?.trim() ||
    "Find what you love. Build a career around it.";

  const descriptionText =
    streams?.paragraph?.trim() ||
    "Start your journey with the field that excites you most. Choose a stream you're passionate about and discover the perfect colleges, courses, exams, and career paths curated just for you.";

  const apiStreams = data?.data?.streams ?? [];

  const handleExploreAllStreams = () => {
    router.push("/exams");
  };

  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: "left" | "right") => {
    if (scrollRef.current) {
      const { current } = scrollRef;
      const scrollAmount = current.clientWidth * 0.8; // Scroll 80% of view
      const amount = direction === "left" ? -scrollAmount : scrollAmount;
      current.scrollBy({ left: amount, behavior: "smooth" });
    }
  };

  // Translate vertical wheel events to horizontal scroll for trackpad support
  const handleWheel = useCallback((e: React.WheelEvent<HTMLDivElement>) => {
    const el = scrollRef.current;
    if (!el) return;

    // If the user is scrolling horizontally (trackpad horizontal swipe), let it happen natively
    if (Math.abs(e.deltaX) > Math.abs(e.deltaY)) return;

    // Only intercept vertical scroll if there is room to scroll horizontally
    const maxScroll = el.scrollWidth - el.clientWidth;
    if (maxScroll <= 0) return;

    const atStart = el.scrollLeft <= 0;
    const atEnd = el.scrollLeft >= maxScroll - 1;

    // If scrolling down and at the end, or scrolling up and at the start, let page scroll normally
    if ((e.deltaY > 0 && atEnd) || (e.deltaY < 0 && atStart)) return;

    e.preventDefault();
    el.scrollLeft += e.deltaY;
  }, []);

  return (
    <section className="w-full bg-[#F6F7FF] py-4 sm:py-16 px-4 sm:px-0">
      <div className="mx-auto">
        {/* Hero Section */}
        <ContentWrapper className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4 sm:gap-50 mb-6 sm:mb-12 px-0 sm:px-10">
          {/* Left: Heading */}
          <div className="flex-1 lg:w-[519px]">
            <SectionHeading
              title={headingTitle}
              className=""
            />
          </div>

          {/* Right: Description and Button */}
          <div className="flex-1 lg:w-[458px] flex flex-col gap-[31px]">
            <SectionDescription>
              {descriptionText}
            </SectionDescription>

            <div className="flex items-center justify-between sm:justify-start gap-4 w-full">
              <Button
                variant="primary"
                className="flex items-center gap-1.5 sm:gap-2 px-3 py-2 sm:px-5 sm:py-[10px] rounded-[30px] font-poppins text-[13px] sm:text-[16px] leading-[16px] sm:leading-[20px] w-fit whitespace-nowrap"
                onClick={handleExploreAllStreams}
              >
                Explore All Streams
                <ArrowRightIcon width={16} height={16} className="sm:w-[24px] sm:h-[24px]" fill="#faf9f6" />
              </Button>

              <div className="flex sm:hidden gap-2">
                <button
                  onClick={() => scroll("left")}
                  className="p-1.5 rounded-full bg-white shadow-md hover:bg-[#513392] transition-all border border-gray-100 group cursor-pointer"
                  aria-label="Scroll left"
                >
                  <ChevronLeftIcon className="w-5 h-5 text-gray-600 group-hover:text-white" fill="currentColor" />
                </button>
                <button
                  onClick={() => scroll("right")}
                  className="p-1.5 rounded-full bg-white shadow-md hover:bg-[#513392] transition-all border border-gray-100 group cursor-pointer"
                  aria-label="Scroll right"
                >
                  <ChevronRightIcon className="w-5 h-5 text-gray-600 group-hover:text-white" fill="currentColor" />
                </button>
              </div>
            </div>
          </div>
        </ContentWrapper>

        {/* Grid Container */}
        <ContentWrapper className="px-0 sm:px-10 relative">
          {isLoading ? (
            <Loader containerClassName="h-[300px]" />
          ) : (
            <>
              <div className="hidden sm:flex justify-end gap-2 mb-4">
                <button
                  onClick={() => scroll("left")}
                  className="p-2 rounded-full bg-white shadow-md hover:bg-[#513392] transition-all border border-gray-100 group cursor-pointer"
                  aria-label="Scroll left"
                >
                  <ChevronLeftIcon className="w-6 h-6 text-gray-600 group-hover:text-white" fill="currentColor" />
                </button>
                <button
                  onClick={() => scroll("right")}
                  className="p-2 rounded-full bg-white shadow-md hover:bg-[#513392] transition-all border border-gray-100 group cursor-pointer"
                  aria-label="Scroll right"
                >
                  <ChevronRightIcon className="w-6 h-6 text-gray-600 group-hover:text-white" fill="currentColor" />
                </button>
              </div>

              <div
                ref={scrollRef}
                onWheel={handleWheel}
                className="grid grid-rows-2 grid-flow-col auto-cols-[35%] overflow-x-auto gap-3 sm:gap-5 pb-4 snap-x snap-mandatory scrollbar-hide lg:auto-cols-[calc(25%-16px)]"
                style={{ WebkitOverflowScrolling: "touch" }}
              >
                {apiStreams.map((stream) => (
                  <StreamCard
                    key={stream._id}
                    title={stream.name}
                    description={`${stream.examsCount || 0} Exams`}
                    image={stream.image}
                    className="w-full flex-shrink-0 snap-start"
                    onClick={() => router.push(`/exams?stream=${stream._id}`)}
                  />
                ))}
              </div>
            </>
          )}
        </ContentWrapper>
      </div>
    </section>
  );
}
