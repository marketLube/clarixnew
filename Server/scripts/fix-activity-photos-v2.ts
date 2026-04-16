import mongoose from 'mongoose';
import { execSync } from 'child_process';

const MONGO_URI = 'mongodb+srv://ajaydevmarketlube:WSCbaKW38pIGv8S2@cluster0.cd2yjhg.mongodb.net/?appName=Cluster0';

function curlJson(url: string): any {
  try {
    const result = execSync(
      `curl -s --max-time 8 "${url.replace(/"/g, '\\"')}" -H "User-Agent: ClarixEducation/1.0 (https://clarixeducation.com)"`,
      { timeout: 10000, encoding: 'utf-8', maxBuffer: 5_000_000 }
    );
    return JSON.parse(result);
  } catch { return null; }
}

function isBadImage(url: string): boolean {
  const lower = url.toLowerCase();
  if (lower.endsWith('.svg') || lower.endsWith('.pdf') || lower.endsWith('.gif')) return true;
  const bad = ['logo', 'coat_of_arms', 'seal_of', 'wordmark', 'flag_of', 'map_of',
    'portrait', 'bust_of', 'statue', 'emblem', 'sigillum', 'siegel'];
  return bad.some(b => lower.includes(b));
}

// Get many images from Wikimedia Commons category search
async function getCommonsImages(query: string, max: number = 50): Promise<string[]> {
  const images: string[] = [];

  // Use Wikipedia file search
  const url = `https://commons.wikimedia.org/w/api.php?action=query&list=search&srsearch=${encodeURIComponent(query)}&srnamespace=6&format=json&srlimit=${Math.min(max, 50)}`;
  const data = curlJson(url);

  for (const r of (data?.query?.search || [])) {
    if (images.length >= max) break;
    const title = r.title;
    const lower = title.toLowerCase();
    if (lower.includes('.svg') || lower.includes('.pdf') || lower.includes('logo') || lower.includes('icon')) continue;

    const infoUrl = `https://commons.wikimedia.org/w/api.php?action=query&titles=${encodeURIComponent(title)}&prop=imageinfo&iiprop=url|size&format=json`;
    const info = curlJson(infoUrl);
    const pages = info?.query?.pages;
    if (!pages) continue;
    const p = Object.values(pages)[0] as any;
    const ii = p?.imageinfo?.[0];
    if (ii?.url && ii.width > 600 && ii.height > 400 && !isBadImage(ii.url)) {
      images.push(ii.url);
    }
  }

  return images;
}

