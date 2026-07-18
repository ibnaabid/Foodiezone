// app/register/page.tsx
"use client";
import { useState, FormEvent } from "react";
import { useRouter } from "next/navigation";
import { Eye, EyeOff, Store, User, Loader2 } from "lucide-react";
import { authClient } from "../lib/auth-client";

type UserRole = "customer" | "restaurant" | "admin";

interface RegisterFormData {
  name: string;
  email: string;
  password: string;
  role: UserRole;
}

export default function RegisterPage() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const [formData, setFormData] = useState<RegisterFormData>({
    name: "",
    email: "",
    password: "",
    role: "customer",
  });

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setErrorMsg("");
    setLoading(true);

    const { error } = await authClient.signUp.email({
      email: formData.email,
      password: formData.password,
      name: formData.name,
      role: formData.role,
    });

    if (error) {
      setErrorMsg(error.message || "Registration failed");
      setLoading(false);
      return;
    }

    // auto sign-in manually trigger
    await authClient.signIn.email({
      email: formData.email,
      password: formData.password,
    });

    setLoading(false);
    redirectByRole(formData.role);
  };

  const handleGoogleSignUp = async () => {
    await authClient.signIn.social({
      provider: "google",
      callbackURL: "/dashboard/customer",
    });
  };

  const redirectByRole = (role: UserRole) => {
    if (role === "restaurant") router.push("/dashboard/restaurant");
    else if (role === "admin") router.push("/dashboard/admin");
    else router.push("/dashboard/customer");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-neutral-950 px-4 relative overflow-hidden">
      <div className="absolute -top-32 -left-32 w-96 h-96 bg-emerald-600/20 rounded-full blur-3xl" />
      <div className="absolute -bottom-32 -right-32 w-96 h-96 bg-amber-600/10 rounded-full blur-3xl" />

      <div className="relative w-full max-w-md">
        <div className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-2xl shadow-2xl p-8">
          <div className="text-center mb-8">
            <h1 className="text-2xl font-semibold text-white">
              Create an account
            </h1>
            <p className="text-neutral-400 text-sm mt-1">
              Join us and start ordering, or manage your restaurant
            </p>
          </div>

          {errorMsg && (
            <div className="mb-4 py-2 text-sm bg-red-500/10 border border-red-500/30 text-red-400 rounded-lg px-4">
              {errorMsg}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              type="text"
              placeholder="Full name"
              required
              className="input w-full bg-white/5 border border-white/10 text-white placeholder:text-neutral-500 focus:border-emerald-500 focus:outline-none rounded-lg px-4 py-3 transition-colors"
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
            />

            <input
              type="email"
              placeholder="Email address"
              required
              className="input w-full bg-white/5 border border-white/10 text-white placeholder:text-neutral-500 focus:border-emerald-500 focus:outline-none rounded-lg px-4 py-3 transition-colors"
              value={formData.email}
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
            />

            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                required
                minLength={6}
                className="input w-full bg-white/5 border border-white/10 text-white placeholder:text-neutral-500 focus:border-emerald-500 focus:outline-none rounded-lg px-4 py-3 pr-11 transition-colors"
                value={formData.password}
                onChange={(e) =>
                  setFormData({ ...formData, password: e.target.value })
                }
              />
              <button
                type="button"
                onClick={() => setShowPassword((prev) => !prev)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-500 hover:text-neutral-300 transition-colors"
                tabIndex={-1}
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>

            {/* Role selector - card style */}
            <div className="grid grid-cols-2 gap-3 pt-1">
              <button
                type="button"
                onClick={() => setFormData({ ...formData, role: "customer" })}
                className={`flex flex-col items-center gap-2 rounded-lg border py-3 transition-all ${
                  formData.role === "customer"
                    ? "border-emerald-500 bg-emerald-500/10 text-emerald-400"
                    : "border-white/10 bg-white/5 text-neutral-400 hover:border-white/20"
                }`}
              >
                <User size={20} />
                <span className="text-sm">Customer</span>
              </button>

              <button
                type="button"
                onClick={() => setFormData({ ...formData, role: "restaurant" })}
                className={`flex flex-col items-center gap-2 rounded-lg border py-3 transition-all ${
                  formData.role === "restaurant"
                    ? "border-amber-500 bg-amber-500/10 text-amber-400"
                    : "border-white/10 bg-white/5 text-neutral-400 hover:border-white/20"
                }`}
              >
                <Store size={20} />
                <span className="text-sm">Restaurant</span>
              </button>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full flex items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-500 disabled:opacity-60 text-white font-medium rounded-lg py-3 mt-2 transition-colors"
            >
              {loading && <Loader2 size={18} className="animate-spin" />}
              {loading ? "Creating account..." : "Create account"}
            </button>
          </form>

          <div className="flex items-center gap-3 my-6">
            <div className="h-px flex-1 bg-white/10" />
            <span className="text-xs text-neutral-500">OR</span>
            <div className="h-px flex-1 bg-white/10" />
          </div>

          <button
            onClick={handleGoogleSignUp}
            type="button"
            className="w-full flex items-center justify-center gap-3 bg-white hover:bg-neutral-100 text-neutral-800 font-medium rounded-lg py-3 transition-colors"
          >
            <svg width="18" height="18" viewBox="0 0 24 24">
              <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
              <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
              <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
              <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
            </svg>
            Continue with Google
          </button>

          <p className="text-center text-sm text-neutral-500 mt-6">
            Already have an account?{" "}
            <a href="/login" className="text-emerald-400 hover:underline">
              Log in
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}