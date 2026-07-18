"use client";

import React from "react";
import { motion } from "framer-motion";
import { Button, Image } from "@heroui/react";
import { Smartphone, ShoppingBag } from "lucide-react";

export default function CTA() {
  return (
    <section className="py-24 bg-gray-900 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-12">
        
        <motion.div initial={{ opacity: 0, x: -50 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="md:w-1/2 text-white">
          <h2 className="text-4xl md:text-6xl font-black mb-6 leading-tight">
            Ready to order <br/><span className="text-orange-500">delicious food?</span>
          </h2>
          <p className="text-gray-400 text-lg mb-8">
            Foodi অ্যাপ ডাউনলোড করুন আর ঘরে বসেই আপনার পছন্দের সব খাবার অর্ডার করুন। অ্যাপ ইউজারদের জন্য রয়েছে স্পেশাল ডিসকাউন্ট!
          </p>
          <div className="flex flex-wrap gap-4">
            <Button size="lg" className="bg-orange-600 text-white font-bold px-8 py-6 rounded-full" startContent={<ShoppingBag size={20} />}>
              Order Online Now
            </Button>
            <Button size="lg" variant="bordered" className="text-white border-gray-600 font-bold px-8 py-6 rounded-full hover:border-orange-500" startContent={<Smartphone size={20} />}>
              Download App
            </Button>
          </div>
        </motion.div>

        <motion.div initial={{ opacity: 0, x: 50, rotate: 10 }} whileInView={{ opacity: 1, x: 0, rotate: 0 }} viewport={{ once: true }} className="md:w-1/2 flex justify-center relative">
           {/* Decorative circle */}
           <div className="absolute w-72 h-72 bg-orange-600/20 rounded-full blur-3xl z-0"></div>
           
           <Image 
             src="https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?q=80&w=800&auto=format&fit=crop" 
             alt="Mobile App" 
             className="w-64 md:w-80 h-auto rounded-[3rem] border-8 border-gray-800 shadow-2xl relative z-10"
           />
        </motion.div>

      </div>
    </section>
  );
}