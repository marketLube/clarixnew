import { Star } from "lucide-react";

interface CollegeStatsProps {
  courses: number;
  students: number;
  rating: number;
}

export function CollegeStats({ courses, students, rating }: CollegeStatsProps) {
  return (
    <div className="flex gap-3 items-center">
      {/* Courses */}
      <div className="flex flex-col gap-1.5 items-center w-[53px]">
        <p className="font-medium text-sm leading-5 text-[#364440] text-center tracking-[-0.32px] w-full">
          {courses}
        </p>
        <p className="font-normal text-xs leading-4 text-[#868f8b] tracking-[-0.28px] w-full text-center">
          Courses
        </p>
      </div>

      {/* Students */}
      <div className="flex flex-col gap-1.5 items-center whitespace-nowrap">
        <p className="font-medium text-sm leading-5 text-[#364440] text-center tracking-[-0.32px]">
          {students.toLocaleString()}
        </p>
        <p className="font-normal text-xs leading-4 text-[#868f8b] tracking-[-0.28px]">
          Students
        </p>
      </div>

      {/* Rating */}
      <div className="flex flex-col gap-1.5 items-center whitespace-nowrap">
        <div className="flex items-center gap-1">
          <Star className="w-3.5 h-3.5 fill-[#ffc107] text-[#ffc107]" />
          <p className="font-medium text-sm leading-5 text-[#ffc107] text-center tracking-[-0.32px]">
            {rating}
          </p>
        </div>
        <p className="font-normal text-xs leading-4 text-[#868f8b] tracking-[-0.28px]">
          Rating
        </p>
      </div>
    </div>
  );
}

