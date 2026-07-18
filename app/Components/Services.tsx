"use client";

import React from "react";
import { motion } from "framer-motion";
import { Card, CardHeader, CardBody, Button } from "@heroui/react";
import { Utensils, Clock, Truck, ChefHat, ShieldCheck, Star } from "lucide-react";

// TypeScript Interface
interface ServiceItem {
  id: number;
  title: string;
  description: string;
  icon: React.ReactNode;
}

// Service Data
const servicesData: ServiceItem[] = [
  { id: 1, title: "Farm Fresh Ingredients", description: "আমরা সরাসরি খামার থেকে আসা সতেজ উপাদান ব্যবহার করি।", icon: <Utensils size={32} /> },
  { id: 2, title: "Lightning Fast Delivery", description: "অর্ডার করার ৩০ মিনিটের মধ্যে আপনার দরজায় খাবার।", icon: <Clock size={32} /> },
  { id: 3, title: "Free Home Delivery", description: "নির্দিষ্ট এলাকার মধ্যে কোনো ডেলিভারি চার্জ নেই।", icon: <Truck size={32} /> },
  { id: 4, title: "Master Chefs", description: "আমাদের রয়েছে আন্তর্জাতিক মানের অভিজ্ঞ শেফ প্যানেল।", icon: <ChefHat size={32} /> },
  { id: 5, title: "100% Hygiene Strict", description: "খাবার তৈরিতে সর্বোচ্চ পরিচ্ছন্নতা বজায় রাখা হয়।", icon: <ShieldCheck size={32} /> },
  { id: 6, title: "Premium Quality", description: "সেরা স্বাদের নিশ্চয়তা এবং প্রিমিয়াম কাস্টমার সার্ভিস।", icon: <Star size={32} /> },
];

// Framer Motion Variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.2 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
};

export default function ServicesSection() {
  return (
    <section className="py-24 bg-gray-50/50">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <motion.h2 
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-bold tracking-tight text-gray-900 mb-4"
          >
            Why Choose <span className="text-orange-600">Foodi?</span>
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-lg text-gray-600"
          >
            সেরা মানের খাবার এবং অতুলনীয় সার্ভিস দিয়ে আমরা সবসময় আপনার পাশেই আছি।
          </motion.p>
        </div>

        {/* Services Grid */}
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {servicesData.map((service) => (
            <motion.div key={service.id} variants={itemVariants}>
              <Card 
                isPressable
                isHoverable
                className="w-full border-none bg-white shadow-md hover:shadow-xl transition-shadow duration-300 p-4"
              >
                <CardHeader className="flex gap-4 items-center pb-2">
                  <div className="p-3 bg-orange-100 text-orange-600 rounded-xl">
                    {service.icon}
                  </div>
                  <h3 className="text-xl font-bold text-gray-800">{service.title}</h3>
                </CardHeader>
                <CardBody className="pt-2">
                  <p className="text-gray-500 leading-relaxed">
                    {service.description}
                  </p>
                </CardBody>
              </Card>
            </motion.div>
          ))}
        </motion.div>

        {/* Bottom CTA */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="mt-16 text-center"
        >
          <Button color="primary" variant="shadow" size="lg" className="bg-orange-600 font-semibold px-10 py-6 text-lg">
            Explore Full Menu
          </Button>
        </motion.div>
      </div>
    </section>
  );
}