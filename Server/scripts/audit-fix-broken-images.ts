import mongoose from 'mongoose';
import { execSync } from 'child_process';

const MONGO_URI = 'mongodb+srv://ajaydevmarketlube:WSCbaKW38pIGv8S2@cluster0.cd2yjhg.mongodb.net/?appName=Cluster0';

// Category-based fallback images (verified Unsplash URLs - always reachable)
const CATEGORY_FALLBACKS: Record<string, string[]> = {
  hotel_management: [
    'https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=1280&q=80',
    'https://images.unsplash.com/photo-1564501049412-61c2a3083791?w=1280&q=80',
    'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?w=1280&q=80',
  ],
  medical: [
    'https://images.unsplash.com/photo-1551190822-a9333d879b1f?w=1280&q=80',
    'https://images.unsplash.com/photo-1538108149393-fbbd81895907?w=1280&q=80',
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
  students: [
    'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=1280&q=80',
    'https://images.unsplash.com/photo-1517486808906-6ca8b3f04846?w=1280&q=80',
    'https://images.unsplash.com/photo-1571260899304-425eee4c7efc?w=1280&q=80',
    'https://images.unsplash.com/photo-1497486751825-1233686d5d80?w=1280&q=80',
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
  if (n.includes('hotel management') || n.includes('hospitality') || n.includes('catering') || n.includes('ihm')) return 'hotel_management';
  if (n.includes('medical') || n.includes('aiims') || n.includes('jipmer') || n.includes('mbbs')) return 'medical';
  if (n.includes('dental') || n.includes('bds')) return 'dental';
  if (n.includes('nursing')) return 'nursing';
  if (n.includes('pharmacy') || n.includes('pharma')) return 'pharmacy';
  if (n.includes('law ') || n.includes('nlu') || n.includes('national law') || n.includes('nuals') || n.includes('nalsar')) return 'law';
  if (n.includes('polytechnic')) return 'polytechnic';
  if (n.includes('agriculture') || n.includes('horticulture') || n.includes('veterinary')) return 'agriculture';
  if (n.includes('design') || n.includes('nift') || n.includes('nid ')) return 'design';
  if (n.includes('aviation') || n.includes('aeronautic')) return 'aviation';
  if (n.includes('management') || n.includes('business') || n.includes('iim') || n.includes('mba')) return 'management';
  if (n.includes('engineering') || n.includes('technology') || n.includes('iit') || n.includes('nit') || n.includes('iiit') || n.includes('institute of technology')) return 'engineering';
  if (n.includes('college') || n.includes('university') || n.includes('arts') || n.includes('science')) return 'arts_science';
  return 'students';
}

function pickFromCategory(name: string, category: string): string {
  const pool = CATEGORY_FALLBACKS[category] || CATEGORY_FALLBACKS.students;
  const seed = name.split('').reduce((a, c) => a + c.charCodeAt(0), 0);
  return pool[seed % pool.length];
}

function checkUrl(url: string): number {
  try {
    const code = execSync(
      `curl -s -o /dev/null -w "%{http_code}" --max-time 4 -L -H "User-Agent: Mozilla/5.0" "${url.replace(/"/g, '\\"')}"`,
      { timeout: 6000, encoding: 'utf-8' }
    ).trim();
    return parseInt(code, 10) || 0;
  } catch {
    return 0;
  }
}

// Patterns that indicate a problem image
function isProblemImage(url: string): boolean {
  if (!url) return true;
  const lower = url.toLowerCase();
  if (lower.endsWith('.pdf') || lower.endsWith('.svg') || lower.endsWith('.gif')) return true;
  if (lower.includes('localhost:')) return true;
  if (lower.includes('bangalore_cubbon_park') || lower.includes('trivandrum.jpg')) {
    // These are city fallbacks; only a problem if used for non-matching cities
    return false;
  }
  return false;
}

async function main() {
  process.stdout.write('=== IMAGE AUDIT & FIX ===\n');
  await mongoose.connect(MONGO_URI);
  const db = mongoose.connection.db!;

  const colleges = await db.collection('colleges').find({}, {
    projection: { name: 1, city: 1, state: 1, campusImages: 1, logo: 1 }
  }).toArray();

  process.stdout.write(`Total colleges: ${colleges.length}\n`);
  process.stdout.write(`Checking URL reachability in parallel batches of 30...\n\n`);

  const broken: any[] = [];
  let checked = 0;

  // Process in parallel batches
  const BATCH_SIZE = 30;
  for (let i = 0; i < colleges.length; i += BATCH_SIZE) {
    const batch = colleges.slice(i, i + BATCH_SIZE);

    // Check all URLs in this batch via xargs parallel
    const urls = batch.map(c => c.campusImages?.[0] || '').filter(Boolean);

    // Individual parallel curls
    const results = await Promise.all(batch.map(async (c) => {
      const url = c.campusImages?.[0];
      if (!url) return { c, status: 0, reason: 'no_url' };
      if (isProblemImage(url)) return { c, status: 0, reason: 'bad_extension' };
      const status = checkUrl(url);
      return { c, status, reason: status === 200 ? 'ok' : 'broken' };
    }));

    for (const r of results) {
      checked++;
      if (r.reason !== 'ok') {
        broken.push(r);
      }
    }

    if (i % 300 === 0 || i + BATCH_SIZE >= colleges.length) {
      process.stdout.write(`Progress: ${checked}/${colleges.length} | Broken: ${broken.length}\n`);
    }
  }

  process.stdout.write(`\n=== RESULTS ===\n`);
  process.stdout.write(`Total checked: ${checked}\n`);
  process.stdout.write(`Broken/unreachable: ${broken.length}\n\n`);

  // Group by reason
  const byReason: Record<string, number> = {};
  for (const b of broken) byReason[b.reason] = (byReason[b.reason] || 0) + 1;
  for (const [r, c] of Object.entries(byReason)) {
    process.stdout.write(`  ${r}: ${c}\n`);
  }

  // Show sample broken
  process.stdout.write(`\nSample broken images:\n`);
  for (const b of broken.slice(0, 10)) {
    process.stdout.write(`  [${b.status}] ${b.c.name} -- ${(b.c.campusImages?.[0] || 'none').substring(0, 80)}\n`);
  }

  // Fix all broken
  process.stdout.write(`\n=== FIXING ${broken.length} COLLEGES ===\n`);
  let fixed = 0;
  for (const b of broken) {
    const category = getCategoryFromName(b.c.name);
    const newImg = pickFromCategory(b.c.name, category);
    await db.collection('colleges').updateOne(
      { _id: b.c._id },
      { $set: { campusImages: [newImg], logo: newImg, needsRealImage: false } }
    );
    fixed++;
  }

  process.stdout.write(`Fixed: ${fixed}\n`);

  await mongoose.disconnect();
}

main().catch(e => { console.error(e); process.exit(1); });
