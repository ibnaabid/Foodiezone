"use client";

import { useState } from "react";
import { MapPin, Plus, Trash2, Edit2 } from "lucide-react";

export default function AddressPage() {
  const [addresses, setAddresses] = useState([
    { id: 1, label: "Home", address: "123/A, Green Road, Dinajpur", active: true },
    { id: 2, label: "Office", address: "45/B, Tech Park, Rangpur", active: false },
  ]);

  return (
    <div className="min-h-screen bg-emerald-50 p-6 md:p-10">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold text-emerald-900 mb-8">My Addresses</h1>

        {/* Address List */}
        <div className="space-y-4">
          {addresses.map((addr) => (
            <div 
              key={addr.id} 
              className={`p-6 rounded-3xl border-2 transition-all ${addr.active ? "bg-white border-emerald-500 shadow-lg" : "bg-white/50 border-transparent"}`}
            >
              <div className="flex justify-between items-start">
                <div className="flex gap-4">
                  <div className="p-3 bg-emerald-100 text-emerald-600 rounded-xl h-fit">
                    <MapPin size={24} />
                  </div>
                  <div>
                    <h3 className="font-bold text-lg text-emerald-900">{addr.label}</h3>
                    <p className="text-emerald-700">{addr.address}</p>
                  </div>
                </div>
                <div className="flex gap-2">
                  <button className="p-2 hover:bg-emerald-50 rounded-lg text-emerald-600"><Edit2 size={18} /></button>
                  <button className="p-2 hover:bg-red-50 rounded-lg text-red-500"><Trash2 size={18} /></button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Add New Address Button */}
        <button className="w-full mt-8 py-4 border-2 border-dashed border-emerald-300 rounded-3xl text-emerald-700 font-bold flex items-center justify-center gap-2 hover:bg-emerald-100 transition">
          <Plus size={20} /> Add New Address
        </button>
      </div>
    </div>
  );
}