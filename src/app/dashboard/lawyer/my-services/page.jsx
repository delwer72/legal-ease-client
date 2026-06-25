"use client";
import { useEffect, useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { getMyLawyerProfile, updateMyLawyerProfile, togglePublishProfile } from "@/lib/api";
import Link from "next/link";
import toast from "react-hot-toast";
import {
  FaGavel, FaBriefcase, FaDollarSign,
  FaEye, FaEyeSlash, FaEdit, FaCheckCircle,
} from "react-icons/fa";

export default function MyServices() {
  const { token } = useAuth();
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [toggling, setToggling] = useState(false);

  useEffect(() => {
    if (token) {
      getMyLawyerProfile(token).then((data) => {
        if (data && !data.message) setProfile(data);
        setLoading(false);
      });
    }
  }, [token]);

  const handleTogglePublish = async () => {
    setToggling(true);
    try {
      await togglePublishProfile(token, !profile.published);
      setProfile((prev) => ({ ...prev, published: !prev.published }));
      toast.success(profile.published ? "Profile unpublished!" : "Profile published!");
    } catch {
      toast.error("Action failed");
    } finally {
      setToggling(false);
    }
  };

  if (loading) return (
    <div className="flex items-center justify-center py-20">
      <div className="w-10 h-10 border-4 border-yellow-400 border-t-transparent rounded-full animate-spin" />
    </div>
  );

  if (!profile) return (
    <div className="max-w-2xl mx-auto text-center py-20">
      <FaGavel className="text-6xl text-gray-200 mx-auto mb-4" />
      <h2 className="text-xl font-bold text-[#0f172a] mb-2">No Services Yet</h2>
      <p className="text-gray-400 mb-6">Create your legal profile first to manage services.</p>
      <Link
        href="/dashboard/lawyer/manage-legal-profile"
        className="bg-[#0f172a] text-yellow-400 px-8 py-3 rounded-full font-semibold hover:bg-yellow-400 hover:text-[#0f172a] transition"
      >
        Create Profile
      </Link>
    </div>
  );

  const services = [
    {
      title: `${profile.specialization} Law`,
      description: profile.bio,
      fee: profile.fee,
      status: profile.status || "Available",
      experience: profile.experience,
    },
  ];

  return (
    <div className="max-w-3xl mx-auto space-y-5">

      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-[#0f172a]">My Services</h1>
          <p className="text-gray-400 text-sm mt-1">Manage your legal services</p>
        </div>
        <div className="flex gap-3">
          <button
            onClick={handleTogglePublish}
            disabled={toggling}
            className={`flex items-center gap-2 px-5 py-2.5 rounded-full font-semibold text-sm transition ${
              profile.published
                ? "bg-red-100 text-red-600 hover:bg-red-200"
                : "bg-green-100 text-green-700 hover:bg-green-200"
            } disabled:opacity-60`}
          >
            {profile.published ? <FaEyeSlash /> : <FaEye />}
            {profile.published ? "Unpublish" : "Publish"}
          </button>
          <Link
            href="/dashboard/lawyer/manage-legal-profile"
            className="flex items-center gap-2 bg-[#0f172a] text-yellow-400 px-5 py-2.5 rounded-full font-semibold text-sm hover:bg-yellow-400 hover:text-[#0f172a] transition"
          >
            <FaEdit /> Edit
          </Link>
        </div>
      </div>

      {/* Publish Status Banner */}
      <div className={`rounded-2xl p-4 flex items-center gap-3 ${
        profile.published
          ? "bg-green-50 border border-green-100"
          : "bg-yellow-50 border border-yellow-100"
      }`}>
        {profile.published
          ? <FaCheckCircle className="text-green-500 text-xl flex-shrink-0" />
          : <FaEyeSlash className="text-yellow-500 text-xl flex-shrink-0" />
        }
        <div>
          <p className={`font-semibold text-sm ${profile.published ? "text-green-700" : "text-yellow-700"}`}>
            {profile.published ? "Your profile is live!" : "Your profile is not published yet"}
          </p>
          <p className={`text-xs mt-0.5 ${profile.published ? "text-green-600" : "text-yellow-600"}`}>
            {profile.published
              ? "Clients can find and hire you on Browse Lawyers page."
              : "Click Publish to make your profile visible to clients."}
          </p>
        </div>
      </div>

      {/* Service Cards */}
      {services.map((service, i) => (
        <div key={i} className="bg-white rounded-2xl shadow p-6">
          <div className="flex items-start justify-between gap-4 mb-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-yellow-100 rounded-2xl flex items-center justify-center flex-shrink-0">
                <FaGavel className="text-yellow-500 text-xl" />
              </div>
              <div>
                <h3 className="font-bold text-[#0f172a] text-lg">{service.title}</h3>
                <div className="flex items-center gap-3 mt-1 flex-wrap">
                  <span className="flex items-center gap-1 text-green-600 font-semibold text-sm">
                    <FaDollarSign className="text-xs" />{service.fee}/hr
                  </span>
                  {service.experience && (
                    <span className="flex items-center gap-1 text-gray-500 text-xs bg-gray-100 px-2 py-0.5 rounded-full">
                      <FaBriefcase className="text-xs" /> {service.experience}
                    </span>
                  )}
                  <span className={`text-xs px-2 py-0.5 rounded-full font-semibold ${
                    service.status === "Available"
                      ? "bg-green-100 text-green-600"
                      : service.status === "Part-time"
                      ? "bg-yellow-100 text-yellow-600"
                      : "bg-red-100 text-red-600"
                  }`}>
                    {service.status}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {service.description && (
            <p className="text-gray-600 text-sm leading-relaxed bg-gray-50 rounded-xl p-4 border border-gray-100">
              {service.description}
            </p>
          )}

          {/* Stats */}
          <div className="grid grid-cols-3 gap-3 mt-4">
            {[
              { label: "Total Hires", value: profile.totalHires || 0 },
              { label: "Fee/hr", value: `$${profile.fee}` },
              { label: "Status", value: profile.status || "Available" },
            ].map((stat) => (
              <div key={stat.label} className="bg-gray-50 rounded-xl p-3 text-center border border-gray-100">
                <p className="text-lg font-bold text-[#0f172a]">{stat.value}</p>
                <p className="text-xs text-gray-400 mt-0.5">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      ))}

      {/* Quick Links */}
      <div className="bg-white rounded-2xl shadow p-6">
        <h3 className="font-bold text-[#0f172a] mb-4">Quick Actions</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <Link
            href="/dashboard/lawyer/manage-legal-profile"
            className="flex items-center gap-3 bg-[#0f172a] text-yellow-400 px-5 py-3 rounded-xl font-semibold text-sm hover:bg-yellow-400 hover:text-[#0f172a] transition"
          >
            <FaEdit /> Update Profile & Services
          </Link>
          <Link
            href="/dashboard/lawyer/hiring-history"
            className="flex items-center gap-3 bg-yellow-50 text-yellow-700 border border-yellow-200 px-5 py-3 rounded-xl font-semibold text-sm hover:bg-yellow-100 transition"
          >
            <FaBriefcase /> View Hiring Requests
          </Link>
        </div>
      </div>
    </div>
  );
}
export const dynamic = 'force-dynamic'