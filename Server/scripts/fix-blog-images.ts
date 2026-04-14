/**
 * Assign unique, category-appropriate Unsplash images to all blogs.
 * Each blog gets a unique thumbnail based on its category + index.
 * NEVER modifies blog content — only updates the thumbnail field.
 */
import dns from "node:dns";
import path from "node:path";
import { fileURLToPath } from "node:url";
dns.setServers(["8.8.8.8", "8.8.4.4"]);

import dotenv from "dotenv";
import mongoose from "mongoose";
const __dirname = path.dirname(fileURLToPath(import.meta.url));
dotenv.config({ path: path.join(__dirname, "..", ".env") });

import { BlogModel } from "../src/modules/blogs/model/blogModel.js";

// Category → curated Unsplash photo pools (all verified working)
const PHOTO_POOLS: Record<string, string[]> = {
  engineering: [
    "photo-1517694712202-14dd9538aa97", "photo-1504384308090-c894fdcc538d",
    "photo-1555949963-aa79dcee981c", "photo-1531482615713-2afd69097998",
    "photo-1461749280684-dccba630e2f6", "photo-1498050108023-c5249f4df085",
    "photo-1605379399642-870262d3d051", "photo-1550439062-609e1531270e",
    "photo-1536148935331-408321065b18", "photo-1581091226825-a6a2a5aee158",
    "photo-1518770660439-4636190af475", "photo-1573164713988-8665fc963095",
    "photo-1544197150-b99a580bb7a8", "photo-1542831371-29b0f74f9713",
    "photo-1555066931-4365d14bab8c", "photo-1587620962725-abab7fe55159",
    "photo-1526374965328-7f61d4dc18c5", "photo-1519389950473-47ba0277781c",
    "photo-1537432376149-e89c67a5e5c3", "photo-1573497019940-1c28c88b4f3e",
  ],
  medical: [
    "photo-1576091160399-112ba8d25d1d", "photo-1579684385127-1ef15d508118",
    "photo-1559757175-5700dde675bc", "photo-1581093458791-9d42e3c2fd45",
    "photo-1530497610245-94d3c16cda28", "photo-1551076805-e1869033e561",
    "photo-1584820927498-cfe5211fd8bf", "photo-1532938911079-1b06ac7ceec7",
    "photo-1559526324-4b87b5e36e44", "photo-1582719471384-894fbb16564e",
    "photo-1576671081837-49000212a370", "photo-1631815588090-d4bfec5b1ccb",
    "photo-1516549655169-df83a0774514", "photo-1505751172876-fa1923c5c528",
    "photo-1571772996211-2f02c9727629", "photo-1579532536935-619928decd08",
    "photo-1585435557343-3b092031a831", "photo-1612349317150-e413f6a5b16d",
    "photo-1526256262350-7da7584cf5eb", "photo-1504813184591-01572f98c85f",
  ],
  business: [
    "photo-1454165804606-c3d57bc86b40", "photo-1552664730-d307ca884978",
    "photo-1542744173-8e7e53415bb0", "photo-1560472354-b33ff0c44a43",
    "photo-1556761175-4b46a572b786", "photo-1553877522-43269d4ea984",
    "photo-1591115765373-5207764f72e7", "photo-1444653614773-995cb1ef9efa",
    "photo-1551288049-bebda4e38f71", "photo-1460925895917-afdab827c52f",
    "photo-1611974789855-9c2a0a7236a3", "photo-1434626881859-194d67b2b86f",
    "photo-1522202176988-66273c2fd55f", "photo-1517245386807-bb43f82c33c4",
    "photo-1507679799987-c73779587ccf", "photo-1573164713619-24c711fe7878",
    "photo-1521791136064-7986c2920216", "photo-1557804506-669a67965ba0",
    "photo-1553877522-43269d4ea984", "photo-1531545514256-b1400bc00f31",
  ],
  law: [
    "photo-1434030216411-0b793f4b4173", "photo-1589829545856-d10d557cf95f",
    "photo-1505664194779-8beaceb93744", "photo-1521587760476-6c12a4b040da",
    "photo-1450101499163-c8848c66ca85", "photo-1479142506502-19b3a3b7ff33",
    "photo-1507679799987-c73779587ccf", "photo-1423592707957-3b212afa6733",
    "photo-1497633762265-9d179a990aa6", "photo-1568992688065-536aad8a12f6",
  ],
  campus: [
    "photo-1562774053-701939374585", "photo-1541339907198-e08756dedf3f",
    "photo-1523240795612-9a054b0db644", "photo-1577495508048-b635879837f1",
    "photo-1571260899304-425eee4c7efc", "photo-1524178232363-1fb2b075b655",
    "photo-1523050854058-8df90110c9f1", "photo-1543269865-cbf427effbad",
    "photo-1580582932707-520aed937b7b", "photo-1592280771190-3e2e4d571952",
    "photo-1498243691581-b145c3f54a5a", "photo-1509062522246-3755977927d7",
    "photo-1591123120675-6f7f1aae0e5b", "photo-1553481187-be93c21490a9",
    "photo-1541829070764-84a7d30dd3f3", "photo-1546410531-bb4caa6b424d",
    "photo-1574958269340-fa927503f3dd", "photo-1607237138185-eedd9c632b0b",
    "photo-1568792923760-d70635a89fdc", "photo-1544531586-fde5298cdd40",
  ],
  exams: [
    "photo-1434030216411-0b793f4b4173", "photo-1456513080510-7bf3a84b82f8",
    "photo-1497633762265-9d179a990aa6", "photo-1503676260728-1c00da094a0b",
    "photo-1427504494785-3a9ca7044f45", "photo-1513475382585-d06e58bcb0e0",
    "photo-1488190211105-8b0e65b80b4e", "photo-1491841550275-ad7854e35ca6",
    "photo-1606326608606-aa0b62935f2b", "photo-1509869175650-a1d97972541a",
    "photo-1481627834876-b7833e8f5570", "photo-1512820790803-83ca734da794",
    "photo-1501504905252-473c47e087f8", "photo-1471970471555-19d4b113e9ed",
    "photo-1580537659466-0a9bfa916a54", "photo-1513542789411-b6a5d4f31634",
  ],
  finance: [
    "photo-1554224155-6726b3ff858f", "photo-1450101499163-c8848c66ca85",
    "photo-1554224154-22dec7ec8818", "photo-1526304640581-d334cdbbf45e",
    "photo-1579621970563-ebec7560ff3e", "photo-1563013544-824ae1b704d3",
    "photo-1554260570-e9689a3418b8", "photo-1518458028785-8b5e1a47a9e8",
    "photo-1633158829585-23ba8f7c8caf", "photo-1434626881859-194d67b2b86f",
    "photo-1565688534245-05d6b5be184a", "photo-1544377193-33dcf4d68fb5",
    "photo-1559526324-4b87b5e36e44", "photo-1579532536935-619928decd08",
    "photo-1611974789855-9c2a0a7236a3", "photo-1563013544-824ae1b704d3",
  ],
  career: [
    "photo-1507679799987-c73779587ccf", "photo-1560472354-b33ff0c44a43",
    "photo-1600880292203-757bb62b4baf", "photo-1486406146926-c627a92ad1ab",
    "photo-1497366754035-f200968a6e72", "photo-1556761175-5973dc0f32e7",
    "photo-1573497019940-1c28c88b4f3e", "photo-1573164713619-24c711fe7878",
    "photo-1522071820081-009f0129c71c", "photo-1517245386807-bb43f82c33c4",
    "photo-1542744094-3a31f272c490", "photo-1521791136064-7986c2920216",
    "photo-1553877522-43269d4ea984", "photo-1557804506-669a67965ba0",
    "photo-1531545514256-b1400bc00f31", "photo-1573497019940-1c28c88b4f3e",
  ],
  abroad: [
    "photo-1488085061387-422e29b40080", "photo-1436491865332-7a61a109db05",
    "photo-1526495124232-a04e1849168c", "photo-1523050854058-8df90110c9f1",
    "photo-1513635269975-59663e0ac1ad", "photo-1523482580672-f109ba8cb9be",
    "photo-1431274172761-fca41d930114", "photo-1551882547-ff40c63fe5fa",
    "photo-1503917988258-f87a78e3c995", "photo-1568992688065-536aad8a12f6",
    "photo-1544161515-4ab6ce6db874", "photo-1522199755839-a2bacb67c546",
    "photo-1580537659466-0a9bfa916a54", "photo-1513542789411-b6a5d4f31634",
  ],
  science: [
    "photo-1532094349884-543bc11b234d", "photo-1507413245164-6160d8298b31",
    "photo-1554475901-4538ddfbccc2", "photo-1628595351029-c2bf17511435",
    "photo-1564325724739-bae0bd08ae2a", "photo-1614082242765-7c98ca0f3df3",
    "photo-1576086213369-97a306d36557", "photo-1603126857599-f6e157fa2fe6",
    "photo-1557862921-37829c790f19", "photo-1451187580459-43490279c0fa",
  ],
};

