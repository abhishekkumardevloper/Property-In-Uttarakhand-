export interface Location {
  id: string;
  name: string;
  slug: string;
  tagline: string;
  description: string;
  lifestyle: string;
  connectivity: string;
  propertyTypes: string[];
  investmentNote: string;
  image: string;
  elevation: string;
  distanceFromDehradun: string;
  coordinates: [number, number];
  highlights: string[];
}

export const locations: Location[] = [
  {
    id: "1",
    name: "Dehradun",
    slug: "dehradun",
    tagline: "Gateway to the Himalayas",
    description:
      "The capital city of Uttarakhand, Dehradun sits cradled between the Shivalik hills and the Song river. It is the primary hub for premium plotted developments and residential investments. Its excellent highway connectivity and proximity to Mussoorie make it the most sought-after real estate destination in the state.",
    lifestyle:
      "Cosmopolitan mountain city with premium schools, hospitals, malls, and peaceful gated communities with spiritual and nature-centric living.",
    connectivity:
      "Delhi-Dehradun Expressway (NH-307), Jolly Grant Airport (30 min), Saharanpur Highway, Mussoorie (35 km).",
    propertyTypes: [
      "143 Approved Plots",
      "Gated Communities",
      "Highway-Facing Land",
      "Residential Villas",
    ],
    investmentNote:
      "Dehradun's real estate market, especially along the new Delhi-Dehradun Expressway and Shimla Bypass, offers rapid ROI and immediate possession opportunities for plotted developments.",
    image:
      "https://images.unsplash.com/photo-1586500036706-41963de24d8b?w=1200&q=80",
    elevation: "1,400–2,400 ft",
    distanceFromDehradun: "0 km",
    coordinates: [30.3165, 78.0322],
    highlights: [
      "Bajrang Vatika",
      "The Friends Colony",
      "Nature Green Valley",
      "Radheshyam Enclave",
    ],
  },
  {
    id: "2",
    name: "Mussoorie",
    slug: "mussoorie",
    tagline: "The Queen of Hills",
    description:
      "At 6,578 ft, Mussoorie is India's most beloved hill station — a landscape of colonial architecture, winding mountain roads, sweeping valley views, and pine-scented air.",
    lifestyle:
      "Colonial hill-town charm, mountain walks, cafes, and some of India's finest mountain views.",
    connectivity:
      "Dehradun (35 km / 1 hr), Airport (55 km), accessible year-round by motorable roads.",
    propertyTypes: [
      "Colonial Villas",
      "Mountain Cottages",
      "Boutique Hotel Plots",
      "Heritage Bungalows",
    ],
    investmentNote:
      "With limited supply and consistently high tourism and residential demand, Mussoorie properties are among the most resilient and appreciating in Uttarakhand.",
    image:
      "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1200&q=80",
    elevation: "6,578 ft",
    distanceFromDehradun: "35 km",
    coordinates: [30.4598, 78.0644],
    highlights: ["Landour", "Char Dukaan", "Mall Road", "Cloud End"],
  },
  {
    id: "3",
    name: "Rishikesh",
    slug: "rishikesh",
    tagline: "Yoga Capital of the World",
    description:
      "Where the Ganga emerges from the Himalayas into the plains, Rishikesh has evolved from a spiritual destination to a global lifestyle city.",
    lifestyle:
      "River lifestyle, yoga and wellness culture, adventure sports, international cafes, and deep spiritual energy.",
    connectivity:
      "Dehradun (50 km / 1 hr), Haridwar (25 km), Jolly Grant Airport (40 km), international connectivity.",
    propertyTypes: [
      "Retreat Homes",
      "River-View Villas",
      "Yoga Center Plots",
      "Holiday Rentals",
    ],
    investmentNote:
      "Rishikesh holiday properties are achieving 60–80% annual occupancy with premium nightly rates, making it one of the highest-return rental property markets in the Himalayan region.",
    image:
      "https://images.unsplash.com/photo-1482192505345-5852310b1dd2?w=1200&q=80",
    elevation: "1,250 ft",
    distanceFromDehradun: "50 km",
    coordinates: [30.1087, 78.3198],
    highlights: ["Tapovan", "Swargashram", "Laxman Jhula", "Shivpuri"],
  },
  {
    id: "4",
    name: "Nainital",
    slug: "nainital",
    tagline: "The Lake District of India",
    description:
      "Nestled around the emerald Naini Lake at nearly 7,000 ft in the Kumaon Hills, Nainital is Uttarakhand's premier Kumaon destination.",
    lifestyle:
      "Lake district living, colonial charm, oak forests, boating, and proximity to Corbett.",
    connectivity:
      "Kathgodam Railway Station (34 km), Pantnagar Airport (65 km), Delhi (310 km / 6 hrs).",
    propertyTypes: [
      "Lake-View Homes",
      "Mountain Cottages",
      "Resort Plots",
      "Heritage Bungalows",
    ],
    investmentNote:
      "Nainital's constrained geographic supply ensures that available residential properties consistently appreciate in a market defined by scarcity.",
    image:
      "https://images.unsplash.com/photo-1519922639192-e73293ca430e?w=1200&q=80",
    elevation: "6,837 ft",
    distanceFromDehradun: "290 km",
    coordinates: [29.3803, 79.4636],
    highlights: ["Mall Road", "Tallital", "Ayarpatta", "Snow View"],
  },
  {
    id: "5",
    name: "Haridwar",
    slug: "haridwar",
    tagline: "Where the Ganga Meets the Plains",
    description:
      "One of India's seven sacred cities, Haridwar sits at the point where the Ganga leaves the Himalayas. Properties here offer stability and cultural depth.",
    lifestyle:
      "Spiritual living on the Ganga banks, traditional culture, with growing modern amenities.",
    connectivity:
      "Major railway hub, Rishikesh (25 km), Dehradun (50 km), Delhi (200 km / 4 hrs).",
    propertyTypes: [
      "Ganga-Side Residences",
      "Traditional Homes",
      "Commercial Properties",
      "Residential Plots",
    ],
    investmentNote:
      "Haridwar offers the entry-level price point in Uttarakhand's premium locations, making it attractive for first-time investors.",
    image:
      "https://images.unsplash.com/photo-1604014237800-1c9102c219da?w=1200&q=80",
    elevation: "1,024 ft",
    distanceFromDehradun: "50 km",
    coordinates: [29.9266, 78.1582],
    highlights: ["Har Ki Pauri", "Kankhal", "BHEL Township", "Jwalapur"],
  },
  {
    id: "6",
    name: "Munsiyari & Pithoragarh",
    slug: "munsiyari",
    tagline: "The Little Kashmir of Uttarakhand",
    description:
      "Munsiyari, at 7,200 ft, is one of India's last great undiscovered mountain destinations — a frontier town facing the Panchachuli peaks.",
    lifestyle:
      "High-altitude alpine living, Panchachuli views, trekking, traditional Kumaoni culture.",
    connectivity:
      "Pithoragarh (125 km), Kathgodam (280 km), improving road network.",
    propertyTypes: [
      "Alpine Chalets",
      "Mountain Homestays",
      "Forest Land",
      "Retreat Properties",
    ],
    investmentNote:
      "Munsiyari is where serious investors are looking — before infrastructure fully arrives. First-mover advantage in an emerging destination.",
    image:
      "https://images.unsplash.com/photo-1580587771525-78b9dba3b914?w=1200&q=80",
    elevation: "7,200 ft",
    distanceFromDehradun: "380 km",
    coordinates: [30.0726, 80.2353],
    highlights: ["Panchachuli View Point", "Birthi Falls", "Darkot Village"],
  },
];

export const getLocationBySlug = (slug: string) =>
  locations.find((l) => l.slug === slug);
