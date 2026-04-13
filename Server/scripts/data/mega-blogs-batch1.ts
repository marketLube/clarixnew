export interface SeoBlog {
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  tags: string[];
  category: string;
  readTime: string;
  views: number;
}

const P = "clarix-mega1-";

function best(course: string, loc: string, slug: string, colleges: string[], tags: string[]): SeoBlog {
  const content = `## Best ${course} Colleges in ${loc} (2026)\n\nLooking for the best ${course} colleges in ${loc}? Here is a carefully curated list of top-ranked institutions offering ${course} programs in ${loc}.\n\n${colleges.map((c, i) => `### ${i+1}. ${c}\nA leading institution for ${course} in ${loc}. Known for quality education, experienced faculty, modern infrastructure, and strong placement record. Students benefit from industry connections, practical training, and a supportive academic environment.\n`).join("\n")}\n## How to Choose the Right ${course} College in ${loc}\n\n1. **Check Accreditation** — Look for NAAC, NBA, UGC recognition\n2. **Compare Placement Records** — Average and highest salary packages\n3. **Visit Campus** — Infrastructure, labs, library, hostel quality\n4. **Talk to Alumni** — Get real insights from past students\n5. **Consider Fees vs ROI** — Affordable fees with good placements = best value\n6. **Faculty Quality** — Check faculty credentials and student-teacher ratio\n\n## Admission Process for ${course} in ${loc}\n\nMost colleges admit through entrance exams (JEE Main, NEET, CUET, CAT, state exams) or merit-based selection. Check individual college websites for cutoffs, eligibility, and application deadlines.\n\n## Frequently Asked Questions\n\n**Q: What is the average fee for ${course} in ${loc}?**\nA: Fees vary widely — government colleges charge ₹20,000-₹1,00,000/year while private colleges range from ₹1-5 Lakh/year.\n\n**Q: Which entrance exam is required?**\nA: Depends on the course and college. Check specific college admission pages for details.`;
  return { title: `Best ${course} Colleges in ${loc} 2026 — Top Picks, Fees & Rankings`, slug: `${P}${slug}`, excerpt: `Complete guide to the best ${course} colleges in ${loc} with fees, placements, rankings, and admission details for 2026.`, content, tags, category: "College Rankings", readTime: "8 min", views: Math.floor(5000 + Math.random() * 25000) };
}

