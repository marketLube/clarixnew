import mongoose from 'mongoose';
import { execSync } from 'child_process';

const MONGO_URI = 'mongodb+srv://ajaydevmarketlube:WSCbaKW38pIGv8S2@cluster0.cd2yjhg.mongodb.net/?appName=Cluster0';

function curlJson(url: string): any {
  try {
    const result = execSync(
      `curl -s --max-time 8 "${url.replace(/"/g, '\\"')}" -H "User-Agent: ClarixEducation/1.0 (https://clarixeducation.com)"`,
      { timeout: 10000, encoding: 'utf-8', maxBuffer: 5_000_000 }
    );
    return JSON.parse(result);
  } catch { return null; }
}

// Search Wikipedia article for the concept and grab its main image
async function findImage(searchTerm: string): Promise<string | null> {
  // Step 1: Search Wikipedia
  const searchUrl = `https://en.wikipedia.org/w/api.php?action=query&list=search&srsearch=${encodeURIComponent(searchTerm)}&format=json&srlimit=1`;
  const searchData = curlJson(searchUrl);
  const title = searchData?.query?.search?.[0]?.title;
  if (!title) return null;

  // Step 2: Get page image
  const pageUrl = `https://en.wikipedia.org/w/api.php?action=query&titles=${encodeURIComponent(title)}&prop=pageimages&format=json&pithumbsize=1280`;
  const pageData = curlJson(pageUrl);
  const pages = pageData?.query?.pages;
  if (!pages) return null;
  const p = Object.values(pages)[0] as any;
  const url = p?.thumbnail?.source;
  if (!url) return null;

  // Skip bad images (svg, logos, portraits, etc.)
  const lower = url.toLowerCase();
  if (lower.endsWith('.svg') || lower.endsWith('.pdf')) return null;
  if (lower.includes('coat_of_arms') || lower.includes('seal_of') || lower.includes('logo')) return null;

  return url;
}

