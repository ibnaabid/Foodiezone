import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, MapPin, Truck, ShieldCheck, Leaf, Star, ShoppingCart } from "lucide-react";

interface Product {
  _id: string;
  productName: string;
  description: string;
  available: string;
  category: string;
  price: number;
  image: string;
}

interface PageProps {
  params: Promise<{ id: string }>;
}

const Page = async ({ params }: PageProps) => {
  const { id } = await params;

  // API Call
  const res = await fetch(`http://localhost:5000/menu/${id}`, { cache: "no-store" });
  const product: Product = await res.json();

  return (
    <section className="min-h-screen bg-neutral-50 py-12 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Back Button */}
        <Link href="/menu" className="inline-flex items-center gap-2 mb-8 text-sm font-semibold text-neutral-600 hover:text-emerald-600 transition">
          <ArrowLeft size={18} /> Back to Menu
        </Link>

        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* IMAGE SECTION */}
          <div className="relative">
            <div className="relative overflow-hidden rounded-3xl bg-white shadow-xl">
              <Image
                src={product.image}
                alt={product.productName}
                width={800}
                height={800}
                className="w-full h-[500px] object-cover hover:scale-105 transition-transform duration-700"
              />
            </div>
            {/* Badges Overlay */}
            <div className="absolute top-4 left-4 flex gap-2">
               <span className="bg-white/90 backdrop-blur px-3 py-1 rounded-full text-xs font-bold text-emerald-800 flex items-center gap-1 shadow-sm">
                 <Leaf size={14} /> Fresh
               </span>
            </div>
          </div>

          {/* CONTENT SECTION */}
          <div className="flex flex-col h-full">
            <h1 className="text-4xl lg:text-5xl font-extrabold text-neutral-900 leading-tight">{product.productName}</h1>
            
            <div className="flex items-center gap-4 mt-4">
              <div className="flex text-amber-400">
                {[...Array(5)].map((_, i) => <Star key={i} fill="currentColor" size={18} />)}
              </div>
              <span className="text-sm text-neutral-500 font-medium">4.9/5 (250+ Reviews)</span>
            </div>

            <p className="mt-6 text-neutral-600 leading-relaxed text-lg">{product.description}</p>

            {/* Pricing */}
            <div className="mt-8 py-6 border-y border-neutral-200 flex items-end gap-2">
              <span className="text-sm font-bold text-neutral-400 uppercase">Price:</span>
              <span className="text-4xl font-black text-emerald-700">৳{product.price.toLocaleString()}</span>
            </div>

            {/* Info Cards */}
            <div className="grid grid-cols-2 gap-4 mt-8">
              <div className="p-4 rounded-2xl bg-white border border-neutral-100 flex items-center gap-3">
                <MapPin className="text-emerald-600 shrink-0" />
                <div>
                  <p className="text-[10px] uppercase text-neutral-400 font-bold tracking-wider">Order</p>
                  <p className="text-sm font-semibold truncate">{product.available}</p>
                </div>
              </div>
              <div className="p-4 rounded-2xl bg-white border border-neutral-100 flex items-center gap-3">
                <Truck className="text-emerald-600 shrink-0" />
                <div>
                  <p className="text-[10px] uppercase text-neutral-400 font-bold tracking-wider">Food Type</p>
                  <p className="text-green-900 font-semibold">{product.category}</p>
                </div>
              </div>
            </div>

            {/* Order Button */}
            <button className="mt-10 w-full py-4 rounded-2xl bg-emerald-600 text-white font-bold text-lg flex items-center justify-center gap-2 hover:bg-emerald-700 transition-all shadow-lg shadow-emerald-200 active:scale-95">
              <ShoppingCart size={20} /> Order Now
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Page;