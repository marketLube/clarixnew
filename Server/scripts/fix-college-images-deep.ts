import mongoose from 'mongoose';
import https from 'https';
import http from 'http';

const MONGO_URI = 'mongodb+srv://ajaydevmarketlube:WSCbaKW38pIGv8S2@cluster0.cd2yjhg.mongodb.net/?appName=Cluster0';

function fetchHtml(url: string, timeout = 8000): Promise<string> {
  return new Promise((resolve) => {
    const mod = url.startsWith('https') ? https : http;
    const req = mod.get(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
        'Accept': 'text/html,application/xhtml+xml,application/json',
      },
      timeout,
    }, (res) => {
      // Follow redirects
      if (res.statusCode === 301 || res.statusCode === 302) {
        const loc = res.headers.location;
        if (loc) return fetchHtml(loc, timeout).then(resolve);
      }
      let data = '';
      res.on('data', (chunk: Buffer) => data += chunk.toString());
      res.on('end', () => resolve(data));
    });
    req.on('error', () => resolve(''));
    req.on('timeout', () => { req.destroy(); resolve(''); });
  });
}

function fetchJson(url: string): Promise<any> {
  return new Promise((resolve) => {
    https.get(url, {
      headers: { 'User-Agent': 'ClarixBot/1.0 (education platform)' },
      timeout: 8000,
    }, (res) => {
      let data = '';
      res.on('data', (chunk: Buffer) => data += chunk.toString());
      res.on('end', () => { try { resolve(JSON.parse(data)); } catch { resolve(null); } });
    }).on('error', () => resolve(null));
  });
}

// Strategy 1: Wikipedia with multiple name variations
async function tryWikipedia(name: string, city: string): Promise<string | null> {
  const variations = [
    name,
    name.replace(/\s*\(.*?\)\s*/g, '').trim(),
    name.replace(/,\s*\w+$/, '').trim(),
    name + ' ' + city,
  ];

  for (const v of variations) {
    const url = `https://en.wikipedia.org/w/api.php?action=query&list=search&srsearch=${encodeURIComponent(v)}&format=json&srlimit=3`;
    const data = await fetchJson(url);
    for (const r of (data?.query?.search || [])) {
      const imgUrl = `https://en.wikipedia.org/w/api.php?action=query&titles=${encodeURIComponent(r.title)}&prop=pageimages&format=json&pithumbsize=800`;
      const imgData = await fetchJson(imgUrl);
      const pages = imgData?.query?.pages;
      if (pages) {
        const p = Object.values(pages)[0] as any;
        if (p.thumbnail?.source && !isBadImage(p.thumbnail.source)) {
          return p.thumbnail.source;
        }
      }
    }
  }
  return null;
}

// Strategy 2: Wikimedia Commons with broader search
async function tryWikimediaCommons(name: string): Promise<string | null> {
  const queries = [
    name + ' campus',
    name + ' building',
    name + ' college',
    name.replace(/\s*\(.*?\)\s*/g, '').trim(),
  ];

  for (const q of queries) {
    const url = `https://commons.wikimedia.org/w/api.php?action=query&list=search&srsearch=${encodeURIComponent(q)}&srnamespace=6&format=json&srlimit=5`;
    const data = await fetchJson(url);
    for (const r of (data?.query?.search || [])) {
      const title = r.title;
      if (title.toLowerCase().includes('.svg') || title.toLowerCase().includes('logo')) continue;
      const infoUrl = `https://commons.wikimedia.org/w/api.php?action=query&titles=${encodeURIComponent(title)}&prop=imageinfo&iiprop=url|size&format=json`;
      const info = await fetchJson(infoUrl);
      const pages = info?.query?.pages;
      if (pages) {
        const p = Object.values(pages)[0] as any;
        const ii = p.imageinfo?.[0];
        if (ii?.url && ii.width > 300 && !ii.url.includes('.svg') && !isBadImage(ii.url)) {
          return ii.url;
        }
      }
    }
  }
  return null;
}

// Strategy 3: Try to find official website and extract OG image
async function tryOfficialWebsite(name: string, city: string): Promise<string | null> {
  // Search for official website using Wikipedia's external links
  const searchName = name.replace(/\s*\(.*?\)\s*/g, '').trim();
  const wikiUrl = `https://en.wikipedia.org/w/api.php?action=query&list=search&srsearch=${encodeURIComponent(searchName)}&format=json&srlimit=1`;
  const wikiData = await fetchJson(wikiUrl);
  const title = wikiData?.query?.search?.[0]?.title;

  if (title) {
    // Get external links from Wikipedia page
    const extUrl = `https://en.wikipedia.org/w/api.php?action=query&titles=${encodeURIComponent(title)}&prop=extlinks&format=json&ellimit=20`;
    const extData = await fetchJson(extUrl);
    const pages = extData?.query?.pages;
    if (pages) {
      const p = Object.values(pages)[0] as any;
      const links = p.extlinks || [];

      for (const link of links) {
        const url = link['*'] || link.url || '';
        if (!url) continue;
        // Look for official .edu, .ac.in, .edu.in domains
        if (url.match(/\.(edu|ac\.in|edu\.in|org\.in)/)) {
          try {
            const html = await fetchHtml(url);
            // Extract og:image
            const ogMatch = html.match(/property="og:image"\s+content="([^"]+)"/i) ||
                           html.match(/content="([^"]+)"\s+property="og:image"/i) ||
                           html.match(/name="twitter:image"\s+content="([^"]+)"/i);
            if (ogMatch?.[1] && !isBadImage(ogMatch[1])) {
              const imgUrl = ogMatch[1].startsWith('http') ? ogMatch[1] : `${new URL(url).origin}${ogMatch[1]}`;
              return imgUrl;
            }
          } catch {}
        }
      }
    }
  }
  return null;
}

