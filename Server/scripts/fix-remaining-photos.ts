/**
 * Fix remaining colleges that didn't get Wikipedia images.
 *
 * Strategies (tried in order):
 *  1. Wikimedia Commons direct image search
 *  2. Wikipedia with expanded/full name search (e.g. "IIM" → "Indian Institute of Management")
 *  3. DuckDuckGo Instant Answer API (has Image field)
 *  4. Scrape college website og:image / twitter:image meta tags
 *
 * Usage:  npx tsx scripts/fix-remaining-photos.ts
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
const DELAY = 1200;

function sleep(ms: number): Promise<void> {
  return new Promise((r) => setTimeout(r, ms));
}

/* ─── Common abbreviation → full name expansions ─── */
const EXPANSIONS: Record<string, string> = {
  IIT: "Indian Institute of Technology",
  IIM: "Indian Institute of Management",
  NIT: "National Institute of Technology",
  IIIT: "Indian Institute of Information Technology",
  AIIMS: "All India Institute of Medical Sciences",
  NID: "National Institute of Design",
  NIFT: "National Institute of Fashion Technology",
  BITS: "Birla Institute of Technology and Science",
  SRM: "SRM Institute of Science and Technology",
  VIT: "Vellore Institute of Technology",
  KIIT: "Kalinga Institute of Industrial Technology",
  ISB: "Indian School of Business",
  XLRI: "Xavier Labour Relations Institute",
  PEC: "Punjab Engineering College",
  NSUT: "Netaji Subhas University of Technology",
  BMS: "BMS College of Engineering Bangalore",
  SSN: "SSN College of Engineering Chennai",
  SPJIMR: "SP Jain Institute of Management and Research",
  MDI: "Management Development Institute Gurgaon",
  NLSIU: "National Law School of India University",
  RGUKT: "Rajiv Gandhi University of Knowledge Technologies",
  BIET: "Bundelkhand Institute of Engineering and Technology",
  KNIT: "Kamla Nehru Institute of Technology",
  IIEST: "Indian Institute of Engineering Science and Technology",
  NIPER: "National Institute of Pharmaceutical Education and Research",
  RIMS: "Rajendra Institute of Medical Sciences",
  GEC: "Government Engineering College",
  CUSAT: "Cochin University of Science and Technology",
  RCBS: "Rajagiri Centre for Business Studies",
  SCMS: "SCMS Cochin School of Business",
  NUALS: "National University of Advanced Legal Studies",
};

function expandName(name: string): string[] {
  const variants: string[] = [name];

  // Try expanding abbreviations in the name
  for (const [abbr, full] of Object.entries(EXPANSIONS)) {
    if (name.startsWith(abbr + " ") || name.includes(`(${abbr})`)) {
      variants.push(name.replace(abbr, full));
      variants.push(full + " " + name.replace(abbr, "").replace(/[()]/g, "").trim());
    }
  }

  // Add "campus" for image search
  variants.push(`${name} campus`);
  variants.push(`${name} India college`);

  // Remove parenthetical suffixes for cleaner search
  const clean = name.replace(/\s*\(.*?\)\s*/g, " ").trim();
  if (clean !== name) variants.push(clean);

  return [...new Set(variants)];
}

/* ─── Strategy 1: Wikimedia Commons search ─── */
async function searchCommons(query: string): Promise<string[]> {
  const params = new URLSearchParams({
    action: "query",
    generator: "search",
    gsrsearch: `${query} college campus building`,
    gsrnamespace: "6", // File namespace
    gsrlimit: "10",
    prop: "imageinfo",
    iiprop: "url|size",
    iiurlwidth: "1200",
    format: "json",
    origin: "*",
  });

  try {
    const res = await fetch(`https://commons.wikimedia.org/w/api.php?${params}`, {
      headers: { "User-Agent": "ClarixEduBot/1.0 (educational)" },
      signal: AbortSignal.timeout(10000),
    });
    if (!res.ok) return [];
    const data = await res.json();
    const pages = data?.query?.pages;
    if (!pages) return [];

    const urls: string[] = [];
    for (const p of Object.values(pages) as any[]) {
      const info = p.imageinfo?.[0];
      if (!info) continue;
      const url = info.url as string;
      if (url.endsWith(".svg")) continue;
      if (info.width && info.width < 300) continue;
      if (info.height && info.height < 200) continue;
      // Skip obviously non-college images
      const title = (p.title || "").toLowerCase();
      if (
        title.includes("flag") ||
        title.includes("coat_of") ||
        title.includes("seal_of") ||
        title.includes("map") ||
        title.includes("icon") ||
        title.includes("logo.svg")
      )
        continue;
      urls.push(info.thumburl || url);
    }
    return urls;
  } catch {
    return [];
  }
}

