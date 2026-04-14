import {
  BallIcon,
  BookIcon,
  CoffeeIcon,
  GraduationCapIcon,
  HostelIcon,
  LabIcon,
} from "@/components/common/Icons";

export const faqsDummyData = [
  {
    question: "How do I choose the best college?",
    answer:
      "Check rankings, placements, fees, student reviews, accreditation, and faculty experience. Consider factors like location, campus facilities, industry connections, and alumni network.",
  },
  {
    question: "Which stream has the highest placement?",
    answer:
      "Engineering, Computer Science, and Management streams often see higher placement rates, but it varies by college, specialization, and industry demand.",
  },
  {
    question: "Can I compare colleges on Clarix?",
    answer:
      "Yes, you can compare colleges on fees, cutoffs, approvals, placements, courses, and more to find the right match for your goals.",
  },
  {
    question: "Are all colleges verified?",
    answer:
      "We work with verified data sources, regulatory approvals, and authentic student reviews to ensure colleges listed on Clarix are credible.",
  },
  {
    question: "How do I apply?",
    answer:
      "You can explore a college, review its details, and follow the application or enquiry links provided for each institute on Clarix.",
  },
];

export const coursesFaqsData = [
  {
    question: "Which course is best after 12th?",
    answer:
      "Check rankings, placements, fees, student reviews, accreditation, and faculty experience. Consider factors like location, campus facilities, industry connections, and alumni network.",
  },
  {
    question: "Which course offers the highest salary?",
    answer:
      "Engineering courses like Computer Science, Electronics, and Mechanical Engineering typically offer the highest starting salaries, followed by Management courses like MBA. However, salary potential also depends on the college's reputation, industry demand, and your specialization.",
  },
  {
    question: "Which courses have no entrance exam?",
    answer:
      "Many colleges offer direct admission based on 12th board exam scores for courses like BBA, B.Com, BA, B.Sc (some streams), and certain diploma programs. However, top-tier colleges and professional courses like Engineering and Medicine usually require entrance exams.",
  },
  {
    question: "Which course is best for government jobs?",
    answer:
      "Courses that align well with government job requirements include Engineering (for technical positions), B.Com/CA (for finance roles), BA (for administrative positions), and Law. Many government exams are open to graduates from any stream, but specific courses can give you an advantage in specialized roles.",
  },
  {
    question: "Which UG course is most popular?",
    answer:
      "B.Tech in Computer Science and Engineering is currently the most popular undergraduate course, followed by BBA, B.Com, and other Engineering streams. Popularity is driven by job prospects, salary potential, and industry demand.",
  },
];

export const faqsSectionedData = [
  {
    sectionTitle: "Admission FAQs",
    questions: [
      {
        question: "How can I apply for admission to this college?",
        answer:
          "You can apply online through the college's official portal or the Clarix application link provided on this page.",
      },
      {
        question: "What entrance exams are accepted?",
        answer:
          "The college accepts scores from JEE Main, MHT-CET, and other state-level entrance exams. Specific requirements vary by course.",
      },
      {
        question: "What is the minimum eligibility for UG courses?",
        answer:
          "For undergraduate courses, you need to have completed 10+2 with a minimum of 50% aggregate marks in relevant subjects. Specific requirements may vary by course.",
      },
      {
        question: "Is there a management quota?",
        answer:
          "Yes, the college offers a management quota for certain seats. Please contact the admission office for details on availability and eligibility criteria.",
      },
    ],
  },
  {
    sectionTitle: "Courses FAQs",
    questions: [
      {
        question: "Are all courses approved by UGC/AICTE?",
        answer:
          "Yes, all listed programs are officially approved and regularly updated.",
      },
      {
        question: "Is the syllabus updated annually?",
        answer:
          "Yes, the curriculum is reviewed and updated annually to align with industry standards and technological advancements.",
      },
      {
        question: "Are there certificate or value-added courses?",
        answer:
          "Yes, the college offers various certificate and value-added courses in addition to regular degree programs. Check the course section for details.",
      },
    ],
  },
  {
    sectionTitle: "FEES & PAYMENT - FAQs",
    questions: [
      {
        question: "What is the annual tuition fee?",
        answer:
          "The annual tuition fee varies by course. Please refer to the fee structure section on this page for detailed information about specific programs.",
      },
      {
        question: "Are hostel and mess fees included in tuition?",
        answer:
          "No, hostel and mess fees are separate from tuition fees. They are charged additionally and can be paid separately.",
      },
      {
        question: "Can I pay the fees in installments?",
        answer:
          "Yes, the college offers flexible payment options including installment plans. Please contact the finance office for details on payment schedules.",
      },
    ],
  },
  {
    sectionTitle: "SCHOLARSHIPS - FAQS",
    questions: [
      {
        question: "What scholarships are available?",
        answer:
          "The college offers merit-based scholarships, need-based financial aid, sports scholarships, and special category scholarships. Details are available in the scholarships section.",
      },
      {
        question: "How do I know if I'm eligible?",
        answer:
          "Eligibility criteria vary by scholarship type. Check the scholarships section or contact the financial aid office for specific eligibility requirements.",
      },
      {
        question: "Are there fee waivers for economically weaker students?",
        answer:
          "Yes, the college provides fee waivers and financial assistance for economically weaker students based on income criteria and merit.",
      },
    ],
  },
];

