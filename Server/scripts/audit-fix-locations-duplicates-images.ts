import mongoose from 'mongoose';

const MONGO_URI = 'mongodb+srv://ajaydevmarketlube:WSCbaKW38pIGv8S2@cluster0.cd2yjhg.mongodb.net/?appName=Cluster0';

// Category-based fallback images for when Wikipedia images are wrong
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
  students: [
    'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=1280&q=80',
    'https://images.unsplash.com/photo-1517486808906-6ca8b3f04846?w=1280&q=80',
    'https://images.unsplash.com/photo-1571260899304-425eee4c7efc?w=1280&q=80',
    'https://images.unsplash.com/photo-1497486751825-1233686d5d80?w=1280&q=80',
  ],
};

function getCategoryFromName(name: string): string {
  const n = name.toLowerCase();
  if (n.includes('hotel management') || n.includes('hospitality') || n.includes('catering') || n.includes('ihm')) return 'hotel_management';
  if (n.includes('medical') || n.includes('aiims') || n.includes('jipmer') || n.includes('mbbs')) return 'medical';
  if (n.includes('dental') || n.includes('bds')) return 'dental';
  if (n.includes('nursing')) return 'nursing';
  if (n.includes('pharmacy') || n.includes('pharma')) return 'pharmacy';
  if (n.includes('law ') || n.includes(' law') || n.includes('nlu') || n.includes('national law')) return 'law';
  if (n.includes('polytechnic')) return 'polytechnic';
  if (n.includes('management') || n.includes('business') || n.includes('iim') || n.includes('mba')) return 'management';
  if (n.includes('engineering') || n.includes('technology') || n.includes('iit') || n.includes('nit')) return 'engineering';
  if (n.includes('college') || n.includes('university') || n.includes('arts') || n.includes('science')) return 'arts_science';
  return 'students';
}

function pickFromCategory(seedName: string, category: string): string {
  const pool = CATEGORY_FALLBACKS[category] || CATEGORY_FALLBACKS.students;
  const seed = seedName.split('').reduce((a, c) => a + c.charCodeAt(0), 0);
  return pool[seed % pool.length];
}

