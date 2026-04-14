"use client";

import ContentWrapper from "@/components/Ui/ContentWrapper";
import SectionHeading from "@/components/common/Section/SectionHeading";
import SectionDescription from "@/components/common/Section/SectionDescription";
import Accordion from "@/components/common/Accordion/Accordion";



export default function CurriculumSection({ course }: any) {
  const semestersData = course?.syllabus?.semesters || [];

  const accordionItems = semestersData.map((semester: any, index: number) => {
    const topicsList = Array.isArray(semester.topics)
      ? semester.topics
      : semester.topics
        ? semester.topics.split("\n").map((t: string) => t.trim()).filter(Boolean)
        : [];

    const hasDetails = !!semester.title || topicsList.length > 0;
    const code = String.fromCharCode(65 + index); // A, B, C...

    return {
      id: index + 1,
      header: (
        <>
          <div className="flex h-8 w-8 items-center justify-center rounded-[20px] bg-[#513392]">
            <span className="font-poppins text-[14px] leading-[20px] text-white">
              {code}
            </span>
          </div>
          <p className="font-poppins font-medium text-[18px] md:text-[20px] leading-[28px] tracking-[-0.48px] text-[#162447]">
            Semester {index + 1}
          </p>
        </>
      ),
      content: hasDetails ? (
        <>
          <h3 className="font-poppins font-medium text-[18px] md:text-[20px] leading-[28px] tracking-[-0.4px] text-[#162447] mb-3">
            {semester.title}
          </h3>
          <ul className="flex flex-col gap-2">
            {topicsList.map((subject: string, idx: number) => (
              <li
                key={idx}
                className="flex items-center gap-3 font-poppins text-[14px] md:text-[16px] leading-[20px] text-[#767e92]"
              >
                <span className="h-1.5 w-1.5 rounded-full bg-[#513392]" />
                <span>{subject}</span>
              </li>
            ))}
          </ul>
        </>
      ) : (
        <p className="font-poppins text-[14px] md:text-[16px] leading-[20px] text-[#767e92]">
          Curriculum details coming soon...
        </p>
      ),
      disabled: !hasDetails,
    };
  });

  return (
    <section className="w-full bg-[#f6f7ff] py-8 md:py-16">
      <ContentWrapper className="flex flex-col items-center gap-8 md:gap-10">
        {/* Header */}
        <div className="flex flex-col items-center gap-3 text-center">
          <SectionHeading title="Course Curriculum & Syllabus" />
          <SectionDescription>
            Curriculum is updated every year based on industry feedback
          </SectionDescription>
        </div>

        {/* Semesters List */}
        <div className="w-full max-w-[949px]">
          <Accordion
            items={accordionItems}
            allowMultiple={true}
            defaultExpanded={[1]}
          />
        </div>
      </ContentWrapper>
    </section>
  );
}
