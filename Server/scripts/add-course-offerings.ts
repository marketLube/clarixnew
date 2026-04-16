import mongoose from 'mongoose';

const MONGO_URI = 'mongodb+srv://ajaydevmarketlube:WSCbaKW38pIGv8S2@cluster0.cd2yjhg.mongodb.net/?appName=Cluster0';

// === COLLEGE-SPECIFIC FEE OVERRIDES ===
// Maps college tier patterns to fee multipliers/specific fees per course

interface CollegeOffering {
  courseId: any;
  courseName: string; // for reference
  fees: string;         // college-specific fee
  intake: string;       // seats
  cutoff?: string;      // entrance exam cutoff
  modules?: string[];   // course-specific modules at this college
  description?: string; // college-specific description
  duration?: string;
  highlights?: string[]; // why this course at this college
}

// Determine college tier by name
function getCollegeTier(name: string, country?: string): 'IIT' | 'IIM' | 'AIIMS' | 'NIT' | 'IIIT' | 'BITS' | 'NLU' | 'NIFT' | 'TopPrivate' | 'Government' | 'Private' | 'Polytechnic' | 'IvyLeague' | 'TopIntl' | 'Intl' {
  const lower = name.toLowerCase();

  if (country && country !== 'India') {
    if (lower.includes('harvard') || lower.includes('mit ') || lower.includes('stanford') ||
        lower.includes('yale') || lower.includes('princeton') || lower.includes('columbia') ||
        lower.includes('penn') || lower.includes('dartmouth') || lower.includes('brown') ||
        lower.includes('cornell') || lower.includes('caltech') || lower.includes('chicago') ||
        lower.includes('oxford') || lower.includes('cambridge') || lower.includes('imperial') ||
        lower.includes('insead')) return 'IvyLeague';
    if (lower.includes('university')) return 'TopIntl';
    return 'Intl';
  }

  if (lower.includes('iit ') || lower.startsWith('iit') || lower.includes('indian institute of technology')) return 'IIT';
  if (lower.includes('iim ') || lower.startsWith('iim') || lower.includes('indian institute of management')) return 'IIM';
  if (lower.includes('aiims') || lower.includes('all india institute of medical')) return 'AIIMS';
  if (lower.includes('iiit') || lower.includes('indian institute of information technology')) return 'IIIT';
  if (lower.includes('nit ') || lower.startsWith('nit') || lower.includes('national institute of technology')) return 'NIT';
  if (lower.includes('bits ')) return 'BITS';
  if (lower.includes('nlu') || lower.includes('national law') || lower.includes('national university of juridical')) return 'NLU';
  if (lower.includes('nift') || lower.includes('nid ') || lower.includes('national institute of design') ||
      lower.includes('national institute of fashion')) return 'NIFT';
  if (lower.includes('vit ') || lower.includes('manipal') || lower.includes('srm ') ||
      lower.includes('amity') || lower.includes('lpu') || lower.includes('lovely professional') ||
      lower.includes('thapar') || lower.includes('shiv nadar') || lower.includes('ashoka') ||
      lower.includes('bennett') || lower.includes('jindal global')) return 'TopPrivate';
  if (lower.includes('government') || lower.includes('govt')) return 'Government';
  if (lower.includes('polytechnic')) return 'Polytechnic';
  return 'Private';
}

