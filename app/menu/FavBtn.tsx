"use client";

import { Heart } from "lucide-react";
import { motion } from "framer-motion";
import { authClient } from "@/app/lib/auth-client";
import toast from "react-hot-toast";

interface Product {
  _id: string;
  name: string;
  price: number;
  image?: string;
  category: string;
}

interface Props {
  product: Product;
}

export default function FavouriteButton({ product }: Props) {
  const { data: session } = authClient.useSession();

  const handleFavourite = async (
    e: React.MouseEvent<HTMLButtonElement>
  ) => {
    e.preventDefault();
    e.stopPropagation();

    if (!session?.user) {
      toast.error("Please login first");
      return;
    }

    const favourite = {
      productId: product._id,
      userEmail: session.user.email,
      userName: session.user.name,
      productName: product.name,
      image: product.image,
      price: product.price,
      category: product.category,
    };

    console.log(favourite);

    try {
      const res = await fetch("https://foodie-zone-backend.vercel.app/favorite", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(favourite),
      });

      const data = await res.json();

      console.log(data);

      if (res.ok) {
        toast.success(data.message);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error("Network Error");
    }
  };

  return (
    <motion.button
      whileHover={{ scale: 1.08 }}
      whileTap={{ scale: 0.95 }}
      onClick={handleFavourite}
      className="p-2 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition text-neutral-400 hover:text-red-500"
    >
      <Heart size={18} />
    </motion.button>
  );
}