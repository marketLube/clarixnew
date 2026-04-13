/**
 * Full demo dataset for Clarix (customer-ready copy + Unsplash images).
 * Safe to re-run: deletes prior seed rows by fixed names / slug patterns first.
 *
 * Usage (from Server/):  npm run seed:demo
 * Images use images.unsplash.com (allowed in Client next.config).
 *
 * SEED_SKIP_HOMEPAGE=1 — skip overwriting the HomePage CMS document.
 */
import path from "node:path";
import { fileURLToPath } from "node:url";

import dotenv from "dotenv";
import mongoose from "mongoose";

import { BlogModel } from "../src/modules/blogs/model/blogModel.js";
import { College } from "../src/modules/colleges/models/collegeModel.js";
import { Course } from "../src/modules/courses/models/courseModel.js";
import { Exam } from "../src/modules/exams/model/examModel.js";
import { HomePage } from "../src/modules/contentManagement/Homepage/model/homePageCmsModel.js";
import { Job } from "../src/modules/jobs/model/jobModel.js";
import { Recruiter } from "../src/modules/recruiters/models/recruiterModel.js";
import { Review } from "../src/modules/reviews/model/reviewModel.js";
import { Scholarship } from "../src/modules/scholorship/model/scholorshipModel.js";
import { Stream } from "../src/modules/streams/model/streamModel.js";
import { University } from "../src/modules/universities/models/universityModel.js";

import { unsplashUrl, pickPhoto } from "./lib/verified-unsplash.js";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
dotenv.config({ path: path.join(__dirname, "..", ".env") });

/**
 * Legacy seed paths often point at removed Unsplash assets (404).
 * We keep the string as a stable key but always map to a verified photo id.
 */
const sx = (photoPath: string, w = 1200) => unsplashUrl(pickPhoto(photoPath), w);

const pdf = "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf";

const BLOG_SLUG_PREFIX = "clarix-seed-";

const UNIVERSITY_NAMES = [
  "Rashtriya Technical University",
  "Indraprastha Institute of Management",
  "Kaveri School of Medical Sciences",
] as const;

const COLLEGE_NAMES = [
  "Aurora Institute of Technology",
  "Summit School of Management",
  "Riverfront Medical College",
  "Coastal School of Design",
  "Heritage Law College",
  "Silverline University of Science",
] as const;

const RECRUITER_COMPANIES = [
  "Northwind Labs",
  "Contoso Analytics",
  "Fabrikam Digital",
  "Tailspin BioTech",
  "Wide World Education",
  "Litware Systems",
  "AdventureWorks AI",
  "Blue Yonder Retail",
  "Coho Vineyard Labs",
  "Fourth Coffee Products",
] as const;

const REVIEW_AUTHORS = [
  "Priya Senthil",
  "Arjun Mehta",
  "Neha Krishnan",
  "Vikram Desai",
  "Ananya Iyer",
  "Rohan Kapoor",
  "Kavya Nair",
  "Siddharth Bose",
  "Meera Joshi",
  "Aditya Pillai",
] as const;

const STREAM_DEFS = [
  { name: "Engineering", collegesCount: 186, examsCount: 14, image: sx("photo-1517694712202-14dd9538aa97", 900) },
  { name: "Management", collegesCount: 94, examsCount: 9, image: sx("photo-1454165804606-c3d57bc86b40", 900) },
  { name: "Medical", collegesCount: 72, examsCount: 6, image: sx("photo-1576091160399-112ba8d25d1d", 900) },
  { name: "Commerce", collegesCount: 118, examsCount: 7, image: sx("photo-1554224155-6726b3ff858f", 900) },
  { name: "Science", collegesCount: 142, examsCount: 11, image: sx("photo-1532094349884-543bc11b234d", 900) },
  { name: "Law", collegesCount: 56, examsCount: 8, image: sx("photo-1589829549356-s74f480007c9", 900) },
  { name: "Design", collegesCount: 48, examsCount: 5, image: sx("photo-1561070791-2526d30994b5", 900) },
  { name: "Pharmacy", collegesCount: 63, examsCount: 4, image: sx("photo-1587854692152-cbe750dbb1ce", 900) },
  { name: "Agriculture", collegesCount: 41, examsCount: 3, image: sx("photo-1500382017468-9049fed747ef", 900) },
  { name: "Education", collegesCount: 88, examsCount: 6, image: sx("photo-1503676260728-8c0daab022bb", 900) },
] as const;

const EXAM_CODES = [
  "CLRXJEE",
  "CLRXCAT",
  "CLRXNEET",
  "CLRXKCET",
  "CLRXGATE",
  "CLRXBITS",
  "CLRXNMAT",
  "CLRXCEED",
] as const;

const SCHOLARSHIP_NAMES = [
  "National Merit Excellence Award",
  "Need-Based Bridge Grant",
  "Women in STEM Scholarship",
  "Rural Talent Fellowship",
  "Sports Achievement Grant",
  "International Merit Scheme",
] as const;

const JOB_COMPANIES = [
  "Northwind Labs",
  "Contoso Analytics",
  "Fabrikam Digital",
  "Tailspin BioTech",
  "Wide World Education",
  "Litware Systems",
  "AdventureWorks AI",
  "Blue Yonder Retail",
] as const;

