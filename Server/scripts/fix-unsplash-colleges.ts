/**
 * Fix colleges still on Unsplash fallback by retrying Wikipedia + Commons.
 * Also de-duplicates banners globally.
 *
 * Only updates colleges whose logo contains "unsplash".
 * NEVER touches courses or non-image fields.
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

const DELAY = 1500;
const WIKI = "https://en.wikipedia.org/w/api.php";
const COMMONS = "https://commons.wikimedia.org/w/api.php";

function sleep(ms: number) { return new Promise(r => setTimeout(r, ms)); }

async function api(base: string, params: Record<string, string>): Promise<any> {
  const qs = new URLSearchParams({ ...params, format: "json", origin: "*" });
  for (let i = 0; i < 5; i++) {
    try {
      const r = await fetch(`${base}?${qs}`, {
        headers: { "User-Agent": "ClarixFixBot/2.0 (educational)" },
        signal: AbortSignal.timeout(12000),
      });
      if (r.ok) return r.json();
      if (r.status === 429) { await sleep(6000 * (i + 1)); continue; }
      return null;
    } catch { if (i < 4) await sleep(3000); }
  }
  return null;
}

const EXCLUDED = new Set([
  "commons-logo", "wiki", "edit-clear", "ambox", "padlock", "gnome",
  "disambig", "icon", "flag_of", "coat_of", "seal_of", "emblem",
  "map_of", "map-", "edit-ltr", "category_class", "folder_hex",
  "location_dot", "blue_pencil", "information_icon", "semi-protection",
  "pp-", "lock-", "portal-", "cscr-", "red_pencil", "crystal",
  "nuvola", "question_book", "text-x", "circle-icons", "symbol",
  "ooj", "mediawiki", "wikidata", "wikimedia",
]);

function isUsable(title: string): boolean {
  const l = title.toLowerCase();
  if (!l.endsWith(".jpg") && !l.endsWith(".jpeg") && !l.endsWith(".png") && !l.endsWith(".webp")) return false;
  for (const ex of EXCLUDED) if (l.includes(ex)) return false;
  return l.replace("file:", "").length > 8;
}

async function getWikiPhotos(name: string): Promise<{ logo: string | null; imgs: string[] }> {
  // Search
  const s = await api(WIKI, { action: "query", list: "search", srsearch: name, srlimit: "5", srnamespace: "0" });
  if (!s?.query?.search?.length) return { logo: null, imgs: [] };

  const nameLo = name.toLowerCase();
  let title: string | null = null;
  for (const r of s.query.search) {
    const t = (r.title as string).toLowerCase();
    if (t.startsWith("list of")) continue;
    if (t === nameLo || t.includes(nameLo) || nameLo.includes(t)) { title = r.title; break; }
  }
  if (!title) {
    // Keyword match
    const kw = nameLo.replace(/[()]/g, "").split(/\s+/).filter(w => w.length > 3 && !["college","university","institute","the","india","engineering","national","government","technology"].includes(w));
    for (const r of s.query.search) {
      const t = (r.title as string).toLowerCase();
      if (t.startsWith("list of")) continue;
      if (kw.length > 0 && kw.filter(k => t.includes(k)).length >= Math.ceil(kw.length * 0.4)) { title = r.title; break; }
    }
  }
  if (!title) title = s.query.search.find((r: any) => !r.title.toLowerCase().startsWith("list of"))?.title || null;
  if (!title) return { logo: null, imgs: [] };

  await sleep(400);

  // Get pageimage + images
  const p = await api(WIKI, { action: "query", titles: title, prop: "pageimages|images", piprop: "thumbnail|original", pithumbsize: "1200", imlimit: "30" });
  if (!p?.query?.pages) return { logo: null, imgs: [] };
  const page = Object.values(p.query.pages)[0] as any;
  const logo = page?.original?.source || page?.thumbnail?.source || null;
  const files = (page.images || []).map((i: any) => i.title as string).filter(isUsable);

  if (files.length === 0) return { logo, imgs: [] };

  await sleep(400);

  // Get URLs
  const urls: string[] = [];
  const ii = await api(WIKI, { action: "query", titles: files.slice(0, 20).join("|"), prop: "imageinfo", iiprop: "url|size", iiurlwidth: "1200" });
  if (ii?.query?.pages) {
    for (const pg of Object.values(ii.query.pages) as any[]) {
      const info = pg.imageinfo?.[0];
      if (!info || (info.url as string).endsWith(".svg") || (info.width && info.width < 250)) continue;
      urls.push(info.thumburl || info.url);
    }
  }
  return { logo, imgs: urls };
}

async function commonsPhotos(query: string): Promise<string[]> {
  const d = await api(COMMONS, { action: "query", generator: "search", gsrsearch: `${query} campus`, gsrnamespace: "6", gsrlimit: "8", prop: "imageinfo", iiprop: "url|size", iiurlwidth: "1200" });
  if (!d?.query?.pages) return [];
  const urls: string[] = [];
  for (const pg of Object.values(d.query.pages) as any[]) {
    const info = pg.imageinfo?.[0];
    if (!info || (info.url as string).endsWith(".svg") || (info.width && info.width < 250)) continue;
    const t = (pg.title || "").toLowerCase();
    if ([...EXCLUDED].some(ex => t.includes(ex))) continue;
    urls.push(info.thumburl || info.url);
  }
  return urls;
}

async function main() {
  console.log("Connecting…");
  await mongoose.connect(process.env.MONGO_URI as string);

  // Get all banners for dedup tracking
  const allColleges = await College.find({}, { logo: 1, campusImages: 1 }).lean();
  const usedBanners = new Set<string>();
  for (const c of allColleges) {
    const b = (c.campusImages as string[])?.[0];
    if (b && !b.includes("unsplash")) usedBanners.add(b.split("?")[0]!);
  }

  // Get unsplash-only colleges
  const targets = await College.find(
    { logo: { $regex: "unsplash" } },
    { name: 1, city: 1, country: 1, campusLife: 1 }
  ).lean();

  console.log(`Fixing ${targets.length} colleges with Unsplash fallback…\n`);

  let fixed = 0, still = 0;

  for (let i = 0; i < targets.length; i++) {
    const c = targets[i]!;
    const name = c.name as string;
    const tag = `[${i + 1}/${targets.length}]`;

    try {
      // Try Wikipedia
      let { logo, imgs } = await getWikiPhotos(name);

      // Try Commons if wiki didn't work
      if (!logo && imgs.length === 0) {
        await sleep(400);
        const commonsImgs = await commonsPhotos(name);
        if (commonsImgs.length > 0) {
          logo = commonsImgs[0]!;
          imgs = commonsImgs;
        }
      }

      // Try with country name appended
      if (!logo && imgs.length === 0) {
        await sleep(400);
        const { logo: l2, imgs: i2 } = await getWikiPhotos(`${name} ${c.country || ""}`);
        if (l2 || i2.length > 0) { logo = l2; imgs = i2; }
      }

      if (!logo && imgs.length === 0) {
        console.log(`${tag} ⚠ "${name}" — still no real photo`);
        still++;
        await sleep(DELAY);
        continue;
      }

      // Ensure unique banner
      let banner = logo || imgs[0]!;
      const bannerKey = banner.split("?")[0]!;
      if (usedBanners.has(bannerKey)) {
        const alt = imgs.find(u => !usedBanners.has(u.split("?")[0]!));
        if (alt) banner = alt;
      }
      usedBanners.add(banner.split("?")[0]!);

      const update: Record<string, any> = {
        logo: logo || banner,
        campusImages: [banner, ...imgs.filter(u => u !== banner).slice(0, 2)],
      };
      if (imgs.length > 3) update.hostelImages = imgs.slice(3, 5);
      if (imgs.length > 5) update.labsImages = imgs.slice(5, 7);
      if (imgs.length > 7) update.eventsImages = imgs.slice(7, 9);

      if (c.campusLife && (c.campusLife as any[]).length > 0) {
        const pool = update.campusImages;
        update.campusLife = (c.campusLife as any[]).map((item: any, idx: number) => ({
          ...item,
          image: pool[idx % pool.length] || banner,
        }));
      }

      await College.updateOne({ _id: c._id }, { $set: update });
      console.log(`${tag} ✓ "${name}" → ${imgs.length} imgs`);
      fixed++;
    } catch (err: any) {
      console.log(`${tag} ✗ "${name}" — ${err.message}`);
      still++;
    }

    await sleep(DELAY);
  }

  console.log(`\n${"═".repeat(50)}`);
  console.log(`  Fixed: ${fixed} | Still unsplash: ${still}`);
  console.log(`${"═".repeat(50)}`);

  mongoose.disconnect();
}

main().catch(e => { console.error(e); process.exit(1); });