// Strategy 4: DuckDuckGo instant answer (get image from search)
async function tryDuckDuckGo(name: string): Promise<string | null> {
  const url = `https://api.duckduckgo.com/?q=${encodeURIComponent(name + ' college India')}&format=json&no_html=1`;
  const data = await fetchJson(url);
  if (data?.Image && !isBadImage(data.Image)) {
    return data.Image;
  }
  // Check related topics
  for (const topic of (data?.RelatedTopics || []).slice(0, 3)) {
    if (topic?.Icon?.URL && !isBadImage(topic.Icon.URL)) {
      return topic.Icon.URL;
    }
  }
  return null;
}

// Strategy 5: Wikidata image lookup
async function tryWikidata(name: string): Promise<string | null> {
  const searchUrl = `https://www.wikidata.org/w/api.php?action=wbsearchentities&search=${encodeURIComponent(name)}&language=en&format=json&limit=3`;
  const data = await fetchJson(searchUrl);

  for (const entity of (data?.search || [])) {
    const entityUrl = `https://www.wikidata.org/w/api.php?action=wbgetclaims&entity=${entity.id}&property=P18&format=json`;
    const claims = await fetchJson(entityUrl);
    const imageClaim = claims?.claims?.P18?.[0];
    if (imageClaim) {
      const filename = imageClaim.mainsnak?.datavalue?.value;
      if (filename) {
        // Convert filename to Commons URL
        const encoded = encodeURIComponent(filename.replace(/ /g, '_'));
        const md5 = require('crypto').createHash('md5').update(filename.replace(/ /g, '_')).digest('hex');
        const imgUrl = `https://upload.wikimedia.org/wikipedia/commons/${md5[0]}/${md5[0]}${md5[1]}/${encoded}`;
        if (!isBadImage(imgUrl)) return imgUrl;
      }
    }
  }
  return null;
}

function isBadImage(url: string): boolean {
  const bad = ['skyline', 'beach', 'fort_', 'palace', 'flag_of', 'fishing',
    'bibliography', 'bazza', 'life_and_times', 'temple', 'church', 'waterfall',
    'railway', 'airport', 'local_train', 'dental_coll', 'mount_carmel',
    'harbour', 'pradhan', 'brigade_road', '.svg', 'coat_of_arms', 'seal_of',
    'portrait', 'bust_of', 'statue', 'map_of', 'emblem', 'vivekananda-1893',
    'pixel', '1x1', 'spacer', 'blank', 'placeholder'];
  const lower = url.toLowerCase();
  return bad.some(b => lower.includes(b));
}

async function main() {
  await mongoose.connect(MONGO_URI);
  const db = mongoose.connection.db!;

  const colleges = await db.collection('colleges')
    .find({}, { projection: { name: 1, campusImages: 1, city: 1, state: 1 } })
    .toArray();

  const usedImages = new Set<string>();
  for (const c of colleges) {
    if (c.campusImages?.[0]) usedImages.add(c.campusImages[0]);
  }

  const badPatterns = ['unsplash.com', 'skyline', 'beach', 'fort_', 'palace', 'flag_of',
    'fishing', 'bibliography', 'bazza', 'life_and_times', 'temple', 'church',
    'waterfall', 'railway', 'airport', 'local_train', 'dental_coll', 'mount_carmel',
    'harbour', 'pradhan', 'brigade_road'];

  const needsFix = colleges.filter(c => {
    const img = (c.campusImages?.[0] || '').toLowerCase();
    return badPatterns.some(p => img.includes(p));
  });

  console.log(`Total to fix: ${needsFix.length}`);
  let fixed = 0, failed = 0;

  for (let i = 0; i < needsFix.length; i++) {
    const college = needsFix[i];
    if (i % 25 === 0) console.log(`Progress: ${i}/${needsFix.length} | Fixed: ${fixed}`);

    await new Promise(r => setTimeout(r, 250));

    let newImg: string | null = null;

    // Try all strategies in order
    newImg = await tryWikipedia(college.name, college.city || '');

    if (!newImg || usedImages.has(newImg)) {
      newImg = await tryWikidata(college.name);
    }

    if (!newImg || usedImages.has(newImg)) {
      newImg = await tryWikimediaCommons(college.name);
    }

    if (!newImg || usedImages.has(newImg)) {
      newImg = await tryOfficialWebsite(college.name, college.city || '');
    }

    if (!newImg || usedImages.has(newImg)) {
      newImg = await tryDuckDuckGo(college.name);
    }

    if (newImg && !usedImages.has(newImg)) {
      await db.collection('colleges').updateOne(
        { _id: college._id },
        { $set: { campusImages: [newImg] } }
      );
      usedImages.add(newImg);
      fixed++;
      console.log(`  ✓ ${college.name}`);
    } else {
      failed++;
    }
  }

  console.log(`\n=== DONE ===`);
  console.log(`Fixed: ${fixed} | Skipped: ${failed}`);

  await mongoose.disconnect();
}

main().catch(console.error);
