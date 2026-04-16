import mongoose from 'mongoose';
import https from 'https';

const MONGO_URI = 'mongodb+srv://ajaydevmarketlube:WSCbaKW38pIGv8S2@cluster0.cd2yjhg.mongodb.net/?appName=Cluster0';

// Verified working fallbacks per category
const CATEGORY_FALLBACKS: Record<string, string[]> = {
  hotel_management: [
    'https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=1280&q=80',
    'https://images.unsplash.com/photo-1564501049412-61c2a3083791?w=1280&q=80',
  ],
  medical: [
    'https://images.unsplash.com/photo-1551190822-a9333d879b1f?w=1280&q=80',
    'https://images.unsplash.com/photo-1538108149393-fbbd81895907?w=1280&q=80',
  ],
  engineering: [
    'https://images.unsplash.com/photo-1541339907198-e08756dedf3f?w=1280&q=80',
    'https://images.unsplash.com/photo-1498243691581-b145c3f54a5a?w=1280&q=80',
    'https://images.unsplash.com/photo-1562774053-701939374585?w=1280&q=80',
  ],
  arts_science: [
    'https://images.unsplash.com/photo-1541339907198-e08756dedf3f?w=1280&q=80',
    'https://images.unsplash.com/photo-1498243691581-b145c3f54a5a?w=1280&q=80',
    'https://images.unsplash.com/photo-1571260899304-425eee4c7efc?w=1280&q=80',
  ],
  management: [
    'https://images.unsplash.com/photo-1497366216548-37526070297c?w=1280&q=80',
    'https://images.unsplash.com/photo-1556761175-5973dc0f32e7?w=1280&q=80',
  ],
  dental: ['https://images.unsplash.com/photo-1606811841689-23dfddce3e95?w=1280&q=80'],
  nursing: [
    'https://images.unsplash.com/photo-1631815587646-b85a1bb027e1?w=1280&q=80',
    'https://images.unsplash.com/photo-1584467735815-f778f274e296?w=1280&q=80',
  ],
  pharmacy: [
    'https://images.unsplash.com/photo-1587854692152-cbe660dbde88?w=1280&q=80',
    'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=1280&q=80',
  ],
  law: ['https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=1280&q=80'],
  polytechnic: ['https://images.unsplash.com/photo-1581092335397-9583eb92d232?w=1280&q=80'],
  students: [
    'https://images.unsplash.com/photo-1517486808906-6ca8b3f04846?w=1280&q=80',
    'https://images.unsplash.com/photo-1497486751825-1233686d5d80?w=1280&q=80',
  ],
  design: ['https://images.unsplash.com/photo-1558655146-9f40138edfeb?w=1280&q=80'],
};

function getCategoryFromName(name: string): string {
  const n = name.toLowerCase();
  if (n.includes('hotel management') || n.includes('hospitality') || n.includes('catering') || n.includes('ihm')) return 'hotel_management';
  if (n.includes('medical') || n.includes('aiims') || n.includes('jipmer') || n.includes('mbbs')) return 'medical';
  if (n.includes('dental') || n.includes('bds')) return 'dental';
  if (n.includes('nursing')) return 'nursing';
  if (n.includes('pharmacy') || n.includes('pharma')) return 'pharmacy';
  if (n.includes('law ') || n.includes(' law') || n.includes('nlu')) return 'law';
  if (n.includes('polytechnic')) return 'polytechnic';
  if (n.includes('design') || n.includes('nift') || n.includes('nid ')) return 'design';
  if (n.includes('management') || n.includes('business') || n.includes('iim') || n.includes('mba')) return 'management';
  if (n.includes('engineering') || n.includes('technology') || n.includes('iit') || n.includes('nit')) return 'engineering';
  if (n.includes('college') || n.includes('university') || n.includes('arts') || n.includes('science')) return 'arts_science';
  return 'students';
}

function pickFromCategory(seed: string, category: string): string {
  const pool = CATEGORY_FALLBACKS[category] || CATEGORY_FALLBACKS.students;
  const s = seed.split('').reduce((a, c) => a + c.charCodeAt(0), 0);
  return pool[s % pool.length];
}

// HEAD request via Node https (bypasses shell escaping issues)
function checkUrl(url: string, timeout = 5000): Promise<number> {
  return new Promise((resolve) => {
    try {
      const u = new URL(url);
      const req = https.request({
        method: 'HEAD',
        hostname: u.hostname,
        path: u.pathname + u.search,
        headers: { 'User-Agent': 'Mozilla/5.0' },
        timeout,
      }, (res) => {
        // Follow redirect manually
        if (res.statusCode && res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
          const loc = res.headers.location.startsWith('http') ? res.headers.location : `https://${u.hostname}${res.headers.location}`;
          checkUrl(loc, timeout).then(resolve);
        } else {
          resolve(res.statusCode || 0);
        }
      });
      req.on('error', () => resolve(0));
      req.on('timeout', () => { req.destroy(); resolve(0); });
      req.end();
    } catch {
      resolve(0);
    }
  });
}

async function main() {
  process.stdout.write('=== DEEP IMAGE AUDIT ===\n');
  await mongoose.connect(MONGO_URI);
  const db = mongoose.connection.db!;

  const all = await db.collection('colleges').find({}, {
    projection: { name: 1, campusImages: 1 }
  }).toArray();
  process.stdout.write(`Total: ${all.length} colleges\n`);

  // Check all URLs in parallel batches of 40
  const BATCH = 40;
  const broken: any[] = [];
  let checked = 0;

  for (let i = 0; i < all.length; i += BATCH) {
    const batch = all.slice(i, i + BATCH);
    const results = await Promise.all(batch.map(async (c) => {
      const url = c.campusImages?.[0];
      if (!url) return { c, status: 0 };
      const status = await checkUrl(url);
      return { c, status };
    }));

    for (const r of results) {
      checked++;
      if (r.status !== 200) broken.push(r);
    }

    if ((i + BATCH) % 400 === 0 || i + BATCH >= all.length) {
      process.stdout.write(`Progress: ${checked}/${all.length} | broken: ${broken.length}\n`);
    }
  }

  process.stdout.write(`\n=== BROKEN: ${broken.length} ===\n`);
  for (const b of broken.slice(0, 20)) {
    process.stdout.write(`  [${b.status}] ${b.c.name}: ${(b.c.campusImages?.[0] || '').substring(0, 80)}\n`);
  }

  // Fix all broken
  process.stdout.write(`\nFixing ${broken.length} broken...\n`);
  for (const b of broken) {
    const cat = getCategoryFromName(b.c.name);
    const newImg = pickFromCategory(b.c.name, cat);
    await db.collection('colleges').updateOne(
      { _id: b.c._id },
      { $set: { campusImages: [newImg], logo: newImg } }
    );
  }
  process.stdout.write(`Fixed: ${broken.length}\n`);

  await mongoose.disconnect();
}

main().catch(e => { console.error(e); process.exit(1); });
