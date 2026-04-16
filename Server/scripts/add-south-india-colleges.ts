import mongoose from 'mongoose';

const MONGO_URI = 'mongodb+srv://ajaydevmarketlube:WSCbaKW38pIGv8S2@cluster0.cd2yjhg.mongodb.net/?appName=Cluster0';

interface NewCollege {
  name: string;
  city: string;
  state: string;
  type: string;
  establishedYear: number;
  description: string;
  campusImage: string; // Wikipedia URL
  logo?: string;
  accreditation: string[];
  campusSize: string;
  collegeType: string; // determines courses + tier
}

const NEW_COLLEGES: NewCollege[] = [
  // ============ KARNATAKA ============
  {
    name: 'Bangalore Institute of Technology (BIT)',
    city: 'Bangalore',
    state: 'Karnataka',
    type: 'Private',
    establishedYear: 1979,
    description: 'Bangalore Institute of Technology is a premier engineering college in Bangalore offering undergraduate and postgraduate programs in engineering and management. Known for its strong industry connections, modern infrastructure, and excellent placement record with top tech companies in Bangalore.',
    campusImage: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/47/Bangalore_Cubbon_Park.jpg/1280px-Bangalore_Cubbon_Park.jpg',
    accreditation: ['AICTE Approved', 'NAAC A', 'NBA Accredited'],
    campusSize: '20 Acres',
    collegeType: 'engineering_top_private',
  },
  {
    name: 'Bangalore Medical College and Research Institute (BMCRI)',
    city: 'Bangalore',
    state: 'Karnataka',
    type: 'Government',
    establishedYear: 1955,
    description: 'BMCRI is one of the oldest and most prestigious medical colleges in Karnataka. The institute offers MBBS, postgraduate medical degrees, and super-specialty programs. Known for excellent clinical training and research facilities.',
    campusImage: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c0/Bangalore_Medical_College_buildings.jpg/1280px-Bangalore_Medical_College_buildings.jpg',
    accreditation: ['MCI Approved', 'NMC Recognized', 'Government of Karnataka'],
    campusSize: '50 Acres',
    collegeType: 'medical_government',
  },
  {
    name: 'Mount Carmel College Bangalore',
    city: 'Bangalore',
    state: 'Karnataka',
    type: 'Private',
    establishedYear: 1948,
    description: 'Mount Carmel College is an autonomous Catholic women\'s college affiliated with Bangalore University. One of the most prestigious arts and science colleges in Karnataka with excellent academic record and placement.',
    campusImage: 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/9a/Mount_Carmel_College_Bangalore.jpg/1280px-Mount_Carmel_College_Bangalore.jpg',
    accreditation: ['NAAC A++', 'Autonomous Institution', 'Bangalore University'],
    campusSize: '25 Acres',
    collegeType: 'arts_science_top',
  },
  {
    name: 'St. Joseph\'s College of Commerce Bangalore',
    city: 'Bangalore',
    state: 'Karnataka',
    type: 'Private',
    establishedYear: 1949,
    description: 'St. Joseph\'s College of Commerce is an autonomous commerce college in Bangalore known for its rigorous academic programs in commerce, business administration, and economics. One of the top commerce colleges in Karnataka.',
    campusImage: 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/64/St_Joseph%27s_College_of_Commerce_Bangalore.jpg/1280px-St_Joseph%27s_College_of_Commerce_Bangalore.jpg',
    accreditation: ['NAAC A+', 'Autonomous'],
    campusSize: '15 Acres',
    collegeType: 'commerce_top',
  },
  {
    name: 'Jyoti Nivas College Bangalore',
    city: 'Bangalore',
    state: 'Karnataka',
    type: 'Private',
    establishedYear: 1966,
    description: 'Jyoti Nivas College is an autonomous Catholic women\'s college affiliated to Bangalore University. Offers undergraduate and postgraduate programs in arts, science, commerce, and management.',
    campusImage: 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/65/Jyoti_Nivas_College_Bangalore.jpg/1280px-Jyoti_Nivas_College_Bangalore.jpg',
    accreditation: ['NAAC A+', 'Autonomous'],
    campusSize: '12 Acres',
    collegeType: 'arts_science',
  },
  {
    name: 'BMS College of Engineering Bangalore',
    city: 'Bangalore',
    state: 'Karnataka',
    type: 'Private',
    establishedYear: 1946,
    description: 'BMS College of Engineering is one of the oldest and top private engineering colleges in India. Affiliated with VTU and offers programs in 12 engineering disciplines. Known for strong placement record and alumni network.',
    campusImage: 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/79/BMS_College_of_Engineering_Bangalore.jpg/1280px-BMS_College_of_Engineering_Bangalore.jpg',
    accreditation: ['NAAC A+', 'NBA Accredited', 'AICTE Approved'],
    campusSize: '11 Acres',
    collegeType: 'engineering_top_private',
  },
  {
    name: 'PES University Bangalore',
    city: 'Bangalore',
    state: 'Karnataka',
    type: 'Private',
    establishedYear: 1972,
    description: 'PES University is a private deemed university in Bangalore. Known for its world-class engineering programs, research excellence, and strong industry connections with top tech companies.',
    campusImage: 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/2c/PES_University_Banashankari.jpg/1280px-PES_University_Banashankari.jpg',
    accreditation: ['UGC Recognized', 'NAAC A+', 'AICTE Approved'],
    campusSize: '40 Acres',
    collegeType: 'engineering_top_private',
  },
  {
    name: 'M.S. Ramaiah Institute of Technology Bangalore',
    city: 'Bangalore',
    state: 'Karnataka',
    type: 'Private',
    establishedYear: 1962,
    description: 'MSRIT is one of the top private engineering institutions in Bangalore. Offers undergraduate and postgraduate programs across engineering and management disciplines with excellent placement opportunities.',
    campusImage: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a6/MS_Ramaiah_Institute_of_Technology.jpg/1280px-MS_Ramaiah_Institute_of_Technology.jpg',
    accreditation: ['NAAC A+', 'NBA Accredited', 'Autonomous'],
    campusSize: '60 Acres',
    collegeType: 'engineering_top_private',
  },
  {
    name: 'Dayananda Sagar College of Engineering Bangalore',
    city: 'Bangalore',
    state: 'Karnataka',
    type: 'Private',
    establishedYear: 1979,
    description: 'Dayananda Sagar College of Engineering is a leading private engineering college in Bangalore. Affiliated with VTU and known for its modern infrastructure, industry partnerships, and quality education.',
    campusImage: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c7/Dayananda_Sagar_College_of_Engineering.jpg/1280px-Dayananda_Sagar_College_of_Engineering.jpg',
    accreditation: ['NAAC A', 'NBA Accredited', 'AICTE Approved'],
    campusSize: '38 Acres',
    collegeType: 'engineering_private',
  },
  {
    name: 'JSS Academy of Higher Education and Research Mysore',
    city: 'Mysore',
    state: 'Karnataka',
    type: 'Private',
    establishedYear: 1954,
    description: 'JSS AHER is a deemed university in Mysore offering programs in medicine, engineering, pharmacy, dentistry, nursing, and management. Known for excellent infrastructure and quality education.',
    campusImage: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/45/JSS_Medical_College_Mysore.jpg/1280px-JSS_Medical_College_Mysore.jpg',
    accreditation: ['UGC Deemed University', 'NAAC A+'],
    campusSize: '85 Acres',
    collegeType: 'university_top',
  },
  {
    name: 'University of Mysore',
    city: 'Mysore',
    state: 'Karnataka',
    type: 'Government',
    establishedYear: 1916,
    description: 'University of Mysore is one of the oldest universities in India, established in 1916. Offers a wide range of programs across humanities, sciences, social sciences, and professional disciplines.',
    campusImage: 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/12/University_of_Mysore_Crawford_Hall.jpg/1280px-University_of_Mysore_Crawford_Hall.jpg',
    accreditation: ['UGC Recognized', 'NAAC A+'],
    campusSize: '739 Acres',
    collegeType: 'university_government',
  },
  {
    name: 'Kasturba Medical College Mangalore',
    city: 'Mangalore',
    state: 'Karnataka',
    type: 'Private',
    establishedYear: 1955,
    description: 'KMC Mangalore is one of India\'s top private medical colleges, part of Manipal Academy of Higher Education. Offers MBBS, postgraduate, and super-specialty programs with international recognition.',
    campusImage: 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/9c/KMC_Mangalore.jpg/1280px-KMC_Mangalore.jpg',
    accreditation: ['MCI Approved', 'NMC Recognized', 'NAAC A+'],
    campusSize: '50 Acres',
    collegeType: 'medical_top_private',
  },
  {
    name: 'KS Hegde Medical Academy Mangalore',
    city: 'Mangalore',
    state: 'Karnataka',
    type: 'Private',
    establishedYear: 1999,
    description: 'KS Hegde Medical Academy is a private medical college in Mangalore offering MBBS and postgraduate programs. Affiliated with Nitte University.',
    campusImage: 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/3a/Mangalore_City_View.jpg/1280px-Mangalore_City_View.jpg',
    accreditation: ['NMC Recognized', 'NAAC A'],
    campusSize: '30 Acres',
    collegeType: 'medical_private',
  },
  {
    name: 'NITTE Mangalore',
    city: 'Mangalore',
    state: 'Karnataka',
    type: 'Private',
    establishedYear: 2008,
    description: 'NITTE is a deemed university in Mangalore offering programs across multiple disciplines including engineering, medical, dental, pharmacy, nursing, hospitality and management.',
    campusImage: 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/95/Mangalore_Beach.jpg/1280px-Mangalore_Beach.jpg',
    accreditation: ['UGC Deemed University', 'NAAC A+'],
    campusSize: '120 Acres',
    collegeType: 'university_top',
  },
  {
    name: 'Kasturba Medical College Manipal',
    city: 'Manipal',
    state: 'Karnataka',
    type: 'Private',
    establishedYear: 1953,
    description: 'KMC Manipal is the flagship medical college of Manipal Academy of Higher Education. One of India\'s most prestigious private medical institutions with international recognition.',
    campusImage: 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/1c/Kasturba_Medical_College_Manipal.jpg/1280px-Kasturba_Medical_College_Manipal.jpg',
    accreditation: ['NMC Recognized', 'NAAC A++', 'WHO Recognized'],
    campusSize: '600 Acres',
    collegeType: 'medical_top_private',
  },
  {
    name: 'Manipal College of Dental Sciences (MCODS)',
    city: 'Manipal',
    state: 'Karnataka',
    type: 'Private',
    establishedYear: 1956,
    description: 'MCODS Manipal is one of India\'s premier dental colleges, part of MAHE. Offers BDS, MDS in all specialties, and PhD programs. Known for international recognition and excellent clinical training.',
    campusImage: 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/95/Manipal_Academy_buildings.jpg/1280px-Manipal_Academy_buildings.jpg',
    accreditation: ['DCI Approved', 'NAAC A++'],
    campusSize: '40 Acres',
    collegeType: 'dental_top',
  },
  {
    name: 'Symbiosis Institute of Business Management Bangalore',
    city: 'Bangalore',
    state: 'Karnataka',
    type: 'Private',
    establishedYear: 2008,
    description: 'SIBM Bangalore is part of Symbiosis International University, offering MBA programs with strong industry focus. Known for excellent placements at top companies.',
    campusImage: 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/01/Bangalore_Skyline.jpg/1280px-Bangalore_Skyline.jpg',
    accreditation: ['UGC Recognized', 'NAAC A+'],
    campusSize: '20 Acres',
    collegeType: 'management_top',
  },
  {
    name: 'St. John\'s Medical College Bangalore',
    city: 'Bangalore',
    state: 'Karnataka',
    type: 'Private',
    establishedYear: 1963,
    description: 'St. John\'s Medical College is a top private medical college in Bangalore run by the Catholic Bishops\' Conference of India. Known for excellent academic standards and ethical medical practice.',
    campusImage: 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/14/St_Johns_Medical_College_Hospital_Bangalore.jpg/1280px-St_Johns_Medical_College_Hospital_Bangalore.jpg',
    accreditation: ['NMC Recognized', 'NAAC A+'],
    campusSize: '54 Acres',
    collegeType: 'medical_top_private',
  },
  {
    name: 'KLE Society\'s S. Nijalingappa Medical College Bagalkot',
    city: 'Bagalkot',
    state: 'Karnataka',
    type: 'Private',
    establishedYear: 1994,
    description: 'KLE Medical College is a private medical institution in Bagalkot offering MBBS and postgraduate programs.',
    campusImage: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/5d/Bagalkot.jpg/1280px-Bagalkot.jpg',
    accreditation: ['NMC Recognized'],
    campusSize: '70 Acres',
    collegeType: 'medical_private',
  },
  {
    name: 'Visvesvaraya Technological University (VTU) Belagavi',
    city: 'Belagavi',
    state: 'Karnataka',
    type: 'Government',
    establishedYear: 1998,
    description: 'VTU is a state university overseeing engineering and technology education in Karnataka. Affiliates over 200+ engineering colleges and offers postgraduate and PhD programs.',
    campusImage: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c1/VTU_Belagavi.jpg/1280px-VTU_Belagavi.jpg',
    accreditation: ['UGC Recognized', 'NAAC A'],
    campusSize: '100 Acres',
    collegeType: 'university_government',
  },
  {
    name: 'Karnatak Lingayat Education Society Engineering College Hubballi',
    city: 'Hubballi',
    state: 'Karnataka',
    type: 'Private',
    establishedYear: 1980,
    description: 'KLE Engineering College is a private engineering college in Hubballi affiliated with VTU. Offers programs across engineering disciplines.',
    campusImage: 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d8/Hubli.jpg/1280px-Hubli.jpg',
    accreditation: ['NBA Accredited', 'NAAC A'],
    campusSize: '50 Acres',
    collegeType: 'engineering_private',
  },

  // ============ TAMIL NADU ============
  {
    name: 'Madras Medical College Chennai',
    city: 'Chennai',
    state: 'Tamil Nadu',
    type: 'Government',
    establishedYear: 1835,
    description: 'Madras Medical College is one of the oldest medical institutions in India and Asia. Affiliated with Rajiv Gandhi Government General Hospital, offering MBBS, postgraduate, and super-specialty programs.',
    campusImage: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/40/Madras_Medical_College.jpg/1280px-Madras_Medical_College.jpg',
    accreditation: ['NMC Recognized', 'Government of Tamil Nadu'],
    campusSize: '50 Acres',
    collegeType: 'medical_government',
  },
  {
    name: 'Stanley Medical College Chennai',
    city: 'Chennai',
    state: 'Tamil Nadu',
    type: 'Government',
    establishedYear: 1938,
    description: 'Stanley Medical College is a government medical college in Chennai affiliated with Tamil Nadu Dr. M.G.R. Medical University. One of the oldest medical institutions in Tamil Nadu.',
    campusImage: 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/91/Stanley_Medical_College_Chennai.jpg/1280px-Stanley_Medical_College_Chennai.jpg',
    accreditation: ['NMC Recognized'],
    campusSize: '60 Acres',
    collegeType: 'medical_government',
  },
  {
    name: 'Madras Christian College (MCC) Chennai',
    city: 'Chennai',
    state: 'Tamil Nadu',
    type: 'Private',
    establishedYear: 1837,
    description: 'Madras Christian College is one of the oldest and most prestigious autonomous colleges in India. Affiliated with University of Madras, offering arts, science, and commerce programs.',
    campusImage: 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/16/Madras_Christian_College.jpg/1280px-Madras_Christian_College.jpg',
    accreditation: ['NAAC A++', 'Autonomous', 'CPE'],
    campusSize: '365 Acres',
    collegeType: 'arts_science_top',
  },
  {
    name: 'Stella Maris College Chennai',
    city: 'Chennai',
    state: 'Tamil Nadu',
    type: 'Private',
    establishedYear: 1947,
    description: 'Stella Maris College is an autonomous Catholic women\'s college affiliated with University of Madras. Known for excellence in arts, science, and commerce education.',
    campusImage: 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/2a/Stella_Maris_College_Chennai.jpg/1280px-Stella_Maris_College_Chennai.jpg',
    accreditation: ['NAAC A++', 'Autonomous'],
    campusSize: '12 Acres',
    collegeType: 'arts_science_top',
  },
  {
    name: 'Anna University Chennai',
    city: 'Chennai',
    state: 'Tamil Nadu',
    type: 'Government',
    establishedYear: 1978,
    description: 'Anna University is a state technical university in Chennai. One of the largest engineering universities in India with affiliated colleges across Tamil Nadu.',
    campusImage: 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/0f/Anna_University_Chennai.jpg/1280px-Anna_University_Chennai.jpg',
    accreditation: ['UGC Recognized', 'NAAC A++', 'AICTE'],
    campusSize: '189 Acres',
    collegeType: 'university_government',
  },
  {
    name: 'College of Engineering Guindy (CEG), Anna University',
    city: 'Chennai',
    state: 'Tamil Nadu',
    type: 'Government',
    establishedYear: 1794,
    description: 'CEG is the oldest technical institution in India established in 1794. Now a constituent of Anna University, offering top-quality engineering education.',
    campusImage: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/aa/CEG_Anna_University.jpg/1280px-CEG_Anna_University.jpg',
    accreditation: ['UGC Recognized', 'NBA Accredited', 'AICTE'],
    campusSize: '189 Acres',
    collegeType: 'engineering_top_government',
  },
  {
    name: 'Sri Sivasubramaniya Nadar College of Engineering Chennai',
    city: 'Chennai',
    state: 'Tamil Nadu',
    type: 'Private',
    establishedYear: 1996,
    description: 'SSN College of Engineering is a top private engineering college in Chennai. Known for academic excellence, modern infrastructure, and strong placement record.',
    campusImage: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/4d/SSN_College_of_Engineering.jpg/1280px-SSN_College_of_Engineering.jpg',
    accreditation: ['NAAC A+', 'NBA Accredited', 'Autonomous'],
    campusSize: '250 Acres',
    collegeType: 'engineering_top_private',
  },
  {
    name: 'Coimbatore Institute of Technology (CIT)',
    city: 'Coimbatore',
    state: 'Tamil Nadu',
    type: 'Private',
    establishedYear: 1956,
    description: 'CIT is one of the oldest private engineering colleges in Tamil Nadu, affiliated with Anna University. Known for academic excellence and industry-oriented programs.',
    campusImage: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/8d/Coimbatore_Institute_of_Technology.jpg/1280px-Coimbatore_Institute_of_Technology.jpg',
    accreditation: ['NAAC A+', 'NBA Accredited', 'Autonomous'],
    campusSize: '120 Acres',
    collegeType: 'engineering_top_private',
  },
  {
    name: 'Coimbatore Medical College',
    city: 'Coimbatore',
    state: 'Tamil Nadu',
    type: 'Government',
    establishedYear: 1966,
    description: 'Coimbatore Medical College is a government medical college in Coimbatore affiliated with Tamil Nadu Dr. M.G.R. Medical University.',
    campusImage: 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d4/Coimbatore_Medical_College.jpg/1280px-Coimbatore_Medical_College.jpg',
    accreditation: ['NMC Recognized'],
    campusSize: '40 Acres',
    collegeType: 'medical_government',
  },
  {
    name: 'Bharathiar University Coimbatore',
    city: 'Coimbatore',
    state: 'Tamil Nadu',
    type: 'Government',
    establishedYear: 1982,
    description: 'Bharathiar University is a state university in Coimbatore offering programs across humanities, sciences, social sciences, and professional disciplines.',
    campusImage: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/cd/Bharathiar_University_Coimbatore.jpg/1280px-Bharathiar_University_Coimbatore.jpg',
    accreditation: ['UGC Recognized', 'NAAC A++'],
    campusSize: '1000 Acres',
    collegeType: 'university_government',
  },
  {
    name: 'Kongu Engineering College Erode',
    city: 'Erode',
    state: 'Tamil Nadu',
    type: 'Private',
    establishedYear: 1984,
    description: 'Kongu Engineering College is an autonomous private engineering institution affiliated with Anna University. Known for academic excellence and innovation.',
    campusImage: 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/63/Kongu_Engineering_College.jpg/1280px-Kongu_Engineering_College.jpg',
    accreditation: ['NAAC A+', 'NBA Accredited', 'Autonomous'],
    campusSize: '167 Acres',
    collegeType: 'engineering_top_private',
  },
  {
    name: 'Madurai Medical College',
    city: 'Madurai',
    state: 'Tamil Nadu',
    type: 'Government',
    establishedYear: 1954,
    description: 'Madurai Medical College is a government medical college in Madurai. Affiliated with Tamil Nadu Dr. M.G.R. Medical University, offering MBBS and postgraduate programs.',
    campusImage: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/5b/Madurai_Medical_College.jpg/1280px-Madurai_Medical_College.jpg',
    accreditation: ['NMC Recognized'],
    campusSize: '50 Acres',
    collegeType: 'medical_government',
  },
  {
    name: 'Madurai Kamaraj University',
    city: 'Madurai',
    state: 'Tamil Nadu',
    type: 'Government',
    establishedYear: 1966,
    description: 'Madurai Kamaraj University is a state university in Madurai. Known for its commitment to social transformation through education and offers diverse academic programs.',
    campusImage: 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d2/Madurai_Kamaraj_University.jpg/1280px-Madurai_Kamaraj_University.jpg',
    accreditation: ['UGC Recognized', 'NAAC A+'],
    campusSize: '750 Acres',
    collegeType: 'university_government',
  },
  {
    name: 'Thiagarajar College of Engineering Madurai',
    city: 'Madurai',
    state: 'Tamil Nadu',
    type: 'Private',
    establishedYear: 1957,
    description: 'TCE is an autonomous private engineering college in Madurai affiliated with Anna University. One of the oldest engineering colleges in Tamil Nadu.',
    campusImage: 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/7c/Thiagarajar_College_of_Engineering.jpg/1280px-Thiagarajar_College_of_Engineering.jpg',
    accreditation: ['NAAC A+', 'NBA Accredited', 'Autonomous'],
    campusSize: '147 Acres',
    collegeType: 'engineering_top_private',
  },

  // ============ KERALA ============
  {
    name: 'Government Medical College Thiruvananthapuram',
    city: 'Thiruvananthapuram',
    state: 'Kerala',
    type: 'Government',
    establishedYear: 1951,
    description: 'Government Medical College Thiruvananthapuram is the premier medical institution in Kerala. Offers MBBS, MD/MS, super-specialty programs, and is renowned for clinical excellence.',
    campusImage: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a5/Government_Medical_College_Thiruvananthapuram.jpg/1280px-Government_Medical_College_Thiruvananthapuram.jpg',
    accreditation: ['NMC Recognized', 'Government of Kerala'],
    campusSize: '50 Acres',
    collegeType: 'medical_government',
  },
  {
    name: 'University of Kerala',
    city: 'Thiruvananthapuram',
    state: 'Kerala',
    type: 'Government',
    establishedYear: 1937,
    description: 'University of Kerala is one of the first universities established in India. Offers a wide range of academic programs and is known for research excellence.',
    campusImage: 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/2b/University_of_Kerala.jpg/1280px-University_of_Kerala.jpg',
    accreditation: ['UGC Recognized', 'NAAC A++'],
    campusSize: '460 Acres',
    collegeType: 'university_government',
  },
  {
    name: 'College of Engineering Trivandrum (CET)',
    city: 'Thiruvananthapuram',
    state: 'Kerala',
    type: 'Government',
    establishedYear: 1939,
    description: 'CET is the oldest engineering college in Kerala and one of the most prestigious in South India. Offers undergraduate and postgraduate engineering programs.',
    campusImage: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c5/College_of_Engineering_Trivandrum.jpg/1280px-College_of_Engineering_Trivandrum.jpg',
    accreditation: ['NBA Accredited', 'NAAC A', 'AICTE'],
    campusSize: '125 Acres',
    collegeType: 'engineering_top_government',
  },
  {
    name: 'Government Engineering College Thrissur',
    city: 'Thrissur',
    state: 'Kerala',
    type: 'Government',
    establishedYear: 1957,
    description: 'GEC Thrissur is a government engineering college in Kerala affiliated with APJ Abdul Kalam Technological University.',
    campusImage: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c0/GEC_Thrissur.jpg/1280px-GEC_Thrissur.jpg',
    accreditation: ['NBA Accredited', 'AICTE'],
    campusSize: '125 Acres',
    collegeType: 'engineering_government',
  },
  {
    name: 'Cochin University of Science and Technology (CUSAT)',
    city: 'Kochi',
    state: 'Kerala',
    type: 'Government',
    establishedYear: 1971,
    description: 'CUSAT is a state government university in Kochi. Offers programs in engineering, science, technology, business, law, and humanities. Known for marine engineering and ocean studies.',
    campusImage: 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d0/CUSAT_Kochi.jpg/1280px-CUSAT_Kochi.jpg',
    accreditation: ['UGC Recognized', 'NAAC A'],
    campusSize: '180 Acres',
    collegeType: 'university_government',
  },
  {
    name: 'Maharaja\'s College Ernakulam',
    city: 'Ernakulam',
    state: 'Kerala',
    type: 'Government',
    establishedYear: 1875,
    description: 'Maharaja\'s College is one of the oldest colleges in Kerala, established in 1875. Now an autonomous government college affiliated with Mahatma Gandhi University.',
    campusImage: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c2/Maharaja_College_Ernakulam.jpg/1280px-Maharaja_College_Ernakulam.jpg',
    accreditation: ['NAAC A+', 'Autonomous'],
    campusSize: '20 Acres',
    collegeType: 'arts_science_top',
  },
  {
    name: 'Sacred Heart College Thevara Kochi',
    city: 'Kochi',
    state: 'Kerala',
    type: 'Private',
    establishedYear: 1944,
    description: 'Sacred Heart College Thevara is a Catholic college affiliated with Mahatma Gandhi University. Offers programs in arts, science, and commerce.',
    campusImage: 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/35/Sacred_Heart_College_Thevara.jpg/1280px-Sacred_Heart_College_Thevara.jpg',
    accreditation: ['NAAC A+', 'Autonomous'],
    campusSize: '25 Acres',
    collegeType: 'arts_science_top',
  },
  {
    name: 'St. Teresa\'s College Ernakulam',
    city: 'Ernakulam',
    state: 'Kerala',
    type: 'Private',
    establishedYear: 1925,
    description: 'St. Teresa\'s College is a Catholic women\'s college in Ernakulam affiliated with Mahatma Gandhi University.',
    campusImage: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c5/St_Teresas_College_Ernakulam.jpg/1280px-St_Teresas_College_Ernakulam.jpg',
    accreditation: ['NAAC A+', 'Autonomous'],
    campusSize: '14 Acres',
    collegeType: 'arts_science_top',
  },
  {
    name: 'St. Albert\'s College Ernakulam',
    city: 'Ernakulam',
    state: 'Kerala',
    type: 'Private',
    establishedYear: 1946,
    description: 'St. Albert\'s College is an autonomous arts and science college in Ernakulam affiliated with Mahatma Gandhi University.',
    campusImage: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/8f/Kochi_Skyline.jpg/1280px-Kochi_Skyline.jpg',
    accreditation: ['NAAC A+', 'Autonomous'],
    campusSize: '15 Acres',
    collegeType: 'arts_science',
  },
  {
    name: 'Government Medical College Kozhikode',
    city: 'Kozhikode',
    state: 'Kerala',
    type: 'Government',
    establishedYear: 1957,
    description: 'Government Medical College Kozhikode is a major medical college in Kerala. Offers MBBS, postgraduate medical programs and super-specialty courses.',
    campusImage: 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/76/Government_Medical_College_Kozhikode.jpg/1280px-Government_Medical_College_Kozhikode.jpg',
    accreditation: ['NMC Recognized'],
    campusSize: '50 Acres',
    collegeType: 'medical_government',
  },
  {
    name: 'University of Calicut',
    city: 'Calicut',
    state: 'Kerala',
    type: 'Government',
    establishedYear: 1968,
    description: 'University of Calicut is the largest university in Kerala. Offers a wide range of programs across all disciplines.',
    campusImage: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/56/University_of_Calicut.jpg/1280px-University_of_Calicut.jpg',
    accreditation: ['UGC Recognized', 'NAAC A++'],
    campusSize: '500 Acres',
    collegeType: 'university_government',
  },
  {
    name: 'Mahatma Gandhi University Kottayam',
    city: 'Kottayam',
    state: 'Kerala',
    type: 'Government',
    establishedYear: 1983,
    description: 'MGU Kottayam is a state university in Kerala. Has affiliated colleges across central Kerala and offers diverse academic programs.',
    campusImage: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/5c/Mahatma_Gandhi_University.jpg/1280px-Mahatma_Gandhi_University.jpg',
    accreditation: ['UGC Recognized', 'NAAC A++'],
    campusSize: '109 Acres',
    collegeType: 'university_government',
  },
  {
    name: 'CMS College Kottayam',
    city: 'Kottayam',
    state: 'Kerala',
    type: 'Private',
    establishedYear: 1817,
    description: 'CMS College Kottayam is the first western-style college in India established in 1817. An autonomous college affiliated with Mahatma Gandhi University.',
    campusImage: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/89/CMS_College_Kottayam.jpg/1280px-CMS_College_Kottayam.jpg',
    accreditation: ['NAAC A+', 'Autonomous'],
    campusSize: '63 Acres',
    collegeType: 'arts_science_top',
  },
  {
    name: 'Amrita School of Engineering Coimbatore',
    city: 'Coimbatore',
    state: 'Tamil Nadu',
    type: 'Private',
    establishedYear: 1994,
    description: 'Amrita School of Engineering, Coimbatore is part of Amrita Vishwa Vidyapeetham. Top-ranked private engineering institution with strong research focus.',
    campusImage: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a6/Amrita_Vishwa_Vidyapeetham.jpg/1280px-Amrita_Vishwa_Vidyapeetham.jpg',
    accreditation: ['NAAC A++', 'NBA Accredited', 'Deemed University'],
    campusSize: '400 Acres',
    collegeType: 'engineering_top_private',
  },
  {
    name: 'Government Engineering College Bartonhill',
    city: 'Thiruvananthapuram',
    state: 'Kerala',
    type: 'Government',
    establishedYear: 1999,
    description: 'GEC Barton Hill is a government engineering college in Thiruvananthapuram affiliated with APJ Abdul Kalam Technological University.',
    campusImage: 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/1e/Trivandrum.jpg/1280px-Trivandrum.jpg',
    accreditation: ['NBA Accredited', 'AICTE'],
    campusSize: '50 Acres',
    collegeType: 'engineering_government',
  },

  // ============ TELANGANA ============
  {
    name: 'Osmania Medical College Hyderabad',
    city: 'Hyderabad',
    state: 'Telangana',
    type: 'Government',
    establishedYear: 1846,
    description: 'Osmania Medical College is one of the oldest and most prestigious medical colleges in India. Affiliated with Kaloji Narayana Rao University of Health Sciences.',
    campusImage: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/55/Osmania_Medical_College.jpg/1280px-Osmania_Medical_College.jpg',
    accreditation: ['NMC Recognized'],
    campusSize: '60 Acres',
    collegeType: 'medical_government',
  },
  {
    name: 'Gandhi Medical College Hyderabad',
    city: 'Hyderabad',
    state: 'Telangana',
    type: 'Government',
    establishedYear: 1954,
    description: 'Gandhi Medical College is a government medical college in Hyderabad affiliated with Kaloji Narayana Rao University of Health Sciences.',
    campusImage: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/8d/Gandhi_Medical_College_Hyderabad.jpg/1280px-Gandhi_Medical_College_Hyderabad.jpg',
    accreditation: ['NMC Recognized'],
    campusSize: '50 Acres',
    collegeType: 'medical_government',
  },
  {
    name: 'Nizam College Hyderabad',
    city: 'Hyderabad',
    state: 'Telangana',
    type: 'Government',
    establishedYear: 1887,
    description: 'Nizam College is one of the oldest colleges in India established in 1887. An autonomous government college affiliated with Osmania University.',
    campusImage: 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/95/NizamCollege.jpg/1280px-NizamCollege.jpg',
    accreditation: ['NAAC A+', 'Autonomous'],
    campusSize: '17 Acres',
    collegeType: 'arts_science_top',
  },
  {
    name: 'St. Francis College for Women Hyderabad',
    city: 'Hyderabad',
    state: 'Telangana',
    type: 'Private',
    establishedYear: 1959,
    description: 'St. Francis College for Women is a Catholic autonomous women\'s college in Hyderabad affiliated with Osmania University.',
    campusImage: 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/63/Hyderabad_Skyline.jpg/1280px-Hyderabad_Skyline.jpg',
    accreditation: ['NAAC A+', 'Autonomous'],
    campusSize: '15 Acres',
    collegeType: 'arts_science_top',
  },
  {
    name: 'CBIT Chaitanya Bharathi Institute of Technology Hyderabad',
    city: 'Hyderabad',
    state: 'Telangana',
    type: 'Private',
    establishedYear: 1979,
    description: 'CBIT is a top private engineering college in Hyderabad affiliated with Osmania University. Known for excellent placements and quality education.',
    campusImage: 'https://upload.wikimedia.org/wikipedia/commons/thumb/f/f3/Main_Entrance_CBIT.jpg/1280px-Main_Entrance_CBIT.jpg',
    accreditation: ['NAAC A+', 'NBA Accredited', 'Autonomous'],
    campusSize: '57 Acres',
    collegeType: 'engineering_top_private',
  },
  {
    name: 'Vasavi College of Engineering Hyderabad',
    city: 'Hyderabad',
    state: 'Telangana',
    type: 'Private',
    establishedYear: 1981,
    description: 'Vasavi College of Engineering is a top private engineering college in Hyderabad affiliated with Osmania University.',
    campusImage: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c4/Hyderabad_Charminar.jpg/1280px-Hyderabad_Charminar.jpg',
    accreditation: ['NAAC A+', 'NBA Accredited', 'Autonomous'],
    campusSize: '11 Acres',
    collegeType: 'engineering_top_private',
  },

  // ============ ANDHRA PRADESH ============
  {
    name: 'Andhra Medical College Visakhapatnam',
    city: 'Visakhapatnam',
    state: 'Andhra Pradesh',
    type: 'Government',
    establishedYear: 1923,
    description: 'Andhra Medical College is one of the oldest medical colleges in India. Affiliated with NTR University of Health Sciences and offers MBBS, postgraduate, and super-specialty programs.',
    campusImage: 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/6f/Andhra_Medical_College.jpg/1280px-Andhra_Medical_College.jpg',
    accreditation: ['NMC Recognized'],
    campusSize: '50 Acres',
    collegeType: 'medical_government',
  },
  {
    name: 'Andhra University Visakhapatnam',
    city: 'Visakhapatnam',
    state: 'Andhra Pradesh',
    type: 'Government',
    establishedYear: 1926,
    description: 'Andhra University is a state university in Visakhapatnam, one of the oldest universities in India. Offers diverse programs across all disciplines.',
    campusImage: 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e8/Andhra_University.jpg/1280px-Andhra_University.jpg',
    accreditation: ['UGC Recognized', 'NAAC A++'],
    campusSize: '422 Acres',
    collegeType: 'university_government',
  },
  {
    name: 'Sri Venkateswara University Tirupati',
    city: 'Tirupati',
    state: 'Andhra Pradesh',
    type: 'Government',
    establishedYear: 1954,
    description: 'Sri Venkateswara University in Tirupati is a state university known for its diverse programs and strong research culture.',
    campusImage: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c0/Sri_Venkateswara_University_Tirupati.jpg/1280px-Sri_Venkateswara_University_Tirupati.jpg',
    accreditation: ['UGC Recognized', 'NAAC A+'],
    campusSize: '1000 Acres',
    collegeType: 'university_government',
  },
  {
    name: 'GITAM (Gandhi Institute of Technology and Management) Visakhapatnam',
    city: 'Visakhapatnam',
    state: 'Andhra Pradesh',
    type: 'Private',
    establishedYear: 1980,
    description: 'GITAM is a deemed university in Visakhapatnam offering programs across engineering, management, science, pharmacy, and architecture.',
    campusImage: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/8e/GITAM_Visakhapatnam.jpg/1280px-GITAM_Visakhapatnam.jpg',
    accreditation: ['UGC Deemed University', 'NAAC A++'],
    campusSize: '110 Acres',
    collegeType: 'university_top',
  },

  // ============ PUDUCHERRY ============
  {
    name: 'Indira Gandhi Medical College and Research Institute Puducherry',
    city: 'Puducherry',
    state: 'Puducherry',
    type: 'Government',
    establishedYear: 2010,
    description: 'IGMCRI is a government medical college in Puducherry offering MBBS and postgraduate medical programs.',
    campusImage: 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d3/Pondicherry_Beach.jpg/1280px-Pondicherry_Beach.jpg',
    accreditation: ['NMC Recognized'],
    campusSize: '50 Acres',
    collegeType: 'medical_government',
  },
];

