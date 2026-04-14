import mongoose from 'mongoose';
import { Types } from 'mongoose';

const MONGO_URI = 'mongodb+srv://ajaydevmarketlube:WSCbaKW38pIGv8S2@cluster0.cd2yjhg.mongodb.net/Clarix?appName=Cluster0';

const STREAM_IDS = [
  '69831d6817f9dfd131b83e10', // Engineering & Technology
  '6983202441cd3d15ce9d6b9c', // Medical & Healthcare
  '6983209341cd3d15ce9d6ba0', // Management & Business
  '698320ab41cd3d15ce9d6ba4', // Arts, Design & Humanities
  '698329fb1def753d593a3f0e', // Law & Public Policy
  '6993ffff0df839c00950ee1c', // Hospitality & Tourism
  '699400320df839c00950ee3f', // Commerce & Finance
  '699400710df839c00950ee62', // Science & Research
  '699400a70df839c00950ee85', // Law & Public Policy 2
];

const UNIVERSITY_IDS = [
  '6978656a06b5ff90c7234868', // Calicut University
  '699fe03c2591c19ea1fd81c5', // NIT Kerala
];

const BANNER_IMAGES = [
  'https://images.unsplash.com/photo-1562774053-701939374585?w=800&h=400&fit=crop',
  'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=800&h=400&fit=crop',
  'https://images.unsplash.com/photo-1541339907198-e08756dedf3f?w=800&h=400&fit=crop',
  'https://images.unsplash.com/photo-1592280771190-3e2e4d571952?w=800&h=400&fit=crop',
  'https://images.unsplash.com/photo-1498243691581-b145c3f54a5a?w=800&h=400&fit=crop',
];

const LOGO = 'https://xalesassets.sgp1.digitaloceanspaces.com/colleges/generic-college-logo.png';

const CITY_STATE: Record<string, string> = {
  Mumbai: 'Maharashtra', Delhi: 'Delhi', Bangalore: 'Karnataka', Chennai: 'Tamil Nadu',
  Hyderabad: 'Telangana', Pune: 'Maharashtra', Kolkata: 'West Bengal', Ahmedabad: 'Gujarat',
  Jaipur: 'Rajasthan', Lucknow: 'Uttar Pradesh', Kochi: 'Kerala', Thiruvananthapuram: 'Kerala',
  Coimbatore: 'Tamil Nadu', Chandigarh: 'Chandigarh', Bhopal: 'Madhya Pradesh',
  Indore: 'Madhya Pradesh', Nagpur: 'Maharashtra', Patna: 'Bihar', Visakhapatnam: 'Andhra Pradesh',
  Vadodara: 'Gujarat', Mysore: 'Karnataka', Mangalore: 'Karnataka', Thrissur: 'Kerala',
  Calicut: 'Kerala', Madurai: 'Tamil Nadu', Tiruchirappalli: 'Tamil Nadu', Salem: 'Tamil Nadu',
  Guwahati: 'Assam', Bhubaneswar: 'Odisha', Ranchi: 'Jharkhand', Dehradun: 'Uttarakhand',
  Amritsar: 'Punjab', Ludhiana: 'Punjab', Jodhpur: 'Rajasthan', Udaipur: 'Rajasthan',
  Surat: 'Gujarat', Rajkot: 'Gujarat',
  Shimla: 'Himachal Pradesh', Dharamshala: 'Himachal Pradesh', Gangtok: 'Sikkim',
  Imphal: 'Manipur', Agartala: 'Tripura', Shillong: 'Meghalaya', Aizawl: 'Mizoram',
  Itanagar: 'Arunachal Pradesh', Raipur: 'Chhattisgarh', Jabalpur: 'Madhya Pradesh',
  Gwalior: 'Madhya Pradesh', Allahabad: 'Uttar Pradesh', Varanasi: 'Uttar Pradesh',
  Gorakhpur: 'Uttar Pradesh', Bareilly: 'Uttar Pradesh', Meerut: 'Uttar Pradesh',
  Aligarh: 'Uttar Pradesh',
};

