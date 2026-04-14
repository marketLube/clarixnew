import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();

const STREAM_IDS = [
  '69831d6817f9dfd131b83e10', // Engineering & Technology
  '6983202441cd3d15ce9d6b9c', // Medical & Healthcare
  '6983209341cd3d15ce9d6ba0', // Management & Business
  '698320ab41cd3d15ce9d6ba4', // Arts, Design & Humanities
  '698329fb1def753d593a3f0e', // Law & Public Policy
  '6993ffff0df839c00950ee1c', // Hospitality & Tourism
  '699400320df839c00950ee3f', // Commerce & Finance
  '699400710df839c00950ee62', // Science & Research
];

const COURSE_TEMPLATES = [
  // Engineering & Technology (index 0)
  { names: ['B.Tech Computer Science', 'B.Tech Mechanical Engineering', 'B.Tech Electrical Engineering', 'B.Tech Civil Engineering', 'M.Tech Software Engineering', 'B.Tech Data Science', 'B.Tech Aerospace Engineering', 'M.Tech Artificial Intelligence', 'B.Tech Chemical Engineering', 'B.Tech Biomedical Engineering', 'Diploma in Information Technology', 'B.Tech Robotics', 'M.Tech Cybersecurity', 'B.Tech Electronics & Communication', 'B.Tech Environmental Engineering'], streamIdx: 0 },
  // Medical & Healthcare (index 1)
  { names: ['MBBS', 'BDS', 'B.Sc Nursing', 'Pharm.D', 'M.Sc Biomedical Sciences', 'BPT Physiotherapy', 'B.Sc Radiology', 'M.Sc Public Health', 'B.Sc Medical Lab Technology', 'Diploma in Paramedics', 'B.Sc Nutrition & Dietetics', 'M.Sc Microbiology', 'B.Sc Optometry', 'MPH Epidemiology', 'B.Sc Speech Therapy'], streamIdx: 1 },
  // Management & Business (index 2)
  { names: ['MBA General', 'BBA', 'MBA Finance', 'MBA Marketing', 'MBA Human Resources', 'MBA International Business', 'BBA Entrepreneurship', 'MBA Operations Management', 'MBA Business Analytics', 'MBA Supply Chain Management', 'Executive MBA', 'MBA Healthcare Management', 'BBA Aviation Management', 'MBA Digital Marketing', 'MBA Project Management'], streamIdx: 2 },
  // Arts, Design & Humanities (index 3)
  { names: ['BA English Literature', 'BA Fine Arts', 'B.Des Graphic Design', 'BA Psychology', 'MA Sociology', 'B.Des Interior Design', 'BA History', 'MFA Creative Writing', 'BA Philosophy', 'B.Des Fashion Design', 'BA Political Science', 'MA Cultural Studies', 'BA Journalism', 'B.Des UX/UI Design', 'BA Music'], streamIdx: 3 },
  // Law & Public Policy (index 4)
  { names: ['LLB', 'BA LLB Integrated', 'LLM Constitutional Law', 'LLM Corporate Law', 'LLM International Law', 'BA LLB Criminal Law', 'LLM Human Rights Law', 'Diploma in Cyber Law', 'LLM Intellectual Property', 'MA Public Policy', 'LLM Environmental Law', 'BA LLB Labour Law', 'LLM Tax Law', 'Diploma in Legal Studies', 'MA Governance & Policy'], streamIdx: 4 },
  // Hospitality & Tourism (index 5)
  { names: ['BHM Hotel Management', 'B.Sc Hospitality Studies', 'MBA Tourism Management', 'Diploma in Culinary Arts', 'B.Sc Travel & Tourism', 'BHM Event Management', 'M.Sc Hospitality Administration', 'Diploma in Front Office Management', 'B.Sc Airline & Airport Management', 'BHM Food & Beverage Management', 'MBA Hospitality Management', 'Diploma in Bakery & Confectionery', 'B.Sc Resort Management', 'Certificate in Bartending', 'Diploma in Tourism Planning'], streamIdx: 5 },
  // Commerce & Finance (index 6)
  { names: ['B.Com General', 'B.Com Honours', 'M.Com', 'BBA Finance', 'B.Com Accounting & Finance', 'M.Com Financial Analysis', 'CA Foundation', 'CMA Foundation', 'B.Com Banking & Insurance', 'MBA Financial Planning', 'B.Com Taxation', 'M.Com Business Economics', 'Diploma in Financial Markets', 'B.Com International Trade', 'B.Com Cost Accounting'], streamIdx: 6 },
  // Science & Research (index 7)
  { names: ['B.Sc Physics', 'B.Sc Chemistry', 'B.Sc Mathematics', 'B.Sc Biology', 'M.Sc Biotechnology', 'B.Sc Environmental Science', 'M.Sc Applied Mathematics', 'B.Sc Statistics', 'M.Sc Astrophysics', 'B.Sc Geology', 'M.Sc Biochemistry', 'B.Sc Marine Biology', 'M.Sc Material Science', 'B.Sc Forensic Science', 'Ph.D Research Program'], streamIdx: 7 },
];