// Course fee multipliers by college tier (relative to base course fee)
function getFeeForCourse(tier: string, courseName: string): string {
  const cn = courseName.toLowerCase();

  // IIT-specific
  if (tier === 'IIT') {
    if (cn.includes('b.tech') || cn.includes('b.arch')) return '₹2,09,550 / year';
    if (cn.includes('m.tech')) return '₹50,000 - ₹1,00,000 / year';
    if (cn.includes('mba')) return '₹14,00,000 - ₹25,00,000 / year';
    if (cn.includes('phd')) return '₹50,000 / year (with stipend)';
    if (cn.includes('m.sc')) return '₹50,000 / year';
    if (cn.includes('b.sc')) return '₹2,00,000 / year';
  }

  if (tier === 'IIM') {
    if (cn.includes('mba') || cn.includes('pgdm')) return '₹14,00,000 - ₹25,00,000 / year';
    if (cn.includes('executive')) return '₹25,00,000 - ₹35,00,000 / year';
    if (cn.includes('phd')) return 'Fully funded with stipend';
  }

  if (tier === 'AIIMS') {
    if (cn.includes('mbbs')) return '₹1,628 - ₹6,000 / year';
    if (cn.includes('b.sc nursing')) return '₹8,000 - ₹15,000 / year';
    if (cn.includes('md ') || cn === 'md (doctor of medicine)' || cn.includes('ms ')) return '₹5,000 - ₹15,000 / year';
    if (cn.includes('phd')) return '₹10,000 / year (with stipend)';
    return '₹15,000 - ₹50,000 / year';
  }

  if (tier === 'NIT') {
    if (cn.includes('b.tech') || cn.includes('b.arch')) return '₹1,63,750 / year';
    if (cn.includes('m.tech')) return '₹70,000 - ₹1,20,000 / year';
    if (cn.includes('phd')) return '₹50,000 / year (with stipend)';
  }

  if (tier === 'IIIT') {
    if (cn.includes('b.tech')) return '₹2,80,000 - ₹3,50,000 / year';
    if (cn.includes('m.tech')) return '₹1,80,000 - ₹2,80,000 / year';
  }

  if (tier === 'BITS') {
    if (cn.includes('b.tech')) return '₹5,55,000 / year';
    if (cn.includes('m.tech')) return '₹3,50,000 / year';
    if (cn.includes('mba')) return '₹6,50,000 / year';
  }

  if (tier === 'NLU') {
    if (cn.includes('llb') || cn.includes('llm')) return '₹2,50,000 - ₹3,50,000 / year';
  }

  if (tier === 'NIFT') {
    if (cn.includes('b.des')) return '₹3,30,000 / year';
    if (cn.includes('m.des')) return '₹3,80,000 / year';
  }

  if (tier === 'TopPrivate') {
    if (cn.includes('b.tech')) return '₹3,00,000 - ₹6,00,000 / year';
    if (cn.includes('m.tech')) return '₹2,00,000 - ₹4,00,000 / year';
    if (cn.includes('mbbs')) return '₹15,00,000 - ₹25,00,000 / year';
    if (cn.includes('mba')) return '₹8,00,000 - ₹18,00,000 / year';
    if (cn.includes('llb')) return '₹3,50,000 - ₹6,00,000 / year';
    if (cn.includes('b.des')) return '₹4,50,000 - ₹8,00,000 / year';
    if (cn.includes('bba') || cn.includes('bca')) return '₹2,00,000 - ₹4,50,000 / year';
    if (cn.includes('b.com')) return '₹1,80,000 - ₹3,50,000 / year';
    if (cn.includes('b.sc')) return '₹2,00,000 - ₹4,00,000 / year';
    if (cn.includes('ba ')) return '₹1,50,000 - ₹3,00,000 / year';
  }

  if (tier === 'Government') {
    if (cn.includes('b.tech')) return '₹15,000 - ₹50,000 / year';
    if (cn.includes('m.tech')) return '₹15,000 - ₹40,000 / year';
    if (cn.includes('mbbs')) return '₹30,000 - ₹1,50,000 / year';
    if (cn.includes('mba')) return '₹50,000 - ₹2,00,000 / year';
    if (cn.includes('llb')) return '₹10,000 - ₹50,000 / year';
    if (cn.includes('bba') || cn.includes('bca')) return '₹15,000 - ₹50,000 / year';
    if (cn.includes('b.com')) return '₹8,000 - ₹30,000 / year';
    if (cn.includes('b.sc')) return '₹10,000 - ₹40,000 / year';
    if (cn.includes('ba ')) return '₹6,000 - ₹25,000 / year';
    if (cn.includes('b.ed')) return '₹15,000 - ₹50,000 / year';
    if (cn.includes('m.sc')) return '₹15,000 - ₹50,000 / year';
    if (cn.includes('m.com') || cn.includes('m.a ')) return '₹8,000 - ₹35,000 / year';
  }

  if (tier === 'Polytechnic') {
    if (cn.includes('b.tech')) return '₹15,000 - ₹50,000 / year';
    return '₹15,000 - ₹50,000 / year';
  }

  if (tier === 'Private') {
    if (cn.includes('b.tech')) return '₹1,20,000 - ₹3,00,000 / year';
    if (cn.includes('m.tech')) return '₹80,000 - ₹2,00,000 / year';
    if (cn.includes('mbbs')) return '₹8,00,000 - ₹18,00,000 / year';
    if (cn.includes('bds')) return '₹3,50,000 - ₹10,00,000 / year';
    if (cn.includes('mba')) return '₹2,50,000 - ₹6,00,000 / year';
    if (cn.includes('llb')) return '₹80,000 - ₹3,00,000 / year';
    if (cn.includes('b.pharm')) return '₹80,000 - ₹2,50,000 / year';
    if (cn.includes('bba') || cn.includes('bca')) return '₹80,000 - ₹2,50,000 / year';
    if (cn.includes('b.com')) return '₹40,000 - ₹1,80,000 / year';
    if (cn.includes('b.sc')) return '₹50,000 - ₹2,00,000 / year';
    if (cn.includes('ba ')) return '₹30,000 - ₹1,50,000 / year';
    if (cn.includes('b.des')) return '₹2,50,000 - ₹6,00,000 / year';
    if (cn.includes('b.ed')) return '₹40,000 - ₹1,20,000 / year';
  }

  // International
  if (tier === 'IvyLeague') {
    if (cn.includes('mba')) return '$70,000 - $85,000 / year';
    if (cn.includes('b.tech') || cn.includes('b.sc')) return '$55,000 - $80,000 / year';
    if (cn.includes('m.sc') || cn.includes('m.tech')) return '$55,000 - $75,000 / year';
    if (cn.includes('phd')) return 'Fully funded';
    if (cn.includes('llb') || cn.includes('llm')) return '$65,000 - $80,000 / year';
    if (cn.includes('mbbs') || cn.includes('md')) return '$60,000 - $75,000 / year';
    return '$50,000 - $70,000 / year';
  }

  if (tier === 'TopIntl') {
    return '$30,000 - $55,000 / year';
  }

  if (tier === 'Intl') {
    return '$15,000 - $40,000 / year';
  }

  // Fallback
  return '₹80,000 - ₹2,50,000 / year';
}

