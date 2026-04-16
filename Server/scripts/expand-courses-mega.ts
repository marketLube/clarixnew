import mongoose from 'mongoose';

const MONGO_URI = 'mongodb+srv://ajaydevmarketlube:WSCbaKW38pIGv8S2@cluster0.cd2yjhg.mongodb.net/?appName=Cluster0';

interface CourseTemplate {
  name: string;
  type?: string;
  duration: string;
  eligibility: string[];
  fees: string;
  cardImage?: string;
  shortDesc?: string;
}

// === MEGA COURSE LIST — 800+ courses across all streams ===

const COURSES: Record<string, CourseTemplate[]> = {
  Engineering: [
    // B.Tech Core (already existing)
    { name: 'B.Tech Computer Science and Engineering', duration: '4 Years', eligibility: ['10+2 with PCM', 'JEE Main / Entrance Exam'], fees: '₹2,00,000 - ₹6,00,000 / year' },
    { name: 'B.Tech Information Technology', duration: '4 Years', eligibility: ['10+2 with PCM', 'JEE Main / Entrance Exam'], fees: '₹1,80,000 - ₹5,00,000 / year' },
    { name: 'B.Tech Electronics and Communication Engineering', duration: '4 Years', eligibility: ['10+2 with PCM'], fees: '₹1,80,000 - ₹4,50,000 / year' },
    { name: 'B.Tech Electrical Engineering', duration: '4 Years', eligibility: ['10+2 with PCM'], fees: '₹1,50,000 - ₹4,00,000 / year' },
    { name: 'B.Tech Mechanical Engineering', duration: '4 Years', eligibility: ['10+2 with PCM'], fees: '₹1,50,000 - ₹4,00,000 / year' },
    { name: 'B.Tech Civil Engineering', duration: '4 Years', eligibility: ['10+2 with PCM'], fees: '₹1,40,000 - ₹3,80,000 / year' },
    { name: 'B.Tech Chemical Engineering', duration: '4 Years', eligibility: ['10+2 with PCM'], fees: '₹1,60,000 - ₹4,00,000 / year' },
    { name: 'B.Tech Biotechnology', duration: '4 Years', eligibility: ['10+2 with PCMB'], fees: '₹1,80,000 - ₹4,50,000 / year' },
    { name: 'B.Tech Aerospace Engineering', duration: '4 Years', eligibility: ['10+2 with PCM'], fees: '₹2,00,000 - ₹5,00,000 / year' },
    { name: 'B.Tech Artificial Intelligence and Machine Learning', duration: '4 Years', eligibility: ['10+2 with PCM'], fees: '₹2,20,000 - ₹6,00,000 / year' },
    { name: 'B.Tech Data Science', duration: '4 Years', eligibility: ['10+2 with PCM'], fees: '₹2,20,000 - ₹6,00,000 / year' },
    { name: 'B.Tech Cyber Security', duration: '4 Years', eligibility: ['10+2 with PCM'], fees: '₹2,00,000 - ₹5,50,000 / year' },
    { name: 'B.Tech Robotics and Automation', duration: '4 Years', eligibility: ['10+2 with PCM'], fees: '₹2,00,000 - ₹5,50,000 / year' },
    { name: 'B.Tech Mechatronics', duration: '4 Years', eligibility: ['10+2 with PCM'], fees: '₹1,80,000 - ₹4,50,000 / year' },
    { name: 'B.Tech Aeronautical Engineering', duration: '4 Years', eligibility: ['10+2 with PCM'], fees: '₹2,00,000 - ₹5,00,000 / year' },
    { name: 'B.Tech Automobile Engineering', duration: '4 Years', eligibility: ['10+2 with PCM'], fees: '₹1,60,000 - ₹4,00,000 / year' },
    { name: 'B.Tech Petroleum Engineering', duration: '4 Years', eligibility: ['10+2 with PCM'], fees: '₹2,50,000 - ₹6,00,000 / year' },
    { name: 'B.Tech Mining Engineering', duration: '4 Years', eligibility: ['10+2 with PCM'], fees: '₹1,50,000 - ₹3,80,000 / year' },
    { name: 'B.Tech Marine Engineering', duration: '4 Years', eligibility: ['10+2 with PCM'], fees: '₹2,50,000 - ₹5,50,000 / year' },
    { name: 'B.Tech Food Technology', duration: '4 Years', eligibility: ['10+2 with PCMB'], fees: '₹1,50,000 - ₹3,80,000 / year' },
    // NEW B.Tech specializations
    { name: 'B.Tech Industrial Engineering', duration: '4 Years', eligibility: ['10+2 with PCM'], fees: '₹1,50,000 - ₹4,00,000 / year' },
    { name: 'B.Tech Production Engineering', duration: '4 Years', eligibility: ['10+2 with PCM'], fees: '₹1,50,000 - ₹4,00,000 / year' },
    { name: 'B.Tech Metallurgical Engineering', duration: '4 Years', eligibility: ['10+2 with PCM'], fees: '₹1,50,000 - ₹4,00,000 / year' },
    { name: 'B.Tech Textile Engineering', duration: '4 Years', eligibility: ['10+2 with PCM'], fees: '₹1,40,000 - ₹3,50,000 / year' },
    { name: 'B.Tech Leather Technology', duration: '4 Years', eligibility: ['10+2 with PCM'], fees: '₹1,30,000 - ₹3,50,000 / year' },
    { name: 'B.Tech Paper Technology', duration: '4 Years', eligibility: ['10+2 with PCM'], fees: '₹1,40,000 - ₹3,80,000 / year' },
    { name: 'B.Tech Polymer Engineering', duration: '4 Years', eligibility: ['10+2 with PCM'], fees: '₹1,50,000 - ₹4,00,000 / year' },
    { name: 'B.Tech Ceramic Engineering', duration: '4 Years', eligibility: ['10+2 with PCM'], fees: '₹1,40,000 - ₹3,80,000 / year' },
    { name: 'B.Tech Environmental Engineering', duration: '4 Years', eligibility: ['10+2 with PCM'], fees: '₹1,60,000 - ₹4,00,000 / year' },
    { name: 'B.Tech Agricultural Engineering', duration: '4 Years', eligibility: ['10+2 with PCM'], fees: '₹1,50,000 - ₹3,80,000 / year' },
    { name: 'B.Tech Renewable Energy Engineering', duration: '4 Years', eligibility: ['10+2 with PCM'], fees: '₹1,80,000 - ₹4,50,000 / year' },
    { name: 'B.Tech Instrumentation and Control', duration: '4 Years', eligibility: ['10+2 with PCM'], fees: '₹1,60,000 - ₹4,20,000 / year' },
    { name: 'B.Tech Embedded Systems', duration: '4 Years', eligibility: ['10+2 with PCM'], fees: '₹1,80,000 - ₹4,50,000 / year' },
    { name: 'B.Tech Internet of Things (IoT)', duration: '4 Years', eligibility: ['10+2 with PCM'], fees: '₹2,00,000 - ₹5,00,000 / year' },
    { name: 'B.Tech Cloud Computing', duration: '4 Years', eligibility: ['10+2 with PCM'], fees: '₹2,00,000 - ₹5,00,000 / year' },
    { name: 'B.Tech Blockchain Technology', duration: '4 Years', eligibility: ['10+2 with PCM'], fees: '₹2,20,000 - ₹5,50,000 / year' },
    { name: 'B.Tech Game Development and Design', duration: '4 Years', eligibility: ['10+2 with PCM'], fees: '₹2,20,000 - ₹5,50,000 / year' },
    { name: 'B.Tech AR/VR Technologies', duration: '4 Years', eligibility: ['10+2 with PCM'], fees: '₹2,30,000 - ₹5,80,000 / year' },
    { name: 'B.Tech Bioengineering', duration: '4 Years', eligibility: ['10+2 with PCMB'], fees: '₹1,80,000 - ₹4,50,000 / year' },
    { name: 'B.Tech Genetic Engineering', duration: '4 Years', eligibility: ['10+2 with PCMB'], fees: '₹1,80,000 - ₹4,50,000 / year' },
    { name: 'B.Tech Nanotechnology', duration: '4 Years', eligibility: ['10+2 with PCM'], fees: '₹2,00,000 - ₹5,00,000 / year' },
    { name: 'B.Tech Naval Architecture and Ocean Engineering', duration: '4 Years', eligibility: ['10+2 with PCM'], fees: '₹2,20,000 - ₹5,50,000 / year' },
    { name: 'B.Tech Software Engineering', duration: '4 Years', eligibility: ['10+2 with PCM'], fees: '₹2,00,000 - ₹5,50,000 / year' },
    { name: 'B.Tech Network Engineering', duration: '4 Years', eligibility: ['10+2 with PCM'], fees: '₹1,80,000 - ₹4,80,000 / year' },
    { name: 'B.Tech Power Engineering', duration: '4 Years', eligibility: ['10+2 with PCM'], fees: '₹1,60,000 - ₹4,20,000 / year' },
    { name: 'B.Tech Electronics and Telecommunications', duration: '4 Years', eligibility: ['10+2 with PCM'], fees: '₹1,80,000 - ₹4,50,000 / year' },
    { name: 'B.Tech Electronics and Instrumentation', duration: '4 Years', eligibility: ['10+2 with PCM'], fees: '₹1,80,000 - ₹4,50,000 / year' },
    { name: 'B.Tech Electrical and Electronics Engineering', duration: '4 Years', eligibility: ['10+2 with PCM'], fees: '₹1,70,000 - ₹4,30,000 / year' },
    { name: 'B.Tech Construction Technology', duration: '4 Years', eligibility: ['10+2 with PCM'], fees: '₹1,40,000 - ₹3,80,000 / year' },
    { name: 'B.Tech Transportation Engineering', duration: '4 Years', eligibility: ['10+2 with PCM'], fees: '₹1,50,000 - ₹4,00,000 / year' },
    { name: 'B.Tech Geotechnical Engineering', duration: '4 Years', eligibility: ['10+2 with PCM'], fees: '₹1,50,000 - ₹4,00,000 / year' },
    { name: 'B.Tech Mining Machinery', duration: '4 Years', eligibility: ['10+2 with PCM'], fees: '₹1,50,000 - ₹4,00,000 / year' },
    // M.Tech specializations
    { name: 'M.Tech Computer Science', duration: '2 Years', eligibility: ['B.Tech CSE/IT', 'GATE Score'], fees: '₹1,00,000 - ₹3,50,000 / year' },
    { name: 'M.Tech Software Engineering', duration: '2 Years', eligibility: ['B.Tech CSE/IT', 'GATE Score'], fees: '₹1,00,000 - ₹3,50,000 / year' },
    { name: 'M.Tech Information Security', duration: '2 Years', eligibility: ['B.Tech CSE/IT', 'GATE Score'], fees: '₹1,20,000 - ₹4,00,000 / year' },
    { name: 'M.Tech Artificial Intelligence', duration: '2 Years', eligibility: ['B.Tech', 'GATE Score'], fees: '₹1,30,000 - ₹4,20,000 / year' },
    { name: 'M.Tech Machine Learning', duration: '2 Years', eligibility: ['B.Tech', 'GATE Score'], fees: '₹1,30,000 - ₹4,20,000 / year' },
    { name: 'M.Tech Data Science and Analytics', duration: '2 Years', eligibility: ['B.Tech', 'GATE Score'], fees: '₹1,30,000 - ₹4,20,000 / year' },
    { name: 'M.Tech Cloud Computing', duration: '2 Years', eligibility: ['B.Tech CSE/IT', 'GATE Score'], fees: '₹1,30,000 - ₹4,20,000 / year' },
    { name: 'M.Tech Cyber Security', duration: '2 Years', eligibility: ['B.Tech CSE/IT', 'GATE Score'], fees: '₹1,30,000 - ₹4,20,000 / year' },
    { name: 'M.Tech IoT', duration: '2 Years', eligibility: ['B.Tech', 'GATE Score'], fees: '₹1,30,000 - ₹4,20,000 / year' },
    { name: 'M.Tech Electronics and Communication', duration: '2 Years', eligibility: ['B.Tech ECE', 'GATE Score'], fees: '₹1,00,000 - ₹3,50,000 / year' },
    { name: 'M.Tech VLSI Design', duration: '2 Years', eligibility: ['B.Tech ECE/EEE', 'GATE Score'], fees: '₹1,20,000 - ₹3,80,000 / year' },
    { name: 'M.Tech Embedded Systems', duration: '2 Years', eligibility: ['B.Tech', 'GATE Score'], fees: '₹1,10,000 - ₹3,60,000 / year' },
    { name: 'M.Tech Signal Processing', duration: '2 Years', eligibility: ['B.Tech ECE/EEE', 'GATE Score'], fees: '₹1,00,000 - ₹3,40,000 / year' },
    { name: 'M.Tech Communication Systems', duration: '2 Years', eligibility: ['B.Tech ECE', 'GATE Score'], fees: '₹1,00,000 - ₹3,40,000 / year' },
    { name: 'M.Tech Power Systems', duration: '2 Years', eligibility: ['B.Tech EEE', 'GATE Score'], fees: '₹1,00,000 - ₹3,40,000 / year' },
    { name: 'M.Tech Power Electronics', duration: '2 Years', eligibility: ['B.Tech EEE', 'GATE Score'], fees: '₹1,00,000 - ₹3,40,000 / year' },
    { name: 'M.Tech Mechanical Design', duration: '2 Years', eligibility: ['B.Tech Mech', 'GATE Score'], fees: '₹1,00,000 - ₹3,40,000 / year' },
    { name: 'M.Tech Thermal Engineering', duration: '2 Years', eligibility: ['B.Tech Mech', 'GATE Score'], fees: '₹1,00,000 - ₹3,40,000 / year' },
    { name: 'M.Tech Manufacturing Engineering', duration: '2 Years', eligibility: ['B.Tech Mech', 'GATE Score'], fees: '₹1,00,000 - ₹3,40,000 / year' },
    { name: 'M.Tech Production Engineering', duration: '2 Years', eligibility: ['B.Tech', 'GATE Score'], fees: '₹1,00,000 - ₹3,40,000 / year' },
    { name: 'M.Tech CAD/CAM', duration: '2 Years', eligibility: ['B.Tech', 'GATE Score'], fees: '₹1,00,000 - ₹3,40,000 / year' },
    { name: 'M.Tech Robotics', duration: '2 Years', eligibility: ['B.Tech', 'GATE Score'], fees: '₹1,30,000 - ₹4,00,000 / year' },
    { name: 'M.Tech Structural Engineering', duration: '2 Years', eligibility: ['B.Tech Civil', 'GATE Score'], fees: '₹1,00,000 - ₹3,40,000 / year' },
    { name: 'M.Tech Transportation Engineering', duration: '2 Years', eligibility: ['B.Tech Civil', 'GATE Score'], fees: '₹1,00,000 - ₹3,40,000 / year' },
    { name: 'M.Tech Geotechnical Engineering', duration: '2 Years', eligibility: ['B.Tech Civil', 'GATE Score'], fees: '₹1,00,000 - ₹3,40,000 / year' },
    { name: 'M.Tech Environmental Engineering', duration: '2 Years', eligibility: ['B.Tech', 'GATE Score'], fees: '₹1,00,000 - ₹3,40,000 / year' },
    { name: 'M.Tech Construction Management', duration: '2 Years', eligibility: ['B.Tech Civil/Arch', 'GATE Score'], fees: '₹1,00,000 - ₹3,40,000 / year' },
    { name: 'M.Tech Chemical Engineering', duration: '2 Years', eligibility: ['B.Tech Chem', 'GATE Score'], fees: '₹1,00,000 - ₹3,40,000 / year' },
    { name: 'M.Tech Biotechnology', duration: '2 Years', eligibility: ['B.Tech', 'GATE Score'], fees: '₹1,10,000 - ₹3,60,000 / year' },
    { name: 'M.Tech Nanotechnology', duration: '2 Years', eligibility: ['B.Tech', 'GATE Score'], fees: '₹1,30,000 - ₹3,80,000 / year' },
    { name: 'M.Tech Aerospace Engineering', duration: '2 Years', eligibility: ['B.Tech', 'GATE Score'], fees: '₹1,30,000 - ₹3,80,000 / year' },
    { name: 'M.Tech Industrial Engineering', duration: '2 Years', eligibility: ['B.Tech', 'GATE Score'], fees: '₹1,00,000 - ₹3,40,000 / year' },
    // Architecture
    { name: 'B.Arch (Bachelor of Architecture)', duration: '5 Years', eligibility: ['10+2 with Mathematics', 'NATA / JEE Main Paper 2'], fees: '₹1,50,000 - ₹6,00,000 / year' },
    { name: 'M.Arch (Master of Architecture)', duration: '2 Years', eligibility: ['B.Arch'], fees: '₹1,20,000 - ₹4,50,000 / year' },
    { name: 'M.Arch Urban Design', duration: '2 Years', eligibility: ['B.Arch'], fees: '₹1,20,000 - ₹4,50,000 / year' },
    { name: 'M.Arch Landscape Architecture', duration: '2 Years', eligibility: ['B.Arch'], fees: '₹1,20,000 - ₹4,50,000 / year' },
    { name: 'M.Arch Sustainable Architecture', duration: '2 Years', eligibility: ['B.Arch'], fees: '₹1,30,000 - ₹4,80,000 / year' },
    { name: 'M.Plan (Master of Planning)', duration: '2 Years', eligibility: ['B.Arch / B.Plan'], fees: '₹1,00,000 - ₹3,50,000 / year' },
    { name: 'M.Plan Urban Planning', duration: '2 Years', eligibility: ['B.Arch / B.Plan'], fees: '₹1,00,000 - ₹3,50,000 / year' },
    { name: 'M.Plan Regional Planning', duration: '2 Years', eligibility: ['B.Arch / B.Plan'], fees: '₹1,00,000 - ₹3,50,000 / year' },
    { name: 'M.Plan Transport Planning', duration: '2 Years', eligibility: ['B.Arch / B.Plan'], fees: '₹1,00,000 - ₹3,50,000 / year' },
  ],

  Management: [
    { name: 'MBA (Master of Business Administration)', duration: '2 Years', eligibility: ['Bachelor degree', 'CAT/MAT/XAT/CMAT'], fees: '₹3,00,000 - ₹28,00,000 / year' },
    { name: 'MBA Finance', duration: '2 Years', eligibility: ['Bachelor degree', 'CAT/MAT'], fees: '₹3,00,000 - ₹25,00,000 / year' },
    { name: 'MBA Marketing', duration: '2 Years', eligibility: ['Bachelor degree', 'CAT/MAT'], fees: '₹3,00,000 - ₹25,00,000 / year' },
    { name: 'MBA Human Resources', duration: '2 Years', eligibility: ['Bachelor degree', 'CAT/MAT'], fees: '₹3,00,000 - ₹25,00,000 / year' },
    { name: 'MBA Operations Management', duration: '2 Years', eligibility: ['Bachelor degree', 'CAT/MAT'], fees: '₹3,00,000 - ₹25,00,000 / year' },
    { name: 'MBA International Business', duration: '2 Years', eligibility: ['Bachelor degree', 'CAT/MAT'], fees: '₹3,00,000 - ₹25,00,000 / year' },
    { name: 'MBA Business Analytics', duration: '2 Years', eligibility: ['Bachelor degree', 'CAT/MAT'], fees: '₹3,50,000 - ₹28,00,000 / year' },
    { name: 'PGDM (Post Graduate Diploma in Management)', duration: '2 Years', eligibility: ['Bachelor degree', 'CAT/MAT'], fees: '₹3,50,000 - ₹25,00,000 / year' },
    { name: 'Executive MBA', duration: '1-2 Years', eligibility: ['Bachelor + Work Exp'], fees: '₹5,00,000 - ₹35,00,000 / year' },
    // NEW MBA specializations
    { name: 'MBA Information Technology', duration: '2 Years', eligibility: ['Bachelor degree', 'CAT/MAT'], fees: '₹3,00,000 - ₹22,00,000 / year' },
    { name: 'MBA Healthcare Management', duration: '2 Years', eligibility: ['Bachelor degree', 'CAT/MAT'], fees: '₹3,50,000 - ₹18,00,000 / year' },
    { name: 'MBA Hospital Management', duration: '2 Years', eligibility: ['Bachelor degree', 'CAT/MAT'], fees: '₹3,50,000 - ₹15,00,000 / year' },
    { name: 'MBA Pharmaceutical Management', duration: '2 Years', eligibility: ['Bachelor degree', 'CAT/MAT'], fees: '₹3,00,000 - ₹14,00,000 / year' },
    { name: 'MBA Hospitality Management', duration: '2 Years', eligibility: ['Bachelor degree', 'CAT/MAT'], fees: '₹3,50,000 - ₹15,00,000 / year' },
    { name: 'MBA Retail Management', duration: '2 Years', eligibility: ['Bachelor degree', 'CAT/MAT'], fees: '₹3,00,000 - ₹14,00,000 / year' },
    { name: 'MBA Real Estate Management', duration: '2 Years', eligibility: ['Bachelor degree', 'CAT/MAT'], fees: '₹3,50,000 - ₹15,00,000 / year' },
    { name: 'MBA Logistics and Supply Chain Management', duration: '2 Years', eligibility: ['Bachelor degree', 'CAT/MAT'], fees: '₹3,00,000 - ₹16,00,000 / year' },
    { name: 'MBA Aviation Management', duration: '2 Years', eligibility: ['Bachelor degree', 'CAT/MAT'], fees: '₹3,50,000 - ₹16,00,000 / year' },
    { name: 'MBA Sports Management', duration: '2 Years', eligibility: ['Bachelor degree', 'CAT/MAT'], fees: '₹3,50,000 - ₹15,00,000 / year' },
    { name: 'MBA Family Business and Entrepreneurship', duration: '2 Years', eligibility: ['Bachelor degree', 'CAT/MAT'], fees: '₹4,00,000 - ₹20,00,000 / year' },
    { name: 'MBA Sustainability Management', duration: '2 Years', eligibility: ['Bachelor degree', 'CAT/MAT'], fees: '₹3,50,000 - ₹18,00,000 / year' },
    { name: 'MBA Digital Marketing', duration: '2 Years', eligibility: ['Bachelor degree', 'CAT/MAT'], fees: '₹3,00,000 - ₹16,00,000 / year' },
    { name: 'MBA Fintech', duration: '2 Years', eligibility: ['Bachelor degree', 'CAT/MAT'], fees: '₹4,00,000 - ₹20,00,000 / year' },
    { name: 'MBA AgriBusiness Management', duration: '2 Years', eligibility: ['Bachelor degree', 'CAT/MAT'], fees: '₹2,50,000 - ₹12,00,000 / year' },
    { name: 'MBA Energy Management', duration: '2 Years', eligibility: ['Bachelor degree', 'CAT/MAT'], fees: '₹3,50,000 - ₹15,00,000 / year' },
    { name: 'MBA Insurance Management', duration: '2 Years', eligibility: ['Bachelor degree', 'CAT/MAT'], fees: '₹3,00,000 - ₹13,00,000 / year' },
    { name: 'MBA Banking and Insurance', duration: '2 Years', eligibility: ['Bachelor degree', 'CAT/MAT'], fees: '₹3,00,000 - ₹13,00,000 / year' },
    { name: 'MBA Telecom Management', duration: '2 Years', eligibility: ['Bachelor degree', 'CAT/MAT'], fees: '₹3,00,000 - ₹14,00,000 / year' },
    { name: 'MBA Public Policy', duration: '2 Years', eligibility: ['Bachelor degree', 'CAT/MAT'], fees: '₹3,50,000 - ₹15,00,000 / year' },
    { name: 'MBA Rural Management', duration: '2 Years', eligibility: ['Bachelor degree', 'CAT/MAT'], fees: '₹2,50,000 - ₹12,00,000 / year' },
    // BBA specializations
    { name: 'BBA (Bachelor of Business Administration)', duration: '3 Years', eligibility: ['10+2 in any stream'], fees: '₹1,00,000 - ₹6,00,000 / year' },
    { name: 'BBA Finance', duration: '3 Years', eligibility: ['10+2 in any stream'], fees: '₹1,20,000 - ₹5,00,000 / year' },
    { name: 'BBA Marketing', duration: '3 Years', eligibility: ['10+2 in any stream'], fees: '₹1,00,000 - ₹4,80,000 / year' },
    { name: 'BBA Human Resources', duration: '3 Years', eligibility: ['10+2 in any stream'], fees: '₹1,00,000 - ₹4,50,000 / year' },
    { name: 'BBA International Business', duration: '3 Years', eligibility: ['10+2 in any stream'], fees: '₹1,30,000 - ₹5,00,000 / year' },
    { name: 'BBA Logistics and Supply Chain', duration: '3 Years', eligibility: ['10+2 in any stream'], fees: '₹1,20,000 - ₹4,80,000 / year' },
    { name: 'BBA Business Analytics', duration: '3 Years', eligibility: ['10+2 in any stream'], fees: '₹1,50,000 - ₹5,50,000 / year' },
    { name: 'BBA Digital Marketing', duration: '3 Years', eligibility: ['10+2 in any stream'], fees: '₹1,30,000 - ₹5,00,000 / year' },
    { name: 'BBA Healthcare Management', duration: '3 Years', eligibility: ['10+2 in any stream'], fees: '₹1,50,000 - ₹5,00,000 / year' },
    { name: 'BBA Hospitality and Hotel Management', duration: '3 Years', eligibility: ['10+2 in any stream'], fees: '₹1,50,000 - ₹5,00,000 / year' },
    { name: 'BBA Aviation', duration: '3 Years', eligibility: ['10+2 in any stream'], fees: '₹2,00,000 - ₹6,00,000 / year' },
    { name: 'BMS (Bachelor of Management Studies)', duration: '3 Years', eligibility: ['10+2 in any stream'], fees: '₹80,000 - ₹5,00,000 / year' },
    { name: 'BHM (Bachelor of Hotel Management)', duration: '3-4 Years', eligibility: ['10+2 in any stream'], fees: '₹80,000 - ₹4,00,000 / year' },
    { name: 'BHMCT (Hotel Management and Catering Technology)', duration: '4 Years', eligibility: ['10+2 in any stream'], fees: '₹1,00,000 - ₹4,50,000 / year' },
    // Master programs
    { name: 'MMS (Master of Management Studies)', duration: '2 Years', eligibility: ['Bachelor degree', 'CAT/MAT'], fees: '₹3,00,000 - ₹18,00,000 / year' },
    { name: 'M.Sc Hospitality Management', duration: '2 Years', eligibility: ['Bachelor in Hospitality/related'], fees: '₹2,00,000 - ₹8,00,000 / year' },
  ],

  Medical: [
    { name: 'MBBS (Bachelor of Medicine, Bachelor of Surgery)', duration: '5.5 Years', eligibility: ['10+2 with PCB', 'NEET-UG'], fees: '₹50,000 - ₹25,00,000 / year' },
    { name: 'BDS (Bachelor of Dental Surgery)', duration: '5 Years', eligibility: ['10+2 with PCB', 'NEET-UG'], fees: '₹2,00,000 - ₹15,00,000 / year' },
    { name: 'BAMS (Bachelor of Ayurvedic Medicine and Surgery)', duration: '5.5 Years', eligibility: ['10+2 with PCB', 'NEET-UG'], fees: '₹1,00,000 - ₹6,00,000 / year' },
    { name: 'BHMS (Bachelor of Homoeopathic Medicine and Surgery)', duration: '5.5 Years', eligibility: ['10+2 with PCB', 'NEET-UG'], fees: '₹80,000 - ₹4,00,000 / year' },
    { name: 'BUMS (Bachelor of Unani Medicine and Surgery)', duration: '5.5 Years', eligibility: ['10+2 with PCB', 'NEET-UG'], fees: '₹80,000 - ₹3,50,000 / year' },
    { name: 'BSMS (Bachelor of Siddha Medicine and Surgery)', duration: '5.5 Years', eligibility: ['10+2 with PCB', 'NEET-UG'], fees: '₹80,000 - ₹3,50,000 / year' },
    { name: 'BNYS (Naturopathy and Yogic Sciences)', duration: '5.5 Years', eligibility: ['10+2 with PCB'], fees: '₹80,000 - ₹3,50,000 / year' },
    { name: 'BPT (Bachelor of Physiotherapy)', duration: '4.5 Years', eligibility: ['10+2 with PCB'], fees: '₹80,000 - ₹3,00,000 / year' },
    { name: 'BOT (Bachelor of Occupational Therapy)', duration: '4.5 Years', eligibility: ['10+2 with PCB'], fees: '₹80,000 - ₹3,00,000 / year' },
    { name: 'B.Sc Nursing', duration: '4 Years', eligibility: ['10+2 with PCB'], fees: '₹50,000 - ₹3,50,000 / year' },
    { name: 'GNM (General Nursing and Midwifery)', duration: '3.5 Years', eligibility: ['10+2'], fees: '₹40,000 - ₹2,00,000 / year' },
    { name: 'ANM (Auxiliary Nurse Midwifery)', duration: '2 Years', eligibility: ['10+2'], fees: '₹30,000 - ₹1,50,000 / year' },
    { name: 'M.Sc Nursing', duration: '2 Years', eligibility: ['B.Sc Nursing'], fees: '₹60,000 - ₹3,00,000 / year' },
    { name: 'Post Basic B.Sc Nursing', duration: '2 Years', eligibility: ['GNM diploma'], fees: '₹50,000 - ₹2,50,000 / year' },
    // MD specializations
    { name: 'MD General Medicine', duration: '3 Years', eligibility: ['MBBS', 'NEET-PG'], fees: '₹2,00,000 - ₹50,00,000 / year' },
    { name: 'MD Pediatrics', duration: '3 Years', eligibility: ['MBBS', 'NEET-PG'], fees: '₹2,00,000 - ₹45,00,000 / year' },
    { name: 'MD Psychiatry', duration: '3 Years', eligibility: ['MBBS', 'NEET-PG'], fees: '₹2,00,000 - ₹40,00,000 / year' },
    { name: 'MD Dermatology', duration: '3 Years', eligibility: ['MBBS', 'NEET-PG'], fees: '₹3,00,000 - ₹55,00,000 / year' },
    { name: 'MD Radiology', duration: '3 Years', eligibility: ['MBBS', 'NEET-PG'], fees: '₹3,00,000 - ₹60,00,000 / year' },
    { name: 'MD Anesthesia', duration: '3 Years', eligibility: ['MBBS', 'NEET-PG'], fees: '₹2,00,000 - ₹40,00,000 / year' },
    { name: 'MD Pathology', duration: '3 Years', eligibility: ['MBBS', 'NEET-PG'], fees: '₹2,00,000 - ₹35,00,000 / year' },
    { name: 'MD Microbiology', duration: '3 Years', eligibility: ['MBBS', 'NEET-PG'], fees: '₹1,80,000 - ₹30,00,000 / year' },
    { name: 'MD Pharmacology', duration: '3 Years', eligibility: ['MBBS', 'NEET-PG'], fees: '₹1,80,000 - ₹30,00,000 / year' },
    { name: 'MD Community Medicine', duration: '3 Years', eligibility: ['MBBS', 'NEET-PG'], fees: '₹1,50,000 - ₹25,00,000 / year' },
    { name: 'MD Forensic Medicine', duration: '3 Years', eligibility: ['MBBS', 'NEET-PG'], fees: '₹1,50,000 - ₹25,00,000 / year' },
    // MS specializations
    { name: 'MS General Surgery', duration: '3 Years', eligibility: ['MBBS', 'NEET-PG'], fees: '₹2,50,000 - ₹50,00,000 / year' },
    { name: 'MS Orthopedics', duration: '3 Years', eligibility: ['MBBS', 'NEET-PG'], fees: '₹2,50,000 - ₹50,00,000 / year' },
    { name: 'MS Obstetrics and Gynecology', duration: '3 Years', eligibility: ['MBBS', 'NEET-PG'], fees: '₹2,50,000 - ₹50,00,000 / year' },
    { name: 'MS Ophthalmology', duration: '3 Years', eligibility: ['MBBS', 'NEET-PG'], fees: '₹2,50,000 - ₹50,00,000 / year' },
    { name: 'MS ENT (Otorhinolaryngology)', duration: '3 Years', eligibility: ['MBBS', 'NEET-PG'], fees: '₹2,50,000 - ₹50,00,000 / year' },
    { name: 'MS Urology', duration: '3 Years', eligibility: ['MBBS', 'NEET-PG'], fees: '₹3,00,000 - ₹55,00,000 / year' },
    { name: 'MS Cardiothoracic Surgery', duration: '3 Years', eligibility: ['MBBS', 'NEET-PG'], fees: '₹3,00,000 - ₹60,00,000 / year' },
    { name: 'MS Neurosurgery', duration: '3 Years', eligibility: ['MBBS', 'NEET-PG'], fees: '₹3,50,000 - ₹65,00,000 / year' },
    // MDS specializations
    { name: 'MDS Orthodontics', duration: '3 Years', eligibility: ['BDS'], fees: '₹3,00,000 - ₹15,00,000 / year' },
    { name: 'MDS Periodontics', duration: '3 Years', eligibility: ['BDS'], fees: '₹3,00,000 - ₹14,00,000 / year' },
    { name: 'MDS Conservative Dentistry', duration: '3 Years', eligibility: ['BDS'], fees: '₹3,00,000 - ₹14,00,000 / year' },
    { name: 'MDS Oral and Maxillofacial Surgery', duration: '3 Years', eligibility: ['BDS'], fees: '₹3,50,000 - ₹16,00,000 / year' },
    { name: 'MDS Pediatric Dentistry', duration: '3 Years', eligibility: ['BDS'], fees: '₹3,00,000 - ₹14,00,000 / year' },
    { name: 'MDS Prosthodontics', duration: '3 Years', eligibility: ['BDS'], fees: '₹3,00,000 - ₹14,00,000 / year' },
    { name: 'MDS Public Health Dentistry', duration: '3 Years', eligibility: ['BDS'], fees: '₹2,50,000 - ₹12,00,000 / year' },
    // Allied health
    { name: 'B.Sc Medical Lab Technology', duration: '3-4 Years', eligibility: ['10+2 with PCB'], fees: '₹50,000 - ₹2,50,000 / year' },
    { name: 'B.Sc Radiology and Imaging Technology', duration: '3-4 Years', eligibility: ['10+2 with PCB'], fees: '₹60,000 - ₹3,00,000 / year' },
    { name: 'B.Sc Operation Theatre Technology', duration: '3-4 Years', eligibility: ['10+2 with PCB'], fees: '₹50,000 - ₹2,50,000 / year' },
    { name: 'B.Sc Anaesthesia Technology', duration: '3-4 Years', eligibility: ['10+2 with PCB'], fees: '₹50,000 - ₹2,50,000 / year' },
    { name: 'B.Sc Optometry', duration: '4 Years', eligibility: ['10+2 with PCB'], fees: '₹60,000 - ₹3,00,000 / year' },
    { name: 'B.Sc Cardiac Care Technology', duration: '3-4 Years', eligibility: ['10+2 with PCB'], fees: '₹70,000 - ₹3,50,000 / year' },
    { name: 'B.Sc Cardiovascular Technology', duration: '4 Years', eligibility: ['10+2 with PCB'], fees: '₹70,000 - ₹3,50,000 / year' },
    { name: 'B.Sc Respiratory Therapy', duration: '3-4 Years', eligibility: ['10+2 with PCB'], fees: '₹60,000 - ₹3,00,000 / year' },
    { name: 'B.Sc Dialysis Technology', duration: '3-4 Years', eligibility: ['10+2 with PCB'], fees: '₹60,000 - ₹3,00,000 / year' },
    { name: 'B.Sc Perfusion Technology', duration: '3-4 Years', eligibility: ['10+2 with PCB'], fees: '₹70,000 - ₹3,50,000 / year' },
    { name: 'B.Sc Audiology and Speech-Language Pathology', duration: '4 Years', eligibility: ['10+2 with PCB'], fees: '₹80,000 - ₹3,50,000 / year' },
    { name: 'B.Sc Forensic Science', duration: '3 Years', eligibility: ['10+2 with PCB'], fees: '₹60,000 - ₹3,00,000 / year' },
    { name: 'BMLT (Medical Laboratory Technology)', duration: '3 Years', eligibility: ['10+2 with PCB'], fees: '₹50,000 - ₹2,00,000 / year' },
    { name: 'MPT (Master of Physiotherapy)', duration: '2 Years', eligibility: ['BPT'], fees: '₹80,000 - ₹3,50,000 / year' },
    { name: 'MOT (Master of Occupational Therapy)', duration: '2 Years', eligibility: ['BOT'], fees: '₹80,000 - ₹3,50,000 / year' },
    { name: 'MPH (Master of Public Health)', duration: '2 Years', eligibility: ['MBBS/Bachelor in Health'], fees: '₹1,00,000 - ₹5,00,000 / year' },
    { name: 'MD/DM Cardiology', duration: '3 Years', eligibility: ['MD General Medicine'], fees: '₹3,00,000 - ₹50,00,000 / year' },
    { name: 'DM Neurology', duration: '3 Years', eligibility: ['MD General Medicine'], fees: '₹3,00,000 - ₹50,00,000 / year' },
    { name: 'DM Gastroenterology', duration: '3 Years', eligibility: ['MD General Medicine'], fees: '₹3,00,000 - ₹50,00,000 / year' },
    { name: 'DM Nephrology', duration: '3 Years', eligibility: ['MD General Medicine'], fees: '₹3,00,000 - ₹50,00,000 / year' },
    { name: 'DM Endocrinology', duration: '3 Years', eligibility: ['MD General Medicine'], fees: '₹3,00,000 - ₹50,00,000 / year' },
    { name: 'DM Pulmonology', duration: '3 Years', eligibility: ['MD General Medicine'], fees: '₹3,00,000 - ₹50,00,000 / year' },
    { name: 'M.Ch Cardiothoracic Surgery', duration: '3 Years', eligibility: ['MS Surgery'], fees: '₹3,50,000 - ₹55,00,000 / year' },
    { name: 'M.Ch Neurosurgery', duration: '3 Years', eligibility: ['MS Surgery'], fees: '₹3,50,000 - ₹60,00,000 / year' },
    { name: 'M.Ch Urology', duration: '3 Years', eligibility: ['MS Surgery'], fees: '₹3,50,000 - ₹55,00,000 / year' },
    { name: 'M.Ch Pediatric Surgery', duration: '3 Years', eligibility: ['MS Surgery'], fees: '₹3,00,000 - ₹50,00,000 / year' },
  ],

  Pharmacy: [
    { name: 'B.Pharm (Bachelor of Pharmacy)', duration: '4 Years', eligibility: ['10+2 with PCM/PCB'], fees: '₹80,000 - ₹3,50,000 / year' },
    { name: 'D.Pharm (Diploma in Pharmacy)', duration: '2 Years', eligibility: ['10+2 with PCM/PCB'], fees: '₹50,000 - ₹2,00,000 / year' },
    { name: 'M.Pharm (Master of Pharmacy)', duration: '2 Years', eligibility: ['B.Pharm'], fees: '₹1,00,000 - ₹3,50,000 / year' },
    { name: 'M.Pharm Pharmaceutical Chemistry', duration: '2 Years', eligibility: ['B.Pharm'], fees: '₹1,00,000 - ₹3,50,000 / year' },
    { name: 'M.Pharm Pharmacology', duration: '2 Years', eligibility: ['B.Pharm'], fees: '₹1,00,000 - ₹3,50,000 / year' },
    { name: 'M.Pharm Pharmaceutics', duration: '2 Years', eligibility: ['B.Pharm'], fees: '₹1,00,000 - ₹3,50,000 / year' },
    { name: 'M.Pharm Pharmacognosy', duration: '2 Years', eligibility: ['B.Pharm'], fees: '₹1,00,000 - ₹3,50,000 / year' },
    { name: 'M.Pharm Industrial Pharmacy', duration: '2 Years', eligibility: ['B.Pharm'], fees: '₹1,20,000 - ₹4,00,000 / year' },
    { name: 'M.Pharm Pharmacy Practice', duration: '2 Years', eligibility: ['B.Pharm'], fees: '₹1,00,000 - ₹3,50,000 / year' },
    { name: 'M.Pharm Quality Assurance', duration: '2 Years', eligibility: ['B.Pharm'], fees: '₹1,00,000 - ₹3,50,000 / year' },
    { name: 'M.Pharm Drug Regulatory Affairs', duration: '2 Years', eligibility: ['B.Pharm'], fees: '₹1,20,000 - ₹4,00,000 / year' },
    { name: 'Pharm.D (Doctor of Pharmacy)', duration: '6 Years', eligibility: ['10+2 with PCB'], fees: '₹1,20,000 - ₹4,50,000 / year' },
    { name: 'Pharm.D Post Baccalaureate', duration: '3 Years', eligibility: ['B.Pharm'], fees: '₹1,50,000 - ₹5,00,000 / year' },
  ],

  Law: [
    { name: 'BA LLB (Hons) - 5 Year Integrated', duration: '5 Years', eligibility: ['10+2', 'CLAT/AILET'], fees: '₹1,50,000 - ₹6,00,000 / year' },
    { name: 'BBA LLB (Hons) - 5 Year Integrated', duration: '5 Years', eligibility: ['10+2', 'CLAT/AILET'], fees: '₹2,00,000 - ₹6,50,000 / year' },
    { name: 'B.Com LLB (Hons) - 5 Year Integrated', duration: '5 Years', eligibility: ['10+2', 'CLAT/AILET'], fees: '₹1,50,000 - ₹5,50,000 / year' },
    { name: 'B.Sc LLB (Hons) - 5 Year Integrated', duration: '5 Years', eligibility: ['10+2 with Science'], fees: '₹1,50,000 - ₹5,50,000 / year' },
    { name: 'BA Hons Political Science and LLB', duration: '5 Years', eligibility: ['10+2', 'CLAT/AILET'], fees: '₹1,80,000 - ₹6,00,000 / year' },
    { name: 'LLB (Bachelor of Laws)', duration: '3 Years', eligibility: ['Bachelor degree'], fees: '₹50,000 - ₹3,00,000 / year' },
    { name: 'LLM (Master of Laws)', duration: '1-2 Years', eligibility: ['LLB'], fees: '₹80,000 - ₹4,00,000 / year' },
    { name: 'LLM Corporate Law', duration: '1-2 Years', eligibility: ['LLB'], fees: '₹1,00,000 - ₹4,50,000 / year' },
    { name: 'LLM Constitutional Law', duration: '1-2 Years', eligibility: ['LLB'], fees: '₹80,000 - ₹4,00,000 / year' },
    { name: 'LLM Criminal Law', duration: '1-2 Years', eligibility: ['LLB'], fees: '₹80,000 - ₹4,00,000 / year' },
    { name: 'LLM Intellectual Property Rights', duration: '1-2 Years', eligibility: ['LLB'], fees: '₹1,20,000 - ₹4,80,000 / year' },
    { name: 'LLM International Law', duration: '1-2 Years', eligibility: ['LLB'], fees: '₹1,20,000 - ₹4,80,000 / year' },
    { name: 'LLM Cyber Law', duration: '1-2 Years', eligibility: ['LLB'], fees: '₹1,30,000 - ₹5,00,000 / year' },
    { name: 'LLM Tax Law', duration: '1-2 Years', eligibility: ['LLB'], fees: '₹1,00,000 - ₹4,50,000 / year' },
    { name: 'LLM Family Law', duration: '1-2 Years', eligibility: ['LLB'], fees: '₹80,000 - ₹4,00,000 / year' },
    { name: 'LLM Human Rights', duration: '1-2 Years', eligibility: ['LLB'], fees: '₹80,000 - ₹4,00,000 / year' },
    { name: 'PG Diploma in Cyber Law', duration: '1 Year', eligibility: ['Bachelor degree'], fees: '₹50,000 - ₹2,00,000 / year' },
    { name: 'PG Diploma in Intellectual Property Rights', duration: '1 Year', eligibility: ['Bachelor degree'], fees: '₹50,000 - ₹2,00,000 / year' },
  ],

  Commerce: [
    { name: 'B.Com (Bachelor of Commerce)', duration: '3 Years', eligibility: ['10+2 with Commerce/any stream'], fees: '₹20,000 - ₹3,00,000 / year' },
    { name: 'B.Com (Honours)', duration: '3 Years', eligibility: ['10+2 with Commerce/any stream'], fees: '₹25,000 - ₹3,50,000 / year' },
    { name: 'B.Com Banking and Finance', duration: '3 Years', eligibility: ['10+2 with Commerce'], fees: '₹50,000 - ₹3,00,000 / year' },
    { name: 'B.Com Accounting and Finance', duration: '3 Years', eligibility: ['10+2 with Commerce'], fees: '₹50,000 - ₹3,00,000 / year' },
    { name: 'B.Com Taxation', duration: '3 Years', eligibility: ['10+2 with Commerce'], fees: '₹40,000 - ₹2,80,000 / year' },
    { name: 'B.Com International Business', duration: '3 Years', eligibility: ['10+2 with Commerce'], fees: '₹60,000 - ₹3,20,000 / year' },
    { name: 'B.Com Computer Applications', duration: '3 Years', eligibility: ['10+2 with Commerce'], fees: '₹50,000 - ₹2,80,000 / year' },
    { name: 'B.Com with ACCA', duration: '3 Years', eligibility: ['10+2 with Commerce'], fees: '₹2,00,000 - ₹4,50,000 / year' },
    { name: 'B.Com with CMA', duration: '3 Years', eligibility: ['10+2 with Commerce'], fees: '₹1,50,000 - ₹4,00,000 / year' },
    { name: 'M.Com (Master of Commerce)', duration: '2 Years', eligibility: ['B.Com'], fees: '₹20,000 - ₹2,50,000 / year' },
    { name: 'M.Com Finance', duration: '2 Years', eligibility: ['B.Com'], fees: '₹30,000 - ₹2,80,000 / year' },
    { name: 'M.Com Accounting', duration: '2 Years', eligibility: ['B.Com'], fees: '₹25,000 - ₹2,50,000 / year' },
    { name: 'M.Com Taxation', duration: '2 Years', eligibility: ['B.Com'], fees: '₹25,000 - ₹2,50,000 / year' },
    { name: 'M.Com International Business', duration: '2 Years', eligibility: ['B.Com'], fees: '₹30,000 - ₹2,80,000 / year' },
    { name: 'CA (Chartered Accountancy)', duration: '4-5 Years', eligibility: ['10+2 with Commerce'], fees: '₹50,000 - ₹2,00,000 / year' },
    { name: 'CMA (Cost Management Accountant)', duration: '3-4 Years', eligibility: ['10+2'], fees: '₹40,000 - ₹1,50,000 / year' },
    { name: 'CS (Company Secretary)', duration: '3-4 Years', eligibility: ['10+2'], fees: '₹40,000 - ₹1,50,000 / year' },
  ],

  Science: [
    { name: 'B.Sc Physics', duration: '3 Years', eligibility: ['10+2 with PCM'], fees: '₹20,000 - ₹2,00,000 / year' },
    { name: 'B.Sc Chemistry', duration: '3 Years', eligibility: ['10+2 with PCM/PCB'], fees: '₹20,000 - ₹2,00,000 / year' },
    { name: 'B.Sc Mathematics', duration: '3 Years', eligibility: ['10+2 with Mathematics'], fees: '₹20,000 - ₹2,00,000 / year' },
    { name: 'B.Sc Statistics', duration: '3 Years', eligibility: ['10+2 with Mathematics'], fees: '₹25,000 - ₹2,30,000 / year' },
    { name: 'B.Sc Biology', duration: '3 Years', eligibility: ['10+2 with PCB'], fees: '₹25,000 - ₹2,20,000 / year' },
    { name: 'B.Sc Botany', duration: '3 Years', eligibility: ['10+2 with PCB'], fees: '₹25,000 - ₹2,20,000 / year' },
    { name: 'B.Sc Zoology', duration: '3 Years', eligibility: ['10+2 with PCB'], fees: '₹25,000 - ₹2,20,000 / year' },
    { name: 'B.Sc Microbiology', duration: '3 Years', eligibility: ['10+2 with PCB'], fees: '₹40,000 - ₹2,80,000 / year' },
    { name: 'B.Sc Biochemistry', duration: '3 Years', eligibility: ['10+2 with PCB'], fees: '₹40,000 - ₹2,80,000 / year' },
    { name: 'B.Sc Biotechnology', duration: '3 Years', eligibility: ['10+2 with PCB'], fees: '₹50,000 - ₹3,00,000 / year' },
    { name: 'B.Sc Genetics', duration: '3 Years', eligibility: ['10+2 with PCB'], fees: '₹50,000 - ₹3,00,000 / year' },
    { name: 'B.Sc Geology', duration: '3 Years', eligibility: ['10+2 with PCM'], fees: '₹30,000 - ₹2,30,000 / year' },
    { name: 'B.Sc Geography', duration: '3 Years', eligibility: ['10+2'], fees: '₹20,000 - ₹2,00,000 / year' },
    { name: 'B.Sc Environmental Science', duration: '3 Years', eligibility: ['10+2 with PCB'], fees: '₹35,000 - ₹2,50,000 / year' },
    { name: 'B.Sc Forensic Science', duration: '3 Years', eligibility: ['10+2 with PCB'], fees: '₹50,000 - ₹3,00,000 / year' },
    { name: 'B.Sc Computer Science', duration: '3 Years', eligibility: ['10+2 with Mathematics'], fees: '₹40,000 - ₹2,50,000 / year' },
    { name: 'B.Sc Data Science', duration: '3 Years', eligibility: ['10+2 with Mathematics'], fees: '₹60,000 - ₹3,50,000 / year' },
    { name: 'B.Sc Animation and Multimedia', duration: '3 Years', eligibility: ['10+2'], fees: '₹80,000 - ₹3,50,000 / year' },
    { name: 'B.Sc Aviation', duration: '3 Years', eligibility: ['10+2 with PCM'], fees: '₹2,00,000 - ₹6,00,000 / year' },
    { name: 'BCA (Bachelor of Computer Applications)', duration: '3 Years', eligibility: ['10+2 with Mathematics'], fees: '₹50,000 - ₹2,50,000 / year' },
    { name: 'BCA Cloud Technology', duration: '3 Years', eligibility: ['10+2 with Mathematics'], fees: '₹70,000 - ₹3,00,000 / year' },
    { name: 'BCA Cyber Security', duration: '3 Years', eligibility: ['10+2 with Mathematics'], fees: '₹70,000 - ₹3,00,000 / year' },
    { name: 'BCA Data Analytics', duration: '3 Years', eligibility: ['10+2 with Mathematics'], fees: '₹70,000 - ₹3,00,000 / year' },
    { name: 'M.Sc Physics', duration: '2 Years', eligibility: ['B.Sc Physics'], fees: '₹25,000 - ₹2,80,000 / year' },
    { name: 'M.Sc Chemistry', duration: '2 Years', eligibility: ['B.Sc Chemistry'], fees: '₹25,000 - ₹2,80,000 / year' },
    { name: 'M.Sc Mathematics', duration: '2 Years', eligibility: ['B.Sc Mathematics'], fees: '₹25,000 - ₹2,80,000 / year' },
    { name: 'M.Sc Statistics', duration: '2 Years', eligibility: ['B.Sc Statistics/Math'], fees: '₹30,000 - ₹3,00,000 / year' },
    { name: 'M.Sc Biology', duration: '2 Years', eligibility: ['B.Sc Biology'], fees: '₹30,000 - ₹2,80,000 / year' },
    { name: 'M.Sc Botany', duration: '2 Years', eligibility: ['B.Sc Botany'], fees: '₹25,000 - ₹2,50,000 / year' },
    { name: 'M.Sc Zoology', duration: '2 Years', eligibility: ['B.Sc Zoology'], fees: '₹25,000 - ₹2,50,000 / year' },
    { name: 'M.Sc Microbiology', duration: '2 Years', eligibility: ['B.Sc Microbiology'], fees: '₹50,000 - ₹3,50,000 / year' },
    { name: 'M.Sc Biochemistry', duration: '2 Years', eligibility: ['B.Sc Biochemistry'], fees: '₹50,000 - ₹3,50,000 / year' },
    { name: 'M.Sc Biotechnology', duration: '2 Years', eligibility: ['B.Sc with Biology'], fees: '₹40,000 - ₹3,50,000 / year' },
    { name: 'M.Sc Genetics', duration: '2 Years', eligibility: ['B.Sc Biology'], fees: '₹50,000 - ₹3,50,000 / year' },
    { name: 'M.Sc Environmental Science', duration: '2 Years', eligibility: ['B.Sc Env Sci'], fees: '₹40,000 - ₹3,00,000 / year' },
    { name: 'M.Sc Forensic Science', duration: '2 Years', eligibility: ['B.Sc Forensic'], fees: '₹60,000 - ₹3,80,000 / year' },
    { name: 'M.Sc Computer Science', duration: '2 Years', eligibility: ['B.Sc / BCA'], fees: '₹50,000 - ₹3,00,000 / year' },
    { name: 'M.Sc Data Science', duration: '2 Years', eligibility: ['Bachelor degree'], fees: '₹80,000 - ₹4,00,000 / year' },
    { name: 'M.Sc Artificial Intelligence', duration: '2 Years', eligibility: ['Bachelor degree'], fees: '₹1,00,000 - ₹4,50,000 / year' },
    { name: 'MCA (Master of Computer Applications)', duration: '2 Years', eligibility: ['Bachelor with Mathematics'], fees: '₹60,000 - ₹3,00,000 / year' },
    { name: 'MCA Cyber Security', duration: '2 Years', eligibility: ['Bachelor with Mathematics'], fees: '₹70,000 - ₹3,50,000 / year' },
    { name: 'MCA Cloud Computing', duration: '2 Years', eligibility: ['Bachelor with Mathematics'], fees: '₹70,000 - ₹3,50,000 / year' },
    { name: 'PhD Physics', duration: '3-5 Years', eligibility: ['M.Sc Physics'], fees: '₹20,000 - ₹2,00,000 / year' },
    { name: 'PhD Chemistry', duration: '3-5 Years', eligibility: ['M.Sc Chemistry'], fees: '₹20,000 - ₹2,00,000 / year' },
    { name: 'PhD Mathematics', duration: '3-5 Years', eligibility: ['M.Sc Mathematics'], fees: '₹20,000 - ₹2,00,000 / year' },
    { name: 'PhD Computer Science', duration: '3-5 Years', eligibility: ['M.Tech / M.Sc CS'], fees: '₹25,000 - ₹2,50,000 / year' },
    { name: 'PhD Engineering', duration: '3-5 Years', eligibility: ['M.Tech'], fees: '₹25,000 - ₹2,50,000 / year' },
    { name: 'PhD Management', duration: '3-5 Years', eligibility: ['MBA'], fees: '₹50,000 - ₹4,00,000 / year' },
    { name: 'PhD Medicine', duration: '3-5 Years', eligibility: ['MD/MS'], fees: '₹50,000 - ₹4,00,000 / year' },
    { name: 'PhD (Doctor of Philosophy)', duration: '3-5 Years', eligibility: ['Master degree'], fees: '₹20,000 - ₹2,00,000 / year' },
  ],

  Arts: [
    { name: 'BA (Bachelor of Arts)', duration: '3 Years', eligibility: ['10+2 in any stream'], fees: '₹15,000 - ₹2,50,000 / year' },
    { name: 'BA English Literature', duration: '3 Years', eligibility: ['10+2'], fees: '₹15,000 - ₹2,50,000 / year' },
    { name: 'BA Hindi Literature', duration: '3 Years', eligibility: ['10+2'], fees: '₹10,000 - ₹2,00,000 / year' },
    { name: 'BA History', duration: '3 Years', eligibility: ['10+2'], fees: '₹15,000 - ₹2,50,000 / year' },
    { name: 'BA Political Science', duration: '3 Years', eligibility: ['10+2'], fees: '₹15,000 - ₹2,50,000 / year' },
    { name: 'BA Sociology', duration: '3 Years', eligibility: ['10+2'], fees: '₹15,000 - ₹2,50,000 / year' },
    { name: 'BA Anthropology', duration: '3 Years', eligibility: ['10+2'], fees: '₹15,000 - ₹2,50,000 / year' },
    { name: 'BA Geography', duration: '3 Years', eligibility: ['10+2'], fees: '₹15,000 - ₹2,50,000 / year' },
    { name: 'BA Psychology', duration: '3 Years', eligibility: ['10+2'], fees: '₹25,000 - ₹3,00,000 / year' },
    { name: 'BA Philosophy', duration: '3 Years', eligibility: ['10+2'], fees: '₹15,000 - ₹2,30,000 / year' },
    { name: 'BA Economics', duration: '3 Years', eligibility: ['10+2'], fees: '₹25,000 - ₹3,00,000 / year' },
    { name: 'BA Public Administration', duration: '3 Years', eligibility: ['10+2'], fees: '₹15,000 - ₹2,50,000 / year' },
    { name: 'BA Sanskrit', duration: '3 Years', eligibility: ['10+2'], fees: '₹10,000 - ₹1,80,000 / year' },
    { name: 'BA Urdu', duration: '3 Years', eligibility: ['10+2'], fees: '₹10,000 - ₹1,80,000 / year' },
    { name: 'BA Bengali', duration: '3 Years', eligibility: ['10+2'], fees: '₹10,000 - ₹1,80,000 / year' },
    { name: 'BA Tamil', duration: '3 Years', eligibility: ['10+2'], fees: '₹10,000 - ₹1,80,000 / year' },
    { name: 'BA Telugu', duration: '3 Years', eligibility: ['10+2'], fees: '₹10,000 - ₹1,80,000 / year' },
    { name: 'BA Marathi', duration: '3 Years', eligibility: ['10+2'], fees: '₹10,000 - ₹1,80,000 / year' },
    { name: 'BA Kannada', duration: '3 Years', eligibility: ['10+2'], fees: '₹10,000 - ₹1,80,000 / year' },
    { name: 'BA Malayalam', duration: '3 Years', eligibility: ['10+2'], fees: '₹10,000 - ₹1,80,000 / year' },
    { name: 'BA Journalism and Mass Communication', duration: '3 Years', eligibility: ['10+2'], fees: '₹50,000 - ₹3,50,000 / year' },
    { name: 'BA International Relations', duration: '3 Years', eligibility: ['10+2'], fees: '₹50,000 - ₹3,50,000 / year' },
    { name: 'BA Performing Arts', duration: '3 Years', eligibility: ['10+2'], fees: '₹50,000 - ₹3,00,000 / year' },
    { name: 'BA Music', duration: '3 Years', eligibility: ['10+2'], fees: '₹40,000 - ₹2,80,000 / year' },
    { name: 'BA Dance', duration: '3 Years', eligibility: ['10+2'], fees: '₹40,000 - ₹2,80,000 / year' },
    { name: 'BA Theatre Arts', duration: '3 Years', eligibility: ['10+2'], fees: '₹50,000 - ₹3,00,000 / year' },
    { name: 'MA (Master of Arts)', duration: '2 Years', eligibility: ['Bachelor degree'], fees: '₹15,000 - ₹2,00,000 / year' },
    { name: 'MA English', duration: '2 Years', eligibility: ['BA English'], fees: '₹15,000 - ₹2,00,000 / year' },
    { name: 'MA Hindi', duration: '2 Years', eligibility: ['BA Hindi'], fees: '₹10,000 - ₹1,80,000 / year' },
    { name: 'MA History', duration: '2 Years', eligibility: ['BA History'], fees: '₹15,000 - ₹2,00,000 / year' },
    { name: 'MA Political Science', duration: '2 Years', eligibility: ['BA'], fees: '₹15,000 - ₹2,00,000 / year' },
    { name: 'MA Sociology', duration: '2 Years', eligibility: ['BA'], fees: '₹15,000 - ₹2,00,000 / year' },
    { name: 'MA Psychology', duration: '2 Years', eligibility: ['BA Psychology'], fees: '₹20,000 - ₹2,50,000 / year' },
    { name: 'MA Economics', duration: '2 Years', eligibility: ['BA Economics'], fees: '₹20,000 - ₹2,50,000 / year' },
    { name: 'MA Geography', duration: '2 Years', eligibility: ['BA Geography'], fees: '₹15,000 - ₹2,00,000 / year' },
    { name: 'MA Philosophy', duration: '2 Years', eligibility: ['BA'], fees: '₹15,000 - ₹2,00,000 / year' },
    { name: 'MA Public Administration', duration: '2 Years', eligibility: ['BA'], fees: '₹15,000 - ₹2,00,000 / year' },
    { name: 'MA Journalism and Mass Communication', duration: '2 Years', eligibility: ['Bachelor'], fees: '₹50,000 - ₹3,50,000 / year' },
    { name: 'MA International Relations', duration: '2 Years', eligibility: ['Bachelor'], fees: '₹50,000 - ₹3,50,000 / year' },
    { name: 'MA Anthropology', duration: '2 Years', eligibility: ['BA'], fees: '₹15,000 - ₹2,00,000 / year' },
    { name: 'BSW (Bachelor of Social Work)', duration: '3 Years', eligibility: ['10+2'], fees: '₹30,000 - ₹2,00,000 / year' },
    { name: 'MSW (Master of Social Work)', duration: '2 Years', eligibility: ['Bachelor degree'], fees: '₹40,000 - ₹2,50,000 / year' },
    { name: 'MA Linguistics', duration: '2 Years', eligibility: ['BA'], fees: '₹20,000 - ₹2,30,000 / year' },
  ],

  Design: [
    { name: 'B.Des (Bachelor of Design)', duration: '4 Years', eligibility: ['10+2', 'NIFT/NID/UCEED'], fees: '₹3,50,000 - ₹14,00,000 / year' },
    { name: 'B.Des Fashion Design', duration: '4 Years', eligibility: ['10+2', 'NIFT'], fees: '₹3,30,000 - ₹14,00,000 / year' },
    { name: 'B.Des Industrial Design', duration: '4 Years', eligibility: ['10+2', 'NID/UCEED'], fees: '₹3,50,000 - ₹14,00,000 / year' },
    { name: 'B.Des Communication Design', duration: '4 Years', eligibility: ['10+2', 'NID/UCEED'], fees: '₹3,50,000 - ₹14,00,000 / year' },
    { name: 'B.Des Graphic Design', duration: '4 Years', eligibility: ['10+2'], fees: '₹3,00,000 - ₹12,00,000 / year' },
    { name: 'B.Des UI/UX Design', duration: '4 Years', eligibility: ['10+2'], fees: '₹3,50,000 - ₹14,00,000 / year' },
    { name: 'B.Des Product Design', duration: '4 Years', eligibility: ['10+2'], fees: '₹3,50,000 - ₹14,00,000 / year' },
    { name: 'B.Des Interior Design', duration: '4 Years', eligibility: ['10+2'], fees: '₹3,00,000 - ₹13,00,000 / year' },
    { name: 'B.Des Animation and VFX', duration: '4 Years', eligibility: ['10+2'], fees: '₹3,50,000 - ₹13,50,000 / year' },
    { name: 'B.Des Game Design', duration: '4 Years', eligibility: ['10+2'], fees: '₹3,80,000 - ₹14,00,000 / year' },
    { name: 'B.Des Textile Design', duration: '4 Years', eligibility: ['10+2'], fees: '₹3,30,000 - ₹13,00,000 / year' },
    { name: 'B.Des Jewelry Design', duration: '4 Years', eligibility: ['10+2'], fees: '₹3,30,000 - ₹13,00,000 / year' },
    { name: 'B.Des Furniture and Interior Design', duration: '4 Years', eligibility: ['10+2'], fees: '₹3,30,000 - ₹13,00,000 / year' },
    { name: 'B.Des Automobile Design', duration: '4 Years', eligibility: ['10+2'], fees: '₹3,80,000 - ₹14,00,000 / year' },
    { name: 'BFA (Bachelor of Fine Arts)', duration: '4 Years', eligibility: ['10+2'], fees: '₹50,000 - ₹4,00,000 / year' },
    { name: 'BFA Painting', duration: '4 Years', eligibility: ['10+2'], fees: '₹50,000 - ₹3,80,000 / year' },
    { name: 'BFA Sculpture', duration: '4 Years', eligibility: ['10+2'], fees: '₹50,000 - ₹3,80,000 / year' },
    { name: 'BFA Applied Arts', duration: '4 Years', eligibility: ['10+2'], fees: '₹60,000 - ₹4,20,000 / year' },
    { name: 'BFA Photography', duration: '4 Years', eligibility: ['10+2'], fees: '₹80,000 - ₹4,50,000 / year' },
    { name: 'M.Des (Master of Design)', duration: '2 Years', eligibility: ['Bachelor in Design/Arch'], fees: '₹3,00,000 - ₹12,00,000 / year' },
    { name: 'M.Des Industrial Design', duration: '2 Years', eligibility: ['Bachelor degree'], fees: '₹3,30,000 - ₹12,00,000 / year' },
    { name: 'M.Des Visual Communication', duration: '2 Years', eligibility: ['Bachelor degree'], fees: '₹3,00,000 - ₹11,50,000 / year' },
    { name: 'M.Des Interaction Design', duration: '2 Years', eligibility: ['Bachelor degree'], fees: '₹3,50,000 - ₹12,50,000 / year' },
    { name: 'MFA (Master of Fine Arts)', duration: '2 Years', eligibility: ['BFA'], fees: '₹50,000 - ₹3,50,000 / year' },
  ],

  Education: [
    { name: 'B.Ed (Bachelor of Education)', duration: '2 Years', eligibility: ['Bachelor degree'], fees: '₹40,000 - ₹2,00,000 / year' },
    { name: 'B.Ed English', duration: '2 Years', eligibility: ['BA English / Bachelor'], fees: '₹40,000 - ₹2,00,000 / year' },
    { name: 'B.Ed Mathematics', duration: '2 Years', eligibility: ['B.Sc Math / Bachelor'], fees: '₹40,000 - ₹2,00,000 / year' },
    { name: 'B.Ed Science', duration: '2 Years', eligibility: ['B.Sc / Bachelor'], fees: '₹40,000 - ₹2,00,000 / year' },
    { name: 'B.Ed Social Studies', duration: '2 Years', eligibility: ['Bachelor'], fees: '₹40,000 - ₹2,00,000 / year' },
    { name: 'B.Ed Special Education', duration: '2 Years', eligibility: ['Bachelor'], fees: '₹50,000 - ₹2,50,000 / year' },
    { name: 'M.Ed (Master of Education)', duration: '2 Years', eligibility: ['B.Ed'], fees: '₹30,000 - ₹1,80,000 / year' },
    { name: 'M.Ed Educational Psychology', duration: '2 Years', eligibility: ['B.Ed'], fees: '₹35,000 - ₹2,00,000 / year' },
    { name: 'M.Ed Educational Administration', duration: '2 Years', eligibility: ['B.Ed'], fees: '₹35,000 - ₹2,00,000 / year' },
    { name: 'B.P.Ed (Bachelor of Physical Education)', duration: '2 Years', eligibility: ['Bachelor degree'], fees: '₹40,000 - ₹1,50,000 / year' },
    { name: 'M.P.Ed (Master of Physical Education)', duration: '2 Years', eligibility: ['B.P.Ed'], fees: '₹40,000 - ₹1,80,000 / year' },
    { name: 'D.El.Ed (Diploma in Elementary Education)', duration: '2 Years', eligibility: ['10+2'], fees: '₹25,000 - ₹1,00,000 / year' },
    { name: 'BTC (Basic Training Certificate)', duration: '2 Years', eligibility: ['10+2'], fees: '₹20,000 - ₹80,000 / year' },
    { name: 'BA B.Ed (Integrated)', duration: '4 Years', eligibility: ['10+2'], fees: '₹50,000 - ₹2,80,000 / year' },
    { name: 'B.Sc B.Ed (Integrated)', duration: '4 Years', eligibility: ['10+2 with Science'], fees: '₹50,000 - ₹3,00,000 / year' },
  ],

  Agriculture: [
    { name: 'B.Sc Agriculture', duration: '4 Years', eligibility: ['10+2 with PCB/PCM'], fees: '₹40,000 - ₹2,50,000 / year' },
    { name: 'B.Sc Agriculture (Honours)', duration: '4 Years', eligibility: ['10+2 with PCB/PCM'], fees: '₹50,000 - ₹2,80,000 / year' },
    { name: 'B.Sc Horticulture', duration: '4 Years', eligibility: ['10+2 with PCB/PCM'], fees: '₹40,000 - ₹2,50,000 / year' },
    { name: 'B.Sc Forestry', duration: '4 Years', eligibility: ['10+2 with PCB/PCM'], fees: '₹40,000 - ₹2,00,000 / year' },
    { name: 'B.Sc Fisheries Science', duration: '4 Years', eligibility: ['10+2 with PCB'], fees: '₹40,000 - ₹2,00,000 / year' },
    { name: 'B.Sc Dairy Technology', duration: '4 Years', eligibility: ['10+2 with PCB/PCM'], fees: '₹40,000 - ₹2,30,000 / year' },
    { name: 'B.Sc Sericulture', duration: '3-4 Years', eligibility: ['10+2'], fees: '₹30,000 - ₹1,80,000 / year' },
    { name: 'B.Sc Agricultural Engineering', duration: '4 Years', eligibility: ['10+2 with PCM'], fees: '₹50,000 - ₹2,80,000 / year' },
    { name: 'B.V.Sc (Bachelor of Veterinary Science)', duration: '5 Years', eligibility: ['10+2 with PCB'], fees: '₹40,000 - ₹3,00,000 / year' },
    { name: 'M.Sc Agriculture', duration: '2 Years', eligibility: ['B.Sc Agriculture'], fees: '₹40,000 - ₹2,50,000 / year' },
    { name: 'M.Sc Horticulture', duration: '2 Years', eligibility: ['B.Sc Horticulture'], fees: '₹40,000 - ₹2,50,000 / year' },
    { name: 'M.Sc Forestry', duration: '2 Years', eligibility: ['B.Sc Forestry'], fees: '₹40,000 - ₹2,30,000 / year' },
    { name: 'M.Sc Soil Science', duration: '2 Years', eligibility: ['B.Sc Agriculture'], fees: '₹35,000 - ₹2,30,000 / year' },
    { name: 'M.Sc Plant Pathology', duration: '2 Years', eligibility: ['B.Sc Agriculture'], fees: '₹35,000 - ₹2,30,000 / year' },
    { name: 'M.V.Sc Veterinary Surgery', duration: '2 Years', eligibility: ['B.V.Sc'], fees: '₹50,000 - ₹3,00,000 / year' },
  ],

  Hospitality: [
    { name: 'B.Sc Hospitality and Hotel Administration', duration: '3 Years', eligibility: ['10+2'], fees: '₹80,000 - ₹4,50,000 / year' },
    { name: 'BA Culinary Arts', duration: '3 Years', eligibility: ['10+2'], fees: '₹80,000 - ₹4,50,000 / year' },
    { name: 'B.Sc Tourism and Travel Management', duration: '3 Years', eligibility: ['10+2'], fees: '₹60,000 - ₹3,80,000 / year' },
    { name: 'B.Sc Aviation and Hospitality', duration: '3 Years', eligibility: ['10+2'], fees: '₹1,20,000 - ₹5,50,000 / year' },
    { name: 'M.Sc Hotel Management', duration: '2 Years', eligibility: ['Bachelor in Hospitality'], fees: '₹1,20,000 - ₹5,00,000 / year' },
    { name: 'M.Sc Tourism Management', duration: '2 Years', eligibility: ['Bachelor degree'], fees: '₹80,000 - ₹4,00,000 / year' },
  ],

  Aviation: [
    { name: 'B.Sc Aviation', duration: '3 Years', eligibility: ['10+2 with PCM'], fees: '₹2,00,000 - ₹6,00,000 / year' },
    { name: 'B.Sc Aeronautical Science', duration: '3 Years', eligibility: ['10+2 with PCM'], fees: '₹2,50,000 - ₹6,00,000 / year' },
    { name: 'BBA Aviation Operations', duration: '3 Years', eligibility: ['10+2'], fees: '₹2,00,000 - ₹6,00,000 / year' },
    { name: 'Diploma in Aviation Hospitality', duration: '1 Year', eligibility: ['10+2'], fees: '₹80,000 - ₹2,50,000 / year' },
    { name: 'Diploma in Cabin Crew Training', duration: '1 Year', eligibility: ['10+2'], fees: '₹80,000 - ₹2,50,000 / year' },
    { name: 'Commercial Pilot License (CPL)', duration: '2 Years', eligibility: ['10+2 with PCM'], fees: '₹35,00,000 - ₹50,00,000 total' },
  ],

  Diploma: [
    { name: 'Diploma in Civil Engineering', duration: '3 Years', eligibility: ['10th'], fees: '₹15,000 - ₹50,000 / year' },
    { name: 'Diploma in Mechanical Engineering', duration: '3 Years', eligibility: ['10th'], fees: '₹15,000 - ₹50,000 / year' },
    { name: 'Diploma in Electrical Engineering', duration: '3 Years', eligibility: ['10th'], fees: '₹15,000 - ₹50,000 / year' },
    { name: 'Diploma in Computer Engineering', duration: '3 Years', eligibility: ['10th'], fees: '₹20,000 - ₹60,000 / year' },
    { name: 'Diploma in Electronics and Communication', duration: '3 Years', eligibility: ['10th'], fees: '₹18,000 - ₹55,000 / year' },
    { name: 'Diploma in Information Technology', duration: '3 Years', eligibility: ['10th'], fees: '₹20,000 - ₹60,000 / year' },
    { name: 'Diploma in Automobile Engineering', duration: '3 Years', eligibility: ['10th'], fees: '₹15,000 - ₹50,000 / year' },
    { name: 'Diploma in Chemical Engineering', duration: '3 Years', eligibility: ['10th'], fees: '₹15,000 - ₹55,000 / year' },
    { name: 'Diploma in Hotel Management', duration: '3 Years', eligibility: ['10+2'], fees: '₹50,000 - ₹2,50,000 / year' },
    { name: 'Diploma in Computer Applications (DCA)', duration: '1 Year', eligibility: ['10+2'], fees: '₹15,000 - ₹50,000 / year' },
    { name: 'Diploma in Web Design', duration: '6 Months - 1 Year', eligibility: ['10+2'], fees: '₹20,000 - ₹60,000 / year' },
    { name: 'Diploma in Digital Marketing', duration: '6 Months - 1 Year', eligibility: ['10+2'], fees: '₹25,000 - ₹80,000 / year' },
    { name: 'Diploma in Architecture', duration: '3 Years', eligibility: ['10+2 with Math'], fees: '₹40,000 - ₹1,50,000 / year' },
    { name: 'Diploma in Interior Design', duration: '3 Years', eligibility: ['10+2'], fees: '₹50,000 - ₹2,00,000 / year' },
    { name: 'Diploma in Fashion Design', duration: '3 Years', eligibility: ['10+2'], fees: '₹60,000 - ₹2,50,000 / year' },
    { name: 'Diploma in Animation', duration: '1-2 Years', eligibility: ['10+2'], fees: '₹50,000 - ₹2,00,000 / year' },
    { name: 'Diploma in Multimedia', duration: '1-2 Years', eligibility: ['10+2'], fees: '₹50,000 - ₹2,00,000 / year' },
    { name: 'PG Diploma in Management', duration: '1 Year', eligibility: ['Bachelor'], fees: '₹50,000 - ₹3,00,000 / year' },
    { name: 'PG Diploma in Computer Applications', duration: '1 Year', eligibility: ['Bachelor'], fees: '₹30,000 - ₹1,50,000 / year' },
    { name: 'PG Diploma in Hospital Administration', duration: '1 Year', eligibility: ['Bachelor'], fees: '₹50,000 - ₹2,50,000 / year' },
    { name: 'PG Diploma in Public Relations', duration: '1 Year', eligibility: ['Bachelor'], fees: '₹50,000 - ₹2,50,000 / year' },
    { name: 'PG Diploma in Journalism', duration: '1 Year', eligibility: ['Bachelor'], fees: '₹50,000 - ₹2,50,000 / year' },
  ],
};

