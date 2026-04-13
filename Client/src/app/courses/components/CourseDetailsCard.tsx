import React from "react";
import ArrowRightIcon from "@/components/common/Icons/ArrowRight";
export interface CourseDetailsCardProps {
  title?: string;
  stream?: string;
  type?: string;
  entranceExams?: string[];
  topSpecialisations?: string[];
  topColleges?: string[];
  collegesCount?: number;
  onViewDetails?: () => void;
  onViewColleges?: () => void;
}

export default function CourseDetailsCard({
  title = "B.Tech in Computer Science & Engineering",
  stream = "Engineering",
  type = "Degree (Full-Time)",
  entranceExams = ["JEE Main", "JEE Advanced", "State CET", "CUET"],
  topSpecialisations = ["CSE", "ECE", "Mechanical", "IT", "Civil"],
  topColleges = ["IITs", "NITs", "VIT", "SRM", "MIT"],
  collegesCount = 3521,
  onViewDetails,
  onViewColleges,
}: CourseDetailsCardProps) {
  return (
    <article className="w-full rounded-[20px] border border-[#f2f2f2] bg-white shadow-[0px_6px_32.4px_rgba(0,0,0,0.05)] px-6 py-5 flex flex-col gap-4">
      {/* Header */}
      <header className="flex items-start justify-between gap-4">
        <div className="flex flex-col gap-2">
          <h3 className="text-[20px] leading-[28px] tracking-[-0.4px] font-medium text-[#162447]">
            {title}
          </h3>
          <div className="flex flex-wrap gap-4 text-[14px] leading-5 text-[#767e92]">
            <p>
              <span className="font-medium text-[#162447]">Stream:</span>{" "}
              {stream}
            </p>
            <p>
              <span className="font-medium text-[#162447]">Type:</span> {type}
            </p>
          </div>
        </div>

        {/* Wishlist / favourite placeholder */}
        <button
          type="button"
          aria-label="Save course"
          className="hidden md:inline-flex h-10 w-10 items-center justify-center rounded-full border border-[#d0d4e0] bg-white text-[#767e92] shadow-[0px_6px_18px_rgba(0,0,0,0.06)] hover:bg-[#f6f7ff] transition-colors"
        >
          <span className="text-lg">♡</span>
        </button>
      </header>

      <div className="h-px w-full bg-[#e4e6ee]" />

      {/* Entrance exams */}
      <section className="flex flex-col gap-3">
        <p className="text-[16px] leading-5 text-[#162447]">
          Entrance Exams:
        </p>
        <div className="flex flex-wrap gap-2">
          {entranceExams.map((exam) => (
            <span
              key={exam}
              className="inline-flex items-center justify-center rounded-[30px] bg-[#f6f7ff] px-4 py-2 text-[14px] leading-5 text-[#513392]"
            >
              {exam}
            </span>
          ))}
        </div>
      </section>

      {/* Meta rows */}
      <section className="flex flex-col gap-3">
        {/* Top specialisations */}
        <div className="flex flex-wrap items-center gap-3 text-[16px] leading-5">
          <div className="flex items-center gap-2 text-[#767e92]">
            <span className="inline-flex h-5 w-5 items-center justify-center rounded-full bg-[#f6f7ff] text-xs">
              ⛭
            </span>
            <span>Top Specialisations:</span>
          </div>
          <div className="flex flex-wrap items-center gap-3 text-[#162447]">
            {topSpecialisations.map((item, index) => (
              <React.Fragment key={item}>
                {index > 0 && (
                  <span className="h-4 w-px bg-[#e2e4e8]" aria-hidden="true" />
                )}
                <span>{item}</span>
              </React.Fragment>
            ))}
          </div>
        </div>

        {/* Top colleges */}
        <div className="flex flex-wrap items-center gap-3 text-[16px] leading-5">
          <div className="flex items-center gap-2 text-[#767e92]">
            <span className="inline-flex h-5 w-5 items-center justify-center rounded-full bg-[#f6f7ff] text-xs">
              🎓
            </span>
            <span>Top Colleges:</span>
          </div>
          <div className="flex flex-wrap items-center gap-3 text-[#162447]">
            {topColleges.map((item, index) => (
              <React.Fragment key={item}>
                {index > 0 && (
                  <span className="h-4 w-px bg-[#e2e4e8]" aria-hidden="true" />
                )}
                <span>{item}</span>
              </React.Fragment>
            ))}
          </div>
        </div>
      </section>

      {/* Footer actions */}
      <footer className="mt-2 flex flex-wrap items-center gap-4">
        <button
          type="button"
          onClick={onViewDetails}
          className="inline-flex items-center gap-3 rounded-[30px] bg-[#513392] px-5 py-2 text-[14px] leading-5 text-white shadow-[0px_6px_16px_rgba(0,0,0,0.18)] hover:bg-[#422874] transition-colors"
        >
          <span>View Details</span>
          <span>
            <ArrowRightIcon className="w-4 h-4" />
          </span>
        </button>

        <button
          type="button"
          onClick={onViewColleges}
          className="inline-flex items-center gap-3 rounded-[30px] border border-[#513392] px-5 py-2 text-[14px] leading-5 text-[#513392] hover:bg-[#f6f1ff] transition-colors"
        >
          <span>View Colleges</span>
          <ArrowRightIcon className="w-4 h-4" fill="var(--primary-color)" />
        </button>

        <div className="ml-auto inline-flex items-center gap-2 rounded-full bg-[#f6f7ff] px-4 py-2 text-[16px] leading-5 text-[#162447]">
          <span>Colleges :</span>
          <span className="text-[24px] leading-7 tracking-[-0.48px] font-medium text-[#513392]">
            {collegesCount.toLocaleString("en-IN")}
          </span>
        </div>
      </footer>
    </article>
  );
}


