"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
// Lucide এর বদলে React Icons ব্যবহার করা হয়েছে
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn, FaMapMarkerAlt, FaPhoneAlt, FaEnvelope } from "react-icons/fa";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-950 text-gray-300 pt-20 pb-10">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          
          {/* Brand Section */}
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <Link href="/" className="text-3xl font-black text-white mb-6 block">
              Carving<span className="text-green-500">Byte.</span>
            </Link>
            <p className="text-gray-400 mb-6 leading-relaxed">
              সেরা স্বাদের খাবার এবং দ্রুততম ডেলিভারি সার্ভিস। আজই অর্ডার করুন।
            </p>
            <div className="flex space-x-4">
              {[FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn].map((Icon, idx) => (
                <Link key={idx} href="#" className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center hover:bg-orange-500 hover:text-white transition-colors">
                  <Icon size={18} />
                </Link>
              ))}
            </div>
          </motion.div>

          {/* Quick Links */}
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }}>
            <h3 className="text-xl font-bold text-white mb-6">Quick Links</h3>
            <ul className="space-y-4">
              <li><Link href="/" className="hover:text-orange-500 transition-colors">Home</Link></li>
              <li><Link href="/menu" className="hover:text-orange-500 transition-colors">Menu</Link></li>
            </ul>
          </motion.div>

          {/* Contact Info */}
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.3 }}>
            <h3 className="text-xl font-bold text-white mb-6">Contact Us</h3>
            <ul className="space-y-4">
              <li className="flex items-start gap-3"><FaMapMarkerAlt size={20} className="text-orange-500 mt-1" /><span>Dhaka, Bangladesh</span></li>
              <li className="flex items-center gap-3"><FaPhoneAlt size={20} className="text-orange-500" /><span>+880 1234 567890</span></li>
              <li className="flex items-center gap-3"><FaEnvelope size={20} className="text-orange-500" /><span>support@foodi.com</span></li>
            </ul>
          </motion.div>

        </div>
        
        {/* Bottom Bar */}
        <div className="pt-8 border-t border-gray-800 text-center">
          <p className="text-gray-500 text-sm">&copy; {currentYear} Foodi. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}