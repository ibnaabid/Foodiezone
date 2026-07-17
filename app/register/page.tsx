"use client";

import { useState } from "react";
import Link from "next/link";
import { User, Mail, Lock, Eye, EyeOff, ArrowRight, ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

function getStrength(password: string): { label: string; score: number; color: string } {
  let score = 0;
  if (!password) return { label: "Weak", score: 0, color: "#D9534F" };
  if (password.length >= 6) score++;
  if (password.length >= 10) score++;
  if (/[A-Z]/.test(password)) score++;
  if (/[0-9]/.test(password)) score++;
  if (/[^A-Za-z0-9]/.test(password)) score++;

  if (score <= 1) return { label: "Weak", score: 1, color: "#D9534F" };
  if (score <= 3) return { label: "Fair", score: 2, color: "#F4A261" };
  return { label: "Strong", score: 3, color: "#4ADE80" };
}

export default function RegisterPage() {
  const router = useRouter();
  const [role, setRole] = useState<"customer" | "owner">("customer");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    restaurantName: "",
    agree: false,
  });

  const [errors, setErrors] = useState<any>({});
  const strength = getStrength(form.password);

  const validate = () => {
    const next: any = {};
    if (!form.name?.trim()) next.name = "Full name is required";
    if (!form.email || !/\S+@\S+\.\S+/.test(form.email)) next.email = "Valid email is required";
    if (!form.password || form.password.length < 6) next.password = "Password must be at least 6 characters";
    if (role === "owner" && !form.restaurantName?.trim()) next.restaurantName = "Restaurant name is required";
    if (!form.agree) next.agree = "You must agree to the terms";

    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setLoading(true);
    // Simulate API call
    setTimeout(() => {
      toast.success("Account created successfully!");
      router.push("/login");
      setLoading(false);
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-950 via-yellow-950 to-orange-950 flex items-center justify-center p-6">
      <div className="w-full max-w-md">
        <Link href="/" className="inline-flex items-center gap-2 text-amber-400 hover:text-yellow-300 mb-6">
          <ArrowLeft size={20} /> Back to Home
        </Link>

        <div className="bg-gray-700/95 backdrop-blur-2xl rounded-3xl shadow-2xl shadow-black/60 p-8 md:p-10 border border-amber-200">
          <div className="text-center mb-8">
            <div className="mx-auto w-20 h-20 bg-gradient-to-br from-yellow-400 to-amber-600 rounded-3xl flex items-center justify-center text-5xl mb-5 shadow-xl">
              🍽️
            </div>
            <h1 className="text-3xl font-bold text-gray-900">Create Account</h1>
            <p className="text-amber-700 mt-2">Join Foodie Zone</p>
          </div>

          {/* Role Selection */}
          <div className="grid grid-cols-2 gap-4 mb-8">
            <button
              onClick={() => setRole("customer")}
              className={`p-5 rounded-2xl border-2 flex flex-col items-center transition-all ${
                role === "customer" ? "border-yellow-500 bg-yellow-50" : "border-gray-200 hover:border-amber-300"
              }`}
            >
              <span className="text-4xl mb-2">👤</span>
              <p className="font-semibold">Customer</p>
            </button>

            <button
              onClick={() => setRole("owner")}
              className={`p-5 rounded-2xl border-2 flex flex-col items-center transition-all ${
                role === "owner" ? "border-yellow-500 bg-yellow-50" : "border-gray-200 hover:border-amber-300"
              }`}
            >
              <span className="text-4xl mb-2">🏪</span>
              <p className="font-semibold">Restaurant Owner</p>
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="text-sm font-medium block mb-1.5">Full Name</label>
              <div className="relative">
                <User size={18} className="absolute left-4 top-3.5 text-gray-400" />
                <input
                  type="text"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  placeholder="Rahim Khan"
                  className="w-full pl-11 py-3.5 border border-gray-300 rounded-2xl focus:border-yellow-500 focus:ring-2 focus:ring-yellow-200 outline-none"
                />
              </div>
              {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
            </div>

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

            {role === "owner" && (
              <div>
                <label className="text-sm font-medium block mb-1.5">Restaurant Name</label>
                <input
                  type="text"
                  value={form.restaurantName}
                  onChange={(e) => setForm({ ...form, restaurantName: e.target.value })}
                  placeholder="Tasty Palace"
                  className="w-full px-5 py-3.5 border border-gray-300 rounded-2xl focus:border-yellow-500 focus:ring-2 focus:ring-yellow-200 outline-none"
                />
                {errors.restaurantName && <p className="text-red-500 text-xs mt-1">{errors.restaurantName}</p>}
              </div>
            )}

            <div>
              <label className="text-sm font-medium block mb-1.5">Password</label>
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

              {form.password && (
                <div className="mt-2 flex items-center gap-2">
                  <div className="h-1.5 flex-1 bg-gray-200 rounded-full overflow-hidden">
                    <div
                      className="h-full transition-all duration-300"
                      style={{ width: `${(strength.score / 3) * 100}%`, backgroundColor: strength.color }}
                    />
                  </div>
                  <p className="text-xs font-medium" style={{ color: strength.color }}>
                    {strength.label}
                  </p>
                </div>
              )}
              {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password}</p>}
            </div>

            <div className="flex items-start gap-3">
              <input
                type="checkbox"
                id="agree"
                checked={form.agree}
                onChange={(e) => setForm({ ...form, agree: e.target.checked })}
                className="mt-1 accent-yellow-600"
              />
              <label htmlFor="agree" className="text-sm text-gray-600 cursor-pointer">
                I agree to the <span className="text-amber-700 hover:underline">Terms</span> and{" "}
                <span className="text-amber-700 hover:underline">Privacy Policy</span>
              </label>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-4 bg-gradient-to-r from-yellow-500 to-amber-600 hover:from-yellow-600 hover:to-amber-700 text-white rounded-2xl font-semibold flex items-center justify-center gap-2 transition disabled:opacity-70"
            >
              {loading ? "Creating Account..." : "Create Account"}
              {!loading && <ArrowRight size={20} />}
            </button>
          </form>

          <p className="text-center mt-8 text-gray-600">
            Already have an account?{" "}
            <Link href="/login" className="text-amber-700 font-bold hover:underline">
              Login
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}