"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Heart,
  MapPin,
  UtensilsCrossed,
  TrendingUp,
  Settings,
  ClipboardList,
  Star,
} from "lucide-react";

interface SidebarProps {
  role?: "customer" | "restaurant";
}

const menuByRole = {
  customer: [
    { label: "Overview", href: "/dashboard/customer", icon: LayoutDashboard },
    { label: "Reviews", href: "/dashboard/customer/reviews", icon: Star },
    { label: "Favorites", href: "/dashboard/customer/favorites", icon: Heart },
    { label: "Addresses", href: "/dashboard/customer/addresses", icon: MapPin },
  ],
  restaurant: [
    { label: "Overview", href: "/dashboard/restaurant", icon: LayoutDashboard },
    { label: "Manage Menu", href: "/dashboard/restaurant/Manage-Menu", icon: ClipboardList },
    { label: "Add Menu", href: "/dashboard/restaurant/Add-menu", icon: UtensilsCrossed },
    { label: "Privacy", href: "/dashboard/restaurant/privacy", icon: TrendingUp },
    { label: "Settings", href: "/dashboard/restaurant/settings", icon: Settings },
  ],
};

export default function DashboardSidebar({ role }: SidebarProps) {
  const pathname = usePathname();
  
  // সেফটি চেক: role যদি না থাকে বা ভুল হয়, তবে খালি অ্যারে ব্যবহার করবে
  const links = (role && menuByRole[role]) ? menuByRole[role] : [];
  
  // কালার স্কিম নির্ধারণ
  const accent = role === "restaurant" ? "amber" : "emerald";

  return (
    <aside className="hidden md:flex flex-col w-64 shrink-0 h-screen sticky top-0 border-r border-white/10 bg-neutral-950/60 backdrop-blur-xl">
      {/* Logo Section */}
      <Link href="/" className="flex items-center gap-2 px-6 h-16 border-b border-white/10 shrink-0">
        <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-emerald-500 to-amber-500 flex items-center justify-center">
          <UtensilsCrossed size={16} className="text-neutral-950" />
        </div>
        <span className="text-white font-semibold tracking-tight">CravingByte</span>
      </Link>

      {/* Role Badge */}
      <div className="px-6 pt-5 pb-2">
        <span
          className={`inline-flex items-center px-2.5 py-1 rounded-md text-xs font-medium capitalize border ${
            accent === "amber"
              ? "bg-amber-500/10 text-amber-400 border-amber-500/20"
              : "bg-emerald-500/10 text-emerald-400 border-emerald-500/20"
          }`}
        >
          {role === "restaurant" ? "Restaurant Owner" : role === "customer" ? "Customer" : "Loading..."}
        </span>
      </div>

      {/* Navigation Links */}
      <nav className="flex-1 px-4 py-3 space-y-1 overflow-y-auto">
        {links.length > 0 ? (
          links.map((link) => {
            const Icon = link.icon;
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                  isActive
                    ? accent === "amber"
                      ? "bg-amber-500/10 text-amber-400"
                      : "bg-emerald-500/10 text-emerald-400"
                    : "text-neutral-400 hover:text-white hover:bg-white/5"
                }`}
              >
                <Icon size={17} />
                {link.label}
              </Link>
            );
          })
        ) : (
          <div className="px-3 py-2 text-sm text-neutral-500">Loading links...</div>
        )}
      </nav>

      {/* Footer Support */}
      <div className="p-4 shrink-0">
        <div className="rounded-xl bg-gradient-to-br from-emerald-600/15 to-amber-600/10 border border-white/10 p-4">
          <p className="text-xs text-neutral-300 font-medium mb-1">Need help?</p>
          <p className="text-xs text-neutral-500 mb-3">We&apos;re here 24/7 to support you.</p>
          <Link href="/contact" className="text-xs font-medium text-emerald-400 hover:underline">
            Contact support →
          </Link>
        </div>
      </div>
    </aside>
  );
}