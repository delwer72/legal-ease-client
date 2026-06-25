"use client";
import { useEffect, useState } from "react";
import { signIn } from "@/lib/auth-client";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import Link from "next/link";
import toast from "react-hot-toast";
import { FaBalanceScale, FaGoogle } from "react-icons/fa";
import { FiEye, FiEyeOff } from "react-icons/fi"; 

export default function SignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPass, setShowPass] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const router = useRouter();
  const { dbUser, loading: authLoading } = useAuth();

  useEffect(() => {
    if (!authLoading && dbUser) {
      router.push("/");
    }
  }, [authLoading, dbUser, router]);

  const validate = () => {
    const newErrors = {};
    if (!email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      newErrors.email = "Enter a valid email address";
    }
    if (!password) {
      newErrors.password = "Password is required";
    } else if (password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }
    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    setErrors({});
    setLoading(true);
    const { error } = await signIn.email({ email, password });
    if (error) {
      toast.error(error.message || "Invalid email or password");
      setErrors({ general: "Invalid email or password. Please try again." });
      setLoading(false);
      return;
    }
    toast.success("Welcome back!");
    router.push("/");
  };

  const handleGoogle = async () => {
    await signIn.social({ provider: "google", callbackURL: "/" });
  };

  if (authLoading || dbUser) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-10 h-10 border-4 border-yellow-400 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0f172a] to-[#1e293b] flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl shadow-2xl w-full max-w-md p-10">
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-2 text-[#0f172a] text-2xl font-bold mb-2">
            <FaBalanceScale className="text-yellow-400 text-3xl" />
            <span>Legal<span className="text-yellow-400">Ease</span></span>
          </div>
          <h2 className="text-2xl font-bold text-[#0f172a]">Welcome Back</h2>
          <p className="text-gray-500 text-sm mt-1">Sign in to your account</p>
        </div>

        {/* General Error */}
        {errors.general && (
          <div className="bg-red-50 border border-red-200 text-red-600 text-sm px-4 py-3 rounded-xl mb-4">
            {errors.general}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4" noValidate>
          {/* Email */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => { setEmail(e.target.value); setErrors((p) => ({ ...p, email: "" })); }}
              placeholder="you@example.com"
              className={`w-full border rounded-xl px-4 py-3 outline-none transition text-sm ${
                errors.email ? "border-red-400 bg-red-50" : "border-gray-200 focus:border-yellow-400"
              }`}
            />
            {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
          </div>

          {/* Password authantication*/}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
            <div className="relative">
              <input
                type={showPass ? "text" : "password"}
                value={password}
                onChange={(e) => { setPassword(e.target.value); setErrors((p) => ({ ...p, password: "" })); }}
                placeholder="••••••••"
                className={`w-full border rounded-xl px-4 py-3 pr-11 outline-none transition text-sm ${
                  errors.password ? "border-red-400 bg-red-50" : "border-gray-200 focus:border-yellow-400"
                }`}
              />
              <button
                type="button"
                onClick={() => setShowPass(!showPass)}
                className="absolute right-3 top-3.5 text-gray-400 hover:text-gray-600"
              >
                {showPass ? <FiEyeOff /> : <FiEye />}
              </button>
            </div>
            {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password}</p>}
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-[#0f172a] text-yellow-400 py-3 rounded-full font-bold hover:bg-yellow-400 hover:text-[#0f172a] transition disabled:opacity-60 mt-2"
          >
            {loading ? "Signing in..." : "Sign In"}
          </button>
        </form>

        <div className="flex items-center gap-3 my-5">
          <div className="flex-1 h-px bg-gray-200" />
          <span className="text-gray-400 text-sm">or</span>
          <div className="flex-1 h-px bg-gray-200" />
        </div>

        <button
          onClick={handleGoogle}
          className="w-full border border-gray-200 py-3 rounded-full font-semibold flex items-center justify-center gap-3 hover:bg-gray-50 transition text-sm"
        >
          <FaGoogle className="text-red-500" />
          Continue with Google
        </button>

        <p className="text-center text-gray-500 text-sm mt-6">
          Don't have an account?{" "}
          <Link href="/signup" className="text-yellow-500 font-semibold hover:underline">Sign Up</Link>
        </p>
      </div>
    </div>
  );
}
export const dynamic = 'force-dynamic'