// components/Hero.tsx
"use client";
import Link from "next/link";
import { Search, MapPin, ArrowRight, Utensils, Bike, Star } from "lucide-react";

const liveOrders = [
  { restaurant: "Spice Garden", item: "Chicken Biryani", area: "Dhanmondi", time: "2m ago" },
  { restaurant: "Momo House", item: "Steamed Momo x2", area: "Gulshan", time: "4m ago" },
  { restaurant: "Curry Point", item: "Beef Rezala", area: "Uttara", time: "6m ago" },
  { restaurant: "Pizza Corner", item: "Family Pizza", area: "Banani", time: "9m ago" },
  { restaurant: "Burger Hub", item: "Double Cheese Burger", area: "Mirpur", time: "11m ago" },
  { restaurant: "Tea Time", item: "Cha & Shingara", area: "Dhanmondi", time: "13m ago" },
];

export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-neutral-950">
      <style>{`
        @keyframes ticker-scroll {
          0% { transform: translateY(0); }
          100% { transform: translateY(-50%); }
        }
        .ticker-track {
          animation: ticker-scroll 22s linear infinite;
        }
        @media (prefers-reduced-motion: reduce) {
          .ticker-track { animation: none; }
        }
      `}</style>

      <div className="absolute -top-32 -left-20 w-[30rem] h-[30rem] bg-emerald-600/15 rounded-full blur-3xl" />
      <div className="absolute top-40 -right-20 w-[26rem] h-[26rem] bg-amber-500/10 rounded-full blur-3xl" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-20 lg:pt-24 lg:pb-28">
        <div className="grid grid-cols-1 lg:grid-cols-[1.1fr_0.9fr] gap-12 lg:gap-8 items-center">
          {/* Left: copy + search */}
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 mb-6">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              <span className="text-xs font-medium text-neutral-300">
                Live in Dhaka, Chattogram &amp; Sylhet
              </span>
            </div>

            <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-medium text-white leading-[1.05] tracking-tight mb-6">
              Your city&apos;s kitchens,
              <br />
              <span className="text-emerald-400">delivered hot.</span>
            </h1>

            <p className="text-neutral-400 text-base sm:text-lg max-w-lg mb-8">
              From street-side fuchka to your favorite biryani house — order from
              hundreds of local restaurants and get it at your door in under 30 minutes.
            </p>

            <div className="flex flex-col sm:flex-row gap-3 max-w-xl mb-8">
              <div className="relative flex-1">
                <MapPin size={18} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-neutral-500" />
                <input
                  type="text"
                  placeholder="Enter your delivery address"
                  className="w-full bg-white/5 border border-white/10 text-white placeholder:text-neutral-500 focus:border-emerald-500 focus:outline-none rounded-xl pl-11 pr-4 py-3.5 text-sm transition-colors"
                />
              </div>
              <Link
                href="/menu"
                className="flex items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-500 text-white font-medium rounded-xl px-6 py-3.5 text-sm transition-colors shrink-0 shadow-lg shadow-emerald-900/30"
              >
                <Search size={16} />
                Find food
              </Link>
            </div>

            <div className="flex flex-wrap items-center gap-4 mb-10">
              <Link
                href="/menu"
                className="group flex items-center gap-2 bg-gradient-to-r from-amber-500 to-amber-400 hover:from-amber-400 hover:to-amber-300 text-neutral-950 font-semibold rounded-xl px-6 py-3.5 text-sm transition-all shadow-lg shadow-amber-900/20"
              >
                Order now
                <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link
                href="/register"
                className="text-sm font-medium text-neutral-300 hover:text-white transition-colors underline underline-offset-4 decoration-white/20"
              >
                Own a restaurant? Partner with us
              </Link>
            </div>

            <div className="grid grid-cols-3 gap-6 max-w-md border-t border-white/10 pt-6">
              <div>
                <p className="text-2xl font-semibold text-white">600+</p>
                <p className="text-xs text-neutral-500 mt-0.5">Restaurants</p>
              </div>
              <div>
                <p className="text-2xl font-semibold text-white">28 min</p>
                <p className="text-xs text-neutral-500 mt-0.5">Avg. delivery</p>
              </div>
              <div>
                <p className="text-2xl font-semibold text-white flex items-center gap-1">
                  4.8 <Star size={16} className="text-amber-400 fill-amber-400" />
                </p>
                <p className="text-xs text-neutral-500 mt-0.5">Customer rating</p>
              </div>
            </div>
          </div>

          {/* Right: signature element — live order ticket feed */}
          <div className="relative">
            <div className="relative h-[420px] sm:h-[480px] rounded-2xl border border-white/10 bg-white/[0.03] overflow-hidden backdrop-blur-xl">
              <div className="absolute top-0 left-0 right-0 h-16 bg-gradient-to-b from-neutral-950 to-transparent z-10" />
              <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-neutral-950 to-transparent z-10" />

              <div className="flex items-center justify-between px-5 pt-5 pb-3 relative z-20">
                <span className="flex items-center gap-2 text-xs font-medium text-neutral-400">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  Live orders
                </span>
                <Bike size={16} className="text-neutral-500" />
              </div>

              <div className="ticker-track px-5 space-y-3">
                {[...liveOrders, ...liveOrders].map((order, i) => (
                  <div
                    key={i}
                    className="flex items-center gap-3 p-3.5 rounded-xl bg-white/5 border border-white/5"
                  >
                    <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-emerald-500/20 to-amber-500/20 flex items-center justify-center shrink-0">
                      <Utensils size={14} className="text-emerald-400" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="text-sm text-white font-medium truncate">{order.item}</p>
                      <p className="text-xs text-neutral-500 truncate">
                        {order.restaurant} · {order.area}
                      </p>
                    </div>
                    <span className="text-xs text-neutral-600 shrink-0">{order.time}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="absolute -bottom-5 -left-5 sm:-left-8 backdrop-blur-xl bg-neutral-900 border border-white/10 rounded-xl px-4 py-3 shadow-2xl">
              <p className="text-xs text-neutral-500">Orders today</p>
              <p className="text-xl font-semibold text-emerald-400">2,140+</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}