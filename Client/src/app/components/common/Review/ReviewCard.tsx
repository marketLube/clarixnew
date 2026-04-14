import Image from "next/image";

type ReviewCardProps = {
  name: string;
  degree: string;
  university: string;
  review: string;
  rating?: number;
  avatarUrl?: string;
  className?: string;
};

export default function ReviewCard({
  name,
  degree,
  university,
  review,
  rating = 5,
  avatarUrl = "/dummyImg/student.jpg",
  className = "",
}: ReviewCardProps) {
  return (
    <div
      className={`bg-white rounded-[20px] p-6 flex flex-col gap-4 w-full ${className}`}
    >
      {/* Header: Avatar + Name + Degree/University */}
      <div className="flex items-center gap-4">
        <div className="relative h-[60px] w-[60px] shrink-0 rounded-full overflow-hidden bg-[#d9d9d9]">
          <Image
            src={avatarUrl}
            alt={`${name} profile photo`}
            fill
            className="object-cover"
            sizes="60px"
          />
        </div>

        <div className="flex flex-col gap-1 flex-1">
          <p className="font-poppins font-medium text-[20px] leading-[28px] tracking-[-0.4px] text-[var(--text-headline)]">
            {name}
          </p>
          <p className="font-poppins text-[16px] leading-[20px] text-[var(--text-sub)]">
            {degree} at {university}
          </p>
        </div>
      </div>

      {/* Review/Quote Text */}
      <p className="font-poppins text-[16px] leading-[20px] text-[var(--text-headline)]">
        {review}
      </p>
    </div>
  );
}