const FEE_RANGES: Record<string, [number, number]> = {
  Canada: [8000, 45000],
  Australia: [10000, 50000],
};

const CANADA_CITIES: { city: string; province: string }[] = [
  { city: 'Toronto', province: 'Ontario' },
  { city: 'Vancouver', province: 'British Columbia' },
  { city: 'Montreal', province: 'Quebec' },
  { city: 'Ottawa', province: 'Ontario' },
  { city: 'Calgary', province: 'Alberta' },
  { city: 'Edmonton', province: 'Alberta' },
  { city: 'Waterloo', province: 'Ontario' },
  { city: 'Halifax', province: 'Nova Scotia' },
  { city: 'Victoria', province: 'British Columbia' },
  { city: 'Quebec City', province: 'Quebec' },
  { city: 'Winnipeg', province: 'Manitoba' },
  { city: 'Hamilton', province: 'Ontario' },
  { city: 'Kingston', province: 'Ontario' },
  { city: 'London', province: 'Ontario' },
  { city: 'Saskatoon', province: 'Saskatchewan' },
  { city: 'Regina', province: 'Saskatchewan' },
  { city: "St. John's", province: 'Newfoundland and Labrador' },
  { city: 'Fredericton', province: 'New Brunswick' },
  { city: 'Charlottetown', province: 'Prince Edward Island' },
  { city: 'Thunder Bay', province: 'Ontario' },
  { city: 'Sudbury', province: 'Ontario' },
  { city: 'Kelowna', province: 'British Columbia' },
  { city: 'Windsor', province: 'Ontario' },
  { city: 'Guelph', province: 'Ontario' },
  { city: 'Sherbrooke', province: 'Quebec' },
  { city: 'Trois-Rivières', province: 'Quebec' },
  { city: 'Moncton', province: 'New Brunswick' },
  { city: 'Red Deer', province: 'Alberta' },
  { city: 'Lethbridge', province: 'Alberta' },
  { city: 'Kamloops', province: 'British Columbia' },
];

const AUSTRALIA_CITIES: { city: string; state: string }[] = [
  { city: 'Sydney', state: 'New South Wales' },
  { city: 'Melbourne', state: 'Victoria' },
  { city: 'Brisbane', state: 'Queensland' },
  { city: 'Perth', state: 'Western Australia' },
  { city: 'Adelaide', state: 'South Australia' },
  { city: 'Canberra', state: 'Australian Capital Territory' },
  { city: 'Gold Coast', state: 'Queensland' },
  { city: 'Hobart', state: 'Tasmania' },
  { city: 'Darwin', state: 'Northern Territory' },
  { city: 'Newcastle', state: 'New South Wales' },
  { city: 'Wollongong', state: 'New South Wales' },
  { city: 'Geelong', state: 'Victoria' },
  { city: 'Cairns', state: 'Queensland' },
  { city: 'Townsville', state: 'Queensland' },
  { city: 'Toowoomba', state: 'Queensland' },
  { city: 'Bendigo', state: 'Victoria' },
  { city: 'Ballarat', state: 'Victoria' },
  { city: 'Launceston', state: 'Tasmania' },
  { city: 'Rockhampton', state: 'Queensland' },
  { city: 'Mackay', state: 'Queensland' },
  { city: 'Bundaberg', state: 'Queensland' },
  { city: 'Alice Springs', state: 'Northern Territory' },
  { city: 'Wagga Wagga', state: 'New South Wales' },
  { city: 'Orange', state: 'New South Wales' },
  { city: 'Bathurst', state: 'New South Wales' },
  { city: 'Lismore', state: 'New South Wales' },
  { city: 'Armidale', state: 'New South Wales' },
  { city: 'Albury', state: 'New South Wales' },
  { city: 'Shepparton', state: 'Victoria' },
  { city: 'Dubbo', state: 'New South Wales' },
];

