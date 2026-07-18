"use client";

import React from "react";
import { motion } from "framer-motion";
import { Card, Avatar } from "@heroui/react"; // CardBody ইম্পোর্ট সরানো হয়েছে
import { Star, Quote } from "lucide-react";

const reviews = [
  { id: 1, name: "Rahim Islam", role: "Food Blogger", text: "Foodi-এর খাবার সত্যিই অসাধারণ! বিশেষ করে তাদের সিগনেচার বার্গারটি আমার সবচেয়ে প্রিয়।", avatar: "https://i.pravatar.cc/150?u=a042581f4e29026704d" },
  { id: 2, name: "Sadia Rahman", role: "Regular Customer", text: "ডেলিভারি অনেক ফাস্ট এবং খাবারের কোয়ালিটি সবসময় প্রিমিয়াম থাকে। হাইলি রেকমেন্ডেড!", avatar: "https://i.pravatar.cc/150?u=a042581f4e29026024d" },
  { id: 3, name: "Tanvir Hasan", role: "Local Guide", text: "পরিবেশ এবং প্যাকেজিং চমৎকার। বন্ধুদের সাথে পার্টি করার জন্য সেরা একটি জায়গা।", avatar: "https://i.pravatar.cc/150?u=a04258114e29026702d" },
];

export default function Testimonials() {
  return (
    <section className="py-24 bg-orange-50">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">What Our <span className="text-orange-600">Customers</span> Say</h2>
          <p className="text-gray-600">আমাদের সার্ভিস সম্পর্কে আমাদের সম্মানিত গ্রাহকদের মতামত জেনে নিন।</p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {reviews.map((review, i) => (
            <motion.div key={review.id} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.2 }} viewport={{ once: true }}>
              <Card className="p-6 bg-white border-none shadow-md hover:shadow-xl transition-shadow relative">
                <Quote className="absolute top-6 right-6 text-orange-100" size={48} />
                
                {/* CardBody এর পরিবর্তে সাধারণ div ব্যবহার করা হয়েছে */}
                <div className="flex flex-col gap-6 z-10">
                  <div className="flex text-yellow-400">
                    {[...Array(5)].map((_, index) => <Star key={index} fill="currentColor" size={18} />)}
                  </div>
                  <p className="text-gray-600 italic">"{review.text}"</p>
                  <div className="flex items-center gap-4 mt-2">
                    <Avatar src={review.avatar} size="lg" />
                    <div>
                      <h4 className="font-bold text-gray-900">{review.name}</h4>
                      <p className="text-sm text-gray-500">{review.role}</p>
                    </div>
                  </div>
                </div>
                
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}