export const FEE_TIMELINE_ITEMS = [
  { label: "B.Tech (CSE)", value: "₹120,000", duration: "4 years" },
  { label: "BBA", value: "₹75,000", duration: "3 years" },
  { label: "B.Sc", value: "₹55,000", duration: "3 years" },
  { label: "MBA", value: "₹180,000", duration: "2 years" },
  { label: "M.Tech (CSE)", value: "₹140,000", duration: "2 years" },
  { label: "M.Sc", value: "₹65,000", duration: "2 years" },
];

export const SCHOLARSHIP_ITEMS = [
  {
    label: "Merit Scholarship",
    value: "Top 10% students",
    duration: "Up to 50%",
  },
  {
    label: "Need-based Aid",
    value: "Family income < ₹3 LPA",
    duration: "Up to 100%",
  },
  {
    label: "Sports Quota",
    value: "State/National level",
    duration: "Up to 75%",
  },
  {
    label: "Girl Child Scholarship",
    value: "All female students",
    duration: "10%",
  },
  {
    label: "Artistic Excellence Grant",
    value: "Outstanding artistic talent",
    duration: "Up to 60%",
  },
  {
    label: "STEM Initiative Scholarship",
    value: "Pursuing STEM fields",
    duration: "Up to 30%",
  },
];

export const ANNUAL_FEE_ITEMS = [
  {
    label: "Avg Annual Tuition",
    value: "₹2,50,000",
    icon: <GraduationCapIcon width={24} height={24} />,
  },
  {
    label: "Hostel Fees",
    value: "₹80,000",
    icon: <HostelIcon width={24} height={24} />,
  },
  {
    label: "Mess Charges",
    value: "₹30,000",
    icon: <CoffeeIcon width={24} height={24} />,
  },
  {
    label: "Library Fees",
    value: "₹5,000",
    icon: <BookIcon width={24} height={24} />,
  },
  {
    label: "Laboratory Fees",
    value: "₹15,000",
    icon: <LabIcon width={24} height={24} />,
  },
  {
    label: "Sports Fees",
    value: "₹10,000",
    icon: <BallIcon width={24} height={24} />,
  },
];

export const PLACEMENT_TRENDS_STATS = [
  { year: "2020", salary: "₹6.5 LPA", percentage: 20 },
  { year: "2021", salary: "₹7.2 LPA", percentage: 30 },
  { year: "2022", salary: "₹7.8 LPA", percentage: 40 },
  { year: "2023", salary: "₹8.1 LPA", percentage: 50 },
  { year: "2024", salary: "₹8.5 LPA", percentage: 60 },
];

export const INTERNSHIP_OPPORTUNITIES_STATS = [
  { label: "Students with internships", value: "78%" },
  {
    label: "Average stipend",
    value: "₹25,000/month",
    isBadge: true,
    badgeColor: "green",
  },
  { label: "PPO conversion rate", value: "98%" },
];

export const ALUMNI_SUCCESS_STORIES_STATS = [
  { label: "Working at Fortune 500 ", value: "45%" },
  { label: "Entrepreneurs ", value: "12%" },
  { label: "Higher studies abroad", value: "28%" },
];

