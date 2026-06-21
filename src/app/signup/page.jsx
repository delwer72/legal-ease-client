"use client";
import { useEffect, useState } from "react";
import { signUp, signIn } from "@/lib/auth-client";
import { saveUser } from "@/lib/api";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import Link from "next/link";
import toast from "react-hot-toast";
import { FaBalanceScale, FaGoogle } from "react-icons/fa";
import { FiEye, FiEyeOff, FiCheck, FiX } from "react-icons/fi";

const passwordRules = [
  { label: "At least 6 characters", test: (p) => p.length >= 6 },
  { label: "At least one uppercase letter", test: (p) => /[A-Z]/.test(p) },
  { label: "At least one number", test: (p) => /[0-9]/.test(p) },
];

export default function SignUp() {
  const [form, setForm] = useState({
    name: "", email: "", password: "", confirmPassword: "", role: "user",
  });
  const [showPass, setShowPass] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const { dbUser, loading: authLoading } = useAuth();

  useEffect(() => {
    if (!authLoading && dbUser) {
      router.push("/");
    }
  }, [authLoading, dbUser, router]);

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    setErrors((prev) => ({ ...prev, [e.target.name]: "" }));
  };

  const validate = () => {
    const newErrors = {};
    if (!form.name.trim()) newErrors.name = "Full name is required";
    else if (form.name.trim().length < 3) newErrors.name = "Name must be at least 3 characters";

    if (!form.email.trim()) newErrors.email = "Email is required";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) newErrors.email = "Enter a valid email address";

    if (!form.password) newErrors.password = "Password is required";
    else if (form.password.length < 6) newErrors.password = "Password must be at least 6 characters";
    else if (!/[A-Z]/.test(form.password)) newErrors.password = "Password must include an uppercase letter";
    else if (!/[0-9]/.test(form.password)) newErrors.password = "Password must include a number";

    if (!form.confirmPassword) newErrors.confirmPassword = "Please confirm your password";
    else if (form.password !== form.confirmPassword) newErrors.confirmPassword = "Passwords do not match";

    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    setLoading(true);
    const { error } = await signUp.email({
      name: form.name,
      email: form.email,
      password: form.password,
    });
    if (error) {
      toast.error(error.message || "Registration failed");
      if (error.message?.toLowerCase().includes("email")) {
        setErrors({ email: "This email is already registered" });
      }
      setLoading(false);
      return;
    }
    await saveUser({ name: form.name, email: form.email, image: "", role: form.role });
    toast.success("Account created successfully!");
    router.push("/");
  };

  const handleGoogle = () => signIn.social({ provider: "google", callbackURL: "/" });

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
        <div className="text-center mb-6">
          <div className="flex items-center justify-center gap-2 text-[#0f172a] text-2xl font-bold mb-2">
            <FaBalanceScale className="text-yellow-400 text-3xl" />
            <span>Legal<span className="text-yellow-400">Ease</span></span>
          </div>
          <h2 className="text-2xl font-bold text-[#0f172a]">Create Account</h2>
          <p className="text-gray-500 text-sm mt-1">Join LegalEase today</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4" noValidate>
          {/* Name */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
            <input
              name="name"
              type="text"
              value={form.name}
              onChange={handleChange}
              placeholder="John Doe"
              className={`w-full border rounded-xl px-4 py-3 outline-none transition text-sm ${
                errors.name ? "border-red-400 bg-red-50" : "border-gray-200 focus:border-yellow-400"
              }`}
            />
            {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
          </div>

          {/* Email */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
            <input
              name="email"
              type="email"
              value={form.email}
              onChange={handleChange}
              placeholder="you@example.com"
              className={`w-full border rounded-xl px-4 py-3 outline-none transition text-sm ${
                errors.email ? "border-red-400 bg-red-50" : "border-gray-200 focus:border-yellow-400"
              }`}
            />
            {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
          </div>

          {/* Password */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
            <div className="relative">
              <input
                name="password"
                type={showPass ? "text" : "password"}
                value={form.password}
                onChange={handleChange}
                placeholder="Min 6 characters"
                className={`w-full border rounded-xl px-4 py-3 pr-11 outline-none transition text-sm ${
                  errors.password ? "border-red-400 bg-red-50" : "border-gray-200 focus:border-yellow-400"
                }`}
              />
              <button type="button" onClick={() => setShowPass(!showPass)}
                className="absolute right-3 top-3.5 text-gray-400 hover:text-gray-600">
                {showPass ? <FiEyeOff /> : <FiEye />}
              </button>
            </div>
            {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password}</p>}
            {/* Password strength checklist */}
            {form.password && (
              <div className="mt-2 space-y-1">
                {passwordRules.map((rule) => (
                  <div key={rule.label} className={`flex items-center gap-2 text-xs ${rule.test(form.password) ? "text-green-600" : "text-gray-400"}`}>
                    {rule.test(form.password) ? <FiCheck className="text-green-500" /> : <FiX className="text-gray-300" />}
                    {rule.label}
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Confirm Password */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Confirm Password</label>
            <div className="relative">
              <input
                name="confirmPassword"
                type={showConfirm ? "text" : "password"}
                value={form.confirmPassword}
                onChange={handleChange}
                placeholder="Re-enter your password"
                className={`w-full border rounded-xl px-4 py-3 pr-11 outline-none transition text-sm ${
                  errors.confirmPassword ? "border-red-400 bg-red-50" :
                  form.confirmPassword && form.password === form.confirmPassword
                    ? "border-green-400 bg-green-50"
                    : "border-gray-200 focus:border-yellow-400"
                }`}
              />
              <button type="button" onClick={() => setShowConfirm(!showConfirm)}
                className="absolute right-3 top-3.5 text-gray-400 hover:text-gray-600">
                {showConfirm ? <FiEyeOff /> : <FiEye />}
              </button>
            </div>
            {errors.confirmPassword && <p className="text-red-500 text-xs mt-1">{errors.confirmPassword}</p>}
            {form.confirmPassword && form.password === form.confirmPassword && (
              <p className="text-green-600 text-xs mt-1 flex items-center gap-1"><FiCheck /> Passwords match</p>
            )}
          </div>

          {/* Role */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Register as</label>
            <div className="grid grid-cols-2 gap-3">
              {["user", "lawyer"].map((role) => (
                <button key={role} type="button"
                  onClick={() => setForm((prev) => ({ ...prev, role }))}
                  className={`py-3 rounded-xl font-semibold text-sm border-2 transition ${
                    form.role === role
                      ? "border-yellow-400 bg-yellow-50 text-yellow-700"
                      : "border-gray-200 hover:border-yellow-200 text-gray-600"
                  }`}
                >
                  {role === "user" ? "👤 Client" : "⚖️ Lawyer"}
                </button>
              ))}
            </div>
          </div>

          <button type="submit" disabled={loading}
            className="w-full bg-[#0f172a] text-yellow-400 py-3 rounded-full font-bold hover:bg-yellow-400 hover:text-[#0f172a] transition disabled:opacity-60 mt-2">
            {loading ? "Creating Account..." : "Create Account"}
          </button>
        </form>

        <div className="flex items-center gap-3 my-5">
          <div className="flex-1 h-px bg-gray-200" />
          <span className="text-gray-400 text-sm">or</span>
          <div className="flex-1 h-px bg-gray-200" />
        </div>

        <button onClick={handleGoogle}
          className="w-full border border-gray-200 py-3 rounded-full font-semibold flex items-center justify-center gap-3 hover:bg-gray-50 transition text-sm">
          <FaGoogle className="text-red-500" />
          Continue with Google
        </button>

        <p className="text-center text-gray-500 text-sm mt-6">
          Already have an account?{" "}
          <Link href="/signin" className="text-yellow-500 font-semibold hover:underline">Sign In</Link>
        </p>
      </div>
    </div>
  );
}