// === STREAM-COURSE MAPPING for college type ===
function getCoursesForCollege(name: string, country?: string): { stream: string; courseName: string }[] {
  const lower = name.toLowerCase();
  const result: { stream: string; courseName: string }[] = [];

  if (country && country !== 'India') {
    // International colleges - subject of "Engineering", "Management", "Medical" depending on type
    if (lower.includes('institute of technology') || lower.includes('mit') || lower.includes('caltech') ||
        lower.includes('imperial') || lower.includes('georgia tech') || lower.includes('tum ')) {
      // Engineering institute - all engineering + science + some MBA
      COURSES.Engineering.forEach(c => result.push({ stream: 'Engineering', courseName: c.name }));
      COURSES.Science.slice(0, 25).forEach(c => result.push({ stream: 'Science', courseName: c.name }));
      ['MBA (Master of Business Administration)', 'MBA Finance', 'PGDM (Post Graduate Diploma in Management)']
        .forEach(n => result.push({ stream: 'Management', courseName: n }));
    } else if (lower.includes('business school') || lower.includes('insead') || lower.includes('hec ')) {
      COURSES.Management.forEach(c => result.push({ stream: 'Management', courseName: c.name }));
      ['BBA (Bachelor of Business Administration)', 'BBA Finance', 'BBA Marketing', 'BBA International Business']
        .forEach(n => result.push({ stream: 'Management', courseName: n }));
    } else if (lower.includes('medical') || lower.includes('school of medicine')) {
      COURSES.Medical.slice(0, 30).forEach(c => result.push({ stream: 'Medical', courseName: c.name }));
    } else if (lower.includes('law school')) {
      COURSES.Law.forEach(c => result.push({ stream: 'Law', courseName: c.name }));
    } else {
      // General University - wide range
      COURSES.Engineering.slice(0, 20).forEach(c => result.push({ stream: 'Engineering', courseName: c.name }));
      COURSES.Management.slice(0, 12).forEach(c => result.push({ stream: 'Management', courseName: c.name }));
      COURSES.Science.slice(0, 25).forEach(c => result.push({ stream: 'Science', courseName: c.name }));
      COURSES.Arts.slice(0, 20).forEach(c => result.push({ stream: 'Arts', courseName: c.name }));
      COURSES.Commerce.slice(0, 8).forEach(c => result.push({ stream: 'Commerce', courseName: c.name }));
      COURSES.Law.slice(0, 8).forEach(c => result.push({ stream: 'Law', courseName: c.name }));
    }
    return result;
  }

  // ============ INDIAN COLLEGES ============

  if (lower.includes('iit ') || lower.startsWith('iit') || lower.includes('indian institute of technology')) {
    // IITs offer most of engineering + some science + management
    COURSES.Engineering.forEach(c => result.push({ stream: 'Engineering', courseName: c.name }));
    ['B.Sc Physics', 'B.Sc Chemistry', 'B.Sc Mathematics', 'M.Sc Physics', 'M.Sc Chemistry',
     'M.Sc Mathematics', 'M.Sc Statistics', 'M.Sc Computer Science', 'M.Sc Data Science',
     'PhD Physics', 'PhD Chemistry', 'PhD Mathematics', 'PhD Computer Science', 'PhD Engineering']
      .forEach(n => result.push({ stream: 'Science', courseName: n }));
    ['MBA (Master of Business Administration)', 'MBA Finance', 'MBA Operations Management',
     'PhD Management'].forEach(n => result.push({ stream: 'Management', courseName: n }));
    return result;
  }

  if (lower.includes('iit ') || lower.includes('iiit') || lower.includes('indian institute of information technology')) {
    // IIITs - heavy engineering focus
    COURSES.Engineering.filter(c =>
      c.name.includes('Computer') || c.name.includes('Information') || c.name.includes('Electronics') ||
      c.name.includes('AI') || c.name.includes('Data') || c.name.includes('Software') || c.name.includes('Cyber') ||
      c.name.includes('VLSI') || c.name.includes('Cloud') || c.name.includes('IoT')
    ).forEach(c => result.push({ stream: 'Engineering', courseName: c.name }));
    return result;
  }

  if (lower.includes('nit ') || lower.startsWith('nit') || lower.includes('national institute of technology')) {
    COURSES.Engineering.forEach(c => result.push({ stream: 'Engineering', courseName: c.name }));
    ['MBA (Master of Business Administration)', 'PhD Engineering'].forEach(n => result.push({ stream: 'Management', courseName: n }));
    return result;
  }

  if (lower.includes('iim ') || lower.startsWith('iim') || lower.includes('indian institute of management')) {
    COURSES.Management.forEach(c => result.push({ stream: 'Management', courseName: c.name }));
    ['PhD Management'].forEach(n => result.push({ stream: 'Science', courseName: n }));
    return result;
  }

  if (lower.includes('aiims') || lower.includes('all india institute of medical')) {
    COURSES.Medical.forEach(c => result.push({ stream: 'Medical', courseName: c.name }));
    ['PhD Medicine'].forEach(n => result.push({ stream: 'Science', courseName: n }));
    return result;
  }

  if (lower.includes('nlu') || lower.includes('national law')) {
    COURSES.Law.forEach(c => result.push({ stream: 'Law', courseName: c.name }));
    return result;
  }

  if (lower.includes('nift') || lower.includes('national institute of fashion')) {
    COURSES.Design.filter(c => c.name.toLowerCase().includes('fashion') || c.name === 'B.Des (Bachelor of Design)' || c.name.includes('Textile') || c.name.includes('Jewelry'))
      .forEach(c => result.push({ stream: 'Design', courseName: c.name }));
    ['M.Des (Master of Design)', 'M.Des Visual Communication'].forEach(n => result.push({ stream: 'Design', courseName: n }));
    return result;
  }

  if (lower.includes('nid') || lower.includes('national institute of design')) {
    COURSES.Design.forEach(c => result.push({ stream: 'Design', courseName: c.name }));
    return result;
  }

  if (lower.includes('pharmacy') || lower.includes('college of pharmaceutical')) {
    COURSES.Pharmacy.forEach(c => result.push({ stream: 'Pharmacy', courseName: c.name }));
    return result;
  }

  if (lower.includes('nursing')) {
    ['B.Sc Nursing', 'GNM (General Nursing and Midwifery)', 'ANM (Auxiliary Nurse Midwifery)',
     'M.Sc Nursing', 'Post Basic B.Sc Nursing'].forEach(n => result.push({ stream: 'Medical', courseName: n }));
    return result;
  }

  if (lower.includes('dental')) {
    ['BDS (Bachelor of Dental Surgery)', 'MDS Orthodontics', 'MDS Periodontics',
     'MDS Conservative Dentistry', 'MDS Oral and Maxillofacial Surgery', 'MDS Pediatric Dentistry',
     'MDS Prosthodontics', 'MDS Public Health Dentistry'].forEach(n => result.push({ stream: 'Medical', courseName: n }));
    return result;
  }

  if (lower.includes('ayurveda') || lower.includes('ayurvedic')) {
    ['BAMS (Bachelor of Ayurvedic Medicine and Surgery)'].forEach(n => result.push({ stream: 'Medical', courseName: n }));
    return result;
  }

  if (lower.includes('homoeopath') || lower.includes('homeopath')) {
    ['BHMS (Bachelor of Homoeopathic Medicine and Surgery)'].forEach(n => result.push({ stream: 'Medical', courseName: n }));
    return result;
  }

  if (lower.includes('medical college') || lower.includes('medical sciences')) {
    COURSES.Medical.slice(0, 30).forEach(c => result.push({ stream: 'Medical', courseName: c.name }));
    COURSES.Pharmacy.slice(0, 4).forEach(c => result.push({ stream: 'Pharmacy', courseName: c.name }));
    return result;
  }

  if (lower.includes('polytechnic')) {
    COURSES.Diploma.filter(c => c.name.includes('Engineering') || c.name.includes('Computer') || c.name.includes('Architecture'))
      .forEach(c => result.push({ stream: 'Engineering', courseName: c.name }));
    return result;
  }

  if (lower.includes('hotel management') || lower.includes('hotel administration') ||
      lower.includes('hospitality') || lower.includes('catering')) {
    COURSES.Hospitality.forEach(c => result.push({ stream: 'Management', courseName: c.name }));
    ['BHM (Bachelor of Hotel Management)', 'BHMCT (Hotel Management and Catering Technology)']
      .forEach(n => result.push({ stream: 'Management', courseName: n }));
    return result;
  }

  if (lower.includes('aviation') || lower.includes('aeronautic')) {
    COURSES.Aviation.forEach(c => result.push({ stream: 'Engineering', courseName: c.name }));
    return result;
  }

  if (lower.includes('engineering') || lower.includes('institute of technology') || lower.includes('technical')) {
    COURSES.Engineering.slice(0, 35).forEach(c => result.push({ stream: 'Engineering', courseName: c.name }));
    ['MBA (Master of Business Administration)', 'BBA (Bachelor of Business Administration)']
      .forEach(n => result.push({ stream: 'Management', courseName: n }));
    return result;
  }

  if (lower.includes('management') || lower.includes('business school')) {
    COURSES.Management.forEach(c => result.push({ stream: 'Management', courseName: c.name }));
    return result;
  }

  if (lower.includes('agricultural') || lower.includes('agriculture')) {
    COURSES.Agriculture.forEach(c => result.push({ stream: 'Agriculture', courseName: c.name }));
    return result;
  }

  if (lower.includes('education') || lower.includes('b.ed') || lower.includes('teacher training')) {
    COURSES.Education.forEach(c => result.push({ stream: 'Education', courseName: c.name }));
    return result;
  }

  if (lower.includes('university') || lower.includes('vishwavidyalaya') || lower.includes('vidyapith')) {
    // Big universities offer wide range
    COURSES.Engineering.slice(0, 20).forEach(c => result.push({ stream: 'Engineering', courseName: c.name }));
    COURSES.Management.slice(0, 12).forEach(c => result.push({ stream: 'Management', courseName: c.name }));
    COURSES.Science.slice(0, 30).forEach(c => result.push({ stream: 'Science', courseName: c.name }));
    COURSES.Arts.slice(0, 25).forEach(c => result.push({ stream: 'Arts', courseName: c.name }));
    COURSES.Commerce.slice(0, 10).forEach(c => result.push({ stream: 'Commerce', courseName: c.name }));
    COURSES.Law.slice(0, 8).forEach(c => result.push({ stream: 'Law', courseName: c.name }));
    COURSES.Education.slice(0, 8).forEach(c => result.push({ stream: 'Education', courseName: c.name }));
    return result;
  }

  if (lower.includes('arts') || lower.includes('science') || lower.includes('commerce') || lower.includes('college')) {
    COURSES.Arts.slice(0, 20).forEach(c => result.push({ stream: 'Arts', courseName: c.name }));
    COURSES.Science.slice(0, 20).forEach(c => result.push({ stream: 'Science', courseName: c.name }));
    COURSES.Commerce.slice(0, 8).forEach(c => result.push({ stream: 'Commerce', courseName: c.name }));
    ['BBA (Bachelor of Business Administration)', 'BBA Finance', 'BBA Marketing']
      .forEach(n => result.push({ stream: 'Management', courseName: n }));
    return result;
  }

  // Default
  ['BA (Bachelor of Arts)', 'B.Com (Bachelor of Commerce)', 'BBA (Bachelor of Business Administration)']
    .forEach(n => result.push({ stream: 'Arts', courseName: n }));
  return result;
}

