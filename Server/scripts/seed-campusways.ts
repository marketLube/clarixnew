/**
 * Seed colleges and courses from campusways.com
 * ONLY INSERTS — never deletes or modifies existing data.
 * Skips colleges that already exist by name.
 */
import dns from "node:dns";
import path from "node:path";
import { fileURLToPath } from "node:url";
dns.setServers(["8.8.8.8", "8.8.4.4"]);

import dotenv from "dotenv";
import mongoose from "mongoose";
const __dirname = path.dirname(fileURLToPath(import.meta.url));
dotenv.config({ path: path.join(__dirname, "..", ".env") });

import { College } from "../src/modules/colleges/models/collegeModel.js";
import { Course } from "../src/modules/courses/models/courseModel.js";
import { University } from "../src/modules/universities/models/universityModel.js";
import { Stream } from "../src/modules/streams/model/streamModel.js";
import { Recruiter } from "../src/modules/recruiters/models/recruiterModel.js";
import { Exam } from "../src/modules/exams/model/examModel.js";
import { Scholarship } from "../src/modules/scholorship/model/scholorshipModel.js";

const CW_API = "https://www.campusways.com/wp-json/wiloke/v2/listings";
const PDF = "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf";

function sleep(ms: number) { return new Promise(r => setTimeout(r, ms)); }

// Map campusways city to state
const CITY_STATE: Record<string, string> = {
  bangalore: "Karnataka", mangalore: "Karnataka", mysore: "Karnataka",
  coimbatore: "Tamil Nadu", chennai: "Tamil Nadu", salem: "Tamil Nadu",
  ernakulam: "Kerala", kochi: "Kerala", kerala: "Kerala", thrissur: "Kerala",
  mumbai: "Maharashtra", pune: "Maharashtra", hyderabad: "Telangana",
  delhi: "Delhi", kolkata: "West Bengal", jaipur: "Rajasthan",
  lucknow: "Uttar Pradesh", bhopal: "Madhya Pradesh", ahmedabad: "Gujarat",
  chandigarh: "Chandigarh", dehradun: "Uttarakhand", patna: "Bihar",
  ranchi: "Jharkhand", bhubaneswar: "Odisha", guwahati: "Assam",
  imphal: "Manipur", shillong: "Meghalaya", agartala: "Tripura",
};

function getState(city: string): string {
  const lower = city.toLowerCase().trim();
  for (const [key, state] of Object.entries(CITY_STATE)) {
    if (lower.includes(key)) return state;
  }
  return "Karnataka"; // most campusways colleges are in Karnataka
}

// Map category to stream name
function getCategoryStream(category: string, name: string): string {
  const lower = (category + " " + name).toLowerCase();
  if (lower.includes("nursing")) return "Medical";
  if (lower.includes("medical") || lower.includes("mbbs")) return "Medical";
  if (lower.includes("pharmacy") || lower.includes("pharm")) return "Pharmacy";
  if (lower.includes("engineering") || lower.includes("tech") || lower.includes("bca") || lower.includes("mca")) return "Engineering";
  if (lower.includes("management") || lower.includes("mba") || lower.includes("business")) return "Management";
  if (lower.includes("law")) return "Law";
  if (lower.includes("design") || lower.includes("art")) return "Design";
  if (lower.includes("hotel") || lower.includes("hospitality")) return "Management";
  if (lower.includes("physiotherapy")) return "Medical";
  if (lower.includes("paramedical")) return "Medical";
  return "Medical"; // default for campusways (mostly nursing/medical)
}

