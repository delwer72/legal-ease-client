"use client";
import { useEffect, useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { getLawyerHiringRequests, updateHiringStatus } from "@/lib/api";
import toast from "react-hot-toast";

export default function LawyerHiringHistory() {
  const { token } = useAuth();
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (token) {
      getLawyerHiringRequests(token).then((data) => {
        setRequests(Array.isArray(data) ? data : []);
        setLoading(false);
      });
    }
  }, [token]);

  const handleStatus = async (id, status) => {
    try {
      await updateHiringStatus(token, id, status);
      setRequests((prev) => prev.map((r) => r._id === id ? { ...r, status } : r));
      toast.success(`Request ${status}!`);
    } catch {
      toast.error("Action failed");
    }
  };

  if (loading) return <div className="text-center py-20"><div className="w-10 h-10 border-4 border-yellow-400 border-t-transparent rounded-full animate-spin mx-auto" /></div>;

  return (
    <div>
      <h1 className="text-2xl font-bold text-[#0f172a] mb-6">Hiring Requests</h1>
      {requests.length === 0 ? (
        <div className="bg-white rounded-2xl shadow p-10 text-center text-gray-400">No hiring requests yet.</div>
      ) : (
        <div className="bg-white rounded-2xl shadow overflow-hidden">
          <table className="w-full text-sm">
            <thead className="bg-[#0f172a] text-yellow-400">
              <tr>
                <th className="px-6 py-4 text-left">Client</th>
                <th className="px-6 py-4 text-left">Request Date</th>
                <th className="px-6 py-4 text-left">Status</th>
                <th className="px-6 py-4 text-left">Action</th>
              </tr>
            </thead>
            <tbody>
              {requests.map((r, i) => (
                <tr key={r._id} className={i % 2 === 0 ? "bg-gray-50" : "bg-white"}>
                  <td className="px-6 py-4 font-medium">{r.userEmail}</td>
                  <td className="px-6 py-4 text-gray-500">{new Date(r.requestDate).toLocaleDateString()}</td>
                  <td className="px-6 py-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold capitalize ${
                      r.status === "accepted" ? "bg-green-100 text-green-700" :
                      r.status === "rejected" ? "bg-red-100 text-red-700" :
                      "bg-yellow-100 text-yellow-700"
                    }`}>{r.status}</span>
                  </td>
                  <td className="px-6 py-4">
                    {r.status === "pending" && (
                      <div className="flex gap-2">
                        <button onClick={() => handleStatus(r._id, "accepted")} className="bg-green-500 text-white px-3 py-1 rounded-full text-xs font-semibold hover:bg-green-600 transition">Accept</button>
                        <button onClick={() => handleStatus(r._id, "rejected")} className="bg-red-500 text-white px-3 py-1 rounded-full text-xs font-semibold hover:bg-red-600 transition">Reject</button>
                      </div>
                    )}
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