// Intake by college tier and course
function getIntake(tier: string, courseName: string): string {
  const cn = courseName.toLowerCase();
  if (tier === 'IIT') {
    if (cn.includes('b.tech computer')) return '120-180 seats';
    if (cn.includes('b.tech')) return '60-120 seats';
    if (cn.includes('m.tech')) return '20-40 seats';
    if (cn.includes('phd')) return '10-30 seats';
    if (cn.includes('mba')) return '60-120 seats';
  }
  if (tier === 'IIM') {
    if (cn.includes('mba')) return '300-500 seats';
    if (cn.includes('executive')) return '100-200 seats';
    return '20-60 seats';
  }
  if (tier === 'AIIMS') {
    if (cn.includes('mbbs')) return '125 seats';
    if (cn.includes('nursing')) return '60-100 seats';
    return '10-50 seats';
  }
  if (tier === 'NIT' || tier === 'IIIT') {
    if (cn.includes('b.tech')) return '60-120 seats';
    if (cn.includes('m.tech')) return '20-40 seats';
  }
  if (tier === 'NLU') {
    if (cn.includes('llb')) return '120-180 seats';
    if (cn.includes('llm')) return '40-80 seats';
  }
  if (tier === 'TopPrivate') {
    if (cn.includes('b.tech')) return '60-120 seats';
    if (cn.includes('mbbs')) return '150 seats';
    return '40-100 seats';
  }
  if (cn.includes('mbbs')) return '50-150 seats';
  return '30-90 seats';
}