// Tier-based fee adjustment
function getCollegeTier(name: string, country?: string): string {
  const lower = name.toLowerCase();
  if (country && country !== 'India') {
    if (['harvard','yale','princeton','mit','stanford','columbia','penn','dartmouth','brown','cornell','caltech','chicago','oxford','cambridge','imperial','insead','northwestern','duke','johns hopkins'].some(s => lower.includes(s))) return 'IvyLeague';
    if (lower.includes('university')) return 'TopIntl';
    return 'Intl';
  }
  if (lower.includes('iit ') || lower.startsWith('iit')) return 'IIT';
  if (lower.includes('iim ') || lower.startsWith('iim')) return 'IIM';
  if (lower.includes('aiims')) return 'AIIMS';
  if (lower.includes('iiit')) return 'IIIT';
  if (lower.includes('nit ') || lower.startsWith('nit')) return 'NIT';
  if (lower.includes('bits ')) return 'BITS';
  if (lower.includes('nlu') || lower.includes('national law')) return 'NLU';
  if (lower.includes('nift') || lower.includes('nid ')) return 'NIFT';
  if (['vit ','manipal','srm ','amity','lpu','lovely professional','thapar','shiv nadar','ashoka','bennett','jindal global'].some(s => lower.includes(s))) return 'TopPrivate';
  if (lower.includes('government') || lower.includes('govt')) return 'Government';
  if (lower.includes('polytechnic')) return 'Polytechnic';
  return 'Private';
}