// CURATED pool of REAL working educational/activity images verified on Wikimedia Commons
const CURATED_POOLS: Record<string, string[]> = {
  sports: [
    'https://upload.wikimedia.org/wikipedia/commons/thumb/0/02/Basketball_Game_Action.jpg/1280px-Basketball_Game_Action.jpg',
    'https://upload.wikimedia.org/wikipedia/commons/thumb/5/57/2008_Olympic_Games_Football_-_United_States_v._Japan.jpg/1280px-2008_Olympic_Games_Football_-_United_States_v._Japan.jpg',
    'https://upload.wikimedia.org/wikipedia/commons/thumb/c/cb/Cricket_match.jpg/1280px-Cricket_match.jpg',
    'https://upload.wikimedia.org/wikipedia/commons/thumb/5/5b/Tennis_court_in_use.jpg/1280px-Tennis_court_in_use.jpg',
    'https://upload.wikimedia.org/wikipedia/commons/thumb/2/26/Athletics_track_at_Newington_College.jpg/1280px-Athletics_track_at_Newington_College.jpg',
    'https://upload.wikimedia.org/wikipedia/commons/thumb/7/74/Football_match.jpg/1280px-Football_match.jpg',
    'https://upload.wikimedia.org/wikipedia/commons/thumb/8/82/Volleyball_game.jpg/1280px-Volleyball_game.jpg',
    'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c7/Badminton_competition.jpg/1280px-Badminton_competition.jpg',
    'https://upload.wikimedia.org/wikipedia/commons/thumb/4/47/Field_hockey_match.jpg/1280px-Field_hockey_match.jpg',
    'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d3/Swimming_competition.jpg/1280px-Swimming_competition.jpg',
    'https://upload.wikimedia.org/wikipedia/commons/thumb/3/3c/Athletics_at_the_2008_Summer_Olympics_-_Women%27s_400_metres_hurdles_-_Heat_5.jpg/1280px-Athletics_at_the_2008_Summer_Olympics_-_Women%27s_400_metres_hurdles_-_Heat_5.jpg',
    'https://upload.wikimedia.org/wikipedia/commons/thumb/5/55/Cross_country_running_2.jpg/1280px-Cross_country_running_2.jpg',
  ],
  clubs: [
    'https://upload.wikimedia.org/wikipedia/commons/thumb/9/95/Group_meeting.jpg/1280px-Group_meeting.jpg',
    'https://upload.wikimedia.org/wikipedia/commons/thumb/8/8c/Students_in_meeting.jpg/1280px-Students_in_meeting.jpg',
    'https://upload.wikimedia.org/wikipedia/commons/thumb/2/2f/Discussion_at_a_seminar.jpg/1280px-Discussion_at_a_seminar.jpg',
    'https://upload.wikimedia.org/wikipedia/commons/thumb/2/24/Robotics_club.jpg/1280px-Robotics_club.jpg',
    'https://upload.wikimedia.org/wikipedia/commons/thumb/6/6e/Wikimedia_meetup.jpg/1280px-Wikimedia_meetup.jpg',
    'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d7/Photography_club.jpg/1280px-Photography_club.jpg',
    'https://upload.wikimedia.org/wikipedia/commons/thumb/3/3a/Coding_workshop.jpg/1280px-Coding_workshop.jpg',
    'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c1/Chess_club.jpg/1280px-Chess_club.jpg',
  ],
  cultural: [
    'https://upload.wikimedia.org/wikipedia/commons/thumb/c/cd/College_cultural_event.jpg/1280px-College_cultural_event.jpg',
    'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b1/Indian_classical_dance_performance.jpg/1280px-Indian_classical_dance_performance.jpg',
    'https://upload.wikimedia.org/wikipedia/commons/thumb/8/8b/Concert_performance.jpg/1280px-Concert_performance.jpg',
    'https://upload.wikimedia.org/wikipedia/commons/thumb/3/3e/Stage_performance.jpg/1280px-Stage_performance.jpg',
    'https://upload.wikimedia.org/wikipedia/commons/thumb/5/53/Music_festival.jpg/1280px-Music_festival.jpg',
    'https://upload.wikimedia.org/wikipedia/commons/thumb/d/dc/Indian_dance_festival.jpg/1280px-Indian_dance_festival.jpg',
  ],
  technical_fest: [
    'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e1/Hackathon_image.jpg/1280px-Hackathon_image.jpg',
    'https://upload.wikimedia.org/wikipedia/commons/thumb/4/40/PCB_design_workshop.jpg/1280px-PCB_design_workshop.jpg',
    'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d7/Robotics_workshop.jpg/1280px-Robotics_workshop.jpg',
    'https://upload.wikimedia.org/wikipedia/commons/thumb/c/cb/Computer_lab_workshop.jpg/1280px-Computer_lab_workshop.jpg',
    'https://upload.wikimedia.org/wikipedia/commons/thumb/9/93/Drone_demonstration.jpg/1280px-Drone_demonstration.jpg',
  ],
  research: [
    'https://upload.wikimedia.org/wikipedia/commons/thumb/6/6e/Microscope_in_a_research_laboratory.jpg/1280px-Microscope_in_a_research_laboratory.jpg',
    'https://upload.wikimedia.org/wikipedia/commons/thumb/3/3a/Scientists_in_lab.jpg/1280px-Scientists_in_lab.jpg',
    'https://upload.wikimedia.org/wikipedia/commons/thumb/9/95/Research_laboratory_2.jpg/1280px-Research_laboratory_2.jpg',
  ],
  clinical: [
    'https://upload.wikimedia.org/wikipedia/commons/thumb/3/3a/Stethoscope-2.jpg/1280px-Stethoscope-2.jpg',
    'https://upload.wikimedia.org/wikipedia/commons/thumb/9/9d/Doctor_examines_patient_in_office.jpg/1280px-Doctor_examines_patient_in_office.jpg',
    'https://upload.wikimedia.org/wikipedia/commons/thumb/8/85/Hospital_ward.jpg/1280px-Hospital_ward.jpg',
  ],
  general: [
    'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c5/Students_at_university.jpg/1280px-Students_at_university.jpg',
    'https://upload.wikimedia.org/wikipedia/commons/thumb/3/3e/University_students_in_classroom.jpg/1280px-University_students_in_classroom.jpg',
    'https://upload.wikimedia.org/wikipedia/commons/thumb/4/47/Graduation_ceremony.jpg/1280px-Graduation_ceremony.jpg',
  ],
};

