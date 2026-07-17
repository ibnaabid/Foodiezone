"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { 
  Home, 
  UtensilsCrossed, 
  ShoppingBag, 
  Users, 
  BarChart3, 
  Settings, 
  LogOut 
} from "lucide-react";

const colors = {
  primary: "#0F766E",     // Deep Teal
  accent: "#14B8A6",      // Bright Teal
  light: "#F0F9F6",
  dark: "#134E4A",
};

export default function OwnerDashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  const sidebarItems = [
    { name: "Dashboard", href: "/dashboard/owner", icon: Home },
    { name: "My Restaurant", href: "/dashboard/owner/restaurant", icon: UtensilsCrossed },
    { name: "All Orders", href: "/dashboard/owner/orders", icon: ShoppingBag },
    { name: "Menu Items", href: "/dashboard/owner/menu", icon: UtensilsCrossed },
    { name: "Customers", href: "/dashboard/owner/customers", icon: Users },
    { name: "Analytics", href: "/dashboard/owner/analytics", icon: BarChart3 },
    { name: "Settings", href: "/dashboard/owner/settings", icon: Settings },
  ];

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Sidebar */}
      <div className="w-72 bg-white border-r shadow-sm hidden lg:flex flex-col">
        <div className="p-6 border-b" style={{ borderColor: colors.light }}>
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 bg-gradient-to-br from-teal-600 to-cyan-500 rounded-2xl flex items-center justify-center text-3xl">
              🍔
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Foodie Zone</h1>
              <p className="text-xs text-teal-600 font-medium">Owner Panel</p>
            </div>
          </div>
        </div>

        <nav className="flex-1 p-6 space-y-1">
          {sidebarItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-3 px-4 py-3 rounded-2xl transition-all ${
                  isActive 
                    ? "bg-teal-50 text-teal-700 font-medium" 
                    : "hover:bg-gray-100 text-gray-700"
                }`}
              >
                <item.icon size={20} />
                <span>{item.name}</span>
              </Link>
            );
          })}
        </nav>

        <div className="p-6 border-t mt-auto">
          <button className="flex items-center gap-3 w-full px-4 py-3 text-red-600 hover:bg-red-50 rounded-2xl transition">
            <LogOut size={20} />
            <span>Logout</span>
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-h-screen overflow-hidden">
        <header className="bg-white border-b px-6 lg:px-8 py-5 flex items-center justify-between sticky top-0 z-10">
          <h2 className="text-2xl font-semibold text-gray-900">Restaurant Owner Dashboard</h2>
          
          <div className="flex items-center gap-4">
            <div className="text-right">
              <p className="font-medium">Rahim Restaurant</p>
              <p className="text-xs text-gray-500">Dhaka, Bangladesh</p>
            </div>
            <div className="w-10 h-10 bg-teal-600 text-white rounded-full flex items-center justify-center font-bold">
              RK
            </div>
          </div>
        </header>

        <main className="flex-1 p-6 lg:p-10 overflow-auto">
          {children}
        </main>
      </div>
    </div>
  );
}