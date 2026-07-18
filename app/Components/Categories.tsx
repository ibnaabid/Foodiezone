// components/Categories.tsx
"use client";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

interface Category {
  name: string;
  slug: string;
  emoji: string;
  count: number;
  accent: string;
}

const categories: Category[] = [
  { name: "Biryani & Rice", slug: "biryani", emoji: "🍛", count: 84, accent: "amber" },
  { name: "Fast Food", slug: "fast-food", emoji: "🍔", count: 132, accent: "rose" },
  { name: "Chinese", slug: "chinese", emoji: "🥡", count: 61, accent: "emerald" },
  { name: "Street Food", slug: "street-food", emoji: "🌮", count: 97, accent: "orange" },
  { name: "Pizza", slug: "pizza", emoji: "🍕", count: 45, accent: "red" },
  { name: "Desserts", slug: "desserts", emoji: "🍮", count: 58, accent: "pink" },
  { name: "Beverages", slug: "beverages", emoji: "🧋", count: 39, accent: "purple" },
  { name: "Healthy", slug: "healthy", emoji: "🥗", count: 27, accent: "lime" },
  { name: "BBQ & Grill", slug: "bbq-grill", emoji: "🍢", count: 33, accent: "yellow" },
  { name: "Bakery", slug: "bakery", emoji: "🥐", count: 41, accent: "amber" },
];

const accentMap: Record<string, { ring: string; glow: string; text: string }> = {
  amber: { ring: "group-hover:border-amber-500/40", glow: "from-amber-500/20", text: "group-hover:text-amber-400" },
  rose: { ring: "group-hover:border-rose-500/40", glow: "from-rose-500/20", text: "group-hover:text-rose-400" },
  emerald: { ring: "group-hover:border-emerald-500/40", glow: "from-emerald-500/20", text: "group-hover:text-emerald-400" },
  orange: { ring: "group-hover:border-orange-500/40", glow: "from-orange-500/20", text: "group-hover:text-orange-400" },
  red: { ring: "group-hover:border-red-500/40", glow: "from-red-500/20", text: "group-hover:text-red-400" },
  pink: { ring: "group-hover:border-pink-500/40", glow: "from-pink-500/20", text: "group-hover:text-pink-400" },
  purple: { ring: "group-hover:border-purple-500/40", glow: "from-purple-500/20", text: "group-hover:text-purple-400" },
  lime: { ring: "group-hover:border-lime-500/40", glow: "from-lime-500/20", text: "group-hover:text-lime-400" },
  yellow: { ring: "group-hover:border-yellow-500/40", glow: "from-yellow-500/20", text: "group-hover:text-yellow-400" },
};

export default function Categories() {
  return (
    <section className="relative bg-neutral-950 py-16 sm:py-20 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-end justify-between mb-10">
          <div>
            <span className="inline-block px-3 py-1 rounded-full text-xs font-medium bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 mb-3">
              Browse by craving
            </span>
            <h2 className="text-2xl sm:text-3xl font-semibold text-white tracking-tight">
              What are you in the mood for?
            </h2>
          </div>
          <Link
            href="/menu"
            className="hidden sm:flex items-center gap-1 text-sm font-medium text-neutral-400 hover:text-white transition-colors shrink-0"
          >
            See everything <ArrowRight size={14} />
          </Link>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
          {categories.map((cat) => {
            const accent = accentMap[cat.accent];
            return (
              <Link
                key={cat.slug}
                href={`/menu?category=${cat.slug}`}
                className={`group relative flex flex-col items-center text-center gap-3 rounded-2xl border border-white/10 bg-white/[0.03] backdrop-blur-xl p-5 sm:p-6 transition-all hover:-translate-y-1 hover:bg-white/[0.06] ${accent.ring}`}
              >
                <div
                  className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${accent.glow} to-transparent opacity-0 group-hover:opacity-100 transition-opacity`}
                />

                <div className="relative w-14 h-14 sm:w-16 sm:h-16 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-2xl sm:text-3xl">
                  {cat.emoji}
                </div>

                <div className="relative">
                  <p className={`text-sm font-medium text-white transition-colors ${accent.text}`}>
                    {cat.name}
                  </p>
                  <p className="text-xs text-neutral-500 mt-0.5">{cat.count} places</p>
                </div>
              </Link>
            );
          })}
        </div>

        <div className="flex sm:hidden justify-center mt-6">
          <Link
            href="/menu"
            className="flex items-center gap-1 text-sm font-medium text-neutral-400 hover:text-white transition-colors"
          >
            See everything <ArrowRight size={14} />
          </Link>
        </div>
      </div>
    </section>
  );
}