// Topic-relevant placeholder images that always work (Picsum + custom)
const PLACEHOLDER_BASE = 'https://images.unsplash.com/';

const VERIFIED_POOLS: Record<string, string[]> = {
  sports: [
    'https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=1280&q=80', // basketball
    'https://images.unsplash.com/photo-1471295253337-3ceaaedca402?w=1280&q=80', // soccer
    'https://images.unsplash.com/photo-1540747913346-19e32dc3e97e?w=1280&q=80', // tennis
    'https://images.unsplash.com/photo-1565992441121-4367c2967103?w=1280&q=80', // cricket
    'https://images.unsplash.com/photo-1551958219-acbc608c6377?w=1280&q=80', // running track
    'https://images.unsplash.com/photo-1530549387789-4c1017266635?w=1280&q=80', // gym
    'https://images.unsplash.com/photo-1546519638-68e109498ffc?w=1280&q=80', // swimming
    'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=1280&q=80', // basketball court
    'https://images.unsplash.com/photo-1517649763962-0c623066013b?w=1280&q=80', // football stadium
    'https://images.unsplash.com/photo-1518604666860-9ed391f76460?w=1280&q=80', // badminton
    'https://images.unsplash.com/photo-1533560904424-a0c61dc306fc?w=1280&q=80', // hockey
    'https://images.unsplash.com/photo-1541534741688-6078c6bfb5c5?w=1280&q=80', // basketball
    'https://images.unsplash.com/photo-1593766787879-a4f1a8b58772?w=1280&q=80', // sports field
    'https://images.unsplash.com/photo-1517466787929-bc90951d0974?w=1280&q=80', // race
    'https://images.unsplash.com/photo-1487466365202-1afdb86c764e?w=1280&q=80', // running
  ],
  clubs: [
    'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=1280&q=80', // students collaborating
    'https://images.unsplash.com/photo-1543269865-cbf427effbad?w=1280&q=80', // group discussion
    'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=1280&q=80', // group laptop
    'https://images.unsplash.com/photo-1531538606174-0f90ff5dce83?w=1280&q=80', // robotics
    'https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?w=1280&q=80', // workshop
    'https://images.unsplash.com/photo-1523580494863-6f3031224c94?w=1280&q=80', // photography
    'https://images.unsplash.com/photo-1559223669-e0065fa7f142?w=1280&q=80', // chess club
    'https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=1280&q=80', // students discussing
    'https://images.unsplash.com/photo-1556761175-5973dc0f32e7?w=1280&q=80', // meeting
    'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=1280&q=80', // tech club
    'https://images.unsplash.com/photo-1517048676732-d65bc937f952?w=1280&q=80', // group brainstorm
    'https://images.unsplash.com/photo-1542744173-8e7e53415bb0?w=1280&q=80', // workshop
    'https://images.unsplash.com/photo-1552664730-d307ca884978?w=1280&q=80', // discussion
    'https://images.unsplash.com/photo-1497032628192-86f99bcd76bc?w=1280&q=80', // music club
    'https://images.unsplash.com/photo-1531497865144-0464ef8fb9a9?w=1280&q=80', // art club
  ],
  cultural: [
    'https://images.unsplash.com/photo-1523854588497-ed29b21a3a1a?w=1280&q=80', // dance performance
    'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=1280&q=80', // concert
    'https://images.unsplash.com/photo-1501281668745-f7f57925c3b4?w=1280&q=80', // music festival
    'https://images.unsplash.com/photo-1496337589254-7e19d01cec44?w=1280&q=80', // stage performance
    'https://images.unsplash.com/photo-1549451371-64aa98a6f660?w=1280&q=80', // cultural event
    'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=1280&q=80', // crowd festival
    'https://images.unsplash.com/photo-1493676304819-0d7a8d026dcf?w=1280&q=80', // dance
    'https://images.unsplash.com/photo-1465847899084-d164df4dedc6?w=1280&q=80', // theatre
    'https://images.unsplash.com/photo-1540039155733-5bb30b53aa14?w=1280&q=80', // music performance
    'https://images.unsplash.com/photo-1604078437961-d40f8efa92fa?w=1280&q=80', // Indian dance
    'https://images.unsplash.com/photo-1505236858219-8359eb29e329?w=1280&q=80', // performance
    'https://images.unsplash.com/photo-1602748828300-6ee71929ce82?w=1280&q=80', // celebration
  ],
  technical_fest: [
    'https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=1280&q=80', // hackathon
    'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=1280&q=80', // coding
    'https://images.unsplash.com/photo-1531297484001-80022131f5a1?w=1280&q=80', // workshop
    'https://images.unsplash.com/photo-1518770660439-4636190af475?w=1280&q=80', // robotics
    'https://images.unsplash.com/photo-1581090464777-f3220bbe1b8b?w=1280&q=80', // engineering
    'https://images.unsplash.com/photo-1551836022-d5d88e9218df?w=1280&q=80', // electronics
    'https://images.unsplash.com/photo-1581092580497-e0d23cbdf1dc?w=1280&q=80', // tech expo
    'https://images.unsplash.com/photo-1601132359864-c974e79890ac?w=1280&q=80', // 3D printing
    'https://images.unsplash.com/photo-1555099962-4199c345e5dd?w=1280&q=80', // drone
    'https://images.unsplash.com/photo-1546776230-bb86256870ce?w=1280&q=80', // tech demo
    'https://images.unsplash.com/photo-1573164713714-d95e436ab8d6?w=1280&q=80', // coders
    'https://images.unsplash.com/photo-1581094288338-2314dddb7ece?w=1280&q=80', // tech fest
  ],
  research: [
    'https://images.unsplash.com/photo-1532094349884-543bc11b234d?w=1280&q=80', // microscope
    'https://images.unsplash.com/photo-1581093588401-fbb62a02f120?w=1280&q=80', // lab
    'https://images.unsplash.com/photo-1582719471384-894fbb16e074?w=1280&q=80', // chemistry
    'https://images.unsplash.com/photo-1581093458791-9d09c5e96d2e?w=1280&q=80', // research
    'https://images.unsplash.com/photo-1554475901-4538ddfbccc2?w=1280&q=80', // microscope
    'https://images.unsplash.com/photo-1576086213369-97a306d36557?w=1280&q=80', // research lab
    'https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?w=1280&q=80', // biology lab
    'https://images.unsplash.com/photo-1581093450021-4a7360e9a6b5?w=1280&q=80', // medical research
    'https://images.unsplash.com/photo-1564325724739-bae0bd08ae2a?w=1280&q=80', // experiment
    'https://images.unsplash.com/photo-1555212697-194d092e3b8f?w=1280&q=80', // physics
    'https://images.unsplash.com/photo-1530026405186-ed1f139313f8?w=1280&q=80', // chemistry research
    'https://images.unsplash.com/photo-1606761568499-6d2451b23c66?w=1280&q=80', // lab work
  ],
  clinical: [
    'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=1280&q=80', // medical
    'https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=1280&q=80', // doctors
    'https://images.unsplash.com/photo-1551601651-2a8555f1a136?w=1280&q=80', // hospital
    'https://images.unsplash.com/photo-1538108149393-fbbd81895907?w=1280&q=80', // medical exam
    'https://images.unsplash.com/photo-1530497610245-94d3c16cda28?w=1280&q=80', // surgery
    'https://images.unsplash.com/photo-1631815587646-b85a1bb027e1?w=1280&q=80', // medical training
    'https://images.unsplash.com/photo-1612531386530-97286d97c2d2?w=1280&q=80', // doctor
    'https://images.unsplash.com/photo-1584467735815-f778f274e296?w=1280&q=80', // hospital ward
    'https://images.unsplash.com/photo-1631217872822-1c2546d6b864?w=1280&q=80', // medical training
    'https://images.unsplash.com/photo-1576765608535-5f04d1e3f289?w=1280&q=80', // patient care
  ],
  debate: [
    'https://images.unsplash.com/photo-1577563908411-5077b6dc7624?w=1280&q=80', // discussion
    'https://images.unsplash.com/photo-1517048676732-d65bc937f952?w=1280&q=80', // group debate
    'https://images.unsplash.com/photo-1521791136064-7986c2920216?w=1280&q=80', // public speaking
    'https://images.unsplash.com/photo-1559223607-a43c990c692c?w=1280&q=80', // mun
    'https://images.unsplash.com/photo-1505373877841-8d25f7d46678?w=1280&q=80', // conference
    'https://images.unsplash.com/photo-1591115765373-5207764f72e7?w=1280&q=80', // panel
  ],
  music: [
    'https://images.unsplash.com/photo-1519892300165-cb5542fb47c7?w=1280&q=80', // band
    'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=1280&q=80', // music
    'https://images.unsplash.com/photo-1511192336575-5a79af67a629?w=1280&q=80', // guitar
    'https://images.unsplash.com/photo-1545535170-99c7a3d8d8b7?w=1280&q=80', // piano
    'https://images.unsplash.com/photo-1594394489098-74ac04c0fc2e?w=1280&q=80', // band performance
    'https://images.unsplash.com/photo-1507838153414-b4b713384a76?w=1280&q=80', // concert
    'https://images.unsplash.com/photo-1466104857302-58c23faaa0d3?w=1280&q=80', // music
    'https://images.unsplash.com/photo-1487180144351-b8472da7d491?w=1280&q=80', // performance
  ],
  drama: [
    'https://images.unsplash.com/photo-1503095396549-807759245b35?w=1280&q=80', // theatre
    'https://images.unsplash.com/photo-1507676184212-d03ab07a01bf?w=1280&q=80', // stage
    'https://images.unsplash.com/photo-1499364615650-ec38552f4f34?w=1280&q=80', // performance
    'https://images.unsplash.com/photo-1615397587950-3cbb55f95b77?w=1280&q=80', // theatre stage
    'https://images.unsplash.com/photo-1514306191717-452ec28c7814?w=1280&q=80', // drama
    'https://images.unsplash.com/photo-1611464908623-07f63cd62f47?w=1280&q=80', // play
  ],
  hostel: [
    'https://images.unsplash.com/photo-1555854877-bab0e564b8d5?w=1280&q=80', // dorm
    'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=1280&q=80', // bedroom
    'https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=1280&q=80', // dormitory
    'https://images.unsplash.com/photo-1537726235470-8504e3beef77?w=1280&q=80', // hostel
    'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=1280&q=80', // hostel building
  ],
  library: [
    'https://images.unsplash.com/photo-1521587760476-6c12a4b040da?w=1280&q=80', // library
    'https://images.unsplash.com/photo-1568667256549-094345857637?w=1280&q=80', // library books
    'https://images.unsplash.com/photo-1507842217343-583bb7270b66?w=1280&q=80', // books
    'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=1280&q=80', // library
    'https://images.unsplash.com/photo-1568667256549-094345857637?w=1280&q=80', // university library
    'https://images.unsplash.com/photo-1571260899304-425eee4c7efc?w=1280&q=80', // study
  ],
  placement: [
    'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=1280&q=80', // interview
    'https://images.unsplash.com/photo-1521791136064-7986c2920216?w=1280&q=80', // job fair
    'https://images.unsplash.com/photo-1565688534245-05d6b5be184a?w=1280&q=80', // career fair
    'https://images.unsplash.com/photo-1521737711867-e3b97375f902?w=1280&q=80', // handshake
    'https://images.unsplash.com/photo-1542744095-291d1f67b221?w=1280&q=80', // recruitment
    'https://images.unsplash.com/photo-1573164574572-cb89e39749b4?w=1280&q=80', // office
    'https://images.unsplash.com/photo-1556761175-b413da4baf72?w=1280&q=80', // career
  ],
  innovation: [
    'https://images.unsplash.com/photo-1559136555-9303baea8ebd?w=1280&q=80', // startup
    'https://images.unsplash.com/photo-1556761175-5973dc0f32e7?w=1280&q=80', // brainstorm
    'https://images.unsplash.com/photo-1556228724-4c513a8e3e9e?w=1280&q=80', // innovation
    'https://images.unsplash.com/photo-1551434678-e076c223a692?w=1280&q=80', // collaboration
    'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=1280&q=80', // teamwork
    'https://images.unsplash.com/photo-1581093588401-fbb62a02f120?w=1280&q=80', // research
    'https://images.unsplash.com/photo-1523580494863-6f3031224c94?w=1280&q=80', // workspace
  ],
  community: [
    'https://images.unsplash.com/photo-1559027615-cd4628902d4a?w=1280&q=80', // volunteers
    'https://images.unsplash.com/photo-1593113598332-cd288d649433?w=1280&q=80', // community service
    'https://images.unsplash.com/photo-1469571486292-0ba58a3f068b?w=1280&q=80', // helping hands
    'https://images.unsplash.com/photo-1577563682708-3eee72f6e4ed?w=1280&q=80', // group volunteer
    'https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?w=1280&q=80', // outreach
    'https://images.unsplash.com/photo-1604881991720-f91add269bed?w=1280&q=80', // community
    'https://images.unsplash.com/photo-1593113598332-cd288d649433?w=1280&q=80', // helping
  ],
  lab: [
    'https://images.unsplash.com/photo-1581093458791-9d09c5e96d2e?w=1280&q=80', // chemistry lab
    'https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?w=1280&q=80', // biology
    'https://images.unsplash.com/photo-1518152006812-edab29b069ac?w=1280&q=80', // computer lab
    'https://images.unsplash.com/photo-1554475901-4538ddfbccc2?w=1280&q=80', // microscope
    'https://images.unsplash.com/photo-1576086213369-97a306d36557?w=1280&q=80', // research
    'https://images.unsplash.com/photo-1606761568499-6d2451b23c66?w=1280&q=80', // lab equipment
    'https://images.unsplash.com/photo-1576670392954-1e8b3b7c3540?w=1280&q=80', // lab work
    'https://images.unsplash.com/photo-1581094288338-2314dddb7ece?w=1280&q=80', // electronics lab
  ],
  general: [
    'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=1280&q=80', // students campus
    'https://images.unsplash.com/photo-1571260899304-425eee4c7efc?w=1280&q=80', // study
    'https://images.unsplash.com/photo-1497486751825-1233686d5d80?w=1280&q=80', // graduation
    'https://images.unsplash.com/photo-1523580494863-6f3031224c94?w=1280&q=80', // group
    'https://images.unsplash.com/photo-1517486808906-6ca8b3f04846?w=1280&q=80', // students
    'https://images.unsplash.com/photo-1517048676732-d65bc937f952?w=1280&q=80', // discussion
    'https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=1280&q=80', // students discussing
    'https://images.unsplash.com/photo-1543269865-cbf427effbad?w=1280&q=80', // group laptop
    'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=1280&q=80', // collaboration
    'https://images.unsplash.com/photo-1492538368677-f6e0afe31dcc?w=1280&q=80', // graduation
    'https://images.unsplash.com/photo-1541339907198-e08756dedf3f?w=1280&q=80', // university
  ],
};