/* ─── Strategy 2: Wikipedia with expanded name ─── */
async function wikiExpandedSearch(collegeName: string): Promise<{ logo: string | null; images: string[] }> {
  const variants = expandName(collegeName);

  for (const variant of variants.slice(0, 3)) {
    try {
      // Search
      const sParams = new URLSearchParams({
        action: "query",
        list: "search",
        srsearch: variant,
        srnamespace: "0",
        srlimit: "3",
        format: "json",
        origin: "*",
      });
      const sRes = await fetch(`https://en.wikipedia.org/w/api.php?${sParams}`, {
        headers: { "User-Agent": "ClarixEduBot/1.0 (educational)" },
        signal: AbortSignal.timeout(10000),
      });
      if (!sRes.ok) continue;
      const sData = await sRes.json();
      const results = sData?.query?.search;
      if (!results || results.length === 0) continue;

      // Check first few results for a relevant page
      for (const r of results.slice(0, 2)) {
        const title = r.title as string;
        // Skip "List of" pages
        if (title.toLowerCase().startsWith("list of")) continue;

        await sleep(400);

        // Get pageimage + images
        const pParams = new URLSearchParams({
          action: "query",
          titles: title,
          prop: "pageimages|images",
          piprop: "thumbnail|original",
          pithumbsize: "1200",
          imlimit: "30",
          format: "json",
          origin: "*",
        });
        const pRes = await fetch(`https://en.wikipedia.org/w/api.php?${pParams}`, {
          headers: { "User-Agent": "ClarixEduBot/1.0 (educational)" },
          signal: AbortSignal.timeout(10000),
        });
        if (!pRes.ok) continue;
        const pData = await pRes.json();
        const pages = pData?.query?.pages;
        if (!pages) continue;

        const page = Object.values(pages)[0] as any;
        const logo = page?.original?.source || page?.thumbnail?.source || null;

        // Get usable images
        const imageFiles = (page.images || [])
          .map((img: any) => img.title as string)
          .filter((t: string) => {
            const l = t.toLowerCase();
            return (
              (l.endsWith(".jpg") || l.endsWith(".jpeg") || l.endsWith(".png")) &&
              !l.includes("commons-logo") &&
              !l.includes("wiki") &&
              !l.includes("icon") &&
              !l.includes("flag") &&
              !l.includes("edit-ltr") &&
              !l.includes("padlock") &&
              !l.includes("ambox") &&
              !l.includes("symbol") &&
              !l.includes("ooj") &&
              !l.includes("seal_of") &&
              !l.includes("emblem") &&
              !l.includes("coat_of") &&
              !l.includes("map") &&
              !l.includes("location") &&
              !l.includes("crystal") &&
              !l.includes("nuvola") &&
              !l.includes("gnome") &&
              !l.includes("semi-protection") &&
              !l.includes("pp-") &&
              !l.includes("lock-") &&
              !l.includes("question_book") &&
              !l.includes("disambig") &&
              !l.includes("category_class") &&
              !l.includes("folder_hex") &&
              !l.includes("text-x") &&
              !l.includes("red_pencil") &&
              !l.includes("blue_pencil") &&
              !l.includes("information_icon") &&
              !l.includes("portal-") &&
              !l.includes("circle-icons") &&
              !l.includes("cscr-") &&
              t.replace("File:", "").length > 8
            );
          });

        if (logo || imageFiles.length > 0) {
          // Get URLs for image files
          const imageUrls: string[] = [];
          if (imageFiles.length > 0) {
            await sleep(400);
            const iiParams = new URLSearchParams({
              action: "query",
              titles: imageFiles.slice(0, 20).join("|"),
              prop: "imageinfo",
              iiprop: "url|size",
              iiurlwidth: "1200",
              format: "json",
              origin: "*",
            });
            const iiRes = await fetch(`https://en.wikipedia.org/w/api.php?${iiParams}`, {
              headers: { "User-Agent": "ClarixEduBot/1.0 (educational)" },
              signal: AbortSignal.timeout(10000),
            });
            if (iiRes.ok) {
              const iiData = await iiRes.json();
              const iiPages = iiData?.query?.pages;
              if (iiPages) {
                for (const p of Object.values(iiPages) as any[]) {
                  const info = p.imageinfo?.[0];
                  if (!info) continue;
                  if ((info.url as string).endsWith(".svg")) continue;
                  if (info.width && info.width < 200) continue;
                  imageUrls.push(info.thumburl || info.url);
                }
              }
            }
          }

          if (logo || imageUrls.length > 0) {
            return { logo, images: imageUrls };
          }
        }
      }

      await sleep(300);
    } catch {
      await sleep(500);
    }
  }

  return { logo: null, images: [] };
}

