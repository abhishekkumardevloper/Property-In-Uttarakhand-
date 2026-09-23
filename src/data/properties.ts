export interface Property {
  id: string;
  name: string;
  slug: string;
  location: string;
  district: string;
  type: "villa" | "plot" | "commercial" | "home" | "land" | "holiday";
  price: number;
  priceDisplay: string;
  area: string;
  areaValue: number;
  bedrooms?: number;
  bathrooms?: number;
  description: string;
  shortDescription: string;
  images: string[];
  videos?: string[];
  amenities: string[];
  coordinates: [number, number];
  status: "available" | "sold" | "under-construction";
  featured: boolean;
  elevation?: string;
  views?: string;
  tag?: string;
}

export const properties: Property[] = [
  // ==========================================
  // YOUR NEW PLOT LISTINGS (DR REALTOR)
  // ==========================================
  {
    id: "7",
    name: "Bajrang Vatika",
    slug: "bajrang-vatika",
    location: "Shimla Bypass Road, Mednipur Badripur",
    district: "Dehradun",
    type: "plot",
    price: 1750000, 
    priceDisplay: "₹17,500 - ₹18,500 / sq. yard",
    area: "100 - 200 sq yards",
    areaValue: 100,
    description:
      "Uttarakhand's first Hanuman-themed plotted development offering a spiritual and luxurious lifestyle. Surrounded by the pristine Rajaji National Park, this gated society features daily Hanuman Chalisa sessions, premium amenities, and breathtaking views of Mussoorie and Chakrata hills. Developed by Dr. Realtor, it provides the perfect blend of devotion, nature, and modern living.",
    shortDescription:
      "Uttarakhand's first Hanuman-themed plotted development with premium amenities and Rajaji National Park views.",
    images: [
      "https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=1400&q=80",
    ],
    amenities: [
      "Hanuman-Themed Development",
      "Gated Society with 24/7 CCTV",
      "Clubhouse & Swimming Pool",
      "Mandir & Meditation Center",
      "Vaastu-Compliant",
      "Surrounded by Rajaji National Park",
    ],
    coordinates: [30.2831, 77.9821],
    status: "available",
    featured: true,
    elevation: "1,400 ft",
    views: "Mussoorie, Chakrata Hills & Forest",
    tag: "Spiritual Living",
  },
  {
    id: "8",
    name: "The Friends Colony",
    slug: "the-friends-colony",
    location: "Delhi-Dehradun Expressway (NH-307), Khushalipur",
    district: "Dehradun",
    type: "plot",
    price: 1750000,
    priceDisplay: "₹17,500 / sq. yard",
    area: "100 - 150 sq yards",
    areaValue: 100,
    description:
      "Ready-to-move freehold plots located directly on the Delhi-Dehradun Expressway. Offering immediate possession and construction approvals, this project promises excellent future ROI due to its prime highway location. Situated just 20 minutes from ISBT Dehradun, it features 30-feet wide internal roads, underground drainage, and round-the-clock security surveillance. Developed by Dr. Realtor.",
    shortDescription:
      "Ready-to-move plots on Delhi-Dehradun Expressway offering immediate possession and high ROI.",
    images: [
      "https://images.unsplash.com/photo-1513694203232-719a280e022f?w=1400&q=80",
    ],
    amenities: [
      "Immediate Possession",
      "30-Feet Wide Internal Roads",
      "Underground Drainage",
      "24x7 Security Surveillance",
      "Green Parks",
      "Street Lighting",
    ],
    coordinates: [30.2520, 77.9510],
    status: "available",
    featured: true,
    elevation: "1,400 ft",
    views: "Highway & Greenery",
    tag: "High ROI",
  },
  {
    id: "9",
    name: "Nature Green Valley 5",
    slug: "nature-green-valley-5",
    location: "Saharanpur-Dehradun Highway (NH-307), Ganeshpur",
    district: "Dehradun",
    type: "plot",
    price: 1550000,
    priceDisplay: "₹15,500 / sq. yard",
    area: "Various Sizes",
    areaValue: 100,
    description:
      "A legally converted, 143-approved residential plotted development situated directly next to Rajaji National Park. Enjoy zero-distance access to fresh teakwood forests, premium amenities, and a completely pollution-free environment just 20 km from Dehradun ISBT. This single-entry gated community features wide roads and dedicated parks. Developed by Dr. Realtor.",
    shortDescription:
      "143-approved residential plots near Rajaji National Park on Saharanpur-Dehradun Highway.",
    images: [
      "https://images.unsplash.com/photo-1448375240586-882707db888b?w=1400&q=80",
    ],
    amenities: [
      "143 Approved (Residential)",
      "0 km from Rajaji National Park",
      "Single Entry Gated Community",
      "30-Feet Wide Roads",
      "Parks & Children's Playground",
      "Pollution-Free Teakwood Forest",
    ],
    coordinates: [30.2210, 77.9230],
    status: "available",
    featured: true,
    elevation: "1,400 ft",
    views: "Rajaji National Park Forests",
    tag: "Nature Living",
  },
  {
    id: "10",
    name: "Radheshyam Enclave",
    slug: "radheshyam-enclave",
    location: "Kalyanpur / HinduWala",
    district: "Dehradun",
    type: "plot",
    price: 1800000,
    priceDisplay: "₹18,000 - ₹30,000 / sq. yard",
    area: "100 - 600 sq yards",
    areaValue: 100,
    description:
      "A highly premium gated society located just 50 meters from the Paonta Sahib Highway, offering large, customizable plots ranging from 100 to 600 sq. yards. Features excellent connectivity to the Jhajhra-Asharodi elevated highway, Graphic Era University, and top hospitals. Offers park-facing, corner, and 2-side open options. Developed by Dr. Realtor.",
    shortDescription:
      "Premium gated society plots near Paonta Sahib Highway with exceptional connectivity and large sizes.",
    images: [
      "https://images.unsplash.com/photo-1585543805890-6051f7829f98?w=1400&q=80",
    ],
    amenities: [
      "50 Meters from Highway",
      "Near Graphic Era University & Hospitals",
      "30-40 Feet Wide Roads",
      "Park Facing & Corner Plots",
      "2-Side Open Options",
      "Premium Gated Society",
    ],
    coordinates: [30.3420, 77.9410],
    status: "available",
    featured: true,
    elevation: "1,500 ft",
    views: "City & Mountains",
    tag: "Premium Options",
  },

  // ==========================================
  // EXISTING PROPERTIES
  // ==========================================
  {
    id: "1",
    name: "Mussoorie Mountain Villa",
    slug: "mussoorie-mountain-villa",
    location: "Landour, Mussoorie",
    district: "Mussoorie",
    type: "villa",
    price: 18500000,
    priceDisplay: "₹1.85 Cr",
    area: "2,400 sq ft",
    areaValue: 2400,
    bedrooms: 4,
    bathrooms: 3,
    description:
      "Set amidst towering deodar cedars at 6,800 ft, this colonial-style villa offers sweeping panoramas of the Himalayan ranges and the Doon Valley below. Every room frames a different mountain story — from the cloud-kissed peaks of Bandarpunch to the distant shimmer of the Ganga plains. Wake to birdsong, settle evenings by the fireplace, and breathe air that truly tastes of pine. The villa features a wrap-around verandah, stone-clad interiors, and a landscaped garden that spills into the forested hillside. An hour from Dehradun, this is both a sanctuary and a sound investment in Uttarakhand's most iconic hill station.",
    shortDescription:
      "Colonial-style villa at 6,800 ft with panoramic Himalayan views, deodar forests, and Doon Valley vistas.",
    images: [
      "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1400&q=80",
      "https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=1400&q=80",
      "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=1400&q=80",
      "https://images.unsplash.com/photo-1470770841072-f978cf4d019e?w=1400&q=80",
    ],
    amenities: [
      "Panoramic Himalayan View",
      "Wrap-around Verandah",
      "Stone Fireplace",
      "Deodar Garden",
      "Mountain Spring Water",
      "Backup Power",
      "Covered Parking",
      "Private Forest Trail",
    ],
    coordinates: [30.4598, 78.0644],
    status: "available",
    featured: true,
    elevation: "6,800 ft",
    views: "Himalayan Range & Doon Valley",
    tag: "Bestseller",
  },
  {
    id: "2",
    name: "Rishikesh Valley Retreat",
    slug: "rishikesh-valley-retreat",
    location: "Tapovan, Rishikesh",
    district: "Rishikesh",
    type: "holiday",
    price: 8900000,
    priceDisplay: "₹89 Lakh",
    area: "1,800 sq ft",
    areaValue: 1800,
    bedrooms: 3,
    bathrooms: 2,
    description:
      "Perched above the sacred Ganga with views of the river bending through the mountains, this retreat-style home is where luxury meets spirituality. Located in Tapovan — Rishikesh's most sought-after neighbourhood — the property sits within lush greenery, minutes from adventure trails and the famous Laxman Jhula. Glass walls on the river-facing side turn the Ganga into your living room. The property includes a yoga deck, rooftop terrace, and a natural stone garden. Ideal as a personal retreat, holiday rental, or Airbnb investment with exceptional occupancy rates.",
    shortDescription:
      "Retreat-style home in Tapovan with Ganga river views, yoga deck, and exceptional holiday rental potential.",
    images: [
      "https://images.unsplash.com/photo-1482192505345-5852310b1dd2?w=1400&q=80",
      "https://images.unsplash.com/photo-1587334274328-64186a80aeee?w=1400&q=80",
      "https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?w=1400&q=80",
      "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1400&q=80",
    ],
    amenities: [
      "Ganga River View",
      "Yoga & Meditation Deck",
      "Rooftop Terrace",
      "Natural Stone Garden",
      "Adventure Trail Access",
      "High-Speed Internet",
      "Solar Power Ready",
      "Guest Cottage",
    ],
    coordinates: [30.1087, 78.3198],
    status: "available",
    featured: true,
    elevation: "1,200 ft",
    views: "Ganga River & Forest",
    tag: "Investment Pick",
  },
  {
    id: "3",
    name: "Dehradun Forest Estate",
    slug: "dehradun-forest-estate",
    location: "Sahastradhara Road, Dehradun",
    district: "Dehradun",
    type: "villa",
    price: 32000000,
    priceDisplay: "₹3.2 Cr",
    area: "4,800 sq ft",
    areaValue: 4800,
    bedrooms: 5,
    bathrooms: 4,
    description:
      "A rare forest estate on Sahastradhara Road — one of Dehradun's most prestigious addresses. This double-storey villa sits on an acre of landscaped grounds, with a private forest backdrop and views toward the Mussoorie foothills. Designed by a renowned Delhi-based architect, the home blends contemporary mountain architecture with traditional Garhwali elements — stone walls, timber beams, slate roofs, and high arched windows that capture the ever-changing mountain light. Minutes from ISBT, Airport, and top schools, it offers forest living without sacrificing urban convenience.",
    shortDescription:
      "Architect-designed forest estate on 1 acre in Dehradun's most prestigious address with Mussoorie foothills view.",
    images: [
      "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=1400&q=80",
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1400&q=80",
      "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1400&q=80",
      "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=1400&q=80",
    ],
    amenities: [
      "1-Acre Landscaped Grounds",
      "Private Forest View",
      "Swimming Pool",
      "Home Theatre",
      "3-Car Garage",
      "Staff Quarters",
      "Smart Home System",
      "Bore Well & RO Water",
    ],
    coordinates: [30.3165, 78.0322],
    status: "available",
    featured: true,
    elevation: "2,100 ft",
    views: "Mussoorie Foothills",
    tag: "Premium",
  },
  {
    id: "4",
    name: "Nainital Lakeside Plot",
    slug: "nainital-lakeside-plot",
    location: "Tallital, Nainital",
    district: "Nainital",
    type: "plot",
    price: 6200000,
    priceDisplay: "₹62 Lakh",
    area: "3,200 sq ft",
    areaValue: 3200,
    description:
      "A premium freehold plot in Tallital, Nainital, offering commanding views of the famed Naini Lake and the surrounding oak forests. With all approvals in place and clear title documents, this plot is ready for your dream hill home or boutique resort. Situated in a quiet residential pocket, it enjoys year-round mist, colonial neighbourhood charm, and access to Nainital's vibrant market and Mall Road within minutes. The plot's gentle slope makes it ideal for a stepped-architecture mountain home. With tourism and property values in Kumaon rising steadily, this is a high-potential investment.",
    shortDescription:
      "Approved freehold plot with direct Naini Lake views in Nainital's premium Tallital area.",
    images: [
      "https://images.unsplash.com/photo-1519922639192-e73293ca430e?w=1400&q=80",
      "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1400&q=80",
      "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=1400&q=80",
    ],
    amenities: [
      "Lake View Plot",
      "Clear Title Deed",
      "All Approvals in Place",
      "Motorable Road Access",
      "Electricity & Water Connection",
      "Boundary Wall",
      "Ideal for Villa / Resort",
    ],
    coordinates: [29.3803, 79.4636],
    status: "available",
    featured: true,
    elevation: "6,837 ft",
    views: "Naini Lake & Oak Forest",
    tag: "Plot",
  },
  {
    id: "5",
    name: "Haridwar Ganga-Front Residence",
    slug: "haridwar-ganga-residence",
    location: "Kankhal, Haridwar",
    district: "Haridwar",
    type: "home",
    price: 5500000,
    priceDisplay: "₹55 Lakh",
    area: "2,100 sq ft",
    areaValue: 2100,
    bedrooms: 3,
    bathrooms: 2,
    description:
      "A beautifully maintained residence in Kankhal — one of Haridwar's oldest and most spiritually significant neighbourhoods, steps from the banks of the holy Ganga. The home features a private terrace that looks over the river, traditional stone courtyard, and a basement puja room with marble flooring. As one of India's four Char Dham gateway cities, Haridwar's real estate market is among the most stable and appreciating in Uttarakhand. The proximity to Rishikesh (20 km) and Dehradun (60 km) makes this ideal for families seeking spiritual living with modern connectivity.",
    shortDescription:
      "Traditional Kankhal residence with Ganga-side terrace, stone courtyard, and strong long-term appreciation.",
    images: [
      "https://images.unsplash.com/photo-1604014237800-1c9102c219da?w=1400&q=80",
      "https://images.unsplash.com/photo-1582268611958-ebfd161ef9cf?w=1400&q=80",
      "https://images.unsplash.com/photo-1600585154526-990dced4db0d?w=1400&q=80",
    ],
    amenities: [
      "Ganga-Side Terrace",
      "Traditional Stone Courtyard",
      "Marble Puja Room",
      "Rooftop Water Tank",
      "Residential Locality",
      "Gated Entry",
      "Near Har Ki Pauri",
    ],
    coordinates: [29.9266, 78.1582],
    status: "available",
    featured: false,
    elevation: "1,024 ft",
    views: "Ganga River",
    tag: "Spiritual Living",
  },
  {
    id: "6",
    name: "Munsiyari Alpine Chalet",
    slug: "munsiyari-alpine-chalet",
    location: "Munsiyari, Pithoragarh",
    district: "Pithoragarh",
    type: "holiday",
    price: 4800000,
    priceDisplay: "₹48 Lakh",
    area: "1,600 sq ft",
    areaValue: 1600,
    bedrooms: 3,
    bathrooms: 2,
    description:
      "The crown jewel of high-altitude real estate in Uttarakhand — a handcrafted alpine chalet in Munsiyari, directly facing the five-peak Panchachuli massif. At 7,200 ft, this is one of the most dramatic property settings in the entire Indian Himalaya. Built with local stone and timber using traditional Kumaoni craftsmanship, the chalet blends seamlessly into the mountain landscape. With Munsiyari emerging as the next luxury mountain destination, this rare freehold property represents extraordinary long-term value. Perfect for boutique homestay, premium retreat, or a personal Himalayan hideaway.",
    shortDescription:
      "Rare high-altitude chalet at 7,200 ft facing the Panchachuli peaks — Uttarakhand's most dramatic mountain property.",
    images: [
      "https://images.unsplash.com/photo-1580587771525-78b9dba3b914?w=1400&q=80",
      "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1400&q=80",
      "https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?w=1400&q=80",
    ],
    amenities: [
      "Panchachuli Peak View",
      "Traditional Stone Build",
      "Local Timber Interior",
      "Wood-Burning Stove",
      "Natural Spring Access",
      "Alpine Garden",
      "Trekking Trail Access",
      "Stargazing Deck",
    ],
    coordinates: [30.0726, 80.2353],
    status: "available",
    featured: true,
    elevation: "7,200 ft",
    views: "Panchachuli Peaks",
    tag: "Rare Find",
  },
];

export const getFeaturedProperties = () =>
  properties.filter((p) => p.featured);

export const getPropertyBySlug = (slug: string) =>
  properties.find((p) => p.slug === slug);

export const getPropertiesByLocation = (district: string) =>
  properties.filter((p) => p.district === district);
