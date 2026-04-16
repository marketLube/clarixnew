import mongoose from 'mongoose';

const MONGO_URI = 'mongodb+srv://ajaydevmarketlube:WSCbaKW38pIGv8S2@cluster0.cd2yjhg.mongodb.net/?appName=Cluster0';

// Reusable image pools per category
const IMAGE_POOLS: Record<string, string[]> = {
  computer_science: [
    'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=1280&q=80',
    'https://images.unsplash.com/photo-1518770660439-4636190af475?w=1280&q=80',
    'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=1280&q=80',
    'https://images.unsplash.com/photo-1542831371-29b0f74f9713?w=1280&q=80',
    'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=1280&q=80',
  ],
  electronics: [
    'https://images.unsplash.com/photo-1562408590-e32931084e23?w=1280&q=80',
    'https://images.unsplash.com/photo-1581092335397-9583eb92d232?w=1280&q=80',
    'https://images.unsplash.com/photo-1555664424-778a1e5e1b48?w=1280&q=80',
  ],
  electrical: [
    'https://images.unsplash.com/photo-1581094288338-2314dddb7ece?w=1280&q=80',
    'https://images.unsplash.com/photo-1497435334941-8c899ee9e8e9?w=1280&q=80',
    'https://images.unsplash.com/photo-1581092160562-40aa08e78837?w=1280&q=80',
  ],
  mechanical: [
    'https://images.unsplash.com/photo-1635070041078-e363dbe005cb?w=1280&q=80',
    'https://images.unsplash.com/photo-1581092160562-40aa08e78837?w=1280&q=80',
    'https://images.unsplash.com/photo-1565008447742-97f6f38c985c?w=1280&q=80',
  ],
  civil: [
    'https://images.unsplash.com/photo-1517089596392-fb9a9033e05b?w=1280&q=80',
    'https://images.unsplash.com/photo-1503387762-592deb58ef4e?w=1280&q=80',
    'https://images.unsplash.com/photo-1448630360428-65456885c650?w=1280&q=80',
  ],
  chemical: [
    'https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?w=1280&q=80',
    'https://images.unsplash.com/photo-1554475901-4538ddfbccc2?w=1280&q=80',
  ],
  biotechnology: [
    'https://images.unsplash.com/photo-1576086213369-97a306d36557?w=1280&q=80',
    'https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?w=1280&q=80',
    'https://images.unsplash.com/photo-1582719471384-894fbb16e074?w=1280&q=80',
  ],
  aerospace: [
    'https://images.unsplash.com/photo-1436491865332-7a61a109cc05?w=1280&q=80',
    'https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=1280&q=80',
  ],
  ai_ml: [
    'https://images.unsplash.com/photo-1620712943543-bcc4688e7485?w=1280&q=80',
    'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=1280&q=80',
    'https://images.unsplash.com/photo-1677756119517-756a188d2d94?w=1280&q=80',
  ],
  data_science: [
    'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1280&q=80',
    'https://images.unsplash.com/photo-1543286386-713bdd548da4?w=1280&q=80',
    'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1280&q=80',
  ],
  cyber_security: [
    'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=1280&q=80',
    'https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=1280&q=80',
  ],
  robotics: [
    'https://images.unsplash.com/photo-1535378917042-10a22c95931a?w=1280&q=80',
    'https://images.unsplash.com/photo-1518770660439-4636190af475?w=1280&q=80',
  ],
  mba: [
    'https://images.unsplash.com/photo-1521791136064-7986c2920216?w=1280&q=80',
    'https://images.unsplash.com/photo-1556761175-5973dc0f32e7?w=1280&q=80',
    'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=1280&q=80',
    'https://images.unsplash.com/photo-1573164713714-d95e436ab8d6?w=1280&q=80',
  ],
  finance: [
    'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=1280&q=80',
    'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=1280&q=80',
    'https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=1280&q=80',
  ],
  marketing: [
    'https://images.unsplash.com/photo-1432888622747-4eb9a8efeb07?w=1280&q=80',
    'https://images.unsplash.com/photo-1542744095-291d1f67b221?w=1280&q=80',
  ],
  hr: [
    'https://images.unsplash.com/photo-1521737711867-e3b97375f902?w=1280&q=80',
    'https://images.unsplash.com/photo-1573164713988-8665fc963095?w=1280&q=80',
  ],
  hotel_management: [
    'https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=1280&q=80',
    'https://images.unsplash.com/photo-1564501049412-61c2a3083791?w=1280&q=80',
    'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?w=1280&q=80',
  ],
  hospitality: [
    'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=1280&q=80',
    'https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=1280&q=80',
  ],
  medical: [
    'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=1280&q=80',
    'https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=1280&q=80',
    'https://images.unsplash.com/photo-1631815587646-b85a1bb027e1?w=1280&q=80',
  ],
  dental: [
    'https://images.unsplash.com/photo-1606811971618-4486d14f3f99?w=1280&q=80',
    'https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?w=1280&q=80',
  ],
  nursing: [
    'https://images.unsplash.com/photo-1631217872822-1c2546d6b864?w=1280&q=80',
    'https://images.unsplash.com/photo-1584467735815-f778f274e296?w=1280&q=80',
  ],
  pharmacy: [
    'https://images.unsplash.com/photo-1587854692152-cbe660dbde88?w=1280&q=80',
    'https://images.unsplash.com/photo-1576602975754-91cc9e95cdfb?w=1280&q=80',
    'https://images.unsplash.com/photo-1471864190281-a93a3070b6de?w=1280&q=80',
  ],
  ayurveda: [
    'https://images.unsplash.com/photo-1532012197267-da84d127e765?w=1280&q=80',
    'https://images.unsplash.com/photo-1597845232305-dd62f7c80fa0?w=1280&q=80',
  ],
  physiotherapy: [
    'https://images.unsplash.com/photo-1559757175-5700dde675bc?w=1280&q=80',
    'https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=1280&q=80',
  ],
  law: [
    'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=1280&q=80',
    'https://images.unsplash.com/photo-1505664194779-8beaceb93744?w=1280&q=80',
    'https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=1280&q=80',
  ],
  commerce: [
    'https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=1280&q=80',
    'https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=1280&q=80',
  ],
  physics: [
    'https://images.unsplash.com/photo-1635070041078-e363dbe005cb?w=1280&q=80',
    'https://images.unsplash.com/photo-1532094349884-543bc11b234d?w=1280&q=80',
  ],
  chemistry: [
    'https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?w=1280&q=80',
    'https://images.unsplash.com/photo-1554475901-4538ddfbccc2?w=1280&q=80',
  ],
  mathematics: [
    'https://images.unsplash.com/photo-1635070041078-e363dbe005cb?w=1280&q=80',
    'https://images.unsplash.com/photo-1509228627152-72ae9ae6848d?w=1280&q=80',
  ],
  biology: [
    'https://images.unsplash.com/photo-1576086213369-97a306d36557?w=1280&q=80',
    'https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?w=1280&q=80',
  ],
  arts: [
    'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=1280&q=80',
    'https://images.unsplash.com/photo-1521587760476-6c12a4b040da?w=1280&q=80',
    'https://images.unsplash.com/photo-1568667256549-094345857637?w=1280&q=80',
  ],
  design: [
    'https://images.unsplash.com/photo-1561070791-2526d30994b8?w=1280&q=80',
    'https://images.unsplash.com/photo-1558655146-9f40138edfeb?w=1280&q=80',
    'https://images.unsplash.com/photo-1557804506-669a67965ba0?w=1280&q=80',
  ],
  fashion: [
    'https://images.unsplash.com/photo-1558769132-cb1aea458c5e?w=1280&q=80',
    'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=1280&q=80',
  ],
  architecture: [
    'https://images.unsplash.com/photo-1487958449943-2429e8be8625?w=1280&q=80',
    'https://images.unsplash.com/photo-1503387762-592deb58ef4e?w=1280&q=80',
    'https://images.unsplash.com/photo-1486718448742-163732cd1544?w=1280&q=80',
  ],
  agriculture: [
    'https://images.unsplash.com/photo-1574943320219-553eb213f72d?w=1280&q=80',
    'https://images.unsplash.com/photo-1500595046743-cd271d694d30?w=1280&q=80',
    'https://images.unsplash.com/photo-1625246333195-78d9c38ad449?w=1280&q=80',
  ],
  veterinary: [
    'https://images.unsplash.com/photo-1583337130417-3346a1be7dee?w=1280&q=80',
    'https://images.unsplash.com/photo-1601758228041-f3b2795255f1?w=1280&q=80',
  ],
  education: [
    'https://images.unsplash.com/photo-1497486751825-1233686d5d80?w=1280&q=80',
    'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=1280&q=80',
    'https://images.unsplash.com/photo-1577896851231-70ef18881754?w=1280&q=80',
  ],
  aviation: [
    'https://images.unsplash.com/photo-1436491865332-7a61a109cc05?w=1280&q=80',
    'https://images.unsplash.com/photo-1540979388789-6cee28a1cdc9?w=1280&q=80',
  ],
  diploma: [
    'https://images.unsplash.com/photo-1581092580497-e0d23cbdf1dc?w=1280&q=80',
    'https://images.unsplash.com/photo-1581094288338-2314dddb7ece?w=1280&q=80',
  ],
  general: [
    'https://images.unsplash.com/photo-1517486808906-6ca8b3f04846?w=1280&q=80',
    'https://images.unsplash.com/photo-1523580494863-6f3031224c94?w=1280&q=80',
  ],
};