// Check if wikipedia image filename contains any keyword from college name
function imageMatchesCollege(imgUrl: string, collegeName: string): boolean {
  if (!imgUrl.includes('wikimedia') && !imgUrl.includes('wikipedia')) return true; // skip non-wiki
  const imgLower = imgUrl.toLowerCase();
  const stopWords = new Set(['the', 'of', 'and', 'for', 'in', 'at', 'a', 'an', 'college', 'university', 'institute', 'institution', 'school', 'campus']);
  const keywords = collegeName.toLowerCase()
    .replace(/[(),.\-&']/g, ' ')
    .split(/\s+/)
    .filter(w => w.length >= 3 && !stopWords.has(w));

  // If any keyword >=4 chars exists in URL, consider match
  return keywords.some(k => k.length >= 4 && imgLower.includes(k));
}

// Known bad image patterns (landmarks, not colleges)
const BAD_IMAGE_PATTERNS = [
  /anchal_post/i,
  /nasrani_cross/i,
  /muvattupuzha_old/i,
  /ins_viraat/i,
  /banner_of_kerala/i,
  /javadi_hills/i,
  /chennai_central/i,
  /sri_ram_mandir/i,
  /barabati_stadium/i,
  /alcob_ashok/i,
  /city_view_of/i,
  /kalinzer/i,
  /tidel_park/i,
  /gsrtc_bus/i,
  /ghantaghar/i,
  /tosham_hill/i,
  /ambala_cantonment/i,
  /sunder_nagar/i,
  /ravangla_town/i,
  /warangalmontage/i,
  /bangalore_cubbon/i,
];

async function main() {
  process.stdout.write('=== AUDIT & FIX: Locations, Duplicates, Images ===\n');
  await mongoose.connect(MONGO_URI);
  const db = mongoose.connection.db!;

  // === PART 1: Fix wrong Kerala locations ===
  process.stdout.write('\n--- PART 1: Fix Kerala colleges mislabeled as Karnataka ---\n');

  // Exact fixes with correct city/district
  const locationFixes: Array<{ matcher: RegExp; city: string; state: string; district?: string }> = [
    { matcher: /^Jain Future Kochi$/i, city: 'Kochi', state: 'Kerala', district: 'Ernakulam' },
    { matcher: /^Jain School of Future Kochi$/i, city: 'Kochi', state: 'Kerala', district: 'Ernakulam' },
    { matcher: /^Ilahia College of Engineering and Technology$/i, city: 'Muvattupuzha', state: 'Kerala', district: 'Ernakulam' },
    { matcher: /^Ilahia College of Engineering Ernakulam$/i, city: 'Muvattupuzha', state: 'Kerala', district: 'Ernakulam' },
    { matcher: /^Yeldo Mar Baselios College Ernakulam$/i, city: 'Kothamangalam', state: 'Kerala', district: 'Ernakulam' },
    { matcher: /^KMM College of Arts and Science Ernakulam$/i, city: 'Ernakulam', state: 'Kerala', district: 'Ernakulam' },
    { matcher: /^Al-Azhar College of Arts and Science Idukki$/i, city: 'Thodupuzha', state: 'Kerala', district: 'Idukki' },
    { matcher: /^Kristu Jyoti College Changanassery$/i, city: 'Changanassery', state: 'Kerala', district: 'Kottayam' },
    { matcher: /^Kristu Jyoti College of Management and Technology$/i, city: 'Changanassery', state: 'Kerala', district: 'Kottayam' },
    { matcher: /^Prayaga College Palakkad$/i, city: 'Palakkad', state: 'Kerala', district: 'Palakkad' },
  ];

  let locFixed = 0;
  for (const fix of locationFixes) {
    const res = await db.collection('colleges').updateMany(
      { name: fix.matcher },
      { $set: { city: fix.city, state: fix.state, district: fix.district } }
    );
    if (res.modifiedCount > 0) {
      locFixed += res.modifiedCount;
      process.stdout.write(`  ✓ ${fix.matcher.source} → ${fix.city}, ${fix.state}\n`);
    }
  }
  process.stdout.write(`Fixed locations: ${locFixed}\n`);

  // === PART 2: Delete obviously bad entries ===
  process.stdout.write('\n--- PART 2: Delete bogus entries ---\n');
  const bogusRes = await db.collection('colleges').deleteMany({
    $or: [
      { name: /^Distance Degree in Kerala$/i },
      { name: /^Jain Future Kochi$/i }, // keep only "Jain School of Future Kochi"
    ]
  });
  process.stdout.write(`Deleted bogus: ${bogusRes.deletedCount}\n`);

  // === PART 3: Merge duplicate colleges ===
  process.stdout.write('\n--- PART 3: Merge duplicate colleges ---\n');

  const normalize = (n: string): string => {
    return n.toLowerCase()
      .replace(/\bcollege\b/g, '')
      .replace(/\buniversity\b/g, '')
      .replace(/\binstitute\b/g, '')
      .replace(/\bof engineering and technology\b/g, ' engineering')
      .replace(/\bof engineering\b/g, ' engineering')
      .replace(/\bof arts and science\b/g, ' arts science')
      .replace(/\bof technology\b/g, ' tech')
      .replace(/\bcampus\b/g, '')
      .replace(/\bmain\b/g, '')
      .replace(/[(),-]/g, ' ')
      .replace(/\s+/g, ' ')
      .trim();
  };

  const all = await db.collection('colleges').find({}).toArray();
  const groups: Record<string, any[]> = {};
  for (const c of all) {
    const k = `${normalize(c.name)}__${(c.city || '').toLowerCase()}__${(c.state || '').toLowerCase()}`;
    if (!groups[k]) groups[k] = [];
    groups[k].push(c);
  }

  let merged = 0;
  for (const [k, entries] of Object.entries(groups)) {
    if (entries.length <= 1) continue;

    // Sort: keep entry with most courseOfferings, fallback to most fields
    entries.sort((a, b) => {
      const aLen = (a.courseOfferings?.length || 0);
      const bLen = (b.courseOfferings?.length || 0);
      if (aLen !== bLen) return bLen - aLen;
      return JSON.stringify(b).length - JSON.stringify(a).length;
    });

    const keeper = entries[0];
    const toDelete = entries.slice(1);

    for (const dup of toDelete) {
      await db.collection('colleges').deleteOne({ _id: dup._id });
      merged++;
      process.stdout.write(`  Merged "${dup.name}" → kept "${keeper.name}"\n`);
    }
  }
  process.stdout.write(`Duplicates merged: ${merged}\n`);

  // === PART 4: Fix wrong/landmark images ===
  process.stdout.write('\n--- PART 4: Fix wrong landmark images ---\n');

  const colleges = await db.collection('colleges').find({
    country: 'India'
  }, { projection: { name: 1, campusImages: 1, logo: 1 } }).toArray();

  let imgFixed = 0;
  for (const c of colleges) {
    const img = c.campusImages?.[0];
    if (!img) continue;

    let isBad = false;
    // Check explicit bad patterns
    if (BAD_IMAGE_PATTERNS.some(p => p.test(img))) isBad = true;
    // Check if wikipedia image doesn't match college name
    else if ((img.includes('wikimedia') || img.includes('wikipedia')) && !imageMatchesCollege(img, c.name)) {
      isBad = true;
    }

    if (isBad) {
      const category = getCategoryFromName(c.name);
      const newImg = pickFromCategory(c.name, category);
      await db.collection('colleges').updateOne(
        { _id: c._id },
        { $set: { campusImages: [newImg], logo: newImg } }
      );
      imgFixed++;
      if (imgFixed <= 15) {
        process.stdout.write(`  ✓ ${c.name}: ${img.substring(0, 80)}...\n`);
        process.stdout.write(`    → ${newImg.substring(0, 80)}...\n`);
      }
    }
  }
  process.stdout.write(`Fixed images: ${imgFixed}\n`);

  // === Final counts ===
  const finalCount = await db.collection('colleges').countDocuments({});
  process.stdout.write(`\n=== FINAL: ${finalCount} colleges ===\n`);

  await mongoose.disconnect();
}

main().catch(e => { console.error(e); process.exit(1); });
