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
  {
    id: "1",
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
    images: ["/bajrangvatika clubhouse.png"],
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
    id: "2",
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
    images: ["/friendscolony222.jpg"],
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
    id: "3",
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
    images: ["/natural green valeey.png"],
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
];

export const getFeaturedProperties = () =>
  properties.filter((p) => p.featured);

export const getPropertyBySlug = (slug: string) =>
  properties.find((p) => p.slug === slug);

export const getPropertiesByLocation = (district: string) =>
  properties.filter((p) => p.district === district);