function getImageCategory(courseName: string): string {
  const n = courseName.toLowerCase();
  if (n.includes('computer science') || n.includes('information technology') || n.includes('software')) return 'computer_science';
  if (n.includes('artificial intelligence') || n.includes('machine learning')) return 'ai_ml';
  if (n.includes('data science') || n.includes('analytics')) return 'data_science';
  if (n.includes('cyber security')) return 'cyber_security';
  if (n.includes('robotics') || n.includes('mechatronics')) return 'robotics';
  if (n.includes('electronics') || n.includes('communication') || n.includes('vlsi')) return 'electronics';
  if (n.includes('electrical')) return 'electrical';
  if (n.includes('mechanical') || n.includes('automobile') || n.includes('aerospace') && !n.includes('aero')) return 'mechanical';
  if (n.includes('civil') || n.includes('construction') || n.includes('structural')) return 'civil';
  if (n.includes('chemical')) return 'chemical';
  if (n.includes('aerospace') || n.includes('aeronautical')) return 'aerospace';
  if (n.includes('biotechnology') || n.includes('genetic') || n.includes('bioengineering')) return 'biotechnology';
  if (n.includes('mba finance') || n.includes('finance') || n.includes('accounting')) return 'finance';
  if (n.includes('mba marketing') || n.includes('marketing')) return 'marketing';
  if (n.includes('mba human') || n.includes('hr ')) return 'hr';
  if (n.includes('mba') || n.includes('pgdm') || n.includes('bba') || n.includes('management')) return 'mba';
  if (n.includes('hotel') || n.includes('catering') || n.includes('hospitality')) return 'hotel_management';
  if (n.includes('tourism')) return 'hospitality';
  if (n.includes('mbbs') || n.includes('md ') || n.includes('ms ') || n.includes('medicine') || n.includes('surgery')) return 'medical';
  if (n.includes('dental') || n.includes('bds') || n.includes('mds')) return 'dental';
  if (n.includes('nursing') || n.includes('gnm') || n.includes('anm')) return 'nursing';
  if (n.includes('pharmacy') || n.includes('pharm')) return 'pharmacy';
  if (n.includes('ayurv') || n.includes('homoeo') || n.includes('unani') || n.includes('siddha') || n.includes('naturopathy')) return 'ayurveda';
  if (n.includes('physiotherapy') || n.includes('physical therapy')) return 'physiotherapy';
  if (n.includes('llb') || n.includes('llm') || n.includes('law')) return 'law';
  if (n.includes('b.com') || n.includes('m.com') || n.includes('commerce') || n.includes('ca ') || n.includes('cma') || n.includes('cs ')) return 'commerce';
  if (n.includes('physics')) return 'physics';
  if (n.includes('chemistry')) return 'chemistry';
  if (n.includes('mathematics') || n.includes('statistics')) return 'mathematics';
  if (n.includes('biology') || n.includes('botany') || n.includes('zoology') || n.includes('microbiology')) return 'biology';
  if (n.includes('fashion')) return 'fashion';
  if (n.includes('design') || n.includes('b.des') || n.includes('m.des') || n.includes('bfa') || n.includes('mfa')) return 'design';
  if (n.includes('architecture') || n.includes('b.arch') || n.includes('m.arch') || n.includes('planning')) return 'architecture';
  if (n.includes('agriculture') || n.includes('horticulture') || n.includes('forestry') || n.includes('fisheries') || n.includes('dairy')) return 'agriculture';
  if (n.includes('veterinary') || n.includes('b.v.sc')) return 'veterinary';
  if (n.includes('b.ed') || n.includes('m.ed') || n.includes('education') || n.includes('teacher')) return 'education';
  if (n.includes('aviation') || n.includes('cabin crew') || n.includes('pilot')) return 'aviation';
  if (n.includes('diploma') || n.includes('polytechnic') || n.includes('certificate')) return 'diploma';
  if (n.includes('ba ') || n.includes('ma ') || n.includes('arts') || n.includes('english') || n.includes('history') || n.includes('hindi') || n.includes('tamil') || n.includes('sanskrit')) return 'arts';
  return 'general';
}

function getImage(courseName: string): string {
  const cat = getImageCategory(courseName);
  const pool = IMAGE_POOLS[cat] || IMAGE_POOLS['general'];
  const seed = courseName.split('').reduce((s, c) => s + c.charCodeAt(0), 0);
  return pool[seed % pool.length];
}

