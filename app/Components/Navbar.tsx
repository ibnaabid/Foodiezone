"use client";

import { useState } from "react";
import Link from "next/link";
import { ShoppingCart, Menu, X, User, LogOut, Phone } from "lucide-react";
import { useRouter } from "next/navigation";

const colors = {
  primary: "#D97706",      // Golden Yellow
  dark: "#451A03",
  light: "#FEF3C7",
  accent: "#F59E0B",
};

export function PremiumNavbar() {
  const router = useRouter();
  const [menuOpen, setMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false); // পরে real auth দিয়ে replace করো
  const [userRole, setUserRole] = useState<"customer" | "owner">("customer");
  const [userName, setUserName] = useState("Rahim Khan");

  const toggleLogin = () => {
    setIsLoggedIn(!isLoggedIn);
    if (!isLoggedIn) {
      setUserRole(Math.random() > 0.5 ? "customer" : "owner");
    }
  };

  return (
    <nav className="sticky top-0 z-50 border-b" style={{ backgroundColor: colors.dark, borderColor: "rgba(245, 158, 11, 0.2)" }}>
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3">
            <div className="w-11 h-11 bg-gradient-to-br from-amber-400 to-orange-500 rounded-2xl flex items-center justify-center text-4xl shadow-lg">
              🍔
            </div>
            <div>
              <span className="text-3xl font-bold tracking-tighter text-amber-100">Foodie</span>
              <span className="text-3xl font-bold tracking-tighter text-orange-400">Zone</span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8 text-sm font-medium text-amber-100">
            <Link href="/" className="hover:text-orange-400 transition">Home</Link>
            <Link href="/restaurants" className="hover:text-orange-400 transition">Restaurants</Link>
            <Link href="/menu" className="hover:text-orange-400 transition">Menu</Link>

            {isLoggedIn && (
              <>
                {userRole === "customer" ? (
                  <>
                    <Link href="/dashboard/customer" className="hover:text-orange-400 transition">Dashboard</Link>
                    <Link href="/my-orders" className="hover:text-orange-400 transition">My Orders</Link>
                  </>
                ) : (
                  <>
                    <Link href="/dashboard/owner" className="hover:text-orange-400 transition">Owner Dashboard</Link>
                    <Link href="/my-restaurant" className="hover:text-orange-400 transition">My Restaurant</Link>
                  </>
                )}
              </>
            )}

            <Link href="/deals" className="hover:text-orange-400 transition">Deals</Link>
            <Link href="/track" className="hover:text-orange-400 transition">Track Order</Link>
          </div>

          {/* Right Side */}
          <div className="hidden md:flex items-center gap-5">
            <a href="tel:+8801XXXXXXXXX" className="flex items-center gap-2 text-amber-100 hover:text-orange-400 transition">
              <Phone size={18} />
            </a>

            <button className="relative p-3 text-amber-100 hover:text-orange-400 transition">
              <ShoppingCart size={24} />
              <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
                3
              </span>
            </button>

            {isLoggedIn ? (
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 bg-amber-500 text-white rounded-full flex items-center justify-center font-bold">
                    {userName.split(" ").map(n => n[0]).join("")}
                  </div>
                  <div className="text-sm text-amber-100">
                    <p>{userName}</p>
                    <p className="text-xs text-amber-400 capitalize">{userRole}</p>
                  </div>
                </div>

                <button onClick={toggleLogin} className="text-red-400 hover:text-red-500 transition">
                  <LogOut size={22} />
                </button>
              </div>
            ) : (
              <div className="flex items-center gap-3">
                <Link
                  href="/login"
                  className="px-6 py-2.5 text-sm font-semibold border border-amber-400 text-amber-100 rounded-2xl hover:bg-white/10 transition"
                >
                  Login
                </Link>
                <Link
                  href="/register"
                  className="px-6 py-2.5 text-sm font-semibold bg-orange-500 text-white rounded-2xl hover:bg-orange-600 transition"
                >
                  Sign Up
                </Link>
              </div>
            )}
          </div>

          {/* Mobile Toggle */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="md:hidden text-amber-100 p-2"
          >
            {menuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden bg-[#2C1A0F] border-t border-amber-900">
          <div className="px-6 py-8 flex flex-col gap-6 text-lg">
            <Link href="/" onClick={() => setMenuOpen(false)}>Home</Link>
            <Link href="/restaurants" onClick={() => setMenuOpen(false)}>Restaurants</Link>
            <Link href="/menu" onClick={() => setMenuOpen(false)}>Menu</Link>
            <Link href="/deals" onClick={() => setMenuOpen(false)}>Deals</Link>
            <Link href="/track" onClick={() => setMenuOpen(false)}>Track Order</Link>

            {isLoggedIn && (
              <>
                {userRole === "customer" ? (
                  <>
                    <Link href="/dashboard/customer" onClick={() => setMenuOpen(false)}>Dashboard</Link>
                    <Link href="/my-orders" onClick={() => setMenuOpen(false)}>My Orders</Link>
                  </>
                ) : (
                  <>
                    <Link href="/dashboard/owner" onClick={() => setMenuOpen(false)}>Owner Dashboard</Link>
                  </>
                )}
              </>
            )}

            <div className="pt-6 border-t border-amber-900">
              {isLoggedIn ? (
                <button
                  onClick={toggleLogin}
                  className="w-full py-4 bg-red-900/50 text-red-400 rounded-2xl font-medium"
                >
                  Logout
                </button>
              ) : (
                <div className="flex flex-col gap-4">
                  <Link href="/login" className="py-4 text-center border border-amber-400 rounded-2xl" onClick={() => setMenuOpen(false)}>
                    Login
                  </Link>
                  <Link href="/register" className="py-4 text-center bg-orange-500 text-white rounded-2xl" onClick={() => setMenuOpen(false)}>
                    Sign Up
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}