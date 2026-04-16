import mongoose from 'mongoose';

const MONGO_URI = 'mongodb+srv://ajaydevmarketlube:WSCbaKW38pIGv8S2@cluster0.cd2yjhg.mongodb.net/?appName=Cluster0';

// === STEP 1: Define canonical clean courses by stream ===
// These will be the master list. Existing duplicates will be merged.

const CANONICAL_COURSES: Record<string, { name: string; type: string; duration: string; eligibility: string[]; fees: string }[]> = {
  Engineering: [
    { name: 'B.Tech Computer Science and Engineering', type: 'Full Time', duration: '4 Years', eligibility: ['10+2 with PCM', 'JEE Main / Entrance Exam'], fees: '₹2,00,000 - ₹6,00,000 / year' },
    { name: 'B.Tech Information Technology', type: 'Full Time', duration: '4 Years', eligibility: ['10+2 with PCM', 'JEE Main / Entrance Exam'], fees: '₹1,80,000 - ₹5,00,000 / year' },
    { name: 'B.Tech Electronics and Communication Engineering', type: 'Full Time', duration: '4 Years', eligibility: ['10+2 with PCM', 'JEE Main / Entrance Exam'], fees: '₹1,80,000 - ₹4,50,000 / year' },
    { name: 'B.Tech Electrical Engineering', type: 'Full Time', duration: '4 Years', eligibility: ['10+2 with PCM', 'JEE Main / Entrance Exam'], fees: '₹1,50,000 - ₹4,00,000 / year' },
    { name: 'B.Tech Mechanical Engineering', type: 'Full Time', duration: '4 Years', eligibility: ['10+2 with PCM', 'JEE Main / Entrance Exam'], fees: '₹1,50,000 - ₹4,00,000 / year' },
    { name: 'B.Tech Civil Engineering', type: 'Full Time', duration: '4 Years', eligibility: ['10+2 with PCM', 'JEE Main / Entrance Exam'], fees: '₹1,40,000 - ₹3,80,000 / year' },
    { name: 'B.Tech Chemical Engineering', type: 'Full Time', duration: '4 Years', eligibility: ['10+2 with PCM', 'JEE Main / Entrance Exam'], fees: '₹1,60,000 - ₹4,00,000 / year' },
    { name: 'B.Tech Biotechnology', type: 'Full Time', duration: '4 Years', eligibility: ['10+2 with PCMB', 'JEE Main / Entrance Exam'], fees: '₹1,80,000 - ₹4,50,000 / year' },
    { name: 'B.Tech Aerospace Engineering', type: 'Full Time', duration: '4 Years', eligibility: ['10+2 with PCM', 'JEE Main / Entrance Exam'], fees: '₹2,00,000 - ₹5,00,000 / year' },
    { name: 'B.Tech Artificial Intelligence and Machine Learning', type: 'Full Time', duration: '4 Years', eligibility: ['10+2 with PCM', 'JEE Main / Entrance Exam'], fees: '₹2,20,000 - ₹6,00,000 / year' },
    { name: 'B.Tech Data Science', type: 'Full Time', duration: '4 Years', eligibility: ['10+2 with PCM', 'JEE Main / Entrance Exam'], fees: '₹2,20,000 - ₹6,00,000 / year' },
    { name: 'B.Tech Cyber Security', type: 'Full Time', duration: '4 Years', eligibility: ['10+2 with PCM', 'JEE Main / Entrance Exam'], fees: '₹2,00,000 - ₹5,50,000 / year' },
    { name: 'B.Tech Robotics and Automation', type: 'Full Time', duration: '4 Years', eligibility: ['10+2 with PCM', 'JEE Main / Entrance Exam'], fees: '₹2,00,000 - ₹5,50,000 / year' },
    { name: 'B.Tech Mechatronics', type: 'Full Time', duration: '4 Years', eligibility: ['10+2 with PCM', 'JEE Main / Entrance Exam'], fees: '₹1,80,000 - ₹4,50,000 / year' },
    { name: 'B.Tech Aeronautical Engineering', type: 'Full Time', duration: '4 Years', eligibility: ['10+2 with PCM', 'JEE Main / Entrance Exam'], fees: '₹2,00,000 - ₹5,00,000 / year' },
    { name: 'B.Tech Automobile Engineering', type: 'Full Time', duration: '4 Years', eligibility: ['10+2 with PCM', 'JEE Main / Entrance Exam'], fees: '₹1,60,000 - ₹4,00,000 / year' },
    { name: 'B.Tech Petroleum Engineering', type: 'Full Time', duration: '4 Years', eligibility: ['10+2 with PCM', 'JEE Main / Entrance Exam'], fees: '₹2,50,000 - ₹6,00,000 / year' },
    { name: 'B.Tech Mining Engineering', type: 'Full Time', duration: '4 Years', eligibility: ['10+2 with PCM', 'JEE Main / Entrance Exam'], fees: '₹1,50,000 - ₹3,80,000 / year' },
    { name: 'B.Tech Marine Engineering', type: 'Full Time', duration: '4 Years', eligibility: ['10+2 with PCM', 'JEE Main / Entrance Exam'], fees: '₹2,50,000 - ₹5,50,000 / year' },
    { name: 'B.Tech Food Technology', type: 'Full Time', duration: '4 Years', eligibility: ['10+2 with PCMB'], fees: '₹1,50,000 - ₹3,80,000 / year' },
    { name: 'M.Tech Computer Science', type: 'Full Time', duration: '2 Years', eligibility: ['B.E./B.Tech', 'GATE Score'], fees: '₹1,00,000 - ₹3,50,000 / year' },
    { name: 'M.Tech Electronics', type: 'Full Time', duration: '2 Years', eligibility: ['B.E./B.Tech', 'GATE Score'], fees: '₹1,00,000 - ₹3,50,000 / year' },
    { name: 'M.Tech Mechanical', type: 'Full Time', duration: '2 Years', eligibility: ['B.E./B.Tech', 'GATE Score'], fees: '₹1,00,000 - ₹3,50,000 / year' },
    { name: 'M.Tech Civil', type: 'Full Time', duration: '2 Years', eligibility: ['B.E./B.Tech', 'GATE Score'], fees: '₹1,00,000 - ₹3,50,000 / year' },
    { name: 'M.Tech Structural Engineering', type: 'Full Time', duration: '2 Years', eligibility: ['B.E./B.Tech Civil', 'GATE Score'], fees: '₹1,00,000 - ₹3,50,000 / year' },
    { name: 'M.Tech VLSI Design', type: 'Full Time', duration: '2 Years', eligibility: ['B.E./B.Tech', 'GATE Score'], fees: '₹1,20,000 - ₹3,80,000 / year' },
    { name: 'B.Arch (Bachelor of Architecture)', type: 'Full Time', duration: '5 Years', eligibility: ['10+2 with Mathematics', 'NATA / JEE Main Paper 2'], fees: '₹1,50,000 - ₹6,00,000 / year' },
    { name: 'M.Arch (Master of Architecture)', type: 'Full Time', duration: '2 Years', eligibility: ['B.Arch'], fees: '₹1,20,000 - ₹4,50,000 / year' },
    { name: 'M.Plan (Master of Planning)', type: 'Full Time', duration: '2 Years', eligibility: ['B.Arch / B.Plan'], fees: '₹1,00,000 - ₹3,50,000 / year' },
  ],

  Management: [
    { name: 'MBA (Master of Business Administration)', type: 'Full Time', duration: '2 Years', eligibility: ['Bachelor degree', 'CAT/MAT/XAT/CMAT'], fees: '₹3,00,000 - ₹28,00,000 / year' },
    { name: 'MBA Finance', type: 'Full Time', duration: '2 Years', eligibility: ['Bachelor degree', 'CAT/MAT/XAT/CMAT'], fees: '₹3,00,000 - ₹25,00,000 / year' },
    { name: 'MBA Marketing', type: 'Full Time', duration: '2 Years', eligibility: ['Bachelor degree', 'CAT/MAT/XAT/CMAT'], fees: '₹3,00,000 - ₹25,00,000 / year' },
    { name: 'MBA Human Resources', type: 'Full Time', duration: '2 Years', eligibility: ['Bachelor degree', 'CAT/MAT/XAT/CMAT'], fees: '₹3,00,000 - ₹25,00,000 / year' },
    { name: 'MBA Operations Management', type: 'Full Time', duration: '2 Years', eligibility: ['Bachelor degree', 'CAT/MAT/XAT/CMAT'], fees: '₹3,00,000 - ₹25,00,000 / year' },
    { name: 'MBA International Business', type: 'Full Time', duration: '2 Years', eligibility: ['Bachelor degree', 'CAT/MAT/XAT/CMAT'], fees: '₹3,00,000 - ₹25,00,000 / year' },
    { name: 'MBA Business Analytics', type: 'Full Time', duration: '2 Years', eligibility: ['Bachelor degree', 'CAT/MAT/XAT/CMAT'], fees: '₹3,50,000 - ₹28,00,000 / year' },
    { name: 'PGDM (Post Graduate Diploma in Management)', type: 'Full Time', duration: '2 Years', eligibility: ['Bachelor degree', 'CAT/MAT/XAT/CMAT'], fees: '₹3,50,000 - ₹25,00,000 / year' },
    { name: 'Executive MBA', type: 'Full Time', duration: '1-2 Years', eligibility: ['Bachelor degree + Work Experience'], fees: '₹5,00,000 - ₹35,00,000 / year' },
    { name: 'BBA (Bachelor of Business Administration)', type: 'Full Time', duration: '3 Years', eligibility: ['10+2 in any stream'], fees: '₹1,00,000 - ₹6,00,000 / year' },
    { name: 'BMS (Bachelor of Management Studies)', type: 'Full Time', duration: '3 Years', eligibility: ['10+2 in any stream'], fees: '₹80,000 - ₹5,00,000 / year' },
    { name: 'BBA Logistics and Supply Chain Management', type: 'Full Time', duration: '3 Years', eligibility: ['10+2 in any stream'], fees: '₹1,00,000 - ₹4,50,000 / year' },
    { name: 'BHM (Bachelor of Hotel Management)', type: 'Full Time', duration: '3-4 Years', eligibility: ['10+2 in any stream'], fees: '₹80,000 - ₹4,00,000 / year' },
  ],

  Medical: [
    { name: 'MBBS (Bachelor of Medicine, Bachelor of Surgery)', type: 'Full Time', duration: '5.5 Years', eligibility: ['10+2 with PCB', 'NEET-UG'], fees: '₹50,000 - ₹25,00,000 / year' },
    { name: 'BDS (Bachelor of Dental Surgery)', type: 'Full Time', duration: '5 Years', eligibility: ['10+2 with PCB', 'NEET-UG'], fees: '₹2,00,000 - ₹15,00,000 / year' },
    { name: 'BAMS (Bachelor of Ayurvedic Medicine and Surgery)', type: 'Full Time', duration: '5.5 Years', eligibility: ['10+2 with PCB', 'NEET-UG'], fees: '₹1,00,000 - ₹6,00,000 / year' },
    { name: 'BHMS (Bachelor of Homoeopathic Medicine and Surgery)', type: 'Full Time', duration: '5.5 Years', eligibility: ['10+2 with PCB', 'NEET-UG'], fees: '₹80,000 - ₹4,00,000 / year' },
    { name: 'BUMS (Bachelor of Unani Medicine and Surgery)', type: 'Full Time', duration: '5.5 Years', eligibility: ['10+2 with PCB', 'NEET-UG'], fees: '₹80,000 - ₹3,50,000 / year' },
    { name: 'BPT (Bachelor of Physiotherapy)', type: 'Full Time', duration: '4.5 Years', eligibility: ['10+2 with PCB'], fees: '₹80,000 - ₹3,00,000 / year' },
    { name: 'B.Sc Nursing', type: 'Full Time', duration: '4 Years', eligibility: ['10+2 with PCB'], fees: '₹50,000 - ₹3,50,000 / year' },
    { name: 'GNM (General Nursing and Midwifery)', type: 'Full Time', duration: '3.5 Years', eligibility: ['10+2'], fees: '₹40,000 - ₹2,00,000 / year' },
    { name: 'ANM (Auxiliary Nurse Midwifery)', type: 'Full Time', duration: '2 Years', eligibility: ['10+2'], fees: '₹30,000 - ₹1,50,000 / year' },
    { name: 'M.Sc Nursing', type: 'Full Time', duration: '2 Years', eligibility: ['B.Sc Nursing'], fees: '₹60,000 - ₹3,00,000 / year' },
    { name: 'MD (Doctor of Medicine)', type: 'Full Time', duration: '3 Years', eligibility: ['MBBS', 'NEET-PG'], fees: '₹2,00,000 - ₹50,00,000 / year' },
    { name: 'MS (Master of Surgery)', type: 'Full Time', duration: '3 Years', eligibility: ['MBBS', 'NEET-PG'], fees: '₹2,00,000 - ₹50,00,000 / year' },
    { name: 'MDS (Master of Dental Surgery)', type: 'Full Time', duration: '3 Years', eligibility: ['BDS'], fees: '₹3,00,000 - ₹15,00,000 / year' },
    { name: 'B.Sc Medical Lab Technology', type: 'Full Time', duration: '3-4 Years', eligibility: ['10+2 with PCB'], fees: '₹50,000 - ₹2,50,000 / year' },
    { name: 'B.Sc Radiology and Imaging Technology', type: 'Full Time', duration: '3-4 Years', eligibility: ['10+2 with PCB'], fees: '₹60,000 - ₹3,00,000 / year' },
    { name: 'B.Sc Operation Theatre Technology', type: 'Full Time', duration: '3-4 Years', eligibility: ['10+2 with PCB'], fees: '₹50,000 - ₹2,50,000 / year' },
    { name: 'B.Sc Optometry', type: 'Full Time', duration: '4 Years', eligibility: ['10+2 with PCB'], fees: '₹60,000 - ₹3,00,000 / year' },
    { name: 'B.Sc Cardiac Care Technology', type: 'Full Time', duration: '3-4 Years', eligibility: ['10+2 with PCB'], fees: '₹70,000 - ₹3,50,000 / year' },
    { name: 'B.Sc Respiratory Therapy', type: 'Full Time', duration: '3-4 Years', eligibility: ['10+2 with PCB'], fees: '₹60,000 - ₹3,00,000 / year' },
    { name: 'BNYS (Naturopathy and Yogic Sciences)', type: 'Full Time', duration: '5.5 Years', eligibility: ['10+2 with PCB'], fees: '₹80,000 - ₹3,50,000 / year' },
    { name: 'MPT (Master of Physiotherapy)', type: 'Full Time', duration: '2 Years', eligibility: ['BPT'], fees: '₹80,000 - ₹3,50,000 / year' },
  ],

  Pharmacy: [
    { name: 'B.Pharm (Bachelor of Pharmacy)', type: 'Full Time', duration: '4 Years', eligibility: ['10+2 with PCM/PCB'], fees: '₹80,000 - ₹3,50,000 / year' },
    { name: 'D.Pharm (Diploma in Pharmacy)', type: 'Full Time', duration: '2 Years', eligibility: ['10+2 with PCM/PCB'], fees: '₹50,000 - ₹2,00,000 / year' },
    { name: 'M.Pharm (Master of Pharmacy)', type: 'Full Time', duration: '2 Years', eligibility: ['B.Pharm'], fees: '₹1,00,000 - ₹3,50,000 / year' },
    { name: 'Pharm.D (Doctor of Pharmacy)', type: 'Full Time', duration: '6 Years', eligibility: ['10+2 with PCB'], fees: '₹1,20,000 - ₹4,50,000 / year' },
  ],

  Law: [
    { name: 'BA LLB (Hons) - 5 Year Integrated', type: 'Full Time', duration: '5 Years', eligibility: ['10+2', 'CLAT/AILET'], fees: '₹1,50,000 - ₹6,00,000 / year' },
    { name: 'BBA LLB (Hons) - 5 Year Integrated', type: 'Full Time', duration: '5 Years', eligibility: ['10+2', 'CLAT/AILET'], fees: '₹2,00,000 - ₹6,50,000 / year' },
    { name: 'B.Com LLB (Hons) - 5 Year Integrated', type: 'Full Time', duration: '5 Years', eligibility: ['10+2', 'CLAT/AILET'], fees: '₹1,50,000 - ₹5,50,000 / year' },
    { name: 'LLB (Bachelor of Laws)', type: 'Full Time', duration: '3 Years', eligibility: ['Bachelor degree'], fees: '₹50,000 - ₹3,00,000 / year' },
    { name: 'LLM (Master of Laws)', type: 'Full Time', duration: '1-2 Years', eligibility: ['LLB'], fees: '₹80,000 - ₹4,00,000 / year' },
  ],

  Commerce: [
    { name: 'B.Com (Bachelor of Commerce)', type: 'Full Time', duration: '3 Years', eligibility: ['10+2 with Commerce/any stream'], fees: '₹20,000 - ₹3,00,000 / year' },
    { name: 'B.Com (Honours)', type: 'Full Time', duration: '3 Years', eligibility: ['10+2 with Commerce/any stream'], fees: '₹25,000 - ₹3,50,000 / year' },
    { name: 'M.Com (Master of Commerce)', type: 'Full Time', duration: '2 Years', eligibility: ['B.Com'], fees: '₹20,000 - ₹2,50,000 / year' },
    { name: 'B.Com with ACCA', type: 'Full Time', duration: '3 Years', eligibility: ['10+2 with Commerce'], fees: '₹2,00,000 - ₹4,50,000 / year' },
    { name: 'BBA Finance', type: 'Full Time', duration: '3 Years', eligibility: ['10+2 in any stream'], fees: '₹1,20,000 - ₹5,00,000 / year' },
    { name: 'CA (Chartered Accountancy)', type: 'Full Time', duration: '4-5 Years', eligibility: ['10+2 with Commerce'], fees: '₹50,000 - ₹2,00,000 / year' },
  ],

  Science: [
    { name: 'B.Sc Physics', type: 'Full Time', duration: '3 Years', eligibility: ['10+2 with PCM'], fees: '₹20,000 - ₹2,00,000 / year' },
    { name: 'B.Sc Chemistry', type: 'Full Time', duration: '3 Years', eligibility: ['10+2 with PCM/PCB'], fees: '₹20,000 - ₹2,00,000 / year' },
    { name: 'B.Sc Mathematics', type: 'Full Time', duration: '3 Years', eligibility: ['10+2 with Mathematics'], fees: '₹20,000 - ₹2,00,000 / year' },
    { name: 'B.Sc Biology', type: 'Full Time', duration: '3 Years', eligibility: ['10+2 with PCB'], fees: '₹25,000 - ₹2,20,000 / year' },
    { name: 'B.Sc Computer Science', type: 'Full Time', duration: '3 Years', eligibility: ['10+2 with Mathematics'], fees: '₹40,000 - ₹2,50,000 / year' },
    { name: 'BCA (Bachelor of Computer Applications)', type: 'Full Time', duration: '3 Years', eligibility: ['10+2 with Mathematics'], fees: '₹50,000 - ₹2,50,000 / year' },
    { name: 'M.Sc Physics', type: 'Full Time', duration: '2 Years', eligibility: ['B.Sc Physics'], fees: '₹25,000 - ₹2,80,000 / year' },
    { name: 'M.Sc Chemistry', type: 'Full Time', duration: '2 Years', eligibility: ['B.Sc Chemistry'], fees: '₹25,000 - ₹2,80,000 / year' },
    { name: 'M.Sc Mathematics', type: 'Full Time', duration: '2 Years', eligibility: ['B.Sc Mathematics'], fees: '₹25,000 - ₹2,80,000 / year' },
    { name: 'M.Sc Biotechnology', type: 'Full Time', duration: '2 Years', eligibility: ['B.Sc with Biology'], fees: '₹40,000 - ₹3,50,000 / year' },
    { name: 'M.Sc Computer Science', type: 'Full Time', duration: '2 Years', eligibility: ['B.Sc / BCA'], fees: '₹50,000 - ₹3,00,000 / year' },
    { name: 'MCA (Master of Computer Applications)', type: 'Full Time', duration: '2 Years', eligibility: ['Bachelor degree with Mathematics'], fees: '₹60,000 - ₹3,00,000 / year' },
    { name: 'M.Sc Data Science', type: 'Full Time', duration: '2 Years', eligibility: ['Bachelor degree'], fees: '₹80,000 - ₹4,00,000 / year' },
    { name: 'PhD (Doctor of Philosophy)', type: 'Full Time', duration: '3-5 Years', eligibility: ['Master degree'], fees: '₹20,000 - ₹2,00,000 / year' },
  ],

  Arts: [
    { name: 'BA (Bachelor of Arts)', type: 'Full Time', duration: '3 Years', eligibility: ['10+2 in any stream'], fees: '₹15,000 - ₹2,50,000 / year' },
    { name: 'BA Economics', type: 'Full Time', duration: '3 Years', eligibility: ['10+2 in any stream'], fees: '₹25,000 - ₹3,00,000 / year' },
    { name: 'BA English', type: 'Full Time', duration: '3 Years', eligibility: ['10+2 in any stream'], fees: '₹15,000 - ₹2,50,000 / year' },
    { name: 'BA Psychology', type: 'Full Time', duration: '3 Years', eligibility: ['10+2 in any stream'], fees: '₹25,000 - ₹3,00,000 / year' },
    { name: 'BA Political Science', type: 'Full Time', duration: '3 Years', eligibility: ['10+2 in any stream'], fees: '₹15,000 - ₹2,50,000 / year' },
    { name: 'BA Sociology', type: 'Full Time', duration: '3 Years', eligibility: ['10+2 in any stream'], fees: '₹15,000 - ₹2,50,000 / year' },
    { name: 'BA History', type: 'Full Time', duration: '3 Years', eligibility: ['10+2 in any stream'], fees: '₹15,000 - ₹2,50,000 / year' },
    { name: 'BA Journalism and Mass Communication', type: 'Full Time', duration: '3 Years', eligibility: ['10+2 in any stream'], fees: '₹50,000 - ₹3,50,000 / year' },
    { name: 'MA (Master of Arts)', type: 'Full Time', duration: '2 Years', eligibility: ['Bachelor degree'], fees: '₹15,000 - ₹2,00,000 / year' },
    { name: 'MA Economics', type: 'Full Time', duration: '2 Years', eligibility: ['BA Economics or related'], fees: '₹20,000 - ₹2,50,000 / year' },
    { name: 'MA English', type: 'Full Time', duration: '2 Years', eligibility: ['BA English or related'], fees: '₹15,000 - ₹2,00,000 / year' },
    { name: 'MA Psychology', type: 'Full Time', duration: '2 Years', eligibility: ['BA Psychology or related'], fees: '₹20,000 - ₹2,50,000 / year' },
    { name: 'BSW (Bachelor of Social Work)', type: 'Full Time', duration: '3 Years', eligibility: ['10+2 in any stream'], fees: '₹30,000 - ₹2,00,000 / year' },
    { name: 'MSW (Master of Social Work)', type: 'Full Time', duration: '2 Years', eligibility: ['Bachelor degree'], fees: '₹40,000 - ₹2,50,000 / year' },
  ],

  Design: [
    { name: 'B.Des (Bachelor of Design)', type: 'Full Time', duration: '4 Years', eligibility: ['10+2', 'NIFT/NID/UCEED'], fees: '₹3,50,000 - ₹14,00,000 / year' },
    { name: 'BFA (Bachelor of Fine Arts)', type: 'Full Time', duration: '4 Years', eligibility: ['10+2'], fees: '₹50,000 - ₹4,00,000 / year' },
    { name: 'M.Des (Master of Design)', type: 'Full Time', duration: '2 Years', eligibility: ['Bachelor in Design/Arch'], fees: '₹3,00,000 - ₹12,00,000 / year' },
    { name: 'MFA (Master of Fine Arts)', type: 'Full Time', duration: '2 Years', eligibility: ['BFA or related'], fees: '₹50,000 - ₹3,50,000 / year' },
  ],

  Education: [
    { name: 'B.Ed (Bachelor of Education)', type: 'Full Time', duration: '2 Years', eligibility: ['Bachelor degree'], fees: '₹40,000 - ₹2,00,000 / year' },
    { name: 'M.Ed (Master of Education)', type: 'Full Time', duration: '2 Years', eligibility: ['B.Ed'], fees: '₹30,000 - ₹1,80,000 / year' },
    { name: 'B.P.Ed (Bachelor of Physical Education)', type: 'Full Time', duration: '2 Years', eligibility: ['Bachelor degree'], fees: '₹40,000 - ₹1,50,000 / year' },
    { name: 'D.El.Ed (Diploma in Elementary Education)', type: 'Full Time', duration: '2 Years', eligibility: ['10+2'], fees: '₹25,000 - ₹1,00,000 / year' },
    { name: 'BTC (Basic Training Certificate)', type: 'Full Time', duration: '2 Years', eligibility: ['10+2'], fees: '₹20,000 - ₹80,000 / year' },
  ],

  Agriculture: [
    { name: 'B.Sc Agriculture', type: 'Full Time', duration: '4 Years', eligibility: ['10+2 with PCB/PCM'], fees: '₹40,000 - ₹2,50,000 / year' },
    { name: 'B.Sc Horticulture', type: 'Full Time', duration: '4 Years', eligibility: ['10+2 with PCB/PCM'], fees: '₹40,000 - ₹2,50,000 / year' },
    { name: 'B.Sc Forestry', type: 'Full Time', duration: '4 Years', eligibility: ['10+2 with PCB/PCM'], fees: '₹40,000 - ₹2,00,000 / year' },
    { name: 'B.V.Sc (Bachelor of Veterinary Science)', type: 'Full Time', duration: '5 Years', eligibility: ['10+2 with PCB'], fees: '₹40,000 - ₹3,00,000 / year' },
    { name: 'M.Sc Agriculture', type: 'Full Time', duration: '2 Years', eligibility: ['B.Sc Agriculture'], fees: '₹40,000 - ₹2,50,000 / year' },
  ],
};

