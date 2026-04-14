"use client";

import Link from "next/link";
import Image from "next/image";
import { useColleges } from "@/hooks/college/useColleges";
import { useCourses } from "@/hooks/course/useCourses";
import { useExams } from "@/hooks/exam/useExams";
import { useScholarships } from "@/hooks/scholarship/useScholarships";
interface FooterLink {
  href: string;
  text: string;
}

interface FooterSection {
  title: string;
  links: FooterLink[];
  width: string;
  overflowClip?: boolean;
  titleWidth?: string;
}

const footerSections: FooterSection[] = [
  {
    title: "Explore Colleges",
    width: "w-full md:w-[160px]",
    titleWidth: "w-full",
    links: [
      { href: "/colleges", text: "Top Colleges in India" },
      { href: "/colleges?city=Delhi", text: "Colleges in Delhi" },
      { href: "/colleges?city=Maharashtra", text: "Colleges in Maharashtra" },
      { href: "/colleges?city=Karnataka", text: "Colleges in Karnataka" },
      { href: "/colleges?city=Tamil Nadu", text: "Colleges in Tamil Nadu" },
      { href: "/colleges?city=Uttar Pradesh", text: "Colleges in Uttar Pradesh" },
      { href: "/colleges?city=West Bengal", text: "Colleges in West Bengal" },
      { href: "/colleges?city=Telangana", text: "Colleges in Telangana" },
      { href: "/colleges?city=Kerala", text: "Colleges in Kerala" },
      { href: "/colleges?city=Gujarat", text: "Colleges in Gujarat" },
    ],
  },
  {
    title: "Courses",
    width: "w-full md:w-[320px]",
    links: [
      { href: "/courses", text: "B.Tech Computer Science" },
      { href: "/courses", text: "MBA" },
      { href: "/courses", text: "MBBS" },
      { href: "/courses", text: "B.Tech ECE" },
      { href: "/courses", text: "BBA" },
      { href: "/courses", text: "B.Com Honours" },
      { href: "/courses", text: "BA LLB" },
      { href: "/courses", text: "B.Des" },
      { href: "/courses", text: "BCA" },
      { href: "/courses", text: "B.Pharm" },
    ],
  },
  {
    title: "Exams",
    width: "w-full md:w-[110px]",
    links: [
      { href: "/exams", text: "JEE Main" },
      { href: "/exams", text: "JEE Advanced" },
      { href: "/exams", text: "NEET UG" },
      { href: "/exams", text: "CAT" },
      { href: "/exams", text: "GATE" },
      { href: "/exams", text: "CUET UG" },
      { href: "/exams", text: "CLAT" },
      { href: "/exams", text: "BITSAT" },
    ],
  },
  {
    title: "Scholarships",
    width: "w-full md:w-[160px]",
    links: [
      { href: "/scholarships", text: "INSPIRE Scholarship" },
      { href: "/scholarships", text: "Central Sector Scheme" },
      { href: "/scholarships", text: "Post Matric SC/ST" },
      { href: "/scholarships", text: "AICTE Pragati (Girls)" },
      { href: "/scholarships", text: "Maulana Azad Fellowship" },
      { href: "/scholarships", text: "Reliance Foundation" },
      { href: "/scholarships", text: "Tata Trusts" },
      { href: "/scholarships", text: "All Scholarships" },
    ],
  },
  {
    title: "About",
    width: "w-full md:w-[140px]",
    links: [
      { href: "/about", text: "About Us" },
      { href: "/career", text: "Careers" },
      { href: "/about", text: "Contact" },
      { href: "/colleges/compare", text: "Compare Colleges" },
      { href: "/jobs-internships", text: "Jobs & Internships" },
      { href: "/blog", text: "Blogs" },
      { href: "/colleges", text: "All Colleges" },
      { href: "/login", text: "Login" },
    ],
  },
];

interface SocialMedia {
  name: string;
  href: string;
  icon: string;
  ariaLabel: string;
}