// Cutoff/entrance criteria
function getCutoff(tier: string, courseName: string): string | undefined {
  const cn = courseName.toLowerCase();
  if (tier === 'IIT') {
    if (cn.includes('b.tech')) return 'JEE Advanced rank under 5,000';
    if (cn.includes('m.tech')) return 'GATE score 700+';
    if (cn.includes('mba')) return 'CAT 99+ percentile';
  }
  if (tier === 'IIM') {
    if (cn.includes('mba')) return 'CAT 95+ percentile';
  }
  if (tier === 'AIIMS') {
    if (cn.includes('mbbs')) return 'NEET-UG rank under 100';
  }
  if (tier === 'NIT') {
    if (cn.includes('b.tech')) return 'JEE Main rank 5,000-30,000';
  }
  if (tier === 'IIIT') {
    if (cn.includes('b.tech')) return 'JEE Main rank 8,000-25,000';
  }
  if (tier === 'NLU') {
    if (cn.includes('llb')) return 'CLAT rank under 500';
  }
  if (tier === 'NIFT') {
    if (cn.includes('b.des')) return 'NIFT entrance qualified';
  }
  if (tier === 'TopPrivate') {
    if (cn.includes('b.tech')) return 'JEE Main / Institute entrance';
    if (cn.includes('mba')) return 'CAT 75+ percentile / Institute test';
    if (cn.includes('mbbs')) return 'NEET-UG qualified';
  }
  return undefined;
}