// Generate description based on course name
function generateDescription(name: string): { title: string; content: string; image: string } {
  const img = getImage(name);
  const title = `About ${name}`;

  let content: string;
  const n = name.toLowerCase();

  if (n.startsWith('b.tech')) {
    const branch = name.replace(/^B\.Tech\s*/i, '');
    content = `Bachelor of Technology in ${branch} is a 4-year undergraduate engineering program designed to provide students with strong technical foundations and hands-on experience. The curriculum combines theoretical knowledge with practical lab work, industry projects, and mandatory internships. Students learn core engineering principles, ${branch.toLowerCase()} specializations, modern tools and software, and develop problem-solving skills demanded by industry. Graduates pursue careers in research, design, manufacturing, consulting, and management across multinational corporations and startups.`;
  } else if (n.startsWith('m.tech')) {
    const branch = name.replace(/^M\.Tech\s*/i, '');
    content = `Master of Technology in ${branch} is a 2-year postgraduate program offering specialized knowledge and advanced research opportunities. Students engage in deep technical coursework, conduct original research under faculty guidance, and complete a thesis. The program develops expertise in ${branch.toLowerCase()}, prepares students for R&D roles, doctoral studies, and senior technical positions in industry. Many programs require GATE qualification and offer scholarships to qualified candidates.`;
  } else if (n === 'mbbs (bachelor of medicine, bachelor of surgery)') {
    content = `MBBS is a 5.5-year undergraduate medical degree (4.5 years academic + 1 year mandatory internship). The curriculum covers Anatomy, Physiology, Biochemistry, Pharmacology, Pathology, Microbiology, Forensic Medicine, Community Medicine, and clinical subjects including Internal Medicine, Surgery, Pediatrics, Obstetrics & Gynecology. Graduates can practice as doctors, pursue postgraduate specializations (MD/MS), or work in hospitals, clinics, public health, and medical research.`;
  } else if (n.startsWith('md ')) {
    const spec = name.replace(/^MD\s*/i, '');
    content = `Doctor of Medicine in ${spec} is a 3-year postgraduate medical program for MBBS doctors. Through structured coursework, clinical rotations, case presentations, and research, students develop advanced expertise in ${spec.toLowerCase()}. Requires NEET-PG qualification. Graduates become consultants in hospitals, set up specialty practices, teach at medical colleges, or pursue super-specialty (DM) programs.`;
  } else if (n.startsWith('ms ')) {
    const spec = name.replace(/^MS\s*/i, '');
    content = `Master of Surgery in ${spec} is a 3-year postgraduate surgical program. Students gain surgical expertise through extensive operating room experience, clinical management, and research. Requires NEET-PG qualification and MBBS. Graduates become surgical consultants, can pursue super-specialty (M.Ch) training, or work in academic medical centers.`;
  } else if (n.startsWith('mds ')) {
    const spec = name.replace(/^MDS\s*/i, '');
    content = `Master of Dental Surgery in ${spec} is a 3-year postgraduate dental program for BDS graduates. The curriculum combines advanced clinical training with research in ${spec.toLowerCase()}. Graduates become specialist dentists, run practices, or join hospitals and dental colleges.`;
  } else if (n.startsWith('mba')) {
    const spec = name.replace(/^MBA\s*/i, '');
    const specPart = spec ? ` with specialization in ${spec}` : '';
    content = `Master of Business Administration${specPart} is a 2-year postgraduate management program covering core business functions: Finance, Marketing, Operations, HR, Strategy, and Analytics. Students develop leadership skills through case studies, group projects, internships, and consulting opportunities. Top programs offer global immersion and industry mentorship. MBA graduates are recruited by consulting firms (McKinsey, BCG, Bain), investment banks, FMCG companies, tech firms, and startups.`;
  } else if (n.startsWith('pgdm')) {
    content = `Post Graduate Diploma in Management is a 2-year industry-oriented management program offered by autonomous institutes. PGDM curriculum is regularly updated to reflect industry trends, with greater flexibility than university MBA programs. Includes case studies, live projects, summer internships, and international exchange opportunities. Top PGDM programs (IIMs, ISB, XLRI) offer placements with top consulting and finance firms.`;
  } else if (n.startsWith('executive mba')) {
    content = `Executive MBA is a 1-2 year program designed for working professionals with 5+ years of experience. Classes are typically conducted on weekends or in modular format. Curriculum focuses on strategic thinking, leadership, and senior management capabilities. Students benefit from peer learning across diverse industries and grow into C-suite roles.`;
  } else if (n.startsWith('bba')) {
    const spec = name.replace(/^BBA\s*/i, '');
    const specPart = spec ? ` with specialization in ${spec}` : '';
    content = `Bachelor of Business Administration${specPart} is a 3-year undergraduate program providing foundational knowledge in business and management. The curriculum covers Marketing, Finance, HR, Operations, Economics, and Business Communication. Students gain practical exposure through case studies, internships, and industry projects. Graduates pursue careers in management trainee programs, sales, marketing, banking, or continue with MBA.`;
  } else if (n.startsWith('bds')) {
    content = `Bachelor of Dental Surgery is a 5-year undergraduate dental program (4 years academic + 1 year internship). Curriculum covers Dental Anatomy, Oral Pathology, Periodontics, Oral Surgery, Orthodontics, Conservative Dentistry, and Public Health Dentistry. Graduates become licensed dentists and can pursue MDS specialization or set up clinical practice.`;
  } else if (n.startsWith('bams') || n.startsWith('bhms') || n.startsWith('bums') || n.startsWith('bsms') || n.startsWith('bnys')) {
    const sys = n.startsWith('bams') ? 'Ayurvedic' : n.startsWith('bhms') ? 'Homoeopathic' : n.startsWith('bums') ? 'Unani' : n.startsWith('bsms') ? 'Siddha' : 'Naturopathy & Yogic Sciences';
    content = `${sys} medical bachelor's program (5.5 years including internship) provides comprehensive training in traditional Indian systems of medicine integrated with modern medical sciences. Students study traditional principles, drug formulations, diagnostic methods, treatment protocols, and undergo extensive clinical practice. Graduates can practice as registered medical practitioners, pursue postgraduate studies, or work in research and pharmaceutical industries.`;
  } else if (n.startsWith('bpt')) {
    content = `Bachelor of Physiotherapy is a 4.5-year program (3.5 years academic + 1 year internship) preparing students to assess and treat physical impairments. Curriculum covers Anatomy, Physiology, Exercise Therapy, Electrotherapy, Sports Physiotherapy, Cardiopulmonary, Neurological, and Orthopedic Physiotherapy. Graduates work in hospitals, sports teams, rehabilitation centers, or set up private clinics.`;
  } else if (n.startsWith('b.sc nursing') || n.startsWith('m.sc nursing')) {
    content = `${name} is a comprehensive program preparing skilled nursing professionals. The curriculum covers Anatomy, Physiology, Microbiology, Nursing Foundation, Medical-Surgical Nursing, Community Health, Mental Health, and Pediatric Nursing with extensive clinical rotations. Graduates work in hospitals, clinics, community health centers, and can specialize in critical care, oncology, pediatrics, or pursue teaching careers.`;
  } else if (n.startsWith('b.pharm')) {
    content = `Bachelor of Pharmacy is a 4-year undergraduate program in pharmaceutical sciences. Students study Pharmaceutical Chemistry, Pharmacology, Pharmaceutics, Pharmacognosy, Pharmaceutical Analysis, and Hospital Pharmacy. Includes industrial training and project work. Graduates work in pharmaceutical companies (R&D, production, QA, marketing), hospitals, regulatory bodies, or pursue M.Pharm/Pharm.D for advanced roles.`;
  } else if (n.startsWith('m.pharm')) {
    const spec = name.replace(/^M\.Pharm\s*/i, '');
    content = `Master of Pharmacy in ${spec || 'Pharmaceutical Sciences'} is a 2-year postgraduate program offering specialized expertise. Students conduct advanced research, work on industry-relevant projects, and develop deep technical knowledge. Graduates take senior positions in pharma companies, regulatory affairs, clinical research, or pursue PhD.`;
  } else if (n.startsWith('pharm.d')) {
    content = `Doctor of Pharmacy is a 6-year clinical pharmacy program (5 years academic + 1 year internship) emphasizing patient-centered care. Curriculum integrates pharmaceutical sciences with clinical training in hospital settings. Pharm.D graduates work as clinical pharmacists, drug safety associates, or in pharmaceutical research with significantly higher earning potential than B.Pharm.`;
  } else if (n.includes('llb')) {
    content = `${name} is a comprehensive law program covering Constitutional Law, Contract Law, Criminal Law, Tort Law, Family Law, Property Law, Corporate Law, International Law, and Jurisprudence. Students develop legal reasoning, drafting, and advocacy skills through moot courts, internships at law firms, and research projects. Graduates qualify to practice law after passing the All India Bar Examination.`;
  } else if (n.startsWith('llm')) {
    const spec = name.replace(/^LLM\s*/i, '');
    content = `Master of Laws in ${spec || 'specialized legal practice'} is a 1-2 year postgraduate law program offering deep expertise. Students undertake advanced research, comparative legal studies, and dissertation work. LLM graduates pursue careers as senior advocates, corporate counsel, judicial services, academia, or international legal organizations.`;
  } else if (n.startsWith('b.com')) {
    content = `${name} is a 3-year undergraduate program in commerce covering Financial Accounting, Cost Accounting, Business Law, Economics, Taxation, Auditing, Statistics, and Corporate Accounting. Students gain practical knowledge of business operations, financial reporting, and analysis. Graduates pursue careers in accounting, banking, finance, taxation, or continue with MBA, CA, CMA, or CS.`;
  } else if (n.startsWith('m.com')) {
    content = `Master of Commerce is a 2-year postgraduate program advancing commerce knowledge in finance, accounting, taxation, banking, and business analytics. Includes research methodology and dissertation work. Graduates pursue teaching careers, banking sector, financial analysis roles, or doctoral studies.`;
  } else if (n.startsWith('b.sc')) {
    const subject = name.replace(/^B\.Sc\.?\s*/i, '').replace(/\(Honours\)/i, '').trim();
    content = `Bachelor of Science in ${subject} is a 3-year undergraduate program providing strong scientific foundation. Coursework includes theoretical knowledge, laboratory practice, projects, and seminars. Students develop analytical thinking, research aptitude, and technical skills. Graduates can pursue M.Sc, work in research labs, teaching, scientific industries, or shift to applied fields like data science, analytics, and management.`;
  } else if (n.startsWith('m.sc')) {
    const subject = name.replace(/^M\.Sc\.?\s*/i, '').trim();
    content = `Master of Science in ${subject} is a 2-year postgraduate program offering advanced theoretical and practical knowledge. Students engage in specialized coursework, conduct independent research, and complete a dissertation. Graduates pursue PhD studies, work in research institutions, biotech/pharma companies, government scientific departments, or specialized industry roles.`;
  } else if (n.startsWith('bca')) {
    content = `${name} is a 3-year undergraduate program in computer applications covering Programming (C, Java, Python), Data Structures, Database Management, Web Development, Operating Systems, Computer Networks, and Software Engineering. Includes hands-on projects and internships. Graduates pursue careers in software development, web design, IT support, or continue with MCA for advanced roles.`;
  } else if (n.startsWith('mca')) {
    content = `Master of Computer Applications is a 2-year postgraduate program in advanced computer applications. Curriculum covers Advanced Programming, Software Engineering, Database Systems, Computer Networks, Web Technologies, Mobile Application Development, and elective specializations. Includes industrial projects. MCA graduates work as software developers, system analysts, project managers, or technical consultants.`;
  } else if (n.startsWith('ba ') || n === 'ba (bachelor of arts)') {
    const subject = name.replace(/^BA\s*/i, '').replace(/\(Honours\)/i, '').trim();
    content = `Bachelor of Arts${subject ? ` in ${subject}` : ''} is a 3-year undergraduate program in humanities and social sciences. Students develop critical thinking, communication skills, cultural awareness, and analytical abilities. Coursework includes lectures, seminars, research papers, and projects. Graduates pursue careers in journalism, civil services, teaching, content writing, social work, or continue with MA, MBA, or law.`;
  } else if (n.startsWith('ma ') || n === 'ma (master of arts)') {
    const subject = name.replace(/^MA\s*/i, '').trim();
    content = `Master of Arts${subject ? ` in ${subject}` : ''} is a 2-year postgraduate humanities/social sciences program. Students engage in advanced coursework, research methodology, and dissertation work. Graduates pursue teaching, civil services, research positions, journalism, NGO leadership, or PhD studies.`;
  } else if (n.startsWith('b.des')) {
    const spec = name.replace(/^B\.Des\s*/i, '').trim();
    content = `Bachelor of Design${spec ? ` in ${spec}` : ''} is a 4-year undergraduate program at the intersection of creativity, technology, and business. Students develop design thinking, hands-on prototyping skills, knowledge of materials, and software proficiency. Curriculum includes studio work, industry workshops, internships, and design portfolio development. Graduates work as designers in fashion, products, UX/UI, communication, animation, or as entrepreneurs.`;
  } else if (n.startsWith('m.des')) {
    content = `Master of Design is a 2-year postgraduate program for advanced design education. Students undertake specialized projects, research, and develop expertise in their chosen design domain. Includes industry collaboration, thesis project, and portfolio refinement. Graduates work in senior design roles, lead design teams, or start their own studios.`;
  } else if (n.startsWith('bfa') || n.startsWith('mfa')) {
    content = `${name} is a comprehensive fine arts program developing artistic expression and technical mastery. Students explore painting, sculpture, drawing, printmaking, applied arts, and digital media. Includes art history, theory, and exhibition opportunities. Graduates work as professional artists, art educators, gallery curators, illustrators, or art directors.`;
  } else if (n.startsWith('b.arch') || n.startsWith('m.arch')) {
    content = `${name} is an architecture program combining design, engineering, history, and sustainability. Students develop spatial reasoning through studio work, architectural drawing, model-making, computer-aided design, and construction technology courses. Includes site visits, internships, and thesis projects. Architects work on residential, commercial, institutional, and urban design projects.`;
  } else if (n.startsWith('b.ed') || n.startsWith('m.ed') || n.startsWith('b.p.ed') || n.startsWith('m.p.ed')) {
    content = `${name} is a teacher education program developing pedagogical skills, subject mastery, and educational psychology. Students learn curriculum design, teaching methodology, classroom management, assessment, and educational technology. Includes practice teaching at partner schools and educational research projects. Graduates qualify for teaching positions in schools and pursue advanced studies in education.`;
  } else if (n.includes('hotel') || n.includes('hospitality')) {
    content = `${name} prepares students for the dynamic hospitality industry. Curriculum covers Food Production, Food & Beverage Service, Front Office Operations, Housekeeping, Hotel Accounting, Marketing, and Human Resource Management. Includes hands-on training, industry internships at top hotels, and exposure to international hospitality standards. Graduates work in hotels, restaurants, cruise lines, airlines, event management, and tourism organizations worldwide.`;
  } else if (n.includes('aviation') || n.includes('pilot') || n.includes('cabin crew')) {
    content = `${name} is an aviation industry program covering aviation operations, regulations, customer service, ground handling, safety procedures, and aviation management. Includes industry simulations, airport visits, and certification training. Graduates work as cabin crew, ground staff, aviation managers, airport operations, or pursue further pilot training.`;
  } else if (n.startsWith('b.sc agriculture') || n.startsWith('m.sc agriculture') || n.includes('horticulture') || n.includes('forestry') || n.includes('fisheries')) {
    content = `${name} is a comprehensive agricultural sciences program covering crop production, soil science, plant pathology, agricultural economics, animal husbandry, and modern agricultural technology. Includes field training, research projects, and agribusiness exposure. Graduates work with government agriculture departments, agribusinesses, banks (agri loans), research institutes, NGOs, or as agri-entrepreneurs.`;
  } else if (n.includes('veterinary')) {
    content = `${name} is a 5-year program training animal healthcare professionals. Students study Veterinary Anatomy, Physiology, Pathology, Pharmacology, Animal Diseases, Surgery, and Animal Husbandry. Includes extensive clinical training. Graduates work as veterinarians at clinics, dairy farms, poultry industry, wildlife conservation, government services, or pursue advanced specializations.`;
  } else if (n.startsWith('phd')) {
    const subject = name.replace(/^PhD\s*/i, '').replace(/\(Doctor of Philosophy\)/i, '').trim();
    content = `Doctor of Philosophy${subject ? ` in ${subject}` : ''} is the highest academic qualification, typically 3-5 years of original research culminating in a thesis. Scholars pursue innovative research under faculty mentorship, publish in peer-reviewed journals, present at international conferences, and contribute new knowledge to their field. PhD holders pursue careers as university professors, principal investigators at research institutes, R&D leaders in industry, or technology entrepreneurs.`;
  } else if (n.startsWith('diploma')) {
    content = `${name} is a 1-3 year diploma program providing focused vocational/technical training. Combines classroom learning with hands-on practice, workshops, and industry exposure. Graduates can directly enter the workforce or pursue advanced diplomas/degrees through lateral entry programs.`;
  } else {
    content = `${name} is a comprehensive academic program designed to provide students with strong theoretical foundations and practical skills. The curriculum combines coursework, laboratory/practical training, projects, and industry exposure. Students develop expertise that prepares them for diverse career opportunities and advanced studies.`;
  }

  return { title, content, image: img };
}