/* ─── Strategy 3: DuckDuckGo Instant Answer ─── */
async function duckDuckGoImage(collegeName: string): Promise<string | null> {
  try {
    const params = new URLSearchParams({
      q: `${collegeName} India college`,
      format: "json",
      no_redirect: "1",
    });
    const res = await fetch(`https://api.duckduckgo.com/?${params}`, {
      headers: { "User-Agent": "ClarixEduBot/1.0 (educational)" },
      signal: AbortSignal.timeout(10000),
    });
    if (!res.ok) return null;
    const data = await res.json();

    // DDG returns Image field with a URL
    if (data.Image && data.Image.length > 0) {
      // Image can be relative, prefix with DDG
      const img = data.Image.startsWith("http") ? data.Image : `https://duckduckgo.com${data.Image}`;
      return img;
    }

    // Check Infobox image
    if (data.Infobox?.content) {
      for (const item of data.Infobox.content) {
        if (item.data_type === "image" && item.value) {
          return item.value.startsWith("http") ? item.value : `https://duckduckgo.com${item.value}`;
        }
      }
    }

    return null;
  } catch {
    return null;
  }
}

/* ─── Strategy 4: Scrape og:image from college website ─── */
async function scrapeOgImage(collegeName: string): Promise<string | null> {
  try {
    // Use DuckDuckGo to find the official website
    const params = new URLSearchParams({
      q: `${collegeName} India official site`,
      format: "json",
      no_redirect: "1",
    });
    const res = await fetch(`https://api.duckduckgo.com/?${params}`, {
      headers: { "User-Agent": "ClarixEduBot/1.0 (educational)" },
      signal: AbortSignal.timeout(8000),
    });
    if (!res.ok) return null;
    const data = await res.json();

    // Get the official URL from DDG results
    const officialUrl = data.AbstractURL || data.Results?.[0]?.FirstURL;
    if (!officialUrl) return null;

    // Fetch the homepage and extract og:image
    const pageRes = await fetch(officialUrl, {
      headers: { "User-Agent": "Mozilla/5.0 (compatible; ClarixEduBot/1.0)" },
      signal: AbortSignal.timeout(8000),
      redirect: "follow",
    });
    if (!pageRes.ok) return null;
    const html = await pageRes.text();

    // Extract og:image or twitter:image
    const ogMatch = html.match(
      /<meta\s+(?:property|name)=["'](?:og:image|twitter:image)["']\s+content=["']([^"']+)["']/i
    ) || html.match(
      /<meta\s+content=["']([^"']+)["']\s+(?:property|name)=["'](?:og:image|twitter:image)["']/i
    );

    if (ogMatch?.[1]) {
      let imgUrl = ogMatch[1];
      // Handle relative URLs
      if (imgUrl.startsWith("/")) {
        const base = new URL(officialUrl);
        imgUrl = `${base.origin}${imgUrl}`;
      }
      // Verify it's an image URL
      if (imgUrl.match(/\.(jpg|jpeg|png|webp)/i) || imgUrl.includes("image")) {
        return imgUrl;
      }
    }

    return null;
  } catch {
    return null;
  }
}

/* ─── Main ─── */

async function main() {
  console.log("Connecting to MongoDB…");
  await mongoose.connect(process.env.MONGO_URI as string);
  console.log("Connected.\n");

  // Find colleges that still have Unsplash images (not yet updated)
  const allColleges = await College.find({}, { name: 1, logo: 1, campusLife: 1 }).lean();
  const remaining = allColleges.filter(
    (c) => !(c.logo as string)?.includes("wikimedia.org") && !(c.logo as string)?.includes("wikipedia.org")
  );

  console.log(`Total colleges: ${allColleges.length}`);
  console.log(`Already updated: ${allColleges.length - remaining.length}`);
  console.log(`Remaining to fix: ${remaining.length}`);
  if (DRY_RUN) console.log("DRY RUN mode.");
  console.log();

  let fixed = 0, skipped = 0, failed = 0;

  for (let i = 0; i < remaining.length; i++) {
    const college = remaining[i]!;
    const name = college.name as string;
    const tag = `[${i + 1}/${remaining.length}]`;

    try {
      let logoUrl: string | null = null;
      let imageUrls: string[] = [];
      let source = "";

      // Strategy 1: Wikimedia Commons direct search
      const commonsImages = await searchCommons(name);
      if (commonsImages.length > 0) {
        logoUrl = commonsImages[0]!;
        imageUrls = commonsImages;
        source = "commons";
      }

      // Strategy 2: Wikipedia with expanded names (if Commons didn't work well)
      if (!logoUrl || imageUrls.length < 2) {
        await sleep(500);
        const wikiResult = await wikiExpandedSearch(name);
        if (wikiResult.logo || wikiResult.images.length > 0) {
          logoUrl = logoUrl || wikiResult.logo || wikiResult.images[0]!;
          imageUrls = imageUrls.length > wikiResult.images.length ? imageUrls : wikiResult.images;
          source = source || "wiki-expanded";
        }
      }

      // Strategy 3: DuckDuckGo Instant Answer
      if (!logoUrl) {
        await sleep(500);
        const ddgImg = await duckDuckGoImage(name);
        if (ddgImg) {
          logoUrl = ddgImg;
          if (imageUrls.length === 0) imageUrls = [ddgImg];
          source = source || "duckduckgo";
        }
      }

      // Strategy 4: Scrape og:image from official website
      if (!logoUrl) {
        await sleep(500);
        const ogImg = await scrapeOgImage(name);
        if (ogImg) {
          logoUrl = ogImg;
          if (imageUrls.length === 0) imageUrls = [ogImg];
          source = source || "og:image";
        }
      }

      if (!logoUrl && imageUrls.length === 0) {
        console.log(`${tag} SKIP: "${name}" — all strategies exhausted`);
        skipped++;
        await sleep(DELAY);
        continue;
      }

      // Build update
      const update: Record<string, any> = {};
      if (logoUrl) update.logo = logoUrl;

      if (imageUrls.length > 0) {
        update.campusImages = imageUrls.slice(0, Math.min(3, imageUrls.length));
        if (imageUrls.length > 3) update.hostelImages = imageUrls.slice(3, Math.min(5, imageUrls.length));
        if (imageUrls.length > 5) update.labsImages = imageUrls.slice(5, Math.min(7, imageUrls.length));
        if (imageUrls.length > 7) update.eventsImages = imageUrls.slice(7, Math.min(9, imageUrls.length));
      } else if (logoUrl) {
        update.campusImages = [logoUrl];
      }

      // Update campusLife images
      if (logoUrl && college.campusLife && (college.campusLife as any[]).length > 0) {
        update.campusLife = (college.campusLife as any[]).map((item: any, idx: number) => ({
          ...item,
          image: imageUrls[idx] || logoUrl,
        }));
      }

      const s = `logo:${update.logo ? "✓" : "–"} c:${update.campusImages?.length || 0} h:${update.hostelImages?.length || 0} l:${update.labsImages?.length || 0} e:${update.eventsImages?.length || 0}`;

      if (DRY_RUN) {
        console.log(`${tag} DRY: "${name}" → ${s} [${source}]`);
      } else {
        await College.updateOne({ _id: college._id }, { $set: update });
        console.log(`${tag} FIXED: "${name}" → ${s} [${source}]`);
      }
      fixed++;
    } catch (err: any) {
      console.error(`${tag} ERR: "${name}" — ${err.message}`);
      failed++;
    }

    await sleep(DELAY);
  }

  console.log(`\n${"═".repeat(50)}`);
  console.log(`Done!`);
  console.log(`  Fixed:   ${fixed}`);
  console.log(`  Skipped: ${skipped}`);
  console.log(`  Failed:  ${failed}`);
  console.log(`  Total remaining attempted: ${remaining.length}`);
  console.log(`${"═".repeat(50)}`);

  await mongoose.disconnect();
}

main().catch((err) => {
  console.error("Fatal:", err);
  process.exit(1);
});
