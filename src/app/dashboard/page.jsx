"use client";
import { useAuth } from "@/context/AuthContext";
import Link from "next/link";
import Image from "next/image";
import {
  FaEnvelope, FaUserTag, FaEdit, FaPhone,
  FaMapMarkerAlt, FaCity, FaGlobe, FaInfoCircle, FaCalendarAlt
} from "react-icons/fa";

export default function DashboardHome() {
  const { dbUser } = useAuth();

  if (!dbUser) return null;

  const infoItems = [
    { icon: <FaEnvelope className="text-yellow-500" />, label: "Email", value: dbUser.email },
    { icon: <FaPhone className="text-yellow-500" />, label: "Phone", value: dbUser.phone || "Not added" },
    { icon: <FaCity className="text-yellow-500" />, label: "City", value: dbUser.city || "Not added" },
    { icon: <FaGlobe className="text-yellow-500" />, label: "Country", value: dbUser.country || "Not added" },
    { icon: <FaMapMarkerAlt className="text-yellow-500" />, label: "Address", value: dbUser.address || "Not added" },
    {
      icon: <FaCalendarAlt className="text-yellow-500" />,
      label: "Member Since",
      value: dbUser.createdAt
        ? new Date(dbUser.createdAt).toLocaleDateString("en-US", {
            year: "numeric", month: "long", day: "numeric",
          })
        : "N/A",
    },
  ];

  return (
    <div className="max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold text-[#0f172a] mb-6">My Profile</h1>

      <div className="bg-white rounded-2xl shadow overflow-hidden">

        {/* Cover Banner */}
        <div className="h-32 bg-gradient-to-r from-[#0f172a] to-[#1e3a5f]" />

        {/* Avatar Row */}
        {/* Avatar Row */}
<div className="px-8 pt-0 pb-6">
  <div className="flex items-end justify-between -mt-10">

    {/* Avatar */}
    <div className="relative w-24 h-24 rounded-full border-4 border-white shadow-lg overflow-hidden flex-shrink-0 bg-gray-100">
      <Image
        src={
          dbUser.image ||
          `https://placehold.co/200x200/0f172a/fbbf24?text=${encodeURIComponent(dbUser.name?.[0] || "U")}`
        }
        alt={dbUser.name}
        fill
        className="object-cover"
      />
    </div>

    {/* Update Button */}
    <Link
      href="/dashboard/user/update-profile"
      className="flex items-center gap-2 bg-[#0f172a] text-yellow-400 px-5 py-2.5 rounded-full font-semibold text-sm hover:bg-yellow-400 hover:text-[#0f172a] transition whitespace-nowrap mb-1"
    >
      <FaEdit /> Update Profile
    </Link>
  </div>

  {/* Name & Role — avatar এর নিচে আলাদা row এ */}
  <div className="mt-3 mb-2">
    <h2 className="text-xl font-bold text-[#0f172a]">{dbUser.name}</h2>
    <div className="flex items-center gap-2 mt-1">
      <FaUserTag className="text-yellow-500 text-sm" />
      <span className="capitalize bg-yellow-100 text-yellow-700 px-3 py-0.5 rounded-full text-xs font-semibold">
        {dbUser.role}
      </span>
    </div>
  </div>

  {/* Bio */}
  {dbUser.bio && (
    <div className="mt-4 flex items-start gap-3 bg-yellow-50 border border-yellow-100 rounded-xl p-4">
      <FaInfoCircle className="text-yellow-500 mt-0.5 flex-shrink-0" />
      <p className="text-gray-600 text-sm leading-relaxed">{dbUser.bio}</p>
    </div>
  )}

  {/* Info Grid */}
  <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
    {infoItems.map((item) => (
      <div
        key={item.label}
        className="flex items-center gap-3 bg-gray-50 rounded-xl px-4 py-3 border border-gray-100"
      >
        <div className="text-lg flex-shrink-0">{item.icon}</div>
        <div className="min-w-0">
          <p className="text-xs text-gray-400 font-medium">{item.label}</p>
          <p className={`text-sm font-semibold truncate ${
            item.value === "Not added" ? "text-gray-300 italic font-normal" : "text-[#0f172a]"
          }`}>
            {item.value}
          </p>
        </div>
      </div>
    ))}
  </div>
</div>
      </div>
    </div>
  );
}