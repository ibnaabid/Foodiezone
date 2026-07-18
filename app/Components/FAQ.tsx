"use client";

import React from "react";
import { motion } from "framer-motion";
import { Accordion, AccordionItem } from "@heroui/react";

const faqs = [
  { id: "1", q: "What are your delivery hours?", a: "আমরা প্রতিদিন সকাল ১০টা থেকে রাত ১১টা পর্যন্ত ডেলিভারি দিয়ে থাকি।" },
  { id: "2", q: "Do you offer vegetarian options?", a: "হ্যাঁ, আমাদের মেনুতে অনেক ধরনের নিরামিষ এবং স্বাস্থ্যকর খাবারের অপশন রয়েছে।" },
  { id: "3", q: "Is there any minimum order amount for free delivery?", a: "হ্যাঁ, ৫০০ টাকার বেশি অর্ডার করলে ডেলিভারি সম্পূর্ণ ফ্রি।" },
  { id: "4", q: "Can I cancel my order after placing it?", a: "অর্ডার কনফার্ম হওয়ার ৫ মিনিটের মধ্যে আপনি কাস্টমার সাপোর্টে কল করে অর্ডার বাতিল করতে পারবেন।" },
];

export default function FAQ() {
  return (
    <section className="py-24 bg-gray-50">
      <div className="max-w-4xl mx-auto px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Frequently Asked <span className="text-orange-600">Questions</span></h2>
          <p className="text-gray-600">আপনার মনে থাকা সাধারণ কিছু প্রশ্নের উত্তর এখানে দেওয়া হলো।</p>
        </div>

        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
          <Accordion variant="splitted" className="gap-4">
            {faqs.map((faq) => (
              <AccordionItem key={faq.id} aria-label={faq.q} title={<span className="font-bold text-gray-800">{faq.q}</span>} className="bg-white shadow-sm">
                <p className="text-gray-600 pb-2">{faq.a}</p>
              </AccordionItem>
            ))}
          </Accordion>
        </motion.div>
      </div>
    </section>
  );
}