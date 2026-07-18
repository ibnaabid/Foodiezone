// app/blog/page.tsx
import Link from "next/link";
import { Calendar, Clock, ArrowRight, Search } from "lucide-react";

interface BlogPost {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  author: string;
  date: string;
  readTime: string;
  image: string;
  featured?: boolean;
}

// Placeholder data — replace with real DB/CMS fetch
const posts: BlogPost[] = [
  {
    id: "1",
    slug: "top-5-street-foods-dhaka",
    title: "Top 5 Street Foods You Must Try in Dhaka",
    excerpt:
      "From fuchka to chotpoti, explore the flavors that define Dhaka's street food culture and where to find the best spots.",
    category: "Food Guide",
    author: "CravingByte Team",
    date: "July 12, 2026",
    readTime: "5 min read",
    image: "🍜",
    featured: true,
  },
  {
    id: "2",
    slug: "how-restaurants-partner-with-us",
    title: "How Restaurants Can Partner With CravingByte",
    excerpt:
      "A step-by-step guide for restaurant owners looking to reach more customers and grow their online presence.",
    category: "For Restaurants",
    author: "Abid Hasan",
    date: "July 8, 2026",
    readTime: "4 min read",
    image: "🏪",
  },
  {
    id: "3",
    slug: "healthy-eating-on-a-budget",
    title: "Healthy Eating on a Budget: Is It Possible?",
    excerpt:
      "We break down affordable, nutritious meal options available right from your favorite local restaurants.",
    category: "Health",
    author: "CravingByte Team",
    date: "July 2, 2026",
    readTime: "6 min read",
    image: "🥗",
  },
  {
    id: "4",
    slug: "behind-the-scenes-delivery",
    title: "Behind the Scenes: How Your Order Reaches You",
    excerpt:
      "Ever wondered what happens between placing an order and it arriving hot at your door? Here's the full journey.",
    category: "Behind the Scenes",
    author: "CravingByte Team",
    date: "June 28, 2026",
    readTime: "3 min read",
    image: "🛵",
  },
  {
    id: "5",
    slug: "monsoon-comfort-food",
    title: "Monsoon Comfort Food: What to Order When It Rains",
    excerpt:
      "Khichuri, hot tea, and pakora — a curated list of the coziest comfort foods for rainy days in Bangladesh.",
    category: "Food Guide",
    author: "CravingByte Team",
    date: "June 20, 2026",
    readTime: "4 min read",
    image: "☔",
  },
  {
    id: "6",
    slug: "restaurant-owner-success-story",
    title: "Success Story: From 5 Orders a Day to 500",
    excerpt:
      "How a small family restaurant in Dhanmondi scaled their business using CravingByte's platform tools.",
    category: "For Restaurants",
    author: "Abid Hasan",
    date: "June 15, 2026",
    readTime: "7 min read",
    image: "📈",
  },
];

const categories = ["All", "Food Guide", "For Restaurants", "Health", "Behind the Scenes"];