function getFeeForCourse(tier: string, courseName: string, defaultFee: string): string {
  const cn = courseName.toLowerCase();
  if (tier === 'IIT') {
    if (cn.startsWith('b.tech') || cn.startsWith('b.arch')) return '₹2,09,550 / year';
    if (cn.startsWith('m.tech')) return '₹50,000 - ₹1,00,000 / year';
    if (cn.includes('mba')) return '₹14,00,000 - ₹25,00,000 / year';
    if (cn.includes('phd')) return '₹50,000 / year (with stipend)';
    if (cn.startsWith('m.sc')) return '₹50,000 / year';
  }
  if (tier === 'IIM') {
    if (cn.includes('mba') || cn.includes('pgdm')) return '₹14,00,000 - ₹25,00,000 / year';
    if (cn.includes('executive')) return '₹25,00,000 - ₹35,00,000 / year';
  }
  if (tier === 'AIIMS') {
    if (cn.includes('mbbs')) return '₹1,628 - ₹6,000 / year';
    if (cn.includes('nursing')) return '₹8,000 - ₹15,000 / year';
    if (cn.startsWith('md ') || cn.includes('m.s ') || cn.startsWith('ms ')) return '₹5,000 - ₹15,000 / year';
    return '₹15,000 - ₹50,000 / year';
  }
  if (tier === 'NIT' || tier === 'IIIT') {
    if (cn.startsWith('b.tech')) return tier === 'NIT' ? '₹1,63,750 / year' : '₹2,80,000 - ₹3,50,000 / year';
    if (cn.startsWith('m.tech')) return '₹70,000 - ₹1,50,000 / year';
  }
  if (tier === 'BITS' && cn.startsWith('b.tech')) return '₹5,55,000 / year';
  if (tier === 'NLU' && (cn.includes('llb') || cn.includes('llm'))) return '₹2,50,000 - ₹3,50,000 / year';
  if (tier === 'NIFT' && cn.includes('b.des')) return '₹3,30,000 / year';
  if (tier === 'TopPrivate') {
    if (cn.startsWith('b.tech')) return '₹3,00,000 - ₹6,00,000 / year';
    if (cn.includes('mbbs')) return '₹15,00,000 - ₹25,00,000 / year';
    if (cn.includes('mba')) return '₹8,00,000 - ₹18,00,000 / year';
  }
  if (tier === 'Government') {
    if (cn.startsWith('b.tech')) return '₹15,000 - ₹50,000 / year';
    if (cn.includes('mbbs')) return '₹30,000 - ₹1,50,000 / year';
    if (cn.startsWith('ba ')) return '₹6,000 - ₹25,000 / year';
    if (cn.startsWith('b.com')) return '₹8,000 - ₹30,000 / year';
    if (cn.startsWith('b.sc')) return '₹10,000 - ₹40,000 / year';
  }
  if (tier === 'Polytechnic') return '₹15,000 - ₹50,000 / year';
  if (tier === 'IvyLeague') {
    if (cn.includes('mba')) return '$70,000 - $85,000 / year';
    if (cn.startsWith('b.tech') || cn.startsWith('b.sc')) return '$55,000 - $80,000 / year';
    if (cn.includes('mbbs') || cn.startsWith('md ')) return '$60,000 - $75,000 / year';
    return '$50,000 - $70,000 / year';
  }
  if (tier === 'TopIntl') return '$30,000 - $55,000 / year';
  if (tier === 'Intl') return '$15,000 - $40,000 / year';
  return defaultFee;
}