const socialMediaLinks: SocialMedia[] = [
  {
    name: "Facebook",
    href: "https://www.facebook.com/profile.php?id=61582068009039",
    icon: "/icon/darkfacebook.svg",
    ariaLabel: "Facebook",
  },
  // {
  //   name: "LinkedIn",
  //   href: "#",
  //   icon: "/icon/greylinked.svg",
  //   ariaLabel: "LinkedIn",
  // },
  {
    name: "Instagram",
    href: "https://www.instagram.com/clarixeducation?igsh=MTV3dW5sanBjaHFxaw%3D%3D",
    icon: "/icon/greyinstagram.svg",
    ariaLabel: "Instagram",
  },
  {
    name: "YouTube",
    href: "https://www.youtube.com/@ClarixEducation",
    icon: "/icon/greyyoutube.svg",
    ariaLabel: "YouTube",
  },
  // {
  //   name: "Twitter",
  //   href: "#",
  //   icon: "/icon/greytwitter.svg",
  //   ariaLabel: "Twitter",
  // },
];

export default function FooterMain() {
  const year = new Date().getFullYear();
  const { colleges } = useColleges({ limit: 10 });
  const { courses } = useCourses({ limit: 10 });
  const { data: examsData } = useExams(1, 10);
  const exams = examsData?.data?.exams;
  const { scholarships } = useScholarships({ limit: 10 });

  const dynamicFooterSections = footerSections.map((section) => {
    if (section.title === "Explore Colleges" && colleges && colleges.length > 0) {
      return {
        ...section,
        links: colleges.slice(0, 10).map((college: any) => ({
          href: `/colleges/${college._id}`,
          text: college.name || college.collegeName || "College",
        })),
      };
    }
    if (section.title === "Courses" && courses && courses.length > 0) {
      return {
        ...section,
        links: courses.slice(0, 10).map((course: any) => ({
          href: `/courses/${course._id}`,
          text: course.name || course.courseFullname || "Course",
        })),
      };
    }
    if (section.title === "Exams" && exams && exams.length > 0) {
      return {
        ...section,
        links: exams.slice(0, 10).map((exam: any) => ({
          href: `/exams/${exam._id}`,
          text: exam.shortName || exam.fullName || "Exam",
        })),
      };
    }
    if (section.title === "Scholarships" && scholarships && scholarships.length > 0) {
      return {
        ...section,
        links: scholarships.slice(0, 10).map((scholarship: any) => ({
          href: `/scholarships`, // Assuming no detail page yet, linking to main list
          text: scholarship.scholarshipName || "Scholarship",
        })),
      };
    }
    return section;
  });



  return (
    <div className="flex flex-col gap-4 md:gap-10 items-start relative w-full py-8 pt-4 md:pt-16">
      {/* Top Section: Logo and Navigation Links */}
      <div className="flex flex-col gap-4 md:gap-10 items-end relative w-full">
        <div className="flex flex-col md:flex-row gap-8 md:gap-12 items-start relative w-full">
          {/* Logo */}
          <div className="h-[50px] relative shrink-0 w-[130px]">
            <Image
              alt="Clarix Education Logo"
              className="block max-w-none size-full"
              src="/images/log.png"
              width={130}
              height={50}
            />
          </div>

          {/* Navigation Columns */}
          <div className="grid grid-cols-2 xl:flex xl:flex-nowrap gap-4 md:gap-8 xl:gap-8 items-start xl:justify-between relative flex-1">
            {dynamicFooterSections.map((section, index) => (
              <div
                key={index}
                className={`flex flex-col gap-4 items-start px-0 py-[3px] relative shrink-0 text-base tracking-[-0.32px] ${section.width
                  } ${section.overflowClip ? "overflow-clip" : ""}`}
              >
                <p
                  className={`font-poppins font-medium leading-5 text-sm relative shrink-0 text-[#767e92] uppercase ${section.titleWidth || "whitespace-nowrap"
                    }`}
                >
                  {section.title}
                </p>
                <div className="font-poppins font-normal leading-7 relative shrink-0 text-[#162447] w-full text-[12px] sm:text-sm">
                  {section.links.map((link, linkIndex) => (
                    <Link
                      key={linkIndex}
                      href={link.href}
                      className={`flex items-start gap-2 ${linkIndex < section.links.length - 1 ? "mb-0" : ""
                        } hover:text-[#513392] transition-colors py-0.5 md:py-0`}
                    >
                      <span className="md:hidden text-[#767e92] text-xs mt-1.5">•</span>
                      <span className="flex-1">{link.text}</span>
                    </Link>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Email Subscription */}
        <div className="bg-[#f6f7ff] border-[0.5px] border-[rgba(147,97,255,0.2)] border-solid flex flex-row gap-2 sm:gap-3 items-center justify-center pl-3 sm:pl-5 pr-1 py-1 relative rounded-[90px] shrink-0 w-full sm:w-auto sm:min-w-[500px]">
          <input
            type="email"
            placeholder="Your email address"
            aria-label="Email address for newsletter subscription"
            required
            className="font-poppins font-normal leading-5 relative shrink-0 text-[#767e92] text-[13px] sm:text-sm bg-transparent border-none outline-none flex-1 min-w-0 px-1 sm:px-2 py-1.5"
          />
          <button className="bg-[#513392] flex items-center justify-center px-5 py-2 relative rounded-[50px] shrink-0 hover:bg-[#3f2672] transition-colors cursor-pointer">
            <p className="font-poppins font-normal leading-5 relative shrink-0 text-sm whitespace-nowrap text-white">
              Subscribe
            </p>
          </button>
        </div>
      </div>

      {/* Bottom Section: Copyright and Social Media */}
      <div className="flex flex-wrap gap-4 md:gap-10 items-end relative shrink-0 w-full">
        {/* Divider Line */}
        <div className="h-px bg-[#767e92] opacity-20 w-full"></div>

        {/* Copyright and Social Links */}
        <div className="flex  flex-col-reverse md:flex-row gap-6 sm:gap-[89px] items-start sm:items-center justify-between w-full">
          {/* Copyright and Legal Links */}
          <div className="flex flex-wrap gap-2 md:gap-6 items-center">
            <p className="font-poppins font-normal leading-5 relative shrink-0 text-[#767e92] text-[11px] sm:text-sm">
              © {year} Clarix Education. All rights reserved.
            </p>
            <div className="h-3 w-px bg-[#767e92] opacity-50"></div>
            <Link
              href="/privacy-policy"
              className="font-poppins font-normal leading-5 relative shrink-0 text-[#767e92] text-[11px] sm:text-sm hover:text-[#513392] transition-colors"
            >
              Privacy Policy
            </Link>
            <div className="h-3 w-px bg-[#767e92] opacity-50"></div>
            <Link
              href="/terms"
              className="font-poppins font-normal leading-5 relative shrink-0 text-[#767e92] text-[11px] sm:text-sm hover:text-[#513392] transition-colors"
            >
              Terms & Conditions
            </Link>
            <div className="h-3 w-px bg-[#767e92] opacity-50"></div>
            <Link
              href="/disclaimer"
              className="font-poppins font-normal leading-5 relative shrink-0 text-[#767e92] text-[11px] sm:text-sm hover:text-[#513392] transition-colors"
            >
              Disclaimer
            </Link>
          </div>

          {/* Social Media Icons */}
          <div className="flex gap-[26px] items-center relative shrink-0">
            {socialMediaLinks.map((social) => (
              <a
                key={social.name}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                className="relative shrink-0 size-5 hover:opacity-70 transition-opacity"
                aria-label={social.ariaLabel}
              >
                <Image
                  alt={social.name}
                  className="block max-w-none size-full"
                  src={social.icon}
                  width={20}
                  height={20}
                />
              </a>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