// Course modules per stream/level
function getModules(courseName: string): string[] {
  const cn = courseName.toLowerCase();
  if (cn.includes('b.tech computer science')) {
    return ['Data Structures & Algorithms', 'Operating Systems', 'Database Management', 'Computer Networks',
            'Software Engineering', 'Machine Learning', 'AI Fundamentals', 'Web Technologies', 'Cloud Computing'];
  }
  if (cn.includes('b.tech information technology')) {
    return ['Programming Fundamentals', 'Database Systems', 'Web Development', 'Network Security',
            'Mobile Computing', 'IT Project Management', 'Cloud Computing'];
  }
  if (cn.includes('b.tech electronics')) {
    return ['Circuit Theory', 'Digital Electronics', 'Communication Systems', 'VLSI Design',
            'Signal Processing', 'Embedded Systems', 'Microprocessors'];
  }
  if (cn.includes('b.tech electrical')) {
    return ['Electric Machines', 'Power Systems', 'Control Systems', 'Power Electronics',
            'Electrical Drives', 'High Voltage Engineering'];
  }
  if (cn.includes('b.tech mechanical')) {
    return ['Engineering Mechanics', 'Thermodynamics', 'Manufacturing Processes', 'Machine Design',
            'Heat Transfer', 'Fluid Mechanics', 'CAD/CAM'];
  }
  if (cn.includes('b.tech civil')) {
    return ['Structural Analysis', 'Concrete Technology', 'Soil Mechanics', 'Surveying',
            'Transportation Engineering', 'Environmental Engineering', 'Construction Management'];
  }
  if (cn.includes('b.tech chemical')) {
    return ['Chemical Process Principles', 'Mass Transfer', 'Heat Transfer', 'Process Control',
            'Reaction Engineering', 'Process Design', 'Chemical Engineering Thermodynamics'];
  }
  if (cn.includes('b.tech aerospace') || cn.includes('b.tech aeronautical')) {
    return ['Aerodynamics', 'Aircraft Structures', 'Propulsion Systems', 'Flight Mechanics',
            'Avionics', 'Aircraft Design'];
  }
  if (cn.includes('b.tech artificial intelligence') || cn.includes('b.tech machine learning')) {
    return ['Machine Learning Algorithms', 'Deep Learning', 'Neural Networks', 'Natural Language Processing',
            'Computer Vision', 'Reinforcement Learning', 'AI Ethics'];
  }
  if (cn.includes('b.tech data science')) {
    return ['Statistics & Probability', 'Data Mining', 'Big Data Analytics', 'Data Visualization',
            'Predictive Modeling', 'Python for Data Science', 'SQL & NoSQL Databases'];
  }
  if (cn.includes('m.tech computer')) {
    return ['Advanced Algorithms', 'Distributed Systems', 'Compiler Design', 'Advanced AI',
            'Research Methodology', 'Specialization Electives'];
  }
  if (cn.includes('mbbs')) {
    return ['Anatomy', 'Physiology', 'Biochemistry', 'Pharmacology', 'Pathology', 'Microbiology',
            'Forensic Medicine', 'Community Medicine', 'Internal Medicine', 'Surgery', 'Pediatrics',
            'Obstetrics & Gynecology'];
  }
  if (cn.includes('bds')) {
    return ['Dental Anatomy', 'Oral Pathology', 'Periodontics', 'Oral Surgery', 'Orthodontics',
            'Conservative Dentistry', 'Public Health Dentistry'];
  }
  if (cn.includes('b.sc nursing')) {
    return ['Anatomy', 'Physiology', 'Microbiology', 'Nursing Foundation', 'Medical-Surgical Nursing',
            'Community Health Nursing', 'Mental Health Nursing', 'Midwifery'];
  }
  if (cn.includes('mba') && !cn.includes('finance') && !cn.includes('marketing')) {
    return ['Financial Accounting', 'Marketing Management', 'Operations Management', 'Strategic Management',
            'Organizational Behavior', 'Business Analytics', 'Economics', 'Leadership'];
  }
  if (cn.includes('mba finance')) {
    return ['Corporate Finance', 'Investment Analysis', 'Financial Markets', 'Risk Management',
            'Derivatives', 'Mergers & Acquisitions', 'International Finance'];
  }
  if (cn.includes('mba marketing')) {
    return ['Consumer Behavior', 'Brand Management', 'Digital Marketing', 'Sales Management',
            'Marketing Research', 'Strategic Marketing', 'Product Management'];
  }
  if (cn.includes('bba')) {
    return ['Principles of Management', 'Business Statistics', 'Marketing', 'HR Management',
            'Financial Accounting', 'Business Communication', 'Entrepreneurship'];
  }
  if (cn.includes('llb') || cn.includes('ba llb')) {
    return ['Constitutional Law', 'Contract Law', 'Criminal Law', 'Tort Law', 'Family Law',
            'Property Law', 'Corporate Law', 'International Law', 'Jurisprudence'];
  }
  if (cn.includes('llm')) {
    return ['Comparative Law', 'Constitutional Theory', 'Research Methodology', 'Legal Writing',
            'Specialization Electives'];
  }
  if (cn.includes('b.com')) {
    return ['Financial Accounting', 'Cost Accounting', 'Business Law', 'Economics', 'Taxation',
            'Auditing', 'Business Statistics', 'Corporate Accounting'];
  }
  if (cn.includes('bca')) {
    return ['Programming in C', 'Data Structures', 'Database Management', 'Web Development',
            'Operating Systems', 'Computer Networks', 'Software Engineering'];
  }
  if (cn.includes('mca')) {
    return ['Advanced Programming', 'Software Engineering', 'Database Systems', 'Computer Networks',
            'Object-Oriented Design', 'Web Technologies', 'Mobile Application Development'];
  }
  if (cn.includes('b.sc computer science')) {
    return ['Programming Fundamentals', 'Data Structures', 'Database Systems', 'Operating Systems',
            'Software Engineering', 'Computer Networks', 'Discrete Mathematics'];
  }
  if (cn.includes('b.sc physics')) {
    return ['Mechanics', 'Electromagnetism', 'Quantum Mechanics', 'Thermodynamics', 'Optics',
            'Solid State Physics', 'Mathematical Physics'];
  }
  if (cn.includes('b.sc chemistry')) {
    return ['Inorganic Chemistry', 'Organic Chemistry', 'Physical Chemistry', 'Analytical Chemistry',
            'Biochemistry', 'Environmental Chemistry'];
  }
  if (cn.includes('b.sc mathematics')) {
    return ['Calculus', 'Linear Algebra', 'Real Analysis', 'Differential Equations', 'Abstract Algebra',
            'Probability & Statistics', 'Numerical Methods'];
  }
  if (cn.includes('b.sc biology') || cn.includes('biotechnology')) {
    return ['Cell Biology', 'Genetics', 'Microbiology', 'Biochemistry', 'Molecular Biology',
            'Bioinformatics', 'Immunology'];
  }
  if (cn.includes('ba economics')) {
    return ['Microeconomics', 'Macroeconomics', 'Statistics', 'Mathematical Economics',
            'Indian Economy', 'International Economics', 'Development Economics'];
  }
  if (cn.includes('ba english')) {
    return ['British Literature', 'American Literature', 'Indian Writing in English', 'Literary Theory',
            'Linguistics', 'Drama', 'Poetry'];
  }
  if (cn.includes('ba psychology')) {
    return ['General Psychology', 'Social Psychology', 'Developmental Psychology', 'Abnormal Psychology',
            'Cognitive Psychology', 'Counseling', 'Research Methods'];
  }
  if (cn.includes('b.des') || cn.includes('m.des')) {
    return ['Design Thinking', 'Design History', 'Visual Communication', 'Form Studies',
            'Materials & Manufacturing', 'Sustainable Design', 'Specialization Studio'];
  }
  if (cn.includes('b.pharm')) {
    return ['Pharmaceutical Chemistry', 'Pharmacology', 'Pharmaceutics', 'Pharmacognosy',
            'Pharmaceutical Analysis', 'Hospital Pharmacy', 'Clinical Pharmacy'];
  }
  if (cn.includes('b.arch')) {
    return ['Architectural Design', 'Building Construction', 'History of Architecture', 'Structures',
            'Climatology', 'Urban Design', 'Landscape Architecture'];
  }
  if (cn.includes('b.ed')) {
    return ['Educational Psychology', 'Pedagogy', 'Curriculum Development', 'Teaching Methodology',
            'Educational Technology', 'Inclusive Education'];
  }
  if (cn.includes('b.sc agriculture')) {
    return ['Agronomy', 'Soil Science', 'Plant Pathology', 'Agricultural Economics',
            'Horticulture', 'Animal Husbandry', 'Agricultural Engineering'];
  }
  if (cn.includes('phd')) {
    return ['Research Methodology', 'Literature Review', 'Specialization Coursework',
            'Comprehensive Examination', 'Thesis Research', 'Dissertation'];
  }
  return [];
}

