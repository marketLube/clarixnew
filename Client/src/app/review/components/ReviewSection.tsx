"use client";


interface ReviewSectionProps {
    formData: any;
    setFormData: (data: any) => void;
}

import { Star } from "lucide-react";

interface ReviewSectionProps {
    formData: any;
    setFormData: (data: any) => void;
}

export default function ReviewSection({ formData, setFormData }: ReviewSectionProps) {

    const handleRatingChange = (category: string, value: number) => {
        if (category === 'overall') {
            setFormData((prev: any) => ({ ...prev, overallRating: value }));
        } else {
            setFormData((prev: any) => ({
                ...prev,
                categoryRatings: {
                    ...prev.categoryRatings,
                    [category]: value
                }
            }));
        }
    };

    const renderStars = (currentRating: number, onClick: (rating: number) => void, size: number = 24) => {
        return (
            <div className="flex gap-[6px]">
                {[1, 2, 3, 4, 5].map((star) => (
                    <button
                        key={star}
                        type="button"
                        onClick={() => onClick(star)}
                        className="focus:outline-none transition-transform hover:scale-110"
                    >
                        <Star
                            size={size}
                            className={`${star <= currentRating
                                ? "fill-[#FDB022] text-[#FDB022]"
                                : "fill-[#D0D5DD] text-[#D0D5DD]"
                                }`}
                        />
                    </button>
                ))}
            </div>
        );
    };

    return (
        <div className="flex flex-col gap-6 md:gap-[24px] w-full">
            {/* Overall Rating */}
            <div className="flex flex-col gap-2 md:gap-[12px]">
                <h3 className="font-helvetica font-medium text-lg md:text-[20px] leading-[24px] tracking-[-0.2px] text-[#162447]">
                    Overall Rating
                </h3>
                {renderStars(formData.overallRating, (val) => handleRatingChange('overall', val), 24)}
            </div>

            {/* Category Ratings */}
            <div className="flex flex-col gap-2 md:gap-[12px]">
                <h3 className="font-helvetica font-medium text-lg md:text-[20px] leading-[24px] tracking-[-0.2px] text-[#101828]">
                    Category Ratings
                </h3>
                <div className="flex flex-wrap gap-x-6 md:gap-x-[40px] gap-y-4 md:gap-y-[16px]">
                    {[
                        { key: 'academics', label: 'Academics' },
                        { key: 'placements', label: 'Placements' },
                        { key: 'faculty', label: 'Faculty' },
                        { key: 'infrastructure', label: 'Infrastructure' },
                        { key: 'campusLife', label: 'Campus Life' },
                    ].map((cat) => (
                        <div key={cat.key} className="flex flex-col gap-1 md:gap-[8px]">
                            <span className="font-helvetica font-medium text-sm md:text-[16px] leading-[24px] tracking-[-0.2px] text-[#162447]">
                                {cat.label}
                            </span>
                            {renderStars(
                                formData.categoryRatings?.[cat.key] || 0,
                                (val) => handleRatingChange(cat.key, val),
                                18
                            )}
                        </div>
                    ))}
                </div>
            </div>

            {/* Review Title */}
            <div className="flex flex-col gap-2 md:gap-[12px]">
                <label className="font-helvetica font-medium text-sm md:text-[16px] leading-[24px] tracking-[-0.2px] text-[#162447]">
                    Review Title
                </label>
                <input
                    type="text"
                    placeholder="Summarize your experience"
                    value={formData.reviewTitle || ''}
                    onChange={(e) => setFormData((prev: any) => ({ ...prev, reviewTitle: e.target.value }))}
                    className="w-full h-10 md:h-[44px] bg-[#fdfdfd] border border-[#ededed] rounded-[10px] px-3 md:px-[14px] text-[14px] leading-[20px] text-[#162447] placeholder:text-[rgba(10,10,10,0.5)] focus:outline-none focus:border-[#513392] font-inter"
                />
            </div>

            {/* Review Description */}
            <div className="flex flex-col gap-2 md:gap-[12px]">
                <label className="font-helvetica font-medium text-sm md:text-[16px] leading-[24px] tracking-[-0.2px] text-[#162447]">
                    Review Description
                </label>
                <textarea
                    className="w-full h-[140px] md:h-[180px] bg-[#fdfdfd] border border-[#ededed] rounded-[12px] p-3 md:p-[14px] text-[14px] leading-[20px] text-[#162447] placeholder:text-[rgba(10,10,10,0.5)] focus:outline-none focus:border-[#513392] resize-none font-inter"
                    placeholder="Share your detailed experience about academics, placements, faculty, campus life..."
                    value={formData.content || ''}
                    onChange={(e) => setFormData((prev: any) => ({ ...prev, content: e.target.value }))}
                />
            </div>

            {/* Confirmation Checkbox */}
            <div className="flex items-center gap-2 md:gap-[10px]">
                <input
                    type="checkbox"
                    id="confirmReal"
                    checked={formData.isConfirmed || false}
                    onChange={(e) => setFormData((prev: any) => ({ ...prev, isConfirmed: e.target.checked }))}
                    className="w-[14px] h-[14px] border border-[#162447] rounded-[3px] accent-[#513392] cursor-pointer"
                />
                <label htmlFor="confirmReal" className="font-inter font-medium text-[12px] leading-[18px] tracking-[-0.1px] text-[#162447] cursor-pointer">
                    I confirm this review is based on my real college experience
                </label>
            </div>
        </div>
    );
}
