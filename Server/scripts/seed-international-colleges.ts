import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();

const COUNTRY_DATA: Record<string, { cities: string[]; universities: { name: string; city: string; type: 'Public' | 'Private'; established: number; rating: number; desc: string }[] }> = {
  "United Kingdom": {
    cities: ["London", "Oxford", "Cambridge", "Edinburgh", "Manchester", "Birmingham", "Bristol", "Leeds", "Glasgow", "Liverpool"],
    universities: [
      { name: "University of Oxford", city: "Oxford", type: "Public", established: 1096, rating: 4.9, desc: "One of the world's oldest and most prestigious universities, renowned for tutorial-based teaching and groundbreaking research across all disciplines." },
      { name: "University of Cambridge", city: "Cambridge", type: "Public", established: 1209, rating: 4.9, desc: "A world-leading research university with a rich history of academic excellence, famous for its college system and pioneering discoveries." },
      { name: "Imperial College London", city: "London", type: "Public", established: 1907, rating: 4.8, desc: "A global top-10 university focused on science, engineering, medicine, and business, located in the heart of London." },
      { name: "University College London (UCL)", city: "London", type: "Public", established: 1826, rating: 4.7, desc: "London's leading multidisciplinary university with a strong commitment to research excellence and social responsibility." },
      { name: "London School of Economics (LSE)", city: "London", type: "Public", established: 1895, rating: 4.7, desc: "The world's leading social science institution, producing world leaders, Nobel laureates, and policy-makers." },
      { name: "University of Edinburgh", city: "Edinburgh", type: "Public", established: 1583, rating: 4.6, desc: "Scotland's premier university, known for its stunning campus, world-class research, and vibrant student life." },
      { name: "King's College London", city: "London", type: "Public", established: 1829, rating: 4.6, desc: "One of England's oldest universities, renowned for health sciences, law, and humanities research." },
      { name: "University of Manchester", city: "Manchester", type: "Public", established: 1824, rating: 4.5, desc: "A Russell Group university known for groundbreaking research including graphene discovery and the birth of computing." },
      { name: "University of Bristol", city: "Bristol", type: "Public", established: 1876, rating: 4.5, desc: "A leading research university with strong industry links and beautiful campus in one of the UK's most liveable cities." },
      { name: "University of Warwick", city: "Birmingham", type: "Public", established: 1965, rating: 4.5, desc: "A top-tier research university known for business, economics, and engineering programs with excellent industry connections." },
      { name: "University of Glasgow", city: "Glasgow", type: "Public", established: 1451, rating: 4.4, desc: "One of the UK's most prestigious universities, a member of the Russell Group with world-class research and teaching." },
      { name: "University of Leeds", city: "Leeds", type: "Public", established: 1904, rating: 4.4, desc: "A major research university with a strong reputation for engineering, business, and healthcare studies." },
      { name: "Durham University", city: "Leeds", type: "Public", established: 1832, rating: 4.5, desc: "England's third-oldest university, known for its collegiate system, stunning cathedral city campus, and research excellence." },
      { name: "University of St Andrews", city: "Edinburgh", type: "Public", established: 1413, rating: 4.6, desc: "Scotland's oldest university, world-renowned for its teaching quality and intimate learning environment." },
      { name: "Queen Mary University of London", city: "London", type: "Public", established: 1885, rating: 4.3, desc: "A Russell Group university in East London with strong research in medicine, law, engineering, and humanities." },
      { name: "University of Liverpool", city: "Liverpool", type: "Public", established: 1881, rating: 4.3, desc: "A founding member of the Russell Group, known for its pioneering research in tropical medicine, architecture, and engineering." },
      { name: "University of Southampton", city: "Bristol", type: "Public", established: 1862, rating: 4.4, desc: "A leading research university with world-class facilities in engineering, computer science, and ocean sciences." },
      { name: "University of Exeter", city: "Bristol", type: "Public", established: 1955, rating: 4.4, desc: "A Russell Group university known for business, humanities, and environmental sciences in a beautiful campus setting." },
      { name: "Lancaster University", city: "Manchester", type: "Public", established: 1964, rating: 4.3, desc: "A top-15 UK university renowned for research excellence, particularly in business, linguistics, and environmental science." },
      { name: "University of Bath", city: "Bristol", type: "Public", established: 1966, rating: 4.5, desc: "Consistently ranked among top UK universities, known for engineering, science, and its renowned School of Management." },
    ]
  },
  "United States": {
    cities: ["New York", "Boston", "San Francisco", "Los Angeles", "Chicago", "Philadelphia", "Houston", "Seattle", "Atlanta", "Washington DC"],
    universities: [
      { name: "Massachusetts Institute of Technology (MIT)", city: "Boston", type: "Private", established: 1861, rating: 4.9, desc: "The world's leading institution for science, engineering, and technology education and research." },
      { name: "Stanford University", city: "San Francisco", type: "Private", established: 1885, rating: 4.9, desc: "A world-class research university in the heart of Silicon Valley, known for entrepreneurship and innovation." },
      { name: "Harvard University", city: "Boston", type: "Private", established: 1636, rating: 4.9, desc: "America's oldest university, renowned for producing world leaders across law, medicine, business, and public policy." },
      { name: "California Institute of Technology (Caltech)", city: "Los Angeles", type: "Private", established: 1891, rating: 4.8, desc: "A small but mighty institution focused on science and engineering, with the highest per-capita research output globally." },
      { name: "University of Chicago", city: "Chicago", type: "Private", established: 1890, rating: 4.8, desc: "Known for rigorous academics and pioneering research across economics, law, physics, and social sciences." },
      { name: "Columbia University", city: "New York", type: "Private", established: 1754, rating: 4.7, desc: "An Ivy League university in Manhattan, offering world-class programs in journalism, business, law, and medicine." },
      { name: "University of Pennsylvania", city: "Philadelphia", type: "Private", established: 1740, rating: 4.7, desc: "Home to the Wharton School, one of the world's top business schools, with strong programs across all disciplines." },
      { name: "New York University (NYU)", city: "New York", type: "Private", established: 1831, rating: 4.5, desc: "A major global research university located in Greenwich Village, known for arts, business, and law programs." },
      { name: "University of California, Berkeley", city: "San Francisco", type: "Public", established: 1868, rating: 4.7, desc: "America's top public university, known for engineering, computer science, and social activism." },
      { name: "University of California, Los Angeles (UCLA)", city: "Los Angeles", type: "Public", established: 1919, rating: 4.6, desc: "A leading public research university known for film, medicine, engineering, and one of the most beautiful campuses in the US." },
      { name: "Georgia Institute of Technology", city: "Atlanta", type: "Public", established: 1885, rating: 4.6, desc: "A top-tier public research university renowned for engineering, computing, and technology programs." },
      { name: "University of Washington", city: "Seattle", type: "Public", established: 1861, rating: 4.5, desc: "A leading public research university with strengths in computer science, medicine, and engineering." },
      { name: "Rice University", city: "Houston", type: "Private", established: 1912, rating: 4.6, desc: "A highly selective university known for engineering, natural sciences, and a vibrant residential college system." },
      { name: "Carnegie Mellon University", city: "Philadelphia", type: "Private", established: 1900, rating: 4.7, desc: "World-renowned for computer science, robotics, artificial intelligence, and fine arts programs." },
      { name: "Northwestern University", city: "Chicago", type: "Private", established: 1851, rating: 4.6, desc: "A prestigious private university known for journalism, performing arts, engineering, and the Kellogg School of Management." },
      { name: "University of Michigan", city: "Chicago", type: "Public", established: 1817, rating: 4.6, desc: "One of the top public universities in the US, known for engineering, business, medicine, and a massive alumni network." },
      { name: "Boston University", city: "Boston", type: "Private", established: 1839, rating: 4.4, desc: "A major private research university known for communications, business, engineering, and health sciences." },
      { name: "University of Southern California (USC)", city: "Los Angeles", type: "Private", established: 1880, rating: 4.5, desc: "A leading private university known for film, business, engineering, and a powerful alumni network in entertainment." },
      { name: "Georgetown University", city: "Washington DC", type: "Private", established: 1789, rating: 4.6, desc: "America's oldest Catholic university, renowned for international relations, law, and public policy." },
      { name: "Emory University", city: "Atlanta", type: "Private", established: 1836, rating: 4.5, desc: "A top research university known for health sciences, business, and law with a beautiful campus in Atlanta." },
    ]
  },
  "Canada": {
    cities: ["Toronto", "Vancouver", "Montreal", "Ottawa", "Calgary", "Edmonton", "Waterloo", "Halifax", "Victoria", "Quebec City"],
    universities: [
      { name: "University of Toronto", city: "Toronto", type: "Public", established: 1827, rating: 4.8, desc: "Canada's top-ranked university, a global leader in research with strengths across all academic disciplines." },
      { name: "McGill University", city: "Montreal", type: "Public", established: 1821, rating: 4.7, desc: "One of Canada's most prestigious universities, known for medicine, engineering, and an internationally diverse student body." },
      { name: "University of British Columbia (UBC)", city: "Vancouver", type: "Public", established: 1908, rating: 4.7, desc: "A world-class university with a stunning campus overlooking the Pacific, renowned for research and sustainability." },
      { name: "University of Waterloo", city: "Waterloo", type: "Public", established: 1957, rating: 4.6, desc: "Canada's top co-op education university, known for computer science, engineering, and strong industry partnerships." },
      { name: "University of Alberta", city: "Edmonton", type: "Public", established: 1908, rating: 4.5, desc: "A leading Canadian research university known for AI research, energy sciences, and health studies." },
      { name: "University of Montreal", city: "Montreal", type: "Public", established: 1878, rating: 4.5, desc: "The largest French-language university in North America, a hub for AI research with Mila institute." },
      { name: "University of Ottawa", city: "Ottawa", type: "Public", established: 1848, rating: 4.3, desc: "Canada's largest bilingual university, located in the national capital with strong law, health, and policy programs." },
      { name: "Queen's University", city: "Toronto", type: "Public", established: 1841, rating: 4.5, desc: "A prestigious university known for its strong community, excellent business school, and research-intensive programs." },
      { name: "University of Calgary", city: "Calgary", type: "Public", established: 1966, rating: 4.4, desc: "A leading research university with strengths in energy, engineering, and health sciences in western Canada." },
      { name: "Dalhousie University", city: "Halifax", type: "Public", established: 1818, rating: 4.3, desc: "Atlantic Canada's leading research university, known for ocean sciences, medicine, and engineering." },
      { name: "McMaster University", city: "Toronto", type: "Public", established: 1887, rating: 4.5, desc: "Renowned for health sciences and problem-based learning, consistently ranked among Canada's top research universities." },
      { name: "Western University", city: "Toronto", type: "Public", established: 1878, rating: 4.4, desc: "Known for the Ivey Business School, one of the top MBA programs in Canada, and strong medical research." },
      { name: "Simon Fraser University", city: "Vancouver", type: "Public", established: 1965, rating: 4.4, desc: "An innovative university known for co-op programs, environmental science, and computing research in Metro Vancouver." },
      { name: "University of Victoria", city: "Victoria", type: "Public", established: 1963, rating: 4.3, desc: "A top-tier research university on Vancouver Island, known for law, engineering, and environmental studies." },
      { name: "Carleton University", city: "Ottawa", type: "Public", established: 1942, rating: 4.2, desc: "Located in the national capital, known for journalism, public affairs, engineering, and strong government connections." },
    ]
  },
  "Australia": {
    cities: ["Sydney", "Melbourne", "Brisbane", "Perth", "Adelaide", "Canberra", "Gold Coast", "Hobart", "Darwin", "Newcastle"],
    universities: [
      { name: "University of Melbourne", city: "Melbourne", type: "Public", established: 1853, rating: 4.8, desc: "Australia's top-ranked university, renowned for research excellence across medicine, law, engineering, and arts." },
      { name: "University of Sydney", city: "Sydney", type: "Public", established: 1850, rating: 4.7, desc: "Australia's oldest university with a globally recognized campus, known for health sciences, engineering, and business." },
      { name: "Australian National University (ANU)", city: "Canberra", type: "Public", established: 1946, rating: 4.7, desc: "Australia's national research university, ranked highest for politics, international relations, and natural sciences." },
      { name: "University of Queensland (UQ)", city: "Brisbane", type: "Public", established: 1909, rating: 4.6, desc: "A leading Australian university known for biomedical research, environmental science, and engineering." },
      { name: "University of New South Wales (UNSW)", city: "Sydney", type: "Public", established: 1949, rating: 4.6, desc: "A global top-50 university known for engineering, business, and a strong focus on innovation and entrepreneurship." },
      { name: "Monash University", city: "Melbourne", type: "Public", established: 1958, rating: 4.5, desc: "Australia's largest university, known for pharmacy, engineering, and a globally connected campus network." },
      { name: "University of Western Australia (UWA)", city: "Perth", type: "Public", established: 1911, rating: 4.5, desc: "Perth's premier university, known for mining engineering, marine sciences, and agricultural research." },
      { name: "University of Adelaide", city: "Adelaide", type: "Public", established: 1874, rating: 4.4, desc: "A Group of Eight university known for wine science, health sciences, and engineering in South Australia." },
      { name: "University of Technology Sydney (UTS)", city: "Sydney", type: "Public", established: 1988, rating: 4.3, desc: "A practice-oriented university known for design, IT, engineering, and strong industry partnerships." },
      { name: "RMIT University", city: "Melbourne", type: "Public", established: 1887, rating: 4.3, desc: "Known for technology, design, and enterprise programs with a strong focus on work-integrated learning." },
      { name: "Griffith University", city: "Gold Coast", type: "Public", established: 1971, rating: 4.2, desc: "A progressive university known for environmental science, arts, and health with campuses across South East Queensland." },
      { name: "University of Tasmania", city: "Hobart", type: "Public", established: 1890, rating: 4.1, desc: "Australia's fourth-oldest university, known for Antarctic and marine studies, arts, and environmental research." },
      { name: "Macquarie University", city: "Sydney", type: "Public", established: 1964, rating: 4.3, desc: "Known for linguistics, psychology, and business, located in Sydney's technology corridor with strong industry ties." },
      { name: "Deakin University", city: "Melbourne", type: "Public", established: 1974, rating: 4.2, desc: "An innovative university known for nursing, education, and sport science with flexible online learning options." },
      { name: "Queensland University of Technology (QUT)", city: "Brisbane", type: "Public", established: 1989, rating: 4.2, desc: "A real-world university known for creative industries, business, and health with a vibrant city campus." },
    ]
  },
  "Germany": {
    cities: ["Berlin", "Munich", "Hamburg", "Frankfurt", "Heidelberg", "Stuttgart", "Cologne", "Dresden", "Aachen", "Freiburg"],
    universities: [
      { name: "Technical University of Munich (TUM)", city: "Munich", type: "Public", established: 1868, rating: 4.8, desc: "Germany's top technical university, renowned for engineering, natural sciences, and entrepreneurship." },
      { name: "Ludwig Maximilian University of Munich (LMU)", city: "Munich", type: "Public", established: 1472, rating: 4.7, desc: "One of Europe's oldest and most prestigious universities, excelling in humanities, sciences, and medicine." },
      { name: "Heidelberg University", city: "Heidelberg", type: "Public", established: 1386, rating: 4.7, desc: "Germany's oldest university, a global leader in medical research, natural sciences, and humanities." },
      { name: "Humboldt University of Berlin", city: "Berlin", type: "Public", established: 1810, rating: 4.6, desc: "A historic university in the heart of Berlin, known for arts, humanities, and social sciences with 29 Nobel laureates." },
      { name: "Free University of Berlin", city: "Berlin", type: "Public", established: 1948, rating: 4.5, desc: "A leading research university known for political science, social sciences, and an extensive international network." },
      { name: "RWTH Aachen University", city: "Aachen", type: "Public", established: 1870, rating: 4.6, desc: "One of Europe's leading technical universities, particularly strong in mechanical and electrical engineering." },
      { name: "University of Freiburg", city: "Freiburg", type: "Public", established: 1457, rating: 4.5, desc: "A renowned research university known for environmental sciences, medicine, and a beautiful Black Forest setting." },
      { name: "University of Hamburg", city: "Hamburg", type: "Public", established: 1919, rating: 4.4, desc: "Northern Germany's largest university, known for climate research, physics, and maritime studies." },
      { name: "University of Stuttgart", city: "Stuttgart", type: "Public", established: 1829, rating: 4.4, desc: "A leading technical university with strong automotive engineering and close ties to Mercedes-Benz, Porsche, and Bosch." },
      { name: "Technical University of Berlin", city: "Berlin", type: "Public", established: 1879, rating: 4.5, desc: "A major technical university in Berlin, known for engineering, computer science, and sustainability research." },
      { name: "University of Cologne", city: "Cologne", type: "Public", established: 1388, rating: 4.3, desc: "One of Germany's oldest universities, known for economics, law, and social sciences in the Rhineland." },
      { name: "University of Göttingen", city: "Hamburg", type: "Public", established: 1737, rating: 4.4, desc: "A historic university known for mathematics, physics, and 45 Nobel Prize affiliations." },
      { name: "TU Dresden", city: "Dresden", type: "Public", established: 1828, rating: 4.4, desc: "Saxony's largest university, known for engineering, microelectronics, and biomedical research." },
      { name: "Goethe University Frankfurt", city: "Frankfurt", type: "Public", established: 1914, rating: 4.3, desc: "A major research university in Germany's financial capital, strong in economics, law, and natural sciences." },
      { name: "University of Mannheim", city: "Stuttgart", type: "Public", established: 1967, rating: 4.4, desc: "Germany's leading university for business and economics, located in a historic baroque palace." },
    ]
  },
  "Singapore": {
    cities: ["Singapore"],
    universities: [
      { name: "National University of Singapore (NUS)", city: "Singapore", type: "Public", established: 1905, rating: 4.9, desc: "Asia's top university, known for engineering, business, computing, and interdisciplinary research excellence." },
      { name: "Nanyang Technological University (NTU)", city: "Singapore", type: "Public", established: 1981, rating: 4.8, desc: "A young but world-leading university known for engineering, AI research, and one of the most beautiful campuses globally." },
      { name: "Singapore Management University (SMU)", city: "Singapore", type: "Private", established: 2000, rating: 4.5, desc: "A premier business university in the city centre, known for accountancy, finance, and interactive pedagogy." },
      { name: "Singapore University of Technology and Design (SUTD)", city: "Singapore", type: "Public", established: 2009, rating: 4.4, desc: "Singapore's design-focused university established in collaboration with MIT, known for innovation and design thinking." },
      { name: "Singapore Institute of Technology (SIT)", city: "Singapore", type: "Public", established: 2009, rating: 4.2, desc: "Singapore's university of applied learning, offering industry-focused degree programs with integrated work study." },
      { name: "James Cook University Singapore", city: "Singapore", type: "Private", established: 2003, rating: 4.0, desc: "An Australian university campus in Singapore offering business, IT, psychology, and environmental science programs." },
      { name: "INSEAD Singapore", city: "Singapore", type: "Private", established: 2000, rating: 4.7, desc: "One of the world's top business schools with a full Asia campus offering MBA and executive education programs." },
      { name: "Singapore Polytechnic", city: "Singapore", type: "Public", established: 1954, rating: 4.1, desc: "Singapore's first polytechnic, offering diploma programs in engineering, business, and applied sciences." },
    ]
  },
  "Ireland": {
    cities: ["Dublin", "Cork", "Galway", "Limerick", "Belfast", "Waterford", "Dundalk", "Athlone", "Sligo", "Maynooth"],
    universities: [
      { name: "Trinity College Dublin", city: "Dublin", type: "Public", established: 1592, rating: 4.7, desc: "Ireland's oldest and most prestigious university, known for arts, humanities, and the famous Long Room Library." },
      { name: "University College Dublin (UCD)", city: "Dublin", type: "Public", established: 1854, rating: 4.6, desc: "Ireland's largest university, known for business, agriculture, veterinary medicine, and a beautiful parkland campus." },
      { name: "National University of Ireland Galway (NUIG)", city: "Galway", type: "Public", established: 1845, rating: 4.4, desc: "A research-led university on Ireland's west coast, known for biomedical engineering, marine science, and Irish studies." },
      { name: "University College Cork (UCC)", city: "Cork", type: "Public", established: 1845, rating: 4.4, desc: "A leading research university known for food science, pharmacy, and a stunning riverside campus in Cork city." },
      { name: "Dublin City University (DCU)", city: "Dublin", type: "Public", established: 1975, rating: 4.3, desc: "An innovative university known for communications, computing, and enterprise education with strong industry links." },
      { name: "University of Limerick", city: "Limerick", type: "Public", established: 1972, rating: 4.3, desc: "Known for engineering, sports science, and the largest co-op program in Ireland with a beautiful riverside campus." },
      { name: "Maynooth University", city: "Maynooth", type: "Public", established: 1997, rating: 4.2, desc: "Ireland's fastest-growing university, known for computer science, social sciences, and a welcoming campus town." },
      { name: "Technological University Dublin (TU Dublin)", city: "Dublin", type: "Public", established: 2019, rating: 4.1, desc: "Ireland's first technological university, focused on practice-based learning in engineering, business, and media." },
      { name: "Royal College of Surgeons Ireland (RCSI)", city: "Dublin", type: "Private", established: 1784, rating: 4.6, desc: "A world-leading health sciences university, training doctors and surgeons with a global campus network." },
      { name: "Queen's University Belfast", city: "Belfast", type: "Public", established: 1845, rating: 4.4, desc: "A Russell Group university in Northern Ireland, known for pharmacy, engineering, and peace studies research." },
    ]
  },
  "New Zealand": {
    cities: ["Auckland", "Wellington", "Christchurch", "Hamilton", "Dunedin", "Palmerston North", "Queenstown", "Rotorua"],
    universities: [
      { name: "University of Auckland", city: "Auckland", type: "Public", established: 1883, rating: 4.7, desc: "New Zealand's largest and highest-ranked university, known for engineering, business, and health sciences." },
      { name: "University of Otago", city: "Dunedin", type: "Public", established: 1869, rating: 4.5, desc: "New Zealand's oldest university, renowned for health sciences, particularly medicine and dentistry." },
      { name: "Victoria University of Wellington", city: "Wellington", type: "Public", established: 1895, rating: 4.4, desc: "Located in New Zealand's capital, known for law, public policy, and creative arts including Weta Workshop collaborations." },
      { name: "University of Canterbury", city: "Christchurch", type: "Public", established: 1873, rating: 4.3, desc: "A leading engineering and science university in the South Island with world-class research facilities." },
      { name: "University of Waikato", city: "Hamilton", type: "Public", established: 1964, rating: 4.2, desc: "Known for computer science, management, and Māori and Pacific studies in the heart of New Zealand's Waikato region." },
      { name: "Massey University", city: "Palmerston North", type: "Public", established: 1927, rating: 4.2, desc: "New Zealand's only truly national university, known for agriculture, veterinary science, and creative arts." },
      { name: "Lincoln University", city: "Christchurch", type: "Public", established: 1878, rating: 4.1, desc: "Specializing in agriculture, environment, and land-based industries with a strong focus on sustainability." },
      { name: "Auckland University of Technology (AUT)", city: "Auckland", type: "Public", established: 2000, rating: 4.2, desc: "New Zealand's fastest-growing university, known for health sciences, design, and sport research." },
    ]
  }
};