// Generate syllabus
function generateSyllabus(name: string): { title: string; semesters: any[] } {
  const n = name.toLowerCase();
  const semesters: any[] = [];

  if (n.startsWith('b.tech') || n.startsWith('be ')) {
    semesters.push({ title: 'Year 1 (Foundation)', topics: ['Engineering Mathematics', 'Engineering Physics', 'Engineering Chemistry', 'Programming Fundamentals', 'Basic Engineering Sciences', 'English Communication'] });
    semesters.push({ title: 'Year 2 (Core)', topics: ['Discipline-Specific Core Subjects', 'Data Structures & Algorithms', 'Engineering Drawing/CAD', 'Statistics & Probability', 'Workshop Practice', 'Environmental Studies'] });
    semesters.push({ title: 'Year 3 (Advanced)', topics: ['Advanced Specialization Subjects', 'Software/Hardware Tools', 'Industry-relevant Electives', 'Mini Project', 'Industrial Training', 'Soft Skills'] });
    semesters.push({ title: 'Year 4 (Specialization & Project)', topics: ['Advanced Electives', 'Major Project / Thesis', 'Internship', 'Seminar', 'Professional Ethics', 'Industry Visits'] });
  } else if (n.startsWith('m.tech')) {
    semesters.push({ title: 'Semester 1-2', topics: ['Core Specialization Subjects', 'Mathematical Methods', 'Research Methodology', 'Advanced Lab Work', 'Technical Seminar', 'Programming/Tools'] });
    semesters.push({ title: 'Semester 3-4', topics: ['Advanced Electives', 'Thesis / Dissertation Work', 'Independent Research', 'Publications', 'Industry Internship'] });
  } else if (n.startsWith('mbbs')) {
    semesters.push({ title: 'Phase 1 (Pre-clinical, Year 1)', topics: ['Anatomy', 'Physiology', 'Biochemistry'] });
    semesters.push({ title: 'Phase 2 (Para-clinical, Year 2)', topics: ['Pathology', 'Pharmacology', 'Microbiology', 'Forensic Medicine'] });
    semesters.push({ title: 'Phase 3 (Clinical, Year 3-4.5)', topics: ['Internal Medicine', 'General Surgery', 'Pediatrics', 'Obstetrics & Gynecology', 'Community Medicine', 'Ophthalmology', 'ENT'] });
    semesters.push({ title: 'Internship (Year 5-5.5)', topics: ['Rotational Postings in Wards', 'Emergency Care', 'Casualty Duty', 'Community Health Postings'] });
  } else if (n.startsWith('mba') || n.startsWith('pgdm')) {
    semesters.push({ title: 'Term 1-2 (Foundation)', topics: ['Financial Accounting', 'Marketing Management', 'Organizational Behavior', 'Managerial Economics', 'Business Statistics', 'Operations Management'] });
    semesters.push({ title: 'Term 3-4 (Core)', topics: ['Strategic Management', 'Corporate Finance', 'HR Management', 'IT for Business', 'Business Communication', 'Summer Internship'] });
    semesters.push({ title: 'Term 5-6 (Specialization)', topics: ['Specialization Electives', 'Capstone Project', 'Industry Live Project', 'Leadership Development', 'Entrepreneurship', 'International Immersion'] });
  } else if (n.startsWith('bba')) {
    semesters.push({ title: 'Year 1 (Foundation)', topics: ['Principles of Management', 'Business Communication', 'Financial Accounting', 'Microeconomics', 'Business Mathematics', 'Computer Applications'] });
    semesters.push({ title: 'Year 2 (Functional Areas)', topics: ['Marketing Management', 'HR Management', 'Operations Management', 'Business Statistics', 'Macroeconomics', 'Cost Accounting'] });
    semesters.push({ title: 'Year 3 (Specialization & Practice)', topics: ['Strategic Management', 'Specialization Electives', 'Business Law', 'Internship', 'Research Project', 'Entrepreneurship'] });
  } else if (n.startsWith('b.sc') || n.startsWith('bsc')) {
    semesters.push({ title: 'Year 1', topics: ['Foundation Courses', 'Lab Sessions', 'Mathematics', 'Communication Skills', 'Environmental Studies'] });
    semesters.push({ title: 'Year 2', topics: ['Core Subject Theory', 'Advanced Lab Work', 'Inter-disciplinary Electives', 'Research Methodology'] });
    semesters.push({ title: 'Year 3', topics: ['Specialization Subjects', 'Project Work', 'Industry Exposure', 'Seminar', 'Capstone Project'] });
  } else if (n.startsWith('m.sc')) {
    semesters.push({ title: 'Semester 1-2', topics: ['Advanced Core Theory', 'Research Methodology', 'Lab Work', 'Specialized Electives', 'Statistical Methods'] });
    semesters.push({ title: 'Semester 3-4', topics: ['Specialization Electives', 'Dissertation/Thesis', 'Independent Research', 'Internship', 'Publications'] });
  } else if (n.startsWith('llb') || n.includes(' llb')) {
    semesters.push({ title: 'Year 1', topics: ['Constitutional Law', 'Contract Law', 'Tort Law', 'Family Law', 'Legal Methods'] });
    semesters.push({ title: 'Year 2', topics: ['Criminal Law', 'Property Law', 'Administrative Law', 'Jurisprudence', 'Public International Law'] });
    semesters.push({ title: 'Year 3', topics: ['Corporate Law', 'Tax Law', 'Labour Law', 'Moot Court', 'Legal Internship', 'Specialization Electives'] });
  } else if (n.startsWith('llm')) {
    semesters.push({ title: 'Semester 1-2', topics: ['Comparative Law', 'Constitutional Theory', 'Research Methodology', 'Specialization Subjects', 'Seminar'] });
    semesters.push({ title: 'Semester 3-4', topics: ['Advanced Electives', 'Dissertation', 'Independent Research', 'Legal Practice'] });
  } else if (n.startsWith('b.com')) {
    semesters.push({ title: 'Year 1', topics: ['Financial Accounting', 'Business Economics', 'Business Statistics', 'Business Law', 'Business Organization', 'Communication Skills'] });
    semesters.push({ title: 'Year 2', topics: ['Cost Accounting', 'Income Tax', 'Marketing', 'Banking', 'Business Mathematics', 'Indirect Tax'] });
    semesters.push({ title: 'Year 3', topics: ['Corporate Accounting', 'Auditing', 'Financial Management', 'Management Accounting', 'Project Work', 'Specialization'] });
  } else if (n.startsWith('m.com')) {
    semesters.push({ title: 'Year 1', topics: ['Advanced Accounting', 'Business Environment', 'Research Methodology', 'Quantitative Techniques', 'Economic Analysis'] });
    semesters.push({ title: 'Year 2', topics: ['Specialization Electives', 'Strategic Management', 'Dissertation', 'Computer Applications', 'Project Work'] });
  } else if (n.startsWith('bca')) {
    semesters.push({ title: 'Year 1', topics: ['Programming in C', 'Computer Fundamentals', 'Mathematics', 'Digital Electronics', 'Communication Skills'] });
    semesters.push({ title: 'Year 2', topics: ['Data Structures', 'OOP with C++', 'Database Management', 'Operating Systems', 'Java Programming'] });
    semesters.push({ title: 'Year 3', topics: ['Web Development', 'Software Engineering', 'Computer Networks', 'Project Work', 'Internship', 'Electives'] });
  } else if (n.startsWith('mca')) {
    semesters.push({ title: 'Year 1', topics: ['Advanced Programming', 'Computer Architecture', 'Discrete Mathematics', 'OOP', 'Database Concepts'] });
    semesters.push({ title: 'Year 2', topics: ['Software Engineering', 'Web Technologies', 'Mobile Apps', 'Project Work', 'Specialization', 'Industry Project'] });
  } else if (n.startsWith('ba ')) {
    semesters.push({ title: 'Year 1', topics: ['Foundation Courses', 'Subject Specialization Basics', 'Communication Skills', 'Environmental Studies'] });
    semesters.push({ title: 'Year 2', topics: ['Advanced Theory', 'Inter-disciplinary Electives', 'Research Methodology', 'Subject Practicum'] });
    semesters.push({ title: 'Year 3', topics: ['Specialization Subjects', 'Research Project', 'Internship', 'Capstone Project', 'Comprehensive Examination'] });
  } else if (n.startsWith('b.des') || n.startsWith('b des')) {
    semesters.push({ title: 'Year 1', topics: ['Design Fundamentals', 'Drawing & Sketching', 'Color Theory', 'Materials Studies', 'Design History'] });
    semesters.push({ title: 'Year 2', topics: ['Specialization Studio', 'Digital Tools', 'Form Studies', 'User Research', 'Communication Design'] });
    semesters.push({ title: 'Year 3', topics: ['Advanced Specialization', 'Industry Workshops', 'Sustainable Design', 'Internship', 'Portfolio Development'] });
    semesters.push({ title: 'Year 4', topics: ['Capstone Project', 'Thesis', 'Industry Collaboration', 'Final Portfolio', 'Exhibition'] });
  } else if (n.startsWith('b.pharm')) {
    semesters.push({ title: 'Year 1-2', topics: ['Pharmaceutical Chemistry', 'Pharmacognosy', 'Human Anatomy', 'Mathematics/Biology', 'Computer Applications'] });
    semesters.push({ title: 'Year 3', topics: ['Pharmacology', 'Pharmaceutics', 'Pharmaceutical Analysis', 'Medicinal Chemistry', 'Industrial Pharmacy'] });
    semesters.push({ title: 'Year 4', topics: ['Hospital Pharmacy', 'Clinical Pharmacy', 'Pharmacy Practice', 'Project Work', 'Industrial Training'] });
  } else if (n.includes('b.ed')) {
    semesters.push({ title: 'Year 1', topics: ['Educational Psychology', 'Pedagogy', 'Curriculum Studies', 'Teaching Methodology', 'Education Philosophy'] });
    semesters.push({ title: 'Year 2', topics: ['Subject Pedagogy', 'Inclusive Education', 'School Internship', 'Educational Technology', 'Action Research'] });
  } else if (n.startsWith('phd')) {
    semesters.push({ title: 'Year 1', topics: ['Coursework', 'Research Methodology', 'Literature Review', 'Specialization Studies'] });
    semesters.push({ title: 'Year 2', topics: ['Comprehensive Examination', 'Research Proposal', 'Initial Research', 'Publications'] });
    semesters.push({ title: 'Year 3-5', topics: ['Original Research', 'Thesis Writing', 'Conference Presentations', 'Journal Publications', 'Thesis Defense'] });
  } else {
    // Generic fallback
    semesters.push({ title: 'Year 1', topics: ['Foundation Courses', 'Core Subjects', 'Practical/Lab Sessions', 'Communication Skills'] });
    semesters.push({ title: 'Year 2', topics: ['Advanced Theory', 'Specialization Basics', 'Project Work', 'Industry Exposure'] });
    semesters.push({ title: 'Final Year', topics: ['Specialization Subjects', 'Capstone Project', 'Internship', 'Research/Dissertation'] });
  }

  return { title: 'Curriculum & Syllabus', semesters };
}

