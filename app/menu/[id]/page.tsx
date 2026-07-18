import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, MapPin, Truck, ShieldCheck, Leaf, Star } from "lucide-react";


interface Product {
  _id: string;
  productName: string;
  description: string;
  pickupAddress: string;
  parcelType: string;
  price: number;
  image: string;
}

interface PageProps {
  params: Promise<{ id: string }>;
}

const Page = async ({ params }: PageProps) => {
  const { id } = await params;



  // API Call
  const res = await fetch(`http://localhost:3000/menu/${id}`, {
    cache: "no-store",
   
  });

  const product: Product = await res.json();

  return (
    <section className="min-h-screen bg-gradient-to-br from-[#FAF7F0] via-white to-[#F4F8F3] py-12 px-4">
      <div className="max-w-7xl mx-auto">
        <Link href="/shop" className="inline-flex items-center gap-2 mb-8 text-sm font-medium text-emerald-800 hover:text-emerald-600 transition">
          <ArrowLeft size={18} /> Back to Shop
        </Link>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* IMAGE SECTION */}
          <div className="relative group">
            <div className="absolute -inset-3 rounded-[35px] bg-gradient-to-r from-emerald-200 via-amber-100 to-emerald-100 blur-2xl opacity-70"></div>
            <div className="relative overflow-hidden rounded-[32px] bg-white shadow-2xl border border-white">
              <Image
                src={product.image}
                alt={product.productName}
                width={900}
                height={900}
                className="w-full h-[550px] object-cover transition duration-700 group-hover:scale-105"
              />
            </div>
          </div>

          {/* CONTENT SECTION */}
          <div>
            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-100 text-emerald-700 text-sm font-semibold">
              <Leaf size={15} /> Eco Friendly Product
            </span>
            <h1 className="text-5xl font-black mt-5 leading-tight text-[#16301F]">{product.productName}</h1>
            
            <div className="flex items-center gap-2 mt-5 text-yellow-500">
              <Star fill="currentColor" size={18} />
              <span className="text-gray-500 ml-2">4.9 (250 Reviews)</span>
            </div>

            <h2 className="mt-8 text-6xl font-black text-emerald-700">৳{product.price.toLocaleString()}</h2>
            <p className="mt-8 text-gray-600 leading-8 text-lg">{product.description}</p>

            <div className="mt-10 space-y-5">
              <div className="flex items-center gap-4 p-5 rounded-2xl bg-white shadow">
                <MapPin className="text-emerald-700" />
                <div>
                  <p className="text-xs uppercase text-gray-400">Pickup Location</p>
                  <h4 className="font-semibold">{product.pickupAddress}</h4>
                </div>
              </div>
              {/* ... অন্যান্য ডিটেইলস ... */}
            </div>

         
          </div>
        </div>
      </div>
    </section>
  );
};

export default Page;