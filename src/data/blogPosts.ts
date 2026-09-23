export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  category: string;
  excerpt: string;
  content: string;
  image: string;
  date: string;
  readTime: string;
  featured: boolean;
}

export const blogPosts: BlogPost[] = [
  {
    id: "1",
    title: "Why Mussoorie Remains India's Most Coveted Hill Station Investment",
    slug: "mussoorie-real-estate-investment-2025",
    category: "Investment",
    excerpt:
      "With limited supply, consistent demand, and rising luxury tourism, Mussoorie properties have delivered returns that few hill destinations can match. Here is why smart investors are looking above the clouds.",
    content:
      "Mussoorie's real estate market is defined by one fundamental reality: geography. The town occupies a narrow ridge at 6,578 ft, hemmed in by forest reserves on both sides...",
    image:
      "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1200&q=80",
    date: "September 15, 2025",
    readTime: "6 min read",
    featured: true,
  },
  {
    id: "2",
    title: "Rishikesh: The Wellness Capital That's Also a Property Goldmine",
    slug: "rishikesh-property-investment-guide",
    category: "Investment",
    excerpt:
      "International wellness tourism has transformed Rishikesh's property market. Holiday rentals here are achieving occupancy rates that rival coastal Goa. Here's the full picture.",
    content:
      "When The Beatles came to Rishikesh in 1968, they put the city on the world map. In 2025, it's wellness entrepreneurs, yoga retreats, and boutique resort developers who are arriving...",
    image:
      "https://images.unsplash.com/photo-1482192505345-5852310b1dd2?w=1200&q=80",
    date: "August 28, 2025",
    readTime: "8 min read",
    featured: false,
  },
  {
    id: "3",
    title: "Buying Property in Uttarakhand: A Complete Legal Guide",
    slug: "buying-property-uttarakhand-legal-guide",
    category: "Uttarakhand Property",
    excerpt:
      "Navigating property laws in Uttarakhand — understanding non-resident restrictions, agricultural land rules, and what you need to know before signing.",
    content:
      "Uttarakhand's property laws have specific provisions that differ from most Indian states. Understanding these before you invest is essential...",
    image:
      "https://images.unsplash.com/photo-1589829085413-56de8ae18c73?w=1200&q=80",
    date: "August 10, 2025",
    readTime: "10 min read",
    featured: false,
  },
  {
    id: "4",
    title: "Munsiyari: The Last Great Frontier of Himalayan Real Estate",
    slug: "munsiyari-emerging-property-destination",
    category: "Location Guides",
    excerpt:
      "Before the roads improve fully, before the resorts arrive, before the prices reflect the drama — Munsiyari is where serious mountain investors are quietly positioning.",
    content:
      "At 7,200 ft, facing the five-peak Panchachuli massif across a wide alpine valley, Munsiyari offers mountain drama that rivals Ladakh at a fraction of the access difficulty...",
    image:
      "https://images.unsplash.com/photo-1580587771525-78b9dba3b914?w=1200&q=80",
    date: "July 22, 2025",
    readTime: "7 min read",
    featured: false,
  },
  {
    id: "5",
    title: "Life at 6,000 Feet: What It's Really Like to Live in a Uttarakhand Mountain Home",
    slug: "life-in-uttarakhand-mountain-home",
    category: "Travel & Lifestyle",
    excerpt:
      "From morning fog in the deodar trees to evening fires with Himalayan views — the real, unfiltered story of living at altitude in one of India's most beautiful states.",
    content:
      "The mist arrives before dawn. By 6am, the valley below has disappeared entirely, swallowed by clouds that you are now above...",
    image:
      "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=1200&q=80",
    date: "July 5, 2025",
    readTime: "9 min read",
    featured: false,
  },
  {
    id: "6",
    title: "Dehradun vs Mussoorie: Which Is the Better Investment?",
    slug: "dehradun-vs-mussoorie-investment-comparison",
    category: "Real Estate Insights",
    excerpt:
      "Two contrasting markets 35 km apart — one an expanding city, one a ridge-top hill station. We break down the fundamentals so you can choose where your investment belongs.",
    content:
      "This is the most common question we receive from investors exploring Uttarakhand: Dehradun or Mussoorie? The answer depends entirely on what kind of investor you are...",
    image:
      "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=1200&q=80",
    date: "June 18, 2025",
    readTime: "8 min read",
    featured: false,
  },
];

export const getFeaturedPost = () => blogPosts.find((p) => p.featured);
export const getPostBySlug = (slug: string) =>
  blogPosts.find((p) => p.slug === slug);
export const getPostsByCategory = (category: string) =>
  blogPosts.filter((p) => p.category === category);