// Course assignment by college type
function getCoursesForType(type: string): string[] {
  switch (type) {
    case 'engineering_top_private':
    case 'engineering_top_government':
      return [
        'B.Tech Computer Science and Engineering', 'B.Tech Information Technology',
        'B.Tech Electronics and Communication Engineering', 'B.Tech Electrical Engineering',
        'B.Tech Mechanical Engineering', 'B.Tech Civil Engineering',
        'B.Tech Chemical Engineering', 'B.Tech Biotechnology',
        'B.Tech Artificial Intelligence and Machine Learning', 'B.Tech Data Science',
        'B.Tech Aerospace Engineering', 'B.Tech Industrial Engineering',
        'M.Tech Computer Science', 'M.Tech Electronics', 'M.Tech Mechanical', 'M.Tech Civil',
        'MBA (Master of Business Administration)', 'BBA (Bachelor of Business Administration)',
      ];
    case 'engineering_private':
    case 'engineering_government':
      return [
        'B.Tech Computer Science and Engineering', 'B.Tech Information Technology',
        'B.Tech Electronics and Communication Engineering', 'B.Tech Electrical Engineering',
        'B.Tech Mechanical Engineering', 'B.Tech Civil Engineering',
        'M.Tech Computer Science', 'M.Tech Mechanical',
      ];
    case 'medical_government':
    case 'medical_top_private':
      return [
        'MBBS (Bachelor of Medicine, Bachelor of Surgery)',
        'MD General Medicine', 'MD Pediatrics', 'MD Psychiatry', 'MD Dermatology', 'MD Radiology',
        'MD Anesthesia', 'MD Pathology', 'MS General Surgery', 'MS Orthopedics',
        'MS Obstetrics and Gynecology', 'MS Ophthalmology', 'MS ENT (Otorhinolaryngology)',
        'B.Sc Nursing', 'M.Sc Nursing',
      ];
    case 'medical_private':
      return [
        'MBBS (Bachelor of Medicine, Bachelor of Surgery)',
        'MD General Medicine', 'MS General Surgery', 'MD Pediatrics',
        'B.Sc Nursing',
      ];
    case 'dental_top':
      return [
        'BDS (Bachelor of Dental Surgery)',
        'MDS Orthodontics', 'MDS Periodontics', 'MDS Conservative Dentistry',
        'MDS Oral and Maxillofacial Surgery', 'MDS Pediatric Dentistry', 'MDS Prosthodontics',
      ];
    case 'arts_science_top':
    case 'arts_science':
      return [
        'BA (Bachelor of Arts)', 'BA Economics', 'BA English Literature', 'BA History',
        'BA Political Science', 'BA Sociology', 'BA Psychology', 'BA Philosophy',
        'B.Sc Physics', 'B.Sc Chemistry', 'B.Sc Mathematics', 'B.Sc Biology',
        'B.Sc Computer Science', 'B.Sc Statistics', 'BCA (Bachelor of Computer Applications)',
        'B.Com (Bachelor of Commerce)', 'B.Com (Honours)',
        'MA (Master of Arts)', 'MA Economics', 'MA English', 'MA History',
        'M.Sc Physics', 'M.Sc Chemistry', 'M.Sc Mathematics', 'M.Sc Computer Science',
        'M.Com (Master of Commerce)', 'BBA (Bachelor of Business Administration)',
      ];
    case 'commerce_top':
      return [
        'B.Com (Bachelor of Commerce)', 'B.Com (Honours)', 'B.Com Banking and Finance',
        'B.Com Accounting and Finance', 'B.Com Taxation', 'B.Com International Business',
        'B.Com with ACCA', 'M.Com (Master of Commerce)', 'M.Com Finance',
        'BBA (Bachelor of Business Administration)', 'BBA Finance', 'BBA Marketing',
        'CA (Chartered Accountancy)', 'CMA (Cost Management Accountant)',
      ];
    case 'management_top':
      return [
        'MBA (Master of Business Administration)', 'MBA Finance', 'MBA Marketing',
        'MBA Human Resources', 'MBA Operations Management', 'MBA International Business',
        'MBA Business Analytics', 'PGDM (Post Graduate Diploma in Management)',
        'Executive MBA', 'BBA (Bachelor of Business Administration)',
      ];
    case 'university_top':
    case 'university_government':
      return [
        'B.Tech Computer Science and Engineering', 'B.Tech Information Technology',
        'B.Tech Electronics and Communication Engineering', 'B.Tech Mechanical Engineering',
        'B.Tech Civil Engineering', 'B.Tech Electrical Engineering',
        'M.Tech Computer Science',
        'MBA (Master of Business Administration)', 'BBA (Bachelor of Business Administration)',
        'BA (Bachelor of Arts)', 'BA Economics', 'BA English Literature',
        'B.Sc Physics', 'B.Sc Chemistry', 'B.Sc Mathematics', 'B.Sc Computer Science',
        'B.Sc Biology', 'M.Sc Physics', 'M.Sc Chemistry', 'M.Sc Mathematics',
        'B.Com (Bachelor of Commerce)', 'M.Com (Master of Commerce)',
        'LLB (Bachelor of Laws)', 'LLM (Master of Laws)',
        'BCA (Bachelor of Computer Applications)', 'MCA (Master of Computer Applications)',
        'PhD (Doctor of Philosophy)', 'PhD Computer Science', 'PhD Engineering',
      ];
    default:
      return ['BA (Bachelor of Arts)', 'B.Com (Bachelor of Commerce)'];
  }
}

