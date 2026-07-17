"use client";

import { useState } from "react";
import Link from "next/link";
import { Mail, Lock, Eye, EyeOff, ArrowRight, ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

export default function LoginPage() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);

  const [form, setForm] = useState({ email: "", password: "" });
  const [errors, setErrors] = useState<{ email?: string; password?: string; general?: string }>({});

  const validate = () => {
    const next: typeof errors = {};
    if (!form.email || !/^\S+@\S+\.\S+$/.test(form.email)) next.email = "Valid email is required";
    if (!form.password || form.password.length < 6) next.password = "Password must be at least 6 characters";
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setLoading(true);
    setErrors({});

    console.log("Login attempt:", form.email, form.password); // Fixed

    // Simulate API call
    setTimeout(() => {
      setLoading(false);
      toast.success("Login successful! Welcome back 🎉");

      // Default redirect (পরে auth অনুযায়ী পরিবর্তন করবে)
      router.push("/dashboard/customer"); 
    }, 1400);
  };

  const handleGoogleSignIn = async () => {
    setGoogleLoading(true);
    setTimeout(() => {
      toast.success("Google Login Successful");
      router.push("/dashboard/customer");
      setGoogleLoading(false);
    }, 1200);
  };

  const fillDemo = () => {
    setForm({ email: "customer@foodiezone.com", password: "123456" });
    toast.success("Demo credentials filled!");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-950 via-yellow-950 to-orange-950 flex items-center justify-center p-6">
      <div className="w-full max-w-md">
        <Link href="/" className="inline-flex items-center gap-2 text-amber-400 hover:text-yellow-300 mb-8 transition">
          <ArrowLeft size={20} /> Back to Home
        </Link>

        <div className="bg-white/95 backdrop-blur-2xl rounded-3xl shadow-2xl shadow-black/60 p-8 md:p-10 border border-amber-200">
          <div className="text-center mb-8">
            <div className="mx-auto w-20 h-20 bg-gradient-to-br from-yellow-400 to-amber-600 rounded-3xl flex items-center justify-center text-5xl mb-5 shadow-xl">
              🍔
            </div>
            <h1 className="text-3xl font-bold text-gray-900">Welcome Back</h1>
            <p className="text-amber-700 mt-2">Sign in to your account</p>
          </div>

          <button
            onClick={fillDemo}
            className="w-full py-2.5 mb-6 border border-dashed border-amber-600 text-amber-700 rounded-2xl text-sm font-medium hover:bg-amber-50 transition"
          >
            Fill Demo Credentials
          </button>

          {errors.general && (
            <div className="bg-red-50 border border-red-200 text-red-600 p-3 rounded-2xl mb-5 text-center text-sm">
              {errors.general}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="text-sm font-medium block mb-1.5">Email Address</label>
              <div className="relative">
                <Mail size={18} className="absolute left-4 top-3.5 text-gray-400" />
                <input
                  type="email"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  placeholder="you@example.com"
                  className="w-full pl-11 py-3.5 border border-gray-300 rounded-2xl focus:border-yellow-500 focus:ring-2 focus:ring-yellow-200 outline-none"
                />
              </div>
              {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
            </div>

            <div>
              <div className="flex justify-between mb-1.5">
                <label className="text-sm font-medium">Password</label>
                <a href="/forgot-password" className="text-sm text-amber-700 hover:underline">Forgot?</a>
              </div>
              <div className="relative">
                <Lock size={18} className="absolute left-4 top-3.5 text-gray-400" />
                <input
                  type={showPassword ? "text" : "password"}
                  value={form.password}
                  onChange={(e) => setForm({ ...form, password: e.target.value })}
                  placeholder="••••••••"
                  className="w-full pl-11 pr-12 py-3.5 border border-gray-300 rounded-2xl focus:border-yellow-500 focus:ring-2 focus:ring-yellow-200 outline-none"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-3.5 text-gray-400"
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
              {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password}</p>}
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-4 bg-gradient-to-r from-yellow-500 to-amber-600 hover:from-yellow-600 hover:to-amber-700 disabled:opacity-70 text-white rounded-2xl font-semibold flex items-center justify-center gap-2 transition-all text-lg"
            >
              {loading ? "Signing in..." : "Sign in"}
              {!loading && <ArrowRight size={20} />}
            </button>
          </form>

          <div className="my-6 flex items-center gap-3">
            <div className="flex-1 h-px bg-gray-200" />
            <span className="text-xs text-gray-500">or continue with</span>
            <div className="flex-1 h-px bg-gray-200" />
          </div>

          <button
            onClick={handleGoogleSignIn}
            disabled={googleLoading}
            className="w-full py-3.5 border border-gray-700 rounded-2xl flex items-center justify-center gap-3 hover:bg-gray-500 text-black transition disabled:opacity-70 font-medium"
          >
            <svg width="18" height="18" viewBox="0 0 48 48">
              <path fill="#FFC107" d="M43.6 20.5H42V20H24v8h11.3c-1.6 4.6-6 8-11.3 8-6.6 0-12-5.4-12-12s5.4-12 12-12c3.1 0 5.8 1.1 8 3l6-6C34 5.1 29.3 3 24 3 12.4 3 3 12.4 3 24s9.4 21 21 21 21-9.4 21-21c0-1.4-.1-2.4-.4-3.5z" />
              <path fill="#FF3D00" d="M6.3 14.7l6.6 4.8C14.5 16 18.9 13 24 13c3.1 0 5.8 1.1 8 3l6-6C34 5.1 29.3 3 24 3c-7.6 0-14.1 4.3-17.7 11.7z" />
              <path fill="#4CAF50" d="M24 45c5.2 0 9.9-2 13.4-5.2l-6.2-5.2c-2 1.4-4.5 2.4-7.2 2.4-5.3 0-9.7-3.4-11.3-8.1l-6.6 5.1C9.8 40.5 16.3 45 24 45z" />
              <path fill="#1976D2" d="M43.6 20.5H42V20H24v8h11.3c-.8 2.3-2.2 4.2-4.1 5.6l6.2 5.2C40.9 36 44 30.6 44 24c0-1.4-.1-2.4-.4-3.5z" />
            </svg>
            {googleLoading ? "Connecting..." : "Continue with Google"}
          </button>

          <p className="text-center mt-8 text-green-600">
            Don't have an account?{" "}
            <Link href="/register" className="text-amber-700 font-bold hover:underline">
              Sign Up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}