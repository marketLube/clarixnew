import mongoose from 'mongoose';
import https from 'https';

const MONGO_URI = 'mongodb+srv://ajaydevmarketlube:WSCbaKW38pIGv8S2@cluster0.cd2yjhg.mongodb.net/?appName=Cluster0';

function checkUrl(url: string, timeout = 6000): Promise<number> {
  return new Promise((resolve) => {
    try {
      const u = new URL(url);
      const req = https.request({
        method: 'HEAD',
        hostname: u.hostname,
        path: u.pathname + u.search,
        headers: { 'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36' },
        timeout,
      }, (res) => {
        if (res.statusCode && res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
          const loc = res.headers.location.startsWith('http') ? res.headers.location : `https://${u.hostname}${res.headers.location}`;
          checkUrl(loc, timeout).then(resolve);
        } else {
          resolve(res.statusCode || 0);
        }
      });
      req.on('error', () => resolve(0));
      req.on('timeout', () => { req.destroy(); resolve(0); });
      req.end();
    } catch {
      resolve(0);
    }
  });
}

async function sleep(ms: number) { return new Promise(r => setTimeout(r, ms)); }

async function main() {
  process.stdout.write('=== CAREFUL IMAGE AUDIT (retry 429) ===\n');
  await mongoose.connect(MONGO_URI);
  const db = mongoose.connection.db!;

  const all = await db.collection('colleges').find({}, { projection: { name: 1, campusImages: 1 } }).toArray();
  process.stdout.write(`Total: ${all.length}\n`);

  // Batch 5 at a time with 200ms delay to avoid rate limiting
  const BATCH = 5;
  const truly404: any[] = [];
  const stillSuspect: any[] = [];
  let checked = 0;

  for (let i = 0; i < all.length; i += BATCH) {
    const batch = all.slice(i, i + BATCH);
    const results = await Promise.all(batch.map(async (c) => {
      const url = c.campusImages?.[0];
      if (!url) return { c, status: 0 };
      let status = await checkUrl(url);
      // Retry 429 after 2s
      if (status === 429) {
        await sleep(2000);
        status = await checkUrl(url);
      }
      return { c, status };
    }));

    for (const r of results) {
      checked++;
      if (r.status === 404 || r.status === 0) truly404.push(r);
      else if (r.status !== 200) stillSuspect.push(r);
    }

    await sleep(200);

    if (checked % 500 === 0 || i + BATCH >= all.length) {
      process.stdout.write(`Progress: ${checked}/${all.length} | 404/0: ${truly404.length} | suspect: ${stillSuspect.length}\n`);
    }
  }

  process.stdout.write(`\n=== TRULY BROKEN: ${truly404.length} ===\n`);
  for (const b of truly404.slice(0, 30)) {
    process.stdout.write(`  [${b.status}] ${b.c.name}: ${(b.c.campusImages?.[0] || '').substring(0, 80)}\n`);
  }
  process.stdout.write(`\n=== OTHER SUSPECT (non-200/404): ${stillSuspect.length} ===\n`);
  const statusCounts: Record<number, number> = {};
  for (const s of stillSuspect) statusCounts[s.status] = (statusCounts[s.status] || 0) + 1;
  for (const [s, c] of Object.entries(statusCounts)) process.stdout.write(`  ${s}: ${c}\n`);

  await mongoose.disconnect();
}

main().catch(e => { console.error(e); process.exit(1); });
