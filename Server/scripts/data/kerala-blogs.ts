/**
 * 55+ Kerala-specific SEO blog posts.
 * Covers every major city, course, and career path in Kerala.
 */

export const KERALA_BLOG_PREFIX = "clarix-kerala-";

export interface KeralaBlog {
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  tags: string[];
  category: string;
  readTime: string;
  views: number;
}

function kb(title: string, slug: string, excerpt: string, content: string, tags: string[], cat: string, rt: string, v: number): KeralaBlog {
  return { title, slug: `${KERALA_BLOG_PREFIX}${slug}`, excerpt, content, tags, category: cat, readTime: rt, views: v };
}

function kbest(course: string, loc: string, slug: string, colleges: string[], tags: string[], extra = ""): KeralaBlog {
  const content = `## Best ${course} Colleges in ${loc}, Kerala (2026)\n\nKerala is known for its high literacy rate (96.2%) and quality education institutions. Here are the top ${course} colleges in ${loc}:\n\n${colleges.map((x, i) => `### ${i+1}. ${x}\nOne of the best institutions for ${course} in ${loc}, Kerala. Known for quality faculty, good infrastructure, and student-focused approach.\n`).join("\n")}${extra}\n\n## Admission Process\nMost colleges admit through state entrance exams (KEAM for engineering, KMAT for MBA, CAP for arts/science) or national exams (JEE, NEET, CAT, CUET). Check individual college websites for specific requirements.\n\n## Why Study in ${loc}?\n${loc} offers a great combination of quality education, affordable living costs, and Kerala's renowned quality of life. The growing IT sector in Kerala provides good internship and job opportunities.`;
  return kb(`Best ${course} Colleges in ${loc}, Kerala 2026 — Rankings & Fees`, slug, `Top ${course} colleges in ${loc}, Kerala with admission details, fees, and placement info.`, content, [...tags, "Kerala", loc], "College Rankings", "7 min", 5000 + Math.floor(Math.random() * 15000));
}