function getTier(type: string): string {
  if (type.includes('top_government') || type === 'engineering_top_government') return 'TopGov';
  if (type === 'medical_government' || type === 'engineering_government' || type === 'university_government') return 'Government';
  if (type.includes('top')) return 'TopPrivate';
  return 'Private';
}

function getFeeForCourseAndTier(tier: string, courseName: string, defaultFee: string): string {
  const cn = courseName.toLowerCase();
  if (tier === 'Government') {
    if (cn.startsWith('b.tech')) return '₹15,000 - ₹50,000 / year';
    if (cn.includes('mbbs')) return '₹30,000 - ₹1,50,000 / year';
    if (cn.startsWith('ba ')) return '₹6,000 - ₹25,000 / year';
    if (cn.startsWith('b.com')) return '₹8,000 - ₹30,000 / year';
    if (cn.startsWith('b.sc')) return '₹10,000 - ₹40,000 / year';
    if (cn.includes('m.tech')) return '₹15,000 - ₹40,000 / year';
    return '₹15,000 - ₹50,000 / year';
  }
  if (tier === 'TopPrivate') {
    if (cn.startsWith('b.tech')) return '₹2,80,000 - ₹4,50,000 / year';
    if (cn.includes('mbbs')) return '₹15,00,000 - ₹22,00,000 / year';
    if (cn.includes('mba')) return '₹6,00,000 - ₹14,00,000 / year';
    if (cn.includes('llb')) return '₹2,80,000 - ₹4,50,000 / year';
    if (cn.includes('bba') || cn.includes('bca')) return '₹1,80,000 - ₹3,50,000 / year';
    if (cn.startsWith('b.com')) return '₹1,50,000 - ₹3,00,000 / year';
    if (cn.startsWith('b.sc')) return '₹1,50,000 - ₹3,50,000 / year';
    return '₹1,80,000 - ₹3,50,000 / year';
  }
  return defaultFee;
}

