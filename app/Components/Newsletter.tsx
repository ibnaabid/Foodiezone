"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Button, Input } from "@heroui/react";
import { Send, Mail, CheckCircle2 } from "lucide-react";

export default function Newsletter() {
  const [email, setEmail] = useState("");
  const [isSubscribed, setIsSubscribed] = useState(false);

  // সাবস্ক্রাইব বাটনে ক্লিক করলে কী হবে (এটি ডামি ফাংশন, আপনি চাইলে API অ্যাড করতে পারেন)
  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setIsSubscribed(true);
      // এখানে আপনি আপনার API বা ডাটাবেসে ইমেইল সেভ করার লজিক লিখতে পারেন।
      setTimeout(() => {
        setIsSubscribed(false);
        setEmail("");
      }, 3000); // ৩ সেকেন্ড পর আবার আগের অবস্থায় ফিরে যাবে
    }
  };

  return (
    <section className="py-24 bg-gray-50 relative overflow-hidden">
      {/* Decorative Background Elements */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-orange-200 rounded-full mix-blend-multiply filter blur-3xl opacity-50 animate-blob"></div>
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-yellow-200 rounded-full mix-blend-multiply filter blur-3xl opacity-50 animate-blob animation-delay-2000"></div>

      <div className="max-w-5xl mx-auto px-6 lg:px-8 relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 30 }} 
          whileInView={{ opacity: 1, y: 0 }} 
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="bg-white rounded-[2.5rem] p-10 md:p-16 text-center shadow-xl border border-gray-100"
        >
          <div className="flex justify-center mb-6">
            <div className="p-4 bg-orange-100 text-orange-600 rounded-2xl">
              <Mail size={40} />
            </div>
          </div>
          
          <h2 className="text-3xl md:text-5xl font-black text-gray-900 mb-4">
            Subscribe for <span className="text-orange-600">Special Offers!</span>
          </h2>
          <p className="text-gray-500 mb-10 max-w-2xl mx-auto text-lg">
            Foodi-এর নিউজলেটারে সাবস্ক্রাইব করুন এবং আপনার প্রথম অর্ডারে ২০% ছাড় পান। নতুন মেনু ও অফারের আপডেট পাবেন সবার আগে।
          </p>
          
          <form onSubmit={handleSubscribe} className="max-w-lg mx-auto">
            {isSubscribed ? (
              <motion.div 
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                className="flex items-center justify-center gap-3 bg-green-100 text-green-700 p-4 rounded-full font-bold"
              >
                <CheckCircle2 size={24} />
                <span>Thank you for subscribing!</span>
              </motion.div>
            ) : (
              <div className="flex flex-col sm:flex-row gap-3">
                <Input 
                  type="email" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email address..." 
                  size="lg"
                  isRequired
                  startContent={<Mail size={18} className="text-gray-400" />}
                  className="w-full" 
                  classNames={{ 
                    inputWrapper: "bg-gray-50 border border-gray-200 hover:border-orange-500 focus-within:border-orange-500 shadow-none",
                    input: "text-gray-900 placeholder:text-gray-400"
                  }}
                />
                <Button 
                  type="submit"
                  size="lg" 
                  className="bg-orange-600 text-white font-bold px-8 w-full sm:w-auto hover:bg-orange-700 shadow-md hover:shadow-lg transition-all"
                  endContent={<Send size={18} />}
                >
                  Subscribe
                </Button>
              </div>
            )}
            <p className="text-xs text-gray-400 mt-4">
              We respect your privacy. Unsubscribe at any time.
            </p>
          </form>
        </motion.div>
      </div>
    </section>
  );
}