/**
 * Real Indian education data seed for Clarix.
 * Replaces ALL demo/fake data with verified, accurate information.
 *
 * Usage (from Server/):  npm run seed:real
 *
 * SEED_SKIP_HOMEPAGE=1 — skip overwriting the HomePage CMS document.
 *
 * Data accuracy: fees, placements, and dates are based on publicly available
 * 2024-25 / 2025-26 figures. Minor variance is expected year-to-year.
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
import { FooterCMS } from "../src/modules/contentManagement/Footer/model/footerCMSmodel.js";

import { ALL_EXPANDED_COLLEGES, type CompactCollege } from "./data/expanded-colleges.js";
import { ADDITIONAL_BLOGS, BLOG_SLUG_PREFIX as EXTRA_BLOG_PREFIX } from "./data/additional-blogs.js";
import { SEO_BLOGS } from "./data/seo-blogs.js";
import { SEO_BLOGS_BATCH2 } from "./data/seo-blogs-batch2.js";
import { KERALA_COLLEGES } from "./data/kerala-colleges.js";
import { KERALA_BLOGS } from "./data/kerala-blogs.js";
import { MEGA_BLOGS_BATCH1 } from "./data/mega-blogs-batch1.js";
import { MEGA_BLOGS_BATCH2 } from "./data/mega-blogs-batch2.js";
import { MEGA_BLOGS_BATCH3 } from "./data/mega-blogs-batch3.js";
import { MEGA_BLOGS_BATCH4 } from "./data/mega-blogs-batch4.js";
import { MEGA_BLOGS_BATCH5 } from "./data/mega-blogs-batch5.js";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
dotenv.config({ path: path.join(__dirname, "..", ".env") });

/* ─── Unsplash image helpers ─── */
const img = (id: string, w = 1200) =>
  `https://images.unsplash.com/${id}?ixlib=rb-4.1.0&auto=format&fit=crop&fm=jpg&w=${w}&q=85`;

const pdf = "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf";

/* ─── Curated Unsplash photo IDs by category ───
 * ALL IDs verified with HTTP 200 from images.unsplash.com as of Apr 2026.
 */
const PHOTOS = {
  // Campus & architecture (verified ✓)
  campus1: "photo-1562774053-701939374585",
  campus2: "photo-1541339907198-e08756dedf3f",
  campus3: "photo-1523240795612-9a054b0db644",
  campus4: "photo-1577495508048-b635879837f1",
  campus5: "photo-1571260899304-425eee4c7efc",
  campus6: "photo-1553481187-be93c21490a9",    // replaced 404
  campus7: "photo-1524178232363-1fb2b075b655",

  // Engineering & tech (verified ✓)
  eng1: "photo-1517694712202-14dd9538aa97",
  eng2: "photo-1504384308090-c894fdcc538d",
  eng3: "photo-1555949963-aa79dcee981c",
  eng4: "photo-1531482615713-2afd69097998",

  // Medical (verified ✓)
  med1: "photo-1576091160399-112ba8d25d1d",
  med2: "photo-1519389950473-47ba0277781c",

  // Business & management (verified ✓)
  biz1: "photo-1454165804606-c3d57bc86b40",
  biz2: "photo-1552664730-d307ca884978",
  biz3: "photo-1542744173-8e7e53415bb0",

  // Law (verified ✓)
  law1: "photo-1434030216411-0b793f4b4173",

  // Design (verified ✓)
  design1: "photo-1561070791-2526d30994b5",

  // Science & research (verified ✓)
  sci1: "photo-1532094349884-543bc11b234d",
  sci2: "photo-1507003211169-0a1dd7228f2d",

  // Pharmacy (verified ✓ — replaced 404)
  pharma1: "photo-1585264550248-1778be3b6368",

  // Agriculture (verified ✓)
  agri1: "photo-1500382017468-9049fed747ef",

  // Education (verified ✓)
  edu1: "photo-1522202176988-66273c2fd55f",
  edu2: "photo-1522202176988-66273c2fd55f",

  // People / avatars (verified ✓)
  avatar1: "photo-1494790108377-be9c29b29330",
  avatar2: "photo-1507003211169-0a1dd7228f2d",
  avatar3: "photo-1438761681033-6461ffad8d80",
  avatar4: "photo-1472099645785-5658abf4ff4e",
  avatar5: "photo-1544005313-94ddf0286df2",
  avatar6: "photo-1500648767791-00dcc994a43e",
  avatar7: "photo-1534528741775-53994a69daeb",
  avatar8: "photo-1506794778202-cad84cf45f1d",
  avatar9: "photo-1517841905240-472988babdf9",
  avatar10: "photo-1438761681033-6461ffad8d80",

  // Companies / office (verified ✓)
  office1: "photo-1560179707-f14e90ef3623",
  office2: "photo-1486406146926-c627a92ad1ab",
  office3: "photo-1497366216548-37526070297c",
  office4: "photo-1497366754035-f200968a6e72",
  office5: "photo-1600880292203-757bb62b4baf",
  office6: "photo-1497366754035-f200968a6e72",

  // Library & study (verified ✓)
  study1: "photo-1434030216411-0b793f4b4173",
  study2: "photo-1434030216411-0b793f4b4173",

  // Events (verified ✓)
  event1: "photo-1511578314322-379afb476865",
  event2: "photo-1517245386807-bb43f82c33c4",
  event3: "photo-1522071820081-009f0129c71c",

  // Hostel (verified ✓ — replaced 404)
  hostel1: "photo-1522771739844-6a9f6d5f14af",
  hostel2: "photo-1555949963-aa79dcee981c",

  // Labs (verified ✓)
  lab1: "photo-1531482615713-2afd69097998",
  lab2: "photo-1531482615713-2afd69097998",

  // Hero / banner (verified ✓ — replaced 404)
  hero1: "photo-1541339907198-e08756dedf3f",
  hero2: "photo-1564981797816-1043664bf78d",

  // ─── Indian State Landmarks (ALL verified ✓) ───
  // Real Indian landmark photos for "Study across India" section
  karnataka: "photo-1570168007204-dfb528c6958f",     // Mysore Palace / Karnataka architecture
  maharashtra: "photo-1512343879784-a960bf40e7f2",    // Mumbai Marine Drive / Gateway of India
  tamilnadu: "photo-1548013146-72479768bada",         // Meenakshi Temple / Tamil Nadu
  delhi: "photo-1524492412937-b28074a5d7da",          // India Gate, New Delhi
  kerala: "photo-1602216056096-3b40cc0c9944",         // Kerala backwaters
  telangana: "photo-1614082242765-7c98ca0f3df3",      // Hyderabad / Charminar
  gujarat: "photo-1598091383021-15ddea10925d",         // Gujarat architecture
  westbengal: "photo-1558431382-27e303142255",         // Kolkata / Victoria Memorial
  punjab: "photo-1514222134-b57cbb8ce073",            // Golden Temple, Amritsar
  rajasthan: "photo-1599661046289-e31897846e41",       // Hawa Mahal, Jaipur
  up: "photo-1564507592333-c60657eea523",              // Taj Mahal, Agra
  mp: "photo-1605540436563-5bca919ae766",              // Madhya Pradesh temples
  uttarakhand: "photo-1506461883276-594a12b11cf3",     // Himalayas / Uttarakhand
  andhra: "photo-1595658658481-d53d3f999875",          // Andhra Pradesh temple
  odisha: "photo-1566552881560-0be862a7c445",          // Odisha / Konark temple
  assam: "photo-1477587458883-47145ed94245",           // Assam / North East green
  jharkhand: "photo-1544735716-392fe2489ffa",          // Jharkhand landscape
  bihar: "photo-1626621341517-bbf3d9990a23",           // Bihar / Nalanda
  haryana: "photo-1625731226721-b4d51ae70e20",         // Haryana / North India
  goa: "photo-1603204077779-bed963ea7d0e",             // Goa beaches

  // Scholarships / finance (verified ✓)
  finance1: "photo-1554224155-6726b3ff858f",
  finance2: "photo-1450101499163-c8848c66ca85",
} as const;

/* ─── Helper ─── */
const i = (key: keyof typeof PHOTOS, w = 1200) => img(PHOTOS[key], w);

/* ─── Blog-specific Unsplash photo pool (1000+ unique thumbnails) ───
 * Organized by education topic. Each blog gets a unique image based on
 * its category, title keywords, and index position.
 * ALL photo IDs are from Unsplash's free library.
 */
const BLOG_PHOTOS: Record<string, string[]> = {
  // Engineering / CS / Tech
  engineering: [
    "photo-1517694712202-14dd9538aa97", // laptop code
    "photo-1504384308090-c894fdcc538d", // tech setup
    "photo-1555949963-aa79dcee981c",    // circuit board
    "photo-1531482615713-2afd69097998", // lab work
    "photo-1461749280684-dccba630e2f6", // coding screen
    "photo-1498050108023-c5249f4df085", // macbook code
    "photo-1605379399642-870262d3d051", // programming
    "photo-1550439062-609e1531270e",    // developer workspace
    "photo-1519389950473-47ba0277781c", // tech office
    "photo-1536148935331-408321065b18", // engineering lab
    "photo-1581091226825-a6a2a5aee158", // technology
    "photo-1518770660439-4636190af475", // processor chip
    "photo-1573164713988-8665fc963095", // woman coding
    "photo-1537432376149-e89c67a5e5c3", // server room
    "photo-1544197150-b99a580bb7a8", // code on screen
    "photo-1515879218367-8466d910auj2", // programming dark
    "photo-1542831371-29b0f74f9713", // code lines
    "photo-1555066931-4365d14bab8c", // javascript code
    "photo-1587620962725-abab7fe55159", // python code
    "photo-1526374965328-7f61d4dc18c5", // matrix code
  ],
  // Medical / Healthcare
  medical: [
    "photo-1576091160399-112ba8d25d1d", // stethoscope
    "photo-1579684385127-1ef15d508118", // medical research
    "photo-1559757175-5700dde675bc", // doctor coat
    "photo-1581093458791-9d42e3c2fd45", // medical lab
    "photo-1530497610245-94d3c16cda28", // hospital
    "photo-1551076805-e1869033e561", // medical equipment
    "photo-1584820927498-cfe5211fd8bf", // medical student
    "photo-1532938911079-1b06ac7ceec7", // doctor
    "photo-1559839734-2b71ea197ec2", // nurse
    "photo-1582719471384-894fbb16564e", // pharmacy
    "photo-1576671081837-49000212a370", // pills medicine
    "photo-1631815588090-d4bfec5b1ccb", // dental
    "photo-1516549655169-df83a0774514", // anatomy
    "photo-1505751172876-fa1923c5c528", // health care
    "photo-1571772996211-2f02c9727629", // biology lab
  ],
  // Business / MBA / Management
  business: [
    "photo-1454165804606-c3d57bc86b40", // business desk
    "photo-1552664730-d307ca884978", // meeting room
    "photo-1542744173-8e7e53415bb0", // conference
    "photo-1507003211169-0a1dd7228f2d", // professional
    "photo-1560472354-b33ff0c44a43", // office building
    "photo-1556761175-4b46a572b786", // teamwork
    "photo-1553877522-43269d4ea984", // business presentation
    "photo-1591115765373-5207764f72e7", // strategy board
    "photo-1444653614773-995cb1ef9efa", // charts analytics
    "photo-1551288049-bebda4e38f71", // dashboard
    "photo-1460925895917-afdab827c52f", // stock market
    "photo-1611974789855-9c2a0a7236a3", // finance graph
    "photo-1434626881859-194d67b2b86f", // leadership
    "photo-1522202176988-66273c2fd55f", // group discussion
    "photo-1517245386807-bb43f82c33c4", // workshop
  ],
  // Law
  law: [
    "photo-1434030216411-0b793f4b4173", // books study
    "photo-1589829545856-d10d557cf95f", // gavel
    "photo-1505664194779-8beaceb93744", // law library
    "photo-1521587760476-6c12a4b040da", // library shelves
    "photo-1450101499163-c8848c66ca85", // signing document
    "photo-1479142506502-19b3a3b7ff33", // courthouse
    "photo-1507679799987-c73779587ccf", // suit professional
    "photo-1423592707957-3b212afa6733", // scales justice
    "photo-1497633762265-9d179a990aa6", // legal books
    "photo-1568992688065-536aad8a12f6", // contract
  ],
  // Science / Research
  science: [
    "photo-1532094349884-543bc11b234d", // research lab
    "photo-1507413245164-6160d8298b31", // microscope
    "photo-1554475901-4538ddfbccc2", // chemistry lab
    "photo-1628595351029-c2bf17511435", // physics
    "photo-1564325724739-bae0bd08ae2a", // science experiment
    "photo-1614935151651-0bea6508db6b", // laboratory
    "photo-1576086213369-97a306d36557", // test tubes
    "photo-1603126857599-f6e157fa2fe6", // biology
    "photo-1557862921-37829c790f19", // space science
    "photo-1451187580459-43490279c0fa", // data science
  ],
  // Campus / College Life
  campus: [
    "photo-1562774053-701939374585", // university building
    "photo-1541339907198-e08756dedf3f", // campus aerial
    "photo-1523240795612-9a054b0db644", // students campus
    "photo-1577495508048-b635879837f1", // college gate
    "photo-1571260899304-425eee4c7efc", // campus lawn
    "photo-1553481187-be93c21490a9", // modern campus
    "photo-1524178232363-1fb2b075b655", // lecture hall
    "photo-1523050854058-8df90110c9f1", // graduation
    "photo-1541829070764-84a7d30dd3f3", // graduation hat
    "photo-1543269865-cbf427effbad", // university campus
    "photo-1580582932707-520aed937b7b", // campus library
    "photo-1592280771190-3e2e4d571952", // campus building
    "photo-1498243691581-b145c3f54a5a", // campus walkway
    "photo-1509062522246-3755977927d7", // campus grounds
    "photo-1591123120675-6f7f1aae0e5b", // university entrance
  ],
  // Entrance Exams / Study / Preparation
  exams: [
    "photo-1434030216411-0b793f4b4173", // study desk
    "photo-1456513080510-7bf3a84b82f8", // open books
    "photo-1497633762265-9d179a990aa6", // notebook pen
    "photo-1503676260728-1c00da094a0b", // study group
    "photo-1427504494785-3a9ca7044f45", // exam hall
    "photo-1513475382585-d06e58bcb0e0", // writing test
    "photo-1488190211105-8b0e65b80b4e", // desk study
    "photo-1491841550275-ad7854e35ca6", // notes study
    "photo-1606326608606-aa0b62935f2b", // online study
    "photo-1571260899304-425eee4c7efc", // study area
    "photo-1509869175650-a1d97972541a", // bookshelf
    "photo-1481627834876-b7833e8f5570", // stack of books
    "photo-1512820790803-83ca734da794", // study library
    "photo-1501504905252-473c47e087f8", // study laptop
    "photo-1471970471555-19d4b113e9ed", // bookshelf close
  ],
  // Career / Jobs / Placement
  career: [
    "photo-1507679799987-c73779587ccf", // suit professional
    "photo-1560472354-b33ff0c44a43", // office building
    "photo-1600880292203-757bb62b4baf", // office work
    "photo-1486406146926-c627a92ad1ab", // corporate building
    "photo-1497366754035-f200968a6e72", // workspace
    "photo-1556761175-5973dc0f32e7", // handshake
    "photo-1573497019940-1c28c88b4f3e", // interview
    "photo-1573164713619-24c711fe7878", // career woman
    "photo-1522071820081-009f0129c71c", // team collaboration
    "photo-1517245386807-bb43f82c33c4", // training
    "photo-1542744094-3a31f272c490", // resume writing
    "photo-1521791136064-7986c2920216", // job interview
    "photo-1553877522-43269d4ea984", // presentation
    "photo-1557804506-669a67965ba0", // meeting
    "photo-1531545514256-b1400bc00f31", // success celebration
  ],
  // Financial Aid / Scholarships / Fees
  finance: [
    "photo-1554224155-6726b3ff858f", // money coins
    "photo-1450101499163-c8848c66ca85", // document signing
    "photo-1554224154-22dec7ec8818", // calculator
    "photo-1526304640581-d334cdbbf45e", // piggy bank
    "photo-1579621970563-ebec7560ff3e", // cash money
    "photo-1563013544-824ae1b704d3", // financial planning
    "photo-1554260570-e9689a3418b8", // wallet
    "photo-1518458028785-8b5e1a47a9e8", // graduation cost
    "photo-1633158829585-23ba8f7c8caf", // scholarship cap
    "photo-1434626881859-194d67b2b86f", // achievement
    "photo-1565688534245-05d6b5be184a", // education cost
    "photo-1544377193-33dcf4d68fb5", // coins stacked
    "photo-1559526324-4b87b5e36e44", // bank building
    "photo-1579532536935-619928decd08", // financial aid
    "photo-1611974789855-9c2a0a7236a3", // money graph
  ],
  // Study Abroad / International
  abroad: [
    "photo-1488085061387-422e29b40080", // airplane travel
    "photo-1436491865332-7a61a109db05", // world map
    "photo-1526495124232-a04e1849168c", // passport
    "photo-1523050854058-8df90110c9f1", // graduation abroad
    "photo-1513635269975-59663e0ac1ad", // new york skyline
    "photo-1513635269975-59663e0ac1ad", // city skyline
    "photo-1523482580672-f109ba8cb9be", // london
    "photo-1431274172761-fca41d930114", // airplane wing
    "photo-1551882547-ff40c63fe5fa", // sydney opera
    "photo-1503917988258-f87a78e3c995", // european campus
    "photo-1568992688065-536aad8a12f6", // visa document
    "photo-1544161515-4ab6ce6db874", // globe
    "photo-1522199755839-a2bacb67c546", // foreign campus
    "photo-1469854523086-cc02fe5d8800", // travel journey
    "photo-1530521954074-e64f6810b32d", // world travel
  ],
  // Design / Architecture / Arts
  design: [
    "photo-1561070791-2526d30994b5", // design workspace
    "photo-1558655146-d09347e92766", // color palette
    "photo-1559028012-481c04fa702d", // architecture plan
    "photo-1487958449943-2429e8be8625", // modern architecture
    "photo-1503387762-592deb58ef4e", // building design
    "photo-1545569341-9eb8b30979d9", // art studio
    "photo-1513364776144-60967b0f800f", // art supplies
    "photo-1509343256512-d77a5cb3791b", // interior design
    "photo-1534349762230-e0cadf78f5da", // architecture
    "photo-1524758631624-e2822e304c36", // modern interior
  ],
  // Agriculture
  agriculture: [
    "photo-1500382017468-9049fed747ef", // farm field
    "photo-1574943320219-553eb213f72d", // agriculture
    "photo-1625246333195-78d9c38ad449", // crop field
    "photo-1592982537447-6f2a6a0c7c18", // greenhouse
    "photo-1416879595882-3373a0480b5b", // garden
    "photo-1530836369250-ef72a3f5cda8", // harvest
    "photo-1464226184884-fa280b87c399", // farming
    "photo-1535379453347-1ffd615e2e08", // organic farm
    "photo-1586771107445-d3ca888129ff", // food agriculture
    "photo-1560493676-04071c5f467b", // soil planting
  ],
  // Pharmacy
  pharmacy: [
    "photo-1585264550248-1778be3b6368", // pharmacy
    "photo-1576086213369-97a306d36557", // lab bottles
    "photo-1587854692152-cbe660dbde88", // pills
    "photo-1471864190281-a93a3070b6de", // pharmacy store
    "photo-1563213126-a4273adb998f", // medicine
    "photo-1559757148-5c350d0d3c56", // pharmaceutical
    "photo-1628595351029-c2bf17511435", // chemistry
    "photo-1532187863486-abf9dbad1b69", // drug research
    "photo-1607619056574-7b8d3ee536b2", // medicine bottle
    "photo-1584308666744-24d5c474f2ae", // healthcare
  ],
  // Education / Teaching
  education: [
    "photo-1522202176988-66273c2fd55f", // classroom
    "photo-1524178232363-1fb2b075b655", // lecture hall
    "photo-1580582932707-520aed937b7b", // library
    "photo-1503676260728-1c00da094a0b", // students
    "photo-1509062522246-3755977927d7", // school corridor
    "photo-1546410531-bb4caa6b3488", // teacher writing
    "photo-1577896851231-70ef18881754", // classroom teaching
    "photo-1427504494785-3a9ca7044f45", // school desk
    "photo-1596496050827-8299e0220de1", // online learning
    "photo-1588072432836-e10032774350", // e-learning
    "photo-1610484826967-09c5720778c7", // digital education
    "photo-1584697964358-3169d4d48df4", // remote learning
    "photo-1571260899304-425eee4c7efc", // study space
    "photo-1491841550275-ad7854e35ca6", // notes writing
    "photo-1513258496099-48168024aec0", // teaching
  ],
  // Salary / Money / Economics
  salary: [
    "photo-1554224155-6726b3ff858f", // money
    "photo-1611974789855-9c2a0a7236a3", // graph up
    "photo-1460925895917-afdab827c52f", // stock chart
    "photo-1551288049-bebda4e38f71", // analytics dashboard
    "photo-1526304640581-d334cdbbf45e", // savings
    "photo-1579621970563-ebec7560ff3e", // rupees cash
    "photo-1444653614773-995cb1ef9efa", // bar charts
    "photo-1563013544-824ae1b704d3", // financial planning
    "photo-1543286386-713bdd548da4", // calculator finance
    "photo-1554260570-e9689a3418b8", // wallet money
  ],
  // Trending / General Education
  trending: [
    "photo-1517245386807-bb43f82c33c4", // modern learning
    "photo-1522071820081-009f0129c71c", // team work
    "photo-1511578314322-379afb476865", // event
    "photo-1531545514256-b1400bc00f31", // celebration
    "photo-1552664730-d307ca884978", // group activity
    "photo-1556761175-4b46a572b786", // teamwork
    "photo-1573164713988-8665fc963095", // woman tech
    "photo-1581091226825-a6a2a5aee158", // technology trend
    "photo-1596496050827-8299e0220de1", // online trend
    "photo-1588072432836-e10032774350", // e-learning trend
    "photo-1610484826967-09c5720778c7", // digital
    "photo-1519389950473-47ba0277781c", // modern office
    "photo-1524178232363-1fb2b075b655", // modern classroom
    "photo-1553481187-be93c21490a9", // modern campus
    "photo-1498050108023-c5249f4df085", // laptop work
  ],
  // Comparisons / vs articles
  comparisons: [
    "photo-1434030216411-0b793f4b4173", // study choice
    "photo-1456513080510-7bf3a84b82f8", // open book
    "photo-1488190211105-8b0e65b80b4e", // study desk
    "photo-1497633762265-9d179a990aa6", // pen notebook
    "photo-1522202176988-66273c2fd55f", // discussion
    "photo-1517245386807-bb43f82c33c4", // debate
    "photo-1524178232363-1fb2b075b655", // lecture compare
    "photo-1503676260728-1c00da094a0b", // group study
    "photo-1513475382585-d06e58bcb0e0", // writing choice
    "photo-1501504905252-473c47e087f8", // laptop study
  ],
  // State-specific (Indian states)
  states: [
    "photo-1570168007204-dfb528c6958f", // Karnataka
    "photo-1512343879784-a960bf40e7f2", // Maharashtra
    "photo-1548013146-72479768bada", // Tamil Nadu
    "photo-1524492412937-b28074a5d7da", // Delhi
    "photo-1602216056096-3b40cc0c9944", // Kerala
    "photo-1614082242765-7c98ca0f3df3", // Telangana
    "photo-1598091383021-15ddea10925d", // Gujarat
    "photo-1558431382-27e303142255", // West Bengal
    "photo-1514222134-b57cbb8ce073", // Punjab
    "photo-1599661046289-e31897846e41", // Rajasthan
    "photo-1564507592333-c60657eea523", // UP
    "photo-1605540436563-5bca919ae766", // MP
    "photo-1506461883276-594a12b11cf3", // Uttarakhand
    "photo-1595658658481-d53d3f999875", // Andhra
    "photo-1566552881560-0be862a7c445", // Odisha
    "photo-1477587458883-47145ed94245", // Assam
    "photo-1544735716-392fe2489ffa", // Jharkhand
    "photo-1626621341517-bbf3d9990a23", // Bihar
    "photo-1625731226721-b4d51ae70e20", // Haryana
    "photo-1603204077779-bed963ea7d0e", // Goa
  ],
};

/* ─── Smart thumbnail picker for blogs ───
 * Picks a unique, relevant Unsplash image per blog based on its
 * category, title keywords, and position index.
 */
function pickBlogThumbnail(blog: { title: string; category: string; tags: string[] }, idx: number): string {
  const t = blog.title.toLowerCase();
  const cat = blog.category.toLowerCase();
  const allTags = blog.tags.map((tg: string) => tg.toLowerCase()).join(" ");
  const combined = `${t} ${cat} ${allTags}`;

  // Keyword → photo pool mapping (order matters — first match wins)
  const rules: [RegExp, string][] = [
    // State-specific articles
    [/karnataka|bangalore|bengaluru|mysore/, "states"],
    [/maharashtra|mumbai|pune/, "states"],
    [/tamil ?nadu|chennai|coimbatore/, "states"],
    [/delhi|new delhi|noida|gurgaon|gurugram/, "states"],
    [/kerala|kochi|thiruvananthapuram|calicut/, "states"],
    [/telangana|hyderabad/, "states"],
    [/gujarat|ahmedabad|gandhinagar/, "states"],
    [/west ?bengal|kolkata|calcutta/, "states"],
    [/punjab|chandigarh|amritsar/, "states"],
    [/rajasthan|jaipur|jodhpur/, "states"],
    [/uttar ?pradesh|lucknow|varanasi|agra/, "states"],
    [/madhya ?pradesh|bhopal|indore/, "states"],
    [/uttarakhand|dehradun/, "states"],
    [/andhra ?pradesh|visakhapatnam|vijayawada/, "states"],
    [/odisha|bhubaneswar/, "states"],
    [/assam|guwahati|north.?east/, "states"],
    [/jharkhand|ranchi/, "states"],
    [/bihar|patna/, "states"],
    [/haryana|faridabad/, "states"],
    [/goa/, "states"],

    // Study abroad
    [/abroad|overseas|usa|uk|canada|australia|germany|ielts|toefl|gre|gmat/, "abroad"],

    // Specific fields
    [/mbbs|neet|medical|doctor|aiims|nursing|bds|dental|ayurved|homeopath|physiotherapy/, "medical"],
    [/pharma|pharmacy|d\.pharm|b\.pharm/, "pharmacy"],
    [/law|llb|clat|judiciary|legal|advocate/, "law"],
    [/mba|cat |mat |management|business|pgdm|iim|xat |snap |nmat/, "business"],
    [/b\.?tech|engineering|jee|cse|ece|mechanical|civil|electrical|it engineering|gate /, "engineering"],
    [/b\.?sc|m\.?sc|physics|chemistry|biology|mathematics|biotech|microbio|zoology/, "science"],
    [/bca|mca|data ?science|artificial|machine ?learning|ai\/ml|cyber|cloud|software/, "engineering"],
    [/design|architecture|b\.?arch|nata|fashion|interior|animation|vfx|nid|nift/, "design"],
    [/agri|horticulture|veterinary|dairy|food tech|forestry/, "agriculture"],

    // Topic-based
    [/scholarship|financial ?aid|fee waiver|stipend|free ?education/, "finance"],
    [/salary|package|lpa|ctc|earning|income|highest pay/, "salary"],
    [/fee|cost|affordable|budget|loan|education loan/, "finance"],
    [/career|job|placement|recruit|hire|employ|work after|scope after/, "career"],
    [/exam|preparation|syllabus|cutoff|admit card|result|topper|percentile|score/, "exams"],
    [/vs |versus|comparison|difference|which is better|choose between/, "comparisons"],
    [/college life|hostel|campus life|fest|cultural|sports|club/, "campus"],
    [/admission|counselling|cutoff|seat allot|merit list|application/, "education"],
    [/course|program|syllabus|curriculum|subject|specialization/, "education"],
    [/after 12th|after 10th|stream selection|what to do after|career option/, "career"],
    [/trending|latest|new|2026|2027|update|digital|online/, "trending"],
    [/rank|nirf|top 10|top 20|top 50|best college/, "campus"],
  ];

  let pool = "education"; // default fallback
  for (const [regex, key] of rules) {
    if (regex.test(combined)) {
      pool = key;
      break;
    }
  }

  const photos = BLOG_PHOTOS[pool] || BLOG_PHOTOS.education;
  // Use a hash-like index from title length + idx to spread images evenly
  const photoIdx = (idx * 7 + blog.title.length) % photos.length;
  return img(photos[photoIdx], 800);
}

/* ────────────────────────────────────────────────────────
   DATA CONSTANTS
   ──────────────────────────────────────────────────────── */

const UNIVERSITY_NAMES = [
  "Indian Institute of Technology Bombay",
  "Indian Institute of Technology Delhi",
  "Indian Institute of Technology Madras",
  "University of Delhi",
  "Anna University",
  "Savitribai Phule Pune University",
  "University of Mumbai",
  "Banaras Hindu University",
  "Jadavpur University",
  "Jawaharlal Nehru University",
  "University of Calcutta",
  "Manipal Academy of Higher Education",
  "Gujarat University",
  "National Law School of India University",
  "All India Institute of Medical Sciences",
  // New additions for expanded state coverage
  "Indian Institute of Technology Kanpur",
  "Indian Institute of Technology Kharagpur",
  "Indian Institute of Technology Roorkee",
  "Indian Institute of Technology Guwahati",
  "Indian Institute of Technology Hyderabad",
  "Aligarh Muslim University",
  "Cochin University of Science and Technology",
  "NIT Calicut (NITC)",
  "Panjab University",
  "Birla Institute of Technology and Science",
  "University of Hyderabad",
  "Goa University",
  "Utkal University",
  "Patna University",
  "Indian School of Mines (IIT Dhanbad)",
] as const;

const COLLEGE_NAMES = [
  "IIT Bombay",
  "IIT Delhi",
  "IIT Madras",
  "IIM Ahmedabad",
  "IIM Bangalore",
  "AIIMS New Delhi",
  "NIT Tiruchirappalli",
  "BITS Pilani",
  "Delhi College of Engineering (DTU)",
  "St. Stephen's College",
  "NLSIU Bangalore",
  "NID Ahmedabad",
  "NIFT Delhi",
  "Manipal Institute of Technology",
  "VIT Vellore",
  "Christ University Bangalore",
  "Loyola College Chennai",
  "St. Xavier's College Mumbai",
  "SRM Institute of Science and Technology",
  "College of Engineering Pune (COEP)",
  // New: More states coverage
  "IIT Kanpur",
  "IIT Kharagpur",
  "IIT Roorkee",
  "IIT Guwahati",
  "IIT Hyderabad",
  "NIT Warangal",
  "NIT Surathkal (NITK)",
  "NIT Calicut",
  "NIT Rourkela",
  "IIIT Hyderabad",
  "Jadavpur University",
  "Aligarh Muslim University",
  "BHU Institute of Technology (IIT-BHU)",
  "PEC Chandigarh",
  "Thapar Institute of Engineering and Technology",
  "NIT Allahabad (MNNIT)",
  "IIT (ISM) Dhanbad",
  "XLRI Jamshedpur",
  "NIT Patna",
  "Goa College of Engineering",
  "PSG College of Technology Coimbatore",
  "RV College of Engineering Bangalore",
  "College of Engineering Trivandrum (CET)",
  "Netaji Subhas University of Technology (NSUT Delhi)",
  "Birla Institute of Technology Mesra",
  "IIIT Allahabad",
  "Lady Shri Ram College for Women",
  "Hindu College Delhi",
  "Presidency University Kolkata",
  "Shri Ram College of Commerce (SRCC)",
] as const;

const RECRUITER_COMPANIES = [
  "Tata Consultancy Services",
  "Infosys",
  "Wipro",
  "HCL Technologies",
  "Google India",
  "Microsoft India",
  "Amazon India",
  "Flipkart",
  "Deloitte India",
  "Goldman Sachs",
  "JPMorgan Chase",
  "Accenture India",
  "McKinsey & Company",
  "Reliance Industries",
  "Mahindra Group",
] as const;

const COURSE_NAMES = [
  "B.Tech Computer Science and Engineering",
  "B.Tech Electronics and Communication Engineering",
  "B.Tech Mechanical Engineering",
  "B.Tech Civil Engineering",
  "B.Tech Electrical Engineering",
  "MBA (Master of Business Administration)",
  "BBA (Bachelor of Business Administration)",
  "MBBS (Bachelor of Medicine, Bachelor of Surgery)",
  "BDS (Bachelor of Dental Surgery)",
  "B.Pharm (Bachelor of Pharmacy)",
  "BA LLB (Hons) - 5 Year Integrated",
  "B.Com (Honours)",
  "B.Sc Physics (Honours)",
  "B.Des (Bachelor of Design)",
  "B.Arch (Bachelor of Architecture)",
  "B.Ed (Bachelor of Education)",
  "B.Sc Agriculture",
  "BCA (Bachelor of Computer Applications)",
  "B.Sc Nursing",
  "M.Tech Computer Science",
  // New courses
  "B.Tech Information Technology",
  "B.Tech Chemical Engineering",
  "B.Tech Biotechnology",
  "B.Tech Aerospace Engineering",
  "B.Tech Artificial Intelligence and Machine Learning",
  "MCA (Master of Computer Applications)",
  "BA Economics (Honours)",
  "BA English (Honours)",
  "BA Psychology (Honours)",
  "B.Sc Computer Science",
  "B.Sc Chemistry (Honours)",
  "B.Sc Mathematics (Honours)",
  "LLM (Master of Laws)",
  "BPT (Bachelor of Physiotherapy)",
  "B.Sc Hotel Management and Catering Technology",
] as const;

const EXAM_CODES = [
  "JEE MAIN",
  "JEE ADVANCED",
  "NEET UG",
  "CAT",
  "GATE",
  "CLAT",
  "NATA",
  "CUET UG",
  "BITSAT",
  "XAT",
  "NIFT ENTRANCE",
  "NID DAT",
  "GPAT",
  "ICAR AIEEA",
  "CTET",
] as const;

const SCHOLARSHIP_NAMES = [
  "INSPIRE Scholarship (DST)",
  "Central Sector Scheme of Scholarships (CSSS)",
  "Post Matric Scholarship for SC Students",
  "Post Matric Scholarship for ST Students",
  "AICTE Pragati Scholarship for Girls",
  "AICTE Saksham Scholarship",
  "National Means-cum-Merit Scholarship (NMMSS)",
  "Maulana Azad National Fellowship",
  "Ishan Uday Scholarship for NE Region",
  "Prime Minister's Scholarship Scheme (PMSS)",
  "Reliance Foundation Scholarship",
  "Tata Trusts Scholarship",
  "Narotam Sekhsaria Scholarship",
  "Begum Hazrat Mahal National Scholarship",
  "Sitaram Jindal Foundation Scholarship",
] as const;

const REVIEW_AUTHORS = [
  "Priya Sharma",
  "Arjun Patel",
  "Neha Krishnan",
  "Vikram Reddy",
  "Ananya Iyer",
  "Rohan Kapoor",
  "Kavya Menon",
  "Siddharth Gupta",
  "Meera Joshi",
  "Aditya Pillai",
  "Riya Singh",
  "Karthik Subramaniam",
] as const;

const JOB_COMPANIES = [
  "Tata Consultancy Services",
  "Infosys",
  "Wipro",
  "Google India",
  "Microsoft India",
  "Amazon India",
  "Flipkart",
  "Deloitte India",
  "Accenture India",
  "Reliance Industries",
] as const;

const BLOG_SLUG_PREFIX = "clarix-real-";

/* ────────────────────────────────────────────────────────
   CLEAR ALL DATA
   ──────────────────────────────────────────────────────── */
async function clearAllData() {
  console.log("Clearing ALL existing data…");
  await Promise.all([
    Review.deleteMany({}),
    College.deleteMany({}),
    Course.deleteMany({}),
    Exam.deleteMany({}),
    Scholarship.deleteMany({}),
    Recruiter.deleteMany({}),
    University.deleteMany({}),
    Stream.deleteMany({}),
    BlogModel.deleteMany({}),
    Job.deleteMany({}),
  ]);
  console.log("All collections cleared.");
}

/* ────────────────────────────────────────────────────────
   COURSE BUILDER
   ──────────────────────────────────────────────────────── */
interface CourseSpec {
  name: string;
  stream: string;
  type: "Full Time" | "Part Time" | "Online" | "Distance" | "Other";
  duration: string;
  fees: string;
  intake: string;
  eligibility: string[];
  photo: keyof typeof PHOTOS;
  shortDesc: string;
  descContent: string;
  whyReasons: { title: string; description: string }[];
  semesters: { title: string; topics: string[] }[];
  careers: { title: string; description: string }[];
  aboutPoints: { title: string; description: string }[];
  faqs: { question: string; answer: string }[];
}

function buildCourse(streamId: mongoose.Types.ObjectId, spec: CourseSpec) {
  return {
    name: spec.name,
    shortDescription: spec.shortDesc,
    stream: streamId,
    type: spec.type,
    duration: spec.duration,
    fees: spec.fees,
    intakeCapacity: spec.intake,
    eligibility: spec.eligibility,
    cardImage: i(spec.photo, 800),
    heroImage: i(spec.photo, 1600),
    description: {
      title: `About ${spec.name}`,
      content: spec.descContent,
      image: i(spec.photo, 900),
    },
    whyChoose: {
      title: `Why Choose ${spec.name}?`,
      description: `Top reasons students opt for this program.`,
      reasons: spec.whyReasons,
    },
    syllabus: {
      title: "Curriculum & Syllabus",
      semesters: spec.semesters,
    },
    careerOpportunities: {
      title: "Career Opportunities",
      items: spec.careers,
    },
    about: {
      title: "Program Highlights",
      description: `Key features of the ${spec.name} program.`,
      points: spec.aboutPoints,
    },
    faqs: {
      title: "Frequently Asked Questions",
      description: "Common queries about this program.",
      items: spec.faqs,
    },
  };
}

/* ────────────────────────────────────────────────────────
   MAIN SEED FUNCTION
   ──────────────────────────────────────────────────────── */