async function main() {
  await mongoose.connect(MONGO_URI);
  const db = mongoose.connection.db!;

  const courses = await db.collection('courses').find({}, { projection: { name: 1, duration: 1 } }).toArray();
  const courseMap = new Map(courses.map(c => [c._id.toString(), c]));

  const colleges = await db.collection('colleges').find({}, { projection: { name: 1, country: 1, courses: 1 } }).toArray();

  console.log('Building college-specific course offerings...');
  let updated = 0;

  for (let i = 0; i < colleges.length; i++) {
    const college = colleges[i];
    if (i % 100 === 0) console.log(`Progress: ${i}/${colleges.length}`);

    const tier = getCollegeTier(college.name, college.country);
    const offerings: any[] = [];

    for (const courseId of (college.courses || [])) {
      const course = courseMap.get(courseId.toString());
      if (!course) continue;

      const offering: any = {
        courseId: course._id,
        courseName: course.name,
        fees: getFeeForCourse(tier, course.name),
        intake: getIntake(tier, course.name),
        duration: course.duration,
      };

      const cutoff = getCutoff(tier, course.name);
      if (cutoff) offering.cutoff = cutoff;

      const modules = getModules(course.name);
      if (modules.length > 0) offering.modules = modules;

      offerings.push(offering);
    }

    if (offerings.length > 0) {
      await db.collection('colleges').updateOne(
        { _id: college._id },
        { $set: { courseOfferings: offerings } }
      );
      updated++;
    }
  }

  console.log(`\nDone! Updated ${updated} colleges with course-specific offerings`);

  // Sample output
  const sample = await db.collection('colleges').findOne({ name: /IIT Bombay/i });
  console.log('\n=== SAMPLE: IIT Bombay courseOfferings ===');
  console.log(JSON.stringify(sample?.courseOfferings?.slice(0, 3), null, 2));

  const sampleHarvard = await db.collection('colleges').findOne({ name: /Harvard/i });
  console.log('\n=== SAMPLE: Harvard courseOfferings ===');
  console.log(JSON.stringify(sampleHarvard?.courseOfferings?.slice(0, 3), null, 2));

  await mongoose.disconnect();
}

main().catch(console.error);
