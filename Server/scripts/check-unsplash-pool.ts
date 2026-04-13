/**
 * Verifies every id in VERIFIED_UNSPLASH_IDS returns HTTP 200.
 * Run from Server/:  npx tsx scripts/check-unsplash-pool.ts
 */
import { VERIFIED_UNSPLASH_IDS, unsplashUrl } from "./lib/verified-unsplash.js";

const fail: string[] = [];

async function main() {
  for (const id of VERIFIED_UNSPLASH_IDS) {
    const url = unsplashUrl(id, 200);
    const res = await fetch(url, { method: "HEAD", signal: AbortSignal.timeout(15000) });
    const ok = res.ok;
    console.log(`${res.status} ${id}`);
    if (!ok) fail.push(id);
  }
  if (fail.length) {
    console.error("FAILED:", fail);
    process.exit(1);
  }
  console.log(`All ${VERIFIED_UNSPLASH_IDS.length} images OK.`);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