// === STEP 2: Determine which courses each college offers based on its name ===

interface CourseSelector {
  name: string;
  matches: (collegeName: string) => boolean;
  courses: { stream: string; courseName: string }[];
}

function getCoursesForCollege(name: string, country?: string): { stream: string; courseName: string }[] {
  const lower = name.toLowerCase();
  const courses: { stream: string; courseName: string }[] = [];

  // International colleges - usually full universities offering everything
  if (country && country !== 'India') {
    // Top universities offer engineering, business, science, arts
    if (lower.includes('institute of technology') || lower.includes('mit') || lower.includes('caltech') ||
        lower.includes('tum ') || lower.includes('imperial') || lower.includes('georgia tech') ||
        lower.includes('institute of science')) {
      // Engineering-focused
      ['B.Tech Computer Science and Engineering', 'B.Tech Electrical Engineering', 'B.Tech Mechanical Engineering',
       'B.Tech Civil Engineering', 'B.Tech Aerospace Engineering', 'B.Tech Chemical Engineering',
       'B.Tech Information Technology', 'B.Tech Artificial Intelligence and Machine Learning',
       'M.Tech Computer Science', 'M.Tech Electronics', 'PhD (Doctor of Philosophy)'].forEach(n => courses.push({ stream: 'Engineering', courseName: n }));
      ['B.Sc Physics', 'B.Sc Chemistry', 'B.Sc Mathematics', 'B.Sc Computer Science',
       'M.Sc Physics', 'M.Sc Mathematics'].forEach(n => courses.push({ stream: 'Science', courseName: n }));
      ['MBA (Master of Business Administration)', 'MBA Finance'].forEach(n => courses.push({ stream: 'Management', courseName: n }));
    } else if (lower.includes('business school') || lower.includes('insead') || lower.includes('hec ') ||
               lower.includes('school of business') || lower.includes('school of management')) {
      ['MBA (Master of Business Administration)', 'MBA Finance', 'MBA Marketing', 'MBA International Business',
       'MBA Business Analytics', 'Executive MBA', 'BBA (Bachelor of Business Administration)',
       'PhD (Doctor of Philosophy)'].forEach(n => courses.push({ stream: 'Management', courseName: n }));
    } else if (lower.includes('school of medicine') || lower.includes('medical school')) {
      ['MBBS (Bachelor of Medicine, Bachelor of Surgery)', 'MD (Doctor of Medicine)',
       'MS (Master of Surgery)'].forEach(n => courses.push({ stream: 'Medical', courseName: n }));
    } else if (lower.includes('law school') || lower.includes('school of law')) {
      ['LLB (Bachelor of Laws)', 'LLM (Master of Laws)', 'BA LLB (Hons) - 5 Year Integrated'].forEach(n => courses.push({ stream: 'Law', courseName: n }));
    } else {
      // General University - offers wide range
      ['B.Tech Computer Science and Engineering', 'B.Tech Electrical Engineering', 'B.Tech Mechanical Engineering',
       'B.Tech Civil Engineering', 'M.Tech Computer Science'].forEach(n => courses.push({ stream: 'Engineering', courseName: n }));
      ['MBA (Master of Business Administration)', 'BBA (Bachelor of Business Administration)'].forEach(n => courses.push({ stream: 'Management', courseName: n }));
      ['B.Sc Physics', 'B.Sc Chemistry', 'B.Sc Mathematics', 'B.Sc Computer Science', 'B.Sc Biology',
       'M.Sc Physics', 'M.Sc Chemistry', 'PhD (Doctor of Philosophy)'].forEach(n => courses.push({ stream: 'Science', courseName: n }));
      ['BA (Bachelor of Arts)', 'BA Economics', 'BA English', 'BA Psychology', 'BA Political Science',
       'BA History', 'MA (Master of Arts)', 'MA Economics', 'MA English'].forEach(n => courses.push({ stream: 'Arts', courseName: n }));
      ['B.Com (Bachelor of Commerce)', 'M.Com (Master of Commerce)'].forEach(n => courses.push({ stream: 'Commerce', courseName: n }));
      ['LLB (Bachelor of Laws)', 'LLM (Master of Laws)'].forEach(n => courses.push({ stream: 'Law', courseName: n }));
    }
    return courses;
  }

  // INDIAN COLLEGES — categorize by college type

  // IITs - top engineering institutes
  if (lower.includes('iit ') || lower.startsWith('iit') || lower.includes('indian institute of technology')) {
    ['B.Tech Computer Science and Engineering', 'B.Tech Electrical Engineering', 'B.Tech Mechanical Engineering',
     'B.Tech Civil Engineering', 'B.Tech Chemical Engineering', 'B.Tech Aerospace Engineering',
     'B.Tech Electronics and Communication Engineering', 'B.Tech Biotechnology', 'B.Tech Information Technology',
     'B.Tech Artificial Intelligence and Machine Learning', 'B.Tech Data Science',
     'M.Tech Computer Science', 'M.Tech Electronics', 'M.Tech Mechanical', 'M.Tech Civil',
     'M.Tech Structural Engineering', 'M.Tech VLSI Design', 'PhD (Doctor of Philosophy)'].forEach(n => courses.push({ stream: 'Engineering', courseName: n }));
    ['MBA (Master of Business Administration)'].forEach(n => courses.push({ stream: 'Management', courseName: n }));
    ['B.Sc Physics', 'B.Sc Chemistry', 'B.Sc Mathematics', 'M.Sc Physics', 'M.Sc Chemistry', 'M.Sc Mathematics'].forEach(n => courses.push({ stream: 'Science', courseName: n }));
    return courses;
  }

  // NITs / IIITs
  if (lower.includes('nit ') || lower.startsWith('nit') || lower.includes('national institute of technology') ||
      lower.includes('iiit') || lower.includes('indian institute of information technology')) {
    ['B.Tech Computer Science and Engineering', 'B.Tech Electrical Engineering', 'B.Tech Mechanical Engineering',
     'B.Tech Civil Engineering', 'B.Tech Chemical Engineering', 'B.Tech Information Technology',
     'B.Tech Electronics and Communication Engineering', 'B.Tech Biotechnology',
     'M.Tech Computer Science', 'M.Tech Electronics', 'M.Tech Mechanical', 'M.Tech Civil',
     'PhD (Doctor of Philosophy)'].forEach(n => courses.push({ stream: 'Engineering', courseName: n }));
    if (lower.includes('iiit')) {
      ['B.Tech Artificial Intelligence and Machine Learning', 'B.Tech Data Science',
       'M.Tech VLSI Design'].forEach(n => courses.push({ stream: 'Engineering', courseName: n }));
    }
    return courses;
  }

  // IIMs - management
  if (lower.includes('iim ') || lower.startsWith('iim') || lower.includes('indian institute of management')) {
    ['MBA (Master of Business Administration)', 'MBA Finance', 'MBA Marketing', 'MBA Human Resources',
     'MBA Operations Management', 'MBA International Business', 'MBA Business Analytics',
     'PGDM (Post Graduate Diploma in Management)', 'Executive MBA', 'PhD (Doctor of Philosophy)'].forEach(n => courses.push({ stream: 'Management', courseName: n }));
    return courses;
  }

  // AIIMS / Medical colleges
  if (lower.includes('aiims') || lower.includes('all india institute of medical')) {
    ['MBBS (Bachelor of Medicine, Bachelor of Surgery)', 'B.Sc Nursing', 'BPT (Bachelor of Physiotherapy)',
     'M.Sc Nursing', 'MD (Doctor of Medicine)', 'MS (Master of Surgery)',
     'B.Sc Medical Lab Technology', 'B.Sc Radiology and Imaging Technology',
     'B.Sc Operation Theatre Technology', 'PhD (Doctor of Philosophy)'].forEach(n => courses.push({ stream: 'Medical', courseName: n }));
    return courses;
  }

  // NLUs / Law colleges
  if (lower.includes('nlu') || lower.includes('national law') || lower.includes(' law ') ||
      lower.includes('school of law') || lower.includes('law college') || lower.includes('jurisprudence')) {
    ['BA LLB (Hons) - 5 Year Integrated', 'BBA LLB (Hons) - 5 Year Integrated',
     'B.Com LLB (Hons) - 5 Year Integrated', 'LLB (Bachelor of Laws)', 'LLM (Master of Laws)'].forEach(n => courses.push({ stream: 'Law', courseName: n }));
    return courses;
  }

  // NIFT / NID - Design
  if (lower.includes('nift') || lower.includes('national institute of fashion') ||
      lower.includes('nid') || lower.includes('national institute of design') ||
      lower.includes('school of design') || lower.includes('design institute') ||
      lower.includes('institute of design')) {
    ['B.Des (Bachelor of Design)', 'M.Des (Master of Design)', 'BFA (Bachelor of Fine Arts)',
     'MFA (Master of Fine Arts)'].forEach(n => courses.push({ stream: 'Design', courseName: n }));
    return courses;
  }

  // Pharmacy colleges
  if (lower.includes('pharmacy') || lower.includes('college of pharmaceutical')) {
    ['B.Pharm (Bachelor of Pharmacy)', 'D.Pharm (Diploma in Pharmacy)',
     'M.Pharm (Master of Pharmacy)', 'Pharm.D (Doctor of Pharmacy)'].forEach(n => courses.push({ stream: 'Pharmacy', courseName: n }));
    return courses;
  }

  // Nursing colleges
  if (lower.includes('nursing')) {
    ['B.Sc Nursing', 'GNM (General Nursing and Midwifery)', 'ANM (Auxiliary Nurse Midwifery)',
     'M.Sc Nursing'].forEach(n => courses.push({ stream: 'Medical', courseName: n }));
    return courses;
  }

  // Dental colleges
  if (lower.includes('dental')) {
    ['BDS (Bachelor of Dental Surgery)', 'MDS (Master of Dental Surgery)'].forEach(n => courses.push({ stream: 'Medical', courseName: n }));
    return courses;
  }

  // Ayurveda/Homoeopathy colleges
  if (lower.includes('ayurveda') || lower.includes('ayurvedic')) {
    ['BAMS (Bachelor of Ayurvedic Medicine and Surgery)'].forEach(n => courses.push({ stream: 'Medical', courseName: n }));
    return courses;
  }
  if (lower.includes('homoeopath') || lower.includes('homeopath')) {
    ['BHMS (Bachelor of Homoeopathic Medicine and Surgery)'].forEach(n => courses.push({ stream: 'Medical', courseName: n }));
    return courses;
  }

  // Medical colleges (general)
  if (lower.includes('medical college') || lower.includes('medical sciences') || lower.includes('healthcare')) {
    ['MBBS (Bachelor of Medicine, Bachelor of Surgery)', 'B.Sc Nursing', 'BPT (Bachelor of Physiotherapy)',
     'BDS (Bachelor of Dental Surgery)', 'B.Pharm (Bachelor of Pharmacy)',
     'B.Sc Medical Lab Technology'].forEach(n => courses.push({ stream: 'Medical', courseName: n }));
    return courses;
  }

  // Polytechnic colleges
  if (lower.includes('polytechnic')) {
    ['B.Tech Mechanical Engineering', 'B.Tech Electrical Engineering', 'B.Tech Civil Engineering',
     'B.Tech Computer Science and Engineering'].forEach(n => courses.push({ stream: 'Engineering', courseName: n }));
    return courses;
  }

  // Hotel Management colleges
  if (lower.includes('hotel management') || lower.includes('hotel administration') ||
      lower.includes('hospitality') || lower.includes('catering')) {
    ['BHM (Bachelor of Hotel Management)', 'MBA (Master of Business Administration)'].forEach(n => courses.push({ stream: 'Management', courseName: n }));
    return courses;
  }

  // Engineering colleges
  if (lower.includes('engineering') || lower.includes('institute of technology') || lower.includes('technical') ||
      lower.includes(' tech ') || lower.endsWith(' tech')) {
    ['B.Tech Computer Science and Engineering', 'B.Tech Information Technology',
     'B.Tech Electronics and Communication Engineering', 'B.Tech Electrical Engineering',
     'B.Tech Mechanical Engineering', 'B.Tech Civil Engineering',
     'M.Tech Computer Science', 'M.Tech Electronics'].forEach(n => courses.push({ stream: 'Engineering', courseName: n }));
    ['MBA (Master of Business Administration)', 'BBA (Bachelor of Business Administration)'].forEach(n => courses.push({ stream: 'Management', courseName: n }));
    return courses;
  }

  // Management colleges (other than IIM)
  if (lower.includes('management') || lower.includes('business school')) {
    ['MBA (Master of Business Administration)', 'MBA Finance', 'MBA Marketing',
     'MBA Human Resources', 'PGDM (Post Graduate Diploma in Management)',
     'BBA (Bachelor of Business Administration)', 'Executive MBA'].forEach(n => courses.push({ stream: 'Management', courseName: n }));
    return courses;
  }

  // Agricultural universities
  if (lower.includes('agricultural') || lower.includes('agriculture')) {
    ['B.Sc Agriculture', 'B.Sc Horticulture', 'B.Sc Forestry', 'B.V.Sc (Bachelor of Veterinary Science)',
     'M.Sc Agriculture'].forEach(n => courses.push({ stream: 'Agriculture', courseName: n }));
    return courses;
  }

  // Education / Teacher training colleges
  if (lower.includes('education') || lower.includes('b.ed') || lower.includes('teacher training')) {
    ['B.Ed (Bachelor of Education)', 'M.Ed (Master of Education)',
     'D.El.Ed (Diploma in Elementary Education)', 'B.P.Ed (Bachelor of Physical Education)'].forEach(n => courses.push({ stream: 'Education', courseName: n }));
    return courses;
  }

  // Universities (general - offer wide range)
  if (lower.includes('university') || lower.includes('vishwavidyalaya') || lower.includes('vidyapith')) {
    ['B.Tech Computer Science and Engineering', 'B.Tech Information Technology',
     'B.Tech Electrical Engineering', 'B.Tech Mechanical Engineering', 'B.Tech Civil Engineering',
     'M.Tech Computer Science'].forEach(n => courses.push({ stream: 'Engineering', courseName: n }));
    ['MBA (Master of Business Administration)', 'BBA (Bachelor of Business Administration)',
     'PGDM (Post Graduate Diploma in Management)'].forEach(n => courses.push({ stream: 'Management', courseName: n }));
    ['B.Sc Physics', 'B.Sc Chemistry', 'B.Sc Mathematics', 'B.Sc Computer Science', 'B.Sc Biology',
     'BCA (Bachelor of Computer Applications)', 'M.Sc Physics', 'M.Sc Chemistry',
     'MCA (Master of Computer Applications)', 'PhD (Doctor of Philosophy)'].forEach(n => courses.push({ stream: 'Science', courseName: n }));
    ['BA (Bachelor of Arts)', 'BA Economics', 'BA English', 'BA Psychology', 'BA Political Science',
     'MA (Master of Arts)', 'MA Economics'].forEach(n => courses.push({ stream: 'Arts', courseName: n }));
    ['B.Com (Bachelor of Commerce)', 'M.Com (Master of Commerce)'].forEach(n => courses.push({ stream: 'Commerce', courseName: n }));
    ['LLB (Bachelor of Laws)', 'LLM (Master of Laws)', 'BA LLB (Hons) - 5 Year Integrated'].forEach(n => courses.push({ stream: 'Law', courseName: n }));
    return courses;
  }

  // Arts/Science/Commerce colleges (default for "College" institutions)
  if (lower.includes('arts') || lower.includes('science') || lower.includes('commerce') ||
      lower.includes('college')) {
    ['BA (Bachelor of Arts)', 'BA Economics', 'BA English', 'BA Psychology', 'BA Political Science',
     'BA History', 'MA (Master of Arts)'].forEach(n => courses.push({ stream: 'Arts', courseName: n }));
    ['B.Sc Physics', 'B.Sc Chemistry', 'B.Sc Mathematics', 'B.Sc Computer Science',
     'BCA (Bachelor of Computer Applications)'].forEach(n => courses.push({ stream: 'Science', courseName: n }));
    ['B.Com (Bachelor of Commerce)', 'M.Com (Master of Commerce)',
     'BBA (Bachelor of Business Administration)'].forEach(n => courses.push({ stream: 'Management', courseName: n }));
    return courses;
  }

  // Default - basic UG courses
  ['BA (Bachelor of Arts)', 'B.Com (Bachelor of Commerce)',
   'BBA (Bachelor of Business Administration)'].forEach(n => courses.push({ stream: 'Arts', courseName: n }));
  return courses;
}