export const examsFaqsData = [
  {
    question: "How do I register for an exam?",
    answer:
      "Check rankings, placements, fees, student reviews, accreditation, and faculty experience. Consider factors like location, campus facilities, industry connections, and alumni network.",
  },
  {
    question: "When will the admit cards be released?",
    answer:
      "Admit cards are typically released 1-2 weeks before the exam date. You'll receive notifications via email and SMS, and can download them from the official exam website using your registration credentials.",
  },
  {
    question: "How can I check my exam results?",
    answer:
      "Results are usually announced on the official exam website. You'll need your roll number, registration number, or date of birth to access your results. Some exams also send results via email or SMS.",
  },
  {
    question: "What documents are required for exam registration?",
    answer:
      "Common documents include: 10th and 12th mark sheets, identity proof (Aadhaar, PAN, or passport), passport-size photographs, category certificate (if applicable), and signature. Check the specific exam's official notification for exact requirements.",
  },
  {
    question: "Can I appear for multiple exams simultaneously?",
    answer:
      "Yes, you can appear for multiple exams as long as their dates don't clash. Many students prepare for and appear in multiple entrance exams to increase their admission opportunities. However, ensure you can manage preparation time effectively.",
  },
];

export const scholarshipsFaqsData = [
  {
    question: "How do I apply for a scholarship?",
    answer:
      "You can apply for scholarships through the official portals like National Scholarship Portal (NSP) or directly through the scholarship provider's website. Register, fill out the application form, upload required documents, and submit before the deadline. Use our 'Check Eligibility' feature to see if you qualify.",
  },
  {
    question: "What documents are needed for scholarship applications?",
    answer:
      "Common documents include: 10th and 12th mark sheets, income certificate, caste certificate (if applicable), Aadhaar card, bank account details, passport-size photographs, and domicile certificate. Requirements may vary by scholarship type, so check the specific scholarship details.",
  },
  {
    question: "Can I apply for multiple scholarships?",
    answer:
      "Yes, you can apply for multiple scholarships as long as you meet the eligibility criteria for each. However, some scholarships may have restrictions on receiving multiple awards simultaneously. Always check the terms and conditions of each scholarship.",
  },
  {
    question: "When are scholarship applications typically open?",
    answer:
      "Scholarship application periods vary by provider. Government scholarships usually open between June-September, while private scholarships may have different timelines. Check our scholarship listings for current deadlines and application periods.",
  },
  {
    question: "How is scholarship renewal handled?",
    answer:
      "Most scholarships require annual renewal. You typically need to maintain a minimum percentage of marks (often 50-60%), maintain good attendance, and submit progress reports. Renewal applications are usually submitted through the same portal where you initially applied.",
  },
];

export const jobsInternshipsFaqsData = [
  {
    question: "Are jobs verified on Clarix?",
    answer:
      "Yes, all job listings on Clarix are verified. We work directly with verified colleges and recruiters to ensure that every job posting is legitimate and up-to-date. Our team reviews each listing before it goes live to maintain quality and prevent fraudulent postings.",
  },
  {
    question: "Can freshers apply?",
    answer:
      "Absolutely! Many job listings on Clarix are specifically for freshers and entry-level positions. You can filter job listings by experience level to find opportunities that match your background. We also have dedicated sections for internships and graduate programs.",
  },
  {
    question: "Is applying free?",
    answer:
      "Yes, applying for jobs through Clarix is completely free. There are no hidden fees or charges. You can browse all job listings, create a profile, and apply to as many positions as you want without any cost.",
  },
  {
    question: "Can I get job alerts?",
    answer:
      "Yes! You can set up job alerts based on your preferences including job type, location, salary range, and industry. We'll notify you via email when new jobs matching your criteria are posted. You can manage your alerts from your profile settings.",
  },
  {
    question: "How do I create a profile?",
    answer:
      "Creating a profile is simple and free. Click on 'Sign Up' or 'Create Profile' on the top right, fill in your basic information, upload your resume, and add your skills and experience. A complete profile increases your chances of being noticed by recruiters.",
  },
];

export const courseDetailFaqsData = [
  {
    question: "How can I apply for admission to this course?",
    answer:
      "The B.Tech program is 4 years long, divided into 8 semesters. To apply, you need to appear for entrance exams like JEE Main, JEE Advanced, or state-level CET exams. After qualifying, you can participate in the counseling process where you'll select colleges and courses based on your rank. Some colleges also offer direct admission based on 12th board exam scores.",
  },
  {
    question: "Are internships mandatory?",
    answer:
      "Yes, internships are typically mandatory for most engineering and professional courses. They are usually scheduled during the summer breaks between academic years. Internships provide practical industry experience and are often a requirement for course completion. Some colleges also offer credit-based internship programs.",
  },
  {
    question: "What is the fee structure for the B.Tech program?",
    answer:
      "The fee structure varies by college and can range from ₹50,000 to ₹5,00,000 per year depending on whether it's a government or private institution. Government colleges typically charge ₹50,000-₹2,00,000 per year, while private colleges may charge ₹2,00,000-₹5,00,000 per year. Additional charges may include hostel fees, mess charges, and other amenities.",
  },
  {
    question: "Are there any scholarships available for students?",
    answer:
      "Yes, various scholarships are available including merit-based scholarships for top-performing students, need-based financial aid for economically disadvantaged students, government scholarships like NSP, Pragati, and Saksham, as well as college-specific scholarships. Eligibility criteria and application processes vary by scholarship type.",
  },
  {
    question: "What are the placement opportunities like for graduates?",
    answer:
      "Placement opportunities are excellent for this course, with top colleges reporting 80-95% placement rates. Major recruiters include leading tech companies, MNCs, and startups. Average starting salaries range from ₹4-12 LPA depending on the college reputation and student performance. Top performers often receive packages exceeding ₹20 LPA.",
  },
];

