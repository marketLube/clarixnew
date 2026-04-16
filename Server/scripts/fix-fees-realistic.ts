import mongoose from 'mongoose';

const MONGO_URI = 'mongodb+srv://ajaydevmarketlube:WSCbaKW38pIGv8S2@cluster0.cd2yjhg.mongodb.net/?appName=Cluster0';

// === REALISTIC FEE RANGES ===

// Course-level realistic fee ranges in INR per year (based on Indian average market rates 2024-25)
const COURSE_FEE_MAP: Record<string, string> = {
  // Engineering UG
  'B.Tech': '₹1,50,000 - ₹4,50,000 / year',
  'BE': '₹1,50,000 - ₹4,50,000 / year',
  'B.Tech Computer Science': '₹2,00,000 - ₹6,00,000 / year',
  'B.Tech Electronics': '₹1,80,000 - ₹4,50,000 / year',
  'B.Tech Mechanical': '₹1,50,000 - ₹4,00,000 / year',
  'B.Tech Civil': '₹1,40,000 - ₹3,80,000 / year',
  'B.Tech Electrical': '₹1,50,000 - ₹4,00,000 / year',
  'B.Tech Chemical': '₹1,60,000 - ₹4,00,000 / year',
  'B.Tech Aerospace': '₹2,00,000 - ₹5,00,000 / year',
  'B.Tech Biotechnology': '₹1,80,000 - ₹4,50,000 / year',
  'B.Tech IT': '₹1,80,000 - ₹5,00,000 / year',
  'B.Tech Information Technology': '₹1,80,000 - ₹5,00,000 / year',
  'B.Tech AI': '₹2,20,000 - ₹6,00,000 / year',
  'B.Tech Artificial Intelligence': '₹2,20,000 - ₹6,00,000 / year',
  'M.Tech': '₹1,00,000 - ₹3,50,000 / year',

  // Medical
  'MBBS': '₹50,000 - ₹25,00,000 / year',
  'BDS': '₹2,00,000 - ₹15,00,000 / year',
  'BAMS': '₹1,00,000 - ₹6,00,000 / year',
  'BHMS': '₹80,000 - ₹4,00,000 / year',
  'BPT': '₹80,000 - ₹3,00,000 / year',
  'MD': '₹2,00,000 - ₹50,00,000 / year',
  'MS': '₹2,00,000 - ₹50,00,000 / year',
  'B.Pharm': '₹80,000 - ₹3,50,000 / year',
  'D.Pharm': '₹50,000 - ₹2,00,000 / year',
  'M.Pharm': '₹1,00,000 - ₹3,50,000 / year',
  'B.Sc Nursing': '₹50,000 - ₹3,50,000 / year',
  'GNM': '₹40,000 - ₹2,00,000 / year',
  'ANM': '₹30,000 - ₹1,50,000 / year',

  // Management
  'MBA': '₹3,00,000 - ₹28,00,000 / year',
  'PGDM': '₹3,50,000 - ₹25,00,000 / year',
  'BBA': '₹1,00,000 - ₹6,00,000 / year',
  'BMS': '₹80,000 - ₹5,00,000 / year',
  'Executive MBA': '₹5,00,000 - ₹35,00,000 / year',

  // Law
  'BA LLB': '₹1,50,000 - ₹6,00,000 / year',
  'BBA LLB': '₹2,00,000 - ₹6,50,000 / year',
  'B.Com LLB': '₹1,50,000 - ₹5,50,000 / year',
  'LLB': '₹50,000 - ₹3,00,000 / year',
  'LLM': '₹80,000 - ₹4,00,000 / year',

  // Arts/Science/Commerce
  'BA': '₹15,000 - ₹2,50,000 / year',
  'B.Com': '₹20,000 - ₹3,00,000 / year',
  'B.Sc': '₹20,000 - ₹2,50,000 / year',
  'BCA': '₹50,000 - ₹2,50,000 / year',
  'MA': '₹15,000 - ₹2,00,000 / year',
  'M.Com': '₹20,000 - ₹2,50,000 / year',
  'M.Sc': '₹25,000 - ₹2,80,000 / year',
  'MCA': '₹60,000 - ₹3,00,000 / year',
  'BCom Honours': '₹20,000 - ₹3,00,000 / year',
  'BA Economics': '₹25,000 - ₹3,00,000 / year',
  'BA English': '₹15,000 - ₹2,50,000 / year',
  'BA Psychology': '₹25,000 - ₹3,00,000 / year',
  'B.Sc Computer Science': '₹40,000 - ₹2,50,000 / year',
  'B.Sc Physics': '₹20,000 - ₹2,00,000 / year',
  'B.Sc Chemistry': '₹20,000 - ₹2,00,000 / year',
  'B.Sc Mathematics': '₹20,000 - ₹2,00,000 / year',
  'B.Sc Biology': '₹25,000 - ₹2,20,000 / year',

  // Design/Architecture
  'B.Des': '₹3,50,000 - ₹14,00,000 / year',
  'M.Des': '₹3,00,000 - ₹12,00,000 / year',
  'B.Arch': '₹1,50,000 - ₹6,00,000 / year',
  'M.Arch': '₹1,20,000 - ₹4,50,000 / year',

  // Education
  'B.Ed': '₹40,000 - ₹2,00,000 / year',
  'M.Ed': '₹30,000 - ₹1,80,000 / year',
  'BPEd': '₹40,000 - ₹1,50,000 / year',
  'D.El.Ed': '₹25,000 - ₹1,00,000 / year',

  // Agriculture
  'B.Sc Agriculture': '₹40,000 - ₹2,50,000 / year',
  'M.Sc Agriculture': '₹40,000 - ₹2,50,000 / year',
  'B.V.Sc': '₹40,000 - ₹3,00,000 / year',

  // Hotel Management
  'BHM': '₹80,000 - ₹4,00,000 / year',
  'BHMCT': '₹80,000 - ₹4,00,000 / year',
  'Hotel Management': '₹80,000 - ₹4,00,000 / year',

  // Polytechnic / Diploma
  'Diploma': '₹15,000 - ₹1,00,000 / year',
  'Polytechnic': '₹15,000 - ₹80,000 / year',

  // PhD
  'PhD': '₹20,000 - ₹2,00,000 / year',
  'Ph.D': '₹20,000 - ₹2,00,000 / year',
};