// Career opportunities
function generateCareer(name: string): { title: string; items: any[] } {
  const n = name.toLowerCase();
  let items: any[] = [];

  if (n.includes('computer') || n.includes('software') || n.includes('information technology') || n.includes('artificial intelligence') || n.includes('data science')) {
    items = [
      { title: 'Software Engineer / Developer', description: 'Build applications at companies like Google, Microsoft, Amazon, Flipkart with packages of ₹8-50+ LPA.' },
      { title: 'Data Scientist / ML Engineer', description: 'Develop AI/ML models at tech companies and research labs with starting packages of ₹12-30 LPA.' },
      { title: 'Cloud / DevOps Engineer', description: 'Manage cloud infrastructure and deployment pipelines at AWS, Azure, GCP, and tech firms.' },
      { title: 'Higher Studies', description: 'MS/PhD at top universities — IITs, IISc, MIT, Stanford, CMU.' },
    ];
  } else if (n.includes('mechanical') || n.includes('automobile')) {
    items = [
      { title: 'Design Engineer', description: 'Design products and machinery at automotive, aerospace, and manufacturing companies.' },
      { title: 'Production Manager', description: 'Lead manufacturing operations at L&T, Tata Motors, Maruti Suzuki, Mahindra.' },
      { title: 'R&D Engineer', description: 'Conduct research at automotive and aerospace R&D centers.' },
      { title: 'Higher Studies', description: 'M.Tech / MS in advanced specializations.' },
    ];
  } else if (n.includes('civil')) {
    items = [
      { title: 'Civil Engineer', description: 'Work on infrastructure projects at L&T, Shapoorji Pallonji, GMR, GVK.' },
      { title: 'Structural Engineer', description: 'Design structures and analyze loads for buildings and bridges.' },
      { title: 'Project Manager', description: 'Manage construction projects worth crores at top construction firms.' },
      { title: 'Government Roles', description: 'Engineer Services Examination (ESE), PWD, CPWD, Railways.' },
    ];
  } else if (n.includes('electrical')) {
    items = [
      { title: 'Power Systems Engineer', description: 'Work at power utilities, BHEL, NTPC, PowerGrid, Reliance Power.' },
      { title: 'Electronics Design Engineer', description: 'Design circuits and systems at Intel, Qualcomm, Bosch, Texas Instruments.' },
      { title: 'Control Systems Engineer', description: 'Develop automation systems for industrial applications.' },
      { title: 'PSU Recruitment', description: 'GATE-based recruitment to BHEL, ONGC, IOCL, NTPC.' },
    ];
  } else if (n.includes('electronics') || n.includes('vlsi')) {
    items = [
      { title: 'VLSI Design Engineer', description: 'Design semiconductor chips at Intel, Qualcomm, AMD, Samsung.' },
      { title: 'Embedded Systems Engineer', description: 'Develop firmware and embedded systems for IoT, automotive, consumer electronics.' },
      { title: 'Communications Engineer', description: 'Work at telecom giants — Jio, Airtel, Vi, Ericsson, Nokia.' },
      { title: 'R&D in DRDO/ISRO', description: 'Defence research and space technology positions.' },
    ];
  } else if (n.includes('chemical')) {
    items = [
      { title: 'Process Engineer', description: 'Optimize chemical processes at refineries and chemical plants.' },
      { title: 'Petrochemical Roles', description: 'Work at Reliance, IOCL, BPCL, ONGC.' },
      { title: 'R&D Scientist', description: 'Develop new materials and processes at industry research labs.' },
      { title: 'Higher Studies', description: 'M.Tech / MS / PhD in specialized chemical engineering domains.' },
    ];
  } else if (n.includes('aerospace') || n.includes('aeronautical')) {
    items = [
      { title: 'Aerospace Engineer', description: 'Work at HAL, ISRO, DRDO, Boeing, Airbus, Lockheed Martin.' },
      { title: 'Aircraft Maintenance', description: 'Maintenance engineering roles at airlines and MRO facilities.' },
      { title: 'Defence R&D', description: 'Research positions at DRDO laboratories.' },
      { title: 'Space Technology', description: 'Work on satellites and launch vehicles at ISRO and private space companies.' },
    ];
  } else if (n.includes('biotechnology')) {
    items = [
      { title: 'Biotech Researcher', description: 'R&D positions at Biocon, Serum Institute, Bharat Biotech, Cipla.' },
      { title: 'Quality Control Specialist', description: 'QC roles at pharmaceutical and biotech companies.' },
      { title: 'Bioinformatics Analyst', description: 'Computational biology at research institutes and pharma companies.' },
      { title: 'Higher Studies', description: 'M.Sc / M.Tech / PhD in Biotechnology, Biomedical Sciences.' },
    ];
  } else if (n.startsWith('mba') || n.startsWith('pgdm')) {
    items = [
      { title: 'Management Consultant', description: 'McKinsey, BCG, Bain, Deloitte hiring at ₹15-30 LPA average.' },
      { title: 'Investment Banker', description: 'Goldman Sachs, JPMorgan, Morgan Stanley with packages of ₹20-50 LPA.' },
      { title: 'Product Manager', description: 'Lead products at Flipkart, Amazon, Microsoft, Google with ₹15-40 LPA.' },
      { title: 'Marketing Leader', description: 'Brand & Marketing roles at Unilever, P&G, ITC, Coca-Cola.' },
      { title: 'Entrepreneur', description: 'Start your own venture with strong business foundation.' },
    ];
  } else if (n.startsWith('bba') || n.startsWith('bms')) {
    items = [
      { title: 'Management Trainee', description: 'Entry-level management roles at corporates with structured growth paths.' },
      { title: 'Marketing Executive', description: 'Sales and marketing positions at FMCG, retail, and tech companies.' },
      { title: 'Banking Officer', description: 'Roles at HDFC, ICICI, SBI, Axis through bank PO exams.' },
      { title: 'Higher Studies', description: 'MBA at IIMs, ISB, XLRI, IITs after work experience.' },
    ];
  } else if (n.startsWith('mbbs')) {
    items = [
      { title: 'Doctor / Physician', description: 'Practice as a doctor in hospitals, clinics, or set up own practice.' },
      { title: 'Specialist (MD/MS)', description: 'Pursue postgraduate specialization through NEET-PG.' },
      { title: 'Public Health', description: 'WHO, government health departments, NGOs in healthcare.' },
      { title: 'Medical Research', description: 'Research at AIIMS, ICMR, pharmaceutical companies.' },
    ];
  } else if (n.startsWith('bds')) {
    items = [
      { title: 'Practicing Dentist', description: 'Set up private dental clinic or join existing practices.' },
      { title: 'Specialist (MDS)', description: 'Specialize in Orthodontics, Periodontics, Oral Surgery, etc.' },
      { title: 'Hospital Dentist', description: 'Work at multi-specialty hospitals and dental hospitals.' },
      { title: 'Academic Career', description: 'Teaching at dental colleges and research positions.' },
    ];
  } else if (n.includes('nursing')) {
    items = [
      { title: 'Staff Nurse', description: 'Work at hospitals, clinics, nursing homes in India and abroad.' },
      { title: 'Specialty Nurse', description: 'Critical care, oncology, pediatric, cardiac specialties.' },
      { title: 'Nurse Educator', description: 'Teaching at nursing colleges and clinical training.' },
      { title: 'International Opportunities', description: 'High demand in USA, UK, Canada, Gulf countries.' },
    ];
  } else if (n.includes('pharm')) {
    items = [
      { title: 'Pharmacist', description: 'Hospital, retail, and clinical pharmacy positions.' },
      { title: 'Pharmaceutical Industry', description: 'R&D, production, QA, regulatory affairs at Sun Pharma, Cipla, Dr. Reddy\'s.' },
      { title: 'Drug Inspector', description: 'Government roles in drug regulation and quality control.' },
      { title: 'Higher Studies', description: 'M.Pharm, Pharm.D, MBA Pharma Management.' },
    ];
  } else if (n.includes('llb') || n.includes('llm')) {
    items = [
      { title: 'Litigation Lawyer', description: 'Practice in courts after qualifying All India Bar Examination.' },
      { title: 'Corporate Counsel', description: 'In-house legal advisor at companies with packages of ₹8-25 LPA.' },
      { title: 'Judicial Services', description: 'Civil judge positions through state judicial services exams.' },
      { title: 'Legal Consultant', description: 'Top law firms — Khaitan, AZB, Cyril Amarchand, Trilegal.' },
    ];
  } else if (n.includes('b.des') || n.includes('m.des') || n.includes('design')) {
    items = [
      { title: 'Industry Designer', description: 'Work at design firms, product companies, and consultancies.' },
      { title: 'UX/UI Designer', description: 'Design digital products at tech companies with ₹8-25 LPA packages.' },
      { title: 'Freelance Designer', description: 'Build independent client base across industries.' },
      { title: 'Design Entrepreneur', description: 'Start design studio or product company.' },
    ];
  } else if (n.includes('b.com') || n.includes('m.com') || n.includes('chartered')) {
    items = [
      { title: 'Accountant', description: 'Work in accounts at corporates, audit firms, banks.' },
      { title: 'Financial Analyst', description: 'Analysis roles at investment firms, fintech companies, corporates.' },
      { title: 'Banking Officer', description: 'Bank PO and management trainee positions.' },
      { title: 'Professional Certifications', description: 'CA, CMA, CS, CFA for advanced career growth.' },
    ];
  } else if (n.startsWith('b.sc') || n.startsWith('m.sc')) {
    items = [
      { title: 'Scientific Officer', description: 'Research positions at ISRO, DRDO, BARC, CSIR labs.' },
      { title: 'Industry R&D', description: 'Research roles at pharma, biotech, technology companies.' },
      { title: 'Teaching Career', description: 'Lecturer/Assistant Professor positions in colleges.' },
      { title: 'Civil Services', description: 'UPSC and state PSC examinations for administrative roles.' },
    ];
  } else if (n.includes('hotel') || n.includes('hospitality')) {
    items = [
      { title: 'Hotel Operations Manager', description: 'Operations roles at Taj, Marriott, ITC, Oberoi, Hyatt.' },
      { title: 'Chef / Culinary Specialist', description: 'Work in fine-dining restaurants and luxury hotels.' },
      { title: 'Cruise Line Operations', description: 'International careers on cruise ships and resorts.' },
      { title: 'Event Management', description: 'Lead corporate events and luxury experiences.' },
    ];
  } else if (n.includes('aviation')) {
    items = [
      { title: 'Cabin Crew', description: 'Flight attendant roles at IndiGo, Air India, Vistara, Emirates.' },
      { title: 'Ground Operations', description: 'Airport operations, customer service, ground handling.' },
      { title: 'Aviation Manager', description: 'Operations management at airports and airlines.' },
      { title: 'Pilot Training', description: 'Pursue Commercial Pilot License (CPL) for cockpit roles.' },
    ];
  } else if (n.includes('agriculture') || n.includes('horticulture')) {
    items = [
      { title: 'Agriculture Officer', description: 'Government agriculture departments and extension services.' },
      { title: 'Agribusiness Manager', description: 'Roles at ITC, Cargill, Mahindra Agribusiness, seed companies.' },
      { title: 'Bank Agricultural Officer', description: 'Specialized banking roles at NABARD, SBI Agri.' },
      { title: 'Research Scientist', description: 'ICAR institutes and agricultural universities.' },
    ];
  } else if (n.includes('b.ed') || n.includes('m.ed') || n.includes('education')) {
    items = [
      { title: 'School Teacher', description: 'Teaching positions at private and government schools.' },
      { title: 'Senior Educator', description: 'Department head, vice principal, principal positions.' },
      { title: 'Education Researcher', description: 'Curriculum development and educational research.' },
      { title: 'Teacher Trainer', description: 'B.Ed/M.Ed college faculty positions.' },
    ];
  } else if (n.startsWith('phd')) {
    items = [
      { title: 'University Professor', description: 'Faculty positions at universities and research institutes.' },
      { title: 'Principal Investigator', description: 'Lead research projects at national labs and R&D centers.' },
      { title: 'Industry R&D Leader', description: 'Senior research roles at pharma, biotech, tech companies.' },
      { title: 'Technology Entrepreneur', description: 'Start deep-tech ventures based on research.' },
    ];
  } else {
    items = [
      { title: 'Industry Professional', description: 'Specialized roles in your field of study.' },
      { title: 'Higher Studies', description: 'Pursue advanced degrees for career growth.' },
      { title: 'Government Services', description: 'Civil services and government department roles.' },
      { title: 'Entrepreneurship', description: 'Start your own venture leveraging domain expertise.' },
    ];
  }

  return { title: 'Career Opportunities', items };
}

