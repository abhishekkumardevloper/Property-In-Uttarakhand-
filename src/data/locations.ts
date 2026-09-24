// src/data/locations.ts

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
    image: "/dehradunn.png",
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
    image: "/mussari.png",
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
    image: "/risikesh.png",
    elevation: "1,250 ft",
    distanceFromDehradun: "50 km",
    coordinates: [30.1087, 78.3198],
    highlights: ["Tapovan", "Swargashram", "Laxman Jhula", "Shivpuri"],
  },
];

export const getLocationBySlug = (slug: string) =>
  locations.find((l) => l.slug === slug);