// Sample course data - replace with actual data from API/database
export const coursesDummyData = [
  {
    id: 1,
    title: "B.Tech in Computer Science & Engineering",
    stream: "Engineering",
    type: "Degree (Full-Time)",
    entranceExams: ["JEE Main", "JEE Advanced", "State CET", "CUET"],
    topSpecialisations: ["CSE", "ECE", "Mechanical", "IT", "Civil"],
    topColleges: ["IITs", "NITs", "VIT", "SRM", "MIT"],
    collegeCount: 3521,
  },
  {
    id: 2,
    title: "B.Tech in Computer Science & Engineering",
    stream: "Engineering",
    type: "Degree (Full-Time)",
    entranceExams: ["JEE Main", "JEE Advanced", "State CET", "CUET"],
    topSpecialisations: ["CSE", "ECE", "Mechanical", "IT", "Civil"],
    topColleges: ["IITs", "NITs", "VIT", "SRM", "MIT"],
    collegeCount: 3521,
  },
  {
    id: 3,
    title: "B.Tech in Computer Science & Engineering",
    stream: "Engineering",
    type: "Degree (Full-Time)",
    entranceExams: ["JEE Main", "JEE Advanced", "State CET", "CUET"],
    topSpecialisations: ["CSE", "ECE", "Mechanical", "IT", "Civil"],
    topColleges: ["IITs", "NITs", "VIT", "SRM", "MIT"],
    collegeCount: 3521,
  },
  {
    id: 4,
    title: "B.Tech in Computer Science & Engineering",
    stream: "Engineering",
    type: "Degree (Full-Time)",
    entranceExams: ["JEE Main", "JEE Advanced", "State CET", "CUET"],
    topSpecialisations: ["CSE", "ECE", "Mechanical", "IT", "Civil"],
    topColleges: ["IITs", "NITs", "VIT", "SRM", "MIT"],
    collegeCount: 3521,
  },
  {
    id: 5,
    title: "B.Tech in Computer Science & Engineering",
    stream: "Engineering",
    type: "Degree (Full-Time)",
    entranceExams: ["JEE Main", "JEE Advanced", "State CET", "CUET"],
    topSpecialisations: ["CSE", "ECE", "Mechanical", "IT", "Civil"],
    topColleges: ["IITs", "NITs", "VIT", "SRM", "MIT"],
    collegeCount: 3521,
  },
  {
    id: 6,
    title: "B.Tech in Computer Science & Engineering",
    stream: "Engineering",
    type: "Degree (Full-Time)",
    entranceExams: ["JEE Main", "JEE Advanced", "State CET", "CUET"],
    topSpecialisations: ["CSE", "ECE", "Mechanical", "IT", "Civil"],
    topColleges: ["IITs", "NITs", "VIT", "SRM", "MIT"],
    collegeCount: 3521,
  },
  {
    id: 7,
    title: "B.Tech in Computer Science & Engineering",
    stream: "Engineering",
    type: "Degree (Full-Time)",
    entranceExams: ["JEE Main", "JEE Advanced", "State CET", "CUET"],
    topSpecialisations: ["CSE", "ECE", "Mechanical", "IT", "Civil"],
    topColleges: ["IITs", "NITs", "VIT", "SRM", "MIT"],
    collegeCount: 3521,
  },
  {
    id: 8,
    title: "B.Tech in Computer Science & Engineering",
    stream: "Engineering",
    type: "Degree (Full-Time)",
    entranceExams: ["JEE Main", "JEE Advanced", "State CET", "CUET"],
    topSpecialisations: ["CSE", "ECE", "Mechanical", "IT", "Civil"],
    topColleges: ["IITs", "NITs", "VIT", "SRM", "MIT"],
    collegeCount: 3521,
  },
  {
    id: 9,
    title: "B.Tech in Computer Science & Engineering",
    stream: "Engineering",
    type: "Degree (Full-Time)",
    entranceExams: ["JEE Main", "JEE Advanced", "State CET", "CUET"],
    topSpecialisations: ["CSE", "ECE", "Mechanical", "IT", "Civil"],
    topColleges: ["IITs", "NITs", "VIT", "SRM", "MIT"],
    collegeCount: 3521,
  },
  {
    id: 10,
    title: "B.Tech in Computer Science & Engineering",
    stream: "Engineering",
    type: "Degree (Full-Time)",
    entranceExams: ["JEE Main", "JEE Advanced", "State CET", "CUET"],
    topSpecialisations: ["CSE", "ECE", "Mechanical", "IT", "Civil"],
    topColleges: ["IITs", "NITs", "VIT", "SRM", "MIT"],
    collegeCount: 3521,
  },
  {
    id: 11,
    title: "B.Tech in Computer Science & Engineering",
    stream: "Engineering",
    type: "Degree (Full-Time)",
    entranceExams: ["JEE Main", "JEE Advanced", "State CET", "CUET"],
    topSpecialisations: ["CSE", "ECE", "Mechanical", "IT", "Civil"],
    topColleges: ["IITs", "NITs", "VIT", "SRM", "MIT"],
    collegeCount: 3521,
  },
  {
    id: 12,
    title: "B.Tech in Computer Science & Engineering",
    stream: "Engineering",
    type: "Degree (Full-Time)",
    entranceExams: ["JEE Main", "JEE Advanced", "State CET", "CUET"],
    topSpecialisations: ["CSE", "ECE", "Mechanical", "IT", "Civil"],
    topColleges: ["IITs", "NITs", "VIT", "SRM", "MIT"],
    collegeCount: 3521,
  },
];
export const CAMPUS_LIFE_DATA = [
  {
    title: "Hostel Life",
    count: 1,
    pills: [
      "24/7 Security",
      "Wi-Fi Enabled",
      "Mess Facility",
      "Recreation Room",
    ],
    description:
      "Separate boys and girls hostels with 24/7 security, Wi-Fi, and recreational facilities. Well-furnished rooms with modern amenities.",
  },
  {
    title: "Labs & Classrooms",
    count: 2,
    pills: [
      "Smart Boards",
      "High-speed Internet",
      "Research Labs",
      "AC Classrooms",
    ],
    description:
      "State-of-the-art laboratories and smart classrooms equipped with latest technology and tools for hands-on learning.",
  },
  {
    title: "Clubs & Societies",
    count: 3,
    pills: [
      "Technical Clubs",
      "Cultural Societies",
      "Social Service",
      "Entrepreneurship",
    ],
    description:
      "Over 40+ active clubs covering technical, cultural, sports, and social activities. Students can join multiple clubs.",
  },
  {
    title: "Sports Activities",
    count: 4,
    pills: ["Cricket Ground", "Basketball Court", "Gym", "Indoor Games"],
    description:
      "Excellent sports infrastructure with indoor and outdoor facilities. Regular inter-college competitions and tournaments.",
  },
  {
    title: "Cultural Events",
    count: 5,
    pills: ["Annual Fest", "Tech Symposium", "Workshops", "Guest Lectures"],
    description:
      "State-of-the-art laboratories and smart classrooms equipped with latest technology and tools for hands-on learning.",
  },
  {
    title: "Innovation Lab",
    count: 6,
    pills: ["3D Printers", "IoT Lab", "Funding Support", "Mentorship"],
    description:
      "Dedicated innovation and incubation center with latest equipment. Support for student startups and research projects.",
  },
  {
    title: "Central Library",
    count: 7,
    pills: ["Digital Library", "E-Journals", "24/7 Access"],
    description:
      "Spacious library with 50,000+ books, journals, and digital resources. Air-conditioned reading halls with 500+ seating capacity.",
  },
  {
    title: "Cafeteria & Food Courts",
    count: 8,
    pills: ["Multi-cuisine", "Hygienic", "Affordable"],
    description:
      "Multiple food outlets serving variety of cuisines. Hygienic and affordable food options available throughout the day.",
  },
];