// Map each course to a search term
const COURSE_SEARCH_MAP: Record<string, string> = {
  // Engineering
  'B.Tech Computer Science and Engineering': 'data center server room',
  'B.Tech Information Technology': 'computer programming software',
  'B.Tech Electronics and Communication Engineering': 'printed circuit board electronics',
  'B.Tech Electrical Engineering': 'power transmission substation',
  'B.Tech Mechanical Engineering': 'mechanical engineering workshop',
  'B.Tech Civil Engineering': 'civil engineering construction',
  'B.Tech Chemical Engineering': 'chemical engineering plant',
  'B.Tech Biotechnology': 'biotechnology laboratory',
  'B.Tech Aerospace Engineering': 'aerospace engineering aircraft',
  'B.Tech Artificial Intelligence and Machine Learning': 'artificial intelligence',
  'B.Tech Data Science': 'data science analytics',
  'B.Tech Cyber Security': 'cybersecurity',
  'B.Tech Robotics and Automation': 'industrial robot automation',
  'B.Tech Mechatronics': 'mechatronics robot',
  'B.Tech Aeronautical Engineering': 'aeronautical engineering aircraft',
  'B.Tech Automobile Engineering': 'automotive assembly line',
  'B.Tech Petroleum Engineering': 'petroleum engineering oil rig',
  'B.Tech Mining Engineering': 'mining engineering',
  'B.Tech Marine Engineering': 'marine engineering ship',
  'B.Tech Food Technology': 'food processing factory',
  'M.Tech Computer Science': 'computer science research',
  'M.Tech Electronics': 'electronics laboratory',
  'M.Tech Mechanical': 'mechanical engineering CAD',
  'M.Tech Civil': 'civil engineering structural',
  'M.Tech Structural Engineering': 'structural engineering bridge',
  'M.Tech VLSI Design': 'VLSI microchip design',
  'B.Arch (Bachelor of Architecture)': 'architecture studio drawing',
  'M.Arch (Master of Architecture)': 'architectural model design',
  'M.Plan (Master of Planning)': 'urban planning city',

  // Management
  'MBA (Master of Business Administration)': 'business school classroom',
  'MBA Finance': 'stock exchange trading floor',
  'MBA Marketing': 'marketing advertising billboard',
  'MBA Human Resources': 'human resources interview',
  'MBA Operations Management': 'supply chain warehouse',
  'MBA International Business': 'international trade shipping',
  'MBA Business Analytics': 'business analytics dashboard',
  'PGDM (Post Graduate Diploma in Management)': 'business management',
  'Executive MBA': 'executive boardroom meeting',
  'BBA (Bachelor of Business Administration)': 'business administration',
  'BMS (Bachelor of Management Studies)': 'business management studies',
  'BBA Logistics and Supply Chain Management': 'logistics shipping containers',
  'BHM (Bachelor of Hotel Management)': 'hotel reception lobby',

  // Medical
  'MBBS (Bachelor of Medicine, Bachelor of Surgery)': 'medical doctor stethoscope',
  'BDS (Bachelor of Dental Surgery)': 'dentist dental clinic',
  'BAMS (Bachelor of Ayurvedic Medicine and Surgery)': 'ayurveda medicine',
  'BHMS (Bachelor of Homoeopathic Medicine and Surgery)': 'homeopathy medicine',
  'BUMS (Bachelor of Unani Medicine and Surgery)': 'unani medicine',
  'BPT (Bachelor of Physiotherapy)': 'physiotherapy treatment',
  'B.Sc Nursing': 'nurse hospital',
  'GNM (General Nursing and Midwifery)': 'nursing midwifery',
  'ANM (Auxiliary Nurse Midwifery)': 'nursing midwifery',
  'M.Sc Nursing': 'nursing education',
  'MD (Doctor of Medicine)': 'doctor medical residency',
  'MS (Master of Surgery)': 'surgeons operating room',
  'MDS (Master of Dental Surgery)': 'dental surgery',
  'B.Sc Medical Lab Technology': 'medical laboratory technician',
  'B.Sc Radiology and Imaging Technology': 'MRI scanner radiology',
  'B.Sc Operation Theatre Technology': 'operation theatre surgery',
  'B.Sc Optometry': 'eye examination optometry',
  'B.Sc Cardiac Care Technology': 'cardiac care ECG',
  'B.Sc Respiratory Therapy': 'respiratory therapy ventilator',
  'BNYS (Naturopathy and Yogic Sciences)': 'yoga naturopathy',
  'MPT (Master of Physiotherapy)': 'physiotherapy',

  // Pharmacy
  'B.Pharm (Bachelor of Pharmacy)': 'pharmacist pharmacy',
  'D.Pharm (Diploma in Pharmacy)': 'pharmacist medicines',
  'M.Pharm (Master of Pharmacy)': 'pharmaceutical research',
  'Pharm.D (Doctor of Pharmacy)': 'clinical pharmacy',

  // Law
  'BA LLB (Hons) - 5 Year Integrated': 'law library',
  'BBA LLB (Hons) - 5 Year Integrated': 'law library',
  'B.Com LLB (Hons) - 5 Year Integrated': 'law library',
  'LLB (Bachelor of Laws)': 'law court justice',
  'LLM (Master of Laws)': 'law court justice',

  // Commerce
  'B.Com (Bachelor of Commerce)': 'accounting calculator',
  'B.Com (Honours)': 'accounting calculator',
  'M.Com (Master of Commerce)': 'commerce business',
  'B.Com with ACCA': 'accounting professional',
  'BBA Finance': 'stock exchange trading',
  'CA (Chartered Accountancy)': 'accounting auditing',

  // Science
  'B.Sc Physics': 'physics laboratory experiment',
  'B.Sc Chemistry': 'chemistry laboratory beakers',
  'B.Sc Mathematics': 'mathematics equations chalkboard',
  'B.Sc Biology': 'biology microscope laboratory',
  'B.Sc Computer Science': 'computer programming code',
  'BCA (Bachelor of Computer Applications)': 'computer applications',
  'M.Sc Physics': 'physics research',
  'M.Sc Chemistry': 'chemistry research',
  'M.Sc Mathematics': 'mathematics research',
  'M.Sc Biotechnology': 'biotechnology research',
  'M.Sc Computer Science': 'computer science research',
  'MCA (Master of Computer Applications)': 'computer applications',
  'M.Sc Data Science': 'data science visualization',
  'PhD (Doctor of Philosophy)': 'graduation ceremony',

  // Arts
  'BA (Bachelor of Arts)': 'university library',
  'BA Economics': 'economics graph chart',
  'BA English': 'english literature books',
  'BA Psychology': 'psychology brain',
  'BA Political Science': 'parliament democracy',
  'BA Sociology': 'sociology people',
  'BA History': 'history museum artifacts',
  'BA Journalism and Mass Communication': 'journalism news studio',
  'MA (Master of Arts)': 'university library',
  'MA Economics': 'economics graph',
  'MA English': 'english literature',
  'MA Psychology': 'psychology counseling',
  'BSW (Bachelor of Social Work)': 'social work community',
  'MSW (Master of Social Work)': 'social work community',

  // Design
  'B.Des (Bachelor of Design)': 'graphic designer studio',
  'BFA (Bachelor of Fine Arts)': 'fine art painting studio',
  'M.Des (Master of Design)': 'design studio workspace',
  'MFA (Master of Fine Arts)': 'fine arts studio',

  // Education
  'B.Ed (Bachelor of Education)': 'teacher classroom students',
  'M.Ed (Master of Education)': 'teacher education',
  'B.P.Ed (Bachelor of Physical Education)': 'sports coach physical education',
  'D.El.Ed (Diploma in Elementary Education)': 'elementary school teacher',
  'BTC (Basic Training Certificate)': 'teacher training',

  // Agriculture
  'B.Sc Agriculture': 'agriculture farming field',
  'B.Sc Horticulture': 'horticulture greenhouse plants',
  'B.Sc Forestry': 'forest trees',
  'B.V.Sc (Bachelor of Veterinary Science)': 'veterinarian animal',
  'M.Sc Agriculture': 'agricultural research',

  // Honours/older variants
  'B.Sc Physics (Honours)': 'physics laboratory experiment',
  'B.Sc Chemistry (Honours)': 'chemistry laboratory beakers',
  'B.Sc Mathematics (Honours)': 'mathematics equations',
  'BA Economics (Honours)': 'economics graph chart',
  'BA English (Honours)': 'english literature books',
  'BA Psychology (Honours)': 'psychology brain',
  'B.Tech Artificial Intelligence and Data Science': 'artificial intelligence',
  'B.Sc Biology / Biotechnology': 'biotechnology laboratory',
  'B.Sc Hotel Management and Catering Technology': 'hotel kitchen chef',
  'BA LLB (Integrated Law)': 'law library',
  'B.Sc Medical Laboratory Technology': 'medical laboratory technician',
  'BSc Digital and Cyber Forensic Science': 'cybersecurity forensics',
  'BSc Anaesthesia and Operation Theatre Technology': 'operation theatre',
  'BSc Medical Imaging Technology': 'MRI scanner radiology',
  'BSc Microbiology': 'microbiology microscope',
  'Post Basic BSc Nursing': 'nurse hospital',
  'BSc Perfusion Technology': 'cardiac surgery',
  'BHMCT - Bachelor of Hotel Management and Catering Technology': 'hotel kitchen',
  'BSc Neuroscience': 'brain neuroscience',
  'MSc Medical Imaging Technology': 'MRI scanner',
};