export default function BlogPage() {
  const featuredPost = posts.find((p) => p.featured);
  const regularPosts = posts.filter((p) => !p.featured);

  return (
    <div className="min-h-screen bg-neutral-950 relative overflow-hidden">
      <div className="absolute -top-40 -right-40 w-96 h-96 bg-emerald-600/10 rounded-full blur-3xl" />
      <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-amber-600/10 rounded-full blur-3xl" />

      <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-10">
          <span className="inline-block px-3 py-1 rounded-full text-xs font-medium bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 mb-4">
            Our Blog
          </span>
          <h1 className="text-3xl sm:text-4xl font-semibold text-white mb-3">
            Stories, guides & food for thought
          </h1>
          <p className="text-neutral-400 text-sm sm:text-base">
            Food guides, restaurant spotlights, and everything happening behind the scenes at CravingByte.
          </p>
        </div>

        {/* Search + filter */}
        <div className="flex flex-col sm:flex-row gap-3 mb-10">
          <div className="relative flex-1">
            <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-500" />
            <input
              type="text"
              placeholder="Search articles..."
              className="w-full bg-white/5 border border-white/10 text-white placeholder:text-neutral-500 focus:border-emerald-500 focus:outline-none rounded-lg pl-10 pr-4 py-2.5 text-sm transition-colors"
            />
          </div>
          <div className="flex gap-2 overflow-x-auto pb-1 sm:pb-0">
            {categories.map((cat) => (
              <button
                key={cat}
                className={`shrink-0 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  cat === "All"
                    ? "bg-emerald-600 text-white"
                    : "bg-white/5 border border-white/10 text-neutral-400 hover:text-white hover:border-white/20"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Featured post */}
        {featuredPost && (
          <Link
            href={`/blog/${featuredPost.slug}`}
            className="group block mb-10 backdrop-blur-xl bg-gradient-to-br from-emerald-600/10 to-amber-600/10 border border-white/10 rounded-2xl overflow-hidden hover:border-emerald-500/30 transition-all"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-0">
              <div className="flex items-center justify-center bg-gradient-to-br from-emerald-500/10 to-amber-500/10 p-12 text-7xl">
                {featuredPost.image}
              </div>
              <div className="p-6 sm:p-8 flex flex-col justify-center">
                <div className="flex items-center gap-3 mb-3">
                  <span className="px-2.5 py-1 rounded-md text-xs font-medium bg-amber-500/10 text-amber-400 border border-amber-500/20">
                    Featured
                  </span>
                  <span className="text-xs text-neutral-500">{featuredPost.category}</span>
                </div>
                <h2 className="text-xl sm:text-2xl font-semibold text-white mb-3 group-hover:text-emerald-400 transition-colors">
                  {featuredPost.title}
                </h2>
                <p className="text-neutral-400 text-sm mb-4 line-clamp-2">
                  {featuredPost.excerpt}
                </p>
                <div className="flex items-center gap-4 text-xs text-neutral-500 mb-4">
                  <span className="flex items-center gap-1">
                    <Calendar size={13} /> {featuredPost.date}
                  </span>
                  <span className="flex items-center gap-1">
                    <Clock size={13} /> {featuredPost.readTime}
                  </span>
                </div>
                <span className="flex items-center gap-1 text-sm font-medium text-emerald-400">
                  Read article <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                </span>
              </div>
            </div>
          </Link>
        )}

        {/* Post grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {regularPosts.map((post) => (
            <Link
              key={post.id}
              href={`/blog/${post.slug}`}
              className="group backdrop-blur-xl bg-white/5 border border-white/10 rounded-2xl overflow-hidden hover:border-white/20 hover:-translate-y-1 transition-all"
            >
              <div className="flex items-center justify-center bg-gradient-to-br from-emerald-500/10 to-amber-500/10 h-40 text-5xl">
                {post.image}
              </div>
              <div className="p-5">
                <div className="flex items-center gap-2 mb-3">
                  <span className="px-2 py-0.5 rounded-md text-xs font-medium bg-emerald-500/10 text-emerald-400">
                    {post.category}
                  </span>
                </div>
                <h3 className="text-base font-semibold text-white mb-2 group-hover:text-emerald-400 transition-colors line-clamp-2">
                  {post.title}
                </h3>
                <p className="text-neutral-400 text-sm mb-4 line-clamp-2">
                  {post.excerpt}
                </p>
                <div className="flex items-center justify-between text-xs text-neutral-500">
                  <span className="flex items-center gap-1">
                    <Calendar size={12} /> {post.date}
                  </span>
                  <span className="flex items-center gap-1">
                    <Clock size={12} /> {post.readTime}
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* Load more */}
        <div className="flex justify-center mt-10">
          <button className="px-6 py-3 rounded-lg bg-white/5 border border-white/10 text-sm text-neutral-300 hover:text-white hover:border-white/20 transition-colors">
            Load more articles
          </button>
        </div>
      </div>
    </div>
  );
}