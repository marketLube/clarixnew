/**
 * Batch 2: 100+ additional SEO blog posts for Clarix Education.
 * Covers more cities, courses, career paths, and admission guides.
 */

export const SEO_BLOG_PREFIX_B2 = "clarix-b2-";

export interface SeoBlog2 {
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  tags: string[];
  category: string;
  readTime: string;
  views: number;
}

function b(title: string, slug: string, excerpt: string, content: string, tags: string[], cat: string, rt: string, v: number): SeoBlog2 {
  return { title, slug: `${SEO_BLOG_PREFIX_B2}${slug}`, excerpt, content, tags, category: cat, readTime: rt, views: v };
}

function best(course: string, loc: string, slug: string, colleges: string[], tags: string[]): SeoBlog2 {
  const c = `## Best ${course} Colleges in ${loc} (2026)\n\n${colleges.map((x, i) => `### ${i+1}. ${x}\nTop institution for ${course} in ${loc} with strong academics, faculty, and placement record.\n`).join("\n")}\n## How to Choose\n1. Check accreditation (NAAC/NBA)\n2. Compare placement records\n3. Visit campus\n4. Talk to alumni\n5. Consider fees vs ROI`;
  return b(`Best ${course} Colleges in ${loc} 2026 — Rankings & Fees`, slug, `Top ${course} colleges in ${loc} with admission details, fees, and placements.`, c, tags, "College Rankings", "7 min", 5000 + Math.floor(Math.random() * 20000));
}

