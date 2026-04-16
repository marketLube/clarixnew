import mongoose from 'mongoose';

const MONGO_URI = 'mongodb+srv://ajaydevmarketlube:WSCbaKW38pIGv8S2@cluster0.cd2yjhg.mongodb.net/?appName=Cluster0';

// Country-specific fee ranges (realistic 2024/2025 international tuition)
const COUNTRY_FEES: Record<string, { top: Record<string, string>; general: Record<string, string> }> = {
  'United Kingdom': {
    top: { // Oxford, Cambridge, Imperial, UCL, LSE
      btech: '£33,000 - £48,000 / year',
      mtech: '£33,000 - £48,000 / year',
      mba: '£60,000 - £85,000 / year',
      mbbs: '£45,000 - £60,000 / year',
      md: '£45,000 - £60,000 / year',
      ms: '£45,000 - £60,000 / year',
      llb: '£30,000 - £48,000 / year',
      llm: '£30,000 - £48,000 / year',
      ba: '£25,000 - £45,000 / year',
      bsc: '£28,000 - £45,000 / year',
      bcom: '£25,000 - £40,000 / year',
      bba: '£28,000 - £45,000 / year',
      mba_short: '£60,000 - £85,000 / year',
      mcom: '£25,000 - £40,000 / year',
      msc: '£28,000 - £45,000 / year',
      phd: 'Fully funded',
      default: '£28,000 - £45,000 / year',
    },
    general: {
      btech: '£22,000 - £32,000 / year',
      mtech: '£22,000 - £32,000 / year',
      mba: '£25,000 - £45,000 / year',
      mbbs: '£35,000 - £50,000 / year',
      md: '£35,000 - £50,000 / year',
      ms: '£35,000 - £50,000 / year',
      llb: '£20,000 - £32,000 / year',
      llm: '£20,000 - £32,000 / year',
      ba: '£18,000 - £28,000 / year',
      bsc: '£20,000 - £30,000 / year',
      bcom: '£18,000 - £26,000 / year',
      bba: '£20,000 - £30,000 / year',
      mcom: '£18,000 - £26,000 / year',
      msc: '£20,000 - £30,000 / year',
      phd: 'Funded / £20,000-25,000 / year',
      default: '£20,000 - £32,000 / year',
    },
  },
  'Canada': {
    top: {
      btech: 'CAD 45,000 - CAD 62,000 / year',
      mba: 'CAD 50,000 - CAD 95,000 / year',
      mbbs: 'CAD 45,000 - CAD 75,000 / year',
      default: 'CAD 40,000 - CAD 62,000 / year',
    },
    general: {
      btech: 'CAD 28,000 - CAD 42,000 / year',
      mba: 'CAD 30,000 - CAD 55,000 / year',
      mbbs: 'CAD 35,000 - CAD 60,000 / year',
      default: 'CAD 25,000 - CAD 42,000 / year',
    },
  },
  'Australia': {
    top: {
      btech: 'AUD 42,000 - AUD 55,000 / year',
      mba: 'AUD 55,000 - AUD 85,000 / year',
      default: 'AUD 35,000 - AUD 55,000 / year',
    },
    general: {
      btech: 'AUD 30,000 - AUD 42,000 / year',
      mba: 'AUD 35,000 - AUD 55,000 / year',
      default: 'AUD 28,000 - AUD 42,000 / year',
    },
  },
  'Germany': { top: { default: '€0 - €3,000 / year' }, general: { default: '€0 - €3,000 / year' } },
  'France': { top: { mba: '€35,000 - €85,000 / year', default: '€3,000 - €18,000 / year' }, general: { default: '€3,000 - €12,000 / year' } },
  'Netherlands': { top: { default: '€12,000 - €22,000 / year' }, general: { default: '€10,000 - €18,000 / year' } },
  'Sweden': { top: { default: 'SEK 90,000 - SEK 200,000 / year' }, general: { default: 'SEK 80,000 - SEK 160,000 / year' } },
  'Ireland': { top: { default: '€20,000 - €35,000 / year' }, general: { default: '€15,000 - €28,000 / year' } },
  'Singapore': {
    top: {
      btech: 'SGD 38,000 - SGD 55,000 / year',
      mba: 'SGD 75,000 - SGD 100,000 / year',
      default: 'SGD 30,000 - SGD 50,000 / year',
    },
    general: { default: 'SGD 25,000 - SGD 42,000 / year' },
  },
  'Japan': {
    top: { default: '¥800,000 - ¥1,800,000 / year' },
    general: { default: '¥600,000 - ¥1,200,000 / year' },
  },
  'South Korea': { top: { default: '₩8,000,000 - ₩16,000,000 / year' }, general: { default: '₩6,000,000 - ₩12,000,000 / year' } },
  'China': { top: { default: 'CNY 40,000 - CNY 90,000 / year' }, general: { default: 'CNY 20,000 - CNY 60,000 / year' } },
  'UAE': { top: { default: 'AED 50,000 - AED 95,000 / year' }, general: { default: 'AED 35,000 - AED 75,000 / year' } },
  'Malaysia': { top: { default: 'MYR 25,000 - MYR 50,000 / year' }, general: { default: 'MYR 18,000 - MYR 40,000 / year' } },
  'New Zealand': { top: { default: 'NZD 35,000 - NZD 48,000 / year' }, general: { default: 'NZD 25,000 - NZD 40,000 / year' } },
};

