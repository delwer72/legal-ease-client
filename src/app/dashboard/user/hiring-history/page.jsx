"use client";
import { useEffect, useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { getMyHiringHistory } from "@/lib/api";
import PaymentModal from "@/components/PaymentModal";

export default function UserHiringHistory() {
  const { token } = useAuth();
  const [hirings, setHirings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedHiring, setSelectedHiring] = useState(null);

  useEffect(() => {
    if (token) {
      getMyHiringHistory(token).then((data) => {
        setHirings(Array.isArray(data) ? data : []);
        setLoading(false);
      });
    }
  }, [token]);

  const statusColor = {
    pending: "bg-yellow-100 text-yellow-700",
    accepted: "bg-green-100 text-green-700",
    rejected: "bg-red-100 text-red-700",
  };

  if (loading) return <div className="text-center py-20"><div className="w-10 h-10 border-4 border-yellow-400 border-t-transparent rounded-full animate-spin mx-auto" /></div>;

  return (
    <div>
      <h1 className="text-2xl font-bold text-[#0f172a] mb-6">Hiring History</h1>
      {hirings.length === 0 ? (
        <div className="bg-white rounded-2xl shadow p-10 text-center text-gray-400">No hiring history yet.</div>
      ) : (
        <div className="bg-white rounded-2xl shadow overflow-hidden">
          <table className="w-full text-sm">
            <thead className="bg-[#0f172a] text-yellow-400">
              <tr>
                <th className="px-6 py-4 text-left">Lawyer</th>
                <th className="px-6 py-4 text-left">Specialization</th>
                <th className="px-6 py-4 text-left">Fee</th>
                <th className="px-6 py-4 text-left">Date</th>
                <th className="px-6 py-4 text-left">Status</th>
                <th className="px-6 py-4 text-left">Action</th>
              </tr>
            </thead>
            <tbody>
              {hirings.map((h, i) => (
                <tr key={h._id} className={i % 2 === 0 ? "bg-gray-50" : "bg-white"}>
                  <td className="px-6 py-4 font-medium">{h.lawyerName}</td>
                  <td className="px-6 py-4 text-gray-500">—</td>
                  <td className="px-6 py-4">${h.fee}</td>
                  <td className="px-6 py-4 text-gray-500">{new Date(h.requestDate).toLocaleDateString()}</td>
                  <td className="px-6 py-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold capitalize ${statusColor[h.status]}`}>
                      {h.status}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    {h.status === "accepted" && !h.paid && (
                      <button
                        onClick={() => setSelectedHiring(h)}
                        className="bg-green-500 text-white px-4 py-1.5 rounded-full text-xs font-semibold hover:bg-green-600 transition"
                      >
                        Pay
                      </button>
                    )}
                    {h.paid && (
                      <span className="bg-gray-200 text-gray-500 px-4 py-1.5 rounded-full text-xs font-semibold">
                        Paid
                      </span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {selectedHiring && (
        <PaymentModal
          hiring={selectedHiring}
          onClose={() => setSelectedHiring(null)}
          onSuccess={() => {
            setHirings((prev) =>
              prev.map((h) => h._id === selectedHiring._id ? { ...h, paid: true } : h)
            );
            setSelectedHiring(null);
          }}
        />
      )}
    </div>
  );
}