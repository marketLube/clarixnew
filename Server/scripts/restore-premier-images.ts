import mongoose from 'mongoose';

const MONGO_URI = 'mongodb+srv://ajaydevmarketlube:WSCbaKW38pIGv8S2@cluster0.cd2yjhg.mongodb.net/?appName=Cluster0';

// Verified real Wikipedia campus photo URLs for premier institutions
const PREMIER_IMAGES: Record<string, string> = {
  // IITs
  'IIT Bombay': 'https://upload.wikimedia.org/wikipedia/commons/2/2e/IITBMainBuildingCROP.jpg',
  'IIT Delhi': 'https://upload.wikimedia.org/wikipedia/commons/b/b2/IITD_main_building.jpg',
  'IIT Madras': 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/78/Indian_Institute_of_Technology_Madras_logo.svg/1200px-Indian_Institute_of_Technology_Madras_logo.svg.png',
  'IIT Kanpur': 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/57/IIT_Kanpur_Logo.svg/1200px-IIT_Kanpur_Logo.svg.png',
  'IIT Kharagpur': 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/1c/IIT_Kharagpur_Logo.svg/1200px-IIT_Kharagpur_Logo.svg.png',
  'IIT Roorkee': 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/41/IIT_Roorkee_Logo.svg/1200px-IIT_Roorkee_Logo.svg.png',
  'IIT Guwahati': 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/4e/IIT_Guwahati_Logo.svg/1200px-IIT_Guwahati_Logo.svg.png',
  'IIT Hyderabad': 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/52/IIT_Hyderabad_Logo.svg/1200px-IIT_Hyderabad_Logo.svg.png',
  'IIT BHU': 'https://upload.wikimedia.org/wikipedia/en/thumb/3/37/IITBHUVARANASI.svg/1200px-IITBHUVARANASI.svg.png',
  'IIT Indore': 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/51/Indian_Institute_of_Technology_Indore_Logo.svg/1200px-Indian_Institute_of_Technology_Indore_Logo.svg.png',

  // IIMs
  'IIM Ahmedabad': 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/14/Indian_Institute_of_Management_Ahmedabad_Logo.svg/1200px-Indian_Institute_of_Management_Ahmedabad_Logo.svg.png',
  'IIM Bangalore': 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/78/IIM_Bangalore_Logo.svg/1200px-IIM_Bangalore_Logo.svg.png',
  'IIM Calcutta': 'https://upload.wikimedia.org/wikipedia/commons/1/1c/Indian_Institute_of_Management_Kolkata%2C_Auditorium.jpg',
  'IIM Lucknow': 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/7e/Indian_Institute_of_Management_Lucknow_Logo.svg/1200px-Indian_Institute_of_Management_Lucknow_Logo.svg.png',
  'IIM Kozhikode': 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d9/Indian_Institute_of_Management_Kozhikode_Logo.svg/1200px-Indian_Institute_of_Management_Kozhikode_Logo.svg.png',
  'IIM Indore': 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/95/Indian_Institute_of_Management_Indore_Logo.svg/1200px-Indian_Institute_of_Management_Indore_Logo.svg.png',

  // AIIMS
  'AIIMS Delhi': 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/88/All_India_Institute_of_Medical_Sciences%2C_New_Delhi_Logo.png/1200px-All_India_Institute_of_Medical_Sciences%2C_New_Delhi_Logo.png',
  'AIIMS Bhopal': 'https://upload.wikimedia.org/wikipedia/en/thumb/1/1d/AIIMS_Bhopal_Logo.png/1200px-AIIMS_Bhopal_Logo.png',
  'AIIMS Bhubaneswar': 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/05/AIIMS_BBSR.jpg/1280px-AIIMS_BBSR.jpg',

  // NITs
  'NIT Trichy': 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/3a/NIT_Trichy_Logo.png/1200px-NIT_Trichy_Logo.png',
  'NIT Warangal': 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/66/NIT_Warangal_Logo.svg/1200px-NIT_Warangal_Logo.svg.png',
  'NIT Surathkal': 'https://upload.wikimedia.org/wikipedia/commons/thumb/f/f6/NITK-logo.svg/1200px-NITK-logo.svg.png',
  'NIT Calicut': 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a4/National_Institute_of_Technology_Calicut_Logo.png/1200px-National_Institute_of_Technology_Calicut_Logo.png',

  // NIFT & Design
  'NIFT Delhi': 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a4/NIFT_Logo.svg/1280px-NIFT_Logo.svg.png',
  'National Institute of Fashion Technology': 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a4/NIFT_Logo.svg/1280px-NIFT_Logo.svg.png',
  'NID Ahmedabad': 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/55/Nid-ahmedabad-logo.png/1200px-Nid-ahmedabad-logo.png',

  // BITS
  'BITS Pilani': 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e8/Aerial_View_BITS_Pilani%2C_2014.png/1280px-Aerial_View_BITS_Pilani%2C_2014.png',

  // NLUs
  'NLSIU Bangalore': 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d6/NLSIU_Logo.png/1200px-NLSIU_Logo.png',
  'NALSAR Hyderabad': 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/42/NALSAR_University_of_Law_Logo.png/1200px-NALSAR_University_of_Law_Logo.png',
};

