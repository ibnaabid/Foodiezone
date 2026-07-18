"use client";

import React from "react";
import { motion } from "framer-motion";
import { Card } from "@heroui/react";
import { Pizza, Coffee, Carrot, Cake, Beef, CupSoda } from "lucide-react";

const categoriesData = [
  { id: 1, name: "Pizza", itemsCount: "24 Items", icon: <Pizza size={32} />, color: "bg-orange-100 text-orange-600" },
  { id: 2, name: "Burger", itemsCount: "18 Items", icon: <Beef size={32} />, color: "bg-red-100 text-red-600" },
  { id: 3, name: "Healthy", itemsCount: "12 Items", icon: <Carrot size={32} />, color: "bg-green-100 text-green-600" },
  { id: 4, name: "Dessert", itemsCount: "15 Items", icon: <Cake size={32} />, color: "bg-pink-100 text-pink-600" },
  { id: 5, name: "Drinks", itemsCount: "20 Items", icon: <CupSoda size={32} />, color: "bg-blue-100 text-blue-600" },
  { id: 6, name: "Cafe", itemsCount: "10 Items", icon: <Coffee size={32} />, color: "bg-amber-100 text-amber-600" },
];

export default function Categories() {
  return (
    <section className="py-24 bg-gray-50">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Popular <span className="text-orange-600">Categories</span></h2>
          <p className="text-gray-600">আপনার পছন্দের ক্যাটাগরি থেকে মজাদার সব খাবার খুঁজে নিন।</p>
        </div>
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
          {categoriesData.map((cat, i) => (
            <motion.div key={cat.id} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }}>
              <Card isPressable isHoverable className="w-full bg-white border-none shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col items-center justify-center p-6 gap-4 rounded-3xl group">
                <div className={`p-4 rounded-full ${cat.color} group-hover:scale-110 transition-transform`}>
                  {cat.icon}
                </div>
                <div className="text-center">
                  <h3 className="font-bold text-gray-800 text-lg">{cat.name}</h3>
                  <p className="text-xs text-gray-400 mt-1">{cat.itemsCount}</p>
                </div>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}