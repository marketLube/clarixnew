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

// Find topic-relevant images by searching Wikipedia
async function findImages(searchTerm: string, count: number): Promise<string[]> {
  const url = `https://en.wikipedia.org/w/api.php?action=query&list=search&srsearch=${encodeURIComponent(searchTerm)}&format=json&srlimit=${count + 5}`;
  const data = curlJson(url);
  const images: string[] = [];

  for (const r of (data?.query?.search || [])) {
    if (images.length >= count) break;
    const imgUrl = `https://en.wikipedia.org/w/api.php?action=query&titles=${encodeURIComponent(r.title)}&prop=pageimages&format=json&pithumbsize=1280`;
    const imgData = curlJson(imgUrl);
    const pages = imgData?.query?.pages;
    if (!pages) continue;
    const p = Object.values(pages)[0] as any;
    const u = p?.thumbnail?.source;
    if (!u) continue;
    const lower = u.toLowerCase();
    if (lower.endsWith('.svg') || lower.endsWith('.pdf')) continue;
    if (lower.includes('coat_of_arms') || lower.includes('seal_of') || lower.includes('logo_of')) continue;
    if (lower.includes('flag_of') || lower.includes('map_of')) continue;
    if (lower.includes('portrait') || lower.includes('bust_of') || lower.includes('statue')) continue;
    images.push(u);
  }

  return images;
}

// Activity title → topic search query
function getSearchTermForActivity(title: string): string {
  const t = title.toLowerCase();
  if (t.includes('sport') || t.includes('athletic')) return 'university sports tournament';
  if (t.includes('club') || t.includes('societ')) return 'university student club';
  if (t.includes('technical fest') || t.includes('tech fest')) return 'tech fest hackathon';
  if (t.includes('cultural') || t.includes('fest')) return 'college cultural festival';
  if (t.includes('clinical training')) return 'medical students training hospital';
  if (t.includes('research')) return 'university research laboratory';
  if (t.includes('debate') || t.includes('mun')) return 'model united nations debate';
  if (t.includes('music') || t.includes('band')) return 'university music band';
  if (t.includes('drama') || t.includes('theatre')) return 'college theatre performance';
  if (t.includes('hostel') || t.includes('accommodation')) return 'university dormitory hostel';
  if (t.includes('library')) return 'university library reading';
  if (t.includes('placement')) return 'campus placement interview';
  if (t.includes('innovation') || t.includes('startup') || t.includes('entrepreneur')) return 'startup incubator innovation';
  if (t.includes('community') || t.includes('social')) return 'university community service volunteers';
  if (t.includes('lab')) return 'university laboratory research';
  // Default for "Student Life", "Student Activities", etc.
  return 'university campus students';
}

// Pre-curated pool of images for each activity type (verified working URLs)
const ACTIVITY_IMAGE_POOLS: Record<string, string[]> = {};

async function buildImagePools() {
  const types = [
    'sports', 'clubs', 'technical_fest', 'cultural', 'clinical', 'research',
    'debate', 'music', 'drama', 'hostel', 'library', 'placement',
    'innovation', 'community', 'lab', 'general'
  ];

  const queries: Record<string, string> = {
    sports: 'university sports tournament championship',
    clubs: 'student club society meeting',
    technical_fest: 'hackathon coding competition',
    cultural: 'college cultural festival dance music',
    clinical: 'medical students hospital training',
    research: 'university research laboratory science',
    debate: 'model united nations debate competition',
    music: 'university music band performance',
    drama: 'college theatre drama performance',
    hostel: 'university dormitory student room',
    library: 'university library students reading',
    placement: 'campus placement job fair interview',
    innovation: 'startup incubator innovation lab',
    community: 'community service volunteers students',
    lab: 'science laboratory experiment',
    general: 'university students campus life',
  };

  for (const type of types) {
    console.log(`Fetching pool for: ${type}...`);
    const images = await findImages(queries[type], 15);
    ACTIVITY_IMAGE_POOLS[type] = images;
    console.log(`  Got ${images.length} images`);
  }
}