function isTopIntl(name: string): boolean {
  const lower = name.toLowerCase();
  const topKeywords = ['oxford', 'cambridge', 'imperial', 'ucl', 'lse', 'kings college',
    'mcgill', 'toronto', 'british columbia', 'waterloo',
    'melbourne', 'sydney', 'monash', 'australian national', 'queensland',
    'tum', 'munich', 'heidelberg',
    'insead', 'sorbonne', 'sciences po', 'hec paris', 'ecole',
    'amsterdam', 'leiden', 'utrecht',
    'national university of singapore', 'nus', 'nanyang', 'ntu',
    'tokyo', 'kyoto', 'waseda',
    'seoul national', 'kaist', 'yonsei',
    'tsinghua', 'peking', 'fudan',
    'auckland', 'otago',
    'trinity college dublin', 'university college dublin',
    'karolinska', 'kth', 'lund',
  ];
  return topKeywords.some(k => lower.includes(k));
}

function getCourseFee(country: string, courseName: string, isTop: boolean): string | null {
  const fees = COUNTRY_FEES[country];
  if (!fees) return null;
  const pool = isTop ? fees.top : fees.general;

  const cn = courseName.toLowerCase();
  if (cn.startsWith('b.tech') || cn.includes('engineering')) return pool.btech || pool.default;
  if (cn.startsWith('m.tech')) return pool.mtech || pool.btech || pool.default;
  if (cn.includes('mba') || cn.includes('pgdm')) return pool.mba || pool.default;
  if (cn.startsWith('mbbs')) return pool.mbbs || pool.default;
  if (cn.startsWith('md ') || cn === 'md (doctor of medicine)') return pool.md || pool.mbbs || pool.default;
  if (cn.startsWith('ms ') || cn === 'ms (master of surgery)') return pool.ms || pool.mbbs || pool.default;
  if (cn.includes('llb')) return pool.llb || pool.default;
  if (cn.includes('llm')) return pool.llm || pool.default;
  if (cn.startsWith('ba ') || cn === 'ba (bachelor of arts)' || cn === 'ma (master of arts)') return pool.ba || pool.default;
  if (cn.startsWith('b.sc')) return pool.bsc || pool.default;
  if (cn.startsWith('m.sc')) return pool.msc || pool.default;
  if (cn.startsWith('b.com')) return pool.bcom || pool.default;
  if (cn.startsWith('m.com')) return pool.mcom || pool.default;
  if (cn.includes('bba')) return pool.bba || pool.default;
  if (cn.includes('phd')) return pool.phd || pool.default;
  return pool.default;
}

// Re-compute annualFee from offerings
function parseFeeRange(fee: string): { min: number; max: number; currency: string } | null {
  if (!fee) return null;
  let currency = '£';
  if (fee.includes('$')) currency = '$';
  else if (fee.includes('£')) currency = '£';
  else if (fee.includes('€')) currency = '€';
  else if (fee.startsWith('₹') || fee.includes('₹')) currency = '₹';
  else if (fee.includes('CAD')) currency = 'CAD';
  else if (fee.includes('AUD')) currency = 'AUD';
  else if (fee.includes('SGD')) currency = 'SGD';
  else if (fee.includes('¥')) currency = '¥';
  else if (fee.includes('₩')) currency = '₩';
  else if (fee.includes('CNY')) currency = 'CNY';
  else if (fee.includes('AED')) currency = 'AED';
  else if (fee.includes('MYR')) currency = 'MYR';
  else if (fee.includes('NZD')) currency = 'NZD';
  else if (fee.includes('SEK')) currency = 'SEK';

  const parseNum = (s: string): number => {
    const num = parseFloat(s.replace(/,/g, ''));
    if (isNaN(num)) return 0;
    return num;
  };

  const numMatches = fee.match(/[\d,]+(?:\.\d+)?/g) || [];
  const nums = numMatches.map(parseNum).filter(n => n > 0);
  if (nums.length === 0) return null;

  return { min: Math.min(...nums), max: Math.max(...nums), currency };
}