export const GALLERY_IMAGES = [
  "/Gallery_Dummy/image-1.png",
  "/Gallery_Dummy/image2.png",
  "/Gallery_Dummy/image3.png",
  "/Gallery_Dummy/image4.png",
  "/Gallery_Dummy/image5.png",
  "/Gallery_Dummy/image6.png",
];

export const FAQ_DUMMY_STUDENT_REVIEWS = [
  {
    name: "Rahul Verma",
    degree: "M.Sc Physics",
    university: "IISc Bangalore",
    review:
      "Best research facilities in India. The professors are highly experienced and supportive. Great for those interested in pursuing research careers.",
    rating: 5,
  },
  {
    name: "Priya Sharma",
    degree: "B.Tech Computer Science",
    university: "IIT Delhi",
    review:
      "Amazing faculty and excellent placement opportunities. The campus infrastructure is world-class and the peer learning environment really helps in overall growth. Amazing faculty and excellent placement opportunities. The campus infrastructure is world-class and the peer learning environment really helps in overall growth .  Amazing faculty and excellent placement opportunities. The campus infrastructure is world-class and the peer learning environment really helps in overall growth Amazing faculty and excellent placement opportunities. The campus infrastructure is world-class and the peer learning environment really helps in overall growth",
    rating: 5,
  },
  {
    name: "Ananya Reddy",
    degree: "MA Economics",
    university: "JNU",
    review:
      "Vibrant campus life with active student politics. The course curriculum is comprehensive and the faculty encourages critical thinking.Vibrant campus life with active student politics. The course curriculum is comprehensive and the faculty encourages critical thinking.Vibrant campus life with active student politics. The course curriculum is comprehensive and the faculty encourages critical thinking.",
    rating: 5,
  },
  {
    name: "Ananya Reddy",
    degree: "MA Economics",
    university: "JNU",
    review:
      "Vibrant campus life with active student politics. The course curriculum is comprehensive and the faculty encourages critical thinking.Vibrant campus life with active student politics. The course curriculum is comprehensive and the faculty encourages critical thinking.Vibrant campus life with active student politics. The course curriculum is comprehensive and the faculty encourages critical thinking.",
    rating: 5,
  },
  {
    name: "Ananya Reddy",
    degree: "MA Economics",
    university: "JNU",
    review:
      "Vibrant campus life with active student politics. The course curriculum is comprehensive and the faculty encourages critical thinking.Vibrant campus life with active student politics. The course curriculum is comprehensive and the faculty encourages critical thinking.Vibrant campus life with active student politics. The course curriculum is comprehensive and the faculty encourages critical thinking.",
    rating: 5,
  },
  {
    name: "Rahul Verma",
    degree: "M.Sc Physics",
    university: "IISc Bangalore",
    review:
      "Best research facilities in India. The professors are highly experienced and supportive. Great for those interested in pursuing research careers.",
    rating: 5,
  },
  {
    name: "Rahul Verma",
    degree: "M.Sc Physics",
    university: "IISc Bangalore",
    review:
      "Best research facilities in India. The professors are highly experienced and supportive. Great for those interested in pursuing research careers.",
    rating: 5,
  },
  {
    name: "Priya Sharma",
    degree: "B.Tech Computer Science",
    university: "IIT Delhi",
    review:
      "Amazing faculty and excellent placement opportunities. The campus infrastructure is world-class and the peer learning environment really helps in overall growth. Amazing faculty and excellent placement opportunities. The campus infrastructure is world-class and the peer learning environment really helps in overall growth .  Amazing faculty and excellent placement opportunities. The campus infrastructure is world-class and the peer learning environment really helps in overall growth Amazing faculty and excellent placement opportunities. The campus infrastructure is world-class and the peer learning environment really helps in overall growth",
    rating: 5,
  },
  {
    name: "Ananya Reddy",
    degree: "MA Economics",
    university: "JNU",
    review:
      "Vibrant campus life with active student politics. The course curriculum is comprehensive and the faculty encourages critical thinking.Vibrant campus life with active student politics. The course curriculum is comprehensive and the faculty encourages critical thinking.Vibrant campus life with active student politics. The course curriculum is comprehensive and the faculty encourages critical thinking.",
    rating: 5,
  },
  {
    name: "Ananya Reddy",
    degree: "MA Economics",
    university: "JNU",
    review:
      "Vibrant campus life with active student politics. The course curriculum is comprehensive and the faculty encourages critical thinking.Vibrant campus life with active student politics. The course curriculum is comprehensive and the faculty encourages critical thinking.Vibrant campus life with active student politics. The course curriculum is comprehensive and the faculty encourages critical thinking.",
    rating: 5,
  },
  {
    name: "Ananya Reddy",
    degree: "MA Economics",
    university: "JNU",
    review:
      "Vibrant campus life with active student politics. The course curriculum is comprehensive and the faculty encourages critical thinking.Vibrant campus life with active student politics. The course curriculum is comprehensive and the faculty encourages critical thinking.Vibrant campus life with active student politics. The course curriculum is comprehensive and the faculty encourages critical thinking.",
    rating: 5,
  },
  {
    name: "Rahul Verma",
    degree: "M.Sc Physics",
    university: "IISc Bangalore",
    review:
      "Best research facilities in India. The professors are highly experienced and supportive. Great for those interested in pursuing research careers.",
    rating: 5,
  },
];

