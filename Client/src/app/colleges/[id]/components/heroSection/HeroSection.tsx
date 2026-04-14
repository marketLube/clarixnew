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
      style={{ backgroundImage: `url('${college?.bannerImageUrl || "/college-details-bg.png"}')` }}
      className="w-full min-h-[26rem] pt-[100px] pb-6 sm:pt-0 sm:pb-0 sm:min-h-0 sm:h-[28rem] lg:h-[35rem] bg-cover bg-center relative flex items-end sm:items-center justify-center"
    >
      <div className="bg-white/90 backdrop-blur-sm shadow-[0_10px_40px_rgba(0,0,0,0.12)] relative sm:absolute mt-auto sm:mt-0 sm:bottom-[-88px] sm:left-1/2 sm:-translate-x-1/2 rounded-2xl px-4 py-5 sm:px-5 sm:py-4 w-[92%] max-w-[960px] z-10 transition-all">
        <div className="flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-5">
          <Image
            src={college?.logo || "/minority.png"}
            alt={`${college?.name || "College"} logo`}
            width={100}
            height={100}
            className="w-[72px] h-[72px] sm:w-[88px] sm:h-[88px] md:w-[100px] md:h-[100px] rounded-xl object-contain"
          />
          <div className="flex-1 flex flex-col gap-3 sm:gap-4">
            <div className="flex flex-col sm:flex-row sm:items-start gap-3 sm:gap-4 sm:justify-between">
              <div>
                <h1 className="text-black text-[18px] leading-[22px] sm:text-[22px] sm:leading-[26px] lg:text-[24px] lg:leading-[28px] font-bold">
                  {college?.name || "College Name"}
                </h1>
                <span className="mt-1 inline-flex items-center gap-1 text-[13px] sm:text-[14px] text-[#4B4B4B]">
                  <LocationIcon width={16} height={16} fill="gray" /> {college?.city},
                  {college?.state}
                </span>
              </div>
              <div className="flex flex-row sm:flex-col md:flex-row items-center sm:items-end gap-2 sm:gap-2 md:gap-3">
                <Button variant="outline" size="sm" className="px-3 py-2 text-xs sm:text-sm">
                  <LoveIcon width={16} height={16} fill="currentColor" />{" "}
                  Wishlist
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  className="px-3 py-2 text-xs sm:text-sm"
                  onClick={handleShare}
                >
                  <ShareIcon width={16} height={16} fill="currentColor" />{" "}
                  Share
                </Button>
                {/* review section */}
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-2">
              {college?.accreditation?.map((badge: any) => (
                <Button
                  key={badge}
                  variant="outline"
                  size="sm"
                  className="px-3 py-2 text-[11px] sm:text-xs md:text-sm"
                >
                  {badge}
                </Button>
              ))}
            </div>

            <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-[14px]">
              {HERO_ACTIONS.map((action) => (
                <Button
                  key={action.label}
                  variant={action.variant}
                  size="md"
                  className={`flex w-full sm:w-auto ${action.variant === "primary"
                    ? "items-center gap-[24px]"
                    : "justify-center"
                    }`}
                  onClick={() => handleAction(action.label)}
                >
                  {action.label}
                  {action.withArrow && (
                    <ArrowRightIcon width={16} height={16} />
                  )}
                </Button>
              ))}
              <button
                type="button"
                className="sm:ml-2 mt-2 sm:mt-0 cursor-pointer flex justify-center sm:justify-start w-full sm:w-auto bg-transparent border-none p-0"
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
                <span className="flex items-center justify-center gap-2 text-[var(--primary-color)] text-sm sm:text-base hover:underline w-full sm:w-auto">
                  Download Brochure{" "}
                  <DownloadIcon width={16} height={16} fill="currentColor" />
                </span>
              </button>
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
