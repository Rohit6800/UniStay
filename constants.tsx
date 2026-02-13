
import { Room } from './types';

export const STATES_DATA = [
  {
    name: "Delhi",
    cities: ["New Delhi", "North Delhi", "South Delhi"]
  },
  {
    name: "Jharkhand",
    cities: ["Ranchi", "Jamshedpur", "Dhanbad", "Bokaro", "Hazaribagh", "Deoghar", "Giridih", "Ramgarh", "Chaibasa", "Dumka"]
  },
  {
    name: "Bihar",
    cities: ["Patna", "Gaya", "Muzaffarpur", "Bhagalpur", "Darbhanga", "Purnia", "Ara", "Begusarai", "Katihar", "Munger"]
  },
  {
    name: "Uttar Pradesh",
    cities: ["Lucknow", "Kanpur", "Varanasi", "Agra", "Prayagraj", "Meerut", "Ghaziabad", "Noida", "Gorakhpur", "Aligarh"]
  },
  {
    name: "West Bengal",
    cities: ["Kolkata", "Howrah", "Durgapur", "Asansol", "Siliguri", "Darjeeling", "Malda", "Kharagpur", "Haldia", "Bardhaman"]
  },
  {
    name: "Maharashtra",
    cities: ["Mumbai", "Pune", "Nagpur", "Nashik", "Thane", "Aurangabad", "Solapur", "Kolhapur", "Amravati", "Nanded"]
  },
  {
    name: "Tamil Nadu",
    cities: ["Chennai", "Coimbatore", "Madurai", "Salem", "Tiruchirappalli", "Vellore", "Erode", "Thoothukudi", "Tirunelveli", "Kanchipuram"]
  },
  {
    name: "Karnataka",
    cities: ["Bengaluru", "Mysuru", "Mangaluru", "Hubballi", "Belagavi", "Shivamogga", "Ballari", "Davanagere", "Udupi", "Tumakuru"]
  },
  {
    name: "Rajasthan",
    cities: ["Jaipur", "Jodhpur", "Udaipur", "Kota", "Ajmer", "Bikaner", "Alwar", "Bharatpur", "Sikar", "Pali"]
  },
  {
    name: "Gujarat",
    cities: ["Ahmedabad", "Surat", "Vadodara", "Rajkot", "Bhavnagar", "Jamnagar", "Junagadh", "Gandhinagar", "Anand", "Mehsana"]
  },
  {
    name: "Madhya Pradesh",
    cities: ["Bhopal", "Indore", "Gwalior", "Jabalpur", "Ujjain", "Sagar", "Satna", "Rewa", "Ratlam", "Chhindwara"]
  }
];

