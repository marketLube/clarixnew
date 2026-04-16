"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { CloseIcon } from "@/components/common/Icons";
import api from "@/lib/api";

import Loader from "@/components/common/Loader";

interface College {
    _id: string;
    id?: string;
    name: string;
    city?: string;
    state?: string;
    logo?: string;
}

interface AddCollegeModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSelect: (college: any) => void;
    existingCollegeIds: string[];
}

// Simple Search Icon Component if not available in common icons
const SearchIcon = ({ className }: { className?: string }) => (
    <svg
        width="18"
        height="18"
        viewBox="0 0 18 18"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={className}
    >
        <path
            d="M12.5 11H11.71L11.43 10.73C12.41 9.59 13 8.11 13 6.5C13 2.91 10.09 0 6.5 0C2.91 0 0 2.91 0 6.5C0 10.09 2.91 13 6.5 13C8.11 13 9.59 12.41 10.73 11.43L11 11.71V12.5L16 17.49L17.49 16L12.5 11V11ZM6.5 11C4.01 11 2 8.99 2 6.5C2 4.01 4.01 2 6.5 2C8.99 2 11 4.01 11 6.5C11 8.99 8.99 11 6.5 11Z"
            fill="#767E92"
        />
    </svg>
);

export default function AddCollegeModal({
    isOpen,
    onClose,
    onSelect,
    existingCollegeIds,
}: AddCollegeModalProps) {
    const [searchTerm, setSearchTerm] = useState("");
    const [colleges, setColleges] = useState<College[]>([]);
    const [loading, setLoading] = useState(false);
    const searchTimeout = useRef<NodeJS.Timeout | null>(null);

    useEffect(() => {
        if (isOpen) {
            setSearchTerm("");
            fetchColleges(""); // Initial fetch
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "unset";
        }
        return () => {
            document.body.style.overflow = "unset";
        };
    }, [isOpen]);

    const fetchColleges = async (term: string) => {
        setLoading(true);
        try {
            const { data } = await api.get("/college", {
                params: {
                    search: term,
                    page: 1,
                    limit: 10,
                },
            });
            setColleges(data?.data?.colleges || []);
        } catch (error) {
            console.error("Error fetching colleges:", error);
        } finally {
            setLoading(false);
        }
    };

    const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setSearchTerm(value);

        if (searchTimeout.current) {
            clearTimeout(searchTimeout.current);
        }

        searchTimeout.current = setTimeout(() => {
            fetchColleges(value);
        }, 500);
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
            {/* Modal Container */}
            <div
                className="bg-white w-full max-w-[calc(100vw-24px)] sm:max-w-[480px] max-h-[85dvh] h-auto md:h-[600px] md:max-h-none rounded-[20px] sm:rounded-[24px] md:rounded-[30px] overflow-hidden flex flex-col relative shadow-2xl animate-in fade-in zoom-in duration-200"
                onClick={(e) => e.stopPropagation()}
            >
                {/* Header */}
                <div className="bg-[#513392] h-[72px] shrink-0 flex items-center justify-between px-6 relative">
                    <h2 className="font-poppins font-medium text-[16px] md:text-[18px] text-white tracking-wide">
                        Select College For Comparision
                    </h2>
                    <button
                        onClick={onClose}
                        className="p-2 bg-white/10 hover:bg-white/20 rounded-full transition-colors"
                        aria-label="Close"
                    >
                        <CloseIcon width={14} height={14} fill="white" />
                    </button>
                </div>

                {/* Content */}
                <div className="flex flex-col h-full overflow-hidden">
                    {/* Search Bar */}
                    <div className="p-6 pb-2 shrink-0">
                        <div className="relative w-full">
                            <div className="absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none">
                                <SearchIcon className="w-[18px] h-[18px]" />
                            </div>
                            <input
                                type="text"
                                placeholder="Search colleges..."
                                value={searchTerm}
                                onChange={handleSearch}
                                className="w-full h-[50px] pl-12 pr-4 rounded-full border border-[#EDEDED] bg-[#FDFDFD] text-[14px] text-[#162447] placeholder:text-[#767E92] focus:outline-none focus:border-[#513392] focus:shadow-[0_0_0_4px_rgba(81,51,146,0.1)] transition-all font-poppins"
                                autoFocus
                            />
                        </div>
                        <div className="h-[1px] bg-[#E4E3E3] w-full mt-6" />
                    </div>

                    {/* College List */}
                    <div className="flex-1 overflow-y-auto px-6 pb-6 space-y-3 custom-scrollbar">
                        {loading ? (
                            <Loader label="Loading colleges..." containerClassName="h-40" />
                        ) : colleges.length > 0 ? (
                            colleges.map((college) => {
                                const isSelected = existingCollegeIds.includes(college._id || college.id || "");
                                return (
                                    <button
                                        key={college._id || college.id}
                                        onClick={() => !isSelected && onSelect(college)}
                                        disabled={isSelected}
                                        className={`w-full flex items-center gap-3.5 p-3 rounded-[13px] border text-left transition-all ${isSelected
                                            ? "bg-gray-50 border-gray-100 opacity-60 cursor-not-allowed"
                                            : "bg-white border-transparent shadow-[0px_3px_14px_0px_rgba(81,51,146,0.03)] hover:border-[#513392]/30 hover:shadow-md cursor-pointer group"
                                            }`}
                                    >
                                        {/* Logo */}
                                        <div className="w-[40px] h-[40px] shrink-0 relative rounded-lg bg-white border border-gray-100 overflow-hidden shadow-sm">
                                            {college.logo ? (
                                                <Image
                                                    src={college.logo}
                                                    alt={college.name}
                                                    fill
                                                    className="object-contain p-1"
                                                />
                                            ) : (
                                                <div className="w-full h-full flex items-center justify-center bg-gray-50 text-xs text-gray-400 font-bold">
                                                    N/A
                                                </div>
                                            )}
                                        </div>

                                        {/* Info */}
                                        <div className="flex flex-col gap-1 min-w-0">
                                            <h3 className="font-poppins font-medium text-[15px] leading-[20px] text-[#162447] truncate group-hover:text-[#513392] transition-colors">
                                                {college.name}
                                            </h3>
                                            <div className="flex items-center gap-1.5 text-[#767E92]">
                                                <svg width="10" height="12" viewBox="0 0 10 12" fill="none" className="shrink-0">
                                                    <path d="M5 6.5C5.82843 6.5 6.5 5.82843 6.5 5C6.5 4.17157 5.82843 3.5 5 3.5C4.17157 3.5 3.5 4.17157 3.5 5C3.5 5.82843 4.17157 6.5 5 6.5Z" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" />
                                                    <path d="M5 11C7.5 8.5 9 6.66667 9 5C9 2.79086 7.20914 1 5 1C2.79086 1 1 2.79086 1 5C1 6.66667 2.5 8.5 5 11Z" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" />
                                                </svg>
                                                <p className="font-poppins text-[12px] leading-[15px] truncate">
                                                    {college.city || "City"}, {college.state || "State"}
                                                </p>
                                            </div>
                                        </div>

                                        {isSelected && (
                                            <div className="ml-auto text-xs font-semibold text-[#513392] bg-[#513392]/10 px-2 py-1 rounded-full">
                                                Added
                                            </div>
                                        )}
                                    </button>
                                );
                            })
                        ) : (
                            <div className="flex flex-col items-center justify-center h-40 text-center px-4">
                                <p className="text-[#162447] font-medium mb-1">No colleges found</p>
                                <p className="text-[#767E92] text-sm">Try searching for a different college name</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