function getIntake(tier: string, courseName: string): string {
  const cn = courseName.toLowerCase();
  if (tier === 'IIT' && cn.includes('computer')) return '120-180 seats';
  if (tier === 'IIT' && cn.startsWith('b.tech')) return '60-120 seats';
  if (tier === 'IIM') return '300-500 seats';
  if (tier === 'AIIMS' && cn.includes('mbbs')) return '125 seats';
  if (cn.includes('mbbs')) return '50-150 seats';
  return '40-90 seats';
}

function getCutoff(tier: string, courseName: string): string | undefined {
  const cn = courseName.toLowerCase();
  if (tier === 'IIT') {
    if (cn.startsWith('b.tech')) return 'JEE Advanced rank under 5,000';
    if (cn.startsWith('m.tech')) return 'GATE score 700+';
    if (cn.includes('mba')) return 'CAT 99+ percentile';
  }
  if (tier === 'IIM' && cn.includes('mba')) return 'CAT 95+ percentile';
  if (tier === 'AIIMS' && cn.includes('mbbs')) return 'NEET-UG rank under 100';
  if (tier === 'NIT' && cn.startsWith('b.tech')) return 'JEE Main rank 5,000-30,000';
  if (tier === 'NLU' && cn.includes('llb')) return 'CLAT rank under 500';
  return undefined;
}

