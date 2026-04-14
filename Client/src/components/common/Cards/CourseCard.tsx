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
    <article className="bg-white rounded-[20px] overflow-hidden shadow-[0_1px_4px_rgba(0,0,0,0.05)] max-w-[21rem] h-full flex flex-col">
      <div className="w-full flex justify-center pt-4 px-2 shrink-0">
        <div className="relative h-[192px] w-full max-w-[310px]">
          <Image
            src={course?.cardImage || "/DummycourseImage.png"}
            alt={course?.name || "course"}
            fill
            className="object-cover rounded-[10px]"
          />
        </div>
      </div>

      <div className="p-[22px] flex flex-col flex-1">
        <div className="min-h-[42px]">
          <h3 className="font-helvetica text-[20px] leading-[21px] tracking-[-0.4px] text-[#141219] line-clamp-2">
            {course?.name}
          </h3>
        </div>

        <div className="mt-5 flex flex-wrap gap-4 text-[13px] text-[var(--text-sub)]">
          <InfoPill label={course?.duration} Icon={ClockIcon} />
          <InfoPill label={course?.fees} Icon={GraphUpIcon} />
          <InfoPill label={course?.intakeCapacity ? `${course.intakeCapacity} seats` : "N/A"} Icon={GraduationCapIcon} />
          <InfoPill label={course?.type} Icon={VerifyIcon} />
        </div>

        <div className="mt-5 h-px w-full bg-[#e2e4e8] shrink-0" />

        <div className="mt-3 flex-1 flex flex-col gap-2 text-[16px] leading-5 min-h-[80px]">
          <p className="text-[var(--text-sub)] shrink-0">Eligibility:</p>
          <div className="flex flex-col gap-1 overflow-hidden">
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

        <div className="mt-auto pt-4">
          <Button
            variant="primary"
            size="md"
            className="rounded-[30px] px-4 py-[5px] flex items-center gap-3 w-fit"
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              router.push(`/courses/${course?._id}`);
            }}
          >
            Course Details <span className="text-lg">→</span>
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
    <div className="flex flex-col items-center gap-1">
      <div className="bg-[var(--background)] rounded-full p-1.5 flex items-center justify-center">
        <Icon width={14} height={14} fill="var(--primary-color)" />
      </div>
      <p>{label}</p>
    </div>
  );
}