export const COURSES_LISTING_DATA = [
  {
    title: "B.Tech in Computer Science & Engineering",
    stream: "Engineering",
    type: "Degree (Full-Time)",
    entranceExams: ["JEE Main", "JEE Advanced", "State CET", "CUET"],
    topSpecialisations: ["CSE", "ECE", "Mechanical", "IT", "Civil"],
    topColleges: ["IITs", "NITs", "VIT", "SRM", "MIT"],
    collegesCount: 3521,
  },
  {
    title: "B.Tech in Computer Science & Engineering",
    stream: "Engineering",
    type: "Degree (Full-Time)",
    entranceExams: ["JEE Main", "JEE Advanced", "State CET", "CUET"],
    topSpecialisations: ["CSE", "ECE", "Mechanical", "IT", "Civil"],
    topColleges: ["IITs", "NITs", "VIT", "SRM", "MIT"],
    collegesCount: 3521,
  },
  {
    title: "B.Tech in Computer Science & Engineering",
    stream: "Engineering",
    type: "Degree (Full-Time)",
    entranceExams: ["JEE Main", "JEE Advanced", "State CET", "CUET"],
    topSpecialisations: ["CSE", "ECE", "Mechanical", "IT", "Civil"],
    topColleges: ["IITs", "NITs", "VIT", "SRM", "MIT"],
    collegesCount: 3521,
  },
  {
    title: "B.Tech in Computer Science & Engineering",
    stream: "Engineering",
    type: "Degree (Full-Time)",
    entranceExams: ["JEE Main", "JEE Advanced", "State CET", "CUET"],
    topSpecialisations: ["CSE", "ECE", "Mechanical", "IT", "Civil"],
    topColleges: ["IITs", "NITs", "VIT", "SRM", "MIT"],
    collegesCount: 3521,
  },
  {
    title: "B.Tech in Computer Science & Engineering",
    stream: "Engineering",
    type: "Degree (Full-Time)",
    entranceExams: ["JEE Main", "JEE Advanced", "State CET", "CUET"],
    topSpecialisations: ["CSE", "ECE", "Mechanical", "IT", "Civil"],
    topColleges: ["IITs", "NITs", "VIT", "SRM", "MIT"],
    collegesCount: 3521,
  },
];