function getCollegeNameTemplates(city: string, province: string, country: string): string[] {
  const templates: string[] = [];
  const cleanCity = city.replace(/'/g, '');

  if (country === 'Canada') {
    templates.push(
      `University of ${city}`,
      `${city} University`,
      `${city} Polytechnic`,
      `${province} Institute of Technology - ${city}`,
      `${city} College of Arts & Sciences`,
      `${city} School of Business`,
      `Royal ${city} Academy`,
      `${city} Community College`,
      `${province} College - ${city} Campus`,
      `${city} Institute of Health Sciences`,
      `Canadian Academy of ${city}`,
      `${city} Technical Institute`,
      `${city} College of Engineering`,
      `${province} University - ${city}`,
      `${city} School of Medicine`,
      `${city} College of Law`,
      `Northern ${city} Institute`,
      `${city} School of Design`,
      `${city} Maritime Academy`,
      `${city} Institute of Management`,
    );
  } else {
    templates.push(
      `University of ${city}`,
      `${city} University`,
      `${city} Polytechnic`,
      `${state} Institute of Technology - ${city}`,
      `${city} College of Arts & Sciences`,
      `${city} School of Business`,
      `Royal ${city} Academy`,
      `${city} Community College`,
      `${state} College - ${city} Campus`,
      `${city} Institute of Health Sciences`,
      `Australian Academy of ${city}`,
      `${city} Technical Institute`,
      `${city} College of Engineering`,
      `${state} University - ${city}`,
      `${city} School of Medicine`,
      `${city} College of Law`,
      `Southern ${city} Institute`,
      `${city} School of Design`,
      `${city} Institute of Marine Studies`,
      `${city} Institute of Management`,
    );
  }
  return templates;
}

function getAustraliaCollegeNameTemplates(city: string, stateName: string): string[] {
  return [
    `University of ${city}`,
    `${city} University`,
    `${city} Polytechnic`,
    `${stateName} Institute of Technology - ${city}`,
    `${city} College of Arts & Sciences`,
    `${city} School of Business`,
    `Royal ${city} Academy`,
    `${city} Community College`,
    `${stateName} College - ${city} Campus`,
    `${city} Institute of Health Sciences`,
    `Australian Academy of ${city}`,
    `${city} Technical Institute`,
    `${city} College of Engineering`,
    `${stateName} University - ${city}`,
    `${city} School of Medicine`,
    `${city} College of Law`,
    `Southern ${city} Institute`,
    `${city} School of Design`,
    `${city} Institute of Marine Studies`,
    `${city} Institute of Management`,
  ];
}

function rand(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function randFloat(min: number, max: number, decimals = 1): number {
  return parseFloat((Math.random() * (max - min) + min).toFixed(decimals));
}

function getInitials(name: string): string {
  return name.split(/\s+/).filter(w => w.length > 2 && w !== 'of' && w !== 'the' && w !== '&' && w !== '-' && w !== 'and').map(w => w[0]).join('').substring(0, 3).toUpperCase();
}

function pickRandom<T>(arr: T[], count: number): T[] {
  const shuffled = [...arr].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, count);
}

function generateCourses(collegeName: string, country: string): any[] {
  const numCourses = rand(10, 15);
  // Pick course groups randomly, then pick courses from them
  const selectedTemplates = pickRandom(COURSE_TEMPLATES, rand(4, 6));
  const courses: any[] = [];
  const usedNames = new Set<string>();

  for (const template of selectedTemplates) {
    const coursesFromGroup = pickRandom(template.names, rand(2, 4));
    for (const courseName of coursesFromGroup) {
      if (usedNames.has(courseName)) continue;
      usedNames.add(courseName);
      const [minFee, maxFee] = FEE_RANGES[country];
      const fee = rand(minFee, maxFee);
      const currency = country === 'Canada' ? 'CAD' : 'AUD';
      courses.push({
        name: courseName,
        shortDescription: `${courseName} program offered at ${collegeName}`,
        stream: new mongoose.Types.ObjectId(STREAM_IDS[template.streamIdx]),
        type: pickRandom(['Full Time', 'Part Time', 'Online'] as const, 1)[0],
        duration: pickRandom(['2 Years', '3 Years', '4 Years', '5 Years'], 1)[0],
        fees: `${currency} ${fee.toLocaleString()}`,
        intakeCapacity: `${rand(30, 200)}`,
        eligibility: ['High school diploma or equivalent', 'Minimum GPA 3.0', 'English proficiency (IELTS/TOEFL)'],
        description: {
          title: `About ${courseName}`,
          content: `The ${courseName} program provides students with comprehensive knowledge and practical skills. This program is designed to prepare graduates for successful careers in their chosen field, combining theoretical foundations with hands-on experience.`,
          image: '',
        },
        whyChoose: {
          title: `Why Choose ${courseName}?`,
          description: `Our ${courseName} program stands out for its industry-aligned curriculum and expert faculty.`,
          reasons: [
            { title: 'Industry-Ready Curriculum', description: 'Courses designed with input from industry professionals.' },
            { title: 'Expert Faculty', description: 'Learn from professors with real-world experience.' },
            { title: 'Career Support', description: 'Dedicated career services to help you land your dream job.' },
          ],
        },
        syllabus: {
          title: `${courseName} Syllabus`,
          semesters: [
            { title: 'Semester 1', topics: ['Foundation Studies', 'Core Principles', 'Research Methods'] },
            { title: 'Semester 2', topics: ['Advanced Concepts', 'Practical Applications', 'Case Studies'] },
          ],
        },
        careerOpportunities: {
          title: 'Career Opportunities',
          items: [
            { title: 'Industry Professional', description: 'Work in leading organizations in the field.' },
            { title: 'Research & Development', description: 'Contribute to cutting-edge research and innovation.' },
          ],
        },
        about: {
          title: `About This Program`,
          description: `A comprehensive program designed for aspiring professionals.`,
          points: [
            { title: 'Practical Learning', description: 'Hands-on projects and internships.' },
            { title: 'Global Perspective', description: 'International exposure and exchange opportunities.' },
          ],
        },
        faqs: {
          title: 'Frequently Asked Questions',
          description: `Common questions about ${courseName}`,
          items: [
            { question: 'What are the admission requirements?', answer: 'Applicants need a high school diploma with minimum GPA requirements and English proficiency scores.' },
            { question: 'Are scholarships available?', answer: 'Yes, merit-based and need-based scholarships are available for eligible students.' },
          ],
        },
      });
      if (courses.length >= numCourses) break;
    }
    if (courses.length >= numCourses) break;
  }
  return courses;
}

function generateCollege(name: string, country: string, state: string, city: string, courseIds: mongoose.Types.ObjectId[]): any {
  const initials = getInitials(name);
  const logo = `https://ui-avatars.com/api/?name=${encodeURIComponent(initials)}&background=513392&color=fff&size=128&bold=true`;
  const type = Math.random() > 0.4 ? 'Public' : 'Private';
  const rating = randFloat(3.0, 4.8);
  const students = rand(1500, 35000);
  const avgSalary = country === 'Canada' ? rand(45000, 95000) : rand(50000, 100000);
  const highestSalary = avgSalary + rand(20000, 60000);
  const placementPct = rand(65, 98);

  return {
    name,
    country,
    state,
    city,
    type,
    rating,
    establishedYear: rand(1850, 2010),
    accreditation: country === 'Canada'
      ? pickRandom(['AACSB', 'EQUIS', 'AUCC', 'EQA', 'AMBA'], rand(1, 3))
      : pickRandom(['AACSB', 'EQUIS', 'TEQSA', 'CRICOS', 'AMBA'], rand(1, 3)),
    logo,
    brochure: '',
    description: `${name} is a prestigious ${type.toLowerCase()} institution located in ${city}, ${country}. Known for academic excellence and innovative research, the institution offers a wide range of programs designed to prepare students for successful careers in a globalized world.`,
    students,
    campusSize: `${rand(20, 500)} acres`,
    averageSalary: avgSalary,
    placementPercentage: placementPct,
    highestSalary,
    placementTrends: [
      { year: '2023', avgSalary: `${country === 'Canada' ? 'CAD' : 'AUD'} ${(avgSalary - rand(2000, 5000)).toLocaleString()}`, placementPercentage: `${placementPct - rand(1, 5)}%` },
      { year: '2024', avgSalary: `${country === 'Canada' ? 'CAD' : 'AUD'} ${(avgSalary - rand(500, 2000)).toLocaleString()}`, placementPercentage: `${placementPct - rand(0, 3)}%` },
      { year: '2025', avgSalary: `${country === 'Canada' ? 'CAD' : 'AUD'} ${avgSalary.toLocaleString()}`, placementPercentage: `${placementPct}%` },
    ],
    recruitersCount: rand(50, 500),
    studentsWithInternships: rand(40, 95),
    avgStipend: rand(800, 3000),
    ppoConversionRate: rand(15, 60),
    alumniInFortune500: rand(2, 25),
    alumniEntrepreneurs: rand(3, 20),
    alumniHigherStudiesAbroad: rand(10, 45),
    courses: courseIds,
    applicationOpeningDate: new Date('2026-01-15'),
    applicationClosingDate: new Date('2026-06-30'),
    admissionMode: [
      { mode: 'Merit List', label: 'Merit-Based Admission', description: 'Based on academic performance and standardized test scores.' },
    ],
    annualFee: country === 'Canada' ? `CAD ${rand(12000, 40000).toLocaleString()}` : `AUD ${rand(15000, 45000).toLocaleString()}`,
    avgAnnualFee: country === 'Canada' ? `CAD ${rand(10000, 35000).toLocaleString()}` : `AUD ${rand(12000, 40000).toLocaleString()}`,
    hostelFee: country === 'Canada' ? `CAD ${rand(5000, 15000).toLocaleString()}` : `AUD ${rand(6000, 18000).toLocaleString()}`,
    messFee: country === 'Canada' ? `CAD ${rand(2000, 5000).toLocaleString()}` : `AUD ${rand(2500, 6000).toLocaleString()}`,
    libraryFee: country === 'Canada' ? `CAD ${rand(200, 800).toLocaleString()}` : `AUD ${rand(250, 900).toLocaleString()}`,
    laboratoryFee: country === 'Canada' ? `CAD ${rand(500, 2000).toLocaleString()}` : `AUD ${rand(600, 2500).toLocaleString()}`,
    sportsFee: country === 'Canada' ? `CAD ${rand(300, 1000).toLocaleString()}` : `AUD ${rand(350, 1200).toLocaleString()}`,
    scholarships: [],
    campusImages: [],
    hostelImages: [],
    labsImages: [],
    eventsImages: [],
    admissionFaqs: [
      { question: 'What documents are required for admission?', answer: 'Academic transcripts, standardized test scores, proof of English proficiency, passport copy, and statement of purpose.' },
      { question: 'Is there an application fee?', answer: `Yes, the application fee is approximately ${country === 'Canada' ? 'CAD 100-150' : 'AUD 100-200'}.` },
    ],
    courseFaqs: [
      { question: 'Can I switch courses after admission?', answer: 'Course transfers may be possible within the first semester subject to availability and academic requirements.' },
    ],
    feesPaymentFaqs: [
      { question: 'Are installment payment options available?', answer: 'Yes, most programs offer semester-wise payment plans.' },
    ],
    scholarshipFaqs: [
      { question: 'What scholarships are available for international students?', answer: 'Merit-based, need-based, and country-specific scholarships are available. Check the scholarships page for details.' },
    ],
    category: 'Top Rated',
  };
}

(async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI!, { dbName: process.env.DB_NAME });
    console.log('Connected to MongoDB');
    const db = mongoose.connection.db!;

    // Check existing counts
    const existingCanada = await db.collection('colleges').countDocuments({ country: 'Canada' });
    const existingAustralia = await db.collection('colleges').countDocuments({ country: 'Australia' });
    console.log(`Existing: Canada=${existingCanada}, Australia=${existingAustralia}`);

    // Check for name duplicates
    const existingNames = new Set(
      (await db.collection('colleges').find(
        { country: { $in: ['Canada', 'Australia'] } },
        { projection: { name: 1 } }
      ).toArray()).map(c => c.name)
    );
    console.log(`Existing college names to skip: ${existingNames.size}`);

    const TARGET = 500;
    const canadaNeeded = TARGET - existingCanada;
    const australiaNeeded = TARGET - existingAustralia;
    console.log(`Need to create: Canada=${canadaNeeded}, Australia=${australiaNeeded}`);

    if (canadaNeeded <= 0 && australiaNeeded <= 0) {
      console.log('Already have 500+ colleges for both countries. Exiting.');
      await mongoose.disconnect();
      return;
    }

    // ---- CANADA ----
    if (canadaNeeded > 0) {
      console.log('\n--- Seeding Canada ---');
      const perCity = Math.ceil(canadaNeeded / CANADA_CITIES.length);
      let canadaColleges: any[] = [];
      let totalCoursesCanada = 0;

      for (const { city, province } of CANADA_CITIES) {
        if (canadaColleges.length >= canadaNeeded) break;
        const templates = getCollegeNameTemplates(city, province, 'Canada');
        const remaining = canadaNeeded - canadaColleges.length;
        const count = Math.min(perCity, remaining, templates.length);

        for (let i = 0; i < count; i++) {
          const collegeName = templates[i];
          if (existingNames.has(collegeName)) continue;
          existingNames.add(collegeName);

          // Generate and insert courses first
          const courseDocs = generateCourses(collegeName, 'Canada');
          const insertedCourses = await db.collection('courses').insertMany(courseDocs);
          const courseIds = Object.values(insertedCourses.insertedIds);
          totalCoursesCanada += courseIds.length;

          const college = generateCollege(collegeName, 'Canada', 'Canada', city, courseIds as any);
          canadaColleges.push(college);
        }
      }

      // If we still need more, cycle through cities again with different name patterns
      let extraIdx = 0;
      while (canadaColleges.length < canadaNeeded) {
        const { city, province } = CANADA_CITIES[extraIdx % CANADA_CITIES.length];
        extraIdx++;
        const suffix = Math.floor(extraIdx / CANADA_CITIES.length) + 2;
        const extraNames = [
          `${city} Advanced Institute ${suffix}`,
          `${province} School of Sciences - ${city} ${suffix}`,
          `Greater ${city} College ${suffix}`,
          `${city} Liberal Arts Academy ${suffix}`,
          `${city} Graduate School ${suffix}`,
        ];
        for (const collegeName of extraNames) {
          if (canadaColleges.length >= canadaNeeded) break;
          if (existingNames.has(collegeName)) continue;
          existingNames.add(collegeName);
          const courseDocs = generateCourses(collegeName, 'Canada');
          const insertedCourses = await db.collection('courses').insertMany(courseDocs);
          const courseIds = Object.values(insertedCourses.insertedIds);
          totalCoursesCanada += courseIds.length;
          const college = generateCollege(collegeName, 'Canada', 'Canada', city, courseIds as any);
          canadaColleges.push(college);
        }
      }

      // Insert colleges in batches of 100
      for (let i = 0; i < canadaColleges.length; i += 100) {
        const batch = canadaColleges.slice(i, i + 100);
        await db.collection('colleges').insertMany(batch);
        console.log(`  Inserted Canada batch ${Math.floor(i / 100) + 1}: ${batch.length} colleges`);
      }
      console.log(`Canada: Inserted ${canadaColleges.length} colleges with ${totalCoursesCanada} courses total`);
    }

    // ---- AUSTRALIA ----
    if (australiaNeeded > 0) {
      console.log('\n--- Seeding Australia ---');
      const perCity = Math.ceil(australiaNeeded / AUSTRALIA_CITIES.length);
      let ausColleges: any[] = [];
      let totalCoursesAus = 0;

      for (const { city, state: stateName } of AUSTRALIA_CITIES) {
        if (ausColleges.length >= australiaNeeded) break;
        const templates = getAustraliaCollegeNameTemplates(city, stateName);
        const remaining = australiaNeeded - ausColleges.length;
        const count = Math.min(perCity, remaining, templates.length);

        for (let i = 0; i < count; i++) {
          const collegeName = templates[i];
          if (existingNames.has(collegeName)) continue;
          existingNames.add(collegeName);

          const courseDocs = generateCourses(collegeName, 'Australia');
          const insertedCourses = await db.collection('courses').insertMany(courseDocs);
          const courseIds = Object.values(insertedCourses.insertedIds);
          totalCoursesAus += courseIds.length;

          const college = generateCollege(collegeName, 'Australia', 'Australia', city, courseIds as any);
          ausColleges.push(college);
        }
      }

      // If we still need more, cycle through cities again
      let extraIdx = 0;
      while (ausColleges.length < australiaNeeded) {
        const { city, state: stateName } = AUSTRALIA_CITIES[extraIdx % AUSTRALIA_CITIES.length];
        extraIdx++;
        const suffix = Math.floor(extraIdx / AUSTRALIA_CITIES.length) + 2;
        const extraNames = [
          `${city} Advanced Institute ${suffix}`,
          `${stateName} School of Sciences - ${city} ${suffix}`,
          `Greater ${city} College ${suffix}`,
          `${city} Liberal Arts Academy ${suffix}`,
          `${city} Graduate School ${suffix}`,
        ];
        for (const collegeName of extraNames) {
          if (ausColleges.length >= australiaNeeded) break;
          if (existingNames.has(collegeName)) continue;
          existingNames.add(collegeName);
          const courseDocs = generateCourses(collegeName, 'Australia');
          const insertedCourses = await db.collection('courses').insertMany(courseDocs);
          const courseIds = Object.values(insertedCourses.insertedIds);
          totalCoursesAus += courseIds.length;
          const college = generateCollege(collegeName, 'Australia', 'Australia', city, courseIds as any);
          ausColleges.push(college);
        }
      }

      // Insert colleges in batches of 100
      for (let i = 0; i < ausColleges.length; i += 100) {
        const batch = ausColleges.slice(i, i + 100);
        await db.collection('colleges').insertMany(batch);
        console.log(`  Inserted Australia batch ${Math.floor(i / 100) + 1}: ${batch.length} colleges`);
      }
      console.log(`Australia: Inserted ${ausColleges.length} colleges with ${totalCoursesAus} courses total`);
    }

    // Final verification
    const finalCanada = await db.collection('colleges').countDocuments({ country: 'Canada' });
    const finalAustralia = await db.collection('colleges').countDocuments({ country: 'Australia' });
    console.log(`\n=== FINAL COUNTS ===`);
    console.log(`Canada: ${finalCanada} colleges`);
    console.log(`Australia: ${finalAustralia} colleges`);

    await mongoose.disconnect();
    console.log('Done!');
  } catch (err) {
    console.error('Error:', err);
    await mongoose.disconnect();
    process.exit(1);
  }
})();
