// app/menu/[id]/page.tsx
import Image from "next/image";
import Link from "next/link";
import {
  ArrowLeft,
  Tag,
  Truck,
  Leaf,
  Star,
  ShoppingCart,
  CircleCheck,
  CircleX,
  AlertTriangle,
} from "lucide-react";

interface Product {
  _id: string;
  name: string;
  description?: string;
  available: boolean;
  category: string;
  price: number;
  image?: string;
}

interface PageProps {
  params: Promise<{ id: string }>;
}

const fallbackImage =
  "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?q=80&w=800&auto=format&fit=crop";

const Page = async ({ params }: PageProps) => {
  const { id } = await params;

  let product: Product | null = null;
  let fetchError = false;

  try {
    const res = await fetch(`http://localhost:5000/menu/${id}`, {
      cache: "no-store",
    });

    if (!res.ok) {
      fetchError = true;
    } else {
      product = await res.json();
    }
  } catch (error) {
    fetchError = true;
  }

  if (fetchError || !product) {
    return (
      <div className="min-h-screen bg-neutral-950 flex items-center justify-center px-4">
        <div className="backdrop-blur-xl bg-white/5 border border-red-500/20 rounded-2xl p-10 text-center max-w-md">
          <div className="w-14 h-14 bg-red-500/10 rounded-full flex items-center justify-center mx-auto mb-4">
            <AlertTriangle className="w-7 h-7 text-red-400" />
          </div>
          <h3 className="text-white font-semibold">Dish not found</h3>
          <p className="text-neutral-500 text-sm mt-1 mb-5">
            This item may have been removed or the link is incorrect.
          </p>
          <Link
            href="/menu"
            className="inline-flex items-center gap-2 bg-emerald-600 hover:bg-emerald-500 text-white text-sm font-medium px-4 py-2.5 rounded-xl transition-colors"
          >
            <ArrowLeft size={16} /> Back to menu
          </Link>
        </div>
      </div>
    );
  }

  return (
    <section className="min-h-screen bg-neutral-950 relative overflow-hidden py-12 px-4">
      <div className="absolute -top-40 -right-40 w-96 h-96 bg-emerald-600/10 rounded-full blur-3xl" />
      <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-amber-600/10 rounded-full blur-3xl" />

      <div className="relative max-w-6xl mx-auto">
        <Link
          href="/menu"
          className="inline-flex items-center gap-2 mb-8 text-sm font-medium text-neutral-400 hover:text-white transition-colors"
        >
          <ArrowLeft size={18} /> Back to Menu
        </Link>

        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* IMAGE SECTION */}
          <div className="relative">
            <div className="relative overflow-hidden rounded-3xl backdrop-blur-xl bg-white/5 border border-white/10 shadow-2xl">
              <Image
                src={product.image || fallbackImage}
                alt={product.name}
                width={800}
                height={800}
                unoptimized
                className="w-full h-[500px] object-cover hover:scale-105 transition-transform duration-700"
              />
            </div>
            <div className="absolute top-4 left-4 flex gap-2">
              <span className="bg-neutral-950/80 backdrop-blur-sm px-3 py-1.5 rounded-full text-xs font-semibold text-emerald-400 flex items-center gap-1 border border-emerald-500/20">
                <Leaf size={14} /> Fresh
              </span>
            </div>
          </div>

          {/* CONTENT SECTION */}
          <div className="flex flex-col h-full">
            <h1 className="text-4xl lg:text-5xl font-bold text-white leading-tight">
              {product.name}
            </h1>

            <div className="flex items-center gap-4 mt-4">
              <div className="flex text-amber-400">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} fill="currentColor" size={18} />
                ))}
              </div>
              <span className="text-sm text-neutral-500 font-medium">4.9/5 (250+ Reviews)</span>
            </div>

            <p className="mt-6 text-neutral-400 leading-relaxed text-lg">
              {product.description || "No description available for this dish."}
            </p>

            {/* Pricing */}
            <div className="mt-8 py-6 border-y border-white/10 flex items-end gap-2">
              <span className="text-sm font-bold text-neutral-500 uppercase">Price:</span>
              <span className="text-4xl font-black text-white">
                ৳{product.price?.toLocaleString() ?? "0"}
              </span>
            </div>

            {/* Info Cards */}
            <div className="grid grid-cols-2 gap-4 mt-8">
              <div className="p-4 rounded-2xl backdrop-blur-xl bg-white/5 border border-white/10 flex items-center gap-3">
                {product.available ? (
                  <CircleCheck className="text-emerald-400 shrink-0" />
                ) : (
                  <CircleX className="text-neutral-500 shrink-0" />
                )}
                <div>
                  <p className="text-[10px] uppercase text-neutral-500 font-bold tracking-wider">
                    Status
                  </p>
                  <p className="text-sm font-semibold text-white truncate">
                    {product.available ? "Available" : "Out of stock"}
                  </p>
                </div>
              </div>
              <div className="p-4 rounded-2xl backdrop-blur-xl bg-white/5 border border-white/10 flex items-center gap-3">
                <Tag className="text-amber-400 shrink-0" />
                <div>
                  <p className="text-[10px] uppercase text-neutral-500 font-bold tracking-wider">
                    Category
                  </p>
                  <p className="text-sm font-semibold text-white truncate">{product.category}</p>
                </div>
              </div>
            </div>

            {/* Order Button */}
            <button
              disabled={!product.available}
              className="mt-10 w-full py-4 rounded-2xl bg-emerald-600 text-white font-bold text-lg flex items-center justify-center gap-2 hover:bg-emerald-500 disabled:bg-white/5 disabled:text-neutral-500 disabled:cursor-not-allowed transition-all shadow-lg shadow-emerald-900/30 active:scale-95"
            >
              <ShoppingCart size={20} />
              {product.available ? "Order Now" : "Currently Unavailable"}
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Page;