// Why Choose
function generateWhyChoose(name: string): { title: string; description: string; reasons: any[] } {
  const reasons = [
    { title: 'Industry-aligned curriculum', description: 'Updated regularly to match current industry needs and emerging technologies.' },
    { title: 'Hands-on practical training', description: 'Lab work, projects, internships ensure you build job-ready skills.' },
    { title: 'Strong placement record', description: 'Top recruiters visit campus annually with competitive packages.' },
    { title: 'Higher studies pathway', description: 'Strong foundation for postgraduate, research, and international studies.' },
  ];
  return {
    title: `Why Choose ${name}?`,
    description: 'Top reasons students opt for this program.',
    reasons,
  };
}

// Generate FAQs
function generateFaqs(name: string): { title: string; description: string; items: any[] } {
  const items = [
    {
      question: `What is the eligibility for ${name}?`,
      answer: `Standard eligibility for ${name} includes the educational prerequisites mentioned. Most colleges also require a qualifying entrance exam score. Refer to specific college admission criteria for exact requirements.`,
    },
    {
      question: `What is the typical fee range for ${name}?`,
      answer: `Fees vary significantly by college tier. Government colleges charge ₹15,000-₹2 lakh/year, private colleges ₹1-5 lakh/year, and premium institutes (IITs, IIMs, AIIMS) follow their own fee structures.`,
    },
    {
      question: `What career options are available after ${name}?`,
      answer: `Graduates can pursue industry roles, higher studies, research, government services, or entrepreneurship. Career paths depend on your interests and the program specialization.`,
    },
    {
      question: `Is ${name} a good choice for international careers?`,
      answer: `Yes. Many programs prepare students for global opportunities through international curricula, study-abroad options, and recognized degrees. Higher studies abroad is also a popular path.`,
    },
  ];
  return {
    title: 'Frequently Asked Questions',
    description: 'Common queries about this program.',
    items,
  };
}

