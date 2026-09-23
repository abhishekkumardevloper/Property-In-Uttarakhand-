export interface Property {
  id: string;
  title: string;
  slug: string;
  location: string;
  developer: string;
  price: string;
  status: string;
  type: string;
  sizes: string[];
  features: string[];
  description: string;
  website: string;
  image: string; // Add your project image URLs here
}

export const properties: Property[] = [
  {
    id: "p1",
    title: "Bajrang Vatika",
    slug: "bajrang-vatika",
    location: "Shimla Bypass Road, Mednipur Badripur, Dehradun",
    developer: "Dr. Realtor",
    price: "₹17,500 - ₹18,500 / sq. yard",
    status: "Booking Open",
    type: "Premium Residential Plots",
    sizes: ["100 sq. yard", "150 sq. yard", "200 sq. yard"],
    features: [
      "Hanuman-Themed Development",
      "Gated Society with 24/7 CCTV",
      "Clubhouse & Swimming Pool",
      "Mandir & Meditation Center",
      "Surrounded by Rajaji National Park",
      "Vaastu-Compliant"
    ],
    description: "Uttarakhand's first Hanuman-themed plotted development offering a spiritual and luxurious lifestyle. Features daily Hanuman Chalisa sessions, premium amenities, and breathtaking views of Mussoorie and Chakrata hills.",
    website: "https://www.bajrangvatika.com/",
    image: "/images/bajrang-vatika.jpg" 
  },
  {
    id: "p2",
    title: "The Friends Colony",
    slug: "the-friends-colony",
    location: "Delhi-Dehradun Expressway (NH-307), Khushalipur",
    developer: "Dr. Realtor",
    price: "₹17,500 / sq. yard",
    status: "Ready to Move",
    type: "Residential Plots",
    sizes: ["100 sq. yard", "150 sq. yard", "Custom Sizes"],
    features: [
      "Immediate Possession",
      "30-Feet Wide Internal Roads",
      "Underground Drainage",
      "24x7 Security Surveillance",
      "Green Parks & Street Lighting",
      "20 Mins from ISBT Dehradun"
    ],
    description: "Ready-to-move plots located directly on the Delhi-Dehradun Expressway. Offering immediate possession, construction approvals, and excellent future ROI due to its prime highway location.",
    website: "https://www.thefriendscolony.com/",
    image: "/images/friends-colony.jpg"
  },
  {
    id: "p3",
    title: "Nature Green Valley 5",
    slug: "nature-green-valley-5",
    location: "Saharanpur-Dehradun Highway (NH-307), Ganeshpur",
    developer: "Dr. Realtor",
    price: "₹15,500 / sq. yard",
    status: "Available",
    type: "143 Approved Plots",
    sizes: ["Various Sizes Available"],
    features: [
      "143 Approved (Residential)",
      "0 km from Rajaji National Park",
      "Single Entry Gated Community",
      "30-Feet Wide Roads",
      "Parks & Children's Playground",
      "Pollution-Free Teakwood Forest Area"
    ],
    description: "A legally converted, 143-approved residential plotted development situated right next to Rajaji National Park. Enjoy fresh air, premium amenities, and a serene environment just 20 km from Dehradun ISBT.",
    website: "https://www.drrealtor.properties/naturegreenvalley.html",
    image: "/images/nature-green-valley.jpg"
  },
  {
    id: "p4",
    title: "Radheshyam Enclave",
    slug: "radheshyam-enclave",
    location: "Kalyanpur / HinduWala, Dehradun",
    developer: "Dr. Realtor",
    price: "₹18,000 - ₹30,000 / sq. yard",
    status: "Premium Availability",
    type: "Luxury Residential Plots",
    sizes: ["100 sq. yard", "150 sq. yard", "250 sq. yard", "300 sq. yard", "600 sq. yard"],
    features: [
      "50 Meters from Paonta Sahib Highway",
      "Near Graphic Era University & Hospitals",
      "30-40 Feet Wide Roads",
      "Park Facing & Corner Plots",
      "2-Side Open Options",
      "Premium Gated Society"
    ],
    description: "A highly premium gated society located just off the highway, offering large, customizable plots. Features excellent connectivity to the Jhajhra-Asharodi elevated highway and major educational institutions.",
    website: "https://drrealtor.properties/radheshayam_enclave.php",
    image: "/images/radheshyam-enclave.jpg"
  }
];

export const getPropertyBySlug = (slug: string) =>
  properties.find((p) => p.slug === slug);
