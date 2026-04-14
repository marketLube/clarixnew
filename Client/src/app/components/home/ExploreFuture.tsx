"use client";
import React, { useState } from "react";
import ContentWrapper from "@/components/Ui/ContentWrapper";
import SectionHeading from "@/components/common/Section/SectionHeading";
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
    GraduationCap,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useStreams } from "@/hooks/stream/useStreams";
import { useRouter } from "next/navigation";
import Loader from "@/components/common/Loader";

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
    const { data: streamsData, isLoading } = useStreams();
    const router = useRouter();
    const [activeTab, setActiveTab] = useState<"College" | "Exam">("College");

    const streams = streamsData?.data?.streams || [];

    return (
        <section className="w-full bg-[#F6F7FF] py-8 md:py-16">
            <ContentWrapper className="px-4 sm:px-10">
                {/* Header */}
                <div className="mb-8 md:mb-10">
                    <SectionHeading title="Explore your Future" />
                    <p className="mt-2 font-poppins text-[13px] md:text-[15px] text-[#767e92]">
                        Browse by stream — find the right colleges and exams for your career path.
                    </p>
                </div>

                {/* Tabs */}
                <div className="flex gap-2 mb-6 md:mb-8">
                    {(["College", "Exam"] as const).map((tab) => (
                        <button
                            key={tab}
                            onClick={() => setActiveTab(tab)}
                            className={`px-5 py-2 rounded-full text-[14px] font-medium font-poppins transition-all ${
                                activeTab === tab
                                    ? "bg-[#513392] text-white shadow-[0px_4px_12px_rgba(81,51,146,0.3)]"
                                    : "bg-white text-[#162447] hover:bg-[#edefff] border border-[#e0e4f0]"
                            }`}
                        >
                            {tab === "College" ? "Colleges" : "Exams"}
                        </button>
                    ))}
                </div>

                {/* Grid */}
                {isLoading ? (
                    <Loader containerClassName="h-[250px]" />
                ) : (
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={activeTab}
                            initial={{ opacity: 0, y: 8 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -8 }}
                            transition={{ duration: 0.2 }}
                            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 md:gap-4"
                        >
                            {streams.map((stream) => {
                                const Icon = iconMap[stream.name] || GraduationCap;
                                const count = activeTab === "College"
                                    ? stream.collegesCount
                                    : (stream.examsCount ?? 0);
                                const label = activeTab === "College" ? "Colleges" : "Exams";

                                return (
                                    <motion.div
                                        key={stream._id}
                                        whileHover={{ y: -2 }}
                                        onClick={() => {
                                            if (activeTab === "College") {
                                                router.push(`/colleges?stream=${stream._id}`);
                                            } else {
                                                router.push(`/exams?stream=${stream._id}`);
                                            }
                                        }}
                                        className="flex items-center p-3.5 md:p-4 rounded-[14px] bg-white group/card hover:shadow-[0px_4px_20px_rgba(0,0,0,0.08)] hover:border-[#d4c4f0] border border-[#e8eaf0] transition-all cursor-pointer"
                                    >
                                        <div className="w-[42px] h-[42px] md:w-[46px] md:h-[46px] flex items-center justify-center rounded-[10px] bg-[#f5f3ff] text-[#513392] group-hover/card:bg-[#513392] group-hover/card:text-white transition-colors shrink-0">
                                            <Icon size={20} strokeWidth={1.5} />
                                        </div>
                                        <div className="ml-3 flex-1 min-w-0">
                                            <h3 className="text-[14px] md:text-[15px] font-semibold text-[#162447] group-hover/card:text-[#513392] transition-colors font-poppins">
                                                {stream.name}
                                            </h3>
                                            <p className="text-[11px] md:text-[12px] text-[#767e92] font-poppins">
                                                {count} {label}
                                            </p>
                                        </div>
                                        <ChevronRight size={16} className="text-[#c5c9d6] group-hover/card:text-[#513392] transition-colors shrink-0" />
                                    </motion.div>
                                );
                            })}
                        </motion.div>
                    </AnimatePresence>
                )}
            </ContentWrapper>
        </section>
    );
}
