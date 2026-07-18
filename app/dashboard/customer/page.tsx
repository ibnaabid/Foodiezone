
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import {
  ShoppingBag,
  Clock,
  Heart,
  MapPin,
  Star,
  ChevronRight,
  Package,
} from "lucide-react";
import { auth } from "@/app/lib/auth";

export default async function CustomerDashboard() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) redirect("/login");
  if ((session.user as { role?: string }).role !== "customer") {
    redirect("/login");
  }

  const userName = session.user.name || "there";

  // Placeholder data — replace with real DB queries
  const stats = [
    { label: "Active Orders", value: "2", icon: Package, color: "emerald" },
    { label: "Total Orders", value: "18", icon: ShoppingBag, color: "amber" },
    { label: "Favorites", value: "5", icon: Heart, color: "rose" },
  ];

  const recentOrders = [
    { id: "ORD-1042", restaurant: "Spice Garden", status: "On the way", total: "৳450", time: "12 min ago" },
    { id: "ORD-1038", restaurant: "Burger Hub", status: "Delivered", total: "৳320", time: "Yesterday" },
    { id: "ORD-1031", restaurant: "Curry House", status: "Delivered", total: "৳580", time: "3 days ago" },
  ];

  return (
    <div className="min-h-screen bg-neutral-950 relative overflow-hidden">
      <div className="absolute -top-40 -right-40 w-96 h-96 bg-emerald-600/10 rounded-full blur-3xl" />
      <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-amber-600/10 rounded-full blur-3xl" />

      <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-2xl sm:text-3xl font-semibold text-white">
            Welcome back, {userName.split(" ")[0]} 👋
          </h1>
          <p className="text-neutral-400 text-sm mt-1">
            Here&apos;s what&apos;s happening with your orders
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
          {stats.map((stat) => {
            const Icon = stat.icon;
            return (
              <div
                key={stat.label}
                className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-2xl p-5 hover:border-white/20 transition-colors"
              >
                <div className="flex items-center justify-between mb-3">
                  <div className={`w-10 h-10 rounded-lg bg-${stat.color}-500/10 flex items-center justify-center`}>
                    <Icon size={18} className={`text-${stat.color}-400`} />
                  </div>
                </div>
                <p className="text-2xl font-semibold text-white">{stat.value}</p>
                <p className="text-sm text-neutral-400 mt-1">{stat.label}</p>
              </div>
            );
          })}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Recent orders */}
          <div className="lg:col-span-2 backdrop-blur-xl bg-white/5 border border-white/10 rounded-2xl p-6">
            <div className="flex items-center justify-between mb-5">
              <h2 className="text-lg font-medium text-white">Recent Orders</h2>
              <a href="/orders" className="text-sm text-emerald-400 hover:underline flex items-center gap-1">
                View all <ChevronRight size={14} />
              </a>
            </div>

            <div className="space-y-3">
              {recentOrders.map((order) => (
                <div
                  key={order.id}
                  className="flex items-center justify-between p-4 rounded-xl bg-white/5 border border-white/5 hover:border-white/10 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-emerald-500/20 to-amber-500/20 flex items-center justify-center">
                      <ShoppingBag size={16} className="text-emerald-400" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-white">{order.restaurant}</p>
                      <p className="text-xs text-neutral-500">{order.id} · {order.time}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-medium text-white">{order.total}</p>
                    <span
                      className={`text-xs ${
                        order.status === "On the way"
                          ? "text-amber-400"
                          : "text-emerald-400"
                      }`}
                    >
                      {order.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            <div className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-2xl p-6">
              <h2 className="text-lg font-medium text-white mb-4">Quick Actions</h2>
              <div className="space-y-2">
                <a href="/menu" className="flex items-center gap-3 p-3 rounded-lg hover:bg-white/5 transition-colors">
                  <ShoppingBag size={16} className="text-emerald-400" />
                  <span className="text-sm text-neutral-200">Order food</span>
                </a>
                <a href="/orders" className="flex items-center gap-3 p-3 rounded-lg hover:bg-white/5 transition-colors">
                  <Clock size={16} className="text-amber-400" />
                  <span className="text-sm text-neutral-200">Track order</span>
                </a>
                <a href="/favorites" className="flex items-center gap-3 p-3 rounded-lg hover:bg-white/5 transition-colors">
                  <Heart size={16} className="text-rose-400" />
                  <span className="text-sm text-neutral-200">Favorite restaurants</span>
                </a>
                <a href="/addresses" className="flex items-center gap-3 p-3 rounded-lg hover:bg-white/5 transition-colors">
                  <MapPin size={16} className="text-blue-400" />
                  <span className="text-sm text-neutral-200">Delivery addresses</span>
                </a>
              </div>
            </div>

            <div className="backdrop-blur-xl bg-gradient-to-br from-emerald-600/20 to-amber-600/10 border border-emerald-500/20 rounded-2xl p-6">
              <Star size={20} className="text-amber-400 mb-2" />
              <p className="text-sm text-white font-medium">Rate your last order</p>
              <p className="text-xs text-neutral-400 mt-1">Help others discover great food</p>
              <button className="mt-3 text-xs font-medium bg-white/10 hover:bg-white/15 text-white px-3 py-2 rounded-lg transition-colors">
                Leave a review
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}