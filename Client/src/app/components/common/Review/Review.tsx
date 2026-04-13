import ContentWrapper from "@/components/Ui/ContentWrapper";
import ReviewCard from "./ReviewCard";
import { FAQ_DUMMY_STUDENT_REVIEWS } from "@/app/utilities/DummyData";
import SectionHeading from "@/components/common/Section/SectionHeading";
import SectionDescription from "@/components/common/Section/SectionDescription";

export default function Review() {
  return (
    <section className="bg-[var(--background)] md:py-10 py-2">
      <ContentWrapper>
        <div className="flex flex-col gap-4 items-center justify-center">
          <SectionHeading
            title="Student Reviews MIT College of Engineering"
            className="!max-w-[32rem]"
          />
          <SectionDescription className="max-w-[47rem]">
            Read authentic reviews from real students sharing their experiences
            with academics, faculty, campus life, and placements. Every review
            is verified to help you make confident decisions.
          </SectionDescription>
        </div>
        <div className="columns-1 md:columns-2 lg:columns-3 gap-6 my-[1.25rem]">
          {FAQ_DUMMY_STUDENT_REVIEWS.map((review: any, index: number) => (
            <div
              key={`${review.name}-${index}`}
              className="break-inside-avoid mb-6"
            >
              <ReviewCard {...review} />
            </div>
          ))}
        </div>
      </ContentWrapper>
    </section>
  );
}
