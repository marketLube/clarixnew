# Clarix Education — Database Schema Reference

**Last updated:** 2026-04-16
**Purpose:** Complete reference for ALL fields that must be populated when creating colleges or courses. Use this checklist before adding any new data to ensure nothing is missed.

---

## Table of Contents

1. [College Schema](#college-schema)
2. [Course Schema](#course-schema)
3. [Course Offering Schema (per-college)](#course-offering-schema)
4. [Helper Functions Reference](#helper-functions)
5. [Image Pools](#image-pools)
6. [Common Pitfalls](#common-pitfalls)

---

## 1. College Schema

A college document MUST have ALL of these fields populated:

### Required Top-Level Fields
| Field | Type | Required | Notes |
|-------|------|----------|-------|
| `name` | string | YES | Full official name. No duplicates across DB |
| `slug` | string | YES | URL-friendly version of name |
| `city` | string | YES | City name |
| `state` | string | YES | State name |
| `country` | string | YES | "India" or other country name |
| `address` | string | YES | Full address (city, state, country) |
| `establishedYear` | number | YES | 1800-2025, never null/invalid |
| `description` | string | YES | At least 100 chars, college overview |

### Identification & Type
| Field | Type | Notes |
|-------|------|-------|
| `type` | string | "Government", "Private", "Public" |
| `university` | ObjectId ref | Reference to universities collection |
| `accreditation` | array of strings | ["NAAC A+", "NIRF Rank 45", "AICTE Approved", etc.] |
| `category` | ObjectId | Reference to streams |

### Images (CRITICAL - always populate)
| Field | Type | Notes |
|-------|------|-------|
| `logo` | string URL | College logo (Wikipedia or official) |
| `campusImages` | array of URLs | Min 1, max 5. Real campus photos. NO duplicates across colleges |
| `hostelImages` | array of URLs | 1-3 unique hostel/dorm photos from pool |
| `labsImages` | array of URLs | 1-3 unique lab photos from pool |
| `eventsImages` | array of URLs | 1-3 unique event photos from pool |
| `bannerImage` | string URL | Optional hero banner |

### Contact Info
| Field | Type | Notes |
|-------|------|-------|
| `phone` | string | Format: `+91-XXX-XXX-XXXX` (India) or `+1-XXX-XXX-XXXX` (international) |
| `email` | string | Format: `info@<slug>.ac.in` (India) or `info@<slug>.edu` (international) |
| `website` | string | Format: `https://www.<slug>.ac.in` |

### Fees Structure
| Field | Type | Notes |
|-------|------|-------|
| `annualFee` | string | Tier-based realistic value (see helper) |
| `avgAnnualFee` | string | Same as annualFee usually |
| `hostelFee` | string | "₹X / year" |
| `messFee` | string | "₹X / year" |
| `libraryFee` | string | "₹X / year" |
| `laboratoryFee` | string | "₹X / year" |
| `sportsFee` | string | "₹X / year" |
| `feesPaymentFaqs` | array of {question, answer} | Min 3 FAQs |

### Placement Data
| Field | Type | Notes |
|-------|------|-------|
| `placementPercentage` | number | 60-99 |
| `averageSalary` | string/number | "₹X LPA" |
| `highestSalary` | string/number | "₹X LPA" |
| `placementTrends` | array of {year, avgSalary, placementPercentage} | Min 5 years |
| `studentsWithInternships` | number | Percentage |
| `avgStipend` | number | INR amount |
| `ppoConversionRate` | number | Percentage |
| `alumniInFortune500` | number | Percentage |
| `alumniEntrepreneurs` | number | Percentage |
| `alumniHigherStudiesAbroad` | number | Percentage |

### Courses & Offerings (CRITICAL)
| Field | Type | Notes |
|-------|------|-------|
| `courses` | array of ObjectId refs | Course IDs from courses collection |
| `courseOfferings` | array of objects | College-specific course data (see Course Offering Schema below) |

### Admissions
| Field | Type | Notes |
|-------|------|-------|
| `applicationOpeningDate` | Date | When admissions open |
| `applicationClosingDate` | Date | When admissions close |
| `entranceExamDate` | Date | |
| `meritListAnnouncementDate` | Date | |
| `counsellingStartsFrom` | Date | |
| `accademicSectionStartsFrom` | Date | |
| `admissionMode` | array of {mode, label, description} | E.g., "Direct", "Entrance", "Merit" |
| `admissionFaqs` | array of {question, answer} | Min 3 FAQs |
| `courseFaqs` | array of {question, answer} | Min 3 FAQs |
| `scholarshipFaqs` | array of {question, answer} | Min 3 FAQs |

### Campus & Facilities
| Field | Type | Notes |
|-------|------|-------|
| `campusSize` | string | "X Acres" |
| `amenities` | array of strings | ["Library", "Wifi Campus", "Cafeteria", "Sports Ground", "Hostel", "Medical Facility", "Computer Lab", "Auditorium", "Gym"] |
| `campusLife` | array of {title, description, image, tags, source, isActive, verified} | Student activity list (12.5+ avg) |

### Relations
| Field | Type | Notes |
|-------|------|-------|
| `recruiters` | array of ObjectId refs | Top recruiters from recruiters collection |
| `scholarships` | array of ObjectId refs | Available scholarships |

### Brochure & Misc
| Field | Type | Notes |
|-------|------|-------|
| `brochure` | string URL | PDF brochure link |
| `gallery` | array of URLs | Optional additional gallery |

---

## 2. Course Schema

A course document MUST have ALL of these fields:

### Required Top-Level Fields
| Field | Type | Notes |
|-------|------|-------|
| `name` | string | Full course name (e.g., "B.Tech Computer Science and Engineering") |
| `shortDescription` | string | One-line summary |
| `stream` | ObjectId ref | Reference to streams collection |
| `type` | string | "Full Time", "Part Time", "Distance" |
| `duration` | string | "4 Years", "2 Years", "5 Years", etc. |
| `fees` | string | Generic fee range (overridden by college-specific in offerings) |
| `intakeCapacity` | string | "Varies by college" or specific |
| `eligibility` | array of strings | Min 2 items |

### Images
| Field | Type | Notes |
|-------|------|-------|
| `cardImage` | string URL | Topic-relevant Unsplash/Wikipedia image |
| `heroImage` | string URL | Same or larger version |

### Rich Description
| Field | Type | Notes |
|-------|------|-------|
| `description` | object | `{title, content, image}` — content min 200 chars |
| `about` | object | `{title, description, points: [{title, description}]}` — Min 4 points |
| `whyChoose` | object | `{title, description, reasons: [{title, description}]}` — Min 4 reasons |
| `syllabus` | object | `{title, semesters: [{title, topics: []}]}` — Min 2-4 semesters with min 5 topics each |
| `careerOpportunities` | object | `{title, items: [{title, description}]}` — Min 4 items |
| `faqs` | object | `{title, description, items: [{question, answer}]}` — Min 4 FAQs |

### NEW Career-Focused Fields (added in latest update)
| Field | Type | Notes |
|-------|------|-------|
| `skills` | array of strings | Skills students learn (5-8 items) |
| `topRecruiters` | array of strings | Top 8-10 hiring companies |
| `jobRoles` | array of strings | Common job titles after graduation |
| `salary` | object | `{entry: "₹X-Y LPA", mid: "₹X-Y LPA", senior: "₹X-Y LPA"}` |

---

## 3. Course Offering Schema (per-college)

Each entry in `college.courseOfferings` must have:

| Field | Type | Notes |
|-------|------|-------|
| `courseId` | ObjectId ref | Reference to course |
| `courseName` | string | Denormalized course name (must match course.name) |
| `fees` | string | College-specific fees (e.g., IIT B.Tech: "₹2,09,550 / year") |
| `intake` | string | Seats (e.g., "60-120 seats") |
| `duration` | string | Same as course.duration |
| `cutoff` | string (optional) | Entrance cutoff (e.g., "JEE Advanced rank under 5,000") |
| `modules` | array of strings (optional) | Course-specific curriculum modules |

---

## 4. Helper Functions Reference

When adding new colleges, use these tier-based helpers:

### College Tier Detection
```typescript
function getCollegeTier(name: string, country?: string): string {
  // Returns: 'IIT' | 'IIM' | 'AIIMS' | 'NIT' | 'IIIT' | 'BITS' | 'NLU' | 'NIFT'
  //        | 'TopPrivate' | 'Government' | 'Private' | 'Polytechnic'
  //        | 'IvyLeague' | 'TopIntl' | 'Intl'
}
```

### Realistic Fee Ranges by Tier

**Indian colleges (Annual Fee):**
- IIT: `₹2,09,550 / year`
- IIM: `₹14,00,000 - ₹25,00,000 / year`
- NIT: `₹1,63,750 / year`
- IIIT: `₹2,80,000 / year`
- AIIMS: `₹1,628 - ₹6,000 / year`
- BITS: `₹5,55,000 / year`
- NLU: `₹2,50,000 - ₹3,50,000 / year`
- NIFT: `₹2,80,000 - ₹3,50,000 / year`
- Top Private (VIT/SRM/Manipal): `₹2,40,000 - ₹6,00,000 / year`
- Government colleges: `₹15,000 - ₹85,000 / year`
- Private colleges: `₹80,000 - ₹2,50,000 / year`
- Polytechnic: `₹15,000 - ₹50,000 / year`
- Medical (private): `₹3,50,000 - ₹18,00,000 / year`
- Engineering (private): `₹1,20,000 - ₹3,50,000 / year`

**International colleges:**
- US Ivy League: `$58,000 - $85,000 / year`
- US public uni: `$30,000 - $55,000 / year`
- UK top: `£28,000 - £50,000 / year`
- UK general: `£18,000 - £35,000 / year`
- Canada: `CAD 25,000 - CAD 65,000 / year`
- Australia: `AUD 28,000 - AUD 55,000 / year`
- Germany: `€0 - €3,000 / year`
- Singapore: `SGD 20,000 - SGD 55,000 / year`
- Japan: `¥800,000 - ¥1,800,000 / year`
- China: `CNY 20,000 - CNY 90,000 / year`

### Course Selection by College Type
- **IITs** → All B.Tech specializations + select M.Tech + MBA + PhD
- **NITs** → Core B.Tech + M.Tech + MBA
- **IIITs** → CS/IT-focused B.Tech + M.Tech
- **IIMs** → MBA, PGDM, Executive MBA, all specializations + PhD
- **AIIMS** → MBBS, MD, MS, B.Sc Nursing, allied health
- **NLUs** → BA LLB, BBA LLB, B.Com LLB, LLB, LLM
- **NIFT/NID** → B.Des, M.Des in design specializations
- **Pharmacy colleges** → B.Pharm, D.Pharm, M.Pharm, Pharm.D
- **Nursing colleges** → B.Sc Nursing, GNM, ANM, M.Sc Nursing
- **Universities** → Wide range across all streams
- **Engineering colleges** → 35+ B.Tech + M.Tech + MBA
- **Polytechnics** → Diploma in core engineering branches

---

## 5. Image Pools

### College Campus Images
- **Primary source:** Wikipedia/Wikimedia Commons (search by college name)
- **Fallback:** Curated city/regional images
- **NEVER use:** SVG logos, coats of arms, PDF files, GIFs

### Course Images (Topic-relevant)
Pre-mapped categories:
- `computer_science`, `electronics`, `electrical`, `mechanical`, `civil`, `chemical`
- `biotechnology`, `aerospace`, `ai_ml`, `data_science`, `cyber_security`, `robotics`
- `mba`, `finance`, `marketing`, `hr`, `hotel_management`, `hospitality`
- `medical`, `dental`, `nursing`, `pharmacy`, `ayurveda`, `physiotherapy`
- `law`, `commerce`, `physics`, `chemistry`, `mathematics`, `biology`
- `arts`, `design`, `fashion`, `architecture`, `agriculture`, `veterinary`
- `education`, `aviation`, `diploma`, `general`

### Activity Images (for campusLife)
17 verified Unsplash pools:
- `sports`, `clubs`, `cultural`, `technical_fest`, `research`, `clinical`
- `debate`, `music`, `drama`, `hostel`, `library`, `placement`
- `innovation`, `community`, `lab`, `general`

### Hostel/Lab/Events Pool Sizes
- `HOSTEL_POOL`: 15 unique images
- `LAB_POOL`: 15 unique images
- `EVENTS_POOL`: 15 unique images

---

## 6. Common Pitfalls (DON'T DO THESE)

### From Past Audits

1. ❌ **Don't reuse the same image across multiple colleges** — Use deterministic hash of name to pick from pool
2. ❌ **Don't use SVG logos as campus images** — They show as broken or wrong content
3. ❌ **Don't use PDF files as image URLs** — RV University Mysore had this issue
4. ❌ **Don't use generic Unsplash for ALL course images** — Use topic-relevant pools
5. ❌ **Don't share annual fees across all colleges** — Each tier has specific fees
6. ❌ **Don't forget course offerings** — Same course needs different fees per college
7. ❌ **Don't add admissions of MBBS to engineering colleges** — Match courses to college type
8. ❌ **Don't skip contact info** — phone/email/website must be set
9. ❌ **Don't use `establishedYear` < 1800 or > 2025** — Invalid years
10. ❌ **Don't use people-photos in hostel/lab/events arrays** — Audit for K. Sivan, etc.
11. ❌ **Don't use `localhost:3845` Figma URLs** — Replace with inline SVG data URIs
12. ❌ **Don't share course images across unrelated subjects** — B.Tech CSE and B.Sc Nursing should have different images
13. ❌ **Don't skip the courseOfferings field** — Required for college-specific data display
14. ❌ **Don't leave amenities array empty** — Min 8 amenities per college
15. ❌ **Don't share student activity photos across all colleges** — Use category-relevant pools

### Frontend Display Requirements

When client displays a college, it expects:
- `campusImages[0]` — Main banner photo (use real college photo, not logo)
- `logo` — College logo
- `courseOfferings[]` — For showing fees/intake/cutoff per course
- `campusLife[]` — Student activities with images
- `placementTrends[]` — For 5-year graph
- `recruiters[]` populated — For recruiters section
- `scholarships[]` populated — For scholarships section

---

## 7. Validation Checklist for New College

Before saving a new college, verify:

- [ ] All required fields populated (name, slug, city, state, country, address, establishedYear, description)
- [ ] `campusImages[0]` is a real Wikipedia/Wikimedia campus photo (not SVG/PDF/logo/people)
- [ ] `campusImages[0]` is unique across all colleges
- [ ] `logo` is set
- [ ] `phone`, `email`, `website` populated
- [ ] `annualFee` matches college tier
- [ ] `amenities[]` has 8+ items
- [ ] `courses[]` matches college type (no MBBS at engineering colleges)
- [ ] `courseOfferings[]` exists with college-specific fees/intake for each course
- [ ] `campusLife[]` has 2-4 activities with category-relevant images
- [ ] `recruiters[]`, `scholarships[]`, `university` are populated
- [ ] `placementTrends[]` has 5 years of data
- [ ] All FAQ arrays have 3+ items
- [ ] `hostelImages[]`, `labsImages[]`, `eventsImages[]` use category pools (no duplicates)

## 8. Validation Checklist for New Course

Before saving a new course, verify:

- [ ] `name` is unique
- [ ] `stream` ObjectId is valid
- [ ] `duration`, `fees`, `eligibility[]` populated
- [ ] `cardImage` and `heroImage` set with topic-relevant URL
- [ ] `description.content` is min 200 chars
- [ ] `syllabus.semesters[]` has 2-4 semesters with topics
- [ ] `careerOpportunities.items[]` has 4+ items
- [ ] `whyChoose.reasons[]` has 4+ reasons
- [ ] `about.points[]` has 4+ points
- [ ] `faqs.items[]` has 4+ FAQs
- [ ] `skills[]` has 5-8 items
- [ ] `topRecruiters[]` has 8-10 companies
- [ ] `jobRoles[]` has 5-6 roles
- [ ] `salary.entry/mid/senior` all set

---

## 9. Current Database Stats (as of 2026-04-16)

- **Total colleges:** 1,688 (1,427 Indian + 261 International)
- **Total unique courses:** 378
- **Total course-college associations:** 88,923
- **Total college-specific offerings:** 88,923 (with fees, intake, cutoff, modules)
- **Total student activities:** 4,692
- **Total FAQs (across colleges):** 10,395+

### South India Coverage (areas to focus expansion):
- Karnataka: Bangalore, Mysore, Mangalore, Hubli, Belgaum, Manipal
- Tamil Nadu: Chennai, Coimbatore, Madurai, Tiruchirappalli, Vellore, Tirunelveli
- Kerala: Kochi/Ernakulam, Thiruvananthapuram, Kozhikode, Thrissur, Kollam
- Andhra Pradesh / Telangana: Hyderabad, Vijayawada, Visakhapatnam, Tirupati, Warangal

---

## 10. Scripts to Use

When adding new data, refer to these existing scripts in `Server/scripts/`:

- `expand-courses-mega.ts` — Course-college associations
- `add-course-offerings.ts` — Per-college course data
- `enrich-all-courses.ts` — Full course descriptions/syllabus/career
- `fix-fees-realistic.ts` — Tier-based fees
- `fix-college-images-deep.ts` — Find Wikipedia campus images
- `fix-course-images-real.ts` — Topic-relevant course images
- `fix-all-image-arrays.ts` — Hostel/lab/events + contact info
- `fix-activity-photos-v2.ts` — Student activity images
- `fix-course-images-and-amenities.ts` — Amenities

When creating new colleges/courses, follow the patterns in these scripts and ensure ALL fields from the schema above are populated.