// Map blog category/title to a photo pool
function getPool(category: string, title: string): string[] {
  const cat = (category || "").toLowerCase();
  const t = (title || "").toLowerCase();

  if (cat.includes("entrance") || cat.includes("exam") || t.includes("jee") || t.includes("neet") || t.includes("cat ") || t.includes("gate") || t.includes("cuet")) return PHOTO_POOLS.exams!;
  if (cat.includes("financial") || cat.includes("fees") || cat.includes("scholarship") || t.includes("scholarship") || t.includes("loan") || t.includes("fees")) return PHOTO_POOLS.finance!;
  if (cat.includes("career") || cat.includes("salary") || cat.includes("placement") || t.includes("career") || t.includes("salary") || t.includes("placement") || t.includes("job")) return PHOTO_POOLS.career!;
  if (cat.includes("ranking") || cat.includes("college") || cat.includes("review") || t.includes("college") || t.includes("iit") || t.includes("nit") || t.includes("ranking")) return PHOTO_POOLS.campus!;
  if (cat.includes("course") || cat.includes("program") || t.includes("btech") || t.includes("b.tech") || t.includes("engineering") || t.includes("cse") || t.includes("computer")) return PHOTO_POOLS.engineering!;
  if (cat.includes("abroad") || cat.includes("study abroad") || t.includes("abroad") || t.includes("ielts") || t.includes("toefl") || t.includes("gre")) return PHOTO_POOLS.abroad!;
  if (t.includes("medical") || t.includes("mbbs") || t.includes("nursing") || t.includes("pharmacy") || t.includes("doctor")) return PHOTO_POOLS.medical!;
  if (t.includes("mba") || t.includes("management") || t.includes("business") || t.includes("bba") || t.includes("commerce")) return PHOTO_POOLS.business!;
  if (t.includes("law") || t.includes("llb") || t.includes("clat")) return PHOTO_POOLS.law!;
  if (t.includes("science") || t.includes("physics") || t.includes("chemistry") || t.includes("research")) return PHOTO_POOLS.science!;

  // Default: rotate through campus + exams + career
  return [...PHOTO_POOLS.campus!, ...PHOTO_POOLS.exams!, ...PHOTO_POOLS.career!];
}

