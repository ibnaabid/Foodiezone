// app/menu/MenuCard.tsx
"use client";

import { motion } from "framer-motion";
import { ShoppingBag, Heart, Tag, CircleCheck, CircleX } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

interface Product {
  _id: string;
  name: string;
  description?: string;
  price: number;
  category: string;
  image?: string;
  available: boolean;
}

interface MenuCardProps {
  product: Product;
}

const fallbackImage =
  "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?q=80&w=600&auto=format&fit=crop";

export default function MenuCard({ product }: MenuCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.35 }}
      className="group backdrop-blur-xl bg-white/5 border border-white/10 rounded-2xl overflow-hidden hover:border-white/20 hover:-translate-y-1 transition-all flex flex-col h-full"
    >
      <div className="relative aspect-[4/3] w-full overflow-hidden bg-gradient-to-br from-emerald-500/10 to-amber-500/10">
        <Image
          fill
          src={
            product.image && !product.image.startsWith("blob:")
              ? product.image
              : fallbackImage
          }
          alt={product.name}
          className="object-cover object-center transform group-hover:scale-105 transition-transform duration-500"
          unoptimized
        />

        <div className="absolute top-3 left-3 z-10">
          <span className="inline-flex items-center gap-1 text-[10px] font-semibold tracking-wide uppercase px-2.5 py-1 rounded-md bg-neutral-950/80 backdrop-blur-sm text-amber-400 border border-amber-500/20">
            <Tag size={11} /> {product.category || "Dish"}
          </span>
        </div>

        <div className="absolute top-3 right-3 z-10">
          <button className="p-2 rounded-full bg-neutral-950/80 backdrop-blur-sm text-neutral-300 hover:text-rose-400 transition-colors active:scale-90">
            <Heart size={14} />
          </button>
        </div>

        <div className="absolute bottom-3 left-3 z-10">
          {product.available ? (
            <span className="inline-flex items-center gap-1 text-[10px] font-medium px-2 py-1 rounded-md bg-emerald-500/15 backdrop-blur-sm text-emerald-400 border border-emerald-500/20">
              <CircleCheck size={11} /> Available
            </span>
          ) : (
            <span className="inline-flex items-center gap-1 text-[10px] font-medium px-2 py-1 rounded-md bg-white/5 backdrop-blur-sm text-neutral-400 border border-white/10">
              <CircleX size={11} /> Out of stock
            </span>
          )}
        </div>
      </div>

      <div className="p-5 flex flex-col flex-grow">
        <h3 className="text-base font-semibold text-white mb-1 group-hover:text-emerald-400 transition-colors line-clamp-1">
          {product.name}
        </h3>

        <p className="text-xs text-neutral-500 line-clamp-2 mb-4 leading-relaxed flex-grow">
          {product.description || "No description available."}
        </p>

        <div className="mt-auto pt-3.5 flex items-center justify-between border-t border-white/5">
          <div>
            <span className="text-[10px] text-neutral-500 block uppercase tracking-wider font-medium">
              Price
            </span>
            <span className="text-lg font-bold text-white">
              ৳{product.price ? product.price.toLocaleString("en-BD") : "0"}
            </span>
          </div>

          <Link href={`/menu/${product._id}`} passHref>
            <motion.span
              whileHover={{ y: -1 }}
              whileTap={{ scale: 0.96 }}
              className={`inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-medium transition-all cursor-pointer ${
                product.available
                  ? "bg-emerald-600 hover:bg-emerald-500 text-white"
                  : "bg-white/5 text-neutral-500 cursor-not-allowed"
              }`}
            >
              <ShoppingBag size={13} />
              {product.available ? "Order" : "Unavailable"}
            </motion.span>
          </Link>
        </div>
      </div>
    </motion.div>
  );
}