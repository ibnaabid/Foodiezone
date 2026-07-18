"use client";

import React from "react";
import { motion } from "framer-motion";
import { ArrowRight, Flame, Heart } from "lucide-react";

export default function HighlightsSection() {
  return (
    <section className="py-24 bg-white relative overflow-hidden">
      {/* Background Blobs */}
      <div className="absolute top-0 left-0 w-72 h-72 bg-orange-100 rounded-full mix-blend-multiply filter blur-3xl opacity-50"></div>
      <div className="absolute top-0 right-0 w-72 h-72 bg-yellow-100 rounded-full mix-blend-multiply filter blur-3xl opacity-50"></div>

      <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
        <div className="flex flex-col lg:flex-row items-center gap-16">
          
          {/* Left Side: Images */}
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="w-full lg:w-1/2 relative"
          >
            <div className="relative rounded-3xl overflow-hidden shadow-2xl">
              <img
                src="https://images.unsplash.com/photo-1544025162-836b2b52fa31?q=80&w=1200&auto=format&fit=crop"
                alt="Signature Burger"
                className="w-full h-auto object-cover"
              />
            </div>

            {/* Floating Badges */}
            <div className="absolute -bottom-6 -left-6 bg-white p-4 rounded-2xl shadow-xl flex items-center gap-3">
              <div className="p-2 bg-red-100 text-red-500 rounded-full"><Heart className="fill-current" /></div>
              <div>
                <p className="text-sm font-bold text-gray-900">Loved by</p>
                <p className="text-xs text-gray-500">10k+ Customers</p>
              </div>
            </div>
          </motion.div>

          {/* Right Side: Text & Actions */}
          <motion.div 
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="w-full lg:w-1/2 flex flex-col items-start gap-6"
          >
            <div className="flex items-center gap-2 bg-orange-100 text-orange-600 px-4 py-2 rounded-full font-semibold">
              <Flame size={18} /> Weekly Highlight
            </div>

            <h2 className="text-4xl md:text-6xl font-black text-gray-900 leading-tight">
              The Ultimate <span className="text-orange-600">Foodi Burger</span>
            </h2>

            <p className="text-lg text-gray-600 leading-relaxed">
              ডাবল বিফ প্যাটি, মেল্টেড চিজ, আমাদের স্পেশাল সিক্রেট সস এবং ফ্রেশ সবজির সমন্বয়ে তৈরি আমাদের এই সিগনেচার বার্গারটি আপনার ক্ষুধা মেটানোর সেরা উপায়। আজই ট্রাই করুন।
            </p>

            <div className="flex flex-wrap items-center gap-4 mt-4">
              <button className="bg-gray-900 text-white font-bold px-8 py-4 rounded-full hover:bg-orange-600 transition-colors flex items-center gap-2">
                Order Now - $12.99 <ArrowRight size={20} />
              </button>
              <button className="font-bold px-8 py-4 rounded-full border-2 border-gray-200 hover:border-orange-600 text-gray-900 transition-colors">
                View Details
              </button>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}