export const STATE_COLLEGE_MAPPING: Record<string, string[]> = {
  "Delhi": ["DU North Campus", "DU South Campus", "IIT Delhi", "JNU"],
  "Jharkhand": [
    "Sarala Birla University",
    "Ranchi University",
    "Birla Institute of Technology (BIT Mesra)",
    "Central University of Jharkhand",
    "National University of Study and Research in Law (NUSRL)",
    "Rajendra Institute of Medical Sciences (RIMS)",
    "St. Xavier’s College, Ranchi",
    "Amity University, Ranchi",
    "ICFAI University, Jharkhand",
    "Yogoda Satsanga Mahavidyalaya, Ranchi"
  ],
  "Bihar": [
    "Patna University",
    "Magadh University",
    "Lalit Narayan Mithila University",
    "Tilka Manjhi Bhagalpur University",
    "BRA Bihar University",
    "Nalanda Open University",
    "Purnea University",
    "Veer Kunwar Singh University",
    "IIT Patna",
    "NIT Patna"
  ],
  "Uttar Pradesh": [
    "Banaras Hindu University",
    "University of Lucknow",
    "Aligarh Muslim University",
    "IIT Kanpur",
    "Allahabad University",
    "Dr. APJ Abdul Kalam Technical University",
    "Amity University Noida",
    "CCS University Meerut",
    "Deen Dayal Upadhyay Gorakhpur University",
    "Sharda University"
  ],
  "West Bengal": [
    "University of Calcutta",
    "Jadavpur University",
    "IIT Kharagpur",
    "Presidency University",
    "University of Burdwan",
    "University of North Bengal",
    "Kalyani University",
    "Visva-Bharati University",
    "NIT Durgapur",
    "Techno India University"
  ],
  "Maharashtra": [
    "University of Mumbai",
    "Savitribai Phule Pune University",
    "Nagpur University",
    "Shivaji University",
    "Solapur University",
    "SNDT Women’s University",
    "Tata Institute of Social Sciences",
    "IIT Bombay",
    "NMIMS University",
    "Bharati Vidyapeeth University"
  ],
  "Tamil Nadu": [
    "University of Madras",
    "Anna University",
    "Bharathiar University",
    "Madurai Kamaraj University",
    "Periyar University",
    "NIT Trichy",
    "VIT University",
    "SRM Institute of Science and Technology",
    "SASTRA University",
    "Manonmaniam Sundaranar University"
  ],
  "Karnataka": [
    "Bangalore University",
    "University of Mysore",
    "NITK Surathkal",
    "Manipal Academy of Higher Education",
    "Kuvempu University",
    "Visvesvaraya Technological University",
    "Christ University",
    "Jain University",
    "Rani Channamma University",
    "Tumkur University"
  ],
  "Rajasthan": [
    "University of Rajasthan",
    "Jai Narain Vyas University",
    "Mohanlal Sukhadia University",
    "University of Kota",
    "Bikaner Technical University",
    "Rajasthan Technical University",
    "Amity University Jaipur",
    "JECRC University",
    "Mody University",
    "Central University of Rajasthan"
  ],
  "Gujarat": [
    "Gujarat University",
    "Sardar Patel University",
    "Maharaja Sayajirao University",
    "Gujarat Technological University",
    "Nirma University",
    "Pandit Deendayal Energy University",
    "Charotar University of Science and Technology",
    "Ahmedabad University",
    "Veer Narmad South Gujarat University",
    "Ganpat University"
  ],
  "Madhya Pradesh": [
    "Devi Ahilya Vishwavidyalaya",
    "Barkatullah University",
    "Jiwaji University",
    "Rani Durgavati University",
    "Vikram University",
    "Dr. Harisingh Gour University",
    "Rajiv Gandhi Proudyogiki Vishwavidyalaya",
    "MANIT Bhopal",
    "Amity University Gwalior",
    "ITM University Gwalior"
  ]
};

