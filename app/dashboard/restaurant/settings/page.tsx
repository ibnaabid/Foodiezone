"use client";

import { useState } from "react";
import { User, Lock, Bell } from "lucide-react";

export default function SettingsPage() {
  return (
    <div className="p-8 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-8">Account Settings</h1>

      <div className="space-y-6">
        {/* Profile Section */}
        <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100">
          <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
            <User size={20} className="text-orange-500" /> Personal Information
          </h2>
          <div className="grid grid-cols-2 gap-6">
            <input type="text" placeholder="Full Name" className="p-3 border rounded-xl" />
            <input type="email" placeholder="Email Address" className="p-3 border rounded-xl" />
          </div>
          <button className="mt-6 bg-orange-600 text-white px-6 py-2 rounded-xl font-bold">Save Changes</button>
        </div>

        {/* Security Section */}
        <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100">
          <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
            <Lock size={20} className="text-orange-500" /> Security
          </h2>
          <div className="flex gap-4">
            <input type="password" placeholder="New Password" className="flex-1 p-3 border rounded-xl" />
            <button className="bg-gray-900 text-white px-6 py-2 rounded-xl font-bold">Update</button>
          </div>
        </div>

        {/* Notifications Section */}
        <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100 flex justify-between items-center">
          <h2 className="text-xl font-bold flex items-center gap-2">
            <Bell size={20} className="text-orange-500" /> Notifications
          </h2>
          <input type="checkbox" className="w-6 h-6 accent-orange-600" defaultChecked />
        </div>
      </div>
    </div>
  );
}