export const FAQ_COURSES = [
  {
    question: "Which course is best after 12th?",
    answer:
      "Check rankings, placements, fees, student reviews, accreditation, and faculty experience. Consider factors like location, campus facilities, industry connections, and alumni network.",
  },
  {
    question: "Which course offers the highest salary?",
    answer:
      "Courses in Engineering, Computer Science, Management, and emerging tech fields like Data Science and AI often offer higher salary potential, depending on college, skills, and industry demand.",
  },
  {
    question: "Which courses have no entrance exam?",
    answer:
      "Many diploma, certificate, and some degree programs offer direct admission based on 12th marks. Eligibility, cutoffs, and selection criteria vary by college and course.",
  },
  {
    question: "Which course is best for government jobs?",
    answer:
      "Degrees in fields like Arts, Commerce, Law, and Engineering are popular for government exams. The best course depends on your target exams such as UPSC, SSC, Bank, or State services.",
  },
  {
    question: "Which UG course is most popular?",
    answer:
      "B.Tech, B.Com, B.Sc, BA, BBA, and integrated law programs are among the most popular UG choices, but the right course depends on your interests, strengths, and career goals.",
  },
];

// Explore Popover Content Data
export const collegesContent = {
  columns: [
    {
      title: "By Stream",
      items: [
        "Engineering",
        "Architecture",
        "Management",
        "Arts & Humanities",
        "Design",
        "Law",
        "Science",
        "Medical",
        "Pharmacy",
        "Hotel Management",
        "Commerce",
      ],
    },
    {
      title: "By Location",
      items: [
        "Delhi NCR",
        "Mumbai",
        "Bangalore",
        "Hyderabad",
        "Chennai",
        "Kolkata",
        "Pune",
        "Ahmedabad",
        "Jaipur",
        "Surat",
        "Lucknow",
        "Kerala",
      ],
    },
    {
      title: "By Rankings",
      items: [
        "NIRF Top 100",
        "NAAC A+ Colleges",
        "Top Govt Colleges",
        "Top Private Colleges",
        "Best Emerging Colleges",
      ],
    },
    {
      title: "By Ownership",
      items: ["Government", "Private", "Deemed", "Autonomous"],
      width: "w-[124px]",
    },
  ],
};

