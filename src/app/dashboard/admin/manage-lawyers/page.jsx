"use client";
import { useEffect, useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { adminTogglePublish, adminDeleteLawyer } from "@/lib/api";
import toast from "react-hot-toast";
import Swal from "sweetalert2";
import Image from "next/image";
import { FaGavel, FaEye, FaEyeSlash, FaTrash } from "react-icons/fa";

const API = process.env.NEXT_PUBLIC_API_URL;

export default function ManageLawyers() {
  const { token } = useAuth();
  const [lawyers, setLawyers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (token) {
      fetch(`${API}/api/lawyers/all`, {
        headers: { Authorization: `Bearer ${token}` },
      })
        .then((r) => r.json())
        .then((data) => {
          setLawyers(Array.isArray(data) ? data : []);
          setLoading(false);
        });
    }
  }, [token]);

  const handleTogglePublish = async (id, published) => {
    try {
      await adminTogglePublish(token, id, !published);
      setLawyers((prev) =>
        prev.map((l) => l._id === id ? { ...l, published: !published } : l)
      );
      toast.success(published ? "Unpublished!" : "Published!");
    } catch {
      toast.error("Action failed");
    }
  };

  const handleDelete = async (id) => {
    const result = await Swal.fire({
      title: "Delete Lawyer?",
      text: "This cannot be undone.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#ef4444",
      confirmButtonText: "Delete",
    });
    if (result.isConfirmed) {
      await adminDeleteLawyer(token, id);
      setLawyers((prev) => prev.filter((l) => l._id !== id));
      toast.success("Lawyer deleted");
    }
  };

  if (loading) return (
    <div className="flex items-center justify-center py-20">
      <div className="w-10 h-10 border-4 border-yellow-400 border-t-transparent rounded-full animate-spin" />
    </div>
  );

  return (
    <div>
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 bg-yellow-100 rounded-xl flex items-center justify-center">
          <FaGavel className="text-yellow-500" />
        </div>
        <div>
          <h1 className="text-2xl font-bold text-[#0f172a]">Manage Lawyers</h1>
          <p className="text-gray-400 text-sm">{lawyers.length} lawyers total</p>
        </div>
      </div>

      {lawyers.length === 0 ? (
        <div className="bg-white rounded-2xl shadow p-10 text-center text-gray-400">
          No lawyers found.
        </div>
      ) : (
        <div className="bg-white rounded-2xl shadow overflow-hidden">
          <table className="w-full text-sm">
            <thead className="bg-[#0f172a] text-yellow-400">
              <tr>
                <th className="px-6 py-4 text-left">#</th>
                <th className="px-6 py-4 text-left">Lawyer</th>
                <th className="px-6 py-4 text-left">Specialization</th>
                <th className="px-6 py-4 text-left">Fee</th>
                <th className="px-6 py-4 text-left">Status</th>
                <th className="px-6 py-4 text-left">Published</th>
                <th className="px-6 py-4 text-left">Actions</th>
              </tr>
            </thead>
            <tbody>
              {lawyers.map((l, i) => (
                <tr key={l._id} className={i % 2 === 0 ? "bg-gray-50" : "bg-white"}>
                  <td className="px-6 py-4 text-gray-400">{i + 1}</td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="relative w-9 h-9 flex-shrink-0">
                        <Image
                          src={l.image || `https://placehold.co/100x100/0f172a/fbbf24?text=${l.name?.[0]}`}
                          alt={l.name}
                          fill
                          className="rounded-full object-cover"
                        />
                      </div>
                      <div>
                        <p className="font-semibold text-[#0f172a]">{l.name}</p>
                        <p className="text-xs text-gray-400">{l.lawyerEmail}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-gray-600">{l.specialization}</td>
                  <td className="px-6 py-4 font-semibold text-green-600">${l.fee}/hr</td>
                  <td className="px-6 py-4">
                    <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
                      l.status === "Available"
                        ? "bg-green-100 text-green-600"
                        : "bg-red-100 text-red-600"
                    }`}>
                      {l.status}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
                      l.published
                        ? "bg-blue-100 text-blue-600"
                        : "bg-gray-100 text-gray-500"
                    }`}>
                      {l.published ? "Published" : "Hidden"}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex gap-2">
                      <button
                        onClick={() => handleTogglePublish(l._id, l.published)}
                        className={`p-2 rounded-lg text-xs transition ${
                          l.published
                            ? "bg-yellow-100 text-yellow-600 hover:bg-yellow-200"
                            : "bg-green-100 text-green-600 hover:bg-green-200"
                        }`}
                        title={l.published ? "Unpublish" : "Publish"}
                      >
                        {l.published ? <FaEyeSlash /> : <FaEye />}
                      </button>
                      <button
                        onClick={() => handleDelete(l._id)}
                        className="p-2 rounded-lg bg-red-100 text-red-500 hover:bg-red-200 transition"
                        title="Delete"
                      >
                        <FaTrash />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}