// Major cities: 50-80 each
const MAJOR_CITIES = [
  'Mumbai', 'Delhi', 'Bangalore', 'Chennai', 'Hyderabad', 'Pune', 'Kolkata', 'Ahmedabad',
  'Jaipur', 'Lucknow', 'Kochi', 'Thiruvananthapuram', 'Coimbatore', 'Chandigarh', 'Bhopal',
];

// Medium cities: 20-40 each
const MEDIUM_CITIES = [
  'Indore', 'Nagpur', 'Patna', 'Visakhapatnam', 'Vadodara', 'Mysore', 'Mangalore',
  'Thrissur', 'Calicut', 'Madurai', 'Tiruchirappalli', 'Salem', 'Guwahati', 'Bhubaneswar',
  'Ranchi', 'Dehradun', 'Amritsar', 'Ludhiana', 'Jodhpur', 'Udaipur', 'Surat', 'Rajkot',
];

// Smaller cities: 10-20 each
const SMALLER_CITIES = [
  'Shimla', 'Dharamshala', 'Gangtok', 'Imphal', 'Agartala', 'Shillong', 'Aizawl',
  'Itanagar', 'Raipur', 'Jabalpur', 'Gwalior', 'Allahabad', 'Varanasi', 'Gorakhpur',
  'Bareilly', 'Meerut', 'Aligarh',
];

const COLLEGE_TYPES: ('Public' | 'Private' | 'Government' | 'Deemed')[] = ['Public', 'Private', 'Government', 'Deemed'];
const COURSE_TYPES: ('Full Time' | 'Part Time' | 'Online')[] = ['Full Time', 'Part Time', 'Online'];

const SAINTS_NAMES = [
  'St. Xavier', 'St. Joseph', 'St. Thomas', 'St. Mary', 'St. Agnes', 'St. Patrick',
  'Mahatma Gandhi', 'Jawaharlal Nehru', 'Dr. B.R. Ambedkar', 'Rabindranath Tagore',
  'Swami Vivekananda', 'Sardar Patel', 'Raja Ram Mohan Roy', 'Subhas Chandra Bose',
  'Lal Bahadur Shastri', 'Atal Bihari Vajpayee', 'Maulana Azad', 'C.V. Raman',
  'Homi Bhabha', 'Vikram Sarabhai',
];

const SUBJECTS = [
  'Technology', 'Science', 'Management', 'Engineering', 'Medicine', 'Commerce',
  'Design', 'Architecture', 'Pharmacy', 'Agriculture', 'Law', 'Education',
  'Information Technology', 'Computer Science', 'Electronics', 'Biotechnology',
];