const PLACEMENT_TRENDS = (avg: number) => [
  { year: '2020', avgSalary: String(avg - 1.5), placementPercentage: '85' },
  { year: '2021', avgSalary: String(avg - 1.0), placementPercentage: '88' },
  { year: '2022', avgSalary: String(avg - 0.5), placementPercentage: '92' },
  { year: '2023', avgSalary: String(avg), placementPercentage: '94' },
  { year: '2024', avgSalary: String(avg + 0.8), placementPercentage: '96' },
];

const HOSTEL_POOL = [
  'https://images.unsplash.com/photo-1555854877-bab0e564b8d5?w=1280&q=80',
  'https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=1280&q=80',
  'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=1280&q=80',
  'https://images.unsplash.com/photo-1540541338287-41700207dee6?w=1280&q=80',
];

const LAB_POOL = [
  'https://images.unsplash.com/photo-1581093458791-9d09c5e96d2e?w=1280&q=80',
  'https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?w=1280&q=80',
  'https://images.unsplash.com/photo-1518152006812-edab29b069ac?w=1280&q=80',
];

const EVENTS_POOL = [
  'https://images.unsplash.com/photo-1505373877841-8d25f7d46678?w=1280&q=80',
  'https://images.unsplash.com/photo-1492538368677-f6e0afe31dcc?w=1280&q=80',
  'https://images.unsplash.com/photo-1497486751825-1233686d5d80?w=1280&q=80',
];

