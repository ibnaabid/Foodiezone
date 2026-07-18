"use client";

import React from "react";
import { motion } from "framer-motion";
import { Award, Target, Users, Clock, Leaf } from "lucide-react";

export default function AboutPage() {
  const features = [
    { icon: Leaf, title: "Fresh Ingredients", desc: "আমরা শুধু সেরা মানের এবং সতেজ খাবার ব্যবহার করি।" },
    { icon: Clock, title: "Fast Service", desc: "আপনার সময়ের মূল্য আমাদের কাছে সবচেয়ে বেশি।" },
    { icon: Award, title: "Authentic Taste", desc: "ঐতিহ্যবাহী স্বাদের সাথে আধুনিকতার সংমিশ্রণ।" },
  ];

  return (
    <div className="min-h-screen bg-neutral-950 text-white py-20 px-6">
      <div className="max-w-6xl mx-auto">
        {/* Header Section */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }} 
          animate={{ opacity: 1, y: 0 }} 
          className="text-center mb-20"
        >
          <h1 className="text-5xl font-black mb-6">About <span className="text-emerald-500">CarvingByte</span></h1>
          <p className="text-neutral-400 text-xl max-w-2xl mx-auto leading-relaxed">
            খাবার শুধু একটি প্রয়োজন নয়, এটি একটি অভিজ্ঞতা। Foodi আপনার দোরগোড়ায় সেই অভিজ্ঞতা পৌঁছে দিতে প্রতিশ্রুতিবদ্ধ।
          </p>
        </motion.div>

        {/* Mission Section */}
        <div className="grid md:grid-cols-2 gap-16 items-center mb-24">
          <div className="space-y-6">
            <h2 className="text-3xl font-bold flex items-center gap-3">
              <Target className="text-emerald-500" /> Our Mission
            </h2>
            <p className="text-neutral-400 leading-relaxed">
              CravingByte শুরু হয়েছিল একটি ছোট স্বপ্ন নিয়ে—মানুষকে মানসম্মত খাবার দেওয়ার। আজ আমরা হাজার হাজার কাস্টমারের ভরসা অর্জন করেছি। আমাদের লক্ষ্য হলো খাবার ও প্রযুক্তির মধ্যে সেতুবন্ধন তৈরি করা।
            </p>
          </div>
          <div className="bg-neutral-900 border border-white/10 p-8 rounded-[2rem] h-64 flex items-center justify-center">
            <span className="text-emerald-500/50 text-9xl font-black">Byte</span>
          </div>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-3 gap-8">
          {features.map((feat, i) => (
            <div key={i} className="p-8 bg-neutral-900 border border-white/10 rounded-2xl hover:border-emerald-500/30 transition-all group">
              <feat.icon size={40} className="text-emerald-500 mb-6 group-hover:scale-110 transition-transform" />
              <h3 className="text-xl font-bold mb-3">{feat.title}</h3>
              <p className="text-neutral-400">{feat.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}