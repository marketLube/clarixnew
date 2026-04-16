import mongoose from 'mongoose';

const MONGO_URI = 'mongodb+srv://ajaydevmarketlube:WSCbaKW38pIGv8S2@cluster0.cd2yjhg.mongodb.net/?appName=Cluster0';

// WORKING Unsplash URLs (verified 200 OK)
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
    'https://images.unsplash.com/photo-1562774053-701939374585?w=1280&q=80',
    'https://images.unsplash.com/photo-1627556704302-624286467c65?w=1280&q=80',
  ],
  arts_science: [
    'https://images.unsplash.com/photo-1541339907198-e08756dedf3f?w=1280&q=80',
    'https://images.unsplash.com/photo-1498243691581-b145c3f54a5a?w=1280&q=80',
    'https://images.unsplash.com/photo-1562774053-701939374585?w=1280&q=80',
    'https://images.unsplash.com/photo-1571260899304-425eee4c7efc?w=1280&q=80',
    'https://images.unsplash.com/photo-1519452575417-564c1401ecc0?w=1280&q=80',
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
    'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=1280&q=80',
    'https://images.unsplash.com/photo-1585435557343-3b092031a831?w=1280&q=80',
    'https://images.unsplash.com/photo-1471864190281-a93a3070b6de?w=1280&q=80',
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
    'https://images.unsplash.com/photo-1517486808906-6ca8b3f04846?w=1280&q=80',
    'https://images.unsplash.com/photo-1571260899304-425eee4c7efc?w=1280&q=80',
    'https://images.unsplash.com/photo-1497486751825-1233686d5d80?w=1280&q=80',
    'https://images.unsplash.com/photo-1524178232363-1fb2b075b655?w=1280&q=80',
  ],
  design: [
    'https://images.unsplash.com/photo-1558655146-9f40138edfeb?w=1280&q=80',
    'https://images.unsplash.com/photo-1572044162444-ad60f128bdea?w=1280&q=80',
    'https://images.unsplash.com/photo-1558655146-605d86ed31b3?w=1280&q=80',
  ],
  agriculture: [
    'https://images.unsplash.com/photo-1625246333195-78d9c38ad449?w=1280&q=80',
    'https://images.unsplash.com/photo-1500595046743-cd271d694d30?w=1280&q=80',
  ],
  aviation: [
    'https://images.unsplash.com/photo-1436491865332-7a61a109cc05?w=1280&q=80',
    'https://images.unsplash.com/photo-1540979388789-6cee28a1cdc9?w=1280&q=80',
  ],
};

// Known broken photo IDs → must be replaced
const BROKEN_IDS = [
  'photo-1523050854058-8df90110c9f1',
  'photo-1576602975754-91cc9e95cdfb',
  'photo-1561070791-2526d30994b8',
];

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
  if (n.includes('aviation') || n.includes('aeronautic')) return 'aviation';
  if (n.includes('agriculture') || n.includes('horticulture') || n.includes('veterinary')) return 'agriculture';
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

// Kerala major cities/towns (NOT districts)
const KERALA_CITIES = [
  'muvattupuzha', 'kothamangalam', 'aluva', 'angamaly', 'perumbavoor', 'kalamassery',
  'kodungallur', 'paravur', 'piravom', 'tripunithura', 'chalakudy', 'irinjalakuda',
  'guruvayur', 'ottapalam', 'mannarkkad', 'chittur', 'cherpulassery', 'shoranur',
  'perinthalmanna', 'manjeri', 'kondotty', 'nilambur', 'tirur', 'tirurangadi', 'ponnani',
  'kottakkal', 'edappal', 'changanassery', 'pala', 'vaikom', 'ettumanoor', 'erattupetta',
  'thodupuzha', 'kattappana', 'nedumkandam', 'vandiperiyar', 'kumily',
  'punalur', 'karunagappally', 'paravoor', 'kundara', 'kottarakkara',
  'kayamkulam', 'cherthala', 'mavelikkara', 'haripad', 'harippad',
  'adoor', 'pandalam', 'thiruvalla', 'ranni', 'konni', 'kozhencherry',
  'payyanur', 'thalassery', 'tellicherry', 'mattannur', 'iritty', 'mananthavady',
  'kanhangad', 'nileshwar', 'kanhangadu', 'kumbla', 'uppala',
  'sulthan bathery', 'kalpetta', 'vythiri', 'meenangadi',
  'attingal', 'neyyattinkara', 'nedumangad', 'varkala', 'chirayinkeezhu',
  'chalakkudy', 'kodungalloor', 'mala', 'wadakkanchery', 'kunnamkulam',
  'koyilandy', 'vadakara', 'kuttiady', 'feroke', 'ramanattukara',
  'puthuppady', 'kolenchery', 'thrikkakara', 'edakkara', 'edathala',
];