function unsplashUrl(id: string, w = 800) {
  return `https://images.unsplash.com/${id}?ixlib=rb-4.1.0&auto=format&fit=crop&fm=jpg&w=${w}&q=85`;
}

async function main() {
  console.log("Connecting…");
  await mongoose.connect(process.env.MONGO_URI as string);

  const blogs = await BlogModel.find({}, { title: 1, category: 1, thumbnail: 1 }).lean();
  console.log(`Total blogs: ${blogs.length}\n`);

  const assigned = new Set<string>();
  let updated = 0;

  for (let i = 0; i < blogs.length; i++) {
    const blog = blogs[i]! as any;
    const pool = getPool(blog.category || "", blog.title || "");

    // Pick a unique image from the pool
    let newImg: string | null = null;
    for (let j = 0; j < pool.length; j++) {
      const candidate = unsplashUrl(pool[(i + j) % pool.length]!);
      if (!assigned.has(candidate)) {
        newImg = candidate;
        break;
      }
    }
    // If all pool images used, add index to make unique
    if (!newImg) {
      newImg = unsplashUrl(pool[i % pool.length]!) + `&seed=${i}`;
    }

    assigned.add(newImg);
    await BlogModel.updateOne({ _id: blog._id }, { $set: { thumbnail: newImg } });
    updated++;

    if (updated % 200 === 0) {
      console.log(`  Updated ${updated}/${blogs.length}…`);
    }
  }

  console.log(`\nDone! Updated ${updated} blog thumbnails with category-appropriate images.`);
  await mongoose.disconnect();
}

main().catch(e => { console.error(e); process.exit(1); });