async function main() {
  await mongoose.connect(MONGO_URI);
  const db = mongoose.connection.db!;

  const courses = await db.collection('courses').find({}).toArray();
  console.log(`Finding real images for ${courses.length} courses...`);

  const usedImages = new Set<string>();
  let fixed = 0, failed = 0;

  for (let i = 0; i < courses.length; i++) {
    const course = courses[i];
    if (i % 10 === 0) console.log(`Progress: ${i}/${courses.length} | Fixed: ${fixed}`);

    const searchTerm = COURSE_SEARCH_MAP[course.name];
    if (!searchTerm) {
      console.log(`  No search term for: ${course.name}`);
      failed++;
      continue;
    }

    // Try primary search
    let img = await findImage(searchTerm);

    // If used, try variations
    if (!img || usedImages.has(img)) {
      img = await findImage(searchTerm.split(' ').slice(0, 2).join(' '));
    }
    if (!img || usedImages.has(img)) {
      img = await findImage(course.name);
    }

    if (img) {
      await db.collection('courses').updateOne(
        { _id: course._id },
        { $set: { cardImage: img, heroImage: img } }
      );
      usedImages.add(img);
      fixed++;
    } else {
      failed++;
      console.log(`  FAILED: ${course.name}`);
    }
  }

  console.log(`\nDone! Fixed: ${fixed} | Failed: ${failed}`);

  // Final verification
  const final = await db.collection('courses').find({}, { projection: { name: 1, cardImage: 1 } }).toArray();
  const valid = final.filter(c => c.cardImage && c.cardImage.includes('wikipedia'));
  console.log(`Courses with valid Wikipedia images: ${valid.length} / ${final.length}`);

  await mongoose.disconnect();
}

main().catch(console.error);