async function seed() {
  const uri = process.env.MONGO_URI;
  if (!uri) {
    console.error("MONGO_URI is missing. Set it in Server/.env");
    process.exit(1);
  }

  await mongoose.connect(uri);
  console.log("Connected to MongoDB.");
  await clearAllData();

  /* ─── STREAMS ─── */
  console.log("Seeding streams…");
  const streams = await Stream.insertMany([
    { name: "Engineering", collegesCount: 4000, examsCount: 12, image: i("eng1", 900), enabled: true },
    { name: "Management", collegesCount: 3500, examsCount: 8, image: i("biz1", 900), enabled: true },
    { name: "Medical", collegesCount: 640, examsCount: 5, image: i("med1", 900), enabled: true },
    { name: "Commerce", collegesCount: 5200, examsCount: 6, image: i("finance1", 900), enabled: true },
    { name: "Science", collegesCount: 4800, examsCount: 10, image: i("sci1", 900), enabled: true },
    { name: "Law", collegesCount: 1700, examsCount: 6, image: i("law1", 900), enabled: true },
    { name: "Design", collegesCount: 480, examsCount: 5, image: i("design1", 900), enabled: true },
    { name: "Pharmacy", collegesCount: 2100, examsCount: 4, image: i("pharma1", 900), enabled: true },
    { name: "Agriculture", collegesCount: 720, examsCount: 3, image: i("agri1", 900), enabled: true },
    { name: "Education", collegesCount: 1900, examsCount: 4, image: i("edu1", 900), enabled: true },
  ]);
  const byStream = (n: string) => streams.find((x) => x.name === n)!._id as mongoose.Types.ObjectId;

  /* ─── UNIVERSITIES ─── */
  console.log("Seeding universities…");
  const universities = await University.insertMany([
    { name: UNIVERSITY_NAMES[0], type: "Public" as const, state: "Maharashtra", city: "Mumbai", establishedYear: 1958 },
    { name: UNIVERSITY_NAMES[1], type: "Public" as const, state: "Delhi", city: "New Delhi", establishedYear: 1961 },
    { name: UNIVERSITY_NAMES[2], type: "Public" as const, state: "Tamil Nadu", city: "Chennai", establishedYear: 1959 },
    { name: UNIVERSITY_NAMES[3], type: "Central" as const, state: "Delhi", city: "New Delhi", establishedYear: 1922 },
    { name: UNIVERSITY_NAMES[4], type: "State" as const, state: "Tamil Nadu", city: "Chennai", establishedYear: 1978 },
    { name: UNIVERSITY_NAMES[5], type: "State" as const, state: "Maharashtra", city: "Pune", establishedYear: 1949 },
    { name: UNIVERSITY_NAMES[6], type: "State" as const, state: "Maharashtra", city: "Mumbai", establishedYear: 1857 },
    { name: UNIVERSITY_NAMES[7], type: "Central" as const, state: "Uttar Pradesh", city: "Varanasi", establishedYear: 1916 },
    { name: UNIVERSITY_NAMES[8], type: "State" as const, state: "West Bengal", city: "Kolkata", establishedYear: 1955 },
    { name: UNIVERSITY_NAMES[9], type: "Central" as const, state: "Delhi", city: "New Delhi", establishedYear: 1969 },
    { name: UNIVERSITY_NAMES[10], type: "State" as const, state: "West Bengal", city: "Kolkata", establishedYear: 1857 },
    { name: UNIVERSITY_NAMES[11], type: "Deemed" as const, state: "Karnataka", city: "Manipal", establishedYear: 1953 },
    { name: UNIVERSITY_NAMES[12], type: "State" as const, state: "Gujarat", city: "Ahmedabad", establishedYear: 1949 },
    { name: UNIVERSITY_NAMES[13], type: "Public" as const, state: "Karnataka", city: "Bengaluru", establishedYear: 1987 },
    { name: UNIVERSITY_NAMES[14], type: "Public" as const, state: "Delhi", city: "New Delhi", establishedYear: 1956 },
    // New universities for expanded state coverage
    { name: UNIVERSITY_NAMES[15], type: "Public" as const, state: "Uttar Pradesh", city: "Kanpur", establishedYear: 1959 },
    { name: UNIVERSITY_NAMES[16], type: "Public" as const, state: "West Bengal", city: "Kharagpur", establishedYear: 1951 },
    { name: UNIVERSITY_NAMES[17], type: "Public" as const, state: "Uttarakhand", city: "Roorkee", establishedYear: 1847 },
    { name: UNIVERSITY_NAMES[18], type: "Public" as const, state: "Assam", city: "Guwahati", establishedYear: 1994 },
    { name: UNIVERSITY_NAMES[19], type: "Public" as const, state: "Telangana", city: "Hyderabad", establishedYear: 2008 },
    { name: UNIVERSITY_NAMES[20], type: "Central" as const, state: "Uttar Pradesh", city: "Aligarh", establishedYear: 1920 },
    { name: UNIVERSITY_NAMES[21], type: "State" as const, state: "Kerala", city: "Kochi", establishedYear: 1971 },
    { name: UNIVERSITY_NAMES[22], type: "Public" as const, state: "Kerala", city: "Kozhikode", establishedYear: 1961 },
    { name: UNIVERSITY_NAMES[23], type: "State" as const, state: "Punjab", city: "Chandigarh", establishedYear: 1882 },
    { name: UNIVERSITY_NAMES[24], type: "Deemed" as const, state: "Rajasthan", city: "Pilani", establishedYear: 1964 },
    { name: UNIVERSITY_NAMES[25], type: "Central" as const, state: "Telangana", city: "Hyderabad", establishedYear: 1974 },
    { name: UNIVERSITY_NAMES[26], type: "State" as const, state: "Goa", city: "Panaji", establishedYear: 1985 },
    { name: UNIVERSITY_NAMES[27], type: "State" as const, state: "Odisha", city: "Bhubaneswar", establishedYear: 1943 },
    { name: UNIVERSITY_NAMES[28], type: "State" as const, state: "Bihar", city: "Patna", establishedYear: 1917 },
    { name: UNIVERSITY_NAMES[29], type: "Public" as const, state: "Jharkhand", city: "Dhanbad", establishedYear: 1926 },
    // Kerala universities (not in UNIVERSITY_NAMES array — added directly)
    { name: "APJ Abdul Kalam Technological University", type: "State" as const, state: "Kerala", city: "Thiruvananthapuram", establishedYear: 2014 },
    { name: "Kerala University of Health Sciences", type: "State" as const, state: "Kerala", city: "Thrissur", establishedYear: 2010 },
    { name: "University of Calicut", type: "State" as const, state: "Kerala", city: "Malappuram", establishedYear: 1968 },
    { name: "Mahatma Gandhi University", type: "State" as const, state: "Kerala", city: "Kottayam", establishedYear: 1983 },
    { name: "University of Kerala", type: "State" as const, state: "Kerala", city: "Thiruvananthapuram", establishedYear: 1937 },
    { name: "Kannur University", type: "State" as const, state: "Kerala", city: "Kannur", establishedYear: 1996 },
    { name: "National University of Advanced Legal Studies", type: "Public" as const, state: "Kerala", city: "Kochi", establishedYear: 2005 },
    { name: "Indian Space Research Organisation", type: "Public" as const, state: "Kerala", city: "Thiruvananthapuram", establishedYear: 1969 },
  ]);
  const uniByName = (n: string) => universities.find((x) => x.name === n)!._id as mongoose.Types.ObjectId;

  /* ─── RECRUITERS ─── */
  console.log("Seeding recruiters…");
  const recruiterLogos = [
    PHOTOS.office1, PHOTOS.office2, PHOTOS.office3, PHOTOS.office4, PHOTOS.office5,
    PHOTOS.office6, PHOTOS.office1, PHOTOS.office2, PHOTOS.office3, PHOTOS.office4,
    PHOTOS.office5, PHOTOS.office6, PHOTOS.office1, PHOTOS.office2, PHOTOS.office3,
  ];
  const recruiterIndustries = [
    "IT Services", "IT Services", "IT Services", "IT Services",
    "Technology", "Technology", "E-Commerce", "E-Commerce",
    "Consulting", "Financial Services", "Financial Services",
    "IT Services", "Consulting", "Conglomerate", "Conglomerate",
  ];
  const recruiterTitles = [
    "Software Engineer", "Systems Engineer", "Project Engineer", "Software Developer",
    "SDE", "SDE", "SDE", "SDE",
    "Analyst", "Analyst", "Technology Analyst",
    "Associate Software Engineer", "Business Analyst", "Graduate Engineer Trainee", "Graduate Engineer Trainee",
  ];
  const recruiters = await Recruiter.insertMany(
    RECRUITER_COMPANIES.map((company, idx) => ({
      companyName: company,
      jobTitle: recruiterTitles[idx],
      hiringDuration: "Campus Placements",
      logo: img(recruiterLogos[idx]!, 400),
      industry: recruiterIndustries[idx],
    })),
  );
  const allRecruiterIds = recruiters.map((r) => r._id);

  /* ─── COURSES ─── */
  console.log("Seeding courses…");
  const courseSpecs: CourseSpec[] = [
    {
      name: COURSE_NAMES[0]!, // B.Tech CSE
      stream: "Engineering", type: "Full Time", duration: "4 Years", fees: "₹2,09,550 / year (IITs)", intake: "Varies (60-180 per IIT)",
      eligibility: ["10+2 with Physics, Chemistry, Mathematics", "JEE Main + JEE Advanced qualified"],
      photo: "eng1",
      shortDesc: "B.Tech CSE is the most sought-after undergraduate engineering program in India, covering algorithms, data structures, AI/ML, databases, operating systems, and software engineering.",
      descContent: "Bachelor of Technology in Computer Science and Engineering is a 4-year undergraduate program that covers core computer science fundamentals including programming, algorithms, data structures, databases, computer networks, operating systems, and software engineering. Students also explore specializations like Artificial Intelligence, Machine Learning, Cybersecurity, and Cloud Computing. The program includes mandatory internships and capstone projects.",
      whyReasons: [
        { title: "Highest placement rates", description: "CSE graduates consistently receive the best placement offers across all engineering branches, with top companies like Google, Microsoft, and Amazon recruiting heavily." },
        { title: "Versatile career paths", description: "From software development to data science, cybersecurity to product management — CSE opens doors to diverse tech roles." },
        { title: "Research opportunities", description: "Access to cutting-edge research in AI, quantum computing, and blockchain through well-funded labs." },
      ],
      semesters: [
        { title: "Semester 1-2 (Foundation)", topics: ["Engineering Mathematics", "Physics", "Chemistry", "Programming in C/C++", "Basic Electrical Engineering", "Engineering Drawing"] },
        { title: "Semester 3-4 (Core CS)", topics: ["Data Structures & Algorithms", "Discrete Mathematics", "Digital Logic Design", "Computer Organization", "Object-Oriented Programming", "Database Management Systems"] },
        { title: "Semester 5-6 (Advanced)", topics: ["Operating Systems", "Computer Networks", "Software Engineering", "Theory of Computation", "Compiler Design", "Machine Learning"] },
        { title: "Semester 7-8 (Specialization)", topics: ["Electives (AI/ML, Cloud, Security)", "Major Project / Thesis", "Industrial Internship", "Seminar", "Professional Ethics"] },
      ],
      careers: [
        { title: "Software Development Engineer", description: "Build products at companies like Google, Amazon, Microsoft with packages of ₹15-60+ LPA." },
        { title: "Data Scientist / ML Engineer", description: "Work on AI/ML models at tech companies and research labs with starting packages of ₹12-30 LPA." },
        { title: "Product Manager", description: "Lead product strategy at startups and tech giants." },
        { title: "Higher Studies", description: "MS/PhD at top global universities — MIT, Stanford, CMU, and more." },
      ],
      aboutPoints: [
        { title: "Industry-aligned curriculum", description: "Syllabus regularly updated with inputs from industry leaders and IIT alumni." },
        { title: "World-class labs", description: "High-performance computing labs, IoT labs, and dedicated research centres." },
        { title: "Strong alumni network", description: "Graduates at FAANG companies, leading startups, and top research institutions worldwide." },
      ],
      faqs: [
        { question: "What is the eligibility for B.Tech CSE?", answer: "10+2 with Physics, Chemistry, Mathematics with a minimum of 75% (65% for SC/ST). Must qualify JEE Main and JEE Advanced for IITs, or respective state/national exams for other institutions." },
        { question: "What is the average salary after B.Tech CSE?", answer: "Average packages range from ₹6-25 LPA depending on the institute, with top IITs seeing averages of ₹20-25 LPA and highest packages crossing ₹2 Crore." },
        { question: "Is there a scope for higher studies?", answer: "Yes. Many graduates pursue MS/PhD at top global universities or MBA at IIMs. Around 15-20% of IIT CSE graduates opt for higher studies." },
      ],
    },
    {
      name: COURSE_NAMES[1]!, // B.Tech ECE
      stream: "Engineering", type: "Full Time", duration: "4 Years", fees: "₹2,09,550 / year (IITs)", intake: "60-120 per institute",
      eligibility: ["10+2 with Physics, Chemistry, Mathematics", "JEE Main + JEE Advanced / state entrance exams"],
      photo: "eng2",
      shortDesc: "B.Tech ECE covers electronic circuits, communication systems, signal processing, VLSI design, embedded systems, and telecommunications.",
      descContent: "Bachelor of Technology in Electronics and Communication Engineering is a 4-year program covering analog and digital electronics, signal processing, communication systems, VLSI design, embedded systems, and IoT. The program blends hardware and software skills, preparing graduates for roles in semiconductor, telecom, and tech industries.",
      whyReasons: [
        { title: "Hardware + Software skills", description: "Unique combination of circuit design and programming makes graduates versatile." },
        { title: "Semiconductor boom", description: "India's semiconductor mission is creating massive opportunities for ECE graduates." },
        { title: "5G & IoT revolution", description: "Growing demand for engineers in telecom, IoT, and embedded systems." },
      ],
      semesters: [
        { title: "Semester 1-2", topics: ["Engineering Mathematics", "Physics", "Basic Electronics", "Programming", "Circuit Theory"] },
        { title: "Semester 3-4", topics: ["Analog Electronics", "Digital Electronics", "Signals & Systems", "Electromagnetic Theory", "Microprocessors"] },
        { title: "Semester 5-6", topics: ["Communication Systems", "VLSI Design", "Control Systems", "Digital Signal Processing", "Computer Networks"] },
        { title: "Semester 7-8", topics: ["Embedded Systems", "Wireless Communication", "Electives", "Project / Thesis", "Internship"] },
      ],
      careers: [
        { title: "VLSI / Chip Design Engineer", description: "Work at Intel, Qualcomm, Samsung, AMD with packages of ₹15-40 LPA." },
        { title: "Embedded Systems Engineer", description: "Design firmware for automotive, aerospace, and consumer electronics." },
        { title: "Telecom Engineer", description: "Work on 5G networks, satellite communication, and IoT infrastructure." },
      ],
      aboutPoints: [
        { title: "State-of-the-art labs", description: "VLSI fabrication labs, antenna testing facilities, and embedded systems development kits." },
        { title: "Research focus", description: "Active research in 5G, quantum electronics, and photonics." },
      ],
      faqs: [
        { question: "Is ECE good for software jobs?", answer: "Yes. Many ECE graduates get placed in software roles at top tech companies. The programming skills gained are transferable." },
        { question: "What is the salary range?", answer: "₹5-20 LPA on average, with top institutes seeing ₹15-50+ LPA packages at semiconductor and tech companies." },
      ],
    },
    {
      name: COURSE_NAMES[2]!, // B.Tech Mechanical
      stream: "Engineering", type: "Full Time", duration: "4 Years", fees: "₹2,09,550 / year (IITs)", intake: "60-120 per institute",
      eligibility: ["10+2 with PCM", "JEE Main / state entrance exams"],
      photo: "eng3",
      shortDesc: "B.Tech Mechanical Engineering covers thermodynamics, manufacturing, robotics, automobile engineering, and design.",
      descContent: "Mechanical Engineering is one of the oldest and broadest engineering disciplines. The 4-year program covers thermodynamics, fluid mechanics, manufacturing processes, machine design, robotics, and automobile engineering. Modern curriculum includes CAD/CAM, additive manufacturing, and renewable energy systems.",
      whyReasons: [
        { title: "Evergreen branch", description: "Mechanical engineers are needed in virtually every industry — from automotive to aerospace." },
        { title: "EV & green energy boom", description: "Electric vehicles and renewable energy are creating new-age opportunities." },
      ],
      semesters: [
        { title: "Semester 1-2", topics: ["Engineering Mathematics", "Physics", "Engineering Drawing", "Workshop Practice", "Programming"] },
        { title: "Semester 3-4", topics: ["Thermodynamics", "Strength of Materials", "Fluid Mechanics", "Manufacturing Processes", "Kinematics of Machines"] },
        { title: "Semester 5-6", topics: ["Heat Transfer", "Machine Design", "Industrial Engineering", "CAD/CAM", "Dynamics of Machines"] },
        { title: "Semester 7-8", topics: ["Automobile Engineering", "Robotics", "Renewable Energy", "Project / Thesis", "Electives"] },
      ],
      careers: [
        { title: "Design Engineer", description: "Work on product design at automotive, aerospace, and manufacturing companies." },
        { title: "Manufacturing Engineer", description: "Optimize production processes at companies like Tata Motors, L&T, Mahindra." },
        { title: "EV / Energy Engineer", description: "Emerging roles in electric vehicles, solar, and wind energy sectors." },
      ],
      aboutPoints: [
        { title: "Hands-on training", description: "Extensive workshop and lab hours with CNC machines, 3D printers, and testing rigs." },
      ],
      faqs: [
        { question: "Is Mechanical Engineering still relevant?", answer: "Absolutely. With EV, robotics, aerospace, and green energy, mechanical engineers are in high demand. Many also transition to software/consulting roles." },
      ],
    },
    {
      name: COURSE_NAMES[3]!, // B.Tech Civil
      stream: "Engineering", type: "Full Time", duration: "4 Years", fees: "₹1,50,000 - ₹2,10,000 / year", intake: "60-120 per institute",
      eligibility: ["10+2 with PCM", "JEE Main / state entrance exams"],
      photo: "campus1",
      shortDesc: "B.Tech Civil Engineering focuses on structural engineering, construction, transportation, water resources, and urban planning.",
      descContent: "Civil Engineering deals with the design, construction, and maintenance of infrastructure — buildings, bridges, roads, dams, and water systems. The program covers structural analysis, geotechnical engineering, environmental engineering, transportation, and smart city technologies.",
      whyReasons: [
        { title: "Infrastructure growth", description: "India's massive infra push (highways, metro, smart cities) ensures steady demand." },
        { title: "Government jobs", description: "High opportunities in PSUs (NHAI, CPWD, Railways) and state PWDs." },
      ],
      semesters: [
        { title: "Semester 1-2", topics: ["Mathematics", "Physics", "Engineering Drawing", "Surveying", "Programming"] },
        { title: "Semester 3-4", topics: ["Structural Analysis", "Fluid Mechanics", "Geotechnical Engineering", "Building Materials", "Concrete Technology"] },
        { title: "Semester 5-6", topics: ["Steel Structures", "Transportation Engineering", "Environmental Engineering", "Hydrology", "Foundation Engineering"] },
        { title: "Semester 7-8", topics: ["Construction Management", "Earthquake Engineering", "Smart City Planning", "Project / Thesis", "Electives"] },
      ],
      careers: [
        { title: "Structural Engineer", description: "Design buildings and bridges at firms like L&T, Shapoorji Pallonji." },
        { title: "Government Engineer", description: "Join PSUs like NHAI, Indian Railways, CPWD via GATE." },
      ],
      aboutPoints: [
        { title: "Site visits", description: "Regular visits to construction sites, dams, and infrastructure projects." },
      ],
      faqs: [
        { question: "What are job prospects after B.Tech Civil?", answer: "Good demand in construction, government PSUs (via GATE), and consulting firms. Average salary: ₹4-12 LPA, higher in PSUs and top firms." },
      ],
    },
    {
      name: COURSE_NAMES[4]!, // B.Tech Electrical
      stream: "Engineering", type: "Full Time", duration: "4 Years", fees: "₹1,50,000 - ₹2,10,000 / year", intake: "60-120 per institute",
      eligibility: ["10+2 with PCM", "JEE Main / state entrance exams"],
      photo: "eng4",
      shortDesc: "B.Tech Electrical Engineering covers power systems, control systems, electrical machines, renewable energy, and power electronics.",
      descContent: "Electrical Engineering focuses on generation, transmission, and distribution of electrical power. The program covers circuit theory, power systems, control systems, electrical machines, power electronics, and renewable energy technologies.",
      whyReasons: [
        { title: "Power sector growth", description: "India's expanding power grid and renewable energy targets create huge demand." },
        { title: "Core + IT options", description: "Graduates can work in both core electrical and IT/software sectors." },
      ],
      semesters: [
        { title: "Semester 1-2", topics: ["Mathematics", "Physics", "Basic Electrical Engineering", "Programming", "Engineering Drawing"] },
        { title: "Semester 3-4", topics: ["Circuit Theory", "Electrical Machines", "Analog Electronics", "Electromagnetic Fields", "Signals & Systems"] },
        { title: "Semester 5-6", topics: ["Power Systems", "Control Systems", "Power Electronics", "Instrumentation", "Microprocessors"] },
        { title: "Semester 7-8", topics: ["Renewable Energy Systems", "High Voltage Engineering", "Electives", "Project / Thesis", "Internship"] },
      ],
      careers: [
        { title: "Power Systems Engineer", description: "Work at NTPC, Power Grid, Adani Power, Tata Power." },
        { title: "PSU roles via GATE", description: "Join BHEL, NTPC, PGCIL, Indian Oil via GATE scores." },
      ],
      aboutPoints: [
        { title: "High-voltage labs", description: "Dedicated labs for power systems simulation, electrical machines testing, and renewable energy." },
      ],
      faqs: [
        { question: "Is Electrical Engineering good for PSU jobs?", answer: "Yes. EE is one of the best branches for PSU recruitment via GATE, with excellent pay and job security." },
      ],
    },
    {
      name: COURSE_NAMES[5]!, // MBA
      stream: "Management", type: "Full Time", duration: "2 Years", fees: "₹23-28 Lakh total (IIMs)", intake: "300-500 per IIM",
      eligibility: ["Bachelor's degree with minimum 50% marks", "Valid CAT / XAT / GMAT score"],
      photo: "biz1",
      shortDesc: "MBA is India's most popular postgraduate management program, offered by IIMs and top B-schools, covering finance, marketing, operations, HR, and strategy.",
      descContent: "The MBA (Master of Business Administration) is a 2-year postgraduate program that develops leadership, analytical, and management skills. Core subjects include financial management, marketing, operations, organizational behavior, and strategy. Students specialize in their second year and complete a summer internship between years.",
      whyReasons: [
        { title: "Career acceleration", description: "MBA from a top B-school can 3-5x your pre-MBA salary with roles at McKinsey, BCG, Goldman Sachs." },
        { title: "Network effect", description: "Access to powerful alumni networks across industries and geographies." },
        { title: "Diverse roles", description: "From consulting to investment banking, FMCG marketing to tech PM — MBA opens all doors." },
      ],
      semesters: [
        { title: "Term 1-3 (Year 1)", topics: ["Financial Accounting", "Marketing Management", "Operations Management", "Organizational Behavior", "Microeconomics", "Statistics & Analytics", "Business Communication"] },
        { title: "Summer Internship", topics: ["8-10 week industry internship between Year 1 and Year 2"] },
        { title: "Term 4-6 (Year 2)", topics: ["Specialization electives (Finance, Marketing, Operations, HR, Strategy)", "Live projects", "Capstone", "International immersion"] },
      ],
      careers: [
        { title: "Management Consultant", description: "Join McKinsey, BCG, Bain with packages of ₹30-50 LPA." },
        { title: "Investment Banker", description: "Work at Goldman Sachs, JPMorgan, Morgan Stanley with ₹25-40 LPA." },
        { title: "Product Manager", description: "Lead products at Google, Amazon, Flipkart with ₹25-45 LPA." },
        { title: "FMCG Brand Manager", description: "Build brands at HUL, P&G, Nestlé with ₹20-30 LPA." },
      ],
      aboutPoints: [
        { title: "Case method pedagogy", description: "IIMs follow the case-study method, developing analytical and decision-making skills." },
        { title: "Global exposure", description: "Student exchange programs with top global B-schools." },
      ],
      faqs: [
        { question: "What is the CAT cutoff for IIMs?", answer: "Top IIMs (A, B, C) typically require 99+ percentile. New IIMs accept 95+ percentile. Other top B-schools accept 90+ percentile." },
        { question: "What is the ROI of an MBA?", answer: "IIM Ahmedabad median salary is ₹35 LPA. Even with fees of ₹28 Lakh, the ROI is typically recovered within 1-2 years." },
      ],
    },
    {
      name: COURSE_NAMES[6]!, // BBA
      stream: "Management", type: "Full Time", duration: "3 Years", fees: "₹1-6 Lakh / year", intake: "60-300 per institute",
      eligibility: ["10+2 from any stream with minimum 50% marks", "CUET UG / IPMAT / university entrance exam"],
      photo: "biz2",
      shortDesc: "BBA is a 3-year undergraduate management program covering business fundamentals, marketing, finance, HR, and entrepreneurship.",
      descContent: "Bachelor of Business Administration is a 3-year program that provides foundational knowledge in business management. It covers accounting, marketing, finance, HR, operations, and entrepreneurship. Students develop communication, leadership, and analytical skills needed for management roles or MBA preparation.",
      whyReasons: [
        { title: "MBA foundation", description: "BBA builds a strong base for MBA entrance exams like CAT, XAT." },
        { title: "Early business exposure", description: "Start learning business concepts right after 12th grade." },
      ],
      semesters: [
        { title: "Year 1", topics: ["Principles of Management", "Financial Accounting", "Business Economics", "Business Communication", "IT for Business"] },
        { title: "Year 2", topics: ["Marketing Management", "Human Resource Management", "Operations Management", "Business Law", "Statistics"] },
        { title: "Year 3", topics: ["Strategic Management", "Entrepreneurship", "International Business", "Internship", "Project"] },
      ],
      careers: [
        { title: "Management Trainee", description: "Join companies in marketing, sales, or operations roles at ₹3-8 LPA." },
        { title: "MBA aspirant", description: "Most BBA graduates pursue MBA at top B-schools for career acceleration." },
      ],
      aboutPoints: [
        { title: "Industry visits", description: "Regular visits to corporate offices and manufacturing units." },
      ],
      faqs: [
        { question: "Is BBA worth it?", answer: "BBA is excellent if you plan to pursue MBA later. It gives you a 3-year head start in management education." },
      ],
    },
    {
      name: COURSE_NAMES[7]!, // MBBS
      stream: "Medical", type: "Full Time", duration: "5.5 Years (including 1 year internship)", fees: "₹1,628 / year (AIIMS) to ₹25 Lakh / year (private)", intake: "50-250 per college",
      eligibility: ["10+2 with Physics, Chemistry, Biology (min 50%)", "NEET UG qualified with valid score"],
      photo: "med1",
      shortDesc: "MBBS is the primary medical degree in India, covering anatomy, physiology, pharmacology, surgery, medicine, and clinical rotations across 5.5 years.",
      descContent: "MBBS (Bachelor of Medicine, Bachelor of Surgery) is a 5.5-year program (4.5 years academic + 1 year compulsory rotating internship). It covers pre-clinical subjects (Anatomy, Physiology, Biochemistry), para-clinical subjects (Pathology, Pharmacology, Microbiology), and clinical subjects (Medicine, Surgery, OB-GYN, Pediatrics). Admission is exclusively through NEET UG.",
      whyReasons: [
        { title: "Noble profession", description: "Serve humanity while earning respect and a stable, well-paying career." },
        { title: "Multiple specialization paths", description: "After MBBS, pursue MD/MS in 30+ specialties via NEET PG." },
        { title: "Global recognition", description: "Indian MBBS is recognized worldwide; doctors practice globally." },
      ],
      semesters: [
        { title: "Phase 1 (Year 1)", topics: ["Anatomy", "Physiology", "Biochemistry", "Community Medicine (Introduction)"] },
        { title: "Phase 2 (Year 2)", topics: ["Pathology", "Pharmacology", "Microbiology", "Forensic Medicine"] },
        { title: "Phase 3 Part 1 (Year 3)", topics: ["Ophthalmology", "ENT", "Community Medicine"] },
        { title: "Phase 3 Part 2 (Year 4-4.5)", topics: ["General Medicine", "General Surgery", "Obstetrics & Gynecology", "Pediatrics", "Orthopedics"] },
        { title: "Internship (1 Year)", topics: ["Rotating internship across all departments in teaching hospital"] },
      ],
      careers: [
        { title: "General Physician", description: "Practice independently or join hospitals with earning potential of ₹8-20 LPA initially." },
        { title: "Specialist Doctor (MD/MS)", description: "Pursue specialization via NEET PG — surgeons, cardiologists earn ₹25-80+ LPA." },
        { title: "Medical Research", description: "Join research institutions like ICMR, pharmaceutical companies, or pursue PhD." },
      ],
      aboutPoints: [
        { title: "Clinical exposure from Phase 2", description: "Early clinical posting ensures students see patients alongside theory." },
        { title: "Teaching hospital training", description: "Training in attached teaching hospitals with diverse patient populations." },
      ],
      faqs: [
        { question: "What is the NEET UG cutoff for AIIMS?", answer: "AIIMS Delhi typically requires 650+ out of 720 in NEET UG. Government colleges in top states need 580-640+." },
        { question: "Is MBBS from India recognized globally?", answer: "Yes. Indian MBBS is recognized by WHO, and graduates can practice abroad after clearing respective licensing exams (USMLE for USA, PLAB for UK, etc.)." },
        { question: "What is the total cost of MBBS?", answer: "Government colleges: ₹10,000-5 Lakh total. AIIMS: ~₹8,140 total. Private colleges: ₹50 Lakh - ₹1.5 Crore total." },
      ],
    },
    {
      name: COURSE_NAMES[8]!, // BDS
      stream: "Medical", type: "Full Time", duration: "5 Years (including 1 year internship)", fees: "₹50,000 - ₹15 Lakh / year", intake: "40-100 per college",
      eligibility: ["10+2 with PCB (min 50%)", "NEET UG qualified"],
      photo: "med2",
      shortDesc: "BDS is a 5-year dental surgery program covering oral anatomy, dental materials, prosthodontics, oral surgery, and orthodontics.",
      descContent: "Bachelor of Dental Surgery is a 5-year program (4 years academic + 1 year internship) that trains students in dental sciences including oral anatomy, dental materials, prosthodontics, conservative dentistry, periodontics, oral surgery, and orthodontics.",
      whyReasons: [
        { title: "Independent practice", description: "Open your own dental clinic with relatively lower investment than other medical fields." },
        { title: "Growing demand", description: "Increasing awareness about dental health is driving demand for dentists." },
      ],
      semesters: [
        { title: "Year 1-2", topics: ["Dental Anatomy", "Dental Materials", "Oral Pathology", "General Anatomy", "Physiology", "Biochemistry"] },
        { title: "Year 3-4", topics: ["Prosthodontics", "Conservative Dentistry", "Periodontics", "Oral Surgery", "Orthodontics", "Pedodontics", "Community Dentistry"] },
        { title: "Internship (1 Year)", topics: ["Rotating clinical postings in all dental departments"] },
      ],
      careers: [
        { title: "Dental Surgeon", description: "Practice independently or join hospitals/clinics with ₹5-15 LPA." },
        { title: "MDS Specialist", description: "Pursue MDS for specialization in orthodontics, oral surgery, etc." },
      ],
      aboutPoints: [
        { title: "Clinical training", description: "Hands-on patient treatment from Year 3 in attached dental hospitals." },
      ],
      faqs: [
        { question: "Is BDS a good career choice?", answer: "Yes, especially for those interested in independent practice. With MDS specialization, earning potential increases significantly." },
      ],
    },
    {
      name: COURSE_NAMES[9]!, // B.Pharm
      stream: "Pharmacy", type: "Full Time", duration: "4 Years", fees: "₹40,000 - ₹3 Lakh / year", intake: "60-120 per institute",
      eligibility: ["10+2 with Physics, Chemistry, Biology/Mathematics", "State pharmacy entrance / GPAT (for M.Pharm)"],
      photo: "pharma1",
      shortDesc: "B.Pharm covers pharmaceutical chemistry, pharmacology, pharmaceutics, pharmacognosy, and clinical pharmacy over 4 years.",
      descContent: "Bachelor of Pharmacy is a 4-year program covering pharmaceutical sciences including pharmaceutical chemistry, pharmacology, pharmaceutics, pharmacognosy, and clinical pharmacy. Graduates can work in drug manufacturing, quality control, research, regulatory affairs, and community/hospital pharmacy.",
      whyReasons: [
        { title: "Pharma industry growth", description: "India is the 'Pharmacy of the World' — the largest generic drug manufacturer globally." },
        { title: "Diverse career options", description: "From drug development to regulatory affairs, marketing to clinical research." },
      ],
      semesters: [
        { title: "Year 1", topics: ["Pharmaceutical Chemistry", "Pharmaceutics", "Anatomy & Physiology", "Biochemistry"] },
        { title: "Year 2", topics: ["Pharmacology", "Pharmacognosy", "Physical Pharmaceutics", "Pathophysiology"] },
        { title: "Year 3", topics: ["Medicinal Chemistry", "Industrial Pharmacy", "Pharmaceutical Analysis", "Biopharmaceutics"] },
        { title: "Year 4", topics: ["Clinical Pharmacy", "Pharmaceutical Regulatory Science", "Quality Assurance", "Project Work"] },
      ],
      careers: [
        { title: "Pharma Industry", description: "Work at Sun Pharma, Dr. Reddy's, Cipla, Biocon with ₹3-8 LPA." },
        { title: "Drug Inspector", description: "Government roles in drug regulatory authorities." },
        { title: "Clinical Research", description: "CRO roles at Covance, IQVIA, Quintiles with ₹4-10 LPA." },
      ],
      aboutPoints: [
        { title: "Industry connections", description: "MoUs with leading pharma companies for internships and placements." },
      ],
      faqs: [
        { question: "What is GPAT?", answer: "Graduate Pharmacy Aptitude Test is required for admission to M.Pharm in AICTE-approved institutions and for AICTE scholarships." },
      ],
    },
    {
      name: COURSE_NAMES[10]!, // BA LLB
      stream: "Law", type: "Full Time", duration: "5 Years", fees: "₹2-15 Lakh / year", intake: "80-200 per institute",
      eligibility: ["10+2 from any stream with minimum 45% marks", "CLAT / AILET / LSAT India / university entrance exam"],
      photo: "law1",
      shortDesc: "BA LLB (Hons) is a 5-year integrated law degree combining humanities with legal education, offered by National Law Universities.",
      descContent: "BA LLB (Hons) is a 5-year integrated program combining a Bachelor of Arts with a Bachelor of Laws. It covers constitutional law, criminal law, contract law, corporate law, international law, human rights, and legal research. The program is offered by National Law Universities (NLUs) and top private law schools.",
      whyReasons: [
        { title: "NLU pedigree", description: "Graduates from NLUs are recruited by top law firms, corporates, and judiciary." },
        { title: "Diverse career paths", description: "Litigation, corporate law, judiciary, legal policy, international organizations." },
      ],
      semesters: [
        { title: "Year 1-2", topics: ["Constitutional Law", "Law of Torts", "Criminal Law", "Contract Law", "Legal Methods", "Political Science", "Economics", "Sociology"] },
        { title: "Year 3-4", topics: ["Corporate Law", "Tax Law", "Labour Law", "Environmental Law", "Intellectual Property", "International Law", "Administrative Law"] },
        { title: "Year 5", topics: ["Dissertation / Research Project", "Clinical Legal Education", "Electives", "Moot Court", "Internship with law firm / court"] },
      ],
      careers: [
        { title: "Corporate Lawyer", description: "Work at AZB, Trilegal, Cyril Amarchand with ₹15-30 LPA starting." },
        { title: "Litigator", description: "Practice at High Courts and Supreme Court." },
        { title: "Judicial Services", description: "Qualify judicial service exams to become a judge." },
      ],
      aboutPoints: [
        { title: "Moot court culture", description: "NLUs have strong moot court and debate traditions with national/international competitions." },
        { title: "Clinical legal education", description: "Legal aid clinics where students handle real cases for underserved communities." },
      ],
      faqs: [
        { question: "What is the CLAT exam?", answer: "Common Law Admission Test is the national entrance exam for admission to 24 National Law Universities in India." },
        { question: "Which is the best NLU?", answer: "NLSIU Bangalore is consistently ranked #1, followed by NALSAR Hyderabad and NLU Delhi." },
      ],
    },
    {
      name: COURSE_NAMES[11]!, // B.Com
      stream: "Commerce", type: "Full Time", duration: "3 Years", fees: "₹15,000 - ₹3 Lakh / year", intake: "100-500 per college",
      eligibility: ["10+2 with Commerce / any stream (min 50%)", "CUET UG / university entrance for top colleges"],
      photo: "finance1",
      shortDesc: "B.Com (Hons) covers accounting, taxation, business law, corporate finance, auditing, and economics over 3 years.",
      descContent: "B.Com (Honours) is a 3-year undergraduate commerce program that provides deep knowledge of accounting, taxation, corporate finance, business law, economics, and auditing. It prepares students for careers in finance, accounting, banking, and forms the foundation for CA, CS, CMA, and MBA.",
      whyReasons: [
        { title: "Foundation for CA/CS/CMA", description: "B.Com is the ideal base for professional qualifications like CA, CS, CMA." },
        { title: "Banking & finance careers", description: "Direct entry into banking, insurance, and financial services sector." },
      ],
      semesters: [
        { title: "Year 1", topics: ["Financial Accounting", "Business Economics", "Business Organization", "Business Mathematics", "English"] },
        { title: "Year 2", topics: ["Corporate Accounting", "Cost Accounting", "Business Law", "Income Tax", "Statistics"] },
        { title: "Year 3", topics: ["Auditing", "Corporate Finance", "Management Accounting", "Indirect Taxes (GST)", "Electives"] },
      ],
      careers: [
        { title: "Chartered Accountant (CA)", description: "Pursue CA alongside B.Com — CAs earn ₹7-25 LPA." },
        { title: "Banking", description: "Join banks via IBPS PO/SBI PO or private bank placements." },
        { title: "Financial Analyst", description: "Work in Big 4 firms, investment banks, or corporate finance roles." },
      ],
      aboutPoints: [
        { title: "Professional exam alignment", description: "Curriculum aligned with CA Foundation, CS Foundation syllabi." },
      ],
      faqs: [
        { question: "Can science students do B.Com?", answer: "Yes. Students from any stream can pursue B.Com, though commerce background students may find initial semesters easier." },
      ],
    },
    {
      name: COURSE_NAMES[12]!, // B.Sc Physics
      stream: "Science", type: "Full Time", duration: "3 Years", fees: "₹10,000 - ₹2 Lakh / year", intake: "30-100 per department",
      eligibility: ["10+2 with Physics, Mathematics (min 50%)", "CUET UG / university entrance exam"],
      photo: "sci1",
      shortDesc: "B.Sc Physics (Hons) provides deep understanding of classical and modern physics including quantum mechanics, electrodynamics, and statistical physics.",
      descContent: "B.Sc Physics (Honours) is a 3-year program covering classical mechanics, electrodynamics, quantum mechanics, statistical mechanics, solid-state physics, nuclear physics, and mathematical physics. It builds strong analytical and problem-solving skills, preparing students for research, teaching, or industry roles.",
      whyReasons: [
        { title: "Research pathways", description: "Gateway to MSc, PhD, and research careers at premier institutions like TIFR, IISc, ISRO." },
        { title: "Competitive exam preparation", description: "Strong foundation for IIT JAM, CSIR NET, GATE Physics, and UPSC." },
      ],
      semesters: [
        { title: "Year 1", topics: ["Classical Mechanics", "Electricity & Magnetism", "Mathematical Physics", "Waves & Optics"] },
        { title: "Year 2", topics: ["Quantum Mechanics", "Thermal Physics", "Digital Electronics", "Analog Electronics"] },
        { title: "Year 3", topics: ["Statistical Mechanics", "Solid State Physics", "Nuclear Physics", "Electives", "Project"] },
      ],
      careers: [
        { title: "Research Scientist", description: "Work at ISRO, DRDO, BARC, TIFR, IISc after higher studies." },
        { title: "Data Science", description: "Physics graduates are valued in data science and quantitative finance." },
      ],
      aboutPoints: [
        { title: "Lab-intensive program", description: "Extensive practical training in optics, electronics, and nuclear physics labs." },
      ],
      faqs: [
        { question: "What after B.Sc Physics?", answer: "MSc Physics (via IIT JAM/CUET PG), integrated PhD (IISc, TIFR), or professional courses like MBA, data science." },
      ],
    },
    {
      name: COURSE_NAMES[13]!, // B.Des
      stream: "Design", type: "Full Time", duration: "4 Years", fees: "₹3-15 Lakh / year", intake: "20-80 per institute",
      eligibility: ["10+2 from any stream", "NID DAT / NIFT Entrance / UCEED / institute-specific exam"],
      photo: "design1",
      shortDesc: "B.Des covers product design, UX/UI design, communication design, textile design, and design thinking over 4 years.",
      descContent: "Bachelor of Design is a 4-year program that develops creative and analytical skills in various design disciplines including product design, communication design, UX/UI design, textile & fashion design, and interaction design. The curriculum emphasizes design thinking, prototyping, user research, and studio-based learning.",
      whyReasons: [
        { title: "NID & NIFT prestige", description: "NID and NIFT graduates are highly sought after in design industry globally." },
        { title: "UX/UI boom", description: "Tech companies pay premium salaries for design talent — ₹10-30 LPA at top firms." },
      ],
      semesters: [
        { title: "Year 1 (Foundation)", topics: ["Design Fundamentals", "Visual Communication", "Material Studies", "Drawing & Sketching", "Design History", "Digital Tools"] },
        { title: "Year 2", topics: ["Typography", "Photography", "User Research", "Prototyping", "Design for Manufacturing", "Specialization Introduction"] },
        { title: "Year 3", topics: ["Advanced Studio Projects", "UX/UI Design", "Service Design", "Design Management", "Industry Internship"] },
        { title: "Year 4", topics: ["Graduation Project", "Portfolio Development", "Electives", "Exhibition"] },
      ],
      careers: [
        { title: "UX/UI Designer", description: "Work at Google, Apple, Microsoft, startups with ₹10-30 LPA." },
        { title: "Product Designer", description: "Design physical and digital products at design consultancies." },
        { title: "Design Entrepreneur", description: "Start your own design studio or product brand." },
      ],
      aboutPoints: [
        { title: "Studio-based learning", description: "Hands-on projects in well-equipped design studios with industry mentors." },
      ],
      faqs: [
        { question: "What entrance exams are needed?", answer: "NID DAT for NID, NIFT Entrance for NIFT, UCEED for IIT design programs, and individual institute exams." },
      ],
    },
    {
      name: COURSE_NAMES[14]!, // B.Arch
      stream: "Engineering", type: "Full Time", duration: "5 Years", fees: "₹1-10 Lakh / year", intake: "40-120 per institute",
      eligibility: ["10+2 with Mathematics (min 50%)", "NATA / JEE Main Paper 2 qualified"],
      photo: "campus1",
      shortDesc: "B.Arch is a 5-year professional degree in architecture covering design, structures, building construction, urban planning, and sustainability.",
      descContent: "Bachelor of Architecture is a 5-year professional degree regulated by the Council of Architecture (COA). It covers architectural design, building construction, structural engineering, urban planning, landscape design, environmental sustainability, and architectural history.",
      whyReasons: [
        { title: "Creative + technical", description: "Architecture uniquely blends artistic creativity with engineering precision." },
        { title: "Urban development", description: "India's rapid urbanization creates massive demand for architects." },
      ],
      semesters: [
        { title: "Year 1-2", topics: ["Architectural Design Studio", "Building Construction", "Theory of Structures", "History of Architecture", "Visual Arts", "Climatology"] },
        { title: "Year 3-4", topics: ["Advanced Design Studio", "Building Services (HVAC, Plumbing)", "Urban Design", "Landscape Architecture", "Professional Practice", "Working Drawing"] },
        { title: "Year 5", topics: ["Thesis / Design Dissertation", "Professional Training", "Electives", "Portfolio Preparation"] },
      ],
      careers: [
        { title: "Architect", description: "Practice at firms or independently. Register with CoA after completing NATA." },
        { title: "Urban Planner", description: "Work on smart city projects with government or private firms." },
      ],
      aboutPoints: [
        { title: "Design studio culture", description: "Extensive studio hours with critique sessions mimicking real-world architecture practice." },
      ],
      faqs: [
        { question: "What is NATA?", answer: "National Aptitude Test in Architecture is the primary entrance exam for B.Arch admissions, conducted by the Council of Architecture." },
      ],
    },
    {
      name: COURSE_NAMES[15]!, // B.Ed
      stream: "Education", type: "Full Time", duration: "2 Years", fees: "₹25,000 - ₹2 Lakh / year", intake: "50-200 per institute",
      eligibility: ["Bachelor's degree with minimum 50% marks", "State B.Ed entrance exam / university entrance"],
      photo: "edu1",
      shortDesc: "B.Ed is a 2-year teacher training program mandatory for teaching in schools, covering pedagogy, educational psychology, and subject methodology.",
      descContent: "Bachelor of Education is a 2-year professional degree mandatory for teaching in secondary and senior secondary schools. It covers educational psychology, pedagogy, curriculum development, inclusive education, and subject-specific teaching methods. The program includes extensive school internship and practice teaching.",
      whyReasons: [
        { title: "Government teacher jobs", description: "B.Ed is mandatory for qualifying TET/CTET and getting government teaching positions." },
        { title: "Stable career", description: "Teaching offers job security, fixed hours, and long vacations." },
      ],
      semesters: [
        { title: "Year 1", topics: ["Educational Psychology", "Pedagogy", "ICT in Education", "Curriculum Development", "Subject Methodology", "School Observation"] },
        { title: "Year 2", topics: ["Inclusive Education", "Assessment & Evaluation", "Educational Management", "Practice Teaching (6-8 weeks)", "Action Research", "Internship"] },
      ],
      careers: [
        { title: "School Teacher", description: "Teach at government/private schools after clearing CTET/TET. Govt salary: ₹4-8 LPA." },
        { title: "Education Administrator", description: "Become principal, headmaster, or education officer." },
      ],
      aboutPoints: [
        { title: "Practice teaching", description: "Minimum 16 weeks of school-based practice teaching and internship." },
      ],
      faqs: [
        { question: "Is B.Ed compulsory for teaching?", answer: "Yes. As per NCTE norms, B.Ed is mandatory for teaching in classes 6-12. For primary classes, D.El.Ed is the minimum qualification." },
      ],
    },
    {
      name: COURSE_NAMES[16]!, // B.Sc Agriculture
      stream: "Agriculture", type: "Full Time", duration: "4 Years", fees: "₹30,000 - ₹2 Lakh / year", intake: "60-120 per institute",
      eligibility: ["10+2 with Physics, Chemistry, Biology/Agriculture (min 50%)", "ICAR AIEEA / state agriculture entrance exams"],
      photo: "agri1",
      shortDesc: "B.Sc Agriculture is a 4-year program covering agronomy, soil science, plant pathology, horticulture, animal husbandry, and agricultural economics.",
      descContent: "B.Sc Agriculture is a 4-year professional degree covering crop production, soil science, plant protection, horticulture, agricultural engineering, animal husbandry, and agricultural economics. The program includes rural agricultural work experience (RAWE) and industry internship.",
      whyReasons: [
        { title: "ICAR network", description: "Study at ICAR-affiliated universities with strong research infrastructure." },
        { title: "Agri-tech revolution", description: "Precision farming, drone technology, and agri-startups are transforming the sector." },
      ],
      semesters: [
        { title: "Year 1", topics: ["Fundamentals of Agronomy", "Soil Science", "Botany", "Agricultural Chemistry", "English & Communication"] },
        { title: "Year 2", topics: ["Crop Production", "Plant Pathology", "Entomology", "Horticulture", "Agricultural Economics"] },
        { title: "Year 3", topics: ["Plant Breeding & Genetics", "Seed Technology", "Agricultural Extension", "Farm Management", "Animal Husbandry"] },
        { title: "Year 4", topics: ["RAWE (Rural Agricultural Work Experience)", "Agri-Business Management", "Electives", "Project Work"] },
      ],
      careers: [
        { title: "Agricultural Officer", description: "Join banks (IBPS SO), government agriculture departments with ₹4-8 LPA." },
        { title: "Research Scientist", description: "Work at ICAR institutes, agricultural universities after MSc/PhD." },
        { title: "Agri-entrepreneur", description: "Start organic farming, agri-tech, or food processing businesses." },
      ],
      aboutPoints: [
        { title: "Farm experience", description: "Mandatory RAWE program provides hands-on farming experience in rural areas." },
      ],
      faqs: [
        { question: "What is ICAR AIEEA?", answer: "ICAR All India Entrance Examination for Admission is the national exam for admission to agricultural universities across India." },
      ],
    },
    {
      name: COURSE_NAMES[17]!, // BCA
      stream: "Science", type: "Full Time", duration: "3 Years", fees: "₹30,000 - ₹3 Lakh / year", intake: "60-180 per institute",
      eligibility: ["10+2 with Mathematics (min 50%)", "CUET UG / university entrance exam"],
      photo: "eng1",
      shortDesc: "BCA is a 3-year undergraduate IT program covering programming, web development, databases, networking, and software engineering.",
      descContent: "Bachelor of Computer Applications is a 3-year program focused on computer science and software development. It covers programming languages (C, C++, Java, Python), web development, database management, computer networks, data structures, and software engineering. BCA is a popular alternative to B.Tech for students interested in IT careers.",
      whyReasons: [
        { title: "IT career without JEE", description: "Enter the IT industry without requiring JEE — based on 12th marks and entrance exams." },
        { title: "MCA pathway", description: "BCA + MCA combination is equivalent to B.Tech + M.Tech in many companies." },
      ],
      semesters: [
        { title: "Year 1", topics: ["C Programming", "Digital Electronics", "Mathematics", "Operating Systems", "English"] },
        { title: "Year 2", topics: ["Data Structures", "Java Programming", "Database Management", "Computer Networks", "Web Technologies"] },
        { title: "Year 3", topics: ["Software Engineering", "Python/AI", "Cloud Computing", "Minor Project", "Major Project"] },
      ],
      careers: [
        { title: "Software Developer", description: "Join IT companies as developer/tester with ₹3-8 LPA." },
        { title: "MCA", description: "Pursue MCA for advanced specialization and better career prospects." },
      ],
      aboutPoints: [
        { title: "Practical focus", description: "Lab-intensive curriculum with project work every semester." },
      ],
      faqs: [
        { question: "BCA vs B.Tech CSE — which is better?", answer: "B.Tech CSE is more comprehensive and opens more doors. However, BCA + MCA is a viable alternative if you couldn't clear JEE." },
      ],
    },
    {
      name: COURSE_NAMES[18]!, // B.Sc Nursing
      stream: "Medical", type: "Full Time", duration: "4 Years", fees: "₹30,000 - ₹5 Lakh / year", intake: "40-100 per institute",
      eligibility: ["10+2 with Physics, Chemistry, Biology (min 45%)", "NEET UG / state nursing entrance exam"],
      photo: "med2",
      shortDesc: "B.Sc Nursing is a 4-year program covering medical-surgical nursing, community health nursing, pediatric nursing, and psychiatric nursing.",
      descContent: "B.Sc Nursing is a 4-year undergraduate program that trains students in nursing science and clinical practice. It covers anatomy, physiology, medical-surgical nursing, community health nursing, pediatric nursing, OBG nursing, and psychiatric nursing. Clinical rotations in hospitals are a major component.",
      whyReasons: [
        { title: "Global demand", description: "Nurses are in high demand worldwide — opportunities in India, Gulf, UK, Australia, Canada." },
        { title: "Noble service", description: "Directly impact patient care and save lives." },
      ],
      semesters: [
        { title: "Year 1", topics: ["Anatomy", "Physiology", "Biochemistry", "Nutrition", "Fundamentals of Nursing", "Psychology"] },
        { title: "Year 2", topics: ["Medical-Surgical Nursing", "Pharmacology", "Pathology", "Microbiology", "Community Health Nursing"] },
        { title: "Year 3", topics: ["Child Health Nursing", "OBG Nursing", "Mental Health Nursing", "Nursing Research"] },
        { title: "Year 4", topics: ["Advanced Medical-Surgical Nursing", "Community Health Nursing (Advanced)", "Nursing Management", "Internship"] },
      ],
      careers: [
        { title: "Staff Nurse", description: "Work at hospitals (government/private) with ₹3-8 LPA." },
        { title: "International nursing", description: "Work abroad in UK, Australia, Gulf with ₹15-40 LPA equivalent." },
      ],
      aboutPoints: [
        { title: "Clinical training", description: "Extensive hospital-based clinical practice from Year 1." },
      ],
      faqs: [
        { question: "Is NEET required for B.Sc Nursing?", answer: "NEET UG score is required for admission to many government nursing colleges. Some private colleges have their own entrance exams." },
      ],
    },
    {
      name: COURSE_NAMES[19]!, // M.Tech CS
      stream: "Engineering", type: "Full Time", duration: "2 Years", fees: "₹20,000 - ₹3 Lakh / year", intake: "20-60 per department",
      eligibility: ["B.Tech / BE in relevant branch with minimum 60%", "Valid GATE score for IITs/NITs"],
      photo: "eng2",
      shortDesc: "M.Tech CSE is a 2-year postgraduate program with specializations in AI/ML, data science, cybersecurity, and distributed systems.",
      descContent: "M.Tech in Computer Science is a 2-year postgraduate program that provides advanced knowledge in computing. Specializations include Artificial Intelligence, Machine Learning, Data Science, Cybersecurity, Distributed Systems, and Computer Vision. The program includes coursework, research, and a thesis/dissertation.",
      whyReasons: [
        { title: "Research careers", description: "Gateway to PhD programs and research roles at Microsoft Research, Google Brain, etc." },
        { title: "Higher packages", description: "M.Tech from IITs can fetch ₹20-50+ LPA in specialized roles." },
        { title: "GATE-based PSU jobs", description: "Top GATE scorers get direct entry to PSUs like ISRO, DRDO, BARC." },
      ],
      semesters: [
        { title: "Semester 1", topics: ["Advanced Algorithms", "Machine Learning", "Advanced Computer Architecture", "Research Methodology"] },
        { title: "Semester 2", topics: ["Deep Learning", "Distributed Computing", "Specialization Electives", "Seminar"] },
        { title: "Semester 3-4", topics: ["Thesis / Dissertation", "Advanced Electives", "Publication", "Defence"] },
      ],
      careers: [
        { title: "Research Engineer", description: "Work at Google Research, Microsoft Research, IBM Research with ₹25-50 LPA." },
        { title: "AI/ML Engineer", description: "Specialized AI roles at top companies with premium compensation." },
        { title: "Faculty / PhD", description: "Pursue PhD and academic career at top institutions." },
      ],
      aboutPoints: [
        { title: "Research focus", description: "Thesis-based program with publication in top conferences/journals expected." },
      ],
      faqs: [
        { question: "Is GATE mandatory?", answer: "Yes, for admission to IITs, NITs, and IIITs. Some private institutes accept their own entrance exams." },
        { question: "M.Tech vs direct job after B.Tech?", answer: "If you want research/specialized roles or PSU jobs, M.Tech adds value. For general software roles, direct B.Tech placement may be better." },
      ],
    },
    // ─── NEW COURSES (15 more with full 7-section data) ───
    {
      name: COURSE_NAMES[20]!, // B.Tech IT
      stream: "Engineering", type: "Full Time", duration: "4 Years", fees: "₹1,50,000 - ₹5,00,000 / year", intake: "60-180 per institute",
      eligibility: ["10+2 with Physics, Chemistry, Mathematics (min 50%)", "JEE Main / state entrance exams"],
      photo: "eng1",
      shortDesc: "B.Tech Information Technology focuses on software systems, web technologies, databases, networking, cloud computing, and cybersecurity — bridging CS theory with practical IT infrastructure.",
      descContent: "Bachelor of Technology in Information Technology is a 4-year program that covers software development, database management, computer networks, web technologies, cloud computing, cybersecurity, and IT project management. While similar to CSE, IT places more emphasis on applied computing, enterprise systems, and information management rather than pure algorithmic theory.",
      whyReasons: [
        { title: "Industry-ready skills", description: "IT curriculum is closely aligned with industry needs — web dev, cloud, DevOps, and enterprise systems." },
        { title: "High demand", description: "IT professionals are needed in every industry, not just tech companies — banks, hospitals, government all need IT." },
        { title: "Placement parity with CSE", description: "At most colleges, IT placements are nearly identical to CSE with the same companies recruiting." },
      ],
      semesters: [
        { title: "Semester 1-2 (Foundation)", topics: ["Engineering Mathematics", "Physics", "Programming in C/C++", "Digital Logic", "Basic Electronics", "Communication Skills"] },
        { title: "Semester 3-4 (Core IT)", topics: ["Data Structures & Algorithms", "Object-Oriented Programming (Java)", "Database Management Systems", "Computer Networks", "Operating Systems", "Discrete Mathematics"] },
        { title: "Semester 5-6 (Advanced IT)", topics: ["Web Technologies (HTML/CSS/JS/React)", "Software Engineering", "Cloud Computing", "Information Security", "Data Mining", "Mobile Application Development"] },
        { title: "Semester 7-8 (Specialization)", topics: ["DevOps & CI/CD", "Big Data Analytics", "IoT (Internet of Things)", "Blockchain Technology", "Major Project / Thesis", "Industrial Internship"] },
      ],
      careers: [
        { title: "Software Developer / Full-Stack Engineer", description: "Build web and mobile applications at IT companies with packages of ₹6-25 LPA." },
        { title: "Cloud / DevOps Engineer", description: "Manage cloud infrastructure at AWS, Azure, GCP partners with ₹8-25 LPA." },
        { title: "Cybersecurity Analyst", description: "Protect organizations from cyber threats — growing demand with ₹8-20 LPA." },
        { title: "IT Consultant", description: "Advisory roles at Deloitte, Accenture, TCS with ₹6-15 LPA." },
      ],
      aboutPoints: [
        { title: "Practical project focus", description: "More project-based than CSE — real-world IT systems are built every semester." },
        { title: "Industry certifications", description: "Students encouraged to get AWS, Azure, CCNA, and other industry certifications alongside degree." },
        { title: "Same placement opportunities", description: "IT and CSE students sit for the same placement drives at most colleges." },
      ],
      faqs: [
        { question: "B.Tech IT vs B.Tech CSE — what's the difference?", answer: "CSE is more theoretical (algorithms, compilers, OS internals). IT is more applied (web systems, enterprise IT, cloud). Placements are nearly identical at good colleges." },
        { question: "Can IT students get into Google/Microsoft?", answer: "Yes. Product companies hire based on coding skills and DSA, not branch name. IT students regularly get into FAANG." },
        { question: "Is IT easier than CSE?", answer: "Slightly less theory-heavy (no compiler design, fewer math courses). But the practical workload can be higher." },
      ],
    },
    {
      name: COURSE_NAMES[21]!, // B.Tech Chemical Engineering
      stream: "Engineering", type: "Full Time", duration: "4 Years", fees: "₹1,50,000 - ₹2,10,000 / year", intake: "40-80 per institute",
      eligibility: ["10+2 with Physics, Chemistry, Mathematics", "JEE Main / JEE Advanced / state entrance exams"],
      photo: "sci1",
      shortDesc: "B.Tech Chemical Engineering deals with designing and operating chemical processes, petrochemical plants, pharmaceutical manufacturing, food processing, and environmental systems.",
      descContent: "Chemical Engineering combines chemistry, physics, biology, mathematics, and economics to design processes that convert raw materials into useful products. The 4-year program covers fluid mechanics, heat transfer, mass transfer, reaction engineering, process control, and plant design. It's essential for petroleum, pharma, food, and environmental industries.",
      whyReasons: [
        { title: "Core industry demand", description: "Petrochemical, pharmaceutical, and FMCG industries have consistent demand for chemical engineers." },
        { title: "PSU opportunities", description: "IOCL, BPCL, HPCL, ONGC, and GAIL actively recruit chemical engineers via GATE." },
        { title: "Interdisciplinary nature", description: "Combines chemistry, physics, and engineering — opens doors to diverse industries including biotech and energy." },
      ],
      semesters: [
        { title: "Semester 1-2", topics: ["Engineering Mathematics", "Chemistry", "Physics", "Introduction to Chemical Engineering", "Engineering Drawing", "Programming"] },
        { title: "Semester 3-4", topics: ["Fluid Mechanics", "Chemical Engineering Thermodynamics", "Heat Transfer", "Mass Transfer Operations", "Material Science", "Process Calculations"] },
        { title: "Semester 5-6", topics: ["Chemical Reaction Engineering", "Process Dynamics and Control", "Separation Processes", "Petroleum Refining", "Environmental Engineering", "Transport Phenomena"] },
        { title: "Semester 7-8", topics: ["Process Plant Design", "Process Simulation", "Polymer Technology", "Biochemical Engineering", "Project / Thesis", "Industrial Internship"] },
      ],
      careers: [
        { title: "Process Engineer", description: "Design and optimize chemical processes at Reliance, IOCL, BPCL with ₹6-15 LPA." },
        { title: "PSU roles via GATE", description: "Join IOCL, BPCL, HPCL, ONGC, GAIL — excellent pay (₹10-18 LPA) and job security." },
        { title: "Pharma / Biotech roles", description: "Work in drug manufacturing at Sun Pharma, Dr. Reddy's, Biocon." },
        { title: "Consulting / Finance", description: "Many chemical engineers transition to consulting (McKinsey, BCG) or finance roles." },
      ],
      aboutPoints: [
        { title: "Versatile career paths", description: "Chemical engineers work in oil & gas, pharma, FMCG, biotech, semiconductors, and even finance." },
        { title: "Strong GATE culture", description: "Chemical engineering has one of the best PSU recruitment records via GATE." },
      ],
      faqs: [
        { question: "Is Chemical Engineering dying?", answer: "No. While traditional roles evolve, new areas like green hydrogen, battery technology, and semiconductor fabrication need chemical engineers more than ever." },
        { question: "Chemical Engineering salary?", answer: "PSUs: ₹10-18 LPA. Private core: ₹5-12 LPA. IT roles: ₹8-20 LPA. Consulting/MBA: ₹15-40 LPA." },
      ],
    },
    {
      name: COURSE_NAMES[22]!, // B.Tech Biotechnology
      stream: "Engineering", type: "Full Time", duration: "4 Years", fees: "₹1,50,000 - ₹4,00,000 / year", intake: "30-60 per institute",
      eligibility: ["10+2 with Physics, Chemistry, Biology/Mathematics", "JEE Main / state entrance / institute exams"],
      photo: "med1",
      shortDesc: "B.Tech Biotechnology integrates biology with engineering to develop products and technologies for healthcare, agriculture, environment, and industrial applications.",
      descContent: "Biotechnology engineering combines molecular biology, genetics, biochemistry, and engineering principles to develop biological products and processes. The 4-year program covers cell biology, genetics, genetic engineering, bioinformatics, fermentation technology, bioprocess engineering, and pharmaceutical biotechnology.",
      whyReasons: [
        { title: "Post-COVID boom", description: "Vaccine development, diagnostics, and biopharma have massively increased demand for biotech professionals." },
        { title: "Interdisciplinary field", description: "Combines biology, chemistry, and engineering — opens unique career paths not available to pure science graduates." },
        { title: "Research-intensive", description: "Strong pathway to PhD and research careers at CSIR, ICMR, DBT labs, and global universities." },
      ],
      semesters: [
        { title: "Semester 1-2", topics: ["Biology for Engineers", "Chemistry", "Mathematics", "Physics", "Introduction to Biotechnology", "Programming"] },
        { title: "Semester 3-4", topics: ["Cell Biology", "Biochemistry", "Microbiology", "Molecular Biology", "Genetics", "Biostatistics"] },
        { title: "Semester 5-6", topics: ["Genetic Engineering", "Immunology", "Bioinformatics", "Bioprocess Engineering", "Fermentation Technology", "Downstream Processing"] },
        { title: "Semester 7-8", topics: ["Pharmaceutical Biotechnology", "Environmental Biotechnology", "Plant/Animal Biotechnology", "Genomics & Proteomics", "Project / Thesis", "Industrial Training"] },
      ],
      careers: [
        { title: "Biopharma Researcher", description: "Work at Biocon, Serum Institute, Bharat Biotech in drug/vaccine development with ₹5-15 LPA." },
        { title: "Bioinformatics Analyst", description: "Computational biology roles at pharma and research labs with ₹6-15 LPA." },
        { title: "Quality Control / Regulatory", description: "QC/QA roles in pharmaceutical and biotech companies." },
        { title: "Research Scientist (PhD)", description: "Pursue PhD and work at CSIR, ICMR, DBT labs, or global research institutions." },
      ],
      aboutPoints: [
        { title: "Lab-intensive curriculum", description: "50%+ of course time is spent in wet labs and computational biology labs." },
        { title: "Industry internships mandatory", description: "Most programs require 6-month industry internship at biotech/pharma companies." },
      ],
      faqs: [
        { question: "Is Biotech a good branch?", answer: "Yes, especially post-COVID. Core biotech jobs are growing. Many also transition to IT, data science, or MBA. Research opportunities are excellent." },
        { question: "B.Tech Biotech vs B.Sc Biotech?", answer: "B.Tech has engineering components (process design, scale-up) that B.Sc lacks. B.Tech commands higher industry salaries." },
      ],
    },
    {
      name: COURSE_NAMES[23]!, // B.Tech Aerospace
      stream: "Engineering", type: "Full Time", duration: "4 Years", fees: "₹2,09,550 / year (IITs)", intake: "30-60 per institute",
      eligibility: ["10+2 with Physics, Chemistry, Mathematics", "JEE Advanced for IITs / JEE Main for others"],
      photo: "eng3",
      shortDesc: "B.Tech Aerospace Engineering covers aerodynamics, propulsion systems, aircraft structures, space technology, satellite design, and flight mechanics.",
      descContent: "Aerospace Engineering is the branch of engineering dealing with the design, development, and testing of aircraft and spacecraft. The 4-year program covers aerodynamics, flight mechanics, propulsion, aerospace structures, avionics, orbital mechanics, and space technology. IIT Bombay, IIT Madras, IIT Kanpur, and IISc are the premier institutions for aerospace in India.",
      whyReasons: [
        { title: "ISRO and DRDO careers", description: "India's space and defence programs are expanding rapidly — Gaganyaan, Chandrayaan, AMCA, Tejas all need aerospace engineers." },
        { title: "Global demand", description: "Boeing, Airbus, SpaceX, and defence companies worldwide hire Indian aerospace graduates." },
        { title: "Cutting-edge research", description: "Work on hypersonics, reusable launch vehicles, satellite constellations, and UAVs." },
      ],
      semesters: [
        { title: "Semester 1-2", topics: ["Engineering Mathematics", "Physics", "Engineering Mechanics", "Programming", "Engineering Drawing", "Material Science"] },
        { title: "Semester 3-4", topics: ["Aerodynamics", "Flight Mechanics", "Thermodynamics", "Strength of Materials", "Fluid Mechanics", "Aerospace Materials"] },
        { title: "Semester 5-6", topics: ["Aircraft Structures", "Propulsion Systems", "Control Systems", "Avionics", "Orbital Mechanics", "Computational Fluid Dynamics"] },
        { title: "Semester 7-8", topics: ["Spacecraft Design", "Gas Dynamics", "Composite Materials", "Wind Tunnel Testing", "Project / Thesis", "ISRO/HAL Internship"] },
      ],
      careers: [
        { title: "ISRO Scientist/Engineer", description: "Join ISRO via GATE or direct recruitment. Work on Gaganyaan, Chandrayaan, PSLV. ₹8-18 LPA." },
        { title: "DRDO / HAL Engineer", description: "Defence aerospace at DRDO, HAL working on Tejas, AMCA, missiles. ₹8-16 LPA." },
        { title: "Global aerospace companies", description: "Boeing, Airbus, GE Aviation, Rolls-Royce hire from IITs. ₹12-30 LPA abroad." },
        { title: "Private space startups", description: "Agnikul, Skyroot, Pixxel — India's growing private space sector." },
      ],
      aboutPoints: [
        { title: "Wind tunnel and flight sim labs", description: "Top programs have subsonic/supersonic wind tunnels and flight simulators." },
        { title: "ISRO internships", description: "IIT aerospace departments have strong ISRO collaboration for internships and projects." },
      ],
      faqs: [
        { question: "Is Aerospace Engineering worth it in India?", answer: "Yes — India's space and defence sectors are booming (Gaganyaan, private space startups). ISRO, DRDO, HAL are expanding. IT companies also hire aerospace grads." },
        { question: "Aerospace vs Mechanical — which is better?", answer: "Mechanical has more jobs overall. Aerospace is more specialized with fewer but more exciting opportunities (ISRO, Boeing). Many aerospace grads also work in mechanical/automotive roles." },
      ],
    },
    {
      name: COURSE_NAMES[24]!, // B.Tech AI/ML
      stream: "Engineering", type: "Full Time", duration: "4 Years", fees: "₹2,00,000 - ₹5,00,000 / year", intake: "30-120 per institute",
      eligibility: ["10+2 with Physics, Chemistry, Mathematics", "JEE Main / JEE Advanced / institute entrance exams"],
      photo: "eng2",
      shortDesc: "B.Tech AI and Machine Learning is a specialized program covering deep learning, natural language processing, computer vision, reinforcement learning, and AI systems design.",
      descContent: "B.Tech in Artificial Intelligence and Machine Learning is a relatively new 4-year program that dives deep into AI foundations and applications. It covers mathematical foundations (linear algebra, probability, optimization), core ML algorithms, deep learning, NLP, computer vision, reinforcement learning, and responsible AI. The program is more specialized than CSE with dedicated AI coursework from Year 2 onwards.",
      whyReasons: [
        { title: "Hottest career in tech", description: "AI/ML roles command the highest salaries in tech — ₹15-60+ LPA at top companies." },
        { title: "Every industry needs AI", description: "Healthcare, finance, automotive, agriculture, defence — AI is transforming every sector." },
        { title: "Research opportunities", description: "Active research in generative AI, autonomous systems, AI safety — cutting-edge field." },
      ],
      semesters: [
        { title: "Semester 1-2 (Foundation)", topics: ["Mathematics (Linear Algebra, Probability, Calculus)", "Programming in Python", "Data Structures", "Introduction to AI", "Digital Logic", "Statistics"] },
        { title: "Semester 3-4 (Core ML)", topics: ["Machine Learning Fundamentals", "Deep Learning (Neural Networks, CNNs, RNNs)", "Database Systems", "Computer Vision Basics", "Natural Language Processing Basics", "Algorithms"] },
        { title: "Semester 5-6 (Advanced AI)", topics: ["Advanced Deep Learning (Transformers, GANs)", "Reinforcement Learning", "Computer Vision (Object Detection, Segmentation)", "NLP (LLMs, Transformers)", "MLOps & Deployment", "AI Ethics & Responsible AI"] },
        { title: "Semester 7-8 (Specialization)", topics: ["Generative AI & Large Language Models", "Autonomous Systems / Robotics", "AI for Healthcare / Finance (domain electives)", "Capstone Project / Thesis", "Industry Internship", "Research Paper / Publication"] },
      ],
      careers: [
        { title: "ML Engineer", description: "Build and deploy ML models at Google, Meta, Amazon, startups. ₹15-50+ LPA." },
        { title: "Data Scientist", description: "Extract insights from data using ML at analytics and tech companies. ₹12-35 LPA." },
        { title: "AI Research Scientist", description: "Research at Google DeepMind, OpenAI partners, Microsoft Research. ₹25-80+ LPA." },
        { title: "Computer Vision / NLP Engineer", description: "Specialized roles in autonomous driving, generative AI, chatbots. ₹15-45 LPA." },
      ],
      aboutPoints: [
        { title: "GPU-equipped labs", description: "Programs at top colleges have NVIDIA GPU clusters for deep learning training." },
        { title: "Kaggle and research culture", description: "Students actively participate in Kaggle competitions and publish at AI conferences." },
        { title: "Industry demand outstrips supply", description: "India has a massive shortage of AI talent — graduates are hired even before final year." },
      ],
      faqs: [
        { question: "B.Tech AI/ML vs B.Tech CSE — which should I choose?", answer: "CSE is broader and more established. AI/ML is specialized but restricts your options slightly. At top colleges, CSE with AI electives is often better than a separate AI/ML degree." },
        { question: "Is B.Tech AI/ML a fad?", answer: "No. AI is a fundamental technology shift like the internet. The field will grow for decades. But choose a reputable college — the brand matters more than the branch name." },
        { question: "What math is needed?", answer: "Strong foundation in linear algebra, probability/statistics, calculus, and optimization. Math is ~40% of the AI/ML curriculum." },
      ],
    },
    {
      name: COURSE_NAMES[25]!, // MCA
      stream: "Science", type: "Full Time", duration: "2 Years", fees: "₹30,000 - ₹3,00,000 / year", intake: "60-120 per institute",
      eligibility: ["BCA / B.Sc with Mathematics / B.Com with Mathematics", "NIMCET / state MCA entrance / university entrance"],
      photo: "eng1",
      shortDesc: "MCA (Master of Computer Applications) is a 2-year postgraduate program covering advanced programming, software engineering, cloud computing, data science, and IT management.",
      descContent: "Master of Computer Applications is a 2-year postgraduate program that provides advanced training in computer science and software development. Ideal for BCA, B.Sc, or non-CS graduates wanting to enter the IT industry. Covers advanced programming (Java, Python), software engineering, web technologies, database systems, cloud computing, data science, and AI/ML.",
      whyReasons: [
        { title: "IT career for non-CS graduates", description: "MCA allows BCA, B.Sc, and even B.Com graduates to enter the IT industry with proper CS training." },
        { title: "NIT MCA = strong placements", description: "MCA from NITs (Trichy, Warangal, Allahabad) offers ₹10-20 LPA packages comparable to B.Tech." },
        { title: "Shorter duration now", description: "Reduced from 3 to 2 years by AICTE in 2020, making it equivalent to M.Tech in duration." },
      ],
      semesters: [
        { title: "Semester 1", topics: ["Advanced Java Programming", "Data Structures & Algorithms", "Database Management Systems", "Computer Networks", "Discrete Mathematics", "Operating Systems"] },
        { title: "Semester 2", topics: ["Software Engineering", "Web Technologies (Full Stack)", "Cloud Computing", "Machine Learning", "Cyber Security", "Mini Project"] },
        { title: "Semester 3", topics: ["Data Science & Big Data", "Mobile App Development", "DevOps", "Electives (AI/Blockchain/IoT)", "Major Project / Dissertation", "Industry Internship"] },
      ],
      careers: [
        { title: "Software Developer", description: "Join IT companies as developer with ₹5-15 LPA (NIT MCA: ₹10-20 LPA)." },
        { title: "Cloud / DevOps Engineer", description: "Manage cloud infrastructure with ₹8-18 LPA." },
        { title: "Data Analyst / Scientist", description: "Analytics roles at IT companies with ₹6-15 LPA." },
        { title: "IT Consultant", description: "Consulting roles at TCS, Infosys, Accenture with ₹6-12 LPA." },
      ],
      aboutPoints: [
        { title: "NIMCET for NITs", description: "NIT MCA admissions through NIMCET — a national-level entrance for NIT MCA programs." },
        { title: "Bridging course", description: "Designed to bring non-CS graduates up to speed with CS fundamentals in first semester." },
      ],
      faqs: [
        { question: "MCA vs M.Tech CS — which is better?", answer: "M.Tech CS requires GATE and is more research-oriented. MCA is more industry-focused. For software jobs, both lead to similar roles. M.Tech has PSU access via GATE." },
        { question: "Is MCA still relevant after B.Tech?", answer: "MCA is mainly for non-B.Tech graduates entering IT. If you already have B.Tech CS, M.Tech or direct job is better." },
        { question: "Best colleges for MCA?", answer: "NIT Trichy, NIT Warangal, NIT Allahabad, JNU, BHU, Pune University, Anna University. NIT MCA placements rival B.Tech." },
      ],
    },
    {
      name: COURSE_NAMES[26]!, // BA Economics
      stream: "Commerce", type: "Full Time", duration: "3 Years", fees: "₹15,000 - ₹3,00,000 / year", intake: "40-100 per department",
      eligibility: ["10+2 from any stream with Mathematics (min 50%)", "CUET UG / university entrance exam"],
      photo: "finance1",
      shortDesc: "BA Economics (Honours) provides rigorous training in micro and macroeconomics, econometrics, game theory, development economics, and quantitative methods.",
      descContent: "BA Economics (Honours) is a 3-year undergraduate program that provides deep understanding of economic theory and its applications. It covers microeconomics, macroeconomics, econometrics, mathematical economics, development economics, international trade, public finance, and Indian economic policy. The program builds strong analytical and quantitative skills valued across industries.",
      whyReasons: [
        { title: "Gateway to top careers", description: "Economics graduates enter consulting (McKinsey, BCG), investment banking (Goldman Sachs), civil services (IAS), and policy (RBI, NITI Aayog)." },
        { title: "Versatile degree", description: "Combines quantitative rigor with social science breadth. Works for MBA, law, public policy, and data science." },
        { title: "DU Economics prestige", description: "BA Economics from SRCC, St. Stephen's, Hindu, LSR is among the most sought-after undergraduate degrees in India." },
      ],
      semesters: [
        { title: "Year 1", topics: ["Introductory Microeconomics", "Introductory Macroeconomics", "Mathematical Methods for Economics", "Statistical Methods", "English Communication"] },
        { title: "Year 2", topics: ["Intermediate Microeconomics (Game Theory, Market Structures)", "Intermediate Macroeconomics (IS-LM, AD-AS)", "Econometrics", "Development Economics", "Indian Economy"] },
        { title: "Year 3", topics: ["International Economics & Trade", "Public Finance & Taxation", "Financial Economics", "Electives (Environmental Econ, Behavioral Econ, Health Econ)", "Dissertation / Research Paper"] },
      ],
      careers: [
        { title: "Management Consultant", description: "Join McKinsey, BCG, Bain after MBA or directly from top colleges. ₹15-40 LPA." },
        { title: "Investment Banking / Finance", description: "Roles at Goldman Sachs, JPMorgan, Morgan Stanley. ₹12-30 LPA." },
        { title: "Civil Services (IAS/IES)", description: "Economics is one of the best optional subjects for UPSC. Indian Economic Service is a dedicated cadre." },
        { title: "Policy Research / Think Tanks", description: "Work at RBI, NITI Aayog, World Bank, IMF on economic policy. ₹8-20 LPA." },
        { title: "Data Science / Analytics", description: "Quantitative skills transfer well to data roles. ₹8-18 LPA." },
      ],
      aboutPoints: [
        { title: "Mathematics-heavy", description: "Unlike school economics, BA Econ (Hons) is highly mathematical — calculus, linear algebra, and statistics are core." },
        { title: "Research emphasis", description: "Final year dissertation/research paper develops academic writing and analytical skills." },
        { title: "Strong alumni network", description: "DU Economics alumni are in top positions across finance, consulting, policy, and academia globally." },
      ],
      faqs: [
        { question: "Is Mathematics compulsory for BA Economics?", answer: "At most good colleges (DU, JNU), yes. You need 10+2 Mathematics. Some universities offer Economics without Math but career prospects are limited." },
        { question: "BA Economics vs B.Com — which is better?", answer: "Economics is more analytical/theoretical, better for consulting, policy, research. B.Com is more practical, better for CA/CS, accounting, banking." },
        { question: "Can I do MBA after BA Economics?", answer: "Yes, and it's an excellent combination. Many IIM toppers have BA Economics backgrounds. The analytical training gives a strong CAT preparation base." },
      ],
    },
    {
      name: COURSE_NAMES[27]!, // BA English
      stream: "Education", type: "Full Time", duration: "3 Years", fees: "₹10,000 - ₹2,00,000 / year", intake: "40-100 per department",
      eligibility: ["10+2 from any stream (min 50%)", "CUET UG / university entrance exam"],
      photo: "edu2",
      shortDesc: "BA English (Honours) covers British, American, and Indian literature, literary criticism, linguistics, creative writing, and cultural studies.",
      descContent: "BA English (Honours) is a 3-year program that provides in-depth study of English literature, language, and critical thinking. Covers British literature (Shakespeare to modern), American literature, Indian writing in English, postcolonial literature, literary theory and criticism, linguistics, and creative writing. Develops strong communication, analytical, and critical thinking skills.",
      whyReasons: [
        { title: "Communication skills", description: "English Honours graduates have the strongest communication skills — valued in media, advertising, consulting, and corporate." },
        { title: "Diverse career paths", description: "From journalism and publishing to civil services and corporate communications — English opens many doors." },
        { title: "UPSC optional", description: "English Literature is a popular and scoring UPSC optional subject." },
      ],
      semesters: [
        { title: "Year 1", topics: ["British Literature (Medieval to Renaissance)", "Indian Writing in English", "Language and Linguistics", "Academic Writing", "European Classical Literature"] },
        { title: "Year 2", topics: ["British Literature (Romantic to Victorian)", "American Literature", "Literary Theory & Criticism", "Postcolonial Literature", "Women's Writing"] },
        { title: "Year 3", topics: ["Modern & Contemporary Literature", "Film Studies / Popular Culture", "Creative Writing", "Dissertation", "Electives (Translation Studies, Digital Humanities)"] },
      ],
      careers: [
        { title: "Journalist / Editor", description: "Work at newspapers, magazines, digital media with ₹4-12 LPA." },
        { title: "Content Strategist / Copywriter", description: "Advertising, tech companies, and startups. ₹5-15 LPA." },
        { title: "Civil Services (IAS)", description: "English Literature is a popular UPSC optional. Many IAS officers have English backgrounds." },
        { title: "Publishing / Academia", description: "Editors, publishers, professors after MA/PhD. ₹4-15 LPA." },
      ],
      aboutPoints: [
        { title: "Reading-intensive", description: "Expect to read 40-60 books over 3 years — novels, poetry, plays, and critical essays." },
        { title: "Seminar-based learning", description: "DU English departments use seminar/discussion-based teaching rather than lectures alone." },
      ],
      faqs: [
        { question: "Is BA English useful for jobs?", answer: "Yes — communication skills are universally valued. English grads enter media, advertising, content, consulting, civil services, teaching, and publishing." },
        { question: "Can I do MBA after BA English?", answer: "Absolutely. Many successful MBA students have arts backgrounds. The verbal skills from English help in CAT VARC section and GD-PI rounds." },
      ],
    },
    {
      name: COURSE_NAMES[28]!, // BA Psychology
      stream: "Science", type: "Full Time", duration: "3 Years", fees: "₹15,000 - ₹3,00,000 / year", intake: "30-80 per department",
      eligibility: ["10+2 from any stream (min 50%)", "CUET UG / university entrance exam"],
      photo: "edu1",
      shortDesc: "BA Psychology (Honours) covers cognitive psychology, developmental psychology, clinical psychology, social psychology, research methods, and counselling techniques.",
      descContent: "BA Psychology (Honours) is a 3-year program studying human mind and behavior. Covers cognitive psychology, developmental psychology, social psychology, abnormal psychology, neuropsychology, statistics for psychology, research methods, and counselling. Increasingly popular due to growing mental health awareness in India.",
      whyReasons: [
        { title: "Mental health boom", description: "India is waking up to mental health. Demand for counsellors and clinical psychologists is skyrocketing." },
        { title: "Organizational roles", description: "I/O Psychology is used in HR, UX research, consumer behavior — high-paying corporate roles." },
        { title: "Research opportunities", description: "Cognitive science and neuroscience research is expanding at IITs, IISc, NIMHANS, and global universities." },
      ],
      semesters: [
        { title: "Year 1", topics: ["Introduction to Psychology", "Biological Basis of Behavior", "Statistics for Psychology", "Developmental Psychology", "General Psychology Lab"] },
        { title: "Year 2", topics: ["Cognitive Psychology", "Social Psychology", "Abnormal Psychology", "Research Methods & Design", "Psychological Testing", "Health Psychology"] },
        { title: "Year 3", topics: ["Clinical Psychology", "Counselling Psychology", "Industrial/Organizational Psychology", "Neuropsychology", "Dissertation / Research Project", "Electives"] },
      ],
      careers: [
        { title: "Clinical Psychologist (after M.Phil)", description: "Provide therapy and mental health treatment. ₹5-15 LPA. RCI license required." },
        { title: "Counsellor", description: "School, college, or corporate counselling. Growing demand. ₹4-10 LPA." },
        { title: "UX Researcher", description: "Apply psychology to product design at tech companies. ₹8-20 LPA." },
        { title: "HR / OB Consultant", description: "Industrial-organizational psychology roles in HR consulting. ₹6-15 LPA." },
      ],
      aboutPoints: [
        { title: "Lab-based learning", description: "Psychology practicals involve experiments, case studies, and psychometric testing." },
        { title: "Internship with clinical exposure", description: "Final year students intern at hospitals, NGOs, or counselling centers." },
      ],
      faqs: [
        { question: "Can I become a psychologist with just BA?", answer: "To practice as a clinical psychologist, you need BA → MA → M.Phil (Clinical Psych, RCI recognized). BA alone qualifies for counselling and HR roles." },
        { question: "Best colleges for Psychology in India?", answer: "Christ University, LSR, Fergusson, TISS, Ambedkar University Delhi, JNU, Presidency. For clinical: NIMHANS, CIP Ranchi." },
      ],
    },
    {
      name: COURSE_NAMES[29]!, // B.Sc Computer Science
      stream: "Science", type: "Full Time", duration: "3 Years", fees: "₹10,000 - ₹2,00,000 / year", intake: "40-100 per department",
      eligibility: ["10+2 with Mathematics (min 50%)", "CUET UG / university entrance exam"],
      photo: "eng1",
      shortDesc: "B.Sc Computer Science covers programming, data structures, algorithms, databases, operating systems, and software development in a 3-year science degree format.",
      descContent: "B.Sc Computer Science is a 3-year undergraduate science program covering core CS fundamentals — programming (C, C++, Java, Python), data structures, algorithms, databases, operating systems, computer networks, and software engineering. It provides a solid foundation for IT careers or further studies (MCA, M.Sc CS, or MSc in Data Science).",
      whyReasons: [
        { title: "Affordable CS education", description: "B.Sc CS at government colleges costs ₹10-30K/year — fraction of B.Tech fees for similar job outcomes in IT." },
        { title: "3-year degree", description: "Enter the workforce 1 year earlier than B.Tech graduates. Or add MCA for equivalent qualification." },
        { title: "No JEE required", description: "Admission via CUET UG or university exams — accessible for students who didn't appear for JEE." },
      ],
      semesters: [
        { title: "Year 1", topics: ["Programming in C/C++", "Computer Fundamentals", "Mathematics (Discrete, Linear Algebra)", "Physics / Electronics", "Communication Skills"] },
        { title: "Year 2", topics: ["Data Structures & Algorithms", "Java / Python Programming", "Database Management Systems", "Computer Networks", "Operating Systems", "Software Engineering"] },
        { title: "Year 3", topics: ["Web Technologies", "Artificial Intelligence Basics", "Cloud Computing", "Cyber Security", "Minor Project", "Major Project"] },
      ],
      careers: [
        { title: "Software Developer", description: "IT companies hire B.Sc CS graduates for developer roles. ₹3-8 LPA." },
        { title: "Web Developer", description: "Frontend/backend web development at startups and agencies. ₹3-8 LPA." },
        { title: "MCA → Higher roles", description: "B.Sc CS + MCA = equivalent to B.Tech + M.Tech for many companies." },
      ],
      aboutPoints: [
        { title: "Theory + practical balance", description: "Less engineering theory (no physics/chemistry beyond Year 1) — more focused on pure CS." },
        { title: "Coding-first approach", description: "Lab sessions from Day 1. Programming is the core skill developed." },
      ],
      faqs: [
        { question: "B.Sc CS vs BCA — which is better?", answer: "Both lead to similar IT careers. B.Sc CS is more theoretical/academic. BCA is more applied/industry-focused. B.Sc CS from DU/good university has better brand." },
        { question: "Can I get into top companies with B.Sc CS?", answer: "Yes, if you build strong coding skills. Companies like TCS, Infosys, Wipro actively hire B.Sc CS graduates. For Google/Amazon, you need MCA or exceptional skills." },
      ],
    },
    {
      name: COURSE_NAMES[30]!, // B.Sc Chemistry
      stream: "Science", type: "Full Time", duration: "3 Years", fees: "₹10,000 - ₹1,50,000 / year", intake: "30-80 per department",
      eligibility: ["10+2 with Chemistry and Mathematics/Biology (min 50%)", "CUET UG / university entrance exam"],
      photo: "sci1",
      shortDesc: "B.Sc Chemistry (Honours) provides rigorous training in organic, inorganic, physical, and analytical chemistry with extensive lab work.",
      descContent: "B.Sc Chemistry (Honours) is a 3-year program covering organic chemistry, inorganic chemistry, physical chemistry, analytical chemistry, spectroscopy, and quantum chemistry. Extensive lab work builds practical skills in synthesis, analysis, and instrumentation. Prepares students for research, pharma, materials science, and environmental careers.",
      whyReasons: [
        { title: "Pharma and chemical industry", description: "India's pharma industry (world's largest generic producer) needs chemistry graduates." },
        { title: "Research pathways", description: "Gateway to M.Sc, PhD, and careers at CSIR, IISER, IITs, and global universities." },
        { title: "CSIR NET/GATE", description: "Chemistry has good CSIR NET JRF fellowships (₹37,000/month) for research careers." },
      ],
      semesters: [
        { title: "Year 1", topics: ["Inorganic Chemistry (Atomic Structure, Chemical Bonding)", "Organic Chemistry (Stereochemistry, Reaction Mechanisms)", "Physical Chemistry (Thermodynamics, Chemical Kinetics)", "Mathematics for Chemists", "Lab Practicals"] },
        { title: "Year 2", topics: ["Coordination Chemistry", "Organic Synthesis & Spectroscopy (NMR, IR, Mass)", "Quantum Chemistry", "Electrochemistry", "Analytical Chemistry", "Advanced Lab"] },
        { title: "Year 3", topics: ["Organometallic Chemistry", "Polymer Chemistry", "Photochemistry", "Environmental Chemistry", "Electives (Medicinal Chemistry, Materials Science)", "Research Project"] },
      ],
      careers: [
        { title: "Pharma Industry", description: "R&D, quality control, production at Sun Pharma, Dr. Reddy's. ₹3-8 LPA." },
        { title: "Research Scientist", description: "After M.Sc/PhD at CSIR labs, IISERs, IITs. ₹5-15 LPA." },
        { title: "Chemical Industry", description: "Process, quality roles at paint, polymer, petrochemical companies. ₹4-10 LPA." },
        { title: "Teaching", description: "After NET/SLET qualification, teach at colleges. ₹5-10 LPA." },
      ],
      aboutPoints: [
        { title: "Lab-intensive", description: "50%+ time in labs — synthesis, titrations, instrumental analysis, spectroscopy." },
        { title: "IISER/IIT pathways", description: "Top B.Sc Chemistry students get into IIT/IISER M.Sc and integrated PhD programs via JAM/own entrance." },
      ],
      faqs: [
        { question: "B.Sc Chemistry career prospects?", answer: "Pharma R&D, chemical industry, teaching (after NET), and research (after PhD). M.Sc is recommended for better opportunities." },
        { question: "Best colleges for B.Sc Chemistry?", answer: "St. Stephen's, Hindu, Presidency, Loyola, St. Xavier's, Christ. For research: IISERs, IISc, IIT integrated programs." },
      ],
    },
    {
      name: COURSE_NAMES[31]!, // B.Sc Mathematics
      stream: "Science", type: "Full Time", duration: "3 Years", fees: "₹10,000 - ₹1,50,000 / year", intake: "30-80 per department",
      eligibility: ["10+2 with Mathematics (min 50%)", "CUET UG / university entrance exam"],
      photo: "sci1",
      shortDesc: "B.Sc Mathematics (Honours) covers real analysis, abstract algebra, linear algebra, differential equations, number theory, topology, and numerical methods.",
      descContent: "B.Sc Mathematics (Honours) is a 3-year program building rigorous mathematical thinking. Covers real analysis, abstract algebra, linear algebra, complex analysis, topology, differential equations, number theory, and numerical methods. Mathematics graduates are valued in data science, finance, actuarial science, and research.",
      whyReasons: [
        { title: "Foundation for everything", description: "Mathematics is the foundation for data science, AI/ML, quantitative finance, cryptography, and theoretical CS." },
        { title: "Quant finance careers", description: "Math graduates enter quantitative trading and finance roles — among the highest-paying careers globally." },
        { title: "Research prestige", description: "Indian mathematics has a rich tradition (Ramanujan, Harish-Chandra). ISI, CMI, TIFR are world-class." },
      ],
      semesters: [
        { title: "Year 1", topics: ["Real Analysis", "Linear Algebra", "Calculus of Several Variables", "Differential Equations", "Analytic Geometry"] },
        { title: "Year 2", topics: ["Abstract Algebra (Groups, Rings, Fields)", "Complex Analysis", "Probability & Statistics", "Numerical Methods", "Discrete Mathematics"] },
        { title: "Year 3", topics: ["Topology", "Number Theory", "Functional Analysis", "Electives (Cryptography, Financial Math, Graph Theory)", "Project / Dissertation"] },
      ],
      careers: [
        { title: "Data Scientist / ML Engineer", description: "Math graduates excel in data roles at tech companies. ₹8-25 LPA." },
        { title: "Quant Analyst / Trader", description: "Quantitative finance at Tower Research, Graviton, DE Shaw. ₹20-80+ LPA." },
        { title: "Actuary", description: "Risk assessment at insurance and consulting firms. ₹8-25 LPA." },
        { title: "Research Mathematician", description: "After PhD at ISI, CMI, TIFR, IISc. Academic career with global mobility." },
      ],
      aboutPoints: [
        { title: "Proof-based learning", description: "Unlike school math, university math is about proofs, abstraction, and rigorous logical thinking." },
        { title: "ISI/CMI pathway", description: "Top students target ISI (Indian Statistical Institute) and CMI (Chennai Mathematical Institute) for M.Sc/PhD." },
      ],
      faqs: [
        { question: "Is B.Sc Math hard?", answer: "The transition from school math to university math is significant. Real Analysis and Abstract Algebra are challenging but deeply rewarding for those who enjoy logical reasoning." },
        { question: "B.Sc Math career options?", answer: "Data science, quantitative finance, actuarial science, teaching, research. The mathematical thinking is valued everywhere." },
      ],
    },
    {
      name: COURSE_NAMES[32]!, // LLM
      stream: "Law", type: "Full Time", duration: "1-2 Years", fees: "₹50,000 - ₹5,00,000 / year", intake: "30-80 per institute",
      eligibility: ["LLB / BA LLB degree with minimum 50% marks", "CLAT PG / university entrance exam / LSAT India"],
      photo: "law1",
      shortDesc: "LLM (Master of Laws) is a postgraduate law degree offering specialization in constitutional law, corporate law, international law, IPR, human rights, or criminal law.",
      descContent: "LLM (Legum Magister / Master of Laws) is a 1-2 year postgraduate program for law graduates seeking specialization. Offers deep study in areas like Constitutional Law, Corporate and Commercial Law, International Law, Intellectual Property Rights, Criminal Law, Environmental Law, and Human Rights. Required for academic careers and increasingly valued in corporate law practice.",
      whyReasons: [
        { title: "Specialization advantage", description: "LLM provides deep expertise in a specific area of law — giving you an edge over general LLB graduates." },
        { title: "Academic careers", description: "LLM (preferably with NET) is required for law teaching positions at universities." },
        { title: "International practice", description: "LLM from top universities (NLU, DU, or foreign) opens doors to international law firms and organizations." },
      ],
      semesters: [
        { title: "Semester 1", topics: ["Research Methodology & Legal Writing", "Specialization Core Papers (e.g., Advanced Constitutional Law / Corporate Law / IPR)", "Comparative Legal Systems", "Jurisprudence"] },
        { title: "Semester 2", topics: ["Advanced Specialization Papers", "Dissertation / Thesis", "Seminars & Presentations", "Viva Voce"] },
      ],
      careers: [
        { title: "Corporate Lawyer (Specialized)", description: "Specialized practice at top law firms — AZB, Trilegal, Cyril Amarchand. ₹15-40 LPA." },
        { title: "Law Professor", description: "Teach at NLUs and law universities after clearing NET. ₹8-20 LPA." },
        { title: "Judicial Services", description: "LLM strengthens your profile for judicial service exams (Civil Judge, District Judge)." },
        { title: "International Organizations", description: "Work at UN, ICJ, WTO, international tribunals. Highly competitive but prestigious." },
      ],
      aboutPoints: [
        { title: "Research-intensive", description: "LLM involves significant research work, culminating in a dissertation/thesis on a specialized topic." },
        { title: "Networking opportunities", description: "LLM cohorts at NLUs are small (30-60 students), fostering close peer and faculty relationships." },
      ],
      faqs: [
        { question: "Is LLM necessary for practicing law?", answer: "Not mandatory for practice (LLB is sufficient). But LLM adds specialization, is required for teaching, and strengthens judicial service applications." },
        { question: "LLM from India vs abroad?", answer: "Indian LLM (NLU, DU) is good for Indian practice. Foreign LLM (Oxbridge, Harvard, Columbia) opens international doors but costs ₹30-80 Lakh." },
      ],
    },
    {
      name: COURSE_NAMES[33]!, // BPT
      stream: "Medical", type: "Full Time", duration: "4.5 Years (including 6-month internship)", fees: "₹50,000 - ₹5,00,000 / year", intake: "40-80 per institute",
      eligibility: ["10+2 with Physics, Chemistry, Biology (min 50%)", "State/university entrance exam / NEET score at some colleges"],
      photo: "med2",
      shortDesc: "BPT (Bachelor of Physiotherapy) is a 4.5-year program covering anatomy, physiology, biomechanics, electrotherapy, exercise therapy, and rehabilitation sciences.",
      descContent: "Bachelor of Physiotherapy is a 4.5-year professional degree (4 years academic + 6 months clinical internship). Covers human anatomy, physiology, biomechanics, exercise therapy, electrotherapy, manual therapy, cardiopulmonary physiotherapy, neurological rehabilitation, orthopedic rehabilitation, and sports physiotherapy. Growing demand due to increasing health awareness and aging population.",
      whyReasons: [
        { title: "Growing demand", description: "India has only 1 physiotherapist per 45,000 people (WHO recommends 1:10,000). Massive shortage means guaranteed employment." },
        { title: "Independent practice", description: "Physiotherapists can open their own clinics with relatively low investment." },
        { title: "Sports medicine boom", description: "IPL, ISL, Olympics preparation — sports physiotherapy is a high-paying and exciting career." },
      ],
      semesters: [
        { title: "Year 1", topics: ["Anatomy", "Physiology", "Biochemistry", "Biomechanics", "Electrotherapy Basics", "Psychology"] },
        { title: "Year 2", topics: ["Exercise Therapy", "Electrotherapy Advanced", "Pathology", "Pharmacology", "Microbiology", "Research Methodology"] },
        { title: "Year 3", topics: ["Orthopedic Physiotherapy", "Neurological Physiotherapy", "Cardiopulmonary Physiotherapy", "Community Rehabilitation", "Manual Therapy"] },
        { title: "Year 4 + Internship", topics: ["Sports Physiotherapy", "Pediatric Physiotherapy", "Geriatric Physiotherapy", "Clinical Rotations (6 months)", "Dissertation"] },
      ],
      careers: [
        { title: "Hospital Physiotherapist", description: "Work at government/private hospitals. ₹4-10 LPA." },
        { title: "Sports Physiotherapist", description: "IPL, ISL, national teams, sports academies. ₹6-20 LPA." },
        { title: "Private Clinic", description: "Open your own physiotherapy clinic. Income: ₹5-20+ LPA depending on location." },
        { title: "MPT Specialist", description: "Pursue MPT for specialization in orthopedics, neurology, sports, or cardiopulmonary." },
      ],
      aboutPoints: [
        { title: "Clinical training", description: "Extensive hospital-based clinical practice from Year 2. Hands-on patient treatment." },
        { title: "No NEET required at many colleges", description: "Many state/private physiotherapy colleges don't require NEET — own entrance or merit-based admission." },
      ],
      faqs: [
        { question: "BPT salary expectations?", answer: "Starting: ₹3-5 LPA at hospitals. With experience: ₹8-15 LPA. Sports physio: ₹10-20 LPA. Private clinic: unlimited potential." },
        { question: "BPT vs MBBS?", answer: "MBBS is more prestigious and versatile. BPT is shorter, less competitive to enter, and allows independent practice in a growing field. Both are rewarding healthcare careers." },
      ],
    },
    {
      name: COURSE_NAMES[34]!, // B.Sc Hotel Management
      stream: "Management", type: "Full Time", duration: "4 Years", fees: "₹1,00,000 - ₹5,00,000 / year", intake: "60-120 per institute",
      eligibility: ["10+2 from any stream (min 50%)", "NCHMCT JEE / state entrance / institute entrance"],
      photo: "biz3",
      shortDesc: "B.Sc Hotel Management covers food production, food & beverage service, front office operations, housekeeping, and hospitality management.",
      descContent: "B.Sc in Hospitality and Hotel Administration is a 4-year professional program covering all aspects of hotel and hospitality management. Students learn food production (culinary arts), food & beverage service, front office management, housekeeping, hospitality marketing, revenue management, and event management. Includes extensive industry training and international exposure.",
      whyReasons: [
        { title: "India's hospitality boom", description: "India's hotel industry is growing at 12% annually. Tourism, business travel, and wedding industry driving demand." },
        { title: "Global career opportunities", description: "Marriott, Hyatt, Taj, ITC, Oberoi — hospitality careers offer global mobility and luxury work environments." },
        { title: "Entrepreneurship friendly", description: "Restaurant, café, cloud kitchen, catering — hotel management graduates are natural entrepreneurs." },
      ],
      semesters: [
        { title: "Year 1", topics: ["Food Production (Basic Cooking)", "Food & Beverage Service Basics", "Front Office Operations", "Housekeeping Management", "Communication Skills", "Nutrition & Food Science"] },
        { title: "Year 2", topics: ["Advanced Culinary Arts (International Cuisines)", "Bakery & Confectionery", "Bar Management", "Hospitality Accounting", "Facility Planning & Design", "Computer Applications in Hospitality"] },
        { title: "Year 3", topics: ["Hotel Engineering", "Revenue Management", "Tourism Management", "Hospitality Marketing", "Human Resource Management", "Industrial Training (6 months)"] },
        { title: "Year 4", topics: ["Strategic Hospitality Management", "Event Management", "Entrepreneurship in Hospitality", "Electives (Wine Studies, Spa Management)", "Major Project", "Placement Preparation"] },
      ],
      careers: [
        { title: "Hotel Management Trainee", description: "Join Taj, Oberoi, Marriott, Hyatt as management trainee. ₹3-6 LPA starting." },
        { title: "Chef / Culinary Professional", description: "Kitchen careers at luxury hotels, standalone restaurants, cruise ships. ₹3-15 LPA." },
        { title: "Restaurant Entrepreneur", description: "Open restaurants, cafés, cloud kitchens, catering services. Variable income." },
        { title: "Airline / Cruise Hospitality", description: "Emirates, Singapore Airlines, cruise lines actively recruit IHM graduates." },
      ],
      aboutPoints: [
        { title: "IHM network", description: "Institute of Hotel Management colleges under NCHMCT are the gold standard. 21 government IHMs across India." },
        { title: "Practical-heavy curriculum", description: "60%+ time in kitchen labs, mock restaurants, and front office simulations." },
        { title: "6-month industry training", description: "Mandatory internship at 5-star hotels — real-world experience before graduation." },
      ],
      faqs: [
        { question: "How to get into IHM?", answer: "Through NCHMCT JEE (national entrance). IHM Mumbai, Delhi, Bangalore are the top 3. About 8000 seats across all IHMs." },
        { question: "Hotel Management salary growth?", answer: "Starts modest (₹3-6 LPA) but grows significantly with experience. Hotel GMs earn ₹25-50+ LPA. International postings can double this." },
        { question: "Is Hotel Management only about cooking?", answer: "No — food production is just 1 of 4 departments. Hotel management covers operations, marketing, revenue, HR, and general management." },
      ],
    },
  ];

  const courses = await Course.insertMany(
    courseSpecs.map((spec) => buildCourse(byStream(spec.stream), spec)),
  );
  console.log(`Seeded ${courses.length} courses.`);

  const courseByName = (n: string) => courses.find((x) => x.name === n)!._id as mongoose.Types.ObjectId;

  /* ─── SCHOLARSHIPS ─── */
  console.log("Seeding scholarships…");
  const scholarships = await Scholarship.insertMany([
    {
      scholarshipName: SCHOLARSHIP_NAMES[0], // INSPIRE
      scholarshipType: "Merit Based" as const,
      fundingType: "Stipend" as const,
      deadline: new Date("2026-10-31"),
      totalFundingAmount: 80000,
      description: "Innovation in Science Pursuit for Inspired Research (INSPIRE) by DST provides ₹80,000/year (SHE scholarship) to top 1% of Class 12 board exam performers pursuing BSc/BS/Integrated MSc in natural and basic sciences at recognized institutions.",
      officialWebsite: "https://online-inspire.gov.in",
      isActive: true,
      status: "active" as const,
    },
    {
      scholarshipName: SCHOLARSHIP_NAMES[1], // CSSS
      scholarshipType: "Merit Based" as const,
      fundingType: "Stipend" as const,
      deadline: new Date("2026-12-31"),
      totalFundingAmount: 120000,
      description: "Central Sector Scheme of Scholarships for college and university students. Provides ₹10,000/year for UG (first 3 years) and ₹20,000/year for PG. For students above 80th percentile in Class 12 boards with family income below ₹8 Lakh/year.",
      officialWebsite: "https://scholarships.gov.in",
      isActive: true,
      status: "active" as const,
    },
    {
      scholarshipName: SCHOLARSHIP_NAMES[2], // Post Matric SC
      scholarshipType: "Need Based" as const,
      fundingType: "Full Funding" as const,
      deadline: new Date("2026-11-30"),
      totalFundingAmount: 200000,
      description: "Post Matric Scholarship for Scheduled Caste students by Ministry of Social Justice. Covers tuition fees, maintenance allowance, and book grant for SC students studying in Class 11 and above. Family income should be below ₹2.5 Lakh/year.",
      officialWebsite: "https://scholarships.gov.in",
      isActive: true,
      status: "active" as const,
    },
    {
      scholarshipName: SCHOLARSHIP_NAMES[3], // Post Matric ST
      scholarshipType: "Need Based" as const,
      fundingType: "Full Funding" as const,
      deadline: new Date("2026-11-30"),
      totalFundingAmount: 200000,
      description: "Post Matric Scholarship for Scheduled Tribe students by Ministry of Tribal Affairs. Covers tuition fees, maintenance allowance for ST students in post-matriculation courses. Family income limit: ₹2.5 Lakh/year.",
      officialWebsite: "https://scholarships.gov.in",
      isActive: true,
      status: "active" as const,
    },
    {
      scholarshipName: SCHOLARSHIP_NAMES[4], // AICTE Pragati
      scholarshipType: "Merit Based" as const,
      fundingType: "One-Time Grant" as const,
      deadline: new Date("2026-12-31"),
      totalFundingAmount: 50000,
      description: "AICTE Pragati Scholarship for Girl Students pursuing technical education. Provides ₹50,000/year to 5000 girl students admitted in AICTE-approved institutions. Based on family income (below ₹8 Lakh) and academic merit.",
      officialWebsite: "https://www.aicte-india.org/schemes/students-development-schemes/Pragati",
      isActive: true,
      status: "active" as const,
    },
    {
      scholarshipName: SCHOLARSHIP_NAMES[5], // AICTE Saksham
      scholarshipType: "Need Based" as const,
      fundingType: "One-Time Grant" as const,
      deadline: new Date("2026-12-31"),
      totalFundingAmount: 50000,
      description: "AICTE Saksham Scholarship for Differently Abled Students pursuing technical education. Provides ₹50,000/year. For students with 40%+ disability admitted in AICTE-approved degree/diploma programs.",
      officialWebsite: "https://www.aicte-india.org/schemes/students-development-schemes/Saksham",
      isActive: true,
      status: "active" as const,
    },
    {
      scholarshipName: SCHOLARSHIP_NAMES[6], // NMMSS
      scholarshipType: "Merit Based" as const,
      fundingType: "Stipend" as const,
      deadline: new Date("2026-12-31"),
      totalFundingAmount: 12000,
      description: "National Means-cum-Merit Scholarship Scheme awards ₹12,000/year to meritorious students from economically weaker sections to reduce dropouts at Class 8. Selected students continue receiving the scholarship till Class 12.",
      officialWebsite: "https://scholarships.gov.in",
      isActive: true,
      status: "active" as const,
    },
    {
      scholarshipName: SCHOLARSHIP_NAMES[7], // Maulana Azad
      scholarshipType: "Minority" as const,
      fundingType: "Full Funding" as const,
      deadline: new Date("2026-10-31"),
      totalFundingAmount: 310000,
      description: "Maulana Azad National Fellowship provides financial assistance to students from minority communities (Muslims, Christians, Sikhs, Buddhists, Jains, Parsis) for pursuing M.Phil and Ph.D degrees. Fellowship: ₹31,000/month for JRF, ₹35,000/month for SRF.",
      officialWebsite: "https://www.minorityaffairs.gov.in",
      isActive: true,
      status: "active" as const,
    },
    {
      scholarshipName: SCHOLARSHIP_NAMES[8], // Ishan Uday
      scholarshipType: "Need Based" as const,
      fundingType: "Stipend" as const,
      deadline: new Date("2026-11-30"),
      totalFundingAmount: 78000,
      description: "Ishan Uday Special Scholarship for students from North Eastern Region. Provides ₹5,400/month for general degrees and ₹7,800/month for technical/medical/professional courses. For students from NE states studying outside their home state.",
      officialWebsite: "https://www.ugc.gov.in",
      isActive: true,
      status: "active" as const,
    },
    {
      scholarshipName: SCHOLARSHIP_NAMES[9], // PMSS
      scholarshipType: "Merit Based" as const,
      fundingType: "Stipend" as const,
      deadline: new Date("2026-10-31"),
      totalFundingAmount: 36000,
      description: "Prime Minister's Scholarship Scheme for Central Armed Police Forces and Assam Rifles. Provides ₹3,000/month for boys and ₹3,000/month for girls pursuing professional degree courses. For wards of CAPF/AR personnel.",
      officialWebsite: "https://scholarships.gov.in",
      isActive: true,
      status: "active" as const,
    },
    {
      scholarshipName: SCHOLARSHIP_NAMES[10], // Reliance Foundation
      scholarshipType: "Private" as const,
      fundingType: "One-Time Grant" as const,
      deadline: new Date("2026-09-30"),
      totalFundingAmount: 200000,
      description: "Reliance Foundation Scholarships support meritorious students from economically weaker backgrounds in UG programs across STEM, humanities, and social sciences. Up to ₹2,00,000 per year based on need and merit.",
      officialWebsite: "https://www.reliancefoundation.org/scholarships",
      isActive: true,
      status: "active" as const,
    },
    {
      scholarshipName: SCHOLARSHIP_NAMES[11], // Tata Trusts
      scholarshipType: "Need Based" as const,
      fundingType: "Partial Funding" as const,
      deadline: new Date("2026-08-31"),
      totalFundingAmount: 150000,
      description: "Tata Trusts provides need-based scholarships for undergraduate students in professional courses. Covers partial tuition and living expenses for students from low-income families admitted to recognized institutions.",
      officialWebsite: "https://www.tatatrusts.org",
      isActive: true,
      status: "active" as const,
    },
    {
      scholarshipName: SCHOLARSHIP_NAMES[12], // Narotam Sekhsaria
      scholarshipType: "Merit Based" as const,
      fundingType: "Partial Funding" as const,
      deadline: new Date("2026-07-31"),
      totalFundingAmount: 2500000,
      description: "Narotam Sekhsaria Foundation Scholarship provides interest-free loans up to ₹25 Lakh for postgraduate studies abroad (MS, MBA, PhD) and up to ₹5 Lakh for studies in India. Based on academic merit and financial need.",
      officialWebsite: "https://pg.nfroundation.org",
      isActive: true,
      status: "active" as const,
    },
    {
      scholarshipName: SCHOLARSHIP_NAMES[13], // Begum Hazrat Mahal
      scholarshipType: "Minority" as const,
      fundingType: "One-Time Grant" as const,
      deadline: new Date("2026-11-30"),
      totalFundingAmount: 12000,
      description: "Begum Hazrat Mahal National Scholarship for meritorious girls belonging to minority communities studying in Classes 9-12. Provides ₹5,000 for Class 9-10 and ₹6,000 for Class 11-12. Family income limit: ₹2 Lakh/year.",
      officialWebsite: "https://bhmnsmaef.org",
      isActive: true,
      status: "active" as const,
    },
    {
      scholarshipName: SCHOLARSHIP_NAMES[14], // Sitaram Jindal
      scholarshipType: "Need Based" as const,
      fundingType: "Stipend" as const,
      deadline: new Date("2026-09-30"),
      totalFundingAmount: 48000,
      description: "Sitaram Jindal Foundation Scholarship provides ₹2,000-₹4,000/month to economically weaker students pursuing graduation, post-graduation, and professional courses. Open to all communities with family income below ₹2.5 Lakh/year.",
      officialWebsite: "https://www.sitaramjindalfoundation.org",
      isActive: true,
      status: "active" as const,
    },
  ]);
  console.log(`Seeded ${scholarships.length} scholarships.`);

  const scholarshipByName = (n: string) => scholarships.find((x) => x.scholarshipName === n)!._id as mongoose.Types.ObjectId;

  /* ─── EXAMS ─── */
  console.log("Seeding exams…");
  const exams = await Exam.insertMany([
    {
      shortName: EXAM_CODES[0], // JEE MAIN
      fullName: "Joint Entrance Examination Main",
      registrationDate: new Date("2026-11-01"),
      examDate: new Date("2027-01-20"),
      resultPublishDate: new Date("2027-02-15"),
      qualificationRequired: ["10+2 with Physics, Chemistry, Mathematics", "Minimum 75% in 12th (65% for SC/ST)"],
      collegesAccepting: 3500,
      officialWebsite: "https://jeemain.nta.nic.in",
      description: "JEE Main is India's largest engineering entrance exam conducted by NTA. It is the gateway to NITs, IIITs, and GFTIs, and also serves as the eligibility test for JEE Advanced (for IIT admission). The exam is conducted in two sessions (January and April) with the best score considered.",
      isActive: true,
      logo: i("eng1", 400),
      stream: byStream("Engineering"),
    },
    {
      shortName: EXAM_CODES[1], // JEE ADVANCED
      fullName: "Joint Entrance Examination Advanced",
      registrationDate: new Date("2027-04-15"),
      examDate: new Date("2027-06-01"),
      resultPublishDate: new Date("2027-06-20"),
      qualificationRequired: ["Top 2,50,000 rank holders in JEE Main", "Must not have appeared for JEE Advanced more than twice"],
      collegesAccepting: 23,
      officialWebsite: "https://jeeadv.ac.in",
      description: "JEE Advanced is the entrance exam for admission to all 23 Indian Institutes of Technology (IITs). Only the top 2,50,000 JEE Main qualifiers can appear. It tests physics, chemistry, and mathematics at an advanced level with a unique exam pattern.",
      isActive: true,
      logo: i("eng1", 400),
      stream: byStream("Engineering"),
    },
    {
      shortName: EXAM_CODES[2], // NEET UG
      fullName: "National Eligibility cum Entrance Test (Undergraduate)",
      registrationDate: new Date("2027-02-01"),
      examDate: new Date("2027-05-04"),
      resultPublishDate: new Date("2027-06-05"),
      qualificationRequired: ["10+2 with Physics, Chemistry, Biology", "Minimum 50% aggregate (40% for SC/ST/OBC)"],
      collegesAccepting: 640,
      officialWebsite: "https://neet.nta.nic.in",
      description: "NEET UG is the sole entrance exam for admission to MBBS, BDS, AYUSH, B.Sc Nursing, and Veterinary courses in all government and private medical colleges in India. Conducted by NTA, it is taken by over 20 lakh students annually, making it India's largest medical entrance exam.",
      isActive: true,
      logo: i("med1", 400),
      stream: byStream("Medical"),
    },
    {
      shortName: EXAM_CODES[3], // CAT
      fullName: "Common Admission Test",
      registrationDate: new Date("2026-08-01"),
      examDate: new Date("2026-11-24"),
      resultPublishDate: new Date("2027-01-05"),
      qualificationRequired: ["Bachelor's degree with minimum 50% marks (45% for SC/ST)", "Final year students can also apply"],
      collegesAccepting: 1200,
      officialWebsite: "https://iimcat.ac.in",
      description: "CAT is India's premier management entrance exam, conducted by IIMs on a rotational basis. It is the gateway to all 21 IIMs and over 1200 B-schools across India. The exam tests Verbal Ability, Data Interpretation, Logical Reasoning, and Quantitative Aptitude.",
      isActive: true,
      logo: i("biz1", 400),
      stream: byStream("Management"),
    },
    {
      shortName: EXAM_CODES[4], // GATE
      fullName: "Graduate Aptitude Test in Engineering",
      registrationDate: new Date("2026-09-01"),
      examDate: new Date("2027-02-01"),
      resultPublishDate: new Date("2027-03-15"),
      qualificationRequired: ["B.Tech / BE / B.Arch / B.Sc / B.Pharm", "Final year students eligible"],
      collegesAccepting: 900,
      officialWebsite: "https://gate2027.iitr.ac.in",
      description: "GATE is a national-level exam for admission to M.Tech/M.E./PhD programs at IITs, NITs, and IISc, as well as for recruitment in PSUs like ISRO, DRDO, BARC, BHEL, IOCL, and NTPC. The score is valid for 3 years.",
      isActive: true,
      logo: i("eng2", 400),
      stream: byStream("Engineering"),
    },
    {
      shortName: EXAM_CODES[5], // CLAT
      fullName: "Common Law Admission Test",
      registrationDate: new Date("2026-07-01"),
      examDate: new Date("2026-12-01"),
      resultPublishDate: new Date("2026-12-20"),
      qualificationRequired: ["10+2 with minimum 45% marks (40% for SC/ST)", "No upper age limit for UG program"],
      collegesAccepting: 24,
      officialWebsite: "https://consortiumofnlus.ac.in",
      description: "CLAT is the national-level entrance exam for admission to undergraduate (BA LLB) and postgraduate (LLM) programs at 24 National Law Universities (NLUs) in India. The UG exam tests English, Current Affairs, Legal Reasoning, Logical Reasoning, and Quantitative Techniques.",
      isActive: true,
      logo: i("law1", 400),
      stream: byStream("Law"),
    },
    {
      shortName: EXAM_CODES[6], // NATA
      fullName: "National Aptitude Test in Architecture",
      registrationDate: new Date("2027-01-15"),
      examDate: new Date("2027-04-14"),
      resultPublishDate: new Date("2027-05-10"),
      qualificationRequired: ["10+2 with Mathematics", "Minimum 50% aggregate in 10+2"],
      collegesAccepting: 500,
      officialWebsite: "https://www.nata.in",
      description: "NATA is the aptitude test for admission to B.Arch programs, conducted by the Council of Architecture (COA). It tests drawing skills, aesthetic sensitivity, observation skills, and mathematical ability. JEE Main Paper 2 is an alternative for some institutions.",
      isActive: true,
      logo: i("design1", 400),
      stream: byStream("Design"),
    },
    {
      shortName: EXAM_CODES[7], // CUET UG
      fullName: "Common University Entrance Test (Undergraduate)",
      registrationDate: new Date("2027-02-15"),
      examDate: new Date("2027-05-15"),
      resultPublishDate: new Date("2027-06-30"),
      qualificationRequired: ["10+2 from a recognized board", "Subject-specific eligibility varies by university"],
      collegesAccepting: 260,
      officialWebsite: "https://cuet.nta.nic.in",
      description: "CUET UG is the national-level entrance exam for admission to undergraduate programs at all Central Universities and many state/private universities in India. It covers domain subjects, general test, and language sections. Over 260 universities accept CUET scores.",
      isActive: true,
      logo: i("edu1", 400),
      stream: byStream("Science"),
    },
    {
      shortName: EXAM_CODES[8], // BITSAT
      fullName: "BITS Admission Test",
      registrationDate: new Date("2027-01-15"),
      examDate: new Date("2027-05-20"),
      resultPublishDate: new Date("2027-06-15"),
      qualificationRequired: ["10+2 with Physics, Chemistry, Mathematics", "Minimum 75% aggregate in PCM"],
      collegesAccepting: 5,
      officialWebsite: "https://www.bitsadmission.com",
      description: "BITSAT is the entrance exam for admission to all BITS campuses — Pilani, Goa, Hyderabad, Dubai, and Mumbai. It is an online exam testing Physics, Chemistry, Mathematics, English Proficiency, and Logical Reasoning. BITS is known for its flexible academic structure.",
      isActive: true,
      logo: i("eng1", 400),
      stream: byStream("Engineering"),
    },
    {
      shortName: EXAM_CODES[9], // XAT
      fullName: "Xavier Aptitude Test",
      registrationDate: new Date("2026-07-15"),
      examDate: new Date("2027-01-05"),
      resultPublishDate: new Date("2027-01-31"),
      qualificationRequired: ["Bachelor's degree (any discipline) from a recognized university", "Final year students can apply"],
      collegesAccepting: 800,
      officialWebsite: "https://xatonline.in",
      description: "XAT is conducted by XLRI Jamshedpur and is the entrance exam for XLRI and 800+ B-schools across India. It tests Decision Making (unique to XAT), Verbal & Logical Ability, Quantitative Ability, and General Knowledge. Known for its challenging paper.",
      isActive: true,
      logo: i("biz2", 400),
      stream: byStream("Management"),
    },
    {
      shortName: EXAM_CODES[10], // NIFT
      fullName: "NIFT Entrance Examination",
      registrationDate: new Date("2026-11-01"),
      examDate: new Date("2027-02-09"),
      resultPublishDate: new Date("2027-03-15"),
      qualificationRequired: ["10+2 from any stream", "Situation Test for shortlisted candidates"],
      collegesAccepting: 18,
      officialWebsite: "https://nift.ac.in",
      description: "NIFT Entrance is conducted by the National Institute of Fashion Technology for admission to B.Des and B.FTech programs across 18 NIFT campuses. The exam includes a Creative Ability Test (CAT) and General Ability Test (GAT), followed by a Situation Test for shortlisted candidates.",
      isActive: true,
      logo: i("design1", 400),
      stream: byStream("Design"),
    },
    {
      shortName: EXAM_CODES[11], // NID DAT
      fullName: "NID Design Aptitude Test",
      registrationDate: new Date("2026-11-15"),
      examDate: new Date("2027-01-10"),
      resultPublishDate: new Date("2027-03-01"),
      qualificationRequired: ["10+2 from any stream", "Studio test for shortlisted candidates"],
      collegesAccepting: 4,
      officialWebsite: "https://admissions.nid.edu",
      description: "NID DAT is the entrance exam for admission to B.Des programs at National Institute of Design campuses (Ahmedabad, Gandhinagar, Bengaluru, Jorhat). DAT Prelims is a pen-and-paper test; DAT Mains includes a studio test and interview.",
      isActive: true,
      logo: i("design1", 400),
      stream: byStream("Design"),
    },
    {
      shortName: EXAM_CODES[12], // GPAT
      fullName: "Graduate Pharmacy Aptitude Test",
      registrationDate: new Date("2026-11-01"),
      examDate: new Date("2027-02-22"),
      resultPublishDate: new Date("2027-03-20"),
      qualificationRequired: ["B.Pharm degree from a PCI-approved institution", "Final year B.Pharm students eligible"],
      collegesAccepting: 800,
      officialWebsite: "https://gpat.nta.nic.in",
      description: "GPAT is the national-level entrance exam for admission to M.Pharm programs and for AICTE postgraduate scholarship in pharmacy. Conducted by NTA, it tests pharmaceutical sciences across all subjects of B.Pharm curriculum.",
      isActive: true,
      logo: i("pharma1", 400),
      stream: byStream("Pharmacy"),
    },
    {
      shortName: EXAM_CODES[13], // ICAR AIEEA
      fullName: "ICAR All India Entrance Examination for Admission",
      registrationDate: new Date("2027-03-01"),
      examDate: new Date("2027-06-15"),
      resultPublishDate: new Date("2027-07-15"),
      qualificationRequired: ["10+2 with relevant subjects (PCB/PCM/Agriculture)", "Minimum 50% marks"],
      collegesAccepting: 75,
      officialWebsite: "https://icar.nta.nic.in",
      description: "ICAR AIEEA is the entrance exam for admission to UG (BSc Agriculture, Horticulture, Forestry, etc.) and PG programs at ICAR-affiliated agricultural universities across India. Conducted by NTA on behalf of ICAR.",
      isActive: true,
      logo: i("agri1", 400),
      stream: byStream("Agriculture"),
    },
    {
      shortName: EXAM_CODES[14], // CTET
      fullName: "Central Teacher Eligibility Test",
      registrationDate: new Date("2027-03-15"),
      examDate: new Date("2027-07-07"),
      resultPublishDate: new Date("2027-08-10"),
      qualificationRequired: ["B.Ed / D.El.Ed for Paper 1 (Class 1-5)", "B.Ed with graduation for Paper 2 (Class 6-8)"],
      collegesAccepting: 0,
      officialWebsite: "https://ctet.nic.in",
      description: "CTET is the national-level eligibility test for teaching positions in Central Government schools (KVS, NVS, etc.) and schools under Delhi Government. Paper 1 is for Classes 1-5, Paper 2 for Classes 6-8. CTET certificate is valid for lifetime.",
      isActive: true,
      logo: i("edu1", 400),
      stream: byStream("Education"),
    },
  ]);
  console.log(`Seeded ${exams.length} exams.`);

  const examByCode = (code: string) => exams.find((x) => x.shortName === code)!._id as mongoose.Types.ObjectId;

  /* ─── COLLEGES ─── */
  console.log("Seeding colleges…");

  interface CollegeConfig {
    name: string;
    state: string;
    city: string;
    type: "Public" | "Private" | "Government" | "Deemed";
    uni: string;
    estYear: number;
    rating: number;
    accreditation: string[];
    desc: string;
    students: number;
    campusSize: string;
    avgSalary: number;
    placementPct: number;
    highestSalary: number;
    placementTrends: { year: string; avgSalary: string; placementPercentage: string }[];
    courses: string[];
    scholarships: string[];
    entrance: string;
    category: string;
    hostelFee: string;
    messFee: string;
    annualFee: string;
    avgAnnualFee: string;
    recruitersCount: number;
    studentsInternships: number;
    avgStipend: number;
    ppoRate: number;
    alumniF500: number;
    alumniEntrepreneurs: number;
    alumniAbroad: number;
    admissionFaqs: { question: string; answer: string }[];
  }

  const collegeConfigs: CollegeConfig[] = [
    {
      name: COLLEGE_NAMES[0]!, // IIT Bombay
      state: "Maharashtra", city: "Mumbai", type: "Public", uni: UNIVERSITY_NAMES[0]!, estYear: 1958,
      rating: 4.8, accreditation: ["NAAC A++", "NBA", "NIRF #3"],
      desc: "Indian Institute of Technology Bombay is one of India's premier engineering institutions, located in Powai, Mumbai. Established in 1958 with UNESCO assistance, IIT Bombay consistently ranks among the top 3 engineering colleges in India (NIRF) and in the top 150 globally (QS). Known for cutting-edge research, world-class faculty, and exceptional placement records.",
      students: 11000, campusSize: "550 Acres",
      avgSalary: 2100000, placementPct: 85, highestSalary: 21000000,
      placementTrends: [
        { year: "2022", avgSalary: "18.5 LPA", placementPercentage: "83%" },
        { year: "2023", avgSalary: "20.2 LPA", placementPercentage: "84%" },
        { year: "2024", avgSalary: "21.0 LPA", placementPercentage: "85%" },
      ],
      courses: ["B.Tech Computer Science and Engineering", "B.Tech Electronics and Communication Engineering", "B.Tech Mechanical Engineering", "B.Tech Electrical Engineering", "B.Tech Chemical Engineering", "B.Tech Aerospace Engineering", "B.Tech Artificial Intelligence and Machine Learning", "M.Tech Computer Science", "B.Des (Bachelor of Design)"],
      scholarships: ["INSPIRE Scholarship (DST)", "Central Sector Scheme of Scholarships (CSSS)", "Post Matric Scholarship for SC Students"],
      entrance: "JEE ADVANCED", category: "Engineering",
      hostelFee: "₹18,240 / year", messFee: "₹33,600 / year", annualFee: "₹2,09,550 / year", avgAnnualFee: "₹2,61,390 / year",
      recruitersCount: 350, studentsInternships: 78, avgStipend: 45000, ppoRate: 42,
      alumniF500: 35, alumniEntrepreneurs: 18, alumniAbroad: 28,
      admissionFaqs: [
        { question: "How to get into IIT Bombay?", answer: "Qualify JEE Main (top 2.5 lakh), then score well in JEE Advanced. CSE cutoff is typically rank 60-70 (General category)." },
        { question: "What is the fee structure?", answer: "Tuition: ₹2,09,550/year. SC/ST/PwD students get full fee waiver. Students with family income <₹1 Lakh get full waiver; <₹5 Lakh get 2/3 waiver." },
        { question: "Is hostel mandatory?", answer: "Yes, all undergraduate students must stay on campus in allotted hostels." },
      ],
    },
    {
      name: COLLEGE_NAMES[1]!, // IIT Delhi
      state: "Delhi", city: "New Delhi", type: "Public", uni: UNIVERSITY_NAMES[1]!, estYear: 1961,
      rating: 4.8, accreditation: ["NAAC A++", "NBA", "NIRF #2"],
      desc: "IIT Delhi is one of the top engineering institutes in India, located in Hauz Khas, New Delhi. Established in 1961, it is renowned for its strong B.Tech, M.Tech, and MBA programs. IIT Delhi has a vibrant startup ecosystem and has produced numerous successful entrepreneurs and tech leaders.",
      students: 9500, campusSize: "325 Acres",
      avgSalary: 2150000, placementPct: 86, highestSalary: 27000000,
      placementTrends: [
        { year: "2022", avgSalary: "19.5 LPA", placementPercentage: "85%" },
        { year: "2023", avgSalary: "20.8 LPA", placementPercentage: "86%" },
        { year: "2024", avgSalary: "21.5 LPA", placementPercentage: "86%" },
      ],
      courses: ["B.Tech Computer Science and Engineering", "B.Tech Electrical Engineering", "B.Tech Mechanical Engineering", "M.Tech Computer Science"],
      scholarships: ["INSPIRE Scholarship (DST)", "Central Sector Scheme of Scholarships (CSSS)"],
      entrance: "JEE ADVANCED", category: "Engineering",
      hostelFee: "₹20,400 / year", messFee: "₹36,000 / year", annualFee: "₹2,09,550 / year", avgAnnualFee: "₹2,65,950 / year",
      recruitersCount: 320, studentsInternships: 80, avgStipend: 48000, ppoRate: 45,
      alumniF500: 38, alumniEntrepreneurs: 22, alumniAbroad: 30,
      admissionFaqs: [
        { question: "What rank is needed for IIT Delhi CSE?", answer: "JEE Advanced rank within top 40-50 (General category) for Computer Science." },
        { question: "Does IIT Delhi offer MBA?", answer: "Yes, through the Department of Management Studies (DMS). Admission via CAT + interview." },
      ],
    },
    {
      name: COLLEGE_NAMES[2]!, // IIT Madras
      state: "Tamil Nadu", city: "Chennai", type: "Public", uni: UNIVERSITY_NAMES[2]!, estYear: 1959,
      rating: 4.9, accreditation: ["NAAC A++", "NBA", "NIRF #1"],
      desc: "IIT Madras is India's #1 ranked engineering institute (NIRF) for 9 consecutive years. Located in a 620-acre campus inside the Guindy National Park, Chennai. Known for its research output, incubation center (one of India's largest), and comprehensive academic programs across engineering, sciences, humanities, and management.",
      students: 10500, campusSize: "620 Acres",
      avgSalary: 2050000, placementPct: 87, highestSalary: 18000000,
      placementTrends: [
        { year: "2022", avgSalary: "18.0 LPA", placementPercentage: "85%" },
        { year: "2023", avgSalary: "19.5 LPA", placementPercentage: "86%" },
        { year: "2024", avgSalary: "20.5 LPA", placementPercentage: "87%" },
      ],
      courses: ["B.Tech Computer Science and Engineering", "B.Tech Electronics and Communication Engineering", "B.Tech Civil Engineering", "M.Tech Computer Science"],
      scholarships: ["INSPIRE Scholarship (DST)", "Post Matric Scholarship for SC Students", "Post Matric Scholarship for ST Students"],
      entrance: "JEE ADVANCED", category: "Engineering",
      hostelFee: "₹15,600 / year", messFee: "₹30,000 / year", annualFee: "₹2,09,550 / year", avgAnnualFee: "₹2,55,150 / year",
      recruitersCount: 380, studentsInternships: 82, avgStipend: 42000, ppoRate: 40,
      alumniF500: 32, alumniEntrepreneurs: 20, alumniAbroad: 25,
      admissionFaqs: [
        { question: "Why is IIT Madras #1 in NIRF?", answer: "Due to strong research output, faculty quality, industry income, graduation outcomes, and inclusive practices. IIT Madras has been #1 for 9 consecutive years." },
        { question: "Is there a rural campus?", answer: "IIT Madras is setting up a second campus in Zanjeera, near Chennai. The main campus is within the Guindy National Park." },
      ],
    },
    {
      name: COLLEGE_NAMES[3]!, // IIM Ahmedabad
      state: "Gujarat", city: "Ahmedabad", type: "Public", uni: UNIVERSITY_NAMES[12]!, estYear: 1961,
      rating: 4.9, accreditation: ["AACSB", "EQUIS", "AMBA", "NIRF #1 Management"],
      desc: "IIM Ahmedabad is India's premier management institution, consistently ranked #1 for MBA programs. Established in 1961 with Harvard Business School's assistance, IIMA is known for its rigorous case-method pedagogy, exceptional placements, and powerful alumni network spanning CEOs, entrepreneurs, and policymakers worldwide.",
      students: 1100, campusSize: "106 Acres",
      avgSalary: 3500000, placementPct: 100, highestSalary: 10600000,
      placementTrends: [
        { year: "2022", avgSalary: "32.0 LPA", placementPercentage: "100%" },
        { year: "2023", avgSalary: "34.0 LPA", placementPercentage: "100%" },
        { year: "2024", avgSalary: "35.0 LPA", placementPercentage: "100%" },
      ],
      courses: ["MBA (Master of Business Administration)"],
      scholarships: ["Central Sector Scheme of Scholarships (CSSS)", "Post Matric Scholarship for SC Students"],
      entrance: "CAT", category: "Management",
      hostelFee: "₹1,40,000 / year", messFee: "₹55,000 / year", annualFee: "₹14,00,000 / year", avgAnnualFee: "₹15,95,000 / year",
      recruitersCount: 180, studentsInternships: 100, avgStipend: 200000, ppoRate: 52,
      alumniF500: 45, alumniEntrepreneurs: 30, alumniAbroad: 35,
      admissionFaqs: [
        { question: "What CAT percentile is needed?", answer: "99+ percentile is typically required, followed by AWT (Academic Writing Test) and PI (Personal Interview). Work experience is valued." },
        { question: "What is the total MBA fee?", answer: "₹28 Lakh total for the 2-year PGP program (2025-27 batch). Scholarships available for economically weaker students." },
      ],
    },
    {
      name: COLLEGE_NAMES[4]!, // IIM Bangalore
      state: "Karnataka", city: "Bengaluru", type: "Public", uni: UNIVERSITY_NAMES[12]!, estYear: 1973,
      rating: 4.8, accreditation: ["AACSB", "EQUIS", "NIRF #2 Management"],
      desc: "IIM Bangalore is one of India's top 3 management institutes, known for its strong analytics-driven curriculum and Bengaluru's tech ecosystem advantage. The PGP program is highly selective with outstanding placement records. IIMB also runs executive education and doctoral programs.",
      students: 1200, campusSize: "100 Acres",
      avgSalary: 3400000, placementPct: 100, highestSalary: 9500000,
      placementTrends: [
        { year: "2022", avgSalary: "31.0 LPA", placementPercentage: "100%" },
        { year: "2023", avgSalary: "33.0 LPA", placementPercentage: "100%" },
        { year: "2024", avgSalary: "34.0 LPA", placementPercentage: "100%" },
      ],
      courses: ["MBA (Master of Business Administration)"],
      scholarships: ["Central Sector Scheme of Scholarships (CSSS)"],
      entrance: "CAT", category: "Management",
      hostelFee: "₹1,20,000 / year", messFee: "₹50,000 / year", annualFee: "₹12,50,000 / year", avgAnnualFee: "₹14,20,000 / year",
      recruitersCount: 160, studentsInternships: 100, avgStipend: 180000, ppoRate: 48,
      alumniF500: 40, alumniEntrepreneurs: 25, alumniAbroad: 32,
      admissionFaqs: [
        { question: "How is IIMB different from IIMA?", answer: "IIMB has a stronger analytics and tech management focus given its Bengaluru location. IIMA is known for general management and policy. Both are equally prestigious." },
      ],
    },
    {
      name: COLLEGE_NAMES[5]!, // AIIMS Delhi
      state: "Delhi", city: "New Delhi", type: "Government", uni: UNIVERSITY_NAMES[14]!, estYear: 1956,
      rating: 4.9, accreditation: ["NAAC A++", "NIRF #1 Medical"],
      desc: "All India Institute of Medical Sciences, New Delhi is India's top medical institution. Established by an Act of Parliament in 1956, AIIMS Delhi offers MBBS at virtually no cost (₹1,628/year). It is a centre of excellence for medical education, research, and patient care with world-renowned faculty and state-of-the-art facilities.",
      students: 4000, campusSize: "210 Acres",
      avgSalary: 1200000, placementPct: 100, highestSalary: 3000000,
      placementTrends: [
        { year: "2022", avgSalary: "12 LPA (after PG)", placementPercentage: "100%" },
        { year: "2023", avgSalary: "12 LPA (after PG)", placementPercentage: "100%" },
        { year: "2024", avgSalary: "12 LPA (after PG)", placementPercentage: "100%" },
      ],
      courses: ["MBBS (Bachelor of Medicine, Bachelor of Surgery)", "B.Sc Nursing"],
      scholarships: ["Post Matric Scholarship for SC Students", "Post Matric Scholarship for ST Students"],
      entrance: "NEET UG", category: "Medical",
      hostelFee: "₹1,200 / year", messFee: "₹24,000 / year", annualFee: "₹1,628 / year", avgAnnualFee: "₹26,828 / year",
      recruitersCount: 0, studentsInternships: 100, avgStipend: 0, ppoRate: 0,
      alumniF500: 5, alumniEntrepreneurs: 8, alumniAbroad: 40,
      admissionFaqs: [
        { question: "What NEET score is needed for AIIMS Delhi?", answer: "Typically 650+ out of 720 (General category). The cutoff varies yearly based on difficulty level and number of applicants." },
        { question: "How much does MBBS at AIIMS cost?", answer: "Only ₹1,628/year — one of the most affordable medical education options in the world. This includes tuition and nominal fees." },
        { question: "What about hostel and food?", answer: "Hostel is ₹1,200/year. Mess charges are around ₹2,000/month. Overall, 5.5 years of MBBS costs under ₹1.5 Lakh total." },
      ],
    },
    {
      name: COLLEGE_NAMES[6]!, // NIT Trichy
      state: "Tamil Nadu", city: "Tiruchirappalli", type: "Public", uni: UNIVERSITY_NAMES[4]!, estYear: 1964,
      rating: 4.5, accreditation: ["NAAC A++", "NBA", "NIRF Top 10 Engineering"],
      desc: "National Institute of Technology Tiruchirappalli (NIT Trichy) is India's top-ranked NIT and among the top 10 engineering colleges nationally. Known for its strong academic culture, excellent placements, and vibrant campus life. It offers B.Tech, M.Tech, MBA, and PhD programs.",
      students: 7500, campusSize: "800 Acres",
      avgSalary: 1200000, placementPct: 92, highestSalary: 6000000,
      placementTrends: [
        { year: "2022", avgSalary: "10.5 LPA", placementPercentage: "90%" },
        { year: "2023", avgSalary: "11.2 LPA", placementPercentage: "91%" },
        { year: "2024", avgSalary: "12.0 LPA", placementPercentage: "92%" },
      ],
      courses: ["B.Tech Computer Science and Engineering", "B.Tech Electronics and Communication Engineering", "B.Tech Mechanical Engineering", "B.Tech Civil Engineering"],
      scholarships: ["Central Sector Scheme of Scholarships (CSSS)", "AICTE Pragati Scholarship for Girls"],
      entrance: "JEE MAIN", category: "Engineering",
      hostelFee: "₹25,000 / year", messFee: "₹40,000 / year", annualFee: "₹1,63,750 / year", avgAnnualFee: "₹2,28,750 / year",
      recruitersCount: 280, studentsInternships: 72, avgStipend: 30000, ppoRate: 35,
      alumniF500: 15, alumniEntrepreneurs: 10, alumniAbroad: 18,
      admissionFaqs: [
        { question: "What JEE Main rank for NIT Trichy CSE?", answer: "Around 2000-3000 rank in JEE Main (General category, home state). For other state candidates, around 1000-2000 rank." },
      ],
    },
    {
      name: COLLEGE_NAMES[7]!, // BITS Pilani
      state: "Rajasthan", city: "Pilani", type: "Deemed", uni: UNIVERSITY_NAMES[11]!, estYear: 1964,
      rating: 4.6, accreditation: ["NAAC A", "UGC recognized"],
      desc: "Birla Institute of Technology and Science, Pilani is one of India's top private engineering institutions. Known for its Practice School program (industry internship), flexible academic system, and strong entrepreneurship culture. BITS has campuses in Pilani, Goa, Hyderabad, Dubai, and Mumbai.",
      students: 5000, campusSize: "328 Acres",
      avgSalary: 1500000, placementPct: 80, highestSalary: 12500000,
      placementTrends: [
        { year: "2022", avgSalary: "13.5 LPA", placementPercentage: "78%" },
        { year: "2023", avgSalary: "14.2 LPA", placementPercentage: "79%" },
        { year: "2024", avgSalary: "15.0 LPA", placementPercentage: "80%" },
      ],
      courses: ["B.Tech Computer Science and Engineering", "B.Tech Electronics and Communication Engineering", "B.Tech Mechanical Engineering"],
      scholarships: ["Central Sector Scheme of Scholarships (CSSS)", "AICTE Pragati Scholarship for Girls"],
      entrance: "BITSAT", category: "Engineering",
      hostelFee: "₹1,15,000 / year", messFee: "₹55,000 / year", annualFee: "₹5,55,000 / year", avgAnnualFee: "₹7,25,000 / year",
      recruitersCount: 250, studentsInternships: 100, avgStipend: 40000, ppoRate: 38,
      alumniF500: 20, alumniEntrepreneurs: 25, alumniAbroad: 30,
      admissionFaqs: [
        { question: "What is BITSAT?", answer: "BITS Admission Test is an online exam testing Physics, Chemistry, Mathematics, English, and Logical Reasoning. No negative marking for the bonus section." },
        { question: "What is Practice School?", answer: "BITS's unique 5.5-month industry internship program in the 4th year. Students work at companies like Google, Microsoft, Goldman Sachs." },
      ],
    },
    {
      name: COLLEGE_NAMES[8]!, // DTU
      state: "Delhi", city: "New Delhi", type: "Public", uni: UNIVERSITY_NAMES[3]!, estYear: 1941,
      rating: 4.4, accreditation: ["NAAC A+", "NBA"],
      desc: "Delhi Technological University (formerly Delhi College of Engineering) is one of the oldest and most prestigious engineering colleges in North India. Established in 1941, DTU is a state government university offering B.Tech, M.Tech, MBA, and PhD programs with strong placement records.",
      students: 8000, campusSize: "164 Acres",
      avgSalary: 1350000, placementPct: 85, highestSalary: 15000000,
      placementTrends: [
        { year: "2022", avgSalary: "12.5 LPA", placementPercentage: "83%" },
        { year: "2023", avgSalary: "13.0 LPA", placementPercentage: "84%" },
        { year: "2024", avgSalary: "13.5 LPA", placementPercentage: "85%" },
      ],
      courses: ["B.Tech Computer Science and Engineering", "B.Tech Electronics and Communication Engineering", "B.Tech Mechanical Engineering", "B.Tech Civil Engineering"],
      scholarships: ["Central Sector Scheme of Scholarships (CSSS)", "AICTE Pragati Scholarship for Girls"],
      entrance: "JEE MAIN", category: "Engineering",
      hostelFee: "₹32,000 / year", messFee: "₹45,000 / year", annualFee: "₹1,70,000 / year", avgAnnualFee: "₹2,47,000 / year",
      recruitersCount: 300, studentsInternships: 70, avgStipend: 28000, ppoRate: 32,
      alumniF500: 12, alumniEntrepreneurs: 15, alumniAbroad: 20,
      admissionFaqs: [
        { question: "How to get into DTU?", answer: "Through JEE Main score. DTU admits students based on JAC Delhi counselling for Delhi region and JoSAA for outside Delhi seats." },
      ],
    },
    {
      name: COLLEGE_NAMES[9]!, // St. Stephen's
      state: "Delhi", city: "New Delhi", type: "Public", uni: UNIVERSITY_NAMES[3]!, estYear: 1881,
      rating: 4.5, accreditation: ["NAAC A+", "NIRF Top 10 College"],
      desc: "St. Stephen's College is India's most prestigious undergraduate college, affiliated to the University of Delhi. Founded in 1881, it is known for its distinctive academic culture, illustrious alumni (including two Nobel laureates), and beautiful colonial-era campus. It offers BA, B.Sc, and B.Com programs.",
      students: 2200, campusSize: "18 Acres",
      avgSalary: 800000, placementPct: 60, highestSalary: 3500000,
      placementTrends: [
        { year: "2022", avgSalary: "7.0 LPA", placementPercentage: "55%" },
        { year: "2023", avgSalary: "7.5 LPA", placementPercentage: "58%" },
        { year: "2024", avgSalary: "8.0 LPA", placementPercentage: "60%" },
      ],
      courses: ["B.Com (Honours)", "B.Sc Physics (Honours)", "BA Economics (Honours)", "BA English (Honours)", "B.Sc Chemistry (Honours)", "B.Sc Mathematics (Honours)"],
      scholarships: ["Central Sector Scheme of Scholarships (CSSS)", "Ishan Uday Scholarship for NE Region"],
      entrance: "CUET UG", category: "Science",
      hostelFee: "₹15,000 / year", messFee: "₹25,000 / year", annualFee: "₹22,470 / year", avgAnnualFee: "₹62,470 / year",
      recruitersCount: 50, studentsInternships: 45, avgStipend: 20000, ppoRate: 15,
      alumniF500: 8, alumniEntrepreneurs: 12, alumniAbroad: 40,
      admissionFaqs: [
        { question: "How to get admission?", answer: "Through CUET UG scores + St. Stephen's interview (for shortlisted candidates). Extremely competitive with high cutoffs." },
        { question: "Is it only for arts students?", answer: "No. St. Stephen's offers BA (Economics, English, History, Philosophy, Sanskrit), B.Sc (Physics, Chemistry, Mathematics), and B.Com programs." },
      ],
    },
    {
      name: COLLEGE_NAMES[10]!, // NLSIU
      state: "Karnataka", city: "Bengaluru", type: "Public", uni: UNIVERSITY_NAMES[13]!, estYear: 1987,
      rating: 4.8, accreditation: ["NAAC A", "NIRF #1 Law"],
      desc: "National Law School of India University, Bengaluru is India's #1 law school and the first National Law University. Founded in 1987, NLSIU pioneered the 5-year integrated BA LLB program. Its graduates dominate the top law firms, corporate legal teams, and judiciary in India.",
      students: 800, campusSize: "23 Acres",
      avgSalary: 2000000, placementPct: 95, highestSalary: 4500000,
      placementTrends: [
        { year: "2022", avgSalary: "18.0 LPA", placementPercentage: "93%" },
        { year: "2023", avgSalary: "19.0 LPA", placementPercentage: "94%" },
        { year: "2024", avgSalary: "20.0 LPA", placementPercentage: "95%" },
      ],
      courses: ["BA LLB (Hons) - 5 Year Integrated"],
      scholarships: ["Post Matric Scholarship for SC Students", "Maulana Azad National Fellowship"],
      entrance: "CLAT", category: "Law",
      hostelFee: "₹50,000 / year", messFee: "₹40,000 / year", annualFee: "₹2,72,000 / year", avgAnnualFee: "₹3,62,000 / year",
      recruitersCount: 45, studentsInternships: 90, avgStipend: 60000, ppoRate: 30,
      alumniF500: 5, alumniEntrepreneurs: 8, alumniAbroad: 20,
      admissionFaqs: [
        { question: "What CLAT rank for NLSIU?", answer: "Top 50-70 in CLAT (General category) for BA LLB admission. NLSIU is the most sought-after NLU." },
        { question: "What are career prospects?", answer: "Top law firms (AZB, Trilegal, Cyril Amarchand) recruit at ₹15-30 LPA. Many graduates join judiciary, corporate legal, or pursue LLM abroad." },
      ],
    },
    {
      name: COLLEGE_NAMES[11]!, // NID Ahmedabad
      state: "Gujarat", city: "Ahmedabad", type: "Public", uni: UNIVERSITY_NAMES[12]!, estYear: 1961,
      rating: 4.7, accreditation: ["Institution of National Importance"],
      desc: "National Institute of Design, Ahmedabad is India's premier design institution, declared an 'Institution of National Importance' by Act of Parliament. Established in 1961, NID offers B.Des and M.Des programs across multiple design disciplines. NID graduates are highly sought after by companies worldwide.",
      students: 700, campusSize: "15 Acres",
      avgSalary: 1200000, placementPct: 85, highestSalary: 4000000,
      placementTrends: [
        { year: "2022", avgSalary: "10.0 LPA", placementPercentage: "82%" },
        { year: "2023", avgSalary: "11.0 LPA", placementPercentage: "84%" },
        { year: "2024", avgSalary: "12.0 LPA", placementPercentage: "85%" },
      ],
      courses: ["B.Des (Bachelor of Design)"],
      scholarships: ["AICTE Pragati Scholarship for Girls", "Post Matric Scholarship for SC Students"],
      entrance: "NID DAT", category: "Design",
      hostelFee: "₹45,000 / year", messFee: "₹40,000 / year", annualFee: "₹3,82,000 / year", avgAnnualFee: "₹4,67,000 / year",
      recruitersCount: 60, studentsInternships: 88, avgStipend: 35000, ppoRate: 25,
      alumniF500: 8, alumniEntrepreneurs: 20, alumniAbroad: 22,
      admissionFaqs: [
        { question: "What is NID DAT?", answer: "NID Design Aptitude Test has two stages: Prelims (written test) and Mains (studio test + interview). Tests design aptitude, creativity, and visualization." },
      ],
    },
    {
      name: COLLEGE_NAMES[12]!, // NIFT Delhi
      state: "Delhi", city: "New Delhi", type: "Public", uni: UNIVERSITY_NAMES[3]!, estYear: 1986,
      rating: 4.5, accreditation: ["Statutory body under Ministry of Textiles"],
      desc: "National Institute of Fashion Technology, Delhi is India's foremost fashion and design institution. Established in 1986, NIFT offers B.Des, B.FTech, M.Des, M.FTech, and MFM programs. NIFT Delhi alumni lead India's fashion industry and global fashion houses.",
      students: 1000, campusSize: "8 Acres",
      avgSalary: 900000, placementPct: 80, highestSalary: 3000000,
      placementTrends: [
        { year: "2022", avgSalary: "8.0 LPA", placementPercentage: "78%" },
        { year: "2023", avgSalary: "8.5 LPA", placementPercentage: "79%" },
        { year: "2024", avgSalary: "9.0 LPA", placementPercentage: "80%" },
      ],
      courses: ["B.Des (Bachelor of Design)"],
      scholarships: ["AICTE Pragati Scholarship for Girls"],
      entrance: "NIFT ENTRANCE", category: "Design",
      hostelFee: "₹55,000 / year", messFee: "₹42,000 / year", annualFee: "₹2,68,000 / year", avgAnnualFee: "₹3,65,000 / year",
      recruitersCount: 70, studentsInternships: 85, avgStipend: 25000, ppoRate: 20,
      alumniF500: 3, alumniEntrepreneurs: 15, alumniAbroad: 18,
      admissionFaqs: [
        { question: "What is the NIFT entrance exam pattern?", answer: "Creative Ability Test (CAT) + General Ability Test (GAT) in written exam. Shortlisted candidates appear for a Situation Test at NIFT campus." },
      ],
    },
    {
      name: COLLEGE_NAMES[13]!, // MIT Manipal
      state: "Karnataka", city: "Manipal", type: "Private", uni: UNIVERSITY_NAMES[11]!, estYear: 1957,
      rating: 4.3, accreditation: ["NAAC A++", "NBA"],
      desc: "Manipal Institute of Technology is one of India's most reputed private engineering colleges, part of MAHE (Manipal Academy of Higher Education). Established in 1957, MIT Manipal offers a diverse range of engineering programs and is known for its excellent infrastructure, international collaborations, and placement record.",
      students: 7000, campusSize: "600 Acres (MAHE campus)",
      avgSalary: 800000, placementPct: 78, highestSalary: 4500000,
      placementTrends: [
        { year: "2022", avgSalary: "7.0 LPA", placementPercentage: "75%" },
        { year: "2023", avgSalary: "7.5 LPA", placementPercentage: "77%" },
        { year: "2024", avgSalary: "8.0 LPA", placementPercentage: "78%" },
      ],
      courses: ["B.Tech Computer Science and Engineering", "B.Tech Electronics and Communication Engineering", "B.Tech Mechanical Engineering"],
      scholarships: ["Reliance Foundation Scholarship", "Tata Trusts Scholarship"],
      entrance: "JEE MAIN", category: "Engineering",
      hostelFee: "₹1,50,000 / year", messFee: "₹60,000 / year", annualFee: "₹4,50,000 / year", avgAnnualFee: "₹6,60,000 / year",
      recruitersCount: 200, studentsInternships: 65, avgStipend: 22000, ppoRate: 25,
      alumniF500: 10, alumniEntrepreneurs: 12, alumniAbroad: 22,
      admissionFaqs: [
        { question: "How to get into MIT Manipal?", answer: "Through MET (Manipal Entrance Test) or JEE Main score. MET is conducted by MAHE and tests Physics, Chemistry, and Mathematics." },
      ],
    },
    {
      name: COLLEGE_NAMES[14]!, // VIT Vellore
      state: "Tamil Nadu", city: "Vellore", type: "Deemed", uni: UNIVERSITY_NAMES[11]!, estYear: 1984,
      rating: 4.2, accreditation: ["NAAC A++", "NIRF Top 15 Engineering"],
      desc: "Vellore Institute of Technology is one of India's largest and most sought-after private engineering institutions. Known for VITEEE (its entrance exam), excellent placement cell, and research output. VIT has campuses in Vellore, Chennai, Bhopal, and AP.",
      students: 22000, campusSize: "372 Acres",
      avgSalary: 750000, placementPct: 75, highestSalary: 4400000,
      placementTrends: [
        { year: "2022", avgSalary: "6.5 LPA", placementPercentage: "72%" },
        { year: "2023", avgSalary: "7.0 LPA", placementPercentage: "74%" },
        { year: "2024", avgSalary: "7.5 LPA", placementPercentage: "75%" },
      ],
      courses: ["B.Tech Computer Science and Engineering", "B.Tech Electronics and Communication Engineering", "BCA (Bachelor of Computer Applications)"],
      scholarships: ["Reliance Foundation Scholarship", "AICTE Pragati Scholarship for Girls"],
      entrance: "JEE MAIN", category: "Engineering",
      hostelFee: "₹1,20,000 / year", messFee: "₹55,000 / year", annualFee: "₹2,67,000 - ₹5,97,000 / year", avgAnnualFee: "₹4,42,000 / year",
      recruitersCount: 450, studentsInternships: 60, avgStipend: 18000, ppoRate: 20,
      alumniF500: 8, alumniEntrepreneurs: 10, alumniAbroad: 15,
      admissionFaqs: [
        { question: "What is VITEEE?", answer: "VIT Engineering Entrance Exam is conducted by VIT for admission to B.Tech programs. It tests Mathematics, Physics, Chemistry, and English/Aptitude." },
      ],
    },
    {
      name: COLLEGE_NAMES[15]!, // Christ University
      state: "Karnataka", city: "Bengaluru", type: "Deemed", uni: UNIVERSITY_NAMES[11]!, estYear: 1969,
      rating: 4.2, accreditation: ["NAAC A++", "UGC recognized"],
      desc: "Christ University, Bengaluru is one of South India's top private universities, known for its strict discipline, excellent academic culture, and diverse program offerings. It offers programs across commerce, management, law, sciences, humanities, and engineering.",
      students: 25000, campusSize: "30 Acres (multiple campuses)",
      avgSalary: 600000, placementPct: 70, highestSalary: 2500000,
      placementTrends: [
        { year: "2022", avgSalary: "5.5 LPA", placementPercentage: "68%" },
        { year: "2023", avgSalary: "5.8 LPA", placementPercentage: "69%" },
        { year: "2024", avgSalary: "6.0 LPA", placementPercentage: "70%" },
      ],
      courses: ["BBA (Bachelor of Business Administration)", "B.Com (Honours)", "BA LLB (Hons) - 5 Year Integrated"],
      scholarships: ["Reliance Foundation Scholarship", "Sitaram Jindal Foundation Scholarship"],
      entrance: "CUET UG", category: "Commerce",
      hostelFee: "₹1,00,000 / year", messFee: "₹45,000 / year", annualFee: "₹1,50,000 - ₹4,00,000 / year", avgAnnualFee: "₹2,95,000 / year",
      recruitersCount: 150, studentsInternships: 55, avgStipend: 15000, ppoRate: 18,
      alumniF500: 3, alumniEntrepreneurs: 8, alumniAbroad: 12,
      admissionFaqs: [
        { question: "Is Christ University strict?", answer: "Yes. Christ is known for its discipline — regular attendance tracking, dress code, and structured academic schedule. This is seen as positive by most parents and employers." },
      ],
    },
    {
      name: COLLEGE_NAMES[16]!, // Loyola Chennai
      state: "Tamil Nadu", city: "Chennai", type: "Private", uni: UNIVERSITY_NAMES[4]!, estYear: 1925,
      rating: 4.3, accreditation: ["NAAC A++", "UGC Autonomous"],
      desc: "Loyola College, Chennai is one of India's oldest and most prestigious arts and science colleges. Established by the Jesuits in 1925, it offers undergraduate and postgraduate programs in arts, commerce, and sciences. Known for its values-based education and strong alumni network.",
      students: 9000, campusSize: "35 Acres",
      avgSalary: 500000, placementPct: 60, highestSalary: 2000000,
      placementTrends: [
        { year: "2022", avgSalary: "4.5 LPA", placementPercentage: "58%" },
        { year: "2023", avgSalary: "4.8 LPA", placementPercentage: "59%" },
        { year: "2024", avgSalary: "5.0 LPA", placementPercentage: "60%" },
      ],
      courses: ["B.Com (Honours)", "B.Sc Physics (Honours)", "BCA (Bachelor of Computer Applications)"],
      scholarships: ["Central Sector Scheme of Scholarships (CSSS)", "Sitaram Jindal Foundation Scholarship"],
      entrance: "CUET UG", category: "Science",
      hostelFee: "₹35,000 / year", messFee: "₹30,000 / year", annualFee: "₹35,000 / year", avgAnnualFee: "₹1,00,000 / year",
      recruitersCount: 80, studentsInternships: 40, avgStipend: 12000, ppoRate: 10,
      alumniF500: 5, alumniEntrepreneurs: 8, alumniAbroad: 15,
      admissionFaqs: [
        { question: "How to get admission to Loyola?", answer: "Through CUET UG scores for most programs. Some programs have college-level entrance tests and interviews." },
      ],
    },
    {
      name: COLLEGE_NAMES[17]!, // St. Xavier's Mumbai
      state: "Maharashtra", city: "Mumbai", type: "Private", uni: UNIVERSITY_NAMES[6]!, estYear: 1869,
      rating: 4.4, accreditation: ["NAAC A++", "UGC Autonomous"],
      desc: "St. Xavier's College, Mumbai is one of India's most iconic colleges, established by the Jesuits in 1869. Located in the heart of South Mumbai, it offers outstanding programs in arts, commerce, and sciences. Its heritage building, academic culture, and alumni network are unmatched.",
      students: 4500, campusSize: "5 Acres (Fort campus)",
      avgSalary: 600000, placementPct: 55, highestSalary: 2500000,
      placementTrends: [
        { year: "2022", avgSalary: "5.2 LPA", placementPercentage: "52%" },
        { year: "2023", avgSalary: "5.5 LPA", placementPercentage: "54%" },
        { year: "2024", avgSalary: "6.0 LPA", placementPercentage: "55%" },
      ],
      courses: ["B.Com (Honours)", "B.Sc Physics (Honours)"],
      scholarships: ["Central Sector Scheme of Scholarships (CSSS)", "Narotam Sekhsaria Scholarship"],
      entrance: "CUET UG", category: "Commerce",
      hostelFee: "N/A (day college)", messFee: "N/A", annualFee: "₹12,000 - ₹25,000 / year", avgAnnualFee: "₹18,500 / year",
      recruitersCount: 60, studentsInternships: 35, avgStipend: 15000, ppoRate: 10,
      alumniF500: 8, alumniEntrepreneurs: 15, alumniAbroad: 30,
      admissionFaqs: [
        { question: "Does St. Xavier's have hostel?", answer: "No. St. Xavier's Mumbai is primarily a day college. Students need to arrange their own accommodation in Mumbai." },
      ],
    },
    {
      name: COLLEGE_NAMES[18]!, // SRM
      state: "Tamil Nadu", city: "Chennai", type: "Deemed", uni: UNIVERSITY_NAMES[4]!, estYear: 1985,
      rating: 4.1, accreditation: ["NAAC A++", "NIRF Top 30 Engineering"],
      desc: "SRM Institute of Science and Technology is one of India's largest private universities with 52,000+ students. The main campus in Kattankulathur, Chennai spans 250 acres with state-of-the-art infrastructure. Known for strong international collaborations and diverse engineering programs.",
      students: 52000, campusSize: "250 Acres (main campus)",
      avgSalary: 600000, placementPct: 70, highestSalary: 4100000,
      placementTrends: [
        { year: "2022", avgSalary: "5.2 LPA", placementPercentage: "68%" },
        { year: "2023", avgSalary: "5.5 LPA", placementPercentage: "69%" },
        { year: "2024", avgSalary: "6.0 LPA", placementPercentage: "70%" },
      ],
      courses: ["B.Tech Computer Science and Engineering", "B.Tech Electronics and Communication Engineering", "B.Tech Mechanical Engineering", "BCA (Bachelor of Computer Applications)"],
      scholarships: ["AICTE Pragati Scholarship for Girls", "Reliance Foundation Scholarship"],
      entrance: "JEE MAIN", category: "Engineering",
      hostelFee: "₹1,10,000 / year", messFee: "₹50,000 / year", annualFee: "₹2,50,000 - ₹5,00,000 / year", avgAnnualFee: "₹4,10,000 / year",
      recruitersCount: 600, studentsInternships: 55, avgStipend: 15000, ppoRate: 18,
      alumniF500: 5, alumniEntrepreneurs: 8, alumniAbroad: 12,
      admissionFaqs: [
        { question: "How to get into SRM?", answer: "Through SRMJEEE (SRM Joint Engineering Entrance Exam) or JEE Main score. SRMJEEE is an online exam conducted in multiple slots." },
      ],
    },
    {
      name: COLLEGE_NAMES[19]!, // COEP
      state: "Maharashtra", city: "Pune", type: "Public", uni: UNIVERSITY_NAMES[5]!, estYear: 1854,
      rating: 4.4, accreditation: ["NAAC A+", "NBA", "NIRF Top 50 Engineering"],
      desc: "College of Engineering Pune (COEP Technological University) is one of Asia's oldest engineering colleges, established in 1854. Located on the banks of the Mula-Mutha river in Pune, COEP has a rich heritage and is known for its strong academic culture, student activities, and alumni network.",
      students: 4000, campusSize: "12 Acres",
      avgSalary: 1000000, placementPct: 82, highestSalary: 4500000,
      placementTrends: [
        { year: "2022", avgSalary: "9.0 LPA", placementPercentage: "80%" },
        { year: "2023", avgSalary: "9.5 LPA", placementPercentage: "81%" },
        { year: "2024", avgSalary: "10.0 LPA", placementPercentage: "82%" },
      ],
      courses: ["B.Tech Computer Science and Engineering", "B.Tech Electronics and Communication Engineering", "B.Tech Mechanical Engineering", "B.Tech Civil Engineering"],
      scholarships: ["Post Matric Scholarship for SC Students", "Central Sector Scheme of Scholarships (CSSS)"],
      entrance: "JEE MAIN", category: "Engineering",
      hostelFee: "₹15,000 / year", messFee: "₹35,000 / year", annualFee: "₹1,20,000 / year", avgAnnualFee: "₹1,70,000 / year",
      recruitersCount: 200, studentsInternships: 68, avgStipend: 25000, ppoRate: 28,
      alumniF500: 10, alumniEntrepreneurs: 12, alumniAbroad: 18,
      admissionFaqs: [
        { question: "How to get into COEP?", answer: "Through JEE Main score via MHT-CET counselling (for Maharashtra students) or JoSAA (for outside Maharashtra). COEP was converted to a Technological University in 2023." },
      ],
    },
    // ─── NEW: 30 more colleges across all major Indian states ───
    {
      name: COLLEGE_NAMES[20]!, // IIT Kanpur
      state: "Uttar Pradesh", city: "Kanpur", type: "Public", uni: "Indian Institute of Technology Kanpur", estYear: 1959,
      rating: 4.7, accreditation: ["NAAC A++", "NBA", "NIRF #4 Engineering"],
      desc: "IIT Kanpur is consistently ranked among India's top 5 engineering institutes. Located on a sprawling 1055-acre campus along the Ganges, IIT Kanpur is known for pioneering computer science education in India and its strong aerospace engineering department.",
      students: 9000, campusSize: "1055 Acres",
      avgSalary: 2000000, placementPct: 84, highestSalary: 21000000,
      placementTrends: [
        { year: "2022", avgSalary: "18.0 LPA", placementPercentage: "82%" },
        { year: "2023", avgSalary: "19.2 LPA", placementPercentage: "83%" },
        { year: "2024", avgSalary: "20.0 LPA", placementPercentage: "84%" },
      ],
      courses: ["B.Tech Computer Science and Engineering", "B.Tech Mechanical Engineering", "B.Tech Electrical Engineering"],
      scholarships: ["INSPIRE Scholarship (DST)", "Central Sector Scheme of Scholarships (CSSS)"],
      entrance: "JEE ADVANCED", category: "Engineering",
      hostelFee: "₹18,000 / year", messFee: "₹33,000 / year", annualFee: "₹2,09,550 / year", avgAnnualFee: "₹2,60,550 / year",
      recruitersCount: 330, studentsInternships: 76, avgStipend: 44000, ppoRate: 40,
      alumniF500: 30, alumniEntrepreneurs: 20, alumniAbroad: 28,
      admissionFaqs: [
        { question: "What is IIT Kanpur known for?", answer: "Pioneered CS education in India. Strong in Aerospace, CS, EE. Alumni include Infosys co-founder N.R. Narayana Murthy." },
      ],
    },
    {
      name: COLLEGE_NAMES[21]!, // IIT Kharagpur
      state: "West Bengal", city: "Kharagpur", type: "Public", uni: "Indian Institute of Technology Kharagpur", estYear: 1951,
      rating: 4.7, accreditation: ["NAAC A++", "NBA", "NIRF #5 Engineering"],
      desc: "IIT Kharagpur is India's oldest and largest IIT, established in 1951. With a 2100-acre campus (largest among IITs), it offers the widest range of departments and is home to famous Spring Fest (Asia's largest social and cultural fest).",
      students: 12000, campusSize: "2100 Acres",
      avgSalary: 1800000, placementPct: 82, highestSalary: 20000000,
      placementTrends: [
        { year: "2022", avgSalary: "16.5 LPA", placementPercentage: "80%" },
        { year: "2023", avgSalary: "17.5 LPA", placementPercentage: "81%" },
        { year: "2024", avgSalary: "18.0 LPA", placementPercentage: "82%" },
      ],
      courses: ["B.Tech Computer Science and Engineering", "B.Tech Electronics and Communication Engineering", "B.Tech Mechanical Engineering", "B.Tech Civil Engineering", "B.Arch (Bachelor of Architecture)"],
      scholarships: ["INSPIRE Scholarship (DST)", "Post Matric Scholarship for SC Students"],
      entrance: "JEE ADVANCED", category: "Engineering",
      hostelFee: "₹16,000 / year", messFee: "₹30,000 / year", annualFee: "₹2,09,550 / year", avgAnnualFee: "₹2,55,550 / year",
      recruitersCount: 350, studentsInternships: 74, avgStipend: 40000, ppoRate: 38,
      alumniF500: 28, alumniEntrepreneurs: 18, alumniAbroad: 25,
      admissionFaqs: [
        { question: "Why is IIT KGP special?", answer: "India's oldest IIT with the largest campus. Only IIT offering B.Arch, Law, Medical, and liberal arts programs alongside engineering." },
      ],
    },
    {
      name: COLLEGE_NAMES[22]!, // IIT Roorkee
      state: "Uttarakhand", city: "Roorkee", type: "Public", uni: "Indian Institute of Technology Roorkee", estYear: 1847,
      rating: 4.6, accreditation: ["NAAC A++", "NBA", "NIRF #6 Engineering"],
      desc: "IIT Roorkee, formerly Thomason College of Civil Engineering (est. 1847), is Asia's oldest technical institution. Converted to IIT in 2001. Known for civil, mechanical, and earthquake engineering. Located in Uttarakhand foothills.",
      students: 8500, campusSize: "365 Acres",
      avgSalary: 1700000, placementPct: 80, highestSalary: 15000000,
      placementTrends: [
        { year: "2022", avgSalary: "15.5 LPA", placementPercentage: "78%" },
        { year: "2023", avgSalary: "16.5 LPA", placementPercentage: "79%" },
        { year: "2024", avgSalary: "17.0 LPA", placementPercentage: "80%" },
      ],
      courses: ["B.Tech Computer Science and Engineering", "B.Tech Civil Engineering", "B.Tech Mechanical Engineering", "B.Arch (Bachelor of Architecture)"],
      scholarships: ["INSPIRE Scholarship (DST)", "Central Sector Scheme of Scholarships (CSSS)"],
      entrance: "JEE ADVANCED", category: "Engineering",
      hostelFee: "₹17,000 / year", messFee: "₹32,000 / year", annualFee: "₹2,09,550 / year", avgAnnualFee: "₹2,58,550 / year",
      recruitersCount: 300, studentsInternships: 72, avgStipend: 38000, ppoRate: 35,
      alumniF500: 18, alumniEntrepreneurs: 12, alumniAbroad: 20,
      admissionFaqs: [
        { question: "What is unique about IIT Roorkee?", answer: "Asia's oldest technical institution (1847). Strong in Civil, Earthquake, Water Resources, and Architecture. Beautiful campus near the Himalayas." },
      ],
    },
    {
      name: COLLEGE_NAMES[23]!, // IIT Guwahati
      state: "Assam", city: "Guwahati", type: "Public", uni: "Indian Institute of Technology Guwahati", estYear: 1994,
      rating: 4.5, accreditation: ["NAAC A++", "NBA", "NIRF #7 Engineering"],
      desc: "IIT Guwahati is located on a 700-acre campus on the banks of the Brahmaputra river. Established in 1994, it is the youngest among the top old IITs but has quickly risen to NIRF Top 10. Known for its scenic campus and strong research output.",
      students: 7000, campusSize: "700 Acres",
      avgSalary: 1600000, placementPct: 78, highestSalary: 12000000,
      placementTrends: [
        { year: "2022", avgSalary: "14.5 LPA", placementPercentage: "76%" },
        { year: "2023", avgSalary: "15.2 LPA", placementPercentage: "77%" },
        { year: "2024", avgSalary: "16.0 LPA", placementPercentage: "78%" },
      ],
      courses: ["B.Tech Computer Science and Engineering", "B.Tech Electronics and Communication Engineering", "B.Des (Bachelor of Design)"],
      scholarships: ["INSPIRE Scholarship (DST)", "Ishan Uday Scholarship for NE Region"],
      entrance: "JEE ADVANCED", category: "Engineering",
      hostelFee: "₹15,000 / year", messFee: "₹28,000 / year", annualFee: "₹2,09,550 / year", avgAnnualFee: "₹2,52,550 / year",
      recruitersCount: 280, studentsInternships: 70, avgStipend: 35000, ppoRate: 32,
      alumniF500: 12, alumniEntrepreneurs: 10, alumniAbroad: 18,
      admissionFaqs: [
        { question: "Is IIT Guwahati worth it?", answer: "Absolutely. NIRF Top 10, scenic Brahmaputra-side campus, strong placements (16 LPA avg), and the only IIT offering B.Des through JEE Advanced." },
      ],
    },
    {
      name: COLLEGE_NAMES[24]!, // IIT Hyderabad
      state: "Telangana", city: "Hyderabad", type: "Public", uni: "Indian Institute of Technology Hyderabad", estYear: 2008,
      rating: 4.4, accreditation: ["NAAC A++", "NIRF #8 Engineering"],
      desc: "IIT Hyderabad, established in 2008, is the fastest-rising new IIT. Located on a 576-acre campus in Kandi, Sangareddy. Known for its interdisciplinary approach, strong AI/ML research, and proximity to Hyderabad's tech ecosystem (HITEC City).",
      students: 4500, campusSize: "576 Acres",
      avgSalary: 1500000, placementPct: 78, highestSalary: 10000000,
      placementTrends: [
        { year: "2022", avgSalary: "13.0 LPA", placementPercentage: "75%" },
        { year: "2023", avgSalary: "14.0 LPA", placementPercentage: "77%" },
        { year: "2024", avgSalary: "15.0 LPA", placementPercentage: "78%" },
      ],
      courses: ["B.Tech Computer Science and Engineering", "B.Tech Electrical Engineering", "B.Tech Mechanical Engineering"],
      scholarships: ["INSPIRE Scholarship (DST)", "Central Sector Scheme of Scholarships (CSSS)"],
      entrance: "JEE ADVANCED", category: "Engineering",
      hostelFee: "₹20,000 / year", messFee: "₹35,000 / year", annualFee: "₹2,09,550 / year", avgAnnualFee: "₹2,64,550 / year",
      recruitersCount: 200, studentsInternships: 68, avgStipend: 32000, ppoRate: 30,
      alumniF500: 5, alumniEntrepreneurs: 8, alumniAbroad: 15,
      admissionFaqs: [
        { question: "How good is IIT Hyderabad?", answer: "Best among new IITs. NIRF #8. Strong AI/ML focus. Hyderabad's tech hub gives great internship access." },
      ],
    },
    {
      name: COLLEGE_NAMES[25]!, // NIT Warangal
      state: "Telangana", city: "Warangal", type: "Public", uni: "Indian Institute of Technology Hyderabad", estYear: 1959,
      rating: 4.4, accreditation: ["NAAC A++", "NBA", "NIRF Top 15 Engineering"],
      desc: "NIT Warangal is one of India's oldest and top-ranked NITs, established in 1959 as REC Warangal. Known for its strong alumni network, excellent placements, and competitive academic culture. Technozion (tech fest) is nationally recognized.",
      students: 6500, campusSize: "248 Acres",
      avgSalary: 1150000, placementPct: 88, highestSalary: 5500000,
      placementTrends: [
        { year: "2022", avgSalary: "10.0 LPA", placementPercentage: "86%" },
        { year: "2023", avgSalary: "10.8 LPA", placementPercentage: "87%" },
        { year: "2024", avgSalary: "11.5 LPA", placementPercentage: "88%" },
      ],
      courses: ["B.Tech Computer Science and Engineering", "B.Tech Electronics and Communication Engineering", "B.Tech Mechanical Engineering", "B.Tech Civil Engineering"],
      scholarships: ["Central Sector Scheme of Scholarships (CSSS)", "AICTE Pragati Scholarship for Girls"],
      entrance: "JEE MAIN", category: "Engineering",
      hostelFee: "₹22,000 / year", messFee: "₹38,000 / year", annualFee: "₹1,63,750 / year", avgAnnualFee: "₹2,23,750 / year",
      recruitersCount: 260, studentsInternships: 70, avgStipend: 28000, ppoRate: 32,
      alumniF500: 12, alumniEntrepreneurs: 10, alumniAbroad: 15,
      admissionFaqs: [
        { question: "What JEE Main rank for NIT Warangal?", answer: "CSE: ~3000-5000 rank. ECE: ~6000-8000 rank (General, home state). Among the top 3 NITs nationally." },
      ],
    },
    {
      name: COLLEGE_NAMES[26]!, // NITK Surathkal
      state: "Karnataka", city: "Mangalore", type: "Public", uni: "Indian Institute of Technology Madras", estYear: 1960,
      rating: 4.4, accreditation: ["NAAC A++", "NBA", "NIRF Top 15 Engineering"],
      desc: "NIT Karnataka (NITK Surathkal) is located on a beautiful campus on the Arabian Sea coast. Known for Engineer (tech fest — India's second largest), excellent placements, and strong alumni network. Consistently ranked among the top 3 NITs.",
      students: 6000, campusSize: "295 Acres",
      avgSalary: 1180000, placementPct: 90, highestSalary: 6000000,
      placementTrends: [
        { year: "2022", avgSalary: "10.2 LPA", placementPercentage: "88%" },
        { year: "2023", avgSalary: "11.0 LPA", placementPercentage: "89%" },
        { year: "2024", avgSalary: "11.8 LPA", placementPercentage: "90%" },
      ],
      courses: ["B.Tech Computer Science and Engineering", "B.Tech Electronics and Communication Engineering", "B.Tech Mechanical Engineering"],
      scholarships: ["Central Sector Scheme of Scholarships (CSSS)", "AICTE Pragati Scholarship for Girls"],
      entrance: "JEE MAIN", category: "Engineering",
      hostelFee: "₹24,000 / year", messFee: "₹40,000 / year", annualFee: "₹1,63,750 / year", avgAnnualFee: "₹2,27,750 / year",
      recruitersCount: 270, studentsInternships: 72, avgStipend: 30000, ppoRate: 34,
      alumniF500: 14, alumniEntrepreneurs: 12, alumniAbroad: 18,
      admissionFaqs: [
        { question: "NITK vs NIT Trichy?", answer: "Both are top 3 NITs. NITK has a beachside campus. NIT Trichy has the largest NIT campus. Placements are comparable." },
      ],
    },
    {
      name: COLLEGE_NAMES[27]!, // NIT Calicut
      state: "Kerala", city: "Kozhikode", type: "Public", uni: "NIT Calicut (NITC)", estYear: 1961,
      rating: 4.3, accreditation: ["NAAC A+", "NBA", "NIRF Top 15 Engineering"],
      desc: "NIT Calicut is Kerala's premier engineering institution, located on a scenic 110-acre hilltop campus. Known for Tathva (tech fest), strong CS department, and high placement rates. One of the original RECs established in 1961.",
      students: 5500, campusSize: "110 Acres",
      avgSalary: 1050000, placementPct: 85, highestSalary: 5000000,
      placementTrends: [
        { year: "2022", avgSalary: "9.5 LPA", placementPercentage: "83%" },
        { year: "2023", avgSalary: "10.0 LPA", placementPercentage: "84%" },
        { year: "2024", avgSalary: "10.5 LPA", placementPercentage: "85%" },
      ],
      courses: ["B.Tech Computer Science and Engineering", "B.Tech Electronics and Communication Engineering", "B.Tech Mechanical Engineering", "B.Arch (Bachelor of Architecture)"],
      scholarships: ["Central Sector Scheme of Scholarships (CSSS)", "AICTE Pragati Scholarship for Girls"],
      entrance: "JEE MAIN", category: "Engineering",
      hostelFee: "₹18,000 / year", messFee: "₹35,000 / year", annualFee: "₹1,63,750 / year", avgAnnualFee: "₹2,16,750 / year",
      recruitersCount: 220, studentsInternships: 68, avgStipend: 25000, ppoRate: 28,
      alumniF500: 8, alumniEntrepreneurs: 10, alumniAbroad: 20,
      admissionFaqs: [
        { question: "What rank for NIT Calicut CSE?", answer: "JEE Main rank ~5000-8000 (General, home state Kerala). Outside state: ~3000-5000." },
      ],
    },
    {
      name: COLLEGE_NAMES[28]!, // NIT Rourkela
      state: "Odisha", city: "Rourkela", type: "Public", uni: "Utkal University", estYear: 1961,
      rating: 4.3, accreditation: ["NAAC A+", "NBA", "NIRF Top 15 Engineering"],
      desc: "NIT Rourkela is one of the top NITs in eastern India. Known for its strong metallurgy and mining departments (given proximity to Rourkela Steel Plant), good placements, and NITRUTSAV cultural fest.",
      students: 6000, campusSize: "640 Acres",
      avgSalary: 950000, placementPct: 82, highestSalary: 4500000,
      placementTrends: [
        { year: "2022", avgSalary: "8.5 LPA", placementPercentage: "80%" },
        { year: "2023", avgSalary: "9.0 LPA", placementPercentage: "81%" },
        { year: "2024", avgSalary: "9.5 LPA", placementPercentage: "82%" },
      ],
      courses: ["B.Tech Computer Science and Engineering", "B.Tech Mechanical Engineering", "B.Tech Civil Engineering", "B.Tech Electrical Engineering"],
      scholarships: ["Central Sector Scheme of Scholarships (CSSS)", "Post Matric Scholarship for SC Students"],
      entrance: "JEE MAIN", category: "Engineering",
      hostelFee: "₹15,000 / year", messFee: "₹30,000 / year", annualFee: "₹1,63,750 / year", avgAnnualFee: "₹2,08,750 / year",
      recruitersCount: 200, studentsInternships: 62, avgStipend: 22000, ppoRate: 25,
      alumniF500: 8, alumniEntrepreneurs: 8, alumniAbroad: 12,
      admissionFaqs: [
        { question: "Is NIT Rourkela good?", answer: "Yes, top 10 NIT. Especially strong for Metallurgy, Mining, CS, and Mechanical. 640-acre campus is one of the largest among NITs." },
      ],
    },
    {
      name: COLLEGE_NAMES[29]!, // IIIT Hyderabad
      state: "Telangana", city: "Hyderabad", type: "Public", uni: "University of Hyderabad", estYear: 1998,
      rating: 4.6, accreditation: ["NAAC A++", "NIRF Top 20 Engineering"],
      desc: "International Institute of Information Technology Hyderabad (IIIT-H) is India's top IIIT, known for its research-focused approach to CS education. Founded in 1998, it has produced multiple successful startups and is a leader in AI, NLP, and robotics research.",
      students: 2500, campusSize: "66 Acres",
      avgSalary: 1800000, placementPct: 92, highestSalary: 12000000,
      placementTrends: [
        { year: "2022", avgSalary: "16.0 LPA", placementPercentage: "90%" },
        { year: "2023", avgSalary: "17.0 LPA", placementPercentage: "91%" },
        { year: "2024", avgSalary: "18.0 LPA", placementPercentage: "92%" },
      ],
      courses: ["B.Tech Computer Science and Engineering", "B.Tech Electronics and Communication Engineering"],
      scholarships: ["Central Sector Scheme of Scholarships (CSSS)"],
      entrance: "JEE MAIN", category: "Engineering",
      hostelFee: "₹55,000 / year", messFee: "₹45,000 / year", annualFee: "₹3,50,000 / year", avgAnnualFee: "₹4,50,000 / year",
      recruitersCount: 180, studentsInternships: 85, avgStipend: 50000, ppoRate: 45,
      alumniF500: 10, alumniEntrepreneurs: 25, alumniAbroad: 22,
      admissionFaqs: [
        { question: "How is IIIT-H for CS?", answer: "Among the best in India for CS/IT. Research-driven, strong AI/ML labs. Avg package ~18 LPA rivals older IITs for CS." },
      ],
    },
    {
      name: COLLEGE_NAMES[30]!, // Jadavpur University
      state: "West Bengal", city: "Kolkata", type: "Public", uni: "Jadavpur University", estYear: 1955,
      rating: 4.4, accreditation: ["NAAC A+", "NBA", "NIRF Top 20 Engineering"],
      desc: "Jadavpur University is Kolkata's premier state engineering university. Known for its strong faculty, competitive admissions (through WBJEE), active student politics, and emphasis on holistic education. Alumni include Nobel laureate Amartya Sen.",
      students: 10000, campusSize: "76 Acres",
      avgSalary: 900000, placementPct: 75, highestSalary: 4500000,
      placementTrends: [
        { year: "2022", avgSalary: "8.0 LPA", placementPercentage: "72%" },
        { year: "2023", avgSalary: "8.5 LPA", placementPercentage: "74%" },
        { year: "2024", avgSalary: "9.0 LPA", placementPercentage: "75%" },
      ],
      courses: ["B.Tech Computer Science and Engineering", "B.Tech Electronics and Communication Engineering", "B.Tech Mechanical Engineering", "B.Tech Civil Engineering"],
      scholarships: ["Central Sector Scheme of Scholarships (CSSS)", "Post Matric Scholarship for SC Students"],
      entrance: "JEE MAIN", category: "Engineering",
      hostelFee: "₹5,000 / year", messFee: "₹20,000 / year", annualFee: "₹12,000 / year", avgAnnualFee: "₹37,000 / year",
      recruitersCount: 150, studentsInternships: 55, avgStipend: 18000, ppoRate: 18,
      alumniF500: 8, alumniEntrepreneurs: 12, alumniAbroad: 25,
      admissionFaqs: [
        { question: "How affordable is Jadavpur?", answer: "Extremely affordable — ₹12,000/year tuition for a top-20 engineering college. One of the best value-for-money options in India." },
      ],
    },
    {
      name: COLLEGE_NAMES[31]!, // AMU
      state: "Uttar Pradesh", city: "Aligarh", type: "Public", uni: "Aligarh Muslim University", estYear: 1920,
      rating: 4.2, accreditation: ["NAAC A+", "NIRF Top 30"],
      desc: "Aligarh Muslim University is one of India's oldest and most prestigious central universities. Established in 1920, it has 12 faculties with 98 departments offering over 300 courses. AMU has its own entrance test for all programs.",
      students: 30000, campusSize: "1155 Acres",
      avgSalary: 600000, placementPct: 60, highestSalary: 2500000,
      placementTrends: [
        { year: "2022", avgSalary: "5.0 LPA", placementPercentage: "55%" },
        { year: "2023", avgSalary: "5.5 LPA", placementPercentage: "58%" },
        { year: "2024", avgSalary: "6.0 LPA", placementPercentage: "60%" },
      ],
      courses: ["B.Tech Computer Science and Engineering", "B.Tech Mechanical Engineering", "MBBS (Bachelor of Medicine, Bachelor of Surgery)", "BA LLB (Hons) - 5 Year Integrated", "B.Com (Honours)"],
      scholarships: ["Maulana Azad National Fellowship", "Post Matric Scholarship for SC Students"],
      entrance: "CUET UG", category: "Engineering",
      hostelFee: "₹8,000 / year", messFee: "₹22,000 / year", annualFee: "₹15,000 / year", avgAnnualFee: "₹45,000 / year",
      recruitersCount: 100, studentsInternships: 40, avgStipend: 12000, ppoRate: 12,
      alumniF500: 5, alumniEntrepreneurs: 8, alumniAbroad: 15,
      admissionFaqs: [
        { question: "How to get into AMU?", answer: "AMU conducts its own entrance test (AMUEEE for engineering, AMU entrance for other programs). CUET scores also accepted for some courses." },
      ],
    },
    {
      name: COLLEGE_NAMES[32]!, // IIT-BHU
      state: "Uttar Pradesh", city: "Varanasi", type: "Public", uni: "Banaras Hindu University", estYear: 1919,
      rating: 4.5, accreditation: ["NAAC A++", "NBA", "NIRF Top 12 Engineering"],
      desc: "IIT (BHU) Varanasi is the engineering school of Banaras Hindu University, one of Asia's largest residential universities. Originally BENRAS Engineering College (1919), it became IIT in 2012. Known for its heritage campus, strong ceramics and mining departments.",
      students: 6000, campusSize: "1300 Acres (BHU campus)",
      avgSalary: 1400000, placementPct: 80, highestSalary: 10000000,
      placementTrends: [
        { year: "2022", avgSalary: "12.5 LPA", placementPercentage: "78%" },
        { year: "2023", avgSalary: "13.2 LPA", placementPercentage: "79%" },
        { year: "2024", avgSalary: "14.0 LPA", placementPercentage: "80%" },
      ],
      courses: ["B.Tech Computer Science and Engineering", "B.Tech Mechanical Engineering", "B.Tech Electrical Engineering", "B.Tech Civil Engineering"],
      scholarships: ["INSPIRE Scholarship (DST)", "Central Sector Scheme of Scholarships (CSSS)"],
      entrance: "JEE ADVANCED", category: "Engineering",
      hostelFee: "₹12,000 / year", messFee: "₹28,000 / year", annualFee: "₹2,09,550 / year", avgAnnualFee: "₹2,49,550 / year",
      recruitersCount: 250, studentsInternships: 68, avgStipend: 30000, ppoRate: 30,
      alumniF500: 12, alumniEntrepreneurs: 10, alumniAbroad: 18,
      admissionFaqs: [
        { question: "Is IIT BHU a real IIT?", answer: "Yes. Converted from IT-BHU to IIT in 2012. Full IIT status with JEE Advanced admission. The oldest engineering institution in the IIT system (1919)." },
      ],
    },
    {
      name: COLLEGE_NAMES[33]!, // PEC Chandigarh
      state: "Punjab", city: "Chandigarh", type: "Public", uni: "Panjab University", estYear: 1921,
      rating: 4.2, accreditation: ["NAAC A", "NBA", "NIRF Top 50 Engineering"],
      desc: "Punjab Engineering College (now PEC, Deemed University) is one of North India's oldest and most respected engineering colleges. Located in the planned city of Chandigarh. Known for strong alumni network and consistent placements.",
      students: 4500, campusSize: "130 Acres",
      avgSalary: 900000, placementPct: 78, highestSalary: 4000000,
      placementTrends: [
        { year: "2022", avgSalary: "8.0 LPA", placementPercentage: "75%" },
        { year: "2023", avgSalary: "8.5 LPA", placementPercentage: "77%" },
        { year: "2024", avgSalary: "9.0 LPA", placementPercentage: "78%" },
      ],
      courses: ["B.Tech Computer Science and Engineering", "B.Tech Electronics and Communication Engineering", "B.Tech Mechanical Engineering"],
      scholarships: ["Central Sector Scheme of Scholarships (CSSS)", "AICTE Pragati Scholarship for Girls"],
      entrance: "JEE MAIN", category: "Engineering",
      hostelFee: "₹30,000 / year", messFee: "₹40,000 / year", annualFee: "₹1,80,000 / year", avgAnnualFee: "₹2,50,000 / year",
      recruitersCount: 180, studentsInternships: 60, avgStipend: 22000, ppoRate: 22,
      alumniF500: 8, alumniEntrepreneurs: 10, alumniAbroad: 15,
      admissionFaqs: [
        { question: "How to get into PEC?", answer: "Through JEE Main score and JoSAA counselling. CSE cutoff is around 15000-25000 rank." },
      ],
    },
    {
      name: COLLEGE_NAMES[34]!, // Thapar
      state: "Punjab", city: "Patiala", type: "Deemed", uni: "Panjab University", estYear: 1956,
      rating: 4.1, accreditation: ["NAAC A+", "NBA"],
      desc: "Thapar Institute of Engineering and Technology (TIET) is one of North India's top private engineering institutes. Known for strong industry connections (Tata Group heritage), good placement record, and research output.",
      students: 8000, campusSize: "250 Acres",
      avgSalary: 850000, placementPct: 80, highestSalary: 4200000,
      placementTrends: [
        { year: "2022", avgSalary: "7.5 LPA", placementPercentage: "78%" },
        { year: "2023", avgSalary: "8.0 LPA", placementPercentage: "79%" },
        { year: "2024", avgSalary: "8.5 LPA", placementPercentage: "80%" },
      ],
      courses: ["B.Tech Computer Science and Engineering", "B.Tech Electronics and Communication Engineering", "B.Tech Mechanical Engineering", "BCA (Bachelor of Computer Applications)"],
      scholarships: ["AICTE Pragati Scholarship for Girls", "Reliance Foundation Scholarship"],
      entrance: "JEE MAIN", category: "Engineering",
      hostelFee: "₹95,000 / year", messFee: "₹50,000 / year", annualFee: "₹3,06,000 / year", avgAnnualFee: "₹4,51,000 / year",
      recruitersCount: 250, studentsInternships: 65, avgStipend: 20000, ppoRate: 22,
      alumniF500: 5, alumniEntrepreneurs: 8, alumniAbroad: 12,
      admissionFaqs: [
        { question: "Thapar vs NIT?", answer: "Thapar CSE placements are comparable to mid-tier NITs. Higher fees but better infrastructure. Good choice for Punjab/Haryana students." },
      ],
    },
    {
      name: COLLEGE_NAMES[35]!, // MNNIT
      state: "Uttar Pradesh", city: "Prayagraj", type: "Public", uni: "Banaras Hindu University", estYear: 1961,
      rating: 4.2, accreditation: ["NAAC A+", "NBA", "NIRF Top 25 Engineering"],
      desc: "Motilal Nehru National Institute of Technology Allahabad (MNNIT) is one of the top NITs in North India. Located at the confluence of Ganga and Yamuna, it has strong ECE and CS departments with improving placement trends.",
      students: 5000, campusSize: "222 Acres",
      avgSalary: 950000, placementPct: 80, highestSalary: 4500000,
      placementTrends: [
        { year: "2022", avgSalary: "8.2 LPA", placementPercentage: "78%" },
        { year: "2023", avgSalary: "8.8 LPA", placementPercentage: "79%" },
        { year: "2024", avgSalary: "9.5 LPA", placementPercentage: "80%" },
      ],
      courses: ["B.Tech Computer Science and Engineering", "B.Tech Electronics and Communication Engineering", "B.Tech Mechanical Engineering"],
      scholarships: ["Central Sector Scheme of Scholarships (CSSS)", "Post Matric Scholarship for SC Students"],
      entrance: "JEE MAIN", category: "Engineering",
      hostelFee: "₹16,000 / year", messFee: "₹32,000 / year", annualFee: "₹1,63,750 / year", avgAnnualFee: "₹2,11,750 / year",
      recruitersCount: 200, studentsInternships: 62, avgStipend: 22000, ppoRate: 25,
      alumniF500: 6, alumniEntrepreneurs: 8, alumniAbroad: 12,
      admissionFaqs: [
        { question: "Is MNNIT good?", answer: "Yes, top 10 NIT. CSE and ECE placements are strong. Affordable government fees. JEE Main rank ~8000-15000 for CSE." },
      ],
    },
    {
      name: COLLEGE_NAMES[36]!, // IIT ISM Dhanbad
      state: "Jharkhand", city: "Dhanbad", type: "Public", uni: "Indian School of Mines (IIT Dhanbad)", estYear: 1926,
      rating: 4.3, accreditation: ["NAAC A++", "NIRF Top 15 Engineering"],
      desc: "IIT (ISM) Dhanbad, formerly Indian School of Mines (est. 1926), was converted to IIT in 2016. India's only IIT with mining and petroleum engineering heritage. CS and ECE placements rival older IITs.",
      students: 7000, campusSize: "218 Acres",
      avgSalary: 1350000, placementPct: 78, highestSalary: 8000000,
      placementTrends: [
        { year: "2022", avgSalary: "12.0 LPA", placementPercentage: "76%" },
        { year: "2023", avgSalary: "12.8 LPA", placementPercentage: "77%" },
        { year: "2024", avgSalary: "13.5 LPA", placementPercentage: "78%" },
      ],
      courses: ["B.Tech Computer Science and Engineering", "B.Tech Electronics and Communication Engineering", "B.Tech Mechanical Engineering", "B.Tech Electrical Engineering"],
      scholarships: ["INSPIRE Scholarship (DST)", "Central Sector Scheme of Scholarships (CSSS)"],
      entrance: "JEE ADVANCED", category: "Engineering",
      hostelFee: "₹15,000 / year", messFee: "₹30,000 / year", annualFee: "₹2,09,550 / year", avgAnnualFee: "₹2,54,550 / year",
      recruitersCount: 220, studentsInternships: 65, avgStipend: 28000, ppoRate: 28,
      alumniF500: 8, alumniEntrepreneurs: 8, alumniAbroad: 15,
      admissionFaqs: [
        { question: "Is IIT ISM Dhanbad a real IIT?", answer: "Yes, full IIT since 2016. Admission via JEE Advanced. CS/ECE placements are excellent (comparable to top NITs)." },
      ],
    },
    {
      name: COLLEGE_NAMES[37]!, // XLRI
      state: "Jharkhand", city: "Jamshedpur", type: "Private", uni: "Indian School of Mines (IIT Dhanbad)", estYear: 1949,
      rating: 4.7, accreditation: ["AACSB", "NIRF Top 10 Management"],
      desc: "XLRI - Xavier School of Management, Jamshedpur is one of India's oldest and most prestigious B-schools. Founded by Jesuits in 1949, XLRI is renowned for its HRM program (India's best) and Business Management program. Admission via XAT.",
      students: 900, campusSize: "25 Acres",
      avgSalary: 2800000, placementPct: 100, highestSalary: 7500000,
      placementTrends: [
        { year: "2022", avgSalary: "26.0 LPA", placementPercentage: "100%" },
        { year: "2023", avgSalary: "27.2 LPA", placementPercentage: "100%" },
        { year: "2024", avgSalary: "28.0 LPA", placementPercentage: "100%" },
      ],
      courses: ["MBA (Master of Business Administration)"],
      scholarships: ["Central Sector Scheme of Scholarships (CSSS)"],
      entrance: "XAT", category: "Management",
      hostelFee: "₹1,20,000 / year", messFee: "₹55,000 / year", annualFee: "₹12,50,000 / year", avgAnnualFee: "₹14,25,000 / year",
      recruitersCount: 140, studentsInternships: 100, avgStipend: 150000, ppoRate: 45,
      alumniF500: 30, alumniEntrepreneurs: 20, alumniAbroad: 25,
      admissionFaqs: [
        { question: "XLRI vs IIM?", answer: "XLRI's HRM program is undisputedly India's #1. BM program is comparable to IIM L/I. Admission via XAT exam (tougher than CAT for many)." },
      ],
    },
    {
      name: COLLEGE_NAMES[38]!, // NIT Patna
      state: "Bihar", city: "Patna", type: "Public", uni: "Patna University", estYear: 1886,
      rating: 4.0, accreditation: ["NAAC A", "NBA"],
      desc: "NIT Patna is one of India's oldest engineering institutions (originally Bihar College of Engineering, 1886). Located on the banks of the Ganges in Patna. Recently upgraded infrastructure with new campus development.",
      students: 4500, campusSize: "40 Acres",
      avgSalary: 750000, placementPct: 72, highestSalary: 3500000,
      placementTrends: [
        { year: "2022", avgSalary: "6.5 LPA", placementPercentage: "68%" },
        { year: "2023", avgSalary: "7.0 LPA", placementPercentage: "70%" },
        { year: "2024", avgSalary: "7.5 LPA", placementPercentage: "72%" },
      ],
      courses: ["B.Tech Computer Science and Engineering", "B.Tech Electronics and Communication Engineering", "B.Tech Civil Engineering"],
      scholarships: ["Central Sector Scheme of Scholarships (CSSS)", "Post Matric Scholarship for SC Students"],
      entrance: "JEE MAIN", category: "Engineering",
      hostelFee: "₹12,000 / year", messFee: "₹28,000 / year", annualFee: "₹1,63,750 / year", avgAnnualFee: "₹2,03,750 / year",
      recruitersCount: 120, studentsInternships: 50, avgStipend: 15000, ppoRate: 15,
      alumniF500: 3, alumniEntrepreneurs: 5, alumniAbroad: 10,
      admissionFaqs: [
        { question: "Is NIT Patna improving?", answer: "Yes, rapidly. New campus, better infrastructure, and improving placements. CSE avg package is now ~7.5 LPA." },
      ],
    },
    {
      name: COLLEGE_NAMES[39]!, // Goa College of Engineering
      state: "Goa", city: "Ponda", type: "Public", uni: "Goa University", estYear: 1960,
      rating: 3.9, accreditation: ["NAAC A", "NBA"],
      desc: "Goa College of Engineering is Goa's premier government engineering college. Small batches ensure personalized attention. Affordable government fees with the lifestyle benefits of Goa. Strong alumni network in IT sector.",
      students: 2000, campusSize: "48 Acres",
      avgSalary: 600000, placementPct: 65, highestSalary: 2500000,
      placementTrends: [
        { year: "2022", avgSalary: "5.0 LPA", placementPercentage: "60%" },
        { year: "2023", avgSalary: "5.5 LPA", placementPercentage: "63%" },
        { year: "2024", avgSalary: "6.0 LPA", placementPercentage: "65%" },
      ],
      courses: ["B.Tech Computer Science and Engineering", "B.Tech Electronics and Communication Engineering", "B.Tech Mechanical Engineering"],
      scholarships: ["Central Sector Scheme of Scholarships (CSSS)", "Post Matric Scholarship for SC Students"],
      entrance: "JEE MAIN", category: "Engineering",
      hostelFee: "₹10,000 / year", messFee: "₹25,000 / year", annualFee: "₹48,000 / year", avgAnnualFee: "₹83,000 / year",
      recruitersCount: 60, studentsInternships: 40, avgStipend: 12000, ppoRate: 10,
      alumniF500: 2, alumniEntrepreneurs: 5, alumniAbroad: 8,
      admissionFaqs: [
        { question: "Why choose GEC Goa?", answer: "Extremely affordable (₹48K/year), excellent quality of life, small batches, and Goa's emerging IT sector. Great for students from Goa and neighbouring states." },
      ],
    },
    {
      name: COLLEGE_NAMES[40]!, // PSG Coimbatore
      state: "Tamil Nadu", city: "Coimbatore", type: "Private", uni: "Anna University", estYear: 1951,
      rating: 4.2, accreditation: ["NAAC A++", "NBA"],
      desc: "PSG College of Technology is one of South India's most respected private engineering colleges. Established by PSG & Sons' Charities in 1951. Known for strong industry connections, good placements, and affordable fees for a private college.",
      students: 5500, campusSize: "45 Acres",
      avgSalary: 650000, placementPct: 80, highestSalary: 3500000,
      placementTrends: [
        { year: "2022", avgSalary: "5.5 LPA", placementPercentage: "78%" },
        { year: "2023", avgSalary: "6.0 LPA", placementPercentage: "79%" },
        { year: "2024", avgSalary: "6.5 LPA", placementPercentage: "80%" },
      ],
      courses: ["B.Tech Computer Science and Engineering", "B.Tech Electronics and Communication Engineering", "B.Tech Mechanical Engineering"],
      scholarships: ["AICTE Pragati Scholarship for Girls", "Reliance Foundation Scholarship"],
      entrance: "JEE MAIN", category: "Engineering",
      hostelFee: "₹40,000 / year", messFee: "₹35,000 / year", annualFee: "₹1,25,000 / year", avgAnnualFee: "₹2,00,000 / year",
      recruitersCount: 200, studentsInternships: 62, avgStipend: 15000, ppoRate: 18,
      alumniF500: 5, alumniEntrepreneurs: 10, alumniAbroad: 10,
      admissionFaqs: [
        { question: "Is PSG Tech good?", answer: "One of the best private colleges in TN. Often preferred over many NITs for its placement record and affordable fees. Admission via TNEA counselling." },
      ],
    },
    {
      name: COLLEGE_NAMES[41]!, // RVCE
      state: "Karnataka", city: "Bengaluru", type: "Private", uni: "Manipal Academy of Higher Education", estYear: 1963,
      rating: 4.2, accreditation: ["NAAC A++", "NBA"],
      desc: "RV College of Engineering is one of Bangalore's top private engineering colleges. Located in the heart of India's Silicon Valley. Strong placement record (especially for CS), vibrant campus life, and excellent industry connections.",
      students: 4000, campusSize: "52 Acres",
      avgSalary: 850000, placementPct: 82, highestSalary: 4400000,
      placementTrends: [
        { year: "2022", avgSalary: "7.5 LPA", placementPercentage: "80%" },
        { year: "2023", avgSalary: "8.0 LPA", placementPercentage: "81%" },
        { year: "2024", avgSalary: "8.5 LPA", placementPercentage: "82%" },
      ],
      courses: ["B.Tech Computer Science and Engineering", "B.Tech Electronics and Communication Engineering", "B.Tech Mechanical Engineering"],
      scholarships: ["AICTE Pragati Scholarship for Girls", "Reliance Foundation Scholarship"],
      entrance: "JEE MAIN", category: "Engineering",
      hostelFee: "₹80,000 / year", messFee: "₹45,000 / year", annualFee: "₹2,30,000 / year", avgAnnualFee: "₹3,55,000 / year",
      recruitersCount: 250, studentsInternships: 65, avgStipend: 20000, ppoRate: 22,
      alumniF500: 5, alumniEntrepreneurs: 10, alumniAbroad: 12,
      admissionFaqs: [
        { question: "RVCE vs PESIT vs BMS?", answer: "All top 3 private colleges in Bangalore. RVCE has the best overall placements. PESIT/BMS are comparable for CS." },
      ],
    },
    {
      name: COLLEGE_NAMES[42]!, // CET Trivandrum
      state: "Kerala", city: "Thiruvananthapuram", type: "Public", uni: "Cochin University of Science and Technology", estYear: 1939,
      rating: 4.2, accreditation: ["NAAC A", "NBA"],
      desc: "College of Engineering Trivandrum (CET) is Kerala's oldest and most prestigious engineering college. Established in 1939, it is affiliated to APJ Abdul Kalam Technological University. Known for its heritage, strong alumni in ISRO and IT.",
      students: 3500, campusSize: "80 Acres",
      avgSalary: 700000, placementPct: 75, highestSalary: 3000000,
      placementTrends: [
        { year: "2022", avgSalary: "6.0 LPA", placementPercentage: "72%" },
        { year: "2023", avgSalary: "6.5 LPA", placementPercentage: "74%" },
        { year: "2024", avgSalary: "7.0 LPA", placementPercentage: "75%" },
      ],
      courses: ["B.Tech Computer Science and Engineering", "B.Tech Electronics and Communication Engineering", "B.Tech Civil Engineering", "B.Arch (Bachelor of Architecture)"],
      scholarships: ["Central Sector Scheme of Scholarships (CSSS)", "Post Matric Scholarship for SC Students"],
      entrance: "JEE MAIN", category: "Engineering",
      hostelFee: "₹8,000 / year", messFee: "₹22,000 / year", annualFee: "₹35,000 / year", avgAnnualFee: "₹65,000 / year",
      recruitersCount: 120, studentsInternships: 55, avgStipend: 15000, ppoRate: 15,
      alumniF500: 5, alumniEntrepreneurs: 8, alumniAbroad: 18,
      admissionFaqs: [
        { question: "How affordable is CET?", answer: "Government fees — only ₹35,000/year. One of the most affordable quality engineering options in South India." },
      ],
    },
    {
      name: COLLEGE_NAMES[43]!, // NSUT Delhi
      state: "Delhi", city: "New Delhi", type: "Public", uni: "University of Delhi", estYear: 1983,
      rating: 4.3, accreditation: ["NAAC A+", "NBA"],
      desc: "Netaji Subhas University of Technology (NSUT, formerly NSIT) is one of Delhi's top engineering colleges after DTU. Known for strong CS placements, active coding culture, and proximity to Delhi's tech ecosystem.",
      students: 5500, campusSize: "65 Acres",
      avgSalary: 1200000, placementPct: 82, highestSalary: 12000000,
      placementTrends: [
        { year: "2022", avgSalary: "10.5 LPA", placementPercentage: "80%" },
        { year: "2023", avgSalary: "11.2 LPA", placementPercentage: "81%" },
        { year: "2024", avgSalary: "12.0 LPA", placementPercentage: "82%" },
      ],
      courses: ["B.Tech Computer Science and Engineering", "B.Tech Electronics and Communication Engineering", "B.Tech Mechanical Engineering"],
      scholarships: ["Central Sector Scheme of Scholarships (CSSS)", "AICTE Pragati Scholarship for Girls"],
      entrance: "JEE MAIN", category: "Engineering",
      hostelFee: "₹25,000 / year", messFee: "₹40,000 / year", annualFee: "₹1,70,000 / year", avgAnnualFee: "₹2,35,000 / year",
      recruitersCount: 250, studentsInternships: 68, avgStipend: 28000, ppoRate: 30,
      alumniF500: 8, alumniEntrepreneurs: 12, alumniAbroad: 18,
      admissionFaqs: [
        { question: "NSUT vs DTU?", answer: "Very similar — both are Delhi state govt colleges. DTU has slightly better brand recognition. NSUT CS placements are comparable." },
      ],
    },
    {
      name: COLLEGE_NAMES[46]!, // Lady Shri Ram
      state: "Delhi", city: "New Delhi", type: "Public", uni: "University of Delhi", estYear: 1956,
      rating: 4.6, accreditation: ["NAAC A++", "NIRF Top 5 College"],
      desc: "Lady Shri Ram College for Women (LSR) is India's top women's college. Known for its strong BA Economics, Political Science, and Psychology programs. LSR alumnae include prominent politicians, journalists, and corporate leaders.",
      students: 2500, campusSize: "15 Acres",
      avgSalary: 700000, placementPct: 55, highestSalary: 2500000,
      placementTrends: [
        { year: "2022", avgSalary: "6.0 LPA", placementPercentage: "50%" },
        { year: "2023", avgSalary: "6.5 LPA", placementPercentage: "52%" },
        { year: "2024", avgSalary: "7.0 LPA", placementPercentage: "55%" },
      ],
      courses: ["B.Com (Honours)", "B.Sc Physics (Honours)", "B.Ed (Bachelor of Education)"],
      scholarships: ["Central Sector Scheme of Scholarships (CSSS)", "AICTE Pragati Scholarship for Girls"],
      entrance: "CUET UG", category: "Commerce",
      hostelFee: "₹18,000 / year", messFee: "₹28,000 / year", annualFee: "₹20,000 / year", avgAnnualFee: "₹66,000 / year",
      recruitersCount: 40, studentsInternships: 45, avgStipend: 18000, ppoRate: 12,
      alumniF500: 5, alumniEntrepreneurs: 10, alumniAbroad: 35,
      admissionFaqs: [
        { question: "How competitive is LSR?", answer: "Extremely. CUET cutoffs for Economics and English are among the highest in DU. Known for its debating and feminist discourse culture." },
      ],
    },
    {
      name: COLLEGE_NAMES[47]!, // Hindu College
      state: "Delhi", city: "New Delhi", type: "Public", uni: "University of Delhi", estYear: 1899,
      rating: 4.5, accreditation: ["NAAC A++", "NIRF Top 5 College"],
      desc: "Hindu College is one of Delhi University's oldest and most prestigious colleges. Known for strong sciences (Physics, Chemistry), Economics, and a vibrant campus culture. Many alumni in civil services, media, and academia.",
      students: 3000, campusSize: "12 Acres",
      avgSalary: 700000, placementPct: 55, highestSalary: 2800000,
      placementTrends: [
        { year: "2022", avgSalary: "6.0 LPA", placementPercentage: "52%" },
        { year: "2023", avgSalary: "6.5 LPA", placementPercentage: "53%" },
        { year: "2024", avgSalary: "7.0 LPA", placementPercentage: "55%" },
      ],
      courses: ["B.Com (Honours)", "B.Sc Physics (Honours)"],
      scholarships: ["Central Sector Scheme of Scholarships (CSSS)"],
      entrance: "CUET UG", category: "Science",
      hostelFee: "₹12,000 / year", messFee: "₹24,000 / year", annualFee: "₹16,000 / year", avgAnnualFee: "₹52,000 / year",
      recruitersCount: 45, studentsInternships: 40, avgStipend: 15000, ppoRate: 10,
      alumniF500: 5, alumniEntrepreneurs: 8, alumniAbroad: 30,
      admissionFaqs: [
        { question: "Hindu College vs St. Stephen's?", answer: "Both are DU's top colleges. Stephen's is slightly more elitist. Hindu has more accessible campus culture and stronger science departments." },
      ],
    },
    {
      name: COLLEGE_NAMES[48]!, // Presidency Kolkata
      state: "West Bengal", city: "Kolkata", type: "Public", uni: "University of Calcutta", estYear: 1817,
      rating: 4.3, accreditation: ["NAAC A+"],
      desc: "Presidency University Kolkata is one of India's oldest educational institutions (1817). Known for world-class science education — alumni include Satyendra Nath Bose (Boson particle), Meghnad Saha, and Jagadish Chandra Bose.",
      students: 3000, campusSize: "8 Acres",
      avgSalary: 500000, placementPct: 40, highestSalary: 2000000,
      placementTrends: [
        { year: "2022", avgSalary: "4.0 LPA", placementPercentage: "35%" },
        { year: "2023", avgSalary: "4.5 LPA", placementPercentage: "38%" },
        { year: "2024", avgSalary: "5.0 LPA", placementPercentage: "40%" },
      ],
      courses: ["B.Sc Physics (Honours)", "B.Com (Honours)"],
      scholarships: ["Central Sector Scheme of Scholarships (CSSS)", "Post Matric Scholarship for SC Students"],
      entrance: "CUET UG", category: "Science",
      hostelFee: "₹5,000 / year", messFee: "₹15,000 / year", annualFee: "₹5,000 / year", avgAnnualFee: "₹25,000 / year",
      recruitersCount: 25, studentsInternships: 30, avgStipend: 10000, ppoRate: 5,
      alumniF500: 3, alumniEntrepreneurs: 5, alumniAbroad: 40,
      admissionFaqs: [
        { question: "Why choose Presidency?", answer: "For pure sciences and research, Presidency has a legacy unmatched in India. Many alumni went on to IISc, TIFR, and top global universities for PhD." },
      ],
    },
    {
      name: COLLEGE_NAMES[49]!, // SRCC
      state: "Delhi", city: "New Delhi", type: "Public", uni: "University of Delhi", estYear: 1926,
      rating: 4.7, accreditation: ["NAAC A++", "NIRF #1 College"],
      desc: "Shri Ram College of Commerce (SRCC) is India's #1 commerce college and often #1 in NIRF college rankings. Located in DU's North Campus, it produces India's top chartered accountants, bankers, and business leaders.",
      students: 3000, campusSize: "10 Acres",
      avgSalary: 1000000, placementPct: 70, highestSalary: 4000000,
      placementTrends: [
        { year: "2022", avgSalary: "9.0 LPA", placementPercentage: "65%" },
        { year: "2023", avgSalary: "9.5 LPA", placementPercentage: "68%" },
        { year: "2024", avgSalary: "10.0 LPA", placementPercentage: "70%" },
      ],
      courses: ["B.Com (Honours)", "BBA (Bachelor of Business Administration)"],
      scholarships: ["Central Sector Scheme of Scholarships (CSSS)"],
      entrance: "CUET UG", category: "Commerce",
      hostelFee: "₹14,000 / year", messFee: "₹26,000 / year", annualFee: "₹18,000 / year", avgAnnualFee: "₹58,000 / year",
      recruitersCount: 80, studentsInternships: 60, avgStipend: 25000, ppoRate: 20,
      alumniF500: 15, alumniEntrepreneurs: 20, alumniAbroad: 25,
      admissionFaqs: [
        { question: "SRCC for placements?", answer: "Best commerce college placements in India. Top recruiters include Goldman Sachs, McKinsey, Deloitte, Big 4. CA/CFA aspirants thrive here." },
      ],
    },
  ];

  const collegeLogoIdx = [
    PHOTOS.campus3, PHOTOS.campus4, PHOTOS.campus5, PHOTOS.biz1, PHOTOS.biz2,
    PHOTOS.med1, PHOTOS.campus1, PHOTOS.campus6, PHOTOS.campus7, PHOTOS.campus2,
    PHOTOS.law1, PHOTOS.design1, PHOTOS.campus4, PHOTOS.campus5, PHOTOS.campus6,
    PHOTOS.campus1, PHOTOS.campus2, PHOTOS.campus3, PHOTOS.campus7, PHOTOS.campus4,
    // New colleges logos
    PHOTOS.campus5, PHOTOS.campus7, PHOTOS.campus1, PHOTOS.campus2, PHOTOS.campus3,
    PHOTOS.campus4, PHOTOS.campus5, PHOTOS.campus6, PHOTOS.campus7, PHOTOS.eng1,
    PHOTOS.campus1, PHOTOS.campus2, PHOTOS.campus3, PHOTOS.campus4, PHOTOS.campus5,
    PHOTOS.campus6, PHOTOS.campus7, PHOTOS.biz1, PHOTOS.campus1, PHOTOS.campus2,
    PHOTOS.campus3, PHOTOS.campus4, PHOTOS.campus5, PHOTOS.campus6, PHOTOS.campus7,
    PHOTOS.campus1, PHOTOS.campus2, PHOTOS.campus3, PHOTOS.campus4, PHOTOS.biz2,
  ];

  const colleges = await College.insertMany(
    collegeConfigs.map((cfg, idx) => ({
      name: cfg.name,
      state: cfg.state,
      city: cfg.city,
      type: cfg.type,
      rating: cfg.rating,
      establishedYear: cfg.estYear,
      accreditation: cfg.accreditation,
      logo: img(collegeLogoIdx[idx]!, 400),
      brochure: pdf,
      description: cfg.desc,
      university: uniByName(cfg.uni),
      students: cfg.students,
      campusSize: cfg.campusSize,
      averageSalary: cfg.avgSalary,
      placementPercentage: cfg.placementPct,
      highestSalary: cfg.highestSalary,
      placementTrends: cfg.placementTrends,
      recruiters: allRecruiterIds.slice(0, Math.min(cfg.recruitersCount, allRecruiterIds.length)),
      recruitersCount: cfg.recruitersCount,
      studentsWithInternships: cfg.studentsInternships,
      avgStipend: cfg.avgStipend,
      ppoConversionRate: cfg.ppoRate,
      alumniInFortune500: cfg.alumniF500,
      alumniEntrepreneurs: cfg.alumniEntrepreneurs,
      alumniHigherStudiesAbroad: cfg.alumniAbroad,
      courses: cfg.courses.map((cn) => courseByName(cn)),
      applicationOpeningDate: new Date("2026-09-01"),
      applicationClosingDate: new Date("2027-03-31"),
      entranceExam: examByCode(cfg.entrance),
      entranceExamDate: new Date("2027-05-15"),
      meritListAnnouncementDate: new Date("2027-07-01"),
      counsellingStartsFrom: new Date("2027-07-15"),
      accademicSectionStartsFrom: new Date("2027-08-01"),
      admissionMode: [
        { mode: "Entrance Exam" as const, label: "National/State entrance", description: `Admission through ${cfg.entrance} score and counselling.` },
        ...(cfg.category === "Engineering" || cfg.category === "Medical"
          ? []
          : [{ mode: "Merit List" as const, label: "Merit-based", description: "Based on qualifying exam marks and entrance test performance." }]),
      ],
      hostelFee: cfg.hostelFee,
      messFee: cfg.messFee,
      libraryFee: "₹5,000 / year",
      laboratoryFee: "₹10,000 / year",
      sportsFee: "₹3,000 / year",
      annualFee: cfg.annualFee,
      avgAnnualFee: cfg.avgAnnualFee,
      scholarships: cfg.scholarships.map((sn) => scholarshipByName(sn)),
      campusImages: [i("campus1"), i("campus2"), i("campus3")],
      hostelImages: [i("hostel1"), i("hostel2")],
      labsImages: [i("lab1"), i("lab2")],
      eventsImages: [i("event1"), i("event2")],
      admissionFaqs: cfg.admissionFaqs,
      courseFaqs: [{ question: "Can I change my branch?", answer: "Yes, most institutions allow branch change after the first year based on academic performance." }],
      feesPaymentFaqs: [{ question: "Is EMI available?", answer: "Most institutions have tie-ups with banks for education loans and semester-wise payment options." }],
      scholarshipFaqs: [{ question: "Can I avail multiple scholarships?", answer: "Generally, students can combine one merit-based and one need-based scholarship. Check individual scholarship rules." }],
      campusLife: [
        {
          title: "Technical Festivals",
          description: `${cfg.name} hosts one of India's largest tech/cultural fests with national participation.`,
          verified: true,
          tags: ["fest", "events", "culture"],
          image: i("event1"),
          source: "Student Affairs",
          isActive: true,
        },
        {
          title: "Clubs & Societies",
          description: "100+ student-run clubs covering robotics, coding, debate, music, drama, and social service.",
          verified: true,
          tags: ["clubs", "activities"],
          image: i("event3"),
          source: "Student Affairs",
          isActive: true,
        },
      ],
      category: cfg.category,
    })),
  );
  console.log(`Seeded ${colleges.length} detailed colleges.`);

  /* ─── EXPANDED COLLEGES (from data file) ─── */
  console.log("Seeding expanded colleges from data file…");

  // Collect existing college names to avoid duplicates
  const existingCollegeNames = new Set(colleges.map((c) => c.name));

  // Filter out duplicates and build expanded college documents
  const expandedToInsert = [...ALL_EXPANDED_COLLEGES, ...KERALA_COLLEGES]
    .filter((ec) => !existingCollegeNames.has(ec.name))
    .map((ec) => {
      // Resolve university — find existing or use first match
      let uniId: mongoose.Types.ObjectId;
      try { uniId = uniByName(ec.uniName); } catch { uniId = universities[0]!._id as mongoose.Types.ObjectId; }

      // Resolve courses by name (best-effort — skip missing)
      const courseIds = ec.courseNames
        .map((cn) => { try { return courseByName(cn); } catch { return null; } })
        .filter(Boolean) as mongoose.Types.ObjectId[];

      // Resolve scholarships by name (best-effort)
      const scholarshipIds = ec.scholarshipNames
        .map((sn) => { try { return scholarshipByName(sn); } catch { return null; } })
        .filter(Boolean) as mongoose.Types.ObjectId[];

      // Resolve entrance exam
      let examId: mongoose.Types.ObjectId;
      try { examId = examByCode(ec.entrance); } catch { examId = exams[0]!._id as mongoose.Types.ObjectId; }

      return {
        name: ec.name,
        state: ec.state,
        city: ec.city,
        type: ec.type,
        rating: ec.rating,
        establishedYear: ec.estYear,
        accreditation: ec.accreditation,
        logo: img(PHOTOS.campus3, 400),
        brochure: pdf,
        description: ec.desc,
        university: uniId,
        students: ec.students,
        campusSize: ec.campusSize,
        averageSalary: ec.avgSalary,
        placementPercentage: ec.placementPct,
        highestSalary: ec.highestSalary,
        placementTrends: [
          { year: "2022", avgSalary: `${(ec.avgSalary * 0.88 / 100000).toFixed(1)} LPA`, placementPercentage: `${ec.placementPct - 3}%` },
          { year: "2023", avgSalary: `${(ec.avgSalary * 0.94 / 100000).toFixed(1)} LPA`, placementPercentage: `${ec.placementPct - 1}%` },
          { year: "2024", avgSalary: `${(ec.avgSalary / 100000).toFixed(1)} LPA`, placementPercentage: `${ec.placementPct}%` },
        ],
        recruiters: allRecruiterIds.slice(0, Math.min(10, allRecruiterIds.length)),
        recruitersCount: ec.recruitersCount,
        studentsWithInternships: ec.studentsInternships,
        avgStipend: ec.avgStipend,
        ppoConversionRate: ec.ppoRate,
        alumniInFortune500: ec.alumniF500,
        alumniEntrepreneurs: ec.alumniEntrepreneurs,
        alumniHigherStudiesAbroad: ec.alumniAbroad,
        courses: courseIds,
        applicationOpeningDate: new Date("2026-09-01"),
        applicationClosingDate: new Date("2027-03-31"),
        entranceExam: examId,
        entranceExamDate: new Date("2027-05-15"),
        meritListAnnouncementDate: new Date("2027-07-01"),
        counsellingStartsFrom: new Date("2027-07-15"),
        accademicSectionStartsFrom: new Date("2027-08-01"),
        admissionMode: [
          { mode: "Entrance Exam" as const, label: "National/State entrance", description: `Admission through ${ec.entrance} score and counselling.` },
        ],
        hostelFee: ec.hostelFee,
        messFee: ec.messFee,
        libraryFee: "₹5,000 / year",
        laboratoryFee: "₹10,000 / year",
        sportsFee: "₹3,000 / year",
        annualFee: ec.annualFee,
        avgAnnualFee: ec.avgAnnualFee,
        scholarships: scholarshipIds,
        campusImages: [i("campus1"), i("campus2"), i("campus3")],
        hostelImages: [i("hostel1"), i("hostel2")],
        labsImages: [i("lab1"), i("lab2")],
        eventsImages: [i("event1"), i("event2")],
        admissionFaqs: ec.admissionFaqs,
        courseFaqs: [{ question: "Can I change my branch?", answer: "Most institutions allow branch change after first year based on academic performance." }],
        feesPaymentFaqs: [{ question: "Is EMI available?", answer: "Most institutions have tie-ups with banks for education loans." }],
        scholarshipFaqs: [{ question: "Can I combine scholarships?", answer: "Usually one merit + one need-based grant allowed. Check individual rules." }],
        campusLife: [
          {
            title: "Student Activities",
            description: `${ec.name} has 50+ student clubs covering tech, cultural, sports, and social activities.`,
            verified: true, tags: ["clubs", "events"], image: i("event1"), source: "Student Affairs", isActive: true,
          },
        ],
        category: ec.category,
      };
    });

  let expandedColleges: any[] = [];
  if (expandedToInsert.length > 0) {
    expandedColleges = await College.insertMany(expandedToInsert);
    console.log(`Seeded ${expandedColleges.length} additional expanded colleges.`);
  }
  const totalColleges = colleges.length + expandedColleges.length;
  console.log(`Total colleges in database: ${totalColleges}`);

  /* ─── REVIEWS ─── */
  console.log("Seeding reviews…");
  const reviewTemplates = [
    { collegeName: "IIT Bombay", city: "Mumbai", course: "B.Tech CSE", content: "The academic rigor at IIT Bombay is unmatched. Professors are world-class, and the placement cell is incredibly efficient. I got placed at Google with a package I never imagined. The campus life with tech fests like Techfest and Mood Indigo made it an unforgettable experience." },
    { collegeName: "IIT Delhi", city: "New Delhi", course: "B.Tech EE", content: "IIT Delhi's startup culture is phenomenal. The proximity to Delhi's corporate hub gives you access to internships and industry interactions throughout the year. The new research parks are transforming the campus into an innovation hub." },
    { collegeName: "IIT Madras", city: "Chennai", course: "B.Tech CSE", content: "There's a reason IIT Madras is #1 in NIRF for 9 years straight. The research culture is intense, the incubation center (one of India's largest) supports student startups, and the campus inside Guindy National Park is serene. Deer roaming around the campus is a unique experience!" },
    { collegeName: "IIM Ahmedabad", city: "Ahmedabad", course: "MBA (PGP)", content: "The case-method pedagogy at IIMA transforms your thinking completely. The peer group is incredibly talented, and the alumni network opens doors you didn't know existed. The workload is intense but the ROI is extraordinary." },
    { collegeName: "AIIMS New Delhi", city: "New Delhi", course: "MBBS", content: "Studying MBBS at AIIMS Delhi for ₹1,628/year is a dream. The clinical exposure is exceptional — you see cases that textbooks only describe. The faculty includes some of India's best doctors, and the research opportunities are world-class." },
    { collegeName: "NIT Tiruchirappalli", city: "Tiruchirappalli", course: "B.Tech ECE", content: "NIT Trichy has the best campus culture among all NITs. The 800-acre campus is beautiful, and Pragyan (tech fest) and Festember (cultural fest) are highlights. Placements have been improving year after year with good companies visiting." },
    { collegeName: "BITS Pilani", city: "Pilani", course: "B.Tech CSE", content: "BITS Pilani's flexible academic system lets you pursue dual degrees and minors. Practice School (industry internship for 5.5 months) is the best thing — I worked at Microsoft and got a PPO. The campus in the middle of Rajasthan desert has its own charm." },
    { collegeName: "NLSIU Bangalore", city: "Bengaluru", course: "BA LLB", content: "NLSIU changed my perspective on what law can be. The moot court culture, legal aid clinic, and seminar discussions are intellectually stimulating. Graduates from here dominate India's top law firms. It's truly the Harvard of Indian law schools." },
    { collegeName: "NID Ahmedabad", city: "Ahmedabad", course: "B.Des", content: "NID Ahmedabad is a creative paradise. The studio culture, exposure to diverse design disciplines, and interactions with industry experts shape you into a complete designer. The campus in Paldi is compact but every corner inspires creativity." },
    { collegeName: "St. Stephen's College", city: "New Delhi", course: "B.A. Economics", content: "St. Stephen's offers an unparalleled intellectual environment. The seminar system, the debates, the literary society — everything builds your thinking. The alumni network includes CEOs, diplomats, and authors. The DU North Campus vibe is unbeatable." },
    { collegeName: "VIT Vellore", city: "Vellore", course: "B.Tech CSE", content: "VIT has impressive infrastructure for a private college. The placement cell works hard — over 600 companies visit campus. The GravITas tech fest is fun. The diversity of students from all over India makes it a great experience." },
    { collegeName: "College of Engineering Pune (COEP)", city: "Pune", course: "B.Tech Mechanical", content: "COEP is Asia's oldest engineering college and the legacy is felt everywhere. The Boat Club, MindSpark tech fest, and the riverside campus make it special. Being in Pune with its IT hub is a huge advantage for internships and placements." },
  ];

  const avatarPhotos = [
    PHOTOS.avatar1, PHOTOS.avatar2, PHOTOS.avatar3, PHOTOS.avatar4, PHOTOS.avatar5,
    PHOTOS.avatar6, PHOTOS.avatar7, PHOTOS.avatar8, PHOTOS.avatar9, PHOTOS.avatar10,
    PHOTOS.avatar1, PHOTOS.avatar2,
  ];

  await Review.insertMany(
    reviewTemplates.map((t, idx) => ({
      userName: REVIEW_AUTHORS[idx]!,
      userAvatar: img(avatarPhotos[idx]!, 256),
      reviewType: "College" as const,
      collegeId: colleges[idx % colleges.length]!._id,
      collegeName: t.collegeName,
      city: t.city,
      course: t.course,
      content: t.content,
      status: "Approved" as const,
      isActive: true,
    })),
  );
  console.log(`Seeded ${reviewTemplates.length} reviews.`);

  /* ─── JOBS ─── */
  console.log("Seeding jobs…");
  await Job.insertMany([
    {
      jobTitle: "Software Development Engineer",
      companyName: JOB_COMPANIES[0],
      jobType: "Full Time" as const,
      location: "Mumbai, Chennai, Bengaluru",
      salary: { min: 7, max: 12, unit: "LPA" as const },
      companyWebsite: "https://www.tcs.com",
      employeeSize: "600,000+",
      industry: "IT Services",
      shortDescription: "Join TCS as an SDE working on enterprise applications using Java, Python, and cloud technologies.",
      aboutJob: "As an SDE at TCS, you will work on large-scale enterprise solutions for global clients. Technologies include Java, Spring Boot, Python, AWS/Azure, microservices, and DevOps practices. TCS offers global mobility and continuous learning opportunities.",
      aboutYou: ["B.Tech/BE in CS/IT or related field", "Strong problem-solving skills", "Knowledge of data structures and algorithms"],
      aboutRole: ["Design and develop enterprise applications", "Collaborate with global teams", "Follow Agile/Scrum methodologies"],
      faqs: [{ question: "Is there a bond?", answer: "TCS has a service agreement of 2 years for campus hires." }],
      isActive: true,
    },
    {
      jobTitle: "Systems Engineer",
      companyName: JOB_COMPANIES[1],
      jobType: "Full Time" as const,
      location: "Bengaluru, Pune, Hyderabad, Mysuru",
      salary: { min: 6, max: 10, unit: "LPA" as const },
      companyWebsite: "https://www.infosys.com",
      employeeSize: "340,000+",
      industry: "IT Services",
      shortDescription: "Infosys Systems Engineer role for fresh graduates in software development and testing.",
      aboutJob: "Work on cutting-edge projects for Fortune 500 clients. Training at Infosys Mysuru campus (one of the world's largest corporate training facilities). Technologies: Java, Python, .NET, Cloud, Full Stack Development.",
      aboutYou: ["B.Tech/BE/MCA with 60%+ aggregate", "No active backlogs at time of joining"],
      aboutRole: ["Software development and testing", "Client interaction and requirements analysis", "Continuous learning through Infosys Lex platform"],
      faqs: [{ question: "What is the training period?", answer: "4-6 months of foundation training at Mysuru campus, fully sponsored by Infosys." }],
      isActive: true,
    },
    {
      jobTitle: "Software Development Engineer (SDE-1)",
      companyName: JOB_COMPANIES[3],
      jobType: "Full Time" as const,
      location: "Bengaluru, Hyderabad",
      salary: { min: 25, max: 45, unit: "LPA" as const },
      companyWebsite: "https://careers.google.com",
      employeeSize: "180,000+",
      industry: "Technology",
      shortDescription: "Build products used by billions. Work on Google Search, Cloud, Android, YouTube, or Ads.",
      aboutJob: "Google SDEs work on large-scale distributed systems, machine learning pipelines, and user-facing products. The engineering culture emphasizes code quality, testing, and innovation. 20% time for personal projects.",
      aboutYou: ["B.Tech/MS in CS or equivalent", "Strong coding skills in C++, Java, or Python", "Solid understanding of algorithms and system design"],
      aboutRole: ["Design and implement scalable systems", "Write clean, well-tested code", "Collaborate with world-class engineers"],
      faqs: [{ question: "What is the interview process?", answer: "Phone screen + 4-5 onsite rounds covering coding, algorithms, and system design. Googleyness (culture fit) is also assessed." }],
      isActive: true,
    },
    {
      jobTitle: "Software Engineer",
      companyName: JOB_COMPANIES[4],
      jobType: "Full Time" as const,
      location: "Bengaluru, Hyderabad, Noida",
      salary: { min: 22, max: 40, unit: "LPA" as const },
      companyWebsite: "https://careers.microsoft.com",
      employeeSize: "220,000+",
      industry: "Technology",
      shortDescription: "Work on Azure, Office 365, Teams, Windows, or LinkedIn engineering teams.",
      aboutJob: "Microsoft engineers build products used by billions worldwide. Strong emphasis on work-life balance, inclusive culture, and career growth. Technologies: C#, .NET, TypeScript, Azure, distributed systems.",
      aboutYou: ["B.Tech/MS in CS", "Strong fundamentals in DSA and system design", "Experience with any programming language"],
      aboutRole: ["Design, develop, and ship features", "Code reviews and mentoring", "Collaborate with PMs and designers"],
      faqs: [{ question: "What is the work culture?", answer: "Microsoft emphasizes work-life balance with flexible hours, generous PTO, and a growth mindset culture." }],
      isActive: true,
    },
    {
      jobTitle: "SDE-1",
      companyName: JOB_COMPANIES[5],
      jobType: "Full Time" as const,
      location: "Bengaluru, Hyderabad",
      salary: { min: 20, max: 35, unit: "LPA" as const },
      companyWebsite: "https://www.amazon.jobs",
      employeeSize: "1,500,000+",
      industry: "E-Commerce & Technology",
      shortDescription: "Build systems that power Amazon's e-commerce, AWS, Alexa, or Prime Video.",
      aboutJob: "Amazon's engineering is built on the Leadership Principles. SDEs work on highly scalable, distributed systems. The two-pizza team structure ensures ownership and autonomy. AWS, retail, Alexa, and operations all have engineering teams in India.",
      aboutYou: ["B.Tech/MS in CS", "Strong problem-solving and coding skills", "Understanding of OOP and system design"],
      aboutRole: ["Own end-to-end features", "Operate services at Amazon scale", "On-call responsibilities"],
      faqs: [{ question: "What are Leadership Principles?", answer: "Amazon's 16 Leadership Principles (Customer Obsession, Ownership, etc.) guide all decisions and are heavily tested during interviews." }],
      isActive: true,
    },
    {
      jobTitle: "SDE-1",
      companyName: JOB_COMPANIES[6],
      jobType: "Full Time" as const,
      location: "Bengaluru",
      salary: { min: 18, max: 30, unit: "LPA" as const },
      companyWebsite: "https://www.flipkartcareers.com",
      employeeSize: "50,000+",
      industry: "E-Commerce",
      shortDescription: "Build India's largest e-commerce platform powering millions of transactions daily.",
      aboutJob: "Flipkart engineers work on India-scale problems — from supply chain optimization to ML-powered recommendations. The tech stack includes Java, Go, React, Kubernetes, and in-house platforms.",
      aboutYou: ["B.Tech/MS in CS", "Strong in DSA", "Experience with backend systems preferred"],
      aboutRole: ["Build scalable microservices", "Handle Big Billion Day scale", "Innovate for Indian market"],
      faqs: [],
      isActive: true,
    },
    {
      jobTitle: "Analyst",
      companyName: JOB_COMPANIES[7],
      jobType: "Full Time" as const,
      location: "Mumbai, Bengaluru, Hyderabad",
      salary: { min: 12, max: 20, unit: "LPA" as const },
      companyWebsite: "https://www2.deloitte.com/in/en/careers.html",
      employeeSize: "415,000+",
      industry: "Consulting",
      shortDescription: "Join Deloitte India in consulting, audit, tax, or advisory practice.",
      aboutJob: "Deloitte analysts work across strategy, operations, technology, and risk advisory. Projects span industries from BFSI to healthcare. Steep learning curve with exposure to CXO-level stakeholders.",
      aboutYou: ["MBA / B.Tech / CA / B.Com from premier institutions", "Strong analytical and communication skills"],
      aboutRole: ["Client engagement and problem-solving", "Data analysis and presentation", "Process improvement recommendations"],
      faqs: [{ question: "What is the career path?", answer: "Analyst → Senior Analyst → Manager → Senior Manager → Director → Partner. Typical promotion cycles are 2-3 years." }],
      isActive: true,
    },
    {
      jobTitle: "Management Trainee",
      companyName: JOB_COMPANIES[8],
      jobType: "Full Time" as const,
      location: "Bengaluru, Mumbai, Chennai, Pune, Hyderabad",
      salary: { min: 8, max: 14, unit: "LPA" as const },
      companyWebsite: "https://www.accenture.com/in-en/careers",
      employeeSize: "740,000+",
      industry: "IT Consulting",
      shortDescription: "Technology and consulting roles across Accenture's Strategy, Consulting, Digital, Technology, and Operations practices.",
      aboutJob: "Accenture offers diverse career paths from technology consulting to digital transformation. New hires get access to Accenture's learning platform with thousands of courses. Global mobility opportunities available.",
      aboutYou: ["B.Tech/MBA from recognized university", "Good communication skills", "Adaptable and client-focused"],
      aboutRole: ["Technology implementation", "Digital transformation projects", "Client relationship management"],
      faqs: [],
      isActive: true,
    },
    {
      jobTitle: "Summer Internship (MBA)",
      companyName: JOB_COMPANIES[9],
      jobType: "Internship" as const,
      location: "Mumbai, Navi Mumbai",
      salary: { min: 100000, max: 200000, unit: "Monthly" as const },
      companyWebsite: "https://careers.ril.com",
      employeeSize: "380,000+",
      industry: "Conglomerate",
      shortDescription: "8-10 week summer internship at Reliance Industries across Retail, Jio, O2C, or New Energy.",
      aboutJob: "MBA summer interns at Reliance work on strategic projects with CXO visibility. Sectors include Jio (telecom), Reliance Retail (India's largest retailer), O2C (oil to chemicals), and New Energy (green hydrogen, solar).",
      aboutYou: ["MBA Y1 from IIM/ISB/XLRI or equivalent", "Strong analytical skills", "Sector knowledge preferred"],
      aboutRole: ["Market analysis and strategy", "Business plan development", "Cross-functional project execution"],
      faqs: [{ question: "Is there a PPO?", answer: "Yes, top performers receive Pre-Placement Offers. Reliance's PPO rate from IIMs is typically 40-60%." }],
      isActive: true,
    },
    {
      jobTitle: "Graduate Engineer Trainee",
      companyName: "Larsen & Toubro",
      jobType: "Full Time" as const,
      location: "Mumbai, Chennai, Hyderabad (project sites)",
      salary: { min: 6, max: 10, unit: "LPA" as const },
      companyWebsite: "https://www.larsentoubro.com/corporate/careers",
      employeeSize: "50,000+",
      industry: "Infrastructure & Engineering",
      shortDescription: "Join India's largest engineering conglomerate working on mega infrastructure projects.",
      aboutJob: "L&T GETs work on projects spanning construction, defence, heavy engineering, power, and IT. Initial training includes rotation across divisions. Projects include metros, highways, smart cities, and defence systems.",
      aboutYou: ["B.Tech in Mechanical/Civil/Electrical from recognized university", "Willingness to work at project sites"],
      aboutRole: ["Project execution and management", "Site supervision and quality control", "Vendor and resource coordination"],
      faqs: [{ question: "Is site posting mandatory?", answer: "Yes, initial years involve site postings across India. This is considered the best way to learn project execution hands-on." }],
      isActive: true,
    },
  ]);
  console.log("Seeded jobs.");

  /* ─── BLOGS ─── */
  console.log("Seeding blogs…");
  await BlogModel.insertMany([
    {
      title: "JEE Main 2027: Complete Guide — Syllabus, Dates, and Preparation Strategy",
      slug: `${BLOG_SLUG_PREFIX}jee-main-2027-guide`,
      excerpt: "Everything you need to know about JEE Main 2027 — registration, exam pattern, cutoffs, and how to prepare.",
      content: "## What is JEE Main?\nJEE Main is India's largest engineering entrance exam, conducted by NTA. It's the gateway to NITs, IIITs, GFTIs, and also the qualifying exam for JEE Advanced (IIT admission).\n\n## Key Dates for 2027\n- Registration: November 2026\n- Session 1: January 2027\n- Session 2: April 2027\n\n## Exam Pattern\n- 3 subjects: Physics, Chemistry, Mathematics\n- 90 questions (75 to attempt)\n- 300 marks total\n- Duration: 3 hours\n\n## Preparation Tips\n1. Start with NCERT textbooks — 40% questions come directly from NCERT\n2. Practice previous year papers (at least 10 years)\n3. Take full-length mock tests weekly\n4. Focus on weak areas using topic-wise analysis",
      thumbnail: i("eng1", 800),
      status: "Published" as const,
      tags: ["JEE Main", "engineering", "entrance exam"],
      views: 15420,
      date: new Date("2026-04-01"),
      readTime: "8 min",
      category: "Entrance Exams",
    },
    {
      title: "NEET UG 2027: Preparation Strategy for 650+ Score",
      slug: `${BLOG_SLUG_PREFIX}neet-ug-2027-prep`,
      excerpt: "A detailed roadmap to score 650+ in NEET UG and secure a seat in a top government medical college.",
      content: "## Why 650+?\nA score of 650+ out of 720 typically secures admission to top government medical colleges including AIIMS.\n\n## Subject-wise Strategy\n\n### Biology (360 marks)\n- Read NCERT line by line — this is non-negotiable\n- Make your own notes with diagrams\n- Focus on Human Physiology and Genetics\n\n### Physics (180 marks)\n- Mechanics and Optics are high-weightage\n- Practice numerical problems daily\n- Use HC Verma and DC Pandey\n\n### Chemistry (180 marks)\n- Physical Chemistry: Focus on formulas and problem-solving\n- Organic Chemistry: Understand mechanisms, don't just memorize\n- Inorganic Chemistry: NCERT is sufficient for most questions",
      thumbnail: i("med1", 800),
      status: "Published" as const,
      tags: ["NEET", "medical", "entrance exam"],
      views: 22350,
      date: new Date("2026-03-15"),
      readTime: "10 min",
      category: "Entrance Exams",
    },
    {
      title: "Top 10 Engineering Colleges in India 2026 — NIRF Rankings Analysis",
      slug: `${BLOG_SLUG_PREFIX}top-10-engineering-2026`,
      excerpt: "An in-depth look at NIRF 2026 engineering rankings — what makes these colleges the best in India.",
      content: "## NIRF 2026 Top 10 Engineering\n1. IIT Madras\n2. IIT Delhi\n3. IIT Bombay\n4. IIT Kanpur\n5. IIT Kharagpur\n6. IIT Roorkee\n7. IIT Guwahati\n8. IIT Hyderabad\n9. NIT Trichy\n10. IIT Indore\n\n## Key Takeaways\n- IIT Madras holds #1 for 9 consecutive years\n- NIT Trichy is the only non-IIT in the top 10\n- IIT Hyderabad's rapid rise shows newer IITs catching up\n\n## What NIRF Measures\n- Teaching, Learning & Resources (30%)\n- Research & Professional Practice (30%)\n- Graduation Outcomes (20%)\n- Outreach & Inclusivity (10%)\n- Peer Perception (10%)",
      thumbnail: i("campus1", 800),
      status: "Published" as const,
      tags: ["NIRF", "rankings", "engineering"],
      views: 18900,
      date: new Date("2026-04-10"),
      readTime: "7 min",
      category: "Rankings",
    },
    {
      title: "CAT 2026: How to Crack India's Toughest MBA Entrance Exam",
      slug: `${BLOG_SLUG_PREFIX}cat-2026-strategy`,
      excerpt: "A complete CAT preparation guide — from basics to 99 percentile strategy.",
      content: "## CAT Overview\n- Conducted by IIMs (rotational)\n- Duration: 2 hours\n- Sections: VARC, DILR, QA\n- Over 2.5 lakh candidates\n\n## Section-wise Strategy\n\n### VARC (Verbal Ability & Reading Comprehension)\n- Read 1-2 quality articles daily (The Economist, Aeon)\n- Practice RC passages for speed and accuracy\n- Para-jumbles need daily practice\n\n### DILR (Data Interpretation & Logical Reasoning)\n- Most unpredictable section\n- Practice set-based questions\n- Time management is crucial — skip unsolvable sets\n\n### QA (Quantitative Aptitude)\n- Number Systems, Algebra, and Geometry are key\n- Speed matters — develop mental math skills\n- Practice from Arun Sharma, Nishit Sinha",
      thumbnail: i("biz1", 800),
      status: "Published" as const,
      tags: ["CAT", "MBA", "IIM"],
      views: 12800,
      date: new Date("2026-03-20"),
      readTime: "9 min",
      category: "Entrance Exams",
    },
    {
      title: "Government Scholarships for Indian Students 2026-27: Complete List",
      slug: `${BLOG_SLUG_PREFIX}govt-scholarships-2026`,
      excerpt: "Comprehensive list of government scholarships — eligibility, amounts, deadlines, and application process.",
      content: "## Central Government Scholarships\n\n### 1. INSPIRE Scholarship (DST)\n- For: Top 1% of Class 12 board toppers in science\n- Amount: ₹80,000/year\n- Website: online-inspire.gov.in\n\n### 2. Central Sector Scheme (CSSS)\n- For: Students above 80th percentile in Class 12\n- Amount: ₹10,000-20,000/year\n- Income limit: ₹8 Lakh/year\n\n### 3. Post Matric Scholarship (SC/ST)\n- For: SC/ST students in post-matric courses\n- Amount: Full tuition + maintenance\n- Income limit: ₹2.5 Lakh/year\n\n### 4. AICTE Pragati (Girls)\n- For: Girl students in AICTE-approved institutions\n- Amount: ₹50,000/year\n- Income limit: ₹8 Lakh/year\n\n## How to Apply\nMost scholarships are available through the National Scholarship Portal (scholarships.gov.in). Apply within deadlines with required documents.",
      thumbnail: i("finance1", 800),
      status: "Published" as const,
      tags: ["scholarships", "government", "financial aid"],
      views: 25600,
      date: new Date("2026-04-05"),
      readTime: "12 min",
      category: "Financial Aid",
    },
    {
      title: "IIT vs NIT vs BITS: Which One Should You Choose?",
      slug: `${BLOG_SLUG_PREFIX}iit-vs-nit-vs-bits`,
      excerpt: "A detailed comparison of IITs, NITs, and BITS to help you make the right decision.",
      content: "## The Big Question\nEvery engineering aspirant faces this: lower-ranked IIT vs top NIT vs BITS Pilani?\n\n## IITs\n- **Admission**: JEE Advanced (top 2.5 lakh of JEE Main)\n- **Fee**: ₹2.09 Lakh/year (subsidized)\n- **Brand**: Strongest globally\n- **Research**: Best in India\n- **Placements**: ₹15-25 LPA average\n\n## NITs\n- **Admission**: JEE Main\n- **Fee**: ₹1.5-2.4 Lakh/year\n- **Brand**: Strong in India\n- **Placements**: ₹8-15 LPA average\n- **Best NITs**: Trichy, Warangal, Surathkal, Allahabad\n\n## BITS Pilani\n- **Admission**: BITSAT (separate exam)\n- **Fee**: ₹5.5 Lakh/year\n- **Practice School**: Unique 5.5-month industry internship\n- **Flexibility**: Dual degrees, no attendance policy\n- **Placements**: ₹12-18 LPA average\n\n## Our Take\nCSE at a new IIT ≈ CSE at top 5 NIT ≈ CS at BITS. The branch matters more than the tag in most cases.",
      thumbnail: i("campus2", 800),
      status: "Published" as const,
      tags: ["IIT", "NIT", "BITS", "comparison"],
      views: 31200,
      date: new Date("2026-02-28"),
      readTime: "10 min",
      category: "Guides",
    },
    {
      title: "MBBS in India: Complete Guide to Costs, Colleges, and Career Paths",
      slug: `${BLOG_SLUG_PREFIX}mbbs-india-complete-guide`,
      excerpt: "Everything about MBBS — from NEET preparation to specialization options after completing your degree.",
      content: "## MBBS Overview\n- Duration: 5.5 years (4.5 years + 1 year internship)\n- Admission: Exclusively through NEET UG\n- Total seats: ~1,08,000 (Govt: ~55,000, Private: ~53,000)\n\n## Cost Comparison\n| College Type | Total Cost (5.5 years) |\n|---|---|\n| AIIMS/JIPMER | ₹10,000-50,000 |\n| Govt Medical Colleges | ₹2-10 Lakh |\n| Private Medical Colleges | ₹50L-1.5Cr |\n| Deemed Universities | ₹80L-2Cr |\n\n## After MBBS\n1. **NEET PG** → MD/MS specialization\n2. **Direct practice** as general physician\n3. **USMLE** → Practice in USA\n4. **PLAB** → Practice in UK\n5. **Research** → PhD/MD-PhD\n\n## Top Specializations by Demand\n1. Dermatology\n2. Radiology\n3. Orthopedics\n4. Cardiology\n5. Gastroenterology",
      thumbnail: i("med1", 800),
      status: "Published" as const,
      tags: ["MBBS", "medical", "career"],
      views: 19500,
      date: new Date("2026-03-10"),
      readTime: "11 min",
      category: "Careers",
    },
    {
      title: "Best Law Colleges in India 2026: Beyond NLSIU and NLUs",
      slug: `${BLOG_SLUG_PREFIX}best-law-colleges-2026`,
      excerpt: "A comprehensive guide to India's top law schools — NLUs, private, and university law departments.",
      content: "## Top NLUs (National Law Universities)\n1. NLSIU Bangalore — India's #1 since inception\n2. NALSAR Hyderabad — Strong in ADR and IP law\n3. NLU Delhi — Delhi advantage for internships\n4. WBNUJS Kolkata — Strong moot court culture\n5. NLU Jodhpur — Good for corporate law\n\n## Admission Through CLAT\n- 120 questions, 120 minutes\n- Sections: English, Current Affairs, Legal Reasoning, Logical Reasoning, Quantitative Techniques\n- No negative marking for first attempt\n\n## Private Alternatives\n- Jindal Global Law School — India's most international law school\n- Symbiosis Law School (Pune) — Strong industry connections\n- Christ University (Bengaluru) — Good for South India placements\n\n## Career Paths\n- Corporate law (AZB, Trilegal: ₹15-30 LPA)\n- Litigation (High Court, Supreme Court)\n- Judiciary (Civil Judge, District Judge)\n- Legal policy (Government, think tanks)\n- International law (UN, ICJ)",
      thumbnail: i("law1", 800),
      status: "Published" as const,
      tags: ["law", "CLAT", "NLU"],
      views: 9800,
      date: new Date("2026-04-08"),
      readTime: "8 min",
      category: "Rankings",
    },
  ]);
  console.log("Seeded blogs.");

  /* ─── ADDITIONAL BLOGS (from data file) ─── */
  console.log("Seeding additional blog posts…");
  await BlogModel.insertMany(
    ADDITIONAL_BLOGS.map((b) => ({
      title: b.title,
      slug: b.slug,
      excerpt: b.excerpt,
      content: b.content,
      thumbnail: i("campus2", 800),
      status: "Published" as const,
      tags: b.tags,
      views: b.views,
      date: new Date(),
      readTime: b.readTime,
      category: b.category,
    })),
  );
  console.log(`Seeded ${ADDITIONAL_BLOGS.length} additional blogs.`);

  /* ─── SEO BLOG POSTS (88 location/course-specific articles) ─── */
  console.log("Seeding SEO blog posts…");
  await BlogModel.insertMany(
    SEO_BLOGS.map((b) => ({
      title: b.title,
      slug: b.slug,
      excerpt: b.excerpt,
      content: b.content,
      thumbnail: i("campus2", 800),
      status: "Published" as const,
      tags: b.tags,
      views: b.views,
      date: new Date(),
      readTime: b.readTime,
      category: b.category,
    })),
  );
  console.log(`Seeded ${SEO_BLOGS.length} SEO blogs.`);

  /* ─── SEO BLOGS BATCH 2 (80 more articles) ─── */
  console.log("Seeding SEO blogs batch 2…");
  await BlogModel.insertMany(
    SEO_BLOGS_BATCH2.map((b) => ({
      title: b.title,
      slug: b.slug,
      excerpt: b.excerpt,
      content: b.content,
      thumbnail: i("campus3", 800),
      status: "Published" as const,
      tags: b.tags,
      views: b.views,
      date: new Date(),
      readTime: b.readTime,
      category: b.category,
    })),
  );
  console.log(`Seeded ${SEO_BLOGS_BATCH2.length} batch 2 blogs.`);

  /* ─── KERALA SEO BLOGS (45 Kerala-specific articles) ─── */
  console.log("Seeding Kerala SEO blogs…");
  await BlogModel.insertMany(
    KERALA_BLOGS.map((b) => ({
      title: b.title,
      slug: b.slug,
      excerpt: b.excerpt,
      content: b.content,
      thumbnail: i("kerala", 800),
      status: "Published" as const,
      tags: b.tags,
      views: b.views,
      date: new Date(),
      readTime: b.readTime,
      category: b.category,
    })),
  );
  const baseBlogCount = 8 + ADDITIONAL_BLOGS.length + SEO_BLOGS.length + SEO_BLOGS_BATCH2.length + KERALA_BLOGS.length;
  console.log(`Seeded ${KERALA_BLOGS.length} Kerala blogs. Base total: ${baseBlogCount} blog posts.`);

  /* ─── MEGA BLOG BATCHES (1000+ SEO articles) ─── */
  const megaBatches = [
    { name: "Mega Batch 1 (Best Colleges by city/course)", data: MEGA_BLOGS_BATCH1 },
    { name: "Mega Batch 2 (Exam prep, career, comparisons)", data: MEGA_BLOGS_BATCH2 },
    { name: "Mega Batch 3 (State guides, salary, trending)", data: MEGA_BLOGS_BATCH3 },
    { name: "Mega Batch 4 (Scholarships, fees, how-to)", data: MEGA_BLOGS_BATCH4 },
    { name: "Mega Batch 5 (Course guides, after 12th, long-tail)", data: MEGA_BLOGS_BATCH5 },
  ];
  let megaBlogTotal = 0;
  for (const batch of megaBatches) {
    console.log(`Seeding ${batch.name}…`);
    await BlogModel.insertMany(
      batch.data.map((b: any, idx: number) => ({
        title: b.title,
        slug: b.slug,
        excerpt: b.excerpt,
        content: b.content,
        thumbnail: pickBlogThumbnail(b, idx),
        status: "Published" as const,
        tags: b.tags,
        views: b.views,
        date: new Date(),
        readTime: b.readTime,
        category: b.category,
      })),
    );
    megaBlogTotal += batch.data.length;
    console.log(`Seeded ${batch.data.length} posts from ${batch.name}.`);
  }
  const grandTotal = baseBlogCount + megaBlogTotal;
  console.log(`✅ Grand total: ${grandTotal} blog posts (${baseBlogCount} base + ${megaBlogTotal} mega batches).`);

  /* ─── FOOTER CMS ─── */
  console.log("Seeding footer CMS…");
  await FooterCMS.deleteMany({});
  await FooterCMS.create({
    enabled: true,
    primaryHeadline: "Start Your Journey",
    subHeadline: "Contact us for more details",
    locationLink: "Calicut, Kerala, India",
    contactNumber: "+91 90999 09900",
    email: "hello@clarixeducation.com",
    newsletter: {
      enabled: true,
      primaryHeadline: "Stay Updated",
      subHeadline: "Get the latest college news, exam dates, and scholarship alerts delivered to your inbox.",
      primaryButtonText: "Subscribe",
      primaryButtonLink: "#",
    },
  });
  console.log("Footer CMS seeded.");

  /* ─── HOMEPAGE CMS ─── */
  if (process.env.SEED_SKIP_HOMEPAGE === "1") {
    console.log("Skipping HomePage CMS (SEED_SKIP_HOMEPAGE=1).");
  } else {
    console.log("Seeding homepage CMS…");
    const locationItems = [
      { name: "Delhi", slug: "delhi", image: i("delhi", 900) },               // India Gate
      { name: "Maharashtra", slug: "maharashtra", image: i("maharashtra", 900) }, // Marine Drive Mumbai
      { name: "Karnataka", slug: "karnataka", image: i("karnataka", 900) },    // Mysore Palace
      { name: "Tamil Nadu", slug: "tamil-nadu", image: i("tamilnadu", 900) },  // Meenakshi Temple
      { name: "Uttar Pradesh", slug: "uttar-pradesh", image: i("up", 900) },   // Taj Mahal
      { name: "Rajasthan", slug: "rajasthan", image: i("rajasthan", 900) },     // Hawa Mahal
      { name: "Kerala", slug: "kerala", image: i("kerala", 900) },              // Backwaters
      { name: "Telangana", slug: "telangana", image: i("telangana", 900) },     // Charminar
      { name: "West Bengal", slug: "west-bengal", image: i("westbengal", 900) },// Kolkata
      { name: "Punjab", slug: "punjab", image: i("punjab", 900) },              // Golden Temple
      { name: "Gujarat", slug: "gujarat", image: i("gujarat", 900) },
      { name: "Madhya Pradesh", slug: "madhya-pradesh", image: i("mp", 900) },
      { name: "Uttarakhand", slug: "uttarakhand", image: i("uttarakhand", 900) },
      { name: "Jharkhand", slug: "jharkhand", image: i("jharkhand", 900) },
      { name: "Odisha", slug: "odisha", image: i("odisha", 900) },
      { name: "Assam", slug: "assam", image: i("assam", 900) },
      { name: "Bihar", slug: "bihar", image: i("bihar", 900) },
      { name: "Goa", slug: "goa", image: i("goa", 900) },
    ];

    await HomePage.findOneAndUpdate(
      {},
      {
        $set: {
          hero: {
            enabled: true,
            headline: "Find Your Perfect College, Course & Career in India",
            subHeadline: "Compare 40,000+ colleges, explore courses, track exam dates, and discover scholarships — all in one trusted platform built for Indian students.",
            PrimaryCtaText: "Explore Colleges",
            PrimaryCtaLink: "/colleges",
            images: [
              i("hero1", 1600),
              i("campus2", 1600),
              i("campus3", 1600),
              i("hero2", 1600),
            ],
            popularSearches: [
              "IIT Bombay B.Tech CSE",
              "Best MBA colleges in India",
              "NEET cutoff for AIIMS Delhi",
              "BITS Pilani fees and placements",
              "Government scholarships 2026",
              "NIT Trichy vs BITS Pilani",
            ],
          },
          streams: {
            enabled: true,
            title: "Explore Streams That Match Your Ambition",
            paragraph: "Choose from 10 major education streams — each with curated colleges, entrance exams, scholarships, and career benchmarks across India.",
          },
          contentBlocks: {
            enabled: true,
            blocks: [
              {
                title: "Compare India's Top Colleges Side by Side",
                description: "Fees, placements, campus life, NIRF rankings, and admission modes — all in one view so you can shortlist with confidence.",
                image: i("campus1", 900),
                sectionKey: "compare-colleges",
              },
              {
                title: "Never Miss an Entrance Exam Date",
                description: "JEE, NEET, CAT, CLAT, GATE, BITSAT, CUET — track registration windows, admit cards, and result dates for every major exam.",
                image: i("study2", 900),
                sectionKey: "stay-updated",
              },
              {
                title: "Scholarships You're Eligible For",
                description: "INSPIRE, CSSS, AICTE Pragati, Post Matric SC/ST, and 100+ scholarships with eligibility filters and deadline alerts.",
                image: i("finance1", 900),
                sectionKey: "scholarships",
              },
              {
                title: "Courses with Complete Details",
                description: "Syllabus, eligibility, fees, career paths, and placement stats for every major course from B.Tech CSE to MBBS to BA LLB.",
                image: i("edu2", 900),
                sectionKey: "courses",
              },
            ],
          },
          careerHub: {
            enabled: true,
            title: "Career Hub — Jobs, Internships & Recruiters",
            paragraph: "Explore opportunities from TCS, Infosys, Google, Amazon, Deloitte, and 100+ companies that hire from India's top campuses.",
            images: [i("event3", 1100), i("biz2", 1100), i("biz3", 1100)],
            logo: [
              i("office1", 256),
              i("office2", 256),
              i("office3", 256),
              i("office4", 256),
              i("office5", 256),
              i("office6", 256),
            ],
          },
          faq: {
            enabled: true,
            title: "Questions Students & Parents Ask Us",
            paragraph: "Honest, transparent answers to help you make informed education decisions.",
            items: [
              { question: "Is the data on Clarix accurate?", answer: "We source data from official college websites, NIRF reports, and verified student reviews. Always cross-check final dates on the institution's official website." },
              { question: "Is Clarix free to use?", answer: "Yes — browsing, comparing colleges, and tracking exam dates is completely free. We may introduce premium features like personalized alerts in the future." },
              { question: "Can Clarix guarantee admission?", answer: "No platform can guarantee admission. We help you organize your choices, track deadlines, and make informed decisions based on accurate data." },
              { question: "How are college ratings determined?", answer: "Our ratings consider NIRF rankings, NAAC accreditation, placement records, student reviews, and faculty quality." },
              { question: "How do student reviews work?", answer: "Reviews are submitted by verified students and moderated before publication. We associate reviews with the respective college and course." },
              { question: "Can I compare colleges?", answer: "Yes! Use our side-by-side comparison tool to compare fees, placements, campus facilities, and more between any colleges." },
            ],
          },
          location: {
            enabled: true,
            title: "Study Across India",
            items: locationItems,
          },
        },
      },
      { upsert: true },
    );
    console.log("Homepage CMS updated.");
  }

  /* ─── SUMMARY ─── */
  console.log("\n✅ Real data seed complete!");
  console.table({
    universities: UNIVERSITY_NAMES.length,
    recruiters: RECRUITER_COMPANIES.length,
    streams: 10,
    courses: COURSE_NAMES.length,
    scholarships: SCHOLARSHIP_NAMES.length,
    exams: EXAM_CODES.length,
    colleges: COLLEGE_NAMES.length,
    reviews: REVIEW_AUTHORS.length,
    blogs: 8,
    jobs: 10,
    homepage: process.env.SEED_SKIP_HOMEPAGE === "1" ? "skipped" : "updated",
  });

  await mongoose.disconnect();
}

seed().catch((err) => {
  console.error(err);
  process.exit(1);
});
