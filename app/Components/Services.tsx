"use client";

import React from "react";
import { motion } from "framer-motion";
import { Utensils, Clock, MapPin, ShieldCheck } from "lucide-react";

const services = [
  {
    icon: <Utensils size={32} />,
    title: "Fresh & Healthy",
    description: "আমরা সবসময় টাটকা এবং স্বাস্থ্যকর উপাদান দিয়ে খাবার তৈরি করি।"
  },
  {
    icon: <Clock size={32} />,
    title: "Fast Delivery",
    description: "আপনার পছন্দের খাবার দ্রুততম সময়ে আপনার দোরগোড়ায় পৌঁছে যাবে।"
  },
  {
    icon: <MapPin size={32} />,
    title: "Wide Coverage",
    description: "শহরের যেকোনো প্রান্তে আমাদের ডেলিভারি সার্ভিস বিস্তৃত।"
  },
  {
    icon: <ShieldCheck size={32} />,
    title: "Quality Assured",
    description: "খাবারের মান এবং হাইজিন নিয়ে আমরা আপোষহীন।"
  }
];

export default function Services() {
  return (
    <section className="py-24 bg-gray-50">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-16">
          <h3 className="text-orange-600 font-bold tracking-widest uppercase text-sm mb-2">Our Services</h3>
          <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900">Why Choose Us?</h2>
        </div>

        {/* Grid Container */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {services.map((service, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100 hover:shadow-xl hover:border-orange-100 transition-all duration-300 group"
            >
              <div className="w-16 h-16 bg-orange-100 text-orange-600 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-orange-600 group-hover:text-white transition-colors duration-300">
                {service.icon}
              </div>
              <h4 className="text-xl font-bold text-gray-900 mb-3">{service.title}</h4>
              <p className="text-gray-600 leading-relaxed">{service.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}