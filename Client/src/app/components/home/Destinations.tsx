"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import ContentWrapper from "@/components/Ui/ContentWrapper";
import { ChevronLeftIcon, ChevronRightIcon } from "@/components/common/Icons";
import { Button } from "@/components/common/Button";
import SectionHeading from "@/components/common/Section/SectionHeading";
import { useCmsHomepage } from "@/hooks/cms/useCmsHomepage";
import Loader from "@/components/common/Loader";

const DEFAULT_ABROAD_COUNTRIES = [
    {
        name: "United Kingdom",
        image: "https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?w=400&h=350&fit=crop",
    },
    {
        name: "United States",
        image: "https://images.unsplash.com/photo-1485738422979-f5c462d49f04?w=400&h=350&fit=crop",
    },
    {
        name: "Canada",
        image: "https://images.unsplash.com/photo-1517935706615-2717063c2225?w=400&h=350&fit=crop",
    },
    {
        name: "Australia",
        image: "https://images.unsplash.com/photo-1523482580672-f109ba8cb9be?w=400&h=350&fit=crop",
    },
    {
        name: "Germany",
        image: "https://images.unsplash.com/photo-1467269204594-9661b134dd2b?w=400&h=350&fit=crop",
    },
    {
        name: "Singapore",
        image: "https://images.unsplash.com/photo-1525625293386-3f8f99389edd?w=400&h=350&fit=crop",
    },
    {
        name: "Ireland",
        image: "https://images.unsplash.com/photo-1590089415225-401ed6f9db8e?w=400&h=350&fit=crop",
    },
    {
        name: "New Zealand",
        image: "https://images.unsplash.com/photo-1507699622108-4be3abd695ad?w=400&h=350&fit=crop",
    },
];