function formatFee(min: number, max: number, currency: string): string {
  const fmt = (n: number): string => {
    if (currency === '₹') {
      if (n >= 10000000) return (n / 10000000).toFixed(1).replace('.0', '') + ' Cr';
      if (n >= 100000) return (n / 100000).toFixed(2).replace('.00', '') + 'L';
      return n.toLocaleString('en-IN');
    }
    return n.toLocaleString('en-US');
  };
  if (min === max) return `${currency}${fmt(min)} / year`;
  return `${currency}${fmt(min)} - ${currency}${fmt(max)} / year`;
}

// Extended BITS/VIT/Amrita course list
const TOP_ENGINEERING_PRIVATE_COURSES = [
  'B.Tech Computer Science and Engineering', 'B.Tech Information Technology',
  'B.Tech Electronics and Communication Engineering', 'B.Tech Electrical Engineering',
  'B.Tech Mechanical Engineering', 'B.Tech Civil Engineering',
  'B.Tech Chemical Engineering', 'B.Tech Biotechnology',
  'B.Tech Artificial Intelligence and Machine Learning', 'B.Tech Data Science',
  'B.Tech Aerospace Engineering', 'B.Tech Cyber Security',
  'B.Tech Mechatronics', 'B.Tech Electronics and Instrumentation',
  'M.Tech Computer Science', 'M.Tech Electronics', 'M.Tech Mechanical',
  'M.Tech Civil', 'M.Tech VLSI Design', 'M.Tech Structural Engineering',
  'MBA (Master of Business Administration)', 'MBA Finance', 'MBA Marketing',
  'BBA (Bachelor of Business Administration)',
  'B.Sc Physics', 'B.Sc Chemistry', 'B.Sc Mathematics', 'B.Sc Biology',
  'M.Sc Physics', 'M.Sc Chemistry', 'M.Sc Mathematics',
  'PhD Computer Science', 'PhD Engineering', 'PhD (Doctor of Philosophy)',
];