export const coursesContent = {
  columns: [
    {
      title: "By Degree",
      items: ["Undergraduate", "Diploma", "Postgraduate", "Certificate", "Doctorate (PhD)"],
    },
    {
      title: "By Stream",
      items: [
        "Computer Science",
        "AI & Data Science",
        "Finance & Accounting",
        "Business & Management",
        "Humanities",
        "Healthcare",
      ],
    },
    {
      title: "Popular Courses",
      items: [
        "B.Tech",
        "MBBS",
        "BBA",
        "B.Com",
        "M.Tech",
        "B.Pharm",
        "LLB/LLM",
        "M.B.A",
        "B.Sc",
        "D.Pharm",
        "Ph.D",
      ],
    },
  ],
};

export const examsContent = {
  columns: [
    {
      title: "By Category",
      items: ["Engineering", "Medical", "Management", "Design", "Law"],
    },
    {
      title: "Popular Courses",
      items: [
        "JEE Main",
        "NEET",
        "CAT",
        "CUET",
        "UPSC",
        "CLAT",
        "NIFT",
        "GATE",
        "NATA",
      ],
    },
  ],
};

export const scholarshipsContent = {
  columns: [
    {
      title: "By Category",
      items: [
        "Merit-Based",
        "Need-Based",
        "Women Scholarships",
        "SC/ST/OBC",
        "Minority",
        "EWS",
        "Disability Support",
      ],
    },
    {
      title: "",
      items: [
        "Sports Scholarships",
        "Single Girl Child",
        "Armed Forces/Orphan",
        "Research / Fellowships",
        "Study Abroad Scholarships",
      ],
    },
  ],
};

export const jobsInternshipsContent = {
  columns: [
    {
      title: "By Stream",
      items: [
        "Internships",
        "Fresher Jobs",
        "Remote",
        "Campus Placements",
        "Apprenticeships",
        "IT & Software",
        "Data Science",
        "Business & Management",
      ],
    },
    {
      title: "By Stream",
      items: [
        "Digital Marketing",
        "Architecture & Planning",
        "Healthcare & Nursing",
        "Finance & Accounting",
        "Education & Teaching",
        "Law & Legal Internships",
      ],
    },
  ],
};

// All content sections mapped by index
export const explorePopoverContentSections = [
  collegesContent,
  coursesContent,
  examsContent,
  scholarshipsContent,
  jobsInternshipsContent,
];

// Default notifications data
export const defaultNotifications = [
  {
    id: "1",
    title: "New placement report added for IIT Delhi",
    description: "Average CTC updated to ₹18 LPA for 2025 batch.",
    timestamp: "2 hours ago",
    icon: "graduation",
    isRead: true,
    group: "today",
  },
  {
    id: "2",
    title: "JEE Main 2025 registration closes in 3 days",
    description: "Don't miss the deadline — apply now.",
    timestamp: "Today",
    icon: "document",
    isRead: false,
    group: "today",
  },
  {
    id: "3",
    title: "JEE Main 2025 registration closes in 3 days",
    description: "Don't miss the deadline — apply now.",
    timestamp: "Today",
    icon: "document",
    isRead: false,
    group: "today",
  },
  {
    id: "4",
    title: "New placement report added for IIT Delhi",
    description: "Average CTC updated to ₹18 LPA for 2025 batch.",
    timestamp: "2 hours ago",
    icon: "graduation",
    isRead: true,
    group: "yesterday",
  },
  {
    id: "5",
    title: "JEE Main 2025 registration closes in 3 days",
    description: "Don't miss the deadline — apply now.",
    timestamp: "Today",
    icon: "document",
    isRead: false,
    group: "yesterday",
  },
  {
    id: "6",
    title: "JEE Main 2025 registration closes in 3 days",
    description: "Don't miss the deadline — apply now.",
    timestamp: "Today",
    icon: "document",
    isRead: false,
    group: "yesterday",
  },
];