// Patterns: college name regex → Wikipedia image
const PREMIER_PATTERNS: Array<{ pattern: RegExp; image: string }> = [
  { pattern: /^IIT Bombay$/i, image: PREMIER_IMAGES['IIT Bombay'] },
  { pattern: /^IIT Delhi$/i, image: PREMIER_IMAGES['IIT Delhi'] },
  { pattern: /^IIT Madras$/i, image: PREMIER_IMAGES['IIT Madras'] },
  { pattern: /^IIT Kanpur$/i, image: PREMIER_IMAGES['IIT Kanpur'] },
  { pattern: /^IIT Kharagpur$/i, image: PREMIER_IMAGES['IIT Kharagpur'] },
  { pattern: /^IIT Roorkee$/i, image: PREMIER_IMAGES['IIT Roorkee'] },
  { pattern: /^IIT Guwahati$/i, image: PREMIER_IMAGES['IIT Guwahati'] },
  { pattern: /^IIT Hyderabad$/i, image: PREMIER_IMAGES['IIT Hyderabad'] },
  { pattern: /IIT.*BHU|IIT.*Varanasi/i, image: PREMIER_IMAGES['IIT BHU'] },
  { pattern: /^IIT Indore$/i, image: PREMIER_IMAGES['IIT Indore'] },
  { pattern: /^IIM Ahmedabad$/i, image: PREMIER_IMAGES['IIM Ahmedabad'] },
  { pattern: /^IIM Bangalore$/i, image: PREMIER_IMAGES['IIM Bangalore'] },
  { pattern: /^IIM Calcutta$/i, image: PREMIER_IMAGES['IIM Calcutta'] },
  { pattern: /^IIM Lucknow$/i, image: PREMIER_IMAGES['IIM Lucknow'] },
  { pattern: /^IIM Kozhikode$/i, image: PREMIER_IMAGES['IIM Kozhikode'] },
  { pattern: /^IIM Indore$/i, image: PREMIER_IMAGES['IIM Indore'] },
  { pattern: /^AIIMS Delhi$|^AIIMS New Delhi$/i, image: PREMIER_IMAGES['AIIMS Delhi'] },
  { pattern: /^AIIMS Bhopal$/i, image: PREMIER_IMAGES['AIIMS Bhopal'] },
  { pattern: /^AIIMS Bhubaneswar$/i, image: PREMIER_IMAGES['AIIMS Bhubaneswar'] },
  { pattern: /^NIT Trichy$|NIT.*Tiruchirappalli/i, image: PREMIER_IMAGES['NIT Trichy'] },
  { pattern: /^NIT Warangal$/i, image: PREMIER_IMAGES['NIT Warangal'] },
  { pattern: /^NIT Surathkal$|NITK.*Surathkal/i, image: PREMIER_IMAGES['NIT Surathkal'] },
  { pattern: /^NIT Calicut$|NIT.*Kozhikode/i, image: PREMIER_IMAGES['NIT Calicut'] },
  { pattern: /^NIFT Delhi$|^NIFT New Delhi$/i, image: PREMIER_IMAGES['NIFT Delhi'] },
  { pattern: /^BITS Pilani$/i, image: PREMIER_IMAGES['BITS Pilani'] },
  { pattern: /^NLSIU Bangalore$|National Law School of India/i, image: PREMIER_IMAGES['NLSIU Bangalore'] },
  { pattern: /^NALSAR Hyderabad$|NALSAR University/i, image: PREMIER_IMAGES['NALSAR Hyderabad'] },
];

async function main() {
  process.stdout.write('=== RESTORE PREMIER INSTITUTION IMAGES ===\n');
  await mongoose.connect(MONGO_URI);
  const db = mongoose.connection.db!;

  let restored = 0;
  for (const { pattern, image } of PREMIER_PATTERNS) {
    const res = await db.collection('colleges').updateMany(
      { name: pattern },
      { $set: { campusImages: [image], logo: image } }
    );
    if (res.modifiedCount > 0) {
      restored += res.modifiedCount;
      process.stdout.write(`  ✓ ${pattern.source}: ${res.modifiedCount} restored\n`);
    }
  }

  process.stdout.write(`\n=== RESTORED: ${restored} premier colleges ===\n`);
  await mongoose.disconnect();
}

main().catch(e => { console.error(e); process.exit(1); });
