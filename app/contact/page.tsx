"use client";

import React, { useState } from "react";
import { Mail, Phone, MapPin, Send, MessageSquare } from "lucide-react";

export default function ContactPage() {
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });

  return (
    <div className="min-h-screen bg-neutral-950 text-white py-20 px-6">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-5xl font-black mb-16 text-center">Get in <span className="text-emerald-500">Touch</span></h1>
        
        <div className="grid lg:grid-cols-3 gap-10">
          {/* Contact Info Cards */}
          <div className="lg:col-span-1 space-y-6">
            <div className="p-6 bg-neutral-900 border border-white/10 rounded-2xl">
              <MapPin className="text-emerald-500 mb-4" size={30} />
              <h3 className="font-bold">Location</h3>
              <p className="text-neutral-400 text-sm">Dinajpur, Rangpur, Bangladesh</p>
            </div>
            <div className="p-6 bg-neutral-900 border border-white/10 rounded-2xl">
              <Phone className="text-emerald-500 mb-4" size={30} />
              <h3 className="font-bold">Call Us</h3>
              <p className="text-neutral-400 text-sm">+880 1814055729</p>
            </div>
            <div className="p-6 bg-neutral-900 border border-white/10 rounded-2xl">
              <Mail className="text-emerald-500 mb-4" size={30} />
              <h3 className="font-bold">Email</h3>
              <p className="text-neutral-400 text-sm">abid2@foodi.com</p>
            </div>
          </div>

          {/* Contact Form */}
          <div className="lg:col-span-2 bg-neutral-900 p-10 rounded-2xl border border-white/10">
            <h2 className="text-2xl font-bold mb-8 flex items-center gap-3">
              <MessageSquare className="text-emerald-500" /> Send a Message
            </h2>
            <form className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <input className="w-full p-4 bg-neutral-950 border border-white/10 rounded-xl focus:border-emerald-500 outline-none transition" placeholder="Your Name" />
                <input className="w-full p-4 bg-neutral-950 border border-white/10 rounded-xl focus:border-emerald-500 outline-none transition" placeholder="Email Address" />
              </div>
              <textarea className="w-full p-4 bg-neutral-950 border border-white/10 rounded-xl focus:border-emerald-500 outline-none h-40 transition" placeholder="How can we help you?"></textarea>
              <button className="w-full py-4 bg-emerald-600 hover:bg-emerald-700 font-bold rounded-xl flex items-center justify-center gap-2 transition-all">
                Send Message <Send size={18} />
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}