export const MEGA_BLOGS_BATCH1: SeoBlog[] = [
  // ===== B.Tech CSE =====
  best("B.Tech CSE", "Mumbai", "btech-cse-mumbai", ["IIT Bombay", "VJTI Mumbai", "SPIT Mumbai", "DJ Sanghvi College of Engineering", "Thadomal Shahani Engineering College", "Fr. CRCE Mumbai", "Mukesh Patel School of Technology", "Sardar Patel Institute of Technology"], ["B.Tech CSE", "Mumbai", "Engineering Colleges Mumbai"]),
  best("B.Tech CSE", "Delhi", "btech-cse-delhi", ["IIT Delhi", "DTU Delhi", "NSUT Delhi", "IIIT Delhi", "Jamia Millia Islamia", "Netaji Subhas University of Technology", "Ambedkar University Delhi", "IP University"], ["B.Tech CSE", "Delhi", "Engineering Delhi"]),
  best("B.Tech CSE", "Bangalore", "btech-cse-bangalore", ["IISc Bangalore", "RVCE Bangalore", "PES University", "BMS College of Engineering", "MSRIT Bangalore", "DSCE Bangalore", "Christ University", "Nitte Meenakshi Institute"], ["B.Tech CSE", "Bangalore", "Engineering Bangalore"]),
  best("B.Tech CSE", "Chennai", "btech-cse-chennai", ["IIT Madras", "Anna University", "SRM Institute", "VIT Chennai", "SSN College of Engineering", "Sathyabama University", "Loyola ICAM", "Hindustan University"], ["B.Tech CSE", "Chennai", "Engineering Chennai"]),
  best("B.Tech CSE", "Hyderabad", "btech-cse-hyderabad", ["IIT Hyderabad", "IIIT Hyderabad", "JNTU Hyderabad", "Osmania University", "CBIT Hyderabad", "Vasavi College of Engineering", "MVSR Engineering College", "Anurag University"], ["B.Tech CSE", "Hyderabad", "Engineering Hyderabad"]),
  best("B.Tech CSE", "Pune", "btech-cse-pune", ["COEP Pune", "VIT Pune", "MIT Pune", "PICT Pune", "Symbiosis Institute of Technology", "Vishwakarma Institute of Technology", "Cummins College Pune", "DYPCOE Pune"], ["B.Tech CSE", "Pune", "Engineering Pune"]),
  best("B.Tech CSE", "Kolkata", "btech-cse-kolkata", ["Jadavpur University", "IIT Kharagpur", "IIEST Shibpur", "Heritage Institute of Technology", "Techno India", "MAKAUT", "St. Thomas College of Engineering", "Narula Institute of Technology"], ["B.Tech CSE", "Kolkata", "Engineering Kolkata"]),
  best("B.Tech CSE", "Jaipur", "btech-cse-jaipur", ["MNIT Jaipur", "JECRC University", "Manipal University Jaipur", "Poornima University", "Amity University Jaipur", "LNM Institute of Information Technology", "Jaipur Engineering College", "Arya College of Engineering"], ["B.Tech CSE", "Jaipur", "Engineering Jaipur"]),
  best("B.Tech CSE", "Lucknow", "btech-cse-lucknow", ["IIT Lucknow", "BBAU Lucknow", "Integral University", "Amity University Lucknow", "SRMS CET Bareilly", "Lucknow University", "AKTU Lucknow", "Babu Banarasi Das University"], ["B.Tech CSE", "Lucknow", "Engineering Lucknow"]),
  best("B.Tech CSE", "Chandigarh", "btech-cse-chandigarh", ["PEC Chandigarh", "Punjab University", "Chandigarh University", "UIET Chandigarh", "Chitkara University", "CGC Landran", "DAV University", "Rayat Bahra University"], ["B.Tech CSE", "Chandigarh", "Engineering Chandigarh"]),
  best("B.Tech CSE", "Bhopal", "btech-cse-bhopal", ["MANIT Bhopal", "LNCT Bhopal", "Oriental Institute of Science and Technology", "Sagar Institute of Research", "TIT Bhopal", "UIT RGPV Bhopal", "Lakshmi Narain College of Technology", "Scope College Bhopal"], ["B.Tech CSE", "Bhopal", "Engineering Bhopal"]),
  best("B.Tech CSE", "Noida", "btech-cse-noida", ["Amity University Noida", "Sharda University", "Galgotias University", "GL Bajaj Institute", "JIIT Noida", "SRM University Delhi-NCR", "Bennett University", "Manav Rachna University"], ["B.Tech CSE", "Noida", "Engineering Noida"]),
  best("B.Tech CSE", "Gurgaon", "btech-cse-gurgaon", ["MDU Rohtak (Gurgaon Campus)", "Amity University Gurgaon", "GD Goenka University", "Sushant University", "K.R. Mangalam University", "IILM University", "Ansal University", "SRM University Haryana"], ["B.Tech CSE", "Gurgaon", "Engineering Gurgaon"]),
  best("B.Tech CSE", "Ahmedabad", "btech-cse-ahmedabad", ["IIT Gandhinagar", "DAIICT Gandhinagar", "Nirma University", "LDCE Ahmedabad", "Gujarat Technological University", "Silver Oak University", "Aditya Silver Oak Institute", "Ahmedabad University"], ["B.Tech CSE", "Ahmedabad", "Engineering Ahmedabad"]),
  best("B.Tech CSE", "Coimbatore", "btech-cse-coimbatore", ["PSG College of Technology", "CIT Coimbatore", "Amrita Vishwa Vidyapeetham", "Sri Krishna College of Engineering", "Kumaraguru College of Technology", "Bannari Amman Institute", "Karpagam College of Engineering", "KPR Institute"], ["B.Tech CSE", "Coimbatore", "Engineering Coimbatore"]),
  best("B.Tech CSE", "Indore", "btech-cse-indore", ["IIT Indore", "IIM Indore Campus", "Medicaps University", "Acropolis Institute", "SGSITS Indore", "Shri Vaishnav Vidyapeeth", "Prestige Institute Indore", "Oriental Institute Indore"], ["B.Tech CSE", "Indore", "Engineering Indore"]),

  // ===== B.Tech ECE =====
  best("B.Tech ECE", "Mumbai", "btech-ece-mumbai", ["IIT Bombay", "VJTI Mumbai", "SPIT Mumbai", "DJ Sanghvi College", "Fr. CRCE Mumbai", "Thadomal Shahani Engineering College", "Rajiv Gandhi Institute of Technology", "Thakur College of Engineering"], ["B.Tech ECE", "Mumbai", "Electronics Engineering Mumbai"]),
  best("B.Tech ECE", "Delhi", "btech-ece-delhi", ["IIT Delhi", "DTU Delhi", "NSUT", "IIIT Delhi", "Jamia Millia Islamia", "NIT Delhi", "Maharaja Agrasen Institute", "Bharati Vidyapeeth Delhi"], ["B.Tech ECE", "Delhi", "Electronics Engineering Delhi"]),
  best("B.Tech ECE", "Bangalore", "btech-ece-bangalore", ["IISc Bangalore", "RVCE", "BMS College of Engineering", "MSRIT", "PES University", "DSCE", "Sir MVIT", "Nitte Meenakshi Institute"], ["B.Tech ECE", "Bangalore", "Electronics Engineering Bangalore"]),
  best("B.Tech ECE", "Chennai", "btech-ece-chennai", ["IIT Madras", "Anna University", "SSN College", "SRM Institute", "VIT Chennai", "CEG Anna University", "Sathyabama University", "Rajalakshmi Engineering College"], ["B.Tech ECE", "Chennai", "Electronics Engineering Chennai"]),
  best("B.Tech ECE", "Hyderabad", "btech-ece-hyderabad", ["IIT Hyderabad", "IIIT Hyderabad", "JNTU Hyderabad", "Osmania University", "CBIT", "Vasavi College of Engineering", "VNR VJIET", "Malla Reddy Engineering College"], ["B.Tech ECE", "Hyderabad", "Electronics Engineering Hyderabad"]),
  best("B.Tech ECE", "Pune", "btech-ece-pune", ["COEP Pune", "VIT Pune", "MIT Pune", "PICT Pune", "Vishwakarma Institute", "Symbiosis Institute of Technology", "Army Institute of Technology", "Sinhgad College Pune"], ["B.Tech ECE", "Pune", "Electronics Engineering Pune"]),
  best("B.Tech ECE", "Kolkata", "btech-ece-kolkata", ["Jadavpur University", "IIEST Shibpur", "Heritage Institute", "Techno India", "MAKAUT", "Institute of Engineering and Management", "Narula Institute", "Maulana Abul Kalam Azad University"], ["B.Tech ECE", "Kolkata", "Electronics Engineering Kolkata"]),

  // ===== B.Tech Mechanical =====
  best("B.Tech Mechanical", "Mumbai", "btech-mech-mumbai", ["IIT Bombay", "VJTI Mumbai", "SPIT Mumbai", "Fr. CRCE Mumbai", "Thadomal Shahani Engineering College", "Rajiv Gandhi Institute", "K.J. Somaiya College of Engineering", "Dwarkadas J. Sanghvi College"], ["B.Tech Mechanical", "Mumbai", "Mechanical Engineering Mumbai"]),
  best("B.Tech Mechanical", "Delhi", "btech-mech-delhi", ["IIT Delhi", "DTU", "NSUT", "Jamia Millia Islamia", "NIT Delhi", "Maharaja Agrasen Institute", "Guru Tegh Bahadur Institute", "Bharati Vidyapeeth Delhi"], ["B.Tech Mechanical", "Delhi", "Mechanical Engineering Delhi"]),
  best("B.Tech Mechanical", "Bangalore", "btech-mech-bangalore", ["RVCE", "BMS College of Engineering", "MSRIT", "PES University", "UVCE Bangalore", "Sir MVIT", "DSCE", "Nitte Meenakshi Institute"], ["B.Tech Mechanical", "Bangalore", "Mechanical Engineering Bangalore"]),
  best("B.Tech Mechanical", "Chennai", "btech-mech-chennai", ["IIT Madras", "Anna University", "SSN College", "SRM Institute", "VIT Chennai", "Sathyabama University", "Vel Tech University", "Rajalakshmi Engineering College"], ["B.Tech Mechanical", "Chennai", "Mechanical Engineering Chennai"]),
  best("B.Tech Mechanical", "Pune", "btech-mech-pune", ["COEP Pune", "VIT Pune", "MIT Pune", "Vishwakarma Institute", "Army Institute of Technology", "Sinhgad College", "DYPCOE Pune", "MAEER MIT Pune"], ["B.Tech Mechanical", "Pune", "Mechanical Engineering Pune"]),
  best("B.Tech Mechanical", "Ahmedabad", "btech-mech-ahmedabad", ["LDCE Ahmedabad", "Nirma University", "Gujarat Technological University", "Silver Oak University", "Aditya Silver Oak Institute", "Ahmedabad University", "BVM Engineering College", "GEC Gandhinagar"], ["B.Tech Mechanical", "Ahmedabad", "Mechanical Engineering Ahmedabad"]),
  best("B.Tech Mechanical", "Jaipur", "btech-mech-jaipur", ["MNIT Jaipur", "JECRC University", "Manipal University Jaipur", "Poornima College", "LNM Institute", "Arya College of Engineering", "Jaipur Engineering College", "Global Institute Jaipur"], ["B.Tech Mechanical", "Jaipur", "Mechanical Engineering Jaipur"]),

  // ===== B.Tech Civil =====
  best("B.Tech Civil", "Mumbai", "btech-civil-mumbai", ["IIT Bombay", "VJTI Mumbai", "SPIT Mumbai", "Fr. CRCE Mumbai", "Sardar Patel College of Engineering", "Terna Engineering College", "Thakur College of Engineering", "Pillai College of Engineering"], ["B.Tech Civil", "Mumbai", "Civil Engineering Mumbai"]),
  best("B.Tech Civil", "Delhi", "btech-civil-delhi", ["IIT Delhi", "DTU", "NSUT", "Jamia Millia Islamia", "NIT Delhi", "IGI Delhi", "Guru Gobind Singh Indraprastha University", "Amity University Delhi"], ["B.Tech Civil", "Delhi", "Civil Engineering Delhi"]),
  best("B.Tech Civil", "Bangalore", "btech-civil-bangalore", ["UVCE Bangalore", "RVCE", "BMS College", "MSRIT", "PES University", "Sir MVIT", "DSCE", "BMSIT Bangalore"], ["B.Tech Civil", "Bangalore", "Civil Engineering Bangalore"]),
  best("B.Tech Civil", "Chennai", "btech-civil-chennai", ["IIT Madras", "Anna University", "SRM Institute", "VIT Chennai", "SSN College", "Sathyabama University", "Vel Tech University", "Saveetha Engineering College"], ["B.Tech Civil", "Chennai", "Civil Engineering Chennai"]),
  best("B.Tech Civil", "Hyderabad", "btech-civil-hyderabad", ["IIT Hyderabad", "JNTU Hyderabad", "Osmania University", "CBIT", "VNR VJIET", "Vasavi College", "Malla Reddy Engineering College", "Gokaraju Rangaraju Institute"], ["B.Tech Civil", "Hyderabad", "Civil Engineering Hyderabad"]),

  // ===== B.Tech AI/ML =====
  best("B.Tech AI/ML", "Bangalore", "btech-aiml-bangalore", ["IISc Bangalore", "PES University", "RVCE", "Christ University", "MSRIT", "Dayananda Sagar University", "BMS College", "Reva University"], ["B.Tech AI ML", "Bangalore", "Artificial Intelligence Bangalore"]),
  best("B.Tech AI/ML", "Delhi", "btech-aiml-delhi", ["IIT Delhi", "IIIT Delhi", "DTU", "NSUT", "Amity University", "Bennett University", "Shiv Nadar University", "Ashoka University"], ["B.Tech AI ML", "Delhi", "Artificial Intelligence Delhi"]),
  best("B.Tech AI/ML", "Mumbai", "btech-aiml-mumbai", ["IIT Bombay", "VJTI Mumbai", "SPIT Mumbai", "DJ Sanghvi College", "Mukesh Patel School of Technology", "Thadomal Shahani Engineering College", "NMIMS Mumbai", "K.J. Somaiya College"], ["B.Tech AI ML", "Mumbai", "Artificial Intelligence Mumbai"]),
  best("B.Tech AI/ML", "Hyderabad", "btech-aiml-hyderabad", ["IIT Hyderabad", "IIIT Hyderabad", "JNTU Hyderabad", "Mahindra University", "CBIT", "Anurag University", "VNR VJIET", "Vasavi College"], ["B.Tech AI ML", "Hyderabad", "Artificial Intelligence Hyderabad"]),
  best("B.Tech AI/ML", "Chennai", "btech-aiml-chennai", ["IIT Madras", "Anna University", "SRM Institute", "VIT Chennai", "SSN College", "Sathyabama University", "Saveetha Engineering College", "Hindustan University"], ["B.Tech AI ML", "Chennai", "Artificial Intelligence Chennai"]),
  best("B.Tech AI/ML", "Pune", "btech-aiml-pune", ["COEP Pune", "VIT Pune", "MIT Pune", "PICT Pune", "Symbiosis Institute of Technology", "Vishwakarma Institute", "Dr. D.Y. Patil Institute", "Sinhgad College"], ["B.Tech AI ML", "Pune", "Artificial Intelligence Pune"]),

  // ===== B.Tech Data Science =====
  best("B.Tech Data Science", "Bangalore", "btech-ds-bangalore", ["IISc Bangalore", "PES University", "Christ University", "RVCE", "MSRIT", "Jain University", "Dayananda Sagar University", "CMR University"], ["B.Tech Data Science", "Bangalore", "Data Science Bangalore"]),
  best("B.Tech Data Science", "Delhi", "btech-ds-delhi", ["IIT Delhi", "IIIT Delhi", "DTU", "Amity University", "Bennett University", "Shiv Nadar University", "NSUT", "Jamia Millia Islamia"], ["B.Tech Data Science", "Delhi", "Data Science Delhi"]),
  best("B.Tech Data Science", "Mumbai", "btech-ds-mumbai", ["IIT Bombay", "NMIMS Mumbai", "DJ Sanghvi College", "SPIT Mumbai", "Mukesh Patel School of Technology", "K.J. Somaiya College", "Fr. CRCE Mumbai", "VJTI Mumbai"], ["B.Tech Data Science", "Mumbai", "Data Science Mumbai"]),
  best("B.Tech Data Science", "Hyderabad", "btech-ds-hyderabad", ["IIIT Hyderabad", "IIT Hyderabad", "JNTU Hyderabad", "Mahindra University", "CBIT", "Anurag University", "Woxsen University", "GITAM Hyderabad"], ["B.Tech Data Science", "Hyderabad", "Data Science Hyderabad"]),
  best("B.Tech Data Science", "Chennai", "btech-ds-chennai", ["IIT Madras", "Anna University", "SRM Institute", "VIT Chennai", "SSN College", "Sathyabama University", "Loyola ICAM", "Vel Tech University"], ["B.Tech Data Science", "Chennai", "Data Science Chennai"]),

  // ===== BCA =====
  best("BCA", "Mumbai", "bca-mumbai", ["St. Xavier's College Mumbai", "Jai Hind College", "NMIMS Mumbai", "Symbiosis College", "Wilson College", "Mithibai College", "K.C. College Mumbai", "Ruia College"], ["BCA", "Mumbai", "BCA Colleges Mumbai"]),
  best("BCA", "Delhi", "bca-delhi", ["Jamia Millia Islamia", "IP University", "Amity University Delhi", "Guru Gobind Singh Indraprastha University", "Maharaja Surajmal Institute", "BPIT Delhi", "Jagan Institute of Management", "IINTM Delhi"], ["BCA", "Delhi", "BCA Colleges Delhi"]),
  best("BCA", "Pune", "bca-pune", ["Symbiosis College Pune", "MIT WPU Pune", "Fergusson College", "Modern College Pune", "Sinhgad College", "AISSMS College Pune", "Indira College Pune", "Bharati Vidyapeeth Pune"], ["BCA", "Pune", "BCA Colleges Pune"]),
  best("BCA", "Chennai", "bca-chennai", ["Loyola College Chennai", "Madras Christian College", "SRM University", "VIT Chennai", "Stella Maris College", "Ethiraj College", "Presidency College", "Hindustan University"], ["BCA", "Chennai", "BCA Colleges Chennai"]),
  best("BCA", "Hyderabad", "bca-hyderabad", ["Osmania University", "St. Mary's College", "GITAM University", "ICFAI Foundation", "Maulana Azad National Urdu University", "Aurora's Degree College", "Nizam College", "Wesley Degree College"], ["BCA", "Hyderabad", "BCA Colleges Hyderabad"]),
  best("BCA", "Jaipur", "bca-jaipur", ["University of Rajasthan", "Manipal University Jaipur", "JECRC University", "Amity University Jaipur", "Poornima University", "IIS University Jaipur", "Jaipur National University", "NIMS University Jaipur"], ["BCA", "Jaipur", "BCA Colleges Jaipur"]),
  best("BCA", "Chandigarh", "bca-chandigarh", ["Punjab University", "Chandigarh University", "DAV College Chandigarh", "GGDSD College", "SD College Chandigarh", "Chitkara University", "CGC Landran", "Rayat Bahra University"], ["BCA", "Chandigarh", "BCA Colleges Chandigarh"]),
  best("BCA", "Lucknow", "bca-lucknow", ["Lucknow University", "Amity University Lucknow", "Integral University", "BBAU Lucknow", "Babu Banarasi Das University", "SRMS CET", "Invertis University", "Shri Ramswaroop Memorial University"], ["BCA", "Lucknow", "BCA Colleges Lucknow"]),

  // ===== MCA =====
  best("MCA", "Bangalore", "mca-bangalore", ["Christ University", "PES University", "RVCE", "Jain University", "BMS College", "Dayananda Sagar University", "MSRIT", "St. Joseph's College Bangalore"], ["MCA", "Bangalore", "MCA Colleges Bangalore"]),
  best("MCA", "Delhi", "mca-delhi", ["JNU Delhi", "Jamia Millia Islamia", "NIT Delhi", "IP University", "BPIT Delhi", "Amity University Delhi", "Maharaja Surajmal Institute", "USICT Delhi"], ["MCA", "Delhi", "MCA Colleges Delhi"]),
  best("MCA", "Pune", "mca-pune", ["Savitribai Phule Pune University", "MIT WPU Pune", "Symbiosis Institute", "COEP Pune", "VIT Pune", "Sinhgad College", "Bharati Vidyapeeth Pune", "DY Patil College Pune"], ["MCA", "Pune", "MCA Colleges Pune"]),
  best("MCA", "Mumbai", "mca-mumbai", ["Mumbai University", "NMIMS Mumbai", "VJTI Mumbai", "SPIT Mumbai", "K.J. Somaiya Institute", "Thadomal Shahani Engineering College", "Pillai College", "Narsee Monjee Institute"], ["MCA", "Mumbai", "MCA Colleges Mumbai"]),
  best("MCA", "Hyderabad", "mca-hyderabad", ["Osmania University", "JNTU Hyderabad", "University of Hyderabad", "CBIT", "Anurag University", "GITAM Hyderabad", "VNR VJIET", "Aurora's PG College"], ["MCA", "Hyderabad", "MCA Colleges Hyderabad"]),
  best("MCA", "Chennai", "mca-chennai", ["Anna University", "SRM University", "VIT Chennai", "Loyola College", "Sathyabama University", "Madras Christian College", "SSN College", "Hindustan University"], ["MCA", "Chennai", "MCA Colleges Chennai"]),

  // ===== B.Sc Computer Science =====
  best("B.Sc Computer Science", "Mumbai", "bsc-cs-mumbai", ["St. Xavier's College Mumbai", "Jai Hind College", "Wilson College", "Mithibai College", "Ruia College", "K.C. College", "NM College Mumbai", "Sophia College Mumbai"], ["B.Sc Computer Science", "Mumbai", "B.Sc CS Mumbai"]),
  best("B.Sc Computer Science", "Delhi", "bsc-cs-delhi", ["Delhi University", "St. Stephen's College", "Hindu College", "Hansraj College", "Ramjas College", "Lady Shri Ram College", "Gargi College", "SRCC Delhi"], ["B.Sc Computer Science", "Delhi", "B.Sc CS Delhi"]),
  best("B.Sc Computer Science", "Bangalore", "bsc-cs-bangalore", ["Christ University", "St. Joseph's College", "Jain University", "Mount Carmel College", "BMS College of Engineering", "Kristu Jayanti College", "PES University", "CMR University"], ["B.Sc Computer Science", "Bangalore", "B.Sc CS Bangalore"]),
  best("B.Sc Computer Science", "Chennai", "bsc-cs-chennai", ["Loyola College Chennai", "Madras Christian College", "Presidency College", "Stella Maris College", "Ethiraj College", "WCC Chennai", "Pachaiyappa's College", "SDNB Vaishnav College"], ["B.Sc Computer Science", "Chennai", "B.Sc CS Chennai"]),

  // ===== MBA =====
  best("MBA", "Mumbai", "mba-mumbai", ["IIM Mumbai", "JBIMS Mumbai", "SPJIMR Mumbai", "NMIMS Mumbai", "Sydenham Institute", "Welingkar Institute", "K.J. Somaiya Institute", "NITIE Mumbai"], ["MBA", "Mumbai", "MBA Colleges Mumbai"]),
  best("MBA", "Delhi", "mba-delhi", ["IIM Delhi (Rohini)", "FMS Delhi", "IIFT Delhi", "IMT Ghaziabad", "MDI Gurgaon", "Jamia Millia Islamia", "Delhi School of Economics", "FORE School of Management"], ["MBA", "Delhi", "MBA Colleges Delhi"]),
  best("MBA", "Bangalore", "mba-bangalore", ["IIM Bangalore", "Christ University", "Alliance University", "TAPMI Manipal", "XIME Bangalore", "PES University", "Jain University", "IFIM Business School"], ["MBA", "Bangalore", "MBA Colleges Bangalore"]),
  best("MBA", "Chennai", "mba-chennai", ["IIT Madras (DoMS)", "Anna University", "Great Lakes Institute", "Loyola Institute (LIBA)", "SRM University", "VIT Chennai", "IFMR Chennai", "SSN School of Management"], ["MBA", "Chennai", "MBA Colleges Chennai"]),
  best("MBA", "Hyderabad", "mba-hyderabad", ["ISB Hyderabad", "IIM Hyderabad (Proposed)", "NALSAR Hyderabad", "Osmania University", "University of Hyderabad", "ICFAI Business School", "GITAM University", "Woxsen University"], ["MBA", "Hyderabad", "MBA Colleges Hyderabad"]),
  best("MBA", "Pune", "mba-pune", ["SIBM Pune", "SCMHRD Pune", "MIT WPU Pune", "Indira Institute of Management", "Symbiosis Centre for Management", "Bharati Vidyapeeth Pune", "Savitribai Phule Pune University", "Balaji Institute Pune"], ["MBA", "Pune", "MBA Colleges Pune"]),
  best("MBA", "Kolkata", "mba-kolkata", ["IIM Calcutta", "XLRI Jamshedpur", "IIT Kharagpur (VGSoM)", "Calcutta University", "St. Xavier's College", "NSHM Kolkata", "Globsyn Business School", "Army Institute of Management Kolkata"], ["MBA", "Kolkata", "MBA Colleges Kolkata"]),
  best("MBA", "Ahmedabad", "mba-ahmedabad", ["IIM Ahmedabad", "MICA Ahmedabad", "Nirma University", "Gujarat University", "PDPU Gandhinagar", "GLS University", "Ahmedabad University", "EDII Ahmedabad"], ["MBA", "Ahmedabad", "MBA Colleges Ahmedabad"]),
  best("MBA", "Jaipur", "mba-jaipur", ["IIS University Jaipur", "Manipal University Jaipur", "JECRC University", "Amity University Jaipur", "University of Rajasthan", "Poornima University", "NIMS University Jaipur", "ICFAI University Jaipur"], ["MBA", "Jaipur", "MBA Colleges Jaipur"]),
  best("MBA", "Lucknow", "mba-lucknow", ["IIM Lucknow", "Lucknow University", "Amity University Lucknow", "BBAU Lucknow", "Integral University", "Jaipuria Institute", "SRMS Lucknow", "Babu Banarasi Das University"], ["MBA", "Lucknow", "MBA Colleges Lucknow"]),
  best("MBA", "Indore", "mba-indore", ["IIM Indore", "Prestige Institute Indore", "DAVV Indore", "Acropolis Institute", "Medicaps University", "International Institute of Professional Studies", "Renaissance University", "Shri Vaishnav Vidyapeeth"], ["MBA", "Indore", "MBA Colleges Indore"]),
  best("MBA", "Chandigarh", "mba-chandigarh", ["Punjab University Business School", "Chandigarh University", "University Business School Chandigarh", "Chitkara University", "DAV University", "CGC Landran", "Rayat Bahra University", "IISER Mohali"], ["MBA", "Chandigarh", "MBA Colleges Chandigarh"]),

  // ===== BBA =====
  best("BBA", "Mumbai", "bba-mumbai", ["NMIMS Mumbai", "Jai Hind College", "Mithibai College", "Wilson College", "St. Xavier's College", "K.C. College", "NM College", "HR College Mumbai"], ["BBA", "Mumbai", "BBA Colleges Mumbai"]),
  best("BBA", "Pune", "bba-pune", ["Symbiosis College Pune", "MIT WPU Pune", "Fergusson College", "Modern College", "Christ University Pune", "Indira College", "Bharati Vidyapeeth Pune", "Sinhgad College Pune"], ["BBA", "Pune", "BBA Colleges Pune"]),
  best("BBA", "Chennai", "bba-chennai", ["Loyola College Chennai", "Madras Christian College", "SRM University", "VIT Chennai", "Stella Maris College", "Presidency College", "Ethiraj College", "Hindustan University"], ["BBA", "Chennai", "BBA Colleges Chennai"]),
  best("BBA", "Hyderabad", "bba-hyderabad", ["Osmania University", "GITAM University", "St. Mary's College", "Nizam College", "Wesley College", "Aurora's College", "ICFAI Foundation", "Maulana Azad National Urdu University"], ["BBA", "Hyderabad", "BBA Colleges Hyderabad"]),
  best("BBA", "Bangalore", "bba-bangalore-mega", ["Christ University", "Jain University", "PES University", "Mount Carmel College", "Kristu Jayanti College", "St. Joseph's College", "CMR University", "Reva University"], ["BBA", "Bangalore", "BBA Colleges Bangalore"]),
  best("BBA", "Jaipur", "bba-jaipur", ["University of Rajasthan", "Manipal University Jaipur", "IIS University Jaipur", "JECRC University", "Amity University Jaipur", "Poornima University", "Jaipur National University", "NIMS University"], ["BBA", "Jaipur", "BBA Colleges Jaipur"]),

  // ===== PGDM =====
  best("PGDM", "Mumbai", "pgdm-mumbai", ["SPJIMR Mumbai", "NMIMS Mumbai", "Welingkar Institute", "K.J. Somaiya Institute", "N.L. Dalmia Institute", "ITM Business School", "MET Institute", "VESIM Mumbai"], ["PGDM", "Mumbai", "PGDM Colleges Mumbai"]),
  best("PGDM", "Delhi", "pgdm-delhi", ["FORE School of Management", "IMI Delhi", "LBSIM Delhi", "Jaipuria Institute Delhi", "NDIM Delhi", "IMS Noida", "Asia Pacific Institute", "JIMS Delhi"], ["PGDM", "Delhi", "PGDM Colleges Delhi"]),
  best("PGDM", "Bangalore", "pgdm-bangalore", ["TAPMI Manipal", "XIME Bangalore", "IFIM Business School", "Alliance University", "AIMS Institutes", "ISBR Business School", "Christ University", "ABBS Bangalore"], ["PGDM", "Bangalore", "PGDM Colleges Bangalore"]),

  // ===== MBBS =====
  best("MBBS", "Mumbai", "mbbs-mumbai", ["Seth GS Medical College (KEM Hospital)", "Grant Medical College (JJ Hospital)", "Topiwala National Medical College (Nair Hospital)", "LTMMC Sion Hospital", "TNMC Mumbai", "DY Patil Medical College", "MGM Medical College", "HBTMC Mumbai"], ["MBBS", "Mumbai", "Medical Colleges Mumbai"]),
  best("MBBS", "Delhi", "mbbs-delhi", ["AIIMS Delhi", "Maulana Azad Medical College", "Lady Hardinge Medical College", "UCMS Delhi", "Vardhman Mahavir Medical College", "Army College of Medical Sciences", "Hamdard Medical College", "NDMC Medical College"], ["MBBS", "Delhi", "Medical Colleges Delhi"]),
  best("MBBS", "Bangalore", "mbbs-bangalore", ["Bangalore Medical College", "St. John's Medical College", "MS Ramaiah Medical College", "Kempegowda Institute", "Vydehi Institute", "MVJ Medical College", "RRMCH Bangalore", "BGS Global Institute"], ["MBBS", "Bangalore", "Medical Colleges Bangalore"]),
  best("MBBS", "Chennai", "mbbs-chennai", ["Madras Medical College", "Stanley Medical College", "Kilpauk Medical College", "SRM Medical College", "Sree Balaji Medical College", "Chettinad Hospital Medical College", "Saveetha Medical College", "Meenakshi Medical College"], ["MBBS", "Chennai", "Medical Colleges Chennai"]),
  best("MBBS", "Hyderabad", "mbbs-hyderabad", ["Osmania Medical College", "Gandhi Medical College", "Nizam's Institute (NIMS)", "Deccan College of Medical Sciences", "Shadan Institute", "ESIC Medical College", "Mahavir Institute of Medical Sciences", "MediCiti Institute"], ["MBBS", "Hyderabad", "Medical Colleges Hyderabad"]),
  best("MBBS", "Pune", "mbbs-pune", ["BJ Government Medical College", "Armed Forces Medical College (AFMC)", "Sassoon Hospital Pune", "DY Patil Medical College Pune", "Symbiosis Medical College", "Bharati Vidyapeeth Medical College", "Smt. Kashibai Navale Medical College", "MIMER Medical College"], ["MBBS", "Pune", "Medical Colleges Pune"]),
  best("MBBS", "Kolkata", "mbbs-kolkata", ["Medical College Kolkata", "RG Kar Medical College", "NRS Medical College", "Calcutta National Medical College", "IPGMER & SSKM Hospital", "KPC Medical College", "ICARE Medical College", "IQ City Medical College"], ["MBBS", "Kolkata", "Medical Colleges Kolkata"]),
  best("MBBS", "Lucknow", "mbbs-lucknow", ["KGMU Lucknow", "Era's Lucknow Medical College", "Integral Institute of Medical Sciences", "RMLIMS Lucknow", "Hind Institute of Medical Sciences", "Mayo Institute Lucknow", "Career Institute of Medical Sciences", "Prasad Institute"], ["MBBS", "Lucknow", "Medical Colleges Lucknow"]),
  best("MBBS", "Jaipur", "mbbs-jaipur", ["SMS Medical College Jaipur", "Rajasthan University of Health Sciences", "JLN Medical College", "NIMS University Medical", "Mahatma Gandhi Medical College", "National Institute of Medical Sciences", "Geetanjali Medical College", "Pacific Medical College"], ["MBBS", "Jaipur", "Medical Colleges Jaipur"]),

  // ===== BDS =====
  best("BDS", "Mumbai", "bds-mumbai", ["GDC Mumbai", "Nair Hospital Dental College", "DY Patil Dental College", "MGM Dental College", "Sinhgad Dental College", "YCMM Dental College", "Terna Dental College", "Bharati Vidyapeeth Dental"], ["BDS", "Mumbai", "Dental Colleges Mumbai"]),
  best("BDS", "Delhi", "bds-delhi", ["Maulana Azad Institute of Dental Sciences", "Army Dental College Delhi", "Faculty of Dentistry Jamia Millia", "Manav Rachna Dental College", "ITS Dental College", "Subharti Dental College", "SGT Dental College", "Sharda Dental College"], ["BDS", "Delhi", "Dental Colleges Delhi"]),
  best("BDS", "Bangalore", "bds-bangalore", ["Government Dental College Bangalore", "Rajarajeswari Dental College", "MS Ramaiah Dental College", "Vydehi Dental College", "VS Dental College", "Oxford Dental College", "DAPM Dental College", "AECS Maaruti Dental College"], ["BDS", "Bangalore", "Dental Colleges Bangalore"]),
  best("BDS", "Chennai", "bds-chennai", ["Tamil Nadu Government Dental College", "SRM Dental College", "Saveetha Dental College", "Meenakshi Ammal Dental College", "Sri Ramachandra Dental College", "Tagore Dental College", "Chettinad Dental College", "Thai Moogambigai Dental College"], ["BDS", "Chennai", "Dental Colleges Chennai"]),

  // ===== B.Sc Nursing =====
  best("B.Sc Nursing", "Mumbai", "bsc-nursing-mumbai", ["Bombay Hospital College of Nursing", "Lokmanya Tilak Municipal Medical College", "DY Patil College of Nursing", "Bharati Vidyapeeth Nursing College", "TNMC Nursing Mumbai", "MGM College of Nursing", "Smt. Kashibai Navale Nursing College", "Terna Nursing College"], ["B.Sc Nursing", "Mumbai", "Nursing Colleges Mumbai"]),
  best("B.Sc Nursing", "Delhi", "bsc-nursing-delhi", ["AIIMS Nursing Delhi", "Lady Hardinge Nursing College", "Holy Family Nursing College", "Jamia Hamdard Nursing", "Rufaida Nursing College Jamia", "Army College of Nursing", "Florence Nightingale Nursing College", "Sharda Nursing College"], ["B.Sc Nursing", "Delhi", "Nursing Colleges Delhi"]),
  best("B.Sc Nursing", "Bangalore", "bsc-nursing-bangalore", ["St. John's College of Nursing", "MS Ramaiah College of Nursing", "Vydehi Institute of Nursing", "Kempegowda Institute of Nursing", "MVJ College of Nursing", "BGS Global Nursing College", "Sapthagiri College of Nursing", "Acharya College of Nursing"], ["B.Sc Nursing", "Bangalore", "Nursing Colleges Bangalore"]),
  best("B.Sc Nursing", "Chennai", "bsc-nursing-chennai", ["Madras Medical College Nursing", "SRM College of Nursing", "Sri Ramachandra College of Nursing", "Saveetha College of Nursing", "Meenakshi College of Nursing", "Chettinad College of Nursing", "Apollo College of Nursing", "MMM College of Nursing"], ["B.Sc Nursing", "Chennai", "Nursing Colleges Chennai"]),
  best("B.Sc Nursing", "Hyderabad", "bsc-nursing-hyderabad", ["NIMS Nursing College", "Osmania College of Nursing", "Apollo College of Nursing Hyderabad", "Deccan College of Nursing", "Yashoda Nursing College", "Continental Nursing College", "Bhaskar Nursing College", "Mahavir College of Nursing"], ["B.Sc Nursing", "Hyderabad", "Nursing Colleges Hyderabad"]),

  // ===== B.Pharm =====
  best("B.Pharm", "Mumbai", "bpharm-mumbai", ["Bombay College of Pharmacy", "ICT Mumbai", "DY Patil College of Pharmacy", "SCES Indira College of Pharmacy", "MGM College of Pharmacy", "Vivekanand Education Society's Pharmacy College", "Bharati Vidyapeeth Pharmacy", "Oriental College of Pharmacy"], ["B.Pharm", "Mumbai", "Pharmacy Colleges Mumbai"]),
  best("B.Pharm", "Delhi", "bpharm-delhi", ["Jamia Hamdard Pharmacy", "Delhi Institute of Pharmaceutical Sciences", "DIPSAR Delhi", "Guru Gobind Singh IP University Pharmacy", "ITS Pharmacy College", "SRM University Pharmacy Delhi", "Manav Rachna Pharmacy College", "Sharda Pharmacy College"], ["B.Pharm", "Delhi", "Pharmacy Colleges Delhi"]),
  best("B.Pharm", "Bangalore", "bpharm-bangalore", ["JSS College of Pharmacy", "Al-Ameen College of Pharmacy", "MS Ramaiah College of Pharmacy", "Acharya & BM Reddy College of Pharmacy", "PES College of Pharmacy", "KLE College of Pharmacy", "Nitte College of Pharmacy", "East West College of Pharmacy"], ["B.Pharm", "Bangalore", "Pharmacy Colleges Bangalore"]),
  best("B.Pharm", "Hyderabad", "bpharm-hyderabad", ["NIPER Hyderabad", "Osmania University College of Pharmacy", "JNTU Pharmacy College", "Sultan-ul-Uloom College of Pharmacy", "Malla Reddy College of Pharmacy", "Anurag College of Pharmacy", "CMR College of Pharmacy", "Gokaraju Rangaraju College of Pharmacy"], ["B.Pharm", "Hyderabad", "Pharmacy Colleges Hyderabad"]),

  // ===== BA LLB =====
  best("BA LLB", "Mumbai", "ballb-mumbai", ["Government Law College Mumbai", "ILS Law College Mumbai", "KC Law College Mumbai", "Rizvi Law College", "DY Patil Law College", "Pravin Gandhi College of Law", "University of Mumbai Law Academy", "Thakur Ramnarayan College of Law"], ["BA LLB", "Mumbai", "Law Colleges Mumbai"]),
  best("BA LLB", "Delhi", "ballb-delhi", ["National Law University Delhi", "Faculty of Law Delhi University", "Jamia Millia Islamia Law", "Amity Law School Delhi", "IP University Law School", "VIPS Delhi", "Army Institute of Law Delhi", "Jindal Global Law School"], ["BA LLB", "Delhi", "Law Colleges Delhi"]),
  best("BA LLB", "Bangalore", "ballb-bangalore", ["NLSIU Bangalore", "Christ University Law", "Symbiosis Law School Bangalore", "CMR University Law", "PES University Law", "Alliance University School of Law", "Jain University Law", "MS Ramaiah College of Law"], ["BA LLB", "Bangalore", "Law Colleges Bangalore"]),
  best("BA LLB", "Hyderabad", "ballb-hyderabad", ["NALSAR University of Law", "Osmania University Law", "Symbiosis Law School Hyderabad", "ICFAI Law School", "Mahindra University School of Law", "KL University Law", "GITAM Law School", "Woxsen University Law"], ["BA LLB", "Hyderabad", "Law Colleges Hyderabad"]),
  best("BA LLB", "Chennai", "ballb-chennai", ["Dr. Ambedkar Government Law College", "School of Excellence in Law (TNDALU)", "SRM School of Law", "VIT Law School", "Saveetha School of Law", "Hindustan Law College", "Loyola College Law", "SASTRA Law School"], ["BA LLB", "Chennai", "Law Colleges Chennai"]),
  best("BA LLB", "Pune", "ballb-pune", ["ILS Law College Pune", "Symbiosis Law School Pune", "Bharati Vidyapeeth New Law College", "MIT WPU Law School", "DY Patil Law College Pune", "Modern Law College Pune", "Tilak Maharashtra Vidyapeeth Law", "BVDU New Law College"], ["BA LLB", "Pune", "Law Colleges Pune"]),

  // ===== LLB =====
  best("LLB", "Mumbai", "llb-mumbai", ["Government Law College Mumbai", "KC Law College", "Rizvi Law College", "Pravin Gandhi College of Law", "Thakur Ramnarayan College of Law", "Siddharth Law College", "DY Patil Law College Mumbai", "University of Mumbai Law Faculty"], ["LLB", "Mumbai", "LLB Colleges Mumbai"]),
  best("LLB", "Delhi", "llb-delhi", ["Faculty of Law Delhi University", "NLU Delhi", "Jamia Millia Islamia Law", "Amity Law School", "IP University Law", "VIPS Delhi Law", "Jindal Global Law School", "Lloyd Law College"], ["LLB", "Delhi", "LLB Colleges Delhi"]),

  // ===== B.Com =====
  best("B.Com", "Mumbai", "bcom-mumbai", ["HR College Mumbai", "NM College Mumbai", "Jai Hind College", "St. Xavier's College", "Mithibai College", "KC College", "Narsee Monjee College", "RA Podar College"], ["B.Com", "Mumbai", "B.Com Colleges Mumbai"]),
  best("B.Com", "Delhi", "bcom-delhi", ["SRCC Delhi", "St. Stephen's College", "Hindu College", "Hansraj College", "Ramjas College", "Lady Shri Ram College", "Jesus and Mary College", "Gargi College"], ["B.Com", "Delhi", "B.Com Colleges Delhi"]),
  best("B.Com", "Bangalore", "bcom-bangalore", ["Christ University", "St. Joseph's College", "Jain University", "Mount Carmel College", "Kristu Jayanti College", "BMS College Bangalore", "Presidency College", "Acharya Institute"], ["B.Com", "Bangalore", "B.Com Colleges Bangalore"]),
  best("B.Com", "Chennai", "bcom-chennai", ["Loyola College", "Madras Christian College", "Presidency College", "Stella Maris College", "Ethiraj College", "WCC Chennai", "New College Chennai", "Pachaiyappa's College"], ["B.Com", "Chennai", "B.Com Colleges Chennai"]),
  best("B.Com", "Kolkata", "bcom-kolkata", ["St. Xavier's College Kolkata", "Presidency University", "Scottish Church College", "Loreto College", "Lady Brabourne College", "Calcutta University", "Ashutosh College", "Heramba Chandra College"], ["B.Com", "Kolkata", "B.Com Colleges Kolkata"]),
  best("B.Com", "Pune", "bcom-pune", ["Fergusson College", "Symbiosis College Pune", "BMCC Pune", "Modern College", "Garware College", "SP College Pune", "Nowrosjee Wadia College", "MIT WPU Pune"], ["B.Com", "Pune", "B.Com Colleges Pune"]),

  // ===== B.Com Honours =====
  best("B.Com Honours", "Delhi", "bcom-hons-delhi", ["SRCC Delhi", "St. Stephen's College", "Hindu College", "Hansraj College", "Lady Shri Ram College", "Ramjas College", "Kirori Mal College", "Shri Ram College of Commerce"], ["B.Com Honours", "Delhi", "B.Com Honours Delhi"]),
  best("B.Com Honours", "Kolkata", "bcom-hons-kolkata", ["St. Xavier's College", "Presidency University", "Scottish Church College", "Loreto College", "Lady Brabourne College", "Calcutta University", "Ashutosh College", "Bethune College"], ["B.Com Honours", "Kolkata", "B.Com Honours Kolkata"]),
  best("B.Com Honours", "Mumbai", "bcom-hons-mumbai", ["HR College Mumbai", "NM College", "St. Xavier's College Mumbai", "Jai Hind College", "KC College", "Mithibai College", "Narsee Monjee College", "Podar College"], ["B.Com Honours", "Mumbai", "B.Com Honours Mumbai"]),

  // ===== CA Foundation =====
  best("CA Foundation", "Mumbai", "ca-foundation-mumbai", ["HR College Mumbai", "NM College Mumbai", "Jai Hind College", "St. Xavier's College", "ICAI Mumbai Chapter", "KC College Mumbai", "Mithibai College", "Narsee Monjee College"], ["CA Foundation", "Mumbai", "CA Coaching Mumbai"]),
  best("CA Foundation", "Delhi", "ca-foundation-delhi", ["SRCC Delhi", "ICAI Delhi Chapter", "VSI Coaching Delhi", "Aldine CA Classes", "JK Shah Classes Delhi", "Swapnil Patni Classes", "CA Coaching Centre Delhi", "Superprofs Delhi"], ["CA Foundation", "Delhi", "CA Coaching Delhi"]),

  // ===== B.Sc Physics =====
  best("B.Sc Physics", "Delhi", "bsc-physics-delhi", ["St. Stephen's College", "Hindu College", "Hansraj College", "Miranda House", "Kirori Mal College", "Ramjas College", "ARSD College", "Gargi College"], ["B.Sc Physics", "Delhi", "Physics Colleges Delhi"]),
  best("B.Sc Physics", "Mumbai", "bsc-physics-mumbai", ["St. Xavier's College Mumbai", "Jai Hind College", "Ruia College", "Wilson College", "KC College", "Institute of Science Mumbai", "Mithibai College", "NM College"], ["B.Sc Physics", "Mumbai", "Physics Colleges Mumbai"]),
  best("B.Sc Physics", "Bangalore", "bsc-physics-bangalore", ["Indian Institute of Science", "Christ University", "St. Joseph's College", "Jain University", "Mount Carmel College", "Bangalore University", "Kristu Jayanti College", "CMR University"], ["B.Sc Physics", "Bangalore", "Physics Colleges Bangalore"]),
  best("B.Sc Physics", "Chennai", "bsc-physics-chennai", ["Loyola College Chennai", "Madras Christian College", "Presidency College", "Stella Maris College", "WCC Chennai", "Pachaiyappa's College", "New College Chennai", "Gurunanak College"], ["B.Sc Physics", "Chennai", "Physics Colleges Chennai"]),

  // ===== B.Sc Chemistry =====
  best("B.Sc Chemistry", "Delhi", "bsc-chemistry-delhi", ["St. Stephen's College", "Hindu College", "Hansraj College", "Miranda House", "Ramjas College", "Kirori Mal College", "Gargi College", "ARSD College"], ["B.Sc Chemistry", "Delhi", "Chemistry Colleges Delhi"]),
  best("B.Sc Chemistry", "Mumbai", "bsc-chemistry-mumbai", ["St. Xavier's College Mumbai", "Institute of Science Mumbai", "Ruia College", "Wilson College", "KC College", "Jai Hind College", "Mithibai College", "SIES College"], ["B.Sc Chemistry", "Mumbai", "Chemistry Colleges Mumbai"]),
  best("B.Sc Chemistry", "Bangalore", "bsc-chemistry-bangalore", ["Christ University", "St. Joseph's College", "Bangalore University", "Jain University", "Mount Carmel College", "Kristu Jayanti College", "Indian Institute of Science", "Acharya Institute"], ["B.Sc Chemistry", "Bangalore", "Chemistry Colleges Bangalore"]),

  // ===== B.Sc Biology =====
  best("B.Sc Biology", "Delhi", "bsc-biology-delhi", ["Miranda House", "Hindu College", "St. Stephen's College", "Hansraj College", "Gargi College", "Lady Shri Ram College", "Ramjas College", "Daulat Ram College"], ["B.Sc Biology", "Delhi", "Biology Colleges Delhi"]),
  best("B.Sc Biology", "Mumbai", "bsc-biology-mumbai", ["St. Xavier's College Mumbai", "Ruia College", "Wilson College", "KC College", "Jai Hind College", "Institute of Science Mumbai", "Mithibai College", "Sophia College"], ["B.Sc Biology", "Mumbai", "Biology Colleges Mumbai"]),
  best("B.Sc Biology", "Bangalore", "bsc-biology-bangalore", ["Christ University", "St. Joseph's College", "Mount Carmel College", "Jain University", "Bangalore University", "Kristu Jayanti College", "PES University", "CMR University"], ["B.Sc Biology", "Bangalore", "Biology Colleges Bangalore"]),

  // ===== BA English =====
  best("BA English", "Delhi", "ba-english-delhi", ["St. Stephen's College", "Lady Shri Ram College", "Miranda House", "Hindu College", "Jesus and Mary College", "Gargi College", "Ramjas College", "Hansraj College"], ["BA English", "Delhi", "English Literature Delhi"]),
  best("BA English", "Mumbai", "ba-english-mumbai", ["St. Xavier's College Mumbai", "Jai Hind College", "Wilson College", "Sophia College", "Mithibai College", "KC College", "Ruia College", "NM College"], ["BA English", "Mumbai", "English Literature Mumbai"]),
  best("BA English", "Bangalore", "ba-english-bangalore", ["Christ University", "St. Joseph's College", "Mount Carmel College", "Jain University", "Kristu Jayanti College", "Bangalore University", "St. Claret College", "Bishop Cotton Women's College"], ["BA English", "Bangalore", "English Literature Bangalore"]),
  best("BA English", "Chennai", "ba-english-chennai", ["Loyola College", "Madras Christian College", "Stella Maris College", "Presidency College", "Ethiraj College", "WCC Chennai", "Queen Mary's College", "MOP Vaishnav College"], ["BA English", "Chennai", "English Literature Chennai"]),
  best("BA English", "Kolkata", "ba-english-kolkata", ["Presidency University", "St. Xavier's College", "Jadavpur University", "Scottish Church College", "Lady Brabourne College", "Loreto College", "Bethune College", "Calcutta University"], ["BA English", "Kolkata", "English Literature Kolkata"]),

  // ===== BA Economics =====
  best("BA Economics", "Delhi", "ba-economics-delhi", ["St. Stephen's College", "Lady Shri Ram College", "Hindu College", "Miranda House", "SRCC", "Ramjas College", "Hansraj College", "Jesus and Mary College"], ["BA Economics", "Delhi", "Economics Colleges Delhi"]),
  best("BA Economics", "Mumbai", "ba-economics-mumbai", ["St. Xavier's College", "Jai Hind College", "KC College", "Mithibai College", "NM College", "Wilson College", "Sophia College", "HR College"], ["BA Economics", "Mumbai", "Economics Colleges Mumbai"]),
  best("BA Economics", "Bangalore", "ba-economics-bangalore", ["Christ University", "St. Joseph's College", "Jain University", "Mount Carmel College", "Bangalore University", "Kristu Jayanti College", "CMR University", "PES University"], ["BA Economics", "Bangalore", "Economics Colleges Bangalore"]),
  best("BA Economics", "Kolkata", "ba-economics-kolkata", ["Presidency University", "St. Xavier's College", "Jadavpur University", "Scottish Church College", "Calcutta University", "Lady Brabourne College", "Loreto College", "Ashutosh College"], ["BA Economics", "Kolkata", "Economics Colleges Kolkata"]),

  // ===== BA Psychology =====
  best("BA Psychology", "Delhi", "ba-psychology-delhi", ["Lady Shri Ram College", "Jesus and Mary College", "Gargi College", "Ambedkar University", "IP University", "Amity University Delhi", "Jamia Millia Islamia", "Miranda House"], ["BA Psychology", "Delhi", "Psychology Colleges Delhi"]),
  best("BA Psychology", "Mumbai", "ba-psychology-mumbai", ["St. Xavier's College Mumbai", "SNDT Women's University", "Sophia College", "KC College", "Mithibai College", "Wilson College", "Jai Hind College", "Maniben Nanavati College"], ["BA Psychology", "Mumbai", "Psychology Colleges Mumbai"]),
  best("BA Psychology", "Bangalore", "ba-psychology-bangalore", ["Christ University", "Jain University", "Mount Carmel College", "St. Joseph's College", "Kristu Jayanti College", "FLAME University Pune", "Bangalore University", "CMR University"], ["BA Psychology", "Bangalore", "Psychology Colleges Bangalore"]),
  best("BA Psychology", "Chennai", "ba-psychology-chennai", ["Loyola College", "Madras Christian College", "Stella Maris College", "WCC Chennai", "Ethiraj College", "University of Madras", "SRM University", "Presidency College"], ["BA Psychology", "Chennai", "Psychology Colleges Chennai"]),

  // ===== BA History =====
  best("BA History", "Delhi", "ba-history-delhi", ["St. Stephen's College", "Hindu College", "Lady Shri Ram College", "Miranda House", "Hansraj College", "Ramjas College", "Gargi College", "JNU Delhi"], ["BA History", "Delhi", "History Colleges Delhi"]),
  best("BA History", "Mumbai", "ba-history-mumbai", ["St. Xavier's College", "Wilson College", "Jai Hind College", "KC College", "Ruia College", "Mithibai College", "Sophia College", "NM College"], ["BA History", "Mumbai", "History Colleges Mumbai"]),
  best("BA History", "Kolkata", "ba-history-kolkata", ["Presidency University", "Jadavpur University", "St. Xavier's College", "Scottish Church College", "Calcutta University", "Lady Brabourne College", "Loreto College", "Bethune College"], ["BA History", "Kolkata", "History Colleges Kolkata"]),

  // ===== B.Ed =====
  best("B.Ed", "Delhi", "bed-delhi", ["Jamia Millia Islamia", "Lady Shri Ram College", "Central Institute of Education DU", "IP University B.Ed", "Amity University", "Guru Gobind Singh IP University", "IGNOU Delhi", "Lovely Professional University Delhi Centre"], ["B.Ed", "Delhi", "B.Ed Colleges Delhi"]),
  best("B.Ed", "Mumbai", "bed-mumbai", ["Mumbai University B.Ed Centres", "SNDT Women's University", "Rizvi Education Society", "Bombay Teachers Training College", "Pillai College of Education", "St. Xavier's Institute of Education", "DY Patil B.Ed College", "Thakur Shyamnarayan College"], ["B.Ed", "Mumbai", "B.Ed Colleges Mumbai"]),
  best("B.Ed", "Bangalore", "bed-bangalore", ["Bangalore University B.Ed", "Christ University", "Mount Carmel College of Education", "St. Joseph's College of Education", "Jain University B.Ed", "Vijaya Teachers College", "MES Teachers College", "Kristu Jayanti College of Education"], ["B.Ed", "Bangalore", "B.Ed Colleges Bangalore"]),
  best("B.Ed", "Chennai", "bed-chennai", ["University of Madras B.Ed", "Loyola College of Education", "SRM B.Ed College", "Madras University Teachers Training", "Stella Maris College of Education", "Lady Willingdon IASE", "Government College of Education Saidapet", "Sri Ramakrishna Mission Vidyalaya"], ["B.Ed", "Chennai", "B.Ed Colleges Chennai"]),
  best("B.Ed", "Kolkata", "bed-kolkata", ["Calcutta University B.Ed", "Rabindra Bharati University", "Jadavpur University B.Ed", "Loreto College of Education", "St. Xavier's College of Education", "Scottish Church College of Education", "WBUTTEPA Colleges", "Vidyasagar University B.Ed"], ["B.Ed", "Kolkata", "B.Ed Colleges Kolkata"]),
  best("B.Ed", "Jaipur", "bed-jaipur", ["University of Rajasthan B.Ed", "IIS University Jaipur", "Manipal University Jaipur", "Amity University Jaipur", "Jaipur National University", "Poornima University B.Ed", "NIMS University", "Rajasthan Vidyapeeth University"], ["B.Ed", "Jaipur", "B.Ed Colleges Jaipur"]),
  best("B.Ed", "Lucknow", "bed-lucknow", ["Lucknow University B.Ed", "BBAU Lucknow", "Amity University Lucknow", "Integral University B.Ed", "Babu Banarasi Das University", "SRMS B.Ed", "Invertis University B.Ed", "Era University Lucknow"], ["B.Ed", "Lucknow", "B.Ed Colleges Lucknow"]),

  // ===== D.El.Ed =====
  best("D.El.Ed", "Delhi", "deled-delhi", ["DIET Delhi", "SCERT Delhi", "Jamia Millia Islamia", "IGNOU Delhi", "Amity University Delhi", "IP University", "Guru Ram Das College of Education", "Pacific University Delhi Centre"], ["D.El.Ed", "Delhi", "D.El.Ed Colleges Delhi"]),
  best("D.El.Ed", "Mumbai", "deled-mumbai", ["DIET Mumbai", "SCERT Maharashtra", "Bombay Teachers Training College", "SNDT Women's University", "Rizvi Education Society", "Pillai College of Education", "KJ Somaiya College of Education", "Thakur College of Education"], ["D.El.Ed", "Mumbai", "D.El.Ed Colleges Mumbai"]),

  // ===== B.Des =====
  best("B.Des", "Mumbai", "bdes-mumbai", ["IIT Bombay IDC", "MIT Institute of Design", "Rachana Sansad Academy", "Sir JJ College of Architecture", "NMIMS School of Design", "Pearl Academy Mumbai", "ISDI Parsons Mumbai", "Symbiosis Institute of Design"], ["B.Des", "Mumbai", "Design Colleges Mumbai"]),
  best("B.Des", "Delhi", "bdes-delhi", ["NID Delhi", "Pearl Academy Delhi", "NIFT Delhi", "Srishti Manipal Institute", "Amity School of Design", "IILM University Design", "World University of Design", "Apeejay Institute of Design"], ["B.Des", "Delhi", "Design Colleges Delhi"]),
  best("B.Des", "Bangalore", "bdes-bangalore", ["NID Bangalore", "Srishti Manipal Institute", "Pearl Academy Bangalore", "Christ University Design", "DSK International School of Design", "Jain University School of Design", "CMR University Design", "Reva University Design"], ["B.Des", "Bangalore", "Design Colleges Bangalore"]),
  best("B.Des", "Pune", "bdes-pune", ["MIT Institute of Design Pune", "Symbiosis Institute of Design", "MAEER MIT Pune Design", "DY Patil School of Design", "Bharati Vidyapeeth Design", "FLAME University Design", "Sinhgad Institute of Design", "VIT Pune Design School"], ["B.Des", "Pune", "Design Colleges Pune"]),

  // ===== B.Arch =====
  best("B.Arch", "Mumbai", "barch-mumbai", ["Sir JJ College of Architecture", "Kamla Raheja Vidyanidhi Institute", "Academy of Architecture Mumbai", "Rizvi College of Architecture", "KRVIA Mumbai", "Bharati Vidyapeeth College of Architecture", "Pillai College of Architecture", "LS Raheja School of Architecture"], ["B.Arch", "Mumbai", "Architecture Colleges Mumbai"]),
  best("B.Arch", "Delhi", "barch-delhi", ["SPA Delhi", "Jamia Millia Islamia Architecture", "Sushant School of Art & Architecture", "Amity University Architecture", "IP University Architecture", "Ansal University Architecture", "GD Goenka University Architecture", "BIT Mesra Delhi Campus"], ["B.Arch", "Delhi", "Architecture Colleges Delhi"]),
  best("B.Arch", "Bangalore", "barch-bangalore", ["UVCE Architecture", "RV College of Architecture", "BMS College of Architecture", "MSRIT Architecture", "Dayananda Sagar Architecture", "CMR University Architecture", "PES University Architecture", "Christ University Architecture"], ["B.Arch", "Bangalore", "Architecture Colleges Bangalore"]),
  best("B.Arch", "Chennai", "barch-chennai", ["Anna University Architecture", "SRM School of Architecture", "Sathyabama Architecture", "Hindustan Architecture College", "Measi Academy of Architecture", "SPA Chennai (Proposed)", "VIT School of Architecture", "Saveetha Architecture College"], ["B.Arch", "Chennai", "Architecture Colleges Chennai"]),

  // ===== Hotel Management =====
  best("Hotel Management", "Mumbai", "hotel-mgmt-mumbai", ["IHM Mumbai", "Welcomgroup Graduate School Mumbai", "Sophia Polytechnic Hotel Management", "DY Patil Hotel Management", "Kohinoor Hotel Management", "Rizvi College of Hotel Management", "MGM Hotel Management", "ITM Hotel Management"], ["Hotel Management", "Mumbai", "Hotel Management Colleges Mumbai"]),
  best("Hotel Management", "Delhi", "hotel-mgmt-delhi", ["IHM Pusa Delhi", "IIHM Delhi", "Amity University Hotel Management", "IP University Hotel Management", "AIHM Delhi", "Ecole Hoteliere Delhi", "Apeejay Institute of Hospitality", "Banarsidas Chandiwala Institute"], ["Hotel Management", "Delhi", "Hotel Management Colleges Delhi"]),
  best("Hotel Management", "Bangalore", "hotel-mgmt-bangalore", ["IHM Bangalore", "Christ University Hotel Management", "Welcomgroup Graduate School Manipal", "PES University Hospitality", "Jain University Hospitality", "Acharya Institute of Hotel Management", "MS Ramaiah Hospitality", "Garden City University"], ["Hotel Management", "Bangalore", "Hotel Management Colleges Bangalore"]),
  best("Hotel Management", "Chennai", "hotel-mgmt-chennai", ["IHM Chennai", "SRM Hotel Management", "Loyola Hotel Management", "Madras Hotel Management", "Hindustan Hotel Management", "IIHM Chennai", "Sathyabama Hospitality", "Dr MGR University Hotel Management"], ["Hotel Management", "Chennai", "Hotel Management Colleges Chennai"]),
  best("Hotel Management", "Hyderabad", "hotel-mgmt-hyderabad", ["IHM Hyderabad", "IIHM Hyderabad", "Osmania University Hotel Management", "St. Mary's Hotel Management", "Aurora Hotel Management", "GITAM Hotel Management", "ICFAI Hotel Management", "Wesley Hotel Management"], ["Hotel Management", "Hyderabad", "Hotel Management Colleges Hyderabad"]),

  // ===== B.Sc Agriculture =====
  best("B.Sc Agriculture", "Pune", "bsc-agri-pune", ["Mahatma Phule Krishi Vidyapeeth Rahuri", "College of Agriculture Pune", "MIT ADT Agriculture", "Savitribai Phule Pune University Agri", "Symbiosis Agriculture", "DY Patil Agriculture College", "Bharati Vidyapeeth Agriculture", "Modern College Agriculture"], ["B.Sc Agriculture", "Pune", "Agriculture Colleges Pune"]),
  best("B.Sc Agriculture", "Delhi", "bsc-agri-delhi", ["IARI Pusa Delhi", "Amity University Agriculture", "Sharda University Agriculture", "IGNOU Agriculture", "Manav Rachna University Agriculture", "SRM University Delhi Agriculture", "Chaudhary Charan Singh University", "Sam Higginbottom Agriculture"], ["B.Sc Agriculture", "Delhi", "Agriculture Colleges Delhi"]),
  best("B.Sc Agriculture", "Bangalore", "bsc-agri-bangalore", ["UAS Bangalore", "GKVK Bangalore", "Christ University Agriculture", "Jain University Agriculture", "PES University Agriculture", "CMR University Agriculture", "Reva University Agriculture", "Bangalore University Agriculture"], ["B.Sc Agriculture", "Bangalore", "Agriculture Colleges Bangalore"]),
  best("B.Sc Agriculture", "Lucknow", "bsc-agri-lucknow", ["CSAU Kanpur (Lucknow Centre)", "NDUA&T Faizabad", "Sam Higginbottom Agriculture Allahabad", "Amity University Lucknow Agriculture", "Integral University Agriculture", "BBAU Agriculture", "Lucknow University Agriculture", "Babu Banarasi Das Agriculture"], ["B.Sc Agriculture", "Lucknow", "Agriculture Colleges Lucknow"]),
  best("B.Sc Agriculture", "Bhopal", "bsc-agri-bhopal", ["JNKVV Jabalpur Bhopal Campus", "RVSKVV Gwalior Bhopal", "RKDF University Agriculture", "Barkatullah University Agriculture", "People's University Agriculture", "Sarvepalli Radhakrishnan University Agriculture", "Rabindranath Tagore University Agriculture", "Mansarovar College Agriculture"], ["B.Sc Agriculture", "Bhopal", "Agriculture Colleges Bhopal"]),
  best("B.Sc Agriculture", "Patna", "bsc-agri-patna", ["Rajendra Agricultural University", "Bihar Agricultural University", "Patna University Agriculture", "Aryabhatta Knowledge University Agriculture", "Nalanda University Agriculture", "Patna Science College Agriculture", "AN College Patna Agriculture", "BN Mandal University Agriculture"], ["B.Sc Agriculture", "Patna", "Agriculture Colleges Patna"]),

  // ===== Diploma Engineering =====
  best("Diploma Engineering", "Mumbai", "diploma-eng-mumbai", ["Government Polytechnic Mumbai", "VPM's Polytechnic Mumbai", "Thakur Polytechnic Mumbai", "Vidyalankar Polytechnic", "KJ Somaiya Polytechnic", "Bharati Vidyapeeth Polytechnic", "Anjuman-I-Islam Polytechnic", "Atharva Polytechnic"], ["Diploma Engineering", "Mumbai", "Polytechnic Colleges Mumbai"]),
  best("Diploma Engineering", "Delhi", "diploma-eng-delhi", ["Pusa Polytechnic Delhi", "Ambedkar Polytechnic Delhi", "CH Chhabil Dass Polytechnic", "Kasturba Polytechnic Delhi", "GB Pant Polytechnic Delhi", "Aryabhatt Polytechnic Delhi", "Meera Bai Polytechnic", "Bhai Parmanand Polytechnic"], ["Diploma Engineering", "Delhi", "Polytechnic Colleges Delhi"]),
  best("Diploma Engineering", "Bangalore", "diploma-eng-bangalore", ["Government Polytechnic Bangalore", "BMS Polytechnic", "JSS Polytechnic", "SJBIT Polytechnic", "Dayananda Sagar Polytechnic", "MEI Polytechnic", "CMR Polytechnic Bangalore", "Nitte Polytechnic"], ["Diploma Engineering", "Bangalore", "Polytechnic Colleges Bangalore"]),
  best("Diploma Engineering", "Chennai", "diploma-eng-chennai", ["Government Polytechnic Chennai", "Thiagarajar Polytechnic Chennai", "Anna Polytechnic Chennai", "Central Polytechnic Chennai", "Sairam Polytechnic", "SRM Polytechnic", "Pachaiyappas Polytechnic", "Murugappa Polytechnic"], ["Diploma Engineering", "Chennai", "Polytechnic Colleges Chennai"]),

  // ===== BPT (Physiotherapy) =====
  best("BPT", "Mumbai", "bpt-mumbai", ["Seth GS Medical College Physiotherapy", "TNMC Physiotherapy Mumbai", "DY Patil School of Physiotherapy", "MGM College of Physiotherapy", "Bharati Vidyapeeth Physiotherapy", "MAEER MIT Physiotherapy", "Terna Physiotherapy College", "Sancheti Institute Physiotherapy"], ["BPT", "Mumbai", "Physiotherapy Colleges Mumbai"]),
  best("BPT", "Delhi", "bpt-delhi", ["Jamia Hamdard Physiotherapy", "AIIMS Physiotherapy Delhi", "IP University Physiotherapy", "Manav Rachna Physiotherapy", "Amity University Physiotherapy", "Banarsidas Chandiwala Physiotherapy", "SGT University Physiotherapy", "Sharda University Physiotherapy"], ["BPT", "Delhi", "Physiotherapy Colleges Delhi"]),
  best("BPT", "Bangalore", "bpt-bangalore", ["JSS Institute of Physiotherapy", "MS Ramaiah College of Physiotherapy", "Rajiv Gandhi University Physiotherapy", "Vydehi Physiotherapy College", "MVJ Medical College Physiotherapy", "Acharya College of Physiotherapy", "Nitte Institute of Physiotherapy", "Sapthagiri Physiotherapy College"], ["BPT", "Bangalore", "Physiotherapy Colleges Bangalore"]),
  best("BPT", "Chennai", "bpt-chennai", ["SRM College of Physiotherapy", "Saveetha College of Physiotherapy", "Meenakshi College of Physiotherapy", "Sri Ramachandra Physiotherapy", "Chettinad Physiotherapy College", "Sree Balaji Physiotherapy College", "Apollo Physiotherapy College", "KMCH Physiotherapy Coimbatore"], ["BPT", "Chennai", "Physiotherapy Colleges Chennai"]),

  // ===== B.Sc Animation =====
  best("B.Sc Animation", "Mumbai", "bsc-animation-mumbai", ["Arena Animation Mumbai", "MAAC Mumbai", "DSK International Campus", "Frameboxx Animation Mumbai", "Whistling Woods International", "DY Patil Animation", "Symbiosis Animation Mumbai", "Tilak Maharashtra Vidyapeeth Animation"], ["B.Sc Animation", "Mumbai", "Animation Colleges Mumbai"]),
  best("B.Sc Animation", "Bangalore", "bsc-animation-bangalore", ["Arena Animation Bangalore", "Backstage Pass Animation", "Srishti Manipal Institute", "MAAC Bangalore", "Frameboxx Bangalore", "Christ University Animation", "Jain University Animation", "CMR University Animation"], ["B.Sc Animation", "Bangalore", "Animation Colleges Bangalore"]),
  best("B.Sc Animation", "Delhi", "bsc-animation-delhi", ["Arena Animation Delhi", "MAAC Delhi", "Frameboxx Delhi", "Pearl Academy Delhi", "Amity University Animation", "World University of Design", "AAFT Delhi", "Apeejay Institute of Design Delhi"], ["B.Sc Animation", "Delhi", "Animation Colleges Delhi"]),
  best("B.Sc Animation", "Chennai", "bsc-animation-chennai", ["Arena Animation Chennai", "MAAC Chennai", "Loyola Visual Communication", "VIT Animation Chennai", "SRM Animation Chennai", "Sathyabama Animation", "Hindustan Animation College", "MOP Vaishnav Animation"], ["B.Sc Animation", "Chennai", "Animation Colleges Chennai"]),
  best("B.Sc Animation", "Hyderabad", "bsc-animation-hyderabad", ["Arena Animation Hyderabad", "MAAC Hyderabad", "Backstage Pass Hyderabad", "Frameboxx Hyderabad", "AISFM Hyderabad", "GITAM Animation", "Image College of Arts", "Annapurna International Animation"], ["B.Sc Animation", "Hyderabad", "Animation Colleges Hyderabad"]),

  // ===== B.Sc IT =====
  best("B.Sc IT", "Mumbai", "bsc-it-mumbai", ["Mumbai University IT Colleges", "KC College Mumbai", "Mithibai College", "Jai Hind College", "SIES College", "Vidyalankar College", "Thakur College Mumbai", "NM College"], ["B.Sc IT", "Mumbai", "IT Colleges Mumbai"]),
  best("B.Sc IT", "Delhi", "bsc-it-delhi", ["IP University IT", "Jamia Millia Islamia", "Amity University IT", "Guru Gobind Singh IP University", "Maharaja Surajmal Institute", "BPIT Delhi", "IINTM Delhi", "Jagan Institute IT"], ["B.Sc IT", "Delhi", "IT Colleges Delhi"]),
  best("B.Sc IT", "Pune", "bsc-it-pune", ["Savitribai Phule Pune University", "Fergusson College IT", "Modern College IT", "Sinhgad Institute IT", "Bharati Vidyapeeth IT", "MIT WPU IT", "Symbiosis IT Pune", "Indira College IT"], ["B.Sc IT", "Pune", "IT Colleges Pune"]),
  best("B.Sc IT", "Bangalore", "bsc-it-bangalore", ["Christ University IT", "Jain University IT", "Mount Carmel College IT", "St. Joseph's College IT", "Kristu Jayanti IT", "PES University IT", "CMR University IT", "Bangalore University IT"], ["B.Sc IT", "Bangalore", "IT Colleges Bangalore"]),

  // ===== STATE-LEVEL ENTRIES =====

  // Maharashtra
  best("B.Tech CSE", "Maharashtra", "btech-cse-maharashtra", ["IIT Bombay", "VJTI Mumbai", "COEP Pune", "SPIT Mumbai", "PICT Pune", "VIT Pune", "MIT Pune", "Walchand College Sangli", "SGGSIE&T Nanded", "Government Engineering College Aurangabad"], ["B.Tech CSE", "Maharashtra", "Engineering Maharashtra"]),
  best("MBA", "Maharashtra", "mba-maharashtra", ["JBIMS Mumbai", "SPJIMR", "SIBM Pune", "SCMHRD Pune", "NMIMS Mumbai", "Welingkar Mumbai", "K.J. Somaiya Mumbai", "Symbiosis Centre Pune", "MIT WPU Pune", "Bharati Vidyapeeth Pune"], ["MBA", "Maharashtra", "MBA Maharashtra"]),
  best("MBBS", "Maharashtra", "mbbs-maharashtra", ["Seth GS Medical College Mumbai", "BJ Medical College Pune", "AFMC Pune", "Grant Medical College Mumbai", "Government Medical College Nagpur", "GMC Aurangabad", "LTMMC Sion Mumbai", "Dr VM Government Medical College Solapur"], ["MBBS", "Maharashtra", "Medical Colleges Maharashtra"]),
  best("BA LLB", "Maharashtra", "ballb-maharashtra", ["Government Law College Mumbai", "ILS Law College Pune", "Symbiosis Law School Pune", "KC Law College Mumbai", "Bharati Vidyapeeth Law Pune", "Dr. Ambedkar Law College Nagpur", "DY Patil Law Mumbai", "MIT WPU Law Pune"], ["BA LLB", "Maharashtra", "Law Colleges Maharashtra"]),

  // Karnataka
  best("B.Tech CSE", "Karnataka", "btech-cse-karnataka", ["IISc Bangalore", "RVCE Bangalore", "PES University", "BMS College Bangalore", "MSRIT", "NITK Surathkal", "NIE Mysore", "SDM College Dharwad", "SJCE Mysore", "Manipal Institute of Technology"], ["B.Tech CSE", "Karnataka", "Engineering Karnataka"]),
  best("MBA", "Karnataka", "mba-karnataka", ["IIM Bangalore", "Christ University", "Alliance University", "TAPMI Manipal", "XIME Bangalore", "SDM IMD Mysore", "PES University", "Manipal Academy of Higher Education", "ISBR Bangalore", "Jain University"], ["MBA", "Karnataka", "MBA Karnataka"]),
  best("MBBS", "Karnataka", "mbbs-karnataka", ["Bangalore Medical College", "St. John's Medical College", "Kasturba Medical College Manipal", "JSS Medical College Mysore", "MS Ramaiah Medical College", "KMC Mangalore", "SDM College Dharwad", "KIMS Hubli", "Vydehi Institute Bangalore"], ["MBBS", "Karnataka", "Medical Colleges Karnataka"]),
  best("BCA", "Karnataka", "bca-karnataka-mega", ["Christ University", "Jain University", "PES University", "St. Joseph's College", "Mount Carmel College", "Kristu Jayanti College", "Manipal University", "BMS College", "CMR University", "Acharya Institute"], ["BCA", "Karnataka", "BCA Karnataka"]),

  // Tamil Nadu
  best("B.Tech CSE", "Tamil Nadu", "btech-cse-tamilnadu", ["IIT Madras", "Anna University", "NIT Trichy", "PSG College Coimbatore", "SSN College Chennai", "SRM Institute", "VIT Vellore", "Amrita Vishwa Vidyapeetham", "CIT Coimbatore", "TCE Madurai"], ["B.Tech CSE", "Tamil Nadu", "Engineering Tamil Nadu"]),
  best("MBA", "Tamil Nadu", "mba-tamilnadu", ["IIT Madras DoMS", "Anna University MBA", "Great Lakes Chennai", "LIBA Chennai", "SRM University", "VIT Business School", "PSG Institute Coimbatore", "IFMR Chennai", "Loyola Institute Chennai", "Amrita School of Business"], ["MBA", "Tamil Nadu", "MBA Tamil Nadu"]),
  best("MBBS", "Tamil Nadu", "mbbs-tamilnadu", ["Madras Medical College", "Stanley Medical College", "Kilpauk Medical College", "JIPMER Puducherry", "Government Medical College Coimbatore", "Thanjavur Medical College", "Tirunelveli Medical College", "Madurai Medical College", "SRM Medical College", "Christian Medical College Vellore"], ["MBBS", "Tamil Nadu", "Medical Colleges Tamil Nadu"]),

  // Kerala
  best("B.Tech CSE", "Kerala", "btech-cse-kerala", ["NIT Calicut", "IIST Thiruvananthapuram", "CET Thiruvananthapuram", "Government Engineering College Thrissur", "Model Engineering College Kochi", "TKM College Kollam", "SCMS Kochi", "Rajagiri School of Engineering", "Amrita Vishwa Vidyapeetham Amritapuri", "Mar Athanasius College Kothamangalam"], ["B.Tech CSE", "Kerala", "Engineering Kerala"]),
  best("MBBS", "Kerala", "mbbs-kerala", ["Government Medical College Thiruvananthapuram", "Government Medical College Kottayam", "Government Medical College Thrissur", "Government Medical College Kozhikode", "Amrita Institute of Medical Sciences", "Pushpagiri Medical College", "Jubilee Mission Medical College", "MES Medical College"], ["MBBS", "Kerala", "Medical Colleges Kerala"]),
  best("MBA", "Kerala", "mba-kerala", ["IIM Kozhikode", "CUSAT MBA", "SCMS Kochi", "Rajagiri Centre for Business Studies", "TKM Institute of Management", "FISAT MBA Kochi", "Albertian Institute of Management", "XIME Kochi"], ["MBA", "Kerala", "MBA Kerala"]),

  // Telangana
  best("B.Tech CSE", "Telangana", "btech-cse-telangana", ["IIT Hyderabad", "IIIT Hyderabad", "JNTU Hyderabad", "NIT Warangal", "Osmania University", "CBIT", "Vasavi College", "VNR VJIET", "Kakatiya University Warangal", "BVRIT Hyderabad"], ["B.Tech CSE", "Telangana", "Engineering Telangana"]),
  best("MBBS", "Telangana", "mbbs-telangana", ["Osmania Medical College", "Gandhi Medical College", "Kakatiya Medical College", "NIMS Hyderabad", "Deccan Medical College", "ESIC Medical College", "Shadan Medical College", "MediCiti Medical College"], ["MBBS", "Telangana", "Medical Colleges Telangana"]),

  // Andhra Pradesh
  best("B.Tech CSE", "Andhra Pradesh", "btech-cse-ap", ["IIT Tirupati", "IIIT Sri City", "NIT Andhra Pradesh", "Andhra University Visakhapatnam", "SVNIT Surat", "SV University Tirupati", "GITAM Visakhapatnam", "KL University Vijayawada", "VIT-AP Amaravati", "RGUKT Andhra Pradesh"], ["B.Tech CSE", "Andhra Pradesh", "Engineering Andhra Pradesh"]),
  best("MBBS", "Andhra Pradesh", "mbbs-ap", ["Andhra Medical College Visakhapatnam", "Guntur Medical College", "Rangaraya Medical College Kakinada", "Kurnool Medical College", "Sri Venkateswara Medical College Tirupati", "NRI Medical College Guntur", "Narayana Medical College Nellore", "Alluri Sitarama Raju Medical College"], ["MBBS", "Andhra Pradesh", "Medical Colleges AP"]),

  // UP
  best("B.Tech CSE", "Uttar Pradesh", "btech-cse-up", ["IIT Kanpur", "IIT BHU Varanasi", "IIIT Allahabad", "MNNIT Allahabad", "HBTU Kanpur", "AKTU Lucknow", "Amity University Noida", "Sharda University", "Bennett University", "JIIT Noida"], ["B.Tech CSE", "Uttar Pradesh", "Engineering UP"]),
  best("MBBS", "Uttar Pradesh", "mbbs-up", ["KGMU Lucknow", "BHU Medical Faculty", "GSVM Medical College Kanpur", "SN Medical College Agra", "MLN Medical College Allahabad", "LLRM Medical College Meerut", "Era Medical College Lucknow", "Integral Medical College Lucknow"], ["MBBS", "Uttar Pradesh", "Medical Colleges UP"]),
  best("MBA", "Uttar Pradesh", "mba-up", ["IIM Lucknow", "IIT Kanpur MBA", "Amity University Noida", "Jaipuria Institute Lucknow", "GLBIMR Greater Noida", "Sharda University MBA", "Bennett University MBA", "Galgotias University MBA"], ["MBA", "Uttar Pradesh", "MBA UP"]),

  // Rajasthan
  best("B.Tech CSE", "Rajasthan", "btech-cse-rajasthan", ["MNIT Jaipur", "IIT Jodhpur", "BITS Pilani", "JECRC University Jaipur", "Manipal University Jaipur", "LNM Institute Jaipur", "Poornima University", "Amity University Jaipur", "Rajasthan Technical University Kota", "MBM University Jodhpur"], ["B.Tech CSE", "Rajasthan", "Engineering Rajasthan"]),
  best("MBBS", "Rajasthan", "mbbs-rajasthan", ["SMS Medical College Jaipur", "Dr SN Medical College Jodhpur", "JLN Medical College Ajmer", "RNT Medical College Udaipur", "NIMS Medical College Jaipur", "Geetanjali Medical College Udaipur", "Pacific Medical College Udaipur", "Mahatma Gandhi Medical College Jaipur"], ["MBBS", "Rajasthan", "Medical Colleges Rajasthan"]),

  // Gujarat
  best("B.Tech CSE", "Gujarat", "btech-cse-gujarat", ["IIT Gandhinagar", "DAIICT Gandhinagar", "NIT Surat", "Nirma University", "LDCE Ahmedabad", "GTU Ahmedabad", "Charotar University", "Pandit Deendayal University", "Silver Oak University", "Ahmedabad University"], ["B.Tech CSE", "Gujarat", "Engineering Gujarat"]),
  best("MBA", "Gujarat", "mba-gujarat", ["IIM Ahmedabad", "MICA Ahmedabad", "Nirma University", "GLS University", "PDPU MBA", "Gujarat University MBA", "Ahmedabad University", "EDII Ahmedabad", "SIBM Ahmedabad", "Charotar University MBA"], ["MBA", "Gujarat", "MBA Gujarat"]),

  // MP
  best("B.Tech CSE", "Madhya Pradesh", "btech-cse-mp", ["IIT Indore", "MANIT Bhopal", "IIIT Jabalpur", "IET DAVV Indore", "LNCT Bhopal", "SGSITS Indore", "UIT RGPV Bhopal", "Medicaps University Indore", "TIT Bhopal", "Oriental Institute Bhopal"], ["B.Tech CSE", "Madhya Pradesh", "Engineering MP"]),

  // West Bengal
  best("B.Tech CSE", "West Bengal", "btech-cse-wb", ["IIT Kharagpur", "Jadavpur University", "IIEST Shibpur", "NIT Durgapur", "Heritage Institute Kolkata", "Techno India", "MAKAUT", "KIIT Kolkata", "Meghnad Saha Institute", "Narula Institute"], ["B.Tech CSE", "West Bengal", "Engineering West Bengal"]),
  best("MBA", "West Bengal", "mba-wb", ["IIM Calcutta", "IIT Kharagpur VGSoM", "Calcutta University MBA", "XLRI Jamshedpur", "St. Xavier's College Kolkata", "Globsyn Business School", "Army Institute of Management", "NSHM Kolkata", "Heritage Business School", "Techno India Group MBA"], ["MBA", "West Bengal", "MBA West Bengal"]),

  // Bihar
  best("B.Tech CSE", "Bihar", "btech-cse-bihar", ["IIT Patna", "NIT Patna", "BIT Mesra Patna Campus", "Chanakya National Law University Patna", "Birla Institute Patna", "LN Mishra Institute", "Muzaffarpur Institute", "Darbhanga College of Engineering", "Nalanda University", "Aryabhatta Knowledge University"], ["B.Tech CSE", "Bihar", "Engineering Bihar"]),
  best("MBBS", "Bihar", "mbbs-bihar", ["Patna Medical College", "AIIMS Patna", "IGIMS Patna", "Nalanda Medical College", "Darbhanga Medical College", "ANMCH Gaya", "SKMCH Muzaffarpur", "Katihar Medical College", "Vardhman Medical College"], ["MBBS", "Bihar", "Medical Colleges Bihar"]),

  // Jharkhand
  best("B.Tech CSE", "Jharkhand", "btech-cse-jharkhand", ["IIT ISM Dhanbad", "NIT Jamshedpur", "BIT Mesra Ranchi", "XLRI Jamshedpur (Tech)", "Birla Institute of Technology", "Cambridge Institute Ranchi", "RKDF University Ranchi", "University of Jharkhand"], ["B.Tech CSE", "Jharkhand", "Engineering Jharkhand"]),

  // Odisha
  best("B.Tech CSE", "Odisha", "btech-cse-odisha", ["NIT Rourkela", "IIT Bhubaneswar", "VSSUT Burla", "CET Bhubaneswar", "KIIT University", "SOA University", "IGIT Sarang", "Silicon Institute Bhubaneswar", "CV Raman Global University", "Centurion University"], ["B.Tech CSE", "Odisha", "Engineering Odisha"]),

  // Punjab
  best("B.Tech CSE", "Punjab", "btech-cse-punjab", ["IIT Ropar", "NIT Jalandhar", "Thapar University Patiala", "Punjabi University Patiala", "Lovely Professional University", "Chandigarh University Mohali", "Guru Nanak Dev University", "Chitkara University", "DAV University Jalandhar", "CT University Ludhiana"], ["B.Tech CSE", "Punjab", "Engineering Punjab"]),
  best("MBA", "Punjab", "mba-punjab", ["IIM Amritsar", "ISB Mohali", "Thapar University MBA", "Lovely Professional University MBA", "Chandigarh University MBA", "Guru Nanak Dev University MBA", "Chitkara University MBA", "Punjab University Business School"], ["MBA", "Punjab", "MBA Punjab"]),

  // Haryana
  best("B.Tech CSE", "Haryana", "btech-cse-haryana", ["NIT Kurukshetra", "DCR University Murthal", "MDU Rohtak", "GJU Hisar", "BPS Mahila University", "Manav Rachna University Faridabad", "Amity University Gurgaon", "SRM University Sonipat", "K.R. Mangalam University", "Maharishi Markandeshwar University"], ["B.Tech CSE", "Haryana", "Engineering Haryana"]),

  // Uttarakhand
  best("B.Tech CSE", "Uttarakhand", "btech-cse-uttarakhand", ["IIT Roorkee", "Graphic Era University Dehradun", "UPES Dehradun", "DIT University", "Govind Ballabh Pant University", "Uttaranchal University", "Shoolini University (HP nearby)", "Kumaon University", "HNB Garhwal University", "Doon University"], ["B.Tech CSE", "Uttarakhand", "Engineering Uttarakhand"]),

  // HP
  best("B.Tech CSE", "Himachal Pradesh", "btech-cse-hp", ["NIT Hamirpur", "IIT Mandi", "Jaypee University Solan", "Himachal Pradesh University Shimla", "Shoolini University", "Bahra University Solan", "APG Shimla University", "Chitkara University HP"], ["B.Tech CSE", "Himachal Pradesh", "Engineering HP"]),

  // Chhattisgarh
  best("B.Tech CSE", "Chhattisgarh", "btech-cse-chhattisgarh", ["NIT Raipur", "IIT Bhilai", "CSVTU Bhilai", "Rungta College Bhilai", "SSIPMT Raipur", "OP Jindal University", "AISECT University", "Amity University Raipur"], ["B.Tech CSE", "Chhattisgarh", "Engineering Chhattisgarh"]),

  // Goa
  best("B.Tech CSE", "Goa", "btech-cse-goa", ["NIT Goa", "BITS Pilani Goa", "Goa Engineering College", "Padre Conceicao College of Engineering", "Don Bosco College of Engineering", "Agnel Institute of Technology", "Goa University", "Shree Rayeshwar Institute"], ["B.Tech CSE", "Goa", "Engineering Goa"]),

  // Assam
  best("B.Tech CSE", "Assam", "btech-cse-assam", ["IIT Guwahati", "NIT Silchar", "Tezpur University", "Assam Engineering College", "Jorhat Engineering College", "Girijananda Chowdhury Institute", "Royal Global University", "Assam Don Bosco University"], ["B.Tech CSE", "Assam", "Engineering Assam"]),

  // J&K
  best("B.Tech CSE", "Jammu & Kashmir", "btech-cse-jk", ["NIT Srinagar", "IIT Jammu", "University of Jammu", "University of Kashmir", "BGSBU Rajouri", "Central University of Kashmir", "SMVDU Katra", "Islamic University of Science & Technology"], ["B.Tech CSE", "Jammu & Kashmir", "Engineering J&K"]),

  // Northeast states
  best("B.Tech CSE", "Sikkim", "btech-cse-sikkim", ["NIT Sikkim", "Sikkim Manipal University", "Sikkim University", "ICFAI University Sikkim", "Eastern Institute for Integrated Learning", "Vinayaka Missions Sikkim", "EIILM University"], ["B.Tech CSE", "Sikkim", "Engineering Sikkim"]),
  best("B.Tech CSE", "Meghalaya", "btech-cse-meghalaya", ["NIT Meghalaya", "IIM Shillong (Tech)", "North Eastern Hill University", "University of Science and Technology Meghalaya", "ICFAI University Meghalaya", "Martin Luther Christian University", "William Carey University"], ["B.Tech CSE", "Meghalaya", "Engineering Meghalaya"]),
  best("B.Tech CSE", "Manipur", "btech-cse-manipur", ["NIT Manipur", "Manipur University", "Central Agricultural University", "National Institute of Technology Manipur", "DM University Manipur", "NIELIT Imphal", "Manipur Technical University"], ["B.Tech CSE", "Manipur", "Engineering Manipur"]),
  best("B.Tech CSE", "Nagaland", "btech-cse-nagaland", ["NIT Nagaland", "Nagaland University", "ICFAI University Nagaland", "Patkai Christian College", "Eastern Theological College", "Fazl Ali College", "Sazolie College"], ["B.Tech CSE", "Nagaland", "Engineering Nagaland"]),
  best("B.Tech CSE", "Mizoram", "btech-cse-mizoram", ["NIT Mizoram", "Mizoram University", "ICFAI University Mizoram", "Pachhunga University College", "Government Hrangbana College", "Government Aizawl College", "Mizoram Engineering College"], ["B.Tech CSE", "Mizoram", "Engineering Mizoram"]),
  best("B.Tech CSE", "Tripura", "btech-cse-tripura", ["NIT Agartala", "Tripura University", "ICFAI University Tripura", "Tripura Institute of Technology", "MBB University College", "Maharaja Bir Bikram University", "Netaji Subhash Mahavidyalaya"], ["B.Tech CSE", "Tripura", "Engineering Tripura"]),
  best("B.Tech CSE", "Arunachal Pradesh", "btech-cse-arunachal", ["NIT Arunachal Pradesh", "Rajiv Gandhi University", "North Eastern Regional Institute of Science", "NERIST Itanagar", "Himalayan University", "Arunachal University of Studies", "DNGC Itanagar"], ["B.Tech CSE", "Arunachal Pradesh", "Engineering Arunachal Pradesh"]),

  // ===== More city-specific entries =====

  // Kochi
  best("B.Tech CSE", "Kochi", "btech-cse-kochi", ["CUSAT Kochi", "Model Engineering College", "SCMS School of Engineering", "Rajagiri School of Engineering", "Toc H Institute of Science", "Federal Institute of Science", "Amal Jyothi College", "Cochin University College of Engineering"], ["B.Tech CSE", "Kochi", "Engineering Kochi"]),
  best("MBA", "Kochi", "mba-kochi", ["CUSAT MBA", "Rajagiri Centre for Business Studies", "SCMS Kochi", "FISAT MBA", "Albertian Institute of Management", "XIME Kochi", "Bharata Mata School of Management", "Saintgits Institute of Management"], ["MBA", "Kochi", "MBA Kochi"]),

  // Thiruvananthapuram
  best("B.Tech CSE", "Thiruvananthapuram", "btech-cse-tvm", ["CET Thiruvananthapuram", "IIST Thiruvananthapuram", "TKM College Kollam", "Mar Baselios College", "Sree Chitra Thirunal College", "College of Engineering Attingal", "UKF College of Engineering", "Government Engineering College Barton Hill"], ["B.Tech CSE", "Thiruvananthapuram", "Engineering Trivandrum"]),

  // Mangalore
  best("B.Tech CSE", "Mangalore", "btech-cse-mangalore", ["NIT Surathkal", "St. Joseph Engineering College", "Canara Engineering College", "NMAM Institute of Technology Nitte", "Sahyadri College of Engineering", "Bearys Institute of Technology", "Yenepoya Institute of Technology", "PA College of Engineering"], ["B.Tech CSE", "Mangalore", "Engineering Mangalore"]),
  best("MBBS", "Mangalore", "mbbs-mangalore", ["KMC Mangalore", "Father Muller Medical College", "AJ Institute of Medical Sciences", "Yenepoya Medical College", "Kanachur Medical College", "KS Hegde Medical Academy", "Srinivas Institute of Medical Sciences"], ["MBBS", "Mangalore", "Medical Colleges Mangalore"]),

  // Mysore
  best("B.Tech CSE", "Mysore", "btech-cse-mysore", ["NIE Mysore", "SJCE Mysore", "Vidyavardhaka College of Engineering", "GSSSIETW Mysore", "PES College of Engineering Mandya", "Maharaja Institute of Technology", "NIEIT Mysore", "Vidya Vikas Institute Mysore"], ["B.Tech CSE", "Mysore", "Engineering Mysore"]),

  // Patna
  best("B.Tech CSE", "Patna", "btech-cse-patna", ["IIT Patna", "NIT Patna", "Chanakya National Law University Engineering", "BIT Patna", "Patna University Engineering", "Aryabhatta Knowledge University", "LN Mishra Institute", "Netaji Subhas Institute Patna"], ["B.Tech CSE", "Patna", "Engineering Patna"]),

  // Bhubaneswar
  best("B.Tech CSE", "Bhubaneswar", "btech-cse-bhubaneswar", ["IIT Bhubaneswar", "CET Bhubaneswar", "KIIT University", "SOA University", "Silicon Institute", "CV Raman Global University", "ITER SOA", "Trident Academy", "BPUT Rourkela"], ["B.Tech CSE", "Bhubaneswar", "Engineering Bhubaneswar"]),

  // Guwahati
  best("B.Tech CSE", "Guwahati", "btech-cse-guwahati", ["IIT Guwahati", "Assam Engineering College", "Girijananda Chowdhury Institute", "Royal Global University", "Assam Don Bosco University", "Tezpur University Guwahati Campus", "GIMT Guwahati", "Kaziranga University"], ["B.Tech CSE", "Guwahati", "Engineering Guwahati"]),

  // Nagpur
  best("B.Tech CSE", "Nagpur", "btech-cse-nagpur", ["VNIT Nagpur", "RCOEM Nagpur", "GHRCE Nagpur", "Priyadarshini College of Engineering", "YCCE Nagpur", "Shri Ramdeobaba College", "KDK College of Engineering", "Nagpur University Engineering"], ["B.Tech CSE", "Nagpur", "Engineering Nagpur"]),
  best("MBBS", "Nagpur", "mbbs-nagpur", ["Government Medical College Nagpur", "NKP Salve Medical College", "Datta Meghe Institute Wardha", "AIIMS Nagpur", "Jawaharlal Nehru Medical College Wardha", "Indira Gandhi Government Medical College", "DMIMS Nagpur"], ["MBBS", "Nagpur", "Medical Colleges Nagpur"]),

  // Dehradun
  best("B.Tech CSE", "Dehradun", "btech-cse-dehradun", ["IIT Roorkee (nearby)", "Graphic Era University", "UPES Dehradun", "DIT University", "Uttaranchal University", "University of Petroleum Dehradun", "Doon University", "Dev Bhoomi Group of Institutions"], ["B.Tech CSE", "Dehradun", "Engineering Dehradun"]),

  // Amritsar
  best("B.Tech CSE", "Amritsar", "btech-cse-amritsar", ["Guru Nanak Dev University", "IKG Punjab Technical University Amritsar", "Sri Guru Ram Das Institute", "DAV Institute of Engineering Jalandhar", "Khalsa College of Engineering Amritsar", "GNDU Regional Campus", "Amritsar College of Engineering", "CT Institute Amritsar"], ["B.Tech CSE", "Amritsar", "Engineering Amritsar"]),

  // Surat
  best("B.Tech CSE", "Surat", "btech-cse-surat", ["NIT Surat (SVNIT)", "SCET Surat", "CKPCET Surat", "SVIT Surat", "Government Engineering College Surat", "Sarvajanik College of Engineering", "AD Patel Institute", "New LJ Institute Surat"], ["B.Tech CSE", "Surat", "Engineering Surat"]),

  // Vadodara
  best("B.Tech CSE", "Vadodara", "btech-cse-vadodara", ["MS University of Baroda", "Parul University", "Babaria Institute of Technology", "GEC Vadodara", "Sigma Institute of Engineering", "ITM Universe Vadodara", "ADIT Vallabh Vidyanagar", "Birla Vishvakarma Mahavidyalaya"], ["B.Tech CSE", "Vadodara", "Engineering Vadodara"]),

  // Visakhapatnam
  best("B.Tech CSE", "Visakhapatnam", "btech-cse-vizag", ["Andhra University Visakhapatnam", "GITAM University Vizag", "Raghu Engineering College", "Lendi Institute", "MVGR College of Engineering", "Gayatri Vidya Parishad", "Vignan's Institute", "ANITS Visakhapatnam"], ["B.Tech CSE", "Visakhapatnam", "Engineering Vizag"]),

  // Warangal
  best("B.Tech CSE", "Warangal", "btech-cse-warangal", ["NIT Warangal", "Kakatiya University Engineering", "SR Engineering College", "Vaagdevi Engineering College", "Vignan's Institute Warangal", "Chaitanya Bharathi Institute", "Kakatiya Institute of Technology", "CMR Technical Campus Warangal"], ["B.Tech CSE", "Warangal", "Engineering Warangal"]),

  // Tiruchirappalli
  best("B.Tech CSE", "Tiruchirappalli", "btech-cse-trichy", ["NIT Trichy", "IIT Madras Trichy Extension", "SASTRA University", "Anna University Trichy Campus", "Srimad Andavan Arts & Science College", "SRM TRP Engineering College", "K. Ramakrishnan College of Engineering", "MAM College of Engineering"], ["B.Tech CSE", "Tiruchirappalli", "Engineering Trichy"]),

  // Madurai
  best("B.Tech CSE", "Madurai", "btech-cse-madurai", ["Thiagarajar College of Engineering", "Madurai Kamaraj University", "Fatima Michael College of Engineering", "Kalasalingam University", "Velammal Engineering College Madurai", "PSNA College of Engineering", "University College of Engineering Dindigul", "Pandian Saraswathi Yadav Engineering"], ["B.Tech CSE", "Madurai", "Engineering Madurai"]),

  // Salem
  best("B.Tech CSE", "Salem", "btech-cse-salem", ["Government College of Engineering Salem", "Sona College of Technology", "Vinayaka Mission's Engineering College", "Paavai Engineering College", "Mahendra Engineering College", "AVS Engineering College", "Vel Tech Salem", "SSM Institute of Engineering"], ["B.Tech CSE", "Salem", "Engineering Salem"]),

  // Thrissur
  best("B.Tech CSE", "Thrissur", "btech-cse-thrissur", ["Government Engineering College Thrissur", "NSS College of Engineering Palakkad", "Vidya Academy of Science and Technology", "Sahrdaya College of Engineering", "IES College of Engineering", "Nehru College of Engineering Thrissur", "Adi Shankara Institute", "Federal Institute Thrissur"], ["B.Tech CSE", "Thrissur", "Engineering Thrissur"]),

  // Kozhikode
  best("B.Tech CSE", "Kozhikode", "btech-cse-kozhikode", ["NIT Calicut", "Government Engineering College Kozhikode", "MEA Engineering College", "AWH Engineering College", "MES College of Engineering Kuttippuram", "TKM College Kollam (nearby)", "Calicut University Institute", "NSS College Palakkad"], ["B.Tech CSE", "Kozhikode", "Engineering Kozhikode"]),

  // Ranchi
  best("B.Tech CSE", "Ranchi", "btech-cse-ranchi", ["BIT Mesra Ranchi", "NIT Jamshedpur (nearby)", "XLRI Tech", "Cambridge Institute Ranchi", "Birla Institute of Technology", "Jharkhand Rai University", "Usha Martin University", "AISECT Ranchi"], ["B.Tech CSE", "Ranchi", "Engineering Ranchi"]),

  // ===== Additional course-city combos =====

  // B.Arch additional
  best("B.Arch", "Hyderabad", "barch-hyderabad", ["JNTU Hyderabad Architecture", "School of Planning & Architecture Vijayawada", "Jawaharlal Nehru Architecture Fine Arts University", "Deccan College of Architecture", "Malla Reddy Architecture College", "GITAM Architecture", "VNR VJIET Architecture", "Holy Mary Architecture College"], ["B.Arch", "Hyderabad", "Architecture Colleges Hyderabad"]),

  // Hotel Management additional
  best("Hotel Management", "Kolkata", "hotel-mgmt-kolkata", ["IHM Kolkata", "IIHM Kolkata", "NSHM Hotel Management", "Army Institute of Hotel Management", "Guru Nanak Institute of Hotel Management", "Heritage Institute of Hotel Management", "George College Hotel Management", "JIS Group Hotel Management"], ["Hotel Management", "Kolkata", "Hotel Management Colleges Kolkata"]),
  best("Hotel Management", "Jaipur", "hotel-mgmt-jaipur", ["IHM Jaipur", "Manipal University Jaipur HM", "Amity University Jaipur HM", "NIMS University Hotel Management", "University of Rajasthan HM", "Jaipur National University HM", "Pacific University Hotel Management", "Suresh Gyan Vihar University HM"], ["Hotel Management", "Jaipur", "Hotel Management Colleges Jaipur"]),

  // BPT additional
  best("BPT", "Pune", "bpt-pune", ["Sancheti Institute of Physiotherapy Pune", "Tilak Maharashtra Vidyapeeth Physiotherapy", "DY Patil Physiotherapy Pune", "MAEER MIT Physiotherapy Pune", "Bharati Vidyapeeth Physiotherapy Pune", "BVDU Physiotherapy", "MGM Physiotherapy Pune", "Symbiosis Physiotherapy"], ["BPT", "Pune", "Physiotherapy Colleges Pune"]),
  best("BPT", "Hyderabad", "bpt-hyderabad", ["NIMS Physiotherapy Hyderabad", "Deccan College of Physiotherapy", "Apollo Physiotherapy College Hyderabad", "SVS Institute of Physiotherapy", "ESIC Physiotherapy College", "Shadan Institute of Physiotherapy", "Yashoda Physiotherapy College", "Continental Physiotherapy College"], ["BPT", "Hyderabad", "Physiotherapy Colleges Hyderabad"]),

  // B.Sc Agriculture additional
  best("B.Sc Agriculture", "Hyderabad", "bsc-agri-hyderabad", ["PJTSAU Hyderabad", "Acharya NG Ranga Agricultural University", "JNTU Agriculture", "Osmania University Agriculture", "University of Hyderabad Agriculture", "GITAM Agriculture", "Malla Reddy Agriculture College", "SR University Agriculture"], ["B.Sc Agriculture", "Hyderabad", "Agriculture Colleges Hyderabad"]),
  best("B.Sc Agriculture", "Coimbatore", "bsc-agri-coimbatore", ["Tamil Nadu Agricultural University", "TNAU Coimbatore", "PSG College of Agriculture", "Amrita Agriculture College", "Kumaraguru College Agriculture", "Kongu Engineering College Agriculture", "KPR Institute Agriculture", "Bannari Amman Agriculture"], ["B.Sc Agriculture", "Coimbatore", "Agriculture Colleges Coimbatore"]),

  // B.Pharm additional
  best("B.Pharm", "Chennai", "bpharm-chennai", ["Madras Medical College Pharmacy", "SRM College of Pharmacy", "Sri Ramachandra College of Pharmacy", "Saveetha College of Pharmacy", "Meenakshi College of Pharmacy", "C.L. Baid Metha College of Pharmacy", "VELS Pharmacy Chennai", "Mohamed Sathak AJ Pharmacy College"], ["B.Pharm", "Chennai", "Pharmacy Colleges Chennai"]),
  best("B.Pharm", "Pune", "bpharm-pune", ["Poona College of Pharmacy", "Bharati Vidyapeeth Pharmacy Pune", "Sinhgad College of Pharmacy", "DY Patil Pharmacy Pune", "MIT Pharmacy Pune", "AISSMS College of Pharmacy", "Modern College of Pharmacy", "Allana College of Pharmacy Pune"], ["B.Pharm", "Pune", "Pharmacy Colleges Pune"]),

  // Diploma Engineering additional
  best("Diploma Engineering", "Hyderabad", "diploma-eng-hyderabad", ["Government Polytechnic Hyderabad", "Jawaharlal Nehru Polytechnic", "Muffakham Jah Polytechnic", "Sree Dattha Polytechnic", "Nizam's Polytechnic", "Aurora Polytechnic", "CMR Polytechnic Hyderabad", "Anurag Polytechnic"], ["Diploma Engineering", "Hyderabad", "Polytechnic Colleges Hyderabad"]),
  best("Diploma Engineering", "Ahmedabad", "diploma-eng-ahmedabad", ["Government Polytechnic Ahmedabad", "LD College of Engineering Diploma", "Silver Oak Polytechnic", "Ahmedabad Polytechnic", "GTU Diploma Colleges", "Nobel Polytechnic", "Shankersinh Vaghela Bapu Polytechnic", "RC Technical Institute"], ["Diploma Engineering", "Ahmedabad", "Polytechnic Colleges Ahmedabad"]),
  best("Diploma Engineering", "Lucknow", "diploma-eng-lucknow", ["Government Polytechnic Lucknow", "Babu Banarasi Das Polytechnic", "Integral Polytechnic", "Amity Polytechnic Lucknow", "SRMS Polytechnic", "IET Lucknow Polytechnic", "Lucknow Model Polytechnic", "Sanjay Gandhi Polytechnic"], ["Diploma Engineering", "Lucknow", "Polytechnic Colleges Lucknow"]),

  // ===== More MBA state entries =====
  best("MBA", "Rajasthan", "mba-rajasthan", ["IIM Udaipur", "MNIT Jaipur MBA", "Manipal University Jaipur MBA", "JECRC University MBA", "University of Rajasthan MBA", "Amity University Jaipur MBA", "IIS University MBA", "Poornima University MBA", "NIMS University MBA"], ["MBA", "Rajasthan", "MBA Rajasthan"]),
  best("MBA", "Odisha", "mba-odisha", ["XIMB Bhubaneswar", "IIM Sambalpur", "KIIT School of Management", "SOA University MBA", "Utkal University MBA", "Silicon Institute MBA", "CV Raman University MBA", "Centurion University MBA"], ["MBA", "Odisha", "MBA Odisha"]),
  best("MBA", "Bihar", "mba-bihar", ["IIM Bodh Gaya", "Chanakya National Law University MBA", "Patna University MBA", "Aryabhatta Knowledge University MBA", "Nalanda University MBA", "LN Mishra Institute MBA", "LNMU MBA Darbhanga", "AN College MBA"], ["MBA", "Bihar", "MBA Bihar"]),
  best("MBA", "Jharkhand", "mba-jharkhand", ["XLRI Jamshedpur", "BIT Mesra MBA", "NIT Jamshedpur MBA", "Birla Institute MBA", "Cambridge Institute MBA Ranchi", "AISECT MBA Ranchi", "Usha Martin University MBA", "Jharkhand Rai University MBA"], ["MBA", "Jharkhand", "MBA Jharkhand"]),
  best("MBA", "Assam", "mba-assam", ["IIM Shillong (nearby)", "IIT Guwahati MBA", "Tezpur University MBA", "Royal Global University MBA", "Assam Don Bosco University MBA", "Gauhati University MBA", "GIMT MBA Guwahati", "Kaziranga University MBA"], ["MBA", "Assam", "MBA Assam"]),

  // ===== Additional MBBS state entries =====
  best("MBBS", "Gujarat", "mbbs-gujarat", ["BJ Medical College Ahmedabad", "Government Medical College Surat", "Government Medical College Baroda", "NHL Medical College Ahmedabad", "GMERS Medical College", "PDU Medical College Rajkot", "AMC MET Medical College Ahmedabad", "Smt NHL Municipal Medical College"], ["MBBS", "Gujarat", "Medical Colleges Gujarat"]),
  best("MBBS", "MP", "mbbs-mp", ["AIIMS Bhopal", "Gandhi Medical College Bhopal", "Gajra Raja Medical College Gwalior", "MGM Medical College Indore", "NSCB Medical College Jabalpur", "SS Medical College Rewa", "Bundelkhand Medical College", "GR Medical College Gwalior"], ["MBBS", "Madhya Pradesh", "Medical Colleges MP"]),
  best("MBBS", "Punjab", "mbbs-punjab", ["Government Medical College Patiala", "Government Medical College Amritsar", "Christian Medical College Ludhiana", "DMC Ludhiana", "Government Medical College Chandigarh (PGIMER)", "GMC Faridkot", "Adesh Medical College Bathinda", "Gian Sagar Medical College"], ["MBBS", "Punjab", "Medical Colleges Punjab"]),
  best("MBBS", "Haryana", "mbbs-haryana", ["PGIMS Rohtak", "AIIMS Rewari (Proposed)", "BPS Government Medical College Khanpur Kalan", "ESIC Medical College Faridabad", "SGT Medical College Gurgaon", "MM Medical College Ambala", "NC Medical College Panipat", "Adesh Medical College Kurukshetra"], ["MBBS", "Haryana", "Medical Colleges Haryana"]),

  // ===== Remaining combinations =====
  best("B.Sc Nursing", "Kolkata", "bsc-nursing-kolkata", ["Medical College Kolkata Nursing", "RG Kar Nursing College", "NRS Nursing College", "IPGMER Nursing College", "AMRI Nursing College", "KPC Nursing College", "Calcutta National Medical College Nursing", "CNMC Nursing"], ["B.Sc Nursing", "Kolkata", "Nursing Colleges Kolkata"]),
  best("B.Sc Nursing", "Jaipur", "bsc-nursing-jaipur", ["SMS Medical College Nursing", "NIMS Nursing College Jaipur", "Rajasthan University of Health Sciences Nursing", "Mahatma Gandhi Nursing College", "Geetanjali Nursing College", "Pacific Nursing College", "JLN Nursing College", "National Institute Nursing Jaipur"], ["B.Sc Nursing", "Jaipur", "Nursing Colleges Jaipur"]),

  best("BCA", "Patna", "bca-patna", ["Patna University BCA", "Aryabhatta Knowledge University BCA", "AN College Patna", "Patna Science College", "Nalanda Open University BCA", "LNMU Darbhanga BCA", "BN Mandal University BCA", "Magadh University BCA"], ["BCA", "Patna", "BCA Colleges Patna"]),
  best("BCA", "Bhubaneswar", "bca-bhubaneswar", ["Utkal University BCA", "KIIT University BCA", "SOA University BCA", "Silicon Institute BCA", "CV Raman University BCA", "Centurion University BCA", "BPUT BCA", "Trident Academy BCA"], ["BCA", "Bhubaneswar", "BCA Colleges Bhubaneswar"]),
  best("BCA", "Guwahati", "bca-guwahati", ["Gauhati University BCA", "Assam Don Bosco University BCA", "Royal Global University BCA", "Tezpur University BCA", "GIMT BCA Guwahati", "Kaziranga University BCA", "Assam Engineering College BCA", "Cotton University BCA"], ["BCA", "Guwahati", "BCA Colleges Guwahati"]),
  best("BCA", "Indore", "bca-indore", ["DAVV Indore BCA", "Prestige Institute BCA", "Acropolis Institute BCA", "Medicaps University BCA", "Shri Vaishnav Vidyapeeth BCA", "Renaissance University BCA", "IPS Academy BCA", "SVIM Indore BCA"], ["BCA", "Indore", "BCA Colleges Indore"]),

  // More B.Des entries
  best("B.Des", "Chennai", "bdes-chennai", ["NIFT Chennai", "SRM School of Design", "VIT Design School", "Sathyabama Design School", "Hindustan School of Design", "Anna University Design", "Loyola College Design", "Saveetha Design School"], ["B.Des", "Chennai", "Design Colleges Chennai"]),
  best("B.Des", "Hyderabad", "bdes-hyderabad", ["NIFT Hyderabad", "JNAFAU Hyderabad", "Woxsen University Design", "GITAM Design School", "Mahindra University Design", "Osmania University Design", "ICFAI Design School", "Aurora Design Academy"], ["B.Des", "Hyderabad", "Design Colleges Hyderabad"]),

  // B.Ed additional
  best("B.Ed", "Hyderabad", "bed-hyderabad", ["Osmania University B.Ed", "MANUU B.Ed Hyderabad", "University of Hyderabad B.Ed", "IGNOU Hyderabad B.Ed", "St. Mary's B.Ed College", "Aurora's B.Ed College", "GITAM B.Ed", "Wesley B.Ed College"], ["B.Ed", "Hyderabad", "B.Ed Colleges Hyderabad"]),
  best("B.Ed", "Ahmedabad", "bed-ahmedabad", ["Gujarat University B.Ed", "Nirma University B.Ed", "IITE Ahmedabad", "GLS University B.Ed", "Ahmedabad University B.Ed", "Silver Oak University B.Ed", "LP University B.Ed Ahmedabad", "St. Xavier's College of Education Ahmedabad"], ["B.Ed", "Ahmedabad", "B.Ed Colleges Ahmedabad"]),

  // BA English additional
  best("BA English", "Hyderabad", "ba-english-hyderabad", ["University of Hyderabad", "Osmania University", "EFLU Hyderabad", "St. Mary's College", "Nizam College", "Aurora Degree College", "Loyola Academy", "Wesley Degree College"], ["BA English", "Hyderabad", "English Literature Hyderabad"]),

  // B.Sc IT additional
  best("B.Sc IT", "Chennai", "bsc-it-chennai", ["Loyola College IT", "Madras Christian College IT", "SRM IT Chennai", "VIT IT Chennai", "Presidency College IT", "Stella Maris IT", "Ethiraj College IT", "Pachaiyappa's College IT"], ["B.Sc IT", "Chennai", "IT Colleges Chennai"]),
  best("B.Sc IT", "Hyderabad", "bsc-it-hyderabad", ["Osmania University IT", "University of Hyderabad IT", "St. Mary's IT College", "Nizam College IT", "Aurora's IT College", "GITAM IT", "ICFAI IT", "Wesley IT College"], ["B.Sc IT", "Hyderabad", "IT Colleges Hyderabad"]),
];