export default function Destinations() {
    const { location, abroadLocations, isLoading } = useCmsHomepage();
    const router = useRouter();

    const [activeTab, setActiveTab] = useState<"india" | "abroad">("india");
    const scrollRef = useRef<HTMLDivElement | null>(null);
    const autoScrollRef = useRef<ReturnType<typeof setInterval> | null>(null);
    const userInteractedRef = useRef(false);

    const indiaDestinations =
        (location?.items ?? [])
            .filter((item) => (item?.isActive ?? true) && item?.name && item?.image)
            .map((item) => ({
                name: item!.name as string,
                image: item!.image as string,
            }));

    const abroadDestinations =
        (abroadLocations?.items ?? [])
            .filter((item) => (item?.isActive ?? true) && item?.name && item?.image)
            .map((item) => ({
                name: item!.name as string,
                image: item!.image as string,
            }));

    // Use CMS abroad data if available, otherwise use defaults
    const abroadToShow = abroadDestinations.length > 0 ? abroadDestinations : DEFAULT_ABROAD_COUNTRIES;

    const destinationsToShow = activeTab === "india" ? indiaDestinations : abroadToShow;

    // Reset scroll position when tab changes
    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollTo({ left: 0 });
        }
        userInteractedRef.current = false;
    }, [activeTab]);

    // Get the width of one card + gap for scrolling by card
    const getCardScrollAmount = useCallback(() => {
        const el = scrollRef.current;
        if (!el || !el.firstElementChild) return 300;
        const card = el.firstElementChild as HTMLElement;
        const gap = window.innerWidth < 640 ? 12 : 24;
        return card.offsetWidth + gap;
    }, []);

    // Auto-scroll effect
    useEffect(() => {
        const startAutoScroll = () => {
            if (autoScrollRef.current) clearInterval(autoScrollRef.current);

            autoScrollRef.current = setInterval(() => {
                if (userInteractedRef.current) return;
                const el = scrollRef.current;
                if (!el) return;

                const maxScroll = el.scrollWidth - el.clientWidth;
                if (el.scrollLeft >= maxScroll - 10) {
                    el.scrollTo({ left: 0, behavior: "smooth" });
                } else {
                    el.scrollBy({ left: getCardScrollAmount(), behavior: "smooth" });
                }
            }, 3000);
        };

        startAutoScroll();
        return () => {
            if (autoScrollRef.current) clearInterval(autoScrollRef.current);
        };
    }, [destinationsToShow.length, getCardScrollAmount]);

    // Pause auto-scroll on user interaction, resume after 5s
    const handleUserScroll = useCallback(() => {
        userInteractedRef.current = true;
        const timeout = setTimeout(() => {
            userInteractedRef.current = false;
        }, 5000);
        return () => clearTimeout(timeout);
    }, []);

    const handlePrev = () => {
        handleUserScroll();
        scrollRef.current?.scrollBy({ left: -getCardScrollAmount(), behavior: "smooth" });
    };

    const handleNext = () => {
        handleUserScroll();
        scrollRef.current?.scrollBy({ left: getCardScrollAmount(), behavior: "smooth" });
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
        handleUserScroll();
    }, [handleUserScroll]);

    return (
        <section className="w-full bg-white py-4 sm:py-20">
            <ContentWrapper>
                {/* Header Section */}
                <div className="flex items-end justify-between mb-4 sm:mb-8">
                    <SectionHeading
                        title="Study Across India & Abroad"
                    />

                    <div className="hidden sm:flex gap-6 items-center">
                        <Button
                            variant="secondaryRound"
                            onClick={handlePrev}
                            className="flex items-center justify-center w-10 h-10 rounded-full border-[0.5px] border-[#dac9ff] bg-white shadow-[0px_3px_4px_rgba(144,144,144,0.15)] transition-all hover:border-[#513392] !p-0"
                        >
                            <ChevronLeftIcon width={24} height={24} fill="#162447" />
                        </Button>
                        <Button
                            variant="primaryRound"
                            onClick={handleNext}
                            className="flex items-center justify-center w-10 h-10 rounded-full bg-[#513392] shadow-[0px_3px_4px_rgba(144,144,144,0.15)] transition-all hover:bg-[#412876] !p-0"
                        >
                            <ChevronRightIcon width={24} height={24} fill="#ffffff" />
                        </Button>
                    </div>
                </div>

                {/* India / Abroad Toggle */}
                <div className="flex gap-2 mb-6 sm:mb-10">
                    <button
                        onClick={() => setActiveTab("india")}
                        className={`px-5 py-2 rounded-full text-sm font-medium font-poppins transition-all ${
                            activeTab === "india"
                                ? "bg-[#513392] text-white shadow-[0px_4px_12px_rgba(81,51,146,0.3)]"
                                : "bg-[#f6f7ff] text-[#162447] hover:bg-[#edefff]"
                        }`}
                    >
                        India
                    </button>
                    <button
                        onClick={() => setActiveTab("abroad")}
                        className={`px-5 py-2 rounded-full text-sm font-medium font-poppins transition-all ${
                            activeTab === "abroad"
                                ? "bg-[#513392] text-white shadow-[0px_4px_12px_rgba(81,51,146,0.3)]"
                                : "bg-[#f6f7ff] text-[#162447] hover:bg-[#edefff]"
                        }`}
                    >
                        Abroad
                    </button>
                </div>

                {isLoading ? (
                    <Loader containerClassName="h-[200px]" />
                ) : (
                    <>
                        {/* Carousel Container - native scroll for trackpad support */}
                        <div
                            ref={scrollRef}
                            onWheel={handleWheel}
                            onScroll={handleUserScroll}
                            className="flex gap-3 sm:gap-6 overflow-x-auto scroll-smooth pb-4 scrollbar-hide"
                            style={{
                                WebkitOverflowScrolling: "touch",
                            }}
                        >
                            {destinationsToShow.map((city, index) => (
                                <div
                                    key={`${activeTab}-${city.name}-${index}`}
                                    onClick={() => {
                                        if (activeTab === "india") {
                                            router.push(`/colleges?city=${encodeURIComponent(city.name)}`);
                                        } else {
                                            router.push(`/colleges?country=${encodeURIComponent(city.name)}`);
                                        }
                                    }}
                                    className="flex-shrink-0 w-[27%] sm:w-[calc(33.333%-16px)] lg:w-[calc(16.666%-20px)] flex flex-col items-center gap-2 sm:gap-4 group cursor-pointer"
                                >
                                    <div className="relative w-full aspect-[172/150] rounded-[20px] overflow-hidden shadow-[0px_4px_12px_rgba(0,0,0,0.08)] transition-shadow duration-300 group-hover:shadow-[0px_8px_24px_rgba(0,0,0,0.15)]">
                                        <Image
                                            src={city.image}
                                            alt={city.name}
                                            fill
                                            className="object-cover transition-transform duration-700 group-hover:scale-110"
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-b from-black/5 to-black/10 group-hover:from-black/0 group-hover:to-black/5 transition-all duration-300" />
                                    </div>
                                    <p className="font-poppins font-medium text-[#162447] text-[14px] sm:text-[20px] leading-[20px] sm:leading-[28px] tracking-[-0.4px] text-center">
                                        {city.name}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </>
                )}
            </ContentWrapper>
        </section>
    );
}