function getActivityType(title: string): string {
  const t = title.toLowerCase();
  if (t.includes('sport') || t.includes('athletic')) return 'sports';
  if (t.includes('club') || t.includes('societ')) return 'clubs';
  if (t.includes('technical fest') || t.includes('tech fest') || t.includes('hackathon')) return 'technical_fest';
  if (t.includes('cultural') || t.includes('fest')) return 'cultural';
  if (t.includes('clinical')) return 'clinical';
  if (t.includes('research')) return 'research';
  if (t.includes('debate') || t.includes('mun')) return 'debate';
  if (t.includes('music')) return 'music';
  if (t.includes('drama') || t.includes('theatre')) return 'drama';
  if (t.includes('hostel') || t.includes('accommodation')) return 'hostel';
  if (t.includes('library')) return 'library';
  if (t.includes('placement')) return 'placement';
  if (t.includes('innovation') || t.includes('startup') || t.includes('entrepreneur')) return 'innovation';
  if (t.includes('community') || t.includes('social')) return 'community';
  if (t.includes('lab')) return 'lab';
  return 'general';
}

async function main() {
  await mongoose.connect(MONGO_URI);
  const db = mongoose.connection.db!;

  console.log('=== STEP 1: Build pools of activity-relevant images ===');
  await buildImagePools();

  // Print pool counts
  for (const [type, imgs] of Object.entries(ACTIVITY_IMAGE_POOLS)) {
    console.log(`  ${type}: ${imgs.length} images available`);
  }

  console.log('\n=== STEP 2: Replace duplicate/wrong activity images ===');
  const colleges = await db.collection('colleges').find({}, { projection: { name: 1, campusLife: 1, campusImages: 1 } }).toArray();

  let totalActivities = 0, fixed = 0, kept = 0;

  for (let i = 0; i < colleges.length; i++) {
    const college = colleges[i];
    if (i % 100 === 0) console.log(`Progress: ${i}/${colleges.length} | Fixed: ${fixed}`);

    if (!college.campusLife || college.campusLife.length === 0) continue;

    let hasChanges = false;
    const updatedActivities = college.campusLife.map((activity: any) => {
      totalActivities++;

      const type = getActivityType(activity.title);
      const pool = ACTIVITY_IMAGE_POOLS[type] || ACTIVITY_IMAGE_POOLS['general'];

      if (pool.length === 0) { kept++; return activity; }

      // Pick a random image from the pool, deterministic by college name + activity title
      const seed = (college.name + activity.title).split('').reduce((s, c) => s + c.charCodeAt(0), 0);
      const idx = seed % pool.length;
      const newImage = pool[idx];

      if (newImage !== activity.image) {
        fixed++;
        hasChanges = true;
        return { ...activity, image: newImage };
      }
      kept++;
      return activity;
    });

    if (hasChanges) {
      await db.collection('colleges').updateOne(
        { _id: college._id },
        { $set: { campusLife: updatedActivities } }
      );
    }
  }

  console.log(`\nTotal activities: ${totalActivities}`);
  console.log(`Fixed: ${fixed}`);
  console.log(`Unchanged: ${kept}`);

  // Verify
  console.log('\n=== STEP 3: Verify duplicate count ===');
  const updated = await db.collection('colleges').find({}, { projection: { campusLife: 1 } }).toArray();
  const imgMap = new Map();
  for (const c of updated) {
    if (!c.campusLife) continue;
    for (const a of c.campusLife) {
      if (!a.image) continue;
      imgMap.set(a.image, (imgMap.get(a.image) || 0) + 1);
    }
  }
  const dupes = [...imgMap.entries()].filter(([u, n]) => n > 1).sort((a, b) => b[1] - a[1]);
  console.log(`Unique image URLs: ${imgMap.size}`);
  console.log(`Duplicate URLs: ${dupes.length}`);
  console.log(`Top 5 most reused:`);
  for (const [url, n] of dupes.slice(0, 5)) {
    console.log(`  ${n} uses: ${url.substring(0, 80)}`);
  }

  await mongoose.disconnect();
}

main().catch(console.error);
