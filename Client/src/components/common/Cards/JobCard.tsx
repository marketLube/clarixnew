import { Heart } from "lucide-react";

export interface JobCardProps {
  id?: string;
  title: string;
  company: string;
  logoUrl?: string;
  employmentType: string;
  salaryRange: string;
  location: string;
  postedTime: string;
  isBookmarked?: boolean;
  onApply?: () => void;
  onViewDetails?: () => void;
  onBookmark?: () => void;
}

export default function JobCard({
  title,
  company,
  logoUrl,
  employmentType,
  salaryRange,
  location,
  postedTime,
  isBookmarked,
  onApply,
  onViewDetails,
  onBookmark,
}: JobCardProps) {
  return (
    <div
      className="group bg-[#fcfcfc] rounded-[16px] md:rounded-[20px] p-[10px] md:p-[14px] flex items-center justify-between gap-3 md:gap-4 cursor-pointer hover:bg-[#f8f8f8] transition-colors"
      onClick={onViewDetails}
    >
      <div className="flex gap-[7.5px] items-center flex-1 min-w-0">
        {/* Company Logo */}
        <div className="w-[48px] h-[48px] md:w-[60px] md:h-[60px] rounded-[40px] md:rounded-[52px] bg-[#bbb] flex-shrink-0 overflow-hidden shadow-[0px_0.75px_3px_0px_rgba(0,0,0,0.05)]">
          {logoUrl ? (
            <img
              src={logoUrl}
              alt={company}
              className="w-full h-full object-cover rounded-[52px]"
            />
          ) : (
            <div className="w-full h-full bg-gradient-to-br from-[#513392] to-[#6a46c0] flex items-center justify-center rounded-[40px] md:rounded-[52px]">
              <span className="text-white font-medium text-base md:text-lg">
                {company.charAt(0)}
              </span>
            </div>
          )}
        </div>

        {/* Job Info */}
        <div className="flex flex-col gap-[4px] md:gap-[10px] flex-1 min-w-0">
          <h3 className="font-poppins font-medium text-[14px] md:text-[16px] leading-[18px] md:leading-[20px] text-[#162447] break-words">
            {title}
          </h3>
          <p className="font-poppins text-[12px] md:text-[14px] leading-[16px] md:leading-[20px] text-[#767e92] whitespace-nowrap overflow-hidden text-ellipsis">
            {company} <span>{employmentType}</span> {salaryRange}
          </p>
        </div>
      </div>

      {/* Location, Time and Actions */}
      <div className="relative grid items-center justify-items-end flex-shrink-0 w-auto md:w-[140px]">
        {/* Default View (Visible by default, fades out on desktop hover) */}
        <div className="col-start-1 row-start-1 flex flex-col gap-1 md:gap-2 items-end w-full transition-opacity duration-200 ease-in-out md:group-hover:opacity-0 md:group-hover:pointer-events-none">
          <p className="font-poppins text-[12px] md:text-[14px] leading-[16px] md:leading-[20px] text-[#767e92] tracking-[-0.28px] whitespace-nowrap">
            {location}
          </p>
          <p className="font-poppins text-[10px] md:text-[12px] leading-[14px] md:leading-[20px] text-[#767e92] tracking-[-0.24px]">
            {postedTime}
          </p>
          <button
            onClick={(e) => {
              e.stopPropagation();
              onBookmark?.();
            }}
            className="bg-white border-[0.5px] border-[#767e92] flex items-center justify-center p-[6px] rounded-[27.94px] hover:bg-[#f6f7ff] transition-colors mt-1"
            aria-label={isBookmarked ? "Remove bookmark" : "Add bookmark"}
          >
            <Heart
              size={18}
              strokeWidth={1.5}
              fill={isBookmarked ? "#513392" : "none"}
              className={isBookmarked ? "stroke-[#513392]" : "stroke-[#767e92]"}
            />
          </button>
        </div>

        {/* Hover View (Desktop only, fades in on hover) */}
        <div className="col-start-1 row-start-1 hidden md:flex items-center gap-2 opacity-0 transition-opacity duration-200 ease-in-out group-hover:opacity-100 pointer-events-none group-hover:pointer-events-auto">
          <button
            onClick={(e) => {
              e.stopPropagation();
              onApply?.();
            }}
            className="bg-[#513392] text-white px-4 py-2 rounded-[30px] text-xs md:text-sm font-medium hover:bg-[#684bd3] transition-colors whitespace-nowrap shadow-sm"
          >
            Apply Now
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              onBookmark?.();
            }}
            className="bg-white border-[0.5px] border-[#767e92] flex flex-shrink-0 items-center justify-center p-[6px] rounded-[27.94px] hover:bg-[#f6f7ff] transition-colors"
            aria-label={isBookmarked ? "Remove bookmark" : "Add bookmark"}
          >
            <Heart
              size={18}
              strokeWidth={1.5}
              fill={isBookmarked ? "#513392" : "none"}
              className={isBookmarked ? "stroke-[#513392]" : "stroke-[#767e92]"}
            />
          </button>
        </div>
      </div>
    </div>
  );
}