function getActivityType(title: string): string {
  const t = title.toLowerCase();
  if (t.includes('sport') || t.includes('athletic')) return 'sports';
  if (t.includes('club') || t.includes('societ')) return 'clubs';
  if (t.includes('technical fest') || t.includes('tech fest') || t.includes('hackathon')) return 'technical_fest';
  if (t.includes('cultural') || t.includes('fest') && !t.includes('tech')) return 'cultural';
  if (t.includes('clinical')) return 'clinical';
  if (t.includes('research')) return 'research';
  if (t.includes('debate') || t.includes('mun')) return 'debate';
  if (t.includes('music') || t.includes('band')) return 'music';
  if (t.includes('drama') || t.includes('theatre')) return 'drama';
  if (t.includes('hostel') || t.includes('accommodation')) return 'hostel';
  if (t.includes('library')) return 'library';
  if (t.includes('placement')) return 'placement';
  if (t.includes('innovation') || t.includes('startup') || t.includes('entrepreneur')) return 'innovation';
  if (t.includes('community') || t.includes('social')) return 'community';
  if (t.includes('lab')) return 'lab';
  return 'general';
}

async function main() {
  await mongoose.connect(MONGO_URI);
  const db = mongoose.connection.db!;

  console.log('Pool sizes:');
  for (const [type, imgs] of Object.entries(VERIFIED_POOLS)) {
    console.log(`  ${type}: ${imgs.length} images`);
  }

  console.log('\n=== Updating activity images ===');
  const colleges = await db.collection('colleges').find({}, { projection: { name: 1, campusLife: 1 } }).toArray();

  let totalActivities = 0, fixed = 0;

  for (let i = 0; i < colleges.length; i++) {
    const college = colleges[i];
    if (i % 100 === 0) console.log(`Progress: ${i}/${colleges.length}`);

    if (!college.campusLife || college.campusLife.length === 0) continue;

    const updatedActivities = college.campusLife.map((activity: any, actIdx: number) => {
      totalActivities++;
      const type = getActivityType(activity.title);
      const pool = VERIFIED_POOLS[type] || VERIFIED_POOLS['general'];

      // Distribute across pool deterministically using college name + activity title + activity index
      const seed = (college.name + activity.title + actIdx)
        .split('')
        .reduce((s: number, c: string) => s + c.charCodeAt(0), 0);
      const idx = seed % pool.length;
      const newImage = pool[idx];

      if (newImage !== activity.image) {
        fixed++;
        return { ...activity, image: newImage };
      }
      return activity;
    });

    await db.collection('colleges').updateOne(
      { _id: college._id },
      { $set: { campusLife: updatedActivities } }
    );
  }

  console.log(`\nTotal activities: ${totalActivities}`);
  console.log(`Fixed: ${fixed}`);

  // Verify
  console.log('\n=== Verification ===');
  const updated = await db.collection('colleges').find({}, { projection: { campusLife: 1 } }).toArray();
  const imgMap = new Map<string, number>();
  for (const c of updated) {
    if (!c.campusLife) continue;
    for (const a of c.campusLife) {
      if (!a.image) continue;
      imgMap.set(a.image, (imgMap.get(a.image) || 0) + 1);
    }
  }
  console.log(`Unique images: ${imgMap.size}`);
  const dupes = [...imgMap.entries()].filter(([u, n]) => n > 1).sort((a, b) => b[1] - a[1]);
  console.log(`Most reused (top 5):`);
  for (const [url, n] of dupes.slice(0, 5)) {
    console.log(`  ${n} uses: ${url.substring(0, 60)}`);
  }

  await mongoose.disconnect();
}

main().catch(console.error);
