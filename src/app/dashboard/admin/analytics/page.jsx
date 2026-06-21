"use client";
import { useEffect, useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { getAnalytics } from "@/lib/api";
import { FaUsers, FaGavel, FaBriefcase, FaDollarSign } from "react-icons/fa";

export default function Analytics() {
  const { token } = useAuth();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (token) {
      getAnalytics(token).then((d) => { setData(d); setLoading(false); });
    }
  }, [token]);

  const cards = data ? [
    { label: "Total Users", value: data.totalUsers, icon: <FaUsers />, color: "bg-blue-500" },
    { label: "Total Lawyers", value: data.totalLawyers, icon: <FaGavel />, color: "bg-purple-500" },
    { label: "Total Hires", value: data.totalHires, icon: <FaBriefcase />, color: "bg-yellow-500" },
    { label: "Total Revenue", value: `$${data.totalRevenue}`, icon: <FaDollarSign />, color: "bg-green-500" },
  ] : [];

  if (loading) return <div className="text-center py-20"><div className="w-10 h-10 border-4 border-yellow-400 border-t-transparent rounded-full animate-spin mx-auto" /></div>;

  return (
    <div>
      <h1 className="text-2xl font-bold text-[#0f172a] mb-6">Analytics Overview</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {cards.map((card) => (
          <div key={card.label} className="bg-white rounded-2xl shadow p-6 flex items-center gap-4">
            <div className={`${card.color} text-white p-4 rounded-2xl text-2xl`}>
              {card.icon}
            </div>
            <div>
              <p className="text-gray-500 text-sm">{card.label}</p>
              <p className="text-3xl font-bold text-[#0f172a]">{card.value}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}