async function main() {
  process.stdout.write('=== CURRENCY & COURSE FIX ===\n');
  await mongoose.connect(MONGO_URI);
  const db = mongoose.connection.db!;

  // === PART 1: Fix international currency ===
  process.stdout.write('\n--- PART 1: Fix international currency ---\n');
  const intl = await db.collection('colleges').find({
    country: { $nin: ['India', 'United States'] }
  }, { projection: { name: 1, country: 1, courseOfferings: 1 } }).toArray();

  process.stdout.write(`Non-US intl colleges: ${intl.length}\n`);
  let currencyFixed = 0;

  for (const c of intl) {
    const country = c.country;
    const isTop = isTopIntl(c.name);
    if (!COUNTRY_FEES[country]) continue;

    const newOfferings = (c.courseOfferings || []).map((o: any) => {
      const newFee = getCourseFee(country, o.courseName, isTop);
      return newFee ? { ...o, fees: newFee } : o;
    });

    // Re-compute annualFee from new offerings
    let fee = '';
    if (newOfferings.length > 0) {
      const mins: number[] = [], maxs: number[] = [];
      let currency = '£';
      for (const o of newOfferings) {
        const p = parseFeeRange(o.fees);
        if (p) { mins.push(p.min); maxs.push(p.max); currency = p.currency; }
      }
      if (mins.length > 0) {
        fee = formatFee(Math.min(...mins), Math.max(...maxs), currency);
      }
    }

    await db.collection('colleges').updateOne(
      { _id: c._id },
      { $set: { courseOfferings: newOfferings, annualFee: fee, avgAnnualFee: fee } }
    );
    currencyFixed++;
  }
  process.stdout.write(`Fixed currency for ${currencyFixed} colleges\n`);

  // === PART 2: Fix undercounted colleges (BITS, VIT, Amrita) ===
  process.stdout.write('\n--- PART 2: Fix BITS/VIT/Amrita course count ---\n');
  const undercounted = await db.collection('colleges').find({
    $or: [
      { name: /BITS Pilani/i },
      { name: /VIT Vellore/i },
      { name: /VIT Chennai/i },
      { name: /Amrita Vishwa Vidyapeetham$/i },
      { name: /Amrita Vishwa Vidyapeetham Amritapuri/i },
      { name: /Amrita Vishwa Vidyapeetham Coimbatore Campus$/i },
    ]
  }).toArray();

  process.stdout.write(`Candidates: ${undercounted.length}\n`);

  // Get all courses
  const allCourses = await db.collection('courses').find({}).toArray();
  const courseMap = new Map(allCourses.map(c => [c.name, c]));

  let courseFixed = 0;
  for (const c of undercounted) {
    if (c.courses?.length >= 15) continue; // Already has enough

    const lower = c.name.toLowerCase();
    // Decide tier
    const isBits = lower.includes('bits');
    const tier = isBits ? 'BITS' : 'TopPrivate';

    const courseIds: any[] = [];
    const offerings: any[] = [];
    for (const cn of TOP_ENGINEERING_PRIVATE_COURSES) {
      const cDoc = courseMap.get(cn);
      if (!cDoc) continue;
      courseIds.push(cDoc._id);

      // Tier-specific fees
      let fee = '';
      const cl = cn.toLowerCase();
      if (tier === 'BITS') {
        if (cl.startsWith('b.tech')) fee = '₹5,55,000 / year';
        else if (cl.startsWith('m.tech')) fee = '₹3,50,000 / year';
        else if (cl.includes('mba')) fee = '₹6,50,000 / year';
        else if (cl.startsWith('b.sc')) fee = '₹3,50,000 - ₹5,00,000 / year';
        else if (cl.startsWith('m.sc')) fee = '₹2,50,000 - ₹4,00,000 / year';
        else if (cl.includes('phd')) fee = '₹70,000 / year (with stipend)';
        else fee = '₹3,50,000 - ₹5,55,000 / year';
      } else {
        // VIT, Amrita, etc.
        if (cl.startsWith('b.tech')) fee = '₹2,40,000 - ₹4,50,000 / year';
        else if (cl.startsWith('m.tech')) fee = '₹1,80,000 - ₹3,00,000 / year';
        else if (cl.includes('mba')) fee = '₹6,00,000 - ₹14,00,000 / year';
        else if (cl.startsWith('b.sc')) fee = '₹1,20,000 - ₹2,50,000 / year';
        else if (cl.startsWith('m.sc')) fee = '₹1,00,000 - ₹2,00,000 / year';
        else if (cl.includes('phd')) fee = '₹1,50,000 / year (with stipend)';
        else if (cl.includes('bba')) fee = '₹2,00,000 - ₹3,80,000 / year';
        else fee = '₹2,00,000 - ₹4,50,000 / year';
      }

      offerings.push({
        courseId: cDoc._id,
        courseName: cn,
        fees: fee,
        intake: tier === 'BITS' ? '60-120 seats' : '60-120 seats',
        duration: cDoc.duration,
      });
    }

    // Re-compute annualFee
    const mins: number[] = [], maxs: number[] = [];
    for (const o of offerings) {
      const p = parseFeeRange(o.fees);
      if (p) { mins.push(p.min); maxs.push(p.max); }
    }
    const annualFee = mins.length > 0
      ? formatFee(Math.min(...mins), Math.max(...maxs), '₹')
      : c.annualFee;

    await db.collection('colleges').updateOne(
      { _id: c._id },
      { $set: { courses: courseIds, courseOfferings: offerings, annualFee, avgAnnualFee: annualFee } }
    );
    courseFixed++;
    process.stdout.write(`  Updated ${c.name}: ${offerings.length} courses\n`);
  }
  process.stdout.write(`Fixed courses for ${courseFixed} colleges\n`);

  // === Final verification ===
  process.stdout.write('\n--- VERIFICATION ---\n');
  const samples = ['University of Oxford', 'University of Cambridge', 'BITS Pilani', 'VIT Vellore', 'Technical University of Munich', 'ETH Zurich', 'INSEAD'];
  for (const name of samples) {
    const c = await db.collection('colleges').findOne({ name: new RegExp(name, 'i') });
    if (c) {
      process.stdout.write(`  ${c.name} (${c.country}): ${c.annualFee} [${c.courses?.length || 0} courses]\n`);
    }
  }

  await mongoose.disconnect();
}

main().catch(e => { console.error(e); process.exit(1); });