export const SEO_BLOGS_BATCH2: SeoBlog2[] = [
  // ─── More B.Tech by city ───
  best("B.Tech", "Jaipur", "btech-jaipur", ["MNIT Jaipur", "LNMIIT", "Manipal Jaipur", "Poornima University", "Amity Jaipur", "JECRC University", "Jaipur Engineering College"], ["B.Tech", "Jaipur"]),
  best("B.Tech", "Lucknow", "btech-lucknow", ["HBTU Kanpur", "IET Lucknow", "BBDU Lucknow", "Amity Lucknow", "Integral University", "Babu Banarasi Das University"], ["B.Tech", "Lucknow"]),
  best("B.Tech", "Chandigarh", "btech-chandigarh", ["PEC Chandigarh", "UIET Panjab University", "Chitkara University", "CGC Landran", "NITTTR Chandigarh"], ["B.Tech", "Chandigarh"]),
  best("B.Tech", "Ahmedabad", "btech-ahmedabad", ["IIT Gandhinagar", "DAIICT", "LDCE Ahmedabad", "Nirma University", "Gujarat Technological University", "Silver Oak University"], ["B.Tech", "Ahmedabad"]),
  best("B.Tech", "Bhubaneswar", "btech-bhubaneswar", ["IIT Bhubaneswar", "NIT Rourkela", "KIIT", "SOA University", "VSSUT Burla", "CET Bhubaneswar"], ["B.Tech", "Bhubaneswar"]),
  best("B.Tech", "Guwahati", "btech-guwahati", ["IIT Guwahati", "NIT Silchar", "Tezpur University", "Assam Engineering College", "Jorhat Engineering", "Don Bosco University"], ["B.Tech", "Guwahati"]),
  best("B.Tech", "Patna", "btech-patna", ["IIT Patna", "NIT Patna", "BIT Mesra Ranchi", "Chandigarh University", "Birla Institute Patna", "Amity Patna"], ["B.Tech", "Patna"]),
  best("B.Tech", "Nagpur", "btech-nagpur", ["VNIT Nagpur", "RCOEM Nagpur", "GHRCE Nagpur", "Yeshwantrao Chavan College", "Priyadarshini College", "KDKCE Nagpur"], ["B.Tech", "Nagpur"]),
  best("B.Tech", "Indore", "btech-indore", ["IIT Indore", "IIM Indore", "DAVV Indore", "Medicaps University", "Acropolis Institute", "Prestige Institute"], ["B.Tech", "Indore"]),
  best("B.Tech", "Coimbatore", "btech-coimbatore", ["PSG Tech", "Amrita Coimbatore", "Kumaraguru", "Sri Krishna College", "Karpagam", "Bannari Amman", "Kongu Engineering"], ["B.Tech", "Coimbatore"]),
  best("B.Tech", "Trivandrum", "btech-trivandrum", ["CET Trivandrum", "TKM Kollam", "GEC Barton Hill", "Mar Baselios Trivandrum", "LBS Trivandrum"], ["B.Tech", "Trivandrum"]),
  best("B.Tech", "Thrissur", "btech-thrissur", ["GEC Thrissur", "Vidya Academy", "NCERC Thrissur", "St. Joseph's Thrissur", "Sahrdaya Thrissur"], ["B.Tech", "Thrissur"]),

  // ─── MBA by more cities ───
  best("MBA", "Kolkata", "mba-kolkata", ["IIM Calcutta", "XLRI Jamshedpur", "IIT Kharagpur VGSoM", "IIFT Kolkata", "IISWBM", "Army Institute of Management"], ["MBA", "Kolkata"]),
  best("MBA", "Hyderabad", "mba-hyderabad", ["ISB Hyderabad", "IIM Visakhapatnam", "IBS Hyderabad", "Osmania University", "NALSAR", "Aurora Business School"], ["MBA", "Hyderabad"]),
  best("MBA", "Ahmedabad", "mba-ahmedabad", ["IIM Ahmedabad", "MICA Ahmedabad", "Nirma University", "Gujarat University", "Ahmedabad University"], ["MBA", "Ahmedabad"]),
  best("MBA", "Jaipur", "mba-jaipur", ["IIM Udaipur", "IIHMR Jaipur", "Jaipuria Jaipur", "Amity Jaipur", "LNM Jaipur", "Manipal Jaipur"], ["MBA", "Jaipur"]),
  best("MBA", "Lucknow", "mba-lucknow", ["IIM Lucknow", "RMLNLU", "Amity Lucknow", "BBDU", "Jaipuria Lucknow", "SRMS Lucknow"], ["MBA", "Lucknow"]),
  best("MBA", "Kochi", "mba-kochi", ["Rajagiri College Kochi", "SCMS Cochin", "CUSAT", "FISAT MBA", "Marian College", "Albertian Institute"], ["MBA", "Kochi"]),
  best("MBA", "Calicut", "mba-calicut", ["IIM Kozhikode", "Calicut University", "Farook Business School", "TKM Institute", "EMEA College"], ["MBA", "Calicut"]),

  // ─── MBBS by more locations ───
  best("MBBS", "Delhi", "mbbs-delhi", ["AIIMS Delhi", "Maulana Azad Medical", "Lady Hardinge Medical", "UCMS", "VMMC Safdarjung", "Army Hospital R&R"], ["MBBS", "Delhi"]),
  best("MBBS", "Mumbai", "mbbs-mumbai", ["Grant Medical College", "Seth GS Medical", "KEM Hospital", "LTMMC Sion", "Topiwala National Medical", "BYL Nair Hospital"], ["MBBS", "Mumbai"]),
  best("MBBS", "Bangalore", "mbbs-bangalore", ["Bangalore Medical College", "St. John's Medical", "Ramaiah Medical", "MS Ramaiah", "Kempegowda Institute", "MVJ Medical"], ["MBBS", "Bangalore"]),
  best("MBBS", "Kolkata", "mbbs-kolkata", ["Calcutta Medical College", "R.G. Kar Medical", "NRS Medical", "Medical College Kolkata", "IPGMER Kolkata", "Nilratan Sircar Medical"], ["MBBS", "Kolkata"]),
  best("MBBS", "Pune", "mbbs-pune", ["AFMC Pune", "BJ Medical College", "Smt. Kashibai Navale", "Dr. DY Patil Medical", "Bharati Vidyapeeth Medical"], ["MBBS", "Pune"]),
  best("MBBS", "Hyderabad", "mbbs-hyderabad", ["Osmania Medical College", "Gandhi Medical College", "Deccan Medical College", "ESIC Medical Hyderabad", "Nizam's Institute"], ["MBBS", "Hyderabad"]),
  best("MBBS", "Lucknow", "mbbs-lucknow", ["KGMU Lucknow", "Era's Lucknow Medical", "Integral Medical", "Hind Medical Lucknow", "Mayo Institute"], ["MBBS", "Lucknow"]),

  // ─── B.Com more cities ───
  best("B.Com", "Kolkata", "bcom-kolkata", ["St. Xavier's Kolkata", "Presidency University", "Scottish Church College", "Loreto College", "Lady Brabourne", "Bethune College"], ["B.Com", "Kolkata"]),
  best("B.Com", "Chennai", "bcom-chennai", ["Loyola College", "Stella Maris", "MCC Chennai", "Ethiraj College", "WCC Chennai", "Presidency College"], ["B.Com", "Chennai"]),
  best("B.Com", "Pune", "bcom-pune", ["Fergusson College", "BMCC Pune", "SP College Pune", "Symbiosis College", "MIT-WPU", "Christ Pune"], ["B.Com", "Pune"]),
  best("B.Com", "Kochi", "bcom-kochi", ["Maharaja's College", "St. Albert's College", "St. Teresa's College", "Sacred Heart Thevara", "CUSAT", "Rajagiri"], ["B.Com", "Kochi"]),
  best("B.Com", "Kerala", "bcom-kerala", ["CMS Kottayam", "St. Thomas Thrissur", "Sacred Heart Thevara", "Maharaja's College", "University College TVM", "Christ College Irinjalakuda"], ["B.Com", "Kerala"]),

  // ─── BCA more cities ───
  best("BCA", "Chennai", "bca-chennai", ["Loyola College", "MCC Chennai", "Stella Maris", "Presidency College", "SRM University", "VIT Chennai"], ["BCA", "Chennai"]),
  best("BCA", "Mumbai", "bca-mumbai", ["St. Xavier's Mumbai", "Narsee Monjee", "Wilson College", "Jai Hind College", "KC College", "Mithibai College"], ["BCA", "Mumbai"]),
  best("BCA", "Pune", "bca-pune", ["Symbiosis College", "Fergusson College", "MIT-WPU", "PICT Pune", "Bharati Vidyapeeth", "DY Patil Pune"], ["BCA", "Pune"]),
  best("BCA", "Delhi", "bca-delhi", ["IP University", "Amity University", "Guru Gobind Singh IP University", "JIMS Delhi", "BVP New Delhi", "Maharaja Surajmal Institute"], ["BCA", "Delhi"]),
  best("BCA", "Hyderabad", "bca-hyderabad", ["Osmania University", "Christ University Hyderabad", "St. Mary's Hyderabad", "Aurora Degree College", "Loyola Academy"], ["BCA", "Hyderabad"]),
  best("BCA", "Kolkata", "bca-kolkata", ["St. Xavier's Kolkata", "Techno India", "JIS University", "Maulana Abul Kalam Azad UT", "Heritage Academy"], ["BCA", "Kolkata"]),

  // ─── BBA more cities ───
  best("BBA", "Chennai", "bba-chennai", ["Loyola College", "MCC Chennai", "Anna University", "SRM University", "VIT Chennai", "HITS Chennai"], ["BBA", "Chennai"]),
  best("BBA", "Mumbai", "bba-mumbai", ["NMIMS Mumbai", "Narsee Monjee", "KJ Somaiya", "Jai Hind College", "Mithibai College", "HR College Mumbai"], ["BBA", "Mumbai"]),
  best("BBA", "Pune", "bba-pune", ["Symbiosis Pune", "Christ Pune", "MIT-WPU Pune", "Flame University", "Indira College", "Bharati Vidyapeeth Pune"], ["BBA", "Pune"]),
  best("BBA", "Kolkata", "bba-kolkata", ["St. Xavier's Kolkata", "Presidency University", "Techno India", "JIS University", "NSHM Kolkata"], ["BBA", "Kolkata"]),
  best("BBA", "Hyderabad", "bba-hyderabad", ["Christ University Hyderabad", "Osmania University", "Loyola Academy", "Aurora Degree College", "St. Mary's"], ["BBA", "Hyderabad"]),

  // ─── Law by city ───
  best("Law", "Mumbai", "law-mumbai", ["MNLU Mumbai", "Government Law College", "ILS Law College Pune", "Symbiosis Pune", "Jindal Global Sonipat"], ["law", "Mumbai"]),
  best("Law", "Kolkata", "law-kolkata", ["WBNUJS Kolkata", "University of Calcutta Law", "Jogesh Chandra Chaudhuri Law College", "Surendranath Law College"], ["law", "Kolkata"]),
  best("Law", "Chennai", "law-chennai", ["Dr. Ambedkar Law University", "School of Excellence in Law", "Madras Law College", "VIT School of Law"], ["law", "Chennai"]),
  best("Law", "Hyderabad", "law-hyderabad", ["NALSAR Hyderabad", "Symbiosis Hyderabad", "Osmania University Law", "ICFAI Law School"], ["law", "Hyderabad"]),

  // ─── Pharmacy ───
  best("B.Pharm", "Kerala", "bpharm-kerala", ["Kerala University of Health Sciences", "Amrita School of Pharmacy", "Al-Ameen Pharmacy Ernakulam", "Govt Medical College Pharmacy", "NIMS Pharmacy"], ["B.Pharm", "Kerala"]),
  best("B.Pharm", "Bangalore", "bpharm-bangalore", ["JSS Pharmacy Mysuru", "Al-Ameen Pharmacy Bangalore", "Acharya Pharmacy", "East West Pharmacy", "RR College Pharmacy"], ["B.Pharm", "Bangalore"]),
  best("B.Pharm", "Mumbai", "bpharm-mumbai", ["Bombay College of Pharmacy", "ICT Mumbai", "VJSM Pharmacy", "MET Pharmacy", "Oriental Pharmacy Mumbai"], ["B.Pharm", "Mumbai"]),

  // ─── Architecture ───
  best("B.Arch", "India", "barch-india", ["IIT Kharagpur", "IIT Roorkee", "SPA Delhi", "SPA Bhopal", "NIT Trichy", "CEPT Ahmedabad", "JJ School of Art Mumbai", "BIT Mesra"], ["B.Arch", "architecture"]),
  best("B.Arch", "Mumbai", "barch-mumbai", ["JJ School of Art", "Rizvi College of Architecture", "Kamla Raheja", "Rachana Sansad", "KRVIA Mumbai"], ["B.Arch", "Mumbai"]),
  best("B.Arch", "Delhi", "barch-delhi", ["SPA Delhi", "Jamia Millia Islamia", "Sushant University", "Amity School of Architecture", "IP University"], ["B.Arch", "Delhi"]),

  // ─── Education & Teaching ───
  best("B.Ed", "Kerala", "bed-kerala", ["CTE Trivandrum", "CTE Thalassery", "NSS Training College", "Farook Training College", "St. Joseph's Training College"], ["B.Ed", "Kerala"]),
  best("B.Ed", "Bangalore", "bed-bangalore", ["Christ University", "Jain University", "Mount Carmel", "St. Ann's College of Education", "RV Teachers College"], ["B.Ed", "Bangalore"]),
  best("B.Ed", "Delhi", "bed-delhi", ["Lady Irwin College", "Jamia Millia Islamia", "CIE DU", "IGNOU", "IP University"], ["B.Ed", "Delhi"]),

  // ─── Hotel Management ───
  best("Hotel Management", "India", "hotel-management-india", ["IHM Mumbai", "IHM Delhi Pusa", "IHM Bangalore", "IHM Chennai", "IHM Hyderabad", "IHM Kolkata", "Welcome Group Manipal", "Christ University HM"], ["hotel management", "hospitality"]),
  best("Hotel Management", "Kerala", "hotel-management-kerala", ["IHM Trivandrum", "SIHMCT Thevara", "NHMCT Kochi", "MES Institute HM", "Rajagiri HM"], ["hotel management", "Kerala"]),

  // ─── Agriculture ───
  best("B.Sc Agriculture", "India", "bsc-agriculture-india", ["IARI Delhi", "PAU Ludhiana", "TNAU Coimbatore", "GBPUAT Pantnagar", "UAS Bangalore", "OUAT Bhubaneswar", "JNKVV Jabalpur", "KAU Thrissur"], ["agriculture", "farming"]),

  // ─── Nursing ───
  best("B.Sc Nursing", "Kerala", "bsc-nursing-kerala", ["Govt Medical College Kottayam Nursing", "Govt Medical College TVM Nursing", "Amrita Nursing Kochi", "Lourde Nursing Kochi", "KMCT Nursing Calicut"], ["nursing", "Kerala"]),
  best("B.Sc Nursing", "Bangalore", "bsc-nursing-bangalore", ["St. John's Nursing", "Manipal Nursing", "Ramaiah Nursing", "Narayana Nursing", "MVJ Nursing"], ["nursing", "Bangalore"]),

  // ─── Exam guides ───
  b("KCET 2027: Complete Guide for Karnataka Students", "kcet-2027-guide",
    "Everything about KCET — eligibility, syllabus, cutoffs for Karnataka engineering and medical colleges.",
    "## KCET Overview\nKarnataka CET is the state-level entrance exam for engineering, medical, dental, and pharmacy programs in Karnataka.\n\n## Key Dates 2027\n- Registration: January\n- Exam: April\n- Results: May\n\n## Exam Pattern\n- Physics: 60 questions\n- Chemistry: 60 questions\n- Mathematics: 60 questions\n- Biology: 60 questions\n\n## Preparation Tips\n1. Complete NCERT thoroughly\n2. Solve previous 10 years papers\n3. Focus on Karnataka PUC syllabus\n4. Time management is key\n\n## Top Colleges via KCET\n- UVCE Bangalore\n- BMS College\n- RVCE\n- PESIT\n- NIE Mysuru",
    ["KCET", "Karnataka", "entrance exam"], "Entrance Exams", "8 min", 15000),
  b("KEAM 2027: Kerala Engineering & Medical Entrance Guide", "keam-2027-guide",
    "Complete KEAM guide — syllabus, preparation, cutoffs for Kerala engineering colleges.",
    "## KEAM Overview\nKEAM is Kerala's state entrance exam for engineering and pharmacy programs.\n\n## Key Details\n- Subjects: Physics, Chemistry, Mathematics\n- Duration: 2.5 hours per paper\n- Total marks: 960\n\n## Top Colleges via KEAM\n1. CET Trivandrum\n2. GEC Thrissur\n3. GEC Barton Hill\n4. Model Engineering College\n5. TKM Kollam\n\n## Preparation Strategy\n- NCERT + state syllabus\n- Previous year papers (10 years)\n- Focus on Physics numericals\n- Chemistry: organic reactions\n- Math: calculus and trigonometry",
    ["KEAM", "Kerala", "engineering entrance"], "Entrance Exams", "8 min", 12000),
  b("COMEDK 2027: Karnataka Private Engineering Entrance Guide", "comedk-2027-guide",
    "Complete guide to COMEDK — entrance exam for top private engineering colleges in Karnataka.",
    "## COMEDK Overview\nCOMEDK UGET is the entrance for top private engineering colleges in Karnataka.\n\n## Top Colleges Accepting COMEDK\n1. RVCE Bangalore\n2. MSRIT Bangalore\n3. BMS College\n4. PESIT\n5. DSCE\n6. NIE Mysuru\n\n## Exam Pattern\n- Physics: 60 questions\n- Chemistry: 60 questions\n- Mathematics: 60 questions\n- Duration: 3 hours\n- No negative marking\n\n## COMEDK vs KCET\n- KCET: For government + private colleges\n- COMEDK: Only for private colleges\n- Can appear for both\n- KCET has reservation, COMEDK doesn't",
    ["COMEDK", "Karnataka", "engineering entrance"], "Entrance Exams", "7 min", 11000),
  b("MHT-CET 2027: Maharashtra Engineering Entrance Guide", "mht-cet-2027-guide",
    "Complete MHT-CET guide for Maharashtra engineering and pharmacy admissions.",
    "## MHT-CET Overview\nMaharashtra Common Entrance Test for engineering, pharmacy, and agriculture.\n\n## Top Colleges via MHT-CET\n1. COEP Pune\n2. VJTI Mumbai\n3. PICT Pune\n4. DJ Sanghvi Mumbai\n5. KJ Somaiya Mumbai\n\n## Exam Pattern\n- Physics + Chemistry: 100 MCQs (100 marks)\n- Mathematics: 50 MCQs (100 marks)\n- Duration: 90 min per paper\n\n## MHT-CET vs JEE Main\n- MHT-CET is easier than JEE\n- Both accepted by Maharashtra colleges\n- JEE Main score used for tie-breaking\n- MHT-CET based on Maharashtra state board syllabus",
    ["MHT-CET", "Maharashtra", "engineering entrance"], "Entrance Exams", "7 min", 14000),
  b("WBJEE 2027: West Bengal Joint Entrance Examination Guide", "wbjee-2027-guide",
    "Complete WBJEE guide for West Bengal engineering and medical admissions.",
    "## WBJEE Overview\nWest Bengal Joint Entrance for engineering, technology, pharmacy, and architecture.\n\n## Top Colleges via WBJEE\n1. Jadavpur University\n2. IIEST Shibpur\n3. NIT Durgapur (partial)\n4. Kalyani Govt Engineering\n5. Heritage Institute\n\n## Exam Pattern\n- Physics: 40 questions (50 marks)\n- Chemistry: 40 questions (50 marks)\n- Mathematics: 75 questions (100 marks)\n\n## JEE Main vs WBJEE\n- JEE Main: For NITs + all India\n- WBJEE: For Bengal state colleges\n- Jadavpur accepts WBJEE primarily\n- Appear for both to maximize options",
    ["WBJEE", "West Bengal", "engineering entrance"], "Entrance Exams", "7 min", 10000),

  // ─── Career & salary guides ───
  b("Average Salary After B.Tech CSE in India 2026 — By College Tier", "salary-after-btech-cse",
    "Detailed salary analysis for B.Tech CSE graduates by college tier — IIT, NIT, private.",
    "## B.Tech CSE Salary by College Tier\n\n### Tier 1: IITs + IIIT-H + BITS\n- Average: ₹18-25 LPA\n- Highest: ₹1-2.1 Crore\n- Median: ₹16-20 LPA\n- Top recruiters: Google, Microsoft, Amazon, Goldman Sachs\n\n### Tier 2: NITs + Top IIITs + DTU/NSUT\n- Average: ₹10-16 LPA\n- Highest: ₹40-80 LPA\n- Median: ₹10-14 LPA\n- Top recruiters: TCS, Infosys, Amazon, Microsoft\n\n### Tier 3: State Colleges + Good Private\n- Average: ₹5-10 LPA\n- Highest: ₹15-25 LPA\n- Median: ₹5-8 LPA\n- Top recruiters: TCS, Wipro, Cognizant, Infosys\n\n### Tier 4: Average Private Colleges\n- Average: ₹3-6 LPA\n- Highest: ₹8-12 LPA\n- Median: ₹3-5 LPA\n\n## Key Insight\nThe college you choose matters MORE than the branch for salary outcomes. CSE at mid-tier college < ECE at IIT for many roles.",
    ["salary", "B.Tech CSE", "placement"], "Careers", "8 min", 45000),
  b("Average Salary After MBA in India 2026 — IIM vs Non-IIM", "salary-after-mba",
    "MBA salary comparison — IIMs, ISB, XLRI vs other B-schools.",
    "## MBA Salary by B-School Tier\n\n### Tier 1: IIM A/B/C + ISB\n- Median: ₹28-35 LPA\n- Highest: ₹70-1 Crore\n- Sectors: Consulting, IB, PM, FMCG\n\n### Tier 2: IIM L/I/K + XLRI + FMS + SPJIMR\n- Median: ₹22-30 LPA\n- Highest: ₹50-70 LPA\n\n### Tier 3: New IIMs + MDI + IIFT\n- Median: ₹14-22 LPA\n- Highest: ₹35-50 LPA\n\n### Tier 4: Other B-Schools\n- Median: ₹8-14 LPA\n- Highest: ₹20-30 LPA\n\n## ROI Comparison\n| College | Fees | Median Salary | ROI Ratio |\n|---------|------|-------------|----------|\n| FMS Delhi | ₹1.92L | ₹28 LPA | 14.6x |\n| IIM-A | ₹28L | ₹35 LPA | 1.25x |\n| XLRI | ₹25L | ₹28 LPA | 1.12x |\n| SIBM Pune | ₹20L | ₹20 LPA | 1.0x |",
    ["MBA", "salary", "placement", "IIM"], "Careers", "9 min", 38000),
  b("Average Salary After MBBS in India 2026", "salary-after-mbbs",
    "MBBS doctor salary guide — from internship to super-specialization.",
    "## MBBS Salary Progression\n\n### During Internship (Year 5.5)\n- Stipend: ₹15,000-50,000/month (varies by state)\n\n### After MBBS (General Physician)\n- Government: ₹60,000-80,000/month\n- Private hospital: ₹40,000-60,000/month\n- Own clinic: Variable (₹50K-2L/month)\n\n### After MD/MS (Specialist)\n- Government: ₹1-1.5 Lakh/month\n- Private: ₹1.5-5 Lakh/month\n- Own practice: ₹2-10 Lakh/month\n\n### Super-Specialist (DM/MCh)\n- ₹3-10 Lakh/month (hospital)\n- ₹5-20+ Lakh/month (private practice)\n\n### Top-Earning Specializations\n1. Cardiology/Cardiac Surgery: ₹40-80+ LPA\n2. Neurosurgery: ₹30-60+ LPA\n3. Orthopedics: ₹25-50+ LPA\n4. Dermatology: ₹20-40+ LPA (high demand)\n5. Radiology: ₹20-40 LPA",
    ["MBBS", "doctor salary", "medical"], "Careers", "8 min", 32000),
  b("Average Salary After BCA in India 2026", "salary-after-bca",
    "BCA salary expectations by college type and career path.",
    "## BCA Salary Guide\n\n### Fresher Salary (After BCA)\n- Top colleges: ₹4-8 LPA\n- Average colleges: ₹2.5-5 LPA\n- Mass recruiters (TCS, Infosys): ₹3.5-4.5 LPA\n\n### After BCA + MCA\n- Top NITs: ₹10-18 LPA\n- Good colleges: ₹6-12 LPA\n- Average: ₹4-8 LPA\n\n### 3-5 Years Experience\n- ₹8-20 LPA (depending on skills)\n- Full-stack developers: ₹10-25 LPA\n- Data analysts: ₹8-15 LPA\n\n### How to Maximize BCA Salary\n1. Learn in-demand tech: React, Python, AWS\n2. Build portfolio on GitHub\n3. Do internships during BCA\n4. Consider MCA from NIT\n5. Get AWS/Azure certifications",
    ["BCA", "salary", "IT career"], "Careers", "7 min", 22000),
  b("Average Salary After BBA in India 2026", "salary-after-bba",
    "BBA salary expectations and career growth trajectory.",
    "## BBA Salary Guide\n\n### Fresher Salary\n- Top colleges (Christ, NMIMS): ₹5-8 LPA\n- Average colleges: ₹2.5-5 LPA\n- Management trainee roles: ₹3-6 LPA\n\n### After BBA + MBA\n- IIM: ₹22-35 LPA\n- Top B-school: ₹12-22 LPA\n- Average B-school: ₹6-12 LPA\n\n### Best Career Paths After BBA\n1. MBA (most popular)\n2. Digital Marketing: ₹4-12 LPA\n3. Sales & Business Development: ₹3-10 LPA\n4. HR roles: ₹3-8 LPA\n5. CA/CS alongside: ₹7-25 LPA\n\n### BBA vs B.Com\n- BBA: More management-focused\n- B.Com: More accounts/finance-focused\n- Both lead to MBA eventually\n- BBA slightly better for general management",
    ["BBA", "salary", "management"], "Careers", "7 min", 18000),

  // ─── Comparison guides ───
  b("IIT Madras vs IIT Bombay vs IIT Delhi — Which Is Best?", "iit-madras-vs-bombay-vs-delhi",
    "Detailed comparison of India's top 3 IITs — placements, campus, rankings.",
    "## Top 3 IITs Compared\n\n| Factor | IIT Madras | IIT Bombay | IIT Delhi |\n|--------|-----------|-----------|----------|\n| NIRF 2024 | #1 | #3 | #2 |\n| QS World | ~250 | ~150 | ~200 |\n| Campus | 620 acres | 550 acres | 325 acres |\n| Avg Package | ₹20.5 LPA | ₹21 LPA | ₹21.5 LPA |\n| Highest | ₹1.8 Cr | ₹2.1 Cr | ₹2.7 Cr |\n| City | Chennai | Mumbai | New Delhi |\n| Strength | Research, Incubation | Brand, Startups | Location, Startups |\n\n## The Verdict\n- For **research**: IIT Madras (#1 for 9 years)\n- For **brand globally**: IIT Bombay\n- For **city/internships**: IIT Delhi\n- For **placements**: All three are nearly identical\n\nBottom line: You can't go wrong with any of these three.",
    ["IIT", "comparison", "ranking"], "Guides", "8 min", 50000),
  b("NIT Trichy vs NIT Warangal vs NITK Surathkal — Best NIT?", "nit-trichy-vs-warangal-vs-surathkal",
    "Head-to-head comparison of India's top 3 NITs.",
    "## Top 3 NITs Compared\n\n| Factor | NIT Trichy | NIT Warangal | NITK Surathkal |\n|--------|-----------|-------------|---------------|\n| NIRF | #9 | ~#15 | ~#14 |\n| Campus | 800 acres | 248 acres | 295 acres |\n| Avg Package | ₹12 LPA | ₹11.5 LPA | ₹11.8 LPA |\n| Highest | ₹60 LPA | ₹55 LPA | ₹60 LPA |\n| City | Trichy, TN | Warangal, TS | Mangalore, KA |\n| Fest | Pragyan | Technozion | Engineer |\n\n## My Take\n- **Best overall**: NIT Trichy (most consistent)\n- **Best campus vibe**: NITK Surathkal (beach!)\n- **Best alumni network**: NIT Warangal (oldest)\n- All three are excellent — pick based on state and branch availability",
    ["NIT", "comparison", "ranking"], "Guides", "7 min", 35000),
  b("BITS Pilani vs NIT Trichy vs IIT Dhanbad — Which to Choose?", "bits-vs-nit-trichy-vs-iit-dhanbad",
    "Common dilemma for JEE aspirants — BITS Pilani vs top NIT vs new IIT.",
    "## The Common Dilemma\n\n| Factor | BITS Pilani CSE | NIT Trichy CSE | IIT Dhanbad CSE |\n|--------|----------------|---------------|----------------|\n| Fee/yr | ₹5.55 Lakh | ₹1.64 Lakh | ₹2.10 Lakh |\n| Avg Package | ₹15 LPA | ₹12 LPA | ₹13.5 LPA |\n| Tag Value | BITS | NIT | IIT |\n| Flexibility | Very High | Medium | Medium |\n| Practice School | Yes (unique!) | No | No |\n\n## Decision Framework\n- **Want flexibility + no attendance**: BITS\n- **Want affordable + consistent**: NIT Trichy\n- **Want IIT tag + GATE culture**: IIT Dhanbad\n- **For CSE specifically**: BITS Pilani ≈ NIT Trichy > IIT Dhanbad\n- **For non-CSE**: NIT Trichy > IIT Dhanbad > BITS (core branches)\n\n## The Real Answer\nAll three are excellent. Pick based on what matters most to YOU — fees, flexibility, tag, or campus culture.",
    ["BITS", "NIT", "IIT", "comparison"], "Guides", "8 min", 42000),
  b("Christ University vs Symbiosis vs NMIMS — Best Private for BBA/B.Com", "christ-vs-symbiosis-vs-nmims",
    "Comparing India's top 3 private universities for commerce and management undergrad.",
    "## Top 3 Private Universities Compared\n\n| Factor | Christ University | Symbiosis Pune | NMIMS Mumbai |\n|--------|-----------------|---------------|-------------|\n| Location | Bangalore | Pune | Mumbai |\n| BBA Fee | ₹3-4 LPA | ₹4-5 LPA | ₹5-6 LPA |\n| Placements | ₹5-7 LPA | ₹5-8 LPA | ₹6-8 LPA |\n| Campus | Multi-campus | Lavale hilltop | City center |\n| Strictness | Very strict | Moderate | Moderate |\n| Entrance | CUET/own | SET | NPAT |\n\n## My Take\n- **Best campus life**: Symbiosis Pune\n- **Best discipline**: Christ (parents love it)\n- **Best city exposure**: NMIMS Mumbai\n- **Best for MBA prep**: All equally good",
    ["Christ", "Symbiosis", "NMIMS", "BBA", "comparison"], "Guides", "7 min", 25000),

  // ─── More career guides ───
  b("Complete Guide to Internships for College Students in India", "internship-guide-india",
    "How to find and land internships — platforms, tips, and preparation.",
    "## Finding Internships\n\n### Top Platforms\n1. **Internshala** — India's largest (50K+ internships)\n2. **LinkedIn** — Professional networking + jobs\n3. **AngelList** — Startup internships\n4. **College placement cell** — On-campus opportunities\n5. **Direct company websites** — Google, Microsoft STEP programs\n\n### When to Start\n- 1st year: Start building skills\n- 2nd year: Apply for summer internships\n- 3rd year: Aim for pre-placement internships\n- Final year: Full-time placement prep\n\n### How to Stand Out\n1. Build a GitHub portfolio\n2. Contribute to open source\n3. Do personal projects\n4. Get certifications (AWS, Google)\n5. Write a clean resume (1 page)\n\n### Stipend Expectations\n- Small startups: ₹5K-15K/month\n- Mid companies: ₹15K-30K/month\n- FAANG/top companies: ₹50K-2L/month\n- IIT/NIT Practice School: ₹25K-1L/month",
    ["internship", "students", "career"], "Careers", "9 min", 28000),
  b("How to Build a Strong Resume for Freshers — With Examples", "resume-guide-freshers",
    "Step-by-step resume guide for college students with no work experience.",
    "## Fresher Resume Template\n\n### Structure (1 Page Only!)\n1. **Contact Info** — Name, email, phone, LinkedIn, GitHub\n2. **Education** — College, degree, CGPA/percentage\n3. **Skills** — Technical + soft skills\n4. **Projects** (2-3) — Title, tech stack, what you built\n5. **Internships** (if any)\n6. **Achievements** — Competitions, certifications\n7. **Extra-curricular** — Clubs, volunteering\n\n### Do's\n- Keep it 1 page (always!)\n- Quantify achievements (increased X by 20%)\n- Tailor for each company\n- Use action verbs (Built, Designed, Led)\n- Clean formatting, consistent fonts\n\n### Don'ts\n- No photo (unless asked)\n- No objective statement\n- No school marks (only if excellent)\n- Don't list every skill — focus on relevant ones\n- No fancy templates — clean and professional",
    ["resume", "freshers", "placement"], "Careers", "7 min", 32000),
  b("Top Coding Platforms for Placement Preparation 2026", "coding-platforms-placement-prep",
    "Best platforms to practice DSA and prepare for tech placements.",
    "## Top Coding Platforms\n\n### For DSA Practice\n1. **LeetCode** — #1 for FAANG prep (2500+ problems)\n2. **GeeksforGeeks** — Great for Indian company patterns\n3. **CodeForces** — Competitive programming\n4. **HackerRank** — Good for beginners\n5. **InterviewBit** — Structured placement prep\n\n### For Learning\n6. **Striver's SDE Sheet** — 191 must-do problems\n7. **NeetCode 150** — Curated FAANG prep\n8. **Love Babbar's DSA Sheet** — 450 problems\n\n### Preparation Timeline\n- 6 months before placements: Start DSA\n- 3 months: Complete 200+ problems\n- 1 month: Mock interviews daily\n- 1 week: Revise patterns, not new problems\n\n### Company-wise Focus\n- **Google**: Hard LeetCode, system design\n- **Amazon**: Medium LeetCode, leadership principles\n- **Microsoft**: Medium LeetCode, clean code\n- **TCS/Infosys**: Aptitude + basic coding",
    ["coding", "placement", "DSA", "LeetCode"], "Careers", "8 min", 40000),
];
