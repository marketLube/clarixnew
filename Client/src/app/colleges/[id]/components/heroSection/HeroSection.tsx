import { Button } from "@/components/common/Button";
import {
  ArrowRightIcon,
  LocationIcon,
  LoveIcon,
  DownloadIcon,
  ShareIcon,
} from "@/components/common/Icons";
import Image from "next/image";
import { message } from "antd";
import { useRouter } from "next/navigation";
import { useState } from "react";
import ApplyNowModal from "@/components/common/ApplyNowModal";

type HeroAction = {
  label: string;
  variant: "primary" | "outline";
  withArrow?: boolean;
};

type HeroBadge = {
  label: string;
};

const HERO_ACTIONS: HeroAction[] = [
  { label: "Apply Now", variant: "primary", withArrow: true },
  { label: "Add to Compare", variant: "outline" },
];

const HERO_BADGES: HeroBadge[] = [
  { label: "NAAC A+" },
  { label: "NIRF Rank 45" },
  { label: "AICTE Approved" },
  { label: "Clarix Approved" },
  { label: "2025 Admissions" },
];

export default function HeroSection({ college }: any) {
  const router = useRouter();
  const [isApplyModalOpen, setIsApplyModalOpen] = useState(false);

  const handleShare = async () => {
    const shareData = {
      title: college?.name || "College Details",
      text: `Check out ${college?.name} on Clarix`,
      url: window.location.href,
    };

    try {
      if (navigator.share && navigator.canShare && navigator.canShare(shareData)) {
        await navigator.share(shareData);
      } else {
        await navigator.clipboard.writeText(window.location.href);
        message.success("Link copied to clipboard!");
      }
    } catch (err) {
      if (err instanceof Error && err.name !== 'AbortError') {
        await navigator.clipboard.writeText(window.location.href);
        message.success("Link copied to clipboard!");
      }
    }
  };

  const handleAction = (label: string) => {
    if (label === "Add to Compare") {
      if (typeof window !== "undefined") {
        localStorage.setItem("pending_compare_college", JSON.stringify(college));
        router.push("/colleges/compare");
      }
    } else if (label === "Apply Now") {
      setIsApplyModalOpen(true);
    }
  };

  return (
    <div
      style={{ backgroundImage: `url('${college?.campusImages?.[0] || college?.logo || "/college-details-bg.png"}')` }}
      className="w-full min-h-[14rem] pt-[60px] pb-2 sm:pt-0 sm:pb-0 sm:min-h-0 sm:h-[28rem] lg:h-[35rem] bg-cover bg-center relative flex items-end sm:items-center justify-center"
    >
      <div className="bg-white/90 backdrop-blur-sm shadow-[0_10px_40px_rgba(0,0,0,0.12)] relative sm:absolute mt-auto sm:mt-0 sm:bottom-[-88px] sm:left-1/2 sm:-translate-x-1/2 rounded-2xl px-3 py-3 sm:px-5 sm:py-4 w-[94%] max-w-[960px] z-10 transition-all">
        <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-5">
          {/* Top row on mobile: Logo + Name + Wishlist/Share */}
          <div className="flex items-start gap-3 sm:hidden">
            <Image
              src={college?.logo || "/minority.png"}
              alt={`${college?.name || "College"} logo`}
              width={100}
              height={100}
              className="w-[52px] h-[52px] rounded-lg object-contain shrink-0"
            />
            <div className="flex-1 min-w-0">
              <h1 className="text-black text-[16px] leading-[20px] font-bold line-clamp-2">
                {college?.name || "College Name"}
              </h1>
              <span className="mt-0.5 inline-flex items-center gap-1 text-[12px] text-[#4B4B4B]">
                <LocationIcon width={14} height={14} fill="gray" /> {college?.city},
                {college?.state}
              </span>
            </div>
            <div className="flex items-center gap-1.5 shrink-0">
              <button className="p-1.5 rounded-full border border-gray-200 hover:bg-gray-50">
                <LoveIcon width={16} height={16} fill="#767E92" />
              </button>
              <button
                className="p-1.5 rounded-full border border-gray-200 hover:bg-gray-50"
                onClick={handleShare}
              >
                <ShareIcon width={16} height={16} fill="#767E92" />
              </button>
            </div>
          </div>

          {/* Desktop: Logo */}
          <Image
            src={college?.logo || "/minority.png"}
            alt={`${college?.name || "College"} logo`}
            width={100}
            height={100}
            className="hidden sm:block w-[88px] h-[88px] md:w-[100px] md:h-[100px] rounded-xl object-contain"
          />
          <div className="flex-1 flex flex-col gap-2 sm:gap-4">
            {/* Desktop: Name + Wishlist/Share */}
            <div className="hidden sm:flex sm:flex-row sm:items-start gap-4 sm:justify-between">
              <div>
                <h1 className="text-black text-[22px] leading-[26px] lg:text-[24px] lg:leading-[28px] font-bold">
                  {college?.name || "College Name"}
                </h1>
                <span className="mt-1 inline-flex items-center gap-1 text-[14px] text-[#4B4B4B]">
                  <LocationIcon width={16} height={16} fill="gray" /> {college?.city},
                  {college?.state}
                </span>
              </div>
              <div className="flex flex-col md:flex-row items-end gap-2 md:gap-3">
                <Button variant="outline" size="sm" className="px-3 py-2 text-sm">
                  <LoveIcon width={16} height={16} fill="currentColor" />{" "}
                  Wishlist
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  className="px-3 py-2 text-sm"
                  onClick={handleShare}
                >
                  <ShareIcon width={16} height={16} fill="currentColor" />{" "}
                  Share
                </Button>
              </div>
            </div>

            {/* Accreditation badges */}
            <div className="flex flex-wrap items-center gap-1.5 sm:gap-2">
              {college?.accreditation?.map((badge: any) => (
                <span
                  key={badge}
                  className="px-2 py-1 sm:px-3 sm:py-2 text-[10px] sm:text-xs md:text-sm border border-gray-200 rounded-full text-[#4B4B4B] font-medium"
                >
                  {badge}
                </span>
              ))}
            </div>

            {/* Action buttons */}
            <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-[14px]">
              <Button
                variant="primary"
                size="md"
                className="flex items-center justify-center gap-2 w-full sm:w-auto h-[40px] sm:h-auto text-[14px] sm:text-base"
                onClick={() => handleAction("Apply Now")}
              >
                Apply Now
                <ArrowRightIcon width={16} height={16} />
              </Button>
              <div className="flex items-center gap-2 sm:gap-[14px]">
                <Button
                  variant="outline"
                  size="md"
                  className="flex-1 sm:flex-none justify-center h-[36px] sm:h-auto text-[13px] sm:text-base"
                  onClick={() => handleAction("Add to Compare")}
                >
                  Add to Compare
                </Button>
                <button
                  type="button"
                  className="flex-1 sm:flex-none cursor-pointer flex justify-center items-center gap-1.5 bg-transparent border-none p-0"
                  aria-label={`Download brochure for ${college?.name || "this college"}`}
                  onClick={() => {
                    if (college?.brochure) {
                      const link = document.createElement("a");
                      link.href = college.brochure;
                      link.setAttribute("download", `${college.name}_Brochure.pdf`);
                      link.setAttribute("target", "_blank");
                      link.setAttribute("rel", "noopener noreferrer");
                      document.body.appendChild(link);
                      link.click();
                      document.body.removeChild(link);
                    }
                  }}
                >
                  <span className="flex items-center gap-1.5 text-[var(--primary-color)] text-[13px] sm:text-base hover:underline">
                    Download Brochure
                    <DownloadIcon width={14} height={14} fill="currentColor" />
                  </span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <ApplyNowModal
        open={isApplyModalOpen}
        onClose={() => setIsApplyModalOpen(false)}
        title={college?.name}
      />
    </div>
  );
}
