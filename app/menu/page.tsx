// app/menu/page.tsx
"use client";

import { useEffect, useState } from "react";
import { Loader2, Search, Sparkles } from "lucide-react";
import MenuCard from "./menuCard/page";



interface Product {
  _id: string;
  name: string;
  description?: string;
  price: number;
  category: string;
  image?: string;
  available: boolean;
}

const categories = [
  "All",
  "Biryani & Rice",
  "Fast Food",
  "Chinese",
  "Street Food",
  "Pizza",
  "Desserts",
  "Beverages",
  "Healthy",
  "BBQ & Grill",
  "Bakery",
];

export default function MenuPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [sort, setSort] = useState("");

  useEffect(() => {
    const getProducts = async () => {
      try {
        const res = await fetch("http://localhost:5000/menu", {
          cache: "no-store",
        });

        if (!res.ok) throw new Error("Failed to load menu");

        const data = await res.json();
        setProducts(data);
      } catch (err: any) {
        setError(err.message || "Could not connect to the server");
      } finally {
        setLoading(false);
      }
    };

    getProducts();
  }, []);

  const filteredProducts = products
    .filter((product) => {
      const matchesSearch =
        product.name?.toLowerCase().includes(search.toLowerCase()) ||
        product.description?.toLowerCase().includes(search.toLowerCase());

      const matchesCategory = category === "All" ? true : product.category === category;

      return matchesSearch && matchesCategory;
    })
    .sort((a, b) => {
      if (sort === "low") return a.price - b.price;
      if (sort === "high") return b.price - a.price;
      return 0;
    });

  if (loading) {
    return (
      <div className="min-h-screen bg-neutral-950 flex flex-col items-center justify-center gap-3">
        <Loader2 className="animate-spin text-emerald-400" size={40} />
        <p className="text-sm font-medium text-neutral-400">Loading the menu...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-neutral-950 flex items-center justify-center px-4">
        <div className="text-center p-8 backdrop-blur-xl bg-white/5 border border-red-500/20 rounded-2xl max-w-sm">
          <p className="text-red-400 font-semibold mb-2">Error occurred</p>
          <p className="text-xs text-neutral-500 mb-5">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="px-4 py-2.5 text-xs text-white rounded-lg font-medium bg-emerald-600 hover:bg-emerald-500 transition-colors"
          >
            Try again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-neutral-950 relative overflow-hidden">
      <div className="absolute -top-40 -right-40 w-96 h-96 bg-emerald-600/10 rounded-full blur-3xl" />
      <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-amber-600/10 rounded-full blur-3xl" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="text-center max-w-xl mx-auto mb-12">
          <span className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-white/5 border border-emerald-500/20 rounded-full mb-4 text-xs font-medium text-emerald-400">
            <Sparkles size={13} /> Fresh from local kitchens
          </span>
          <h1 className="text-3xl sm:text-4xl font-semibold tracking-tight text-white mb-3">
            Explore the Menu
          </h1>
          <p className="text-sm text-neutral-400 leading-relaxed">
            Handpicked dishes from restaurants across your city, ready to be delivered hot.
          </p>
        </div>

        <div className="flex flex-col lg:flex-row gap-3 mb-10">
          <div className="relative flex-1">
            <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-neutral-500" />
            <input
              type="text"
              placeholder="Search dishes..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full bg-white/5 border border-white/10 text-white placeholder:text-neutral-500 focus:border-emerald-500 focus:outline-none rounded-lg pl-10 pr-4 py-2.5 text-sm transition-colors"
            />
          </div>

          <select
            value={sort}
            onChange={(e) => setSort(e.target.value)}
            className="bg-white/5 border border-white/10 text-white text-sm rounded-lg px-4 py-2.5 focus:border-emerald-500 focus:outline-none transition-colors"
          >
            <option value="" className="bg-neutral-900">Sort by</option>
            <option value="low" className="bg-neutral-900">Price: Low to High</option>
            <option value="high" className="bg-neutral-900">Price: High to Low</option>
          </select>
        </div>

        <div className="flex gap-2 overflow-x-auto pb-2 mb-8 -mx-1 px-1">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setCategory(cat)}
              className={`shrink-0 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                category === cat
                  ? "bg-emerald-600 text-white"
                  : "bg-white/5 border border-white/10 text-neutral-400 hover:text-white hover:border-white/20"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {filteredProducts.length === 0 ? (
          <div className="text-center py-16 text-neutral-500">
            No dishes found — try a different search or category.
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {filteredProducts.map((product) => (
              <MenuCard key={product._id} product={product} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}