export const MOCK_ROOMS: Room[] = [
  // Sarala Birla University - 5 Unique Rooms
  {
    id: 'sbu-v1',
    title: 'Modern Single Room near SBU Campus',
    type: 'Single',
    rent: 3200,
    deposit: 3000,
    location: 'Namkum, Ranchi',
    state: 'Jharkhand',
    city: 'Ranchi',
    collegeName: 'Sarala Birla University',
    distance: 0.6,
    photos: [
      'https://images.unsplash.com/photo-1595526114035-0d45ed16cfbf?q=80&w=800', // Bedroom 1
      'https://images.unsplash.com/photo-1556911220-e15224bbafb0?q=80&w=800', // Kitchen 1
      'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?q=80&w=800'  // Bathroom 1
    ],
    isVerified: true,
    isFeatured: true,
    amenities: ['WiFi', 'Study Desk', '24/7 Water'],
    furnished: true,
    attachedBathroom: false,
    ac: false,
    genderPref: 'Boys',
    availableFrom: 'Immediately',
    rules: ['No alcohol', 'In-time 10 PM'],
    ownerName: 'Amit Mahato',
    ownerPhone: '+91 9431102233',
    safety: { rating: 4.5, policeProximity: '1.2km away', lighting: 'Excellent' },
    reviews: [],
    coordinates: { lat: 23.3361, lng: 85.3857 }
  },
  {
    id: 'sbu-v2',
    title: 'Spacious 2-Sharing Room for Girls',
    type: 'Sharing',
    rent: 4500,
    deposit: 4000,
    location: 'Tatisilwai, Ranchi',
    state: 'Jharkhand',
    city: 'Ranchi',
    collegeName: 'Sarala Birla University',
    distance: 1.1,
    photos: [
      'https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?q=80&w=800', // Bedroom 2
      'https://images.unsplash.com/photo-1588854337236-6889d631faa8?q=80&w=800', // Kitchen 2
      'https://images.unsplash.com/photo-1620626011761-9963d7b69763?q=80&w=800'  // Bathroom 2
    ],
    isVerified: true,
    isFeatured: false,
    amenities: ['Mess Included', 'Security', 'WiFi'],
    furnished: true,
    attachedBathroom: true,
    ac: false,
    genderPref: 'Girls',
    availableFrom: '1st June',
    rules: ['Entry by 9 PM', 'No guests in room'],
    ownerName: 'Mrs. Suman Devi',
    ownerPhone: '+91 8877661122',
    safety: { rating: 4.9, policeProximity: '500m away', lighting: 'Very Good' },
    reviews: [],
    coordinates: { lat: 23.3444, lng: 85.4215 }
  },
  {
    id: 'sbu-v3',
    title: 'Budget 3-Sharing Students Hub',
    type: 'Sharing',
    rent: 2000,
    deposit: 2000,
    location: 'Namkum Station Road, Ranchi',
    state: 'Jharkhand',
    city: 'Ranchi',
    collegeName: 'Sarala Birla University',
    distance: 0.8,
    photos: [
      'https://images.unsplash.com/photo-1536376074432-cd2258d5f262?q=80&w=800', // Bedroom 3
      'https://images.unsplash.com/photo-1510133769068-081900138994?q=80&w=800', // Kitchen 3
      'https://images.unsplash.com/photo-1564540586988-aa4e53c3d799?q=80&w=800'  // Bathroom 3
    ],
    isVerified: false,
    isFeatured: false,
    amenities: ['Fan', 'Common Room', 'Purified Water'],
    furnished: false,
    attachedBathroom: false,
    ac: false,
    genderPref: 'Boys',
    availableFrom: 'Immediately',
    rules: ['Maintenance extra', 'Quiet hours after 11 PM'],
    ownerName: 'Rajesh Oraon',
    ownerPhone: '+91 7000119988',
    safety: { rating: 3.8, policeProximity: '3km away', lighting: 'Good' },
    reviews: [],
    coordinates: { lat: 23.3412, lng: 85.3912 }
  },
  {
    id: 'sbu-v4',
    title: 'Premium Studio with AC near SBU',
    type: 'Single',
    rent: 8500,
    deposit: 15000,
    location: 'Khelgaon Road, Ranchi',
    state: 'Jharkhand',
    city: 'Ranchi',
    collegeName: 'Sarala Birla University',
    distance: 2.8,
    photos: [
      'https://images.unsplash.com/photo-1616594831707-3c77b5839460?q=80&w=800', // Bedroom 4
      'https://images.unsplash.com/photo-1600585154542-4912f1f22144?q=80&w=800', // Kitchen 4
      'https://images.unsplash.com/photo-1507652313519-d4e9174996dd?q=80&w=800'  // Bathroom 4
    ],
    isVerified: true,
    isFeatured: true,
    amenities: ['AC', 'Smart TV', 'Balcony', 'Modular Kitchen'],
    furnished: true,
    attachedBathroom: true,
    ac: true,
    genderPref: 'Co-ed',
    availableFrom: 'Immediately',
    rules: ['No smoking', 'Electricity as per meter'],
    ownerName: 'Vikram Singh',
    ownerPhone: '+91 6200114455',
    safety: { rating: 4.7, policeProximity: '800m away', lighting: 'Excellent' },
    reviews: [],
    coordinates: { lat: 23.3751, lng: 85.3621 }
  },
  {
    id: 'sbu-v5',
    title: 'Cozy PG with Home Style Mess',
    type: 'PG',
    rent: 5500,
    deposit: 5000,
    location: 'Mahilong, Ranchi',
    state: 'Jharkhand',
    city: 'Ranchi',
    collegeName: 'Sarala Birla University',
    distance: 0.5,
    photos: [
      'https://images.unsplash.com/photo-1555854816-802f188095e4?q=80&w=800', // Bedroom 5
      'https://images.unsplash.com/photo-1484154218962-a197022b5858?q=80&w=800', // Kitchen 5
      'https://images.unsplash.com/photo-1503920336021-4589d81df297?q=80&w=800'  // Bathroom 5
    ],
    isVerified: true,
    isFeatured: false,
    amenities: ['All Meals', 'Laundry', 'WiFi'],
    furnished: true,
    attachedBathroom: false,
    ac: false,
    genderPref: 'Co-ed',
    availableFrom: 'Next Week',
    rules: ['Visitors allowed in lounge only'],
    ownerName: 'Father Paul',
    ownerPhone: '+91 8000999000',
    safety: { rating: 4.3, policeProximity: '1.5km away', lighting: 'Good' },
    reviews: [],
    coordinates: { lat: 23.3521, lng: 85.4022 }
  }
];
