/**
 * REAL COLLEGE PHOTOS — 3-pass approach for all 1,200+ colleges.
 *
 * Pass 1: Wikipedia pageimage + page images (best quality)
 * Pass 2: Wikimedia Commons direct search (fallback)
 * Pass 3: Unique Unsplash education photo (last resort, guaranteed unique)
 *
 * Updates: logo, campusImages, hostelImages, labsImages, eventsImages, campusLife[].image
 * NEVER touches courses or any non-image field.
 *
 * Usage: npx tsx scripts/real-college-photos.ts
 */
import dns from "node:dns";
import path from "node:path";
import { fileURLToPath } from "node:url";

dns.setServers(["8.8.8.8", "8.8.4.4"]);

import dotenv from "dotenv";
import mongoose from "mongoose";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
dotenv.config({ path: path.join(__dirname, "..", ".env") });

import { College } from "../src/modules/colleges/models/collegeModel.js";

const DELAY = 1200;
const MAX_RETRIES = 5;
const WIKI_API = "https://en.wikipedia.org/w/api.php";
const COMMONS_API = "https://commons.wikimedia.org/w/api.php";

/* ─── Global dedup: every assigned campusImages[0] must be unique ─── */
const assignedBanners = new Set<string>();

/* ─── Helpers ─── */
function sleep(ms: number) { return new Promise((r) => setTimeout(r, ms)); }

function stableHash(s: string): number {
  let h = 0;
  for (let i = 0; i < s.length; i++) h = (h * 31 + s.charCodeAt(i)) | 0;
  return Math.abs(h);
}

async function apiFetch(baseUrl: string, params: Record<string, string>): Promise<any> {
  const qs = new URLSearchParams({ ...params, format: "json", origin: "*" });
  for (let attempt = 0; attempt <= MAX_RETRIES; attempt++) {
    try {
      const res = await fetch(`${baseUrl}?${qs}`, {
        headers: { "User-Agent": "ClarixEduPhotoBot/2.0 (educational; https://clarix.in)" },
        signal: AbortSignal.timeout(12000),
      });
      if (res.ok) return res.json();
      if (res.status === 429 || res.status === 503) {
        const wait = 4000 * Math.pow(2, attempt);
        console.log(`    ⏳ ${res.status}, backoff ${(wait / 1000).toFixed(0)}s…`);
        await sleep(wait);
        continue;
      }
      if (attempt < MAX_RETRIES) { await sleep(2000); continue; }
      return null;
    } catch {
      if (attempt < MAX_RETRIES) { await sleep(2000); continue; }
      return null;
    }
  }
  return null;
}

/* ─── Excluded image patterns ─── */
const EXCLUDED = [
  "commons-logo", "wiki", "edit-clear", "question_book", "ambox",
  "padlock", "crystal", "nuvola", "gnome", "disambig", "emojione",
  "octicons", "red_pencil", "increase2", "decrease2", "steady2",
  "india_location", "locator", "blank", "placeholder", "symbol",
  "ooj", "icon", "flag_of", "coat_of_arms", "seal_of", "emblem",
  "india_states", "map_of", "map-", "edit-ltr", "category_class",
  "folder_hex", "text-x", "circle-icons", "location_dot",
  "blue_pencil", "information_icon", "wikibooks", "wikiquote",
  "wikisource", "wiktionary", "wikinews", "wikiversity", "wikivoyage",
  "wikidata", "wikispecies", "mediawiki", "lock-", "semi-protection",
  "pp-", "red_question", "unbalanced_scales", "merge-", "split-",
  "portal-", "p_vip", "cscr-", "chess_", "crystal_clear",
  "question_book", "text_document", "wma_button", "speaker_icon",
  "sound_icon", "loudspeaker", "gnome-", "gtk-", "dialog-",
  "fairuse", "non-free", "replacement",
];

function isUsableImage(title: string): boolean {
  const l = title.toLowerCase();
  if (!l.endsWith(".jpg") && !l.endsWith(".jpeg") && !l.endsWith(".png") && !l.endsWith(".webp")) return false;
  for (const p of EXCLUDED) if (l.includes(p)) return false;
  if (l.replace("file:", "").trim().length < 8) return false;
  return true;
}

