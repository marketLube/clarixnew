import mongoose from 'mongoose';
import { execSync } from 'child_process';

const MONGO_URI = 'mongodb+srv://ajaydevmarketlube:WSCbaKW38pIGv8S2@cluster0.cd2yjhg.mongodb.net/?appName=Cluster0';

function curlJson(url: string): any {
  try {
    const result = execSync(
      `curl -s --max-time 6 "${url.replace(/"/g, '\\"')}" -H "User-Agent: ClarixEducation/1.0 (https://clarixeducation.com)"`,
      { timeout: 8000, encoding: 'utf-8', maxBuffer: 5_000_000 }
    );
    return JSON.parse(result);
  } catch { return null; }
}

function isBadImage(url: string): boolean {
  if (!url) return true;
  const l = url.toLowerCase();
  if (l.endsWith('.svg') || l.endsWith('.pdf') || l.endsWith('.gif')) return true;
  const bad = ['coat_of_arms','seal_of','logo_of','wordmark','flag_of','map_of','portrait','bust_of','statue','emblem','sigillum'];
  return bad.some(b => l.includes(b));
}

async function getImageFromWikipedia(wikipediaUrl: string): Promise<string | null> {
  const title = wikipediaUrl.split('/wiki/')[1];
  if (!title) return null;
  const url = `https://en.wikipedia.org/w/api.php?action=query&titles=${title}&prop=pageimages&format=json&pithumbsize=1280`;
  const data = curlJson(url);
  const pages = data?.query?.pages;
  if (!pages) return null;
  const p = Object.values(pages)[0] as any;
  const src = p?.thumbnail?.source;
  return (src && !isBadImage(src)) ? src : null;
}

async function searchWikipediaImage(name: string): Promise<string | null> {
  const url = `https://en.wikipedia.org/w/api.php?action=query&list=search&srsearch=${encodeURIComponent(name)}&format=json&srlimit=2`;
  const data = curlJson(url);
  for (const r of (data?.query?.search || [])) {
    const pUrl = `https://en.wikipedia.org/w/api.php?action=query&titles=${encodeURIComponent(r.title)}&prop=pageimages&format=json&pithumbsize=1280`;
    const pData = curlJson(pUrl);
    const pages = pData?.query?.pages;
    if (!pages) continue;
    const p = Object.values(pages)[0] as any;
    const src = p?.thumbnail?.source;
    if (src && !isBadImage(src)) return src;
  }
  return null;
}

async function main() {
  process.stdout.write('Starting image enrichment...\n');
  await mongoose.connect(MONGO_URI);
  const db = mongoose.connection.db!;

  const colleges = await db.collection('colleges')
    .find({ needsRealImage: true }, { projection: { name: 1, city: 1, wikipediaUrl: 1 } })
    .toArray();

  process.stdout.write(`Total needing images: ${colleges.length}\n`);
  let fixed = 0;

  for (let i = 0; i < colleges.length; i++) {
    const c = colleges[i];
    if (i % 25 === 0) process.stdout.write(`Progress: ${i}/${colleges.length} | Fixed: ${fixed}\n`);

    let img: string | null = null;

    // Try Wikipedia URL first
    if (c.wikipediaUrl) {
      img = await getImageFromWikipedia(c.wikipediaUrl);
    }

    // Fallback: search by name
    if (!img) {
      img = await searchWikipediaImage(c.name);
    }

    if (img) {
      await db.collection('colleges').updateOne(
        { _id: c._id },
        { $set: { campusImages: [img], logo: img, needsRealImage: false } }
      );
      fixed++;
    }
  }

  process.stdout.write(`\nDone! Fixed ${fixed} / ${colleges.length}\n`);
  await mongoose.disconnect();
}

main().catch(e => { console.error(e); process.exit(1); });
