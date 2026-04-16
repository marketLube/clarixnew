import mongoose from 'mongoose';
import { execSync } from 'child_process';

const MONGO_URI = 'mongodb+srv://ajaydevmarketlube:WSCbaKW38pIGv8S2@cluster0.cd2yjhg.mongodb.net/?appName=Cluster0';

// Category-based fallback images (Unsplash - always reliable)
const CATEGORY_FALLBACKS: Record<string, string[]> = {
  hotel_management: [
    'https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=1280&q=80',
    'https://images.unsplash.com/photo-1564501049412-61c2a3083791?w=1280&q=80',
    'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?w=1280&q=80',
    'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=1280&q=80',
  ],
  medical: [
    'https://images.unsplash.com/photo-1551190822-a9333d879b1f?w=1280&q=80',
    'https://images.unsplash.com/photo-1538108149393-fbbd81895907?w=1280&q=80',
    'https://images.unsplash.com/photo-1504813184591-01572f98c85f?w=1280&q=80',
    'https://images.unsplash.com/photo-1584982751601-97dcc096659c?w=1280&q=80',
  ],
  engineering: [
    'https://images.unsplash.com/photo-1541339907198-e08756dedf3f?w=1280&q=80',
    'https://images.unsplash.com/photo-1498243691581-b145c3f54a5a?w=1280&q=80',
    'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=1280&q=80',
    'https://images.unsplash.com/photo-1562774053-701939374585?w=1280&q=80',
  ],
  arts_science: [
    'https://images.unsplash.com/photo-1541339907198-e08756dedf3f?w=1280&q=80',
    'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=1280&q=80',
    'https://images.unsplash.com/photo-1498243691581-b145c3f54a5a?w=1280&q=80',
    'https://images.unsplash.com/photo-1562774053-701939374585?w=1280&q=80',
    'https://images.unsplash.com/photo-1571260899304-425eee4c7efc?w=1280&q=80',
  ],
  management: [
    'https://images.unsplash.com/photo-1497366216548-37526070297c?w=1280&q=80',
    'https://images.unsplash.com/photo-1556761175-5973dc0f32e7?w=1280&q=80',
    'https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=1280&q=80',
  ],
  dental: [
    'https://images.unsplash.com/photo-1606811841689-23dfddce3e95?w=1280&q=80',
    'https://images.unsplash.com/photo-1609840114035-3c981b782dfe?w=1280&q=80',
  ],
  nursing: [
    'https://images.unsplash.com/photo-1631815587646-b85a1bb027e1?w=1280&q=80',
    'https://images.unsplash.com/photo-1584467735815-f778f274e296?w=1280&q=80',
  ],
  pharmacy: [
    'https://images.unsplash.com/photo-1587854692152-cbe660dbde88?w=1280&q=80',
    'https://images.unsplash.com/photo-1576602975754-91cc9e95cdfb?w=1280&q=80',
  ],
  law: [
    'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=1280&q=80',
    'https://images.unsplash.com/photo-1505664194779-8beaceb93744?w=1280&q=80',
  ],
  polytechnic: [
    'https://images.unsplash.com/photo-1581092335397-9583eb92d232?w=1280&q=80',
    'https://images.unsplash.com/photo-1581092160562-40aa08e78837?w=1280&q=80',
  ],
  agriculture: [
    'https://images.unsplash.com/photo-1625246333195-78d9c38ad449?w=1280&q=80',
    'https://images.unsplash.com/photo-1500595046743-cd271d694d30?w=1280&q=80',
  ],
  design: [
    'https://images.unsplash.com/photo-1561070791-2526d30994b8?w=1280&q=80',
    'https://images.unsplash.com/photo-1558655146-9f40138edfeb?w=1280&q=80',
  ],
  aviation: [
    'https://images.unsplash.com/photo-1436491865332-7a61a109cc05?w=1280&q=80',
    'https://images.unsplash.com/photo-1540979388789-6cee28a1cdc9?w=1280&q=80',
  ],
  default: [
    'https://images.unsplash.com/photo-1541339907198-e08756dedf3f?w=1280&q=80',
    'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=1280&q=80',
    'https://images.unsplash.com/photo-1498243691581-b145c3f54a5a?w=1280&q=80',
    'https://images.unsplash.com/photo-1562774053-701939374585?w=1280&q=80',
    'https://images.unsplash.com/photo-1571260899304-425eee4c7efc?w=1280&q=80',
  ],
};

