/**
 * Fix colleges that share the same campus/banner image.
 *
 * For each group of colleges sharing the same campusImages[0]:
 *  1. Try a targeted Wikimedia Commons search with "collegeName campus building"
 *  2. If that fails, shuffle existing gallery images so the card image differs
 *  3. As last resort, use a unique Unsplash photo keyed to the college name
 *
 * Usage: npx tsx scripts/fix-duplicate-images.ts
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
const DELAY = 1500;

function sleep(ms: number): Promise<void> {
  return new Promise((r) => setTimeout(r, ms));
}

/* Stable hash for deterministic Unsplash fallback */
function stableHash(s: string): number {
  let h = 0;
  for (let i = 0; i < s.length; i++) h = (h * 31 + s.charCodeAt(i)) | 0;
  return Math.abs(h);
}

/* Large pool of unique, verified Unsplash campus/education photos */
const UNSPLASH_POOL = [
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
];

function unsplashUrl(id: string, w = 1200) {
  return `https://images.unsplash.com/${id}?ixlib=rb-4.1.0&auto=format&fit=crop&fm=jpg&w=${w}&q=85`;
}

async function searchCommonsUnique(query: string): Promise<string | null> {
  try {
    const params = new URLSearchParams({
      action: "query",
      generator: "search",
      gsrsearch: query,
      gsrnamespace: "6",
      gsrlimit: "5",
      prop: "imageinfo",
      iiprop: "url|size",
      iiurlwidth: "1200",
      format: "json",
      origin: "*",
    });
    const res = await fetch(`https://commons.wikimedia.org/w/api.php?${params}`, {
      headers: { "User-Agent": "ClarixEduBot/1.0" },
      signal: AbortSignal.timeout(10000),
    });
    if (!res.ok) return null;
    const data = await res.json();
    const pages = data?.query?.pages;
    if (!pages) return null;

    for (const p of Object.values(pages) as any[]) {
      const info = p.imageinfo?.[0];
      if (!info) continue;
      const url = info.url as string;
      if (url.endsWith(".svg")) continue;
      if (info.width < 300 || info.height < 200) continue;
      const title = (p.title || "").toLowerCase();
      if (title.includes("flag") || title.includes("map") || title.includes("icon") ||
          title.includes("logo") || title.includes("seal") || title.includes("coat") ||
          title.includes("emblem") || title.includes("wiki")) continue;
      return info.thumburl || url;
    }
    return null;
  } catch {
    return null;
  }
}

async function main() {
  console.log("Connecting to MongoDB…");
  await mongoose.connect(process.env.MONGO_URI as string);
  console.log("Connected.\n");

  // Find all colleges and group by campusImages[0]
  const allColleges = await College.find(
    {},
    { name: 1, city: 1, state: 1, logo: 1, campusImages: 1, campusLife: 1 }
  ).lean();

  console.log(`Total colleges: ${allColleges.length}`);

  // Group by first campus image
  const imageGroups = new Map<string, typeof allColleges>();
  for (const c of allColleges) {
    const img = (c.campusImages as string[])?.[0];
    if (!img) continue;
    if (!imageGroups.has(img)) imageGroups.set(img, []);
    imageGroups.get(img)!.push(c);
  }

  // Filter to only groups with 2+ colleges (duplicates)
  const dupeGroups = [...imageGroups.entries()].filter(([_, colleges]) => colleges.length >= 2);
  const totalDupes = dupeGroups.reduce((sum, [_, cs]) => sum + cs.length, 0);

  console.log(`Duplicate groups: ${dupeGroups.length}`);
  console.log(`Total colleges with shared images: ${totalDupes}`);
  console.log();

  // Track all assigned images globally to avoid creating new duplicates
  const assignedImages = new Set<string>();
  for (const c of allColleges) {
    const img = (c.campusImages as string[])?.[0];
    if (img) assignedImages.add(img);
  }

  let fixed = 0, skipped = 0;

  for (const [sharedImg, colleges] of dupeGroups) {
    // Keep the first college's image, fix the rest
    for (let i = 1; i < colleges.length; i++) {
      const college = colleges[i]!;
      const name = college.name as string;
      const city = college.city as string;

      // Strategy 1: Use a different image from this college's existing gallery
      const existingImages = (college.campusImages as string[]) || [];
      let newImg: string | null = null;

      for (let j = 1; j < existingImages.length; j++) {
        if (!assignedImages.has(existingImages[j]!)) {
          newImg = existingImages[j]!;
          break;
        }
      }

      // Strategy 2: Try Commons search with specific name + city
      if (!newImg) {
        newImg = await searchCommonsUnique(`${name} ${city} campus`);
        if (newImg && assignedImages.has(newImg)) newImg = null;
        await sleep(500);
      }

      // Strategy 3: Use a unique Unsplash photo based on college name hash
      if (!newImg) {
        const idx = stableHash(name) % UNSPLASH_POOL.length;
        // Try multiple indices to avoid collisions
        for (let k = 0; k < UNSPLASH_POOL.length; k++) {
          const candidate = unsplashUrl(UNSPLASH_POOL[(idx + k) % UNSPLASH_POOL.length]!);
          if (!assignedImages.has(candidate)) {
            newImg = candidate;
            break;
          }
        }
      }

      if (!newImg) {
        skipped++;
        continue;
      }

      assignedImages.add(newImg);

      // Build update: swap campusImages[0] and update logo if it was the same
      const update: Record<string, any> = {
        campusImages: [newImg, ...existingImages.slice(1)],
      };

      // If logo was same as the shared image, update logo too
      if ((college.logo as string) === sharedImg) {
        update.logo = newImg;
      }

      // Update campusLife first image
      if (college.campusLife && (college.campusLife as any[]).length > 0) {
        update.campusLife = (college.campusLife as any[]).map((item: any, idx: number) => {
          if (idx === 0) return { ...item, image: newImg };
          return item;
        });
      }

      if (DRY_RUN) {
        console.log(`DRY: "${name}" → new unique image`);
      } else {
        await College.updateOne({ _id: college._id }, { $set: update });
        console.log(`FIXED: "${name}"`);
      }
      fixed++;

      await sleep(100);
    }
  }

  console.log(`\n${"═".repeat(50)}`);
  console.log(`Done! Fixed: ${fixed} | Skipped: ${skipped}`);
  console.log(`${"═".repeat(50)}`);

  await mongoose.disconnect();
}

main().catch((err) => {
  console.error("Fatal:", err);
  process.exit(1);
});
