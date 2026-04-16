import Image from "next/image";

type CampusLifeCardProps = {
  title: string;
  count: number | string;
  pills: string[];
  description: string;
  imageUrl?: string;
  imageAlt?: string;
  className?: string;
};

export default function CampusLifeCard({
  title,
  count,
  pills,
  description,
  imageUrl = "/dummyCardImage.png",
  imageAlt,
  className = "",
}: CampusLifeCardProps) {
  // Format count to always show 2 digits (e.g., 1 -> "01", 10 -> "10")
  const formattedCount =
    typeof count === "number" ? count.toString().padStart(2, "0") : count;

  return (
    <div
      className={`bg-white flex flex-col gap-3 md:gap-[14px] p-4 md:p-6 rounded-[20px] md:rounded-[30px] w-full ${className}`}
    >
      {/* Title with Count Badge */}
      <div className="flex gap-2 items-center w-full">
        <h3 className="flex-1 font-poppins font-medium text-[18px] leading-[22px] md:text-[24px] md:leading-[28px] tracking-[-0.48px] text-[#29363f]">
          {title}
        </h3>
        <div className="bg-[var(--background)] flex items-center justify-center rounded-full size-[32px] md:size-[40px] shrink-0">
          <p className="font-poppins font-medium text-[16px] leading-[20px] md:text-[24px] md:leading-[28px] tracking-[-0.48px] text-[var(--primary-color)]">
            {formattedCount}
          </p>
        </div>
      </div>

      {/* Pills */}
      <div className="flex flex-wrap gap-2 md:gap-3">
        {pills.map((pill, index) => (
          <div
            key={index}
            className="bg-[var(--background)] flex items-center justify-center px-2.5 py-1 md:px-3 md:py-2 rounded-[40px]"
          >
            <p className="font-poppins text-[12px] leading-[16px] md:text-[16px] md:leading-[20px] text-[var(--primary-color)]">
              {pill}
            </p>
          </div>
        ))}
      </div>

      {/* Divider */}
      <div className="h-px w-full bg-[var(--border)]" />

      {/* Description */}
      <div className="flex items-center justify-center w-full">
        <p className="font-poppins text-[13px] leading-[18px] md:text-[16px] md:leading-[20px] text-[#29363f]">
          {description}
        </p>
      </div>

      {/* Image */}
      <div className="h-[160px] md:h-[220px] relative rounded-[12px] md:rounded-[16px] w-full overflow-hidden">
        <Image
          src={imageUrl}
          alt={imageAlt || `${title} campus life activity`}
          fill
          className="object-cover object-center rounded-[12px] md:rounded-[16px]"
          sizes="(max-width: 768px) 100vw, 33vw"
        />
      </div>
    </div>
  );
}
