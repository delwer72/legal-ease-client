"use client";
import { useEffect, useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { getAllTransactions } from "@/lib/api";

export default function AllTransactions() {
  const { token } = useAuth();
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (token) {
      getAllTransactions(token).then((data) => {
        setTransactions(Array.isArray(data) ? data : []);
        setLoading(false);
      });
    }
  }, [token]);

  if (loading) return <div className="text-center py-20"><div className="w-10 h-10 border-4 border-yellow-400 border-t-transparent rounded-full animate-spin mx-auto" /></div>;

  return (
    <div>
      <h1 className="text-2xl font-bold text-[#0f172a] mb-6">All Transactions</h1>
      {transactions.length === 0 ? (
        <div className="bg-white rounded-2xl shadow p-10 text-center text-gray-400">No transactions yet.</div>
      ) : (
        <div className="bg-white rounded-2xl shadow overflow-hidden">
          <table className="w-full text-sm">
            <thead className="bg-[#0f172a] text-yellow-400">
              <tr>
                <th className="px-6 py-4 text-left">#</th>
                <th className="px-6 py-4 text-left">Transaction ID</th>
                <th className="px-6 py-4 text-left">User Email</th>
                <th className="px-6 py-4 text-left">Lawyer Email</th>
                <th className="px-6 py-4 text-left">Amount</th>
                <th className="px-6 py-4 text-left">Date</th>
              </tr>
            </thead>
            <tbody>
              {transactions.map((t, i) => (
                <tr key={t._id} className={i % 2 === 0 ? "bg-gray-50" : "bg-white"}>
                  <td className="px-6 py-4 text-gray-500">{i + 1}</td>
                  <td className="px-6 py-4 font-mono text-xs text-gray-600">{t.transactionId?.slice(0, 20)}...</td>
                  <td className="px-6 py-4 text-gray-500">{t.userEmail}</td>
                  <td className="px-6 py-4 text-gray-500">{t.lawyerEmail}</td>
                  <td className="px-6 py-4 font-semibold text-green-600">${t.amount}</td>
                  <td className="px-6 py-4 text-gray-500">{new Date(t.date).toLocaleDateString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}