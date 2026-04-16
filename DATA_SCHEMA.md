# Clarix Education — Complete Database Schema Reference

**Last updated:** 2026-04-16
**Purpose:** The single source of truth for ALL fields, patterns, and conventions in the Clarix DB. Consult this before creating or modifying ANY college, course, or related entity. Every item listed below has been validated against the actual production database.

---

## Table of Contents

1. [Database Overview](#1-database-overview)
2. [College Schema (Complete)](#2-college-schema-complete)
3. [Course Schema (Complete)](#3-course-schema-complete)
4. [Course Offering Schema (per-college)](#4-course-offering-schema-per-college)
5. [Related Collections](#5-related-collections)
6. [Nested Object Structures](#6-nested-object-structures)
7. [Helper Functions & Logic](#7-helper-functions--logic)
8. [Image Pools (All Categories)](#8-image-pools-all-categories)
9. [Common Pitfalls](#9-common-pitfalls)
10. [Scripts Inventory](#10-scripts-inventory)
11. [Conversation Work History](#11-conversation-work-history)
12. [Validation Checklists](#12-validation-checklists)
13. [Current DB Stats](#13-current-db-stats)

---

## 1. Database Overview

**Database:** MongoDB (Atlas) — `clarix`
**Total Collections:** 21

### Primary Data Collections
| Collection | Docs | Purpose |
|------------|------|---------|
| `colleges` | 1,732 | College institutions (1,471 Indian + 261 International) |
| `courses` | 378 | Unique course catalog across 11 streams |
| `streams` | 11 | Course categories (Engineering, Management, etc.) |
| `universities` | 54 | Affiliating universities |
| `recruiters` | 15 | Top company recruiters |
| `scholarships` | 15 | Scholarship programs |
| `exams` | 15 | Entrance examinations |
| `jobs` | 10 | Job postings |
| `blogs` | 1,353 | Blog articles |
| `reviews` | 12 | Student reviews |

### CMS Collections (singletons)
| Collection | Purpose |
|------------|---------|
| `homepages` | Home page CMS content |
| `aboutpages` | About page CMS |
| `blogpages` | Blog landing page CMS |
| `careerspages` | Careers CMS |
| `collegespages` | Colleges listing CMS |
| `coursespages` | Courses listing CMS |
| `exampages` | Exams listing CMS |
| `jobsinternshipspages` | Jobs listing CMS |
| `footercms` | Footer CMS |

---

## 2. College Schema (Complete)

Every field observed in the production database, grouped logically. Required (✅) vs Optional (⚪).

### 2.1 Identity & Location
| Field | Type | Required | Notes |
|-------|------|----------|-------|
| `_id` | ObjectId | ✅ auto | MongoDB ID |
| `name` | string | ✅ | Full official name. **Must be unique** across DB |
| `slug` | string | ✅ | URL-friendly ID (e.g., `iitbombay`). Max 25 chars |
| `city` | string | ✅ | Primary city |
| `state` | string | ✅ | State or province |
| `country` | string | ✅ | `"India"` or other country name |
| `address` | string | ✅ | `"City, State, Country"` format |
| `type` | string | ✅ | `"Government"` \| `"Private"` \| `"Public"` |
| `establishedYear` | number | ✅ | **Must be 1800–2025**. Never null or invalid |
| `description` | string | ✅ | ≥100 chars, descriptive overview |
| `category` | string \| ObjectId | ⚪ | Legacy — can be stream name (e.g., `"Engineering"`) or `ObjectId` ref to streams |

### 2.2 Images (CRITICAL — always populate)
| Field | Type | Required | Notes |
|-------|------|----------|-------|
| `logo` | string URL | ✅ | College logo (Wikipedia or official) |
| `campusImages` | URL[] (1–5) | ✅ | **Min 1**. Real campus photos. **Must be unique** across ALL colleges |
| `hostelImages` | URL[] (0–3) | ⚪ | Pick from `HOSTEL_POOL` (15 images) |
| `labsImages` | URL[] (0–3) | ⚪ | Pick from `LAB_POOL` (15 images) |
| `eventsImages` | URL[] (0–3) | ⚪ | Pick from `EVENTS_POOL` (15 images) |
| `bannerImage` | string URL | ⚪ | Optional hero banner |
| `gallery` | URL[] | ⚪ | Optional extra gallery |

**RULES:**
- NEVER use `.svg`, `.pdf`, `.gif` URLs as images.
- NEVER use logos, coats of arms, seals, flags, maps, portraits, statues as campus images.
- NEVER share identical `campusImages[0]` across multiple colleges.
- NEVER use `localhost:3845` Figma asset URLs — replace with inline SVG data URIs.
- Use deterministic hash `(collegeName + index) % poolSize` to distribute hostel/lab/event images.

### 2.3 Contact Info
| Field | Type | Required | Notes |
|-------|------|----------|-------|
| `phone` | string | ✅ | Format: `+91-XXX-XXX-XXXX` (India) / `+1-XXX-XXX-XXXX` (US) / country code |
| `email` | string | ✅ | Format: `info@<slug>.ac.in` (India) or `info@<slug>.edu` (international) |
| `website` | string | ✅ | Format: `https://www.<slug>.ac.in` |

### 2.4 Fees Structure (All Indian currency format: `₹X / year` or `₹X - ₹Y / year`)
| Field | Type | Required | Notes |
|-------|------|----------|-------|
| `annualFee` | string | ✅ | Tier-based — see §7.2 |
| `avgAnnualFee` | string | ✅ | Usually same as `annualFee` |
| `hostelFee` | string | ✅ | `"₹X / year"` |
| `messFee` | string | ✅ | `"₹X / year"` |
| `libraryFee` | string | ✅ | `"₹X / year"` |
| `laboratoryFee` | string | ✅ | `"₹X / year"` |
| `sportsFee` | string | ✅ | `"₹X / year"` |
| `feesPaymentFaqs` | `{question, answer}[]` | ✅ | ≥3 FAQs |

### 2.5 Placement Data
| Field | Type | Required | Notes |
|-------|------|----------|-------|
| `placementPercentage` | number | ✅ | 60–99 |
| `averageSalary` | string \| number | ✅ | Can be `"21 LPA"` string OR raw number `2100000` |
| `highestSalary` | string \| number | ✅ | Same formats as `averageSalary` |
| `placementTrends` | `{year, avgSalary, placementPercentage}[]` | ✅ | Min 5 years |
| `studentsWithInternships` | number | ✅ | Percentage (0–100) |
| `avgStipend` | number | ✅ | INR integer amount |
| `ppoConversionRate` | number | ✅ | Percentage |
| `alumniInFortune500` | number | ✅ | Percentage |
| `alumniEntrepreneurs` | number | ✅ | Percentage |
| `alumniHigherStudiesAbroad` | number | ✅ | Percentage |
| `recruitersCount` | number | ⚪ | Total number of recruiters (e.g., 350) |
| `recruiters` | ObjectId[] | ✅ | Refs to `recruiters` collection |

### 2.6 Rating & Students
| Field | Type | Required | Notes |
|-------|------|----------|-------|
| `rating` | number | ⚪ | 0–5 stars (e.g., 4.8) |
| `students` | number | ⚪ | Total enrolled student count |

### 2.7 Courses & Offerings (CRITICAL)
| Field | Type | Required | Notes |
|-------|------|----------|-------|
| `courses` | ObjectId[] | ✅ | Array of course `_id` refs. **Match college type** (no MBBS in engineering colleges) |
| `courseOfferings` | object[] | ✅ | **Must be same length as `courses`**. See §4 below |

### 2.8 Admissions
| Field | Type | Required | Notes |
|-------|------|----------|-------|
| `applicationOpeningDate` | Date | ✅ | |
| `applicationClosingDate` | Date | ✅ | |
| `entranceExamDate` | Date | ✅ | |
| `meritListAnnouncementDate` | Date | ✅ | |
| `counsellingStartsFrom` | Date | ✅ | |
| `accademicSectionStartsFrom` | Date | ✅ | (note: legacy typo, keep it) |
| `entranceExam` | ObjectId \| string | ⚪ | Ref to `exams` collection |
| `admissionMode` | `{mode, label, description}[]` | ✅ | E.g., Entrance Exam / Direct / Merit |
| `admissionFaqs` | `{question, answer}[]` | ✅ | ≥3 FAQs |
| `courseFaqs` | `{question, answer}[]` | ✅ | ≥3 FAQs |
| `scholarshipFaqs` | `{question, answer}[]` | ✅ | ≥3 FAQs |

### 2.9 Campus & Facilities
| Field | Type | Required | Notes |
|-------|------|----------|-------|
| `campusSize` | string | ✅ | `"X Acres"` |
| `amenities` | string[] | ✅ | **≥8 items**. Tier-based — see §7.5 |
| `campusLife` | object[] | ✅ | Student activities — see §6.1 for structure |

### 2.10 Relations
| Field | Type | Required | Notes |
|-------|------|----------|-------|
| `university` | ObjectId | ✅ | Ref to `universities` collection |
| `recruiters` | ObjectId[] | ✅ | Refs to `recruiters` |
| `scholarships` | ObjectId[] | ✅ | Refs to `scholarships` |
| `accreditation` | string[] | ✅ | `["NAAC A+", "NIRF Rank 45", "AICTE Approved"]` |

### 2.11 Misc
| Field | Type | Required | Notes |
|-------|------|----------|-------|
| `brochure` | string URL | ⚪ | PDF download |
| `createdAt` | Date | ✅ auto | |
| `updatedAt` | Date | ✅ auto | |

---

## 3. Course Schema (Complete)

### 3.1 Identity
| Field | Type | Required | Notes |
|-------|------|----------|-------|
| `_id` | ObjectId | ✅ auto | |
| `name` | string | ✅ | Unique. E.g., `"B.Tech Computer Science and Engineering"` |
| `shortDescription` | string | ✅ | One-line summary |
| `stream` | ObjectId | ✅ | Ref to `streams` collection |
| `type` | string | ✅ | `"Full Time"` \| `"Part Time"` \| `"Distance"` |
| `duration` | string | ✅ | `"4 Years"`, `"2 Years"`, `"5.5 Years"`, etc. |
| `fees` | string | ✅ | Generic range (overridden per-college in offerings) |
| `intakeCapacity` | string | ✅ | `"Varies by college"` or specific |
| `eligibility` | string[] | ✅ | ≥2 items |

### 3.2 Images
| Field | Type | Required | Notes |
|-------|------|----------|-------|
| `cardImage` | string URL | ✅ | Topic-relevant. See §8 for categories |
| `heroImage` | string URL | ✅ | Usually same as `cardImage` |

### 3.3 Rich Description (all objects — see §6 for structures)
| Field | Type | Required | Min items |
|-------|------|----------|-----------|
| `description` | `{title, content, image}` | ✅ | content ≥200 chars |
| `about` | `{title, description, points[]}` | ✅ | ≥4 points |
| `whyChoose` | `{title, description, reasons[]}` | ✅ | ≥4 reasons |
| `syllabus` | `{title, semesters[]}` | ✅ | 2–4 semesters, 5+ topics each |
| `careerOpportunities` | `{title, items[]}` | ✅ | ≥4 items |
| `faqs` | `{title, description, items[]}` | ✅ | ≥4 FAQs |

### 3.4 NEW Career Fields (added in enrich-all-courses.ts)
| Field | Type | Required | Notes |
|-------|------|----------|-------|
| `skills` | string[] | ✅ | 5–8 skills learned |
| `topRecruiters` | string[] | ✅ | 8–10 hiring companies |
| `jobRoles` | string[] | ✅ | 5–6 common job titles |
| `salary` | `{entry, mid, senior}` | ✅ | Each is range string e.g., `"₹6-15 LPA"` |

### 3.5 Timestamps
| Field | Type | Required | Notes |
|-------|------|----------|-------|
| `createdAt` | Date | ✅ auto | |
| `updatedAt` | Date | ✅ auto | |

---

## 4. Course Offering Schema (per-college)

Every entry in `college.courseOfferings` has:

| Field | Type | Required | Notes |
|-------|------|----------|-------|
| `courseId` | ObjectId | ✅ | Must match one in `college.courses` |
| `courseName` | string | ✅ | Denormalized name (must equal `course.name`) |
| `fees` | string | ✅ | College-specific fees (IIT B.Tech = `"₹2,09,550 / year"`) |
| `intake` | string | ✅ | `"60-120 seats"`, `"120-180 seats"`, etc. |
| `duration` | string | ✅ | Same as `course.duration` |
| `cutoff` | string | ⚪ | E.g., `"JEE Advanced rank under 5,000"` — only for competitive tiers |
| `modules` | string[] | ⚪ | Course-specific curriculum (e.g., for CSE: DSA, OS, DBMS, Networks, ML) |

**Rule:** `college.courses.length === college.courseOfferings.length`. Every `courseOfferings[i].courseId` must appear in `college.courses`.

---

## 5. Related Collections

### 5.1 Streams
```typescript
{
  _id: ObjectId,
  name: string,          // "Engineering", "Management", etc.
  description: string,
  createdAt, updatedAt
}
```
**All 11 streams:** Engineering, Management, Medical, Commerce, Science, Law, Design, Pharmacy, Agriculture, Education, **Arts** (last added).

### 5.2 Universities
```typescript
{
  _id, name, type, state, city, establishedYear,
  createdAt, updatedAt
}
```
54 universities currently. Every college must have `university` ref.

### 5.3 Recruiters
```typescript
{
  _id,
  companyName: string,
  jobTitle: string,
  hiringDuration: string,
  logo: string URL,
  industry: string,
  createdAt, updatedAt
}
```

### 5.4 Scholarships
```typescript
{
  _id,
  scholarshipName: string,
  scholarshipType: string,       // "Merit-based", "Need-based", etc.
  fundingType: string,           // "Full funding", "Partial"
  deadline: Date,
  totalFundingAmount: number,
  description: string,
  officialWebsite: string,
  isActive: boolean,
  status: string,
  createdAt, updatedAt
}
```

### 5.5 Exams
Common fields: `fullName`, `shortName`, `logo`, `image`, `description`, `examDate`, `applicationFee`, `conductingBody`, etc.

**Index fix applied:** Text search uses `fullName + shortName` (not `title` which doesn't exist).

---

## 6. Nested Object Structures

### 6.1 `campusLife[]` item
```typescript
{
  title: string,              // "Technical Festivals", "Sports & Athletics", etc.
  description: string,         // College-specific activity description
  verified: boolean,           // Usually true
  tags: string[],              // ["sports", "athletics"] or ["fest", "events"]
  image: string URL,           // From VERIFIED_POOLS by category
  source: string,              // "Student Affairs"
  isActive: boolean,           // Usually true
  _id: ObjectId                // Mongoose auto
}
```

### 6.2 `placementTrends[]` item
```typescript
{
  year: string,                // "2022", "2023"
  avgSalary: string,           // "18.5 LPA" or just the number
  placementPercentage: string  // "83%" or "83"
}
```

### 6.3 `admissionMode[]` item
```typescript
{
  mode: string,                // "Entrance Exam" / "Direct Admission" / "Merit"
  label: string,               // Short label
  description: string          // Full explanation
}
```

### 6.4 `description` (course)
```typescript
{
  title: string,               // "About B.Tech Computer Science and Engineering"
  content: string,             // ≥200 chars
  image: string URL
}
```

### 6.5 `syllabus` (course)
```typescript
{
  title: string,               // "Curriculum & Syllabus"
  semesters: [
    {
      title: string,           // "Semester 1-2 (Foundation)"
      topics: string[],        // ≥5 topics each
      _id: ObjectId
    }
  ]
}
```

### 6.6 `whyChoose` (course)
```typescript
{
  title: string,               // "Why Choose B.Tech Computer Science and Engineering?"
  description: string,
  reasons: [
    { title: string, description: string, _id: ObjectId }
  ]
}
```

### 6.7 `careerOpportunities` (course)
```typescript
{
  title: string,               // "Career Opportunities"
  items: [
    { title: string, description: string, _id: ObjectId }
  ]
}
```

### 6.8 `about` (course)
```typescript
{
  title: string,               // "Program Highlights"
  description: string,
  points: [
    { title: string, description: string, _id: ObjectId }
  ]
}
```

### 6.9 `faqs` (course)
```typescript
{
  title: string,               // "Frequently Asked Questions"
  description: string,
  items: [
    { question: string, answer: string, _id: ObjectId }
  ]
}
```

### 6.10 `salary` (course)
```typescript
{
  entry: string,               // "₹6-15 LPA"
  mid: string,                 // "₹15-35 LPA"
  senior: string               // "₹35 LPA - ₹2 Cr"
}
```

---

## 7. Helper Functions & Logic

### 7.1 Abbreviation Expansion Map (for Wikipedia image search)

```typescript
const ABBREV = {
  'IIM': 'Indian Institute of Management',
  'IIT': 'Indian Institute of Technology',
  'NIT': 'National Institute of Technology',
  'IIIT': 'Indian Institute of Information Technology',
  'AIIMS': 'All India Institute of Medical Sciences',
  'NIFT': 'National Institute of Fashion Technology',
  'NLU': 'National Law University',
  'GNLU': 'Gujarat National Law University',
  'NLSIU': 'National Law School of India University',
  'NALSAR': 'NALSAR University of Law',
  'RMLNLU': 'Ram Manohar Lohia National Law University',
  'NSUT': 'Netaji Subhas University of Technology',
  'BIET': 'Bundelkhand Institute of Engineering and Technology',
  'KNIT': 'Kamla Nehru Institute of Technology',
  'VIT': 'Vellore Institute of Technology',
  'SRM': 'SRM Institute of Science and Technology',
  'JNTU': 'Jawaharlal Nehru Technological University',
  'JNTUH': 'Jawaharlal Nehru Technological University Hyderabad',
  'GEC': 'Government Engineering College',
  'UCE': 'University College of Engineering',
  'BHU': 'Banaras Hindu University',
  'PEC': 'Punjab Engineering College',
  'MIT': 'Massachusetts Institute of Technology',
  'UCLA': 'University of California Los Angeles',
  'USC': 'University of Southern California',
  'NYU': 'New York University',
  'LSE': 'London School of Economics',
  'UCL': 'University College London',
  'KCL': "King's College London",
  'RMIT': 'Royal Melbourne Institute of Technology',
  'KAIST': 'Korea Advanced Institute of Science and Technology',
  'NTU': 'Nanyang Technological University',
  'NUS': 'National University of Singapore',
  'TUM': 'Technical University of Munich',
  'LMU': 'Ludwig Maximilian University of Munich',
  'KIT': 'Karlsruhe Institute of Technology',
  'AUT': 'Auckland University of Technology',
};
```

### 7.2 College Tier Detection

```typescript
function getCollegeTier(name, country): string {
  // Returns one of:
  // Indian: 'IIT' | 'IIM' | 'AIIMS' | 'NIT' | 'IIIT' | 'BITS' | 'NLU' | 'NIFT'
  //        | 'TopPrivate' | 'Government' | 'Private' | 'Polytechnic'
  // International: 'IvyLeague' | 'TopIntl' | 'Intl'
}
```

### 7.3 Realistic Fee Ranges by Tier

**Indian — Annual Fees:**
| Tier | B.Tech | MBA | MBBS | BA / BCom / BBA |
|------|--------|-----|------|-----------------|
| IIT | ₹2,09,550 | ₹14-25L | N/A | N/A |
| IIM | N/A | ₹14-25L | N/A | N/A |
| NIT | ₹1,63,750 | ₹1-2L | N/A | N/A |
| IIIT | ₹2,80,000 | N/A | N/A | N/A |
| AIIMS | N/A | N/A | ₹1,628-6,000 | N/A |
| BITS | ₹5,55,000 | ₹6.5L | N/A | N/A |
| NLU | N/A | N/A | N/A | LLB: ₹2.5-3.5L |
| NIFT | B.Des: ₹3.3L | N/A | N/A | N/A |
| TopPrivate (VIT/Manipal/SRM) | ₹3-6L | ₹8-18L | ₹15-25L | ₹1.5-3.5L |
| Government | ₹15K-50K | ₹50K-2L | ₹30K-1.5L | ₹6K-30K |
| Private | ₹1.2-3L | ₹2.5-6L | ₹8-18L | ₹40K-2.5L |
| Polytechnic | ₹15-50K | N/A | N/A | N/A |
| Medical (private) | N/A | N/A | ₹3.5-18L | N/A |

**International:**
| Tier | Annual Fee |
|------|-----------|
| US Ivy League | $58,000–$85,000 |
| US public | $30,000–$55,000 |
| UK top | £28,000–£50,000 |
| UK general | £18,000–£35,000 |
| Canada | CAD 25,000–65,000 |
| Australia | AUD 28,000–55,000 |
| Germany | €0–€3,000 |
| France | €3,000–€18,000 |
| Netherlands | €10,000–€20,000 |
| Singapore | SGD 20,000–55,000 |
| Japan | ¥800,000–¥1,800,000 |
| South Korea | ₩6M–₩15M |
| China | CNY 20,000–90,000 |
| UAE | AED 35,000–90,000 |
| Malaysia | MYR 20,000–50,000 |
| New Zealand | NZD 25,000–45,000 |
| Ireland | €15,000–€30,000 |
| Sweden | SEK 100,000–200,000 |

### 7.4 Intake Patterns by Tier

```typescript
getIntake(tier, courseName):
  IIT: "120-180 seats" (CSE), "60-120 seats" (other B.Tech), "20-40 seats" (M.Tech), "10-30 seats" (PhD), "60-120" (MBA)
  IIM: "300-500 seats" (MBA), "100-200" (Executive), "20-60" (others)
  AIIMS: "125 seats" (MBBS), "60-100" (Nursing), "10-50" (others)
  NIT / IIIT: "60-120 seats" (B.Tech), "20-40" (M.Tech)
  NLU: "120-180 seats" (LLB), "40-80" (LLM)
  TopPrivate: "60-120" (B.Tech), "150" (MBBS), "40-100" (others)
  default: "40-90 seats" or "30-90 seats"
```

### 7.5 Cutoff Patterns by Tier

```typescript
getCutoff(tier, courseName):
  IIT B.Tech: "JEE Advanced rank under 5,000"
  IIT M.Tech: "GATE score 700+"
  IIT MBA: "CAT 99+ percentile"
  IIM MBA: "CAT 95+ percentile"
  AIIMS MBBS: "NEET-UG rank under 100"
  NIT B.Tech: "JEE Main rank 5,000-30,000"
  IIIT B.Tech: "JEE Main rank 8,000-25,000"
  NLU LLB: "CLAT rank under 500"
  NIFT B.Des: "NIFT entrance qualified"
  TopPrivate B.Tech: "JEE Main / Institute entrance"
```

### 7.6 Course Selection by College Type

| College Type Detection | Courses Assigned |
|------------------------|------------------|
| Name contains `IIT` / `Indian Institute of Technology` | All B.Tech (37+), select M.Tech, MBA, PhD |
| Name contains `IIIT` | CS/IT-focused B.Tech + M.Tech |
| Name contains `NIT` / `National Institute of Technology` | Core B.Tech + M.Tech + MBA + PhD Engineering |
| Name contains `IIM` / `Indian Institute of Management` | All MBA specializations + PGDM + Executive MBA + PhD Management |
| Name contains `AIIMS` / `All India Institute of Medical` | MBBS, MD/MS all specs, B.Sc Nursing, allied health, PhD Medicine |
| Name contains `NLU` / `National Law` | BA LLB, BBA LLB, B.Com LLB, LLB, LLM (all specs) |
| Name contains `NIFT` | B.Des, M.Des in Fashion/Textile/Jewelry |
| Name contains `NID` / `Institute of Design` | All B.Des, M.Des specializations |
| Name contains `pharmacy` | B.Pharm, D.Pharm, M.Pharm (all specs), Pharm.D |
| Name contains `nursing` | B.Sc Nursing, GNM, ANM, M.Sc Nursing, Post Basic |
| Name contains `dental` | BDS + all 7 MDS specializations |
| Name contains `ayurveda` / `ayurvedic` | BAMS |
| Name contains `homoeopath` / `homeopath` | BHMS |
| Name contains `medical college` / `medical sciences` | MBBS + MD/MS + B.Sc Nursing + B.Pharm + allied health |
| Name contains `polytechnic` | Diploma in Civil/Mech/Electrical/CS/Electronics/Chemical |
| Name contains `hotel management` / `hospitality` / `catering` | BHM, BHMCT, Hospitality specializations |
| Name contains `aviation` / `aeronautic` | Aviation science + pilot + cabin crew |
| Name contains `engineering` / `institute of technology` / `technical` | 35+ B.Tech + M.Tech + MBA + BBA |
| Name contains `management` / `business school` | MBA + PGDM + BBA |
| Name contains `agricultural` / `agriculture` | B.Sc Agriculture + related |
| Name contains `education` / `b.ed` / `teacher training` | B.Ed (subject-wise) + M.Ed + B.P.Ed + D.El.Ed |
| Name contains `university` / `vishwavidyalaya` / `vidyapith` | Wide range (Engineering + Management + Science + Arts + Commerce + Law) |
| Name contains `arts` / `science` / `commerce` / `college` | Arts + Science + Commerce undergrad + some MBA/BBA |
| **International general university** | Engineering + Management + Science + Arts + Commerce + Law |
| **International engineering institute** | All engineering + some science + MBA |
| **International business school** | MBA + BBA in all specializations |

### 7.7 Escaping for NoSQL Injection Prevention

```typescript
function escapeRegex(str) {
  return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}
// Usage: { $regex: escapeRegex(userInput), $options: 'i' }
```

**Applied in 11 controllers:** colleges, courses, search, jobs, reviews, exams, blogs, universities, scholorship, recruiters, streams.

---

## 8. Image Pools (All Categories)

### 8.1 Campus Images (for `campusImages[0]`)
- **Primary source:** Wikipedia/Wikimedia Commons — search by college name (use abbreviation expansion)
- **Technique:** Try `[name, expandedName, name+city, first page from search]`
- **Fallback:** City landmark images from Wikipedia

### 8.2 Course Images (`cardImage` / `heroImage`) — 38 categories

```
computer_science, electronics, electrical, mechanical, civil, chemical,
biotechnology, aerospace, ai_ml, data_science, cyber_security, robotics,
mba, finance, marketing, hr, hotel_management, hospitality,
medical, dental, nursing, pharmacy, ayurveda, physiotherapy,
law, commerce, physics, chemistry, mathematics, biology,
arts, design, fashion, architecture, agriculture, veterinary,
education, aviation, diploma, general
```

Each has 3–15 verified Unsplash/Wikimedia URLs.

### 8.3 Activity Images — 17 Category Pools for `campusLife[].image`

| Category | Pool Size | Matched Titles |
|----------|-----------|----------------|
| `sports` | 15 | "Sports", "Athletic" |
| `clubs` | 15 | "Club", "Societ" |
| `cultural` | 12 | "Cultural", "Fest" (not tech) |
| `technical_fest` | 12 | "Technical Fest", "Tech Fest", "Hackathon" |
| `research` | 12 | "Research" |
| `clinical` | 10 | "Clinical" |
| `debate` | 6 | "Debate", "MUN" |
| `music` | 8 | "Music", "Band" |
| `drama` | 6 | "Drama", "Theatre" |
| `hostel` | 5 | "Hostel", "Accommodation" |
| `library` | 6 | "Library" |
| `placement` | 7 | "Placement" |
| `innovation` | 7 | "Innovation", "Startup", "Entrepreneur" |
| `community` | 7 | "Community", "Social" |
| `lab` | 8 | "Lab" |
| `general` | 11 | Default fallback |

### 8.4 `HOSTEL_POOL` — 15 verified Unsplash URLs
`photo-1555854877-bab0e564b8d5`, `photo-1631049307264-da0ec9d70304`, `photo-1564013799919-ab600027ffc6`, `photo-1540541338287-41700207dee6`, etc.

### 8.5 `LAB_POOL` — 15 verified Unsplash URLs
`photo-1581093458791-9d09c5e96d2e`, `photo-1532187863486-abf9dbad1b69`, `photo-1518152006812-edab29b069ac`, etc.

### 8.6 `EVENTS_POOL` — 15 verified Unsplash URLs
`photo-1505373877841-8d25f7d46678`, `photo-1492538368677-f6e0afe31dcc`, `photo-1497486751825-1233686d5d80`, etc.

### 8.7 "Bad Image" Patterns to Filter
```typescript
const BAD_PATTERNS = [
  '.svg', '.pdf', '.gif', 'coat_of_arms', 'seal_of', 'logo_of',
  'wordmark', 'flag_of', 'map_of', 'skyline', 'beach', 'fort_',
  'palace', 'fishing', 'bibliography', 'bazza', 'life_and_times',
  'temple', 'church', 'waterfall', 'railway', 'airport',
  'local_train', 'dental_coll', 'mount_carmel', 'harbour',
  'pradhan', 'brigade_road', 'portrait', 'bust_of', 'statue',
  'emblem', 'sigillum', 'siegel', 'vivekananda-1893',
  'k_sivan', 'manoj_bhargava', 'parag_agrawal' // people
];
```

---

## 9. Common Pitfalls

### Data Integrity
1. ❌ **Duplicate college entries** — Multiple colleges with same name (e.g., "IIT Delhi" created twice). Deduplicate before any operation.
2. ❌ **Orphaned course refs** — `college.courses[]` containing IDs that don't exist in `courses`.
3. ❌ **Mismatched `courses` and `courseOfferings`** — Lengths must match, `courseId`s must be identical.
4. ❌ **`courseName` drift** — Offering's `courseName` must match actual course's `name`.

### Images
5. ❌ **Same `campusImages[0]` on 10+ colleges** — Always unique. Fetch fresh Wikipedia image.
6. ❌ **PDF file as campus image** — RV University Mysore had `Mysore-University-Encyclopaedia-Vol-4-Part-1.pdf`. Always check extension.
7. ❌ **SVG coat-of-arms for US/UK universities** — Harvard/Oxford/Yale initially had seal.svg. Replace with actual campus photos.
8. ❌ **Person photos in `hostelImages`/`labsImages`** — IIT Bombay had K. Sivan, Manoj Bhargava, Parag Agrawal. Filter using `BAD_PATTERNS`.
9. ❌ **Figma `localhost:3845` URLs** — Broken in production. Replace with inline SVG data URIs.
10. ❌ **689+ colleges sharing one Unsplash photo** — Distribute via deterministic hash.
11. ❌ **Generic Unsplash for all course images** — Use topic-relevant pools (`computer_science` ≠ `mba` ≠ `medical`).

### Fees
12. ❌ **All colleges showing same `₹10,000` starting fee** — Use tier-based fees. Government `₹15K-50K`, Private `₹1.2-3L`, Top `₹3-6L`, etc.
13. ❌ **International colleges with `$10,000` flat** — Country-specific ranges (US Ivy $58-85K vs Germany €0-3K).
14. ❌ **Same fee string across 87 courses** — Course-specific fees by program type (MBBS ≠ BA ≠ B.Tech).

### Matching
15. ❌ **MBBS assigned to engineering colleges** — Match courses to college type using `getCoursesForCollege()`.
16. ❌ **IIM Bangalore with only 1 MBA course** — IIMs should have all MBA specializations + PGDM + Executive MBA.
17. ❌ **BITS Pilani with 3 courses** — Top private should have 6+.

### Contact & Metadata
18. ❌ **Empty `phone`/`email`/`website`** — Always set (templated OK).
19. ❌ **`establishedYear` < 1800 or > 2025** — Invalid. Use sensible default.
20. ❌ **Empty `amenities[]`** — Min 8 amenities per college (tier-based).

### Search & Security
21. ❌ **Unescaped `$regex: userInput`** — NoSQL injection. Use `escapeRegex()`.
22. ❌ **No pagination `limit` cap** — Use `Math.min(Math.max(1, limit), 50)`.

### Exam Model
23. ❌ **`examSchema.index({ title: 'text' })`** — `title` doesn't exist. Use `{ fullName: 'text', shortName: 'text' }`.

---

## 10. Scripts Inventory

All scripts in `Server/scripts/`:

| Script | Purpose |
|--------|---------|
| `expand-courses-mega.ts` | Create 430+ canonical courses, assign to colleges by type |
| `add-course-offerings.ts` | Generate per-college course data (fees, intake, cutoff, modules) |
| `enrich-all-courses.ts` | Full course data (description, syllabus, career, whyChoose, FAQs, skills, recruiters, jobRoles, salary) |
| `fix-fees-realistic.ts` | Tier-based realistic fees across all colleges and courses |
| `fix-college-images-deep.ts` | 5-strategy Wikipedia campus image fetch |
| `fix-course-images-real.ts` | Topic-relevant course images via Wikipedia search |
| `fix-course-images-and-amenities.ts` | Course images + add amenities array |
| `fix-all-image-arrays.ts` | Hostel/Lab/Events image pools + contact info |
| `fix-student-activity-photos.ts` | Student activity images (v1 — small pools) |
| `fix-activity-photos-v2.ts` | Student activity images (v2 — 17 category pools) |
| `add-south-india-colleges.ts` | Add 44 South India colleges with full data |

### Script Usage Pattern
```bash
cd Server
npx tsx scripts/<script-name>.ts
```

### When adding new colleges
1. Look at an existing well-populated college (e.g., IIT Bombay) for reference structure.
2. Use `getCollegeTier()` to determine fee tier.
3. Use `getCoursesForCollege()` to assign appropriate courses.
4. Pick hostel/lab/events images from pools using deterministic hash.
5. Assign campus image from Wikipedia (or city fallback).
6. Fill all 11 sections per §12.1 checklist.

### When adding new courses
1. Add to canonical list in `expand-courses-mega.ts`.
2. Ensure unique `name`.
3. Assign to correct stream.
4. Provide realistic `fees` range (generic — overridden per college).
5. Ensure topic-relevant `cardImage` — pick category from §8.2.
6. Run `enrich-all-courses.ts` to auto-fill description/syllabus/career/FAQs/skills/etc.

---

## 11. Conversation Work History

Chronological log of major data operations performed:

### Phase 1 — Image Audit & Cleanup
- Identified **22 duplicate image groups** across colleges; fixed all.
- Removed **10 duplicate college entries** (IIIT Delhi, PES University, etc. appearing twice).
- Fixed **93 broken/wrong images** (PDF, SVG logos, coats of arms).
- **173 colleges** got unique Wikipedia campus images (out of 220 with bad images).
- Final result: **1,506 / 1,688 colleges (89%)** had correct campus images.

### Phase 2 — Course Images
- All **130 courses** given topic-relevant images (Wikipedia 112, fallback 13).
- **0 courses** left without images.

### Phase 3 — Fees Overhaul
- Replaced generic `$10,000-$60,000` fees on 261 intl colleges with country-specific ranges.
- Replaced `₹10,000` low fees on Indian colleges with tier-appropriate values.
- **104 courses** got course-type-specific fees (MBBS ≠ B.Tech ≠ BA).
- **1,636 colleges** got tier-based annual fees.

### Phase 4 — Contact Info & Metadata
- Added `phone`, `email`, `website` to all **1,688 colleges** (0/1,688 → 1,688/1,688).
- Added `address` field where missing (city+state+country).
- Fixed **40 colleges** with invalid `establishedYear`.
- Added `amenities[]` (8–12 items) to all **1,688 colleges** (tier-specific).

### Phase 5 — Course Expansion (130 → 378)
- **378 unique courses** across 11 streams.
- **88,923 college-course associations** (up from 35,441).
- **Avg 52.7 courses per college** (up from 21).
- **0 colleges** with 0 courses.
- Per-college `courseOfferings[]` with fees/intake/cutoff/modules.

### Phase 6 — Student Activity Photos
- **4,692 activities** fixed (previously reused college's main building photo).
- 17 topic-relevant image pools (sports, clubs, cultural, technical_fest, etc.).
- Deterministic hash-based distribution per college.

### Phase 7 — Image Array Cleanup
- Hostel images: 1 shared by 689 colleges → **691 unique** (max reuse 119).
- Lab images: 1 shared by 1,654 → **511 unique** (max reuse 143).
- Events images: 2 shared by 1,804 → **873 unique** (max reuse 153).
- Removed K. Sivan, Manoj Bhargava, Parag Agrawal portraits from hostel/lab/events.

### Phase 8 — Course Enrichment (all 378 courses)
- Description (200+ chars each) — 50/378 → **378/378**.
- Syllabus (2–4 semesters, 5+ topics) — 50/378 → **378/378**.
- Career Opportunities (4+ items) — 50/378 → **378/378**.
- Why Choose (4 reasons) — 50/378 → **378/378**.
- About/Highlights — 50/378 → **378/378**.
- FAQs (4 questions) — 50/378 → **378/378**.
- **NEW:** `skills[]` (5–8 items) — **378/378**.
- **NEW:** `topRecruiters[]` (8–10) — **378/378**.
- **NEW:** `jobRoles[]` (5–6) — **378/378**.
- **NEW:** `salary{entry,mid,senior}` — **378/378**.

### Phase 9 — South India Expansion (+44 colleges)
| State | Before | After | Notable additions |
|-------|--------|-------|-------------------|
| Karnataka | 268 | **285** | BMS, PES, MSRIT, DSCE, JSS Mysore, KMC Manipal, MCODS, Bangalore Medical College, Mount Carmel, St. Joseph's |
| Tamil Nadu | 122 | **133** | Madras Medical, Stanley Medical, MCC, Stella Maris, Anna University, CEG Guindy, SSN, CIT, Thiagarajar |
| Kerala | 82 | **90** | GMC Trivandrum, Kerala University, CET, GEC Thrissur, CUSAT, Maharaja's, Sacred Heart, Calicut University, MGU |
| Telangana | 54 | **58** | Osmania Medical, Gandhi Medical, CBIT, Vasavi |
| Andhra Pradesh | 42 | **45** | Andhra Medical, Sri Venkateswara University, GITAM |
| Puducherry | 11 | **12** | IGMCRI |
| **Total** | 579 | **623** | |

---

## 12. Validation Checklists

### 12.1 New College Checklist (every item must pass)

**Identity & Location:**
- [ ] `name` is unique across DB
- [ ] `slug` is URL-friendly, max 25 chars
- [ ] `city`, `state`, `country` populated
- [ ] `address` = `"City, State, Country"`
- [ ] `type` in {Government, Private, Public}
- [ ] `establishedYear` in [1800, 2025]
- [ ] `description` ≥ 100 chars

**Images:**
- [ ] `campusImages[0]` is unique across DB
- [ ] `campusImages[0]` is real Wikipedia/Wikimedia campus photo
- [ ] `campusImages[0]` does NOT match `BAD_PATTERNS` (no SVG, PDF, GIF, logos, people)
- [ ] `logo` is set
- [ ] `hostelImages[]` uses `HOSTEL_POOL` (distribute via hash)
- [ ] `labsImages[]` uses `LAB_POOL`
- [ ] `eventsImages[]` uses `EVENTS_POOL`

**Contact:**
- [ ] `phone` in correct format
- [ ] `email` = `info@<slug>.ac.in` or `.edu`
- [ ] `website` = `https://www.<slug>.ac.in` or `.edu`

**Fees (all ₹ strings):**
- [ ] `annualFee` matches college tier
- [ ] `avgAnnualFee` set
- [ ] `hostelFee`, `messFee`, `libraryFee`, `laboratoryFee`, `sportsFee` set
- [ ] `feesPaymentFaqs[]` has ≥ 3 items

**Placement:**
- [ ] `placementPercentage` in [60, 99]
- [ ] `averageSalary`, `highestSalary` set (string or number)
- [ ] `placementTrends[]` has 5 years
- [ ] `studentsWithInternships`, `avgStipend`, `ppoConversionRate` set
- [ ] `alumniInFortune500`, `alumniEntrepreneurs`, `alumniHigherStudiesAbroad` set

**Courses:**
- [ ] `courses[]` matches college type (no MBBS at engineering colleges)
- [ ] `courseOfferings[].length === courses.length`
- [ ] Each offering has `courseId`, `courseName`, `fees`, `intake`, `duration`
- [ ] Top-tier colleges have `cutoff` on key courses

**Admissions:**
- [ ] All 6 date fields set
- [ ] `admissionMode[]` has ≥ 1 entry
- [ ] `admissionFaqs[]`, `courseFaqs[]`, `scholarshipFaqs[]` all ≥ 3

**Campus & Relations:**
- [ ] `campusSize` = `"X Acres"`
- [ ] `amenities[]` has ≥ 8 items
- [ ] `campusLife[]` has 2–4 activities with category-relevant images
- [ ] `university` ref set
- [ ] `recruiters[]`, `scholarships[]` populated
- [ ] `accreditation[]` has ≥ 1 item

### 12.2 New Course Checklist

- [ ] `name` unique
- [ ] `stream` ObjectId valid
- [ ] `type`, `duration`, `fees`, `intakeCapacity` set
- [ ] `eligibility[]` has ≥ 2 items
- [ ] `cardImage` + `heroImage` topic-relevant (from §8.2 categories)
- [ ] `description.content` ≥ 200 chars
- [ ] `syllabus.semesters[]` has 2–4 semesters, each with 5+ topics
- [ ] `careerOpportunities.items[]` has ≥ 4 items
- [ ] `whyChoose.reasons[]` has ≥ 4 reasons
- [ ] `about.points[]` has ≥ 4 points
- [ ] `faqs.items[]` has ≥ 4 FAQs
- [ ] `skills[]` has 5–8 items
- [ ] `topRecruiters[]` has 8–10 companies
- [ ] `jobRoles[]` has 5–6 roles
- [ ] `salary.entry` / `mid` / `senior` all set

---

## 13. Current DB Stats (2026-04-16)

### Colleges
- **Total:** 1,732 (1,471 Indian + 261 International)
- **International by country:** US 50, UK 30, Canada 20, Australia 20, Germany 20, France 15, Japan 15, China 15, South Korea 12, Netherlands 10, UAE 10, Malaysia 10, Ireland 10, Singapore 8, New Zealand 8, Sweden 8
- **South India coverage:** 623 colleges (Karnataka 285, Tamil Nadu 133, Kerala 90, Telangana 58, Andhra Pradesh 45, Puducherry 12)

### Courses
- **Unique courses:** 378 across 11 streams
- **By stream:** Engineering 125, Medical 80, Management 63, Science 55, Arts 44, Design 24, Law 19, Commerce 19, Pharmacy 16, Education 16, Agriculture 15

### Relations
- **College-course associations:** 88,923 (avg 52.7 per college)
- **Per-college offerings (with fees/intake):** 88,923
- **Indian avg:** ~48 courses per college
- **International avg:** ~48 courses per college

### Supporting Data
- **Student activities (campusLife):** 4,692
- **FAQs across colleges:** 10,395+
- **Universities:** 54
- **Recruiters:** 15
- **Scholarships:** 15
- **Entrance exams:** 15
- **Blogs:** 1,353
- **Reviews:** 12

### Image Quality
- **Correct campus photos:** 89% (Wikipedia/Wikimedia + Campusways)
- **Unique campus images:** 100% (0 duplicates across colleges)
- **Course images:** 100% populated (Wikipedia 112, fallbacks 18)
- **Amenities:** 100% of colleges
- **Contact info:** 100% of colleges
- **Hostel images:** 691 unique URLs
- **Lab images:** 511 unique URLs
- **Events images:** 873 unique URLs

---

## 14. Frontend Display Contract

When client renders a college, it expects these fields populated (critical paths):

### College Detail Page (`/colleges/[id]`)
- `campusImages[0]` → Banner photo
- `logo` → College logo
- `name`, `city`, `state`, `accreditation[]` → Hero card
- `courseOfferings[]` → Fees/intake/cutoff table (NOT `courses[].fees`)
- `campusLife[]` → Student activities section
- `placementTrends[]` → 5-year graph
- `recruiters[]` (populated) → Recruiters section
- `scholarships[]` (populated) → Scholarships section
- `admissionFaqs[]`, `courseFaqs[]`, `feesPaymentFaqs[]`, `scholarshipFaqs[]` → FAQ section
- `applicationClosingDate` → "Contact Us on WhatsApp" if expired (see AdmissionsDeadlineCard.tsx)

### Course Detail Page (`/courses/[id]`)
- `cardImage`, `heroImage` → Hero
- `description.content` → About section
- `syllabus.semesters[]` → Curriculum
- `careerOpportunities.items[]` → Career section
- `whyChoose.reasons[]` → Why Choose section
- `about.points[]` → Highlights
- `faqs.items[]` → FAQs
- `skills[]`, `topRecruiters[]`, `jobRoles[]`, `salary` → Career info

### Listing Pages (`/colleges`, `/courses`)
- Card uses `college.annualFeesRange` (fallback to `annualFee` formatted)
- `college.campusImages[0]` or `college.logo` for card image
- `course.cardImage` for course cards

---

## 15. Quick Reference: Field Count Per Schema

| Schema | Total Fields |
|--------|--------------|
| College | ~55 fields across 11 groups |
| Course | 23 fields (10 top-level + 6 rich objects + 4 new career fields + timestamps) |
| Course Offering | 7 fields |
| Stream | 5 fields |
| University | 8 fields |
| Recruiter | 8 fields |
| Scholarship | 12 fields |
| Exam | 10+ fields |
| CampusLife item | 8 fields (per nested object) |
| Placement Trend item | 3 fields |
| Admission Mode item | 3 fields |

---

**When creating any new data, work through:**
1. §12 Validation Checklist
2. §7 Helper Functions (tier detection, fee/intake/cutoff)
3. §8 Image Pools (pick category, use hash distribution)
4. §9 Common Pitfalls (verify none apply)
5. §10 Scripts (reuse patterns from existing scripts)

**Never skip a required field. Never share images between unrelated entities. Never use fake/invalid URLs.**