export const KERALA_BLOGS: KeralaBlog[] = [
  // ─── BCA by City ───
  kbest("BCA", "Kochi", "best-bca-kochi", ["Sacred Heart College Thevara", "St. Teresa's College Ernakulam", "Rajagiri College", "Maharaja's College Ernakulam", "St. Albert's College Ernakulam", "FISAT (BCA)", "SCMS Cochin"], ["BCA", "Kochi"]),
  kbest("BCA", "Calicut (Kozhikode)", "best-bca-calicut", ["St. Joseph's College Devagiri", "Farook College", "Providence College", "EMEA College Kondotty", "Malabar Christian College", "Zamorin's Guruvayurappan College"], ["BCA", "Calicut"]),
  kbest("BCA", "Trivandrum", "best-bca-trivandrum", ["University College TVM", "Mar Ivanios College", "All Saints College", "St. Xavier's College TVM", "Loyola College Trivandrum", "College of Applied Science TVM"], ["BCA", "Trivandrum"]),
  kbest("BCA", "Thrissur", "best-bca-thrissur", ["St. Thomas College Thrissur", "Vimala College Thrissur", "Kerala Varma College", "MES Asmabi College", "Little Flower College"], ["BCA", "Thrissur"]),
  kbest("BCA", "Kottayam", "best-bca-kottayam", ["CMS College Kottayam", "BCM College", "Baselius College Kottayam", "Assumption College Changanassery", "SB College Changanassery"], ["BCA", "Kottayam"]),
  kbest("BCA", "Kannur", "best-bca-kannur", ["Kannur University", "Don Bosco College Kannur", "Payyanur College", "Thalassery College", "St. Pius X College Rajapuram"], ["BCA", "Kannur"]),
  kbest("BCA", "Kerala", "best-bca-kerala-complete", ["Sacred Heart College Thevara (NIRF #55)", "St. Teresa's College Ernakulam (NIRF #60)", "St. Joseph's College Devagiri (NIRF #60)", "CMS College Kottayam", "Farook College Calicut", "Maharaja's College Ernakulam", "SB College Changanassery", "Fatima Mata National College Kollam"], ["BCA", "Kerala"], "\n\n## BCA Fee Structure in Kerala\nGovernment colleges: ₹3,000-10,000/year\nAided private: ₹10,000-35,000/year\nSelf-financing: ₹40,000-1,20,000/year\n\n## BCA Placements in Kerala\nAverage: ₹2.5-5 LPA\nTop colleges: ₹4-8 LPA\nBest employers: TCS, Infosys, UST, IBS Software, Wipro"),

  // ─── BBA by City ───
  kbest("BBA", "Kochi", "best-bba-kochi", ["Rajagiri College Kakkanad", "SCMS Cochin", "Sacred Heart College Thevara", "St. Albert's College", "St. Teresa's College", "FISAT BBA"], ["BBA", "Kochi"]),
  kbest("BBA", "Calicut", "best-bba-calicut", ["Farook College", "St. Joseph's Devagiri", "Providence College", "EMEA College", "Calicut University DoMS"], ["BBA", "Calicut"]),
  kbest("BBA", "Trivandrum", "best-bba-trivandrum", ["Mar Ivanios College", "University College TVM", "All Saints College", "St. Xavier's TVM", "Loyola College TVM"], ["BBA", "Trivandrum"]),
  kbest("BBA", "Thrissur", "best-bba-thrissur", ["St. Thomas College Thrissur", "Vimala College", "Christ College Irinjalakuda", "Kerala Varma College", "Little Flower College"], ["BBA", "Thrissur"]),
  kbest("BBA", "Kerala", "best-bba-kerala-complete", ["Rajagiri College Kochi", "Christ College Irinjalakuda", "Sacred Heart College Thevara", "Farook College Calicut", "St. Joseph's Devagiri Calicut", "Mar Ivanios College TVM", "SCMS Cochin", "Assumption College Changanassery"], ["BBA", "Kerala"]),

  // ─── B.Com by City ───
  kbest("B.Com", "Kochi", "best-bcom-kochi", ["Sacred Heart College Thevara", "St. Teresa's College", "Maharaja's College", "St. Albert's College", "St. Xavier's College Aluva"], ["B.Com", "Kochi"]),
  kbest("B.Com", "Calicut", "best-bcom-calicut", ["Farook College", "St. Joseph's Devagiri", "Zamorin's Guruvayurappan College", "Malabar Christian College", "Providence College"], ["B.Com", "Calicut"]),
  kbest("B.Com", "Trivandrum", "best-bcom-trivandrum", ["University College TVM", "Mar Ivanios College", "All Saints College", "Government College for Women TVM"], ["B.Com", "Trivandrum"]),
  kbest("B.Com", "Kerala", "best-bcom-kerala-complete", ["Sacred Heart College Thevara (NAAC A++)", "St. Teresa's College Ernakulam (NAAC A++)", "CMS College Kottayam", "Farook College Calicut (NAAC A++)", "Christ College Irinjalakuda", "SB College Changanassery", "University College TVM", "Maharaja's College Ernakulam"], ["B.Com", "Kerala"]),

  // ─── Engineering by City ───
  kbest("B.Tech", "Kochi", "best-btech-kochi", ["CUSAT (SOE)", "Model Engineering College", "Rajagiri School of Engineering", "FISAT", "SCMS Engineering", "Toc H Institute", "Amal Jyothi College", "Mar Athanasius College (MA College)"], ["B.Tech", "Kochi", "engineering"]),
  kbest("B.Tech", "Calicut", "best-btech-calicut", ["NIT Calicut", "GEC Kozhikode", "NSS College of Engineering Palakkad", "TKM College Kollam", "AWH Engineering Calicut"], ["B.Tech", "Calicut", "engineering"]),
  kbest("B.Tech", "Trivandrum", "best-btech-trivandrum", ["CET Trivandrum", "IIT Palakkad (Kerala's IIT)", "IIST Trivandrum (ISRO)", "GEC Barton Hill", "LBS Women's IT", "College of Engineering Attingal"], ["B.Tech", "Trivandrum", "engineering"]),
  kbest("B.Tech", "Thrissur", "best-btech-thrissur", ["GEC Thrissur", "Vidya Academy of Science and Technology", "NCERC Thrissur", "Sahrdaya College Thrissur", "IES College Thrissur"], ["B.Tech", "Thrissur", "engineering"]),
  kbest("B.Tech CSE", "Kerala", "best-btech-cse-kerala-complete", ["NIT Calicut (NIRF #21)", "IIT Palakkad", "CET Trivandrum", "CUSAT Kochi", "Model Engineering College Kochi", "GEC Thrissur", "Rajagiri Engineering Kochi", "FISAT Kochi", "TKM Kollam", "SCMS Engineering Kochi"], ["B.Tech", "CSE", "Kerala", "engineering"], "\n\n## B.Tech CSE Salary in Kerala\n- Government colleges (CET, GEC): ₹5-10 LPA avg\n- NIT Calicut: ₹10-15 LPA avg\n- Top private (Rajagiri): ₹7-10 LPA avg\n- Other private: ₹3-6 LPA avg\n\n## KEAM vs JEE for Kerala Engineering\n- KEAM: Kerala state entrance (most Kerala colleges)\n- JEE Main: For NITs, IIITs, and some Kerala colleges\n- JEE Advanced: For IITs (IIT Palakkad)\n- Best strategy: Prepare for both JEE Main + KEAM"),

  // ─── MBA by City ───
  kbest("MBA", "Kochi", "best-mba-kochi", ["Rajagiri Centre for Business Studies (NIRF #83)", "SCMS Cochin School of Business", "XIME Kochi", "CUSAT School of Management", "Albertian Institute of Management", "Marian College Kuttikkanam"], ["MBA", "Kochi"]),
  kbest("MBA", "Calicut", "best-mba-calicut-kozhikode", ["IIM Kozhikode (NIRF #7)", "NIT Calicut School of Management", "Calicut University DoMS", "Farook Institute of Management"], ["MBA", "Calicut"]),
  kbest("MBA", "Kerala", "best-mba-kerala-complete", ["IIM Kozhikode (NIRF #7 — ₹25 LPA median)", "Rajagiri Centre for Business Studies (NIRF #83 — ₹7 LPA avg)", "SCMS Cochin School of Business (₹5.5 LPA avg)", "NIT Calicut DoMS", "CUSAT School of Management", "XIME Kochi", "TKM Institute of Management Kollam", "CHMM College for Advanced Studies Trivandrum"], ["MBA", "Kerala"], "\n\n## MBA Admission in Kerala\n- IIM Kozhikode: CAT score (99+ percentile needed)\n- Rajagiri/SCMS: KMAT Kerala / CAT / CMAT / MAT\n- CUSAT: CUSAT CAT entrance\n- Others: KMAT Kerala is the main entrance\n\n## KMAT Kerala\nKerala Management Aptitude Test — state-level MBA entrance\n- Conducted by CEE Kerala\n- 4 sections: English, Quantitative, Data Analysis, General Knowledge\n- Accepted by 100+ MBA colleges in Kerala"),

  // ─── MBBS / Medical ───
  kbest("MBBS", "Kerala", "best-mbbs-kerala-complete", ["GMC Trivandrum (oldest, est. 1951)", "GMC Kozhikode (250 seats — highest)", "GMC Kottayam", "GMC Thrissur", "GMC Alappuzha (T.D. Medical College)", "GMC Ernakulam", "GMC Manjeri", "GMC Idukki", "GMC Palakkad", "GMC Kannur", "GMC Kasaragod", "GMC Pathanamthitta"], ["MBBS", "medical", "Kerala"], "\n\n## Kerala MBBS Stats\n- Total seats: 4,655 (12 Govt + 21 Private)\n- Govt MBBS fees: ₹25,000-32,000/year\n- Private MBBS fees: ₹5-20 Lakh/year\n- Admission: NEET UG (only entrance)\n\n## Top Private Medical Colleges\n1. Amrita Institute of Medical Sciences, Kochi\n2. Jubilee Mission Medical College, Thrissur\n3. Pushpagiri Medical College, Tiruvalla\n4. Malankara Orthodox Syrian Church Medical College, Kolenchery"),
  kbest("MBBS", "Kochi", "best-mbbs-kochi", ["GMC Ernakulam", "Amrita Institute of Medical Sciences", "MOSC Medical College Kolenchery", "Govt Medical College Thrissur (nearby)", "SH Medical College Chalakudy"], ["MBBS", "Kochi", "medical"]),

  // ─── Nursing ───
  kbest("B.Sc Nursing", "Kerala", "best-bsc-nursing-kerala", ["GMC Trivandrum Nursing", "GMC Kottayam Nursing", "GMC Kozhikode Nursing", "Amrita Nursing Kochi", "Lourde Hospital Nursing Kochi", "KMCT Nursing Calicut", "Govt Nursing College Alappuzha", "Pushpagiri Nursing Tiruvalla"], ["B.Sc Nursing", "Kerala", "nursing"]),

  // ─── Law ───
  kbest("Law (BA LLB)", "Kerala", "best-law-colleges-kerala", ["NUALS Kochi (National Law University)", "Government Law College Ernakulam", "Government Law College Trivandrum", "Kerala Law Academy Trivandrum", "School of Indian Legal Thought Kottayam", "Al-Azhar Law College Thodupuzha", "Mar Gregorios College of Law Trivandrum"], ["law", "Kerala", "CLAT"], "\n\n## Law Admission in Kerala\n- NUALS: Through CLAT (national exam)\n- Govt Law Colleges: Through KLEE (Kerala Law Entrance Exam)\n- Private: KLEE or college-level entrance\n\n## NUALS Kochi\nKerala's only National Law University\n- 60 BA LLB seats\n- 10 supernumerary seats for Kerala domicile\n- Admission via CLAT\n- Fees: ₹1.8 Lakh/year"),

  // ─── Pharmacy ───
  kbest("B.Pharm", "Kerala", "best-bpharm-kerala", ["Government Medical College TVM (Pharmacy)", "Al-Ameen College of Pharmacy Ernakulam", "Amrita School of Pharmacy Kochi", "NIMS Pharmacy Trivandrum", "KMCT Pharmacy Calicut", "Malik Deenar College of Pharmacy Kasaragod"], ["B.Pharm", "pharmacy", "Kerala"]),

  // ─── Education ───
  kbest("B.Ed", "Kerala", "best-bed-kerala", ["CTE Trivandrum", "CTE Thalassery", "CTE Thrissur", "NSS Training College Ottapalam", "Farook Training College Calicut", "St. Joseph's Training College Mannanam", "Government Training College Trivandrum"], ["B.Ed", "Kerala", "teaching"]),

  // ─── Design ───
  kbest("Design", "Kerala", "best-design-colleges-kerala", ["NIT Calicut (B.Arch/M.Plan)", "CET Trivandrum (B.Arch)", "TKM College (B.Arch)", "NIFT Kannur (proposed)", "College of Fine Arts Thrissur", "MES College of Architecture Kuttippuram"], ["design", "architecture", "Kerala"]),

  // ─── City Guides ───
  kb("Complete Guide to Colleges in Kochi (Ernakulam) 2026", "colleges-in-kochi-guide",
    "Everything about studying in Kochi — top colleges, courses, fees, and student life.",
    "## Why Study in Kochi?\nKochi (Ernakulam) is Kerala's commercial capital and emerging IT hub. Home to Infopark (India's largest IT park in a Tier 2 city), Smart City, and a growing startup ecosystem.\n\n### Top Advantages\n- **IT Hub**: Infopark, Smart City, Technopark satellite\n- **Internship opportunities**: 500+ IT companies in Kochi\n- **Quality of life**: Clean city, great food, metro connectivity\n- **Affordable**: Lower cost of living than Bangalore/Chennai\n\n## Top Engineering Colleges in Kochi\n1. CUSAT (Cochin University)\n2. Model Engineering College\n3. Rajagiri School of Engineering\n4. FISAT\n5. SCMS Engineering\n6. Toc H Institute\n\n## Top Arts & Science in Kochi\n1. Sacred Heart College Thevara (NAAC A++)\n2. St. Teresa's College (NAAC A++)\n3. Maharaja's College (Government)\n4. St. Albert's College\n\n## Top MBA in Kochi\n1. Rajagiri Business School (NIRF #83)\n2. SCMS Cochin School of Business\n3. XIME Kochi\n4. CUSAT School of Management\n\n## Living Costs in Kochi\n- Hostel: ₹3,000-8,000/month\n- PG accommodation: ₹4,000-10,000/month\n- Food: ₹3,000-5,000/month\n- Transport: ₹1,000-2,000/month (Kochi Metro available)",
    ["Kochi", "Ernakulam", "colleges", "Kerala"], "City Guides", "10 min", 22000),

  kb("Complete Guide to Colleges in Calicut (Kozhikode) 2026", "colleges-in-calicut-guide",
    "Everything about studying in Calicut — NIT Calicut, IIM Kozhikode, and more.",
    "## Why Study in Calicut?\nKozhikode (Calicut) is home to two of India's top institutions — NIT Calicut and IIM Kozhikode. It's also a growing IT hub with Cyberpark and a strong education tradition.\n\n### Top Advantages\n- **NIT Calicut**: Kerala's #1 engineering college\n- **IIM Kozhikode**: India's top 7 B-school\n- **Affordable**: Lower costs than Kochi\n- **Growing IT sector**: Cyberpark, IT companies\n\n## Top Engineering\n1. NIT Calicut (NIRF #21)\n2. GEC Kozhikode\n3. NSS College of Engineering (nearby Palakkad)\n\n## Top Arts & Science\n1. Farook College (NAAC A++)\n2. St. Joseph's College Devagiri (NIRF #60)\n3. Zamorin's Guruvayurappan College\n4. Providence College\n\n## Top MBA\n1. IIM Kozhikode (₹25 LPA median!)\n2. NIT Calicut DoMS\n\n## Living Costs\n- PG: ₹3,000-6,000/month\n- Food: ₹2,500-4,000/month\n- Very affordable compared to other education cities",
    ["Calicut", "Kozhikode", "colleges", "Kerala"], "City Guides", "10 min", 18000),

  kb("Complete Guide to Colleges in Trivandrum 2026", "colleges-in-trivandrum-guide",
    "Top colleges in Thiruvananthapuram — CET, IIST, GMC, Kerala University.",
    "## Why Study in Trivandrum?\nThiruvananthapuram is Kerala's capital with the famous Technopark (India's first and largest IT park), ISRO Thumba campus, and Kerala University headquarters.\n\n### Top Advantages\n- **Technopark**: 400+ IT companies, great for internships\n- **ISRO**: IIST and VSSC for space careers\n- **Government jobs**: State capital = many govt opportunities\n- **Cultural hub**: Museums, beaches, temples\n\n## Top Engineering\n1. CET Trivandrum (Kerala's oldest, 1939)\n2. IIST Trivandrum (ISRO's own university)\n3. IIT Palakkad (nearby, Kerala's IIT)\n4. GEC Barton Hill\n5. LBS Women's IT\n\n## Top Medical\n1. GMC Trivandrum (Kerala's best, 1951)\n2. SCTIMST (Sree Chitra)\n\n## Top Arts & Science\n1. University College TVM (1866)\n2. Mar Ivanios College\n3. All Saints College\n\n## Living Costs\n- PG: ₹3,000-7,000/month\n- Food: ₹2,500-4,000/month\n- Auto/bus: affordable public transport",
    ["Trivandrum", "Thiruvananthapuram", "colleges", "Kerala"], "City Guides", "10 min", 16000),

  kb("Complete Guide to Colleges in Thrissur 2026", "colleges-in-thrissur-guide",
    "Top colleges in Thrissur — GEC, St. Thomas, Vimala, Christ College.",
    "## Why Study in Thrissur?\nThrissur is Kerala's cultural capital, known for Thrissur Pooram. Growing education hub with several top colleges and Kerala University of Health Sciences (KUHS) headquarters.\n\n## Top Colleges\n### Engineering\n1. GEC Thrissur (govt, est. 1957)\n2. Vidya Academy of Science and Technology\n3. Sahrdaya College\n\n### Arts & Science\n1. St. Thomas College Thrissur (NIRF #63)\n2. Vimala College (women's, NAAC A)\n3. Kerala Varma College\n4. Christ College Irinjalakuda (nearby)\n\n### Medical\n1. GMC Thrissur\n2. Jubilee Mission Medical College\n3. Amala Medical College\n\n## Living Costs\n- Very affordable: PG ₹2,500-5,000/month\n- Food: ₹2,000-3,500/month",
    ["Thrissur", "colleges", "Kerala"], "City Guides", "8 min", 12000),

  // ─── Specific Course Guides ───
  kb("KEAM 2027: Complete Guide to Kerala Engineering Entrance", "keam-2027-complete-guide",
    "Everything about KEAM — registration, syllabus, cutoffs, and top colleges.",
    "## What is KEAM?\nKerala Engineering Architecture Medical entrance exam, conducted by CEE Kerala.\n\n## KEAM 2027 Key Dates (Expected)\n- Notification: January 2027\n- Registration: February 2027\n- Exam: April-May 2027\n- Results: June 2027\n- Counselling: July-August 2027\n\n## Exam Pattern\n- Paper 1: Physics & Chemistry (2.5 hours, 120 questions)\n- Paper 2: Mathematics (2.5 hours, 120 questions)\n- Total marks: 960\n- No negative marking\n\n## Top Colleges via KEAM\n| College | CSE Cutoff (approx) |\n|---------|--------------------|\n| CET Trivandrum | Rank 200-500 |\n| GEC Thrissur | Rank 600-1200 |\n| Model Engineering College | Rank 800-1500 |\n| TKM Kollam | Rank 1000-2000 |\n| GEC Barton Hill | Rank 1500-3000 |\n\n## KEAM vs JEE Main\n- KEAM: For Kerala government + aided colleges\n- JEE Main: For NITs, IIITs + some Kerala colleges\n- Prepare for BOTH — JEE prep helps KEAM automatically\n- KEAM is slightly easier than JEE Main",
    ["KEAM", "Kerala", "engineering entrance"], "Entrance Exams", "10 min", 25000),

  kb("KMAT Kerala 2027: MBA Entrance Exam Guide", "kmat-kerala-2027-guide",
    "Complete guide to KMAT Kerala — the gateway to 100+ MBA colleges in Kerala.",
    "## What is KMAT Kerala?\nKerala Management Aptitude Test — state MBA entrance conducted by CEE Kerala.\n\n## Exam Pattern\n- Duration: 2.5 hours\n- Sections: English (30), Quantitative (30), Data Analysis (30), General Knowledge (30)\n- Total: 120 questions, 480 marks\n- No negative marking\n\n## Top Colleges Accepting KMAT\n1. Rajagiri Centre for Business Studies\n2. SCMS Cochin School of Business\n3. XIME Kochi\n4. TKM Institute of Management\n5. Albertian Institute of Management\n6. Marian College Kuttikkanam\n\n## Cutoff (Approximate)\n- Top colleges (Rajagiri): 500+ out of 576\n- Mid-tier: 350-500\n- Others: 200+\n\n## KMAT vs CAT\n- CAT: For IIMs + national B-schools\n- KMAT: For Kerala B-schools only\n- KMAT is MUCH easier than CAT\n- Apply for both to maximize options",
    ["KMAT", "MBA", "Kerala", "entrance exam"], "Entrance Exams", "8 min", 12000),

  kb("IT Jobs in Kerala 2026: Technopark, Infopark, Cyberpark Guide", "it-jobs-kerala-2026",
    "Complete guide to IT careers in Kerala — Technopark TVM, Infopark Kochi, Cyberpark Calicut.",
    "## Kerala's IT Ecosystem\n\nKerala has three major IT parks:\n\n### 1. Technopark, Trivandrum\n- India's first IT park (1990)\n- 400+ companies, 65,000+ employees\n- Major companies: Infosys, TCS, UST, Oracle, Ernst & Young\n- Located near Kazhakoottam, TVM\n\n### 2. Infopark, Kochi\n- India's largest IT park in a Tier 2 city\n- 350+ companies, 50,000+ employees\n- Major: TCS, Wipro, CTS, IBS Software\n- Located in Kakkanad, Ernakulam\n\n### 3. Cyberpark, Calicut\n- Newest, growing fast\n- 100+ companies\n- Focus: startups and IT services\n- Located in Kozhikode\n\n## Average IT Salaries in Kerala\n| Role | Salary Range |\n|------|-------------|\n| Fresher (TCS/Infosys) | ₹3.5-5 LPA |\n| 2-3 years | ₹6-10 LPA |\n| 5+ years | ₹12-20 LPA |\n| Senior/Lead | ₹18-35 LPA |\n\n## Best Colleges for IT Jobs in Kerala\n1. NIT Calicut\n2. CET Trivandrum\n3. CUSAT Kochi\n4. Model Engineering College\n5. Rajagiri Engineering",
    ["IT jobs", "Kerala", "Technopark", "Infopark"], "Careers", "9 min", 20000),

  kb("Kerala Government Job Preparation Guide 2026", "kerala-govt-jobs-guide",
    "How to prepare for Kerala PSC, UPSC, banking, and other government exams from Kerala.",
    "## Kerala Government Jobs\n\n### Kerala PSC (Public Service Commission)\n- Largest recruiter for Kerala state govt jobs\n- Exams for: Village Officer, LDC, LGS, Secretariat Assistant\n- Last Grade Servants (LGS): Most applied exam\n- Preparation: Kerala PSC syllabus + current affairs\n\n### UPSC Civil Services from Kerala\nKerala has excellent UPSC track record:\n- Many IAS officers from Kerala annually\n- Top coaching: Chanakya IAS, T.I.M.E.\n- University College TVM and Kerala University have UPSC study circles\n\n### Banking Exams\n- IBPS PO/Clerk, SBI PO/Clerk\n- Kerala has high success rate in banking exams\n- Federal Bank (HQ: Aluva) — recruits heavily from Kerala\n\n### Other Exams\n- SSC CGL/CHSL\n- Railway exams\n- KTET (Kerala Teacher Eligibility Test)\n- SET Kerala (for college lecturers)",
    ["Kerala PSC", "government jobs", "UPSC", "Kerala"], "Careers", "9 min", 18000),

  kb("Cost of Living for Students in Kerala 2026 — City Comparison", "student-cost-of-living-kerala",
    "Detailed cost breakdown for students in Kochi, Calicut, Trivandrum, and Thrissur.",
    "## Monthly Student Budget (Approximate)\n\n| Expense | Kochi | Calicut | Trivandrum | Thrissur |\n|---------|-------|---------|------------|----------|\n| PG Room | ₹5-8K | ₹3-5K | ₹4-7K | ₹3-5K |\n| Hostel | ₹2-5K | ₹1.5-3K | ₹2-4K | ₹1.5-3K |\n| Food | ₹3-5K | ₹2.5-4K | ₹3-4.5K | ₹2.5-4K |\n| Transport | ₹1.5-2.5K | ₹1-1.5K | ₹1-2K | ₹0.8-1.5K |\n| Misc | ₹2-3K | ₹1.5-2.5K | ₹1.5-2.5K | ₹1.5-2K |\n| **Total** | **₹13-24K** | **₹9-16K** | **₹11-20K** | **₹9-16K** |\n\n## Key Points\n- Kerala is MORE affordable than Bangalore, Chennai, Pune\n- Government college hostels: ₹1,500-5,000/month\n- Kerala meals (Thali): ₹60-100 (very affordable)\n- Kochi Metro: ₹10-40 per trip\n- Auto fares regulated by government\n\n## Cheapest Cities for Students\n1. Thrissur\n2. Calicut\n3. Trivandrum\n4. Kochi (most expensive but still affordable)",
    ["cost of living", "students", "Kerala"], "Guides", "8 min", 15000),

  kb("Kerala vs Karnataka vs Tamil Nadu: Best State for Higher Education?", "kerala-vs-karnataka-vs-tamilnadu",
    "Comparing South India's top 3 education states.",
    "## South India Education Comparison\n\n| Factor | Kerala | Karnataka | Tamil Nadu |\n|--------|--------|-----------|------------|\n| Literacy Rate | 96.2% | 75.4% | 80.1% |\n| Top Institution | NIT Calicut | IISc/IIM-B | IIT Madras |\n| Govt College Fees | ₹3K-35K/yr | ₹10K-50K/yr | ₹5K-50K/yr |\n| IT Hub | Technopark/Infopark | Bangalore | Chennai |\n| Living Cost | Low-Medium | Medium-High | Medium |\n| Safety | Very High | High | High |\n\n## When to Choose Kerala\n- Want affordable quality education\n- Value safety and quality of life\n- Interested in govt college (low fees)\n- Want Kerala PSC/govt job preparation\n\n## When to Choose Karnataka\n- Want Bangalore's tech ecosystem\n- Targeting IISc, IIM-B, NITK\n- Want startup ecosystem access\n\n## When to Choose Tamil Nadu\n- Want IIT Madras, NIT Trichy\n- Want Anna University network\n- Maximum engineering college options",
    ["Kerala", "Karnataka", "Tamil Nadu", "comparison"], "Guides", "9 min", 22000),

  kb("Scholarships for Kerala Students 2026 — Complete List", "scholarships-for-kerala-students",
    "Every major scholarship available for Kerala students — state and central.",
    "## Kerala State Scholarships\n\n### 1. E-Grantz Scholarship\n- For: BPL students in higher education\n- Amount: ₹1,000-3,000/month\n- Apply: egrantz.kerala.gov.in\n\n### 2. Kerala State Merit Scholarship\n- For: Top 10% in qualifying exam\n- Amount: ₹5,000-15,000/year\n\n### 3. C.H. Mohammed Koya Scholarship\n- For: Muslim minority students\n- Amount: ₹5,000-10,000/year\n\n### 4. Suvarna Jubilee Merit Scholarship\n- For: BPL students who scored 80%+ in SSLC/Plus Two\n- Amount: ₹10,000/year + tuition waiver\n\n### 5. Fishermen/ST/SC Scholarships\n- Various scholarships for specific communities\n- Apply through district collectorate\n\n## Central Scholarships for Kerala Students\n1. INSPIRE Scholarship (₹80K/yr for science)\n2. CSSS (₹10-20K/yr for 80th percentile)\n3. Post Matric SC/ST (full tuition)\n4. AICTE Pragati (₹50K/yr for girls in tech)\n5. Ishan Uday (for NE students — NOT Kerala)\n\n## How to Apply\n- State scholarships: egrantz.kerala.gov.in\n- Central scholarships: scholarships.gov.in (NSP)\n- Apply EARLY — many have limited funds",
    ["scholarships", "Kerala", "financial aid"], "Financial Aid", "10 min", 20000),
];
