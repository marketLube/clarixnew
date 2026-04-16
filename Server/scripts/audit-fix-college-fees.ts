import mongoose from 'mongoose';

const MONGO_URI = 'mongodb+srv://ajaydevmarketlube:WSCbaKW38pIGv8S2@cluster0.cd2yjhg.mongodb.net/?appName=Cluster0';

// Parse fee string like "₹1,50,000 - ₹4,50,000 / year" or "$30,000 - $55,000 / year"
function parseFeeRange(fee: string): { min: number; max: number; currency: string } | null {
  if (!fee || typeof fee !== 'string') return null;

  // Detect currency
  let currency = '₹';
  if (fee.includes('$')) currency = '$';
  else if (fee.includes('£')) currency = '£';
  else if (fee.includes('€')) currency = '€';
  else if (fee.includes('CAD')) currency = 'CAD';
  else if (fee.includes('AUD')) currency = 'AUD';
  else if (fee.includes('SGD')) currency = 'SGD';
  else if (fee.includes('¥')) currency = '¥';
  else if (fee.includes('₩')) currency = '₩';
  else if (fee.includes('CNY')) currency = 'CNY';
  else if (fee.includes('AED')) currency = 'AED';
  else if (fee.includes('MYR')) currency = 'MYR';
  else if (fee.includes('NZD')) currency = 'NZD';
  else if (fee.includes('SEK')) currency = 'SEK';

  // Extract numbers - handle L (lakh) and Cr (crore)
  const parseNum = (s: string): number => {
    const num = parseFloat(s.replace(/,/g, ''));
    if (isNaN(num)) return 0;
    const lower = s.toLowerCase();
    if (lower.includes('l')) return num * 100000; // lakh
    if (lower.includes('cr')) return num * 10000000; // crore
    return num;
  };

  // Extract all numbers
  const numMatches = fee.match(/[\d,]+(?:\.\d+)?(?:\s*(?:L|Cr|Lakh|Crore))?/gi) || [];
  if (numMatches.length === 0) return null;

  const nums = numMatches.map(parseNum).filter(n => n > 0);
  if (nums.length === 0) return null;

  return {
    min: Math.min(...nums),
    max: Math.max(...nums),
    currency,
  };
}

function formatFeeRange(min: number, max: number, currency: string): string {
  const fmt = (n: number): string => {
    if (currency === '₹') {
      if (n >= 10000000) return (n / 10000000).toFixed(1).replace('.0', '') + ' Cr';
      if (n >= 100000) return (n / 100000).toFixed(2).replace('.00', '') + 'L';
      return n.toLocaleString('en-IN');
    }
    return n.toLocaleString('en-US');
  };

  if (min === max) return `${currency}${fmt(min)} / year`;
  return `${currency}${fmt(min)} - ${currency}${fmt(max)} / year`;
}

async function main() {
  process.stdout.write('=== FEE AUDIT & FIX ===\n');
  await mongoose.connect(MONGO_URI);
  const db = mongoose.connection.db!;

  const colleges = await db.collection('colleges').find({}, {
    projection: { name: 1, country: 1, annualFee: 1, courseOfferings: 1 }
  }).toArray();

  process.stdout.write(`Total colleges: ${colleges.length}\n`);

  let mismatched = 0;
  let fixed = 0;
  const mismatches: any[] = [];

  for (const c of colleges) {
    if (!c.courseOfferings || c.courseOfferings.length === 0) continue;

    // Aggregate all course fees for this college
    const allMins: number[] = [];
    const allMaxs: number[] = [];
    let commonCurrency = '₹';

    for (const o of c.courseOfferings) {
      const range = parseFeeRange(o.fees);
      if (range) {
        allMins.push(range.min);
        allMaxs.push(range.max);
        if (range.currency !== '₹') commonCurrency = range.currency;
      }
    }

    if (allMins.length === 0) continue;

    const overallMin = Math.min(...allMins);
    const overallMax = Math.max(...allMaxs);

    // Compare against annualFee
    const currentRange = parseFeeRange(c.annualFee || '');
    const correctFee = formatFeeRange(overallMin, overallMax, commonCurrency);

    let needsFix = false;
    if (!currentRange) {
      needsFix = true;
    } else {
      // Check if currency mismatches
      if (currentRange.currency !== commonCurrency) needsFix = true;
      // Check if min/max significantly differ (>40% off)
      else if (Math.abs(currentRange.min - overallMin) / Math.max(overallMin, 1) > 0.4) needsFix = true;
      else if (Math.abs(currentRange.max - overallMax) / Math.max(overallMax, 1) > 0.4) needsFix = true;
    }

    if (needsFix) {
      mismatched++;
      if (mismatches.length < 10) {
        mismatches.push({
          name: c.name,
          country: c.country,
          current: c.annualFee,
          correct: correctFee,
          courseCount: c.courseOfferings.length,
        });
      }

      await db.collection('colleges').updateOne(
        { _id: c._id },
        { $set: { annualFee: correctFee, avgAnnualFee: correctFee } }
      );
      fixed++;
    }
  }

  process.stdout.write(`\n=== RESULTS ===\n`);
  process.stdout.write(`Mismatched fees found: ${mismatched}\n`);
  process.stdout.write(`Fixed: ${fixed}\n`);
  process.stdout.write(`\nSample mismatches (first 10):\n`);
  for (const m of mismatches) {
    process.stdout.write(`  ${m.name} (${m.country})\n`);
    process.stdout.write(`    Was: ${m.current}\n`);
    process.stdout.write(`    Now: ${m.correct} (from ${m.courseCount} courses)\n`);
  }

  // Final distribution
  const allFees = await db.collection('colleges').find({}, { projection: { annualFee: 1 } }).toArray();
  const feeCount = new Map<string, number>();
  for (const c of allFees) {
    feeCount.set(c.annualFee || 'NONE', (feeCount.get(c.annualFee || 'NONE') || 0) + 1);
  }
  const sorted = [...feeCount.entries()].sort((a, b) => b[1] - a[1]);
  process.stdout.write(`\n=== TOP 15 FEE RANGES ===\n`);
  for (const [fee, count] of sorted.slice(0, 15)) {
    process.stdout.write(`  ${count}: ${fee}\n`);
  }

  await mongoose.disconnect();
}

main().catch(e => { console.error(e); process.exit(1); });
