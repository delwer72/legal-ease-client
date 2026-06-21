"use client";
import { motion } from "framer-motion";
import Link from "next/link";
import {
  FaGavel,
  FaBalanceScale,
  FaArrowRight,
  FaCheckCircle,
  FaStar,
  FaUsers,
  FaClock,
} from "react-icons/fa";

export default function HeroSection() {
  return (
    <section className="relative bg-[#070b14] min-h-[95vh] flex items-center overflow-hidden">
      {/* Dot grid background */}
      <div
        className="absolute inset-0 opacity-40"
        style={{
          backgroundImage:
            "radial-gradient(rgba(148,163,184,0.15) 1px, transparent 1px)",
          backgroundSize: "26px 26px",
        }}
      />

      {/* Glow blobs */}
      <div className="absolute top-0 left-0 w-[28rem] h-[28rem] bg-blue-500/10 rounded-full blur-[100px]" />
      <div className="absolute bottom-0 right-0 w-[28rem] h-[28rem] bg-cyan-400/10 rounded-full blur-[100px]" />

      <div className="relative max-w-7xl mx-auto px-4 py-20 grid md:grid-cols-2 gap-16 items-center">
        {/* Left Text */}
        <div>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className="inline-flex items-center gap-2 bg-white/5 border border-white/10 text-blue-300 px-4 py-1.5 rounded-full text-xs font-semibold tracking-wide uppercase">
              <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
              500+ Verified Lawyers Trust LegalEase
            </span>

            <h1 className="text-4xl md:text-6xl font-extrabold text-white leading-[1.1] mt-5">
              Find & Hire <br />
              <span className="bg-gradient-to-r from-blue-400 via-cyan-300 to-blue-400 bg-clip-text text-transparent">
                Expert Legal
              </span>{" "}
              <br />
              Counsel
            </h1>

            <p className="text-gray-400 mt-5 text-lg max-w-md">
              Connect with <span className="text-white font-semibold">verified lawyers</span> for criminal, corporate, family, and more.{" "}
              <span className="text-cyan-300">Fast, secure, and affordable.</span>
            </p>

            <div className="flex flex-wrap gap-4 mt-8">
              <Link
                href="/lawyers"
                className="bg-gradient-to-r from-blue-500 to-cyan-400 text-[#070b14] px-8 py-3 rounded-full font-bold text-lg hover:opacity-90 transition shadow-lg shadow-blue-500/30 flex items-center gap-2"
              >
                Browse Lawyers <FaArrowRight />
              </Link>
              <Link
                href="/signup"
                className="border border-white/15 text-white px-8 py-3 rounded-full font-bold text-lg hover:bg-white/5 transition"
              >
                Get Started
              </Link>
            </div>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="flex flex-wrap gap-8 mt-12 pt-8 border-t border-white/10"
          >
            {[
              { label: "Expert Lawyers", value: "500+", color: "text-blue-400" },
              { label: "Cases Solved", value: "10K+", color: "text-green-400" },
              { label: "Happy Clients", value: "8K+", color: "text-purple-400" },
            ].map((stat) => (
              <div key={stat.label}>
                <p className={`text-2xl font-bold ${stat.color}`}>{stat.value}</p>
                <p className="text-gray-500 text-sm">{stat.label}</p>
              </div>
            ))}
          </motion.div>

          {/* Trust badges */}
          <div className="flex flex-wrap gap-3 mt-6">
            {["Verified profiles", "Secure payments", "24/7 support"].map((item) => (
              <span
                key={item}
                className="flex items-center gap-1.5 text-gray-400 text-xs border border-white/10 rounded-full px-3 py-1.5"
              >
                <FaCheckCircle className="text-cyan-400" /> {item}
              </span>
            ))}
          </div>
        </div>

        {/* Right Visual */}
        <motion.div
          initial={{ opacity: 0, scale: 0.85 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          className="hidden md:flex justify-center relative"
        >
          <div className="relative w-full max-w-sm">
            <div className="bg-gradient-to-br from-[#1e293b] to-[#0f172a] border border-white/10 rounded-[2.5rem] aspect-square flex items-center justify-center shadow-2xl">
              <FaBalanceScale className="text-yellow-400 text-9xl drop-shadow-[0_0_25px_rgba(250,204,21,0.35)]" />
            </div>

            {/* Top-left badge */}
            <div className="absolute -top-5 -left-6 bg-[#0f172a] border border-white/10 rounded-2xl shadow-xl px-4 py-3 flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-blue-500 flex items-center justify-center text-white">
                <FaGavel />
              </div>
              <div>
                <p className="text-white font-bold text-sm leading-none">500+</p>
                <p className="text-gray-400 text-xs mt-1">Verified Lawyers</p>
              </div>
            </div>

            {/* Top-right badge */}
            <div className="absolute -top-5 -right-6 bg-[#1e293b] border border-white/10 rounded-2xl shadow-xl px-4 py-3 flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-purple-500 flex items-center justify-center text-white">
                <FaClock />
              </div>
              <div>
                <p className="text-white font-bold text-sm leading-none">24/7</p>
                <p className="text-gray-400 text-xs mt-1">Support</p>
              </div>
            </div>

            {/* Bottom-left badge */}
            <div className="absolute -bottom-5 -left-6 bg-[#0f172a] border border-white/10 rounded-2xl shadow-xl px-4 py-3 flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-green-500 flex items-center justify-center text-white">
                <FaCheckCircle />
              </div>
              <div>
                <p className="text-white font-bold text-sm leading-none">10K+</p>
                <p className="text-gray-400 text-xs mt-1">Cases Solved</p>
              </div>
            </div>

            {/* Bottom-right badge */}
            <div className="absolute -bottom-5 -right-6 bg-[#1e293b] border border-white/10 rounded-2xl shadow-xl px-4 py-3 flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-amber-500 flex items-center justify-center text-white">
                <FaStar />
              </div>
              <div>
                <p className="text-white font-bold text-sm leading-none">4.9/5</p>
                <p className="text-gray-400 text-xs mt-1">Client Rating</p>
              </div>
            </div>

            {/* Floating mid-right badge */}
            <div className="absolute top-1/2 -right-10 -translate-y-1/2 bg-[#0f172a] border border-white/10 rounded-full shadow-xl pl-2 pr-4 py-2 flex items-center gap-3">
              <div className="w-9 h-9 rounded-full bg-red-500 flex items-center justify-center text-white">
                <FaUsers />
              </div>
              <div>
                <p className="text-white font-bold text-sm leading-none">8K+</p>
                <p className="text-gray-400 text-xs mt-1">Happy Clients</p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}