async function main() {
  await mongoose.connect(MONGO_URI);
  const db = mongoose.connection.db!;

  // Get streams (create missing)
  const allStreamNames = ['Engineering', 'Management', 'Medical', 'Pharmacy', 'Law', 'Commerce', 'Science', 'Arts', 'Design', 'Education', 'Agriculture'];
  for (const sn of allStreamNames) {
    const exists = await db.collection('streams').findOne({ name: sn });
    if (!exists) {
      await db.collection('streams').insertOne({
        name: sn, description: `${sn} programs and degrees`,
        createdAt: new Date(), updatedAt: new Date(),
      });
      console.log(`Created stream: ${sn}`);
    }
  }
  const streams = await db.collection('streams').find({}).toArray();
  const streamMap = new Map(streams.map(s => [s.name, s._id]));

  // === STEP 1: Create canonical courses ===
  console.log('\n=== STEP 1: Create canonical courses ===');
  const allCourses = await db.collection('courses').find({}).toArray();
  const normalize = (n: string) => n.toLowerCase().replace(/[^a-z0-9]/g, '');
  const existingByName = new Map<string, any>();
  for (const c of allCourses) existingByName.set(normalize(c.name), c);

  const courseLookup = new Map<string, any>();
  let created = 0, updated = 0;

  for (const [streamName, list] of Object.entries(COURSES)) {
    // Map Hospitality, Aviation, Diploma to appropriate streams
    let streamId: any;
    if (streamName === 'Hospitality' || streamName === 'Aviation') {
      streamId = streamMap.get('Management') || streamMap.get('Engineering');
    } else if (streamName === 'Diploma') {
      streamId = streamMap.get('Engineering');
    } else {
      streamId = streamMap.get(streamName);
    }
    if (!streamId) continue;

    for (const course of list) {
      const norm = normalize(course.name);
      const existing = existingByName.get(norm);

      const data = {
        name: course.name,
        type: course.type || 'Full Time',
        duration: course.duration,
        fees: course.fees,
        eligibility: course.eligibility,
        stream: streamId,
        shortDescription: course.shortDesc || `${course.name} is a ${course.duration} program. Eligibility: ${course.eligibility.join('; ')}`,
        intakeCapacity: 'Varies by college',
      };

      if (existing) {
        await db.collection('courses').updateOne(
          { _id: existing._id },
          { $set: { ...data, updatedAt: new Date() } }
        );
        courseLookup.set(course.name, { _id: existing._id });
        updated++;
      } else {
        const r = await db.collection('courses').insertOne({
          ...data,
          createdAt: new Date(), updatedAt: new Date(),
        });
        courseLookup.set(course.name, { _id: r.insertedId });
        created++;
      }
    }
  }
  console.log(`Created ${created} new, updated ${updated} courses`);
  console.log(`Total canonical courses: ${courseLookup.size}`);

  // === STEP 2: Assign courses to colleges and rebuild offerings ===
  console.log('\n=== STEP 2: Assign courses to colleges ===');
  const colleges = await db.collection('colleges').find({}).toArray();
  let collegeUpdated = 0, totalCourseLinks = 0, totalOfferings = 0;

  for (let i = 0; i < colleges.length; i++) {
    const college = colleges[i];
    if (i % 100 === 0) console.log(`Progress: ${i}/${colleges.length}`);

    const expected = getCoursesForCollege(college.name, college.country);
    const tier = getCollegeTier(college.name, college.country);

    const courseIds: any[] = [];
    const offerings: any[] = [];

    for (const ec of expected) {
      const courseDoc = courseLookup.get(ec.courseName);
      if (!courseDoc) continue;

      // Get default fee from canonical course
      const allCourse = COURSES[ec.stream as keyof typeof COURSES] ||
                       Object.values(COURSES).flat();
      const courseTemplate = (Array.isArray(allCourse) ? allCourse : []).find(c => c.name === ec.courseName) ||
                            Object.values(COURSES).flat().find(c => c.name === ec.courseName);

      courseIds.push(courseDoc._id);

      const offering: any = {
        courseId: courseDoc._id,
        courseName: ec.courseName,
        fees: getFeeForCourse(tier, ec.courseName, courseTemplate?.fees || '₹50,000 - ₹2,50,000 / year'),
        intake: getIntake(tier, ec.courseName),
        duration: courseTemplate?.duration || 'Varies',
      };
      const cutoff = getCutoff(tier, ec.courseName);
      if (cutoff) offering.cutoff = cutoff;

      offerings.push(offering);
    }

    if (courseIds.length === 0) continue;

    await db.collection('colleges').updateOne(
      { _id: college._id },
      { $set: { courses: courseIds, courseOfferings: offerings } }
    );
    collegeUpdated++;
    totalCourseLinks += courseIds.length;
    totalOfferings += offerings.length;
  }

  console.log(`\nUpdated ${collegeUpdated} colleges`);
  console.log(`Total course-college links: ${totalCourseLinks}`);
  console.log(`Total course offerings: ${totalOfferings}`);
  console.log(`Avg courses per college: ${(totalCourseLinks / colleges.length).toFixed(1)}`);

  // Final verification
  const finalCourses = await db.collection('courses').find({}).toArray();
  console.log(`\nTotal unique courses in DB: ${finalCourses.length}`);

  await mongoose.disconnect();
}

main().catch(console.error);
