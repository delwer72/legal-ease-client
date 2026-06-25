"use client";
import { useEffect, useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { getMyLawyerProfile } from "@/lib/api";
import Link from "next/link";
import Image from "next/image";
import {
  FaGavel, FaBriefcase, FaDollarSign, FaPhone,
  FaMapMarkerAlt, FaGlobe, FaLinkedin, FaTwitter,
  FaClock, FaLanguage, FaUniversity, FaTrophy,
  FaStar, FaEdit, FaEye, FaEyeSlash,
} from "react-icons/fa";

export default function LawyerMyProfile() {
  const { token } = useAuth();
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (token) {
      getMyLawyerProfile(token).then((data) => {
        if (data && !data.message) setProfile(data);
        setLoading(false);
      });
    }
  }, [token]);

  if (loading) return (
    <div className="flex items-center justify-center py-20">
      <div className="w-10 h-10 border-4 border-yellow-400 border-t-transparent rounded-full animate-spin" />
    </div>
  );

  if (!profile) return (
    <div className="max-w-2xl mx-auto text-center py-20">
      <FaGavel className="text-6xl text-gray-200 mx-auto mb-4" />
      <h2 className="text-xl font-bold text-[#0f172a] mb-2">No Profile Yet</h2>
      <p className="text-gray-400 mb-6">Create your legal profile to start getting clients.</p>
      <Link
        href="/dashboard/lawyer/manage-legal-profile"
        className="bg-[#0f172a] text-yellow-400 px-8 py-3 rounded-full font-semibold hover:bg-yellow-400 hover:text-[#0f172a] transition"
      >
        Create Profile
      </Link>
    </div>
  );

  const infoItems = [
    { icon: <FaDollarSign className="text-yellow-500" />, label: "Consultation Fee", value: `$${profile.fee}/hr` },
    { icon: <FaStar className="text-yellow-500" />, label: "Experience", value: profile.experience || "N/A" },
    { icon: <FaTrophy className="text-yellow-500" />, label: "Total Clients", value: profile.totalHires || 0 },
    { icon: <FaClock className="text-yellow-500" />, label: "Working Hours", value: profile.consultationTime || "N/A" },
    { icon: <FaPhone className="text-yellow-500" />, label: "Phone", value: profile.phone || "Not added" },
    { icon: <FaMapMarkerAlt className="text-yellow-500" />, label: "Location", value: [profile.city, profile.country].filter(Boolean).join(", ") || "Not added" },
    { icon: <FaGlobe className="text-yellow-500" />, label: "Specialization", value: `${profile.specialization} Law` },
    { icon: <FaBriefcase className="text-yellow-500" />, label: "Status", value: profile.status || "Available" },
  ];

  return (
    <div className="max-w-3xl mx-auto space-y-5">

      {/* Header */}
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-[#0f172a]">My Legal Profile</h1>
        <Link
          href="/dashboard/lawyer/manage-legal-profile"
          className="flex items-center gap-2 bg-[#0f172a] text-yellow-400 px-5 py-2.5 rounded-full font-semibold text-sm hover:bg-yellow-400 hover:text-[#0f172a] transition"
        >
          <FaEdit /> Edit Profile
        </Link>
      </div>

      {/* Hero Card */}
      <div className="bg-white rounded-2xl shadow overflow-hidden">
        <div className="h-28 bg-gradient-to-r from-[#0f172a] to-[#1e3a5f]" />
        <div className="px-8 pb-6">
          <div className="flex items-end justify-between -mt-10">
            <div className="relative w-24 h-24 rounded-2xl overflow-hidden border-4 border-white shadow-lg bg-gray-100">
              <Image
                src={profile.image || `https://placehold.co/200x200/0f172a/fbbf24?text=${profile.name?.[0] || "L"}`}
                alt={profile.name}
                fill
                className="object-cover"
              />
            </div>
            <span className={`mb-2 flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold ${
              profile.published
                ? "bg-green-100 text-green-600"
                : "bg-gray-100 text-gray-500"
            }`}>
              {profile.published ? <FaEye /> : <FaEyeSlash />}
              {profile.published ? "Published" : "Not Published"}
            </span>
          </div>

          <div className="mt-3">
            <h2 className="text-xl font-bold text-[#0f172a]">{profile.name}</h2>
            <p className="text-yellow-500 font-medium text-sm">{profile.specialization} Law</p>
          </div>

          {/* Bio */}
          {profile.bio && (
            <div className="mt-4 bg-gray-50 rounded-xl p-4 border border-gray-100">
              <p className="text-gray-600 text-sm leading-relaxed">{profile.bio}</p>
            </div>
          )}
        </div>
      </div>

      {/* Info Grid */}
      <div className="bg-white rounded-2xl shadow p-6">
        <h3 className="font-bold text-[#0f172a] mb-4 flex items-center gap-2">
          <FaBriefcase className="text-yellow-500" /> Professional Details
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {infoItems.map((item) => (
            <div key={item.label} className="flex items-center gap-3 bg-gray-50 rounded-xl px-4 py-3 border border-gray-100">
              <div className="text-lg flex-shrink-0">{item.icon}</div>
              <div className="min-w-0">
                <p className="text-xs text-gray-400 font-medium">{item.label}</p>
                <p className={`text-sm font-semibold truncate ${
                  item.value === "N/A" || item.value === "Not added"
                    ? "text-gray-300 italic font-normal"
                    : "text-[#0f172a]"
                }`}>
                  {item.value}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Education & Achievements */}
      {(profile.education || profile.achievements) && (
        <div className="bg-white rounded-2xl shadow p-6 space-y-4">
          <h3 className="font-bold text-[#0f172a] flex items-center gap-2">
            <FaUniversity className="text-yellow-500" /> Education & Achievements
          </h3>
          {profile.education && (
            <div className="bg-blue-50 rounded-xl p-4">
              <p className="text-xs text-gray-400 mb-1">Education</p>
              <p className="text-sm text-gray-700">{profile.education}</p>
            </div>
          )}
          {profile.achievements && (
            <div className="bg-yellow-50 rounded-xl p-4">
              <p className="text-xs text-gray-400 mb-1">Achievements</p>
              <p className="text-sm text-gray-700">{profile.achievements}</p>
            </div>
          )}
        </div>
      )}

      {/* Languages */}
      {profile.languages?.length > 0 && (
        <div className="bg-white rounded-2xl shadow p-6">
          <h3 className="font-bold text-[#0f172a] mb-3 flex items-center gap-2">
            <FaLanguage className="text-yellow-500" /> Languages Spoken
          </h3>
          <div className="flex flex-wrap gap-2">
            {profile.languages.map((lang) => (
              <span key={lang} className="bg-yellow-50 text-yellow-700 border border-yellow-200 px-4 py-1.5 rounded-full text-sm font-medium">
                {lang}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Social Links */}
      {(profile.linkedin || profile.twitter) && (
        <div className="bg-white rounded-2xl shadow p-6">
          <h3 className="font-bold text-[#0f172a] mb-3">Social Links</h3>
          <div className="flex flex-col gap-2">
            {profile.linkedin && (
              <a href={profile.linkedin} target="_blank" rel="noopener noreferrer"
                className="flex items-center gap-3 bg-blue-50 text-blue-600 px-4 py-3 rounded-xl text-sm font-medium hover:bg-blue-100 transition">
                <FaLinkedin /> {profile.linkedin}
              </a>
            )}
            {profile.twitter && (
              <a href={profile.twitter} target="_blank" rel="noopener noreferrer"
                className="flex items-center gap-3 bg-sky-50 text-sky-500 px-4 py-3 rounded-xl text-sm font-medium hover:bg-sky-100 transition">
                <FaTwitter /> {profile.twitter}
              </a>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
export const dynamic = 'force-dynamic'