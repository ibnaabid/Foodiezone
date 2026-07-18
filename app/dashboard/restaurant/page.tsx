import { headers } from "next/headers";
import { redirect } from "next/navigation";
import {
  DollarSign,
  ShoppingBag,
  Clock,
  Star,
  TrendingUp,
  ChevronRight,
  UtensilsCrossed,
  Settings,
} from "lucide-react";
import { auth } from "@/app/lib/auth";
import Link from "next/link";
import RestaurantRevenueChart from "./RestaurantRevenueChart/page";
// import RestaurantRevenueChart from "@/components/RestaurantRevenueChart";

export default async function RestaurantDashboard() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) redirect("/login");
  if ((session.user as { role?: string }).role !== "restaurant") {
    redirect("/login");
  }

  const restaurantName = session.user.name || "your restaurant";

  const stats = [
    { label: "Today's Revenue", value: "৳12,450", icon: DollarSign, color: "emerald" },
    { label: "Pending Orders", value: "6", icon: Clock, color: "emerald" },
    { label: "Total Orders", value: "142", icon: ShoppingBag, color: "emerald" },
    { label: "Avg Rating", value: "4.7", icon: Star, color: "emerald" },
  ];

  const pendingOrders = [
    { id: "ORD-2091", customer: "Rahim Uddin", items: "2x Chicken Biryani", total: "৳540", time: "2 min ago" },
    { id: "ORD-2089", customer: "Karim Ahmed", items: "1x Beef Burger, Fries", total: "৳380", time: "8 min ago" },
    { id: "ORD-2086", customer: "Fatima Islam", items: "3x Pizza Slice", total: "৳420", time: "15 min ago" },
  ];

  return (
    <div className="min-h-screen bg-neutral-950 relative overflow-hidden">
      <div className="absolute -top-40 -right-40 w-96 h-96 bg-emerald-600/10 rounded-full blur-3xl" />
      <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-emerald-900/10 rounded-full blur-3xl" />

      <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-2xl sm:text-3xl font-semibold text-white">
              {restaurantName}
            </h1>
            <p className="text-neutral-400 text-sm mt-1">
              Manage your orders and menu from here
            </p>
          </div>
          <Link
            href="/dashboard/restaurant/settings"
            className="hidden sm:flex items-center gap-2 px-4 py-2 rounded-lg bg-white/5 border border-white/10 text-sm text-neutral-300 hover:text-emerald-400 hover:border-emerald-500/20 transition-colors"
          >
            <Settings size={16} />
            Settings
          </Link>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {stats.map((stat) => {
            const Icon = stat.icon;
            return (
              <div
                key={stat.label}
                className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-2xl p-5 hover:border-emerald-500/20 transition-colors"
              >
                <div className="w-10 h-10 rounded-lg bg-emerald-500/10 flex items-center justify-center mb-3">
                  <Icon size={18} className="text-emerald-400" />
                </div>
                <p className="text-xl sm:text-2xl font-semibold text-white">{stat.value}</p>
                <p className="text-xs sm:text-sm text-neutral-400 mt-1">{stat.label}</p>
              </div>
            );
          })}
        </div>

        {/* Revenue chart — full width row */}
        <div className="mb-6">
          <RestaurantRevenueChart />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 backdrop-blur-xl bg-white/5 border border-white/10 rounded-2xl p-6">
            <div className="flex items-center justify-between mb-5">
              <h2 className="text-lg font-medium text-white">Pending Orders</h2>
              <a href="/dashboard/restaurant/orders" className="text-sm text-emerald-400 hover:underline flex items-center gap-1">
                View all <ChevronRight size={14} />
              </a>
            </div>

            <div className="space-y-3">
              {pendingOrders.map((order) => (
                <div
                  key={order.id}
                  className="flex items-center justify-between p-4 rounded-xl bg-white/5 border border-white/5 hover:border-emerald-500/10 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-emerald-500/10 flex items-center justify-center">
                      <ShoppingBag size={16} className="text-emerald-400" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-white">{order.customer}</p>
                      <p className="text-xs text-neutral-500">{order.items}</p>
                    </div>
                  </div>
                  <div className="text-right flex flex-col items-end gap-1">
                    <p className="text-sm font-medium text-white">{order.total}</p>
                    <button className="text-xs font-medium bg-emerald-600/20 text-emerald-400 px-2.5 py-1 rounded-md hover:bg-emerald-600/30 transition-colors">
                      Accept
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-6">
            <div className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-2xl p-6">
              <h2 className="text-lg font-medium text-white mb-4">Quick Actions</h2>
              <div className="space-y-2">
                <a href="/dashboard/restaurant/menu" className="flex items-center gap-3 p-3 rounded-lg hover:bg-emerald-950/30 transition-colors">
                  <UtensilsCrossed size={16} className="text-emerald-400" />
                  <span className="text-sm text-neutral-200">Manage menu</span>
                </a>
                <a href="/dashboard/restaurant/orders" className="flex items-center gap-3 p-3 rounded-lg hover:bg-emerald-950/30 transition-colors">
                  <ShoppingBag size={16} className="text-emerald-400" />
                  <span className="text-sm text-neutral-200">All orders</span>
                </a>
                <a href="/dashboard/restaurant/analytics" className="flex items-center gap-3 p-3 rounded-lg hover:bg-emerald-950/30 transition-colors">
                  <TrendingUp size={16} className="text-emerald-400" />
                  <span className="text-sm text-neutral-200">Analytics</span>
                </a>
              </div>
            </div>

            <div className="backdrop-blur-xl bg-gradient-to-br from-emerald-600/20 to-emerald-900/10 border border-emerald-500/20 rounded-2xl p-6">
              <TrendingUp size={20} className="text-emerald-400 mb-2" />
              <p className="text-sm text-white font-medium">This week's growth</p>
              <p className="text-2xl font-semibold text-white mt-1">+18%</p>
              <p className="text-xs text-neutral-400 mt-1">Compared to last week</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}