const COURSE_NAMES_BY_STREAM: Record<string, string[]> = {
  'Engineering & Technology': [
    'B.Tech Computer Science', 'B.Tech Mechanical Engineering', 'B.Tech Civil Engineering',
    'B.Tech Electrical Engineering', 'B.Tech Electronics & Communication', 'M.Tech Computer Science',
    'B.Tech Information Technology', 'B.Tech Chemical Engineering', 'M.Tech Data Science',
    'B.Tech Artificial Intelligence', 'B.Tech Robotics', 'M.Tech VLSI Design',
    'B.Tech Aerospace Engineering', 'B.E. Automobile Engineering', 'Diploma in Computer Engineering',
  ],
  'Medical & Healthcare': [
    'MBBS', 'BDS', 'B.Pharm', 'M.Pharm', 'BSc Nursing', 'MD General Medicine',
    'BPT (Physiotherapy)', 'BAMS (Ayurveda)', 'BHMS (Homeopathy)', 'B.Sc Medical Lab Technology',
    'M.Sc Biotechnology', 'MPH (Public Health)', 'B.Sc Radiology', 'Diploma in Pharmacy',
    'MD Pediatrics',
  ],
  'Management & Business': [
    'MBA', 'BBA', 'MBA Finance', 'MBA Marketing', 'MBA HR', 'BBA International Business',
    'MBA Operations', 'MBA Healthcare Management', 'MBA Supply Chain', 'PGDM',
    'Executive MBA', 'BBA Digital Marketing', 'MBA Business Analytics', 'BBA Aviation Management',
    'MBA Entrepreneurship',
  ],
  'Arts, Design & Humanities': [
    'BA English', 'BA Psychology', 'BA History', 'BA Political Science', 'MA English',
    'BA Sociology', 'BA Economics', 'BA Journalism', 'BFA Fine Arts', 'B.Des Fashion Design',
    'B.Des Interior Design', 'MA Philosophy', 'BA Music', 'BA Film Studies', 'B.Des Graphic Design',
  ],
  'Law & Public Policy': [
    'BA LLB', 'LLB', 'LLM', 'BBA LLB', 'B.Com LLB', 'LLM Constitutional Law',
    'LLM Corporate Law', 'LLM International Law', 'Diploma in Cyber Law',
    'LLM Human Rights', 'BA LLB Hons', 'Diploma in Intellectual Property Law',
    'LLM Criminal Law', 'MA Public Policy', 'LLM Environmental Law',
  ],
  'Hospitality & Tourism': [
    'BHM (Hotel Management)', 'B.Sc Hospitality', 'MBA Hospitality Management',
    'Diploma in Hotel Management', 'B.Sc Tourism', 'BA Travel & Tourism',
    'Diploma in Culinary Arts', 'M.Sc Hospitality', 'BBA Tourism Management',
    'Certificate in Event Management', 'B.Sc Catering Technology', 'Diploma in Food & Beverage',
    'MBA Tourism', 'BA Hospitality', 'B.Sc Food Technology',
  ],
  'Commerce & Finance': [
    'B.Com', 'M.Com', 'B.Com Hons', 'BBA Finance', 'MBA Finance', 'CA Foundation',
    'CMA Foundation', 'B.Com Accounting & Finance', 'M.Com Banking & Insurance',
    'B.Com Taxation', 'BBA Banking', 'Diploma in Accounting', 'B.Com International Finance',
    'MBA Financial Planning', 'B.Com Cost Accounting',
  ],
  'Science & Research': [
    'B.Sc Physics', 'B.Sc Chemistry', 'B.Sc Mathematics', 'B.Sc Biology', 'M.Sc Physics',
    'M.Sc Chemistry', 'B.Sc Environmental Science', 'B.Sc Geology', 'M.Sc Mathematics',
    'B.Sc Statistics', 'M.Sc Biotechnology', 'B.Sc Microbiology', 'Ph.D Physics',
    'B.Sc Data Science', 'M.Sc Applied Mathematics',
  ],
};

function rand(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function pickRandom<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

function pickRandomN<T>(arr: T[], n: number): T[] {
  const shuffled = [...arr].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, Math.min(n, arr.length));
}

const FEES_OPTIONS = [
  '₹50,000 - ₹80,000 / year', '₹60,000 - ₹1,00,000 / year', '₹75,000 - ₹1,20,000 / year',
  '₹80,000 - ₹1,50,000 / year', '₹1,00,000 - ₹1,80,000 / year', '₹1,20,000 - ₹2,00,000 / year',
  '₹50,000 - ₹1,00,000 / year', '₹90,000 - ₹1,60,000 / year', '₹1,50,000 - ₹2,00,000 / year',
  '₹70,000 - ₹1,30,000 / year',
];

