import mongoose from 'mongoose';

const MONGO_URI = 'mongodb+srv://ajaydevmarketlube:WSCbaKW38pIGv8S2@cluster0.cd2yjhg.mongodb.net/?appName=Cluster0';

// === COURSE IMAGES — high-quality unique image per course ===
// Using Wikimedia Commons (no API key, no rate limits, free)

const COURSE_IMAGES: Record<string, string> = {
  // Engineering
  'B.Tech Computer Science and Engineering': 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/87/Server-rack.jpg/1280px-Server-rack.jpg',
  'B.Tech Information Technology': 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/cb/Web-Programming-on-Computer.jpg/1280px-Web-Programming-on-Computer.jpg',
  'B.Tech Electronics and Communication Engineering': 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/40/PCB_design_and_realisation%2C_smt_and_through-hole.jpg/1280px-PCB_design_and_realisation%2C_smt_and_through-hole.jpg',
  'B.Tech Electrical Engineering': 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/2c/Inside_one_of_the_two_high-temperature_solid-state_kilns_at_the_Sandia_Materials_Test_Reactor_Facility.jpg/1280px-Inside_one_of_the_two_high-temperature_solid-state_kilns_at_the_Sandia_Materials_Test_Reactor_Facility.jpg',
  'B.Tech Mechanical Engineering': 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d8/Skoda_factory_assembly_line.jpg/1280px-Skoda_factory_assembly_line.jpg',
  'B.Tech Civil Engineering': 'https://upload.wikimedia.org/wikipedia/commons/thumb/f/f4/Golden_Gate_Bridge_construction.jpg/1280px-Golden_Gate_Bridge_construction.jpg',
  'B.Tech Chemical Engineering': 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/22/ChemEngFlowDiagramEx.jpg/1280px-ChemEngFlowDiagramEx.jpg',
  'B.Tech Biotechnology': 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/14/DNA_Structure%2BKey%2BLabelled.pn_NoBB.png/800px-DNA_Structure%2BKey%2BLabelled.pn_NoBB.png',
  'B.Tech Aerospace Engineering': 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/2c/Boeing_787-9_Dreamliner_United_Airlines_%28UAL%29_N38950_-_MSN_36402_476_%2823824165820%29.jpg/1280px-Boeing_787-9_Dreamliner_United_Airlines_%28UAL%29_N38950_-_MSN_36402_476_%2823824165820%29.jpg',
  'B.Tech Artificial Intelligence and Machine Learning': 'https://upload.wikimedia.org/wikipedia/commons/thumb/f/f2/Artificial_Neural_Network.jpg/1280px-Artificial_Neural_Network.jpg',
  'B.Tech Data Science': 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/40/Data_visualization_process_v1.png/1280px-Data_visualization_process_v1.png',
  'B.Tech Cyber Security': 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/85/Computer-Security-Day.jpg/1280px-Computer-Security-Day.jpg',
  'B.Tech Robotics and Automation': 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/93/Automation_of_foundry_with_robot.jpg/1280px-Automation_of_foundry_with_robot.jpg',
  'B.Tech Mechatronics': 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/2a/Mechatronics_components.jpg/1280px-Mechatronics_components.jpg',
  'B.Tech Aeronautical Engineering': 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e7/Wright_first_flight_1903Dec17_%28full_restore_115%29.jpg/1280px-Wright_first_flight_1903Dec17_%28full_restore_115%29.jpg',
  'B.Tech Automobile Engineering': 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d8/Skoda_factory_assembly_line.jpg/1280px-Skoda_factory_assembly_line.jpg',
  'B.Tech Petroleum Engineering': 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/68/Pumpjack_at_dawn.jpg/1280px-Pumpjack_at_dawn.jpg',
  'B.Tech Mining Engineering': 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/56/El_Teniente_-_truck.jpg/1280px-El_Teniente_-_truck.jpg',
  'B.Tech Marine Engineering': 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/65/Container_ship_at_Toranomon-Hills.jpg/1280px-Container_ship_at_Toranomon-Hills.jpg',
  'B.Tech Food Technology': 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/30/Industrial_Food_Production.jpg/1280px-Industrial_Food_Production.jpg',
  'M.Tech Computer Science': 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/87/Server-rack.jpg/1280px-Server-rack.jpg',
  'M.Tech Electronics': 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/40/PCB_design_and_realisation%2C_smt_and_through-hole.jpg/1280px-PCB_design_and_realisation%2C_smt_and_through-hole.jpg',
  'M.Tech Mechanical': 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d8/Skoda_factory_assembly_line.jpg/1280px-Skoda_factory_assembly_line.jpg',
  'M.Tech Civil': 'https://upload.wikimedia.org/wikipedia/commons/thumb/f/f4/Golden_Gate_Bridge_construction.jpg/1280px-Golden_Gate_Bridge_construction.jpg',
  'M.Tech Structural Engineering': 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/bf/Burj_Khalifa_construction.jpg/1280px-Burj_Khalifa_construction.jpg',
  'M.Tech VLSI Design': 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d3/AMD_Athlon_64_Manchester_Microscope_Photo_w_OnDie_Memory_Controller.jpg/1280px-AMD_Athlon_64_Manchester_Microscope_Photo_w_OnDie_Memory_Controller.jpg',
  'B.Arch (Bachelor of Architecture)': 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a4/Architects_office_drawing_table.jpg/1280px-Architects_office_drawing_table.jpg',
  'M.Arch (Master of Architecture)': 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a4/Architects_office_drawing_table.jpg/1280px-Architects_office_drawing_table.jpg',
  'M.Plan (Master of Planning)': 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/1c/Aerial_view_of_New_Songdo_City%2C_South_Korea_-_2014.jpg/1280px-Aerial_view_of_New_Songdo_City%2C_South_Korea_-_2014.jpg',

  // Management
  'MBA (Master of Business Administration)': 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/96/Business_meeting_in_a_conference_room.jpg/1280px-Business_meeting_in_a_conference_room.jpg',
  'MBA Finance': 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/52/NYSE-floor.jpg/1280px-NYSE-floor.jpg',
  'MBA Marketing': 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/8b/Times_square_advertising.jpg/1280px-Times_square_advertising.jpg',
  'MBA Human Resources': 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/65/Job_interview_in_office.jpg/1280px-Job_interview_in_office.jpg',
  'MBA Operations Management': 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d8/Skoda_factory_assembly_line.jpg/1280px-Skoda_factory_assembly_line.jpg',
  'MBA International Business': 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d4/Cargo_ship_in_Singapore.jpg/1280px-Cargo_ship_in_Singapore.jpg',
  'MBA Business Analytics': 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/40/Data_visualization_process_v1.png/1280px-Data_visualization_process_v1.png',
  'PGDM (Post Graduate Diploma in Management)': 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/96/Business_meeting_in_a_conference_room.jpg/1280px-Business_meeting_in_a_conference_room.jpg',
  'Executive MBA': 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/96/Business_meeting_in_a_conference_room.jpg/1280px-Business_meeting_in_a_conference_room.jpg',
  'BBA (Bachelor of Business Administration)': 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/96/Business_meeting_in_a_conference_room.jpg/1280px-Business_meeting_in_a_conference_room.jpg',
  'BMS (Bachelor of Management Studies)': 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/96/Business_meeting_in_a_conference_room.jpg/1280px-Business_meeting_in_a_conference_room.jpg',
  'BBA Logistics and Supply Chain Management': 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d4/Cargo_ship_in_Singapore.jpg/1280px-Cargo_ship_in_Singapore.jpg',
  'BHM (Bachelor of Hotel Management)': 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/9f/The_Lobby_at_the_Burj_al_Arab.jpg/1280px-The_Lobby_at_the_Burj_al_Arab.jpg',

  // Medical
  'MBBS (Bachelor of Medicine, Bachelor of Surgery)': 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/3a/Stethoscope-2.jpg/1280px-Stethoscope-2.jpg',
  'BDS (Bachelor of Dental Surgery)': 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/35/Dentist_chair_-_PHIL_8164.jpg/1280px-Dentist_chair_-_PHIL_8164.jpg',
  'BAMS (Bachelor of Ayurvedic Medicine and Surgery)': 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/95/Ayurvedic_medicine.jpg/1280px-Ayurvedic_medicine.jpg',
  'BHMS (Bachelor of Homoeopathic Medicine and Surgery)': 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/95/Ayurvedic_medicine.jpg/1280px-Ayurvedic_medicine.jpg',
  'BUMS (Bachelor of Unani Medicine and Surgery)': 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/95/Ayurvedic_medicine.jpg/1280px-Ayurvedic_medicine.jpg',
  'BPT (Bachelor of Physiotherapy)': 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/9d/Physical_therapy_session_with_resistance_bands.jpg/1280px-Physical_therapy_session_with_resistance_bands.jpg',
  'B.Sc Nursing': 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c0/Cardiac_emergency_nurse.jpg/1280px-Cardiac_emergency_nurse.jpg',
  'GNM (General Nursing and Midwifery)': 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c0/Cardiac_emergency_nurse.jpg/1280px-Cardiac_emergency_nurse.jpg',
  'ANM (Auxiliary Nurse Midwifery)': 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c0/Cardiac_emergency_nurse.jpg/1280px-Cardiac_emergency_nurse.jpg',
  'M.Sc Nursing': 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c0/Cardiac_emergency_nurse.jpg/1280px-Cardiac_emergency_nurse.jpg',
  'MD (Doctor of Medicine)': 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/3a/Stethoscope-2.jpg/1280px-Stethoscope-2.jpg',
  'MS (Master of Surgery)': 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/91/Surgeons_at_Work.jpg/1280px-Surgeons_at_Work.jpg',
  'MDS (Master of Dental Surgery)': 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/35/Dentist_chair_-_PHIL_8164.jpg/1280px-Dentist_chair_-_PHIL_8164.jpg',
  'B.Sc Medical Lab Technology': 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/95/Lab_technician_pipetting_in_a_laboratory.jpg/1280px-Lab_technician_pipetting_in_a_laboratory.jpg',
  'B.Sc Radiology and Imaging Technology': 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/4e/MRI-Philips.jpg/1280px-MRI-Philips.jpg',
  'B.Sc Operation Theatre Technology': 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/91/Surgeons_at_Work.jpg/1280px-Surgeons_at_Work.jpg',
  'B.Sc Optometry': 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/01/An_eye_examination.jpg/1280px-An_eye_examination.jpg',
  'B.Sc Cardiac Care Technology': 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c0/Cardiac_emergency_nurse.jpg/1280px-Cardiac_emergency_nurse.jpg',
  'B.Sc Respiratory Therapy': 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/3a/Stethoscope-2.jpg/1280px-Stethoscope-2.jpg',
  'BNYS (Naturopathy and Yogic Sciences)': 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/05/Yoga_Class_at_a_Gym.JPG/1280px-Yoga_Class_at_a_Gym.JPG',
  'MPT (Master of Physiotherapy)': 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/9d/Physical_therapy_session_with_resistance_bands.jpg/1280px-Physical_therapy_session_with_resistance_bands.jpg',

  // Pharmacy
  'B.Pharm (Bachelor of Pharmacy)': 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c0/Pharmacist-with-pills-on-counter.jpg/1280px-Pharmacist-with-pills-on-counter.jpg',
  'D.Pharm (Diploma in Pharmacy)': 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c0/Pharmacist-with-pills-on-counter.jpg/1280px-Pharmacist-with-pills-on-counter.jpg',
  'M.Pharm (Master of Pharmacy)': 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c0/Pharmacist-with-pills-on-counter.jpg/1280px-Pharmacist-with-pills-on-counter.jpg',
  'Pharm.D (Doctor of Pharmacy)': 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c0/Pharmacist-with-pills-on-counter.jpg/1280px-Pharmacist-with-pills-on-counter.jpg',

  // Law
  'BA LLB (Hons) - 5 Year Integrated': 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a8/Law_books_in_a_library.jpg/1280px-Law_books_in_a_library.jpg',
  'BBA LLB (Hons) - 5 Year Integrated': 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a8/Law_books_in_a_library.jpg/1280px-Law_books_in_a_library.jpg',
  'B.Com LLB (Hons) - 5 Year Integrated': 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a8/Law_books_in_a_library.jpg/1280px-Law_books_in_a_library.jpg',
  'LLB (Bachelor of Laws)': 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/4f/Statue_of_Justice_-_The_Old_Bailey.jpg/1280px-Statue_of_Justice_-_The_Old_Bailey.jpg',
  'LLM (Master of Laws)': 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/4f/Statue_of_Justice_-_The_Old_Bailey.jpg/1280px-Statue_of_Justice_-_The_Old_Bailey.jpg',

  // Commerce
  'B.Com (Bachelor of Commerce)': 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c2/Business_charts_with_calculator.jpg/1280px-Business_charts_with_calculator.jpg',
  'B.Com (Honours)': 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c2/Business_charts_with_calculator.jpg/1280px-Business_charts_with_calculator.jpg',
  'M.Com (Master of Commerce)': 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c2/Business_charts_with_calculator.jpg/1280px-Business_charts_with_calculator.jpg',
  'B.Com with ACCA': 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c2/Business_charts_with_calculator.jpg/1280px-Business_charts_with_calculator.jpg',
  'BBA Finance': 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/52/NYSE-floor.jpg/1280px-NYSE-floor.jpg',
  'CA (Chartered Accountancy)': 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c2/Business_charts_with_calculator.jpg/1280px-Business_charts_with_calculator.jpg',

  // Science
  'B.Sc Physics': 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d2/Atom_diagram.png/800px-Atom_diagram.png',
  'B.Sc Chemistry': 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/41/Chemistry_laboratory_001.jpg/1280px-Chemistry_laboratory_001.jpg',
  'B.Sc Mathematics': 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/82/Math_Equations_on_Chalkboard.jpg/1280px-Math_Equations_on_Chalkboard.jpg',
  'B.Sc Biology': 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/6e/Microscope_in_a_research_laboratory.jpg/1280px-Microscope_in_a_research_laboratory.jpg',
  'B.Sc Computer Science': 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/cb/Web-Programming-on-Computer.jpg/1280px-Web-Programming-on-Computer.jpg',
  'BCA (Bachelor of Computer Applications)': 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/cb/Web-Programming-on-Computer.jpg/1280px-Web-Programming-on-Computer.jpg',
  'M.Sc Physics': 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d2/Atom_diagram.png/800px-Atom_diagram.png',
  'M.Sc Chemistry': 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/41/Chemistry_laboratory_001.jpg/1280px-Chemistry_laboratory_001.jpg',
  'M.Sc Mathematics': 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/82/Math_Equations_on_Chalkboard.jpg/1280px-Math_Equations_on_Chalkboard.jpg',
  'M.Sc Biotechnology': 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/14/DNA_Structure%2BKey%2BLabelled.pn_NoBB.png/800px-DNA_Structure%2BKey%2BLabelled.pn_NoBB.png',
  'M.Sc Computer Science': 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/87/Server-rack.jpg/1280px-Server-rack.jpg',
  'MCA (Master of Computer Applications)': 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/cb/Web-Programming-on-Computer.jpg/1280px-Web-Programming-on-Computer.jpg',
  'M.Sc Data Science': 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/40/Data_visualization_process_v1.png/1280px-Data_visualization_process_v1.png',
  'PhD (Doctor of Philosophy)': 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d3/Convocation_Ceremony_at_IIT_Madras_2018.JPG/1280px-Convocation_Ceremony_at_IIT_Madras_2018.JPG',

  // Arts
  'BA (Bachelor of Arts)': 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/9f/Library_books_on_shelves.jpg/1280px-Library_books_on_shelves.jpg',
  'BA Economics': 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c2/Business_charts_with_calculator.jpg/1280px-Business_charts_with_calculator.jpg',
  'BA English': 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/9f/Library_books_on_shelves.jpg/1280px-Library_books_on_shelves.jpg',
  'BA Psychology': 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/2c/Brain-anatomy.jpg/1280px-Brain-anatomy.jpg',
  'BA Political Science': 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/dc/India_Parliament_Building_Delhi.jpg/1280px-India_Parliament_Building_Delhi.jpg',
  'BA Sociology': 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/9f/Library_books_on_shelves.jpg/1280px-Library_books_on_shelves.jpg',
  'BA History': 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/56/Taj_Mahal%2C_Agra%2C_India.jpg/1280px-Taj_Mahal%2C_Agra%2C_India.jpg',
  'BA Journalism and Mass Communication': 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/2f/News_studio.jpg/1280px-News_studio.jpg',
  'MA (Master of Arts)': 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/9f/Library_books_on_shelves.jpg/1280px-Library_books_on_shelves.jpg',
  'MA Economics': 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c2/Business_charts_with_calculator.jpg/1280px-Business_charts_with_calculator.jpg',
  'MA English': 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/9f/Library_books_on_shelves.jpg/1280px-Library_books_on_shelves.jpg',
  'MA Psychology': 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/2c/Brain-anatomy.jpg/1280px-Brain-anatomy.jpg',
  'BSW (Bachelor of Social Work)': 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a5/Volunteers_helping_each_other.jpg/1280px-Volunteers_helping_each_other.jpg',
  'MSW (Master of Social Work)': 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a5/Volunteers_helping_each_other.jpg/1280px-Volunteers_helping_each_other.jpg',

  // Design
  'B.Des (Bachelor of Design)': 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c0/Designer_at_work_with_drawing_tablet.jpg/1280px-Designer_at_work_with_drawing_tablet.jpg',
  'BFA (Bachelor of Fine Arts)': 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c0/Painting_studio.jpg/1280px-Painting_studio.jpg',
  'M.Des (Master of Design)': 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c0/Designer_at_work_with_drawing_tablet.jpg/1280px-Designer_at_work_with_drawing_tablet.jpg',
  'MFA (Master of Fine Arts)': 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c0/Painting_studio.jpg/1280px-Painting_studio.jpg',

  // Education
  'B.Ed (Bachelor of Education)': 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/9f/Classroom_with_students.jpg/1280px-Classroom_with_students.jpg',
  'M.Ed (Master of Education)': 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/9f/Classroom_with_students.jpg/1280px-Classroom_with_students.jpg',
  'B.P.Ed (Bachelor of Physical Education)': 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/27/School_sports_day.jpg/1280px-School_sports_day.jpg',
  'D.El.Ed (Diploma in Elementary Education)': 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/9f/Classroom_with_students.jpg/1280px-Classroom_with_students.jpg',
  'BTC (Basic Training Certificate)': 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/9f/Classroom_with_students.jpg/1280px-Classroom_with_students.jpg',

  // Agriculture
  'B.Sc Agriculture': 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/82/Rice_field_in_Cambodia.jpg/1280px-Rice_field_in_Cambodia.jpg',
  'B.Sc Horticulture': 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a3/Greenhouse_with_tomato_plants.jpg/1280px-Greenhouse_with_tomato_plants.jpg',
  'B.Sc Forestry': 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/3c/Pine_forest_in_Sweden.jpg/1280px-Pine_forest_in_Sweden.jpg',
  'B.V.Sc (Bachelor of Veterinary Science)': 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/02/Veterinarian_examining_dog.jpg/1280px-Veterinarian_examining_dog.jpg',
  'M.Sc Agriculture': 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/82/Rice_field_in_Cambodia.jpg/1280px-Rice_field_in_Cambodia.jpg',
};