const COURSE_NAMES = [
  "B.Tech Computer Science",
  "B.Tech Electronics & Communication",
  "MBA Marketing",
  "BBA Business Analytics",
  "MBBS (General Medicine)",
  "B.Pharm Clinical Sciences",
  "B.Des Product Design",
  "LL.B. Integrated",
  "B.Sc. Data Science",
  "B.Ed. Secondary Education",
] as const;

const RECRUITER_LOGOS = [
  "photo-1560179707-f14e90ef3623",
  "photo-1486406146926-c627a92ad1ab",
  "photo-1497366216548-37526070297c",
  "photo-1497366754035-f200968a6e72",
  "photo-1552664730-d307ca884978",
  "photo-1542744173-8e7e53415bb0",
  "photo-1504384308090-c894fdcc538d",
  "photo-1519389950473-47ba0277781c",
  "photo-1600880292203-757bb62b4baf",
  "photo-1553877522-43269b4dd074",
] as const;

const REVIEW_AVATARS = [
  "photo-1494790108377-be9c29b29330",
  "photo-1507003211169-0a1dd7228f2d",
  "photo-1438761681033-6461ffad8d80",
  "photo-1472099645785-5658abf4ff4e",
  "photo-1544005313-94ddf0286df2",
  "photo-1500648767791-00dcc994a43e",
  "photo-1534528741775-53994a69daeb",
  "photo-1506794778202-cad84cf45f1d",
  "photo-1517841905240-472988babdf9",
  "photo-1539578705190-7e0a41d0c6dd",
] as const;

const COLLEGE_LOGOS = [
  "photo-1523240795612-9a054b0db644",
  "photo-1498243691581-b145c3f3167d",
  "photo-1571260899304-425eee4c7efc",
  "photo-1562774053-701939374585",
  "photo-1577495508048-b635879837f1",
  "photo-1541339907198-e08756dedf3f",
] as const;

async function clearDemoData() {
  /** Remove rows from the older `[Demo] …` seed if present */
  const legacyDemo = /^\[Demo\]/;
  await Review.deleteMany({ $or: [{ userName: { $in: [...REVIEW_AUTHORS] } }, { userName: legacyDemo }] });
  await College.deleteMany({ $or: [{ name: { $in: [...COLLEGE_NAMES] } }, { name: legacyDemo }] });
  await Course.deleteMany({ $or: [{ name: { $in: [...COURSE_NAMES] } }, { name: legacyDemo }] });
  await Exam.deleteMany({ $or: [{ shortName: { $in: [...EXAM_CODES] } }, { shortName: { $in: ["DEMOCET", "DEMOMGMT"] } }] });
  await Stream.deleteMany({ $or: [{ name: { $in: STREAM_DEFS.map((s) => s.name) } }, { name: legacyDemo }] });
  await Scholarship.deleteMany({ $or: [{ scholarshipName: { $in: [...SCHOLARSHIP_NAMES] } }, { scholarshipName: legacyDemo }] });
  await Recruiter.deleteMany({ $or: [{ companyName: { $in: [...RECRUITER_COMPANIES] } }, { companyName: legacyDemo }] });
  await University.deleteMany({ $or: [{ name: { $in: [...UNIVERSITY_NAMES] } }, { name: legacyDemo }] });
  await BlogModel.deleteMany({ $or: [{ slug: new RegExp(`^${BLOG_SLUG_PREFIX}`) }, { slug: /^demo-/ }] });
  await Job.deleteMany({ $or: [{ companyName: { $in: [...JOB_COMPANIES] } }, { companyName: legacyDemo }] });
}

function buildCoursePayload(
  streamId: mongoose.Types.ObjectId,
  courseName: string,
  imageKey: string,
  duration: string,
  fees: string,
) {
  return {
    name: courseName,
    shortDescription: `${courseName} — industry-aligned curriculum, strong mentorship, and placement support.`,
    stream: streamId,
    type: "Full Time" as const,
    duration,
    fees,
    intakeCapacity: `${120 + Math.floor(Math.random() * 80)} seats`,
    eligibility: ["10+2 with qualifying marks", "Entrance / screening as per institute norms"],
    cardImage: sx(`photo-${imageKey}`, 800),
    heroImage: sx(`photo-${imageKey}`, 1600),
    description: {
      title: "Program overview",
      content: `${courseName} blends theory with labs, internships, and capstone projects tailored to employer needs.`,
      image: sx("photo-1541339907198-e08756dedf3f", 900),
    },
    whyChoose: {
      title: "Why students choose this",
      description: "Accredited programs, active placements cell, and global exchange tie-ups.",
      reasons: [
        { title: "Hands-on learning", description: "Labs, studios, and live projects every semester." },
        { title: "Career design", description: "Dedicated coaches, mocks, and recruiter round-tables." },
      ],
    },
    syllabus: {
      title: "Curriculum highlights",
      semesters: [
        { title: "Foundation year", topics: ["Core theory", "Workshops", "Communication"] },
        { title: "Advanced year", topics: ["Specialization", "Industry project", "Internship"] },
      ],
    },
    careerOpportunities: {
      title: "Where graduates go",
      items: [
        { title: "Industry roles", description: "Leading companies across India and abroad." },
        { title: "Higher studies", description: "MS, MBA, and research pathways with guidance." },
      ],
    },
    about: {
      title: "Department snapshot",
      description: "Faculty with doctoral training, funded research, and student-led clubs.",
      points: [
        { title: "Research", description: "Labs and centres of excellence in emerging areas." },
        { title: "Entrepreneurship", description: "Incubation desk and seed support for startups." },
      ],
    },
    faqs: {
      title: "FAQs",
      description: "Quick answers for applicants.",
      items: [
        { question: "Hostel facility?", answer: "Yes — separate towers for senior years and mess options." },
        { question: "Scholarships?", answer: "Merit and need-based schemes announced each admission cycle." },
      ],
    },
  };
}