function generateCollegeName(city: string, index: number): string {
  const patterns = [
    () => `${city} University`,
    () => `University of ${city}`,
    () => `${city} Institute of Technology`,
    () => `${city} College of Engineering`,
    () => `${city} Medical College`,
    () => `${city} Law College`,
    () => `National Institute of ${pickRandom(SUBJECTS)}, ${city}`,
    () => `Indian Institute of ${pickRandom(SUBJECTS)}, ${city}`,
    () => `${pickRandom(SAINTS_NAMES)} College, ${city}`,
    () => `${city} Arts & Science College`,
    () => `${city} Business School`,
    () => `${city} Polytechnic`,
    () => `Government ${city} College`,
    () => `${city} College of ${pickRandom(SUBJECTS)}`,
    () => `${city} Academy of ${pickRandom(SUBJECTS)}`,
    () => `${pickRandom(SAINTS_NAMES)} Institute of ${pickRandom(SUBJECTS)}, ${city}`,
    () => `Central ${city} College`,
    () => `${city} School of ${pickRandom(SUBJECTS)}`,
    () => `${city} International Institute`,
    () => `Royal ${city} College`,
    () => `${city} Institute of ${pickRandom(SUBJECTS)} & Research`,
    () => `${city} College of Arts & Commerce`,
    () => `${city} Dental College`,
    () => `${city} College of Pharmacy`,
    () => `${city} Institute of Management Studies`,
    () => `${city} Engineering College`,
    () => `${city} Women's College`,
    () => `${city} College of Nursing`,
    () => `${city} Institute of Hotel Management`,
    () => `${city} College of Architecture`,
    () => `${city} National Law University`,
    () => `${city} Institute of Applied Sciences`,
    () => `Global ${city} Institute of Technology`,
    () => `${city} Institute of Science & Technology`,
    () => `Premier ${city} College`,
    () => `${city} College of Education`,
    () => `${city} School of Business`,
    () => `Heritage ${city} College`,
    () => `${city} Institute of Design`,
    () => `Modern ${city} College`,
    () => `${city} College of Commerce`,
    () => `New ${city} Institute of Technology`,
    () => `${city} Institute of Medical Sciences`,
    () => `${city} School of Law`,
    () => `${city} Institute of Fine Arts`,
    () => `Presidency College, ${city}`,
    () => `${city} College of Agricultural Sciences`,
    () => `${city} Maritime Academy`,
    () => `${city} Institute of Paramedical Sciences`,
    () => `${city} Central Institute of Technology`,
    () => `Emerald ${city} College`,
    () => `${city} Institute of Professional Studies`,
    () => `${city} College of Computer Applications`,
    () => `${city} Institute of Aerospace Engineering`,
    () => `${city} Government Polytechnic`,
    () => `Sri ${city} Institute of Technology`,
    () => `${city} College of Liberal Arts`,
    () => `${city} School of Architecture & Planning`,
    () => `${city} Institute of Electronics & Telecom`,
    () => `Rajiv Gandhi Institute of Technology, ${city}`,
    () => `Dr. APJ Abdul Kalam Institute, ${city}`,
    () => `${city} National Academy of Sciences`,
    () => `${city} School of Management & Technology`,
    () => `Netaji Subhas Institute, ${city}`,
    () => `${city} College of Veterinary Sciences`,
    () => `${city} Institute of Social Work`,
    () => `${city} Academy of Fine Arts & Design`,
    () => `${city} School of Public Health`,
    () => `Metropolitan ${city} College`,
    () => `${city} Institute of Environmental Studies`,
    () => `Pacific ${city} College of Engineering`,
    () => `${city} School of Journalism & Mass Communication`,
    () => `${city} Institute of Banking & Finance`,
    () => `Shri Ram ${city} College`,
    () => `${city} College of Physical Education`,
    () => `${city} Institute of Rural Management`,
    () => `${city} School of Performing Arts`,
    () => `${city} Government Medical College`,
    () => `Indira Gandhi ${city} College`,
    () => `${city} Institute of Textile Technology`,
  ];

  const patternIndex = index % patterns.length;
  return patterns[patternIndex]();
}

function generateDescription(name: string, city: string, state: string, type: string): string {
  const descs = [
    `${name} is a prestigious ${type.toLowerCase()} institution located in ${city}, ${state}, known for its academic excellence and vibrant campus life.`,
    `Established in ${city}, ${state}, ${name} offers world-class education with a focus on research and innovation across multiple disciplines.`,
    `${name} in ${city}, ${state} is renowned for its comprehensive curriculum, experienced faculty, and strong industry connections.`,
    `Located in the heart of ${city}, ${state}, ${name} provides students with exceptional learning opportunities and state-of-the-art facilities.`,
    `${name} is a leading ${type.toLowerCase()} institution in ${city}, ${state}, committed to nurturing future leaders through quality education.`,
    `Situated in ${city}, ${state}, ${name} combines tradition with modernity, offering cutting-edge programs across diverse fields of study.`,
    `${name}, ${city} is a premier educational institution in ${state} with a strong emphasis on holistic development and career readiness.`,
    `A distinguished ${type.toLowerCase()} institution in ${city}, ${state}, ${name} has been shaping minds and building careers for decades.`,
  ];
  return pickRandom(descs);
}