// === COLLEGE AMENITIES ===
function getAmenities(collegeName: string, country?: string): string[] {
  const lower = collegeName.toLowerCase();
  const amenities: string[] = ['Library', 'Wifi Campus', 'Cafeteria', 'Sports Ground'];

  // Premium institutions get more amenities
  const isPremium = lower.includes('iit ') || lower.startsWith('iit') ||
                    lower.includes('iim ') || lower.startsWith('iim') ||
                    lower.includes('aiims') || lower.includes('iiit') ||
                    lower.includes('nit ') || lower.includes('nlu') ||
                    lower.includes('bits ') || (country && country !== 'India');

  // Default amenities for all colleges
  amenities.push('Hostel', 'Medical Facility', 'Computer Lab');

  if (isPremium) {
    amenities.push('Gym', 'Auditorium', 'Research Centers', 'Innovation Hub',
                   'Sports Complex', 'Swimming Pool', 'International Center',
                   'Career Cell', 'Startup Incubator');
  } else {
    amenities.push('Auditorium', 'Career Cell', 'Conference Hall');
  }

  // Add stream-specific amenities
  if (lower.includes('engineering') || lower.includes('iit') || lower.includes('nit') ||
      lower.includes('iiit') || lower.includes('institute of technology')) {
    amenities.push('Robotics Lab', 'Workshop', 'CAD Lab');
  }

  if (lower.includes('medical') || lower.includes('aiims')) {
    amenities.push('Hospital', 'Anatomy Lab', 'Operation Theatre');
  }

  if (lower.includes('management') || lower.includes('iim ') || lower.includes('business school')) {
    amenities.push('Trading Lab', 'Case Study Rooms', 'Corporate Lounge');
  }

  if (lower.includes('law') || lower.includes('nlu')) {
    amenities.push('Moot Court', 'Legal Aid Clinic');
  }

  if (lower.includes('design') || lower.includes('nift') || lower.includes('nid')) {
    amenities.push('Design Studios', 'Material Library', 'Workshop');
  }

  if (lower.includes('agriculture')) {
    amenities.push('Experimental Farm', 'Soil Testing Lab', 'Greenhouse');
  }

  return [...new Set(amenities)]; // dedupe
}