async function main() {
  console.log("Connecting to MongoDB…");
  await mongoose.connect(process.env.MONGO_URI as string);
  console.log("Connected.\n");

  // Get existing references
  const streams = await Stream.find().lean();
  const streamMap = new Map(streams.map((s: any) => [s.name.toLowerCase(), s._id]));
  const recruiters = await Recruiter.find().lean();
  const recruiterIds = recruiters.map((r: any) => r._id);
  const exams = await Exam.find().lean();
  const examId = exams[0]?._id;
  const scholarships = await Scholarship.find().lean();
  const scholarshipIds = scholarships.map((s: any) => s._id).slice(0, 3);
  const allCourses = await Course.find().lean();
  const courseMap = new Map(allCourses.map((c: any) => [c.name, c._id]));

  // Get/create university for campusways colleges
  let cwUni = await University.findOne({ name: "Campusways Partner Universities" }).lean();
  if (!cwUni) {
    cwUni = await University.create({
      name: "Campusways Partner Universities",
      type: "Private",
      state: "Karnataka",
      city: "Bangalore",
      establishedYear: 2000,
      description: "Universities partnered with Campusways education platform.",
    });
  }

  // Get existing college names to skip duplicates
  const existingNames = new Set(
    (await College.find({}, { name: 1 }).lean()).map((c: any) => c.name.toLowerCase().trim())
  );

  // ── STEP 1: Scrape all colleges from Campusways ──
  console.log("Scraping colleges from campusways.com…");
  const allColleges: any[] = [];
  for (let page = 1; page <= 10; page++) {
    try {
      const res = await fetch(`${CW_API}?postType=college&postsPerPage=50&page=${page}`, {
        headers: { "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7)" },
        signal: AbortSignal.timeout(15000),
      });
      if (!res.ok) break;
      const data = await res.json();
      const listings = data.listings || data;
      if (!listings || !Array.isArray(listings) || listings.length === 0) break;
      allColleges.push(...listings);
      console.log(`  Page ${page}: ${listings.length} colleges`);
      if (listings.length < 50) break;
      await sleep(1000);
    } catch { break; }
  }
  console.log(`Total scraped: ${allColleges.length}\n`);

  // ── STEP 2: Scrape courses ──
  console.log("Scraping courses from campusways.com…");
  const allCwCourses: any[] = [];
  for (let page = 1; page <= 5; page++) {
    try {
      const res = await fetch(`${CW_API}?postType=course&postsPerPage=50&page=${page}`, {
        headers: { "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7)" },
        signal: AbortSignal.timeout(15000),
      });
      if (!res.ok) break;
      const data = await res.json();
      const listings = data.listings || data;
      if (!listings || !Array.isArray(listings) || listings.length === 0) break;
      allCwCourses.push(...listings);
      console.log(`  Page ${page}: ${listings.length} courses`);
      if (listings.length < 50) break;
      await sleep(1000);
    } catch { break; }
  }
  console.log(`Total courses scraped: ${allCwCourses.length}\n`);

  // ── STEP 3: Create missing courses ──
  for (const cwCourse of allCwCourses) {
    const name = (cwCourse.postTitle || cwCourse.title || "").trim();
    if (!name || courseMap.has(name)) continue;

    const cat = cwCourse.footerCard?.find((f: any) => f.value?.taxonomy === "listing_cat");
    const category = cat?.value?.name || "Nursing";
    const streamName = getCategoryStream(category, name);
    const streamId = streamMap.get(streamName.toLowerCase()) || streams[0]?._id;

    try {
      const course = await Course.create({
        name,
        shortDescription: `${name} program — comprehensive curriculum preparing students for careers in ${streamName.toLowerCase()}.`,
        stream: streamId,
        type: "Full Time",
        duration: name.toLowerCase().includes("gnm") ? "3 Years" : name.toLowerCase().includes("msc") || name.toLowerCase().includes("m.sc") ? "2 Years" : "4 Years",
        fees: "₹50,000 - ₹5,00,000 / year",
        intakeCapacity: "40-100 per institute",
        eligibility: ["10+2 with relevant subjects", "Qualifying entrance exam"],
        cardImage: cwCourse.featuredImage || cwCourse.thumbnail || `https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?ixlib=rb-4.1.0&auto=format&fit=crop&fm=jpg&w=800&q=85`,
        heroImage: cwCourse.featuredImage || `https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?ixlib=rb-4.1.0&auto=format&fit=crop&fm=jpg&w=1600&q=85`,
        description: { title: `About ${name}`, content: `${name} is a professional program in ${streamName.toLowerCase()} sciences.`, image: cwCourse.featuredImage || "" },
        whyChoose: { title: `Why ${name}?`, description: "Key reasons.", reasons: [{ title: "Industry demand", description: "Growing demand for qualified professionals." }] },
        syllabus: { title: "Curriculum", semesters: [{ title: "Year 1-2", topics: ["Foundation subjects", "Core specialization"] }] },
        careerOpportunities: { title: "Careers", items: [{ title: "Professional roles", description: `Wide career options in ${streamName.toLowerCase()} sector.` }] },
        about: { title: "Highlights", description: "Program features.", points: [{ title: "Recognized qualification", description: "Nationally recognized professional degree." }] },
        faqs: { title: "FAQs", description: "Common questions.", items: [{ question: "What are the requirements?", answer: "Check the specific program page for eligibility criteria." }] },
      });
      courseMap.set(name, course._id as mongoose.Types.ObjectId);
      console.log(`  + Course: "${name}"`);
    } catch (err: any) {
      console.log(`  ✗ Course "${name}": ${err.message.substring(0, 60)}`);
    }
  }

  // ── STEP 4: Insert colleges ──
  console.log("\nInserting colleges…");
  let created = 0, skipped = 0;

  for (const cw of allColleges) {
    const name = (cw.postTitle || cw.title || "").trim();
    if (!name) continue;

    // Skip non-college entries (like "Best BCA Colleges in Kerala")
    if (name.toLowerCase().startsWith("best ") || name.toLowerCase().startsWith("top ")) {
      skipped++;
      continue;
    }

    // Skip if already exists
    if (existingNames.has(name.toLowerCase().trim())) {
      skipped++;
      continue;
    }

    const loc = cw.footerCard?.find((f: any) => f.value?.taxonomy === "listing_location");
    const city = loc?.value?.name || "Bangalore";
    const state = getState(city);
    const cat = cw.footerCard?.find((f: any) => f.value?.taxonomy === "listing_cat");
    const category = cat?.value?.name || "";
    const streamName = getCategoryStream(category, name);

    const logo = cw.logo || cw.thumbnail || cw.featuredImage || "";
    const featuredImg = cw.featuredImage || cw.thumbnail || logo;
    const gallery = (cw.gallery || []).map((g: any) => g.url || g.full || "").filter(Boolean);

    // Build campus images from available sources
    const campusImages = [featuredImg, ...gallery].filter(Boolean).slice(0, 5);
    if (campusImages.length === 0) {
      campusImages.push(`https://images.unsplash.com/photo-1562774053-701939374585?ixlib=rb-4.1.0&auto=format&fit=crop&fm=jpg&w=1200&q=85`);
    }

    // Assign relevant courses
    const relevantCourseNames = [...courseMap.keys()].filter(cn => {
      const cl = cn.toLowerCase();
      const sl = streamName.toLowerCase();
      if (sl === "medical" && (cl.includes("nursing") || cl.includes("medical") || cl.includes("bsc"))) return true;
      if (sl === "pharmacy" && cl.includes("pharm")) return true;
      if (sl === "engineering" && (cl.includes("tech") || cl.includes("engineering") || cl.includes("bca"))) return true;
      if (sl === "management" && (cl.includes("mba") || cl.includes("management") || cl.includes("bba"))) return true;
      return false;
    });
    const courseIds = relevantCourseNames.slice(0, 15).map(cn => courseMap.get(cn)!).filter(Boolean);

    try {
      await College.create({
        name,
        state,
        city,
        country: "India",
        type: "Private" as const,
        rating: 3.5 + Math.random() * 1.0,
        establishedYear: 1990 + Math.floor(Math.random() * 30),
        accreditation: ["AICTE", "INC"],
        logo: logo || campusImages[0],
        brochure: PDF,
        description: `${name} is a reputed institution in ${city}, ${state} offering quality education in ${streamName.toLowerCase()} sciences with experienced faculty and modern infrastructure.`,
        university: cwUni._id,
        students: 500 + Math.floor(Math.random() * 2000),
        campusSize: `${5 + Math.floor(Math.random() * 20)} acres`,
        averageSalary: 300000 + Math.floor(Math.random() * 400000),
        placementPercentage: 60 + Math.floor(Math.random() * 30),
        highestSalary: 800000 + Math.floor(Math.random() * 1200000),
        placementTrends: [
          { year: "2023", avgSalary: "3.5 LPA", placementPercentage: "70%" },
          { year: "2024", avgSalary: "4.0 LPA", placementPercentage: "75%" },
        ],
        recruiters: recruiterIds.slice(0, 5),
        recruitersCount: 20 + Math.floor(Math.random() * 50),
        studentsWithInternships: 40 + Math.floor(Math.random() * 30),
        avgStipend: 8000 + Math.floor(Math.random() * 7000),
        ppoConversionRate: 10 + Math.floor(Math.random() * 20),
        alumniInFortune500: Math.floor(Math.random() * 3),
        alumniEntrepreneurs: 2 + Math.floor(Math.random() * 10),
        alumniHigherStudiesAbroad: 3 + Math.floor(Math.random() * 10),
        courses: courseIds,
        entranceExam: examId,
        admissionMode: [
          { mode: "Merit List" as const, label: "Merit-based", description: "Based on qualifying exam marks." },
          { mode: "Management Quota" as const, label: "Direct admission", description: "Direct admission through management quota." },
        ],
        hostelFee: "₹60,000 - ₹1,20,000 / year",
        messFee: "₹36,000 - ₹60,000 / year",
        libraryFee: "₹5,000 / year",
        laboratoryFee: "₹10,000 / year",
        sportsFee: "₹3,000 / year",
        annualFee: "₹50,000 - ₹3,00,000 / year",
        avgAnnualFee: "₹1,50,000 / year",
        scholarships: scholarshipIds,
        campusImages,
        hostelImages: campusImages.length > 1 ? [campusImages[1]!] : [],
        labsImages: campusImages.length > 2 ? [campusImages[2]!] : [],
        eventsImages: [campusImages[0]!],
        admissionFaqs: [
          { question: "What is the admission process?", answer: `Admission to ${name} is based on merit and entrance exam scores. Direct admission is also available.` },
          { question: "What documents are required?", answer: "10th & 12th mark sheets, entrance exam scorecard, transfer certificate, passport photos, and category certificate (if applicable)." },
        ],
        courseFaqs: [
          { question: "What courses are offered?", answer: `${name} offers programs in ${streamName.toLowerCase()} sciences. Check the courses tab for the complete list.` },
        ],
        feesPaymentFaqs: [
          { question: "Is EMI available?", answer: "Yes, semester-wise payment and education loan options are available." },
        ],
        scholarshipFaqs: [
          { question: "Are scholarships available?", answer: "Yes, merit-based and need-based scholarships are available. Government scholarship schemes also apply." },
        ],
        campusLife: [
          { title: "Student Activities", description: `${name} offers vibrant campus life with clubs, sports, and cultural events.`, verified: true, tags: ["campus", "events"], image: campusImages[0], source: "College Website", isActive: true },
          { title: "Clinical Training", description: "Hands-on clinical training at affiliated hospitals and healthcare centers.", verified: true, tags: ["training", "practical"], image: campusImages[campusImages.length > 1 ? 1 : 0], source: "Academic Department", isActive: true },
        ],
        category: streamName,
      });

      existingNames.add(name.toLowerCase().trim());
      created++;
      if (created % 20 === 0 || created <= 5) {
        console.log(`  [${created}] ✓ "${name}" (${city}, ${state})`);
      }
    } catch (err: any) {
      console.log(`  ✗ "${name}": ${err.message.substring(0, 80)}`);
    }
  }

  console.log(`\n${"═".repeat(50)}`);
  console.log(`  Campusways Seed Complete`);
  console.log(`  Created: ${created} colleges`);
  console.log(`  Skipped: ${skipped} (duplicates/invalid)`);
  console.log(`  Courses: ${courseMap.size} total in DB`);
  console.log(`${"═".repeat(50)}`);

  await mongoose.disconnect();
}

main().catch(e => { console.error(e); process.exit(1); });
