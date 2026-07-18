// app/dashboard/restaurant/menu/page.tsx
import Link from "next/link";
import Image from "next/image";
import {
  UtensilsCrossed,
  Tag,
  Plus,
  Package,
  AlertTriangle,
  CircleCheck,
  CircleX,
} from "lucide-react";
import EditBtn from "./ViewBtn";
import DeleteProductDialog from "./DeleteBtn";

type MenuItem = {
  _id: string;
  name: string;
  description?: string;
  price: number;
  category: string;
  image?: string;
  available: boolean;
};

const Page = async () => {
  let items: MenuItem[] = [];
  let fetchError = false;

  try {
    const res = await fetch("http://localhost:5000/menu", {
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
          <h3 className="text-white font-semibold">Couldn&apos;t load menu</h3>
          <p className="text-neutral-500 text-sm mt-1">
            Make sure the backend server is running on port 5000, then refresh.
          </p>
        </div>
      </div>
    );
  }

  const totalItems = items.length;
  const availableCount = items.filter((i) => i.available).length;
  const categoryCount = new Set(items.map((i) => i.category)).size;

  return (
    <div className="min-h-screen bg-neutral-950 relative overflow-hidden">
      <div className="absolute -top-40 -right-40 w-96 h-96 bg-emerald-600/10 rounded-full blur-3xl" />
      <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-emerald-900/10 rounded-full blur-3xl" />

      <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl sm:text-3xl font-semibold text-white">Your Menu</h1>
            <p className="text-neutral-400 text-sm mt-1">
              Manage your dishes — {totalItems} item{totalItems !== 1 ? "s" : ""} in total
            </p>
          </div>
          <Link
            href="/dashboard/restaurant/Add-menu"
            className="inline-flex items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-500 text-white text-sm font-semibold px-4 py-2.5 rounded-xl transition-colors shadow-lg shadow-emerald-900/30 w-fit"
          >
            <Plus className="w-4 h-4" /> Add dish
          </Link>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
          <div className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-2xl p-5">
            <p className="text-xs text-neutral-500 uppercase tracking-wider">Total Dishes</p>
            <p className="text-2xl font-semibold text-white mt-1">{totalItems}</p>
          </div>
          <div className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-2xl p-5">
            <p className="text-xs text-neutral-500 uppercase tracking-wider">Available</p>
            <p className="text-2xl font-semibold text-emerald-400 mt-1">{availableCount}</p>
          </div>
          <div className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-2xl p-5 col-span-2 sm:col-span-1">
            <p className="text-xs text-neutral-500 uppercase tracking-wider">Categories</p>
            <p className="text-2xl font-semibold text-amber-400 mt-1">{categoryCount}</p>
          </div>
        </div>

        {/* Empty state */}
        {totalItems === 0 && (
          <div className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-2xl py-20 text-center">
            <div className="w-16 h-16 bg-emerald-500/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <Package className="w-8 h-8 text-emerald-400" />
            </div>
            <h3 className="text-white font-semibold">No dishes yet</h3>
            <p className="text-neutral-500 text-sm mt-1 mb-5">
              Start building your menu by adding your first dish.
            </p>
            <Link
              href="/dashboard/restaurant/Add-menu"
              className="inline-flex items-center gap-2 bg-emerald-600 hover:bg-emerald-500 text-white text-sm font-medium px-4 py-2.5 rounded-xl transition-colors"
            >
              <Plus className="w-4 h-4" /> Add your first dish
            </Link>
          </div>
        )}

        {/* DESKTOP TABLE */}
        {totalItems > 0 && (
          <>
            <div className="hidden md:block backdrop-blur-xl bg-white/5 border border-white/10 rounded-2xl overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full min-w-[680px] border-collapse text-left">
                  <thead>
                    <tr className="bg-white/5 border-b border-white/10">
                      <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wider text-neutral-400">Dish</th>
                      <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wider text-neutral-400">Category</th>
                      <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wider text-neutral-400">Price</th>
                      <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wider text-neutral-400">Status</th>
                      <th className="px-6 py-4 text-center text-xs font-semibold uppercase tracking-wider text-neutral-400">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/5">
                    {items.map((product) => (
                      <tr key={product._id} className="hover:bg-white/[0.03] transition-colors group">
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-3">
                            {product.image ? (
                              <Image
                                height={44}
                                width={44}
                                src={product.image}
                                alt={product.name}
                                unoptimized
                                className="w-11 h-11 rounded-xl object-cover border border-white/10 group-hover:scale-105 transition-transform"
                              />
                            ) : (
                              <div className="w-11 h-11 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400 shrink-0">
                                <UtensilsCrossed size={16} />
                              </div>
                            )}
                            <div className="min-w-0">
                              <p className="text-sm font-medium text-white truncate max-w-[220px]">{product.name}</p>
                              {product.description && (
                                <p className="text-xs text-neutral-500 truncate max-w-[220px]">{product.description}</p>
                              )}
                            </div>
                          </div>
                        </td>

                        <td className="px-6 py-4">
                          <span className="inline-flex items-center gap-1.5 text-xs font-medium text-amber-400 bg-amber-500/10 border border-amber-500/20 px-2.5 py-1 rounded-lg w-fit">
                            <Tag className="w-3.5 h-3.5" />
                            {product.category || "—"}
                          </span>
                        </td>

                        <td className="px-6 py-4">
                          <span className="text-sm font-semibold text-white">৳{product.price?.toLocaleString()}</span>
                        </td>

                        <td className="px-6 py-4">
                          {product.available ? (
                            <span className="inline-flex items-center gap-1.5 text-xs font-medium text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-2.5 py-1 rounded-lg">
                              <CircleCheck className="w-3.5 h-3.5" /> Available
                            </span>
                          ) : (
                            <span className="inline-flex items-center gap-1.5 text-xs font-medium text-neutral-500 bg-white/5 border border-white/10 px-2.5 py-1 rounded-lg">
                              <CircleX className="w-3.5 h-3.5" /> Out of stock
                            </span>
                          )}
                        </td>

                        <td className="px-6 py-4">
                          <div className="flex items-center justify-center gap-2">
                            <EditBtn product={product} />
                            <DeleteProductDialog product={product} />
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* MOBILE CARDS */}
            <div className="md:hidden flex flex-col gap-4">
              {items.map((product) => (
                <div key={product._id} className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-2xl p-4">
                  <div className="flex items-start gap-3 mb-4">
                    {product.image ? (
                      <Image
                        height={52}
                        width={52}
                        src={product.image}
                        alt={product.name}
                        unoptimized
                        className="w-[52px] h-[52px] rounded-xl object-cover border border-white/10 shrink-0"
                      />
                    ) : (
                      <div className="w-[52px] h-[52px] rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400 shrink-0">
                        <UtensilsCrossed size={20} />
                      </div>
                    )}
                    <div className="min-w-0 flex-1 space-y-1.5">
                      <p className="text-sm font-semibold text-white truncate">{product.name}</p>
                      <div className="flex flex-wrap gap-1.5">
                        <span className="inline-flex items-center gap-1 text-[10px] font-medium text-amber-400 bg-amber-500/10 border border-amber-500/20 px-2 py-0.5 rounded-md">
                          <Tag className="w-3 h-3" /> {product.category}
                        </span>
                        {product.available ? (
                          <span className="inline-flex items-center text-[10px] font-medium text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-2 py-0.5 rounded-md">
                            Available
                          </span>
                        ) : (
                          <span className="inline-flex items-center text-[10px] font-medium text-neutral-500 bg-white/5 border border-white/10 px-2 py-0.5 rounded-md">
                            Out of stock
                          </span>
                        )}
                      </div>
                    </div>
                    <span className="text-sm font-bold text-white shrink-0">৳{product.price?.toLocaleString()}</span>
                  </div>

                  <div className="flex gap-2.5 pt-3 border-t border-white/5">
                    <div className="flex-1">
                      <EditBtn product={product} />
                    </div>
                    <div className="flex-1">
                      <DeleteProductDialog product={product} />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Page;