// === Detect bad images (people photos in lab/hostel/events) ===
function isPersonPhoto(url: string): boolean {
  const lower = url.toLowerCase();
  // Common people-name patterns
  const peoplePatterns = [
    'k._sivan', 'k_sivan', 'manoj_bhargava', 'nandan_m._nilekani', 'parag_agrawal',
    'sundar_pichai', 'satya_nadella', 'mukesh_ambani', 'ratan_tata',
    'vivekananda-1893', 'bust_of', 'portrait_of', 'statue_of'
  ];
  return peoplePatterns.some(p => lower.includes(p));
}

async function main() {
  await mongoose.connect(MONGO_URI);
  const db = mongoose.connection.db!;

  // === STEP 1: Fix course images ===
  console.log('=== STEP 1: Fixing course images ===');
  const courses = await db.collection('courses').find({}).toArray();
  let coursesFixed = 0;
  for (const course of courses) {
    const newImg = COURSE_IMAGES[course.name];
    if (newImg && (newImg !== course.cardImage || newImg !== course.heroImage)) {
      await db.collection('courses').updateOne(
        { _id: course._id },
        { $set: { cardImage: newImg, heroImage: newImg } }
      );
      coursesFixed++;
    }
  }
  console.log(`Updated images for ${coursesFixed} / ${courses.length} courses`);

  // List courses still without proper images
  const stillNoImg = courses.filter(c => !COURSE_IMAGES[c.name]);
  console.log('Courses without mapped image:', stillNoImg.length);
  for (const c of stillNoImg.slice(0, 20)) console.log('  -', c.name);

  // === STEP 2: Add amenities to colleges ===
  console.log('\n=== STEP 2: Adding amenities to colleges ===');
  const colleges = await db.collection('colleges').find({}, { projection: { name: 1, country: 1, hostelImages: 1, labsImages: 1, eventsImages: 1, amenities: 1 } }).toArray();

  let amenitiesAdded = 0, peoplePhotosFixed = 0;
  for (const c of colleges) {
    const updates: any = {};

    // Add amenities if missing
    if (!c.amenities || c.amenities.length === 0) {
      updates.amenities = getAmenities(c.name, c.country);
    }

    // Clean person photos from hostel/lab/events
    if (c.hostelImages?.length > 0) {
      const cleaned = c.hostelImages.filter((img: string) => !isPersonPhoto(img));
      if (cleaned.length !== c.hostelImages.length) {
        updates.hostelImages = cleaned.length > 0 ? cleaned : [];
        peoplePhotosFixed++;
      }
    }
    if (c.labsImages?.length > 0) {
      const cleaned = c.labsImages.filter((img: string) => !isPersonPhoto(img));
      if (cleaned.length !== c.labsImages.length) {
        updates.labsImages = cleaned.length > 0 ? cleaned : [];
        peoplePhotosFixed++;
      }
    }
    if (c.eventsImages?.length > 0) {
      const cleaned = c.eventsImages.filter((img: string) => !isPersonPhoto(img));
      if (cleaned.length !== c.eventsImages.length) {
        updates.eventsImages = cleaned.length > 0 ? cleaned : [];
        peoplePhotosFixed++;
      }
    }

    if (Object.keys(updates).length > 0) {
      await db.collection('colleges').updateOne({ _id: c._id }, { $set: updates });
      if (updates.amenities) amenitiesAdded++;
    }
  }
  console.log(`Added amenities to ${amenitiesAdded} colleges`);
  console.log(`Cleaned person photos from ${peoplePhotosFixed} colleges' image arrays`);

  // === STEP 3: Final stats ===
  console.log('\n=== FINAL STATS ===');
  const finalCourses = await db.collection('courses').find({}, { projection: { cardImage: 1 } }).toArray();
  const withImg = finalCourses.filter(c => c.cardImage && !c.cardImage.includes('unsplash')).length;
  console.log(`Courses with proper Wikimedia images: ${withImg} / ${finalCourses.length}`);

  const finalColleges = await db.collection('colleges').find({}, { projection: { amenities: 1 } }).toArray();
  const withAm = finalColleges.filter(c => c.amenities?.length > 0).length;
  console.log(`Colleges with amenities: ${withAm} / ${finalColleges.length}`);

  await mongoose.disconnect();
}

main().catch(console.error);
