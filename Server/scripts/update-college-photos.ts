/**
 * Update all college photos with real images from Wikipedia/Wikimedia Commons.
 *
 * Optimized to minimize API calls:
 *  - Single combined query per college (search → pageimages+images in one call)
 *  - Aggressive retry with exponential backoff
 *  - Resume mode skips already-updated colleges
 *
 * Usage (from Server/):
 *   npx tsx scripts/update-college-photos.ts
 *
 * Options:
 *   DRY_RUN=1   — preview only
 *   RESUME=1    — skip already-updated colleges
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

const DRY_RUN = process.env.DRY_RUN === "1";
const RESUME = process.env.RESUME === "1";
const DELAY_MS = 1500; // between colleges
const MAX_RETRIES = 6;

const WIKI_API = "https://en.wikipedia.org/w/api.php";

const EXCLUDED_PATTERNS = [
  "commons-logo", "wiki", "edit-clear", "question_book", "ambox",
  "padlock", "crystal", "nuvola", "gnome", "disambig", "emojione",
  "octicons", "red_pencil", "increase2", "decrease2", "steady2",
  "india_location", "locator", "blank", "placeholder", "symbol",
  "ooj", "icon", "flag_of", "coat_of_arms", "seal_of", "emblem",
  "india_states", "map_of", "map-", "edit-ltr",
  "category_class", "folder_hexagonal", "text-x", "circle-icons",
  "us_", "location_dot", "blue_pencil", "information_icon",
  "wikibooks", "wikiquote", "wikisource", "wiktionary", "wikinews",
  "wikiversity", "wikivoyage", "wikidata", "wikispecies",
  "mediawiki", "lock-", "semi-protection", "pp-",
  "red_question", "unbalanced_scales", "merge-", "split-",
  "portal-", "p_vip", "cscr-", "chess_", "crystal_clear",
];

function isUsableImage(title: string): boolean {
  const lower = title.toLowerCase();
  if (!lower.endsWith(".jpg") && !lower.endsWith(".jpeg") && !lower.endsWith(".png") && !lower.endsWith(".webp"))
    return false;
  for (const pat of EXCLUDED_PATTERNS) if (lower.includes(pat)) return false;
  if (lower.replace("file:", "").trim().length < 8) return false;
  return true;
}

function sleep(ms: number): Promise<void> {
  return new Promise((r) => setTimeout(r, ms));
}

async function wikiGet(params: Record<string, string>): Promise<any> {
  const qs = new URLSearchParams({ ...params, format: "json", origin: "*" });
  const url = `${WIKI_API}?${qs}`;
  for (let attempt = 0; attempt <= MAX_RETRIES; attempt++) {
    try {
      const res = await fetch(url, {
        headers: { "User-Agent": "ClarixEduBot/1.0 (https://clarix.in; educational)" },
        signal: AbortSignal.timeout(15000),
      });
      if (res.ok) return res.json();
      if (res.status === 429 || res.status === 503) {
        const wait = 5000 * Math.pow(2, attempt); // 5s, 10s, 20s, 40s, 80s, 160s
        if (attempt < MAX_RETRIES) {
          console.log(`  ⏳ ${res.status}, backoff ${(wait / 1000).toFixed(0)}s…`);
          await sleep(wait);
          continue;
        }
      }
      throw new Error(`HTTP ${res.status}`);
    } catch (err: any) {
      if (err.message?.startsWith("HTTP")) throw err;
      if (attempt < MAX_RETRIES) {
        await sleep(3000 * (attempt + 1));
        continue;
      }
      throw err;
    }
  }
  throw new Error("Max retries exceeded");
}

/**
 * All-in-one: search for a college, get its page + images in minimal API calls.
 * Returns { logoUrl, imageUrls[] } or null.
 */
async function fetchCollegeImages(collegeName: string): Promise<{
  logoUrl: string | null;
  imageUrls: string[];
  wikiTitle: string;
} | null> {
  // Step 1: Search for the page
  const searchData = await wikiGet({
    action: "query",
    list: "search",
    srsearch: collegeName,
    srnamespace: "0",
    srlimit: "5",
  });

  const results = searchData?.query?.search;
  if (!results || results.length === 0) return null;

  // Find best matching title
  const nameLower = collegeName.toLowerCase();
  let bestTitle: string | null = null;

  for (const r of results) {
    const t = (r.title as string).toLowerCase();
    if (t === nameLower || t.includes(nameLower) || nameLower.includes(t)) {
      bestTitle = r.title;
      break;
    }
  }
  if (!bestTitle) {
    const keywords = nameLower
      .replace(/[()]/g, "")
      .split(/\s+/)
      .filter((w) => w.length > 3 && !["college", "university", "institute", "india", "the", "engineering"].includes(w));
    for (const r of results) {
      const t = (r.title as string).toLowerCase();
      const matchCount = keywords.filter((kw) => t.includes(kw)).length;
      if (keywords.length > 0 && matchCount >= Math.ceil(keywords.length * 0.5)) {
        bestTitle = r.title;
        break;
      }
    }
  }
  if (!bestTitle) bestTitle = results[0].title;

  await sleep(500);

  // Step 2: Get pageimage + images in a SINGLE combined call
  const pageData = await wikiGet({
    action: "query",
    titles: bestTitle,
    prop: "pageimages|images",
    piprop: "thumbnail|original",
    pithumbsize: "1200",
    imlimit: "50",
  });

  const pages = pageData?.query?.pages;
  if (!pages) return { logoUrl: null, imageUrls: [], wikiTitle: bestTitle };

  const page = Object.values(pages)[0] as any;
  const logoUrl = page?.original?.source || page?.thumbnail?.source || null;

  // Filter usable image files
  const imageFiles: string[] = (page.images || [])
    .map((img: any) => img.title as string)
    .filter(isUsableImage);

  if (imageFiles.length === 0) {
    return { logoUrl, imageUrls: [], wikiTitle: bestTitle };
  }

  await sleep(500);

  // Step 3: Get URLs for image files
  const imageUrls: string[] = [];
  for (let i = 0; i < imageFiles.length; i += 50) {
    const batch = imageFiles.slice(i, i + 50);
    const iiData = await wikiGet({
      action: "query",
      titles: batch.join("|"),
      prop: "imageinfo",
      iiprop: "url|size",
      iiurlwidth: "1200",
    });
    const iiPages = iiData?.query?.pages;
    if (!iiPages) continue;
    for (const p of Object.values(iiPages) as any[]) {
      const info = p.imageinfo?.[0];
      if (!info) continue;
      const url = info.url as string;
      if (url.endsWith(".svg")) continue;
      if (info.width && info.width < 200) continue;
      if (info.height && info.height < 150) continue;
      imageUrls.push(info.thumburl || url);
    }
  }

  return { logoUrl, imageUrls, wikiTitle: bestTitle };
}

