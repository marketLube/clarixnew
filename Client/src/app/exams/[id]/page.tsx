"use client";

import { useParams, useRouter } from "next/navigation";
import { useExamById } from "@/hooks/exam/useExamById";
import ContentWrapper from "@/components/Ui/ContentWrapper";
import Loader from "@/components/common/Loader";
import {
  ArrowLeft,
  Calendar,
  ClipboardList,
  Award,
  GraduationCap,
  ExternalLink,
  Building2,
} from "lucide-react";
import Image from "next/image";

function formatDate(dateStr: string | undefined): string {
  if (!dateStr) return "TBA";
  const date = new Date(dateStr);
  return date.toLocaleDateString("en-IN", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

export default function ExamDetailPage() {
  const { id } = useParams();
  const router = useRouter();
  const { exam, isLoading, isError } = useExamById(id as string);

  if (isLoading) {
    return <Loader fullPage label="Loading exam details..." />;
  }

  if (isError || !exam) {
    return (
      <section className="py-10 min-h-screen">
        <ContentWrapper className="flex flex-col items-center justify-center gap-4 py-20">
          <p className="font-poppins text-[#767e92] text-lg">
            Exam not found or an error occurred.
          </p>
          <button
            onClick={() => router.push("/exams")}
            className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#513392] text-white font-helvetica text-sm hover:bg-[#3f2874] transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Exams
          </button>
        </ContentWrapper>
      </section>
    );
  }

  const dates = [
    {
      label: "Registration Date",
      value: formatDate(exam.registrationDate),
      icon: ClipboardList,
      color: "#513392",
      bgColor: "#f5eefe",
    },
    {
      label: "Exam Date",
      value: formatDate(exam.examDate),
      icon: Calendar,
      color: "#0d7c66",
      bgColor: "#e8f8f4",
    },
    {
      label: "Result Publish Date",
      value: formatDate(exam.resultPublishDate),
      icon: Award,
      color: "#c2590a",
      bgColor: "#fff4eb",
    },
  ];

  return (
    <section className="py-6 md:py-10 min-h-screen bg-[#FDFDFD]">
      <ContentWrapper className="flex flex-col gap-6 md:gap-10">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 font-poppins text-sm text-[#767e92]">
          <button
            onClick={() => router.push("/exams")}
            className="flex items-center gap-1.5 hover:text-[#513392] transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>All Exams</span>
          </button>
          <span>/</span>
          <span className="text-[#162447] font-medium">{exam.shortName}</span>
        </nav>

        {/* Hero Card */}
        <div className="bg-white rounded-2xl border border-[#e0e4f0] shadow-[0_4px_20px_rgba(0,0,0,0.04)] p-6 md:p-10">
          <div className="flex flex-col md:flex-row gap-6 md:gap-10 items-start">
            {/* Logo */}
            {exam.logo && (
              <div className="w-20 h-20 md:w-28 md:h-28 rounded-2xl bg-[#f7f8ff] border border-[#e0e4f0] flex items-center justify-center overflow-hidden flex-shrink-0">
                <Image
                  src={exam.logo}
                  alt={exam.shortName}
                  width={112}
                  height={112}
                  className="object-contain w-full h-full p-2"
                />
              </div>
            )}

            {/* Title Block */}
            <div className="flex-1 min-w-0">
              <h1 className="font-helvetica font-medium text-[#162447] text-[24px] md:text-[36px] lg:text-[42px] leading-tight tracking-[-0.5px]">
                {exam.shortName}
              </h1>
              <p className="font-poppins text-[#767e92] text-[14px] md:text-[16px] mt-1.5 leading-relaxed">
                {exam.fullName}
              </p>

              {/* Stream & Colleges row */}
              <div className="flex flex-wrap items-center gap-3 mt-4">
                {exam.stream?.name && (
                  <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#f5eefe] text-[#513392] text-sm font-helvetica font-medium border border-[#e5d5ff]">
                    <GraduationCap className="w-3.5 h-3.5" />
                    {exam.stream.name}
                  </span>
                )}
                <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#eef4ff] text-[#2d5fb4] text-sm font-helvetica font-medium border border-[#d3e2f7]">
                  <Building2 className="w-3.5 h-3.5" />
                  {exam.collegesAccepting?.toLocaleString() || 0} Colleges Accepting
                </span>
              </div>
            </div>

            {/* CTA */}
            {exam.officialWebsite && (
              <a
                href={exam.officialWebsite}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-6 py-3 rounded-full bg-[#513392] text-white font-helvetica text-sm font-medium hover:bg-[#3f2874] transition-colors shadow-sm flex-shrink-0 self-start"
              >
                Visit Official Website
                <ExternalLink className="w-4 h-4" />
              </a>
            )}
          </div>
        </div>

        {/* Key Dates Grid */}
        <div>
          <h2 className="font-helvetica font-medium text-[#162447] text-[18px] md:text-[22px] mb-4">
            Key Dates
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {dates.map((item) => (
              <div
                key={item.label}
                className="bg-white rounded-2xl border border-[#e0e4f0] p-5 md:p-6 shadow-[0_2px_12px_rgba(0,0,0,0.03)] hover:shadow-[0_4px_20px_rgba(0,0,0,0.06)] transition-shadow"
              >
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center mb-3"
                  style={{ backgroundColor: item.bgColor }}
                >
                  <item.icon className="w-5 h-5" style={{ color: item.color }} />
                </div>
                <p className="font-poppins text-[#767e92] text-xs uppercase tracking-wider mb-1">
                  {item.label}
                </p>
                <p
                  className="font-helvetica font-medium text-[16px] md:text-[18px]"
                  style={{ color: item.color }}
                >
                  {item.value}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Qualification Required */}
        {exam.qualificationRequired && exam.qualificationRequired.length > 0 && (
          <div>
            <h2 className="font-helvetica font-medium text-[#162447] text-[18px] md:text-[22px] mb-4">
              Qualification Required
            </h2>
            <div className="flex flex-wrap gap-2.5">
              {exam.qualificationRequired.map((qual, index) => (
                <span
                  key={index}
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-white text-[#162447] text-sm font-poppins border border-[#e0e4f0] shadow-[0_1px_4px_rgba(0,0,0,0.04)] hover:border-[#513392] hover:text-[#513392] transition-colors"
                >
                  <GraduationCap className="w-4 h-4 text-[#513392]" />
                  {qual}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Description */}
        {exam.description && (
          <div>
            <h2 className="font-helvetica font-medium text-[#162447] text-[18px] md:text-[22px] mb-4">
              About {exam.shortName}
            </h2>
            <div className="bg-white rounded-2xl border border-[#e0e4f0] p-6 md:p-8 shadow-[0_2px_12px_rgba(0,0,0,0.03)]">
              <div
                className="font-poppins text-[#4a5068] text-[14px] md:text-[15px] leading-[1.8] prose prose-sm max-w-none prose-headings:font-helvetica prose-headings:text-[#162447] prose-a:text-[#513392]"
                dangerouslySetInnerHTML={{ __html: exam.description }}
              />
            </div>
          </div>
        )}

        {/* Bottom CTA */}
        {exam.officialWebsite && (
          <div className="bg-gradient-to-r from-[#513392] to-[#3f2874] rounded-2xl p-6 md:p-10 flex flex-col md:flex-row items-center justify-between gap-4">
            <div>
              <h3 className="font-helvetica font-medium text-white text-[18px] md:text-[22px]">
                Ready to apply for {exam.shortName}?
              </h3>
              <p className="font-poppins text-white/70 text-sm mt-1">
                Visit the official website for registration and more details.
              </p>
            </div>
            <a
              href={exam.officialWebsite}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-8 py-3 rounded-full bg-white text-[#513392] font-helvetica text-sm font-medium hover:bg-[#f5eefe] transition-colors shadow-sm flex-shrink-0"
            >
              Visit Official Website
              <ExternalLink className="w-4 h-4" />
            </a>
          </div>
        )}
      </ContentWrapper>
    </section>
  );
}