async function seed() {
  const uri = process.env.MONGO_URI;
  if (!uri) {
    console.error("MONGO_URI is missing. Set it in Server/.env");
    process.exit(1);
  }

  await mongoose.connect(uri);
  console.log("Connected. Clearing previous Clarix seed dataset…");
  await clearDemoData();

  const [uniTech, uniMgmt, uniMed] = await University.insertMany([
    { name: UNIVERSITY_NAMES[0], type: "State" as const, state: "Karnataka", city: "Bengaluru", establishedYear: 1965 },
    { name: UNIVERSITY_NAMES[1], type: "Central" as const, state: "Delhi", city: "New Delhi", establishedYear: 1988 },
    { name: UNIVERSITY_NAMES[2], type: "State" as const, state: "Kerala", city: "Kochi", establishedYear: 1975 },
  ]);

  const recruiters = await Recruiter.insertMany(
    RECRUITER_COMPANIES.map((company, i) => ({
      companyName: company,
      jobTitle: i % 3 === 0 ? "Graduate Engineer Trainee" : i % 3 === 1 ? "Analyst Trainee" : "Research Associate",
      hiringDuration: "Campus + off-cycle",
      logo: sx(RECRUITER_LOGOS[i] ?? RECRUITER_LOGOS[0]!, 400),
      industry: ["Technology", "Analytics", "Healthcare", "Education", "Retail", "Finance"][i % 6],
    })),
  );

  const streams = await Stream.insertMany(
    STREAM_DEFS.map((s) => ({
      name: s.name,
      image: s.image,
      collegesCount: s.collegesCount,
      examsCount: s.examsCount,
      enabled: true,
    })),
  );

  const byStream = (n: string) => streams.find((x) => x.name === n)!._id as mongoose.Types.ObjectId;

  const courseSpecs: { name: (typeof COURSE_NAMES)[number]; stream: string; key: string; dur: string; fee: string }[] =
    [
      { name: COURSE_NAMES[0], stream: "Engineering", key: "1517694712202-14dd9538aa97", dur: "4 Years", fee: "₹9.2 Lakh / year" },
      { name: COURSE_NAMES[1], stream: "Engineering", key: "1517077300455-3663bbe7be2a", dur: "4 Years", fee: "₹8.4 Lakh / year" },
      { name: COURSE_NAMES[2], stream: "Management", key: "1454165804606-c3d57bc86b40", dur: "2 Years", fee: "₹14.5 Lakh (total)" },
      { name: COURSE_NAMES[3], stream: "Management", key: "1554224155-6726b3ff858f", dur: "3 Years", fee: "₹5.8 Lakh / year" },
      { name: COURSE_NAMES[4], stream: "Medical", key: "1576091160399-112ba8d25d1d", dur: "5.5 Years", fee: "₹22 Lakh / year" },
      { name: COURSE_NAMES[5], stream: "Pharmacy", key: "1587854692152-cbe750dbb1ce", dur: "4 Years", fee: "₹4.2 Lakh / year" },
      { name: COURSE_NAMES[6], stream: "Design", key: "1561070791-2526d30994b5", dur: "4 Years", fee: "₹7.1 Lakh / year" },
      { name: COURSE_NAMES[7], stream: "Law", key: "1589829549356-s74f480007c9", dur: "5 Years", fee: "₹3.9 Lakh / year" },
      { name: COURSE_NAMES[8], stream: "Science", key: "1532094349884-543bc11b234d", dur: "3 Years", fee: "₹2.6 Lakh / year" },
      { name: COURSE_NAMES[9], stream: "Education", key: "1503676260728-8c0daab022bb", dur: "4 Years", fee: "₹1.9 Lakh / year" },
    ];

  const courses = await Course.insertMany(
    courseSpecs.map((c) => buildCoursePayload(byStream(c.stream), c.name, c.key, c.dur, c.fee)),
  );

  const scholarships = await Scholarship.insertMany([
    {
      scholarshipName: SCHOLARSHIP_NAMES[0],
      scholarshipType: "Merit Based" as const,
      fundingType: "Partial Funding" as const,
      deadline: new Date(Date.now() + 150 * 86400000),
      totalFundingAmount: 300000,
      description: "For top percentile rank holders in national entrance exams.",
      officialWebsite: "https://example.org/scholarships/merit-excellence",
      isActive: true,
      status: "active" as const,
    },
    {
      scholarshipName: SCHOLARSHIP_NAMES[1],
      scholarshipType: "Need Based" as const,
      fundingType: "Tuition Waiver" as const,
      deadline: new Date(Date.now() + 90 * 86400000),
      totalFundingAmount: 180000,
      description: "Income-assessed support with mentor pairing.",
      officialWebsite: "https://example.org/scholarships/bridge-grant",
      isActive: true,
      status: "active" as const,
    },
    {
      scholarshipName: SCHOLARSHIP_NAMES[2],
      scholarshipType: "Private" as const,
      fundingType: "Stipend" as const,
      deadline: new Date(Date.now() + 60 * 86400000),
      totalFundingAmount: 220000,
      description: "Encourages women pursuing STEM undergraduate degrees.",
      officialWebsite: "https://example.org/scholarships/women-stem",
      isActive: true,
      status: "active" as const,
    },
    {
      scholarshipName: SCHOLARSHIP_NAMES[3],
      scholarshipType: "Government" as const,
      fundingType: "One-Time Grant" as const,
      deadline: new Date(Date.now() + 200 * 86400000),
      totalFundingAmount: 95000,
      description: "State-linked grant for rural district toppers.",
      officialWebsite: "https://example.org/scholarships/rural-talent",
      isActive: true,
      status: "active" as const,
    },
    {
      scholarshipName: SCHOLARSHIP_NAMES[4],
      scholarshipType: "Sports" as const,
      fundingType: "Partial Funding" as const,
      deadline: new Date(Date.now() + 45 * 86400000),
      totalFundingAmount: 125000,
      description: "For state- and national-level athletic achievements.",
      officialWebsite: "https://example.org/scholarships/sports",
      isActive: true,
      status: "active" as const,
    },
    {
      scholarshipName: SCHOLARSHIP_NAMES[5],
      scholarshipType: "International" as const,
      fundingType: "Full Funding" as const,
      deadline: new Date(Date.now() + 120 * 86400000),
      totalFundingAmount: 850000,
      description: "Outbound semester support with partner universities.",
      officialWebsite: "https://example.org/scholarships/international",
      isActive: true,
      status: "upcoming" as const,
    },
  ]);

  const examSpecs = [
    { code: EXAM_CODES[0], full: "Clarix All-India Engineering Screening", stream: "Engineering" },
    { code: EXAM_CODES[1], full: "Clarix Management Aptitude Test", stream: "Management" },
    { code: EXAM_CODES[2], full: "Clarix National Medical Qualifier", stream: "Medical" },
    { code: EXAM_CODES[3], full: "Clarix State Combined Entrance (KCET-style)", stream: "Engineering" },
    { code: EXAM_CODES[4], full: "Clarix Graduate Aptitude for Technical Programs", stream: "Engineering" },
    { code: EXAM_CODES[5], full: "Clarix BITS-Style Online Assessment", stream: "Science" },
    { code: EXAM_CODES[6], full: "Clarix NMAT-Style Adaptive Test", stream: "Management" },
    { code: EXAM_CODES[7], full: "Clarix Design & Architecture Entrance", stream: "Design" },
  ];

  const exams = await Exam.insertMany(
    examSpecs.map((e, i) => ({
      shortName: e.code,
      fullName: e.full,
      registrationDate: new Date(Date.now() + i * 86400000),
      examDate: new Date(Date.now() + (45 + i * 7) * 86400000),
      resultPublishDate: new Date(Date.now() + (75 + i * 7) * 86400000),
      qualificationRequired: i < 3 ? ["10+2 / equivalent"] : ["UG / PG as per brochure"],
      collegesAccepting: 80 + i * 15,
      officialWebsite: `https://example.org/exams/${e.code.toLowerCase()}`,
      description: `Nationwide ${e.full}. Registrations monitored centrally on the Clarix network.`,
      isActive: true,
      logo: sx(["photo-1434030216411-0b793f4b4173", "photo-1456513080510-7bf3a84b82fc"][i % 2]!, 400),
      stream: byStream(e.stream),
    })),
  );

  const jee = exams.find((x) => x.shortName === "CLRXJEE")!;

  const allRecruiterIds = recruiters.map((r) => r._id);
  const collegePayloads = [
    {
      name: COLLEGE_NAMES[0],
      state: "Karnataka",
      city: "Bengaluru",
      type: "Private" as const,
      uni: uniTech._id,
      courses: [courses[0]!._id, courses[1]!._id],
      scholarships: [scholarships[0]!._id, scholarships[1]!._id],
      entrance: jee._id,
      recruiters: allRecruiterIds,
      category: "Engineering",
    },
    {
      name: COLLEGE_NAMES[1],
      state: "Maharashtra",
      city: "Pune",
      type: "Government" as const,
      uni: uniMgmt._id,
      courses: [courses[2]!._id, courses[3]!._id],
      scholarships: [scholarships[0]!._id],
      entrance: exams[1]!._id,
      recruiters: allRecruiterIds.slice(0, 7),
      category: "Management",
    },
    {
      name: COLLEGE_NAMES[2],
      state: "Kerala",
      city: "Kochi",
      type: "Private" as const,
      uni: uniMed._id,
      courses: [courses[4]!._id, courses[5]!._id],
      scholarships: [scholarships[2]!._id, scholarships[3]!._id],
      entrance: exams[2]!._id,
      recruiters: allRecruiterIds.slice(2, 9),
      category: "Medical",
    },
    {
      name: COLLEGE_NAMES[3],
      state: "Gujarat",
      city: "Ahmedabad",
      type: "Private" as const,
      uni: uniTech._id,
      courses: [courses[6]!._id],
      scholarships: [scholarships[1]!._id],
      entrance: exams[7]!._id,
      recruiters: allRecruiterIds.slice(0, 5),
      category: "Design",
    },
    {
      name: COLLEGE_NAMES[4],
      state: "West Bengal",
      city: "Kolkata",
      type: "Public" as const,
      uni: uniMgmt._id,
      courses: [courses[7]!._id],
      scholarships: [scholarships[4]!._id],
      entrance: exams[1]!._id,
      recruiters: allRecruiterIds.slice(3, 10),
      category: "Law",
    },
    {
      name: COLLEGE_NAMES[5],
      state: "Tamil Nadu",
      city: "Coimbatore",
      type: "Deemed" as const,
      uni: uniTech._id,
      courses: [courses[8]!._id, courses[9]!._id],
      scholarships: [scholarships[5]!._id],
      entrance: exams[4]!._id,
      recruiters: allRecruiterIds,
      category: "Science",
    },
  ];

  const colleges = await College.insertMany(
    collegePayloads.map((p, idx) => ({
      name: p.name,
      state: p.state,
      city: p.city,
      type: p.type,
      rating: 4.2 + (idx % 3) * 0.15,
      establishedYear: 1990 + idx * 3,
      accreditation: idx % 2 === 0 ? (["NAAC A+", "NBA"] as string[]) : (["NAAC A", "AICTE"] as string[]),
      logo: sx(COLLEGE_LOGOS[idx % COLLEGE_LOGOS.length]!, 400),
      brochure: pdf,
      description: `${p.name} is a full-time residential campus known for strong faculty, labs, and recruiter relationships across India.`,
      university: p.uni,
      students: 4500 + idx * 900,
      campusSize: `${28 + idx * 6} Acres`,
      averageSalary: 950000 + idx * 120000,
      placementPercentage: 82 + idx * 2,
      highestSalary: 3200000 + idx * 400000,
      placementTrends: [
        { year: "2022", avgSalary: `${8 + idx} LPA`, placementPercentage: `${80 + idx}%` },
        { year: "2023", avgSalary: `${9 + idx} LPA`, placementPercentage: `${81 + idx}%` },
        { year: "2024", avgSalary: `${10 + idx} LPA`, placementPercentage: `${82 + idx}%` },
      ],
      recruiters: p.recruiters,
      recruitersCount: p.recruiters.length,
      studentsWithInternships: 68 + idx,
      avgStipend: 25000 + idx * 1500,
      ppoConversionRate: 32 + idx,
      alumniInFortune500: 20 + idx * 3,
      alumniEntrepreneurs: 8 + idx,
      alumniHigherStudiesAbroad: 12 + idx * 2,
      courses: p.courses as mongoose.Types.ObjectId[],
      applicationOpeningDate: new Date(),
      applicationClosingDate: new Date(Date.now() + 120 * 86400000),
      entranceExam: p.entrance,
      entranceExamDate: new Date(Date.now() + 50 * 86400000),
      meritListAnnouncementDate: new Date(Date.now() + 95 * 86400000),
      counsellingStartsFrom: new Date(Date.now() + 100 * 86400000),
      accademicSectionStartsFrom: new Date(Date.now() + 160 * 86400000),
      admissionMode: [
        {
          mode: "Entrance Exam" as const,
          label: "National entrance",
          description: "Primary intake via Clarix network entrance scores.",
        },
        {
          mode: "Merit List" as const,
          label: "Board merit",
          description: "Limited seats for board toppers without entrance (rules apply).",
        },
      ],
      hostelFee: `₹${82 + idx * 4},000 / year`,
      messFee: `₹${48 + idx * 2},000 / year`,
      libraryFee: "₹4,500 / year",
      laboratoryFee: "₹16,000 / year",
      sportsFee: "₹3,200 / year",
      annualFee: `₹${2.8 + idx * 0.2} Lakh / year`,
      avgAnnualFee: `₹${2.5 + idx * 0.15} Lakh / year`,
      scholarships: p.scholarships as mongoose.Types.ObjectId[],
      campusImages: [sx("photo-1541339907198-e08756dedf3f"), sx("photo-1564981797816-1043664bf78d"), sx("photo-1540575467063-27aef2c19748")],
      hostelImages: [sx("photo-1555854877-641d0f79b97c"), sx("photo-1522771739844-6a9f6d5f14af")],
      labsImages: [sx("photo-1581092160562-40aa08f36d4b"), sx("photo-1531482615713-2afd69097998")],
      eventsImages: [sx("photo-1511578314322-379afb476865"), sx("photo-1517245386807-bb43f82c33c4")],
      admissionFaqs: [
        { question: "How do I apply?", answer: "Online form with score upload and document checklist." },
        { question: "Transport?", answer: "Shuttle routes cover major city corridors." },
      ],
      courseFaqs: [{ question: "Credit transfers?", answer: "As per statutory council guidelines only." }],
      feesPaymentFaqs: [{ question: "EMI options?", answer: "Partner banks offer semester-wise plans." }],
      scholarshipFaqs: [{ question: "Combine awards?", answer: "Usually one merit + one need grant maximum." }],
      campusLife: [
        {
          title: "Clubs & competitions",
          description: "From robotics to moot courts—120+ student bodies.",
          verified: true,
          tags: ["clubs", "events"],
          image: sx("photo-1523240795612-9a054b0db644"),
          source: "Student affairs",
          isActive: true,
        },
      ],
      category: p.category,
    })),
  );

  const reviewTemplates = [
    { course: "B.Tech CSE", city: "Chennai", content: "Placements felt organised—weekly mocks and mentor feedback. Labs are open late for project work." },
    { course: "MBA Marketing", city: "Pune", content: "Case competitions and alumni fireside chats made the MBA very applied. Career office replies same day." },
    { course: "MBBS", city: "Kochi", content: "Clinical postings start early; seniors run good tutorials. Hostel food improved a lot last year." },
    { course: "B.Des", city: "Ahmedabad", content: "Studio culture is intense but supportive. Portfolio reviews with industry designers every month." },
    { course: "LL.B.", city: "Kolkata", content: "Moot court society is nationally ranked. Library digital access is excellent." },
    { course: "B.Sc Data Science", city: "Coimbatore", content: "Python and stats faculty are strong; internship cell landed me two offers." },
    { course: "B.Tech ECE", city: "Bengaluru", content: "IEEE chapter and hackathons kept me busy. Mess could use more variety." },
    { course: "BBA Analytics", city: "Mumbai", content: "Live dashboards with real SME data—better than textbook-only courses." },
    { course: "B.Pharm", city: "Kochi", content: "Industrial visits every semester; faculty help with GPAT prep." },
    { course: "B.Ed.", city: "Coimbatore", content: "School internships from year two—felt prepared for classroom realities." },
  ];

  await Review.insertMany(
    reviewTemplates.map((t, i) => ({
      userName: REVIEW_AUTHORS[i]!,
      userAvatar: sx(REVIEW_AVATARS[i % REVIEW_AVATARS.length]!, 256),
      reviewType: "College" as const,
      collegeId: colleges[i % colleges.length]!._id,
      collegeName: colleges[i % colleges.length]!.name,
      city: t.city,
      course: t.course,
      content: t.content,
      status: "Approved" as const,
      isActive: true,
    })),
  );

  /* State tiles: use widely served Unsplash assets (bright, object-cover friendly) */
  const locationItems = [
    { name: "Karnataka", slug: "karnataka", image: sx("photo-1596176530529-78163a4f7af3", 900) },
    { name: "Maharashtra", slug: "maharashtra", image: sx("photo-1612528443702-f3131e50eec5", 900) },
    { name: "Tamil Nadu", slug: "tamil-nadu", image: sx("photo-1582510003544-4d00b7c74220", 900) },
    { name: "Delhi NCR", slug: "delhi-ncr", image: sx("photo-1587474260584-136574528ed6", 900) },
    { name: "Kerala", slug: "kerala", image: sx("photo-1602216056096-3b40cc0c9944", 900) },
    { name: "Telangana", slug: "telangana", image: sx("photo-1449824913935-59a10b8d2000", 900) },
    { name: "Gujarat", slug: "gujarat", image: sx("photo-1509316785289-025f5b846b35", 900) },
    { name: "West Bengal", slug: "west-bengal", image: sx("photo-1554995207-c18c203602cb", 900) },
    { name: "Punjab", slug: "punjab", image: sx("photo-1506905925346-21bda4d32df4", 900) },
    { name: "Rajasthan", slug: "rajasthan", image: sx("photo-1469474968028-56623f02e42e", 900) },
  ];

  if (process.env.SEED_SKIP_HOMEPAGE === "1") {
    console.log("Skipping HomePage CMS (SEED_SKIP_HOMEPAGE=1).");
  } else {
    await HomePage.findOneAndUpdate(
      {},
      {
        $set: {
          hero: {
            enabled: true,
            headline: "Build your future with Clarix Education",
            subHeadline: "Discover colleges, courses, exams, and scholarships — all in one trusted place.",
            PrimaryCtaText: "Explore colleges",
            PrimaryCtaLink: "/colleges",
            images: [
              sx("photo-1523050854058-8df90110c9f1", 1600),
              sx("photo-1434030216411-0b793f4b4173", 1600),
              sx("photo-1541339907198-e08756dedf3f", 1600),
              sx("photo-1523240795612-9a054b0db644", 1600),
            ],
            popularSearches: [
              "B.Tech CSE in Bengaluru",
              "MBA without CAT",
              "Medical colleges in South India",
              "Design entrance coaching",
              "Scholarships for merit students",
            ],
          },
          streams: {
            enabled: true,
            title: "Choose a stream that fits your ambition",
            paragraph:
              "Each pathway below connects you to curated colleges, entrance exams, scholarships, and career benchmarks.",
          },
          contentBlocks: {
            enabled: true,
            blocks: [
              {
                title: "Compare top colleges side by side",
                description:
                  "Fees, placements, campus life, and admission modes—in one view so you shortlist with confidence.",
                image: sx("photo-1522071820081-009f0129c71c", 900),
                sectionKey: "compare-colleges",
              },
              {
                title: "Never miss an entrance date",
                description: "Registration windows, admit cards, and mock schedules for national and state exams.",
                image: sx("photo-1456513080510-7bf3a84b82fc", 900),
                sectionKey: "stay-updated",
              },
              {
                title: "Scholarships that match your profile",
                description: "Merit, need-based, sports, and government schemes with deadlines in your calendar.",
                image: sx("photo-1554224155-6726b3ff858f", 900),
                sectionKey: "scholarships",
              },
              {
                title: "Explore courses beyond the brochure",
                description: "See syllabus depth, faculty snapshots, and career maps before you commit.",
                image: sx("photo-1503676260728-8c0daab022bb", 900),
                sectionKey: "courses",
              },
            ],
          },
          careerHub: {
            enabled: true,
            title: "Career hub for learners and employers",
            paragraph: "Internships, full-time roles, and recruiter spotlights refreshed every week.",
            images: [sx("photo-1521737711867-e3bef5cc9aee", 1100), sx("photo-1552664730-d307ca884978", 1100), sx("photo-1522071820081-009f0129c71c", 1100)],
            logo: [
              sx("photo-1560179707-f14e90ef3623", 256),
              sx("photo-1486406146926-c627a92ad1ab", 256),
              sx("photo-1497366216548-37526070297c", 256),
              sx("photo-1519389950473-47ba0277781c", 256),
              sx("photo-1504384308090-c894fdcc538d", 256),
              sx("photo-1553877522-43269b4dd074", 256),
            ],
          },
          faq: {
            enabled: true,
            title: "Questions families ask us",
            paragraph: "Transparent answers so you can plan applications without surprises.",
            items: [
              { question: "Is Clarix data official?", answer: "We reconcile with notices; always verify final dates on the institution website." },
              { question: "Do I need to pay to shortlist?", answer: "No—browsing and comparison are free. Premium alerts are optional." },
              { question: "Can Clarix guarantee a seat?", answer: "No platform can; we help you organise choices and deadlines." },
              { question: "How do reviews work?", answer: "Moderated submissions with college association where possible." },
              { question: "International students?", answer: "Filter by visa-friendly programs and English-medium curricula." },
              { question: "Mobile app?", answer: "Web works on all devices; native apps are on the roadmap." },
            ],
          },
          location: {
            enabled: true,
            title: "Study across India",
            items: locationItems,
          },
        },
      },
      { upsert: true },
    );
  }

  await BlogModel.insertMany([
    { title: "Shortlisting colleges without the spreadsheet chaos", slug: `${BLOG_SLUG_PREFIX}shortlist-playbook`, excerpt: "Constraints first, then campus reality checks.", content: "## Start with non-negotiables\nCity, budget, entrance exams.\n\n## Virtual → physical\nShort virtual tours before you travel.", thumbnail: sx("photo-1522202176988-66273c2fd55f"), status: "Published" as const, tags: ["admissions"], views: 512, date: new Date(), readTime: "6 min", category: "Guides" },
    { title: "Scholarship calendar: merit vs need deadlines", slug: `${BLOG_SLUG_PREFIX}scholarship-calendar`, excerpt: "How to stack documentation once and reuse it.", content: "## Merit windows\nUsually tied to entrance scores.\n\n## Need grants\nIncome proofs and bank formats.", thumbnail: sx("photo-1450101499163-c8848c66ca85"), status: "Published" as const, tags: ["finance"], views: 403, date: new Date(), readTime: "5 min", category: "Finance" },
    { title: "Engineering vs integrated: pick your timeline", slug: `${BLOG_SLUG_PREFIX}eng-integrated`, excerpt: "Time, flexibility, and research appetite.", content: "## Four-year B.Tech\nClassic hire-ready path.\n\n## Dual degrees\nExtra year, deeper research.", thumbnail: sx("photo-1517694712202-14dd9538aa97"), status: "Published" as const, tags: ["engineering"], views: 366, date: new Date(), readTime: "7 min", category: "Programs" },
    { title: "MBA interview stories that actually work", slug: `${BLOG_SLUG_PREFIX}mba-stories`, excerpt: "STAR without sounding robotic.", content: "## Context\nSet scene in 20 seconds.\n\n## Trade-offs\nShow judgement.", thumbnail: sx("photo-1454165804606-c3d57bc86b40"), status: "Published" as const, tags: ["mba"], views: 298, date: new Date(), readTime: "8 min", category: "Careers" },
    { title: "NEET prep: building stamina for exam day", slug: `${BLOG_SLUG_PREFIX}neet-stamina`, excerpt: "Mock patterns that reduce anxiety.", content: "## Weekly cadence\nAlternate full tests and drills.", thumbnail: sx("photo-1576091160399-112ba8d25d1d"), status: "Published" as const, tags: ["medical"], views: 441, date: new Date(), readTime: "6 min", category: "Entrance" },
    { title: "Design portfolio mistakes admissions teams see", slug: `${BLOG_SLUG_PREFIX}design-portfolio`, excerpt: "Curate fewer, stronger projects.", content: "## Process photos\nShow iteration.", thumbnail: sx("photo-1561070791-2526d30994b5"), status: "Published" as const, tags: ["design"], views: 267, date: new Date(), readTime: "9 min", category: "Portfolio" },
    { title: "Law school: moot court as a skill stack", slug: `${BLOG_SLUG_PREFIX}law-moot`, excerpt: "Why brief writing beats cramming cases.", content: "## Feedback loops\nPeer reviews weekly.", thumbnail: sx("photo-1505664194779-8beee937e7c7"), status: "Published" as const, tags: ["law"], views: 189, date: new Date(), readTime: "5 min", category: "Law" },
    { title: "Data science UG: math depth that employers notice", slug: `${BLOG_SLUG_PREFIX}ds-math`, excerpt: "Linear algebra early pays off later.", content: "## Courses\nStats + programming in parallel.", thumbnail: sx("photo-1555949963-aa79dcee981c"), status: "Published" as const, tags: ["data"], views: 334, date: new Date(), readTime: "6 min", category: "Science" },
  ]);

  await Job.insertMany([
    { jobTitle: "Graduate Software Engineer", companyName: JOB_COMPANIES[0], jobType: "Full Time" as const, location: "Bengaluru (Hybrid)", salary: { min: 14, max: 20, unit: "LPA" as const }, companyWebsite: "https://example.org/nw", employeeSize: "500-1000", industry: "Technology", shortDescription: "Ship APIs on the learner data platform.", aboutJob: "Node, TypeScript, Postgres. Pair programming and on-call rotation.", aboutYou: ["CS degree or equivalent", "0–2 YOE"], aboutRole: ["Design REST APIs", "Improve SLOs", "Ship experiments"], faqs: [{ question: "Relocation?", answer: "Yes for domestic moves." }], isActive: true },
    { jobTitle: "Strategy Summer Intern", companyName: JOB_COMPANIES[1], jobType: "Internship" as const, location: "Mumbai", salary: { min: 50000, max: 70000, unit: "Monthly" as const }, shortDescription: "10-week pod with client exposure.", aboutJob: "Research, modelling, and workshop support.", aboutYou: ["MBA Y1 or strong UG"], aboutRole: ["Market scans", "Slide QA"], faqs: [], isActive: true },
    { jobTitle: "UX Research Associate", companyName: JOB_COMPANIES[2], jobType: "Full Time" as const, location: "Remote — India", salary: { min: 9, max: 14, unit: "LPA" as const }, shortDescription: "Studies for education products.", aboutJob: "Moderated sessions, journey maps, insight decks.", aboutYou: ["HCI / psychology / design"], aboutRole: ["Recruit workflows", "Synthesize findings"], faqs: [], isActive: true },
    { jobTitle: "Campus Talent Partner", companyName: JOB_COMPANIES[3], jobType: "Full Time" as const, location: "Hyderabad", salary: { min: 11, max: 16, unit: "LPA" as const }, shortDescription: "Own relationships with tier-1 schools.", aboutJob: "Drive offer numbers and candidate experience.", aboutYou: ["HR / MBA background"], aboutRole: ["Forecast hiring", "Coach interviewers"], faqs: [], isActive: true },
    { jobTitle: "Curriculum Producer", companyName: JOB_COMPANIES[4], jobType: "Contract" as const, location: "Delhi NCR", salary: { min: 60000, max: 85000, unit: "Monthly" as const }, shortDescription: "Video + assessment modules for STEM courses.", aboutJob: "Work with faculty SMEs and editors.", aboutYou: ["Instructional design exp."], aboutRole: ["Storyboards", "QC launches"], faqs: [], isActive: true },
    { jobTitle: "DevOps Engineer", companyName: JOB_COMPANIES[5], jobType: "Full Time" as const, location: "Pune", salary: { min: 12, max: 18, unit: "LPA" as const }, shortDescription: "Kubernetes + observability for edtech traffic.", aboutJob: "On-call, pipelines, cost tuning.", aboutYou: ["Linux, K8s, Terraform"], aboutRole: ["CI/CD", "Incident response"], faqs: [], isActive: true },
    { jobTitle: "Data Analyst — Admissions", companyName: JOB_COMPANIES[6], jobType: "Full Time" as const, location: "Chennai", salary: { min: 8, max: 12, unit: "LPA" as const }, shortDescription: "Funnel analytics for enrolment team.", aboutJob: "dbt, BigQuery, Looker.", aboutYou: ["SQL + stats"], aboutRole: ["Dashboards", "Forecast yield"], faqs: [], isActive: true },
    { jobTitle: "Brand Designer", companyName: JOB_COMPANIES[7], jobType: "Freelance" as const, location: "Remote", salary: { min: 55000, max: 90000, unit: "Monthly" as const }, shortDescription: "Campaigns for student acquisition.", aboutJob: "Figma systems, motion optional.", aboutYou: ["Portfolio with edu clients"], aboutRole: ["Concept", "Hand-off"], faqs: [], isActive: true },
  ]);

  console.log("Clarix demo seed complete.");
  console.table({
    universities: 3,
    recruiters: RECRUITER_COMPANIES.length,
    streams: STREAM_DEFS.length,
    courses: COURSE_NAMES.length,
    scholarships: SCHOLARSHIP_NAMES.length,
    exams: EXAM_CODES.length,
    colleges: COLLEGE_NAMES.length,
    reviews: REVIEW_AUTHORS.length,
    blogs: 8,
    jobs: JOB_COMPANIES.length,
    homepage: process.env.SEED_SKIP_HOMEPAGE === "1" ? "skipped" : "updated",
  });

  await mongoose.disconnect();
}

seed().catch((err) => {
  console.error(err);
  process.exit(1);
});