function getCategoryFromName(name: string): string {
  const n = name.toLowerCase();
  if (n.includes('hotel management') || n.includes('hospitality') || n.includes('catering')) return 'hotel_management';
  if (n.includes('institute of hotel management') || n.includes('ihm')) return 'hotel_management';
  if (n.includes('medical') || n.includes('mbbs') || n.includes('aiims') || n.includes('ims ')) return 'medical';
  if (n.includes('dental') || n.includes('bds')) return 'dental';
  if (n.includes('nursing')) return 'nursing';
  if (n.includes('pharmacy') || n.includes('pharma')) return 'pharmacy';
  if (n.includes('law ') || n.includes('nlu') || n.includes('national law')) return 'law';
  if (n.includes('polytechnic')) return 'polytechnic';
  if (n.includes('agriculture') || n.includes('horticulture') || n.includes('veterinary')) return 'agriculture';
  if (n.includes('design') || n.includes('nift') || n.includes('nid ')) return 'design';
  if (n.includes('aviation') || n.includes('aeronautic')) return 'aviation';
  if (n.includes('management') || n.includes('business') || n.includes('iim') || n.includes('mba')) return 'management';
  if (n.includes('engineering') || n.includes('technology') || n.includes('institute of technology') || n.includes('iit') || n.includes('nit') || n.includes('iiit')) return 'engineering';
  if (n.includes('college') || n.includes('university')) return 'arts_science';
  return 'default';
}

function pickFromCategory(name: string, category: string): string {
  const pool = CATEGORY_FALLBACKS[category] || CATEGORY_FALLBACKS.default;
  const seed = name.split('').reduce((a, c) => a + c.charCodeAt(0), 0);
  return pool[seed % pool.length];
}

// Check if URL is reachable
function checkUrl(url: string): boolean {
  try {
    const code = execSync(
      `curl -s -o /dev/null -w "%{http_code}" --max-time 4 -H "User-Agent: Mozilla/5.0" "${url.replace(/"/g, '\\"')}"`,
      { timeout: 6000, encoding: 'utf-8' }
    ).trim();
    return code === '200';
  } catch {
    return false;
  }
}

// "Wrong" fallback detection - colleges with broken state-city mismatch
function hasWrongCityFallback(college: any): boolean {
  const img = college.campusImages?.[0] || '';
  const city = (college.city || '').toLowerCase();
  const imgLower = img.toLowerCase();

  // Bangalore fallback used for non-Bangalore colleges (the issue we're seeing)
  if (imgLower.includes('bangalore_cubbon_park') && !city.includes('bangalore') && !city.includes('bengaluru')) return true;
  if (imgLower.includes('mangalore_city_view') && !city.includes('mangalore') && !city.includes('mangaluru')) return true;
  if (imgLower.includes('kochi_skyline') && !city.includes('kochi') && !city.includes('ernakulam')) return true;
  if (imgLower.includes('pondicherry_beach') && !city.includes('puducherry') && !city.includes('pondicherry')) return true;
  if (imgLower.includes('trivandrum') && !city.includes('thiruvananthapuram') && !city.includes('trivandrum')) return true;

  return false;
}

async function main() {
  process.stdout.write('Starting broken image fix...\n');
  await mongoose.connect(MONGO_URI);
  const db = mongoose.connection.db!;

  // Step 1: Find all colleges marked needsRealImage OR with mismatched city fallback
  const all = await db.collection('colleges').find({}, {
    projection: { name: 1, city: 1, state: 1, campusImages: 1, logo: 1, needsRealImage: 1 }
  }).toArray();

  const needsFix: any[] = [];
  for (const c of all) {
    if (c.needsRealImage === true) {
      needsFix.push(c);
      continue;
    }
    // Also check for obviously wrong fallbacks even if not marked
    if (hasWrongCityFallback(c)) {
      needsFix.push(c);
    }
  }

  process.stdout.write(`Total colleges needing better images: ${needsFix.length}\n`);

  // Step 2: Replace with category-based Unsplash images (deterministic, always works)
  let fixed = 0;
  for (let i = 0; i < needsFix.length; i++) {
    const c = needsFix[i];
    if (i % 50 === 0) process.stdout.write(`Progress: ${i}/${needsFix.length}\n`);

    const category = getCategoryFromName(c.name);
    const newImg = pickFromCategory(c.name, category);

    await db.collection('colleges').updateOne(
      { _id: c._id },
      { $set: { campusImages: [newImg], logo: newImg, needsRealImage: false } }
    );
    fixed++;
  }

  process.stdout.write(`\nDone! Fixed ${fixed} colleges with category-appropriate images\n`);

  // Summary
  const remaining = await db.collection('colleges').countDocuments({ needsRealImage: true });
  process.stdout.write(`Colleges still needing images: ${remaining}\n`);

  await mongoose.disconnect();
}

main().catch(e => { console.error(e); process.exit(1); });
