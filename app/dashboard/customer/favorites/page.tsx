"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import { Trash2, Heart, UtensilsCrossed } from "lucide-react";
import toast from "react-hot-toast";
import { authClient } from "@/app/lib/auth-client";

interface FavoriteItem {
  _id: string;
  name: string;
  price: number;
  image?: string;
  restaurantName: string;
  category?: string;
}

export default function FavoritesPage() {
  const [items, setItems] = useState<FavoriteItem[]>([]);
  const [loading, setLoading] = useState(true);

  const loadFavorites = async () => {
    try {
     

      const res = await fetch("http://localhost:5000/favorite", {
      
      });

      const data = await res.json();
      if (data.success) {
        setItems(data.favorites || []);
      } else {
        toast.error(data.message || "Failed to load favorites");
      }
    } catch (error) {
      console.error(error);
      toast.error("Failed to load favourites");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadFavorites();
  }, []);

  const handleDelete = async (id: string) => {
    if (!confirm("Remove this item from favourites?")) return;

    try {

      const res = await fetch(`http://localhost:5000/favorite/${id}`, {
        method: "DELETE",
       
      });

      const data = await res.json();

      if (data.success) {
        toast.success("Removed from favourites ❤️");
        setItems((prev) => prev.filter((item) => item._id !== id));
      } else {
        toast.error("Failed to remove");
      }
    } catch (error) {
      toast.error("Something went wrong");
      console.error(error);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-neutral-950">
        <div className="flex flex-col items-center gap-3">
          <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-emerald-500"></div>
          <p className="text-neutral-400">Loading your favourites...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-neutral-950 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-10">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-red-500/10 rounded-2xl">
              <Heart className="w-9 h-9 text-red-500" fill="currentColor" />
            </div>
            <div>
              <h1 className="text-4xl font-bold text-white tracking-tight">
                My Favourites
              </h1>
              <p className="text-neutral-400 mt-1">
                {items.length} {items.length === 1 ? "item" : "items"} saved
              </p>
            </div>
          </div>
        </div>

        {/* Empty State */}
        {items.length === 0 && (
          <div className="bg-neutral-900 rounded-3xl py-20 px-6 text-center border border-white/10">
            <UtensilsCrossed className="w-20 h-20 mx-auto text-neutral-600 mb-6" />
            <h3 className="text-3xl font-semibold text-white mb-3">No favourites yet</h3>
            <p className="text-neutral-400 max-w-md mx-auto">
              The dishes you love will appear here. Start exploring and save your favourites!
            </p>
          </div>
        )}

        {/* Desktop Table */}
        {items.length > 0 && (
          <div className="hidden md:block bg-neutral-900 rounded-3xl overflow-hidden border border-white/10">
            <table className="w-full">
              <thead>
                <tr className="bg-gradient-to-r from-emerald-600 to-emerald-500 text-white">
                  <th className="py-6 pl-8 text-left font-medium">Dish</th>
                  <th className="py-6 text-left font-medium">Restaurant</th>
                  <th className="py-6 text-left font-medium">Category</th>
                  <th className="py-6 text-right font-medium">Price</th>
                  <th className="py-6 pr-8 text-right font-medium">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/10">
                {items.map((item, index) => (
                  <tr key={item._id} className="hover:bg-white/5 transition-colors group">
                    <td className="pl-8 py-6">
                      <div className="flex items-center gap-4">
                        {item.image && (
                          <div className="relative w-16 h-16 rounded-2xl overflow-hidden border border-white/10">
                            <Image
                              src={item.image}
                              alt={item.name}
                              fill
                              className="object-cover"
                            />
                          </div>
                        )}
                        <p className="font-semibold text-white">{item.name}</p>
                      </div>
                    </td>
                    <td className="py-6 text-neutral-300">{item.restaurantName}</td>
                    <td className="py-6">
                      <span className="inline-block px-4 py-1.5 bg-emerald-500/10 text-emerald-400 rounded-full text-sm">
                        {item.category || "Food"}
                      </span>
                    </td>
                    <td className="py-6 text-right font-bold text-emerald-400 text-xl">
                      ৳{item.price}
                    </td>
                    <td className="py-6 pr-8 text-right">
                      <button
                        onClick={() => handleDelete(item._id)}
                        className="p-3 text-neutral-400 hover:text-red-500 hover:bg-red-500/10 rounded-2xl transition-all group-hover:scale-110"
                      >
                        <Trash2 size={22} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* Mobile Cards */}
        {items.length > 0 && (
          <div className="md:hidden space-y-4">
            {items.map((item) => (
              <div
                key={item._id}
                className="bg-neutral-900 rounded-3xl p-5 border border-white/10 hover:border-emerald-500/30 transition-all"
              >
                <div className="flex gap-4">
                  {item.image && (
                    <div className="relative w-24 h-24 rounded-2xl overflow-hidden flex-shrink-0">
                      <Image src={item.image} alt={item.name} fill className="object-cover" />
                    </div>
                  )}
                  <div className="flex-1">
                    <div className="flex justify-between">
                      <h3 className="text-lg font-semibold text-white line-clamp-2">
                        {item.name}
                      </h3>
                      <button
                        onClick={() => handleDelete(item._id)}
                        className="text-red-500 hover:bg-red-500/10 p-2 rounded-xl -mt-1"
                      >
                        <Trash2 size={20} />
                      </button>
                    </div>

                    <p className="text-emerald-400 font-medium mt-2">
                      ৳{item.price}
                    </p>
                    <p className="text-neutral-400 text-sm mt-1">{item.restaurantName}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}