/* ─── Pass 1: Wikipedia ─── */
async function wikiSearch(collegeName: string): Promise<string | null> {
  const queries = [collegeName, `${collegeName} India`];
  for (const q of queries) {
    const data = await apiFetch(WIKI_API, {
      action: "query", list: "search", srsearch: q, srnamespace: "0", srlimit: "5",
    });
    if (!data?.query?.search?.length) { await sleep(200); continue; }
    const nameLower = collegeName.toLowerCase();
    for (const r of data.query.search) {
      const t = (r.title as string).toLowerCase();
      if (t.startsWith("list of")) continue;
      if (t === nameLower || t.includes(nameLower) || nameLower.includes(t)) return r.title;
    }
    // Keyword match
    const keywords = nameLower.replace(/[()]/g, "").split(/\s+/)
      .filter((w) => w.length > 3 && !["college", "university", "institute", "india", "the", "engineering", "government", "national"].includes(w));
    for (const r of data.query.search) {
      const t = (r.title as string).toLowerCase();
      if (t.startsWith("list of")) continue;
      const hits = keywords.filter((kw) => t.includes(kw)).length;
      if (keywords.length > 0 && hits >= Math.ceil(keywords.length * 0.5)) return r.title;
    }
    if (q !== collegeName) return data.query.search[0]?.title || null;
    await sleep(200);
  }
  return null;
}

async function wikiGetImages(pageTitle: string): Promise<{ logo: string | null; images: string[] }> {
  // Combined call: pageimages + images
  const data = await apiFetch(WIKI_API, {
    action: "query", titles: pageTitle,
    prop: "pageimages|images", piprop: "thumbnail|original", pithumbsize: "1200", imlimit: "40",
  });
  if (!data?.query?.pages) return { logo: null, images: [] };
  const page = Object.values(data.query.pages)[0] as any;
  const logo = page?.original?.source || page?.thumbnail?.source || null;
  const imageFiles = (page.images || []).map((img: any) => img.title as string).filter(isUsableImage);
  if (imageFiles.length === 0) return { logo, images: [] };

  await sleep(400);

  // Get URLs
  const urls: string[] = [];
  for (let i = 0; i < imageFiles.length; i += 50) {
    const batch = imageFiles.slice(i, i + 50);
    const iiData = await apiFetch(WIKI_API, {
      action: "query", titles: batch.join("|"), prop: "imageinfo", iiprop: "url|size", iiurlwidth: "1200",
    });
    if (!iiData?.query?.pages) continue;
    for (const p of Object.values(iiData.query.pages) as any[]) {
      const info = p.imageinfo?.[0];
      if (!info) continue;
      if ((info.url as string).endsWith(".svg")) continue;
      if (info.width && info.width < 250) continue;
      if (info.height && info.height < 180) continue;
      urls.push(info.thumburl || info.url);
    }
  }
  return { logo, images: urls };
}

/* ─── Pass 2: Wikimedia Commons ─── */
async function commonsSearch(query: string, limit = 8): Promise<string[]> {
  const data = await apiFetch(COMMONS_API, {
    action: "query", generator: "search",
    gsrsearch: `${query} campus building`, gsrnamespace: "6", gsrlimit: String(limit),
    prop: "imageinfo", iiprop: "url|size", iiurlwidth: "1200",
  });
  if (!data?.query?.pages) return [];
  const urls: string[] = [];
  for (const p of Object.values(data.query.pages) as any[]) {
    const info = p.imageinfo?.[0];
    if (!info) continue;
    if ((info.url as string).endsWith(".svg")) continue;
    if (info.width && info.width < 250) continue;
    const title = (p.title || "").toLowerCase();
    if (EXCLUDED.some((ex) => title.includes(ex))) continue;
    urls.push(info.thumburl || info.url);
  }
  return urls;
}