// Common courses for international universities
const COURSE_TEMPLATES = [
  { name: "Computer Science", fees: "$15,000 - $45,000 / year", duration: "3-4 years" },
  { name: "Business Administration", fees: "$12,000 - $40,000 / year", duration: "3-4 years" },
  { name: "Mechanical Engineering", fees: "$14,000 - $42,000 / year", duration: "4 years" },
  { name: "Data Science & AI", fees: "$16,000 - $48,000 / year", duration: "3-4 years" },
  { name: "Medicine (MBBS/MD)", fees: "$20,000 - $60,000 / year", duration: "5-6 years" },
  { name: "Law (LLB)", fees: "$10,000 - $35,000 / year", duration: "3-4 years" },
  { name: "Psychology", fees: "$10,000 - $30,000 / year", duration: "3-4 years" },
  { name: "Electrical Engineering", fees: "$14,000 - $42,000 / year", duration: "4 years" },
  { name: "Economics", fees: "$10,000 - $35,000 / year", duration: "3-4 years" },
  { name: "Biotechnology", fees: "$13,000 - $38,000 / year", duration: "3-4 years" },
  { name: "MBA", fees: "$25,000 - $80,000 / year", duration: "1-2 years" },
  { name: "Architecture", fees: "$12,000 - $35,000 / year", duration: "5 years" },
  { name: "Nursing", fees: "$8,000 - $25,000 / year", duration: "3-4 years" },
  { name: "Environmental Science", fees: "$10,000 - $30,000 / year", duration: "3-4 years" },
  { name: "Marketing", fees: "$11,000 - $35,000 / year", duration: "3-4 years" },
];