// Generate skills
function generateSkills(name: string): string[] {
  const n = name.toLowerCase();
  if (n.includes('computer') || n.includes('software')) return ['Programming', 'Problem Solving', 'Algorithms', 'System Design', 'Database Management', 'Cloud Computing', 'Version Control'];
  if (n.includes('data science') || n.includes('analytics')) return ['Python', 'SQL', 'Machine Learning', 'Statistics', 'Data Visualization', 'Big Data Tools', 'Communication'];
  if (n.includes('artificial intelligence')) return ['Machine Learning', 'Deep Learning', 'Python', 'TensorFlow/PyTorch', 'Mathematics', 'Research Skills'];
  if (n.includes('mechanical')) return ['CAD/CAM', 'Thermodynamics', 'Manufacturing Processes', 'Material Science', 'Project Management', 'Problem Solving'];
  if (n.includes('civil')) return ['Structural Analysis', 'AutoCAD', 'Project Management', 'Surveying', 'Construction Management', 'Site Supervision'];
  if (n.includes('electrical')) return ['Circuit Analysis', 'Power Systems', 'Control Systems', 'MATLAB', 'Electrical Software Tools'];
  if (n.includes('mba') || n.includes('management')) return ['Leadership', 'Strategic Thinking', 'Financial Analysis', 'Communication', 'Negotiation', 'Data Analytics', 'Project Management'];
  if (n.includes('mbbs') || n.includes('medicine')) return ['Clinical Skills', 'Patient Care', 'Diagnostic Skills', 'Medical Knowledge', 'Communication', 'Empathy', 'Decision Making'];
  if (n.includes('law')) return ['Legal Research', 'Drafting', 'Argumentation', 'Critical Thinking', 'Negotiation', 'Public Speaking'];
  if (n.includes('design')) return ['Creativity', 'Design Software (Adobe, Figma)', 'Sketching', 'User Research', 'Visual Communication', 'Prototyping'];
  if (n.includes('hotel') || n.includes('hospitality')) return ['Customer Service', 'Operations Management', 'Communication', 'Multi-tasking', 'Cultural Awareness', 'Problem Solving'];
  if (n.includes('b.com') || n.includes('m.com')) return ['Accounting', 'Financial Analysis', 'Tax Knowledge', 'Excel/Spreadsheets', 'Business Communication', 'Compliance'];
  return ['Critical Thinking', 'Research Skills', 'Communication', 'Subject Expertise', 'Analytical Skills', 'Time Management'];
}

// Top recruiters
function generateRecruiters(name: string): string[] {
  const n = name.toLowerCase();
  if (n.includes('computer') || n.includes('software') || n.includes('information technology')) {
    return ['Google', 'Microsoft', 'Amazon', 'TCS', 'Infosys', 'Wipro', 'Accenture', 'Capgemini', 'IBM', 'Flipkart'];
  }
  if (n.includes('data science') || n.includes('artificial intelligence')) {
    return ['Google', 'Microsoft', 'Amazon', 'Netflix', 'Uber', 'Walmart Labs', 'Mu Sigma', 'Fractal Analytics', 'Bridgei2i'];
  }
  if (n.includes('electrical') || n.includes('electronics')) {
    return ['BHEL', 'NTPC', 'Powergrid', 'Siemens', 'ABB', 'Schneider Electric', 'L&T', 'Bosch', 'Texas Instruments'];
  }
  if (n.includes('mechanical') || n.includes('automobile')) {
    return ['Tata Motors', 'Maruti Suzuki', 'Mahindra', 'Bajaj Auto', 'L&T', 'Bosch', 'Hyundai', 'BHEL', 'JCB'];
  }
  if (n.includes('civil')) {
    return ['L&T', 'Shapoorji Pallonji', 'GMR Group', 'GVK Power', 'AECOM', 'Hindustan Construction', 'Tata Projects'];
  }
  if (n.includes('mba') || n.includes('pgdm')) {
    return ['McKinsey', 'BCG', 'Bain', 'Deloitte', 'Accenture Strategy', 'Goldman Sachs', 'JP Morgan', 'HUL', 'P&G', 'ITC'];
  }
  if (n.includes('mbbs') || n.includes('medical')) {
    return ['Apollo Hospitals', 'Fortis', 'Medanta', 'Max Healthcare', 'Manipal Hospitals', 'Narayana Health', 'AIIMS'];
  }
  if (n.includes('pharm')) {
    return ['Sun Pharma', 'Cipla', 'Dr. Reddy\'s', 'Lupin', 'Aurobindo Pharma', 'Cadila Healthcare', 'Biocon', 'Glenmark'];
  }
  if (n.includes('law') || n.includes('llb')) {
    return ['Khaitan & Co', 'AZB & Partners', 'Cyril Amarchand Mangaldas', 'Trilegal', 'Shardul Amarchand', 'L&L Partners'];
  }
  if (n.includes('hotel') || n.includes('hospitality')) {
    return ['Taj Hotels', 'Marriott', 'ITC Hotels', 'Oberoi', 'Hyatt', 'Hilton', 'Accor', 'Radisson', 'Leela'];
  }
  if (n.includes('design') || n.includes('b.des')) {
    return ['Apple', 'Adobe', 'Microsoft', 'Flipkart', 'Swiggy', 'Zomato', 'Lollypop Design', 'Idiom Design'];
  }
  if (n.includes('aviation')) {
    return ['IndiGo', 'Air India', 'Vistara', 'SpiceJet', 'Emirates', 'Qatar Airways', 'Etihad', 'Lufthansa'];
  }
  return ['TCS', 'Infosys', 'Wipro', 'Accenture', 'Cognizant', 'Capgemini', 'HCL', 'Tech Mahindra'];
}

