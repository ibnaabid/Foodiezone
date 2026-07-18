"use client";

import React from "react";
import { motion } from "framer-motion";
import { Button, Image, Chip, Avatar } from "@heroui/react";
import { ArrowRight, Play, Star } from "lucide-react";

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.15 } },
};

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

export default function Hero() {
  return (
    <section className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden bg-white">
      {/* Background Blobs */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-orange-100 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-pulse"></div>
      <div className="absolute top-20 left-10 w-72 h-72 bg-yellow-100 rounded-full mix-blend-multiply filter blur-3xl opacity-70"></div>

      <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Hero Text */}
          <motion.div initial="hidden" animate="visible" variants={staggerContainer} className="flex flex-col items-start gap-6">
            <motion.div variants={fadeUp}>
              <Chip color="primary" variant="flat" className="bg-orange-100 text-orange-600 font-bold px-4 py-1">
                🚀 Fastest Delivery In Town
              </Chip>
            </motion.div>
            <motion.h1 variants={fadeUp} className="text-5xl lg:text-7xl font-black text-gray-900 leading-tight">
              Dive into a World of <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-red-500">Deliciousness</span>
            </motion.h1>
            <motion.p variants={fadeUp} className="text-lg text-gray-600 max-w-lg">
              সেরা স্বাদের খাবার এখন আপনার হাতের মুঠোয়। Foodi-তে অর্ডার করুন এবং ঘরে বসেই উপভোগ করুন রেস্টুরেন্টের স্বাদ।
            </motion.p>
            <motion.div variants={fadeUp} className="flex flex-wrap gap-4 mt-4">
              <Button size="lg" className="bg-orange-600 text-white font-bold px-8 py-6 rounded-full shadow-lg">
                Order Now <ArrowRight size={20} />
              </Button>
              <Button size="lg" variant="bordered" className="border-2 font-bold px-8 py-6 rounded-full text-gray-800">
                <Play size={20} className="text-orange-500" /> Watch Video
              </Button>
            </motion.div>
          </motion.div>

          {/* Hero Image */}
          <motion.div initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.8 }} className="relative">
            <Image src="https://images.unsplash.com/photo-1550547660-d9450f859349?q=80&w=1000&auto=format&fit=crop" alt="Burger" className="w-full h-auto rounded-full shadow-2xl border-8 border-white" />
            <motion.div animate={{ y: [0, -20, 0] }} transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }} className="absolute top-10 -left-10 bg-white p-4 rounded-2xl shadow-xl flex items-center gap-3 z-20">
              <Avatar src="https://i.pravatar.cc/150?u=a042581f4e29026024d" />
              <div>
                <p className="text-sm font-bold text-gray-900">John Doe</p>
                <div className="flex text-yellow-400 text-sm">
                  <Star fill="currentColor" size={14} /><Star fill="currentColor" size={14} /><Star fill="currentColor" size={14} />
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}