async function run() {
  await mongoose.connect(process.env.MONGO_URI!, { dbName: process.env.DB_NAME });
  console.log('Connected to MongoDB');

  const coursesCol = mongoose.connection.db!.collection('courses');
  const collegesCol = mongoose.connection.db!.collection('colleges');
  const streamsCol = mongoose.connection.db!.collection('streams');

  // Get existing streams for course references
  const streams = await streamsCol.find({}).toArray();
  const streamMap = new Map(streams.map(s => [s.name, s._id]));

  const streamForCourse: Record<string, string> = {
    "Computer Science": "Engineering", "Data Science & AI": "Engineering",
    "Mechanical Engineering": "Engineering", "Electrical Engineering": "Engineering",
    "Business Administration": "Commerce", "MBA": "Management", "Marketing": "Management",
    "Medicine (MBBS/MD)": "Medical", "Nursing": "Medical", "Biotechnology": "Science",
    "Law (LLB)": "Law", "Psychology": "Science", "Economics": "Commerce",
    "Environmental Science": "Science", "Architecture": "Design",
  };

  let totalColleges = 0;
  let totalCourses = 0;

  for (const [country, data] of Object.entries(COUNTRY_DATA)) {
    console.log(`\nSeeding ${country}...`);

    for (const uni of data.universities) {
      // Create courses for this university
      const coursesToAssign = COURSE_TEMPLATES.slice(0, 6 + Math.floor(Math.random() * 9)); // 6-15 courses each
      const courseIds: mongoose.Types.ObjectId[] = [];

      for (const ct of coursesToAssign) {
        const streamName = streamForCourse[ct.name] || "Engineering";
        const streamId = streamMap.get(streamName);

        const courseDoc = {
          name: `${ct.name} at ${uni.name}`,
          fees: ct.fees,
          duration: ct.duration,
          stream: streamId || null,
          description: `Study ${ct.name} at ${uni.name}, ${uni.city}, ${country}. World-class faculty and research opportunities.`,
          isActive: true,
          createdAt: new Date(),
          updatedAt: new Date(),
        };

        const result = await coursesCol.insertOne(courseDoc);
        courseIds.push(result.insertedId as unknown as mongoose.Types.ObjectId);
        totalCourses++;
      }

      // Create the college
      const collegeDoc = {
        name: uni.name,
        country: country,
        state: country,
        city: uni.city,
        type: uni.type,
        rating: uni.rating,
        establishedYear: uni.established,
        accreditation: [],
        logo: `https://ui-avatars.com/api/?name=${encodeURIComponent(uni.name.substring(0, 2))}&background=513392&color=fff&size=128&bold=true`,
        brochure: '',
        description: uni.desc,
        students: 5000 + Math.floor(Math.random() * 40000),
        campusSize: `${50 + Math.floor(Math.random() * 500)} acres`,
        averageSalary: 30000 + Math.floor(Math.random() * 70000),
        placementPercentage: 70 + Math.floor(Math.random() * 25),
        highestSalary: 80000 + Math.floor(Math.random() * 120000),
        placementTrends: [],
        recruiters: [],
        recruitersCount: 50 + Math.floor(Math.random() * 200),
        courses: courseIds,
        scholarships: [],
        campusImages: [],
        hostelImages: [],
        labsImages: [],
        eventsImages: [],
        admissionFaqs: [],
        courseFaqs: [],
        feesPaymentFaqs: [],
        scholarshipFaqs: [],
        campusLife: [],
        bannerImageUrl: `https://images.unsplash.com/photo-1562774053-701939374585?w=800&h=400&fit=crop`,
        category: '',
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      await collegesCol.insertOne(collegeDoc);
      totalColleges++;
    }

    console.log(`  ${data.universities.length} universities seeded for ${country}`);
  }

  console.log(`\nDone! Total: ${totalColleges} colleges, ${totalCourses} courses`);
  await mongoose.disconnect();
}

run().catch(console.error);