// Match course to fee range
function getCourseFee(courseName: string): string | null {
  const lower = courseName.toLowerCase();

  // Specific matches first (longer matches priority)
  const sortedKeys = Object.keys(COURSE_FEE_MAP).sort((a, b) => b.length - a.length);
  for (const key of sortedKeys) {
    if (lower.includes(key.toLowerCase())) {
      return COURSE_FEE_MAP[key];
    }
  }
  return null;
}

// === COLLEGE-LEVEL ANNUAL FEES ===
// Realistic Indian college fees per tier (in INR / year)
function getIndianCollegeFee(name: string): string {
  const lower = name.toLowerCase();

  // IITs - government technical
  if (lower.includes('iit ') || lower.startsWith('iit') || lower.includes('indian institute of technology')) {
    return '₹2,09,550 / year';
  }
  // NITs - government technical
  if (lower.includes('nit ') || lower.startsWith('nit') || lower.includes('national institute of technology')) {
    return '₹1,63,750 / year';
  }
  // IIITs
  if (lower.includes('iiit') || lower.includes('indian institute of information technology')) {
    return '₹2,80,000 / year';
  }
  // IIMs
  if (lower.includes('iim ') || lower.startsWith('iim') || lower.includes('indian institute of management')) {
    return '₹14,00,000 - ₹25,00,000 / year';
  }
  // AIIMS
  if (lower.includes('aiims') || lower.includes('all india institute of medical')) {
    return '₹1,628 - ₹6,000 / year';
  }
  // NLUs - Law
  if (lower.includes('nlu') || lower.includes('national law') || lower.includes('national university of juridical')) {
    return '₹2,50,000 - ₹3,50,000 / year';
  }
  // BITS
  if (lower.includes('bits ')) {
    return '₹5,55,000 / year';
  }
  // ISB
  if (lower.includes('indian school of business') || lower.startsWith('isb ')) {
    return '₹40,00,000 / year';
  }
  // IISc / IISER
  if (lower.includes('iisc') || lower.includes('iiser') || lower.includes('indian institute of science')) {
    return '₹35,200 - ₹1,00,000 / year';
  }
  // VIT, SRM, Manipal - private deemed
  if (lower.includes('vit ') || lower.startsWith('vit') || lower.includes('vellore institute')) {
    return '₹2,40,000 - ₹4,50,000 / year';
  }
  if (lower.includes('srm ') || lower.includes('sastra')) {
    return '₹2,80,000 - ₹4,50,000 / year';
  }
  if (lower.includes('manipal')) {
    return '₹3,50,000 - ₹6,00,000 / year';
  }
  if (lower.includes('amity')) {
    return '₹2,80,000 - ₹4,50,000 / year';
  }
  if (lower.includes('lpu') || lower.includes('lovely professional')) {
    return '₹1,40,000 - ₹3,50,000 / year';
  }
  // NIFT
  if (lower.includes('nift') || lower.includes('national institute of fashion')) {
    return '₹2,80,000 - ₹3,50,000 / year';
  }
  // NID
  if (lower.includes('nid') || lower.includes('national institute of design')) {
    return '₹3,50,000 - ₹4,50,000 / year';
  }

  // Government colleges (cheap)
  if (lower.includes('government ') || lower.includes('govt ') || lower.includes('jntu') ||
      lower.includes('andhra university') || lower.includes('osmania') || lower.includes('madras university') ||
      lower.includes('calcutta university') || lower.includes('delhi university') || lower.includes(' du ') ||
      lower.includes('mumbai university') || lower.includes('university of mumbai')) {
    return '₹15,000 - ₹85,000 / year';
  }

  // Polytechnics
  if (lower.includes('polytechnic')) {
    return '₹15,000 - ₹50,000 / year';
  }

  // Medical colleges (private)
  if (lower.includes('medical college') || lower.includes('medical sciences') ||
      lower.includes(' aims') || lower.includes('healthcare')) {
    return '₹3,50,000 - ₹18,00,000 / year';
  }

  // Engineering colleges (private)
  if (lower.includes('engineering') || lower.includes('institute of technology') ||
      lower.includes('technical')) {
    return '₹1,20,000 - ₹3,50,000 / year';
  }

  // Law colleges
  if (lower.includes('law ') || lower.includes('jurisprudence')) {
    return '₹1,50,000 - ₹4,50,000 / year';
  }

  // Pharmacy colleges
  if (lower.includes('pharmacy') || lower.includes('pharm')) {
    return '₹80,000 - ₹2,50,000 / year';
  }

  // Nursing colleges
  if (lower.includes('nursing')) {
    return '₹50,000 - ₹2,50,000 / year';
  }

  // Arts/Science colleges (private)
  if (lower.includes('arts') || lower.includes('science') || lower.includes('commerce')) {
    return '₹40,000 - ₹1,80,000 / year';
  }

  // Management
  if (lower.includes('management') || lower.includes('business school') || lower.includes('mba')) {
    return '₹4,00,000 - ₹15,00,000 / year';
  }

  // University (general private)
  if (lower.includes('university')) {
    return '₹1,20,000 - ₹4,50,000 / year';
  }

  // Default for unmatched colleges
  return '₹80,000 - ₹2,50,000 / year';
}

