// app/favorites/page.tsx
import Image from "next/image";
import Link from "next/link";
import { Heart, AlertTriangle, UtensilsCrossed, Tag, ShoppingBag } from "lucide-react";
import DeleteFavoriteBtn from "./Deletebtn";
// import DeleteFavoriteBtn from "./DeleteFavoriteBtn";

type FavoriteItem = {
  _id: string;
  name?: string;
  productName?: string;
  price?: number;
  category?: string;
  image?: string;
};

const Page = async () => {
  let items: FavoriteItem[] = [];
  let fetchError = false;

  try {
    const res = await fetch("http://localhost:5000/favorite", {
      cache: "no-store",
    });

    if (!res.ok) {
      fetchError = true;
    } else {
      items = await res.json();
    }
  } catch (error) {
    fetchError = true;
  }

  if (fetchError) {
    return (
      <div className="min-h-screen bg-neutral-950 flex items-center justify-center px-4">
        <div className="backdrop-blur-xl bg-white/5 border border-red-500/20 rounded-2xl p-10 text-center max-w-md">
          <div className="w-14 h-14 bg-red-500/10 rounded-full flex items-center justify-center mx-auto mb-4">
            <AlertTriangle className="w-7 h-7 text-red-400" />
          </div>
          <h3 className="text-white font-semibold">Couldn&apos;t load favorites</h3>
          <p className="text-neutral-500 text-sm mt-1">
            Make sure the backend server is running on port 5000, then refresh.
          </p>
        </div>
      </div>
    );
  }

  const total = items.length;

  return (
    <div className="min-h-screen bg-neutral-950 relative overflow-hidden">
      <div className="absolute -top-40 -right-40 w-96 h-96 bg-rose-600/10 rounded-full blur-3xl" />
      <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-emerald-900/10 rounded-full blur-3xl" />

      <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-rose-500 to-amber-500 flex items-center justify-center">
              <Heart size={20} className="text-neutral-950" fill="currentColor" />
            </div>
            <div>
              <h1 className="text-2xl sm:text-3xl font-semibold text-white">Your Favorites</h1>
              <p className="text-neutral-400 text-sm mt-0.5">
                {total} dish{total !== 1 ? "es" : ""} you&apos;ve saved
              </p>
            </div>
          </div>
          <Link
            href="/menu"
            className="inline-flex items-center justify-center gap-2 bg-white/5 hover:bg-white/10 border border-white/10 text-neutral-300 hover:text-white text-sm font-medium px-4 py-2.5 rounded-xl transition-colors w-fit"
          >
            <ShoppingBag className="w-4 h-4" /> Browse menu
          </Link>
        </div>

        {total === 0 && (
          <div className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-2xl py-20 text-center">
            <div className="w-16 h-16 bg-rose-500/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <Heart className="w-8 h-8 text-rose-400" />
            </div>
            <h3 className="text-white font-semibold">No favorites yet</h3>
            <p className="text-neutral-500 text-sm mt-1 mb-5">
              Save dishes you love and find them here anytime.
            </p>
            <Link
              href="/menu"
              className="inline-flex items-center gap-2 bg-emerald-600 hover:bg-emerald-500 text-white text-sm font-medium px-4 py-2.5 rounded-xl transition-colors"
            >
              <ShoppingBag className="w-4 h-4" /> Explore the menu
            </Link>
          </div>
        )}

        {total > 0 && (
          <>
            <div className="hidden md:block backdrop-blur-xl bg-white/5 border border-white/10 rounded-2xl overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full min-w-[600px] border-collapse text-left">
                  <thead>
                    <tr className="bg-white/5 border-b border-white/10">
                      <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wider text-neutral-400">Dish</th>
                      <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wider text-neutral-400">Category</th>
                      <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wider text-neutral-400">Price</th>
                      <th className="px-6 py-4 text-center text-xs font-semibold uppercase tracking-wider text-neutral-400">Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/5">
                    {items.map((item) => {
                      const displayName = item.name || item.productName || "Untitled dish";
                      return (
                        <tr key={item._id} className="hover:bg-white/[0.03] transition-colors group">
                          <td className="px-6 py-4">
                            <div className="flex items-center gap-3">
                              {item.image ? (
                                <Image
                                  height={44}
                                  width={44}
                                  src={item.image}
                                  alt={displayName}
                                  unoptimized
                                  className="w-11 h-11 rounded-xl object-cover border border-white/10 group-hover:scale-105 transition-transform"
                                />
                              ) : (
                                <div className="w-11 h-11 rounded-xl bg-rose-500/10 border border-rose-500/20 flex items-center justify-center text-rose-400 shrink-0">
                                  <UtensilsCrossed size={16} />
                                </div>
                              )}
                              <span className="text-sm font-medium text-white truncate max-w-[220px]">
                                {displayName}
                              </span>
                            </div>
                          </td>

                          <td className="px-6 py-4">
                            <span className="inline-flex items-center gap-1.5 text-xs font-medium text-amber-400 bg-amber-500/10 border border-amber-500/20 px-2.5 py-1 rounded-lg w-fit">
                              <Tag className="w-3.5 h-3.5" />
                              {item.category || "—"}
                            </span>
                          </td>

                          <td className="px-6 py-4">
                            <span className="text-sm font-semibold text-white">
                              ৳{item.price?.toLocaleString() ?? "—"}
                            </span>
                          </td>

                          <td className="px-6 py-4">
                            <div className="flex items-center justify-center">
                              <DeleteFavoriteBtn item={{ _id: item._id, name: displayName }} />
                            </div>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>

            <div className="md:hidden flex flex-col gap-4">
              {items.map((item) => {
                const displayName = item.name || item.productName || "Untitled dish";
                return (
                  <div key={item._id} className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-2xl p-4">
                    <div className="flex items-start gap-3 mb-4">
                      {item.image ? (
                        <Image
                          height={52}
                          width={52}
                          src={item.image}
                          alt={displayName}
                          unoptimized
                          className="w-[52px] h-[52px] rounded-xl object-cover border border-white/10 shrink-0"
                        />
                      ) : (
                        <div className="w-[52px] h-[52px] rounded-xl bg-rose-500/10 border border-rose-500/20 flex items-center justify-center text-rose-400 shrink-0">
                          <UtensilsCrossed size={20} />
                        </div>
                      )}
                      <div className="min-w-0 flex-1 space-y-1.5">
                        <p className="text-sm font-semibold text-white truncate">{displayName}</p>
                        <span className="inline-flex items-center gap-1 text-[10px] font-medium text-amber-400 bg-amber-500/10 border border-amber-500/20 px-2 py-0.5 rounded-md">
                          <Tag className="w-3 h-3" /> {item.category || "—"}
                        </span>
                      </div>
                      <span className="text-sm font-bold text-white shrink-0">
                        ৳{item.price?.toLocaleString() ?? "—"}
                      </span>
                    </div>

                    <div className="pt-3 border-t border-white/5">
                      <DeleteFavoriteBtn item={{ _id: item._id, name: displayName }} full />
                    </div>
                  </div>
                );
              })}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Page;