function isAlreadyUpdated(logo: string | undefined): boolean {
  if (!logo) return false;
  return logo.includes("wikimedia.org") || logo.includes("wikipedia.org");
}

async function main() {
  console.log("Connecting to MongoDB…");
  await mongoose.connect(process.env.MONGO_URI as string);
  console.log("Connected.\n");

  const allColleges = await College.find({}, { name: 1, logo: 1 }).lean();
  console.log(`Found ${allColleges.length} colleges.`);
  if (DRY_RUN) console.log("DRY RUN mode.");
  if (RESUME) console.log("RESUME mode.");
  console.log();

  let updated = 0, skipped = 0, failed = 0, resumed = 0;

  for (let i = 0; i < allColleges.length; i++) {
    const college = allColleges[i]!;
    const name = college.name as string;
    const tag = `[${i + 1}/${allColleges.length}]`;

    if (RESUME && isAlreadyUpdated(college.logo as string)) {
      resumed++;
      continue;
    }

    try {
      const result = await fetchCollegeImages(name);

      if (!result) {
        // Try with "India" suffix
        await sleep(500);
        const result2 = await fetchCollegeImages(`${name} India`);
        if (!result2 || (!result2.logoUrl && result2.imageUrls.length === 0)) {
          console.log(`${tag} SKIP: "${name}"`);
          skipped++;
          await sleep(DELAY_MS);
          continue;
        }
        // Use result2
        await applyUpdate(college, result2, tag, name);
        updated++;
        await sleep(DELAY_MS);
        continue;
      }

      if (!result.logoUrl && result.imageUrls.length === 0) {
        console.log(`${tag} SKIP (no img): "${name}" → ${result.wikiTitle}`);
        skipped++;
        await sleep(DELAY_MS);
        continue;
      }

      await applyUpdate(college, result, tag, name);
      updated++;
    } catch (err: any) {
      console.error(`${tag} ERR: "${name}" — ${err.message}`);
      failed++;
    }

    await sleep(DELAY_MS);
  }

  console.log(`\n${"═".repeat(50)}`);
  console.log(`Done!`);
  if (RESUME) console.log(`  Already done: ${resumed}`);
  console.log(`  Updated: ${updated}`);
  console.log(`  Skipped: ${skipped}`);
  console.log(`  Failed:  ${failed}`);
  console.log(`  Total:   ${allColleges.length}`);
  console.log(`${"═".repeat(50)}`);

  await mongoose.disconnect();
}

async function applyUpdate(
  college: any,
  result: { logoUrl: string | null; imageUrls: string[]; wikiTitle: string },
  tag: string,
  name: string
) {
  const update: Record<string, any> = {};
  const logoUrl = result.logoUrl || result.imageUrls[0];
  if (logoUrl) update.logo = logoUrl;

  const imgs = result.imageUrls;
  if (imgs.length > 0) {
    update.campusImages = imgs.slice(0, Math.min(3, imgs.length));
    if (imgs.length > 3) update.hostelImages = imgs.slice(3, Math.min(5, imgs.length));
    if (imgs.length > 5) update.labsImages = imgs.slice(5, Math.min(7, imgs.length));
    if (imgs.length > 7) update.eventsImages = imgs.slice(7, Math.min(9, imgs.length));
  } else if (logoUrl) {
    update.campusImages = [logoUrl];
  }

  // Update campusLife images
  if (logoUrl) {
    const fullDoc = await College.findById(college._id);
    if (fullDoc?.campusLife && fullDoc.campusLife.length > 0) {
      update.campusLife = fullDoc.campusLife.map((item, idx) => ({
        ...item.toObject(),
        image: imgs[idx] || logoUrl,
      }));
    }
  }

  if (Object.keys(update).length === 0) return;

  const s = `logo:${update.logo ? "✓" : "–"} c:${update.campusImages?.length || 0} h:${update.hostelImages?.length || 0} l:${update.labsImages?.length || 0} e:${update.eventsImages?.length || 0}`;

  if (DRY_RUN) {
    console.log(`${tag} DRY: "${name}" → ${s}`);
  } else {
    await College.updateOne({ _id: college._id }, { $set: update });
    console.log(`${tag} OK: "${name}" → ${s}`);
  }
}

main().catch((err) => {
  console.error("Fatal:", err);
  process.exit(1);
});