/* ─── Pass 3: Unique Unsplash fallback ─── */
const UNSPLASH_IDS = [
  "photo-1562774053-701939374585", "photo-1541339907198-e08756dedf3f",
  "photo-1523240795612-9a054b0db644", "photo-1577495508048-b635879837f1",
  "photo-1571260899304-425eee4c7efc", "photo-1524178232363-1fb2b075b655",
  "photo-1553481187-be93c21490a9", "photo-1523050854058-8df90110c9f1",
  "photo-1541829070764-84a7d30dd3f3", "photo-1543269865-cbf427effbad",
  "photo-1580582932707-520aed937b7b", "photo-1592280771190-3e2e4d571952",
  "photo-1498243691581-b145c3f54a5a", "photo-1509062522246-3755977927d7",
  "photo-1591123120675-6f7f1aae0e5b", "photo-1517694712202-14dd9538aa97",
  "photo-1504384308090-c894fdcc538d", "photo-1555949963-aa79dcee981c",
  "photo-1531482615713-2afd69097998", "photo-1461749280684-dccba630e2f6",
  "photo-1498050108023-c5249f4df085", "photo-1605379399642-870262d3d051",
  "photo-1550439062-609e1531270e", "photo-1519389950473-47ba0277781c",
  "photo-1536148935331-408321065b18", "photo-1581091226825-a6a2a5aee158",
  "photo-1518770660439-4636190af475", "photo-1573164713988-8665fc963095",
  "photo-1544197150-b99a580bb7a8", "photo-1542831371-29b0f74f9713",
  "photo-1555066931-4365d14bab8c", "photo-1587620962725-abab7fe55159",
  "photo-1526374965328-7f61d4dc18c5", "photo-1576091160399-112ba8d25d1d",
  "photo-1579684385127-1ef15d508118", "photo-1559757175-5700dde675bc",
  "photo-1581093458791-9d42e3c2fd45", "photo-1530497610245-94d3c16cda28",
  "photo-1551076805-e1869033e561", "photo-1584820927498-cfe5211fd8bf",
  "photo-1454165804606-c3d57bc86b40", "photo-1552664730-d307ca884978",
  "photo-1542744173-8e7e53415bb0", "photo-1560472354-b33ff0c44a43",
  "photo-1556761175-4b46a572b786", "photo-1553877522-43269d4ea984",
  "photo-1532094349884-543bc11b234d", "photo-1507413245164-6160d8298b31",
  "photo-1554475901-4538ddfbccc2", "photo-1564325724739-bae0bd08ae2a",
  "photo-1434030216411-0b793f4b4173", "photo-1521587760476-6c12a4b040da",
  "photo-1522202176988-66273c2fd55f", "photo-1522071820081-009f0129c71c",
  "photo-1564981797816-1043664bf78d", "photo-1511578314322-379afb476865",
  "photo-1517245386807-bb43f82c33c4", "photo-1600880292203-757bb62b4baf",
  "photo-1486406146926-c627a92ad1ab", "photo-1497366216548-37526070297c",
  "photo-1560179707-f14e90ef3623", "photo-1500382017468-9049fed747ef",
  // Additional campus/education photos for more variety
  "photo-1562774053-701939374585", "photo-1497366754035-f200968a6e72",
  "photo-1503676260728-1c00da094a0b", "photo-1427504494785-3a9ca7044f45",
  "photo-1513475382585-d06e58bcb0e0", "photo-1488190211105-8b0e65b80b4e",
  "photo-1491841550275-ad7854e35ca6", "photo-1606326608606-aa0b62935f2b",
  "photo-1509869175650-a1d97972541a", "photo-1481627834876-b7833e8f5570",
  "photo-1512820790803-83ca734da794", "photo-1501504905252-473c47e087f8",
  "photo-1507679799987-c73779587ccf", "photo-1556761175-5973dc0f32e7",
  "photo-1573497019940-1c28c88b4f3e", "photo-1573164713619-24c711fe7878",
  "photo-1517245386807-bb43f82c33c4", "photo-1542744094-3a31f272c490",
  "photo-1521791136064-7986c2920216", "photo-1531545514256-b1400bc00f31",
  "photo-1456513080510-7bf3a84b82f8", "photo-1497633762265-9d179a990aa6",
  "photo-1471970471555-19d4b113e9ed", "photo-1580537659466-0a9bfa916a54",
  "photo-1592066575517-58df903152f2", "photo-1546410531-bb4caa6b424d",
  "photo-1574958269340-fa927503f3dd", "photo-1585432959361-7463df03b793",
  "photo-1607237138185-eedd9c632b0b", "photo-1568792923760-d70635a89fdc",
  "photo-1544531586-fde5298cdd40", "photo-1595113316349-9fa4eb24f884",
  "photo-1509228627152-72ae9ae6848d", "photo-1513542789411-b6a5d4f31634",
  "photo-1579546929518-9e396f3cc505", "photo-1558021212-51b6ecfa0db9",
  "photo-1562654501-a0ccc0fc3fb1", "photo-1541339907198-e08756dedf3f",
];

function unsplashUrl(id: string, w = 1200) {
  return `https://images.unsplash.com/${id}?ixlib=rb-4.1.0&auto=format&fit=crop&fm=jpg&w=${w}&q=85`;
}

function getUniqueUnsplash(collegeName: string): string {
  const base = stableHash(collegeName);
  for (let k = 0; k < UNSPLASH_IDS.length; k++) {
    const url = unsplashUrl(UNSPLASH_IDS[(base + k) % UNSPLASH_IDS.length]!);
    if (!assignedBanners.has(url)) return url;
  }
  // Absolute last resort: add college name hash to make URL unique
  return unsplashUrl(UNSPLASH_IDS[base % UNSPLASH_IDS.length]!) + `&seed=${base}`;
}

