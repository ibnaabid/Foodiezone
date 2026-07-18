"use client";

import React from "react";
import { motion } from "framer-motion";
import { Users, ChefHat, Timer, Store } from "lucide-react";

const statsData = [
  { id: 1, label: "Happy Customers", value: "15K+", icon: <Users size={40} className="text-orange-500" /> },
  { id: 2, label: "Master Chefs", value: "50+", icon: <ChefHat size={40} className="text-orange-500" /> },
  { id: 3, label: "Fast Delivery", value: "30 Min", icon: <Timer size={40} className="text-orange-500" /> },
  { id: 4, label: "Branches", value: "12", icon: <Store size={40} className="text-orange-500" /> },
];

export default function Statistics() {
  return (
    <section className="py-20 bg-gray-900 text-white relative overflow-hidden">
      <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-gray-500 via-gray-900 to-black"></div>
      <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} className="grid grid-cols-2 lg:grid-cols-4 gap-8 divide-x-0 lg:divide-x divide-gray-700">
          {statsData.map((stat, i) => (
            <motion.div key={stat.id} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }} className="flex flex-col items-center justify-center text-center p-4">
              <div className="mb-4 p-4 bg-gray-800 rounded-full shadow-lg border border-gray-700">
                {stat.icon}
              </div>
              <h3 className="text-4xl font-black text-white mb-2">{stat.value}</h3>
              <p className="text-gray-400 font-medium text-lg">{stat.label}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}