// Job roles
function generateJobRoles(name: string): string[] {
  const n = name.toLowerCase();
  if (n.includes('computer') || n.includes('software')) return ['Software Engineer', 'Full Stack Developer', 'DevOps Engineer', 'Cloud Architect', 'Mobile App Developer', 'Backend Developer'];
  if (n.includes('data science')) return ['Data Scientist', 'ML Engineer', 'Data Analyst', 'Business Intelligence Analyst', 'Data Engineer'];
  if (n.includes('mechanical')) return ['Design Engineer', 'Production Engineer', 'Quality Engineer', 'Maintenance Engineer', 'CAD Engineer'];
  if (n.includes('mba')) return ['Management Consultant', 'Investment Banker', 'Product Manager', 'Marketing Manager', 'Operations Manager', 'Strategy Manager'];
  if (n.includes('mbbs')) return ['General Physician', 'Hospital Doctor', 'Resident Doctor', 'Public Health Officer', 'Medical Officer'];
  if (n.includes('law') || n.includes('llb')) return ['Litigation Lawyer', 'Corporate Counsel', 'Legal Advisor', 'Public Prosecutor', 'Judge', 'Compliance Officer'];
  if (n.includes('design')) return ['UX Designer', 'Product Designer', 'Visual Designer', 'Industrial Designer', 'Brand Designer'];
  if (n.includes('hotel')) return ['Hotel Manager', 'Front Office Manager', 'F&B Manager', 'Executive Chef', 'Sales Manager', 'Event Manager'];
  return ['Industry Professional', 'Subject Specialist', 'Research Associate', 'Manager', 'Consultant'];
}

// Salary data
function generateSalary(name: string): { entry: string; mid: string; senior: string } {
  const n = name.toLowerCase();
  if (n.includes('computer') || n.includes('software') || n.includes('artificial intelligence') || n.includes('data science')) {
    return { entry: '₹6-15 LPA', mid: '₹15-35 LPA', senior: '₹35 LPA - ₹2 Cr' };
  }
  if (n.includes('mba') || n.includes('pgdm')) {
    if (n.includes('iim') || n.includes('isb')) return { entry: '₹15-30 LPA', mid: '₹30-60 LPA', senior: '₹60 LPA - ₹2 Cr' };
    return { entry: '₹6-15 LPA', mid: '₹15-30 LPA', senior: '₹30-80 LPA' };
  }
  if (n.includes('mbbs')) return { entry: '₹6-12 LPA', mid: '₹15-30 LPA', senior: '₹30-80 LPA' };
  if (n.includes('md ') || n.includes('ms ')) return { entry: '₹10-20 LPA', mid: '₹25-50 LPA', senior: '₹50 LPA - ₹2 Cr' };
  if (n.includes('llb') || n.includes('llm')) return { entry: '₹4-12 LPA', mid: '₹12-30 LPA', senior: '₹30 LPA - ₹2 Cr+' };
  if (n.includes('design') || n.includes('b.des')) return { entry: '₹4-10 LPA', mid: '₹10-25 LPA', senior: '₹25-50 LPA' };
  if (n.includes('hotel') || n.includes('hospitality')) return { entry: '₹3-6 LPA', mid: '₹6-15 LPA', senior: '₹15-40 LPA' };
  if (n.startsWith('b.tech') || n.startsWith('m.tech')) return { entry: '₹5-12 LPA', mid: '₹12-25 LPA', senior: '₹25-50 LPA' };
  if (n.includes('nursing')) return { entry: '₹2.5-5 LPA', mid: '₹5-12 LPA', senior: '₹12-25 LPA (abroad)' };
  if (n.includes('pharm')) return { entry: '₹3-6 LPA', mid: '₹6-15 LPA', senior: '₹15-30 LPA' };
  if (n.includes('b.ed') || n.includes('m.ed')) return { entry: '₹2.5-5 LPA', mid: '₹5-10 LPA', senior: '₹10-20 LPA' };
  return { entry: '₹3-7 LPA', mid: '₹7-15 LPA', senior: '₹15-30 LPA' };
}

// Highlights / About
function generateHighlights(name: string): { title: string; description: string; points: any[] } {
  return {
    title: 'Program Highlights',
    description: `Key features of the ${name} program.`,
    points: [
      { title: 'Comprehensive Curriculum', description: 'Well-structured curriculum balancing theory, practice, and research.' },
      { title: 'Expert Faculty', description: 'Learn from accomplished faculty with industry and research experience.' },
      { title: 'Modern Infrastructure', description: 'Access to well-equipped labs, libraries, and learning resources.' },
      { title: 'Industry Connections', description: 'Strong industry partnerships for internships and placements.' },
    ],
  };
}

async function main() {
  await mongoose.connect(MONGO_URI);
  const db = mongoose.connection.db!;

  const courses = await db.collection('courses').find({}).toArray();
  console.log(`Enriching ${courses.length} courses...`);

  let updated = 0;
  for (let i = 0; i < courses.length; i++) {
    const course = courses[i];
    if (i % 50 === 0) console.log(`Progress: ${i}/${courses.length}`);

    const updates: any = {};
    let hasUpdates = false;

    // 1. Description
    if (!course.description || (typeof course.description === 'object' && !course.description.content)) {
      updates.description = generateDescription(course.name);
      hasUpdates = true;
    }

    // 2. Syllabus
    if (!course.syllabus || !course.syllabus.semesters?.length) {
      updates.syllabus = generateSyllabus(course.name);
      hasUpdates = true;
    }

    // 3. Career Opportunities
    if (!course.careerOpportunities || !course.careerOpportunities.items?.length) {
      updates.careerOpportunities = generateCareer(course.name);
      hasUpdates = true;
    }

    // 4. Why Choose
    if (!course.whyChoose || !course.whyChoose.reasons?.length) {
      updates.whyChoose = generateWhyChoose(course.name);
      hasUpdates = true;
    }

    // 5. About / Highlights
    if (!course.about || !course.about.points?.length) {
      updates.about = generateHighlights(course.name);
      hasUpdates = true;
    }

    // 6. FAQs
    if (!course.faqs || !course.faqs.items?.length) {
      updates.faqs = generateFaqs(course.name);
      hasUpdates = true;
    }

    // 7. Card image (if missing)
    if (!course.cardImage) {
      const img = getImage(course.name);
      updates.cardImage = img;
      updates.heroImage = img;
      hasUpdates = true;
    }

    // 8. NEW FIELDS
    if (!course.skills || course.skills.length === 0) {
      updates.skills = generateSkills(course.name);
      hasUpdates = true;
    }

    if (!course.topRecruiters || course.topRecruiters.length === 0) {
      updates.topRecruiters = generateRecruiters(course.name);
      hasUpdates = true;
    }

    if (!course.jobRoles || course.jobRoles.length === 0) {
      updates.jobRoles = generateJobRoles(course.name);
      hasUpdates = true;
    }

    if (!course.salary) {
      updates.salary = generateSalary(course.name);
      hasUpdates = true;
    }

    if (hasUpdates) {
      updates.updatedAt = new Date();
      await db.collection('courses').updateOne(
        { _id: course._id },
        { $set: updates }
      );
      updated++;
    }
  }

  console.log(`\nDone! Updated ${updated} courses`);

  // Verify
  const updatedCourses = await db.collection('courses').find({}).toArray();
  let withDesc = 0, withSyl = 0, withCar = 0, withWhy = 0, withFaq = 0, withImg = 0, withSkills = 0, withRec = 0, withJobs = 0, withSal = 0, withAbout = 0;
  for (const c of updatedCourses) {
    if (c.description?.content) withDesc++;
    if (c.syllabus?.semesters?.length > 0) withSyl++;
    if (c.careerOpportunities?.items?.length > 0) withCar++;
    if (c.whyChoose?.reasons?.length > 0) withWhy++;
    if (c.about?.points?.length > 0) withAbout++;
    if (c.faqs?.items?.length > 0) withFaq++;
    if (c.cardImage) withImg++;
    if (c.skills?.length > 0) withSkills++;
    if (c.topRecruiters?.length > 0) withRec++;
    if (c.jobRoles?.length > 0) withJobs++;
    if (c.salary?.entry) withSal++;
  }

  console.log('\n=== FINAL FIELD COVERAGE ===');
  console.log(`Total courses: ${updatedCourses.length}`);
  console.log(`Description: ${withDesc}`);
  console.log(`Syllabus: ${withSyl}`);
  console.log(`Career Opportunities: ${withCar}`);
  console.log(`Why Choose: ${withWhy}`);
  console.log(`About/Highlights: ${withAbout}`);
  console.log(`FAQs: ${withFaq}`);
  console.log(`Images: ${withImg}`);
  console.log(`Skills (NEW): ${withSkills}`);
  console.log(`Top Recruiters (NEW): ${withRec}`);
  console.log(`Job Roles (NEW): ${withJobs}`);
  console.log(`Salary Data (NEW): ${withSal}`);

  await mongoose.disconnect();
}

main().catch(console.error);