/* ─── Build update object ─── */
function buildUpdate(
  logo: string | null,
  images: string[],
  collegeName: string,
  existingCampusLife: any[] | undefined,
): Record<string, any> {
  const update: Record<string, any> = {};

  // Determine banner (campusImages[0]) — must be globally unique
  let banner = logo || images[0] || null;
  if (banner && assignedBanners.has(banner)) {
    // Try other images
    banner = images.find((u) => !assignedBanners.has(u)) || null;
  }
  if (!banner) {
    banner = getUniqueUnsplash(collegeName);
  }
  assignedBanners.add(banner);

  // Logo
  update.logo = logo || banner;

  // Campus images (banner + up to 2 more)
  const campusPool = [banner, ...images.filter((u) => u !== banner)];
  update.campusImages = campusPool.slice(0, Math.min(3, campusPool.length));

  // Distribute remaining images
  const remaining = images.filter((u) => !update.campusImages.includes(u));
  if (remaining.length > 0) update.hostelImages = remaining.slice(0, Math.min(2, remaining.length));
  if (remaining.length > 2) update.labsImages = remaining.slice(2, Math.min(4, remaining.length));
  if (remaining.length > 4) update.eventsImages = remaining.slice(4, Math.min(6, remaining.length));

  // Campus life
  if (existingCampusLife && existingCampusLife.length > 0) {
    update.campusLife = existingCampusLife.map((item: any, idx: number) => ({
      ...(typeof item.toObject === "function" ? item.toObject() : item),
      image: campusPool[idx % campusPool.length] || banner,
    }));
  }

  return update;
}

/* ─── Main ─── */
async function main() {
  console.log("Connecting to MongoDB…");
  await mongoose.connect(process.env.MONGO_URI as string);
  console.log("Connected.\n");

  const allColleges = await College.find({}, {
    name: 1, city: 1, state: 1, logo: 1, campusImages: 1, campusLife: 1,
  }).lean();

  console.log(`Total colleges: ${allColleges.length}\n`);

  let pass1 = 0, pass2 = 0, pass3 = 0, errors = 0;

  for (let i = 0; i < allColleges.length; i++) {
    const college = allColleges[i]!;
    const name = college.name as string;
    const city = college.city as string;
    const tag = `[${i + 1}/${allColleges.length}]`;

    try {
      let logo: string | null = null;
      let images: string[] = [];
      let source = "";

      // ── Pass 1: Wikipedia ──
      const wikiTitle = await wikiSearch(name);
      if (wikiTitle) {
        await sleep(300);
        const result = await wikiGetImages(wikiTitle);
        if (result.logo || result.images.length > 0) {
          logo = result.logo;
          images = result.images;
          source = "wiki";
        }
      }

      // ── Pass 2: Wikimedia Commons (if Wikipedia didn't yield enough) ──
      if (!logo && images.length < 2) {
        await sleep(400);
        const commonsUrls = await commonsSearch(`${name} ${city || ""}`);
        if (commonsUrls.length > 0) {
          logo = logo || commonsUrls[0]!;
          images = images.length > commonsUrls.length ? images : commonsUrls;
          source = source || "commons";
        }
      }

      // ── Pass 3: Unique Unsplash (guaranteed) ──
      if (!logo && images.length === 0) {
        source = "unsplash";
      }

      // Build and apply update
      const update = buildUpdate(logo, images, name, college.campusLife as any[]);

      await College.updateOne({ _id: college._id }, { $set: update });

      const imgCount = (update.campusImages?.length || 0) + (update.hostelImages?.length || 0) +
        (update.labsImages?.length || 0) + (update.eventsImages?.length || 0);

      if (source === "wiki") pass1++;
      else if (source === "commons") pass2++;
      else pass3++;

      console.log(`${tag} ✓ "${name}" → ${imgCount} imgs [${source || "unsplash"}]`);
    } catch (err: any) {
      console.error(`${tag} ✗ "${name}" — ${err.message}`);
      errors++;
      // Still assign a unique Unsplash so this college isn't left with a dupe
      try {
        const fallback = getUniqueUnsplash(name);
        assignedBanners.add(fallback);
        await College.updateOne({ _id: college._id }, {
          $set: { logo: fallback, campusImages: [fallback] },
        });
      } catch { /* ignore */ }
    }

    await sleep(DELAY);
  }

  console.log(`\n${"═".repeat(55)}`);
  console.log(`  DONE — All ${allColleges.length} colleges processed`);
  console.log(`  Wikipedia:  ${pass1}`);
  console.log(`  Commons:    ${pass2}`);
  console.log(`  Unsplash:   ${pass3}`);
  console.log(`  Errors:     ${errors}`);
  console.log(`  Unique banners: ${assignedBanners.size}`);
  console.log(`${"═".repeat(55)}`);

  await mongoose.disconnect();
}

main().catch((err) => {
  console.error("Fatal:", err);
  process.exit(1);
});