function pickFromPool(pool: string[], seed: string, idx: number): string {
  const s = (seed + idx).split('').reduce((a, c) => a + c.charCodeAt(0), 0);
  return pool[s % pool.length];
}

function getAmenities(type: string): string[] {
  const base = ['Library', 'Wifi Campus', 'Cafeteria', 'Sports Ground', 'Hostel', 'Medical Facility', 'Computer Lab', 'Auditorium'];
  if (type.includes('engineering')) base.push('Robotics Lab', 'Workshop', 'CAD Lab');
  if (type.includes('medical')) base.push('Hospital', 'Anatomy Lab', 'Operation Theatre');
  if (type.includes('management')) base.push('Trading Lab', 'Case Study Rooms');
  if (type.includes('top')) base.push('Gym', 'Innovation Hub', 'Swimming Pool', 'Career Cell');
  return [...new Set(base)];
}

async function main() {
  await mongoose.connect(MONGO_URI);
  const db = mongoose.connection.db!;

  // Get courses
  const courses = await db.collection('courses').find({}).toArray();
  const courseMap = new Map(courses.map(c => [c.name, c]));

  // Get default university or create generic one
  const defaultUni = await db.collection('universities').findOne({});

  console.log(`Adding ${NEW_COLLEGES.length} South India colleges...`);
  let added = 0, skipped = 0;

  for (const newCollege of NEW_COLLEGES) {
    // Check if already exists
    const existing = await db.collection('colleges').findOne({ name: newCollege.name });
    if (existing) {
      console.log(`  SKIP (exists): ${newCollege.name}`);
      skipped++;
      continue;
    }

    const tier = getTier(newCollege.collegeType);
    const courseNames = getCoursesForType(newCollege.collegeType);
    const courseIds: any[] = [];
    const offerings: any[] = [];

    for (const cn of courseNames) {
      const courseDoc = courseMap.get(cn);
      if (!courseDoc) continue;
      courseIds.push(courseDoc._id);
      offerings.push({
        courseId: courseDoc._id,
        courseName: cn,
        fees: getFeeForCourseAndTier(tier, cn, courseDoc.fees),
        intake: '40-90 seats',
        duration: courseDoc.duration,
      });
    }

    const slug = newCollege.name.toLowerCase().replace(/[^a-z0-9 ]/g, '').replace(/\s+/g, '').substring(0, 25);
    const avgSalary = newCollege.collegeType.includes('top') ? 12 : newCollege.collegeType.includes('medical') ? 9 : 6;

    const newDoc: any = {
      name: newCollege.name,
      slug,
      city: newCollege.city,
      state: newCollege.state,
      country: 'India',
      address: `${newCollege.city}, ${newCollege.state}, India`,
      type: newCollege.type,
      establishedYear: newCollege.establishedYear,
      description: newCollege.description,
      logo: `https://images.unsplash.com/photo-1562774053-701939374585?w=200&q=80`,
      campusImages: [newCollege.campusImage],
      hostelImages: [
        pickFromPool(HOSTEL_POOL, newCollege.name, 0),
        pickFromPool(HOSTEL_POOL, newCollege.name, 1),
      ],
      labsImages: [
        pickFromPool(LAB_POOL, newCollege.name, 0),
        pickFromPool(LAB_POOL, newCollege.name, 1),
      ],
      eventsImages: [
        pickFromPool(EVENTS_POOL, newCollege.name, 0),
        pickFromPool(EVENTS_POOL, newCollege.name, 1),
      ],
      accreditation: newCollege.accreditation,
      campusSize: newCollege.campusSize,
      amenities: getAmenities(newCollege.collegeType),
      phone: '+91-XXX-XXX-XXXX',
      email: `info@${slug}.ac.in`,
      website: `https://www.${slug}.ac.in`,
      annualFee: tier === 'Government' ? '₹15,000 - ₹50,000 / year' :
                 tier === 'TopPrivate' ? '₹2,40,000 - ₹4,50,000 / year' :
                 '₹1,20,000 - ₹3,50,000 / year',
      avgAnnualFee: tier === 'Government' ? '₹15,000 - ₹50,000 / year' :
                    tier === 'TopPrivate' ? '₹2,40,000 - ₹4,50,000 / year' :
                    '₹1,20,000 - ₹3,50,000 / year',
      hostelFee: '₹30,000 / year',
      messFee: '₹40,000 / year',
      libraryFee: '₹5,000 / year',
      laboratoryFee: '₹10,000 / year',
      sportsFee: '₹3,000 / year',
      placementPercentage: 85 + Math.floor(Math.random() * 12),
      averageSalary: `${avgSalary}`,
      highestSalary: `${avgSalary * 4}`,
      placementTrends: PLACEMENT_TRENDS(avgSalary),
      studentsWithInternships: 75 + Math.floor(Math.random() * 20),
      avgStipend: 25000 + Math.floor(Math.random() * 25000),
      ppoConversionRate: 60 + Math.floor(Math.random() * 25),
      alumniInFortune500: 5 + Math.floor(Math.random() * 15),
      alumniEntrepreneurs: 8 + Math.floor(Math.random() * 12),
      alumniHigherStudiesAbroad: 10 + Math.floor(Math.random() * 20),
      courses: courseIds,
      courseOfferings: offerings,
      university: defaultUni?._id,
      recruiters: [],
      scholarships: [],
      campusLife: [
        {
          title: 'Sports & Athletics',
          description: `${newCollege.name} has dedicated sports facilities supporting cricket, football, basketball, and athletics.`,
          verified: true,
          tags: ['sports', 'athletics'],
          image: 'https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=1280&q=80',
          source: 'Student Affairs',
          isActive: true,
        },
        {
          title: 'Student Clubs & Societies',
          description: 'Active student clubs covering technical, cultural, literary, and social interests.',
          verified: true,
          tags: ['clubs', 'activities'],
          image: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=1280&q=80',
          source: 'Student Affairs',
          isActive: true,
        },
        {
          title: 'Cultural Festivals',
          description: 'Annual cultural and technical festivals attracting participation from across India.',
          verified: true,
          tags: ['cultural', 'fest'],
          image: 'https://images.unsplash.com/photo-1523854588497-ed29b21a3a1a?w=1280&q=80',
          source: 'Student Affairs',
          isActive: true,
        },
      ],
      admissionMode: [
        { mode: 'Entrance Exam', label: 'Entrance', description: 'Admission through national/state entrance examinations' },
        { mode: 'Direct Admission', label: 'Direct', description: 'Direct admission for select programs based on merit' },
      ],
      applicationOpeningDate: new Date('2026-03-01'),
      applicationClosingDate: new Date('2026-06-30'),
      entranceExamDate: new Date('2026-05-15'),
      meritListAnnouncementDate: new Date('2026-07-15'),
      counsellingStartsFrom: new Date('2026-08-01'),
      accademicSectionStartsFrom: new Date('2026-08-15'),
      admissionFaqs: [
        { question: 'What is the admission process?', answer: 'Admission is through entrance exams, merit-based selection, or direct admission depending on the program. Visit the official website for current admission notifications.' },
        { question: 'When do applications open?', answer: 'Applications typically open in March-April for the upcoming academic year. Check the official website for exact dates.' },
        { question: 'Are there reserved seats?', answer: 'Yes, reservation policies as per Government of India and state government norms apply for SC/ST/OBC and other categories.' },
      ],
      courseFaqs: [
        { question: 'What courses are offered?', answer: 'The college offers a variety of undergraduate and postgraduate programs across multiple disciplines. Refer to the courses section for the complete list.' },
        { question: 'Is the curriculum updated?', answer: 'Yes, the curriculum is regularly updated to align with industry standards and academic best practices.' },
        { question: 'Are there elective options?', answer: 'Yes, students can choose from various elective subjects to specialize in their areas of interest.' },
      ],
      feesPaymentFaqs: [
        { question: 'Is EMI option available?', answer: 'Most institutions have tie-ups with banks for education loans and semester-wise payment options.' },
        { question: 'Can fees be paid online?', answer: 'Yes, fees can be paid through the institute\'s online payment portal.' },
        { question: 'Is there a refund policy?', answer: 'Refunds are processed as per the institute\'s policy and UGC/AICTE guidelines.' },
      ],
      scholarshipFaqs: [
        { question: 'What scholarships are available?', answer: 'Various merit-based, need-based, and government scholarships are available. Check the scholarships section for details.' },
        { question: 'How to apply for scholarships?', answer: 'Scholarship applications are usually processed during admission or at the start of each academic year.' },
        { question: 'Are scholarships available for SC/ST students?', answer: 'Yes, government scholarships are available for SC/ST students as per government norms.' },
      ],
      brochure: '',
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    await db.collection('colleges').insertOne(newDoc);
    added++;
    console.log(`  ADDED: ${newCollege.name}`);
  }

  console.log(`\n=== DONE ===`);
  console.log(`Added: ${added}`);
  console.log(`Skipped (existing): ${skipped}`);

  // Verify totals
  const totalColleges = await db.collection('colleges').countDocuments();
  console.log(`\nTotal colleges in DB: ${totalColleges}`);

  // South India new totals
  const southStates = ['Karnataka', 'Tamil Nadu', 'Kerala', 'Andhra Pradesh', 'Telangana', 'Puducherry'];
  for (const s of southStates) {
    const count = await db.collection('colleges').countDocuments({ state: s });
    console.log(`  ${s}: ${count}`);
  }

  await mongoose.disconnect();
}

main().catch(console.error);
