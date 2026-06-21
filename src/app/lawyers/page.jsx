"use client";
import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { getLawyers } from "@/lib/api";
import LawyerCard from "@/components/LawyerCard";
import { FiSearch } from "react-icons/fi";

const specializations = ["All", "Criminal", "Corporate", "Family", "Tax", "Property", "Immigration", "Civil", "Labor"];

export default function BrowseLawyers() {
  const searchParams = useSearchParams();
  const [lawyers, setLawyers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [filters, setFilters] = useState({
    search: searchParams.get("search") || "",
    specialization: searchParams.get("specialization") || "",
    minFee: "",
    maxFee: "",
    availability: "",
    sort: "",
  });

  const fetchLawyers = async () => {
    setLoading(true);
    const params = { ...filters, page, limit: 8 };
    Object.keys(params).forEach((k) => !params[k] && delete params[k]);
    const data = await getLawyers(params);
    setLawyers(data.lawyers || []);
    setTotal(data.total || 0);
    setLoading(false);
  };

  useEffect(() => { fetchLawyers(); }, [filters, page]);

  const handleFilter = (key, val) => { setFilters((prev) => ({ ...prev, [key]: val })); setPage(1); };

  const totalPages = Math.ceil(total / 8);

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold text-[#0f172a] mb-8">Browse Lawyers</h1>

      {/* Filters */}
      <div className="bg-white rounded-2xl shadow p-6 mb-8 grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4">
        <div className="relative">
          <FiSearch className="absolute left-3 top-3.5 text-gray-400" />
          <input
            placeholder="Search by name..."
            value={filters.search}
            onChange={(e) => handleFilter("search", e.target.value)}
            className="w-full pl-9 pr-4 py-3 border border-gray-200 rounded-xl outline-none focus:border-yellow-400 text-sm"
          />
        </div>
        <select
          value={filters.specialization}
          onChange={(e) => handleFilter("specialization", e.target.value === "All" ? "" : e.target.value)}
          className="border border-gray-200 rounded-xl px-4 py-3 outline-none focus:border-yellow-400 text-sm"
        >
          {specializations.map((s) => <option key={s}>{s}</option>)}
        </select>
        <select
          value={filters.availability}
          onChange={(e) => handleFilter("availability", e.target.value)}
          className="border border-gray-200 rounded-xl px-4 py-3 outline-none focus:border-yellow-400 text-sm"
        >
          <option value="">All Status</option>
          <option value="Available">Available</option>
          <option value="Busy">Busy</option>
        </select>
        <select
          value={filters.sort}
          onChange={(e) => handleFilter("sort", e.target.value)}
          className="border border-gray-200 rounded-xl px-4 py-3 outline-none focus:border-yellow-400 text-sm"
        >
          <option value="">Sort By</option>
          <option value="fee_asc">Fee: Low → High</option>
          <option value="fee_desc">Fee: High → Low</option>
        </select>
        <div className="flex gap-2">
          <input
            type="number"
            placeholder="Min $"
            value={filters.minFee}
            onChange={(e) => handleFilter("minFee", e.target.value)}
            className="w-1/2 border border-gray-200 rounded-xl px-3 py-3 outline-none focus:border-yellow-400 text-sm"
          />
          <input
            type="number"
            placeholder="Max $"
            value={filters.maxFee}
            onChange={(e) => handleFilter("maxFee", e.target.value)}
            className="w-1/2 border border-gray-200 rounded-xl px-3 py-3 outline-none focus:border-yellow-400 text-sm"
          />
        </div>
      </div>

      {/* Results */}
      {loading ? (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {[...Array(8)].map((_, i) => (
            <div key={i} className="bg-gray-100 rounded-2xl h-64 animate-pulse" />
          ))}
        </div>
      ) : lawyers.length === 0 ? (
        <div className="text-center py-20 text-gray-400">
          <p className="text-5xl mb-4">🔍</p>
          <p className="text-xl font-medium">No lawyers found</p>
          <p className="text-sm">Try adjusting your filters</p>
        </div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {lawyers.map((lawyer, i) => (
            <LawyerCard key={lawyer._id} lawyer={lawyer} index={i} />
          ))}
        </div>
      )}

      {/* Pagination */}
      {/* Pagination */}
{totalPages > 1 && (
  <div className="flex justify-center items-center gap-2 mt-10">
    {/* Previous */}
    <button
      onClick={() => setPage((p) => Math.max(1, p - 1))}
      disabled={page === 1}
      className="px-4 py-2 rounded-full text-sm font-semibold border border-gray-200 hover:border-yellow-400 disabled:opacity-40 disabled:cursor-not-allowed transition"
    >
      ← Prev
    </button>

    {/* Page Numbers */}
    {[...Array(totalPages)].map((_, i) => {
      const pageNum = i + 1;
      // show first, last, and pages around current
      if (
        pageNum === 1 ||
        pageNum === totalPages ||
        (pageNum >= page - 1 && pageNum <= page + 1)
      ) {
        return (
          <button
            key={i}
            onClick={() => setPage(pageNum)}
            className={`w-10 h-10 rounded-full font-semibold text-sm transition ${
              page === pageNum
                ? "bg-[#0f172a] text-yellow-400"
                : "bg-white border border-gray-200 hover:border-yellow-400"
            }`}
          >
            {pageNum}
          </button>
        );
      }
      // show dots
      if (pageNum === page - 2 || pageNum === page + 2) {
        return <span key={i} className="text-gray-400 text-sm">...</span>;
      }
      return null;
    })}

    {/* Next */}
    <button
      onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
      disabled={page === totalPages}
      className="px-4 py-2 rounded-full text-sm font-semibold border border-gray-200 hover:border-yellow-400 disabled:opacity-40 disabled:cursor-not-allowed transition"
    >
      Next →
    </button>
  </div>
)}
    </div>
  );
}