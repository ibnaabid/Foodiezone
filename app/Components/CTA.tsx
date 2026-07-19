"use client";

import React from "react";
import { motion } from "framer-motion";
import { Button } from "@heroui/react";
import { ArrowRight, Utensils } from "lucide-react";

export default function CTA() {
  return (
    <section className="py-20 px-6">
      <div className="max-w-6xl mx-auto">
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="relative bg-orange-600 rounded-[3rem] overflow-hidden p-12 md:p-20 text-center"
        >
          {/* Background Decorative Elements */}
          <div className="absolute top-0 left-0 w-full h-full bg-[url('https://www.transparenttextures.com/patterns/food.png')] opacity-10"></div>
          <div className="absolute -top-24 -right-24 w-64 h-64 bg-white opacity-10 rounded-full blur-3xl"></div>

          <div className="relative z-10 max-w-2xl mx-auto">
            <div className="bg-white/20 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-8 backdrop-blur-md">
              <Utensils className="text-white" size={32} />
            </div>
            
            <h2 className="text-4xl md:text-6xl font-black text-white mb-6">
              Ready to taste the <br /> best food?
            </h2>
            <p className="text-orange-50 text-lg mb-10 leading-relaxed">
              হাজারো গ্রাহকের আস্থার প্রতীক আমাদের খাবার। আজই অর্ডার করুন এবং আমাদের এক্সক্লুসিভ ডিসকাউন্ট উপভোগ করুন। 
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              {/* Order Now Button - Error fixed by adding icon as children */}
              <Button 
                size="lg" 
                className="bg-white text-orange-600 font-bold px-10 hover:bg-gray-100 transition-all flex items-center gap-2"
              >
                Order Now <ArrowRight size={20} />
              </Button>

              {/* View Menu Button */}
              <Button 
                size="lg" 
                variant="bordered"
                className="text-white border-white hover:bg-white/10 font-bold px-10"
              >
                View Menu
              </Button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}