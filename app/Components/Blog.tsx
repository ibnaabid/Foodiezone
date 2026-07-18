"use client";

import React from "react";
import { motion } from "framer-motion";
import { Card, CardBody, Image, Button } from "@heroui/react";
import { Calendar, ArrowRight } from "lucide-react";

const blogs = [
  { id: 1, title: "10 Reasons Why Fast Food Can Be Healthy", date: "Oct 12, 2026", img: "https://images.unsplash.com/photo-1493770348161-369560ae357d?q=80&w=800&auto=format&fit=crop" },
  { id: 2, title: "How to Choose the Perfect Pizza Crust", date: "Oct 15, 2026", img: "https://images.unsplash.com/photo-1604382354936-07c5d9983bd3?q=80&w=800&auto=format&fit=crop" },
  { id: 3, title: "The Secret Ingredients of Our Master Chef", date: "Oct 18, 2026", img: "https://images.unsplash.com/photo-1577219491135-ce391730fb2c?q=80&w=800&auto=format&fit=crop" },
];

export default function Blogs() {
  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex justify-between items-end mb-12">
          <div>
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Latest <span className="text-orange-600">News & Blogs</span></h2>
            <p className="text-gray-600">খাদ্য জগতের নতুন সব খবর এবং রেসিপি সম্পর্কে জানুন।</p>
          </div>
          <Button variant="light" color="primary" className="hidden md:flex text-orange-600 font-bold" endContent={<ArrowRight size={18} />}>
            View All
          </Button>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {blogs.map((blog, i) => (
            <motion.div key={blog.id} initial={{ opacity: 0, scale: 0.9 }} whileInView={{ opacity: 1, scale: 1 }} transition={{ delay: i * 0.2 }} viewport={{ once: true }}>
              <Card className="w-full bg-white shadow-md hover:shadow-2xl transition-all border-none">
                <Image src={blog.img} alt={blog.title} className="w-full h-56 object-cover rounded-t-2xl" />
                <CardBody className="p-6 gap-4">
                  <div className="flex items-center gap-2 text-sm text-gray-500">
                    <Calendar size={16} className="text-orange-500" /> {blog.date}
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 line-clamp-2 hover:text-orange-600 transition-colors cursor-pointer">{blog.title}</h3>
                  <Button variant="light" className="w-fit px-0 text-orange-600 font-semibold" endContent={<ArrowRight size={16} />}>Read More</Button>
                </CardBody>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}