// International college fees by country (USD per year)
function getIntlCollegeFee(country: string, name: string): string {
  const lower = name.toLowerCase();

  // US Ivy League / top tier
  if (country === 'United States') {
    if (lower.includes('harvard') || lower.includes('yale') || lower.includes('princeton') ||
        lower.includes('mit') || lower.includes('stanford') || lower.includes('columbia') ||
        lower.includes('penn') || lower.includes('dartmouth') || lower.includes('brown') ||
        lower.includes('cornell') || lower.includes('caltech') || lower.includes('chicago') ||
        lower.includes('duke') || lower.includes('northwestern') || lower.includes('johns hopkins')) {
      return '$58,000 - $85,000 / year';
    }
    // Other US private universities
    if (lower.includes('university') || lower.includes('college') || lower.includes('institute')) {
      return '$35,000 - $70,000 / year';
    }
    return '$30,000 - $65,000 / year';
  }

  if (country === 'United Kingdom' || country === 'UK') {
    if (lower.includes('oxford') || lower.includes('cambridge') || lower.includes('imperial') ||
        lower.includes('lse') || lower.includes('ucl')) {
      return '£28,000 - £50,000 / year';
    }
    return '£18,000 - £35,000 / year';
  }

  if (country === 'Canada') {
    if (lower.includes('toronto') || lower.includes('mcgill') || lower.includes('british columbia')) {
      return 'CAD 45,000 - CAD 65,000 / year';
    }
    return 'CAD 25,000 - CAD 45,000 / year';
  }

  if (country === 'Australia') {
    if (lower.includes('melbourne') || lower.includes('sydney') || lower.includes('australian national') ||
        lower.includes('monash') || lower.includes('queensland') || lower.includes('new south wales')) {
      return 'AUD 40,000 - AUD 55,000 / year';
    }
    return 'AUD 28,000 - AUD 45,000 / year';
  }

  if (country === 'Germany') {
    // Germany is mostly free / very cheap
    return '€0 - €3,000 / year';
  }

  if (country === 'France') {
    return '€3,000 - €18,000 / year';
  }

  if (country === 'Netherlands') {
    return '€10,000 - €20,000 / year';
  }

  if (country === 'Sweden') {
    return 'SEK 100,000 - SEK 200,000 / year';
  }

  if (country === 'Ireland') {
    return '€15,000 - €30,000 / year';
  }

  if (country === 'Singapore') {
    if (lower.includes('national university of singapore') || lower.includes('nus') ||
        lower.includes('nanyang') || lower.includes('ntu')) {
      return 'SGD 35,000 - SGD 55,000 / year';
    }
    return 'SGD 20,000 - SGD 40,000 / year';
  }

  if (country === 'Japan') {
    return '¥800,000 - ¥1,800,000 / year';
  }

  if (country === 'South Korea') {
    return '₩6,000,000 - ₩15,000,000 / year';
  }

  if (country === 'China') {
    return 'CNY 20,000 - CNY 90,000 / year';
  }

  if (country === 'United Arab Emirates' || country === 'UAE') {
    return 'AED 35,000 - AED 90,000 / year';
  }

  if (country === 'Malaysia') {
    return 'MYR 20,000 - MYR 50,000 / year';
  }

  if (country === 'New Zealand') {
    return 'NZD 25,000 - NZD 45,000 / year';
  }

  // Default international
  return '$15,000 - $40,000 / year';
}