// Build city allocation to hit exactly 1500
function buildCityAllocations(): { city: string; count: number }[] {
  const allocs: { city: string; count: number }[] = [];

  // Major: 15 cities * ~55 = 825
  const majorCounts = [60, 58, 56, 55, 54, 52, 55, 53, 52, 50, 55, 52, 50, 52, 51]; // sum = 805
  MAJOR_CITIES.forEach((c, i) => allocs.push({ city: c, count: majorCounts[i] }));

  // Medium: 22 cities * ~25 = 550
  const mediumCounts = [28, 27, 26, 25, 25, 25, 24, 24, 24, 25, 24, 23, 26, 25, 24, 25, 23, 22, 23, 22, 24, 23]; // sum = 527
  MEDIUM_CITIES.forEach((c, i) => allocs.push({ city: c, count: mediumCounts[i] }));

  // Smaller: 17 cities * ~10 = 170
  const smallerCounts = [12, 10, 10, 10, 10, 10, 10, 10, 12, 12, 11, 12, 12, 10, 10, 10, 7]; // sum = 178
  SMALLER_CITIES.forEach((c, i) => allocs.push({ city: c, count: smallerCounts[i] }));

  // Check total
  const total = allocs.reduce((s, a) => s + a.count, 0);
  console.log(`Planned total: ${total}`);

  // Adjust to exactly 1500
  if (total < 1500) {
    // Add to Mumbai
    allocs[0].count += (1500 - total);
  } else if (total > 1500) {
    // Reduce from Mumbai
    allocs[0].count -= (total - 1500);
  }

  const finalTotal = allocs.reduce((s, a) => s + a.count, 0);
  console.log(`Adjusted total: ${finalTotal}`);
  return allocs;
}

