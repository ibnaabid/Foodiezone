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
  ShoppingBag,
  Info,
  Phone,
} from "lucide-react";
import { authClient } from "../lib/auth-client";

type UserRole = "customer" | "restaurant" | "admin";

export default function Navbar() {
  const router = useRouter();
  const { data: session, isPending } = authClient.useSession();
  const [mobileOpen, setMobileOpen] = useState(false);

  const role = (session?.user as { role?: UserRole } | undefined)?.role;
  const userName = session?.user?.name || "";
  const userInitial = userName ? userName.charAt(0).toUpperCase() : "U";

  const dashboardLink =
    role === "restaurant"
      ? "/dashboard/restaurant"
      : role === "admin"
      ? "/dashboard/admin"
      : "/dashboard/customer";

  const handleLogout = async () => {
    await authClient.signOut();
    router.push("/login");
    router.refresh();
  };

  const navLinks = [
    { label: "Home", href: "/", icon: Home },
    { label: "Menu", href: "/menu", icon: UtensilsCrossed },
    { label: "Orders", href: "/orders", icon: ShoppingBag },
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

          {/* Desktop nav links */}
          <div className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="px-3 py-2 rounded-lg text-sm text-neutral-300 hover:text-white hover:bg-white/5 transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Right side */}
          <div className="hidden md:flex items-center gap-3">
            {isPending ? (
              <div className="w-24 h-9 rounded-lg bg-white/5 animate-pulse" />
            ) : session?.user ? (
              <>
                {/* User name + avatar */}
                <div className="flex items-center gap-2 pl-1 pr-3 py-1.5 rounded-lg bg-white/5 border border-white/10">
                  <div className="w-7 h-7 rounded-full bg-gradient-to-br from-emerald-500 to-amber-500 flex items-center justify-center text-xs font-semibold text-neutral-950">
                    {userInitial}
                  </div>
                  <span className="text-sm text-neutral-200 max-w-[120px] truncate">
                    {userName}
                  </span>
                </div>

                <Link
                  href={dashboardLink}
                  className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium bg-gradient-to-r from-emerald-600 to-emerald-500 text-white hover:from-emerald-500 hover:to-emerald-400 transition-all shadow-lg shadow-emerald-900/30"
                >
                  <LayoutDashboard size={16} />
                  Dashboard
                </Link>
                <button
                  onClick={handleLogout}
                  className="flex items-center gap-2 px-3 py-2 rounded-lg text-sm text-neutral-300 hover:text-red-400 hover:bg-red-500/10 transition-colors"
                >
                  <LogOut size={16} />
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link
                  href="/login"
                  className="px-4 py-2 rounded-lg text-sm text-neutral-300 hover:text-white transition-colors"
                >
                  Log in
                </Link>
                <Link
                  href="/register"
                  className="px-4 py-2 rounded-lg text-sm font-medium bg-gradient-to-r from-amber-500 to-amber-400 text-neutral-950 hover:from-amber-400 hover:to-amber-300 transition-all shadow-lg shadow-amber-900/20"
                >
                  Register
                </Link>
              </>
            )}
          </div>

          {/* Mobile toggle */}
          <button
            onClick={() => setMobileOpen((prev) => !prev)}
            className="md:hidden text-neutral-300 hover:text-white"
          >
            {mobileOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="md:hidden border-t border-white/10 bg-neutral-950/95 backdrop-blur-xl px-4 py-4 space-y-1">
          {session?.user && (
            <div className="flex items-center gap-3 px-3 py-2.5 mb-2 rounded-lg bg-white/5 border border-white/10">
              <div className="w-9 h-9 rounded-full bg-gradient-to-br from-emerald-500 to-amber-500 flex items-center justify-center text-sm font-semibold text-neutral-950 shrink-0">
                {userInitial}
              </div>
              <div className="min-w-0">
                <p className="text-sm text-white font-medium truncate">{userName}</p>
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
                className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-neutral-300 hover:text-white hover:bg-white/5 transition-colors"
              >
                <Icon size={18} />
                {link.label}
              </Link>
            );
          })}

          <div className="h-px bg-white/10 my-2" />

          {session?.user ? (
            <>
              <Link
                href={dashboardLink}
                onClick={() => setMobileOpen(false)}
                className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium bg-emerald-600/20 text-emerald-400"
              >
                <LayoutDashboard size={18} />
                Dashboard
              </Link>
              <button
                onClick={() => {
                  setMobileOpen(false);
                  handleLogout();
                }}
                className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-red-400 hover:bg-red-500/10 transition-colors w-full"
              >
                <LogOut size={18} />
                Logout
              </button>
            </>
          ) : (
            <div className="flex gap-2 pt-1">
              <Link
                href="/login"
                onClick={() => setMobileOpen(false)}
                className="flex-1 text-center px-4 py-2.5 rounded-lg text-sm text-neutral-300 border border-white/10"
              >
                Log in
              </Link>
              <Link
                href="/register"
                onClick={() => setMobileOpen(false)}
                className="flex-1 text-center px-4 py-2.5 rounded-lg text-sm font-medium bg-amber-500 text-neutral-950"
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