async function main() {
  await mongoose.connect(MONGO_URI);
  const db = mongoose.connection.db!;

  // === FIX COURSES ===
  console.log('=== FIXING COURSE FEES ===');
  const courses = await db.collection('courses').find({}).toArray();
  let courseFixed = 0;
  for (const course of courses) {
    const newFee = getCourseFee(course.name);
    if (newFee && newFee !== course.fees) {
      await db.collection('courses').updateOne(
        { _id: course._id },
        { $set: { fees: newFee } }
      );
      courseFixed++;
    }
  }
  console.log(`Fixed ${courseFixed} / ${courses.length} courses`);

  // === FIX COLLEGES (annualFee) ===
  console.log('\n=== FIXING COLLEGE FEES ===');
  const colleges = await db.collection('colleges').find({}).toArray();
  let collegeFixed = 0;
  for (const college of colleges) {
    let newFee: string;
    if (college.country && college.country !== 'India') {
      newFee = getIntlCollegeFee(college.country, college.name);
    } else {
      newFee = getIndianCollegeFee(college.name);
    }

    if (newFee !== college.annualFee) {
      await db.collection('colleges').updateOne(
        { _id: college._id },
        { $set: { annualFee: newFee, avgAnnualFee: newFee } }
      );
      collegeFixed++;
    }
  }
  console.log(`Fixed ${collegeFixed} / ${colleges.length} colleges`);

  // Verify
  console.log('\n=== VERIFICATION ===');
  const updatedCourses = await db.collection('courses').find({}, { projection: { fees: 1 } }).toArray();
  const courseFeeCounts = new Map<string, number>();
  for (const c of updatedCourses) {
    courseFeeCounts.set(c.fees || 'NONE', (courseFeeCounts.get(c.fees || 'NONE') || 0) + 1);
  }
  console.log('Most common course fees after fix:');
  [...courseFeeCounts.entries()].sort((a, b) => b[1] - a[1]).slice(0, 10).forEach(([fee, count]) => {
    console.log(`  ${count} courses: ${fee}`);
  });

  const updatedColleges = await db.collection('colleges').find({}, { projection: { annualFee: 1, country: 1 } }).toArray();
  const collegeFeeCounts = new Map<string, number>();
  for (const c of updatedColleges) {
    collegeFeeCounts.set(c.annualFee || 'NONE', (collegeFeeCounts.get(c.annualFee || 'NONE') || 0) + 1);
  }
  console.log('\nMost common college annual fees after fix:');
  [...collegeFeeCounts.entries()].sort((a, b) => b[1] - a[1]).slice(0, 15).forEach(([fee, count]) => {
    console.log(`  ${count} colleges: ${fee}`);
  });

  await mongoose.disconnect();
}

main().catch(console.error);
