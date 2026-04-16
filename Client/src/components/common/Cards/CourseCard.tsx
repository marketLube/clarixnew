import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/common/Button";
import { useRouter } from "next/navigation";

import {
  ClockIcon,
  GraphUpIcon,
  GraduationCapIcon,
  VerifyIcon,
} from "@/components/common/Icons";


export default function CourseCard({
  course
}: any) {

  const router = useRouter();
  return (
    <Link href={`/courses/${course?._id}`} className="block h-full">
    <article className="bg-white rounded-[16px] md:rounded-[20px] overflow-hidden shadow-[0_1px_4px_rgba(0,0,0,0.05)] max-w-[21rem] h-full flex flex-col">
      <div className="w-full flex justify-center pt-2 px-2 md:pt-4 shrink-0">
        <div className="relative h-[130px] md:h-[192px] w-full max-w-[310px]">
          <Image
            src={course?.cardImage || "/DummycourseImage.png"}
            alt={course?.name || "course"}
            fill
            className="object-cover rounded-[10px]"
          />
        </div>
      </div>

      <div className="p-3 md:p-[22px] flex flex-col flex-1">
        <div className="min-h-[32px] md:min-h-[42px]">
          <h3 className="font-poppins text-[14px] leading-[17px] md:text-[20px] md:leading-[21px] tracking-[-0.4px] text-[#141219] line-clamp-2">
            {course?.name}
          </h3>
        </div>

        <div className="mt-2 md:mt-5 grid grid-cols-2 gap-x-2 gap-y-2 md:flex md:flex-wrap md:gap-4 text-[11px] md:text-[13px] text-[var(--text-sub)]">
          <InfoPill label={course?.duration} Icon={ClockIcon} />
          <InfoPill label={course?.fees} Icon={GraphUpIcon} />
          <InfoPill label={course?.intakeCapacity ? `${course.intakeCapacity} seats` : "N/A"} Icon={GraduationCapIcon} />
          <InfoPill label={course?.type} Icon={VerifyIcon} />
        </div>

        <div className="mt-3 md:mt-5 h-px w-full bg-[#e2e4e8] shrink-0" />

        <div className="mt-2 md:mt-3 flex-1 flex flex-col gap-1 md:gap-2 text-[12px] leading-[15px] md:text-[16px] md:leading-5 min-h-[52px] md:min-h-[80px]">
          <p className="text-[var(--text-sub)] shrink-0">Eligibility:</p>
          <div className="flex flex-col gap-0.5 md:gap-1 overflow-hidden">
            {course?.eligibility?.map((item: any, index: number) => (
              <p
                key={index}
                className="text-[var(--text-headline)] line-clamp-1"
                title={item}
              >
                {item}
              </p>
            ))}
          </div>
        </div>

        <div className="mt-auto pt-3 md:pt-4">
          <Button
            variant="primary"
            size="md"
            className="rounded-[30px] px-3 md:px-4 py-[4px] md:py-[5px] text-[12px] md:text-base flex items-center gap-2 md:gap-3 w-fit"
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              router.push(`/courses/${course?._id}`);
            }}
          >
            Course Details <span className="text-base md:text-lg">→</span>
          </Button>
        </div>
      </div>
    </article>
    </Link>
  );
}

type InfoPillProps = {
  label: string;
  Icon: React.ElementType;
};

function InfoPill({ label, Icon }: InfoPillProps) {
  return (
    <div className="flex flex-row md:flex-col items-center gap-1.5 md:gap-1 min-w-0">
      <div className="bg-[var(--background)] rounded-full p-1.5 flex items-center justify-center shrink-0">
        <Icon width={14} height={14} fill="var(--primary-color)" />
      </div>
      <p className="truncate md:whitespace-normal md:text-center">{label}</p>
    </div>
  );
}