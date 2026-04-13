import ContentWrapper from "@/components/Ui/ContentWrapper";

const features = [
  {
    id: 1,
    title: "Industry-Oriented Curriculum",
    description:
      "A curriculum designed in consultation with industry experts to ensure you learn the most relevant and in-demand skills. The program includes modern subjects such as artificial intelligence, cloud computing, machine learning, cybersecurity, data science, and full-stack development. The course structure is regularly reviewed to keep pace with global technology trends and employer expectations.",
  },
  {
    id: 2,
    title: "Practical Labs & Real-World Projects",
    description:
      "Hands-on learning is a major focus. You'll work on lab experiments, coding assignments, mini-projects, and live industry projects that simulate real-world challenges. Many colleges include hackathons, project exhibitions, hardware labs, and collaboration with tech companies for real-time problem-solving.",
  },
  {
    id: 3,
    title: "High Placement Potential",
    description:
      "Computer Science & Engineering is one of the highest-placed engineering branches in India. Students get opportunities in IT services, product companies, tech startups, fintech, AI companies, and global MNCs. Dedicated placement training, mock interviews, aptitude sessions, and resume-building workshops help students achieve better outcomes.",
  },
  {
    id: 4,
    title: "Experienced & Supportive Faculty",
    description:
      "The course is taught by highly qualified professors, industry professionals, and guest lecturers with years of experience in teaching and research. Faculty members guide students through projects, research work, internships, and career-building activities.",
  },
  {
    id: 5,
    title: "Internships With Top Companies",
    description:
      "Students get internship opportunities in leading organizations such as TCS, Infosys, Wipro, Deloitte, Amazon, Zoho, and fast-growing startups. Internships help students gain practical exposure, understand workplace culture, and improve employability.",
  },
  {
    id: 6,
    title: "Access to Coding Clubs, Competitions & Tech Communities",
    description:
      "Many institutions offer coding clubs, technical societies, innovation labs, robotics clubs, and student chapters (like IEEE, ACM, Google Developer Groups). Students participate in hackathons, coding contests, tech fests, and seminars.",
  },
];

export default function WhyChooseSection({ course }: any) {
  return (
    <section className="w-full bg-[#f6f7ff] py-8 md:py-16">
      <ContentWrapper className="flex flex-col gap-8 md:gap-10">
        {/* Header */}
        <div className="flex flex-col gap-4 md:gap-6 items-center text-center">
          <h2 className="font-helvetica font-medium leading-[32px] md:leading-[48px] text-[#162447] text-[22px] md:text-[40px] lg:text-[48px] tracking-[-0.96px]">
            {course?.whyChoose?.title}
          </h2>
          <p className="font-poppins text-[16px] leading-[20px] text-[#767e92]">
            {course?.whyChoose?.description}
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-[22px]">
          {course?.whyChoose?.reasons?.map((feature: any) => (
            <div
              key={feature.id}
              className="bg-white rounded-[20px] p-5 md:p-[34px] h-auto md:h-[300px] flex flex-col gap-4 md:gap-6 shadow-[0px_6px_42.4px_0px_rgba(0,0,0,0.03)] md:overflow-hidden"
            >
              <h3 className="font-helvetica font-medium leading-tight md:leading-[28px] text-[#162447] text-[20px] md:text-[24px] tracking-[-0.48px]">
                {feature.title}
              </h3>
              <p className="font-poppins text-[16px] leading-[20px] text-[#767e92]">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </ContentWrapper>
    </section>
  );
}
