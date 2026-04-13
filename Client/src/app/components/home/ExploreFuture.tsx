"use client";
import React, { useState, useEffect } from "react";
import ContentWrapper from "@/components/Ui/ContentWrapper";
import SectionHeading from "@/components/common/Section/SectionHeading";
import SectionDescription from "@/components/common/Section/SectionDescription";
import {
    Briefcase,
    FlaskConical,
    BookOpen,
    Scale,
    Palette,
    ShoppingCart,
    Sprout,
    Stethoscope,
    HeartPulse,
    Pill,
    Layout,
    Hammer,
    ChevronRight,
    ChevronLeft,
    GraduationCap // Add a fallback icon
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useCmsHomepage } from "@/hooks/cms/useCmsHomepage";
import { useStreams } from "@/hooks/stream/useStreams";
import { useRouter } from "next/navigation";
import Loader from "@/components/common/Loader";

interface Category {
    id: string;
    name: string;
    collegeCount: string;
    examCount: string;
    icon: React.ElementType;
}

const iconMap: Record<string, React.ElementType> = {
    Management: Briefcase,
    Science: FlaskConical,
    Education: BookOpen,
    Law: Scale,
    Engineering: Hammer,
    Arts: Palette,
    Pharmacy: Pill,
    Design: Layout,
    Medical: Stethoscope,
    Commerce: ShoppingCart,
    Paramedical: HeartPulse,
    Agriculture: Sprout,
};

export default function ExploreFuture() {
    const { isLoading: isCmsLoading } = useCmsHomepage();
    const { data: streamsData, isLoading: isStreamsLoading } = useStreams();
    const router = useRouter();
    const [activeTab, setActiveTab] = useState<"College" | "Exam">("College");
    const [currentPage, setCurrentPage] = useState(0);
    const [itemsPerPage, setItemsPerPage] = useState(12);

    const isLoading = isCmsLoading || isStreamsLoading;

    // Map API data to Category format
    const categories: Category[] = (streamsData?.data.streams || []).map((stream) => ({
        id: stream._id,
        name: stream.name,
        collegeCount: `${stream.collegesCount} Colleges`,
        examCount: `${stream.examsCount ?? 0} Exams`,
        icon: iconMap[stream.name] || GraduationCap,
    }));

    // Responsive items per page
    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth < 768) {
                setItemsPerPage(5);
            } else {
                setItemsPerPage(12);
            }
        };

        handleResize();
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    const totalPages = Math.ceil(categories.length / itemsPerPage);

    useEffect(() => {
        setCurrentPage(0);
    }, [activeTab, itemsPerPage]);

    const handleNext = () => {
        setCurrentPage((prev) => (prev + 1) % totalPages);
    };

    const handlePrev = () => {
        setCurrentPage((prev) => (prev - 1 + totalPages) % totalPages);
    };

    const startIndex = currentPage * itemsPerPage;
    const visibleCategories = categories.slice(startIndex, startIndex + itemsPerPage);

    return (
        <section className="w-full bg-white py-4 md:py-16">
            <ContentWrapper className="px-4 sm:px-10">
                <div className="mb-6 md:mb-10">
                    <SectionHeading title="Explore your Future" className="" />
                    <SectionDescription className="mt-1 text-text-sub">
                        Select for {activeTab}
                    </SectionDescription>
                </div>

                {/* Tabs */}
                <div className="flex gap-6 border-b border-border mb-6 md:mb-8">
                    {["College", "Exam"].map((tab) => (
                        <button
                            key={tab}
                            onClick={() => setActiveTab(tab as any)}
                            className={`pb-2 text-[15px] md:text-[16px] font-medium transition-all relative cursor-pointer ${activeTab === tab ? "text-primary font-semibold" : "text-text-sub"
                                }`}
                        >
                            {tab}
                            {activeTab === tab && (
                                <motion.div
                                    layoutId="activeTabUnderline"
                                    className="absolute bottom-[-1px] left-0 w-full h-[2px] bg-primary rounded-t-full"
                                    transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                                />
                            )}
                        </button>
                    ))}
                </div>

                {/* Content with Animation */}
                <div className="relative min-h-[250px]">
                    {isLoading ? (
                        <Loader containerClassName="h-[250px]" />
                    ) : (
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={`${activeTab}-${currentPage}`}
                                initial={{ opacity: 0, scale: 0.98 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.98 }}
                                transition={{ duration: 0.2 }}
                                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 md:gap-4"
                            >
                                {visibleCategories.map((category) => (
                                    <motion.div
                                        key={category.name}
                                        whileHover={{ y: -3 }}
                                        onClick={() => {
                                            if (activeTab === "College") {
                                                router.push(`/colleges?stream=${category.id}`);
                                            } else {
                                                router.push(`/exams?stream=${category.id}`);
                                            }
                                        }}
                                        className="flex items-center p-3 md:p-4 border border-border rounded-[12px] bg-white group/card hover:shadow-md hover:border-primary-light transition-all cursor-pointer"
                                    >
                                        <div className="w-[44px] h-[44px] md:w-[48px] md:h-[48px] flex items-center justify-center rounded-[10px] bg-background text-text-headline group-hover/card:bg-primary-light group-hover/card:text-primary transition-colors">
                                            <category.icon size={22} strokeWidth={1.5} />
                                        </div>
                                        <div className="ml-3 flex-1">
                                            <h3 className="text-[14px] md:text-[15px] font-bold text-text-headline group-hover/card:text-primary transition-colors">
                                                {category.name}
                                            </h3>
                                            <p className="text-[11px] md:text-[12px] text-text-sub">
                                                {activeTab === "College" ? category.collegeCount : category.examCount}
                                            </p>
                                        </div>
                                        <div className="text-border group-hover/card:text-primary transition-colors">
                                            <ChevronRight size={18} />
                                        </div>
                                    </motion.div>
                                ))}
                            </motion.div>
                        </AnimatePresence>
                    )}
                </div>

                {/* Pagination & Nav Arrows */}
                {totalPages > 1 && (
                    <div className="flex items-center justify-center mt-8 gap-6 md:gap-10">
                        <button
                            onClick={handlePrev}
                            className="p-2 md:p-2.5 rounded-full border border-border hover:bg-primary hover:text-white hover:border-primary transition-all text-text-headline shadow-sm cursor-pointer group/btn"
                            aria-label="Previous"
                        >
                            <ChevronLeft size={20} className="group-hover/btn:scale-110 transition-transform" />
                        </button>

                        <div className="flex gap-2">
                            {[...Array(totalPages)].map((_, idx) => (
                                <button
                                    key={idx}
                                    onClick={() => setCurrentPage(idx)}
                                    className={`w-2 h-2 rounded-full transition-all cursor-pointer ${currentPage === idx ? "bg-primary scale-110 shadow-sm" : "bg-border hover:bg-primary-light"
                                        }`}
                                    aria-label={`Page ${idx + 1}`}
                                />
                            ))}
                        </div>

                        <button
                            onClick={handleNext}
                            className="p-2 md:p-2.5 rounded-full border border-border hover:bg-primary hover:text-white hover:border-primary transition-all text-text-headline shadow-sm cursor-pointer group/btn"
                            aria-label="Next"
                        >
                            <ChevronRight size={20} className="group-hover/btn:scale-110 transition-transform" />
                        </button>
                    </div>
                )}
            </ContentWrapper>
        </section>
    );
}