async function main() {
  await mongoose.connect(MONGO_URI);
  const db = mongoose.connection.db!;
  console.log('Connected to MongoDB');

  // Check existing Indian colleges
  const existingCount = await db.collection('colleges').countDocuments({ country: 'India' });
  console.log(`Existing Indian colleges: ${existingCount}`);

  const allocations = buildCityAllocations();

  // Track used names to avoid duplicates
  const usedNames = new Set<string>();

  // Generate all colleges and their courses
  let bannerIdx = 0;
  let totalCoursesCreated = 0;
  let totalCollegesCreated = 0;

  const streamNames = Object.keys(COURSE_NAMES_BY_STREAM);

  for (const { city, count } of allocations) {
    const state = CITY_STATE[city];
    const collegeBatch: any[] = [];

    for (let i = 0; i < count; i++) {
      // Generate unique name
      let name = generateCollegeName(city, i);
      let attempts = 0;
      while (usedNames.has(name) && attempts < 100) {
        name = generateCollegeName(city, count + i + attempts);
        attempts++;
      }
      if (usedNames.has(name)) {
        name = `${city} Institute #${i + 1}`;
      }
      usedNames.add(name);

      const type = pickRandom(COLLEGE_TYPES);
      const rating = Math.round((3.0 + Math.random() * 1.8) * 10) / 10;
      const establishedYear = rand(1850, 2020);
      const students = rand(1000, 30000);
      const campusSize = `${rand(5, 200)} acres`;
      const averageSalary = rand(300000, 1200000);
      const placementPercentage = rand(60, 95);
      const highestSalary = rand(800000, 2500000);
      const recruitersCount = rand(20, 150);

      // Create courses for this college (10-15 courses)
      const numCourses = rand(10, 15);
      const courseDocuments: any[] = [];

      // Pick 3-5 streams for this college
      const selectedStreamCount = rand(3, 5);
      const selectedStreamIndices = pickRandomN([0,1,2,3,4,5,6,7], selectedStreamCount);

      for (let c = 0; c < numCourses; c++) {
        const streamIdx = selectedStreamIndices[c % selectedStreamIndices.length];
        const streamId = STREAM_IDS[streamIdx];
        const streamName = streamNames[Math.min(streamIdx, streamNames.length - 1)];
        const courseList = COURSE_NAMES_BY_STREAM[streamName];
        const courseName = courseList[c % courseList.length];

        courseDocuments.push({
          name: courseName,
          shortDescription: `${courseName} program offered at ${name}`,
          stream: new Types.ObjectId(streamId),
          type: pickRandom(COURSE_TYPES),
          duration: pickRandom(['2 years', '3 years', '4 years', '5 years']),
          fees: pickRandom(FEES_OPTIONS),
          intakeCapacity: `${rand(30, 200)}`,
          eligibility: pickRandom([
            ['10+2 with minimum 60% marks', 'Valid entrance exam score'],
            ['Graduation in any discipline', 'Minimum 50% aggregate'],
            ['10+2 with Science stream', 'JEE/State entrance exam qualified'],
            ['Graduation with 55% marks', 'CAT/MAT/XAT score'],
            ['10+2 with minimum 50% marks'],
          ]),
          description: { title: '', content: '', image: '' },
          whyChoose: { title: '', description: '', reasons: [] },
          syllabus: { title: '', semesters: [] },
          careerOpportunities: { title: '', items: [] },
          about: { title: '', description: '', points: [] },
          faqs: { title: '', description: '', items: [] },
          createdAt: new Date(),
          updatedAt: new Date(),
        });
      }

      // Insert courses
      const courseResult = await db.collection('courses').insertMany(courseDocuments);
      const courseIds = Object.values(courseResult.insertedIds);
      totalCoursesCreated += courseIds.length;

      const banner = BANNER_IMAGES[bannerIdx % BANNER_IMAGES.length];
      bannerIdx++;

      collegeBatch.push({
        name,
        country: 'India',
        state,
        city,
        type,
        rating,
        establishedYear,
        accreditation: [],
        logo: LOGO,
        brochure: '',
        description: generateDescription(name, city, state, type),
        university: new Types.ObjectId(pickRandom(UNIVERSITY_IDS)),
        students,
        campusSize,
        averageSalary,
        placementPercentage,
        highestSalary,
        placementTrends: [],
        recruiters: [],
        recruitersCount,
        studentsWithInternships: 0,
        avgStipend: 0,
        ppoConversionRate: 0,
        alumniInFortune500: 0,
        alumniEntrepreneurs: 0,
        alumniHigherStudiesAbroad: 0,
        courses: courseIds,
        scholarships: [],
        campusImages: [banner],
        hostelImages: [],
        labsImages: [],
        eventsImages: [],
        admissionFaqs: [],
        courseFaqs: [],
        feesPaymentFaqs: [],
        scholarshipFaqs: [],
        campusLife: [],
        bannerImageUrl: banner,
        category: '',
        admissionMode: [],
        createdAt: new Date(),
        updatedAt: new Date(),
      });
    }

    // Insert colleges for this city in batches of 100
    for (let b = 0; b < collegeBatch.length; b += 100) {
      const batch = collegeBatch.slice(b, b + 100);
      await db.collection('colleges').insertMany(batch);
    }
    totalCollegesCreated += collegeBatch.length;
    console.log(`  ${city}: ${collegeBatch.length} colleges inserted (total so far: ${totalCollegesCreated})`);
  }

  console.log(`\nDone! Total colleges created: ${totalCollegesCreated}`);
  console.log(`Total courses created: ${totalCoursesCreated}`);

  // Final count
  const finalIndianCount = await db.collection('colleges').countDocuments({ country: 'India' });
  const finalTotalCount = await db.collection('colleges').countDocuments({});
  console.log(`\nFinal Indian college count: ${finalIndianCount}`);
  console.log(`Final total college count: ${finalTotalCount}`);

  await mongoose.disconnect();
}

main().catch(err => {
  console.error(err);
  process.exit(1);
});