async function main() {
  await mongoose.connect(MONGO_URI);
  const db = mongoose.connection.db!;

  // === STEP 1: Ensure all canonical courses exist in DB ===
  console.log('=== STEP 1: Setting up canonical courses ===');

  // Get streams (create Arts if missing)
  const existingStreams = await db.collection('streams').find({}).toArray();
  const streamNames = new Set(existingStreams.map(s => s.name));
  if (!streamNames.has('Arts')) {
    await db.collection('streams').insertOne({
      name: 'Arts',
      description: 'Arts and Humanities programs',
      createdAt: new Date(),
      updatedAt: new Date(),
    });
    console.log('  Created Arts stream');
  }
  const streams = await db.collection('streams').find({}).toArray();
  const streamMap = new Map(streams.map(s => [s.name, s._id]));

  // Build unified course list: name -> { _id, stream }
  const allCourses = await db.collection('courses').find({}).toArray();
  const courseLookup = new Map<string, any>(); // canonical name -> course doc

  // Index existing courses by normalized name
  const normalizeName = (n: string) => n.toLowerCase().replace(/[^a-z0-9]/g, '');
  const existingByName = new Map<string, any>();
  for (const c of allCourses) {
    existingByName.set(normalizeName(c.name), c);
  }

  // Create or update canonical courses
  let coursesCreated = 0, coursesUpdated = 0;
  for (const [streamName, list] of Object.entries(CANONICAL_COURSES)) {
    const streamId = streamMap.get(streamName);
    if (!streamId) {
      console.log(`  WARN: Stream not found: ${streamName}`);
      continue;
    }

    for (const course of list) {
      const normalized = normalizeName(course.name);
      const existing = existingByName.get(normalized);

      if (existing) {
        // Update fees + stream + duration + eligibility
        await db.collection('courses').updateOne(
          { _id: existing._id },
          {
            $set: {
              name: course.name,
              type: course.type,
              duration: course.duration,
              fees: course.fees,
              eligibility: course.eligibility,
              stream: streamId,
              updatedAt: new Date(),
            },
          }
        );
        courseLookup.set(course.name, { ...existing, stream: streamId });
        coursesUpdated++;
      } else {
        const result = await db.collection('courses').insertOne({
          name: course.name,
          type: course.type,
          duration: course.duration,
          fees: course.fees,
          eligibility: course.eligibility,
          stream: streamId,
          shortDescription: course.name + ' is a ' + course.duration + ' program. ' + course.eligibility.join('; '),
          intakeCapacity: 'Varies by college',
          createdAt: new Date(),
          updatedAt: new Date(),
        });
        courseLookup.set(course.name, { _id: result.insertedId, stream: streamId });
        coursesCreated++;
      }
    }
  }
  console.log(`  Canonical courses: ${coursesCreated} created, ${coursesUpdated} updated`);

  // === STEP 2: Assign courses to colleges ===
  console.log('\n=== STEP 2: Assigning courses to colleges ===');
  const colleges = await db.collection('colleges').find({}).toArray();

  let collegeUpdated = 0;
  let totalCoursesAdded = 0;

  for (const college of colleges) {
    const expected = getCoursesForCollege(college.name, college.country);
    const expectedIds: any[] = [];
    for (const ec of expected) {
      const courseDoc = courseLookup.get(ec.courseName);
      if (courseDoc) expectedIds.push(courseDoc._id);
    }

    if (expectedIds.length === 0) continue;

    // Merge with existing (keep existing courses, add expected ones)
    const existingIds = (college.courses || []).map((id: any) => id?.toString());
    const newIds = expectedIds.filter((id: any) => !existingIds.includes(id.toString()));

    if (newIds.length === 0) continue;

    const finalCourses = [...(college.courses || []), ...newIds];
    await db.collection('colleges').updateOne(
      { _id: college._id },
      { $set: { courses: finalCourses } }
    );
    collegeUpdated++;
    totalCoursesAdded += newIds.length;
  }

  console.log(`  Updated ${collegeUpdated} colleges, added ${totalCoursesAdded} course associations`);

  // === STEP 3: Verification ===
  console.log('\n=== STEP 3: Verification ===');
  const updatedColleges = await db.collection('colleges').find({}, { projection: { courses: 1 } }).toArray();
  let totalLinks = 0, noCoursesNow = 0;
  const dist: Record<number, number> = {};
  for (const c of updatedColleges) {
    const cnt = c.courses?.length || 0;
    totalLinks += cnt;
    if (cnt === 0) noCoursesNow++;
    const bucket = cnt < 5 ? cnt : Math.floor(cnt / 5) * 5;
    dist[bucket] = (dist[bucket] || 0) + 1;
  }
  console.log(`  Total course links: ${totalLinks}`);
  console.log(`  Avg courses per college: ${(totalLinks / colleges.length).toFixed(1)}`);
  console.log(`  Colleges with 0 courses: ${noCoursesNow}`);
  console.log('  Distribution:');
  Object.entries(dist).sort((a, b) => Number(a[0]) - Number(b[0])).forEach(([b, n]) => {
    console.log(`    ${b}+ courses: ${n} colleges`);
  });

  await mongoose.disconnect();
}

main().catch(console.error);
