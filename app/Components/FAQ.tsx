"use client";

import { useState } from "react";
import { ChevronDown, HelpCircle } from "lucide-react";

const faqs = [
  {
    question: "How do I place an order?",
    answer:
      "Browse the menu, choose your favorite food, add it to the cart, and complete checkout.",
  },
  {
    question: "How long does delivery take?",
    answer:
      "Most orders are delivered within 30 to 45 minutes depending on your location.",
  },
  {
    question: "Can I cancel my order?",
    answer:
      "Yes. You can cancel your order before the restaurant starts preparing it.",
  },
  {
    question: "Which payment methods are available?",
    answer:
      "We accept Cash on Delivery, Cards, bKash, Nagad, and Rocket.",
  },
  {
    question: "How can I contact support?",
    answer:
      "Open the Help Center or use the live chat inside the application.",
  },
];

export default function FAQSection() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section className="bg-neutral-950 py-20 px-5">
      <div className="max-w-4xl mx-auto">
        {/* Heading */}
        <div className="text-center mb-12">
          <div className="flex justify-center mb-4">
            <div className="bg-emerald-600 p-4 rounded-full">
              <HelpCircle className="text-white" size={30} />
            </div>
          </div>

          <h2 className="text-4xl font-bold text-white">
            Frequently Asked Questions
          </h2>

          <p className="text-gray-400 mt-4">
            Find answers to the most common questions about CravingByte.
          </p>
        </div>

        {/* FAQ */}
        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="bg-neutral-900 border border-neutral-800 rounded-xl overflow-hidden"
            >
              <button
                onClick={() =>
                  setOpen(open === index ? null : index)
                }
                className="w-full flex justify-between items-center p-5 text-left"
              >
                <span className="text-white font-semibold">
                  {faq.question}
                </span>

                <ChevronDown
                  size={22}
                  className={`text-emerald-500 transition-transform ${
                    open === index ? "rotate-180" : ""
                  }`}
                />
              </button>

              {open === index && (
                <div className="px-5 pb-5 text-gray-400">
                  {faq.answer}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}