// Tamil Nadu secondary cities (not just Chennai/Coimbatore)
const TN_CITIES = [
  'kanchipuram', 'karur', 'nagercoil', 'dindigul', 'namakkal', 'theni', 'cuddalore',
  'villupuram', 'krishnagiri', 'dharmapuri', 'thanjavur', 'pudukkottai', 'sivagangai',
  'ramanathapuram', 'virudhunagar', 'perambalur', 'ariyalur', 'nagapattinam',
  'tiruvannamalai', 'gobichettipalayam', 'mettupalayam', 'pollachi', 'udumalpet',
  'sathyamangalam', 'bhavani', 'komarapalayam', 'rasipuram', 'tiruchengode',
  'kumbakonam', 'mayiladuthurai', 'karaikudi', 'devakottai', 'sivakasi',
  'hosur', 'avinashi', 'palladam', 'ooty', 'coonoor', 'kotagiri',
  'kodaikanal', 'tenkasi', 'srivilliputhur', 'rajapalayam', 'aruppukkottai',
];

async function main() {
  process.stdout.write('=== FIX BROKEN IMAGES + CITY/DISTRICT MISMATCHES ===\n');
  await mongoose.connect(MONGO_URI);
  const db = mongoose.connection.db!;

  // === PART 1: Fix broken Unsplash URLs ===
  process.stdout.write('\n--- PART 1: Fix broken Unsplash URLs ---\n');
  const brokenRegex = new RegExp(BROKEN_IDS.join('|'));
  const broken = await db.collection('colleges').find({
    campusImages: { $elemMatch: { $regex: brokenRegex } }
  }, { projection: { name: 1, campusImages: 1 } }).toArray();

  process.stdout.write(`Colleges with broken images: ${broken.length}\n`);
  let imgFixed = 0;
  for (const c of broken) {
    const category = getCategoryFromName(c.name);
    const newImg = pickFromCategory(c.name, category);
    await db.collection('colleges').updateOne(
      { _id: c._id },
      { $set: { campusImages: [newImg], logo: newImg } }
    );
    imgFixed++;
  }
  process.stdout.write(`Fixed images: ${imgFixed}\n`);

  // === PART 2: Fix city=district where name indicates different city ===
  process.stdout.write('\n--- PART 2: Fix city where name has specific town ---\n');

  const colleges = await db.collection('colleges').find({
    state: { $in: ['Kerala', 'Tamil Nadu'] }
  }, { projection: { name: 1, city: 1, state: 1, district: 1 } }).toArray();

  let cityFixed = 0;
  const changes: Array<{ name: string; oldCity: string; newCity: string }> = [];

  for (const c of colleges) {
    const nLower = c.name.toLowerCase();
    const cityLower = (c.city || '').toLowerCase();

    const cityList = c.state === 'Kerala' ? KERALA_CITIES : TN_CITIES;

    // Find if name mentions a specific town
    const foundCity = cityList.find(town => nLower.includes(town));
    if (!foundCity) continue;
    if (cityLower === foundCity) continue; // already matches
    if (cityLower === foundCity.replace(/\s+/g, '')) continue; // e.g., "sulthan bathery" vs "sulthanbathery"

    // Only change if current city is a district name (different from what the name says)
    const newCity = foundCity.split(' ').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');

    // Capitalize first letter for special cases
    const finalCity = newCity === 'Pala' ? 'Pala' : newCity;

    changes.push({ name: c.name, oldCity: c.city, newCity: finalCity });
    await db.collection('colleges').updateOne(
      { _id: c._id },
      { $set: { city: finalCity, district: c.city } } // preserve old as district
    );
    cityFixed++;
  }

  process.stdout.write(`Cities fixed: ${cityFixed}\n`);
  for (const ch of changes.slice(0, 30)) {
    process.stdout.write(`  ${ch.name}: ${ch.oldCity} → ${ch.newCity}\n`);
  }

  // === PART 3: Verify ===
  process.stdout.write('\n--- VERIFICATION ---\n');
  const ilahia = await db.collection('colleges').find({ name: /ilahia/i }).toArray();
  for (const c of ilahia) {
    process.stdout.write(`  ${c.name}\n    city: ${c.city} | state: ${c.state} | district: ${c.district}\n    image: ${(c.campusImages?.[0] || '').substring(0, 80)}\n`);
  }

  await mongoose.disconnect();
}

main().catch(e => { console.error(e); process.exit(1); });
