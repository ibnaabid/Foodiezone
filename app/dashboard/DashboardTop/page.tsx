// components/DashboardTopbar.tsx
"use client";
import { useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Menu, X, LogOut, Bell } from "lucide-react";
import { authClient } from "@/app/lib/auth-client";
// import { authClient } from "../lib/auth-client";

interface TopbarProps {
  userName: string;
  role: "customer" | "restaurant";
}

const menuByRole = {
  customer: [
    { label: "Overview", href: "/dashboard/customer" },
 
    { label: "Favorites", href: "/favorites" },
    { label: "Addresses", href: "/addresses" },
    { label: "Update Profile", href: "/profile" },
  ],
  restaurant: [
    { label: "Overview", href: "/dashboard/restaurant" },
    { label: "Orders", href: "/dashboard/restaurant/orders" },
    { label: "Menu", href: "/dashboard/restaurant/menu" },
    { label: "Analytics", href: "/dashboard/restaurant/analytics" },
    { label: "Settings", href: "/dashboard/restaurant/settings" },
  ],
};

export default function DashboardTopbar({ userName, role }: TopbarProps) {
  const router = useRouter();
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);

  const userInitial = userName ? userName.charAt(0).toUpperCase() : "U";
  const links = menuByRole[role];

  const handleLogout = async () => {
    await authClient.signOut();
    router.push("/login");
    router.refresh();
  };

  return (
    <header className="sticky top-0 z-40 h-16 border-b border-white/10 bg-neutral-950/80 backdrop-blur-xl flex items-center justify-between px-4 sm:px-6">
      <button
        onClick={() => setMobileOpen((prev) => !prev)}
        className="md:hidden text-neutral-300 hover:text-white"
      >
        {mobileOpen ? <X size={22} /> : <Menu size={22} />}
      </button>

      <div className="hidden md:block text-sm text-neutral-500 capitalize">
        {role === "restaurant" ? "Restaurant dashboard" : "Customer dashboard"}
      </div>

      <div className="flex items-center gap-3">
        <button className="relative p-2 rounded-lg text-neutral-400 hover:text-white hover:bg-white/5 transition-colors">
          <Bell size={18} />
          <span className="absolute top-1.5 right-1.5 w-1.5 h-1.5 rounded-full bg-amber-400" />
        </button>

        <div className="flex items-center gap-2 pl-2 pr-1 py-1 rounded-lg">
          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-emerald-500 to-amber-500 flex items-center justify-center text-xs font-semibold text-neutral-950 shrink-0">
            {userInitial}
          </div>
          <span className="hidden sm:block text-sm text-neutral-200 max-w-[100px] truncate">
            {userName}
          </span>
        </div>

        <button
          onClick={handleLogout}
          className="hidden sm:flex items-center gap-2 px-3 py-2 rounded-lg text-sm text-neutral-400 hover:text-red-400 hover:bg-red-500/10 transition-colors"
        >
          <LogOut size={16} />
        </button>
      </div>

      {mobileOpen && (
        <div className="md:hidden absolute top-16 left-0 right-0 bg-neutral-950/95 backdrop-blur-xl border-b border-white/10 px-4 py-4 space-y-1 z-50">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setMobileOpen(false)}
              className={`block px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                pathname === link.href
                  ? "bg-emerald-500/10 text-emerald-400"
                  : "text-neutral-300 hover:bg-white/5"
              }`}
            >
              {link.label}
            </Link>
          ))}
          <button
            onClick={() => {
              setMobileOpen(false);
              handleLogout();
            }}
            className="flex items-center gap-2 w-full px-3 py-2.5 rounded-lg text-sm text-red-400 hover:bg-red-500/10 transition-colors"
          >
            <LogOut size={16} />
            Logout
          </button>
        </div>
      )}
    </header>
  );
}