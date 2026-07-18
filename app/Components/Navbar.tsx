// components/Navbar.tsx
"use client";
import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  Menu,
  X,
  LogOut,
  LayoutDashboard,
  Home,
  UtensilsCrossed,
  Info,
  Phone,
} from "lucide-react";
import { authClient } from "../lib/auth-client";

type UserRole = "customer" | "restaurant" | "admin";

export default function Navbar() {
  const router = useRouter();
  const { data: session, isPending } = authClient.useSession();
  const [mobileOpen, setMobileOpen] = useState(false);

  const user = session?.user;
  const role = (user as { role?: UserRole })?.role || "customer";
  const userName = user?.name || "";
  const userInitial = userName ? userName.charAt(0).toUpperCase() : "U";

  // Role অনুসারে Dashboard Link
  const dashboardLink =
    role === "restaurant"
      ? "/dashboard/restaurant"
      : role === "admin"
      ? "/dashboard/admin"
      : "/dashboard/customer";

  const handleLogout = async () => {
    await authClient.signOut();
    router.push("/login");
    router.refresh(); // session refresh
  };

  const navLinks = [
    { label: "Home", href: "/", icon: Home },
    { label: "Menu", href: "/menu", icon: UtensilsCrossed },
    { label: "About", href: "/about", icon: Info },
    { label: "Contact", href: "/contact", icon: Phone },
  ];

  return (
    <nav className="sticky top-0 z-50 backdrop-blur-xl bg-neutral-950/80 border-b border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 shrink-0">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-emerald-500 to-amber-500 flex items-center justify-center">
              <UtensilsCrossed size={16} className="text-neutral-950" />
            </div>
            <span className="text-white font-semibold text-lg tracking-tight">
              CravingByte
            </span>
          </Link>

          {/* Desktop Nav Links */}
          <div className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="px-4 py-2 rounded-lg text-sm text-neutral-300 hover:text-white hover:bg-white/5 transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Right Side - Desktop */}
          <div className="hidden md:flex items-center gap-3">
            {isPending ? (
              <div className="w-28 h-9 rounded-lg bg-white/5 animate-pulse" />
            ) : user ? (
              <div className="flex items-center gap-3">
                {/* User Info */}
                <div className="flex items-center gap-2 pl-2 pr-4 py-1.5 rounded-lg bg-white/5 border border-white/10">
                  <div className="w-7 h-7 rounded-full bg-gradient-to-br from-emerald-500 to-amber-500 flex items-center justify-center text-xs font-semibold text-neutral-950">
                    {userInitial}
                  </div>
                  <span className="text-sm text-neutral-200 truncate max-w-[140px]">
                    {userName}
                  </span>
                </div>

                {/* Dashboard Button */}
                <Link
                  href={dashboardLink}
                  className="flex items-center gap-2 px-5 py-2 rounded-lg text-sm font-medium bg-emerald-600 hover:bg-emerald-500 text-white transition-all"
                >
                  <LayoutDashboard size={16} />
                  Dashboard
                </Link>

                {/* Logout */}
                <button
                  onClick={handleLogout}
                  className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm text-neutral-300 hover:text-red-400 hover:bg-red-500/10 transition-colors"
                >
                  <LogOut size={16} />
                  Logout
                </button>
              </div>
            ) : (
              <div className="flex items-center gap-3">
                <Link
                  href="/login"
                  className="px-5 py-2 rounded-lg text-sm text-neutral-300 hover:text-white hover:bg-white/5 transition-colors"
                >
                  Log in
                </Link>
                <Link
                  href="/register"
                  className="px-5 py-2 rounded-lg text-sm font-medium bg-gradient-to-r from-amber-500 to-amber-400 text-neutral-950 hover:from-amber-400 hover:to-amber-300 transition-all"
                >
                  Register
                </Link>
              </div>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="md:hidden text-neutral-300 hover:text-white p-2"
          >
            {mobileOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div className="md:hidden border-t border-white/10 bg-neutral-950/95 backdrop-blur-xl px-4 py-4 space-y-1">
          {user && (
            <div className="flex items-center gap-3 px-4 py-3 mb-3 bg-white/5 border border-white/10 rounded-xl">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-emerald-500 to-amber-500 flex items-center justify-center text-lg font-semibold text-neutral-950">
                {userInitial}
              </div>
              <div>
                <p className="font-medium text-white">{userName}</p>
                <p className="text-xs text-neutral-500 capitalize">{role}</p>
              </div>
            </div>
          )}

          {navLinks.map((link) => {
            const Icon = link.icon;
            return (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className="flex items-center gap-3 px-4 py-3 rounded-lg text-sm text-neutral-300 hover:bg-white/5 hover:text-white transition-colors"
              >
                <Icon size={20} />
                {link.label}
              </Link>
            );
          })}

          {user ? (
            <>
              <Link
                href={dashboardLink}
                onClick={() => setMobileOpen(false)}
                className="flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium bg-emerald-600/20 text-emerald-400 mt-2"
              >
                <LayoutDashboard size={20} />
                Go to Dashboard
              </Link>

              <button
                onClick={() => {
                  setMobileOpen(false);
                  handleLogout();
                }}
                className="flex items-center gap-3 px-4 py-3 rounded-lg text-sm text-red-400 hover:bg-red-500/10 w-full text-left"
              >
                <LogOut size={20} />
                Logout
              </button>
            </>
          ) : (
            <div className="flex flex-col gap-2 pt-4">
              <Link
                href="/login"
                onClick={() => setMobileOpen(false)}
                className="text-center py-3 rounded-lg border border-white/10 text-neutral-300"
              >
                Log in
              </Link>
              <Link
                href="/register"
                onClick={() => setMobileOpen(false)}
                className="text-center py-3 rounded-lg bg-amber-500 text-neutral-950 font-medium"
              >
                Register
              </Link>
            </div>
          )}
        </div>
      )}
    </nav>
  );
}