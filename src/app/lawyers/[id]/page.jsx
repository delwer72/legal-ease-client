"use client";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import {
  getLawyerById, sendHiringRequest, checkHired,
  getComments, postComment,
} from "@/lib/api";
import { useAuth } from "@/context/AuthContext";
import Image from "next/image";
import toast from "react-hot-toast";
import Swal from "sweetalert2";
import {
  FaBriefcase, FaDollarSign, FaCalendar, FaCircle,
  FaPhone, FaMapMarkerAlt, FaGlobe, FaLinkedin,
  FaTwitter, FaClock, FaLanguage, FaUniversity,
  FaTrophy, FaStar, FaCheckCircle, FaGavel,
} from "react-icons/fa";

export default function LawyerDetails() {
  const { id } = useParams();
  const { token, dbUser } = useAuth();
  const [lawyer, setLawyer] = useState(null);
  const [loading, setLoading] = useState(true);
  const [hiring, setHiring] = useState(false);
  const [hasHired, setHasHired] = useState(false);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    getLawyerById(id).then((data) => { setLawyer(data); setLoading(false); });
    getComments(id).then((data) => setComments(Array.isArray(data) ? data : []));
    if (token) checkHired(token, id).then((data) => setHasHired(data.hasHired));
  }, [id, token]);

  const handleHire = async () => {
    if (!token) { toast.error("Please login to hire"); return; }
    if (dbUser?.role !== "user") { toast.error("Only clients can hire"); return; }
    setHiring(true);
    try {
      const result = await sendHiringRequest(token, {
        lawyerId: id,
        lawyerEmail: lawyer.lawyerEmail,
        lawyerName: lawyer.name,
        fee: lawyer.fee,
      });
      if (result.message) throw new Error(result.message);
      Swal.fire({ icon: "success", title: "Request Sent!", text: "Wait for the lawyer to accept." });
      setShowModal(false);
    } catch (err) {
      toast.error(err.message || "Already requested");
    } finally {
      setHiring(false);
    }
  };

  const handleComment = async (e) => {
    e.preventDefault();
    if (!newComment.trim()) { toast.error("Comment cannot be empty"); return; }
    try {
      const result = await postComment(token, { lawyerId: id, comment: newComment });
      if (result.message) throw new Error(result.message);
      const updated = await getComments(id);
      setComments(Array.isArray(updated) ? updated : []);
      setNewComment("");
      toast.success("Comment posted!");
    } catch (err) {
      toast.error(err.message || "Failed to post");
    }
  };

  if (loading) return (
    <div className="max-w-5xl mx-auto px-4 py-12 space-y-4">
      <div className="bg-gray-100 rounded-2xl h-64 animate-pulse" />
      <div className="grid grid-cols-3 gap-4">
        {[...Array(3)].map((_, i) => <div key={i} className="bg-gray-100 rounded-2xl h-32 animate-pulse" />)}
      </div>
      <div className="bg-gray-100 rounded-2xl h-48 animate-pulse" />
    </div>
  );

  if (!lawyer) return (
    <div className="text-center py-20 text-gray-400">
      <FaGavel className="text-6xl mx-auto mb-4 text-gray-200" />
      <p className="text-xl font-medium">Lawyer not found.</p>
    </div>
  );

  return (
    <div className="max-w-5xl mx-auto px-4 py-12 space-y-6">

      {/* ── Hero Card ── */}
      <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
        {/* Banner */}
        <div className="h-36 bg-gradient-to-r from-[#0f172a] via-[#1e3a5f] to-[#0f172a]" />

        <div className="px-8 pb-8">
          <div className="flex flex-col md:flex-row gap-6 -mt-16 items-start">

            {/* Avatar */}
            <div className="relative w-32 h-32 rounded-2xl overflow-hidden border-4 border-white shadow-xl flex-shrink-0 bg-gray-100">
              <Image
                src={lawyer.image || `https://placehold.co/200x200/0f172a/fbbf24?text=${lawyer.name?.[0] || "L"}`}
                alt={lawyer.name}
                fill
                className="object-cover"
              />
            </div>

            {/* Info */}
            <div className="flex-1 pt-2 md:pt-20">
              <div className="flex flex-wrap items-start justify-between gap-4">
                <div>
                  <h1 className="text-3xl font-bold text-[#0f172a]">{lawyer.name}</h1>
                  <div className="flex flex-wrap items-center gap-3 mt-2">
                    <span className="flex items-center gap-1.5 text-gray-500 text-sm">
                      <FaBriefcase className="text-yellow-500" />
                      {lawyer.specialization} Law
                    </span>
                    <span className="flex items-center gap-1.5 text-gray-500 text-sm">
                      <FaDollarSign className="text-yellow-500" />
                      ${lawyer.fee}/hr
                    </span>
                    <span className={`flex items-center gap-1.5 text-sm font-semibold px-3 py-0.5 rounded-full ${
                      lawyer.status === "Available"
                        ? "bg-green-100 text-green-600"
                        : lawyer.status === "Part-time"
                        ? "bg-yellow-100 text-yellow-600"
                        : "bg-red-100 text-red-600"
                    }`}>
                      <FaCircle className="text-xs" />
                      {lawyer.status || "Available"}
                    </span>
                    {lawyer.experience && (
                      <span className="flex items-center gap-1.5 text-gray-500 text-sm">
                        <FaStar className="text-yellow-500" />
                        {lawyer.experience}
                      </span>
                    )}
                  </div>
                  <div className="flex flex-wrap gap-3 mt-2">
                    <span className="flex items-center gap-1 text-gray-400 text-xs">
                      <FaCalendar className="text-yellow-400" />
                      Joined {new Date(lawyer.createdAt).toLocaleDateString("en-US", { year: "numeric", month: "long" })}
                    </span>
                    <span className="flex items-center gap-1 text-gray-400 text-xs">
                      <FaTrophy className="text-yellow-400" />
                      {lawyer.totalHires || 0} clients hired
                    </span>
                  </div>
                </div>

                {/* Hire Button */}
                {dbUser?.role === "user" && (
                  <button
                    onClick={() => setShowModal(true)}
                    className="bg-yellow-400 text-[#0f172a] px-8 py-3 rounded-full font-bold hover:bg-yellow-300 transition shadow-lg shadow-yellow-400/30 text-sm"
                  >
                    Hire Now
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ── Stats Row ── */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: "Consultation Fee", value: `$${lawyer.fee}/hr`, icon: <FaDollarSign />, color: "text-green-500" },
          { label: "Experience", value: lawyer.experience || "N/A", icon: <FaStar />, color: "text-yellow-500" },
          { label: "Total Clients", value: lawyer.totalHires || 0, icon: <FaTrophy />, color: "text-purple-500" },
          { label: "Status", value: lawyer.status || "Available", icon: <FaCheckCircle />, color: "text-blue-500" },
        ].map((stat) => (
          <div key={stat.label} className="bg-white rounded-2xl shadow p-5 flex items-center gap-3">
            <div className={`text-2xl ${stat.color}`}>{stat.icon}</div>
            <div>
              <p className="text-xs text-gray-400">{stat.label}</p>
              <p className="font-bold text-[#0f172a] text-sm">{stat.value}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

        {/* ── Left Column ── */}
        <div className="md:col-span-2 space-y-6">

          {/* About */}
          <div className="bg-white rounded-2xl shadow p-6">
            <h2 className="text-lg font-bold text-[#0f172a] mb-3 flex items-center gap-2">
              <FaGavel className="text-yellow-500" /> About
            </h2>
            <p className="text-gray-600 leading-relaxed text-sm">{lawyer.bio}</p>
          </div>

          {/* Education & Achievements */}
          {(lawyer.education || lawyer.achievements) && (
            <div className="bg-white rounded-2xl shadow p-6 space-y-4">
              <h2 className="text-lg font-bold text-[#0f172a] flex items-center gap-2">
                <FaUniversity className="text-yellow-500" /> Education & Achievements
              </h2>
              {lawyer.education && (
                <div className="flex items-start gap-3 bg-blue-50 rounded-xl p-4">
                  <FaUniversity className="text-blue-500 mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="text-xs text-gray-400 font-medium mb-1">Educational Background</p>
                    <p className="text-gray-700 text-sm">{lawyer.education}</p>
                  </div>
                </div>
              )}
              {lawyer.achievements && (
                <div className="flex items-start gap-3 bg-yellow-50 rounded-xl p-4">
                  <FaTrophy className="text-yellow-500 mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="text-xs text-gray-400 font-medium mb-1">Key Achievements</p>
                    <p className="text-gray-700 text-sm leading-relaxed">{lawyer.achievements}</p>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Comments */}
          <div className="bg-white rounded-2xl shadow p-6">
            <h2 className="text-lg font-bold text-[#0f172a] mb-5 flex items-center gap-2">
              <FaStar className="text-yellow-500" />
              Client Reviews
              <span className="ml-auto bg-gray-100 text-gray-500 text-xs px-3 py-1 rounded-full font-normal">
                {comments.length} review{comments.length !== 1 ? "s" : ""}
              </span>
            </h2>

            {/* Comment Form */}
            {token && hasHired && (
              <form onSubmit={handleComment} className="mb-6 bg-gray-50 rounded-xl p-4">
                <p className="text-sm font-medium text-gray-700 mb-2">Write a Review</p>
                <textarea
                  value={newComment}
                  onChange={(e) => setNewComment(e.target.value)}
                  rows={3}
                  placeholder="Share your experience with this lawyer..."
                  className="w-full border border-gray-200 rounded-xl px-4 py-3 outline-none focus:border-yellow-400 resize-none transition text-sm bg-white"
                />
                <div className="flex justify-end mt-3">
                  <button
                    type="submit"
                    className="bg-[#0f172a] text-yellow-400 px-6 py-2.5 rounded-full font-semibold hover:bg-yellow-400 hover:text-[#0f172a] transition text-sm"
                  >
                    Post Review
                  </button>
                </div>
              </form>
            )}

            {!token && (
              <div className="bg-yellow-50 border border-yellow-100 rounded-xl p-4 mb-5 text-sm text-yellow-700">
                Please <a href="/signin" className="font-semibold underline">login</a> and hire this lawyer to leave a review.
              </div>
            )}
            {token && !hasHired && (
              <div className="bg-blue-50 border border-blue-100 rounded-xl p-4 mb-5 text-sm text-blue-700">
                You must hire this lawyer to leave a review.
              </div>
            )}

            {comments.length === 0 ? (
              <div className="text-center py-8 text-gray-300">
                <FaStar className="text-4xl mx-auto mb-2" />
                <p className="text-gray-400 text-sm">No reviews yet. Be the first!</p>
              </div>
            ) : (
              <div className="space-y-4">
                {comments.map((c) => (
                  <div key={c._id} className="flex gap-4 p-4 bg-gray-50 rounded-xl border border-gray-100">
                    <div className="relative w-10 h-10 flex-shrink-0">
                      <Image
                        src={c.userImage || `https://placehold.co/100x100/0f172a/fbbf24?text=${c.userName?.[0] || "U"}`}
                        alt={c.userName}
                        fill
                        className="rounded-full object-cover"
                      />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <p className="font-semibold text-[#0f172a] text-sm">{c.userName}</p>
                        <p className="text-gray-400 text-xs">{new Date(c.createdAt).toLocaleDateString()}</p>
                      </div>
                      <p className="text-gray-600 text-sm mt-1 leading-relaxed">{c.comment}</p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* ── Right Sidebar ── */}
        <div className="space-y-5">

          {/* Contact Info */}
          <div className="bg-white rounded-2xl shadow p-5">
            <h3 className="font-bold text-[#0f172a] mb-4 text-sm uppercase tracking-wider">Contact Info</h3>
            <div className="space-y-3">
              {lawyer.phone && (
                <div className="flex items-center gap-3 text-sm">
                  <div className="w-8 h-8 bg-yellow-50 rounded-lg flex items-center justify-center flex-shrink-0">
                    <FaPhone className="text-yellow-500 text-xs" />
                  </div>
                  <div>
                    <p className="text-xs text-gray-400">Phone</p>
                    <p className="font-medium text-gray-700">{lawyer.phone}</p>
                  </div>
                </div>
              )}
              {(lawyer.city || lawyer.country) && (
                <div className="flex items-center gap-3 text-sm">
                  <div className="w-8 h-8 bg-yellow-50 rounded-lg flex items-center justify-center flex-shrink-0">
                    <FaMapMarkerAlt className="text-yellow-500 text-xs" />
                  </div>
                  <div>
                    <p className="text-xs text-gray-400">Location</p>
                    <p className="font-medium text-gray-700">
                      {[lawyer.city, lawyer.country].filter(Boolean).join(", ")}
                    </p>
                  </div>
                </div>
              )}
              {lawyer.consultationTime && (
                <div className="flex items-center gap-3 text-sm">
                  <div className="w-8 h-8 bg-yellow-50 rounded-lg flex items-center justify-center flex-shrink-0">
                    <FaClock className="text-yellow-500 text-xs" />
                  </div>
                  <div>
                    <p className="text-xs text-gray-400">Hours</p>
                    <p className="font-medium text-gray-700">{lawyer.consultationTime}</p>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Languages */}
          {lawyer.languages?.length > 0 && (
            <div className="bg-white rounded-2xl shadow p-5">
              <h3 className="font-bold text-[#0f172a] mb-3 text-sm uppercase tracking-wider flex items-center gap-2">
                <FaLanguage className="text-yellow-500" /> Languages
              </h3>
              <div className="flex flex-wrap gap-2">
                {lawyer.languages.map((lang) => (
                  <span key={lang} className="bg-yellow-50 text-yellow-700 border border-yellow-200 px-3 py-1 rounded-full text-xs font-medium">
                    {lang}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Social Links */}
          {(lawyer.linkedin || lawyer.twitter) && (
            <div className="bg-white rounded-2xl shadow p-5">
              <h3 className="font-bold text-[#0f172a] mb-3 text-sm uppercase tracking-wider">Connect</h3>
              <div className="space-y-2">
                {lawyer.linkedin && (
                  <a href={lawyer.linkedin} target="_blank" rel="noopener noreferrer"
                    className="flex items-center gap-3 bg-blue-50 text-blue-600 px-4 py-2.5 rounded-xl text-sm font-medium hover:bg-blue-100 transition">
                    <FaLinkedin /> LinkedIn Profile
                  </a>
                )}
                {lawyer.twitter && (
                  <a href={lawyer.twitter} target="_blank" rel="noopener noreferrer"
                    className="flex items-center gap-3 bg-sky-50 text-sky-500 px-4 py-2.5 rounded-xl text-sm font-medium hover:bg-sky-100 transition">
                    <FaTwitter /> Twitter / X
                  </a>
                )}
              </div>
            </div>
          )}

          {/* Hire CTA Box */}
          {dbUser?.role === "user" && (
            <div className="bg-gradient-to-br from-[#0f172a] to-[#1e3a5f] rounded-2xl p-5 text-center">
              <FaGavel className="text-yellow-400 text-3xl mx-auto mb-3" />
              <p className="text-white font-bold text-base mb-1">Ready to hire?</p>
              <p className="text-gray-400 text-xs mb-4">Send a hiring request and get legal help today.</p>
              <p className="text-yellow-400 font-bold text-xl mb-4">${lawyer.fee}<span className="text-gray-400 text-sm font-normal">/hr</span></p>
              <button
                onClick={() => setShowModal(true)}
                className="w-full bg-yellow-400 text-[#0f172a] py-3 rounded-full font-bold hover:bg-yellow-300 transition text-sm"
              >
                Hire {lawyer.name?.split(" ")[0]}
              </button>
            </div>
          )}
        </div>
      </div>

      {/* ── Hire Modal ── */}
      {showModal && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md p-8 text-center">
            <div className="relative w-20 h-20 mx-auto mb-4">
              <Image
                src={lawyer.image || `https://placehold.co/200x200/0f172a/fbbf24?text=${lawyer.name?.[0]}`}
                alt={lawyer.name}
                fill
                className="rounded-full object-cover border-4 border-yellow-400"
              />
            </div>
            <h2 className="text-xl font-bold text-[#0f172a] mb-1">Confirm Hiring</h2>
            <p className="text-gray-500 text-sm mb-1">You are about to send a request to</p>
            <p className="text-[#0f172a] font-bold text-lg mb-1">{lawyer.name}</p>
            <p className="text-gray-400 text-sm mb-1">{lawyer.specialization} Law</p>
            <div className="bg-green-50 border border-green-100 rounded-xl py-3 px-4 my-4">
              <p className="text-gray-500 text-sm">Consultation Fee</p>
              <p className="text-green-600 font-bold text-2xl">${lawyer.fee}<span className="text-gray-400 text-sm font-normal">/hr</span></p>
            </div>
            <p className="text-gray-400 text-xs mb-5">After the lawyer accepts, you will be able to complete payment.</p>
            <div className="flex gap-3">
              <button
                onClick={handleHire}
                disabled={hiring}
                className="flex-1 bg-yellow-400 text-[#0f172a] py-3 rounded-full font-bold hover:bg-yellow-300 transition disabled:opacity-60 text-sm"
              >
                {hiring ? "Sending..." : "Confirm Hire"}
              </button>
              <button
                onClick={() => setShowModal(false)}
                className="flex-1 border border-gray-200 py-3 rounded-full font-semibold hover:bg-gray-50 transition text-sm"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}